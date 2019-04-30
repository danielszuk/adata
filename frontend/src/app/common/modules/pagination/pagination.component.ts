import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export interface IPagination {
  count: number;
  countPerPage: number;
}

@Component({
  selector: 'adata-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() pagination: IPagination;

  public numberOfPages = 1;
  public currentPage = 1;
  public paginationArray: number[] = [1];

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    if (this.pagination && !this.pagination.countPerPage) {
      console.error(
        `You must provide '@Input() pagination.countPerPage:number' property in your adata-pagination component`
      );
    }

    this.activatedRoute.queryParams.subscribe(params => {
      if (params.page === undefined || params.page < 0) {
        this.router.navigate([], {
          relativeTo: this.activatedRoute
        });
      } else {
        this.setCurrentPage(parseInt(params.page, 10));
      }
    });
  }

  ngOnChanges() {
    if (this.pagination && this.pagination.count) {
      this.numberOfPages =
        Math.floor(this.pagination.count / this.pagination.countPerPage) + 1;
      if (this.numberOfPages < 10) {
        this.paginationArray = new Array(this.numberOfPages)
          .fill(0)
          .map((x, i) => i + 1);
      } else {
        this.generateSectionalPagination();
      }
    }
  }

  public setCurrentPage(currentPage: number) {
    this.currentPage = currentPage;
  }

  public generateSectionalPagination(): number[] {
    if (this.currentPage < 3) {
      return (this.paginationArray = new Array(6).fill(0).map((x, i) => {
        if (0 === i) {
          return 1;
        } else if (1 === i) {
          return 2;
        } else if (2 === i) {
          return 3;
        } else if (3 === i) {
          return undefined;
        } else if (4 === i) {
          return this.numberOfPages - 1;
        } else if (5 === i) {
          return this.numberOfPages;
        }
      }));
    } else if (
      3 <= this.currentPage &&
      this.currentPage < this.numberOfPages - 3
    ) {
      return (this.paginationArray = new Array(7).fill(0).map((x, i) => {
        if (0 === i) {
          return 1;
        } else if (1 === i) {
          return undefined;
        } else if (2 === i) {
          return this.currentPage - 1;
        } else if (3 === i) {
          return this.currentPage;
        } else if (4 === i) {
          return this.currentPage + 1;
        } else if (5 === i) {
          return undefined;
        } else if (6 === i) {
          return this.numberOfPages;
        }
      }));
    } else {
      return (this.paginationArray = new Array(6).fill(0).map((x, i) => {
        if (0 === i) {
          return 1;
        } else if (1 === i) {
          return undefined;
        } else if (2 === i) {
          return this.numberOfPages - 3;
        } else if (3 === i) {
          return this.numberOfPages - 2;
        } else if (4 === i) {
          return this.numberOfPages - 1;
        } else if (5 === i) {
          return this.numberOfPages;
        }
      }));
    }
  }
}
