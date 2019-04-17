import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbwbChannelResultsComponent } from './dbwb-channel-results.component';

describe('DbwbChannelResultsComponent', () => {
  let component: DbwbChannelResultsComponent;
  let fixture: ComponentFixture<DbwbChannelResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbwbChannelResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbwbChannelResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
