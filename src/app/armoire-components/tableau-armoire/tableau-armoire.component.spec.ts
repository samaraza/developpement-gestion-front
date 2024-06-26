import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauArmoireComponent } from './tableau-armoire.component';

describe('TableauArmoireComponent', () => {
  let component: TableauArmoireComponent;
  let fixture: ComponentFixture<TableauArmoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableauArmoireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableauArmoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
