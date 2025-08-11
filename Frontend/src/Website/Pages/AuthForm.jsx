import React, { useEffect, useState } from 'react';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/features/userSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MainContext } from '../../Context';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const AuthForm = () => {
    const user = useSelector((state) => state.user.data);
    const [searchParams, setSearchParams] = useSearchParams();
    const [isSignup, setIsSignup] = useState(false);
    const dispatcher = useDispatch();
    const navigator = useNavigate();
    const { API_BASE_URL, USER_URL, notify } = useContext(MainContext);
    const cartData = JSON.parse(localStorage.getItem("cart"));
    const cart = cartData ? cartData.items : null;

    function SubmitHandler(e) {
        e.preventDefault();
        // handle login logic here
        const data = {
            email: e.target.email.value,
            password: e.target.password.value,
        }

        axios.post(API_BASE_URL + USER_URL + "/login", data).then(
            async (res) => {
                console.log(res.data)
                notify(res.data.msg, res.data.flag)
                if (res.data.flag === 1) {
                    e.target.reset();
                    dispatcher(setUser(
                        {
                            user: res.data.user,
                            user_token: res.data.token
                        },
                    ))

                    const updateCart = await axios.post(`${API_BASE_URL}cart/move-to-db`, {
                        cart: cart != null ? cart : null , 
                        user_id: res.data.user?._id
                    })


                    if (searchParams.get("ref") === "checkout") {
                        navigator("/checkout");
                    } else {
                        navigator('/');
                    }
                }
            }
        ).catch(
            (err) => {
                console.log(err)
                notify("Something is Wrong", 0)
            }
        )

    };

    function RegisterHandler(e) {
        e.preventDefault();
        // handle login logic here
        const data = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
        }

        axios.post(API_BASE_URL + USER_URL + "/register", data).then(
            (res) => {
                console.log(res)
                notify(res.data.msg, res.data.flag)
                if (res.data.flag === 1) {
                    // e.target.reset();
                    dispatcher(setUser(
                        {
                            user: res.data.user,
                            user_token: res.data.token
                        },
                    ))
                    navigator('/')
                }
            }
        ).catch(
            (err) => {
                console.log(err)
                notify("Something is Wrong", 0)
            }
        )

    };

    useEffect(
        () => {
            if (user != null) {
                navigator("/");
            }
        }, [user]
    )

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </h2>

                {isSignup ?
                    //SIGNUP FORM
                    <form onSubmit={RegisterHandler} className="space-y-5">
                        <div className="flex items-center border rounded px-3 py-2">
                            <FiUser className="text-gray-400 mr-2" />
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                className="w-full outline-none"
                            />
                        </div>

                        <div className="flex items-center border rounded px-3 py-2">
                            <FiMail className="text-gray-400 mr-2" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="w-full outline-none"
                            />
                        </div>

                        <div className="flex items-center border rounded px-3 py-2">
                            <FiLock className="text-gray-400 mr-2" />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="w-full outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                        >
                            Create Account
                        </button>
                    </form>
                    :
                    //LOGIN FORM
                    <form onSubmit={SubmitHandler} className="space-y-5">
                        <div className="flex items-center border rounded px-3 py-2">
                            <FiMail className="text-gray-400 mr-2" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="w-full outline-none"
                            />
                        </div>

                        <div className="flex items-center border rounded px-3 py-2">
                            <FiLock className="text-gray-400 mr-2" />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="w-full outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                        >
                            Login
                        </button>
                    </form>}

                <p className="text-center mt-4 text-sm text-gray-600">
                    {isSignup ? 'Already have an account?' : "Don't have an account?"}
                    <button
                        onClick={() => setIsSignup(!isSignup)}
                        className="text-blue-600 ml-1 hover:underline"
                    >
                        {isSignup ? 'Sign In' : 'Sign Up'}
                    </button>
                </p>
            </div>
        </div>
    );
};


export default AuthForm;
