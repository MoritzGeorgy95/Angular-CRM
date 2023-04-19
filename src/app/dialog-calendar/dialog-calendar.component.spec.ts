import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCalendarComponent } from './dialog-calendar.component';

describe('DialogCalendarComponent', () => {
  let component: DialogCalendarComponent;
  let fixture: ComponentFixture<DialogCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
