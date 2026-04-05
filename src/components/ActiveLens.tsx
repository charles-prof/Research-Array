import React, { useState } from 'react';
import { useStore } from '../store/yjsStore';
import { ValueHeatmap } from './ValueHeatmap';
import { CompetitionHeatmap } from './CompetitionHeatmap';

export const ActiveLens: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'value' | 'competition'>('value');
  const papers = useStore(state => state.papers);

  return (
    <div className="pane">
      <div className="pane-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>ACTIVE LENS</span>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setActiveTab('value')} 
            style={{ 
              background: activeTab === 'value' ? '#e06c75' : 'transparent', 
              color: activeTab === 'value' ? 'white' : '#abb2bf',
              border: '1px solid #323842',
              padding: '4px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.8em',
              fontWeight: 'bold'
            }}
          >
            VALUE
          </button>
          <button 
            onClick={() => setActiveTab('competition')} 
            style={{ 
              background: activeTab === 'competition' ? '#61afef' : 'transparent', 
              color: activeTab === 'competition' ? 'white' : '#abb2bf',
              border: '1px solid #323842',
              padding: '4px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.8em',
              fontWeight: 'bold'
            }}
          >
            COMPETITION
          </button>
        </div>
      </div>
      <div className="pane-content">
        {activeTab === 'value' ? (
          <ValueHeatmap papers={papers} />
        ) : (
          <CompetitionHeatmap papers={papers} />
        )}
      </div>
    </div>
  );
};
