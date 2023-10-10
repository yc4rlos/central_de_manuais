import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import EditorJS from '@editorjs/editorjs';

const DragDrop = require('editorjs-drag-drop');
const Undo = require('editorjs-undo');
const LinkTool = require('@editorjs/link');
const SimpleImage = require('@editorjs/simple-image');
const Paragraph = require('editorjs-paragraph-with-alignment');
const Header = require('@editorjs/header');
const Alert = require('editorjs-alert');
const ToggleBlock = require('editorjs-toggle-block');
const Table = require('@editorjs/table');
const Underline = require('@editorjs/underline');
const InlineCode = require('@editorjs/inline-code');
const Marker = require('@editorjs/marker');
const ColorPlugin = require('editorjs-text-color-plugin');

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, MatButtonModule, MatTooltipModule, CommonModule, MatCardModule]
})
export class TextEditorComponent {

  isEditing = false;
  editor!: EditorJS;

  titleControl = new FormControl({ value: 'Manual exemplo', disabled: true });

  constructor() { }

  ngAfterViewInit() {
    var data = JSON.parse(localStorage.getItem('data') as string);
    if (data?.blocks?.length) {
      this.initEditor(true, data)
    }
  }

  initEditor(readOnly: boolean, data?: any) {
    this.editor = new EditorJS({
      placeholder: "Digite sobre a aplicação",
      data,
      readOnly,
      tools: {
        color: {
          class: ColorPlugin,
          config: {
            colorCollections: ['#EC7878', '#9C27B0', '#673AB7', '#3F51B5', '#0070FF', '#03A9F4', '#00BCD4', '#4CAF50', '#8BC34A', '#CDDC39', '#FFF'],
            defaultColor: '#FF1300',
            type: 'text',
            customPicker: true
          }
        },
        marker: {
          class: ColorPlugin,
          config: {
            defaultColor: '#FFBF00',
            type: 'marker',
            icon: `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.6,6L6.9,16.7c-0.2,0.2-0.3,0.4-0.3,0.6L6,23.9c0,0.3,0.1,0.6,0.3,0.8C6.5,24.9,6.7,25,7,25c0,0,0.1,0,0.1,0l6.6-0.6 c0.2,0,0.5-0.1,0.6-0.3L25,13.4L17.6,6z"></path> <path d="M26.4,12l1.4-1.4c1.2-1.2,1.1-3.1-0.1-4.3l-3-3c-0.6-0.6-1.3-0.9-2.2-0.9c-0.8,0-1.6,0.3-2.2,0.9L19,4.6L26.4,12z"></path> </g> <g> <path d="M28,29H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S28.6,29,28,29z"></path> </g> </g></svg>`
          }
        },
        underline: Underline,
        alert: Alert,
        image: SimpleImage,
        header: Header,
        table: Table,

        toggle: {
          class: ToggleBlock,
          inlineToolbar: true,
        },
        inlineCode: {
          class: InlineCode,
          shortcut: 'CMD+SHIFT+M',
        },
        linkTool: {
          class: LinkTool,
          config: {
            endpoint: ''
          }
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
      },
      holder: 'texteditor',
      onReady: () => {
        new DragDrop(this.editor);
        new Undo({ editor: this.editor });
      },
    });
  }

  onEdit() {
    var data = JSON.parse(localStorage.getItem('data') as string);
    if (!data?.blocks?.length) {
      this.initEditor(false);
    } else {
      this.editor.readOnly.toggle();
    }

    this.isEditing = true;
    this.titleControl.enable();
  }

  onStopEdit() {
    this.editor.save().then(data => {

      this.titleControl.enable();
      this.isEditing = false;

      if (!data.blocks.length) {
        alert('O manual não pode ser vazio');
        return;
      }

      localStorage.setItem('data', JSON.stringify(data));
      this.editor.readOnly.toggle();
    })
  }
}
