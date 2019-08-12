import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedAlumniReadComponent } from './verified-alumni-read.component';

describe('VerifiedAlumniReadComponent', () => {
  let component: VerifiedAlumniReadComponent;
  let fixture: ComponentFixture<VerifiedAlumniReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifiedAlumniReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifiedAlumniReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
