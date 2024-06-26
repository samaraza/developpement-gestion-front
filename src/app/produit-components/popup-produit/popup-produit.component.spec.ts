import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupProduitComponent } from './popup-produit.component';

describe('PopupProduitComponent', () => {
  let component: PopupProduitComponent;
  let fixture: ComponentFixture<PopupProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupProduitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
