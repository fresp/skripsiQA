import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitedAlumniEditComponent } from './invited-alumni-edit.component';

describe('InvitedAlumniEditComponent', () => {
  let component: InvitedAlumniEditComponent;
  let fixture: ComponentFixture<InvitedAlumniEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitedAlumniEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitedAlumniEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
