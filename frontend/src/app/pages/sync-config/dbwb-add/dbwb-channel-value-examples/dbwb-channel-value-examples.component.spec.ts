import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbwbChannelValueExamplesComponent } from './dbwb-channel-value-examples.component';

describe('DbwbChannelValueExamplesComponent', () => {
  let component: DbwbChannelValueExamplesComponent;
  let fixture: ComponentFixture<DbwbChannelValueExamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbwbChannelValueExamplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbwbChannelValueExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
