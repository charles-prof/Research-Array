# Design Specification: Research-Array
**Date:** 2026-04-04  
**Status:** Approved  
**Target:** $15B Deal Potential Research Collaboration Platform

## 1. Vision & Audience
Research-Array is a senior-designed research reflector and collaboration tool for small, high-stakes teams (5-10 members). It functions as a "Command Center" for scientific and commercial research, prioritizing rigor, evidence-density, and ROI-driven strategic planning.

## 2. Technical Stack
- **Frontend:** React (TypeScript), Vite, Vanilla CSS.
- **Collaboration/State:** Yjs (CRDTs) for real-time document-centric collaboration.
- **Data Model:** Document-Centric. Every insight, gap, or milestone must be anchored to a literature citation or library entry.

## 3. Core Features & Architecture

### 3.1 Literature Library (The Source of Truth)
- Zotero-like repository for PDFs, patents, and references.
- Manual-first entry (75% manual input) to ensure high-quality data curation.

### 3.2 Dual Heatmaps (The Strategic Lens)
- **Research Value Heatmap:** Projects research impact vs. evidence density.
- **Competition Heatmap:** Maps market competitors vs. internal progress.
- *Architecture:* Dedicated, separate views for each to prevent clutter and maintain focus.

### 3.3 Gap Analysis Timeline (The Synthesis Zone)
- Document-centric timeline view.
- Visualizes "Research Gaps" based on the lack of citations or evidence in specific lifecycle stages.

### 3.4 ROI & Deadline Tracker (The Commercial Path)
- **Maturity vs. Impact (Primary):** ROI calculated via Technology Readiness Level (TRL) and predicted scientific impact.
- **Evidence-Density (Primary):** Tasks prioritized based on their ability to fill "white space" in the Research Value Heatmap.
- **Deal-Milestones (Secondary):** Tracking commercial triggers like patent filings or clinical milestones.

## 4. UI/UX: The "Command Center" (Tri-Pane)
- **Left Pane (Library):** Source navigation and reference management.
- **Center Pane (Active Lens):** Tabbed workspace switching between Timeline, Value Heatmap, and Competition Heatmap.
- **Right Pane (Strategic ROI):** Context-aware sidebar showing maturity scores, deal potential, and critical gaps for the selected research area.

## 5. Implementation Roadmap
1. **Phase 1:** Core CRDT Library and Document structure.
2. **Phase 2:** Value and Competition Heatmap projections.
3. **Phase 3:** ROI Calculation Engine and Strategic Sidebar.
4. **Phase 4:** Timeline Gap Analysis integration.
