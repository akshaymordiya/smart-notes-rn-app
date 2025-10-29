import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../src/state/rootReducer';
import { notesSelectors } from '../src/features/notes/notesSlice';

test('notes reducer initializes', () => {
  const store = configureStore({ reducer: rootReducer });
  const all = notesSelectors.selectAll(store.getState());
  expect(Array.isArray(all)).toBe(true);
});


