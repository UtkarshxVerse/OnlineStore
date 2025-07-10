import React from 'react';
import { FiShoppingCart, FiUser, FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <a href="/" className="text-2xl font-bold text-indigo-600">iShopz</a>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex space-x-6 gap-5 ml-[140px]">
                        <Link to={"/"}>
                            <div className="text-gray-700 hover:text-indigo-600 font-medium">Home</div>
                        </Link>

                        <div className="text-gray-700 hover:text-indigo-600 font-medium">Shop</div>
                        <div className="text-gray-700 hover:text-indigo-600 font-medium">About</div>
                        <Link to={"/Contact"}>
                            <div className="text-gray-700 hover:text-indigo-600 font-medium">Contact</div>
                        </Link>
                        
                    </div>

                    {/* Search + Icons */}
                    <div className="flex items-center space-x-4 ">
                        <input
                            type="text"
                            placeholder="Search"
                            className="hidden md:block px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button className="relative">
                            <FiShoppingCart className="text-2xl text-gray-700 hover:text-indigo-600" />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                3
                            </span>
                        </button>
                        <FiUser className="text-2xl text-gray-700  hover:text-indigo-600 cursor-pointer" />
                        <FiMenu className="text-2xl text-gray-700 md:hidden cursor-pointer" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
