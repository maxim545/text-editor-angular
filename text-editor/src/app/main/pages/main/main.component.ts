import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { NoteResponseModel } from 'src/app/core/models/note.model';
import { loadNotes } from 'src/app/core/store/actions/notes.actions';
import { getAllNotes } from 'src/app/core/store/selectors/notes.selectors';
import { NoteCreaterComponent } from '../../components/note-creater/note-creater.component';
import { NoteService } from '../../services/note/note.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  notes$: Observable<NoteResponseModel[]> = this.store.select(getAllNotes);

  constructor(
    private dialog: MatDialog,
    private store: Store,
    private noteService: NoteService,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadNotes());
    this.noteService.updateTags();
  }

  get tags$() {
    return this.noteService.tags$;
  }

  openNoteCreator() {
    this.dialog.open(NoteCreaterComponent, {});
  }

  /*  filterByTagName(tag: string) {
    this.notes$ = this.notes$.pipe(
      map((notes) => notes.filter((note) => note.tags.includes(tag))),
    );
  } */
}
