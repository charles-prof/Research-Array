import React, { useEffect, useState } from 'react';
import { getPapers, observePapers, addPaper } from '../store/yjsStore';
import type { Paper } from '../types';

export const LibraryPane: React.FC = () => {
  const [papers, setPapers] = useState<Paper[]>(getPapers());
  const [title, setTitle] = useState('');

  useEffect(() => {
    observePapers(() => setPapers(getPapers()));
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addPaper({
      id: crypto.randomUUID(),
      title: title.trim(),
      author: 'Unknown',
      year: new Date().getFullYear(),
      description: '',
      trl: 1,
      impact: 0
    });
    setTitle('');
  };

  return (
    <div className="pane">
      <div className="pane-header">LIBRARY</div>
      <div className="pane-content">
        <form onSubmit={handleAdd} style={{ marginBottom: '20px' }}>
          <input 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            placeholder="New Paper Title" 
            style={{ 
              width: '100%', 
              padding: '8px', 
              background: '#1a1d23', 
              border: '1px solid #323842', 
              color: '#abb2bf',
              borderRadius: '4px',
              marginBottom: '8px'
            }} 
          />
          <button 
            type="submit" 
            style={{ 
              width: '100%', 
              padding: '8px', 
              background: '#e06c75', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Add Paper
          </button>
        </form>

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
