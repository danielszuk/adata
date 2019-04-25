import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import { Meta, MetaDefinition } from '@angular/platform-browser';
import { Required } from '../../utils/component-decorators/required';

@Component({
  selector: 'cle-meta',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.scss']
})
export class MetaComponent implements OnChanges, OnDestroy {
  private initialized: boolean;
  private originalMetaTag: MetaDefinition;

  constructor(private readonly meta: Meta) {}

  @Input() private name: string;
  @Input() private property: string;
  @Input() private content: string;

  ngOnChanges(simpleChanges: SimpleChanges) {
    // Validation
    if (this.name && this.property) {
      throw new Error(`You must use 'meta name' OR 'meta property', not both.`);
    }
    if (this.initialized && (simpleChanges.name || simpleChanges.property)) {
      throw new Error(
        `You cant modify 'meta name' nor 'meta property' after initialized.`
      );
    }

    // Read original meta tag (for restore after destroy)
    if (!this.initialized) {
      let metaElement: HTMLMetaElement;
      this.originalMetaTag = {};
      if (this.name) {
        metaElement = this.meta.getTag(`name="${this.name}"`);
        this.originalMetaTag.name = this.name;
      } else if (this.property) {
        metaElement = this.meta.getTag(`property="${this.property}"`);
        this.originalMetaTag.property = this.property;
      }
      this.originalMetaTag.content = metaElement
        ? metaElement.content
        : undefined;

      this.initialized = true;
    }

    const metaTag: MetaDefinition = {};

    if (this.name) {
      metaTag.name = this.name;
    } else if (this.property) {
      metaTag.property = this.property;
    }

    if (this.content) {
      metaTag.content = this.content;
    }

    this.meta.updateTag(metaTag);
  }

  ngOnDestroy() {
    // Restore original meta tag
    if (this.originalMetaTag.content) {
      this.meta.updateTag(this.originalMetaTag);
    } else {
      if (this.originalMetaTag.name) {
        this.meta.removeTag(`name="${this.originalMetaTag.name}"`);
      } else if (this.originalMetaTag.property) {
        this.meta.removeTag(`property="${this.originalMetaTag.property}"`);
      }
    }
  }
}
