import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'adata-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.scss']
})
export class HamburgerComponent implements OnInit {
  @Input() active: boolean;

  constructor() {}

  ngOnInit() {}
}
