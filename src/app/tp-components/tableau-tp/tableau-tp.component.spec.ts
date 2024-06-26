import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauTpComponent } from './tableau-tp.component';

describe('TableauTpComponent', () => {
  let component: TableauTpComponent;
  let fixture: ComponentFixture<TableauTpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableauTpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableauTpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
