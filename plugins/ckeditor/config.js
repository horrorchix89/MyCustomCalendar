/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config
    
    config.autoGrow_minHeight = 150;
    config.autoGrow_maxHeight = 300;
    config.disableNativeSpellChecker = false;
    config.format_tags = 'p;h1;h2;h3;h4;h5;h6;div';
    config.language = 'en';
    config.height = 150;
    config.width = '100%';
    config.toolbarCanCollapse = true;

	// The toolbar groups arrangement, optimized for a single toolbar row.
	config.toolbar = [
		{ name: 'styles', items: [ 'Format' ] },
		{ name: 'basicstyles', items: [ 'Bold', 'Italic', 'Strike', 'Underline' ] },
		{ name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste' ] },
		{ name: 'paragraph', items: [ 'NumberedList', 'BulletedList' ] },
		{ name: 'paragraph', items: [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight' ] },
		{ name: 'undo', items: [ 'Undo', 'Redo' ] },
		{ name: 'links', items: [ 'Link', 'Unlink', 'HorizontalRule' ] },
		{ name: 'editing', items: [ 'Find', 'Replace' ] },
		{ name: 'insert', items: [ 'ckawesome', 'EmojiPanel' ] },
		{ name: 'document', items: [ 'RemoveFormat', 'Source' ] }
	];

	config.removeButtons = 'Anchor,Subscript,Superscript,Outdent,Indent,JustifyBlock';

	// Dialog windows are also simplified.
	config.removeDialogTabs = 'link:advanced';
};
