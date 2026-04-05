import React from 'react';
import { Paper } from '../types';
import '../styles/heatmaps.css';

interface Props {
  papers: Paper[];
}

export const CompetitionHeatmap: React.FC<Props> = ({ papers }) => {
  return (
    <div className="heatmap-container">
      <h3 style={{ margin: '0 0 10px 0', color: '#61afef' }}>Competition Matrix (Density vs TRL)</h3>
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

        {/* X and Y Axis Labels */}
        <text x="400" y="490" textAnchor="middle">Technology Readiness Level (TRL 1-9)</text>
        <text x="15" y="250" textAnchor="middle" transform="rotate(-90 15,250)">Evidence Density (Citations)</text>
        
        {/* Axis scale labels */}
        {[1, 3, 5, 7, 9].map(trl => (
          <text key={trl} x={50 + (trl * 80)} y="470" textAnchor="middle" style={{ fontSize: '12px' }}>{trl}</text>
        ))}

        {papers.map(paper => (
          <rect
            key={paper.id}
            x={50 + (paper.trl * 80) - 10}
            y={450 - (Math.log10(paper.citations + 1) * 120)}
            width={20}
            height={20}
            fill={paper.source === 'Internal' ? '#61afef' : '#c678dd'}
            className="heatmap-rect"
            opacity={0.8}
            rx="4"
          >
            <title>{paper.title} ({paper.source})
Citations: {paper.citations}</title>
          </rect>
        ))}
      </svg>
    </div>
  );
};
