import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandReadComponent } from './brand-read.component';

describe('BrandReadComponent', () => {
  let component: BrandReadComponent;
  let fixture: ComponentFixture<BrandReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
