import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauUsersComponent } from './tableau-users.component';

describe('TableauUsersComponent', () => {
  let component: TableauUsersComponent;
  let fixture: ComponentFixture<TableauUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableauUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableauUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
