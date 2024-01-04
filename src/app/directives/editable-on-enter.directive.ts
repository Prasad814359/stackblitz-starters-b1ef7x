import { Directive, HostListener, inject } from '@angular/core';
import { EditComponent } from '../edit/edit.component';

@Directive({
  selector: '[editableOnEnter]',
  standalone: true,
})
export class EditableOnEnterDirective {
  #editable = inject(EditComponent);

  @HostListener('keyup.enter')
  onEnter(): void {
    this.#editable.saveEdit();
  }
}
