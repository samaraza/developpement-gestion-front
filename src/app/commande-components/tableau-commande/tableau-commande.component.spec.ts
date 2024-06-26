import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauCommandeComponent } from './tableau-commande.component';

describe('TableauCommandeComponent', () => {
  let component: TableauCommandeComponent;
  let fixture: ComponentFixture<TableauCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableauCommandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableauCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
