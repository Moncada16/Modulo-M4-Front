// Definición de la interfaz para las imágenes del producto
interface ProductImage {
    url: string;
    alt: string;
}

  // Definición de la interfaz para la categoría del producto
interface ProductCategory {
    id: number;
    name: string;
}

  // Definición de la interfaz para el producto
interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: ProductCategory;
    images: ProductImage[];
}

  // Exportar las interfaces para que puedan ser utilizadas en otros archivos
export { Product, ProductCategory, ProductImage };