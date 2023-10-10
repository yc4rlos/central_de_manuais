import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemComponent } from './system.component';
import { TextEditorComponent } from 'src/app/shared/components/text-editor/text-editor.component';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    NavbarComponent,
    TextEditorComponent,
  ],
  declarations: [SystemComponent]
})
export class SystemModule { }
