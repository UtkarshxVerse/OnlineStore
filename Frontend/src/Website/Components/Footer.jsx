import {
    FaTwitter,
    FaFacebookF,
    FaInstagram,
    FaYoutube,
    FaPinterestP,
} from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-white text-blue-900 text-sm px-6 pt-12 pb-6 border-t">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-8">
                {/* Column 1: Contact Info */}
                <div className="md:col-span-2 space-y-2">
                    <h2 className="font-bold text-base">iShopz - 1ST NYC TECH ONLINE MARKET</h2>
                    <p className="text-xs text-gray-500">HOTLINE 24/7</p>
                    <p className="text-2xl font-bold text-orange-500">(025) 3686 25 16</p>
                    <p>257 Thatcher Road St, Brooklyn, Manhattan, NY 10092</p>
                    <p>contact@iShopz.com</p>
                    <div className="flex space-x-2 pt-4">
                        {[FaTwitter, FaFacebookF, FaInstagram, FaYoutube, FaPinterestP].map((Icon, idx) => (
                            <div key={idx} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                                <Icon size={16} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Column 2: Top Categories */}
                <div>
                    <h3 className="font-bold mb-2">TOP CATEGORIES</h3>
                    <ul className="space-y-1 text-gray-600">
                        <li>Laptops</li>
                        <li>PC & Computers</li>
                        <li>Cell Phones</li>
                        <li>Tablets</li>
                        <li>Gaming & VR</li>
                        <li>Networks</li>
                        <li>Cameras</li>
                        <li>Sounds</li>
                        <li>Office</li>
                    </ul>
                </div>

                {/* Column 3: Company */}
                <div>
                    <h3 className="font-bold mb-2">COMPANY</h3>
                    <ul className="space-y-1 text-gray-600">
                        <li>About Swoo</li>
                        <li>Contact</li>
                        <li>Career</li>
                        <li>Blog</li>
                        <li>Sitemap</li>
                        <li>Store Locations</li>
                    </ul>
                </div>

                {/* Column 4: Help Center */}
                <div>
                    <h3 className="font-bold mb-2">HELP CENTER</h3>
                    <ul className="space-y-1 text-gray-600">
                        <li>Customer Service</li>
                        <li>Policy</li>
                        <li>Terms & Conditions</li>
                        <li>Track Order</li>
                        <li>FAQs</li>
                        <li>My Account</li>
                        <li>Product Support</li>
                    </ul>
                </div>

                {/* Column 5: Partner */}
                <div>
                    <h3 className="font-bold mb-2">PARTNER</h3>
                    <ul className="space-y-1 text-gray-600">
                        <li>Become Seller</li>
                        <li>Affiliate</li>
                        <li>Advertise</li>
                        <li>Partnership</li>
                    </ul>
                </div>
            </div>

            {/* Subscribe Row */}
            <div className="max-w-4xl ml-[530px] my-6 py-8 grid grid-cols-1 md:grid-cols-1 gap-8 items-start">
                {/* Subscription */}
                <div>
                    <p className="font-bold mb-2">
                        SUBSCRIBE & GET <span className="text-orange-500">10% OFF</span> FOR YOUR FIRST ORDER
                    </p>
                    <div className="flex border-b border-gray-300">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="w-full px-2 py-2 outline-none"
                        />
                        <button className="text-orange-600 font-bold px-4">SUBSCRIBE</button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                        By subscribing, you’re accepting our <span className="underline cursor-pointer">Policy</span>
                    </p>
                </div>
            </div>

            <div className=" border-t mx-auto">
                {/* Footer Bottom */}
                <div className="max-w-7xl mt-6 text-center text-xs text-gray-500">
                    © 2024 <span className="font-bold text-black">iShopz</span>. All Rights Reserved
                </div>
            </div>
        </footer>
    );
}
