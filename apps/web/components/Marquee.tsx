import React from 'react';

export default function Marquee() {
  const items = [
    'Sambalpuri Ikat',
    'Handloom Heritage',
    'Bandha Double Ikat',
    'Kanjivaram Temple Silk',
    'Banarasi Brocade Jaal',
    'Paithani Peacock',
    'Patan Patola',
    'Jamdani Muslin'
  ];
  
  const allItems = [...items, ...items, ...items];
  
  return (
    <div className="marquee-bar">
      <div className="marquee-track">
        {allItems.map((item, idx) => (
          <div className="marquee-item" key={idx}>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
