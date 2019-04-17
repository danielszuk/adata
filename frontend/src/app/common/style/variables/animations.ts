import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Transitions } from 'src/app/common/style/variables/transitions';

export const Animations = {
  ngWidth: trigger('ngWidth', [
    state(
      'visible',
      style({
        width: '*',
        overflow: 'hidden'
      })
    ),
    state(
      'hidden',
      style({
        width: '0',
        overflow: 'hidden'
      })
    ),
    transition('visible => hidden', animate(Transitions.normal)),
    transition('hidden => visible', animate(Transitions.normal))
  ]),
  ngIfWidth: trigger('ngIfWidth', [
    state(
      '*',
      style({
        width: '*'
      })
    ),
    state(
      'void',
      style({
        width: '0'
      })
    ),
    transition('* => void', animate(Transitions.normal)),
    transition('void => *', animate(Transitions.normal))
  ]),
  ngIfHeight: trigger('ngIfHeight', [
    state(
      '*',
      style({
        height: '*'
      })
    ),
    state(
      'void',
      style({
        height: '0'
      })
    ),
    transition('* => void', animate(Transitions.normal)),
    transition('void => *', animate(Transitions.normal))
  ]),
  ngIfOpacity: trigger('ngIfOpacity', [
    state(
      '*',
      style({
        opacity: '1'
      })
    ),
    state(
      'void',
      style({
        opacity: '0'
      })
    ),
    transition('* => void', animate(Transitions.normal)),
    transition('void => *', animate(Transitions.normal))
  ])
};

export const AnimationsUtils = {
  disableChildsInitAnimation: trigger('disableChildsInitAnimation', [
    transition(':enter', [])
  ])
};
