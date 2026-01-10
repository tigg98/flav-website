import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET - Fetch user balance and transactions
export async function GET() {
    try {
        const supabase = await createClient()

        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Get current balance
        const { data: balanceData, error: balanceError } = await supabase
            .from('advertiser_balances')
            .select('balance, currency, updated_at')
            .eq('id', user.id)
            .single()

        // If no balance record exists, create one
        let balance = 0
        let currency = 'USD'

        if (balanceError && balanceError.code === 'PGRST116') {
            // No record found, insert one
            const { error: insertError } = await supabase
                .from('advertiser_balances')
                .insert({ id: user.id, balance: 0, currency: 'USD' })

            if (insertError) {
                console.error('Error creating balance record:', insertError)
            }
        } else if (balanceData) {
            balance = parseFloat(balanceData.balance) || 0
            currency = balanceData.currency || 'USD'
        }

        // Get recent transactions
        const { data: transactions, error: txError } = await supabase
            .from('billing_transactions')
            .select('id, created_at, amount, type, description, balance_after, reference_id')
            .eq('advertiser_id', user.id)
            .order('created_at', { ascending: false })
            .limit(50)

        if (txError) {
            console.error('Error fetching transactions:', txError)
        }

        return NextResponse.json({
            balance,
            currency,
            transactions: transactions || []
        })
    } catch (error) {
        console.error('Billing GET error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

// POST - Add funds to account
export async function POST(request: Request) {
    try {
        const supabase = await createClient()

        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { amount, payment_method_id } = body

        // Validate amount
        if (!amount || typeof amount !== 'number' || amount < 10) {
            return NextResponse.json({
                error: 'Invalid amount. Minimum deposit is $10.'
            }, { status: 400 })
        }

        if (amount > 10000) {
            return NextResponse.json({
                error: 'Maximum single deposit is $10,000. Contact support for larger deposits.'
            }, { status: 400 })
        }

        // In production, this is where you'd integrate Stripe:
        // 1. Create a PaymentIntent or charge the payment_method_id
        // 2. Only add funds after successful payment
        // For now, we'll simulate the payment and directly add funds

        // Generate a mock payment reference (in production, this would be Stripe's payment ID)
        const paymentReference = `sim_${Date.now()}_${Math.random().toString(36).substring(7)}`

        // Use the database function to atomically add funds
        const { data: result, error: rpcError } = await supabase.rpc('add_funds', {
            p_user_id: user.id,
            p_amount: amount,
            p_description: `Added $${amount.toFixed(2)} to account`,
            p_reference_id: paymentReference
        })

        if (rpcError) {
            console.error('RPC error:', rpcError)
            return NextResponse.json({
                error: 'Failed to process payment. Please try again.'
            }, { status: 500 })
        }

        // Check if the function returned an error
        if (!result.success) {
            return NextResponse.json({
                error: result.error || 'Failed to add funds'
            }, { status: 400 })
        }

        return NextResponse.json({
            success: true,
            transaction_id: result.transaction_id,
            balance_before: result.balance_before,
            balance_after: result.balance_after,
            amount,
            message: `Successfully added $${amount.toFixed(2)} to your account`
        })
    } catch (error) {
        console.error('Billing POST error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
