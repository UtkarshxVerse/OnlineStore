import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../Context';
import { FaHeart, FaStar } from 'react-icons/fa';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/features/cartSlice';

const Store = () => {
    const dispatcher = useDispatch();
    const { categorySlug } = useParams();
    const [limit, setLimit] = useState(0);
    const [colorSlug, setColorSlug] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();

    const {
        API_BASE_URL,
        categories,
        fetchCategories,
        colors,
        fetchColors,
        products,
        fetchProducts,
    } = useContext(MainContext);

    useEffect(() => {
        fetchCategories();
        fetchColors();

        if (searchParams.get("limit")) {
            setLimit(searchParams.get("limit"));
        }

        if (searchParams.get("colorSlug")) {
            setColorSlug(searchParams.get("colorSlug"));
        }

    }, []);

    useEffect(() => {
        const query = {};
        if (limit) {
            query.limit = limit;
        }
        if (colorSlug) {
            query.colorSlug = colorSlug;
        }
        setSearchParams(query);
        fetchProducts(null, limit, categorySlug, colorSlug);
    }, [limit, categorySlug, colorSlug]);

    return (
        <div className="px-6 py-10 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
                {/* Filter Sidebar */}
                <aside className="md:col-span-1 flex flex-col bg-white p-5 rounded-lg shadow">
                    <h2 className="text-3xl font-extrabold mb-6 text-gray-800 font-mono">FILTERS</h2>

                    {/* Category Filter */}
                    <div className="mb-6 bg-white shadow-2xl pl-6 py-3 rounded-lg">
                        <h3 className="text-2xl font-extrabold text-gray-700 mb-3 ml-3 font-mono">Category</h3>
                        <ul className="space-y-2">
                            <li className="cursor-pointer hover:text-red-500 text-sm text-gray-700 font-bold">
                                <Link to={"/store"}>  All  </Link>
                            </li>
                            {categories.map((cat) => (
                                <li key={cat._id}>
                                    <label className="flex items-center gap-2 text-sm text-gray-700">
                                        <span className="flex gap-3 cursor-pointer hover:text-red-500 font-bold">
                                            <Link to={`/store/${cat.slug}`}>
                                                {cat.name}
                                                {/* <span>{cat.productCount}</span> */}
                                            </Link>
                                        </span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Color Filter */}
                    <div className=' bg-white shadow-2xl pl-6 py-3 rounded-lg'>
                        <h3 className="text-2xl font-extrabold text-gray-700 mb-3 ml-9 font-mono">Color</h3>
                        <ul className="space-y-2 font-bold">
                            <li className="cursor-pointer hover:text-red-500 text-sm text-gray-700 font-bold">
                                <Link to={"/store"}>  All  </Link>
                            </li>
                            {colors.map((color) => (
                                <li key={color._id}>
                                    <label onClick={() => setColorSlug(color.slug)} className="flex items-center gap-2 text-sm text-gray-700">
                                        <div className="flex gap-3 cursor-pointer hover:text-red-500 font-bold">
                                            {color.name}
                                            <span className='w-6 h-6 rounded-full' style={{ backgroundColor: color.hexcode }} title={color.name}></span>
                                        </div>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Product Grid */}
                <section className="md:col-span-5">
                    <h2 className="text-4xl font-extrabold mb-6 text-gray-800 font-mono">All Products</h2>
                    <div className='ml-2 mb-5'>
                        <span> Sort by : </span>
                        <select onChange={(e) => setLimit(e.target.value)} name="items" id="" className='w-15 text-sm border-none outline-none'>
                            <option value="0">All</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div
                                key={product._id}
                                className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden"
                            >
                                {/* Image & Icons */}
                                <Link to={'/view'}>
                                    <div className="relative">
                                        <img
                                            src={`${API_BASE_URL}Images/Product/${product.thumbnail}`}
                                            alt={product.name}
                                            className="w-full h-60 object-cover"
                                        />
                                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                                            {Math.round(
                                                ((product.originalPrice - product.finalPrice) / product.originalPrice) * 100
                                            )}
                                            % OFF
                                        </span>
                                        <div className="absolute top-2 right-2 text-red-500 text-xl cursor-pointer">
                                            <FaHeart />
                                        </div>
                                    </div>
                                </Link>

                                {/* Product Info */}
                                <div className="p-4">
                                    <Link to={'/view'}>
                                        <p className="text-sm text-gray-500">{product.categoryId?.name}</p>
                                        <h3 className="text-base font-semibold text-gray-800 line-clamp-2">
                                            {product.name}
                                        </h3>

                                        {/* Star Rating */}
                                        <div className="flex items-center mt-1 text-yellow-400 text-sm">
                                            <FaStar />
                                        </div>

                                        {/* Price */}
                                        <div className="mt-2">
                                            <span className="text-indigo-600 font-bold text-md">
                                                ${product.finalPrice.toFixed(2)}
                                            </span>
                                            <span className="line-through ml-2 text-gray-400 text-sm">
                                                ${product.originalPrice.toFixed(2)}
                                            </span>
                                        </div>
                                    </Link>
                                    {/* Button */}
                                    <button onClick={
                                        () => {
                                            dispatcher(
                                                addItem(
                                                    {
                                                        productId: product._id,
                                                        final_price: product.finalPrice,
                                                        original_price: product.originalPrice,
                                                    }
                                                )
                                            )
                                        }
                                    } className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition cursor-pointer">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
            </section>
        </div>
        </div >
    );
};

export default Store;
