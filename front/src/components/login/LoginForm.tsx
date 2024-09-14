"use client";

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; // Importa el contexto de autenticación
import { useRouter } from 'next/navigation';

interface LoginFormState {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const { login } = useAuth(); // Usa el hook de autenticación para acceder al contexto
    const router = useRouter();
    const [formData, setFormData] = useState<LoginFormState>({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<Partial<LoginFormState>>({});
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const validate = () => {
        const newErrors: Partial<LoginFormState> = {};

        if (!formData.email) {
            newErrors.email = 'El correo electrónico es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'El correo electrónico no es válido';
        }

        if (!formData.password) {
            newErrors.password = 'La contraseña es requerida';
        } else if (formData.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        return newErrors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        } else {
            setErrors({});
        }

        try {
            // Realizar la petición POST al backend para iniciar sesión
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login" || "http://localhost:3000/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                
                const loggedUser = {
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                    orders: data.user.orders, // Guardar las ordenes
                };
                setFormData(data);
                // Usa la función login del contexto de autenticación
                login(data.user); // Asegúrate de que data.user contiene los datos necesarios
                localStorage.setItem('token', data.token);
                setMessage("Inicio de sesión exitoso");
                setError(null);
                setFormData({
                    email: '',
                    password: '',
                });
                router.push('/')
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Error al iniciar sesión");
            }
            
        } catch (err) {
            setError("Error al realizar la solicitud. Por favor, inténtalo de nuevo más tarde.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form 
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm" 
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-semibold mb-6 text-center text-black">Iniciar Sesión</h2>
                
                {message && <p className="text-green-500 text-center mb-4">{message}</p>}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                        placeholder="Tu correo electrónico"
                        required
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                        placeholder="Tu contraseña"
                        required
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
                
                <button
                    type="submit"
                    className="w-full bg-yellow text-black py-2 px-4 rounded-lg hover:bg-amber-500 transition"
                >
                    Iniciar Sesión
                </button>
                <button className="rounded-md mt-4  flex items-center border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                <img
                    src="https://docs.material-tailwind.com/icons/google.svg"
                    alt="Google"
                    className="h-5 w-5 mr-2"
                />
                Continue with Google
</button>

            </form>
        </div>
    );
};

export default LoginPage;
