# Research-Array Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish the foundational Yjs real-time collaboration engine and the "Command Center" (Tri-Pane) layout.

**Architecture:** Document-Centric Yjs data model with a responsive Tri-Pane React layout. Data is persisted locally via IndexedDB and synced via WebRTC.

**Tech Stack:** React, TypeScript, Vite, Yjs, y-webrtc, y-indexeddb, Vitest, Vanilla CSS.

---

### Task 1: Infrastructure & Testing Setup

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`

- [ ] **Step 1: Add dev dependencies to package.json**

```json
{
  "devDependencies": {
    "vitest": "^3.0.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "jsdom": "^26.0.0"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom && npm install y-indexeddb`

- [ ] **Step 3: Create vitest.config.ts**

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
});
```

- [ ] **Step 4: Create src/test/setup.ts**

```typescript
import '@testing-library/jest-dom';
```

- [ ] **Step 5: Verify setup with a dummy test**

Create `src/infrastructure.test.ts`:
```typescript
import { expect, test } from 'vitest';

test('infrastructure is ready', () => {
  expect(true).toBe(true);
});
```
Run: `npx vitest run src/infrastructure.test.ts`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add package.json vitest.config.ts src/test/setup.ts src/infrastructure.test.ts
git commit -m "chore: setup vitest and basic infrastructure"
```

---

### Task 2: Core Yjs State & Library Store

**Files:**
- Create: `src/store/yjsStore.ts`
- Create: `src/types/index.ts`
- Test: `src/store/yjsStore.test.ts`

- [ ] **Step 1: Define core types**

Create `src/types/index.ts`:
```typescript
export interface Paper {
  id: string;
  title: string;
  author: string;
  year: number;
  description: string;
  trl: number; // Technology Readiness Level 1-9
  impact: number; // Scientific Impact score
}

export interface ResearchState {
  papers: Paper[];
}
```

- [ ] **Step 2: Write failing test for Yjs store**

Create `src/store/yjsStore.test.ts`:
```typescript
import { expect, test, beforeEach } from 'vitest';
import { getYjsDoc, addPaper, getPapers } from './yjsStore';

test('can add and retrieve papers from Yjs doc', () => {
  const paper = { id: '1', title: 'Test', author: 'Author', year: 2024, description: 'Desc', trl: 1, impact: 10 };
  addPaper(paper);
  const papers = getPapers();
  expect(papers).toContainEqual(paper);
});
```

- [ ] **Step 3: Implement Yjs store**

Create `src/store/yjsStore.ts`:
```typescript
import * as Y from 'yjs';
import { IndexeddbPersistence } from 'y-indexeddb';
import { WebrtcProvider } from 'y-webrtc';
import { Paper } from '../types';

const doc = new Y.Doc();
new IndexeddbPersistence('research-array-db', doc);
new WebrtcProvider('research-array-room', doc);

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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/store/yjsStore.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/types/index.ts src/store/yjsStore.ts src/store/yjsStore.test.ts
git commit -m "feat: implement core Yjs store and paper management"
```

---

### Task 3: Tri-Pane Layout Components

**Files:**
- Create: `src/styles/layout.css`
- Modify: `src/App.tsx`
- Create: `src/components/LibraryPane.tsx`
- Create: `src/components/ActiveLens.tsx`
- Create: `src/components/StrategicSidebar.tsx`

- [ ] **Step 1: Create layout CSS**

Create `src/styles/layout.css`:
```css
.app-layout {
  display: grid;
  grid-template-columns: 260px 1fr 300px;
  height: 100vh;
  overflow: hidden;
  background: #0f1115;
  color: #abb2bf;
}

.pane {
  border-right: 1px solid #323842;
  display: flex;
  flex-direction: column;
}

.pane-right {
  border-right: none;
  border-left: 1px solid #323842;
}

.pane-header {
  padding: 16px;
  font-weight: 600;
  border-bottom: 1px solid #323842;
  background: #1a1d23;
}
```

- [ ] **Step 2: Implement LibraryPane component**

Create `src/components/LibraryPane.tsx`:
```tsx
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
      <div style={{ padding: '12px' }}>
        {papers.map(p => (
          <div key={p.id} style={{ marginBottom: '8px', padding: '8px', background: '#23272e', borderRadius: '4px' }}>
            {p.title}
          </div>
        ))}
      </div>
    </div>
  );
};
```

- [ ] **Step 3: Implement ActiveLens and StrategicSidebar placeholders**

Create `src/components/ActiveLens.tsx`:
```tsx
import React from 'react';

export const ActiveLens: React.FC = () => (
  <div className="pane">
    <div className="pane-header">ACTIVE LENS</div>
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyItems: 'center', padding: '40px' }}>
      Heatmap Placeholder
    </div>
  </div>
);
```

Create `src/components/StrategicSidebar.tsx`:
```tsx
import React from 'react';

export const StrategicSidebar: React.FC = () => (
  <div className="pane pane-right">
    <div className="pane-header">STRATEGIC ROI</div>
    <div style={{ padding: '20px' }}>ROI Metrics Placeholder</div>
  </div>
);
```

- [ ] **Step 4: Update App.tsx to use Tri-Pane layout**

Modify `src/App.tsx`:
```tsx
import './styles/layout.css';
import { LibraryPane } from './components/LibraryPane';
import { ActiveLens } from './components/ActiveLens';
import { StrategicSidebar } from './components/StrategicSidebar';

function App() {
  return (
    <div className="app-layout">
      <LibraryPane />
      <ActiveLens />
      <StrategicSidebar />
    </div>
  );
}

export default App;
```

- [ ] **Step 5: Commit**

```bash
git add src/styles/layout.css src/components/ src/App.tsx
git commit -m "feat: implement foundational Tri-Pane layout"
```

---

### Task 4: Library Interaction (Add Paper)

**Files:**
- Modify: `src/components/LibraryPane.tsx`

- [ ] **Step 1: Add "Add Paper" functionality**

Modify `src/components/LibraryPane.tsx` to include a simple form:
```tsx
import { addPaper } from '../store/yjsStore';
// ... inside component
const [title, setTitle] = useState('');

const handleAdd = () => {
  if (!title) return;
  addPaper({
    id: crypto.randomUUID(),
    title,
    author: 'Unknown',
    year: new Date().getFullYear(),
    description: '',
    trl: 1,
    impact: 0
  });
  setTitle('');
};

// ... in JSX
<div style={{ padding: '12px' }}>
  <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New Paper Title" />
  <button onClick={handleAdd}>Add</button>
</div>
```

- [ ] **Step 2: Verify in browser**

Run: `npm run dev`
Expected: Should be able to add a paper and see it appear in the list.

- [ ] **Step 3: Commit**

```bash
git add src/components/LibraryPane.tsx
git commit -m "feat: add basic paper insertion to library"
```
