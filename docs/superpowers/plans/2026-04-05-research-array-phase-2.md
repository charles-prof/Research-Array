# Phase 2: Value and Competition Heatmap Projections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement two strategic heatmaps (Research Value and Competition) to visualize scientific impact, TRL, market value, and competitive density for a $15B deal potential.

**Architecture:** Use a tabbed `ActiveLens` container to switch between two specialized SVG-based heatmap components. Data is pulled from the Yjs-backed `ResearchState`.

**Tech Stack:** React (v19), TypeScript, Yjs, Vanilla CSS.

---

### Task 1: Update Data Model (Paper Interface)

**Files:**
- Modify: `src/types/index.ts`
- Test: `src/types/index.ts` (Type check)

- [ ] **Step 1: Update the `Paper` interface**

```typescript
export interface Paper {
  id: string;
  title: string;
  author: string;
  year: number;
  description: string;
  trl: number; // Technology Readiness Level 1-9
  impact: number; // Scientific Impact score 0-100
  marketValue: string; // e.g., "$15B by 2028"
  citations: number; // Evidence Density metric
  source: string; // e.g., "Internal", "Competitor: Google"
}
```

- [ ] **Step 2: Verify type consistency**

Run: `npx tsc --noEmit`
Expected: PASS (Check for any downstream breakages in `yjsStore.ts` or `LibraryPane.tsx`)

- [ ] **Step 3: Commit**

```bash
git add src/types/index.ts
git commit -m "types: update Paper interface with Phase 2 fields"
```

---

### Task 2: Update Yjs Store with Sample Data

**Files:**
- Modify: `src/store/yjsStore.ts`

- [ ] **Step 1: Add sample Phase 2 papers to the initial state**

```typescript
// in yjsStore.ts (init function or similar)
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
```

- [ ] **Step 2: Commit**

```bash
git add src/store/yjsStore.ts
git commit -m "store: add Phase 2 sample data"
```

---

### Task 3: Implement Value Heatmap Component

**Files:**
- Create: `src/components/ValueHeatmap.tsx`
- Create: `src/styles/heatmaps.css`

- [ ] **Step 1: Create the `ValueHeatmap` skeleton**

```tsx
import React from 'react';
import { Paper } from '../types';

interface Props {
  papers: Paper[];
}

export const ValueHeatmap: React.FC<Props> = ({ papers }) => {
  return (
    <div className="heatmap-container">
      <svg viewBox="0 0 800 500" className="heatmap-svg">
        {/* X and Y Axis Labels */}
        <text x="400" y="480" textAnchor="middle">TRL (1-9)</text>
        <text x="20" y="250" textAnchor="middle" transform="rotate(-90 20,250)">Scientific Impact (0-100)</text>
        
        {/* Bubbles */}
        {papers.map(paper => (
          <circle
            key={paper.id}
            cx={50 + (paper.trl * 80)}
            cy={450 - (paper.impact * 4)}
            r={10}
            fill={paper.source === 'Internal' ? '#2ecc71' : '#e74c3c'}
            opacity={0.7}
          />
        ))}
      </svg>
    </div>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ValueHeatmap.tsx
git commit -m "feat: implement ValueHeatmap basic visualization"
```

---

### Task 4: Implement Competition Heatmap Component

**Files:**
- Create: `src/components/CompetitionHeatmap.tsx`

- [ ] **Step 1: Create the `CompetitionHeatmap` skeleton**

```tsx
import React from 'react';
import { Paper } from '../types';

interface Props {
  papers: Paper[];
}

export const CompetitionHeatmap: React.FC<Props> = ({ papers }) => {
  return (
    <div className="heatmap-container">
      <svg viewBox="0 0 800 500" className="heatmap-svg">
        <text x="400" y="480" textAnchor="middle">TRL (1-9)</text>
        <text x="20" y="250" textAnchor="middle" transform="rotate(-90 20,250)">Citations (Density)</text>
        
        {papers.map(paper => (
          <rect
            key={paper.id}
            x={50 + (paper.trl * 80)}
            y={450 - (Math.log10(paper.citations + 1) * 100)}
            width={20}
            height={20}
            fill={paper.source === 'Internal' ? '#3498db' : '#9b59b6'}
          />
        ))}
      </svg>
    </div>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/CompetitionHeatmap.tsx
git commit -m "feat: implement CompetitionHeatmap basic visualization"
```

---

### Task 5: Integrate into Active Lens (Tabbed View)

**Files:**
- Modify: `src/components/ActiveLens.tsx`

- [ ] **Step 1: Add tab state and component switching**

```tsx
import React, { useState } from 'react';
import { ValueHeatmap } from './ValueHeatmap';
import { CompetitionHeatmap } from './CompetitionHeatmap';
// import { useStore } from '../store/yjsStore'; // Assuming a hook exists

export const ActiveLens: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'value' | 'competition'>('value');
  const papers = []; // Replace with actual store data

  return (
    <div className="pane">
      <div className="pane-header" style={{ display: 'flex', gap: '20px' }}>
        <button onClick={() => setActiveTab('value')} style={{ opacity: activeTab === 'value' ? 1 : 0.5 }}>Value Heatmap</button>
        <button onClick={() => setActiveTab('competition')} style={{ opacity: activeTab === 'competition' ? 1 : 0.5 }}>Competition</button>
      </div>
      <div className="pane-content">
        {activeTab === 'value' ? <ValueHeatmap papers={papers} /> : <CompetitionHeatmap papers={papers} />}
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ActiveLens.tsx
git commit -m "feat: add tabbed navigation to ActiveLens"
```
