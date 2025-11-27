import React, { useState, useEffect } from 'react';

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="flex flex-col text-white">
      <div className="text-7xl font-light tracking-tighter font-serif drop-shadow-lg">
        {formatTime(time)}
      </div>
      <div className="text-xl opacity-90 font-light mt-1 tracking-wide uppercase text-white/90 drop-shadow-md">
        {formatDate(time)}
      </div>
    </div>
  );
};

export default Clock;