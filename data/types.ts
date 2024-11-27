import FontAwesome from "@expo/vector-icons/FontAwesome";

export interface TransactionInterface {
    id: string;
    type: string;
    amount: number;
    date: string;
    category: string;
}

export interface AuthTextInputProps {
    placeholder: string;
    icon: keyof typeof FontAwesome.glyphMap;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
}

export interface UserData {
    fullname: string;
    email: string;
    phone_number: string;
    password?: string;
}

export interface UserWallet {
    id: number;
    name: string;
    initial_balance: number;
    total_income: number;
    total_outcome: number;
    total_balance: number;
    is_active: number;
    transactions: any[];
    user: UserData;
  }