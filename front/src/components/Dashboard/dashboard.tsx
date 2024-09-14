"use client";
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const Dashboard = () => {
    const { user, purchases, setUser } = useAuth(); // Obtén los datos del usuario desde el contexto
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isOrdersOpen, setIsOrdersOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: "",
        phone: " ",
    });
    // Cargar los datos del usuario al montar el componente
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                address: user.address ? String(user.address) : '',
                phone: user.phone ? String(user.phone) : '',
            });
        }
    }, [user]);

    

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
        setIsOrdersOpen(false);
    };

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

const handleUpdate = async () => {
try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/users" || `http://localhost:3000/users`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.token}`, // Asegúrate de enviar el token para autenticar la solicitud
    },
    body: JSON.stringify(formData),
    });

    if (response.ok) {
    const updatedUser = await response.json();
    setUser(updatedUser); // Actualiza el estado del usuario en el contexto
    alert('Datos actualizados correctamente');
    } else {
    alert('Error al actualizar los datos');
    }
} catch (error) {
    console.error('Error al actualizar:', error);
}
};



return (
<div className="flex h-screen bg-gray-100">
    {/* Sidebar */}
    <div className="w-64 bg-yellow text-white flex flex-col">
    <div className="p-4 text-2xl font-bold border-b border-black">
        Dashboard
    </div>
    <nav className="flex flex-col p-4 space-y-4">
        <button
        onClick={toggleProfile}
        className={`text-left w-full py-2 px-4 rounded-lg hover:bg-white hover:text-black
            ${isProfileOpen ? 'bg-black' : ''}`
        }
        >
        Perfil
        </button>
        <Link href={"/user/compras"}>
        <button
        className={`text-left w-full py-2 px-4 rounded-lg hover:bg-white hover:text-black
            ${isOrdersOpen ? 'bg-black' : ''}`
        }
        >
        Mis Compras
        </button>
        </Link>
        
        {/* <button className="text-left w-full py-2 px-4 rounded-lg hover:bg-gray-700">
        Ajustes
        </button> */}
    </nav>
    </div>

    {/* Main Content */}
    <div className="flex-1 p-8 overflow-y-auto">
    <h1 className="text-3xl font-semibold mb-4">Bienvenido a tu Dashboard</h1>
    <div>
        {isProfileOpen && (
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-2xl mb-4 font-bold">Actualizar Perfil</h2>
            <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                Nombre
                </label>
                <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                Correo
                </label>
                <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                Dirección
                </label>
                <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                Teléfono
                </label>
                <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                />
            </div>

            <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
                Actualizar Datos
            </button>
            </form>
        </div>
        )}
    </div>
    </div>
</div>
);
};

export default Dashboard;
