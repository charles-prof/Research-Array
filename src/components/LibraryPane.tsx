import React, { useEffect, useState } from 'react';
import { getPapers, observePapers } from '../store/yjsStore';
import { Paper } from '../types';

export const LibraryPane: React.FC = () => {
  const [papers, setPapers] = useState<Paper[]>(getPapers());

  useEffect(() => {
    observePapers(() => setPapers(getPapers()));
  }, []);

  return (
    <div className="pane">
      <div className="pane-header">LIBRARY</div>
      <div className="pane-content">
        {papers.length === 0 ? (
          <div style={{ fontStyle: 'italic', opacity: 0.5 }}>No papers added yet.</div>
        ) : (
          papers.map(p => (
            <div key={p.id} style={{ marginBottom: '8px', padding: '8px', background: '#23272e', borderRadius: '4px', border: '1px solid #3e4451' }}>
              <div style={{ fontWeight: 'bold' }}>{p.title}</div>
              <div style={{ fontSize: '0.85em', opacity: 0.7 }}>{p.author} • {p.year}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
