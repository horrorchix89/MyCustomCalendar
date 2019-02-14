/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */
CKEDITOR.editorConfig = function (config) {
    // Define changes to default configuration here.
    // For complete reference see:
    // http://docs.ckeditor.com/#!/api/CKEDITOR.config
    config.height = 150;
    //config.colorButton_colorsPerRow = 8;
    //config.colorButton_enableMore = false;

    config.toolbarGroups = [ {
        name: 'document',
        groups: ['mode', 'document', 'doctools']
    }, {
        name: 'clipboard',
        groups: ['clipboard', 'undo']
    }, {
        name: 'editing',
        groups: ['find', 'selection', 'spellchecker']
    }, {
        name: 'forms'
    }, {
        name: 'basicstyles',
        groups: ['basicstyles', 'cleanup']
    }, {
        name: 'paragraph',
        groups: ['list', 'indent', 'blocks', 'align', 'bidi']
    }, {
        name: 'links'
    }, {
        name: 'insert'
    }, {
        name: 'styles'
    }, {
        name: 'colors'
    }, {
        name: 'tools'
    }, {
        name: 'others'
    }, {
        name: 'about'
    }
    ];
    config.removeButtons = 'Cut,Copy,Paste,Undo,Redo,Anchor,Underline,Strike,Subscript,Superscript';
    config.removeDialogTabs = 'link:advanced';
};
