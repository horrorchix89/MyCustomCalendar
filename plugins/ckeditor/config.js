/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function(config) {
    config.allowedContent = true;
    config.coreStyles_italic = { element: 'em' };
    config.disableNativeSpellChecker = false;
    config.extraAllowedContent = "a abbr acronym address area article aside b base basefont bdi bdo big blink blockquote br button caption center cite code col colgroup content data datalist dd del details dfn dir div dl dt element em fieldset figcaption figure font footer h1 h2 h3 h4 h5 h6 header hgroup hr i img ins label legend li link listing main map mark marquee menu menuitem meta meter nav nobr ol p pre progress q s samp section small spacer span strike strong style sub summary sup table text-align tbody td textarea tfoot th thead tr tt u ul wbr xmp(*){*}[*]";
    config.fillEmptyBlocks = false;
    config.fontSize_sizes = '8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px';
    config.forceSimpleAmpersand = true;
    config.format_tags = 'p;h1;h2;h3;h4;h5;h6;div';
    config.height = 90;
    config.ignoreEmptyParagraph = false;
    config.language = 'en';
    config.pasteFilter = null;
    config.pasteFromWordRemoveStyles = false;
    config.resize_enabled = false;
    config.tabSpaces = 4;
    config.toolbarCanCollapse = true;
    config.toolbar = [
        { name: 'undo', items: [ 'Undo', 'Redo' ] },
	{ name: 'styles', items: [ 'Format', 'FontSize' ] },
	{ name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste' ] },
        { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike' ] },
	{ name: 'align', items: [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight' ] },
        { name: 'list', items: [ 'NumberedList', 'BulletedList' ] },
        { name: 'links', items: [ 'Link', 'Unlink' ] },
	{ name: 'extras', items: [ 'HorizontalRule', 'EmojiPanel', 'RemoveFormat', 'Source' ] }
    ];
    config.removeButtons = 'Anchor,Subscript,Superscript,Outdent,Indent,JustifyBlock,PasteFromWord,Font,Save';
    config.removeDialogTabs = 'link:advanced';
    config.removePlugins = 'ckawesome';
};
