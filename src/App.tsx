// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/Layout';
import HomePage from './pages/HomePage';
import NotificationsPage from './pages/NotificationPage';
import SelfNominationPage from './pages/SelfNominationPage';
import NominationPage from './pages/NominationPage';
import AddNomination from './components/NominationContent/AddNomination';
import ApprovalComponent from './components/ManagerPage/ApprovalComponent';
import BusinessJury from './components/Jury/BusinessJury';
import PresidentLevel from './components/PresidentLevel/PresidentLevel';
import PresidentUnit from './components/PresidentUnitLevel/PresidentUnit';
import AdminInner from './components/AdminSetting/AdminInner';
import AwardCategories from './components/AdminSetting/AwardCategories';
import EntitiesDepartments from './components/AdminSetting/EntitiesDepartments';
import JuryEvaluationConfiguration from './components/AdminSetting/JuryEvaluationConfiguration';
import JuryRoleMapping from './components/AdminSetting/JuryRoleMapping';
import RoleAccessLevels from './components/AdminSetting/RoleAccessLevels';
import NominationCycleMaster from './components/AdminSetting/NominationCycleMaster';
import JuryPanelSetup from './components/AdminSetting/JuryPanelSetup';
import AwardManagement from './components/Award/AwardManagement';
import Login from './pages/auth/Login/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import type { UserRole } from './dataTypes/roles';
import { getAllowedRoles } from './config/menu.config';
import { adminSubPageRoles } from './routes/routes.config';

// -------------------------
// Main page components
// -------------------------
const pageComponents: Record<string, React.ReactNode> = {
  'Home': <HomePage />,
  'Notifications': <NotificationsPage />,
  'Self Nominations': <SelfNominationPage />,
  'My Nominations': <NominationPage />,
  'Approvals': <ApprovalComponent />,
  'Business Jury': <BusinessJury />,
  'President Unit': <PresidentUnit />,
  'President Level': <PresidentLevel />,
  'Award Management': <AwardManagement />,
  'Admin Setting': <AdminInner />,
};

// -------------------------
// Admin sub-pages
// -------------------------
const adminSubPages: Record<string, React.ReactNode> = {
  'award-categories': <AwardCategories />,
  'entities-departments': <EntitiesDepartments />,
  'nomination-cycle': <NominationCycleMaster />,
  'jury-panel-setup': <JuryPanelSetup />,
  'jury-evaluation-settings': <JuryEvaluationConfiguration />,
  'jury-role-mapping': <JuryRoleMapping />,
  'role-list': <RoleAccessLevels />,
};

// -------------------------
// App Component
// -------------------------
const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole | null | undefined>(undefined);

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole') as UserRole | null;
    setUserRole(storedRole);
  }, []);

  if (userRole === undefined) return null; // wait for role

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* Public login route */}
          <Route path="/" element={<Login setUserRole={setUserRole} />} />

          {/* Protected routes */}
          <Route element={<Layout />}>
            {/* Main pages */}
            {Object.entries(pageComponents).map(([label, component]) => {
              const path = '/' + label.toLowerCase().replace(/\s+/g, '-');
              const allowedRoles = getAllowedRoles(label);

              return (
                <Route
                  key={label}
                  path={path}
                  element={
                    <ProtectedRoute userRole={userRole} allowedRoles={allowedRoles}>
                      {component}
                    </ProtectedRoute>
                  }
                />
              );
            })}

            {/* Admin sub-pages */}
            {Object.entries(adminSubPages).map(([slug, component]) => (
              <Route
                key={slug}
                path={`/admin-setting/${slug}`}
                element={
                  <ProtectedRoute
                    userRole={userRole}
                    allowedRoles={adminSubPageRoles[slug]}
                  >
                    {component}
                  </ProtectedRoute>
                }
              />
            ))}

            {/* Add Nomination nested route */}
            <Route
              path="/my-nominations/add-nomination"
              element={
                <ProtectedRoute
                  userRole={userRole}
                  allowedRoles={getAllowedRoles('Add Nomination')}
                >
                  <AddNomination />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
