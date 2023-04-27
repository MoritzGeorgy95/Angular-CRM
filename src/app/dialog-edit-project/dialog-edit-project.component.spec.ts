import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditProjectComponent } from './dialog-edit-project.component';

describe('DialogEditProjectComponent', () => {
  let component: DialogEditProjectComponent;
  let fixture: ComponentFixture<DialogEditProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
