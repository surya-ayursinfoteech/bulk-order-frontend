// src/pages/Dashboard.jsx
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import SmartBulkOrder from './SmartBulkOrder';
import Orders from './Orders';
import OrderUnitHistory from './OrderUnitHistory';
import PlatformConfig from './PlatformConfig';
import EmployeePhone from './EmployeePhone';  // 👈 add this

export default function Dashboard() {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Header />
      <Routes>
        <Route index element={<SmartBulkOrder />} />
        <Route path="orders" element={<Orders />} />
        <Route path="history" element={<OrderUnitHistory />} />
        <Route path="platform-configs" element={<PlatformConfig />} />
        <Route path="employee-phones" element={<EmployeePhone />} />  {/* 👈 now real page */}
      </Routes>
    </div>
  );
}
