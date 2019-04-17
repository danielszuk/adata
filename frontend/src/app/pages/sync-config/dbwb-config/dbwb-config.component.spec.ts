import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbwbConfigComponent } from './dbwb-config.component';

describe('DbwbConfigComponent', () => {
  let component: DbwbConfigComponent;
  let fixture: ComponentFixture<DbwbConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbwbConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbwbConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
