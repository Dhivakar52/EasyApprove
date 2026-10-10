// src/components/AdminSetting/AdminMainPage.tsx
import React from "react";
import { Settings, Award, Users, Link, Bell, BarChart3 } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

interface SettingsCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  links: { text: string; href: string }[];
}

const AdminMainPage: React.FC = () => {
  const settingsCards: SettingsCard[] = [
    {
      id: "master-setup",
      title: "Master Setup",
      description:
        "Manage award categories, criteria, and category-specific configurations",
      icon: <Settings className="w-6 h-6 text-white" />,
      iconBg: "bg-blue-500",
      links: [
        { text: "Award Categories", href: "/admin-setting/award-categories" },
        { text: "Entities & Departments", href: "/admin-setting/entities-departments" },
        { text: "Nomination Cycle Master", href: "/admin-setting/nomination-cycle" },
      ],
    },
    {
      id: "jury-management",
      title: "Jury Management",
      description:
        "Set up jury panels and define evaluation settings for fair and efficient assessments.",
      icon: <Award className="w-6 h-6 text-white" />,
      iconBg: "bg-green-500",
      links: [
        { text: "Jury Panel Setup", href: "/admin-setting/jury-panel-setup" },
        { text: "Jury Evaluation Settings", href: "/admin-setting/jury-evaluation-settings" },
        { text: "Jury Role Mapping", href: "/admin-setting/jury-role-mapping" },
      ],
    },
    {
      id: "role-permission",
      title: "Role & Permission Settings",
      description:
        "Control access by assigning roles and permission levels for each user type.",
      icon: <Users className="w-6 h-6 text-white" />,
      iconBg: "bg-purple-500",
      links: [
        { text: "Role List & Access Levels", href: "/admin-setting/role-list" },
        { text: "Define Permissions per Role", href: "/admin-setting/define-permissions" },
        { text: "Role Settings", href: "/admin-setting/role-settings" },
      ],
    },
    {
      id: "integration",
      title: "Integration Settings and Configuration",
      description:
        "Set up your domain, branding, and appearance to reflect your organization's unique identity.",
      icon: <Link className="w-6 h-6 text-white" />,
      iconBg: "bg-teal-500",
      links: [
        { text: "Survey Sparrow", href: "/admin-setting/integration/surveysparrow" },
        { text: "JUNO", href: "/admin-setting/integration/juno" },
        { text: "Camu", href: "/admin-setting/integration/camu" },
        { text: "Zoho", href: "/admin-setting/integration/zoho" },
      ],
    },
    {
      id: "notifications",
      title: "Notification Settings",
      description:
        "Design email templates and trigger alerts to keep users informed on time.",
      icon: <Bell className="w-6 h-6 text-white" />,
      iconBg: "bg-orange-500",
      links: [
        { text: "Notification Setup", href: "/admin-setting/notification-setup" },
        { text: "Email Template Editor", href: "/admin-setting/email-template-editor" },
        { text: "Notification Triggers Setup", href: "/admin-setting/notification-triggers" },
      ],
    },
    {
      id: "reports",
      title: "Reports and Dashboards",
      description:
        "Create and manage nomination timelines for structured award workflows.",
      icon: <BarChart3 className="w-6 h-6 text-white" />,
      iconBg: "bg-yellow-500",
      links: [
        { text: "Nomination Report 1", href: "/admin-setting/nomination-report-1" },
        { text: "Nomination Report 2", href: "/admin-setting/nomination-report-2" },
        { text: "Nomination Report 3", href: "/admin-setting/nomination-report-3" },
      ],
    },
  ];

  return (
    <div className="py-6 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsCards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            {/* Icon and Title */}
            <div className="flex items-start gap-3 mb-3">
              <div className={`${card.iconBg} rounded-lg p-2.5 flex-shrink-0`}>
                {card.icon}
              </div>
              <h3 className="font-semibold text-gray-900 text-base leading-tight mt-1">
                {card.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4">{card.description}</p>

            {/* Links */}
            <div className="space-y-2">
              {card.links.map((link, index) => (
                <RouterLink
                  key={index}
                  to={link.href}
                  className="block text-sm text-blue-600 hover:text-blue-700 hover:underline"
                >
                  • {link.text}
                </RouterLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMainPage;
