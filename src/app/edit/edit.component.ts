import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  DestroyRef,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {  Mode } from '../mode'
import { EditModeDirective } from '../directives/edit-mode.directive'
import { ViewModeDirective } from '../directives/view-mode.directive'
import { filter, fromEvent, skip, Subscription, switchMap, take } from 'rxjs';


@Component({
  standalone: true,
  selector: 'edit',
  template: `<ng-container *ngTemplateOutlet="editMode() ? editModeTpl.tpl : viewModeTpl.tpl"></ng-container>`,
  imports: [AsyncPipe, NgTemplateOutlet],
})
export class EditComponent {

  #el = inject(ElementRef);
  #destroyRef = inject(DestroyRef);

  @Input() enabled = true;
  @Input() openBindingEvent = 'click';
  @Input() closeBindingEvent = 'click';

  @Output() save: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() modeChange: EventEmitter<Mode> = new EventEmitter<Mode>();

  @ContentChild(ViewModeDirective) viewModeTpl: ViewModeDirective;
  @ContentChild(EditModeDirective) editModeTpl: EditModeDirective;

  editMode = signal(false); 
  editMode$ = toObservable(this.editMode);

  public viewHandler: Subscription;
  public editHandler: Subscription;

  constructor() {
    afterNextRender(() => {
      this.handleViewMode();
      this.handleEditMode();
    });
  }

  private get element(): any {
    return this.#el.nativeElement;
  }

  private handleViewMode(): void {
    this.viewHandler = fromEvent(this.element, this.openBindingEvent)
      .pipe(
        filter(() => this.enabled && !this.editMode()),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe(() => this.displayEditMode());
  }


  private handleEditMode(): void {
    const clickOutside$ = (editMode: boolean) =>
      fromEvent(document, this.closeBindingEvent).pipe(
        filter(() => editMode),
        skip(this.openBindingEvent === this.closeBindingEvent ? 1 : 0),
        filter(({ target }) => this.element.contains(target) === false),
        take(1)
      );

    this.editHandler = this.editMode$
      .pipe(
        switchMap((editMode: boolean) => clickOutside$(editMode)),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe(() => this.saveEdit());
  }

  public displayEditMode(): void {
    this.editMode.set(true);
    this.modeChange.emit('edit');
  }

  public saveEdit(): void {
    this.save.next();
    this.leaveEditMode();
  }
  
  private leaveEditMode(): void {
    this.editMode.set(false);
    this.modeChange.emit('view');
    this.viewHandler.unsubscribe();
    setTimeout(() => this.handleViewMode(), 0);
  }

  public cancelEdit(): void {
    this.cancel.next();
    this.leaveEditMode();
  }

}
