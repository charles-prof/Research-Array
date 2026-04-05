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
