import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauFournisseurComponent } from './tableau-fournisseur.component';

describe('TableauFournisseurComponent', () => {
  let component: TableauFournisseurComponent;
  let fixture: ComponentFixture<TableauFournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableauFournisseurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableauFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
