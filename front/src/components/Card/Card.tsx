import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/useCart";
import { Product } from "@/interface/Product";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CardProps {
    product: Product;
}

const Card: React.FC<CardProps> = ({ product }) => {
    const { id, name, description, price, stock, image } = product;
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const { addToCart, cartItems } = useCart();
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            alert('Debes iniciar sesión para agregar productos al carrito.');
            router.push('/login');
            return;
        }

        if (quantity > stock) {
            alert('No hay suficiente stock para agregar esta cantidad.');
        } else {
            // Agregar el producto al carrito con la cantidad especificada
            addToCart({ 
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                image: product.image,
                quantity: quantity, 
                stock: product.stock 
            });
            alert("producto Agregado");
        }
    };

    const handleIncreaseQuantity = () => {
        if (quantity < stock) {
            setQuantity(quantity + 1);
        }
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer place-content-center">
            <Link href={`/product/${product.id}`}>
                <img className="w-full h-48 content-center object-contain" src={product.image} />
            </Link>
            <div className="p-4">
                <h3 className="text-lg font-bold text-black text-center">{product.name}</h3>
                <p className="text-gray-600 md:font-sans">{product.description}</p>
                <p className="text-black font-bold m-2">$ <span className="text-yellow"> {product.price}</span></p>
                <p className="text-gray-600 font-bold m-2">Stock: <span>{product.stock - quantity}</span></p>
                <div className='flex justify-center'>
                    <button className='text-black m-1' onClick={handleDecreaseQuantity}>➖</button>
                    <span className='text-black m-1 '>{quantity} </span>
                    <button className='text-black m-1' onClick={handleIncreaseQuantity}>➕</button>
                </div>
            </div>
            <div className="flex justify-between mt-4 m-4">
                <Link href={`/product/${product.id}`}>
                    <button className="bg-yellow text-black py-2 px-4 rounded hover:bg-black hover:text-white transition">
                        Ver Productos
                    </button>
                </Link>
                <button  className="bg-yellow text-black py-2 px-4 rounded-lg hover:bg-black hover:text-white transition"
                    onClick={handleAddToCart}
                    >Agregar al carrito
                    
                </button>
            </div>
        </div>
    );
};

export default Card