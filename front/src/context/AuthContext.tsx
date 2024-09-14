"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define la interfaz para el contexto de autenticación
interface User {
    id: number;
    name: string
    email: string
    password: string
    address: number
    phone: number
    token: string
    orders:Purchase[]
}

interface Purchase {
    id: number;
    status: string;
    date: string;
    userId: number;
    // products: number[];
    // productName: string;
    // price: number;
    // stock: number;
    
    
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    setUser: (user: User) => void; // Añadir setUser para actualizar el usuario
    purchases: Purchase[]; // Añadir compras al contexto
    login: (userData: User) => void;  // Añadir una función para iniciar sesión
    logout: () => void;  // Añadir una función para cerrar sesión
}

// Crear el contexto de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor del contexto de autenticación
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [purchases, setPurchases] = useState<Purchase[]>([]); // Estado para almacenar las compras

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setPurchases(parsedUser.orders || []); // Cargar las compras si existen
            setIsAuthenticated(true);
        }
    }, []);

    const login = (userData: User) => {
        setIsAuthenticated(true);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));  // Persistir el usuario
        setPurchases(userData.orders || []);  // Obtener las órdenes desde el userData
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        setPurchases([]);  // Limpiar compras al cerrar sesión
        localStorage.removeItem('user');  // Remover el usuario persistido
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, purchases, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};