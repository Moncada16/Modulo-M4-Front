"use client"
import Card from "@/components/Card/Card";
import React, { useEffect, useState } from "react";
import { Product } from "@/interface/Product";


  
const Home: React.FC = () => {
    const [products, setProducts] = useState<Product[]>(typeof window !== "undefined" 
      ? JSON.parse(localStorage.getItem("products") || "[]" ) : []);
    const [error, setError] = useState<string | null>(null);

    
  
    // Función para obtener los productos desde la API
  const fetchProducts = async () => {
      try {
          const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/products" || 'http://localhost:3000/products');
          if (!response.ok) {
          throw new Error('Error al obtener los productos');
      }
      const data = await response.json();
      setProducts(data);
      } catch (error) {
          setError('No se pudieron cargar los productos. Inténtalo de nuevo más tarde.');
          console.error('Error al obtener los productos:', error);
      }
  };
  
    // Usar useEffect para obtener los productos al montar el componente
  useEffect(() => {
      fetchProducts();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <header className="bg-yellow text-black py-6">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold font-sans">Bienvenido a Mi Aplicación</h1>
          <p className="text mt-1 font-sans h-4">La mejor experiencia para tus compras online.</p>
        </div>
      </header>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-5">
          {products.map((Product) => (
            <Card
              key={Product.id}
              product={Product}
            />
          ))}
        </div>
        
      )}

      </div>
  );
}

export default Home;
