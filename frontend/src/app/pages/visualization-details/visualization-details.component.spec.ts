import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationDetailsComponent } from './visualization-details.component';

describe('VisualizationDetailsComponent', () => {
  let component: VisualizationDetailsComponent;
  let fixture: ComponentFixture<VisualizationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
