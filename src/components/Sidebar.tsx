import React, { useState, useMemo } from 'react';
import { 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Search, 
  X 
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/images/layout_logo.png';
import type { UserRole } from '../dataTypes/roles';
import { getFilteredMenu, isMenuItemActive } from '../config/menu.config';

export interface SidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onToggle: () => void;
  onMobileClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  isCollapsed, 
  isMobileOpen, 
  onToggle, 
  onMobileClose 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole') as UserRole | null;
  const baseMenu = getFilteredMenu(userRole);

  const [search, setSearch] = useState('');
  const isSearching = search.trim().length > 0;

  // Search filtering matching reference pattern
  const filteredMenu = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return baseMenu;
    return baseMenu.filter((item) => item.title.toLowerCase().includes(q));
  }, [search, baseMenu]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/');
  };

  // Target application active-menu color exception
  const activeStyle: React.CSSProperties = {
    background: 'linear-gradient(90deg, rgb(8, 128, 94) 16%, rgb(24, 97, 174) 100%)',
    color: '#ffffff',
  };

  const showExpandedContent = !isCollapsed || isMobileOpen;

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden transition-opacity" 
          onClick={onMobileClose} 
        />
      )}

      {/* Main Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-white border-r border-slate-200 text-slate-800 transition-all duration-300 ease-in-out shadow-sm flex flex-col
          ${isCollapsed ? 'lg:w-[68px]' : 'lg:w-64'} 
          ${isMobileOpen ? 'w-64 translate-x-0' : '-translate-x-full lg:translate-x-0'} 
          overflow-hidden`}
      >
        {/* Header with target logo and toggle button */}
        <div className="h-14 px-4 border-b border-slate-200 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-2 overflow-hidden">
            {showExpandedContent ? (
              <img 
                src={logo} 
                alt="SRM Logo" 
                className="h-8 w-auto object-contain shrink-0" 
              />
            ) : (
              <img 
                src={logo} 
                alt="SRM Logo" 
                className="h-7 w-auto object-contain shrink-0" 
              />
            )}
          </div>

          {/* Mobile close button */}
          <button 
            type="button"
            onClick={onMobileClose} 
            className="lg:hidden p-1.5 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>

          {/* Desktop collapse toggle */}
          <button
            type="button"
            onClick={onToggle}
            className="hidden lg:flex items-center justify-center h-7 w-7 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Menu Search (Hospital reference feature) */}
        {showExpandedContent && (
          <div className="px-3 pt-3 pb-1 shrink-0">
            <div className="relative flex items-center">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search menu..."
                className="h-8 w-full rounded-md border border-slate-200 bg-slate-50/70 pl-8 pr-7 text-xs text-slate-800 outline-none placeholder:text-slate-400 focus:bg-white focus:border-slate-400 transition-all"
              />
              {isSearching && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
          {isSearching && filteredMenu.length === 0 ? (
            <div className="px-3 py-4 text-xs text-slate-400 text-center">
              No menu items match &quot;{search}&quot;
            </div>
          ) : (
            filteredMenu.map((item) => {
              const isActive = isMenuItemActive(location.pathname, item.url);
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  to={item.url}
                  onClick={onMobileClose}
                  title={isCollapsed && !isMobileOpen ? item.title : undefined}
                  className={`flex items-center gap-2.5 w-full h-9 rounded-md text-xs font-medium transition-colors ${
                    isCollapsed && !isMobileOpen 
                      ? 'justify-center px-0' 
                      : 'px-3'
                  } ${
                    isActive 
                      ? 'shadow-xs font-semibold' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                  style={isActive ? activeStyle : undefined}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {showExpandedContent && (
                    <span className="truncate">{item.title}</span>
                  )}
                </Link>
              );
            })
          )}
        </div>

        {/* Footer with Logout */}
        <div className="border-t border-slate-200 p-2 shrink-0 bg-white">
          <button
            type="button"
            onClick={handleLogout}
            title={isCollapsed && !isMobileOpen ? "Logout" : undefined}
            className={`flex items-center gap-2.5 w-full h-9 rounded-md text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50/70 transition-colors cursor-pointer ${
              isCollapsed && !isMobileOpen ? 'justify-center px-0' : 'px-3'
            }`}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {showExpandedContent && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
