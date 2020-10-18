import {
  Component,
  OnInit, OnChanges,
  Input, Output, EventEmitter, SimpleChanges, ChangeDetectionStrategy,
} from '@angular/core';
import { combineLatest, Observable, BehaviorSubject } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

import { AppSettings } from 'src/app/app-settings';
import { UtilityService } from '@app-services/common/utility.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Output() pageChange = new EventEmitter<number>();

  @Input() total = 0;
  @Input() page = 1;
  @Input() limit: number = AppSettings.pagination.limit;

  @Input() maxPageSize: number = AppSettings.paginationSettings.maxPageSize;
  @Input() boundaryLinks: boolean = AppSettings.paginationSettings.boundaryLinks;
  @Input() directionLinks: boolean = AppSettings.paginationSettings.directionLinks;
  @Input() boundaryPages: boolean = AppSettings.paginationSettings.boundaryPages;

  private total$ = new BehaviorSubject<number>(0);
  private page$ = new BehaviorSubject<number>(1);
  private limit$ = new BehaviorSubject<number>(AppSettings.pagination.limit);
  private maxPageSize$ = new BehaviorSubject<number>(AppSettings.paginationSettings.maxPageSize);
  hasTotalItems$: Observable<boolean> = this.total$.pipe(
    map(total => total > 0),
  );

  get isValidTotal(): boolean {
    return !UtilityService.isNullOrUndefined(this.total) && this.total >= 0;
  }
  get isValidLimit(): boolean {
    return !UtilityService.isNullOrUndefined(this.limit) && this.limit > 0;
  }
  get isValidPage(): boolean {
    return !UtilityService.isNullOrUndefined(this.page) && this.page > 0;
  }
  get isValidMaxPageSize(): boolean {
    return !UtilityService.isNullOrUndefined(this.maxPageSize) && this.maxPageSize > 0;
  }
  get isValidOptions(): boolean {
    return this.isValidTotal && this.isValidLimit && this.isValidPage && this.isValidMaxPageSize;
  }

  get isValidTotal$(): Observable<boolean> {
    return this.total$.pipe(
      map(total => !UtilityService.isNullOrUndefined(total) && total >= 0),
    );
  }
  get isValidLimit$(): Observable<boolean> {
    return this.limit$.pipe(
      map(limit => !UtilityService.isNullOrUndefined(limit) && limit > 0),
    );
  }
  get isValidPage$(): Observable<boolean> {
    return this.page$.pipe(
      map(page => !UtilityService.isNullOrUndefined(page) && page > 0),
    );
  }
  get isValidMaxPageSize$(): Observable<boolean> {
    return this.maxPageSize$.pipe(
      map(maxPageSize => !UtilityService.isNullOrUndefined(maxPageSize) && maxPageSize > 0),
    );
  }
  get isValidOptions$(): Observable<boolean> {
    return combineLatest([
      this.isValidTotal$,
      this.isValidLimit$,
      this.isValidPage$,
      this.isValidMaxPageSize$,
    ]).pipe(
      map(([
        isValidTotal,
        isValidLimit,
        isValidPage,
        isValidMaxPageSize
      ]) => isValidTotal && isValidLimit && isValidPage && isValidMaxPageSize),
    );
  }

  pages$: Observable<number[]>;
  get totalPage(): number {
    return Math.ceil(this.total / this.limit);
  }
  get isFirstPage(): boolean {
    return this.page === 1;
  }
  get isLastPage(): boolean {
    return this.page === this.totalPage;
  }
  get leftWindowsCount(): number {
    return Math.ceil((this.maxPageSize - 1) / 2);
  }
  get rightWindowsCount(): number {
    return Math.floor((this.maxPageSize - 1) / 2);
  }
  get isDisplayLeftEllipsis(): boolean {
    const outerPage = this.page - this.leftWindowsCount;
    return this.isDisplayLeftBoundaryPage && outerPage - 1 > 1 && outerPage > 1;
  }
  get isDisplayRightEllipsis(): boolean {
    const outerPage = this.page + this.rightWindowsCount;
    return this.isDisplayRightBoundaryPage && outerPage + 1 < this.totalPage && outerPage < this.totalPage;
  }
  get isDisplayLeftBoundaryPage(): boolean {
    return this.boundaryPages && (this.page - this.leftWindowsCount) > 1;
  }
  get isDisplayRightBoundaryPage(): boolean {
    return this.boundaryPages && (this.page + this.rightWindowsCount) < this.totalPage;
  }

  ngOnInit() {
    this.getPagingWindows();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes) {
      return;
    }

    if (changes.total) {
      this.total$.next(this.isValidTotal ? this.total : 0);
    }

    if (changes.page) {
      this.page$.next(this.isValidPage ? this.page : AppSettings.pagination.page);
    }

    if (changes.limit) {
      this.limit$.next(this.isValidLimit ? this.limit : AppSettings.pagination.limit);
    }

    if (changes.maxPageSize) {
      this.maxPageSize$.next(this.isValidMaxPageSize ? this.maxPageSize : AppSettings.paginationSettings.maxPageSize);
    }
  }

  private getPagingWindows() {
    this.pages$ = combineLatest([
      this.total$,
      this.limit$,
      this.page$,
      this.maxPageSize$,
    ]).pipe(
      map(([total, limit, page]) => {
        if (!this.isValidOptions) {
          return [];
        }

        const size: number = Math.ceil(total / limit);
        const startAt = page === 1 ? 1 : page - this.leftWindowsCount;
        const endAt = page + this.rightWindowsCount;
        const pages = UtilityService.createNumberArray(size, startAt, endAt);
        return pages;
      }),
    );
  }

  goToPage(page: number) {
    if (page === this.page) {
      return;
    }

    if (page > this.totalPage) {
      page = this.totalPage;
    }
    if (page < 1) {
      page = 1;
    }

    this.page$.next(page);
    this.pageChange.emit(page);
  }

  goToFirst() {
    this.goToPage(1);
  }

  goToLast() {
    this.goToPage(this.totalPage);
  }

  goToPrevious() {
    this.goToPage(this.page - 1);
  }

  goToNext() {
    this.goToPage(this.page + 1);
  }

  isCurrentPage(page: number): boolean {
    return page === this.page;
  }

}
