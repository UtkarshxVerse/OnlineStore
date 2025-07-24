import React from 'react'
import { useEffect, useState, useContext } from 'react';
import { FaArrowLeft, FaEdit, FaTrash, FaListAlt } from 'react-icons/fa';
import { IoMdAdd } from "react-icons/io";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MainContext } from '../../../Context';
import AddColor from './AddColor';
import Swal from 'sweetalert2';


const ViewColor = () => {
  const { fetchColors, API_BASE_URL, COLOR_URL, notify, setColors, colors } = useContext(MainContext);

  function statusHandler(id) {
    axios.patch(API_BASE_URL + COLOR_URL + `/status/${id}`).then(
      (res) => {
        notify(res.data.msg, res.data.flag)
        if (res.data.flag === 1) {
          fetchColors();
        }
      }
    ).catch(
      (err) => {
        notify("Error updating status", 0)
      });

  };


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
        axios.delete(API_BASE_URL + COLOR_URL + `/delete/${id}`).then(

          (res) => {

            notify(res.data.msg, res.data.flag)
            if (res.data.flag == 1) {
              console.log(res.data.flag)
              fetchColors();
            }
          }
        ).catch(
          (err) => {
            console.log(err)
            notify("Error updating status", 0)
          });
      }
    });

  }


  useEffect(
    () => {
      fetchColors();
    }, []
  )


  return (
    <div className="p-6 max-w-6xl mx-auto ">
      {/* Back Button */}
      <div className='flex justify-between mt-4'>
        <div>
          <h2 className="text-3xl font-bold mb-8 ml-2 text-gray-800 flex items-center gap-2">
            <FaListAlt />
            Color List
          </h2>
        </div>
        <div>
          <Link to={"/admin/color/add"}>
            <div
              // onClick={onAdd}
              className="mb-4 mr-3 flex items-center text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              < IoMdAdd className="mr-2 text-xl font-extrabold" />
              Add Color
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
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Hexcode</th>
              <th className="px-8 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {
              Array.isArray(colors) && colors.map(
                (color, index) => (
                  <tr key={color._id}>
                    <td className="px-6 py-4 text-gray-800">{index + 1}</td>
                    <td className="px-6 py-4 text-gray-800">{color.name}</td>
                    <td className="px-6 py-4 text-gray-600">{color.slug}</td>
                    <td style={{ background: color.hexcode }} className=" px-6 py-4 text-gray-600">
                      {color.hexcode}
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => statusHandler(color._id)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${color.status == true
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-700'
                          }`}
                      >
                        {
                          color.status ? "Active" : "Inactive"
                        }
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <Link to={`/admin/color/edit/${color._id}`}>
                        <button className="text-green-600 hover:text-green-800">
                          <FaEdit />
                        </button>
                      </Link>
                      <button onClick={() => deleteHandler(color._id)} className="text-red-600 hover:text-red-800">
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

export default ViewColor;
