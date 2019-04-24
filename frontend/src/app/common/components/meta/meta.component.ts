import { Component, Input, OnChanges } from '@angular/core';
import { Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'cle-meta',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.scss']
})
export class MetaComponent implements OnChanges {
  constructor(private readonly meta: Meta) {}

  @Input() private name: string;
  @Input() private property: string;
  @Input() private content: string;

  ngOnChanges() {
    const metaTag: MetaDefinition = {};
    if (this.name) {
      metaTag.name = this.name;
    }
    if (this.property) {
      metaTag.property = this.property;
    }
    if (this.content) {
      metaTag.content = this.content;
    }

    this.meta.updateTag(metaTag);
  }
}
