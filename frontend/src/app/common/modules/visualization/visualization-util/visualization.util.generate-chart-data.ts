import { IChartAxisDTO } from '../visualization.chart-axis.interface';
import { IDimensionDTO } from 'src/shared/modules/dimension/dimension.dto';
import { generateChartColors } from './visualization-util.generate-chart-colors';
import { IVisualizationMatrixDomainDTO } from 'src/shared/modules/visualization/visualization.matrix/visualization.matrix.dto';

export interface IGenerateChartDataReturn {
  xAxisArray: any[];
  yAxisArray: any[];
  colors: object;
  yAndY2AxisLimits: IYAndY2Limits;
  yAxisObject: any;
}

export function generateChartData(
  chartDataArray: IVisualizationMatrixDomainDTO[],
  chartAxis: IChartAxisDTO
): IGenerateChartDataReturn {
  /**  #1 */ const xAxisArray = generateXAxisValues(
    chartAxis.x,
    chartDataArray
  );
  /**  #2 */ const yAxisArray = generateYAxisValues(
    chartAxis.x,
    xAxisArray,
    chartDataArray
  );
  const colors = generateChartColors(chartDataArray);
  const yAndY2AxisLimits = getYAndY2AxisMinMax(chartDataArray, chartAxis);
  const yAxisObject = generateYAxisObject(chartDataArray, chartAxis);
  return { colors, xAxisArray, yAxisArray, yAndY2AxisLimits, yAxisObject };
}

function generateXAxisValues(
  xAxis: IDimensionDTO,
  chartDataArray: IVisualizationMatrixDomainDTO[]
) {
  const xAxisArray: any[] = [];
  for (let i = chartDataArray.length - 1; 0 <= i; i--) {
    for (let j = chartDataArray[i].matrix.values.length - 1; 0 <= j; j--) {
      if (xAxis.id === chartDataArray[i].matrix.dim1.id) {
        const dim1XValue = chartDataArray[i].matrix.values[j].dim1;
        if (-1 === xAxisArray.indexOf(dim1XValue)) {
          xAxisArray.push(dim1XValue);
        }
      } else if (xAxis.id === chartDataArray[i].matrix.dim2.id) {
        const dim2XValue = chartDataArray[i].matrix.values[j].dim2;
        if (-1 === xAxisArray.indexOf(dim2XValue)) {
          xAxisArray.push(dim2XValue);
        }
      }
    }
  }
  return ['x', ...xAxisArray.sort()];
}

function generateYAxisValues(
  xAxis: IDimensionDTO,
  xAxisArray: any[],
  chartDataArray: IVisualizationMatrixDomainDTO[]
): any[] {
  const yAxisArray = [];
  for (let i = chartDataArray.length - 1; 0 <= i; i--) {
    const yAxisValuesArray: any[] = new Array(xAxisArray.length).fill(null);
    for (let j = chartDataArray[i].matrix.values.length - 1; 0 <= j; j--) {
      if (xAxis.id === chartDataArray[i].matrix.dim1.id) {
        const index = xAxisArray.indexOf(
          chartDataArray[i].matrix.values[j].dim1
        );
        yAxisValuesArray[index] = chartDataArray[i].matrix.values[j].dim2;
      } else if (xAxis.id === chartDataArray[i].matrix.dim2.id) {
        const index = xAxisArray.indexOf(
          chartDataArray[i].matrix.values[j].dim2
        );
        yAxisValuesArray[index] = chartDataArray[i].matrix.values[j].dim1;
      }
    }
    yAxisValuesArray[0] = chartDataArray[i].matrix.name;
    yAxisArray.push(yAxisValuesArray);
  }
  return yAxisArray;
}

export interface IYAndY2Limits {
  y: { max: number; min: number };
  y2: { max: number; min: number };
}

