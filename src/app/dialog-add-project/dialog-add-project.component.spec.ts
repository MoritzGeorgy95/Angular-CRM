import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddProjectComponent } from './dialog-add-project.component';

describe('DialogAddProjectComponent', () => {
  let component: DialogAddProjectComponent;
  let fixture: ComponentFixture<DialogAddProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
