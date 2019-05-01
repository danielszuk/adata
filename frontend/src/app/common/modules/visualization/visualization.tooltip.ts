import { getLongScaleValue } from './visualization-util/visualization.vertical-calc';
import { IYAndY2Limits } from './visualization-util/visualization.util.generate-chart-data';
import { IDimensionDTO } from 'src/shared/modules/dimension/dimension.dto';
import { generateChartDimensions } from './visualization-util/visualization-util.generate-chart-names';
import { Round } from '../../utils/round';

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

        targetsDomY += generateToolTipRow(
          target,
          color,
          formatNumber(target.value),
          name,
          y.unit
        );
      } else if ('y2' === yAxisObject[target.id]) {
        const name = removeSubstringByDimensions(target.id, x, y2);
        longScaleValues = getLongScaleValue(limits.y2.max);
        num = target.value;

        targetsDomY2 += generateToolTipRow(
          target,
          color,
          formatNumber(target.value),
          name,
          y2.unit
        );
      }
    }
  });
  const tableHeaderName = `<tr><td colspan="2" class="c3-tooltip__dimension-name c3-tooltip__dimension-name--x">${
    !!x.name ? x.name : ''
  }</td></tr>`;
  const tableHeaderValue = `<tr><th colspan="2"><div class="value__container">${
    !!targetX ? targetX : ''
  }  ${!!x.unit ? x.unit : ''}</div></th></tr>`;

  return `
    <div class="c3-tooltip-container--inner">
      <table class="c3-tooltip">
        <tbody>
          ${tableHeaderName}
          ${tableHeaderValue}
          <tr><td class="c3-tooltip__dimension-name">${
            !!y.name ? y.name : ''
          }</td></tr>
          ${targetsDomY}
          ${
            !!y2
              ? `
          <tr><td class="c3-tooltip__dimension-name">${y2.name}</td></tr>
          ${targetsDomY2}`
              : ''
          }
        </tbody>
      </table>
    </div>`;
};

function formatNumber(num: number): string {
  const sectionLength = 3;

  const numRounded = Round(
    num,
    Math.abs(num) < 10 ? 2 : Math.abs(num) < 50 ? 1 : 0
  );

  const exploded = numRounded.toString().split('.');
  const wholeLenght = exploded[0].length;
  let whole = '';
  const spaces = Math.floor(wholeLenght / sectionLength);
  for (let i = 0; i < spaces; i += 1) {
    whole =
      ' ' +
      exploded[0].slice(
        wholeLenght - (i + 1) * sectionLength,
        wholeLenght - i * sectionLength
      ) +
      whole;
  }
  if (wholeLenght > spaces * sectionLength) {
    whole = exploded[0].slice(0, wholeLenght - spaces * sectionLength) + whole;
  } else {
    whole = whole.slice(1);
  }

  return whole + (exploded[1] ? '.' + exploded[1] : '');
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

function generateToolTipRow(target, color, num, name, unit): string {
  return `<tr class="c3-tooltip-name--${target.id}">
        <td class="value">
          <div class="value__container"  style="color:${color(target)}">
          <div  class="value__name">${!!name ? name + ':' : ''}</div>
            <div>${!!num ? num : ''} ${unit ? unit : ''}</div>
          </div>
        </td>
      </tr>`;
}
