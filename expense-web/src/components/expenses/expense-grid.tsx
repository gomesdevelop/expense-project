"use client";

import { useExpense } from "@/contexts/expenses";
import React, { useEffect } from "react";

const ExpenseGrid: React.FC = () => {
  const { expenses, loadExpenses } = useExpense();

  useEffect(() => {
    loadExpenses();
  }, []);

  return (
    <div>
      {expenses.map((expense) => (
        <div key={expense.id}>{expense.description}</div>
      ))}
    </div>
  );
};

export default ExpenseGrid;
