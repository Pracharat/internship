import { Injectable } from '@angular/core';
import { Subscription, Observable, fromEvent, merge, timer, interval, BehaviorSubject } from 'rxjs';
import { bufferTime, filter, switchMap, map, takeUntil, share, startWith } from 'rxjs/operators';

import { AppSettings } from 'src/app/app-settings';

@Injectable()
export class IdleTimeoutService {

  private subscription: Subscription;

  private mouseMoveEvent$: Observable<Event>;
  private resizeEvent$: Observable<Event>;
  private keydownEvent$: Observable<Event>;
  private activeEvents$: Observable<Event[]>;

  private timeout$: Observable<boolean>;

  private idleSettings = AppSettings.idle;
  get idleSensitivity(): number {
    return this.idleSettings.sensitivity;
  }
  set idleSensitivity(milliseconds: number) {
    this.idleSettings.sensitivity = milliseconds < 1 ? 1000 : milliseconds ;
  }
  get timeout(): number {
    return this.idleSettings.timeout;
  }
  set timeout(milliseconds: number) {
    this.idleSettings.timeout = milliseconds < 1 ? 1000 : milliseconds ;
  }

  private isTimeoutBS$ = new BehaviorSubject<boolean>(null);
  get isTimeout$(): Observable<boolean> {
    return this.isTimeoutBS$.asObservable();
  }

  constructor() { }

  start() {
    this.stop();
    this.setupEvents();
    this.setupTimer();
    this.subscription = interval(this.idleSensitivity).pipe(
      takeUntil(this.timeout$),
    ).subscribe(
      () => {},
      () => {},
      () => {
        this.isTimeoutBS$.next(true);
        this.stop();
      }
    );
  }

  stop() {
    this.isTimeoutBS$.next(false);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private setupEvents() {
    this.mouseMoveEvent$ = fromEvent(window, 'mousemove');
    this.resizeEvent$ = fromEvent(window, 'resize');
    this.keydownEvent$ = fromEvent(document, 'keydown');
    this.activeEvents$ = merge(this.mouseMoveEvent$, this.resizeEvent$, this.keydownEvent$).pipe(
      bufferTime(this.idleSensitivity),
      filter(events => events.length > 0),
      share(),
    );
  }

  private setupTimer() {
    this.timeout$ = this.activeEvents$.pipe(
      startWith(0),
      switchMap(() => timer(this.timeout)),
      map(() => true),
    );
  }

}
