import React, { useState } from "react";
import { Eye, Mail, Save, Calendar, Clock } from "lucide-react";

const NotificationCenter: React.FC = () => {
  const [notifyWinners, setNotifyWinners] = useState({
    email: true,
    whatsapp: true,
  });

  const [notifyParticipants, setNotifyParticipants] = useState({
    emailOnly: false,
  });

  const [inviteMessage, setInviteMessage] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [autoPublish, setAutoPublish] = useState(true);

  const handlePreview = () => {
    console.log("Preview message");
  };

  const handleSendNotifications = () => {
    console.log("Sending notifications...", {
      notifyWinners,
      notifyParticipants,
      inviteMessage,
      eventDate,
      eventTime,
      autoPublish,
    });
  };

  const handleSave = () => {
    console.log("Saving...");
  };

  return (
    <div className=" py-6">
      <div className=" bg-white shadow-sm rounded-lg overflow-hidden">
        {/* Header */}
        <div className="btn-theme p-4">
          <h2 className="text-xl font-semibold">Notification Center</h2>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            {/* Notify Winners */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Notify Winners:
              </h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifyWinners.email}
                    onChange={(e) =>
                      setNotifyWinners({
                        ...notifyWinners,
                        email: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Email</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifyWinners.whatsapp}
                    onChange={(e) =>
                      setNotifyWinners({
                        ...notifyWinners,
                        whatsapp: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Whatsapp</span>
                </label>
              </div>
            </div>

            {/* Notify Participants */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Notify Participants:
              </h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifyParticipants.emailOnly}
                    onChange={(e) =>
                      setNotifyParticipants({
                        ...notifyParticipants,
                        emailOnly: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Email Only</span>
                </label>
              </div>
            </div>
          </div>

          {/* General Invite Message */}
          <div className="mb-6">
            <label className="block font-semibold text-gray-900 mb-2">
              General Invite Message
            </label>
            <textarea
              value={inviteMessage}
              onChange={(e) => setInviteMessage(e.target.value)}
              placeholder="Enter invitation message..."
              rows={6}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Event Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-semibold text-gray-900 mb-2">
                Event Date
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  placeholder="mm/dd/yyyy"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <Calendar className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-900 mb-2">
                Event Time
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  placeholder="--:-- --"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <Clock className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Auto-Publish Checkbox */}
          <div className="mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={autoPublish}
                onChange={(e) => setAutoPublish(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded focus:ring-2 focus:ring-teal-500"
              />
              <span className="text-sm text-gray-700">
                Auto-Publish to Gallery: After Event Completion
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={handlePreview}
              className="px-5 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Preview Message
            </button>
            <button
              onClick={handleSendNotifications}
              className="px-5 py-2 bg-teal-600 text-white rounded-md text-sm font-medium hover:bg-teal-700 transition-colors flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Send Notifications
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;