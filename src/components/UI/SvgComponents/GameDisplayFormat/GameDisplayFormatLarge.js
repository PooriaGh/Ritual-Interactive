import React from 'react';

const GameDisplayFormatLarge = ({ className, active }) => {
  const stroke = active ? '#42ACEA' : '#E7E7E7';
  return (
    <svg
      viewBox="0 0 36 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0 29H35.7143M0 4H35.7143M0 16.5H35.7143"
        stroke={stroke}
        strokeWidth="7"
      />
    </svg>
  );
};

export default GameDisplayFormatLarge;
