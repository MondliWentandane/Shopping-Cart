import { api } from './api';
import type { LoginData, RegisterData, User, UserProfile } from '../types';

const generateToken = (user: User): string=> {
    return btoa(JSON.stringify({userId: user.id, email: user.email}));}

export const authAPI = {
    register: async (userData: RegisterData): Promise<{user: UserProfile; token: string}> =>{
        const response = await api.get('/users');
        const users: User[] = response.data;

        const existingUser = users.find(user => user.email === userData.email);
        if(existingUser){ throw new Error('User with this email already exist')};

        const newUser: User = {
            id: Date.now(),
            ...userData,
            createdAt: new Date().toISOString(),
        };

        await api.post('/users', newUser)

        const token = generateToken(newUser);
        const userProfile: UserProfile = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        surname: newUser.surname,
        cellNumber: newUser.cellNumber,
        createdAt: newUser.createdAt,
        };       
        
        return { user: userProfile, token }; 
    },

    login: async (loginData: LoginData): Promise<{ user: UserProfile; token: string }> => {
        const response = await api.get('/users');
        const users: User[] = response.data;

        const user = users.find(u => u.email === loginData.email && u.password === loginData.password);
        if (!user) { throw new Error('Invalid email or password');}

        const token = generateToken(user);
        const userProfile: UserProfile = {
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname,
        cellNumber: user.cellNumber,
        createdAt: user.createdAt,
        };
        return { user: userProfile, token };
    },

        getProfile: async (userId: number): Promise<UserProfile> => {
        const response = await api.get(`/users/${userId}`);
        const user: User = response.data;
        
        return {
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname,
        cellNumber: user.cellNumber,
        createdAt: user.createdAt,
        };
    },

      updateProfile: async (userId: number, userData: Partial<RegisterData>): Promise<UserProfile> => {
        const response = await api.patch(`/users/${userId}`, userData);
        const user: User = response.data;
        
        return {
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname,
        cellNumber: user.cellNumber,
        createdAt: user.createdAt,
        };
    },


}