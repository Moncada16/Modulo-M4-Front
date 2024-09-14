"use client";
import React, { useState } from'react';

interface RegisterFormState {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState<RegisterFormState>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
});

const [errors, setErrors] = useState<Partial<RegisterFormState>>({});
const [message, setMessage] = useState<string | null>(null);
const [error, setError] = useState<string | null>(null);

const validate = () => {
    const newErrors: Partial<RegisterFormState> = {};

    if (!formData.name) {
        newErrors.name = 'El nombre es requerido';
    }

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

    if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'La confirmación de contraseña es requerida';
    } else if (formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
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
        // Realizar la petición POST al backend
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/register" || "http://localhost:3000/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                password: formData.password
            }),
        });

        if (response.ok) {
            const data = await response.json();
            setMessage("Registro exitoso");
            setError(null); // Limpiar errores previos
            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        } else {
            const errorData = await response.json();
            setError(errorData.message || "Error al registrarse");
        }
    } catch (err) {
        setError("Error al realizar la solicitud. Por favor, inténtalo de nuevo más tarde.");
    }
};


return (<>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form 
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm" 
        onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-6 text-center">Registro de Usuario</h2>
        <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Nombre
            </label>
        <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
            placeholder="Tu nombre completo"
            required
        />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
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
        <div className="mb-4"><label htmlFor="password" className="block text-gray-700 font-medium mb-2">
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
        <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
            Confirmar Contraseña
        </label>
        <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
            placeholder="Confirma tu contraseña"
            required
        />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>
        <button
            type="submit"
            className="w-full bg-yellow text-black py-2 px-4 rounded-lg hover:bg-amber-500 transition">
        Registrarse
        </button>
        </form>
        </div>
</>
);
};

export default RegisterPage;
