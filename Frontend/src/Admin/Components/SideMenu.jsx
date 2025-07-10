import { FaTachometerAlt, FaThLarge, FaLayerGroup, FaUserShield, FaFileAlt, FaRocket, FaCube, FaStream } from 'react-icons/fa'; import { BsFire } from 'react-icons/bs';
import { IoMdColorPalette } from "react-icons/io";
import { TbCategoryPlus } from "react-icons/tb";
import { Link } from 'react-router-dom';

const SideMenu = () => {
    return (<div className="w-[290px]
     h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-xl p-4 fixed left-0"> <h1 className="text-3xl font-bold mb-6 text-center text-white tracking-wide">VELZON</h1>

        <div className="text-gray-400 text-l mb-2 pb-3">MENU</div>
        <div className="space-y-2">
            <Link to={"/admin"}>
                <MenuItem icon={<FaTachometerAlt />} label="Dashboard" />
            </Link>
            <MenuItem icon={<FaThLarge />} label="Apps" expandable />
            <MenuItem icon={<FaLayerGroup />} label="Layouts" badge="Hot" />
        </div>

        <div className="text-gray-400 text-xs mt-6 mb-2">PAGES</div>
        <div className="space-y-2">
            <Link to={"/admin/category"}> 
                <MenuItem icon={<TbCategoryPlus />} label="Category" expandable />
            </Link>
            <MenuItem icon={<IoMdColorPalette />} label="Color" expandable />
            <MenuItem icon={<FaRocket />} label="Product" expandable />
        </div>

        <div className="text-gray-400 text-xs mt-6 mb-2">COMPONENTS</div>
        <div className="space-y-2">
            <MenuItem icon={<FaCube />} label="Base UI" expandable />
            <MenuItem icon={<FaStream />} label="Advance UI" expandable />
        </div>
    </div>

    );
};

const MenuItem = ({ icon, label, badge, expandable }) => {
    return (
        <div className="flex items-center justify-between cursor-pointer hover:bg-gray-700 p-2 rounded-lg transition-all duration-200">
            <div className="flex items-center space-x-3">
                <div className="text-xl">{icon}</div>
                <span className="text-xl font-medium text-white">{label}</span> {badge && (<span className="bg-red-500 text-xs text-white px-2 py-0.5 rounded-full ml-2">{badge}</span>)} </div> {expandable && (<svg
                    className="w-3 h-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /> </svg>)} </div>);
};

export default SideMenu;