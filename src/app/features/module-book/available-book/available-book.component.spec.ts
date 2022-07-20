import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableBookComponent } from './available-book.component';

describe('AvailableBookComponent', () => {
  let component: AvailableBookComponent;
  let fixture: ComponentFixture<AvailableBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
