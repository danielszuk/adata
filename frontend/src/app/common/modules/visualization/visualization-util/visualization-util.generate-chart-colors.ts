import { ColorCodes } from 'src/shared/enums/colors.enum';
import { IVisualizationMatrixDomainDTO } from 'src/shared/modules/visualization/visualization.matrix/visualization.matrix.dto';

/**
 * @param matrices IVisualizationMatrixDomainDTO[]
 * @returns colors object key(name) : value (hex color string) pair
 */
export function generateChartColors(
  matrices: IVisualizationMatrixDomainDTO[]
): object {
  const colors = {};
  matrices.forEach(mx => {
    colors[mx.matrix.name] = ColorCodes[mx.color] || '#00f';
  });
  return colors;
}
