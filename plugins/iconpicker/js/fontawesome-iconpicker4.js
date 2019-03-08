(function(a) {
    if (typeof define === "function" && define.amd) {
        define([ "jquery" ], a);
    } else {
        a(jQuery);
    }
})(function(a) {
    a.ui = a.ui || {};
    var b = a.ui.version = "1.12.1";
    (function() {
        var b, c = Math.max, d = Math.abs, e = /left|center|right/, f = /top|center|bottom/, g = /[\+\-]\d+(\.[\d]+)?%?/, h = /^\w+/, i = /%$/, j = a.fn.pos;
        function k(a, b, c) {
            return [ parseFloat(a[0]) * (i.test(a[0]) ? b / 100 : 1), parseFloat(a[1]) * (i.test(a[1]) ? c / 100 : 1) ];
        }
        function l(b, c) {
            return parseInt(a.css(b, c), 10) || 0;
        }
        function m(b) {
            var c = b[0];
            if (c.nodeType === 9) {
                return {
                    width: b.width(),
                    height: b.height(),
                    offset: {
                        top: 0,
                        left: 0
                    }
                };
            }
            if (a.isWindow(c)) {
                return {
                    width: b.width(),
                    height: b.height(),
                    offset: {
                        top: b.scrollTop(),
                        left: b.scrollLeft()
                    }
                };
            }
            if (c.preventDefault) {
                return {
                    width: 0,
                    height: 0,
                    offset: {
                        top: c.pageY,
                        left: c.pageX
                    }
                };
            }
            return {
                width: b.outerWidth(),
                height: b.outerHeight(),
                offset: b.offset()
            };
        }
        a.pos = {
            scrollbarWidth: function() {
                if (b !== undefined) {
                    return b;
                }
                var c, d, e = a("<div " + "style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'>" + "<div style='height:100px;width:auto;'></div></div>"), f = e.children()[0];
                a("body").append(e);
                c = f.offsetWidth;
                e.css("overflow", "scroll");
                d = f.offsetWidth;
                if (c === d) {
                    d = e[0].clientWidth;
                }
                e.remove();
                return b = c - d;
            },
            getScrollInfo: function(b) {
                var c = b.isWindow || b.isDocument ? "" : b.element.css("overflow-x"), d = b.isWindow || b.isDocument ? "" : b.element.css("overflow-y"), e = c === "scroll" || c === "auto" && b.width < b.element[0].scrollWidth, f = d === "scroll" || d === "auto" && b.height < b.element[0].scrollHeight;
                return {
                    width: f ? a.pos.scrollbarWidth() : 0,
                    height: e ? a.pos.scrollbarWidth() : 0
                };
            },
            getWithinInfo: function(b) {
                var c = a(b || window), d = a.isWindow(c[0]), e = !!c[0] && c[0].nodeType === 9, f = !d && !e;
                return {
                    element: c,
                    isWindow: d,
                    isDocument: e,
                    offset: f ? a(b).offset() : {
                        left: 0,
                        top: 0
                    },
                    scrollLeft: c.scrollLeft(),
                    scrollTop: c.scrollTop(),
                    width: c.outerWidth(),
                    height: c.outerHeight()
                };
            }
        };
        a.fn.pos = function(b) {
            if (!b || !b.of) {
                return j.apply(this, arguments);
            }
            b = a.extend({}, b);
            var i, n, o, p, q, r, s = a(b.of), t = a.pos.getWithinInfo(b.within), u = a.pos.getScrollInfo(t), v = (b.collision || "flip").split(" "), w = {};
            r = m(s);
            if (s[0].preventDefault) {
                b.at = "left top";
            }
            n = r.width;
            o = r.height;
            p = r.offset;
            q = a.extend({}, p);
            a.each([ "my", "at" ], function() {
                var a = (b[this] || "").split(" "), c, d;
                if (a.length === 1) {
                    a = e.test(a[0]) ? a.concat([ "center" ]) : f.test(a[0]) ? [ "center" ].concat(a) : [ "center", "center" ];
                }
                a[0] = e.test(a[0]) ? a[0] : "center";
                a[1] = f.test(a[1]) ? a[1] : "center";
                c = g.exec(a[0]);
                d = g.exec(a[1]);
                w[this] = [ c ? c[0] : 0, d ? d[0] : 0 ];
                b[this] = [ h.exec(a[0])[0], h.exec(a[1])[0] ];
            });
            if (v.length === 1) {
                v[1] = v[0];
            }
            if (b.at[0] === "right") {
                q.left += n;
            } else if (b.at[0] === "center") {
                q.left += n / 2;
            }
            if (b.at[1] === "bottom") {
                q.top += o;
            } else if (b.at[1] === "center") {
                q.top += o / 2;
            }
            i = k(w.at, n, o);
            q.left += i[0];
            q.top += i[1];
            return this.each(function() {
                var e, f, g = a(this), h = g.outerWidth(), j = g.outerHeight(), m = l(this, "marginLeft"), r = l(this, "marginTop"), x = h + m + l(this, "marginRight") + u.width, y = j + r + l(this, "marginBottom") + u.height, z = a.extend({}, q), A = k(w.my, g.outerWidth(), g.outerHeight());
                if (b.my[0] === "right") {
                    z.left -= h;
                } else if (b.my[0] === "center") {
                    z.left -= h / 2;
                }
                if (b.my[1] === "bottom") {
                    z.top -= j;
                } else if (b.my[1] === "center") {
                    z.top -= j / 2;
                }
                z.left += A[0];
                z.top += A[1];
                e = {
                    marginLeft: m,
                    marginTop: r
                };
                a.each([ "left", "top" ], function(c, d) {
                    if (a.ui.pos[v[c]]) {
                        a.ui.pos[v[c]][d](z, {
                            targetWidth: n,
                            targetHeight: o,
                            elemWidth: h,
                            elemHeight: j,
                            collisionPosition: e,
                            collisionWidth: x,
                            collisionHeight: y,
                            offset: [ i[0] + A[0], i[1] + A[1] ],
                            my: b.my,
                            at: b.at,
                            within: t,
                            elem: g
                        });
                    }
                });
                if (b.using) {
                    f = function(a) {
                        var e = p.left - z.left, f = e + n - h, i = p.top - z.top, k = i + o - j, l = {
                            target: {
                                element: s,
                                left: p.left,
                                top: p.top,
                                width: n,
                                height: o
                            },
                            element: {
                                element: g,
                                left: z.left,
                                top: z.top,
                                width: h,
                                height: j
                            },
                            horizontal: f < 0 ? "left" : e > 0 ? "right" : "center",
                            vertical: k < 0 ? "top" : i > 0 ? "bottom" : "middle"
                        };
                        if (n < h && d(e + f) < n) {
                            l.horizontal = "center";
                        }
                        if (o < j && d(i + k) < o) {
                            l.vertical = "middle";
                        }
                        if (c(d(e), d(f)) > c(d(i), d(k))) {
                            l.important = "horizontal";
                        } else {
                            l.important = "vertical";
                        }
                        b.using.call(this, a, l);
                    };
                }
                g.offset(a.extend(z, {
                    using: f
                }));
            });
        };
        a.ui.pos = {
            _trigger: function(a, b, c, d) {
                if (b.elem) {
                    b.elem.trigger({
                        type: c,
                        position: a,
                        positionData: b,
                        triggered: d
                    });
                }
            },
            fit: {
                left: function(b, d) {
                    a.ui.pos._trigger(b, d, "posCollide", "fitLeft");
                    var e = d.within, f = e.isWindow ? e.scrollLeft : e.offset.left, g = e.width, h = b.left - d.collisionPosition.marginLeft, i = f - h, j = h + d.collisionWidth - g - f, k;
                    if (d.collisionWidth > g) {
                        if (i > 0 && j <= 0) {
                            k = b.left + i + d.collisionWidth - g - f;
                            b.left += i - k;
                        } else if (j > 0 && i <= 0) {
                            b.left = f;
                        } else {
                            if (i > j) {
                                b.left = f + g - d.collisionWidth;
                            } else {
                                b.left = f;
                            }
                        }
                    } else if (i > 0) {
                        b.left += i;
                    } else if (j > 0) {
                        b.left -= j;
                    } else {
                        b.left = c(b.left - h, b.left);
                    }
                    a.ui.pos._trigger(b, d, "posCollided", "fitLeft");
                },
                top: function(b, d) {
                    a.ui.pos._trigger(b, d, "posCollide", "fitTop");
                    var e = d.within, f = e.isWindow ? e.scrollTop : e.offset.top, g = d.within.height, h = b.top - d.collisionPosition.marginTop, i = f - h, j = h + d.collisionHeight - g - f, k;
                    if (d.collisionHeight > g) {
                        if (i > 0 && j <= 0) {
                            k = b.top + i + d.collisionHeight - g - f;
                            b.top += i - k;
                        } else if (j > 0 && i <= 0) {
                            b.top = f;
                        } else {
                            if (i > j) {
                                b.top = f + g - d.collisionHeight;
                            } else {
                                b.top = f;
                            }
                        }
                    } else if (i > 0) {
                        b.top += i;
                    } else if (j > 0) {
                        b.top -= j;
                    } else {
                        b.top = c(b.top - h, b.top);
                    }
                    a.ui.pos._trigger(b, d, "posCollided", "fitTop");
                }
            },
            flip: {
                left: function(b, c) {
                    a.ui.pos._trigger(b, c, "posCollide", "flipLeft");
                    var e = c.within, f = e.offset.left + e.scrollLeft, g = e.width, h = e.isWindow ? e.scrollLeft : e.offset.left, i = b.left - c.collisionPosition.marginLeft, j = i - h, k = i + c.collisionWidth - g - h, l = c.my[0] === "left" ? -c.elemWidth : c.my[0] === "right" ? c.elemWidth : 0, m = c.at[0] === "left" ? c.targetWidth : c.at[0] === "right" ? -c.targetWidth : 0, n = -2 * c.offset[0], o, p;
                    if (j < 0) {
                        o = b.left + l + m + n + c.collisionWidth - g - f;
                        if (o < 0 || o < d(j)) {
                            b.left += l + m + n;
                        }
                    } else if (k > 0) {
                        p = b.left - c.collisionPosition.marginLeft + l + m + n - h;
                        if (p > 0 || d(p) < k) {
                            b.left += l + m + n;
                        }
                    }
                    a.ui.pos._trigger(b, c, "posCollided", "flipLeft");
                },
                top: function(b, c) {
                    a.ui.pos._trigger(b, c, "posCollide", "flipTop");
                    var e = c.within, f = e.offset.top + e.scrollTop, g = e.height, h = e.isWindow ? e.scrollTop : e.offset.top, i = b.top - c.collisionPosition.marginTop, j = i - h, k = i + c.collisionHeight - g - h, l = c.my[1] === "top", m = l ? -c.elemHeight : c.my[1] === "bottom" ? c.elemHeight : 0, n = c.at[1] === "top" ? c.targetHeight : c.at[1] === "bottom" ? -c.targetHeight : 0, o = -2 * c.offset[1], p, q;
                    if (j < 0) {
                        q = b.top + m + n + o + c.collisionHeight - g - f;
                        if (q < 0 || q < d(j)) {
                            b.top += m + n + o;
                        }
                    } else if (k > 0) {
                        p = b.top - c.collisionPosition.marginTop + m + n + o - h;
                        if (p > 0 || d(p) < k) {
                            b.top += m + n + o;
                        }
                    }
                    a.ui.pos._trigger(b, c, "posCollided", "flipTop");
                }
            },
            flipfit: {
                left: function() {
                    a.ui.pos.flip.left.apply(this, arguments);
                    a.ui.pos.fit.left.apply(this, arguments);
                },
                top: function() {
                    a.ui.pos.flip.top.apply(this, arguments);
                    a.ui.pos.fit.top.apply(this, arguments);
                }
            }
        };
        (function() {
            var b, c, d, e, f, g = document.getElementsByTagName("body")[0], h = document.createElement("div");
            b = document.createElement(g ? "div" : "body");
            d = {
                visibility: "hidden",
                width: 0,
                height: 0,
                border: 0,
                margin: 0,
                background: "none"
            };
            if (g) {
                a.extend(d, {
                    position: "absolute",
                    left: "-1000px",
                    top: "-1000px"
                });
            }
            for (f in d) {
                b.style[f] = d[f];
            }
            b.appendChild(h);
            c = g || document.documentElement;
            c.insertBefore(b, c.firstChild);
            h.style.cssText = "position: absolute; left: 10.7432222px;";
            e = a(h).offset().left;
            a.support.offsetFractions = e > 10 && e < 11;
            b.innerHTML = "";
            c.removeChild(b);
        })();
    })();
    var c = a.ui.position;
});

