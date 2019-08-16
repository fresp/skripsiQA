import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeveloperInsertComponent } from './user-developer-insert.component';

describe('UserDeveloperInsertComponent', () => {
  let component: UserDeveloperInsertComponent;
  let fixture: ComponentFixture<UserDeveloperInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDeveloperInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDeveloperInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
