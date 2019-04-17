import { Component, Input, OnChanges } from '@angular/core';
import { EmptyBoolean } from '../../utils/component-decorators/empty-boolean';
import { Required } from '../../utils/component-decorators/required';

@Component({
  selector: 'cle-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnChanges {
  @Input() name: string;

  // Transforms
  @Input() invert: boolean;

  // Sizes
  @Input() small: boolean;
  @Input() medium: boolean;

  constructor() {}

  ngOnChanges() {
    Required(this.name);
    this.invert = EmptyBoolean(this.invert);
    this.small = EmptyBoolean(this.small);
    this.medium = EmptyBoolean(this.medium);
  }
}
