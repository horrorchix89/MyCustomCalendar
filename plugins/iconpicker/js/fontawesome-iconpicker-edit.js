/*!
 * Font Awesome Icon Picker
 * https://farbelous.github.io/fontawesome-iconpicker/
 *
 * @author Javi Aguilar, itsjavi.com
 * @license MIT License
 * @see https://github.com/farbelous/fontawesome-iconpicker/blob/master/LICENSE
 */

(function(factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define(["jquery"], factory);
    } else {

        // Browser globals
        factory(jQuery);
    }
}(function($) {

    $.ui = $.ui || {};

    var version = $.ui.version = "1.12.1";
    
    (function() {
        var cachedScrollbarWidth,
            max = Math.max,
            abs = Math.abs,
            rhorizontal = /left|center|right/,
            rvertical = /top|center|bottom/,
            roffset = /[\+\-]\d+(\.[\d]+)?%?/,
            rposition = /^\w+/,
            rpercent = /%$/,
            _position = $.fn.pos;

        function getOffsets(offsets, width, height) {
            return [
                parseFloat(offsets[0]) * (rpercent.test(offsets[0]) ? width / 100 : 1),
                parseFloat(offsets[1]) * (rpercent.test(offsets[1]) ? height / 100 : 1)
            ];
        }

        function parseCss(element, property) {
            return parseInt($.css(element, property), 10) || 0;
        }

        function getDimensions(elem) {
            var raw = elem[0];
            if (raw.nodeType === 9) {
                return {
                    width: elem.width(),
                    height: elem.height(),
                    offset: {
                        top: 0,
                        left: 0
                    }
                };
            }
            if ($.isWindow(raw)) {
                return {
                    width: elem.width(),
                    height: elem.height(),
                    offset: {
                        top: elem.scrollTop(),
                        left: elem.scrollLeft()
                    }
                };
            }
            if (raw.preventDefault) {
                return {
                    width: 0,
                    height: 0,
                    offset: {
                        top: raw.pageY,
                        left: raw.pageX
                    }
                };
            }
            return {
                width: elem.outerWidth(),
                height: elem.outerHeight(),
                offset: elem.offset()
            };
        }

        $.pos = {
            scrollbarWidth: function() {
                if (cachedScrollbarWidth !== undefined) {
                    return cachedScrollbarWidth;
                }
                var w1, w2,
                    div = $("<div " +
                        "style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'>" +
                        "<div style='height:100px;width:auto;'></div></div>"),
                    innerDiv = div.children()[0];

                $("body").append(div);
                w1 = innerDiv.offsetWidth;
                div.css("overflow", "scroll");

                w2 = innerDiv.offsetWidth;

                if (w1 === w2) {
                    w2 = div[0].clientWidth;
                }

                div.remove();

                return (cachedScrollbarWidth = w1 - w2);
            },
            getScrollInfo: function(within) {
                var overflowX = within.isWindow || within.isDocument ? "" :
                    within.element.css("overflow-x"),
                    overflowY = within.isWindow || within.isDocument ? "" :
                    within.element.css("overflow-y"),
                    hasOverflowX = overflowX === "scroll" ||
                    (overflowX === "auto" && within.width < within.element[0].scrollWidth),
                    hasOverflowY = overflowY === "scroll" ||
                    (overflowY === "auto" && within.height < within.element[0].scrollHeight);
                return {
                    width: hasOverflowY ? $.pos.scrollbarWidth() : 0,
                    height: hasOverflowX ? $.pos.scrollbarWidth() : 0
                };
            },
            getWithinInfo: function(element) {
                var withinElement = $(element || window),
                    isWindow = $.isWindow(withinElement[0]),
                    isDocument = !!withinElement[0] && withinElement[0].nodeType === 9,
                    hasOffset = !isWindow && !isDocument;
                return {
                    element: withinElement,
                    isWindow: isWindow,
                    isDocument: isDocument,
                    offset: hasOffset ? $(element).offset() : {
                        left: 0,
                        top: 0
                    },
                    scrollLeft: withinElement.scrollLeft(),
                    scrollTop: withinElement.scrollTop(),
                    width: withinElement.outerWidth(),
                    height: withinElement.outerHeight()
                };
            }
        };

        $.fn.pos = function(options) {
            if (!options || !options.of) {
                return _position.apply(this, arguments);
            }

            // Make a copy, we don't want to modify arguments
            options = $.extend({}, options);

            var atOffset, targetWidth, targetHeight, targetOffset, basePosition, dimensions,
                target = $(options.of),
                within = $.pos.getWithinInfo(options.within),
                scrollInfo = $.pos.getScrollInfo(within),
                collision = (options.collision || "flip").split(" "),
                offsets = {};

            dimensions = getDimensions(target);
            if (target[0].preventDefault) {

                // Force left top to allow flipping
                options.at = "left top";
            }
            targetWidth = dimensions.width;
            targetHeight = dimensions.height;
            targetOffset = dimensions.offset;

            // Clone to reuse original targetOffset later
            basePosition = $.extend({}, targetOffset);

            // Force my and at to have valid horizontal and vertical positions
            // if a value is missing or invalid, it will be converted to center
            $.each(["my", "at"], function() {
                var pos = (options[this] || "").split(" "),
                    horizontalOffset,
                    verticalOffset;

                if (pos.length === 1) {
                    pos = rhorizontal.test(pos[0]) ?
                        pos.concat(["center"]) :
                        rvertical.test(pos[0]) ? ["center"].concat(pos) : ["center", "center"];
                }
                pos[0] = rhorizontal.test(pos[0]) ? pos[0] : "center";
                pos[1] = rvertical.test(pos[1]) ? pos[1] : "center";

                // Calculate offsets
                horizontalOffset = roffset.exec(pos[0]);
                verticalOffset = roffset.exec(pos[1]);
                offsets[this] = [
                    horizontalOffset ? horizontalOffset[0] : 0,
                    verticalOffset ? verticalOffset[0] : 0
                ];

                // Reduce to just the positions without the offsets
                options[this] = [
                    rposition.exec(pos[0])[0],
                    rposition.exec(pos[1])[0]
                ];
            });

            // Normalize collision option
            if (collision.length === 1) {
                collision[1] = collision[0];
            }

            if (options.at[0] === "right") {
                basePosition.left += targetWidth;
            } else if (options.at[0] === "center") {
                basePosition.left += targetWidth / 2;
            }

            if (options.at[1] === "bottom") {
                basePosition.top += targetHeight;
            } else if (options.at[1] === "center") {
                basePosition.top += targetHeight / 2;
            }

            atOffset = getOffsets(offsets.at, targetWidth, targetHeight);
            basePosition.left += atOffset[0];
            basePosition.top += atOffset[1];

            return this.each(function() {
                var collisionPosition, using,
                    elem = $(this),
                    elemWidth = elem.outerWidth(),
                    elemHeight = elem.outerHeight(),
                    marginLeft = parseCss(this, "marginLeft"),
                    marginTop = parseCss(this, "marginTop"),
                    collisionWidth = elemWidth + marginLeft + parseCss(this, "marginRight") +
                    scrollInfo.width,
                    collisionHeight = elemHeight + marginTop + parseCss(this, "marginBottom") +
                    scrollInfo.height,
                    position = $.extend({}, basePosition),
                    myOffset = getOffsets(offsets.my, elem.outerWidth(), elem.outerHeight());

                if (options.my[0] === "right") {
                    position.left -= elemWidth;
                } else if (options.my[0] === "center") {
                    position.left -= elemWidth / 2;
                }

                if (options.my[1] === "bottom") {
                    position.top -= elemHeight;
                } else if (options.my[1] === "center") {
                    position.top -= elemHeight / 2;
                }

                position.left += myOffset[0];
                position.top += myOffset[1];

                collisionPosition = {
                    marginLeft: marginLeft,
                    marginTop: marginTop
                };

                $.each(["left", "top"], function(i, dir) {
                    if ($.ui.pos[collision[i]]) {
                        $.ui.pos[collision[i]][dir](position, {
                            targetWidth: targetWidth,
                            targetHeight: targetHeight,
                            elemWidth: elemWidth,
                            elemHeight: elemHeight,
                            collisionPosition: collisionPosition,
                            collisionWidth: collisionWidth,
                            collisionHeight: collisionHeight,
                            offset: [atOffset[0] + myOffset[0], atOffset[1] + myOffset[1]],
                            my: options.my,
                            at: options.at,
                            within: within,
                            elem: elem
                        });
                    }
                });

                if (options.using) {

                    // Adds feedback as second argument to using callback, if present
                    using = function(props) {
                        var left = targetOffset.left - position.left,
                            right = left + targetWidth - elemWidth,
                            top = targetOffset.top - position.top,
                            bottom = top + targetHeight - elemHeight,
                            feedback = {
                                target: {
                                    element: target,
                                    left: targetOffset.left,
                                    top: targetOffset.top,
                                    width: targetWidth,
                                    height: targetHeight
                                },
                                element: {
                                    element: elem,
                                    left: position.left,
                                    top: position.top,
                                    width: elemWidth,
                                    height: elemHeight
                                },
                                horizontal: right < 0 ? "left" : left > 0 ? "right" : "center",
                                vertical: bottom < 0 ? "top" : top > 0 ? "bottom" : "middle"
                            };
                        if (targetWidth < elemWidth && abs(left + right) < targetWidth) {
                            feedback.horizontal = "center";
                        }
                        if (targetHeight < elemHeight && abs(top + bottom) < targetHeight) {
                            feedback.vertical = "middle";
                        }
                        if (max(abs(left), abs(right)) > max(abs(top), abs(bottom))) {
                            feedback.important = "horizontal";
                        } else {
                            feedback.important = "vertical";
                        }
                        options.using.call(this, props, feedback);
                    };
                }

                elem.offset($.extend(position, {
                    using: using
                }));
            });
        };

        $.ui.pos = {
            _trigger: function(position, data, name, triggered) {
                if (data.elem) {
                    data.elem.trigger({
                        'type': name,
                        'position': position,
                        'positionData': data,
                        'triggered': triggered
                    });
                }
            },
            fit: {
                left: function(position, data) {
                    $.ui.pos._trigger(position, data, 'posCollide', 'fitLeft');
                    var within = data.within,
                        withinOffset = within.isWindow ? within.scrollLeft : within.offset.left,
                        outerWidth = within.width,
                        collisionPosLeft = position.left - data.collisionPosition.marginLeft,
                        overLeft = withinOffset - collisionPosLeft,
                        overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset,
                        newOverRight;

                    // Element is wider than within
                    if (data.collisionWidth > outerWidth) {

                        // Element is initially over the left side of within
                        if (overLeft > 0 && overRight <= 0) {
                            newOverRight = position.left + overLeft + data.collisionWidth - outerWidth -
                                withinOffset;
                            position.left += overLeft - newOverRight;

                            // Element is initially over right side of within
                        } else if (overRight > 0 && overLeft <= 0) {
                            position.left = withinOffset;

                            // Element is initially over both left and right sides of within
                        } else {
                            if (overLeft > overRight) {
                                position.left = withinOffset + outerWidth - data.collisionWidth;
                            } else {
                                position.left = withinOffset;
                            }
                        }

                        // Too far left -> align with left edge
                    } else if (overLeft > 0) {
                        position.left += overLeft;

                        // Too far right -> align with right edge
                    } else if (overRight > 0) {
                        position.left -= overRight;

                        // Adjust based on position and margin
                    } else {
                        position.left = max(position.left - collisionPosLeft, position.left);
                    }
                    $.ui.pos._trigger(position, data, 'posCollided', 'fitLeft');
                },
                top: function(position, data) {
                    $.ui.pos._trigger(position, data, 'posCollide', 'fitTop');
                    var within = data.within,
                        withinOffset = within.isWindow ? within.scrollTop : within.offset.top,
                        outerHeight = data.within.height,
                        collisionPosTop = position.top - data.collisionPosition.marginTop,
                        overTop = withinOffset - collisionPosTop,
                        overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset,
                        newOverBottom;

                    // Element is taller than within
                    if (data.collisionHeight > outerHeight) {

                        // Element is initially over the top of within
                        if (overTop > 0 && overBottom <= 0) {
                            newOverBottom = position.top + overTop + data.collisionHeight - outerHeight -
                                withinOffset;
                            position.top += overTop - newOverBottom;

                            // Element is initially over bottom of within
                        } else if (overBottom > 0 && overTop <= 0) {
                            position.top = withinOffset;

                            // Element is initially over both top and bottom of within
                        } else {
                            if (overTop > overBottom) {
                                position.top = withinOffset + outerHeight - data.collisionHeight;
                            } else {
                                position.top = withinOffset;
                            }
                        }

                        // Too far up -> align with top
                    } else if (overTop > 0) {
                        position.top += overTop;

                        // Too far down -> align with bottom edge
                    } else if (overBottom > 0) {
                        position.top -= overBottom;

                        // Adjust based on position and margin
                    } else {
                        position.top = max(position.top - collisionPosTop, position.top);
                    }
                    $.ui.pos._trigger(position, data, 'posCollided', 'fitTop');
                }
            },
            flip: {
                left: function(position, data) {
                    $.ui.pos._trigger(position, data, 'posCollide', 'flipLeft');
                    var within = data.within,
                        withinOffset = within.offset.left + within.scrollLeft,
                        outerWidth = within.width,
                        offsetLeft = within.isWindow ? within.scrollLeft : within.offset.left,
                        collisionPosLeft = position.left - data.collisionPosition.marginLeft,
                        overLeft = collisionPosLeft - offsetLeft,
                        overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft,
                        myOffset = data.my[0] === "left" ?
                        -data.elemWidth :
                        data.my[0] === "right" ?
                        data.elemWidth :
                        0,
                        atOffset = data.at[0] === "left" ?
                        data.targetWidth :
                        data.at[0] === "right" ?
                        -data.targetWidth :
                        0,
                        offset = -2 * data.offset[0],
                        newOverRight,
                        newOverLeft;

                    if (overLeft < 0) {
                        newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth -
                            outerWidth - withinOffset;
                        if (newOverRight < 0 || newOverRight < abs(overLeft)) {
                            position.left += myOffset + atOffset + offset;
                        }
                    } else if (overRight > 0) {
                        newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset +
                            atOffset + offset - offsetLeft;
                        if (newOverLeft > 0 || abs(newOverLeft) < overRight) {
                            position.left += myOffset + atOffset + offset;
                        }
                    }
                    $.ui.pos._trigger(position, data, 'posCollided', 'flipLeft');
                },
                top: function(position, data) {
                    $.ui.pos._trigger(position, data, 'posCollide', 'flipTop');
                    var within = data.within,
                        withinOffset = within.offset.top + within.scrollTop,
                        outerHeight = within.height,
                        offsetTop = within.isWindow ? within.scrollTop : within.offset.top,
                        collisionPosTop = position.top - data.collisionPosition.marginTop,
                        overTop = collisionPosTop - offsetTop,
                        overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop,
                        top = data.my[1] === "top",
                        myOffset = top ?
                        -data.elemHeight :
                        data.my[1] === "bottom" ?
                        data.elemHeight :
                        0,
                        atOffset = data.at[1] === "top" ?
                        data.targetHeight :
                        data.at[1] === "bottom" ?
                        -data.targetHeight :
                        0,
                        offset = -2 * data.offset[1],
                        newOverTop,
                        newOverBottom;
                    if (overTop < 0) {
                        newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight -
                            outerHeight - withinOffset;
                        if (newOverBottom < 0 || newOverBottom < abs(overTop)) {
                            position.top += myOffset + atOffset + offset;
                        }
                    } else if (overBottom > 0) {
                        newOverTop = position.top - data.collisionPosition.marginTop + myOffset + atOffset +
                            offset - offsetTop;
                        if (newOverTop > 0 || abs(newOverTop) < overBottom) {
                            position.top += myOffset + atOffset + offset;
                        }
                    }
                    $.ui.pos._trigger(position, data, 'posCollided', 'flipTop');
                }
            },
            flipfit: {
                left: function() {
                    $.ui.pos.flip.left.apply(this, arguments);
                    $.ui.pos.fit.left.apply(this, arguments);
                },
                top: function() {
                    $.ui.pos.flip.top.apply(this, arguments);
                    $.ui.pos.fit.top.apply(this, arguments);
                }
            }
        };
        // fraction support test
        (function() {
            var testElement, testElementParent, testElementStyle, offsetLeft, i,
                body = document.getElementsByTagName("body")[0],
                div = document.createElement("div");

            //Create a "fake body" for testing based on method used in jQuery.support
            testElement = document.createElement(body ? "div" : "body");
            testElementStyle = {
                visibility: "hidden",
                width: 0,
                height: 0,
                border: 0,
                margin: 0,
                background: "none"
            };
            if (body) {
                $.extend(testElementStyle, {
                    position: "absolute",
                    left: "-1000px",
                    top: "-1000px"
                });
            }
            for (i in testElementStyle) {
                testElement.style[i] = testElementStyle[i];
            }
            testElement.appendChild(div);
            testElementParent = body || document.documentElement;
            testElementParent.insertBefore(testElement, testElementParent.firstChild);

            div.style.cssText = "position: absolute; left: 10.7432222px;";

            offsetLeft = $(div).offset().left;
            $.support.offsetFractions = offsetLeft > 10 && offsetLeft < 11;

            testElement.innerHTML = "";
            testElementParent.removeChild(testElement);
        })();

    })();

    var position = $.ui.position;

}));

