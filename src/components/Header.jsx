import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  Menu,
  X,
  ShoppingCart,
  History,
  LayoutGrid,
  LogOut,
  ServerCog,
  Smartphone,
  Sparkles,
} from 'lucide-react'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  const nav = [
    { to: '/app', label: 'Smart Bulk Order', icon: LayoutGrid, end: true },
    { to: '/app/orders', label: 'Orders', icon: ShoppingCart },
    { to: '/app/history', label: 'Order Units History', icon: History },
    { to: '/app/platform-configs', label: 'Platform Accounts & Configs', icon: ServerCog },
    { to: '/app/employee-phones', label: 'Employee Phones', icon: Smartphone },
  ]

  const handleLogout = () => {
    localStorage.removeItem('bob_auth')
    localStorage.removeItem('bob_email')
    navigate('/login', { replace: true })
  }

  return (
    <header className="sticky top-0 z-50 bg-white backdrop-blur-xl border-b border-gray-200 shadow-lg w-full">
      {/* Subtle animated overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50/50 via-white to-gray-50/50 animate-pulse"></div>
      
      <div className="relative w-full px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo with elegant styling */}
        <Link
          to="/app"
          className="flex items-center gap-3 font-bold text-xl sm:text-2xl text-gray-900 group relative"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gray-900 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black p-2 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
              <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
          </div>
          <span className="text-gray-900 group-hover:text-black transition-colors duration-300">
            EasyBuy
          </span>
          <Sparkles className="h-4 w-4 text-gray-400 group-hover:text-gray-900 transition-colors duration-300 hidden sm:block" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-2">
          {nav.map(({ to, label, icon: Icon, end: isEnd }) => (
            <NavLink
              key={to}
              to={to}
              end={isEnd}
              className={({ isActive }) =>
                `relative px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all duration-300 overflow-hidden group ${
                  isActive
                    ? 'bg-black text-white shadow-lg shadow-gray-900/30'
                    : 'text-gray-700 hover:text-black hover:bg-gray-100'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {!isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-100/0 via-gray-200/0 to-gray-100/0 group-hover:from-gray-100/50 group-hover:via-gray-200/50 group-hover:to-gray-100/50 transition-all duration-300"></div>
                  )}
                  <Icon className={`h-4 w-4 relative z-10 ${isActive ? '' : 'group-hover:scale-110 transition-transform duration-300'}`} />
                  <span className="relative z-10">{label}</span>
                </>
              )}
            </NavLink>
          ))}

          {/* Logout button with elegant styling */}
          <button
            onClick={handleLogout}
            className="ml-4 relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black text-white text-sm font-bold shadow-lg shadow-gray-900/30 hover:shadow-gray-900/50 hover:scale-105 transition-all duration-300 overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <LogOut className="h-4 w-4 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            <span className="relative z-10">Logout</span>
          </button>
        </nav>

        {/* Mobile hamburger with animation */}
        <button
          className="lg:hidden inline-flex items-center justify-center p-2.5 rounded-xl hover:bg-gray-100 transition-all duration-300 text-gray-900"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="h-6 w-6 rotate-90 transition-transform duration-300" />
          ) : (
            <Menu className="h-6 w-6 transition-transform duration-300" />
          )}
        </button>
      </div>

      {/* Mobile menu with slide animation */}
      <div
        className={`lg:hidden bg-white backdrop-blur-xl border-t border-gray-200 shadow-xl overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col p-4 space-y-2">
          {nav.map(({ to, label, icon: Icon, end: isEnd }, index) => (
            <NavLink
              key={to}
              to={to}
              end={isEnd}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3.5 rounded-xl text-base font-semibold flex items-center gap-3 transition-all duration-300 ${
                  isActive
                    ? 'bg-black text-white shadow-lg shadow-gray-900/30'
                    : 'text-gray-700 hover:text-black hover:bg-gray-100'
                }`
              }
              style={{
                animationDelay: `${index * 50}ms`,
                animation: mobileOpen ? 'slideIn 0.3s ease-out forwards' : 'none'
              }}
            >
              {({ isActive }) => (
                <>
                  <Icon className={`h-5 w-5`} />
                  {label}
                </>
              )}
            </NavLink>
          ))}

          {/* Logout button in mobile menu */}
          <button
            onClick={() => {
              handleLogout()
              setMobileOpen(false)
            }}
            className="mt-3 inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-black text-white text-base font-bold shadow-lg shadow-gray-900/30 hover:shadow-gray-900/50 transition-all duration-300"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </header>
  )
}