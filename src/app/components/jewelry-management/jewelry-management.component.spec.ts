import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JewelryManagementComponent } from './jewelry-management.component';

describe('JewelryManagementComponent', () => {
  let component: JewelryManagementComponent;
  let fixture: ComponentFixture<JewelryManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JewelryManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JewelryManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