function getYAndY2AxisMinMax(
  matrices: IVisualizationMatrixDomainDTO[],
  chartAxis: IChartAxisDTO
): IYAndY2Limits {
  let yMax = Number.NEGATIVE_INFINITY;
  let yMin = Number.POSITIVE_INFINITY;
  let y2Max = Number.NEGATIVE_INFINITY;
  let y2Min = Number.POSITIVE_INFINITY;
  for (let i = matrices.length - 1; 0 <= i; i--) {
    for (let j = matrices[i].matrix.values.length - 1; 0 <= j; j--) {
      if (chartAxis.y.id === matrices[i].matrix.dim1.id) {
        /** y - dim1  */
        const value = parseFloat(matrices[i].matrix.values[j].dim1);
        yMax = yMax < value ? value : yMax;
        yMin = value < yMin ? value : yMin;
      } else if (chartAxis.y.id === matrices[i].matrix.dim2.id) {
        /** y - dim2  */
        const value = parseFloat(matrices[i].matrix.values[j].dim2);
        yMax = yMax < value ? value : yMax;
        yMin = value < yMin ? value : yMin;
      } else if (
        chartAxis.y2 &&
        chartAxis.y2.id === matrices[i].matrix.dim1.id
      ) {
        /** y2 - dim1  */
        const value = parseFloat(matrices[i].matrix.values[j].dim1);
        y2Max = y2Max < value ? value : y2Max;
        y2Min = value < y2Min ? value : y2Min;
      } else if (
        chartAxis.y2 &&
        chartAxis.y2.id === matrices[i].matrix.dim2.id
      ) {
        /** y2 - dim2  */
        const value = parseFloat(matrices[i].matrix.values[j].dim2);
        y2Max = y2Max < value ? value : y2Max;
        y2Min = value < y2Min ? value : y2Min;
      }
    }
  }

  // Alignment y axes
  const yExtent = Math.abs(yMax - yMin);
  const y2Extent = Math.abs(y2Max - y2Min);
  const extensionSensibility = 0.2;
  // Alignment y axes to zero
  const distantTo0 = (yValue: number) => Math.abs(0 - yValue);
  if (distantTo0(yMin) < yExtent * extensionSensibility && yMin > 0) { yMin = 0; }
  if (distantTo0(yMax) < yExtent * extensionSensibility && yMax < 0) { yMax = 0; }
  if (distantTo0(y2Min) < y2Extent * extensionSensibility && y2Min > 0) { y2Min = 0; }
  if (distantTo0(y2Max) < y2Extent * extensionSensibility && y2Max < 0) { y2Max = 0; }
  // Alignment y axes to each other
  if (
    // if yAxes domains are overlap
    ( (yMin <= y2Max && y2Max <= yMax) || (yMin <= y2Min && y2Min < yMax) )
    // or if yAxes are close to each other
    || (
        // if y are above of y2
        yMin > y2Max && (
          yMin - y2Max < yExtent * extensionSensibility
          || yMin - y2Max < y2Extent * extensionSensibility
        )
      )
    || (
      // if y2 are above of y
      y2Min > yMax && (
        y2Min - yMax < yExtent * extensionSensibility
        || y2Min - yMax < y2Extent * extensionSensibility
      )
    )
  ) {
    yMin = y2Min = yMin < y2Min ? yMin : y2Min;
    yMax = y2Max = yMax > y2Max ? yMax : y2Max;
  }

  return { y: { max: yMax, min: yMin }, y2: { max: y2Max, min: y2Min } };
}

function generateYAxisObject(
  matrices: IVisualizationMatrixDomainDTO[],
  chartAxis: IChartAxisDTO
): any {
  const y2Object = {};
  for (let i = matrices.length - 1; 0 <= i; i--) {
    if (chartAxis.y.id === matrices[i].matrix.dim1.id) {
      y2Object[matrices[i].matrix.name] = 'y';
    } else if (chartAxis.y.id === matrices[i].matrix.dim2.id) {
      y2Object[matrices[i].matrix.name] = 'y';
    } else if (chartAxis.y2 && chartAxis.y2.id === matrices[i].matrix.dim1.id) {
      y2Object[matrices[i].matrix.name] = 'y2';
    } else if (chartAxis.y2 && chartAxis.y2.id === matrices[i].matrix.dim2.id) {
      y2Object[matrices[i].matrix.name] = 'y2';
    }
  }
  return y2Object;
}
