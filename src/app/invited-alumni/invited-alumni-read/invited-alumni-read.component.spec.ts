import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitedAlumniReadComponent } from './invited-alumni-read.component';

describe('InvitedAlumniReadComponent', () => {
  let component: InvitedAlumniReadComponent;
  let fixture: ComponentFixture<InvitedAlumniReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitedAlumniReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitedAlumniReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
