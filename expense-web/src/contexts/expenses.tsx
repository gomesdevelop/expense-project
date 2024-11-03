"use client";

import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

export type Expense = {
  id: string;
  amount: number;
  category: string;
  date: Date;
  description: string;
  status: string;
  attachments: string[];
};

type ExpenseContextProps = {
  expenses: Expense[];
  loadExpenses: () => Promise<void>;
};

const ExpenseContext = createContext<ExpenseContextProps>(
  {} as ExpenseContextProps
);

export const ExpenseProvider: FC<PropsWithChildren> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const loadExpenses = async () => {
    fetch(process.env.NEXT_PUBLIC_API_URL)
      .then((response) => response.json())
      .then((data) => {
        setExpenses((prevExpenses) => [...prevExpenses, ...data]);

        console.log(data);
        Promise.resolve();
      })
      .catch((error) => {
        console.log(error);
        Promise.reject();
      });
  };

  return (
    <ExpenseContext.Provider value={{ expenses, loadExpenses }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => useContext(ExpenseContext);
