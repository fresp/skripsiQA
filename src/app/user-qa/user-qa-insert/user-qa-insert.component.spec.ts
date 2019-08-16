import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserQaInsertComponent } from './user-qa-insert.component';

describe('UserQaInsertComponent', () => {
  let component: UserQaInsertComponent;
  let fixture: ComponentFixture<UserQaInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserQaInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserQaInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
