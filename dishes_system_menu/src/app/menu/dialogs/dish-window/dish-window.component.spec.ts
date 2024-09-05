import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWindowComponent } from './dish-window.component';

describe('AdminWindowComponent', () => {
  let component: AdminWindowComponent;
  let fixture: ComponentFixture<AdminWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminWindowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
