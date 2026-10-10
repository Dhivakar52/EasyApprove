import React, { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import type { UserRole } from '../dataTypes/roles';

interface ProtectedRouteProps {
  userRole: UserRole | null;
  allowedRoles: UserRole[];
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ userRole, allowedRoles, children }) => {
  if (!userRole) return <Navigate to="/" replace />; 
  if (!allowedRoles.includes(userRole)) return <Navigate to="/home" replace />;
  return <>{children}</>;
};

export default ProtectedRoute;
