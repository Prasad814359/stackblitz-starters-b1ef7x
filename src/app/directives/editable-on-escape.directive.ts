import { Directive, HostListener, inject } from '@angular/core';
import { EditComponent } from '../edit/edit.component';

@Directive({
  selector: '[editableOnEscape]',
  standalone: true,
})
export class EditableOnEscapeDirective {
  #editable = inject(EditComponent);

  @HostListener('keyup.escape')
  onEnter(): void {
    this.#editable.cancelEdit();
  }
}
