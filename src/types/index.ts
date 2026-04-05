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

export interface ResearchState {
  papers: Paper[];
}
