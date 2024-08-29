import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAdministrationComponent } from './item-administration.component';

describe('ItemAdministrationComponent', () => {
  let component: ItemAdministrationComponent;
  let fixture: ComponentFixture<ItemAdministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemAdministrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
