/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	config.height = 150;
	config.colorButton_colorsPerRow = 8;
	config.colorButton_enableMore = false;
	config.colorButton_colors = '000000/Black,A0522D/Sienna,556B2F/DarkOliveGreen,006400/DarkGreen,483D8B/DarkSlateBlue,000080/Navy,4B0082/Indigo,2F4F4F/DarkSlateGray,' + '8B0000/DarkRed,FF8C00/DarkOrange,808000/Olive,008000/Green,008080/Teal,0000FF/Blue,708090/SlateGray,696969/DimGray,' 
+ 'FF0000/Red,F4A460/SandyBrown,9ACD32/YellowGreen,2E8B57/SeaGreen,48D1CC/MediumTurquoise,4169E1/RoyalBlue,800080/Purple,808080/Gray,' + 'FF00FF/Magenta,FFA500/Orange,FFFF00/Yellow,00FF00/Lime,00FFFF/Cyan,00BFFF/DeepSkyBlue,9932CC/DarkOrchid,C0C0C0/Silver,' + 'FFC0CB/Pink,F5DEB3/Wheat,FFFACD/LemonChiffon,98FB98/PaleGreen,AFEEEE/PaleTurquoise,ADD8E6/LightBlue,DDA0DD/Plum,FFFFFF/White';
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	// The toolbar groups arrangement, optimized for a single toolbar row.
	config.toolbarGroups = [
		{ name: 'colors', groups: [ 'colors' ] },
		{ name: 'clipboard', groups: [ 'undo', 'clipboard' ] },
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph', groups: [ 'align', 'list', 'indent', 'blocks', 'bidi', 'paragraph' ] },
		{ name: 'links', groups: [ 'links' ] },
		{ name: 'insert', groups: [ 'insert' ] },
		{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
		{ name: 'styles', groups: [ 'styles' ] },
		{ name: 'forms', groups: [ 'forms' ] },
		{ name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'tools', groups: [ 'tools' ] },
		{ name: 'others', groups: [ 'others' ] },
		{ name: 'about', groups: [ 'about' ] }
	];

	config.removeButtons = 'BGColor,Subscript,Superscript,Anchor,JustifyBlock,Outdent,Indent,Font,FontSize,Uploadcare,Table';
	// Dialog windows are also simplified.
	config.removeDialogTabs = 'link:advanced';
};
