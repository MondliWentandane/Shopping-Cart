export interface User{
    id: number;
    email: string;
    password: string;
    name: string;
    surname: string;
    cellNumber: string;
    createdAt: string;
}

export interface RegisterData{
    email: string;
    password: string;
    name: string;
    surname: string;
    cellNumber: string;
}
export interface LoginData{
    email:string;
    password: string;
}
export interface UserProfile{
    id: number;
    email: string;
    name: string;
    surname: string;
    cellNumber: string;
    createdAt: string;
}

export interface CartItem{
    id: number;
    userId: number;
    name: string;
    quantity: number;
    notes?: string;
    category: string;
    itemImage: string;
    price: number;
    createdAt: string;
    updatedAt: string;
}

export interface AddCartItemData{
    name: string;
    quantity: number;
    notes?: string;
    category: string;
    itemImage: string;
    price: number;
}

export interface EditCartItemData{
    name?: string;
    quantity?: number;
    notes?: string;
    category?: string;
    itemImage?: string;
    price?: string;
}

export interface AuthState{
    user: UserProfile | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

export interface CartState{
    items: CartItem[];
    isLoading: boolean;
    error: string | null;
}