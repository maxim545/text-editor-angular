import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NoteModel, NoteResponseModel } from '../../models/note.model';
import { generateId } from '../../utils/idGererator';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() { }

  // Fake api service for imitate requests for server

  getAllNotes(): Observable<NoteResponseModel[]> {
    const data = localStorage.getItem('uniq_notes') || '';
    if (data) {
      return of(JSON.parse(data));
    }
    return of([]);
  }

  addNote(note: NoteModel): Observable<NoteResponseModel> {
    const data = localStorage.getItem('uniq_notes') || '';
    const currentNotes = data ? JSON.parse(data) : [];
    const newNote = {
      _id: generateId(),
      ...note,
    };
    currentNotes.push(newNote);
    localStorage.setItem('uniq_notes', JSON.stringify(currentNotes));
    return of(newNote);
  }

  updateNote(note: NoteResponseModel): Observable<NoteResponseModel> {
    const data: NoteResponseModel[] = JSON.parse(localStorage.getItem('uniq_notes') as string);
    const indexForUpdate = data.findIndex((item) => item._id === note._id);
    data[indexForUpdate] = note;
    localStorage.setItem('uniq_notes', JSON.stringify(data));
    return of(note);
  }

  removeNote(id: string): Observable<NoteResponseModel[]> {
    const data: NoteResponseModel[] = JSON.parse(localStorage.getItem('uniq_notes') as string);
    const updatedNotes = data.filter((item) => item._id !== id);
    localStorage.setItem('uniq_notes', JSON.stringify(updatedNotes));
    return of(updatedNotes);
  }
}
