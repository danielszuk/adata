import { Component, OnInit, Input } from '@angular/core';
import { Animations } from '../../style/variables/animations';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  AnimationEvent
} from '@angular/animations';
import { Transitions } from '../../style/variables/transitions';

@Component({
  selector: 'cle-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    Animations.ngIfOpacity,
    trigger('modalFadeFromUp', [
      state(
        '*',
        style({
          opacity: 1,
          transform: 'translateY(0)'
        })
      ),
      state(
        'void',
        style({
          opacity: 0,
          transform: 'translateY(-60px)'
        })
      ),
      transition('void => *', animate(Transitions.normal)),
      transition('* => void', animate(Transitions.normal))
    ])
  ]
})
export class ModalComponent implements OnInit {
  protected display: boolean;
  protected visible: boolean;

  constructor() {}

  @Input() public title: string;

  ngOnInit() {}

  public open() {
    this.display = true;
    this.visible = true;
  }

  public close() {
    this.visible = false;
  }

  protected animationDone(event: AnimationEvent) {
    // If modal is faded out, remove from Dom
    if (event.toState === 'void') {
      this.display = false;
    }
  }
}
