import React, { useState } from 'react';
import { Bell, MessageCircle, Upload } from 'lucide-react';

export default function PushNotificationContent() {
  const [notificationType, setNotificationType] = useState('All');
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationDescription, setNotificationDescription] = useState('');
  const [notificationTo, setNotificationTo] = useState('');

  const [receiverType, setReceiverType] = useState('All Users');
  const [messageType, setMessageType] = useState('Message');
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [chatTo, setChatTo] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleNotificationSubmit = () => {
    console.log('Push Notification:', {
      type: notificationType,
      title: notificationTitle,
      description: notificationDescription,
      to: notificationType === 'Specific' ? notificationTo : null
    });
  };

  const handleChatSubmit = () => {
    console.log('Send Chat:', {
      receiverType,
      messageType,
      message: messageType === 'Message' ? message : selectedFile,
      to: receiverType === 'Specific User' ? chatTo : null
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Push Notification & Chat</h2>

      {/* Push Notification Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center gap-2 mb-6">
          <Bell className="text-indigo-600" size={24} />
          <h3 className="text-xl font-semibold text-gray-800">Push Notification</h3>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <label className="text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              value={notificationType}
              onChange={(e) => setNotificationType(e.target.value)}
              className="md:col-span-3 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>All</option>
              <option>Specific</option>
              <option>Free</option>
              <option>Gold</option>
              <option>Platinum</option>
            </select>
          </div>

          {notificationType === 'Specific' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <label className="text-sm font-medium text-gray-700">
                To
              </label>
              <input
                type="text"
                value={notificationTo}
                onChange={(e) => setNotificationTo(e.target.value)}
                placeholder="Select recipient"
                className="md:col-span-3 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <label className="text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={notificationTitle}
              onChange={(e) => setNotificationTitle(e.target.value)}
              placeholder="Notification Title"
              className="md:col-span-3 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
            <label className="text-sm font-medium text-gray-700 pt-2">
              Description
            </label>
            <textarea
              value={notificationDescription}
              onChange={(e) => setNotificationDescription(e.target.value)}
              placeholder="Description"
              rows={4}
              className="md:col-span-3 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleNotificationSubmit}
              className="px-6 py-2.5 bg-gradient-to-r from-[#b31f5e] to-[#d3543c]  text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Submit
            </button>
            <button
              onClick={() => {
                setNotificationType('All');
                setNotificationTitle('');
                setNotificationDescription('');
                setNotificationTo('');
              }}
              className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Send Chat User Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center gap-2 mb-6">
          <MessageCircle className="text-indigo-600" size={24} />
          <h3 className="text-xl font-semibold text-gray-800">Send Chat User</h3>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <label className="text-sm font-medium text-gray-700">
              Receiver Type
            </label>
            <select
              value={receiverType}
              onChange={(e) => setReceiverType(e.target.value)}
              className="md:col-span-3 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>All Users</option>
              <option>Specific User</option>
            </select>
          </div>

          {receiverType === 'Specific User' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <label className="text-sm font-medium text-gray-700">
                To
              </label>
              <input
                type="text"
                value={chatTo}
                onChange={(e) => setChatTo(e.target.value)}
                placeholder="Select recipient"
                className="md:col-span-3 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <label className="text-sm font-medium text-gray-700">
              Message Type
            </label>
            <select
              value={messageType}
              onChange={(e) => {
                setMessageType(e.target.value);
                setMessage('');
                setSelectedFile(null);
              }}
              className="md:col-span-3 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>Message</option>
              <option>Image</option>
            </select>
          </div>

          {messageType === 'Message' ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
              <label className="text-sm font-medium text-gray-700 pt-2">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                rows={4}
                className="md:col-span-3 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <label className="text-sm font-medium text-gray-700">
                Upload Image (Optional)
              </label>
              <div className="md:col-span-3 flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer"
                >
                  Pilih File
                </label>
                <span className="text-sm text-gray-500">
                  {selectedFile ? selectedFile.name : 'Tidak ada file yang dipilih'}
                </span>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleChatSubmit}
              className="px-6 py-2.5 bg-gradient-to-r from-[#b31f5e] to-[#d3543c]  text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Submit
            </button>
            <button
              onClick={() => {
                setReceiverType('All Users');
                setMessageType('Message');
                setMessage('');
                setSelectedFile(null);
                setChatTo('');
              }}
              className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}