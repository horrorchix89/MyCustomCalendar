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