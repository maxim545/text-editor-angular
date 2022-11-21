/* eslint-disable no-cond-assign */
import {
  Component, Input, OnInit, ViewEncapsulation,
} from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NoteResponseModel } from 'src/app/core/models/note.model';
import { ApiService } from 'src/app/core/services/api/api.service';
import { HighlightTag } from 'angular-text-input-highlight';
import { NoteService } from '../../services/note/note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NoteComponent implements OnInit {
  @Input() note: NoteResponseModel | null = null;

  editTitleModeOn: boolean = false;

  addingModeIsOn: boolean = false;

  editForm!: FormGroup;

  title: string = '';

  tags: HighlightTag[] = [];

  tagClicked!: HighlightTag;

  constructor(
    private noteService: NoteService,
  ) { }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      tags: new FormControl('', [
        Validators.required,
      ]),
    });
    if (this.note) {
      this.title = this.note.title;
    }
    this.highlightTags();
  }

  get f() {
    return this.editForm.controls;
  }

  highlightTags() {
    this.tags = [];
    const matchHashtags = /(#\w+) ?/g;
    let hashtag;
    while ((hashtag = matchHashtags.exec(this.title))) {
      this.tags.push({
        indices: {
          start: hashtag.index,
          end: hashtag.index + hashtag[1].length,
        },
        cssClass: 'bg-primarylight',
        data: hashtag[1],
      });
    }
  }

  closeTextArea() {
    this.editTitleModeOn = false;
    if (this.note) {
      this.title = this.note.title;
    }
  }

  editNote(note: NoteResponseModel) {
    const addedTags = this.noteService.handleTags(this.title);
    const updateTags = [...note.tags, ...addedTags];
    this.noteService.editNote({
      ...note,
      title: this.title,
      tags: [...new Set(updateTags)],
    });
    this.editTitleModeOn = false;
  }

  deleteNote(note: NoteResponseModel) {
    this.noteService.deleteOneNote(note._id);
  }

  addTag(note: NoteResponseModel) {
    const addedTags = this.editForm.value.tags.split(',');
    const updateTags = [...note.tags, ...addedTags];
    this.noteService.editNote({
      ...note,
      tags: [...new Set(updateTags)],
    });
    this.addingModeIsOn = false;
  }

  deletTag(note: NoteResponseModel, tag: string) {
    this.noteService.deleteOneTag(note, tag);
  }
}
