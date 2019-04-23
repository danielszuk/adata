import { Component, OnInit, Input } from '@angular/core';
import { FacebookService } from '../facebook.service';
import { Router } from '@angular/router';
import { ConfigService } from '../../../../../core/config/config.service';

@Component({
  selector: 'adata-fb-like',
  templateUrl: './fb-like.component.html',
  styleUrls: ['./fb-like.component.scss']
})
export class FbLikeComponent implements OnInit {
  constructor(
    private readonly fb: FacebookService,
    private readonly router: Router,
    private readonly configService: ConfigService
  ) {
    this.fb.init();
  }

  @Input() public href: string;

  ngOnInit() {
    this.href = this.href || this.configService.config.appUrl + this.router.url;
  }
}
