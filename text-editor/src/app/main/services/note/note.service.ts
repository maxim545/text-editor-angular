import { Injectable } from '@angular/core';
import { NoteModel, NoteResponseModel } from 'src/app/core/models/note.model';
import { select, Store } from '@ngrx/store';
import { addNote, deleteNote, editNote } from 'src/app/core/store/actions/notes.actions';
import { map, Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api/api.service';
import { getAllNotes } from 'src/app/core/store/selectors/notes.selectors';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  tags$: Observable<string[]> | null = null;

  notes$: Observable<NoteResponseModel[]> = this.store.select(getAllNotes);

  activeTags: string[] = [];

  constructor(
    private store: Store,
    private apiService: ApiService,
  ) { }

  addNote(note: NoteModel): void {
    this.store.dispatch(addNote({ note }));
    this.updateTags();
  }

  editNote(note: NoteResponseModel): void {
    this.store.dispatch(editNote({ note }));
    this.updateTags();
  }

  deleteOneNote(id: string): void {
    this.store.dispatch(deleteNote({ id }));
    this.updateTags();
  }

  deleteOneTag(note: NoteResponseModel, tag: string): void {
    const updatedNote = {
      ...note,
      tags: note.tags.filter((item) => item !== tag),
    };
    this.store.dispatch(editNote({ note: updatedNote }));
    this.updateTags();
  }

  handleTags(title: string): string[] {
    let tags = title.split(' ').filter((word) => word[0] === '#' && word.length >= 2) || [];
    tags = tags.map((tag) => (tag[0] === '#' ? tag.replace(/#/, '') : tag));
    return tags;
  }

  updateTags(): void {
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

  filterNote(tag: string): Observable<NoteResponseModel[]> {
    if (!this.activeTags.includes(tag)) {
      this.activeTags.push(tag);
    } else {
      const cuurentTagIndex = this.activeTags.findIndex((item) => item === tag);
      this.activeTags.splice(cuurentTagIndex, 1);
    }
    return this.notes$.pipe(
      map((notes) => {
        const updatedNote = notes.filter((note) => this.activeTags.some((letter) => note.tags.includes(letter)));
        if (!updatedNote.length) {
          return notes;
        }
        return updatedNote;
      }),
    );
  }
}
