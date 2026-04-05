import * as Y from 'yjs';
import { IndexeddbPersistence } from 'y-indexeddb';
import { WebrtcProvider } from 'y-webrtc';
import type { Paper } from '../types';

const doc = new Y.Doc();
// In a real environment, you'd handle provider cleanup, but for Phase 1 this is the base.
if (typeof window !== 'undefined') {
  new IndexeddbPersistence('research-array-db', doc);
  new WebrtcProvider('research-array-room', doc);
}

const yPapers = doc.getArray<Paper>('papers');

const samplePapers: Paper[] = [
  {
    id: '1',
    title: 'Quantum Advantage in 2026',
    author: 'Internal Team',
    year: 2026,
    description: 'Core breakthrough in error correction.',
    trl: 4,
    impact: 85,
    marketValue: '$15B',
    citations: 120,
    source: 'Internal'
  },
  {
    id: '2',
    title: 'Competitor Q-Bit Scaling',
    author: 'Google Research',
    year: 2025,
    description: 'Scaled to 1000 qubits but high error rates.',
    trl: 6,
    impact: 60,
    marketValue: '$10B',
    citations: 450,
    source: 'Competitor: Google'
  }
];

// Initialize with sample data if empty
if (yPapers.length === 0) {
  yPapers.push(samplePapers);
}

export const getYjsDoc = () => doc;

export const addPaper = (paper: Paper) => {
  yPapers.push([paper]);
};

export const getPapers = (): Paper[] => {
  return yPapers.toArray();
};

export const observePapers = (callback: () => void) => {
  yPapers.observe(callback);
};
