import { FaPlus, FaMinus } from 'react-icons/fa';
import { BsGiftFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect } from 'react';
import { MainContext } from '../../Context';
import { BsCheckCircleFill } from 'react-icons/bs';
import { qtyHandler } from '../../redux/features/cartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const { fetchProducts, products, API_BASE_URL } = useContext(MainContext)
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user);
    console.log(user);

    function checkoutHandler() {
        if(user.data && user.user_token) {
            navigator("/checkout");
        }else{
            navigator("/login?ref=checkout");
            // alert("Please login to continue with checkout");
        }
    }

    function cartQtyHandler(payload) {
        dispatch(qtyHandler(payload));
    }

    useEffect(
        () => {
            fetchProducts();
        }, []
    )

    return (
        <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {cart?.items.map((item) => {
                        const product = products.find((p) => p._id === item.productId);
                        if (!product) {
                            return null;
                        } else {
                            return <div key={product._id} className="bg-white shadow rounded-lg flex p-4 gap-4">
                                <img src={`${API_BASE_URL}Images/Product/${product.thumbnail}`} alt={product.name} className="w-36 h-36 object-cover rounded" />

                                <div className="flex-1 flex flex-col justify-between">
                                    <div className='ml-3'>
                                        <h2 className="text-lg font-semibold">{product.name}</h2>
                                        <div className="text-red-500 font-bold text-xl my-1">${product.finalPrice.toFixed(2)}</div>
                                        
                                        {/* Quantity control */}
                                        <div className="flex items-center my-2 gap-2 bg-white-200 w-fit">
                                            <button onClick={() => {cartQtyHandler({productId: item.productId, type: 'dec', original_price: product.originalPrice , final_price: product.finalPrice})}}  className="p-1 bg-white rounded border"><FaMinus size={12} /></button>
                                            <span>{item.qty}</span>
                                            <button onClick={() => {cartQtyHandler({productId: item.productId, type: 'inc',original_price: product.originalPrice, final_price: product.finalPrice})}} className="p-1 bg-white rounded border"><FaPlus  size={12} /></button>
                                        </div>
                                        {/* Shipping & Stock */}
                                        <div className="flex flex-col sm:flex-col gap-2 mt-2 text-sm">
                                            <div className="text-green-600 font-medium">
                                                {/* {product.shipping} */}
                                                Free Shipping
                                            </div>
                                            {/* {product.stock && ( */}
                                            <div className="flex items-center gap-1 text-green-600">
                                                    <BsCheckCircleFill size={12} /> In stock
                                            </div>
                                            {/* )} */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    })}
                </div>

                {/* Order Summary */}
                <div className="bg-white shadow rounded-lg p-6 h-fit border border-green-500">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Original Total:</span>
                            <span>${cart.original_total}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Saving :</span>
                            <span>${cart.original_total - cart.final_total}</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between font-bold text-lg">
                            <span>ORDER TOTAL:</span>
                            <span> ${cart.final_total}</span>
                        </div>
                    </div>
                    <button onClick={checkoutHandler} className="mt-6 w-full bg-emerald-600 text-white py-3 rounded hover:bg-emerald-700 transition">
                        CHECKOUT
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
