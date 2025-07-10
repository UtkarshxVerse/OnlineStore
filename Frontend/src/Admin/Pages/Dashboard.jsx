import {
  FaDollarSign,
  FaShoppingCart,
  FaUsers,
  FaBoxOpen,
} from 'react-icons/fa';

export default function Dashboard() {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Sales"
          value="$24,500"
          icon={<FaDollarSign className="text-green-500 text-2xl" />}
        />
        <DashboardCard
          title="Orders"
          value="1,230"
          icon={<FaShoppingCart className="text-blue-500 text-2xl" />}
        />
        <DashboardCard
          title="Customers"
          value="720"
          icon={<FaUsers className="text-purple-500 text-2xl" />}
        />
        <DashboardCard
          title="Products"
          value="320"
          icon={<FaBoxOpen className="text-yellow-500 text-2xl" />}
        />
      </div>
    </div>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">{title}</div>
          <div className="text-xl font-semibold text-gray-800">{value}</div>
        </div>
        <div className="bg-gray-100 p-3 rounded-full">
          {icon}
        </div>
      </div>
    </div>
  );
}
