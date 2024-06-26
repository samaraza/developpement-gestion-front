import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupPreparationComponent } from './popup-preparation.component';

describe('PopupPreparationComponent', () => {
  let component: PopupPreparationComponent;
  let fixture: ComponentFixture<PopupPreparationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupPreparationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupPreparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
