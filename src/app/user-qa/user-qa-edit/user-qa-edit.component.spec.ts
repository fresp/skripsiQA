import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserQaEditComponent } from './user-qa-edit.component';

describe('UserQaEditComponent', () => {
  let component: UserQaEditComponent;
  let fixture: ComponentFixture<UserQaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserQaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserQaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
