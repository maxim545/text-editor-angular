import { createAction, props } from '@ngrx/store';
import { NoteModel, NoteResponseModel } from '../../models/note.model';

export const loadNotes = createAction(
  '[Notes] Load Notes',
);

export const loadNotesSuccess = createAction(
  '[Notes] Load Notes Success',
  props<{ notes: NoteResponseModel[] }>(),
);

export const addNote = createAction(
  '[Notes] Add Note',
  props<{ note: NoteModel }>(),
);

export const addNoteSuccess = createAction(
  '[Notes] Add Note Success',
  props<{ note: NoteResponseModel }>(),
);

export const editNote = createAction(
  '[Notes] Edit Note',
  props<{ note: NoteResponseModel }>(),
);

export const editNoteSuccess = createAction(
  '[Notes] Edit Note Success',
  props<{ note: NoteResponseModel }>(),
);

export const deleteNote = createAction(
  '[Notes] Delete Note',
  props<{ id: string }>(),
);

export const deleteNoteSuccess = createAction(
  '[Notes] Delete Note Success',
  props<{ id: string }>(),
);

export const noteFailed = createAction(
  '[Notes] Notes Failed',
  props<{ error: string }>(),
);
