import { mockBus } from './notes.mock';
import { externalUpsertNote } from '../features/notes/notesSlice';

export function startMockRealtime(store) {
  mockBus.on('notes/created', (note) => {
    store.dispatch(externalUpsertNote(note));
  });
  mockBus.on('notes/updated', (note) => {
    store.dispatch(externalUpsertNote(note));
  });
}
