import { Component, OnInit } from '@angular/core';
import { FacebookService } from '../facebook.service';

@Component({
  selector: 'adata-fb-like',
  templateUrl: './fb-like.component.html',
  styleUrls: ['./fb-like.component.scss']
})
export class FbLikeComponent implements OnInit {
  constructor(private readonly fb: FacebookService) {
    fb.init();
  }

  ngOnInit() {}
}
