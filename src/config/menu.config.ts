import {
  Home,
  Bell,
  User,
  FileText,
  CircleCheckBig,
  Gavel,
  Users,
  Settings,
} from 'lucide-react';
import type { ElementType } from 'react';
import { type UserRole, ROLE_PAGES } from '../dataTypes/roles';

export interface SubMenuItem {
  title: string;
  url: string;
  icon: ElementType;
  badge?: string;
  roles?: UserRole[];
}

export interface MenuItem {
  title: string;
  url: string;
  icon: ElementType;
  badge?: string;
  roles?: UserRole[];
  items?: SubMenuItem[];
}

// ✅ Centralized menu configuration
export const menuConfig: MenuItem[] = [
  { title: 'Home', url: '/home', icon: Home },
  { title: 'Notifications', url: '/notifications', icon: Bell },
  { title: 'Self Nominations', url: '/self-nominations', icon: User },
  { title: 'My Nominations', url: '/my-nominations', icon: FileText },
  { title: 'Approvals', url: '/approvals', icon: CircleCheckBig },
  { title: 'Business Jury', url: '/business-jury', icon: Gavel },
  { title: 'President Unit', url: '/president-unit', icon: Gavel },
  { title: 'President Level', url: '/president-level', icon: Users },
  { title: 'Award Management', url: '/award-management', icon: Settings },
  { title: 'Admin Setting', url: '/admin-setting', icon: Settings },
];

// Helper to determine allowed roles for a given page label
export const getAllowedRoles = (pageLabel: string): UserRole[] => {
  const matches = Object.entries(ROLE_PAGES)
    .filter(([, pages]) => pages.includes(pageLabel))
    .map(([role]) => role as UserRole);

  if (matches.length === 0) {
    return Object.keys(ROLE_PAGES) as UserRole[];
  }
  return matches;
};

// Role-filtered menu items for the current active role
export const getFilteredMenu = (userRole: UserRole | null): MenuItem[] => {
  if (!userRole) return [];
  const allowedPages = ROLE_PAGES[userRole] || [];
  return menuConfig.filter((item) => allowedPages.includes(item.title));
};

// Checks if a menu item URL matches current route
export const isMenuItemActive = (currentPath: string, itemUrl: string): boolean => {
  return currentPath.startsWith(itemUrl);
};
