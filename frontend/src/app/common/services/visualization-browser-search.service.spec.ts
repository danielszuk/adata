import { TestBed } from '@angular/core/testing';

import { VisualizationBrowserSearchService } from './visualization-browser-search.service';

describe('VisualizationBrowserSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VisualizationBrowserSearchService = TestBed.get(VisualizationBrowserSearchService);
    expect(service).toBeTruthy();
  });
});
