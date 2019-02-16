/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	config.extraAllowedContent =
        'a abbr acronym address area article aside b base basefont bdi bdo big blink blockquote ' +
        'br button caption center cite code col colgroup content data datalist dd del details dfn dir div dl dt ' +
        'element em fieldset figcaption figure font footer h1 h2 h3 h4 h5 h6 header hgroup hr i img ins label legend ' +
        'li link listing main map mark marquee menu menuitem meta meter nav nobr ol p pre progress q s samp section small ' +
        'spacer span strike strong style sub summary sup table tbody td textarea tfoot th thead tr tt u ul wbr xmp(*){*}[*]';
    config.extraPlugins = 'ckawesome';
    config.disableNativeSpellChecker = false;
    config.height = '100px';
    config.toolbarCanCollapse = true;
	config.toolbarGroups = [
		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
		{ name: 'forms' },
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
		{ name: 'links' },
		{ name: 'insert' },
		{ name: 'styles' },
		{ name: 'colors' },
		{ name: 'tools' },
		{ name: 'others' },
		{ name: 'about' }
	];

	// The default plugins included in the basic setup define some buttons that
	// are not needed in a basic editor. They are removed here.
	config.removeButtons = 'Cut,Copy,Paste,Undo,Redo,Anchor,Underline,Strike,Subscript,Superscript';
};
