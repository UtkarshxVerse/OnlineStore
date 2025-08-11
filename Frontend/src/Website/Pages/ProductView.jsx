import React, { useState } from 'react';
import { FaShoppingCart, FaTag, FaSearchPlus, FaImage } from 'react-icons/fa';

const ProductView = () => {
    const product = {
        id: 1,
        name: 'Vintage Leather Backpack',
        price: 129.99,
        description:
            'Crafted from premium leather, this backpack combines style and functionality. Perfect for work, travel, or everyday use.',
        images: [
            'https://images.unsplash.com/photo-1606813902885-2fa58f95a1ef?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1575908523917-7e0f3126ed2a?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1586864389224-bd006a5621a8?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80',
        ],
    };

    const [selectedImage, setSelectedImage] = useState(product.images[0]);

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center p-6">
            <div className=" w-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
                {/* Left: Image + Thumbnails */}
                <div className="md:w-1/2 flex flex-col md:flex-row p-6 gap-4">
                    {/* Thumbnails */}
                    <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto">
                        {product.images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`Thumbnail ${idx}`}
                                onClick={() => setSelectedImage(img)}
                                className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 transition ${selectedImage === img
                                        ? 'border-blue-600'
                                        : 'border-gray-300'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Main Image */}
                    <div className="flex-1 relative">
                        <img
                            src={selectedImage}
                            alt="Selected Product"
                            className="w-full h-150 object-cover rounded-md border"
                        />
                        <div className="absolute top-2 left-2 bg-white p-1 rounded-full shadow">
                            <FaImage className="text-gray-600" />
                        </div>
                        <div className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow cursor-pointer hover:scale-105 transition">
                            <FaSearchPlus className="text-gray-700" title="Zoom" />
                        </div>
                    </div>
                </div>

                {/* Right: Product Info */}
                <div className="md:w-1/2 p-6 flex flex-col gap-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>

                        <div className="flex items-center mt-2 text-green-600 text-xl font-semibold">
                            <FaTag className="mr-2" />
                            ${product.price.toFixed(2)}
                        </div>

                        <p className="text-gray-600 mt-4">{product.description}</p>
                    </div>

                    <button className="mt-6 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                        <FaShoppingCart />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductView;
