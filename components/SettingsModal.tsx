import React, { useState } from 'react';
import { Guest, WifiConfig } from '../types';
import { X } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  guest: Guest;
  setGuest: (g: Guest) => void;
  wifi: WifiConfig;
  setWifi: (w: WifiConfig) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, guest, setGuest, wifi, setWifi }) => {
  const [localGuestName, setLocalGuestName] = useState(guest.name);
  const [localWifiSsid, setLocalWifiSsid] = useState(wifi.ssid);
  const [localWifiPass, setLocalWifiPass] = useState(wifi.passcode);

  if (!isOpen) return null;

  const handleSave = () => {
    setGuest({ ...guest, name: localGuestName });
    setWifi({ ...wifi, ssid: localWifiSsid, passcode: localWifiPass });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif text-white">Dashboard Settings</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs uppercase text-slate-400 mb-1">Guest Name</label>
            <input
              type="text"
              value={localGuestName}
              onChange={(e) => setLocalGuestName(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-800">
            <h3 className="text-sm font-medium text-teal-400 mb-3 uppercase tracking-wider">WiFi Configuration</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-xs uppercase text-slate-400 mb-1">SSID</label>
                    <input
                    type="text"
                    value={localWifiSsid}
                    onChange={(e) => setLocalWifiSsid(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-xs uppercase text-slate-400 mb-1">Passcode</label>
                    <input
                    type="text"
                    value={localWifiPass}
                    onChange={(e) => setLocalWifiPass(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 text-slate-400 hover:text-white transition-colors">Cancel</button>
            <button
                onClick={handleSave}
                className="bg-teal-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-teal-500 transition-colors shadow-lg shadow-teal-900/50"
            >
                Save Changes
            </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;