import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserQaReadComponent } from './user-qa-read.component';

describe('UserQaReadComponent', () => {
  let component: UserQaReadComponent;
  let fixture: ComponentFixture<UserQaReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserQaReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserQaReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
