import { FaBell, FaBars, FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';

export default function Header() {
  return (
    <header className="bg-white min-w shadow px-4 sm:px-6 py-4 flex items-center justify-between">

      {/* Left: Logo and Menu Toggle */}
      <div className="flex items-center space-x-4">
        <button className="md:hidden text-gray-600 hover:text-gray-800">
          <FaBars className="w-5 h-5" />
        </button>
        <div className="text-xl font-semibold text-blue-600">AdminPanel</div>
      </div>

      {/* Center: Search Bar */}
      <div className="hidden sm:flex flex-1 mx-6 max-w-md">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right: Notifications and Profile */}
      <div className="flex items-center space-x-4">
        {/* Notification Bell */}
        <button className="relative text-gray-600 hover:text-gray-800">
          <FaBell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            3
          </span>
        </button>

        {/* User Info + Dropdown */}
        <div className="relative group">
          <button className="flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900">
            <img
              src="https://via.placeholder.com/36"
              alt="Admin Avatar"
              className="w-9 h-9 rounded-full object-cover border"
            />
            <span className="hidden sm:inline font-medium">John Doe</span>
          </button>

          {/* Dropdown Menu (shown on hover using group-hover) */}
          <div className="hidden group-hover:flex flex-col absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FaUserCircle className="mr-2" /> Profile
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FaCog className="mr-2" /> Settings
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
