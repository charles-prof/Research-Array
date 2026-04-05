import * as Y from 'yjs';
import { IndexeddbPersistence } from 'y-indexeddb';
import { WebrtcProvider } from 'y-webrtc';
import { create } from 'zustand';
import type { Paper } from '../types';

const doc = new Y.Doc();
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

if (yPapers.length === 0) {
  yPapers.push(samplePapers);
}

interface StoreState {
  papers: Paper[];
  addPaper: (paper: Paper) => void;
  sync: () => void;
}

export const useStore = create<StoreState>((set) => ({
  papers: yPapers.toArray(),
  addPaper: (paper: Paper) => {
    yPapers.push([paper]);
  },
  sync: () => {
    set({ papers: yPapers.toArray() });
  }
}));

// Automatically sync the store when Yjs changes
yPapers.observe(() => {
  useStore.getState().sync();
});

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
