import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogWalkthroughComponent } from './dialog-walkthrough.component';

describe('DialogWalkthroughComponent', () => {
  let component: DialogWalkthroughComponent;
  let fixture: ComponentFixture<DialogWalkthroughComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogWalkthroughComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogWalkthroughComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
