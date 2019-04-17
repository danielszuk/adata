export interface IYAxisMax {
  value: number;
  name?: string;
  whole: number;
  fraction: number;
  power: number;
}

const LongScale: { name?: string; whole: number; power: number }[] = [
  {
    whole: 1,
    power: 0
  },
  {
    name: 'thousand',
    whole: Math.pow(10, 3),
    power: 3
  },
  {
    name: 'million',
    whole: Math.pow(10, 6),
    power: 6
  },
  {
    name: 'milliard',
    whole: Math.pow(10, 9),
    power: 9
  },
  {
    name: 'billion',
    whole: Math.pow(10, 12),
    power: 12
  },
  {
    name: 'billiard',
    whole: Math.pow(10, 15),
    power: 15
  },
  {
    name: 'trillion',
    whole: Math.pow(10, 18),
    power: 18
  }
];

export function getLongScaleValue(d: number): IYAxisMax {
  const dStr = d.toString().split('.')[0];
  const dLength = dStr.length;

  for (let i = LongScale.length - 1; i >= 0; i -= 1) {
    const longScale = LongScale[i];

    if (longScale.power < dLength) {
      const maxValue = d / longScale.whole;

      return {
        value: d,
        ...longScale,
        fraction: maxValue > 10 ? 0 : maxValue > 1 ? 1 : maxValue > 0.1 ? 2 : 3
      };
    }
  }
}

export function formatVerticalAxis(d: number, max: number): string {
  const longScaleValue = getLongScaleValue(max);
  const num = d / longScaleValue.whole;
  return num.toFixed(longScaleValue.fraction);
}

export function formatLabelText(
  axis: { name?: string; unit?: string },
  max: number
): string {
  if (axis) {
    const name = axis.name ? axis.name : '';
    const unit = axis.unit ? `(${axis.unit})` : '';
    const longScaleValue = max ? `in ${getLongScaleValue(max).name}` : '';
    return `${name} ${longScaleValue} ${unit}`;
  } else {
    return '';
  }
}
