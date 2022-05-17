import React from 'react';

const GameDisplayFormatSmall = ({ className, active }) => {
  const fill = active ? '#42ACEA' : '#E7E7E7';
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M0 0H7.99993V8H0V0Z" fill={fill} />
      <path d="M0 12H7.99993V20H0V12Z" fill={fill} />
      <path d="M7.99993 24H0V32H7.99993V24Z" fill={fill} />
      <path d="M12 0H19.9999V8H12V0Z" fill={fill} />
      <path d="M19.9999 12H12V20H19.9999V12Z" fill={fill} />
      <path d="M12 24H19.9999V32H12V24Z" fill={fill} />
      <path d="M31.9997 0H23.9998V8H31.9997V0Z" fill={fill} />
      <path d="M23.9998 12H31.9997V20H23.9998V12Z" fill={fill} />
      <path d="M31.9997 24H23.9998V32H31.9997V24Z" fill={fill} />
    </svg>
  );
};

export default GameDisplayFormatSmall;
