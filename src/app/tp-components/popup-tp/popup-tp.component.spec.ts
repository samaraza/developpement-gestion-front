import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupTpComponent } from './popup-tp.component';

describe('PopupTpComponent', () => {
  let component: PopupTpComponent;
  let fixture: ComponentFixture<PopupTpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupTpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupTpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
