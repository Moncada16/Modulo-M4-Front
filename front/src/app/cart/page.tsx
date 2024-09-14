"use client";
import { useCart } from "@/context/useCart";
import { useRouter } from "next/navigation";

const Cart: React.FC = () => {
    const { cartItems, removeFromCart, updateCartItemQuantity, createOrder, clearCart } = useCart();
    const router = useRouter();

    const handleIncreaseQuantity = (productId: number, stock: number, currentQuantity: number) => {
        if (currentQuantity < stock) {
            updateCartItemQuantity(productId, currentQuantity + 1);
        } else {
            alert('No hay suficiente stock para agregar más.');
        }
    };

    const handleDecreaseQuantity = (productId: number, currentQuantity: number) => {
        if (currentQuantity > 1) {
            updateCartItemQuantity(productId, currentQuantity - 1);
        } else {
            removeFromCart(productId);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-extrabold mb-4 text-center ">Carrito de Compras</h2>
            {cartItems.length === 0 ? (
                <p className="text-center font-extrabold text-black">NO HAY PRODUCTOS.</p>
            ) : (
                <>
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item.id} className="flex justify-between items-center pt-4">
                                <div className='border-solid bg-white shadow-2xl rounded-md w-6/12 m-auto'>
                                    <img className="size-36 m-auto object-contain" src={item.image} />
                                    <h3 className="text-xl font-semibold text-black text-center">{item.name}</h3>
                                    <p className='font-sans text-center text-amber-500'>Stock: <span className="text-black font-bold">{item.stock - item.quantity}</span></p>
                                    <p className='font-sans text-center text-amber-500'>Precio: <span className='text-black font-bold'>$ {item.price} </span></p>
                                    <div className="flex text-center m-3 justify-center">
                                        <button onClick={() => handleDecreaseQuantity(item.id, item.quantity)} className="px-2 py-1 bg-gray-500 rounded">-</button>
                                        <span className="px-4">{item.quantity}</span>
                                        <button onClick={() => handleIncreaseQuantity(item.id, item.stock, item.quantity)} className="px-2 py-1 bg-gray-500 rounded">+</button>
                                    </div>
                                    <div className='text-center m-3'>
                                        <button onClick={() => removeFromCart(item.id)} className="bg-red-500 shadow-lg shadow-amber-500/50 text-white py-3 px-6 rounded-lg object-center m-5">Eliminar</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between mt-4">
                        <button className="bg-yellow text-black py-2 px-4 rounded hover:bg-yellow" onClick={clearCart}>
                            Vaciar Carrito
                        </button>
                        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700" onClick={createOrder}>
                            Comprar
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;