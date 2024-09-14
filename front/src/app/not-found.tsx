import React from 'react';
import Link from 'next/link';

const NotFound: React.FC = () => {
    return (
        <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-yellow mb-6">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Página no encontrada</h2>
        <p className="text-lg mb-8">Lo sentimos, la página que buscas no existe o ha sido movida.</p>
        <Link href="/">
            <p className="bg-yellow text-black py-3 px-6 rounded-lg hover:bg-white hover:text-black transition">
            Volver al Inicio
            </p>
        </Link>
        </div>
    );
};

export default NotFound;

