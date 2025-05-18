import React from 'react';

function StatsCard({ title, value }) {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h5 className="card-title text-primary fw-bold">{title}</h5>
        <pre className="card-text text-dark m-0" style={{ whiteSpace: 'pre-wrap' }}>
          {value}
        </pre>
      </div>
    </div>
  );
}

export default StatsCard;
