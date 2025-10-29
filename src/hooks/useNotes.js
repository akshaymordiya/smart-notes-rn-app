import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './useRedux';
import { fetchNotesThunk } from '../features/notes/notesThunks';
import { notesSelectors } from '../features/notes/notesSlice';

export function useNotes() {
  const dispatch = useAppDispatch();
  const notes = useAppSelector(notesSelectors.selectAll);
  const loading = useAppSelector((s) => s.notes.loading);

  useEffect(() => {
    dispatch(fetchNotesThunk());
  }, [dispatch]);

  return { notes, loading };
}
