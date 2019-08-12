import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitedAlumniInsertComponent } from './invited-alumni-insert.component';

describe('InvitedAlumniInsertComponent', () => {
  let component: InvitedAlumniInsertComponent;
  let fixture: ComponentFixture<InvitedAlumniInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitedAlumniInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitedAlumniInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
