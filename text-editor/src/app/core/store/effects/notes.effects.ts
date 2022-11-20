import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError, map, of, switchMap,
} from 'rxjs';
import {
  addNote, addNoteSuccess, deleteNote, deleteNoteSuccess, editNote, editNoteSuccess, loadNotes, loadNotesSuccess, noteFailed,
} from '../actions/notes.actions';
import { ApiService } from '../../services/api/api.service';

@Injectable()
export class NoteEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
  ) { }

  loadNotes$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadNotes),
      switchMap(() => this.apiService
        .getAllNotes()
        .pipe(
          map((notes) => loadNotesSuccess({ notes })),
          catchError((error) => of(noteFailed({ error }))),
        )),
    ),
  );

  addNote$ = createEffect(
    () => this.actions$.pipe(
      ofType(addNote),
      switchMap(({ note }) => this.apiService
        .addNote(note)
        .pipe(
          map((resNote) => addNoteSuccess({ note: resNote })),
          catchError((error) => of(noteFailed({ error }))),
        )),
    ),
  );

  editNote$ = createEffect(
    () => this.actions$.pipe(
      ofType(editNote),
      switchMap(({ note }) => this.apiService
        .updateNote(note)
        .pipe(
          map((resNote) => editNoteSuccess({ note: resNote })),
          catchError((error) => of(noteFailed({ error }))),
        )),
    ),
  );

  removeNote$ = createEffect(
    () => this.actions$.pipe(
      ofType(deleteNote),
      switchMap(({ id }) => this.apiService
        .removeNote(id)
        .pipe(
          map(() => deleteNoteSuccess({ id })),
          catchError((error) => of(noteFailed({ error }))),
        )),
    ),
  );
}
