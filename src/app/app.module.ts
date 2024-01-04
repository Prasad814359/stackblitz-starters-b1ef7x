import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { EditComponent } from './edit/edit.component';
import { EditModeDirective } from './directives/edit-mode.directive';
import { ViewModeDirective } from './directives/view-mode.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditableOnEnterDirective } from './directives/editable-on-enter.directive';
import { EditableOnEscapeDirective } from './directives/editable-on-escape.directive';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    EditComponent,
    EditModeDirective,
    ViewModeDirective,
    ReactiveFormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    EditableOnEnterDirective,
    EditableOnEscapeDirective,
    MatIconModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
