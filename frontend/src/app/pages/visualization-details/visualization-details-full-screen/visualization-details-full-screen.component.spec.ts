import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationDetailsFullScreenComponent } from './visualization-details-full-screen.component';

describe('VisualizationDetailsFullScreenComponent', () => {
  let component: VisualizationDetailsFullScreenComponent;
  let fixture: ComponentFixture<VisualizationDetailsFullScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizationDetailsFullScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationDetailsFullScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
