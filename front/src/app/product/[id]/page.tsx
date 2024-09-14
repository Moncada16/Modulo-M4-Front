'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

// Definición de la interfaz de producto
interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
}

const ProductDetailPage: React.FC = () => {
    const params = useParams();
    const { id } = params; // Obtener el ID del producto desde la URL
    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState<string | null>(null);

  // Función para obtener todos los productos desde la API
const fetchProducts = async () => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/products" || 'http://localhost:3000/products');
        if (!response.ok) {
            throw new Error('Error al obtener los productos');
        }
        const products: Product[] = await response.json();

      // Buscar el producto específico por ID
    const foundProduct = products.find((product) => product.id === Number(id));
    if (foundProduct) {
        setProduct(foundProduct);
    } else {
        setError('Producto no encontrado');
    }
    } catch (error) {
        setError('No se pudieron cargar los productos. Inténtalo de nuevo más tarde.');
        console.error('Error al obtener los productos:', error);
    }
};

  // Usar useEffect para obtener los productos al montar el componente
useEffect(() => {
    if (id) {
        fetchProducts();
    }
}, [id]);

if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
}

if (!product) {
    return <p className="text-center text-black">Cargando...</p>;
}

return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8 ">{product.name}</h1>
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-48 content-center object-contain" />
            <div className="p-4">
        <h2 className="text-lg font-bold text-black">{product.name}</h2>
        <p className="text-gray-600 md:font-sans">{product.description}</p>
        <p className="text-amber-500 font-bold m-2">$ {product.price}</p>
        <p className="text-black font-bold m-2">Stock: {product.stock}</p>
        </div>
    </div>
    </div>
);
};

export default ProductDetailPage;