import { createAsyncThunk } from '@reduxjs/toolkit';
import { createNote, deleteNote, fetchNotes, updateNote } from '../../api';

export const fetchNotesThunk = createAsyncThunk('notes/fetchAll', async () => {
  const res = await fetchNotes();
  return res.data;
});

export const createNoteThunk = createAsyncThunk(
  'notes/create',
  async (payload) => {
    const res = await createNote(payload);
    return res.data;
  }
);

export const updateNoteThunk = createAsyncThunk(
  'notes/update',
  async ({ id, patch }) => {
    const res = await updateNote(id, patch);
    return res.data;
  }
);

export const deleteNoteThunk = createAsyncThunk('notes/delete', async (id) => {
  await deleteNote(id);
  return id;
});
