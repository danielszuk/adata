import {
  Component,
  OnInit,
  Input,
  OnChanges,
  AfterViewInit,
  ViewChild,
  ElementRef,
  HostListener
} from '@angular/core';
import * as c3 from 'c3';

import { IVisualizationDomainDTO } from 'src/shared/modules/visualization/visualization.dto';
import {
  IYAxisMax,
  formatVerticalAxis,
  formatLabelText
} from './visualization-util/visualization.vertical-calc';
import { Height, Width } from '../../utils/dimensions';
import { generateToolTip } from './visualization.tooltip';
import { EmptyBoolean } from '../../utils/component-decorators/empty-boolean';
import { IDimensionDTO } from 'src/shared/modules/dimension/dimension.dto';
import { DeviceService } from '../../services/device.service';
import {
  generateChartData,
  IYAndY2Limits
} from './visualization-util/visualization.util.generate-chart-data';

@Component({
  selector: 'adata-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.scss']
})
export class VisualizationComponent
  implements OnInit, OnChanges, AfterViewInit {
  public chart: c3.ChartAPI;
  public chartXPadding = -15;
  public yDimension: IDimensionDTO;
  public colorPattern: any;
  public legendsHeight: number;

  public yAxisMax: IYAxisMax = {
    value: 0,
    name: '',
    whole: 1,
    fraction: 0,
    power: 0
  };

  private xAxisArray: any[] = [];
  private yAxisArray: any[] = [];
  private chartIdsArray: string[] = [];
  public chartDataArray: any[] = [];
  private yAndY2AxisLimits: IYAndY2Limits;
  private yAxisObject: any;

  private generateToolTip = generateToolTip;

  constructor(private device: DeviceService) {}

  @Input() visualization: IVisualizationDomainDTO;
  @Input() interaction: boolean;

  @ViewChild('c3DomContainer') c3DomContainer: ElementRef;
  @ViewChild('c3Dom') c3Dom: ElementRef;
  @ViewChild('legends') legends: ElementRef;

  @HostListener('window:resize')
  hostOnResize() {
    this.initChart();
  }

  ngOnInit() {
    this.generateChartData();
    this.interaction = EmptyBoolean(this.interaction);
  }

  ngAfterViewInit() {
    this.generateChartData();
    this.initChart();
    this.legendsHeight = Height(this.legends.nativeElement);
  }

  async ngOnChanges() {
    if (this.chart) {
      this.generateChartData();
      this.initChart();
    }
  }

  private generateChartData(): void {
    if (this.visualization) {
      const chartData = generateChartData(this.visualization.matrices, {
        x: this.visualization.x,
        y: this.visualization.y,
        y2: this.visualization.y2
      });
      this.colorPattern = chartData.colors;
      this.xAxisArray = chartData.xAxisArray;
      this.yAxisArray = chartData.yAxisArray;
      this.chartDataArray = [chartData.xAxisArray, ...chartData.yAxisArray];

      this.yAndY2AxisLimits = chartData.yAndY2AxisLimits;
      this.yAxisObject = chartData.yAxisObject;
    }
  }

  private initChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    this.chartIdsArray = [
      ...this.visualization.matrices.map(iv => iv.matrix.name)
    ];

    this.generateChartData();
    // Validate dimensions
    const width = Width(this.c3DomContainer.nativeElement);
    const height = Height(this.c3DomContainer.nativeElement);
    if (height === 0) {
      throw Error(`Chart height is 0. Draw aborted.`);
    }
    if (width === 0) {
      throw Error(`Chart width is 0. Draw aborted.`);
    }

    const c3Config: c3.ChartConfiguration = {
      bindto: this.c3Dom.nativeElement,
      size: { height, width },
      data: {
        x: 'x',
        columns: this.chartDataArray,
        type: 'spline',
        colors: this.colorPattern,
        axes: this.yAxisObject
      },
      legend: {
        show: false
      },
      interaction: {
        enabled: !!this.interaction
      },
      tooltip: {
        contents: (
          data: any,
          defaultTitleFormat: string,
          defaultValueFormat: string,
          color: any
        ) => {
          return this.generateToolTip(
            data,
            defaultTitleFormat,
            defaultValueFormat,
            color,
            this.yAndY2AxisLimits,
            this.yAxisObject,
            this.visualization.x,
            this.visualization.y,
            this.visualization.y2
          );
        }
      },
      // padding: {
      //   right: this.chartXPadding,
      //   left: this.chartXPadding
      // },
      axis: {
        y: {
          min: 0,
          padding: { bottom: 7 },
          label: {
            text: formatLabelText(
              this.visualization.y,
              this.yAndY2AxisLimits.y.max
            ),
            position: 'outer-middle'
          },
          tick: {
            format: d => {
              return formatVerticalAxis(d, this.yAndY2AxisLimits.y.max);
            }
          }
        },
        x: {
          label: {
            text: formatLabelText(this.visualization.x, undefined),
            position: 'outer-center'
          },
          tick: {
            format: d => Number.parseInt(d.toString(), 10),
            count: this.device.resolution.mobileS ? 4 : undefined,
            fit: false
          }
        },
        y2: {
          show: !!this.visualization.y2,
          max: this.yAndY2AxisLimits.y2.max,
          min: this.yAndY2AxisLimits.y2.min,
          label: {
            text: formatLabelText(
              this.visualization.y2,
              this.yAndY2AxisLimits.y2.max
            ),
            position: 'outer-middle'
          },
          tick: {
            format: d => {
              return formatVerticalAxis(d, this.yAndY2AxisLimits.y2.max);
            }
          }
        }
      },
      grid: { x: { show: true }, y: { show: true } }
    };

    // Custom, not documented properties
    if (!c3Config.point) {
      c3Config.point = {};
    }
    c3Config.point['sensitivity'] = 50;

    this.chart = c3.generate(c3Config);
  }
}
