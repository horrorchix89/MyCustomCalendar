/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function(config) {
	config.allowedContent = true;
	config.disableNativeSpellChecker = false;
	config.format_tags = 'p;h1;h2;h3;h4;h5;h6;div';
	config.height = 100;
	config.toolbarCanCollapse = true;
	config.toolbar = [
		{ name: 'undo', items: [ 'Undo', 'Redo' ] },
		{ name: 'styles', items: [ 'Format' ] },
		{ name: 'basicstyles', items: [ 'Bold', 'Italic', 'Strike', 'Underline' ] },
		{ name: 'paragraph', items: [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight' ] },
		{ name: 'paragraph', items: [ 'NumberedList', 'BulletedList' ] },
		{ name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste' ] },
		{ name: 'links', items: [ 'Link', 'Unlink', 'HorizontalRule' ] },
		{ name: 'editing', items: [ 'Find', 'Replace' ] },
		{ name: 'insert', items: [ 'ckawesome', 'EmojiPanel' ] },
		{ name: 'document', items: [ 'RemoveFormat', 'Source' ] }
	];

	config.removeButtons = 'Anchor,Subscript,Superscript,Outdent,Indent,JustifyBlock';
	config.removeDialogTabs = '';
	config.removePlugins = 'autogrow';
};
