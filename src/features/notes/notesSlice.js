import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import {
  fetchNotesThunk,
  createNoteThunk,
  deleteNoteThunk,
  updateNoteThunk,
} from './notesThunks';

const adapter = createEntityAdapter({
  selectId: (note) => note.id,
  sortComparer: (a, b) => (a.updatedAt < b.updatedAt ? 1 : -1),
});

const slice = createSlice({
  name: 'notes',
  initialState: adapter.getInitialState({ loading: false, error: null }),
  reducers: {
    externalUpsertNote: (state, action) => {
      adapter.upsertOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotesThunk.fulfilled, (state, action) => {
        state.loading = false;
        adapter.setAll(state, action.payload);
      })
      .addCase(fetchNotesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load notes';
      })
      .addCase(createNoteThunk.fulfilled, (state, action) => {
        adapter.upsertOne(state, action.payload);
      })
      .addCase(updateNoteThunk.fulfilled, (state, action) => {
        adapter.upsertOne(state, action.payload);
      })
      .addCase(deleteNoteThunk.fulfilled, (state, action) => {
        adapter.removeOne(state, action.payload);
      });
  },
});

export const { externalUpsertNote } = slice.actions;
export default slice.reducer;

export const notesSelectors = adapter.getSelectors((s) => s.notes);
