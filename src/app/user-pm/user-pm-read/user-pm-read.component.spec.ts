import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPmReadComponent } from './user-pm-read.component';

describe('UserPmReadComponent', () => {
  let component: UserPmReadComponent;
  let fixture: ComponentFixture<UserPmReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPmReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPmReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
