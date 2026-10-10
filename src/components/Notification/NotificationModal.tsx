import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Bell, X, FileText } from 'lucide-react';

interface Notification {
  id: string;
  type: 'referral' | 'approval' | 'approved';
  title: string;
  message: string;
  timeAgo: string;
  isRead?: boolean;
}

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications?: Notification[];
}
// Default notifications data
const defaultNotifications: Notification[] = [
  {
    id: '1',
    type: 'referral',
    title: 'Referral Request',
    message: 'Vijay Kumar has requested your referral for the Innovation category.',
    timeAgo: '2 minutes ago'
  },
  {
    id: '2',
    type: 'referral',
    title: 'New Referral Request',
    message: 'You have a new referral request from Karthik for UI/UX category.',
    timeAgo: '10 minutes ago'
  },
  {
    id: '3',
    type: 'approval',
    title: 'Nomination Approval Required',
    message: 'You need to approve a nomination for Vijay Kumar in Innovation category.',
    timeAgo: '1 hours ago'
  },
  {
    id: '4',
    type: 'approved',
    title: 'Nomination Approved',
    message: 'Your nomination for Vijay Kumar (Innovation) has been approved by the Manager.',
    timeAgo: '2 hours ago'
  }
];

const NotificationModal: React.FC<NotificationModalProps> = ({ 
  isOpen, 
  onClose, 
  notifications = defaultNotifications 
}) => {
  const handleMarkAllRead = () => {
    // Handle mark all as read logic
    console.log('Mark all notifications as read');
  };

  const handleViewAll = () => {
    // Handle view all notifications logic
    console.log('View all notifications');
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
        
        {/* Notification Panel */}
        <Dialog.Content className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl border-l border-gray-200 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-gray-600" />
              <Dialog.Title className="text-lg font-semibold text-gray-900">
                Notification
              </Dialog.Title>
            </div>
            <Dialog.Close className="p-1 rounded-md hover:bg-gray-100 transition-colors">
              <X size={20} className="text-gray-500" />
            </Dialog.Close>
          </div>

          {/* Notifications List */}
          <div className="flex flex-col">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className="px-6 py-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">
                        {notification.title}
                      </h4>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                        {notification.timeAgo}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {notification.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 absolute w-[100%] bottom-0">
            <div className="flex justify-between space-x-3">
              <button
                onClick={handleMarkAllRead}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-md transition-colors"
              >
                Mark All Read
              </button>
              <button
                onClick={handleViewAll}
                className="px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-md transition-colors"
              >
                View All
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default NotificationModal;