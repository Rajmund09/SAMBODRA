import React from 'react';

export default function Marquee() {
  const items = ['Sambalpuri', 'Ikat', 'Handloom', 'Bandha', 'Kanjivaram', 'Banarasi', 'Paithani', 'Patola'];
  // We duplicate it to ensure smooth scrolling
  const allItems = [...items, ...items];
  
  return (
    <div className="marquee-wrap">
      <div className="marquee">
        {allItems.map((item, idx) => (
          <span key={idx}>{item}</span>
        ))}
      </div>
    </div>
  );
}
