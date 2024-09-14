"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';


interface CartItem {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    quantity: number;
}

interface CartContextProps {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
    createOrder: () => void; // Nueva función para crear la orden
    updateCartItemQuantity: (productId: number, quantity: number) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const {user} = useAuth();


    const addToCart = (item: CartItem) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((i) => i.id === item.id);
    
            if (existingItem) {
                // Si el producto ya está en el carrito, actualiza la cantidad sumando la nueva
                return prevItems.map((i) =>
                    i.id === item.id
                        ? { ...i, quantity: i.quantity + item.quantity } // Sumar la cantidad seleccionada por el usuario
                        : i
                );
            } else {
                // Si es un nuevo producto, simplemente agrégalo
                return [...prevItems, item];
            }
        });
    };
    console.log("carrito", cartItems);
            

    const updateCartItemQuantity = (productId: number, quantity: number) => {
        setCartItems((prevItems) => 
            prevItems.map((item) =>
                item.id === productId
                    ? { ...item, quantity: quantity }
                    : item
            )
        );
    };

    const removeFromCart = (productId: number) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.id !== productId)
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const createOrder = async () => {
        
        if (cartItems.length === 0) {
            alert("El carrito está vacío. Agrega productos antes de crear una orden.");
            return;
        }
    
        const orderData = {
            userId: (user?.id), // Asegúrate de que `user.id` es un número, si es un string, conviértelo.
            products: cartItems.map(item => item.id) // Solo los IDs de los productos
            
        };
        

    
        try {
            
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/orders" || 'http://localhost:3000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.token}`, // Incluye el token en el header
                    
                },
                body: JSON.stringify(orderData),
            });
            
            console.log("Hola",orderData);
            console.log("token", localStorage.token);
            
            
        
            if (!response.ok) {
                throw new Error('Error al crear la orden');
            }
        
            const data = await response.json();
            alert('Orden creada exitosamente!');
            clearCart(); // Limpiar el carrito después de crear la orden
            } catch (error) {
            console.error('Error al crear la orden:');
            
            }
        };




    return (
        <CartContext.Provider value={{ cartItems, removeFromCart, clearCart, updateCartItemQuantity, createOrder, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextProps => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
