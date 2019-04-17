import { IMatrixDomainDTO } from 'src/shared/modules/matrix/matrix.dto';
import { IVisualizationMatrixDomainDTO } from 'src/shared/modules/visualization/visualization.matrix/visualization.matrix.dto';
import { IVisualizationDomainDTO } from 'src/shared/modules/visualization/visualization.dto';
import { IDimensionDTO } from 'src/shared/modules/dimension/dimension.dto';

export function generateMatrixName(
  matrix: IMatrixDomainDTO,
  isString: boolean
): any {
  const dim = generateChartDimensions(matrix.dim1, matrix.dim2);
  const matrixName = `${matrix.name}${dim}`;
  matrix.name = matrixName;
  return isString ? matrixName : matrix;
}

export function generateChartDimensions(
  dim1: IDimensionDTO,
  dim2: IDimensionDTO
) {
  const dim1Name = dim1.name;
  const dim1Unit = dim1.unit ? `(${dim1.unit})` : '';
  const dim2Unit = dim2.unit ? `(${dim2.unit})` : '';
  const dim1Value = `${dim1Name} ${dim1Unit}`;
  const dim2Name = dim2.name;
  const dim2Value = `${dim2Name} ${dim2Unit}`;
  return `- ${dim1Value} / ${dim2Value}`;
}

export function generateChartNames(
  chartDataArray: IVisualizationMatrixDomainDTO[]
): IVisualizationMatrixDomainDTO[] {
  const cd: IVisualizationMatrixDomainDTO[] = chartDataArray;
  for (let i = chartDataArray.length - 1; 0 <= i; i--) {
    cd[i].matrix.name = generateMatrixName(chartDataArray[i].matrix, true);
  }
  return cd;
}

export function generateVisualizationMatrixName(
  visualization: IVisualizationDomainDTO
): IVisualizationDomainDTO {
  for (let vm of visualization.matrices) {
    vm.matrix.name = generateMatrixName(vm.matrix, true);
  }
  return visualization;
}
