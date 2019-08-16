import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeveloperReadComponent } from './user-developer-read.component';

describe('UserDeveloperReadComponent', () => {
  let component: UserDeveloperReadComponent;
  let fixture: ComponentFixture<UserDeveloperReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDeveloperReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDeveloperReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
