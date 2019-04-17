import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationMockComponent } from './visualization-mock.component';

describe('VisualizationMockComponent', () => {
  let component: VisualizationMockComponent;
  let fixture: ComponentFixture<VisualizationMockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizationMockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
