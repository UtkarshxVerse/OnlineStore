import React, { useContext, useEffect } from 'react';
import {
  FaCheck,
  FaTimes,
  FaEdit,
  FaTrash,
  FaImage,
  FaTag,
  FaListAlt,
  FaRegEye
} from 'react-icons/fa';
import { IoMdAdd, IoMdImages } from "react-icons/io";
import { MainContext } from '../../../Context';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const ViewProduct = () => {
  const { products, setProducts, fetchProducts, API_BASE_URL, PRODUCT_URL, notify } = useContext(MainContext)

  function statusHandler(id, flag) {
    axios.patch(API_BASE_URL + PRODUCT_URL + `/status/${id}`, { flag }).then(
      (res) => {
        notify(res.data.msg, res.data.flag)
        if (res.data.flag == 1) {
          fetchProducts();
        }
      }
    ).catch(
      (err) => {
        console.log(err)
      }
    )
  }

  function deleteHandler(id) {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        axios.delete(API_BASE_URL + PRODUCT_URL + `/delete/${id}`).then(
          (res) => {
            notify(res.data.msg, res.data.flag)
            if (res.data.flag == 1) {
              fetchProducts();
            }
          }
        ).catch(
          (err) => {
            console.log(err)
          });
      }
    });
  }

  useEffect(
    () => {
      fetchProducts();
    }, []
  )

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg overflow-x-auto">
      <div className='flex justify-between mt-4'>
        <div>
          <h2 className="text-3xl font-bold mb-8 ml-2 text-gray-800 flex items-center gap-2">
            <FaListAlt />
            Product List
          </h2>
        </div>
        <div>
          <Link to={"/admin/product/add"}>
            <div
              // onClick={onAdd}
              className="mb-4 mr-3 flex items-center text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              < IoMdAdd className="mr-2 text-xl font-extrabold" />
              Add Product
            </div>
          </Link>
        </div>
      </div>

      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-100 text-xs uppercase text-gray-600">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Discount</th>
            <th className="px-4 py-3">Final Price</th>
            <th className="px-4 py-3">Stock</th>
            <th className="px-4 py-3">Top Selling</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {products.map((product, index) => (
            <tr key={product.index} className="hover:bg-gray-50 transition">

              <td className="px-4 py-3 font-medium">{product.name}</td>
              <td className="px-4 py-3">{product.categoryId.name}</td>
              <td className="px-4 py-3">${product.originalPrice}</td>
              <td className="px-4 py-3 pl-7">{product.discountPercentage}%</td>
              <td className="px-4 py-3 pl-8 font-semibold">${product.finalPrice}</td>
              <td className="px-4 py-3">
                {product.stock ? (
                  <span onClick={() => statusHandler(product._id, 1)} className="text-green-500 font-semibold cursor-pointer"> In Stock </span>
                ) : (
                  <span onClick={() => statusHandler(product._id, 1)} className="text-red-500 font-semibold cursor-pointer"> Out of Stock </span>
                )}
              </td>
              <td className="px-4 py-3 pl-10">
                {product.topSelling ? (
                  <span onClick={() => statusHandler(product._id, 2)} className="text-green-500 font-semibold cursor-pointer"> Yes </span>
                ) : (
                  <span onClick={() => statusHandler(product._id, 2)} className="text-red-500 font-semibold cursor-pointer"> No </span>
                )}
              </td>
              <td className="px-4 py-3">
                {product.status ? (
                  <span onClick={() => statusHandler(product._id, 3)} className="text-green-600 font-semibold cursor-pointer">Active</span>
                ) : (
                  <span onClick={() => statusHandler(product._id, 3)} className="text-red-600 font-semibold cursor-pointer">Inactive</span>
                )}
              </td>
              <td className="px-4 py-3 flex gap-3">
                <Link to={`/admin/product/edit/${product._id}`}>
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                </Link>
                <button
                  onClick={() => deleteHandler(product._id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <FaTrash />
                </button>
                <button
                  className="text-yellow-600 hover:text-red-800 text-lg"
                  title="View"
                >
                  <FaRegEye />
                </button>
                <Link to={`/admin/product/multiple/${product._id}`}>
                  <button
                    className="text-green-600 hover:text-red-800 text-lg"
                    title="AddImages"
                  >
                    <IoMdImages />
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {products.length === 0 && (
        <p className="text-center text-gray-500 py-6">No products found.</p>
      )}
    </div>
  );
};

export default ViewProduct;
