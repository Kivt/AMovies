import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Output() change = new EventEmitter<number>();
  currentPage: number;
  startPage = 1;
  endPage = 2;
  pages = [];
  maxPages = null;

  @Input() perPage = 20;
  @Input()
    set page(val: number) {
      this.currentPage = val;
    }

  @Input()
    set maxPage(val: number) {
      this.maxPages = val;
      this.calculatePages();
    }

  constructor() { }

  ngOnInit() {
  }

  calculatePages() {
    if (!this.maxPages) {
      return;
    }

    if (this.currentPage < 1) {
        this.currentPage = 1;
    } else if (this.currentPage >= this.maxPages) {
      this.currentPage = this.maxPages;
    }

    if (this.maxPages <= 4) {
      this.startPage = 1;
      this.endPage = this.maxPages;
    } else {
      if (this.currentPage <= 2) {
        this.startPage = 1;
        this.endPage = 5;
      } else if (this.currentPage + 2 >= this.maxPages) {
        this.startPage = this.maxPages - 5;
        this.endPage = this.maxPages;
      } else {
        this.startPage = this.currentPage - 2;
        this.endPage = this.currentPage + 2;
      }
    }
    this.pages = Array.from(Array((this.endPage + 1) - this.startPage))
      .map((el, i) => this.startPage + i);
  }

  setPage(page: number) {
    this.currentPage = page;
    this.change.emit(page);
    this.calculatePages();
  }

}
