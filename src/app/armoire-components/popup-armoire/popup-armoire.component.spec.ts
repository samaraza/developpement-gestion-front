import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupArmoireComponent } from './popup-armoire.component';

describe('PopupArmoireComponent', () => {
  let component: PopupArmoireComponent;
  let fixture: ComponentFixture<PopupArmoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupArmoireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupArmoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
