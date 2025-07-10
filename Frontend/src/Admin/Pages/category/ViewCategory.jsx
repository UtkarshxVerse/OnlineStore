import React from 'react'
import { useEffect, useState, useContext } from 'react';
import { FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa';
import { IoMdAdd } from "react-icons/io";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MainContext } from '../../../Context';
import AddCategory from './AddCategory';


const ViewCategory = ({ onBack }) => {
  const { categories, fetchCategories, API_BASE_URL, CATEGORY_URL, notify } = useContext(MainContext);

  function statusHandler(id) {
    axios.patch(API_BASE_URL + CATEGORY_URL + `/status/${id}`).then(
      (res) => {
        notify(res.data.msg, res.data.flag)
        if (res.data.flag === 1) {
          fetchCategories();
        }
      }
    ).catch(
      (err) => {
        notify("Error updating status", 0)
      });

  };

  function deleteHandler(id) {
    axios.delete(API_BASE_URL + CATEGORY_URL + `/delete/${id}`).then(
      (res) => {
        notify(res.data.msg, res.data.flag)
        if (res.data.flag === 1) {
          fetchCategories();
        }
      }
    ).catch(
      (err) => {
        notify("Error updating status", 0)
      });
  }


  useEffect(
    () => {
      fetchCategories();
    }, []
  )


  return (
    <div className="p-6 max-w-6xl mx-auto ">
      {/* Back Button */}
      <div className='flex justify-between '>
        <div>
          <Link to={"/admin"}>
            <button
              // onClick={onBack}
              className="mb-4 ml-3 flex items-center text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              <FaArrowLeft className="mr-2" />
              Back to Dashboard
            </button>
          </Link>
        </div>

        <div>
          <Link to={"/admin/category/add"}>
            <div
              // onClick={onAdd}
              className="mb-4 mr-3 flex items-center text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              < IoMdAdd className="mr-2 text-xl font-extrabold" />
              Add
            </div>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Slug</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {
              categories.map(
                (category, index) => (
                  <tr key={category.id}>
                    <td className="px-6 py-4 text-gray-800">{index + 1}</td>
                    <td className="px-6 py-4 text-gray-800">{category.name}</td>
                    <td className="px-6 py-4 text-gray-600">{category.slug}</td>
                    <td className="px-6 py-4">
                      <button onClick={() => statusHandler(category._id)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${category.status == true
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-700'
                          }`}
                      >
                        {
                          category.status == true ? "Active" : "Inactive"
                        }
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button className="text-green-600 hover:text-green-800">
                        <FaEdit />
                      </button>
                      <button onClick={() => deleteHandler(category._id)} className="text-red-600 hover:text-red-800">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewCategory;
