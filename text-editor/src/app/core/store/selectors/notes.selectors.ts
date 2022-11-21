import { createSelector } from '@ngrx/store';
import { noteStateSelector, selectAll, selectEntities } from '../reducers/notes.reducers';

export const getAllNotes = createSelector(
  noteStateSelector,
  selectAll,
);

export const selectEntity = (id: string) => createSelector(
  selectEntities,
  (entities) => entities[id],
);
