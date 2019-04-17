import { Component, OnInit, Input } from '@angular/core';
import { EmptyBoolean } from '../../utils/component-decorators/empty-boolean';

@Component({
  selector: 'cle-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  constructor() {}

  @Input() complete: boolean;
  @Input() failed: boolean;
  @Input() text: string;

  @Input() tiny: boolean;
  @Input() small: boolean;

  @Input() dark: boolean;
  @Input() light: boolean;

  ngOnInit() {
    this.tiny = EmptyBoolean(this.tiny);
    this.small = EmptyBoolean(this.small);
    this.dark = EmptyBoolean(this.dark);
    this.light = EmptyBoolean(this.light);
  }
}
