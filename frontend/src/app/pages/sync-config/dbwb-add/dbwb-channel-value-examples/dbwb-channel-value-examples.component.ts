import { Component, OnChanges, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { ForEach } from '../../../../common/utils/for-each';
import { Animations } from '../../../../common/style/variables/animations';

@Component({
  selector: 'adata-dbwb-channel-value-examples',
  templateUrl: './dbwb-channel-value-examples.component.html',
  styleUrls: ['./dbwb-channel-value-examples.component.scss'],
  animations: [Animations.ngIfHeight]
})
export class DbwbChannelValueExamplesComponent implements OnChanges {
  public examples: string[];
  private valueChangeSubscription: Subscription;

  constructor() {}

  @Input() public group: FormGroup;
  @Input() public controlName: string;
  @Input() private results: object[];

  ngOnChanges() {
    this.getExamples();

    if (this.valueChangeSubscription) {
      this.valueChangeSubscription.unsubscribe();
    }
    this.valueChangeSubscription = this.group.controls[
      this.controlName
    ].valueChanges.subscribe(() => {
      this.getExamples();
    });
  }

  private getExamples() {
    let properties = this.group.controls[this.controlName].value;
    if (!properties) {
      this.examples = undefined;
      return;
    }
    properties = properties.split('.');
    properties.shift();

    this.examples = [];
    ForEach(this.results, result => {
      let example: any = result;
      ForEach(properties, (property: string) => {
        example = example[property];
      });
      this.examples.push(example);
    });
  }
}
