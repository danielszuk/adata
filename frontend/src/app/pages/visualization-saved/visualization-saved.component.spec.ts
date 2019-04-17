import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationSavedComponent } from './visualization-saved.component';

describe('VisualizationSavedComponent', () => {
  let component: VisualizationSavedComponent;
  let fixture: ComponentFixture<VisualizationSavedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizationSavedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
