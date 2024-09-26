"use client"
import Card from "@/components/Card/Card";
import React, { useEffect, useState } from "react";
import { Product } from "@/interface/Product";


  
const Home: React.FC = () => {
    const [products, setProducts] = useState<Product[]>(typeof window !== "undefined" 
      ? JSON.parse(localStorage.getItem("products") || "[]" ) : []);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [minPrice, setMinPrice] = useState<number | null>(null);
    const [maxPrice, setMaxPrice] = useState<number | null>(null);
    const [inStockOnly, setInStockOnly] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    
  
    // Función para obtener los productos desde la API
    const fetchProducts = async () => {
      try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
          
          if (!response.ok) {
          throw new Error('Error al obtener los productos');
      }
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
      } catch (error) {
          setError('No se pudieron cargar los productos. Inténtalo de nuevo más tarde.');
          
      }
  };

  // Función para manejar el cambio en los filtros
  const handleSearch = () => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();

    const filtered = products.filter((product) => {
      // Filtrar por nombre o descripción
      const matchesSearchTerm =
        product.name.toLowerCase().includes(lowercasedSearchTerm) ||
        product.description.toLowerCase().includes(lowercasedSearchTerm);

      // Filtrar por precio mínimo y máximo
      const matchesPrice =
        (minPrice === null || product.price >= minPrice) &&
        (maxPrice === null || product.price <= maxPrice);

      // Filtrar por stock
      const matchesStock = inStockOnly ? product.stock > 0 : true;

      return matchesSearchTerm && matchesPrice && matchesStock;
    });

    setFilteredProducts(filtered);
  };

  // Usar useEffect para obtener los productos al montar el componente
  useEffect(() => {
    fetchProducts();
  }, []);

  // Usar useEffect para filtrar los productos cada vez que cambie algún filtro
  useEffect(() => {
    handleSearch();
  }, [searchTerm, minPrice, maxPrice, inStockOnly]);

  return (
    <div className="bg-black text-white min-h-screen">
      <header className="bg-yellow text-black py-6">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold font-sans">Bienvenido a Mi Aplicación</h1>
          <p className="text mt-1 font-sans h-4">La mejor experiencia para tus compras online.</p>
        </div>
      </header>

      {/* Barra de búsqueda */}
      <div className="container mx-auto px-4 mt-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar productos..."
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        {/* Filtros adicionales */}
        <div className="flex gap-4 mb-4">
          <div>
            <label htmlFor="minPrice" className="block">Precio mínimo</label>
            <input
              id="minPrice"
              type="number"
              value={minPrice || ""}
              onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : null)}
              placeholder="Min"
              className="w-full p-2 border border-gray-300 rounded-md text-black"
            />
          </div>

          <div>
            <label htmlFor="maxPrice" className="block">Precio máximo</label>
            <input
              id="maxPrice"
              type="number"
              value={maxPrice || ""}
              onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : null)}
              placeholder="Max"
              className="w-full p-2 border border-gray-300 rounded-md text-black"
            />
          </div>

          <div className="flex items-center">
            <input
              id="inStockOnly"
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="inStockOnly" className="block">Solo productos en stock</label>
          </div>
        </div>
      </div>

      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-5">
          {filteredProducts.map((product) => (
            <Card
            key={product.id} 
            product={product}
          />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
