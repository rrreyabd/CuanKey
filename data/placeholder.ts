import { ProfilePicture, TransactionInterface } from "./types";

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
    {
        id: "4",
        amount: 500000,
        type: "Expense",
        date: new Date().toISOString(),
        category: "Food & Beverages"
    },
    {
        id: "5",
        amount: 500000,
        type: "Expense",
        date: new Date().toISOString(),
        category: "Food & Beverages"
    },
    {
        id: "6",
        amount: 500000,
        type: "Expense",
        date: new Date().toISOString(),
        category: "Food & Beverages"
    },
    {
        id: "7",
        amount: 500000,
        type: "Expense",
        date: new Date().toISOString(),
        category: "Food & Beverages"
    },
    {
        id: "8",
        amount: 500000,
        type: "Expense",
        date: new Date().toISOString(),
        category: "Food & Beverages"
    },
    {
        id: "9",
        amount: 500000,
        type: "Expense",
        date: new Date().toISOString(),
        category: "Food & Beverages"
    },
    {
        id: "10",
        amount: 500000,
        type: "Expense",
        date: new Date().toISOString(),
        category: "Food & Beverages"
    }
];

export const profilePicture: ProfilePicture[] = [
    {
        id: "1",
        uri: require("@/assets/profile/character_1.png")
    },
    {
        id: "2",
        uri: require("@/assets/profile/character_2.png")
    },
    {
        id: "3",
        uri: require("@/assets/profile/character_3.png")
    },
    {
        id: "4",
        uri: require("@/assets/profile/character_4.png")
    },
    {
        id: "5",
        uri: require("@/assets/profile/character_5.png")
    },
    {
        id: "6",
        uri: require("@/assets/profile/character_6.png")
    },
    {
        id: "7",
        uri: require("@/assets/profile/character_7.png")
    },
    {
        id: "8",
        uri: require("@/assets/profile/character_8.png")
    },

]