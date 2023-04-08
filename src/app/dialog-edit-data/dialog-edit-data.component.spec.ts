import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditDataComponent } from './dialog-edit-data.component';

describe('DialogEditDataComponent', () => {
  let component: DialogEditDataComponent;
  let fixture: ComponentFixture<DialogEditDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
