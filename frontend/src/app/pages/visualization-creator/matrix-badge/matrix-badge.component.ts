import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Colors, ColorCodes } from 'src/shared/enums/colors.enum';
import { Required } from 'src/app/common/utils/component-decorators/required';
import { sliceString } from 'src/app/common/utils/string-manipulation';

@Component({
  selector: 'adata-matrix-badge',
  templateUrl: './matrix-badge.component.html',
  styleUrls: ['./matrix-badge.component.scss']
})
export class MatrixBadgeComponent implements OnInit {
  @Input() title: string;
  @Input() color: Colors;

  @Output() remove: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<Colors> = new EventEmitter<Colors>();

  public sliceString: string;

  constructor() {}

  ngOnInit() {
    Required(this.color);
    this.sliceString = sliceString(this.title);
  }

  public changeColor(e: Colors) {
    this.change.emit(e);
  }

  public removeById() {
    this.remove.emit();
  }

  public get getColorCode(): string {
    return ColorCodes[this.color];
  }
}
