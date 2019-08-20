import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardInsertComponent } from './board-insert.component';

describe('BoardInsertComponent', () => {
  let component: BoardInsertComponent;
  let fixture: ComponentFixture<BoardInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
