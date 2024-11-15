import { TransactionInterface } from "./types";

export const transactions: TransactionInterface[] = [
    {
        id: "1",
        amount: 1000000,
        type: "Income",
        date: new Date().toISOString(),
        category: "Investment"
    },
    {
        id: "2",
        amount: 500000,
        type: "Expense",
        date: new Date().toISOString(),
        category: "Food & Beverages"
    },
    {
        id: "3",
        amount: 500000,
        type: "Expense",
        date: new Date().toISOString(),
        category: "Food & Beverages"
    },
];