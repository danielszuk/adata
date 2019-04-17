import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbwbAddComponent } from './dbwb-add.component';

describe('DbwbAddComponent', () => {
  let component: DbwbAddComponent;
  let fixture: ComponentFixture<DbwbAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbwbAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbwbAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
