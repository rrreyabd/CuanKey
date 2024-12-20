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
    label?: string;
    icon?: keyof typeof FontAwesome.glyphMap;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
}

export interface TextInputProps {
    placeholder: string;
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    className?: string;
}

export interface UserData {
    id?: number;
    fullname: string;
    email: string;
    phone_number: string;
    password?: string;
    token?: string;
    profile_picture?: string;
}

export interface UserWallet {
    id: number;
    name: string;
    initial_balance: number;
    total_income: number;
    total_expense: number;
    total_balance: number;
    is_active: number;
    transactions: any[];
    created_at: string;
    user: UserData;
}

export interface AuthContextProps {
    isAuthenticated: boolean;
    loading: boolean;
    user: UserData | null;
    login: (token: string, userData: UserData) => Promise<void>;
    logout: () => Promise<void>;
    setUserData: (userData: UserData) => void;
    fetchUserData: () => Promise<UserData>;
    handleDeleteAccount: () => Promise<void>;
    handleLogout: () => Promise<void>;
}

export interface ButtonProps {
    title: string;
    onPress: () => void;
    className?: string;
    textClassName?: string;
    disabled?: boolean;
}

export interface DropdownProps {
    onValueChange: (value: string | null) => void;
    transactionType?: string;
    defaultValue?: string | null;
}

export interface UserTransactionProps {
    id: number;
    wallet: {
        name: string;
        initial_balance: number;
        total_income: number;
        total_expense: number;
        total_balance: number;
        is_active: number;
    };
    category: Category;
    amount: number;
    description: string;
    transaction_date: string;
    user: UserData
}

export interface WalletItem {
    label: string;
    value: string;
};

export interface ProfilePicture {
    id: string;
    uri: string;
}

export interface Category {
    id: string;
    name: string;
    icon: string;
    description: string;
    total_transaction: number;
    budget: number;
    type: "Pengeluaran" | "Pemasukan";
    user: UserData;
}

export interface Transaction {
    category: string;
    transaction_type: string;
    date: string;
    description: string | null;
    amount: number;
}

export interface WalletResponse {
    id: number;
    name: string;
    initial_balance: number;
    total_income: number;
    total_expense: number;
    total_balance: number;
    is_active: number;
    transactions: Transaction[];
    user: UserData;
}

export interface RecurringInterface {
    id: number;
    user: UserData;
    wallet: WalletItem;
    category: Category;
    amount: number;
    is_active: number;
    description: string;
  }