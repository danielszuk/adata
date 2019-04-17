import { Component, OnInit } from '@angular/core';
import { EmptyArray } from '../../../utils/empty-array';

@Component({
  selector: 'adata-visualization-mock',
  templateUrl: './visualization-mock.component.html',
  styleUrls: ['./visualization-mock.component.scss']
})
export class VisualizationMockComponent implements OnInit {
  public EmptyArray = EmptyArray;

  constructor() {}

  ngOnInit() {}
}
