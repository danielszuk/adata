import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationCreatorComponent } from './visualization-creator.component';

describe('VisualizationCreatorComponent', () => {
  let component: VisualizationCreatorComponent;
  let fixture: ComponentFixture<VisualizationCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizationCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
