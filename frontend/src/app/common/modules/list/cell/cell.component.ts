import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'list-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
  constructor() {}

  @Input() text: string;
  @Input() icon: string;

  ngOnInit() {}
}
