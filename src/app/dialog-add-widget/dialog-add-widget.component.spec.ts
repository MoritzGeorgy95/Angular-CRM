import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddWidgetComponent } from './dialog-add-widget.component';

describe('DialogAddWidgetComponent', () => {
  let component: DialogAddWidgetComponent;
  let fixture: ComponentFixture<DialogAddWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
