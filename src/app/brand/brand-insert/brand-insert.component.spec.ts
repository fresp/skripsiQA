import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandInsertComponent } from './brand-insert.component';

describe('BrandInsertComponent', () => {
  let component: BrandInsertComponent;
  let fixture: ComponentFixture<BrandInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
