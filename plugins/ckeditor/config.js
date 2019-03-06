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
		'Undo', 'Redo', 'Format', 'Bold', 'Italic', 'Strike', 'Underline', 
		'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'NumberedList', 
		'BulletedList', 'Cut', 'Copy', 'Paste', 'Link', 'Unlink', 'HorizontalRule',
		'Find', 'Replace', 'ckawesome', 'EmojiPanel', 'RemoveFormat', 'Source'
	];

	config.removeButtons = 'Anchor,Subscript,Superscript,Outdent,Indent,JustifyBlock';
	config.removeDialogTabs = '';
	config.removePlugins = 'autogrow';
};
