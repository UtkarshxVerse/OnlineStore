import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Brand */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-3">ShopEase</h2>
                        <p className="text-sm">
                            Your one-stop shop for everything fashion, tech, and lifestyle.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-3">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-indigo-400">Home</a></li>
                            <li><a href="#" className="hover:text-indigo-400">Shop</a></li>
                            <li><a href="#" className="hover:text-indigo-400">About Us</a></li>
                            <li><a href="#" className="hover:text-indigo-400">Contact</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-white font-semibold mb-3">Newsletter</h3>
                        <p className="text-sm mb-2">Stay updated with our latest offers</p>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Enter email"
                                className="w-full px-3 py-2 rounded-l-md text-gray-800 focus:outline-none bg-amber-50 mt-4"
                            />
                            <button
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-md mt-4"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-white font-semibold mb-3">Follow Us</h3>
                        <div className="flex space-x-4 text-lg">
                            <a href="#" className="hover:text-blue-500"><FaFacebookF /></a>
                            <a href="#" className="hover:text-sky-400"><FaTwitter /></a>
                            <a href="#" className="hover:text-pink-500"><FaInstagram /></a>
                            <a href="#" className="hover:text-red-600"><FaYoutube /></a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
