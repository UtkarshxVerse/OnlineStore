import React from 'react';
import { FaHeart, FaStar, FaRegStar } from 'react-icons/fa';

// Sample array of products
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 74.99,
        oldPrice: 99.99,
        rating: 4,
        image: "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?q=80&w=2013&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 2,
        name: "Smart Watch",
        category: "Gadgets",
        price: 129.99,
        oldPrice: 159.99,
        rating: 5,
        image: "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 3,
        name: "Running Shoes",
        category: "Footwear",
        price: 89.0,
        oldPrice: 109.0,
        rating: 3,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 3,
        name: "Gun Toys",
        category: "Toys",
        price: 89.0,
        oldPrice: 109.0,
        rating: 3,
        image: "https://images.unsplash.com/photo-1594950981383-6eb659d18fbf?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 3,
        name: "Earbuds",
        category: "Electronics",
        price: 89.0,
        oldPrice: 109.0,
        rating: 3,
        image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=1289&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    }
];

// Product card component
const ProductCard = ({ product }) => {
    return (
        <div className="w-[300px] bg-white rounded-lg shadow-md hover:shadow-lg transition mx-auto">
            <div className="relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-60 object-cover rounded-t-lg"
                />
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                </span>
                <div className="absolute top-2 right-2 text-red-500 text-xl cursor-pointer">
                    <FaHeart />
                </div>
            </div>

            <div className="p-4">
                <p className="text-sm text-gray-500">{product.category}</p>
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>

                <div className="flex items-center mt-1 space-x-1 text-yellow-400 text-sm">
                    <FaStar />
                </div>

                <div className="mt-2">
                    <span className="text-indigo-600 font-bold text-md">${product.price.toFixed(2)}</span>
                    <span className="line-through ml-2 text-gray-400 text-sm">${product.oldPrice.toFixed(2)}</span>
                </div>

                <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

// Main component that renders all product cards
const ProductList = () => {
    return (
        <div className=" mx-[100px] py-10">
            <h2 className="text-2xl font-bold ml-2 mb-6 text-gray-800">Our Products</h2>
            <div className="grid gap-6  grid-cols-4 sm:grid-cols-2 md:grid-cols-4">
                {products.map((product,index) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
