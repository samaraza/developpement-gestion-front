import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupSalletpComponent } from './popup-salletp.component';

describe('PopupSalletpComponent', () => {
  let component: PopupSalletpComponent;
  let fixture: ComponentFixture<PopupSalletpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupSalletpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupSalletpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
