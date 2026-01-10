import { ArrowDownLeft, ArrowUpRight, Clock } from "lucide-react";

const transactions = [
    { id: 1, type: 'payout', title: 'Weekly Payout', amount: 840.50, date: 'Mar 12, 2026', status: 'completed' },
    { id: 2, type: 'earning', title: 'Tip from Sarah J.', amount: 5.00, date: 'Mar 12, 2026', status: 'completed' },
    { id: 3, type: 'earning', title: 'Premium Sub: Mike T.', amount: 4.99, date: 'Mar 11, 2026', status: 'completed' },
    { id: 4, type: 'earning', title: 'Brand Deal: HexClad', amount: 500.00, date: 'Mar 10, 2026', status: 'pending' },
    { id: 5, type: 'payout', title: 'Weekly Payout', amount: 320.00, date: 'Mar 05, 2026', status: 'completed' },
];

export function TransactionsList() {
    return (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden transition-colors">
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
                <h3 className="font-bold text-neutral-900 dark:text-white">Recent Transactions</h3>
                <button className="text-sm text-neutral-500 hover:text-black dark:hover:text-white transition-colors">Filtered by: All</button>
            </div>
            <div>
                {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800 last:border-0 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'payout' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-500' :
                                    tx.status === 'pending' ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-500' : 'bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-500'
                                }`}>
                                {tx.type === 'payout' ? <ArrowUpRight className="w-5 h-5" /> :
                                    tx.status === 'pending' ? <Clock className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
                            </div>
                            <div>
                                <div className="font-medium text-neutral-900 dark:text-white">{tx.title}</div>
                                <div className="text-sm text-neutral-500">{tx.date}</div>
                            </div>
                        </div>
                        <div className={`font-bold ${tx.type === 'payout' ? 'text-neutral-900 dark:text-white' : 'text-emerald-600 dark:text-emerald-500'}`}>
                            {tx.type === 'payout' ? '-' : '+'}${tx.amount.toFixed(2)}
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-3 bg-neutral-50 dark:bg-neutral-900 text-center border-t border-neutral-200 dark:border-neutral-800">
                <button className="text-sm text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white font-medium transition-colors">View All Transactions</button>
            </div>
        </div>
    );
}
