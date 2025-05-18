import React from 'react';

function ActionCard({ title, links }) {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-header bg-primary text-white fw-bold">
        {title}
      </div>
      <ul className="list-group list-group-flush">
        {links.map((link, index) => (
          <li key={index} className="list-group-item">
            <a href={link.href} className="text-decoration-none text-dark">
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActionCard;
