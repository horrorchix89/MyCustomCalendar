/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */
CKEDITOR.editorConfig = function (config) {
   // Define changes to default configuration here.
   // For complete reference see:
   // http://docs.ckeditor.com/#!/api/CKEDITOR.config

   // The toolbar groups arrangement, optimized for a single toolbar row.
   config.height = 150;
   config.colorButton_colorsPerRow = 8;
   config.colorButton_enableMore = false;
   config.colorButton_colors =
      '000,800000,8B4513,2F4F4F,008080,000080,4B0082,696969,' +
      'B22222,A52A2A,DAA520,006400,40E0D0,0000CD,800080,808080,' +
      'F00,FF8C00,FFD700,008000,0FF,00F,EE82EE,A9A9A9,' +
      'FFA07A,FFA500,FFFF00,00FF00,AFEEEE,ADD8E6,DDA0DD,D3D3D3,' +
      'FFF0F5,FAEBD7,FFFFE0,F0FFF0,F0FFFF,F0F8FF,E6E6FA,FFF';
   config.toolbarGroups = [{
         name: 'document',
         groups: ['mode', 'document', 'doctools']
      },
      {
         name: 'clipboard',
         groups: ['clipboard', 'undo']
      },
      {
         name: 'editing',
         groups: ['find', 'selection', 'spellchecker']
      },
      {
         name: 'forms'
      },
      {
         name: 'basicstyles',
         groups: ['basicstyles', 'cleanup']
      },
      {
         name: 'paragraph',
         groups: ['list', 'indent', 'blocks', 'align', 'bidi']
      },
      {
         name: 'links'
      },
      {
         name: 'insert'
      },
      {
         name: 'styles'
      },
      {
         name: 'colors'
      },
      {
         name: 'tools'
      },
      {
         name: 'others'
      },
      {
         name: 'about'
      }
   ];

   // The default plugins included in the basic setup define some buttons that
   // are not needed in a basic editor. They are removed here.
   config.removeButtons = 'Cut,Copy,Paste,Undo,Redo,Anchor,Underline,Strike,Subscript,Superscript';

   // Dialog windows are also simplified.
   config.removeDialogTabs = 'link:advanced';
};