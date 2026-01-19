-- ============================================
-- SPEND DEDUCTION & LOW BALANCE SYSTEM
-- ============================================

-- Function to record ad spend (called when ad is served)
-- Deducts from advertiser balance and records transaction
CREATE OR REPLACE FUNCTION record_ad_spend(
    p_advertiser_id UUID,
    p_campaign_id UUID,
    p_ad_id UUID,
    p_amount NUMERIC,
    p_description TEXT DEFAULT 'Ad spend'
)
RETURNS JSON AS $$
DECLARE
    v_balance NUMERIC;
    v_new_balance NUMERIC;
    v_transaction_id UUID;
BEGIN
    -- Get current balance with lock
    SELECT balance INTO v_balance
    FROM advertiser_balances
    WHERE id = p_advertiser_id
    FOR UPDATE;
    
    IF v_balance IS NULL THEN
        RETURN json_build_object('success', false, 'error', 'No balance record found');
    END IF;
    
    IF v_balance < p_amount THEN
        RETURN json_build_object('success', false, 'error', 'Insufficient balance', 'balance', v_balance);
    END IF;
    
    -- Deduct from balance
    v_new_balance := v_balance - p_amount;
    
    UPDATE advertiser_balances
    SET balance = v_new_balance, updated_at = NOW()
    WHERE id = p_advertiser_id;
    
    -- Record transaction
    INSERT INTO billing_transactions (
        advertiser_id,
        type,
        amount,
        description,
        balance_after,
        reference_id
    ) VALUES (
        p_advertiser_id,
        'spend',
        -p_amount,
        p_description,
        v_new_balance,
        p_campaign_id::TEXT
    )
    RETURNING id INTO v_transaction_id;
    
    RETURN json_build_object(
        'success', true,
        'transaction_id', v_transaction_id,
        'amount_spent', p_amount,
        'balance_before', v_balance,
        'balance_after', v_new_balance
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get available balance (balance minus committed campaign budgets)
CREATE OR REPLACE FUNCTION get_available_balance(p_user_id UUID)
RETURNS JSON AS $$
DECLARE
    v_total_balance NUMERIC;
    v_committed_budget NUMERIC;
    v_available NUMERIC;
    v_low_balance_threshold NUMERIC := 50;
BEGIN
    -- Get total balance
    SELECT COALESCE(balance, 0) INTO v_total_balance
    FROM advertiser_balances
    WHERE id = p_user_id;
    
    -- Get committed budget from active/draft/paused campaigns
    SELECT COALESCE(SUM(budget_total), 0) INTO v_committed_budget
    FROM campaigns
    WHERE advertiser_id = p_user_id
    AND status IN ('draft', 'active', 'paused');
    
    v_available := GREATEST(v_total_balance - v_committed_budget, 0);
    
    RETURN json_build_object(
        'total_balance', v_total_balance,
        'committed_budget', v_committed_budget,
        'available_balance', v_available,
        'is_low_balance', v_total_balance < v_low_balance_threshold,
        'low_balance_threshold', v_low_balance_threshold
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-pause campaigns when balance is depleted
CREATE OR REPLACE FUNCTION check_campaign_budget_on_spend()
RETURNS TRIGGER AS $$
DECLARE
    v_balance NUMERIC;
    v_daily_budget NUMERIC;
BEGIN
    -- Only process spend events
    IF NEW.type = 'spend' THEN
        -- Get current balance
        SELECT balance INTO v_balance
        FROM advertiser_balances
        WHERE id = NEW.advertiser_id;
        
        -- If balance is zero or very low, pause all active campaigns
        IF v_balance <= 1 THEN
            UPDATE campaigns
            SET status = 'paused', updated_at = NOW()
            WHERE advertiser_id = NEW.advertiser_id
            AND status = 'active';
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger if billing_transactions table exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'billing_transactions') THEN
        DROP TRIGGER IF EXISTS on_billing_transaction ON billing_transactions;
        CREATE TRIGGER on_billing_transaction
            AFTER INSERT ON billing_transactions
            FOR EACH ROW EXECUTE FUNCTION check_campaign_budget_on_spend();
    END IF;
END $$;
