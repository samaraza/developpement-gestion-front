import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauSalletpComponent } from './tableau-salletp.component';

describe('TableauSalletpComponent', () => {
  let component: TableauSalletpComponent;
  let fixture: ComponentFixture<TableauSalletpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableauSalletpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableauSalletpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
