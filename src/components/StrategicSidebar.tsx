import React from 'react';

export const StrategicSidebar: React.FC = () => (
  <div className="pane pane-right">
    <div className="pane-header">STRATEGIC ROI</div>
    <div className="pane-content">
      <div style={{ marginBottom: '20px', padding: '16px', border: '1px dashed #3e4451', borderRadius: '4px' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#61afef' }}>Deal Maturity</h4>
        <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>TBD</div>
      </div>
      <div style={{ padding: '16px', background: '#2c313a', borderRadius: '4px' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#98c379' }}>Critical Gaps</h4>
        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9em' }}>
          <li>Insufficient Citation Density</li>
          <li>Low Evidence Maturity (TRL 1-2)</li>
        </ul>
      </div>
    </div>
  </div>
);
