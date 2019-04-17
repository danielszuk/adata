import { Component, OnInit, Input } from '@angular/core';
import { Required } from '../../utils/component-decorators/required';
import { Animations } from '../../style/variables/animations';

interface IPipe {
  text?: string | number;
  icon?: string;
  class?: string | string[];
}
interface IRowLoading {
  id: number;
  text?: string;
}
export interface IList<T> {
  columns: {
    name?: string;

    property?: string;
    icon?: string;
    class?: string | string[];
    pipe?: (row: T) => IPipe | string;

    action?: (row: T) => any;

    align?: 'left';
    grow?: number;
  }[];

  rows?: T[];
  rowsLoading?: IRowLoading[];

  loading?: boolean;
}

@Component({
  selector: 'cle-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [Animations.ngIfOpacity]
})
export class ListComponent implements OnInit {
  constructor() {}

  @Input() list: IList<any>;

  return;

  ngOnInit() {
    Required(this.list);
  }

  public concatClasses(
    class1: string | string[],
    class2: string | string[]
  ): string[] {
    const classArray =
      typeof class1 === 'object'
        ? [...class1]
        : typeof class1 === 'string'
        ? [class1]
        : [];

    if (class2) {
      if (typeof class2 === 'object') {
        classArray.push(...class2);
      } else if (typeof class2 === 'string') {
        classArray.push(class2);
      }
    }

    return classArray;
  }

  public runPipe(row: any, pipe: (row: any) => IPipe | string): IPipe {
    const value = pipe(row);

    return typeof value === 'string' ? { text: value } : value;
  }

  public rowLoading(rowId: number): IRowLoading {
    return this.list.rowsLoading
      ? this.list.rowsLoading.find(rowLoading => rowLoading.id === rowId)
      : undefined;
  }
}
