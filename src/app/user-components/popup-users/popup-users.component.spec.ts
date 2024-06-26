import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupUsersComponent } from './popup-users.component';

describe('PopupUsersComponent', () => {
  let component: PopupUsersComponent;
  let fixture: ComponentFixture<PopupUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
