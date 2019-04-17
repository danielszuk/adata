import { IDimensionDTO } from 'src/shared/modules/dimension/dimension.dto';

export interface IChartAxisDTO {
  x: IDimensionDTO;
  y: IDimensionDTO;
  y2?: IDimensionDTO;
}
