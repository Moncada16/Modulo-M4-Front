// src/components/Navbar.tsx
"use client";
import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';  // Importa el hook personalizado para autenticación

const Navbar: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();  // Usa el hook para obtener el estado de autenticación y la función de logout

    return (
        <nav className="bg-black  p-4 flex justify-between items-center">
            <div className="text-white font-bold text-xl flex items-center">
                <img
                    className='border-collapse h-12 w-auto m-1 rounded-full'
                    src="https://img.freepik.com/vector-gratis/senal-detallada-clic-recogida_23-2148782062.jpg?t=st=1724446242~exp=1724449842~hmac=584111bdb3005b45f97ab4317285bcd5d2636d5b868a154de5433ba9d80ef31a&w=740"
                    alt="logo"
                />
                <Link href="/">
                        <p className="hover:text-yellow">Mi Aplicación</p>
                    </Link>
                
            </div>
            <ul className="flex space-x-6 text-white">
                <li>
                    <Link href="/">
                        <p className="className='border-collapse h-7 w-auto m-1 rounded-full hover:text-yellow '"
                        >Home</p>
                    </Link>
                </li>
                {isAuthenticated && (
                    <>
                        <li>
                            <Link href="/cart">
                            <p className="border-collapse h-7 w-auto m-1 rounded-full hover:text-yellow ">Cart</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/user/dashboard">
                            <p className='border-collapse h-7 w-auto m-1 rounded-full hover:text-yellow '
                                >Perfil</p>
                            
                            </Link>
                        </li>
                    </>
                )}
                {isAuthenticated ? (  // Renderizado condicional
                    <>
                        
                        <li>
                            <button onClick={logout} className="hover:text-yellow">
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link href="/login">
                                <p className='border-collapse h-7 w-auto m-1 rounded-full hover:text-yellow '
                                >Login</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/register">
                                <p className="hover:text-yellow">Register</p>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
