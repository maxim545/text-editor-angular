import { Injectable } from '@angular/core';
import { NoteModel, NoteResponseModel } from 'src/app/core/models/note.model';
import { select, Store } from '@ngrx/store';
import { addNote, deleteNote, editNote } from 'src/app/core/store/actions/notes.actions';
import { map, Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  tags$: Observable<string[]> | null = null;

  constructor(
    private store: Store,
    private apiService: ApiService,
  ) { }

  addNote(note: NoteModel) {
    this.store.dispatch(addNote({ note }));
    this.updateTags();
  }

  editNote(note: NoteResponseModel) {
    this.store.dispatch(editNote({ note }));
    this.updateTags();
  }

  deleteOneNote(id: string) {
    this.store.dispatch(deleteNote({ id }));
    this.updateTags();
  }

  deleteOneTag(note: NoteResponseModel, tag: string) {
    const updatedNote = {
      ...note,
      tags: note.tags.filter((item) => item !== tag),
    };
    this.store.dispatch(editNote({ note: updatedNote }));
    this.updateTags();
  }

  handleTags(title: string) {
    return title.split(' ').filter((word) => word[0] === '#' && word.length >= 2) || [];
  }

  updateTags() {
    this.tags$ = this.apiService
      .getAllNotes()
      .pipe(
        map((notes) => {
          const tags: string[] = [];
          notes.map((item) => tags.push(...item.tags));
          return [...new Set(tags)];
        }),
      );
  }
}
