import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnverifiedAlumniEditComponent } from './unverified-alumni-edit.component';

describe('UnverifiedAlumniEditComponent', () => {
  let component: UnverifiedAlumniEditComponent;
  let fixture: ComponentFixture<UnverifiedAlumniEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnverifiedAlumniEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnverifiedAlumniEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
