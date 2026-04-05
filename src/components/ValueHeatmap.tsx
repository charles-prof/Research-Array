import React from 'react';
import { Paper } from '../types';
import '../styles/heatmaps.css';

interface Props {
  papers: Paper[];
}

export const ValueHeatmap: React.FC<Props> = ({ papers }) => {
  return (
    <div className="heatmap-container">
      <h3 style={{ margin: '0 0 10px 0', color: '#e06c75' }}>Research Value (Impact vs TRL)</h3>
      <svg viewBox="0 0 800 500" className="heatmap-svg">
        {/* Grid lines */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(trl => (
          <line 
            key={trl} 
            x1={50 + (trl * 80)} 
            y1="50" 
            x2={50 + (trl * 80)} 
            y2="450" 
            stroke="#323842" 
            strokeDasharray="4" 
          />
        ))}
        {[0, 20, 40, 60, 80, 100].map(impact => (
          <line 
            key={impact} 
            x1="50" 
            y1={450 - (impact * 4)} 
            x2="770" 
            y2={450 - (impact * 4)} 
            stroke="#323842" 
            strokeDasharray="4" 
          />
        ))}

        {/* X and Y Axis Labels */}
        <text x="400" y="490" textAnchor="middle">Technology Readiness Level (TRL 1-9)</text>
        <text x="15" y="250" textAnchor="middle" transform="rotate(-90 15,250)">Scientific Impact (0-100)</text>
        
        {/* Axis scale labels */}
        {[1, 3, 5, 7, 9].map(trl => (
          <text key={trl} x={50 + (trl * 80)} y="470" textAnchor="middle" style={{ fontSize: '12px' }}>{trl}</text>
        ))}
        {[0, 50, 100].map(impact => (
          <text key={impact} x="40" y={450 - (impact * 4)} textAnchor="end" style={{ fontSize: '12px' }}>{impact}</text>
        ))}

        {/* Bubbles */}
        {papers.map(paper => (
          <circle
            key={paper.id}
            cx={50 + (paper.trl * 80)}
            cy={450 - (paper.impact * 4)}
            r={12 + (paper.trl * 2)}
            fill={paper.source === 'Internal' ? '#98c379' : '#e06c75'}
            className="heatmap-circle"
            opacity={0.7}
          >
            <title>{paper.title} ({paper.source})
TRL: {paper.trl}, Impact: {paper.impact}</title>
          </circle>
        ))}
      </svg>
    </div>
  );
};
