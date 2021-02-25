import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCostumerComponent } from './edit-costumer.component';

describe('EditCostumerComponent', () => {
  let component: EditCostumerComponent;
  let fixture: ComponentFixture<EditCostumerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCostumerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCostumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
