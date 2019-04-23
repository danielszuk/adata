import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Required } from '../../utils/component-decorators/required';
import { EmptyBoolean } from '../../utils/component-decorators/empty-boolean';
import { Loader } from '../../utils/loader';

@Component({
  selector: 'cle-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  constructor() {}

  @Input() value: string;
  @Input() type: 'submit' | 'button' | 'reset';
  @Input() icon: string;

  @Input() long: boolean;
  @Input() danger: boolean;
  @Input() neutral: boolean;
  @Input() disabled: boolean;

  @Input() disableHover: boolean;

  @Input() loading: boolean;
  @Input() loadingSuccess: boolean;
  @Input() loader: Loader;

  ngOnInit() {
    Required(this.value);
    this.disableHover = EmptyBoolean(this.disableHover);
    this.long = EmptyBoolean(this.long);
    this.danger = EmptyBoolean(this.danger);
    this.neutral = EmptyBoolean(this.neutral);
    this.disabled = EmptyBoolean(this.disabled);
  }

  public get anyLoading(): boolean {
    return this.loading || (this.loader && this.loader.loading);
  }

  public get anyLoadingSuccess(): boolean {
    return this.loadingSuccess || (this.loader && this.loader.loadingComplete);
  }
}
