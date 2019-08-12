import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnverifiedAlumniReadComponent } from './unverified-alumni-read.component';

describe('UnverifiedAlumniReadComponent', () => {
  let component: UnverifiedAlumniReadComponent;
  let fixture: ComponentFixture<UnverifiedAlumniReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnverifiedAlumniReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnverifiedAlumniReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
