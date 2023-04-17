import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUploadFileComponent } from './dialog-upload-file.component';

describe('DialogUploadFileComponent', () => {
  let component: DialogUploadFileComponent;
  let fixture: ComponentFixture<DialogUploadFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUploadFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogUploadFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
