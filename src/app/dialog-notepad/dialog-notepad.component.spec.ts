import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNotepadComponent } from './dialog-notepad.component';

describe('DialogNotepadComponent', () => {
  let component: DialogNotepadComponent;
  let fixture: ComponentFixture<DialogNotepadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNotepadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogNotepadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
