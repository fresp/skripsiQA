import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPmInsertComponent } from './user-pm-insert.component';

describe('UserPmInsertComponent', () => {
  let component: UserPmInsertComponent;
  let fixture: ComponentFixture<UserPmInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPmInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPmInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
