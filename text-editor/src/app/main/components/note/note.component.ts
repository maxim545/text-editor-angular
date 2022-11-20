import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NoteResponseModel } from 'src/app/core/models/note.model';
import { ApiService } from 'src/app/core/services/api/api.service';
import { NoteService } from '../../services/note/note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  @Input() note: NoteResponseModel | null = null;

  isEditModeOn: boolean = false;

  editForm!: FormGroup;

  constructor(
    private noteService: NoteService,
  ) { }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      title: new FormControl(this.note?.title, [
        Validators.required,
      ]),
    });
  }

  get f() {
    return this.editForm.controls;
  }

  editNote(note: NoteResponseModel) {
    const addedTags = this.noteService.handleTags(this.editForm.value.title);
    const updateTags = [...note.tags, ...addedTags];
    this.noteService.editNote({
      ...note,
      title: this.editForm.value.title,
      tags: [...new Set(updateTags)],
    });
    this.isEditModeOn = false;
  }

  deleteNote(note: NoteResponseModel) {
    this.noteService.deleteOneNote(note._id);
  }

  deletTag(note: NoteResponseModel, tag: string) {
    this.noteService.deleteOneTag(note, tag);
  }
}
