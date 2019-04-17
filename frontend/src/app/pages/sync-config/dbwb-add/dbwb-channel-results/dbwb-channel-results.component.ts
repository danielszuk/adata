import {
  Component,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { Animations } from '../../../../common/style/variables/animations';
import { ObjectToFlat } from '../../../../common/utils/object-to-flat';
import { Height } from '../../../../common/utils/dimensions';

@Component({
  selector: 'adata-dbwb-channel-results',
  templateUrl: './dbwb-channel-results.component.html',
  styleUrls: ['./dbwb-channel-results.component.scss'],
  animations: [Animations.ngIfHeight]
})
export class DbwbChannelResultsComponent implements OnChanges {
  public results: object[];
  public properties: string[];

  constructor() {}

  @Input() private someResults: object[];
  @Input() public totalResults: number;
  @Output() private height = new EventEmitter<number>();

  @ViewChild('container') container: ElementRef;

  ngOnChanges() {
    if (this.totalResults) {
      this.results = this.someResults.map(result => ObjectToFlat(result));
      this.properties = Object.keys(this.results[0]);
    } else {
      this.results = undefined;
      this.properties = undefined;
    }
  }

  public animationDone(event: AnimationEvent) {
    if (event.toState === null) {
      this.height.emit(Height(this.container.nativeElement));
    }
  }
}
