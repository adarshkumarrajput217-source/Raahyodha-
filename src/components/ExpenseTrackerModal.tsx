import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Receipt, Plus, Coffee, Wrench, Fuel, FileText, MoreHorizontal, IndianRupee, Wallet, Calendar, ArrowDownRight } from 'lucide-react';

interface ExpenseTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ExpenseCategory = 'Fuel' | 'Food' | 'Repair' | 'Toll' | 'Challan' | 'Other';

interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  note: string;
  date: string;
}

const CATEGORY_ICONS: Record<ExpenseCategory, React.ReactNode> = {
  Fuel: <Fuel size={16} className="text-blue-500" />,
  Food: <Coffee size={16} className="text-orange-500" />,
  Repair: <Wrench size={16} className="text-slate-500" />,
  Toll: <FileText size={16} className="text-green-500" />,
  Challan: <Receipt size={16} className="text-red-500" />,
  Other: <MoreHorizontal size={16} className="text-purple-500" />,
};

export const ExpenseTrackerModal: React.FC<ExpenseTrackerModalProps> = ({ isOpen, onClose }) => {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', amount: 4500, category: 'Fuel', note: 'Diesel at HP Pump, Surat', date: new Date().toISOString() },
    { id: '2', amount: 350, category: 'Food', note: 'Dinner at Sher-e-Punjab', date: new Date(Date.now() - 86400000).toISOString() },
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('Food');
  const [note, setNote] = useState('');

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;

    const newExpense: Expense = {
      id: Date.now().toString(),
      amount: Number(amount),
      category,
      note,
      date: new Date().toISOString(),
    };

    setExpenses([newExpense, ...expenses]);
    setAmount('');
    setNote('');
    setShowAddForm(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-slate-50 w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-indigo-600 p-4 flex justify-between items-center text-white sticky top-0 z-10 shadow-md">
          <div className="flex items-center">
            <Wallet size={20} className="mr-2" />
            <h2 className="font-bold text-lg">Kharcha Diary (Expenses)</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1">
          {/* Total Summary Card */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Total Trip Expenses</p>
              <div className="text-3xl font-bold text-slate-900 flex items-center">
                <IndianRupee size={24} className="mr-1 text-slate-700" />
                {totalExpenses.toLocaleString('en-IN')}
              </div>
            </div>
            <div className="bg-indigo-50 p-3 rounded-xl">
              <ArrowDownRight size={24} className="text-indigo-600" />
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800">Recent Expenses</h3>
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-3 py-1.5 rounded-full text-xs font-bold flex items-center transition"
            >
              {showAddForm ? <X size={14} className="mr-1" /> : <Plus size={14} className="mr-1" />}
              {showAddForm ? 'Cancel' : 'Add New'}
            </button>
          </div>

          <AnimatePresence>
            {showAddForm && (
              <motion.form 
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="bg-white p-4 rounded-2xl border border-indigo-100 shadow-sm overflow-hidden"
                onSubmit={handleAddExpense}
              >
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Amount (₹)</label>
                    <div className="relative">
                      <IndianRupee size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="number" 
                        required
                        min="1"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="e.g. 500"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Category</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Fuel', 'Food', 'Repair', 'Toll', 'Challan', 'Other'] as ExpenseCategory[]).map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setCategory(cat)}
                          className={`py-2 px-1 rounded-lg text-xs font-medium flex flex-col items-center justify-center border transition ${
                            category === cat 
                              ? 'bg-indigo-50 border-indigo-500 text-indigo-700' 
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <div className="mb-1">{CATEGORY_ICONS[cat]}</div>
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Note (Optional)</label>
                    <input 
                      type="text" 
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="e.g. Toll at Jaipur highway"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center shadow-md shadow-indigo-600/20 mt-2"
                  >
                    Save Expense
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Expense List */}
          <div className="space-y-3">
            {expenses.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-sm bg-white rounded-2xl border border-slate-200">
                No expenses recorded yet.
              </div>
            ) : (
              expenses.map((expense) => (
                <div key={expense.id} className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 mr-3">
                      {CATEGORY_ICONS[expense.category]}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{expense.category}</h4>
                      <p className="text-xs text-slate-500 truncate max-w-[180px]">
                        {expense.note || 'No details'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block font-bold text-slate-900">₹{expense.amount.toLocaleString('en-IN')}</span>
                    <span className="text-[10px] text-slate-400 flex items-center justify-end mt-0.5">
                      <Calendar size={10} className="mr-1" />
                      {new Date(expense.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
