import { expect, test } from 'vitest';
import { addPaper, getPapers } from './yjsStore';

test('can add and retrieve papers from Yjs doc', () => {
  const paper = { id: '1', title: 'Test', author: 'Author', year: 2024, description: 'Desc', trl: 1, impact: 10 };
  addPaper(paper);
  const papers = getPapers();
  expect(papers).toContainEqual(paper);
});
