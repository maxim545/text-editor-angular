import {
  createFeatureSelector, createReducer, on,
} from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { NoteResponseModel } from '../../models/note.model';
import {
  addNoteSuccess, deleteNoteSuccess, editNoteSuccess, loadNotesSuccess, noteFailed,
} from '../actions/notes.actions';

export interface NoteState extends EntityState<NoteResponseModel> {
  error: string | null;
}

export const adapter: EntityAdapter<NoteResponseModel> = createEntityAdapter<NoteResponseModel>({
  selectId: (note) => note._id,
  sortComparer: false,
});

export const initialState: NoteState = adapter.getInitialState({
  error: null,
});

export const noteReducer = createReducer(
  initialState,

  on(loadNotesSuccess, (state, actions) => adapter.setAll(actions.notes, state)),

  on(addNoteSuccess, (state, action) => adapter.addOne(action.note, state)),

  on(editNoteSuccess, (state, action) => adapter.updateOne({ id: action.note._id, changes: action.note }, state)),

  on(deleteNoteSuccess, (state, action) => adapter.removeOne(action.id, state)),

  on(noteFailed, (state, action) => ({ ...state, error: action.error, isLoading: false })),

);

export const noteStateSelector = createFeatureSelector<NoteState>('notes');
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
