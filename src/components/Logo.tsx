
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="relative w-8 h-8 rounded-md bg-trackscore-blue text-white flex items-center justify-center shadow-sm overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-trackscore-blue/80 to-trackscore-blue"></div>
      <span className="font-bold text-lg relative z-10">T</span>
    </div>
  );
};

export default Logo;
