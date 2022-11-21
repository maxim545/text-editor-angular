import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NoteService } from '../../services/note/note.service';

@Component({
  selector: 'app-note-creater',
  templateUrl: './note-creater.component.html',
  styleUrls: ['./note-creater.component.scss'],
})
export class NoteCreaterComponent implements OnInit {
  noteCreateFrom!: FormGroup;

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private noteService: NoteService,
  ) { }

  ngOnInit(): void {
    this.noteCreateFrom = this.formBuilder.group({
      title: ['', [
        Validators.required,
        Validators.minLength(6),
      ]],
      tags: ['', [
        Validators.required,
      ]],
    });
  }

  get f() {
    return this.noteCreateFrom.controls;
  }

  addNewNote(): void {
    this.noteService.addNote({
      ...this.noteCreateFrom.value,
      tags: this.noteCreateFrom.value.tags.split(','),
    });
    this.dialog.closeAll();
  }

  closeDiadlog(): void {
    this.dialog.closeAll();
  }
}
