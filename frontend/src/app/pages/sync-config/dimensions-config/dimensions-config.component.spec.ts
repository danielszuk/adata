import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DimensionsConfigComponent } from './dimensions-config.component';

describe('DimensionsConfigComponent', () => {
  let component: DimensionsConfigComponent;
  let fixture: ComponentFixture<DimensionsConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DimensionsConfigComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DimensionsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
