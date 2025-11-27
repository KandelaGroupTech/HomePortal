import React from 'react';
import QRCode from 'react-qr-code';
import { Wifi } from 'lucide-react';
import { WifiConfig } from '../types';

interface WifiCardProps {
  config: WifiConfig;
}

const WifiCard: React.FC<WifiCardProps> = ({ config }) => {
  const wifiString = `WIFI:S:${config.ssid};T:WPA;P:${config.passcode};;`;

  return (
    <div className="bg-black/40 backdrop-blur-md rounded-3xl p-6 flex flex-row items-center gap-6 shadow-xl shadow-black/50 border border-white/10 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
      <div className="bg-white p-3 rounded-xl border border-white/20">
        <QRCode
          value={wifiString}
          size={100}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          viewBox={`0 0 256 256`}
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-teal-400 mb-1">
          <Wifi className="w-5 h-5" />
          <span className="text-sm font-bold tracking-wider uppercase">High Speed WiFi</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-slate-400 uppercase">Network</span>
          <span className="font-medium text-lg text-white">{config.ssid}</span>
        </div>
        <div className="flex flex-col mt-1">
          <span className="text-xs text-slate-400 uppercase">Password</span>
          <span className="font-mono text-lg text-white tracking-wider bg-white/10 px-2 py-0.5 rounded border border-white/10 w-fit">{config.passcode}</span>
        </div>
      </div>
    </div>
  );
};

export default WifiCard;