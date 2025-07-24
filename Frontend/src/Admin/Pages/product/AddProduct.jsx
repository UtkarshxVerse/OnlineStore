import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaBox, FaTag } from 'react-icons/fa';
import { MainContext } from '../../../Context';
import axios from 'axios';
import Select from 'react-select'

const AddProduct = () => {
    const { API_BASE_URL, notify, categories, fetchCategories, setCategories, COLOR_URL, colors, setColors, fetchColors, PRODUCT_URL } = useContext(MainContext)

    const [selColor, setSelColor] = useState([]);

    const nameRef = useRef();
    const slugRef = useRef();
    const originalPriceRef = useRef();
    const discountRef = useRef();
    const finalPriceRef = useRef();

    function handleNameChange() {
        const name = nameRef.current.value;
        const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
        slugRef.current.value = slug;
    }

    function finalPriceCal() {
        const op = originalPriceRef.current.value;
        const dp = discountRef.current.value;
        const fp = Math.floor(op - (op * (dp / 100)));
        finalPriceRef.current.value = fp;
    }

    function SubmitHandle(e) {
        e.preventDefault();

        const formData = new FormData();

        formData.append('name', nameRef.current.value);
        formData.append('slug', slugRef.current.value);
        formData.append('shortDescription', e.target.shortDescription.value);
        formData.append('longDescription', e.target.longDescription.value);
        formData.append('originalPrice', e.target.originalPrice.value);
        formData.append('discountPercentage', e.target.discountPercentage.value);
        formData.append('finalPrice', e.target.finalPrice.value);
        formData.append('categoryId', e.target.categoryId.value);
        formData.append('thumbnail', e.target.thumbnail.files[0])
        formData.append('status', e.target.status.value);
        formData.append('colors', JSON.stringify(selColor));
        formData.append('stock', e.target.stock.value);
        formData.append('topSelling', e.target.topSelling.value);

        axios.post(API_BASE_URL + PRODUCT_URL + "/create", formData).then(
            (res) => {
                notify(res.data.msg, res.data.flag)
                if (res.data.flag === 1) {
                    e.target.reset();
                }
            }
        ).catch(
            (err) => {
                notify("Error creating category", 0)
            });
    }


    useEffect(
        () => {
            fetchCategories();
            fetchColors();
        }, []
    )
    return (
        <section className="bg-white">
            <div className="py-8 px-4 mx-auto max-w-4xl lg:py-16">
                <h2 className="mb-10 text-3xl font-bold text-gray-900 flex items-center gap-2">
                    <FaBox />
                    Add a new product
                </h2>
                <form onSubmit={SubmitHandle}>
                    <div className="grid gap-6 sm:grid-cols-2">
                        {/* Name */}
                        <div className="sm:col-span-2">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                                Product Name
                            </label>
                            <input type="text" ref={nameRef} onChange={handleNameChange} id="name" name="name" placeholder="Product name" className={inputStyle} required />
                        </div>

                        {/* Slug */}
                        <div className="sm:col-span-2">
                            <label htmlFor="slug" className="block mb-2 text-sm font-medium text-gray-900">
                                Slug (URL-friendly name)
                            </label>
                            <input type="text" ref={slugRef} onChange={handleNameChange} id="slug" name="slug" placeholder="product-name" className={inputStyle} required />
                        </div>

                        {/* Short Description */}
                        <div className="sm:col-span-2">
                            <label htmlFor="shortDescription" className="block mb-2 text-sm font-medium text-gray-900">
                                Short Description
                            </label>
                            <input type="text" id="shortDescription" name="shortDescription" placeholder="Short product description" className={inputStyle} />
                        </div>

                        {/* Long Description */}
                        <div className="sm:col-span-2">
                            <label htmlFor="longDescription" className="block mb-2 text-sm font-medium text-gray-900">
                                Long Description
                            </label>
                            <textarea id="longDescription" name="longDescription" rows="4" placeholder="Detailed product description" className={inputStyle}></textarea>
                        </div>

                        {/* Original Price */}
                        <div>
                            <label htmlFor="originalPrice" className="block mb-2 text-sm font-medium text-gray-900">
                                Original Price
                            </label>
                            <input type="number" id="originalPrice" ref={originalPriceRef} name="originalPrice"
                                onChange={finalPriceCal}
                                placeholder="100" className={inputStyle} required />
                        </div>

                        {/* Discount Percentage */}
                        <div>
                            <label htmlFor="discountPercentage" className="block mb-2 text-sm font-medium text-gray-900">
                                Discount Percentage
                            </label>
                            <input type="number" id="discountPercentage" ref={discountRef} name="discountPercentage" placeholder="10"
                                onChange={finalPriceCal}
                                className={inputStyle} required />
                        </div>

                        {/* Final Price */}
                        <div>
                            <label htmlFor="finalPrice" className="block mb-2 text-sm font-medium text-gray-900">
                                Final Price
                            </label>
                            <input type="number" id="finalPrice" ref={finalPriceRef} readOnly name="finalPrice" placeholder="90" className={inputStyle} required />
                        </div>
                        {/* readOnly se final value niklegi */}
                        {/* Category */}
                        <div>
                            <label htmlFor="categoryId" className="block mb-2 text-sm font-medium text-gray-900">
                                Category
                            </label>
                            <Select name='categoryId' className='shadow-md' options={
                                categories.map(
                                    (category, index) => {
                                        return { value: category._id, label: category.name }
                                    }
                                )
                            } />
                        </div>

                        {/* Colors */}
                        <div className="sm:col-span-2">
                            <label htmlFor="colors" className="block mb-2 text-sm font-medium text-gray-900">
                                Color IDs (comma-separated ObjectIds)
                            </label>
                            <Select
                                onChange={
                                    (color) => {
                                        const col = color.map(o => o.value);
                                        setSelColor(col);
                                    }
                                }
                                className='shadow-md' isMulti options={
                                    colors.map(
                                        (color, index) => {
                                            return { value: color._id, label: color.name }
                                        }
                                    )
                                } />

                        </div>

                        {/* Thumbnail */}
                        <div className="sm:col-span-2">
                            <label htmlFor="thumbnail" className="block mb-2 text-sm font-medium text-gray-900">
                                Thumbnail URL
                            </label>
                            <input type="file" id="thumbnail" name="thumbnail" placeholder="https://example.com/image.jpg" className={inputStyle} />
                        </div>

                        {/* Stock */}
                        <div>
                            <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900">
                                In Stock?
                            </label>
                            <select id="stock" name="stock" className={inputStyle}>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>

                        {/* Top Selling */}
                        <div>
                            <label htmlFor="topSelling" className="block mb-2 text-sm font-medium text-gray-900">
                                Top Selling?
                            </label>
                            <select id="topSelling" name="topSelling" className={inputStyle}>
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </div>

                        {/* Status */}
                        <div className="sm:col-span-2">
                            <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">
                                Status
                            </label>
                            <select id="status" name="status" className={inputStyle}>
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="inline-flex items-center px-5 py-2.5 mt-[50px] text-sm font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition"
                    >
                        <FaTag className="mr-2" />
                        Add Product
                    </button>
                </form>
            </div>
        </section>
    );
};

// Tailwind input class with shadow
const inputStyle = `block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg shadow-md
focus:ring-blue-500 focus:border-blue-500 p-2.5`;

export default AddProduct;
