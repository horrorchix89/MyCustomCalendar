/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function(config) {
    config.allowedContent = true;
    config.coreStyles_italic = { element: 'em' };
    config.disableNativeSpellChecker = false;
    config.extraAllowedContent = "a abbr acronym address area article aside b base basefont bdi bdo big blink blockquote body br button canvas caption center cite code col colgroup content data datalist dd del details dfn dialog dir div dl dt element em fieldset figcaption figure font footer form h1 h2 h3 h4 h5 h6 header hgroup hr html i iframe img input ins label legend li link listing main map mark marquee menu menuitem meta meter nav nobr object ol optgroup output p picture pre progress q s samp script section select small spacer span strike strong style sub summary sup table text-align tbody td textarea tfoot th thead time title tr tt u ul var video wbr xmp(*){*}[*]";
    //config.fillEmptyBlocks = false;
    config.fontSize_sizes = '8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;32/32px;36/36px;48/48px';
    config.forceSimpleAmpersand = true;
    config.format_tags = 'p;h1;h2;h3;h4;h5;h6;div;formatted';
    config.height = 96;
    config.ignoreEmptyParagraph = false;
    config.pasteTools_keepZeroMargins = true;
    config.pasteFilter = null;
    config.pasteFromWordRemoveStyles = false;
    config.resize_enabled = false;
    config.sourceAreaTabSize = 2;
    config.tabSpaces = 2;
    config.toolbarCanCollapse = true;
    config.toolbar = [
        { name: 'undo', items: [ 'Undo', 'Redo' ] },
        { name: 'styles', items: [ 'Format' ] },
        { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike' ] },
        { name: 'align', items: [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight' ] },
        { name: 'list', items: [ 'NumberedList', 'BulletedList' ] },
        { name: 'links', items: [ 'Link', 'Unlink' ] },
        { name: 'extras', items: [ 'HorizontalRule', 'EmojiPanel', 'RemoveFormat', 'Source' ] }
    ];
    config.removeButtons = 'Anchor,Subscript,Superscript,Outdent,Indent,JustifyBlock,PasteFromWord,Font,FontSize,Save,Cut,Copy,Paste';
    config.removeDialogTabs = 'link:advanced';
    config.removePlugins = 'ckawesome,resize';
};
