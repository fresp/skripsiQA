import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPmEditComponent } from './user-pm-edit.component';

describe('UserPmEditComponent', () => {
  let component: UserPmEditComponent;
  let fixture: ComponentFixture<UserPmEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPmEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPmEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
