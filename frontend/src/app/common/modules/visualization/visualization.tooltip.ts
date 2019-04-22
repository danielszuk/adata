import {
  getLongScaleValue,
  IYAxisMax,
  formatVerticalAxis
} from './visualization-util/visualization.vertical-calc';
import { IYAndY2Limits } from './visualization-util/visualization.util.generate-chart-data';
import { IDimensionDTO } from 'src/shared/modules/dimension/dimension.dto';
import { generateChartDimensions } from './visualization-util/visualization-util.generate-chart-names';

interface IGraphPointTarget {
  x: Date;
  id: string;
  value: number;
  index: number;
}

export const generateToolTip = (
  data,
  defaultTitleFormat,
  defaultValueFormat,
  color,
  limits: IYAndY2Limits,
  yAxisObject: any,
  x: IDimensionDTO,
  y: IDimensionDTO,
  y2?: IDimensionDTO
): string => {
  const targets: IGraphPointTarget[] = data;
  const maxTarget: IGraphPointTarget = getMaxTarget(targets);
  const maxFormated: IYAxisMax = getLongScaleValue(maxTarget.value);

  let targetX: any;
  let targetsDomY = '';
  let targetsDomY2 = '';
  targets.forEach(target => {
    if (target.value !== null) {
      targetX = target.x;
      let longScaleValues;
      let num;
      if ('y' === yAxisObject[target.id]) {
        const name = removeSubstringByDimensions(target.id, x, y);
        longScaleValues = getLongScaleValue(limits.y.max);
        num = formatVerticalAxis(target.value, limits.y.max);

        targetsDomY += generateToolTipRow(
          target,
          color,
          num,
          longScaleValues.name
        );
      } else if ('y2' === yAxisObject[target.id]) {
        const name = removeSubstringByDimensions(target.id, x, y2);
        longScaleValues = getLongScaleValue(limits.y2.max);
        num = formatVerticalAxis(target.value, limits.y2.max);

        targetsDomY2 += generateToolTipRow(
          target,
          color,
          num,
          longScaleValues.name
        );
      }
    }
  });
  const tableHeaderName = `<tr><td colspan="2">${x.name} ${
    !!x.unit ? x.unit : ''
  }</td></tr>`;
  const tableHeaderValue = `<tr><th colspan="2">${targetX}</th></tr>`;

  return `
    <div class="c3-tooltip-container--inner">
      <table class="c3-tooltip">
        <tbody>
          ${tableHeaderName}
          ${tableHeaderValue}
          <tr><td>${y.name} ${y.unit}</td></tr>
          ${targetsDomY}
          ${
            !!y2
              ? `
          <tr><td>${y2.name} ${!!y2.unit ? y2.unit : ''}</td></tr>
          ${targetsDomY2}`
              : ''
          }
        </tbody>
      </table>
    </div>`;
};

function formatNumber(d: number, power: number): string {
  const num = d / Math.pow(10, power);
  return num.toFixed(3) === '0.000' ? num.toString() : num.toFixed(3);
}

function getMaxTarget(targets: IGraphPointTarget[]) {
  let maxTarget: IGraphPointTarget = {
    id: undefined,
    index: undefined,
    value: Number.NEGATIVE_INFINITY,
    x: undefined
  };
  for (const target of targets) {
    if (maxTarget.value < target.value) {
      maxTarget = target;
    }
  }
  return maxTarget;
}

function removeSubstringByDimensions(
  str: string,
  x: IDimensionDTO,
  dim: IDimensionDTO
): string {
  const substr1 = generateChartDimensions(x, dim);
  const search1 = str.indexOf(substr1);
  if (-1 !== search1) {
    return str.replace(substr1, '');
  }

  const substr2 = generateChartDimensions(dim, x);
  const search2 = str.indexOf(substr2);
  if (-1 !== search2) {
    return str.replace(substr2, '');
  }
}

function generateToolTipRow(target, color, num, name): string {
  return `<tr class="c3-tooltip-name--${target.id}">
        <td class="value">
          <div class="value__container"  style="color:${color(target)}">
          <div  class="value__name">${name}: </div>
            <div>${num} ${name}</div>
          </div>
        </td>
      </tr>`;
}
