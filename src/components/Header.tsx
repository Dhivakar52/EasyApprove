import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Bell, 
  PanelLeft, 
  ChevronRight,
  ChevronDown,
  LogOut, 
  User as UserIcon,
  Home as HomeIcon,
} from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import NotificationModal from './Notification/NotificationModal';
import type { UserRole } from '../dataTypes/roles';

export interface HeaderProps {
  onToggleSidebar?: () => void;
  onMobileMenuToggle?: () => void;
  breadcrumbItems?: {
    label: string;
    href?: string;
  }[];
}

// Word mappings for clean breadcrumb presentation
const PATH_LABELS: Record<string, string> = {
  home: 'Home',
  notifications: 'Notifications',
  'self-nominations': 'Self Nominations',
  'my-nominations': 'My Nominations',
  'add-nomination': 'Add Nomination',
  approvals: 'Approvals',
  'business-jury': 'Business Jury',
  'president-unit': 'President Unit',
  'president-level': 'President Level',
  'award-management': 'Award Management',
  'admin-setting': 'Admin Setting',
  'award-categories': 'Award Categories',
  'entities-departments': 'Entities & Departments',
  'nomination-cycle': 'Nomination Cycle',
  'jury-panel-setup': 'Jury Panel Setup',
  'jury-evaluation-settings': 'Jury Evaluation Configuration',
  'jury-role-mapping': 'Jury Role Mapping',
  'role-list': 'Role Access Levels',
};

export const Header: React.FC<HeaderProps> = ({ 
  onToggleSidebar, 
  onMobileMenuToggle,
  breadcrumbItems
}) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const userRole = localStorage.getItem('userRole') as UserRole | null;

  // Resolve user display info safely from session or role
  const getUserDisplayName = () => {
    if (!userRole) return "Ravi Kumar";
    switch (userRole) {
      case 'admin': return "System Administrator";
      case 'manager': return "Manager Approver";
      case 'jury': return "Jury Member";
      case 'presidentUnit': return "President Unit";
      case 'presidentLevel': return "President Level";
      default: return "Ravi Kumar";
    }
  };

  const getUserEmail = () => {
    if (!userRole) return "ravikumar381@gmail.com";
    return `${userRole}@srm.edu`;
  };

  const getUserInitials = () => {
    if (!userRole) return "RK";
    switch (userRole) {
      case 'admin': return "SA";
      case 'manager': return "MA";
      case 'jury': return "JM";
      case 'presidentUnit': return "PU";
      case 'presidentLevel': return "PL";
      default: return "RK";
    }
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    setIsProfileOpen(false);
    navigate('/');
  };

  const handleSidebarClick = () => {
    if (window.innerWidth < 1024) {
      onMobileMenuToggle?.();
    } else {
      onToggleSidebar?.();
    }
  };

  // Breadcrumbs generation matching Hospital reference pattern
  const breadcrumbs = useMemo(() => {
    if (breadcrumbItems && breadcrumbItems.length > 0) {
      return breadcrumbItems;
    }

    const segments = location.pathname.split('/').filter(Boolean);
    if (segments.length === 0) {
      return [{ label: 'Home', href: '/home' }];
    }

    const items: { label: string; href?: string }[] = [];
    let currentPath = '';

    segments.forEach((seg, idx) => {
      currentPath += `/${seg}`;
      const label = PATH_LABELS[seg] || seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, ' ');
      const isLast = idx === segments.length - 1;
      items.push({
        label,
        href: isLast ? undefined : currentPath,
      });
    });

    return items;
  }, [breadcrumbItems, location.pathname]);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200 bg-white px-4 sm:px-6 shadow-xs select-none">
      {/* Sidebar Trigger (Hospital reference pattern) */}
      <button
        type="button"
        onClick={handleSidebarClick}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
        aria-label="Toggle sidebar"
        title="Toggle sidebar"
      >
        <PanelLeft className="h-5 w-5" />
      </button>

      {/* Breadcrumbs matching Hospital reference layout */}
      <nav aria-label="Breadcrumb" className="flex items-center">
        <ol className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 font-medium">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <li key={index} className="flex items-center gap-1.5">
                {index > 0 && (
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                )}
                {isLast ? (
                  <span className="font-semibold text-slate-900 truncate max-w-[220px] sm:max-w-none">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.href || '#'}
                    className="hover:text-slate-900 transition-colors truncate max-w-[160px] sm:max-w-none"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Right Action Toolbar */}
      <div className="ml-auto flex items-center gap-3 sm:gap-4">
        {/* Notification Panel Trigger */}
        <button
          type="button"
          onClick={() => setIsNotificationOpen(true)}
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
          aria-label="View notifications"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-xs">
            3
          </span>
        </button>

        {/* Separator */}
        <div className="h-6 w-px bg-slate-200" />

        {/* Profile Dropdown matching Hospital pattern */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className="flex items-center gap-2.5 rounded-md px-1.5 py-1 text-left hover:bg-slate-100 transition-colors cursor-pointer"
            aria-expanded={isProfileOpen}
            aria-haspopup="true"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white shrink-0 shadow-xs">
              {getUserInitials()}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-800 leading-tight">
                {getUserDisplayName()}
              </span>
              <span className="text-[11px] text-slate-500 leading-tight">
                {getUserEmail()}
              </span>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400 hidden sm:block" />
          </button>

          {/* Profile Dropdown Content */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white py-1.5 shadow-lg z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3.5 py-2.5 border-b border-slate-100 sm:hidden">
                <p className="text-xs font-semibold text-slate-800">{getUserDisplayName()}</p>
                <p className="text-[11px] text-slate-500 truncate">{getUserEmail()}</p>
              </div>

              <div className="px-3 py-1.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                Navigation
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsProfileOpen(false);
                  navigate('/home');
                }}
                className="flex w-full items-center gap-2.5 px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer text-left"
              >
                <HomeIcon className="h-4 w-4 text-slate-500" />
                <span>Dashboard Home</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsProfileOpen(false);
                  navigate('/self-nominations');
                }}
                className="flex w-full items-center gap-2.5 px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer text-left"
              >
                <UserIcon className="h-4 w-4 text-slate-500" />
                <span>My Profile</span>
              </button>

              <div className="my-1 border-t border-slate-100" />

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer text-left"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Notification Modal */}
      <NotificationModal
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </header>
  );
};

export default Header;
