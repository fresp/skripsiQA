import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeveloperEditComponent } from './user-developer-edit.component';

describe('UserDeveloperEditComponent', () => {
  let component: UserDeveloperEditComponent;
  let fixture: ComponentFixture<UserDeveloperEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDeveloperEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDeveloperEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