(function(factory) {
        "use strict";
        if (typeof define === 'function' && define.amd) {
            define(['jquery'], factory);
        } else if (window.jQuery && !window.jQuery.fn.iconpicker) {
            factory(window.jQuery);
        }
    }
    (function($) {
        'use strict';

        var _helpers = {
            isEmpty: function(val) {
                return ((val === false) || (val === '') || (val === null) || (val === undefined));
            },
            isEmptyObject: function(val) {
                return (this.isEmpty(val) === true) || (val.length === 0);
            },
            isElement: function(selector) {
                return ($(selector).length > 0);
            },
            isString: function(val) {
                return ((typeof val === 'string') || (val instanceof String));
            },
            isArray: function(val) {
                return $.isArray(val);
            },
            inArray: function(val, arr) {
                return ($.inArray(val, arr) !== -1);
            },
            throwError: function(text) {
                throw "Font Awesome Icon Picker Exception: " + text;
            }
        };

        var Iconpicker = function(element, options) {
            this._id = Iconpicker._idCounter++;
            this.element = $(element).addClass('iconpicker-element');
            this._trigger('iconpickerCreate');
            this.options = $.extend({}, Iconpicker.defaultOptions, this.element.data(), options);
            this.options.templates = $.extend({}, Iconpicker.defaultOptions.templates, this.options.templates);
            this.options.originalPlacement = this.options.placement;

            // Iconpicker container element
            this.container = (_helpers.isElement(this.options.container) ? $(this.options.container) : false);
            if (this.container === false) {
                if (this.element.is('.dropdown-toggle')) {
                    this.container = $('~ .dropdown-menu:first', this.element);
                } else {
                    this.container = (this.element.is('input,textarea,button,.btn') ? this.element.parent() : this.element);
                }
            }
            this.container.addClass('iconpicker-container');

            if (this.isDropdownMenu()) {
                // if you try to click the dropdown, it is closed, because of that
                // we'll hide some picker controls
                this.options.templates.search = false;
                this.options.templates.buttons = false;
                this.options.placement = 'inline';
            }

            // Is the element an input? Should we search inside for any input?
            this.input = (this.element.is('input,textarea') ? this.element.addClass('iconpicker-input') : false);
            if (this.input === false) {
                this.input = (this.container.find(this.options.input));
                if (!this.input.is('input,textarea')) {
                    this.input = false;
                }
            }

            // Plugin as component ?
            this.component = this.isDropdownMenu() ? this.container.parent().find(this.options.component) : this.container.find(this.options.component);
            if (this.component.length === 0) {
                this.component = false;
            } else {
                this.component.find('i').addClass('iconpicker-component');
            }

            // Create popover and iconpicker HTML
            this._createPopover();
            this._createIconpicker();

            if (this.getAcceptButton().length === 0) {
                // disable this because we don't have accept buttons
                this.options.mustAccept = false;
            }

            // Avoid CSS issues with input-group-addon(s)
            if (this.isInputGroup()) {
                this.container.parent().append(this.popover);
            } else {
                this.container.append(this.popover);
            }

            // Bind events
            this._bindElementEvents();
            this._bindWindowEvents();

            // Refresh everything
            this.update(this.options.selected);

            if (this.isInline()) {
                this.show();
            }

            this._trigger('iconpickerCreated');
        };

        // Instance identifier counter
        Iconpicker._idCounter = 0;

        Iconpicker.defaultOptions = {
            title: false, // Popover title (optional) only if specified in the template
            selected: false, // use this value as the current item and ignore the original
            defaultValue: false, // use this value as the current item if input or element value is empty
            placement: 'bottom', // (has some issues with auto and CSS). auto, top, bottom, left, right
            collision: 'none', // If true, the popover will be repositioned to another position when collapses with the window borders
            animation: true, // fade in/out on show/hide ?
            //hide iconpicker automatically when a value is picked. it is ignored if mustAccept is not false and the accept button is visible
            hideOnSelect: false,
            showFooter: false,
            searchInFooter: false, // If true, the search will be added to the footer instead of the title
            mustAccept: false, // only applicable when there's an iconpicker-btn-accept button in the popover footer
            selectedCustomClass: 'bg-primary', // Appends this class when to the selected item
            icons: [], // list of icon classes (declared at the bottom of this script for maintainability)
            fullClassFormatter: function(val) {
                return 'fa ' + val;
            },
            input: 'input,.iconpicker-input', // children input selector
            inputSearch: false, // use the input as a search box too?
            container: false, //  Appends the popover to a specific element. If not set, the selected element or element parent is used
            component: '.input-group-addon,.iconpicker-component', // children component jQuery selector or object, relative to the container element
            // Plugin templates:
            templates: {
                popover: '<div class="iconpicker-popover popover"><div class="arrow"></div>' +
                    '<div class="popover-title"></div><div class="popover-content"></div></div>',
                footer: '<div class="popover-footer"></div>',
                buttons: '<button class="iconpicker-btn iconpicker-btn-cancel btn btn-default btn-sm">Cancel</button>' +
                    ' <button class="iconpicker-btn iconpicker-btn-accept btn btn-primary btn-sm">Accept</button>',
                search: '<input type="search" class="form-control iconpicker-search" placeholder="Type to filter" />',
                iconpicker: '<div class="iconpicker"><div class="iconpicker-items"></div></div>',
                iconpickerItem: '<a role="button" href="#" class="iconpicker-item"><i></i></a>',
            }
        };

        Iconpicker.batch = function(selector, method) {
            var args = Array.prototype.slice.call(arguments, 2);
            return $(selector).each(function() {
                var $inst = $(this).data('iconpicker');
                if (!!$inst) {
                    $inst[method].apply($inst, args);
                }
            });
        };

        Iconpicker.prototype = {
            constructor: Iconpicker,
            options: {},
            _id: 0, // instance identifier for bind/unbind events
            _trigger: function(name, opts) {
                //triggers an event bound to the element
                opts = opts || {};
                this.element.trigger($.extend({
                    type: name,
                    iconpickerInstance: this
                }, opts));
                //console.log(name + ' triggered for instance #' + this._id);
            },
            _createPopover: function() {
                this.popover = $(this.options.templates.popover);

                // title (header)
                var _title = this.popover.find('.popover-title');
                if (!!this.options.title) {
                    _title.append($('<div class="popover-title-text">' + this.options.title + '</div>'));
                }
                if (this.hasSeparatedSearchInput() && !this.options.searchInFooter) {
                    _title.append(this.options.templates.search);
                } else if (!this.options.title) {
                    _title.remove();
                }

                // footer
                if (this.options.showFooter && !_helpers.isEmpty(this.options.templates.footer)) {
                    var _footer = $(this.options.templates.footer);
                    if (this.hasSeparatedSearchInput() && this.options.searchInFooter) {
                        _footer.append($(this.options.templates.search));
                    }
                    if (!_helpers.isEmpty(this.options.templates.buttons)) {
                        _footer.append($(this.options.templates.buttons));
                    }
                    this.popover.append(_footer);
                }

                if (this.options.animation === true) {
                    this.popover.addClass('fade');
                }

                return this.popover;
            },
            _createIconpicker: function() {
                var _self = this;
                this.iconpicker = $(this.options.templates.iconpicker);

                var itemClickFn = function(e) {
                    var $this = $(this);
                    if ($this.is('i')) {
                        $this = $this.parent();
                    }

                    _self._trigger('iconpickerSelect', {
                        iconpickerItem: $this,
                        iconpickerValue: _self.iconpickerValue
                    });

                    if (_self.options.mustAccept === false) {
                        _self.update($this.data('iconpickerValue'));
                        _self._trigger('iconpickerSelected', {
                            iconpickerItem: this,
                            iconpickerValue: _self.iconpickerValue
                        });
                    } else {
                        _self.update($this.data('iconpickerValue'), true);
                    }

                    if (_self.options.hideOnSelect && (_self.options.mustAccept === false)) {
                        // only hide when the accept button is not present
                        _self.hide();
                    }
                    e.preventDefault();
                    return false;
                };

                for (var i in this.options.icons) {
                    if (typeof this.options.icons[i] === 'string') {
                        var itemElement = $(this.options.templates.iconpickerItem);
                        itemElement.find('i')
                            .addClass(this.options.fullClassFormatter(this.options.icons[i]));
                        itemElement.data('iconpickerValue', this.options.icons[i])
                            .on('click.iconpicker', itemClickFn);
                        this.iconpicker.find('.iconpicker-items').append(itemElement
                            .attr('title', '.' + this.options.icons[i]));
                    }
                }

                this.popover.find('.popover-content').append(this.iconpicker);

                return this.iconpicker;
            },
            _isEventInsideIconpicker: function(e) {
                var _t = $(e.target);
                if ((!_t.hasClass('iconpicker-element')  ||
                        (_t.hasClass('iconpicker-element') && !_t.is(this.element))) &&
                    (_t.parents('.iconpicker-popover').length === 0)) {
                    return false;
                }
                return true;
            },
            _bindElementEvents: function() {
                var _self = this;

                this.getSearchInput().on('keyup.iconpicker', function() {
                    _self.filter($(this).val().toLowerCase());
                });

                this.getAcceptButton().on('click.iconpicker', function() {
                    var _picked = _self.iconpicker.find('.iconpicker-selected').get(0);

                    _self.update(_self.iconpickerValue);

                    _self._trigger('iconpickerSelected', {
                        iconpickerItem: _picked,
                        iconpickerValue: _self.iconpickerValue
                    });
                    if (!_self.isInline()) {
                        _self.hide();
                    }
                });
                this.getCancelButton().on('click.iconpicker', function() {
                    if (!_self.isInline()) {
                        _self.hide();
                    }
                });

                this.element.on('focus.iconpicker', function(e) {
                    _self.show();
                    e.stopPropagation();
                });

                if (this.hasComponent()) {
                    this.component.on('click.iconpicker', function() {
                        _self.toggle();
                    });
                }

                if (this.hasInput()) {
                    // Bind input keyup event
                    this.input.on('keyup.iconpicker', function(e) {
                        if (!_helpers.inArray(e.keyCode, [38, 40, 37, 39, 16, 17, 18, 9, 8, 91, 93, 20, 46, 186, 190, 46, 78, 188, 44, 86])) {
                            _self.update();
                        } else {
                            _self._updateFormGroupStatus(_self.getValid(this.value) !== false);
                        }
                        if (_self.options.inputSearch === true) {
                            _self.filter($(this).val().toLowerCase());
                        }
                        //_self.hide();
                    });
                }

            },
            _bindWindowEvents: function() {
                var $doc = $(window.document);
                var _self = this;

                // Add a namespace to the document events so they can be identified
                // later for every instance separately
                var _eventNs = '.iconpicker.inst' + this._id;

                $(window).on('resize.iconpicker' + _eventNs + ' orientationchange.iconpicker' + _eventNs, function(e) {
                    // reposition popover
                    if (_self.popover.hasClass('in')) {
                        _self.updatePlacement();
                    }
                });

                if (!_self.isInline()) {
                    $doc.on('mouseup' + _eventNs, function(e) {
                        if (!_self._isEventInsideIconpicker(e) && !_self.isInline()) {
                            _self.hide();
                        }
                        e.stopPropagation();
                        e.preventDefault();
                        return false;
                    });
                }

                return false;
            },
            _unbindElementEvents: function() {
                this.popover.off('.iconpicker');
                this.element.off('.iconpicker');

                if (this.hasInput()) {
                    this.input.off('.iconpicker');
                }

                if (this.hasComponent()) {
                    this.component.off('.iconpicker');
                }

                if (this.hasContainer()) {
                    this.container.off('.iconpicker');
                }
            },
            _unbindWindowEvents: function() {
                // destroy window and window.document bound events
                $(window).off('.iconpicker.inst' + this._id);
                $(window.document).off('.iconpicker.inst' + this._id);
            },
            updatePlacement: function(placement, collision) {
                placement = placement || this.options.placement;
                this.options.placement = placement; // set new placement
                collision = collision || this.options.collision;
                collision = (collision === true ? 'flip' : collision);

                var _pos = {
                    // at: Defines which position (or side) on container element to align the
                    // popover element against: "horizontal vertical" alignment.
                    at: "right bottom",
                    // my: Defines which position (or side) on the popover being positioned to align
                    // with the container element: "horizontal vertical" alignment
                    my: "right top",
                    // of: Which element to position against.
                    of: (this.hasInput() && !this.isInputGroup()) ? this.input : this.container,
                    // collision: When the positioned element overflows the window (or within element)
                    // in some direction, move it to an alternative position.
                    collision: (collision === true ? 'flip' : collision),
                    // within: Element to position within, affecting collision detection.
                    within: window
                };

                // remove previous classes
                this.popover.removeClass('inline topLeftCorner topLeft top topRight topRightCorner ' +
                    'rightTop right rightBottom bottomRight bottomRightCorner ' +
                    'bottom bottomLeft bottomLeftCorner leftBottom left leftTop');

                if (typeof placement === 'object') {
                    // custom position ?
                    return this.popover.pos($.extend({}, _pos, placement));
                }

                switch (placement) {
                    case 'inline':
                        {
                            _pos = false;
                        }
                        break;
                    case 'topLeftCorner':
                        {
                            _pos.my = 'right bottom';
                            _pos.at = 'left top';
                        }
                        break;

                    case 'topLeft':
                        {
                            _pos.my = 'left bottom';
                            _pos.at = 'left top';
                        }
                        break;

                    case 'top':
                        {
                            _pos.my = 'center bottom';
                            _pos.at = 'center top';
                        }
                        break;

                    case 'topRight':
                        {
                            _pos.my = 'right bottom';
                            _pos.at = 'right top';
                        }
                        break;

                    case 'topRightCorner':
                        {
                            _pos.my = 'left bottom';
                            _pos.at = 'right top';
                        }
                        break;

                    case 'rightTop':
                        {
                            _pos.my = 'left bottom';
                            _pos.at = 'right center';
                        }
                        break;

                    case 'right':
                        {
                            _pos.my = 'left center';
                            _pos.at = 'right center';
                        }
                        break;

                    case 'rightBottom':
                        {
                            _pos.my = 'left top';
                            _pos.at = 'right center';
                        }
                        break;

                    case 'bottomRightCorner':
                        {
                            _pos.my = 'left top';
                            _pos.at = 'right bottom';
                        }
                        break;

                    case 'bottomRight':
                        {
                            _pos.my = 'right top';
                            _pos.at = 'right bottom';
                        }
                        break;
                    case 'bottom':
                        {
                            _pos.my = 'center top';
                            _pos.at = 'center bottom';
                        }
                        break;

                    case 'bottomLeft':
                        {
                            _pos.my = 'left top';
                            _pos.at = 'left bottom';
                        }
                        break;

                    case 'bottomLeftCorner':
                        {
                            _pos.my = 'right top';
                            _pos.at = 'left bottom';
                        }
                        break;

                    case 'leftBottom':
                        {
                            _pos.my = 'right top';
                            _pos.at = 'left center';
                        }
                        break;

                    case 'left':
                        {
                            _pos.my = 'right center';
                            _pos.at = 'left center';
                        }
                        break;

                    case 'leftTop':
                        {
                            _pos.my = 'right bottom';
                            _pos.at = 'left center';
                        }
                        break;

                    default:
                        {
                            return false;
                        }
                        break;

                }

                this.popover.css({
                    'display': (this.options.placement === 'inline') ? '' : 'block'
                });

                if (_pos !== false) {
                    this.popover.pos(_pos).css('maxWidth', $(window).width() - this.container.offset().left - 5);
                } else {
                    //reset position
                    this.popover.css({
                        'top': 'auto',
                        'right': 'auto',
                        'bottom': 'auto',
                        'left': 'auto',
                        'maxWidth': 'none'
                    });
                }
                this.popover.addClass(this.options.placement);

                return true;
            },
            _updateComponents: function() {
                // Update selected item
                this.iconpicker.find('.iconpicker-item.iconpicker-selected')
                    .removeClass('iconpicker-selected ' + this.options.selectedCustomClass);

                if (this.iconpickerValue) {
                    this.iconpicker.find('.' + this.options.fullClassFormatter(this.iconpickerValue).replace(/ /g, '.')).parent()
                        .addClass('iconpicker-selected ' + this.options.selectedCustomClass);
                }

                // Update component item
                if (this.hasComponent()) {
                    var icn = this.component.find('i');
                    if (icn.length > 0) {
                        icn.attr('class', this.options.fullClassFormatter(this.iconpickerValue));
                    } else {
                        this.component.html(this.getHtml());
                    }
                }

            },
            _updateFormGroupStatus: function(isValid) {
                if (this.hasInput()) {
                    if (isValid !== false) {
                        // Remove form-group error class if any
                        this.input.parents('.form-group:first').removeClass('has-error');
                    } else {
                        this.input.parents('.form-group:first').addClass('has-error');
                    }
                    return true;
                }
                return false;
            },
            getValid: function(val) {
                // here we must validate the value (you may change this validation
                // to suit your needs
                if (!_helpers.isString(val)) {
                    val = '';
                }

                var isEmpty = (val === '');

                // trim string
                val = $.trim(val);

                if (_helpers.inArray(val, this.options.icons) || isEmpty) {
                    return val;
                }
                return false;
            },
            /**
             * Sets the internal item value and updates everything, excepting the input or element.
             * For doing so, call setSourceValue() or update() instead
             */
            setValue: function(val) {
                // sanitize first
                var _val = this.getValid(val);
                if (_val !== false) {
                    this.iconpickerValue = _val;
                    this._trigger('iconpickerSetValue', {
                        iconpickerValue: _val
                    });
                    return this.iconpickerValue;
                } else {
                    this._trigger('iconpickerInvalid', {
                        iconpickerValue: val
                    });
                    return false;
                }
            },
            getHtml: function() {
                return '<i class="' + this.options.fullClassFormatter(this.iconpickerValue) + '"></i>';
            },
            /**
             * Calls setValue and if it's a valid item value, sets the input or element value
             */
            setSourceValue: function(val) {
                val = this.setValue(val);
                if ((val !== false) && (val !== '')) {
                    if (this.hasInput()) {
                        this.input.val(this.iconpickerValue);
                    } else {
                        this.element.data('iconpickerValue', this.iconpickerValue);
                    }
                    this._trigger('iconpickerSetSourceValue', {
                        iconpickerValue: val
                    });
                }
                return val;
            },
            /**
             * Returns the input or element item value, without formatting, or defaultValue
             * if it's empty string, undefined, false or null
             * @param {type} defaultValue
             * @returns string|mixed
             */
            getSourceValue: function(defaultValue) {
                // returns the input or element value, as string
                defaultValue = defaultValue || this.options.defaultValue;
                var val = defaultValue;

                if (this.hasInput()) {
                    val = this.input.val();
                } else {
                    val = this.element.data('iconpickerValue');
                }
                if ((val === undefined) || (val === '') || (val === null) || (val === false)) {
                    // if not defined or empty, return default
                    val = defaultValue;
                }
                return val;
            },
            hasInput: function() {
                return (this.input !== false);
            },
            isInputSearch: function() {
                return (this.hasInput() && (this.options.inputSearch === true));
            },
            isInputGroup: function() {
                return this.container.is('.input-group');
            },
            isDropdownMenu: function() {
                return this.container.is('.dropdown-menu');
            },
            hasSeparatedSearchInput: function() {
                return (this.options.templates.search !== false) && (!this.isInputSearch());
            },
            hasComponent: function() {
                return (this.component !== false);
            },
            hasContainer: function() {
                return (this.container !== false);
            },
            getAcceptButton: function() {
                return this.popover.find('.iconpicker-btn-accept');
            },
            getCancelButton: function() {
                return this.popover.find('.iconpicker-btn-cancel');
            },
            getSearchInput: function() {
                return this.popover.find('.iconpicker-search');
            },
            filter: function(filterText) {
                if (_helpers.isEmpty(filterText)) {
                    this.iconpicker.find('.iconpicker-item').show();
                    return $(false);
                } else {
                    var found = [];
                    this.iconpicker.find('.iconpicker-item').each(function() {
                        var $this = $(this);
                        var text = $this.attr('title').toLowerCase();
                        var regex = false;
                        try {
                            regex = new RegExp(filterText, 'g');
                        } catch (e) {
                            regex = false;
                        }
                        if ((regex !== false) && text.match(regex)) {
                            found.push($this);
                            $this.show();
                        } else {
                            $this.hide();
                        }
                    });
                    return found;
                }
            },
            show: function() {
                if (this.popover.hasClass('in')) {
                    return false;
                }
                // hide other non-inline pickers
                $.iconpicker.batch($('.iconpicker-popover.in:not(.inline)').not(this.popover), 'hide');

                this._trigger('iconpickerShow');
                this.updatePlacement();
                this.popover.addClass('in');
                setTimeout($.proxy(function() {
                    this.popover.css('display', this.isInline() ? '' : 'block');
                    this._trigger('iconpickerShown');
                }, this), this.options.animation ? 300 : 1); // animation duration
            },
            hide: function() {
                if (!this.popover.hasClass('in')) {
                    return false;
                }
                this._trigger('iconpickerHide');
                this.popover.removeClass('in');
                setTimeout($.proxy(function() {
                    this.popover.css('display', 'none');
                    this.getSearchInput().val('');
                    this.filter(''); // clear filter
                    this._trigger('iconpickerHidden');
                }, this), this.options.animation ? 300 : 1);
            },
            toggle: function() {
                if (this.popover.is(":visible")) {
                    this.hide();
                } else {
                    this.show(true);
                }
            },
            update: function(val, updateOnlyInternal) {
                val = (val ? val :  this.getSourceValue(this.iconpickerValue));
                // reads the input or element value again and tries to update the plugin
                // fallback to the current selected item value
                this._trigger('iconpickerUpdate');

                if (updateOnlyInternal === true) {
                    val = this.setValue(val);
                } else {
                    val = this.setSourceValue(val);
                    this._updateFormGroupStatus(val !== false);
                }

                if (val !== false) {
                    this._updateComponents();
                }

                this._trigger('iconpickerUpdated');
                return val;
            },
            destroy: function() {
                this._trigger('iconpickerDestroy');

                // unbinds events and resets everything to the initial state,
                // including component mode
                this.element.removeData('iconpicker').removeData('iconpickerValue').removeClass('iconpicker-element');

                this._unbindElementEvents();
                this._unbindWindowEvents();

                $(this.popover).remove();

                this._trigger('iconpickerDestroyed');
            },
            disable: function() {
                if (this.hasInput()) {
                    this.input.prop('disabled', true);
                    return true;
                }
                return false;
            },
            enable: function() {
                if (this.hasInput()) {
                    this.input.prop('disabled', false);
                    return true;
                }
                return false;
            },
            isDisabled: function() {
                if (this.hasInput()) {
                    return (this.input.prop('disabled') === true);
                }
                return false;
            },
            isInline: function() {
                return (this.options.placement === 'inline') || (this.popover.hasClass('inline'));
            }
        };

        $.iconpicker = Iconpicker;

        // jQuery plugin
        $.fn.iconpicker = function(options) {
            return this.each(function() {
                var $this = $(this);
                if (!$this.data('iconpicker')) {
                    // create plugin instance (only if not exists) and expose the entire instance API
                    $this.data('iconpicker', new Iconpicker(this, ((typeof options === 'object') ? options : {})));
                }
            });
        };

        // List of all Font Awesome icons without class prefix
        Iconpicker.defaultOptions.icons = [
            "fa fa-500px","fa fa-address-book","fa fa-address-book-o","fa fa-address-card","fa fa-address-card-o","fa fa-adjust","fa fa-adn","fa fa-align-center","fa fa-align-justify","fa fa-align-left","fa fa-align-right","fa fa-amazon","fa fa-ambulance","fa fa-american-sign-language-interpreting","fa fa-anchor","fa fa-android","fa fa-angellist","fa fa-angle-double-down","fa fa-angle-double-left","fa fa-angle-double-right","fa fa-angle-double-up","fa fa-angle-down","fa fa-angle-left","fa fa-angle-right","fa fa-angle-up","fa fa-apple","fa fa-archive","fa fa-area-chart","fa fa-arrow-circle-down","fa fa-arrow-circle-left","fa fa-arrow-circle-o-down","fa fa-arrow-circle-o-left","fa fa-arrow-circle-o-right","fa fa-arrow-circle-o-up","fa fa-arrow-circle-right","fa fa-arrow-circle-up","fa fa-arrow-down","fa fa-arrow-left","fa fa-arrow-right","fa fa-arrow-up","fa fa-arrows","fa fa-arrows-alt","fa fa-arrows-h","fa fa-arrows-v","fa fa-asl-interpreting","fa fa-assistive-listening-systems","fa fa-asterisk","fa fa-at","fa fa-audio-description","fa fa-automobile","fa fa-backward","fa fa-balance-scale","fa fa-ban","fa fa-bandcamp","fa fa-bank","fa fa-bar-chart","fa fa-bar-chart-o","fa fa-barcode","fa fa-bars","fa fa-bath","fa fa-bathtub","fa fa-battery","fa fa-battery-0","fa fa-battery-1","fa fa-battery-2","fa fa-battery-3","fa fa-battery-4","fa fa-battery-empty","fa fa-battery-full","fa fa-battery-half","fa fa-battery-quarter","fa fa-battery-three-quarters","fa fa-bed","fa fa-beer","fa fa-behance","fa fa-behance-square","fa fa-bell","fa fa-bell-o","fa fa-bell-slash","fa fa-bell-slash-o","fa fa-bicycle","fa fa-binoculars","fa fa-birthday-cake","fa fa-bitbucket","fa fa-bitbucket-square","fa fa-bitcoin","fa fa-black-tie","fa fa-blind","fa fa-bluetooth","fa fa-bluetooth-b","fa fa-bold","fa fa-bolt","fa fa-bomb","fa fa-book","fa fa-bookmark","fa fa-bookmark-o","fa fa-braille","fa fa-briefcase","fa fa-btc","fa fa-bug","fa fa-building","fa fa-building-o","fa fa-bullhorn","fa fa-bullseye","fa fa-bus","fa fa-buysellads","fa fa-cab","fa fa-calculator","fa fa-calendar","fa fa-calendar-check-o","fa fa-calendar-minus-o","fa fa-calendar-o","fa fa-calendar-plus-o","fa fa-calendar-times-o","fa fa-camera","fa fa-camera-retro","fa fa-car","fa fa-caret-down","fa fa-caret-left","fa fa-caret-right","fa fa-caret-square-o-down","fa fa-caret-square-o-left","fa fa-caret-square-o-right","fa fa-caret-square-o-up","fa fa-caret-up","fa fa-cart-arrow-down","fa fa-cart-plus","fa fa-cc","fa fa-cc-amex","fa fa-cc-diners-club","fa fa-cc-discover","fa fa-cc-jcb","fa fa-cc-mastercard","fa fa-cc-paypal","fa fa-cc-stripe","fa fa-cc-visa","fa fa-certificate","fa fa-chain","fa fa-chain-broken","fa fa-check","fa fa-check-circle","fa fa-check-circle-o","fa fa-check-square","fa fa-check-square-o","fa fa-chevron-circle-down","fa fa-chevron-circle-left","fa fa-chevron-circle-right","fa fa-chevron-circle-up","fa fa-chevron-down","fa fa-chevron-left","fa fa-chevron-right","fa fa-chevron-up","fa fa-child","fa fa-chrome","fa fa-circle","fa fa-circle-o","fa fa-circle-o-notch","fa fa-circle-thin","fa fa-clipboard","fa fa-clock-o","fa fa-clone","fa fa-close","fa fa-cloud","fa fa-cloud-download","fa fa-cloud-upload","fa fa-cny","fa fa-code","fa fa-code-fork","fa fa-codepen","fa fa-codiepie","fa fa-coffee","fa fa-cog","fa fa-cogs","fa fa-columns","fa fa-comment","fa fa-comment-o","fa fa-commenting","fa fa-commenting-o","fa fa-comments","fa fa-comments-o","fa fa-compass","fa fa-compress","fa fa-connectdevelop","fa fa-contao","fa fa-copy","fa fa-copyright","fa fa-creative-commons","fa fa-credit-card","fa fa-credit-card-alt","fa fa-crop","fa fa-crosshairs","fa fa-css3","fa fa-cube","fa fa-cubes","fa fa-cut","fa fa-cutlery","fa fa-dashboard","fa fa-dashcube","fa fa-database","fa fa-deaf","fa fa-deafness","fa fa-dedent","fa fa-delicious","fa fa-desktop","fa fa-deviantart","fa fa-diamond","fa fa-digg","fa fa-dollar","fa fa-dot-circle-o","fa fa-download","fa fa-dribbble","fa fa-drivers-license","fa fa-drivers-license-o","fa fa-dropbox","fa fa-drupal","fa fa-edge","fa fa-edit","fa fa-eercast","fa fa-eject","fa fa-ellipsis-h","fa fa-ellipsis-v","fa fa-empire","fa fa-envelope","fa fa-envelope-o","fa fa-envelope-open","fa fa-envelope-open-o","fa fa-envelope-square","fa fa-envira","fa fa-eraser","fa fa-etsy","fa fa-eur","fa fa-euro","fa fa-exchange","fa fa-exclamation","fa fa-exclamation-circle","fa fa-exclamation-triangle","fa fa-expand","fa fa-expeditedssl","fa fa-external-link","fa fa-external-link-square","fa fa-eye","fa fa-eye-slash","fa fa-eyedropper","fa fa-fa","fa fa-facebook","fa fa-facebook-f","fa fa-facebook-official","fa fa-facebook-square","fa fa-fast-backward","fa fa-fast-forward","fa fa-fax","fa fa-feed","fa fa-female","fa fa-fighter-jet","fa fa-file","fa fa-file-archive-o","fa fa-file-audio-o","fa fa-file-code-o","fa fa-file-excel-o","fa fa-file-image-o","fa fa-file-movie-o","fa fa-file-o","fa fa-file-pdf-o","fa fa-file-photo-o","fa fa-file-picture-o","fa fa-file-powerpoint-o","fa fa-file-sound-o","fa fa-file-text","fa fa-file-text-o","fa fa-file-video-o","fa fa-file-word-o","fa fa-file-zip-o","fa fa-files-o","fa fa-film","fa fa-filter","fa fa-fire","fa fa-fire-extinguisher","fa fa-firefox","fa fa-first-order","fa fa-flag","fa fa-flag-checkered","fa fa-flag-o","fa fa-flash","fa fa-flask","fa fa-flickr","fa fa-floppy-o","fa fa-folder","fa fa-folder-o","fa fa-folder-open","fa fa-folder-open-o","fa fa-font","fa fa-font-awesome","fa fa-fonticons","fa fa-fort-awesome","fa fa-forumbee","fa fa-forward","fa fa-foursquare","fa fa-free-code-camp","fa fa-frown-o","fa fa-futbol-o","fa fa-gamepad","fa fa-gavel","fa fa-gbp","fa fa-ge","fa fa-gear","fa fa-gears","fa fa-genderless","fa fa-get-pocket","fa fa-gg","fa fa-gg-circle","fa fa-gift","fa fa-git","fa fa-git-square","fa fa-github","fa fa-github-alt","fa fa-github-square","fa fa-gitlab","fa fa-gittip","fa fa-glass","fa fa-glide","fa fa-glide-g","fa fa-globe","fa fa-google","fa fa-google-plus","fa fa-google-plus-circle","fa fa-google-plus-official","fa fa-google-plus-square","fa fa-google-wallet","fa fa-graduation-cap","fa fa-gratipay","fa fa-grav","fa fa-group","fa fa-h-square","fa fa-hacker-news","fa fa-hand-grab-o","fa fa-hand-lizard-o","fa fa-hand-o-down","fa fa-hand-o-left","fa fa-hand-o-right","fa fa-hand-o-up","fa fa-hand-paper-o","fa fa-hand-peace-o","fa fa-hand-pointer-o","fa fa-hand-rock-o","fa fa-hand-scissors-o","fa fa-hand-spock-o","fa fa-hand-stop-o","fa fa-handshake-o","fa fa-hard-of-hearing","fa fa-hashtag","fa fa-hdd-o","fa fa-header","fa fa-headphones","fa fa-heart","fa fa-heart-o","fa fa-heartbeat","fa fa-history","fa fa-home","fa fa-hospital-o","fa fa-hotel","fa fa-hourglass","fa fa-hourglass-1","fa fa-hourglass-2","fa fa-hourglass-3","fa fa-hourglass-end","fa fa-hourglass-half","fa fa-hourglass-o","fa fa-hourglass-start","fa fa-houzz","fa fa-html5","fa fa-i-cursor","fa fa-id-badge","fa fa-id-card","fa fa-id-card-o","fa fa-ils","fa fa-image","fa fa-imdb","fa fa-inbox","fa fa-indent","fa fa-industry","fa fa-info","fa fa-info-circle","fa fa-inr","fa fa-instagram","fa fa-institution","fa fa-internet-explorer","fa fa-intersex","fa fa-ioxhost","fa fa-italic","fa fa-joomla","fa fa-jpy","fa fa-jsfiddle","fa fa-key","fa fa-keyboard-o","fa fa-krw","fa fa-language","fa fa-laptop","fa fa-lastfm","fa fa-lastfm-square","fa fa-leaf","fa fa-leanpub","fa fa-legal","fa fa-lemon-o","fa fa-level-down","fa fa-level-up","fa fa-life-bouy","fa fa-life-buoy","fa fa-life-ring","fa fa-life-saver","fa fa-lightbulb-o","fa fa-line-chart","fa fa-link","fa fa-linkedin","fa fa-linkedin-square","fa fa-linode","fa fa-linux","fa fa-list","fa fa-list-alt","fa fa-list-ol","fa fa-list-ul","fa fa-location-arrow","fa fa-lock","fa fa-long-arrow-down","fa fa-long-arrow-left","fa fa-long-arrow-right","fa fa-long-arrow-up","fa fa-low-vision","fa fa-magic","fa fa-magnet","fa fa-mail-forward","fa fa-mail-reply","fa fa-mail-reply-all","fa fa-male","fa fa-map","fa fa-map-marker","fa fa-map-o","fa fa-map-pin","fa fa-map-signs","fa fa-mars","fa fa-mars-double","fa fa-mars-stroke","fa fa-mars-stroke-h","fa fa-mars-stroke-v","fa fa-maxcdn","fa fa-meanpath","fa fa-medium","fa fa-medkit","fa fa-meetup","fa fa-meh-o","fa fa-mercury","fa fa-microchip","fa fa-microphone","fa fa-microphone-slash","fa fa-minus","fa fa-minus-circle","fa fa-minus-square","fa fa-minus-square-o","fa fa-mixcloud","fa fa-mobile","fa fa-mobile-phone","fa fa-modx","fa fa-money","fa fa-moon-o","fa fa-mortar-board","fa fa-motorcycle","fa fa-mouse-pointer","fa fa-music","fa fa-navicon","fa fa-neuter","fa fa-newspaper-o","fa fa-object-group","fa fa-object-ungroup","fa fa-odnoklassniki","fa fa-odnoklassniki-square","fa fa-opencart","fa fa-openid","fa fa-opera","fa fa-optin-monster","fa fa-outdent","fa fa-pagelines","fa fa-paint-brush","fa fa-paper-plane","fa fa-paper-plane-o","fa fa-paperclip","fa fa-paragraph","fa fa-paste","fa fa-pause","fa fa-pause-circle","fa fa-pause-circle-o","fa fa-paw","fa fa-paypal","fa fa-pencil","fa fa-pencil-square","fa fa-pencil-square-o","fa fa-percent","fa fa-phone","fa fa-phone-square","fa fa-photo","fa fa-picture-o","fa fa-pie-chart","fa fa-pied-piper","fa fa-pied-piper-alt","fa fa-pied-piper-pp","fa fa-pinterest","fa fa-pinterest-p","fa fa-pinterest-square","fa fa-plane","fa fa-play","fa fa-play-circle","fa fa-play-circle-o","fa fa-plug","fa fa-plus","fa fa-plus-circle","fa fa-plus-square","fa fa-plus-square-o","fa fa-podcast","fa fa-power-off","fa fa-print","fa fa-product-hunt","fa fa-puzzle-piece","fa fa-qq","fa fa-qrcode","fa fa-question","fa fa-question-circle","fa fa-question-circle-o","fa fa-quora","fa fa-quote-left","fa fa-quote-right","fa fa-ra","fa fa-random","fa fa-ravelry","fa fa-rebel","fa fa-recycle","fa fa-reddit","fa fa-reddit-alien","fa fa-reddit-square","fa fa-refresh","fa fa-registered","fa fa-remove","fa fa-renren","fa fa-reorder","fa fa-repeat","fa fa-reply","fa fa-reply-all","fa fa-resistance","fa fa-retweet","fa fa-rmb","fa fa-road","fa fa-rocket","fa fa-rotate-left","fa fa-rotate-right","fa fa-rouble","fa fa-rss","fa fa-rss-square","fa fa-rub","fa fa-ruble","fa fa-rupee","fa fa-s15","fa fa-safari","fa fa-save","fa fa-scissors","fa fa-scribd","fa fa-search","fa fa-search-minus","fa fa-search-plus","fa fa-sellsy","fa fa-send","fa fa-send-o","fa fa-server","fa fa-share","fa fa-share-alt","fa fa-share-alt-square","fa fa-share-square","fa fa-share-square-o","fa fa-shekel","fa fa-sheqel","fa fa-shield","fa fa-ship","fa fa-shirtsinbulk","fa fa-shopping-bag","fa fa-shopping-basket","fa fa-shopping-cart","fa fa-shower","fa fa-sign-in","fa fa-sign-language","fa fa-sign-out","fa fa-signal","fa fa-signing","fa fa-simplybuilt","fa fa-sitemap","fa fa-skyatlas","fa fa-skype","fa fa-slack","fa fa-sliders","fa fa-slideshare","fa fa-smile-o","fa fa-snapchat","fa fa-snapchat-ghost","fa fa-snapchat-square","fa fa-snowflake-o","fa fa-soccer-ball-o","fa fa-sort","fa fa-sort-alpha-asc","fa fa-sort-alpha-desc","fa fa-sort-amount-asc","fa fa-sort-amount-desc","fa fa-sort-asc","fa fa-sort-desc","fa fa-sort-down","fa fa-sort-numeric-asc","fa fa-sort-numeric-desc","fa fa-sort-up","fa fa-soundcloud","fa fa-space-shuttle","fa fa-spinner","fa fa-spoon","fa fa-spotify","fa fa-square","fa fa-square-o","fa fa-stack-exchange","fa fa-stack-overflow","fa fa-star","fa fa-star-half","fa fa-star-half-empty","fa fa-star-half-full","fa fa-star-half-o","fa fa-star-o","fa fa-steam","fa fa-steam-square","fa fa-step-backward","fa fa-step-forward","fa fa-stethoscope","fa fa-sticky-note","fa fa-sticky-note-o","fa fa-stop","fa fa-stop-circle","fa fa-stop-circle-o","fa fa-street-view","fa fa-strikethrough","fa fa-stumbleupon","fa fa-stumbleupon-circle","fa fa-subscript","fa fa-subway","fa fa-suitcase","fa fa-sun-o","fa fa-superpowers","fa fa-superscript","fa fa-support","fa fa-table","fa fa-tablet","fa fa-tachometer","fa fa-tag","fa fa-tags","fa fa-tasks","fa fa-taxi","fa fa-telegram","fa fa-television","fa fa-tencent-weibo","fa fa-terminal","fa fa-text-height","fa fa-text-width","fa fa-th","fa fa-th-large","fa fa-th-list","fa fa-themeisle","fa fa-thermometer","fa fa-thermometer-0","fa fa-thermometer-1","fa fa-thermometer-2","fa fa-thermometer-3","fa fa-thermometer-4","fa fa-thermometer-empty","fa fa-thermometer-full","fa fa-thermometer-half","fa fa-thermometer-quarter","fa fa-thermometer-three-quarters","fa fa-thumb-tack","fa fa-thumbs-down","fa fa-thumbs-o-down","fa fa-thumbs-o-up","fa fa-thumbs-up","fa fa-ticket","fa fa-times","fa fa-times-circle","fa fa-times-circle-o","fa fa-times-rectangle","fa fa-times-rectangle-o","fa fa-tint","fa fa-toggle-down","fa fa-toggle-left","fa fa-toggle-off","fa fa-toggle-on","fa fa-toggle-right","fa fa-toggle-up","fa fa-trademark","fa fa-train","fa fa-transgender","fa fa-transgender-alt","fa fa-trash","fa fa-trash-o","fa fa-tree","fa fa-trello","fa fa-tripadvisor","fa fa-trophy","fa fa-truck","fa fa-try","fa fa-tty","fa fa-tumblr","fa fa-tumblr-square","fa fa-turkish-lira","fa fa-tv","fa fa-twitch","fa fa-twitter","fa fa-twitter-square","fa fa-umbrella","fa fa-underline","fa fa-undo","fa fa-universal-access","fa fa-university","fa fa-unlink","fa fa-unlock","fa fa-unlock-alt","fa fa-unsorted","fa fa-upload","fa fa-usb","fa fa-usd","fa fa-user","fa fa-user-circle","fa fa-user-circle-o","fa fa-user-md","fa fa-user-o","fa fa-user-plus","fa fa-user-secret","fa fa-user-times","fa fa-users","fa fa-vcard","fa fa-vcard-o","fa fa-venus","fa fa-venus-double","fa fa-venus-mars","fa fa-viacoin","fa fa-viadeo","fa fa-viadeo-square","fa fa-video-camera","fa fa-vimeo","fa fa-vimeo-square","fa fa-vine","fa fa-vk","fa fa-volume-control-phone","fa fa-volume-down","fa fa-volume-off","fa fa-volume-up","fa fa-warning","fa fa-wechat","fa fa-weibo","fa fa-weixin","fa fa-whatsapp","fa fa-wheelchair","fa fa-wheelchair-alt","fa fa-wifi","fa fa-wikipedia-w","fa fa-window-close","fa fa-window-close-o","fa fa-window-maximize","fa fa-window-minimize","fa fa-window-restore","fa fa-windows","fa fa-won","fa fa-wordpress","fa fa-wpbeginner","fa fa-wpexplorer","fa fa-wpforms","fa fa-wrench","fa fa-xing","fa fa-xing-square","fa fa-y-combinator","fa fa-y-combinator-square","fa fa-yahoo","fa fa-yc","fa fa-yc-square","fa fa-yelp","fa fa-yen","fa fa-yoast","fa fa-youtube","fa fa-youtube-play","fa fa-youtube-square","icon ion-alert","icon ion-alert-circled","icon ion-android-add","icon ion-android-add-circle","icon ion-android-alarm-clock","icon ion-android-alert","icon ion-android-apps","icon ion-android-archive","icon ion-android-arrow-back","icon ion-android-arrow-down","icon ion-android-arrow-dropdown","icon ion-android-arrow-dropdown-circle","icon ion-android-arrow-dropleft","icon ion-android-arrow-dropleft-circle","icon ion-android-arrow-dropright","icon ion-android-arrow-dropright-circle","icon ion-android-arrow-dropup","icon ion-android-arrow-dropup-circle","icon ion-android-arrow-forward","icon ion-android-arrow-up","icon ion-android-attach","icon ion-android-bar","icon ion-android-bicycle","icon ion-android-boat","icon ion-android-bookmark","icon ion-android-bulb","icon ion-android-bus","icon ion-android-calendar","icon ion-android-call","icon ion-android-camera","icon ion-android-cancel","icon ion-android-car","icon ion-android-cart","icon ion-android-chat","icon ion-android-checkbox","icon ion-android-checkbox-blank","icon ion-android-checkbox-outline","icon ion-android-checkbox-outline-blank","icon ion-android-checkmark-circle","icon ion-android-clipboard","icon ion-android-close","icon ion-android-cloud","icon ion-android-cloud-circle","icon ion-android-cloud-done","icon ion-android-cloud-outline","icon ion-android-color-palette","icon ion-android-compass","icon ion-android-contact","icon ion-android-contacts","icon ion-android-contract","icon ion-android-create","icon ion-android-delete","icon ion-android-desktop","icon ion-android-document","icon ion-android-done","icon ion-android-done-all","icon ion-android-download","icon ion-android-drafts","icon ion-android-exit","icon ion-android-expand","icon ion-android-favorite","icon ion-android-favorite-outline","icon ion-android-film","icon ion-android-folder","icon ion-android-folder-open","icon ion-android-funnel","icon ion-android-globe","icon ion-android-hand","icon ion-android-hangout","icon ion-android-happy","icon ion-android-home","icon ion-android-image","icon ion-android-laptop","icon ion-android-list","icon ion-android-locate","icon ion-android-lock","icon ion-android-mail","icon ion-android-map","icon ion-android-menu","icon ion-android-microphone","icon ion-android-microphone-off","icon ion-android-more-horizontal","icon ion-android-more-vertical","icon ion-android-navigate","icon ion-android-notifications","icon ion-android-notifications-none","icon ion-android-notifications-off","icon ion-android-open","icon ion-android-options","icon ion-android-people","icon ion-android-person","icon ion-android-person-add","icon ion-android-phone-landscape","icon ion-android-phone-portrait","icon ion-android-pin","icon ion-android-plane","icon ion-android-playstore","icon ion-android-print","icon ion-android-radio-button-off","icon ion-android-radio-button-on","icon ion-android-refresh","icon ion-android-remove","icon ion-android-remove-circle","icon ion-android-restaurant","icon ion-android-sad","icon ion-android-search","icon ion-android-send","icon ion-android-settings","icon ion-android-share","icon ion-android-share-alt","icon ion-android-star","icon ion-android-star-half","icon ion-android-star-outline","icon ion-android-stopwatch","icon ion-android-subway","icon ion-android-sunny","icon ion-android-sync","icon ion-android-textsms","icon ion-android-time","icon ion-android-train","icon ion-android-unlock","icon ion-android-upload","icon ion-android-volume-down","icon ion-android-volume-mute","icon ion-android-volume-off","icon ion-android-volume-up","icon ion-android-walk","icon ion-android-warning","icon ion-android-watch","icon ion-android-wifi","icon ion-aperture","icon ion-archive","icon ion-arrow-down-a","icon ion-arrow-down-b","icon ion-arrow-down-c","icon ion-arrow-expand","icon ion-arrow-graph-down-left","icon ion-arrow-graph-down-right","icon ion-arrow-graph-up-left","icon ion-arrow-graph-up-right","icon ion-arrow-left-a","icon ion-arrow-left-b","icon ion-arrow-left-c","icon ion-arrow-move","icon ion-arrow-resize","icon ion-arrow-return-left","icon ion-arrow-return-right","icon ion-arrow-right-a","icon ion-arrow-right-b","icon ion-arrow-right-c","icon ion-arrow-shrink","icon ion-arrow-swap","icon ion-arrow-up-a","icon ion-arrow-up-b","icon ion-arrow-up-c","icon ion-asterisk","icon ion-at","icon ion-backspace","icon ion-backspace-outline","icon ion-bag","icon ion-battery-charging","icon ion-battery-empty","icon ion-battery-full","icon ion-battery-half","icon ion-battery-low","icon ion-beaker","icon ion-beer","icon ion-bluetooth","icon ion-bonfire","icon ion-bookmark","icon ion-bowtie","icon ion-briefcase","icon ion-bug","icon ion-calculator","icon ion-calendar","icon ion-camera","icon ion-card","icon ion-cash","icon ion-chatbox","icon ion-chatbox-working","icon ion-chatboxes","icon ion-chatbubble","icon ion-chatbubble-working","icon ion-chatbubbles","icon ion-checkmark","icon ion-checkmark-circled","icon ion-checkmark-round","icon ion-chevron-down","icon ion-chevron-left","icon ion-chevron-right","icon ion-chevron-up","icon ion-clipboard","icon ion-clock","icon ion-close","icon ion-close-circled","icon ion-close-round","icon ion-closed-captioning","icon ion-cloud","icon ion-code","icon ion-code-download","icon ion-code-working","icon ion-coffee","icon ion-compass","icon ion-compose","icon ion-connection-bars","icon ion-contrast","icon ion-crop","icon ion-cube","icon ion-disc","icon ion-document","icon ion-document-text","icon ion-drag","icon ion-earth","icon ion-easel","icon ion-edit","icon ion-egg","icon ion-eject","icon ion-email","icon ion-email-unread","icon ion-erlenmeyer-flask","icon ion-erlenmeyer-flask-bubbles","icon ion-eye","icon ion-eye-disabled","icon ion-female","icon ion-filing","icon ion-film-marker","icon ion-fireball","icon ion-flag","icon ion-flame","icon ion-flash","icon ion-flash-off","icon ion-folder","icon ion-fork","icon ion-fork-repo","icon ion-forward","icon ion-funnel","icon ion-gear-a","icon ion-gear-b","icon ion-grid","icon ion-hammer","icon ion-happy","icon ion-happy-outline","icon ion-headphone","icon ion-heart","icon ion-heart-broken","icon ion-help","icon ion-help-buoy","icon ion-help-circled","icon ion-home","icon ion-icecream","icon ion-image","icon ion-images","icon ion-information","icon ion-information-circled","icon ion-ionic","icon ion-ios-alarm","icon ion-ios-alarm-outline","icon ion-ios-albums","icon ion-ios-albums-outline","icon ion-ios-americanfootball","icon ion-ios-americanfootball-outline","icon ion-ios-analytics","icon ion-ios-analytics-outline","icon ion-ios-arrow-back","icon ion-ios-arrow-down","icon ion-ios-arrow-forward","icon ion-ios-arrow-left","icon ion-ios-arrow-right","icon ion-ios-arrow-thin-down","icon ion-ios-arrow-thin-left","icon ion-ios-arrow-thin-right","icon ion-ios-arrow-thin-up","icon ion-ios-arrow-up","icon ion-ios-at","icon ion-ios-at-outline","icon ion-ios-barcode","icon ion-ios-barcode-outline","icon ion-ios-baseball","icon ion-ios-baseball-outline","icon ion-ios-basketball","icon ion-ios-basketball-outline","icon ion-ios-bell","icon ion-ios-bell-outline","icon ion-ios-body","icon ion-ios-body-outline","icon ion-ios-bolt","icon ion-ios-bolt-outline","icon ion-ios-book","icon ion-ios-book-outline","icon ion-ios-bookmarks","icon ion-ios-bookmarks-outline","icon ion-ios-box","icon ion-ios-box-outline","icon ion-ios-briefcase","icon ion-ios-briefcase-outline","icon ion-ios-browsers","icon ion-ios-browsers-outline","icon ion-ios-calculator","icon ion-ios-calculator-outline","icon ion-ios-calendar","icon ion-ios-calendar-outline","icon ion-ios-camera","icon ion-ios-camera-outline","icon ion-ios-cart","icon ion-ios-cart-outline","icon ion-ios-chatboxes","icon ion-ios-chatboxes-outline","icon ion-ios-chatbubble","icon ion-ios-chatbubble-outline","icon ion-ios-checkmark","icon ion-ios-checkmark-empty","icon ion-ios-checkmark-outline","icon ion-ios-circle-filled","icon ion-ios-circle-outline","icon ion-ios-clock","icon ion-ios-clock-outline","icon ion-ios-close","icon ion-ios-close-empty","icon ion-ios-close-outline","icon ion-ios-cloud","icon ion-ios-cloud-download","icon ion-ios-cloud-download-outline","icon ion-ios-cloud-outline","icon ion-ios-cloud-upload","icon ion-ios-cloud-upload-outline","icon ion-ios-cloudy","icon ion-ios-cloudy-night","icon ion-ios-cloudy-night-outline","icon ion-ios-cloudy-outline","icon ion-ios-cog","icon ion-ios-cog-outline","icon ion-ios-color-filter","icon ion-ios-color-filter-outline","icon ion-ios-color-wand","icon ion-ios-color-wand-outline","icon ion-ios-compose","icon ion-ios-compose-outline","icon ion-ios-contact","icon ion-ios-contact-outline","icon ion-ios-copy","icon ion-ios-copy-outline","icon ion-ios-crop","icon ion-ios-crop-strong","icon ion-ios-download","icon ion-ios-download-outline","icon ion-ios-drag","icon ion-ios-email","icon ion-ios-email-outline","icon ion-ios-eye","icon ion-ios-eye-outline","icon ion-ios-fastforward","icon ion-ios-fastforward-outline","icon ion-ios-filing","icon ion-ios-filing-outline","icon ion-ios-film","icon ion-ios-film-outline","icon ion-ios-flag","icon ion-ios-flag-outline","icon ion-ios-flame","icon ion-ios-flame-outline","icon ion-ios-flask","icon ion-ios-flask-outline","icon ion-ios-flower","icon ion-ios-flower-outline","icon ion-ios-folder","icon ion-ios-folder-outline","icon ion-ios-football","icon ion-ios-football-outline","icon ion-ios-game-controller-a","icon ion-ios-game-controller-a-outline","icon ion-ios-game-controller-b","icon ion-ios-game-controller-b-outline","icon ion-ios-gear","icon ion-ios-gear-outline","icon ion-ios-glasses","icon ion-ios-glasses-outline","icon ion-ios-grid-view","icon ion-ios-grid-view-outline","icon ion-ios-heart","icon ion-ios-heart-outline","icon ion-ios-help","icon ion-ios-help-empty","icon ion-ios-help-outline","icon ion-ios-home","icon ion-ios-home-outline","icon ion-ios-infinite","icon ion-ios-infinite-outline","icon ion-ios-information","icon ion-ios-information-empty","icon ion-ios-information-outline","icon ion-ios-ionic-outline","icon ion-ios-keypad","icon ion-ios-keypad-outline","icon ion-ios-lightbulb","icon ion-ios-lightbulb-outline","icon ion-ios-list","icon ion-ios-list-outline","icon ion-ios-location","icon ion-ios-location-outline","icon ion-ios-locked","icon ion-ios-locked-outline","icon ion-ios-loop","icon ion-ios-loop-strong","icon ion-ios-medical","icon ion-ios-medical-outline","icon ion-ios-medkit","icon ion-ios-medkit-outline","icon ion-ios-mic","icon ion-ios-mic-off","icon ion-ios-mic-outline","icon ion-ios-minus","icon ion-ios-minus-empty","icon ion-ios-minus-outline","icon ion-ios-monitor","icon ion-ios-monitor-outline","icon ion-ios-moon","icon ion-ios-moon-outline","icon ion-ios-more","icon ion-ios-more-outline","icon ion-ios-musical-note","icon ion-ios-musical-notes","icon ion-ios-navigate","icon ion-ios-navigate-outline","icon ion-ios-nutrition","icon ion-ios-nutrition-outline","icon ion-ios-paper","icon ion-ios-paper-outline","icon ion-ios-paperplane","icon ion-ios-paperplane-outline","icon ion-ios-partlysunny","icon ion-ios-partlysunny-outline","icon ion-ios-pause","icon ion-ios-pause-outline","icon ion-ios-paw","icon ion-ios-paw-outline","icon ion-ios-people","icon ion-ios-people-outline","icon ion-ios-person","icon ion-ios-person-outline","icon ion-ios-personadd","icon ion-ios-personadd-outline","icon ion-ios-photos","icon ion-ios-photos-outline","icon ion-ios-pie","icon ion-ios-pie-outline","icon ion-ios-pint","icon ion-ios-pint-outline","icon ion-ios-play","icon ion-ios-play-outline","icon ion-ios-plus","icon ion-ios-plus-empty","icon ion-ios-plus-outline","icon ion-ios-pricetag","icon ion-ios-pricetag-outline","icon ion-ios-pricetags","icon ion-ios-pricetags-outline","icon ion-ios-printer","icon ion-ios-printer-outline","icon ion-ios-pulse","icon ion-ios-pulse-strong","icon ion-ios-rainy","icon ion-ios-rainy-outline","icon ion-ios-recording","icon ion-ios-recording-outline","icon ion-ios-redo","icon ion-ios-redo-outline","icon ion-ios-refresh","icon ion-ios-refresh-empty","icon ion-ios-refresh-outline","icon ion-ios-reload","icon ion-ios-reverse-camera","icon ion-ios-reverse-camera-outline","icon ion-ios-rewind","icon ion-ios-rewind-outline","icon ion-ios-rose","icon ion-ios-rose-outline","icon ion-ios-search","icon ion-ios-search-strong","icon ion-ios-settings","icon ion-ios-settings-strong","icon ion-ios-shuffle","icon ion-ios-shuffle-strong","icon ion-ios-skipbackward","icon ion-ios-skipbackward-outline","icon ion-ios-skipforward","icon ion-ios-skipforward-outline","icon ion-ios-snowy","icon ion-ios-speedometer","icon ion-ios-speedometer-outline","icon ion-ios-star","icon ion-ios-star-half","icon ion-ios-star-outline","icon ion-ios-stopwatch","icon ion-ios-stopwatch-outline","icon ion-ios-sunny","icon ion-ios-sunny-outline","icon ion-ios-telephone","icon ion-ios-telephone-outline","icon ion-ios-tennisball","icon ion-ios-tennisball-outline","icon ion-ios-thunderstorm","icon ion-ios-thunderstorm-outline","icon ion-ios-time","icon ion-ios-time-outline","icon ion-ios-timer","icon ion-ios-timer-outline","icon ion-ios-toggle","icon ion-ios-toggle-outline","icon ion-ios-trash","icon ion-ios-trash-outline","icon ion-ios-undo","icon ion-ios-undo-outline","icon ion-ios-unlocked","icon ion-ios-unlocked-outline","icon ion-ios-upload","icon ion-ios-upload-outline","icon ion-ios-videocam","icon ion-ios-videocam-outline","icon ion-ios-volume-high","icon ion-ios-volume-low","icon ion-ios-wineglass","icon ion-ios-wineglass-outline","icon ion-ios-world","icon ion-ios-world-outline","icon ion-ipad","icon ion-iphone","icon ion-ipod","icon ion-jet","icon ion-key","icon ion-knife","icon ion-laptop","icon ion-leaf","icon ion-levels","icon ion-lightbulb","icon ion-link","icon ion-load-a","icon ion-load-b","icon ion-load-c","icon ion-load-d","icon ion-location","icon ion-lock-combination","icon ion-locked","icon ion-log-in","icon ion-log-out","icon ion-loop","icon ion-magnet","icon ion-male","icon ion-man","icon ion-map","icon ion-medkit","icon ion-merge","icon ion-mic-a","icon ion-mic-b","icon ion-mic-c","icon ion-minus","icon ion-minus-circled","icon ion-minus-round","icon ion-model-s","icon ion-monitor","icon ion-more","icon ion-mouse","icon ion-music-note","icon ion-navicon","icon ion-navicon-round","icon ion-navigate","icon ion-network","icon ion-no-smoking","icon ion-nuclear","icon ion-outlet","icon ion-paintbrush","icon ion-paintbucket","icon ion-paper-airplane","icon ion-paperclip","icon ion-pause","icon ion-person","icon ion-person-add","icon ion-person-stalker","icon ion-pie-graph","icon ion-pin","icon ion-pinpoint","icon ion-pizza","icon ion-plane","icon ion-planet","icon ion-play","icon ion-playstation","icon ion-plus","icon ion-plus-circled","icon ion-plus-round","icon ion-podium","icon ion-pound","icon ion-power","icon ion-pricetag","icon ion-pricetags","icon ion-printer","icon ion-pull-request","icon ion-qr-scanner","icon ion-quote","icon ion-radio-waves","icon ion-record","icon ion-refresh","icon ion-reply","icon ion-reply-all","icon ion-ribbon-a","icon ion-ribbon-b","icon ion-sad","icon ion-sad-outline","icon ion-scissors","icon ion-search","icon ion-settings","icon ion-share","icon ion-shuffle","icon ion-skip-backward","icon ion-skip-forward","icon ion-social-android","icon ion-social-android-outline","icon ion-social-angular","icon ion-social-angular-outline","icon ion-social-apple","icon ion-social-apple-outline","icon ion-social-bitcoin","icon ion-social-bitcoin-outline","icon ion-social-buffer","icon ion-social-buffer-outline","icon ion-social-chrome","icon ion-social-chrome-outline","icon ion-social-codepen","icon ion-social-codepen-outline","icon ion-social-css3","icon ion-social-css3-outline","icon ion-social-designernews","icon ion-social-designernews-outline","icon ion-social-dribbble","icon ion-social-dribbble-outline","icon ion-social-dropbox","icon ion-social-dropbox-outline","icon ion-social-euro","icon ion-social-euro-outline","icon ion-social-facebook","icon ion-social-facebook-outline","icon ion-social-foursquare","icon ion-social-foursquare-outline","icon ion-social-freebsd-devil","icon ion-social-github","icon ion-social-github-outline","icon ion-social-google","icon ion-social-google-outline","icon ion-social-googleplus","icon ion-social-googleplus-outline","icon ion-social-hackernews","icon ion-social-hackernews-outline","icon ion-social-html5","icon ion-social-html5-outline","icon ion-social-instagram","icon ion-social-instagram-outline","icon ion-social-javascript","icon ion-social-javascript-outline","icon ion-social-linkedin","icon ion-social-linkedin-outline","icon ion-social-markdown","icon ion-social-nodejs","icon ion-social-octocat","icon ion-social-pinterest","icon ion-social-pinterest-outline","icon ion-social-python","icon ion-social-reddit","icon ion-social-reddit-outline","icon ion-social-rss","icon ion-social-rss-outline","icon ion-social-sass","icon ion-social-skype","icon ion-social-skype-outline","icon ion-social-snapchat","icon ion-social-snapchat-outline","icon ion-social-tumblr","icon ion-social-tumblr-outline","icon ion-social-tux","icon ion-social-twitch","icon ion-social-twitch-outline","icon ion-social-twitter","icon ion-social-twitter-outline","icon ion-social-usd","icon ion-social-usd-outline","icon ion-social-vimeo","icon ion-social-vimeo-outline","icon ion-social-whatsapp","icon ion-social-whatsapp-outline","icon ion-social-windows","icon ion-social-windows-outline","icon ion-social-wordpress","icon ion-social-wordpress-outline","icon ion-social-yahoo","icon ion-social-yahoo-outline","icon ion-social-yen","icon ion-social-yen-outline","icon ion-social-youtube","icon ion-social-youtube-outline","icon ion-soup-can","icon ion-soup-can-outline","icon ion-speakerphone","icon ion-speedometer","icon ion-spoon","icon ion-star","icon ion-stats-bars","icon ion-steam","icon ion-stop","icon ion-thermometer","icon ion-thumbsdown","icon ion-thumbsup","icon ion-toggle","icon ion-toggle-filled","icon ion-transgender","icon ion-trash-a","icon ion-trash-b","icon ion-trophy","icon ion-tshirt","icon ion-tshirt-outline","icon ion-umbrella","icon ion-university","icon ion-unlocked","icon ion-upload","icon ion-usb","icon ion-videocamera","icon ion-volume-high","icon ion-volume-low","icon ion-volume-medium","icon ion-volume-mute","icon ion-wand","icon ion-waterdrop","icon ion-wifi","icon ion-wineglass","icon ion-woman","icon ion-wrench","icon ion-xbox"
        ];
    }));