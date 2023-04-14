import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponentComponent } from './calendar-component.component';

describe('CalendarComponentComponent', () => {
  let component: CalendarComponentComponent;
  let fixture: ComponentFixture<CalendarComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
