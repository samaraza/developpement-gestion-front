import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauPostComponent } from './tableau-post.component';

describe('TableauPostComponent', () => {
  let component: TableauPostComponent;
  let fixture: ComponentFixture<TableauPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableauPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableauPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
