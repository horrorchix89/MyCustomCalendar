/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
    config.extraPlugins = 'ckawesome';
    config.height = '100px';
    config.toolbar = [
        { name: 'CKAwesome', items: [ 'Image', 'ckawesome' ] }
    ];
    config.toolbarCanCollapse = true;
	config.toolbarGroups = [
		{ name: 'clipboard', groups: [ 'undo', 'clipboard' ] },
		{ name: 'forms' },
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph', groups: [ 'indent', 'blocks', 'align', 'list', 'bidi', 'paragraph' ] },
		{ name: 'links' },
		{ name: 'insert'},
		{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
		{ name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'styles'},
		{ name: 'colors' },
		{ name: 'tools'},
		{ name: 'others'},
		{ name: 'about' }
	];

	config.removeButtons = 'Cut,Copy,Paste,Anchor,Subscript,Superscript,Outdent,Indent,JustifyBlock';
};