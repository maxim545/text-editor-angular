import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { TextInputHighlightModule } from 'angular-text-input-highlight';
import { MainComponent } from './pages/main/main.component';
import { NoteCreaterComponent } from './components/note-creater/note-creater.component';
import { NoteComponent } from './components/note/note.component';

@NgModule({
  declarations: [
    MainComponent,
    NoteCreaterComponent,
    NoteComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    TextInputHighlightModule,
  ],
  exports: [MainComponent],
})
export class MainModule { }
