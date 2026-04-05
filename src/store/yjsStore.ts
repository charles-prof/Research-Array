import * as Y from 'yjs';
import { IndexeddbPersistence } from 'y-indexeddb';
import { WebrtcProvider } from 'y-webrtc';
import { Paper } from '../types';

const doc = new Y.Doc();
// In a real environment, you'd handle provider cleanup, but for Phase 1 this is the base.
if (typeof window !== 'undefined') {
  new IndexeddbPersistence('research-array-db', doc);
  new WebrtcProvider('research-array-room', doc);
}

const yPapers = doc.getArray<Paper>('papers');

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
