import axios from 'axios';
import { useState, useContext } from 'react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { MainContext } from '../../Context';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAdmin } from '../../redux/features/adminSlice';

const LoginPage = () => {
    const { API_BASE_URL, ADMIN_URL, notify } = useContext(MainContext);
    const navigator= useNavigate();
    const dispatcher = useDispatch() 
    

    function SubmitHandler(e) {
        e.preventDefault();
        // handle login logic here
        const data = {
            email: e.target.email.value,
            password: e.target.password.value,
        }

        axios.post(API_BASE_URL + ADMIN_URL + "/login", data).then(
            (res) => {
                notify(res.data.msg, res.data.flag)
                if (res.data.flag === 1) {
                    e.target.reset();
                    navigator('/admin')
                    dispatcher(setAdmin(
                        {
                            admin: res.data.admin,
                            token: res.data.token
                        },
                    ))
                }
            }
        ).catch(
            (err) => {
                console.log(err)
                notify("Something is Wrong", 0)
            }
        )

    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>
                <form onSubmit={SubmitHandler} className="space-y-5">
                    <div className="relative">
                        <FaUserAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Email"
                            name='email'
                            className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            // value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="relative">
                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Password"
                            name='password'
                            className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-gray-500">
                    Don't have an account? <a href="#" className="text-blue-500 hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
