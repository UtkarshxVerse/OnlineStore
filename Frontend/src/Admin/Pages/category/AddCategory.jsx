import React, { useContext, useState } from 'react';
import { FaSave, FaTimes, FaArrowLeft } from 'react-icons/fa';
import { useRef } from 'react';
import axios from 'axios';
import { MainContext } from '../../../Context';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AddCategory = () => {
    const admin = useSelector((state) => state.admin?.token);
    const { API_BASE_URL, CATEGORY_URL, notify } = useContext(MainContext);
    const nameRef = useRef();
    const slugRef = useRef();

    function handleNameChange() {
        const name = nameRef.current.value;
        const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
        slugRef.current.value = slug;
    }

    const SubmitHandle = (e) => {
        e.preventDefault();
        // console.log(e.target.status.value)
        const formData = new FormData();

        formData.append('name', nameRef.current.value)
        formData.append('slug', slugRef.current.value)
        formData.append('status', e.target.status.value)
        formData.append('image',e.target.categoryImage.files[0])

        axios.post(API_BASE_URL + CATEGORY_URL + '/create', formData, {
            headers: {
                Authorization : admin?.token
            }
        }).then(
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

    };

    return (
        <div>
            <div className='flex gap-[630px] '>
                <Link to={"/admin"}>
                    <button
                        // onClick={onBack}
                        className="mb-4 mt-7 ml-[100px] flex items-center text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                        <FaArrowLeft className="mr-2" />
                        Back to Dashboard
                    </button>
                </Link>
                <Link to={"/admin/category"}>
                    <button
                        // onClick={onBack}
                        className="bg-blue-600 rounded-lg py-1 px-4 mb-4 mt-7 ml-[100px] flex items-center text-white hover:text-blue-900 cursor-pointer"
                    >
                        View Category
                    </button>
                </Link>
            </div>
            <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg mt-3">
                <h2 className="text-4xl font-bold mb-10">Create New Category</h2>

                <form onSubmit={SubmitHandle} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Category Name *</label>
                        <input
                            type="text"
                            name="name"
                            ref={nameRef}
                            onChange={handleNameChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        // required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Slug *</label>
                        <input
                            type="text"
                            name="slug"
                            ref={slugRef}
                            // onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        // required
                        ></input>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Status</label>
                        <select
                            name="status"
                            // value="status"
                            // onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Images *</label>
                        <input
                            type="file"
                            name="categoryImage"
                            // value={image}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

                        />
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-3 pt-4">
                        <button
                            type="submit"
                            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            <FaSave className="mr-2" />
                            Save
                        </button>
                        <button
                            type="button"
                            className="flex items-center px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                        >
                            <FaTimes className="mr-2" />
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCategory;
