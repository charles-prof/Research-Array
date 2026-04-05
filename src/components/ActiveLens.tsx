import React from 'react';

export const ActiveLens: React.FC = () => (
  <div className="pane">
    <div className="pane-header">ACTIVE LENS</div>
    <div className="pane-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.3 }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '2em', marginBottom: '10px' }}>[ Heatmap Visualization ]</div>
        <div>Evidence Density vs. Maturity Projections</div>
      </div>
    </div>
  </div>
);
