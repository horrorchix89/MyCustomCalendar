/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config
    
    config.autoGrow_maxHeight = 250;
    config.disableNativeSpellChecker = false;
    config.format_tags = 'p;h1;h2;h3;h4;h5;h6;div';
    config.height = '125px';
    config.toolbarCanCollapse = true;

	// The toolbar groups arrangement, optimized for a single toolbar row.
	config.toolbarGroups = [
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'styles', groups: [ 'styles' ] },
		{ name: 'links', groups: [ 'links' ] },
		{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
		'/',
		{ name: 'paragraph', groups: [ 'align', 'list', 'indent', 'blocks', 'bidi', 'paragraph' ] },
		{ name: 'insert', groups: [ 'insert' ] },
		{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
		{ name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'forms', groups: [ 'forms' ] },
		{ name: 'colors', groups: [ 'colors' ] },
		{ name: 'tools', groups: [ 'tools' ] },
		{ name: 'others', groups: [ 'others' ] },
		{ name: 'about', groups: [ 'about' ] }
	];
    
    /*config.toolbar = [
		{ name: 'basicstyles', items: [ 'Bold', 'Italic', 'Strike', 'Underline', ]},
		{ name: 'paragraph', items: [ 'BulletedList', 'NumberedList' ]},
		{ name: 'styles', items: [ 'Format' ] },
		{ name: 'links', items: [ 'Link', 'Unlink', 'HorizontalRule' ] },
		{ name: 'paragraph', items: [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight' ] },
		{ name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste' ] },
		{ name: 'basicstyles', items: [ 'RemoveFormat' ] },
		{ name: 'document', items: [ 'Source' ] },
		{ name: 'undo', items: [ 'Undo', 'Redo' ] },
		{ name: 'editing', items: [ 'Find', 'Replace' ] },
		{ name: 'insert', items: [ 'HorizontalRule', 'ckawesome', 'EmojiPanel' ] }
	];
    config.toolbar = [
		{ name: 'undo', items: [ 'Undo', 'Redo' ] },
		{ name: 'styles', items: [ 'Format', 'FontSize' ] },
		{ name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike' ] },
		{ name: 'align', items: [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight' ] },
		{ name: 'list', items: [ 'NumberedList', 'BulletedList' ] },
		{ name: 'links', items: [ 'Link', 'Unlink' ] },
		{ name: 'insert', items: [ 'HorizontalRule','ckawesome', 'EmojiPanel' ] },
		{ name: 'cleanup', items: [ 'RemoveFormat' ] },
		{ name: 'document', items: [ 'Source' ] }
	];*/

	config.removeButtons = 'Cut,Anchor,Subscript,Superscript,Outdent,Indent';

	// Dialog windows are also simplified.
	config.removeDialogTabs = 'link:advanced';
};
