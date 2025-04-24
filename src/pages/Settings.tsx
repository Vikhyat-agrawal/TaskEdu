import { useState } from 'react';
import { Bell, User, Shield, PaletteIcon, Trash2 } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account preferences and application settings</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('account')}
            className={`px-4 py-3 font-medium text-sm flex items-center gap-2 ${
              activeTab === 'account' 
                ? 'border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <User size={16} />
            <span>Account</span>
          </button>
          
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-4 py-3 font-medium text-sm flex items-center gap-2 ${
              activeTab === 'notifications' 
                ? 'border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Bell size={16} />
            <span>Notifications</span>
          </button>
          
          <button
            onClick={() => setActiveTab('appearance')}
            className={`px-4 py-3 font-medium text-sm flex items-center gap-2 ${
              activeTab === 'appearance' 
                ? 'border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <PaletteIcon size={16} />
            <span>Appearance</span>
          </button>
          
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-3 font-medium text-sm flex items-center gap-2 ${
              activeTab === 'privacy' 
                ? 'border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Shield size={16} />
            <span>Privacy</span>
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'account' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900">Account Settings</h2>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      className="px-3 py-2 bg-white border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                      defaultValue="Alex Student"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="px-3 py-2 bg-white border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                      defaultValue="alex@university.edu"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Student ID
                    </label>
                    <input
                      type="text"
                      className="px-3 py-2 bg-white border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                      defaultValue="2023ABC456"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Major
                    </label>
                    <input
                      type="text"
                      className="px-3 py-2 bg-white border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                      defaultValue="Computer Science"
                    />
                  </div>
                </div>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Change Password</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="px-3 py-2 bg-white border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="px-3 py-2 bg-white border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="px-3 py-2 bg-white border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-4">Danger Zone</h3>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-medium text-red-800">Delete Account</h4>
                  <p className="text-sm text-red-600 mt-1 mb-3">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <button className="inline-flex items-center gap-1 bg-white text-red-600 border border-red-300 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
                    <Trash2 size={16} />
                    <span>Delete Account</span>
                  </button>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900">Notification Settings</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <h3 className="font-medium">Task Reminders</h3>
                    <p className="text-sm text-gray-600">Receive notifications for upcoming tasks</p>
                  </div>
                  <div className="relative inline-block w-12 h-6">
                    <input 
                      type="checkbox" 
                      id="task-reminders" 
                      className="opacity-0 w-0 h-0"
                      defaultChecked
                    />
                    <label 
                      htmlFor="task-reminders"
                      className="cursor-pointer absolute inset-0 bg-gray-300 rounded-full transition-all duration-300 before:absolute before:content-[''] before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all"
                    />
                  </div>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <h3 className="font-medium">Project Updates</h3>
                    <p className="text-sm text-gray-600">Receive notifications when projects are updated</p>
                  </div>
                  <div className="relative inline-block w-12 h-6">
                    <input 
                      type="checkbox" 
                      id="project-updates" 
                      className="opacity-0 w-0 h-0"
                      defaultChecked
                    />
                    <label 
                      htmlFor="project-updates"
                      className="cursor-pointer absolute inset-0 bg-gray-300 rounded-full transition-all duration-300 before:absolute before:content-[''] before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all"
                    />
                  </div>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <h3 className="font-medium">Daily Digest</h3>
                    <p className="text-sm text-gray-600">Receive a daily summary of your tasks</p>
                  </div>
                  <div className="relative inline-block w-12 h-6">
                    <input 
                      type="checkbox" 
                      id="daily-digest" 
                      className="opacity-0 w-0 h-0"
                    />
                    <label 
                      htmlFor="daily-digest"
                      className="cursor-pointer absolute inset-0 bg-gray-300 rounded-full transition-all duration-300 before:absolute before:content-[''] before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all"
                    />
                  </div>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-gray-600">Receive notifications via email</p>
                  </div>
                  <div className="relative inline-block w-12 h-6">
                    <input 
                      type="checkbox" 
                      id="email-notifications" 
                      className="opacity-0 w-0 h-0"
                      defaultChecked
                    />
                    <label 
                      htmlFor="email-notifications"
                      className="cursor-pointer absolute inset-0 bg-gray-300 rounded-full transition-all duration-300 before:absolute before:content-[''] before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Save Preferences
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900">Appearance Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Theme</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <button className="border border-blue-500 rounded-lg p-4 flex flex-col items-center space-y-2 bg-white">
                      <div className="h-16 w-full bg-white border border-gray-200 rounded-md"></div>
                      <span className="text-sm font-medium">Light</span>
                    </button>
                    <button className="border border-gray-200 rounded-lg p-4 flex flex-col items-center space-y-2">
                      <div className="h-16 w-full bg-gray-800 border border-gray-700 rounded-md"></div>
                      <span className="text-sm">Dark</span>
                    </button>
                    <button className="border border-gray-200 rounded-lg p-4 flex flex-col items-center space-y-2">
                      <div className="h-16 w-full bg-gradient-to-b from-white to-gray-800 border border-gray-200 rounded-md"></div>
                      <span className="text-sm">System</span>
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Accent Color</h3>
                  <div className="flex flex-wrap gap-3">
                    <button className="h-8 w-8 rounded-full bg-blue-500 ring-2 ring-offset-2 ring-blue-500"></button>
                    <button className="h-8 w-8 rounded-full bg-purple-500"></button>
                    <button className="h-8 w-8 rounded-full bg-teal-500"></button>
                    <button className="h-8 w-8 rounded-full bg-orange-500"></button>
                    <button className="h-8 w-8 rounded-full bg-red-500"></button>
                    <button className="h-8 w-8 rounded-full bg-green-500"></button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Font Size</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs">A</span>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      defaultValue="3"
                      className="w-full"
                    />
                    <span className="text-lg">A</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Save Preferences
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900">Privacy Settings</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <h3 className="font-medium">Profile Visibility</h3>
                    <p className="text-sm text-gray-600">Allow others to see your profile</p>
                  </div>
                  <div className="relative inline-block w-12 h-6">
                    <input 
                      type="checkbox" 
                      id="profile-visibility" 
                      className="opacity-0 w-0 h-0"
                      defaultChecked
                    />
                    <label 
                      htmlFor="profile-visibility"
                      className="cursor-pointer absolute inset-0 bg-gray-300 rounded-full transition-all duration-300 before:absolute before:content-[''] before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all"
                    />
                  </div>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <h3 className="font-medium">Task Visibility</h3>
                    <p className="text-sm text-gray-600">Allow team members to see your tasks</p>
                  </div>
                  <div className="relative inline-block w-12 h-6">
                    <input 
                      type="checkbox" 
                      id="task-visibility" 
                      className="opacity-0 w-0 h-0"
                      defaultChecked
                    />
                    <label 
                      htmlFor="task-visibility"
                      className="cursor-pointer absolute inset-0 bg-gray-300 rounded-full transition-all duration-300 before:absolute before:content-[''] before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all"
                    />
                  </div>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <h3 className="font-medium">Analytics & Tracking</h3>
                    <p className="text-sm text-gray-600">Allow us to collect anonymous usage data</p>
                  </div>
                  <div className="relative inline-block w-12 h-6">
                    <input 
                      type="checkbox" 
                      id="analytics" 
                      className="opacity-0 w-0 h-0"
                    />
                    <label 
                      htmlFor="analytics"
                      className="cursor-pointer absolute inset-0 bg-gray-300 rounded-full transition-all duration-300 before:absolute before:content-[''] before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Data Export</h3>
                <p className="text-sm text-gray-600 mb-3">
                  You can export all your data at any time. The export will contain all your tasks, projects, and settings.
                </p>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  Export Data
                </button>
              </div>
              
              <div className="flex justify-end">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Save Privacy Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;