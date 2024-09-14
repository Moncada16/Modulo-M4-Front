"use client";
import { useAuth } from '@/context/AuthContext';
import React from 'react';



const OrdersPage = () => {
    const { purchases, user } = useAuth();

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <p className="text-lg font-semibold text-red-500">
                    Debes iniciar sesión para ver tus órdenes.
                </p>
            </div>
        );
    }

    if (purchases.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <p className="text-lg font-semibold text-gray-500">
                    No tienes órdenes realizadas.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Órdenes de {user.name}
            </h2>
            <ul className="space-y-6">
                {purchases.map((order) => (
                    <li key={order.id} className="bg-white shadow-md rounded-lg p-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold text-gray-700">
                                Orden #{order.id}
                            </h3>
                            <span
                                className={`text-sm font-medium py-1 px-3 rounded-full 
                                    ${order.status === 'approved' 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-yellow-100 text-yellow-800'}
                                `}
                            >
                                {order.status}
                            </span>
                        </div>
                        <p className="text-gray-600 mt-2">
                            Fecha: {new Date(order.date).toLocaleString()}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrdersPage;



;