(function(a) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        define([ "jquery" ], a);
    } else if (window.jQuery && !window.jQuery.fn.iconpicker) {
        a(window.jQuery);
    }
})(function(a) {
    "use strict";
    var b = {
        isEmpty: function(a) {
            return a === false || a === "" || a === null || a === undefined;
        },
        isEmptyObject: function(a) {
            return this.isEmpty(a) === true || a.length === 0;
        },
        isElement: function(b) {
            return a(b).length > 0;
        },
        isString: function(a) {
            return typeof a === "string" || a instanceof String;
        },
        isArray: function(b) {
            return a.isArray(b);
        },
        inArray: function(b, c) {
            return a.inArray(b, c) !== -1;
        },
        throwError: function(a) {
            throw "Font Awesome Icon Picker Exception: " + a;
        }
    };
    var c = function(d, e) {
        this._id = c._idCounter++;
        this.element = a(d).addClass("iconpicker-element");
        this._trigger("iconpickerCreate");
        this.options = a.extend({}, c.defaultOptions, this.element.data(), e);
        this.options.templates = a.extend({}, c.defaultOptions.templates, this.options.templates);
        this.options.originalPlacement = this.options.placement;
        this.container = b.isElement(this.options.container) ? a(this.options.container) : false;
        if (this.container === false) {
            if (this.element.is(".dropdown-toggle")) {
                this.container = a("~ .dropdown-menu:first", this.element);
            } else {
                this.container = this.element.is("input,textarea,button,.btn") ? this.element.parent() : this.element;
            }
        }
        this.container.addClass("iconpicker-container");
        if (this.isDropdownMenu()) {
            this.options.templates.search = false;
            this.options.templates.buttons = false;
            this.options.placement = "inline";
        }
        this.input = this.element.is("input,textarea") ? this.element.addClass("iconpicker-input") : false;
        if (this.input === false) {
            this.input = this.container.find(this.options.input);
            if (!this.input.is("input,textarea")) {
                this.input = false;
            }
        }
        this.component = this.isDropdownMenu() ? this.container.parent().find(this.options.component) : this.container.find(this.options.component);
        if (this.component.length === 0) {
            this.component = false;
        } else {
            this.component.find("i").addClass("iconpicker-component");
        }
        this._createPopover();
        this._createIconpicker();
        if (this.getAcceptButton().length === 0) {
            this.options.mustAccept = false;
        }
        if (this.isInputGroup()) {
            this.container.parent().append(this.popover);
        } else {
            this.container.append(this.popover);
        }
        this._bindElementEvents();
        this._bindWindowEvents();
        this.update(this.options.selected);
        if (this.isInline()) {
            this.show();
        }
        this._trigger("iconpickerCreated");
    };
    c._idCounter = 0;
    c.defaultOptions = {
        title: false,
        selected: false,
        defaultValue: false,
        placement: "bottom",
        collision: "none",
        animation: true,
        hideOnSelect: false,
        showFooter: false,
        searchInFooter: false,
        mustAccept: false,
        selectedCustomClass: "bg-primary",
        icons: [],
        fullClassFormatter: function(a) {
            return a;
        },
        input: "input,.iconpicker-input",
        inputSearch: false,
        container: false,
        component: ".input-group-addon,.iconpicker-component",
        templates: {
            popover: '<div class="iconpicker-popover popover"><div class="arrow"></div>' + '<div class="popover-title"></div><div class="popover-content"></div></div>',
            footer: '<div class="popover-footer"></div>',
            buttons: '<button class="iconpicker-btn iconpicker-btn-cancel btn btn-default btn-sm">Cancel</button>' + ' <button class="iconpicker-btn iconpicker-btn-accept btn btn-primary btn-sm">Accept</button>',
            search: '<input type="search" class="form-control iconpicker-search" placeholder="Search icons..." />',
            iconpicker: '<div class="iconpicker"><div class="iconpicker-items"></div></div>',
            iconpickerItem: '<a role="button" href="#" class="iconpicker-item"><i></i></a>'
        }
    };
    c.batch = function(b, c) {
        var d = Array.prototype.slice.call(arguments, 2);
        return a(b).each(function() {
            var b = a(this).data("iconpicker");
            if (!!b) {
                b[c].apply(b, d);
            }
        });
    };
    c.prototype = {
        constructor: c,
        options: {},
        _id: 0,
        _trigger: function(b, c) {
            c = c || {};
            this.element.trigger(a.extend({
                type: b,
                iconpickerInstance: this
            }, c));
        },
        _createPopover: function() {
            this.popover = a(this.options.templates.popover);
            var c = this.popover.find(".popover-title");
            if (!!this.options.title) {
                c.append(a('<div class="popover-title-text">' + this.options.title + "</div>"));
            }
            if (this.hasSeparatedSearchInput() && !this.options.searchInFooter) {
                c.append(this.options.templates.search);
            } else if (!this.options.title) {
                c.remove();
            }
            if (this.options.showFooter && !b.isEmpty(this.options.templates.footer)) {
                var d = a(this.options.templates.footer);
                if (this.hasSeparatedSearchInput() && this.options.searchInFooter) {
                    d.append(a(this.options.templates.search));
                }
                if (!b.isEmpty(this.options.templates.buttons)) {
                    d.append(a(this.options.templates.buttons));
                }
                this.popover.append(d);
            }
            if (this.options.animation === true) {
                this.popover.addClass("fade");
            }
            return this.popover;
        },
        _createIconpicker: function() {
            var b = this;
            this.iconpicker = a(this.options.templates.iconpicker);
            var c = function(c) {
                var d = a(this);
                if (d.is("i")) {
                    d = d.parent();
                }
                b._trigger("iconpickerSelect", {
                    iconpickerItem: d,
                    iconpickerValue: b.iconpickerValue
                });
                if (b.options.mustAccept === false) {
                    b.update(d.data("iconpickerValue"));
                    b._trigger("iconpickerSelected", {
                        iconpickerItem: this,
                        iconpickerValue: b.iconpickerValue
                    });
                } else {
                    b.update(d.data("iconpickerValue"), true);
                }
                if (b.options.hideOnSelect && b.options.mustAccept === false) {
                    b.hide();
                }
                c.preventDefault();
                return false;
            };
            for (var d in this.options.icons) {
                if (typeof this.options.icons[d] === "string") {
                    var e = a(this.options.templates.iconpickerItem);
                    e.find("i").addClass(this.options.fullClassFormatter(this.options.icons[d]));
                    e.data("iconpickerValue", this.options.icons[d]).on("click.iconpicker", c);
                    this.iconpicker.find(".iconpicker-items").append(e.attr("title", "." + this.options.icons[d]));
                }
            }
            this.popover.find(".popover-content").append(this.iconpicker);
            return this.iconpicker;
        },
        _isEventInsideIconpicker: function(b) {
            var c = a(b.target);
            if ((!c.hasClass("iconpicker-element") || c.hasClass("iconpicker-element") && !c.is(this.element)) && c.parents(".iconpicker-popover").length === 0) {
                return false;
            }
            return true;
        },
        _bindElementEvents: function() {
            var c = this;
            this.getSearchInput().on("keyup.iconpicker", function() {
                c.filter(a(this).val().toLowerCase());
            });
            this.getAcceptButton().on("click.iconpicker", function() {
                var a = c.iconpicker.find(".iconpicker-selected").get(0);
                c.update(c.iconpickerValue);
                c._trigger("iconpickerSelected", {
                    iconpickerItem: a,
                    iconpickerValue: c.iconpickerValue
                });
                if (!c.isInline()) {
                    c.hide();
                }
            });
            this.getCancelButton().on("click.iconpicker", function() {
                if (!c.isInline()) {
                    c.hide();
                }
            });
            this.element.on("focus.iconpicker", function(a) {
                c.show();
                a.stopPropagation();
            });
            if (this.hasComponent()) {
                this.component.on("click.iconpicker", function() {
                    c.toggle();
                });
            }
            if (this.hasInput()) {
                this.input.on("keyup.iconpicker", function(d) {
                    if (!b.inArray(d.keyCode, [ 38, 40, 37, 39, 16, 17, 18, 9, 8, 91, 93, 20, 46, 186, 190, 46, 78, 188, 44, 86 ])) {
                        c.update();
                    } else {
                        c._updateFormGroupStatus(c.getValid(this.value) !== false);
                    }
                    if (c.options.inputSearch === true) {
                        c.filter(a(this).val().toLowerCase());
                    }
                });
            }
        },
        _bindWindowEvents: function() {
            var b = a(window.document);
            var c = this;
            var d = ".iconpicker.inst" + this._id;
            a(window).on("resize.iconpicker" + d + " orientationchange.iconpicker" + d, function(a) {
                if (c.popover.hasClass("show")) {
                    c.updatePlacement();
                }
            });
            if (!c.isInline()) {
                b.on("mouseup" + d, function(a) {
                    if (!c._isEventInsideIconpicker(a) && !c.isInline()) {
                        c.hide();
                    }
                    a.stopPropagation();
                    a.preventDefault();
                    return false;
                });
            }
            return false;
        },
        _unbindElementEvents: function() {
            this.popover.off(".iconpicker");
            this.element.off(".iconpicker");
            if (this.hasInput()) {
                this.input.off(".iconpicker");
            }
            if (this.hasComponent()) {
                this.component.off(".iconpicker");
            }
            if (this.hasContainer()) {
                this.container.off(".iconpicker");
            }
        },
        _unbindWindowEvents: function() {
            a(window).off(".iconpicker.inst" + this._id);
            a(window.document).off(".iconpicker.inst" + this._id);
        },
        updatePlacement: function(b, c) {
            b = b || this.options.placement;
            this.options.placement = b;
            c = c || this.options.collision;
            c = c === true ? "flip" : c;
            var d = {
                at: "right bottom",
                my: "right top",
                of: this.hasInput() && !this.isInputGroup() ? this.input : this.container,
                collision: c === true ? "flip" : c,
                within: window
            };
            this.popover.removeClass("inline topLeftCorner topLeft top topRight topRightCorner " + "rightTop right rightBottom bottomRight bottomRightCorner " + "bottom bottomLeft bottomLeftCorner leftBottom left leftTop");
            if (typeof b === "object") {
                return this.popover.pos(a.extend({}, d, b));
            }
            switch (b) {
              case "inline":
                {
                    d = false;
                }
                break;

              case "topLeftCorner":
                {
                    d.my = "right bottom";
                    d.at = "left top";
                }
                break;

              case "topLeft":
                {
                    d.my = "left bottom";
                    d.at = "left top";
                }
                break;

              case "top":
                {
                    d.my = "center bottom";
                    d.at = "center top";
                }
                break;

              case "topRight":
                {
                    d.my = "right bottom";
                    d.at = "right top";
                }
                break;

              case "topRightCorner":
                {
                    d.my = "left bottom";
                    d.at = "right top";
                }
                break;

              case "rightTop":
                {
                    d.my = "left bottom";
                    d.at = "right center";
                }
                break;

              case "right":
                {
                    d.my = "left center";
                    d.at = "right center";
                }
                break;

              case "rightBottom":
                {
                    d.my = "left top";
                    d.at = "right center";
                }
                break;

              case "bottomRightCorner":
                {
                    d.my = "left top";
                    d.at = "right bottom";
                }
                break;

              case "bottomRight":
                {
                    d.my = "right top";
                    d.at = "right bottom";
                }
                break;

              case "bottom":
                {
                    d.my = "center top";
                    d.at = "center bottom";
                }
                break;

              case "bottomLeft":
                {
                    d.my = "left top";
                    d.at = "left bottom";
                }
                break;

              case "bottomLeftCorner":
                {
                    d.my = "right top";
                    d.at = "left bottom";
                }
                break;

              case "leftBottom":
                {
                    d.my = "right top";
                    d.at = "left center";
                }
                break;

              case "left":
                {
                    d.my = "right center";
                    d.at = "left center";
                }
                break;

              case "leftTop":
                {
                    d.my = "right bottom";
                    d.at = "left center";
                }
                break;

              default:
                {
                    return false;
                }
                break;
            }
            this.popover.css({
                display: this.options.placement === "inline" ? "" : "block"
            });
            if (d !== false) {
                this.popover.pos(d).css("maxWidth", a(window).width() - this.container.offset().left - 5);
            } else {
                this.popover.css({
                    top: "auto",
                    right: "auto",
                    bottom: "auto",
                    left: "auto",
                    maxWidth: "none"
                });
            }
            this.popover.addClass(this.options.placement);
            return true;
        },
        _updateComponents: function() {
            this.iconpicker.find(".iconpicker-item.iconpicker-selected").removeClass("iconpicker-selected " + this.options.selectedCustomClass);
            if (this.iconpickerValue) {
                this.iconpicker.find("." + this.options.fullClassFormatter(this.iconpickerValue).replace(/ /g, ".")).parent().addClass("iconpicker-selected " + this.options.selectedCustomClass);
            }
            if (this.hasComponent()) {
                var a = this.component.find("i");
                if (a.length > 0) {
                    a.attr("class", this.options.fullClassFormatter(this.iconpickerValue));
                } else {
                    this.component.html(this.getHtml());
                }
            }
        },
        _updateFormGroupStatus: function(a) {
            if (this.hasInput()) {
                if (a !== false) {
                    this.input.parents(".form-group:first").removeClass("has-error");
                } else {
                    this.input.parents(".form-group:first").addClass("has-error");
                }
                return true;
            }
            return false;
        },
        getValid: function(c) {
            if (!b.isString(c)) {
                c = "";
            }
            var d = c === "";
            c = a.trim(c);
            if (b.inArray(c, this.options.icons) || d) {
                return c;
            }
            return false;
        },
        setValue: function(a) {
            var b = this.getValid(a);
            if (b !== false) {
                this.iconpickerValue = b;
                this._trigger("iconpickerSetValue", {
                    iconpickerValue: b
                });
                return this.iconpickerValue;
            } else {
                this._trigger("iconpickerInvalid", {
                    iconpickerValue: a
                });
                return false;
            }
        },
        getHtml: function() {
            return '<i class="' + this.options.fullClassFormatter(this.iconpickerValue) + '"></i>';
        },
        setSourceValue: function(a) {
            a = this.setValue(a);
            if (a !== false && a !== "") {
                if (this.hasInput()) {
                    this.input.val(this.iconpickerValue);
                } else {
                    this.element.data("iconpickerValue", this.iconpickerValue);
                }
                this._trigger("iconpickerSetSourceValue", {
                    iconpickerValue: a
                });
            }
            return a;
        },
        getSourceValue: function(a) {
            a = a || this.options.defaultValue;
            var b = a;
            if (this.hasInput()) {
                b = this.input.val();
            } else {
                b = this.element.data("iconpickerValue");
            }
            if (b === undefined || b === "" || b === null || b === false) {
                b = a;
            }
            return b;
        },
        hasInput: function() {
            return this.input !== false;
        },
        isInputSearch: function() {
            return this.hasInput() && this.options.inputSearch === true;
        },
        isInputGroup: function() {
            return this.container.is(".input-group");
        },
        isDropdownMenu: function() {
            return this.container.is(".dropdown-menu");
        },
        hasSeparatedSearchInput: function() {
            return this.options.templates.search !== false && !this.isInputSearch();
        },
        hasComponent: function() {
            return this.component !== false;
        },
        hasContainer: function() {
            return this.container !== false;
        },
        getAcceptButton: function() {
            return this.popover.find(".iconpicker-btn-accept");
        },
        getCancelButton: function() {
            return this.popover.find(".iconpicker-btn-cancel");
        },
        getSearchInput: function() {
            return this.popover.find(".iconpicker-search");
        },
        filter: function(c) {
            if (b.isEmpty(c)) {
                this.iconpicker.find(".iconpicker-item").show();
                return a(false);
            } else {
                var d = [];
                this.iconpicker.find(".iconpicker-item").each(function() {
                    var b = a(this);
                    var e = b.attr("title").toLowerCase();
                    var f = false;
                    try {
                        f = new RegExp(c, "g");
                    } catch (a) {
                        f = false;
                    }
                    if (f !== false && e.match(f)) {
                        d.push(b);
                        b.show();
                    } else {
                        b.hide();
                    }
                });
                return d;
            }
        },
        show: function() {
            if (this.popover.hasClass("show")) {
                return false;
            }
            a.iconpicker.batch(a(".iconpicker-popover.in:not(.inline)").not(this.popover), "hide");
            this._trigger("iconpickerShow");
            this.updatePlacement();
            this.popover.addClass("show");
            setTimeout(a.proxy(function() {
                this.popover.css("display", this.isInline() ? "" : "block");
                this._trigger("iconpickerShown");
            }, this), this.options.animation ? 300 : 1);
        },
        hide: function() {
            if (!this.popover.hasClass("show")) {
                return false;
            }
            this._trigger("iconpickerHide");
            this.popover.removeClass("show");
            setTimeout(a.proxy(function() {
                this.popover.css("display", "none");
                this.getSearchInput().val("");
                this.filter("");
                this._trigger("iconpickerHidden");
            }, this), this.options.animation ? 300 : 1);
        },
        toggle: function() {
            if (this.popover.is(":visible")) {
                this.hide();
            } else {
                this.show();
            }
        },
        update: function(a, b) {
            a = a ? a : this.getSourceValue(this.iconpickerValue);
            this._trigger("iconpickerUpdate");
            if (b === true) {
                a = this.setValue(a);
            } else {
                a = this.setSourceValue(a);
                this._updateFormGroupStatus(a !== false);
            }
            if (a !== false) {
                this._updateComponents();
            }
            this._trigger("iconpickerUpdated");
            return a;
        },
        destroy: function() {
            this._trigger("iconpickerDestroy");
            this.element.removeData("iconpicker").removeData("iconpickerValue").removeClass("iconpicker-element");
            this._unbindElementEvents();
            this._unbindWindowEvents();
            a(this.popover).remove();
            this._trigger("iconpickerDestroyed");
        },
        disable: function() {
            if (this.hasInput()) {
                this.input.prop("disabled", true);
                return true;
            }
            return false;
        },
        enable: function() {
            if (this.hasInput()) {
                this.input.prop("disabled", false);
                return true;
            }
            return false;
        },
        isDisabled: function() {
            if (this.hasInput()) {
                return this.input.prop("disabled") === true;
            }
            return false;
        },
        isInline: function() {
            return this.options.placement === "inline" || this.popover.hasClass("inline");
        }
    };
    a.iconpicker = c;
    a.fn.iconpicker = function(b) {
        return this.each(function() {
            var d = a(this);
            if (!d.data("iconpicker")) {
                d.data("iconpicker", new c(this, typeof b === "object" ? b : {}));
            }
        });
    };
    c.defaultOptions.icons = ["","fa fa-500px","fa fa-address-book","fa fa-address-book-o","fa fa-address-card","fa fa-address-card-o","fa fa-adjust","fa fa-adn","fa fa-align-center","fa fa-align-justify","fa fa-align-left","fa fa-align-right","fa fa-amazon","fa fa-ambulance","fa fa-american-sign-language-interpreting","fa fa-anchor","fa fa-android","fa fa-angellist","fa fa-angle-double-down","fa fa-angle-double-left","fa fa-angle-double-right","fa fa-angle-double-up","fa fa-angle-down","fa fa-angle-left","fa fa-angle-right","fa fa-angle-up","fa fa-apple","fa fa-archive","fa fa-area-chart","fa fa-arrow-circle-down","fa fa-arrow-circle-left","fa fa-arrow-circle-o-down","fa fa-arrow-circle-o-left","fa fa-arrow-circle-o-right","fa fa-arrow-circle-o-up","fa fa-arrow-circle-right","fa fa-arrow-circle-up","fa fa-arrow-down","fa fa-arrow-left","fa fa-arrow-right","fa fa-arrow-up","fa fa-arrows","fa fa-arrows-alt","fa fa-arrows-h","fa fa-arrows-v","fa fa-asl-interpreting","fa fa-assistive-listening-systems","fa fa-asterisk","fa fa-at","fa fa-audio-description","fa fa-automobile","fa fa-backward","fa fa-balance-scale","fa fa-ban","fa fa-bandcamp","fa fa-bank","fa fa-bar-chart","fa fa-bar-chart-o","fa fa-barcode","fa fa-bars","fa fa-bath","fa fa-bathtub","fa fa-battery","fa fa-battery-0","fa fa-battery-1","fa fa-battery-2","fa fa-battery-3","fa fa-battery-4","fa fa-battery-empty","fa fa-battery-full","fa fa-battery-half","fa fa-battery-quarter","fa fa-battery-three-quarters","fa fa-bed","fa fa-beer","fa fa-behance","fa fa-behance-square","fa fa-bell","fa fa-bell-o","fa fa-bell-slash","fa fa-bell-slash-o","fa fa-bicycle","fa fa-binoculars","fa fa-birthday-cake","fa fa-bitbucket","fa fa-bitbucket-square","fa fa-bitcoin","fa fa-black-tie","fa fa-blind","fa fa-bluetooth","fa fa-bluetooth-b","fa fa-bold","fa fa-bolt","fa fa-bomb","fa fa-book","fa fa-bookmark","fa fa-bookmark-o","fa fa-braille","fa fa-briefcase","fa fa-btc","fa fa-bug","fa fa-building","fa fa-building-o","fa fa-bullhorn","fa fa-bullseye","fa fa-bus","fa fa-buysellads","fa fa-cab","fa fa-calculator","fa fa-calendar","fa fa-calendar-check-o","fa fa-calendar-minus-o","fa fa-calendar-o","fa fa-calendar-plus-o","fa fa-calendar-times-o","fa fa-camera","fa fa-camera-retro","fa fa-car","fa fa-caret-down","fa fa-caret-left","fa fa-caret-right","fa fa-caret-square-o-down","fa fa-caret-square-o-left","fa fa-caret-square-o-right","fa fa-caret-square-o-up","fa fa-caret-up","fa fa-cart-arrow-down","fa fa-cart-plus","fa fa-cc","fa fa-cc-amex","fa fa-cc-diners-club","fa fa-cc-discover","fa fa-cc-jcb","fa fa-cc-mastercard","fa fa-cc-paypal","fa fa-cc-stripe","fa fa-cc-visa","fa fa-certificate","fa fa-chain","fa fa-chain-broken","fa fa-check","fa fa-check-circle","fa fa-check-circle-o","fa fa-check-square","fa fa-check-square-o","fa fa-chevron-circle-down","fa fa-chevron-circle-left","fa fa-chevron-circle-right","fa fa-chevron-circle-up","fa fa-chevron-down","fa fa-chevron-left","fa fa-chevron-right","fa fa-chevron-up","fa fa-child","fa fa-chrome","fa fa-circle","fa fa-circle-o","fa fa-circle-o-notch","fa fa-circle-thin","fa fa-clipboard","fa fa-clock-o","fa fa-clone","fa fa-close","fa fa-cloud","fa fa-cloud-download","fa fa-cloud-upload","fa fa-cny","fa fa-code","fa fa-code-fork","fa fa-codepen","fa fa-codiepie","fa fa-coffee","fa fa-cog","fa fa-cogs","fa fa-columns","fa fa-comment","fa fa-comment-o","fa fa-commenting","fa fa-commenting-o","fa fa-comments","fa fa-comments-o","fa fa-compass","fa fa-compress","fa fa-connectdevelop","fa fa-contao","fa fa-copy","fa fa-copyright","fa fa-creative-commons","fa fa-credit-card","fa fa-credit-card-alt","fa fa-crop","fa fa-crosshairs","fa fa-css3","fa fa-cube","fa fa-cubes","fa fa-cut","fa fa-cutlery","fa fa-dashboard","fa fa-dashcube","fa fa-database","fa fa-deaf","fa fa-deafness","fa fa-dedent","fa fa-delicious","fa fa-desktop","fa fa-deviantart","fa fa-diamond","fa fa-digg","fa fa-dollar","fa fa-dot-circle-o","fa fa-download","fa fa-dribbble","fa fa-drivers-license","fa fa-drivers-license-o","fa fa-dropbox","fa fa-drupal","fa fa-edge","fa fa-edit","fa fa-eercast","fa fa-eject","fa fa-ellipsis-h","fa fa-ellipsis-v","fa fa-empire","fa fa-envelope","fa fa-envelope-o","fa fa-envelope-open","fa fa-envelope-open-o","fa fa-envelope-square","fa fa-envira","fa fa-eraser","fa fa-etsy","fa fa-eur","fa fa-euro","fa fa-exchange","fa fa-exclamation","fa fa-exclamation-circle","fa fa-exclamation-triangle","fa fa-expand","fa fa-expeditedssl","fa fa-external-link","fa fa-external-link-square","fa fa-eye","fa fa-eye-slash","fa fa-eyedropper","fa fa-fa","fa fa-facebook","fa fa-facebook-f","fa fa-facebook-official","fa fa-facebook-square","fa fa-fast-backward","fa fa-fast-forward","fa fa-fax","fa fa-feed","fa fa-female","fa fa-fighter-jet","fa fa-file","fa fa-file-archive-o","fa fa-file-audio-o","fa fa-file-code-o","fa fa-file-excel-o","fa fa-file-image-o","fa fa-file-movie-o","fa fa-file-o","fa fa-file-pdf-o","fa fa-file-photo-o","fa fa-file-picture-o","fa fa-file-powerpoint-o","fa fa-file-sound-o","fa fa-file-text","fa fa-file-text-o","fa fa-file-video-o","fa fa-file-word-o","fa fa-file-zip-o","fa fa-files-o","fa fa-film","fa fa-filter","fa fa-fire","fa fa-fire-extinguisher","fa fa-firefox","fa fa-first-order","fa fa-flag","fa fa-flag-checkered","fa fa-flag-o","fa fa-flash","fa fa-flask","fa fa-flickr","fa fa-floppy-o","fa fa-folder","fa fa-folder-o","fa fa-folder-open","fa fa-folder-open-o","fa fa-font","fa fa-font-awesome","fa fa-fonticons","fa fa-fort-awesome","fa fa-forumbee","fa fa-forward","fa fa-foursquare","fa fa-free-code-camp","fa fa-frown-o","fa fa-futbol-o","fa fa-gamepad","fa fa-gavel","fa fa-gbp","fa fa-ge","fa fa-gear","fa fa-gears","fa fa-genderless","fa fa-get-pocket","fa fa-gg","fa fa-gg-circle","fa fa-gift","fa fa-git","fa fa-git-square","fa fa-github","fa fa-github-alt","fa fa-github-square","fa fa-gitlab","fa fa-gittip","fa fa-glass","fa fa-glide","fa fa-glide-g","fa fa-globe","fa fa-google","fa fa-google-plus","fa fa-google-plus-circle","fa fa-google-plus-official","fa fa-google-plus-square","fa fa-google-wallet","fa fa-graduation-cap","fa fa-gratipay","fa fa-grav","fa fa-group","fa fa-h-square","fa fa-hacker-news","fa fa-hand-grab-o","fa fa-hand-lizard-o","fa fa-hand-o-down","fa fa-hand-o-left","fa fa-hand-o-right","fa fa-hand-o-up","fa fa-hand-paper-o","fa fa-hand-peace-o","fa fa-hand-pointer-o","fa fa-hand-rock-o","fa fa-hand-scissors-o","fa fa-hand-spock-o","fa fa-hand-stop-o","fa fa-handshake-o","fa fa-hard-of-hearing","fa fa-hashtag","fa fa-hdd-o","fa fa-header","fa fa-headphones","fa fa-heart","fa fa-heart-o","fa fa-heartbeat","fa fa-history","fa fa-home","fa fa-hospital-o","fa fa-hotel","fa fa-hourglass","fa fa-hourglass-1","fa fa-hourglass-2","fa fa-hourglass-3","fa fa-hourglass-end","fa fa-hourglass-half","fa fa-hourglass-o","fa fa-hourglass-start","fa fa-houzz","fa fa-html5","fa fa-i-cursor","fa fa-id-badge","fa fa-id-card","fa fa-id-card-o","fa fa-ils","fa fa-image","fa fa-imdb","fa fa-inbox","fa fa-indent","fa fa-industry","fa fa-info","fa fa-info-circle","fa fa-inr","fa fa-instagram","fa fa-institution","fa fa-internet-explorer","fa fa-intersex","fa fa-ioxhost","fa fa-italic","fa fa-joomla","fa fa-jpy","fa fa-jsfiddle","fa fa-key","fa fa-keyboard-o","fa fa-krw","fa fa-language","fa fa-laptop","fa fa-lastfm","fa fa-lastfm-square","fa fa-leaf","fa fa-leanpub","fa fa-legal","fa fa-lemon-o","fa fa-level-down","fa fa-level-up","fa fa-life-bouy","fa fa-life-buoy","fa fa-life-ring","fa fa-life-saver","fa fa-lightbulb-o","fa fa-line-chart","fa fa-link","fa fa-linkedin","fa fa-linkedin-square","fa fa-linode","fa fa-linux","fa fa-list","fa fa-list-alt","fa fa-list-ol","fa fa-list-ul","fa fa-location-arrow","fa fa-lock","fa fa-long-arrow-down","fa fa-long-arrow-left","fa fa-long-arrow-right","fa fa-long-arrow-up","fa fa-low-vision","fa fa-magic","fa fa-magnet","fa fa-mail-forward","fa fa-mail-reply","fa fa-mail-reply-all","fa fa-male","fa fa-map","fa fa-map-marker","fa fa-map-o","fa fa-map-pin","fa fa-map-signs","fa fa-mars","fa fa-mars-double","fa fa-mars-stroke","fa fa-mars-stroke-h","fa fa-mars-stroke-v","fa fa-maxcdn","fa fa-meanpath","fa fa-medium","fa fa-medkit","fa fa-meetup","fa fa-meh-o","fa fa-mercury","fa fa-microchip","fa fa-microphone","fa fa-microphone-slash","fa fa-minus","fa fa-minus-circle","fa fa-minus-square","fa fa-minus-square-o","fa fa-mixcloud","fa fa-mobile","fa fa-mobile-phone","fa fa-modx","fa fa-money","fa fa-moon-o","fa fa-mortar-board","fa fa-motorcycle","fa fa-mouse-pointer","fa fa-music","fa fa-navicon","fa fa-neuter","fa fa-newspaper-o","fa fa-object-group","fa fa-object-ungroup","fa fa-odnoklassniki","fa fa-odnoklassniki-square","fa fa-opencart","fa fa-openid","fa fa-opera","fa fa-optin-monster","fa fa-outdent","fa fa-pagelines","fa fa-paint-brush","fa fa-paper-plane","fa fa-paper-plane-o","fa fa-paperclip","fa fa-paragraph","fa fa-paste","fa fa-pause","fa fa-pause-circle","fa fa-pause-circle-o","fa fa-paw","fa fa-paypal","fa fa-pencil","fa fa-pencil-square","fa fa-pencil-square-o","fa fa-percent","fa fa-phone","fa fa-phone-square","fa fa-photo","fa fa-picture-o","fa fa-pie-chart","fa fa-pied-piper","fa fa-pied-piper-alt","fa fa-pied-piper-pp","fa fa-pinterest","fa fa-pinterest-p","fa fa-pinterest-square","fa fa-plane","fa fa-play","fa fa-play-circle","fa fa-play-circle-o","fa fa-plug","fa fa-plus","fa fa-plus-circle","fa fa-plus-square","fa fa-plus-square-o","fa fa-podcast","fa fa-power-off","fa fa-print","fa fa-product-hunt","fa fa-puzzle-piece","fa fa-qq","fa fa-qrcode","fa fa-question","fa fa-question-circle","fa fa-question-circle-o","fa fa-quora","fa fa-quote-left","fa fa-quote-right","fa fa-ra","fa fa-random","fa fa-ravelry","fa fa-rebel","fa fa-recycle","fa fa-reddit","fa fa-reddit-alien","fa fa-reddit-square","fa fa-refresh","fa fa-registered","fa fa-remove","fa fa-renren","fa fa-reorder","fa fa-repeat","fa fa-reply","fa fa-reply-all","fa fa-resistance","fa fa-retweet","fa fa-rmb","fa fa-road","fa fa-rocket","fa fa-rotate-left","fa fa-rotate-right","fa fa-rouble","fa fa-rss","fa fa-rss-square","fa fa-rub","fa fa-ruble","fa fa-rupee","fa fa-s15","fa fa-safari","fa fa-save","fa fa-scissors","fa fa-scribd","fa fa-search","fa fa-search-minus","fa fa-search-plus","fa fa-sellsy","fa fa-send","fa fa-send-o","fa fa-server","fa fa-share","fa fa-share-alt","fa fa-share-alt-square","fa fa-share-square","fa fa-share-square-o","fa fa-shekel","fa fa-sheqel","fa fa-shield","fa fa-ship","fa fa-shirtsinbulk","fa fa-shopping-bag","fa fa-shopping-basket","fa fa-shopping-cart","fa fa-shower","fa fa-sign-in","fa fa-sign-language","fa fa-sign-out","fa fa-signal","fa fa-signing","fa fa-simplybuilt","fa fa-sitemap","fa fa-skyatlas","fa fa-skype","fa fa-slack","fa fa-sliders","fa fa-slideshare","fa fa-smile-o","fa fa-snapchat","fa fa-snapchat-ghost","fa fa-snapchat-square","fa fa-snowflake-o","fa fa-soccer-ball-o","fa fa-sort","fa fa-sort-alpha-asc","fa fa-sort-alpha-desc","fa fa-sort-amount-asc","fa fa-sort-amount-desc","fa fa-sort-asc","fa fa-sort-desc","fa fa-sort-down","fa fa-sort-numeric-asc","fa fa-sort-numeric-desc","fa fa-sort-up","fa fa-soundcloud","fa fa-space-shuttle","fa fa-spinner","fa fa-spoon","fa fa-spotify","fa fa-square","fa fa-square-o","fa fa-stack-exchange","fa fa-stack-overflow","fa fa-star","fa fa-star-half","fa fa-star-half-empty","fa fa-star-half-full","fa fa-star-half-o","fa fa-star-o","fa fa-steam","fa fa-steam-square","fa fa-step-backward","fa fa-step-forward","fa fa-stethoscope","fa fa-sticky-note","fa fa-sticky-note-o","fa fa-stop","fa fa-stop-circle","fa fa-stop-circle-o","fa fa-street-view","fa fa-strikethrough","fa fa-stumbleupon","fa fa-stumbleupon-circle","fa fa-subscript","fa fa-subway","fa fa-suitcase","fa fa-sun-o","fa fa-superpowers","fa fa-superscript","fa fa-support","fa fa-table","fa fa-tablet","fa fa-tachometer","fa fa-tag","fa fa-tags","fa fa-tasks","fa fa-taxi","fa fa-telegram","fa fa-television","fa fa-tencent-weibo","fa fa-terminal","fa fa-text-height","fa fa-text-width","fa fa-th","fa fa-th-large","fa fa-th-list","fa fa-themeisle","fa fa-thermometer","fa fa-thermometer-0","fa fa-thermometer-1","fa fa-thermometer-2","fa fa-thermometer-3","fa fa-thermometer-4","fa fa-thermometer-empty","fa fa-thermometer-full","fa fa-thermometer-half","fa fa-thermometer-quarter","fa fa-thermometer-three-quarters","fa fa-thumb-tack","fa fa-thumbs-down","fa fa-thumbs-o-down","fa fa-thumbs-o-up","fa fa-thumbs-up","fa fa-ticket","fa fa-times","fa fa-times-circle","fa fa-times-circle-o","fa fa-times-rectangle","fa fa-times-rectangle-o","fa fa-tint","fa fa-toggle-down","fa fa-toggle-left","fa fa-toggle-off","fa fa-toggle-on","fa fa-toggle-right","fa fa-toggle-up","fa fa-trademark","fa fa-train","fa fa-transgender","fa fa-transgender-alt","fa fa-trash","fa fa-trash-o","fa fa-tree","fa fa-trello","fa fa-tripadvisor","fa fa-trophy","fa fa-truck","fa fa-try","fa fa-tty","fa fa-tumblr","fa fa-tumblr-square","fa fa-turkish-lira","fa fa-tv","fa fa-twitch","fa fa-twitter","fa fa-twitter-square","fa fa-umbrella","fa fa-underline","fa fa-undo","fa fa-universal-access","fa fa-university","fa fa-unlink","fa fa-unlock","fa fa-unlock-alt","fa fa-unsorted","fa fa-upload","fa fa-usb","fa fa-usd","fa fa-user","fa fa-user-circle","fa fa-user-circle-o","fa fa-user-md","fa fa-user-o","fa fa-user-plus","fa fa-user-secret","fa fa-user-times","fa fa-users","fa fa-vcard","fa fa-vcard-o","fa fa-venus","fa fa-venus-double","fa fa-venus-mars","fa fa-viacoin","fa fa-viadeo","fa fa-viadeo-square","fa fa-video-camera","fa fa-vimeo","fa fa-vimeo-square","fa fa-vine","fa fa-vk","fa fa-volume-control-phone","fa fa-volume-down","fa fa-volume-off","fa fa-volume-up","fa fa-warning","fa fa-wechat","fa fa-weibo","fa fa-weixin","fa fa-whatsapp","fa fa-wheelchair","fa fa-wheelchair-alt","fa fa-wifi","fa fa-wikipedia-w","fa fa-window-close","fa fa-window-close-o","fa fa-window-maximize","fa fa-window-minimize","fa fa-window-restore","fa fa-windows","fa fa-won","fa fa-wordpress","fa fa-wpbeginner","fa fa-wpexplorer","fa fa-wpforms","fa fa-wrench","fa fa-xing","fa fa-xing-square","fa fa-y-combinator","fa fa-y-combinator-square","fa fa-yahoo","fa fa-yc","fa fa-yc-square","fa fa-yelp","fa fa-yen","fa fa-yoast","fa fa-youtube","fa fa-youtube-play","fa fa-youtube-square","icon ion-alert","icon ion-alert-circled","icon ion-android-add","icon ion-android-add-circle","icon ion-android-alarm-clock","icon ion-android-alert","icon ion-android-apps","icon ion-android-archive","icon ion-android-arrow-back","icon ion-android-arrow-down","icon ion-android-arrow-dropdown","icon ion-android-arrow-dropdown-circle","icon ion-android-arrow-dropleft","icon ion-android-arrow-dropleft-circle","icon ion-android-arrow-dropright","icon ion-android-arrow-dropright-circle","icon ion-android-arrow-dropup","icon ion-android-arrow-dropup-circle","icon ion-android-arrow-forward","icon ion-android-arrow-up","icon ion-android-attach","icon ion-android-bar","icon ion-android-bicycle","icon ion-android-boat","icon ion-android-bookmark","icon ion-android-bulb","icon ion-android-bus","icon ion-android-calendar","icon ion-android-call","icon ion-android-camera","icon ion-android-cancel","icon ion-android-car","icon ion-android-cart","icon ion-android-chat","icon ion-android-checkbox","icon ion-android-checkbox-blank","icon ion-android-checkbox-outline","icon ion-android-checkbox-outline-blank","icon ion-android-checkmark-circle","icon ion-android-clipboard","icon ion-android-close","icon ion-android-cloud","icon ion-android-cloud-circle","icon ion-android-cloud-done","icon ion-android-cloud-outline","icon ion-android-color-palette","icon ion-android-compass","icon ion-android-contact","icon ion-android-contacts","icon ion-android-contract","icon ion-android-create","icon ion-android-delete","icon ion-android-desktop","icon ion-android-document","icon ion-android-done","icon ion-android-done-all","icon ion-android-download","icon ion-android-drafts","icon ion-android-exit","icon ion-android-expand","icon ion-android-favorite","icon ion-android-favorite-outline","icon ion-android-film","icon ion-android-folder","icon ion-android-folder-open","icon ion-android-funnel","icon ion-android-globe","icon ion-android-hand","icon ion-android-hangout","icon ion-android-happy","icon ion-android-home","icon ion-android-image","icon ion-android-laptop","icon ion-android-list","icon ion-android-locate","icon ion-android-lock","icon ion-android-mail","icon ion-android-map","icon ion-android-menu","icon ion-android-microphone","icon ion-android-microphone-off","icon ion-android-more-horizontal","icon ion-android-more-vertical","icon ion-android-navigate","icon ion-android-notifications","icon ion-android-notifications-none","icon ion-android-notifications-off","icon ion-android-open","icon ion-android-options","icon ion-android-people","icon ion-android-person","icon ion-android-person-add","icon ion-android-phone-landscape","icon ion-android-phone-portrait","icon ion-android-pin","icon ion-android-plane","icon ion-android-playstore","icon ion-android-print","icon ion-android-radio-button-off","icon ion-android-radio-button-on","icon ion-android-refresh","icon ion-android-remove","icon ion-android-remove-circle","icon ion-android-restaurant","icon ion-android-sad","icon ion-android-search","icon ion-android-send","icon ion-android-settings","icon ion-android-share","icon ion-android-share-alt","icon ion-android-star","icon ion-android-star-half","icon ion-android-star-outline","icon ion-android-stopwatch","icon ion-android-subway","icon ion-android-sunny","icon ion-android-sync","icon ion-android-textsms","icon ion-android-time","icon ion-android-train","icon ion-android-unlock","icon ion-android-upload","icon ion-android-volume-down","icon ion-android-volume-mute","icon ion-android-volume-off","icon ion-android-volume-up","icon ion-android-walk","icon ion-android-warning","icon ion-android-watch","icon ion-android-wifi","icon ion-aperture","icon ion-archive","icon ion-arrow-down-a","icon ion-arrow-down-b","icon ion-arrow-down-c","icon ion-arrow-expand","icon ion-arrow-graph-down-left","icon ion-arrow-graph-down-right","icon ion-arrow-graph-up-left","icon ion-arrow-graph-up-right","icon ion-arrow-left-a","icon ion-arrow-left-b","icon ion-arrow-left-c","icon ion-arrow-move","icon ion-arrow-resize","icon ion-arrow-return-left","icon ion-arrow-return-right","icon ion-arrow-right-a","icon ion-arrow-right-b","icon ion-arrow-right-c","icon ion-arrow-shrink","icon ion-arrow-swap","icon ion-arrow-up-a","icon ion-arrow-up-b","icon ion-arrow-up-c","icon ion-asterisk","icon ion-at","icon ion-backspace","icon ion-backspace-outline","icon ion-bag","icon ion-battery-charging","icon ion-battery-empty","icon ion-battery-full","icon ion-battery-half","icon ion-battery-low","icon ion-beaker","icon ion-beer","icon ion-bluetooth","icon ion-bonfire","icon ion-bookmark","icon ion-bowtie","icon ion-briefcase","icon ion-bug","icon ion-calculator","icon ion-calendar","icon ion-camera","icon ion-card","icon ion-cash","icon ion-chatbox","icon ion-chatbox-working","icon ion-chatboxes","icon ion-chatbubble","icon ion-chatbubble-working","icon ion-chatbubbles","icon ion-checkmark","icon ion-checkmark-circled","icon ion-checkmark-round","icon ion-chevron-down","icon ion-chevron-left","icon ion-chevron-right","icon ion-chevron-up","icon ion-clipboard","icon ion-clock","icon ion-close","icon ion-close-circled","icon ion-close-round","icon ion-closed-captioning","icon ion-cloud","icon ion-code","icon ion-code-download","icon ion-code-working","icon ion-coffee","icon ion-compass","icon ion-compose","icon ion-connection-bars","icon ion-contrast","icon ion-crop","icon ion-cube","icon ion-disc","icon ion-document","icon ion-document-text","icon ion-drag","icon ion-earth","icon ion-easel","icon ion-edit","icon ion-egg","icon ion-eject","icon ion-email","icon ion-email-unread","icon ion-erlenmeyer-flask","icon ion-erlenmeyer-flask-bubbles","icon ion-eye","icon ion-eye-disabled","icon ion-female","icon ion-filing","icon ion-film-marker","icon ion-fireball","icon ion-flag","icon ion-flame","icon ion-flash","icon ion-flash-off","icon ion-folder","icon ion-fork","icon ion-fork-repo","icon ion-forward","icon ion-funnel","icon ion-gear-a","icon ion-gear-b","icon ion-grid","icon ion-hammer","icon ion-happy","icon ion-happy-outline","icon ion-headphone","icon ion-heart","icon ion-heart-broken","icon ion-help","icon ion-help-buoy","icon ion-help-circled","icon ion-home","icon ion-icecream","icon ion-image","icon ion-images","icon ion-information","icon ion-information-circled","icon ion-ionic","icon ion-ios-alarm","icon ion-ios-alarm-outline","icon ion-ios-albums","icon ion-ios-albums-outline","icon ion-ios-americanfootball","icon ion-ios-americanfootball-outline","icon ion-ios-analytics","icon ion-ios-analytics-outline","icon ion-ios-arrow-back","icon ion-ios-arrow-down","icon ion-ios-arrow-forward","icon ion-ios-arrow-left","icon ion-ios-arrow-right","icon ion-ios-arrow-thin-down","icon ion-ios-arrow-thin-left","icon ion-ios-arrow-thin-right","icon ion-ios-arrow-thin-up","icon ion-ios-arrow-up","icon ion-ios-at","icon ion-ios-at-outline","icon ion-ios-barcode","icon ion-ios-barcode-outline","icon ion-ios-baseball","icon ion-ios-baseball-outline","icon ion-ios-basketball","icon ion-ios-basketball-outline","icon ion-ios-bell","icon ion-ios-bell-outline","icon ion-ios-body","icon ion-ios-body-outline","icon ion-ios-bolt","icon ion-ios-bolt-outline","icon ion-ios-book","icon ion-ios-book-outline","icon ion-ios-bookmarks","icon ion-ios-bookmarks-outline","icon ion-ios-box","icon ion-ios-box-outline","icon ion-ios-briefcase","icon ion-ios-briefcase-outline","icon ion-ios-browsers","icon ion-ios-browsers-outline","icon ion-ios-calculator","icon ion-ios-calculator-outline","icon ion-ios-calendar","icon ion-ios-calendar-outline","icon ion-ios-camera","icon ion-ios-camera-outline","icon ion-ios-cart","icon ion-ios-cart-outline","icon ion-ios-chatboxes","icon ion-ios-chatboxes-outline","icon ion-ios-chatbubble","icon ion-ios-chatbubble-outline","icon ion-ios-checkmark","icon ion-ios-checkmark-empty","icon ion-ios-checkmark-outline","icon ion-ios-circle-filled","icon ion-ios-circle-outline","icon ion-ios-clock","icon ion-ios-clock-outline","icon ion-ios-close","icon ion-ios-close-empty","icon ion-ios-close-outline","icon ion-ios-cloud","icon ion-ios-cloud-download","icon ion-ios-cloud-download-outline","icon ion-ios-cloud-outline","icon ion-ios-cloud-upload","icon ion-ios-cloud-upload-outline","icon ion-ios-cloudy","icon ion-ios-cloudy-night","icon ion-ios-cloudy-night-outline","icon ion-ios-cloudy-outline","icon ion-ios-cog","icon ion-ios-cog-outline","icon ion-ios-color-filter","icon ion-ios-color-filter-outline","icon ion-ios-color-wand","icon ion-ios-color-wand-outline","icon ion-ios-compose","icon ion-ios-compose-outline","icon ion-ios-contact","icon ion-ios-contact-outline","icon ion-ios-copy","icon ion-ios-copy-outline","icon ion-ios-crop","icon ion-ios-crop-strong","icon ion-ios-download","icon ion-ios-download-outline","icon ion-ios-drag","icon ion-ios-email","icon ion-ios-email-outline","icon ion-ios-eye","icon ion-ios-eye-outline","icon ion-ios-fastforward","icon ion-ios-fastforward-outline","icon ion-ios-filing","icon ion-ios-filing-outline","icon ion-ios-film","icon ion-ios-film-outline","icon ion-ios-flag","icon ion-ios-flag-outline","icon ion-ios-flame","icon ion-ios-flame-outline","icon ion-ios-flask","icon ion-ios-flask-outline","icon ion-ios-flower","icon ion-ios-flower-outline","icon ion-ios-folder","icon ion-ios-folder-outline","icon ion-ios-football","icon ion-ios-football-outline","icon ion-ios-game-controller-a","icon ion-ios-game-controller-a-outline","icon ion-ios-game-controller-b","icon ion-ios-game-controller-b-outline","icon ion-ios-gear","icon ion-ios-gear-outline","icon ion-ios-glasses","icon ion-ios-glasses-outline","icon ion-ios-grid-view","icon ion-ios-grid-view-outline","icon ion-ios-heart","icon ion-ios-heart-outline","icon ion-ios-help","icon ion-ios-help-empty","icon ion-ios-help-outline","icon ion-ios-home","icon ion-ios-home-outline","icon ion-ios-infinite","icon ion-ios-infinite-outline","icon ion-ios-information","icon ion-ios-information-empty","icon ion-ios-information-outline","icon ion-ios-ionic-outline","icon ion-ios-keypad","icon ion-ios-keypad-outline","icon ion-ios-lightbulb","icon ion-ios-lightbulb-outline","icon ion-ios-list","icon ion-ios-list-outline","icon ion-ios-location","icon ion-ios-location-outline","icon ion-ios-locked","icon ion-ios-locked-outline","icon ion-ios-loop","icon ion-ios-loop-strong","icon ion-ios-medical","icon ion-ios-medical-outline","icon ion-ios-medkit","icon ion-ios-medkit-outline","icon ion-ios-mic","icon ion-ios-mic-off","icon ion-ios-mic-outline","icon ion-ios-minus","icon ion-ios-minus-empty","icon ion-ios-minus-outline","icon ion-ios-monitor","icon ion-ios-monitor-outline","icon ion-ios-moon","icon ion-ios-moon-outline","icon ion-ios-more","icon ion-ios-more-outline","icon ion-ios-musical-note","icon ion-ios-musical-notes","icon ion-ios-navigate","icon ion-ios-navigate-outline","icon ion-ios-nutrition","icon ion-ios-nutrition-outline","icon ion-ios-paper","icon ion-ios-paper-outline","icon ion-ios-paperplane","icon ion-ios-paperplane-outline","icon ion-ios-partlysunny","icon ion-ios-partlysunny-outline","icon ion-ios-pause","icon ion-ios-pause-outline","icon ion-ios-paw","icon ion-ios-paw-outline","icon ion-ios-people","icon ion-ios-people-outline","icon ion-ios-person","icon ion-ios-person-outline","icon ion-ios-personadd","icon ion-ios-personadd-outline","icon ion-ios-photos","icon ion-ios-photos-outline","icon ion-ios-pie","icon ion-ios-pie-outline","icon ion-ios-pint","icon ion-ios-pint-outline","icon ion-ios-play","icon ion-ios-play-outline","icon ion-ios-plus","icon ion-ios-plus-empty","icon ion-ios-plus-outline","icon ion-ios-pricetag","icon ion-ios-pricetag-outline","icon ion-ios-pricetags","icon ion-ios-pricetags-outline","icon ion-ios-printer","icon ion-ios-printer-outline","icon ion-ios-pulse","icon ion-ios-pulse-strong","icon ion-ios-rainy","icon ion-ios-rainy-outline","icon ion-ios-recording","icon ion-ios-recording-outline","icon ion-ios-redo","icon ion-ios-redo-outline","icon ion-ios-refresh","icon ion-ios-refresh-empty","icon ion-ios-refresh-outline","icon ion-ios-reload","icon ion-ios-reverse-camera","icon ion-ios-reverse-camera-outline","icon ion-ios-rewind","icon ion-ios-rewind-outline","icon ion-ios-rose","icon ion-ios-rose-outline","icon ion-ios-search","icon ion-ios-search-strong","icon ion-ios-settings","icon ion-ios-settings-strong","icon ion-ios-shuffle","icon ion-ios-shuffle-strong","icon ion-ios-skipbackward","icon ion-ios-skipbackward-outline","icon ion-ios-skipforward","icon ion-ios-skipforward-outline","icon ion-ios-snowy","icon ion-ios-speedometer","icon ion-ios-speedometer-outline","icon ion-ios-star","icon ion-ios-star-half","icon ion-ios-star-outline","icon ion-ios-stopwatch","icon ion-ios-stopwatch-outline","icon ion-ios-sunny","icon ion-ios-sunny-outline","icon ion-ios-telephone","icon ion-ios-telephone-outline","icon ion-ios-tennisball","icon ion-ios-tennisball-outline","icon ion-ios-thunderstorm","icon ion-ios-thunderstorm-outline","icon ion-ios-time","icon ion-ios-time-outline","icon ion-ios-timer","icon ion-ios-timer-outline","icon ion-ios-toggle","icon ion-ios-toggle-outline","icon ion-ios-trash","icon ion-ios-trash-outline","icon ion-ios-undo","icon ion-ios-undo-outline","icon ion-ios-unlocked","icon ion-ios-unlocked-outline","icon ion-ios-upload","icon ion-ios-upload-outline","icon ion-ios-videocam","icon ion-ios-videocam-outline","icon ion-ios-volume-high","icon ion-ios-volume-low","icon ion-ios-wineglass","icon ion-ios-wineglass-outline","icon ion-ios-world","icon ion-ios-world-outline","icon ion-ipad","icon ion-iphone","icon ion-ipod","icon ion-jet","icon ion-key","icon ion-knife","icon ion-laptop","icon ion-leaf","icon ion-levels","icon ion-lightbulb","icon ion-link","icon ion-load-a","icon ion-load-b","icon ion-load-c","icon ion-load-d","icon ion-location","icon ion-lock-combination","icon ion-locked","icon ion-log-in","icon ion-log-out","icon ion-loop","icon ion-magnet","icon ion-male","icon ion-man","icon ion-map","icon ion-medkit","icon ion-merge","icon ion-mic-a","icon ion-mic-b","icon ion-mic-c","icon ion-minus","icon ion-minus-circled","icon ion-minus-round","icon ion-model-s","icon ion-monitor","icon ion-more","icon ion-mouse","icon ion-music-note","icon ion-navicon","icon ion-navicon-round","icon ion-navigate","icon ion-network","icon ion-no-smoking","icon ion-nuclear","icon ion-outlet","icon ion-paintbrush","icon ion-paintbucket","icon ion-paper-airplane","icon ion-paperclip","icon ion-pause","icon ion-person","icon ion-person-add","icon ion-person-stalker","icon ion-pie-graph","icon ion-pin","icon ion-pinpoint","icon ion-pizza","icon ion-plane","icon ion-planet","icon ion-play","icon ion-playstation","icon ion-plus","icon ion-plus-circled","icon ion-plus-round","icon ion-podium","icon ion-pound","icon ion-power","icon ion-pricetag","icon ion-pricetags","icon ion-printer","icon ion-pull-request","icon ion-qr-scanner","icon ion-quote","icon ion-radio-waves","icon ion-record","icon ion-refresh","icon ion-reply","icon ion-reply-all","icon ion-ribbon-a","icon ion-ribbon-b","icon ion-sad","icon ion-sad-outline","icon ion-scissors","icon ion-search","icon ion-settings","icon ion-share","icon ion-shuffle","icon ion-skip-backward","icon ion-skip-forward","icon ion-social-android","icon ion-social-android-outline","icon ion-social-angular","icon ion-social-angular-outline","icon ion-social-apple","icon ion-social-apple-outline","icon ion-social-bitcoin","icon ion-social-bitcoin-outline","icon ion-social-buffer","icon ion-social-buffer-outline","icon ion-social-chrome","icon ion-social-chrome-outline","icon ion-social-codepen","icon ion-social-codepen-outline","icon ion-social-css3","icon ion-social-css3-outline","icon ion-social-designernews","icon ion-social-designernews-outline","icon ion-social-dribbble","icon ion-social-dribbble-outline","icon ion-social-dropbox","icon ion-social-dropbox-outline","icon ion-social-euro","icon ion-social-euro-outline","icon ion-social-facebook","icon ion-social-facebook-outline","icon ion-social-foursquare","icon ion-social-foursquare-outline","icon ion-social-freebsd-devil","icon ion-social-github","icon ion-social-github-outline","icon ion-social-google","icon ion-social-google-outline","icon ion-social-googleplus","icon ion-social-googleplus-outline","icon ion-social-hackernews","icon ion-social-hackernews-outline","icon ion-social-html5","icon ion-social-html5-outline","icon ion-social-instagram","icon ion-social-instagram-outline","icon ion-social-javascript","icon ion-social-javascript-outline","icon ion-social-linkedin","icon ion-social-linkedin-outline","icon ion-social-markdown","icon ion-social-nodejs","icon ion-social-octocat","icon ion-social-pinterest","icon ion-social-pinterest-outline","icon ion-social-python","icon ion-social-reddit","icon ion-social-reddit-outline","icon ion-social-rss","icon ion-social-rss-outline","icon ion-social-sass","icon ion-social-skype","icon ion-social-skype-outline","icon ion-social-snapchat","icon ion-social-snapchat-outline","icon ion-social-tumblr","icon ion-social-tumblr-outline","icon ion-social-tux","icon ion-social-twitch","icon ion-social-twitch-outline","icon ion-social-twitter","icon ion-social-twitter-outline","icon ion-social-usd","icon ion-social-usd-outline","icon ion-social-vimeo","icon ion-social-vimeo-outline","icon ion-social-whatsapp","icon ion-social-whatsapp-outline","icon ion-social-windows","icon ion-social-windows-outline","icon ion-social-wordpress","icon ion-social-wordpress-outline","icon ion-social-yahoo","icon ion-social-yahoo-outline","icon ion-social-yen","icon ion-social-yen-outline","icon ion-social-youtube","icon ion-social-youtube-outline","icon ion-soup-can","icon ion-soup-can-outline","icon ion-speakerphone","icon ion-speedometer","icon ion-spoon","icon ion-star","icon ion-stats-bars","icon ion-steam","icon ion-stop","icon ion-thermometer","icon ion-thumbsdown","icon ion-thumbsup","icon ion-toggle","icon ion-toggle-filled","icon ion-transgender","icon ion-trash-a","icon ion-trash-b","icon ion-trophy","icon ion-tshirt","icon ion-tshirt-outline","icon ion-umbrella","icon ion-university","icon ion-unlocked","icon ion-upload","icon ion-usb","icon ion-videocamera","icon ion-volume-high","icon ion-volume-low","icon ion-volume-medium","icon ion-volume-mute","icon ion-wand","icon ion-waterdrop","icon ion-wifi","icon ion-wineglass","icon ion-woman","icon ion-wrench","icon ion-xbox"];
    });
