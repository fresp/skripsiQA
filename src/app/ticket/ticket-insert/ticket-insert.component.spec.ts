import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketInsertComponent } from './ticket-insert.component';

describe('TicketInsertComponent', () => {
  let component: TicketInsertComponent;
  let fixture: ComponentFixture<TicketInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
