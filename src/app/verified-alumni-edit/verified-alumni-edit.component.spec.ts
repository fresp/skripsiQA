import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedAlumniEditComponent } from './verified-alumni-edit.component';

describe('VerifiedAlumniEditComponent', () => {
  let component: VerifiedAlumniEditComponent;
  let fixture: ComponentFixture<VerifiedAlumniEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifiedAlumniEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifiedAlumniEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
