import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogReadComponent } from './log-read.component';

describe('LogReadComponent', () => {
  let component: LogReadComponent;
  let fixture: ComponentFixture<LogReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
