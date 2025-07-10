import React, { useState } from 'react';
import {
    FaUser,
    FaEnvelope,
    FaRegCommentDots,
    FaRegPaperPlane,
    FaSyncAlt,
    FaHeading,
} from 'react-icons/fa';

const Contact = () => {
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setForm({
            fullName: '',
            email: '',
            subject: '',
            message: '',
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.fullName || !form.email || !form.subject || !form.message) {
            alert('Please fill in all fields.');
            return;
        }

        console.log('Contact Form Submitted:', form);
        alert('Message sent successfully!');
        handleReset();
    };

    return (
        <div className="max-w-3xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-semibold mb-6 text-center">Contact Us</h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md space-y-5"
            >
                {/* Name */}
                <div>
                    <label className=" text-gray-700 font-medium mb-1 flex items-center">
                        <FaUser className="mr-2 text-gray-500" /> Full Name *
                    </label>
                    <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Email */}
                <div>
                    <label className=" text-gray-700 font-medium mb-1 flex items-center">
                        <FaEnvelope className="mr-2 text-gray-500" /> Email *
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Subject */}
                <div>
                    <label className=" text-gray-700 font-medium mb-1 flex items-center">
                        <FaHeading className="mr-2 text-gray-500" /> Subject *
                    </label>
                    <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Message */}
                <div>
                    <label className=" text-gray-700 font-medium mb-1 flex items-center">
                        <FaRegCommentDots className="mr-2 text-gray-500" /> Message *
                    </label>
                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    ></textarea>
                </div>

                {/* Buttons */}
                <div className="flex space-x-4 pt-4">
                    <button
                        type="submit"
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        <FaRegPaperPlane className="mr-2" />
                        Send Message
                    </button>

                    <button
                        type="button"
                        onClick={handleReset}
                        className="flex items-center px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                        <FaSyncAlt className="mr-2" />
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Contact;
