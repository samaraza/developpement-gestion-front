import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCommandeComponent } from './popup-commande.component';

describe('PopupCommandeComponent', () => {
  let component: PopupCommandeComponent;
  let fixture: ComponentFixture<PopupCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupCommandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
