import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupInventaireComponent } from './popup-inventaire.component';

describe('PopupInventaireComponent', () => {
  let component: PopupInventaireComponent;
  let fixture: ComponentFixture<PopupInventaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupInventaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupInventaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
