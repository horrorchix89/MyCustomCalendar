/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

    config.autoGrow_maxHeight = 150;
    //config.baseFloatZIndex = 1E5;
    config.disableNativeSpellChecker = false;
    config.format_tags = 'p;h1;h2;h3;h4;h5;h6;div';
    config.height = 125;
    config.justifyClasses = [ 'AlignLeft', 'AlignCenter', 'AlignRight' ];
    config.toolbarCanCollapse = true;
    
	// The toolbar groups arrangement, optimized for a single toolbar row.
    /*config.toolbar = [
		{ name: 'clipboard', items: [ 'Undo', 'Redo' ] },
		{ name: 'styles', items: [ 'Format' ] },
		{ name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste' ] },
		{ name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', '-', 'RemoveFormat' ] },
		'/',
		{ name: 'paragraph', items: [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', '-', 'BulletedList', 'NumberedList' ] },
		{ name: 'links', items: [ 'Link', 'Unlink' ] },
		{ name: 'insert', items: [ 'HorizontalRule', 'ckawesome' ] },
		{ name: 'editing', items: [ 'Find', 'Replace' ] },
		{ name: 'document', items: [ 'Source' ] }
	];
	config.toolbarGroups = [
		{ name: 'styles', groups: [ 'styles' ] },
		{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
		{ name: 'forms', groups: [ 'forms' ] },
		{ name: 'paragraph', groups: [ 'align', 'list', 'indent', 'blocks', 'bidi', 'paragraph' ] },
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'links', groups: [ 'links' ] },
		{ name: 'insert', groups: [ 'insert' ] },
		{ name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
		{ name: 'colors', groups: [ 'colors' ] },
		{ name: 'tools', groups: [ 'tools' ] },
		{ name: 'others', groups: [ 'others' ] },
		{ name: 'about', groups: [ 'about' ] }
	];*/
    config.toolbarGroups = [
        { name: 'styles' },
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'forms' },
        { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'links' },
		{ name: 'insert' },
        { name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
        { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
		{ name: 'colors' },
		{ name: 'tools' },
		{ name: 'others' },
		{ name: 'about' }
	];

	// The default plugins included in the basic setup define some buttons that
	// are not needed in a basic editor. They are removed here.
	config.removeButtons = 'Cut,Copy,Paste,Undo,Redo,Anchor,Underline,Strike,Subscript,Superscript';

	// Dialog windows are also simplified.
	config.removeDialogTabs = 'link:advanced';
};
