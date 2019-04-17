import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationBrowserComponent } from './visualization-browser.component';

describe('VisualizationBrowserComponent', () => {
  let component: VisualizationBrowserComponent;
  let fixture: ComponentFixture<VisualizationBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizationBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
