import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Colors, ColorCodes } from 'src/shared/enums/colors.enum';
import { Animations } from '../../style/variables/animations';
import { Required } from '../../utils/component-decorators/required';

@Component({
  selector: 'adata-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  animations: [Animations.ngIfHeight]
})
export class ColorPickerComponent implements OnInit {
  @Input() color: Colors;

  @Output() change: EventEmitter<Colors> = new EventEmitter<Colors>();

  public isOpen = false;
  public colorArray;

  constructor() {}

  ngOnInit() {
    this.colorArray = Object.keys(Colors).map(key => ({
      hex: ColorCodes[key],
      name: key
    }));
    Required(this.color);
  }

  public toggleDropdown(b: boolean) {
    this.isOpen = b;
  }

  public changeColor(color: Colors) {
    this.change.emit(color);
  }

  public get getColorCode(): string {
    return ColorCodes[this.color];
  }
}
