import React from 'react'
import { FaBox, FaTag } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { MainContext } from '../../../Context';


export default function MultipleImages() {
    const {API_BASE_URL , PRODUCT_URL, notify } = useContext(MainContext)
    const {productId} = useParams();
    console.log(productId);

    function SubmitHandle(e) {
        e.preventDefault();
        const formData = new FormData()
        for(let image of e.target.images.files) {
            formData.append("images" , image)
        }

        axios.patch(API_BASE_URL + PRODUCT_URL + "/multiple-images/" + productId , formData).then(
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

    return (
        <section className="bg-white">
            <div className="py-8 px-4 mx-auto max-w-4xl lg:py-16">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <FaBox className='mr-3' />
                    Add Product Images
                </h2>
                <form onSubmit={SubmitHandle}>
                    <div className="grid gap-6 sm:grid-cols-2">


                        {/* Images */}
                        <div className="sm:col-span-2 mt-6">
                            <label htmlFor="images" className="block mb-2 text-sm font-medium text-gray-900">
                                Image URLs (comma-separated)
                            </label>
                            <input type="file" id="images" multiple name="images" placeholder="https://img1.jpg, https://img2.jpg" className={inputStyle} />
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center px-5 py-2.5 mt-[20px] text-sm font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition"
                        >
                            <FaTag className="mr-2" />
                            Add 
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
};

const inputStyle = `block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg shadow-md
focus:ring-blue-500 focus:border-blue-500 p-2.5`;


