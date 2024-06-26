import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauInventaireComponent } from './tableau-inventaire.component';

describe('TableauInventaireComponent', () => {
  let component: TableauInventaireComponent;
  let fixture: ComponentFixture<TableauInventaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableauInventaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableauInventaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
