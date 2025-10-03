import {api} from './api';
import type { CartItem, AddCartItemData, EditCartItemData } from '../types';

export const cartAPI = {
    getCartItems: async(userId: number): Promise<CartItem[]> =>{
        const response = await api.get('/cartItems');
        const allItems: CartItem[] = response.data;
        return allItems.filter(item => item.userId === userId);
    },
    addCartItem: async(userId: number, itemData: AddCartItemData): Promise<CartItem>=>{
        const newItem: CartItem = {
            id: Date.now(),
            userId,
            ...itemData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        const response = await api.post('/cartItems', newItem);
        return response.data;
    },
    updateCartItem: async(itemId: number, itemData: EditCartItemData): Promise<CartItem>=>{
        const updatedItem ={
            ...itemData,
            updatedAt: new Date().toISOString(),
        };
        const response = await api.patch(`/cartItems/${itemId}`, updatedItem);
        return response.data;
    },
    deleteCartItem: async (itemId: number): Promise<void>=>{
        await api.delete(`/cartItems/${itemId}`);
    },
    getCartItem: async(itemId: number): Promise<CartItem>=>{
        const response = await api.get(`/cartItems/${itemId}`);
        return response.data;
    },
};

