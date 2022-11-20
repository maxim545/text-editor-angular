import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteCreaterComponent } from './note-creater.component';

describe('NoteCreaterComponent', () => {
  let component: NoteCreaterComponent;
  let fixture: ComponentFixture<NoteCreaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteCreaterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteCreaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
