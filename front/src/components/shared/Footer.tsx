import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-black text-white py-6">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-semibold text-yellow">Mi Aplicación</h3>
                <p className="text-gray-400">© 2024 Todos los derechos reservados.</p>
            </div>
            <div className="flex space-x-6">
                <a href="/" className="text-yellow hover:text-white transition">Home</a>
                <a href="/cart" className="text-yellow hover:text-white transition">Cart</a>
                <a href="/user/dashboard" className="text-yellow hover:text-white transition">Profile</a>
            </div>
            </div>
            <div className="mt-6 text-center text-gray-500">
            <p>Sigue nuestras redes sociales:</p>
            <div className="flex justify-center space-x-6 mt-2">
                
                <a href="/" className="text-yellow hover:text-white transition ">
                Facebook
                </a>
                <a href="/" className="text-yellow hover:text-white transition">
                Twitter
                </a>
                <a href="/" className="text-yellow hover:text-white transition ">
                Instagram
                </a>
            </div>
            </div>
        </div>
        </footer>
    );
};

export default Footer;

