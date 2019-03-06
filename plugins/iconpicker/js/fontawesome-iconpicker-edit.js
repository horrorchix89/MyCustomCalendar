/*!
 * Font Awesome Icon Picker
 * https://farbelous.github.io/fontawesome-iconpicker/
 *
 * @author Javi Aguilar, itsjavi.com
 * @license MIT License
 * @see https://github.com/farbelous/fontawesome-iconpicker/blob/master/LICENSE
 */


(function(e) {
    if (typeof define === "function" && define.amd) {
        define([ "jquery" ], e);
    } else {
        e(jQuery);
    }
})(function(j) {
    j.ui = j.ui || {};
    var e = j.ui.version = "1.12.1";
    (function() {
        var r, y = Math.max, x = Math.abs, s = /left|center|right/, i = /top|center|bottom/, f = /[\+\-]\d+(\.[\d]+)?%?/, l = /^\w+/, c = /%$/, a = j.fn.pos;
        function q(e, a, t) {
            return [ parseFloat(e[0]) * (c.test(e[0]) ? a / 100 : 1), parseFloat(e[1]) * (c.test(e[1]) ? t / 100 : 1) ];
        }
        function C(e, a) {
            return parseInt(j.css(e, a), 10) || 0;
        }
        function t(e) {
            var a = e[0];
            if (a.nodeType === 9) {
                return {
                    width: e.width(),
                    height: e.height(),
                    offset: {
                        top: 0,
                        left: 0
                    }
                };
            }
            if (j.isWindow(a)) {
                return {
                    width: e.width(),
                    height: e.height(),
                    offset: {
                        top: e.scrollTop(),
                        left: e.scrollLeft()
                    }
                };
            }
            if (a.preventDefault) {
                return {
                    width: 0,
                    height: 0,
                    offset: {
                        top: a.pageY,
                        left: a.pageX
                    }
                };
            }
            return {
                width: e.outerWidth(),
                height: e.outerHeight(),
                offset: e.offset()
            };
        }
        j.pos = {
            scrollbarWidth: function() {
                if (r !== undefined) {
                    return r;
                }
                var e, a, t = j("<div " + "style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'>" + "<div style='height:100px;width:auto;'></div></div>"), s = t.children()[0];
                j("body").append(t);
                e = s.offsetWidth;
                t.css("overflow", "scroll");
                a = s.offsetWidth;
                if (e === a) {
                    a = t[0].clientWidth;
                }
                t.remove();
                return r = e - a;
            },
            getScrollInfo: function(e) {
                var a = e.isWindow || e.isDocument ? "" : e.element.css("overflow-x"), t = e.isWindow || e.isDocument ? "" : e.element.css("overflow-y"), s = a === "scroll" || a === "auto" && e.width < e.element[0].scrollWidth, r = t === "scroll" || t === "auto" && e.height < e.element[0].scrollHeight;
                return {
                    width: r ? j.pos.scrollbarWidth() : 0,
                    height: s ? j.pos.scrollbarWidth() : 0
                };
            },
            getWithinInfo: function(e) {
                var a = j(e || window), t = j.isWindow(a[0]), s = !!a[0] && a[0].nodeType === 9, r = !t && !s;
                return {
                    element: a,
                    isWindow: t,
                    isDocument: s,
                    offset: r ? j(e).offset() : {
                        left: 0,
                        top: 0
                    },
                    scrollLeft: a.scrollLeft(),
                    scrollTop: a.scrollTop(),
                    width: a.outerWidth(),
                    height: a.outerHeight()
                };
            }
        };
        j.fn.pos = function(h) {
            if (!h || !h.of) {
                return a.apply(this, arguments);
            }
            h = j.extend({}, h);
            var m, p, d, u, T, e, g = j(h.of), b = j.pos.getWithinInfo(h.within), k = j.pos.getScrollInfo(b), w = (h.collision || "flip").split(" "), v = {};
            e = t(g);
            if (g[0].preventDefault) {
                h.at = "left top";
            }
            p = e.width;
            d = e.height;
            u = e.offset;
            T = j.extend({}, u);
            j.each([ "my", "at" ], function() {
                var e = (h[this] || "").split(" "), a, t;
                if (e.length === 1) {
                    e = s.test(e[0]) ? e.concat([ "center" ]) : i.test(e[0]) ? [ "center" ].concat(e) : [ "center", "center" ];
                }
                e[0] = s.test(e[0]) ? e[0] : "center";
                e[1] = i.test(e[1]) ? e[1] : "center";
                a = f.exec(e[0]);
                t = f.exec(e[1]);
                v[this] = [ a ? a[0] : 0, t ? t[0] : 0 ];
                h[this] = [ l.exec(e[0])[0], l.exec(e[1])[0] ];
            });
            if (w.length === 1) {
                w[1] = w[0];
            }
            if (h.at[0] === "right") {
                T.left += p;
            } else if (h.at[0] === "center") {
                T.left += p / 2;
            }
            if (h.at[1] === "bottom") {
                T.top += d;
            } else if (h.at[1] === "center") {
                T.top += d / 2;
            }
            m = q(v.at, p, d);
            T.left += m[0];
            T.top += m[1];
            return this.each(function() {
                var t, e, f = j(this), l = f.outerWidth(), c = f.outerHeight(), a = C(this, "marginLeft"), s = C(this, "marginTop"), r = l + a + C(this, "marginRight") + k.width, i = c + s + C(this, "marginBottom") + k.height, o = j.extend({}, T), n = q(v.my, f.outerWidth(), f.outerHeight());
                if (h.my[0] === "right") {
                    o.left -= l;
                } else if (h.my[0] === "center") {
                    o.left -= l / 2;
                }
                if (h.my[1] === "bottom") {
                    o.top -= c;
                } else if (h.my[1] === "center") {
                    o.top -= c / 2;
                }
                o.left += n[0];
                o.top += n[1];
                t = {
                    marginLeft: a,
                    marginTop: s
                };
                j.each([ "left", "top" ], function(e, a) {
                    if (j.ui.pos[w[e]]) {
                        j.ui.pos[w[e]][a](o, {
                            targetWidth: p,
                            targetHeight: d,
                            elemWidth: l,
                            elemHeight: c,
                            collisionPosition: t,
                            collisionWidth: r,
                            collisionHeight: i,
                            offset: [ m[0] + n[0], m[1] + n[1] ],
                            my: h.my,
                            at: h.at,
                            within: b,
                            elem: f
                        });
                    }
                });
                if (h.using) {
                    e = function(e) {
                        var a = u.left - o.left, t = a + p - l, s = u.top - o.top, r = s + d - c, i = {
                            target: {
                                element: g,
                                left: u.left,
                                top: u.top,
                                width: p,
                                height: d
                            },
                            element: {
                                element: f,
                                left: o.left,
                                top: o.top,
                                width: l,
                                height: c
                            },
                            horizontal: t < 0 ? "left" : a > 0 ? "right" : "center",
                            vertical: r < 0 ? "top" : s > 0 ? "bottom" : "middle"
                        };
                        if (p < l && x(a + t) < p) {
                            i.horizontal = "center";
                        }
                        if (d < c && x(s + r) < d) {
                            i.vertical = "middle";
                        }
                        if (y(x(a), x(t)) > y(x(s), x(r))) {
                            i.important = "horizontal";
                        } else {
                            i.important = "vertical";
                        }
                        h.using.call(this, e, i);
                    };
                }
                f.offset(j.extend(o, {
                    using: e
                }));
            });
        };
        j.ui.pos = {
            _trigger: function(e, a, t, s) {
                if (a.elem) {
                    a.elem.trigger({
                        type: t,
                        position: e,
                        positionData: a,
                        triggered: s
                    });
                }
            },
            fit: {
                left: function(e, a) {
                    j.ui.pos._trigger(e, a, "posCollide", "fitLeft");
                    var t = a.within, s = t.isWindow ? t.scrollLeft : t.offset.left, r = t.width, i = e.left - a.collisionPosition.marginLeft, f = s - i, l = i + a.collisionWidth - r - s, c;
                    if (a.collisionWidth > r) {
                        if (f > 0 && l <= 0) {
                            c = e.left + f + a.collisionWidth - r - s;
                            e.left += f - c;
                        } else if (l > 0 && f <= 0) {
                            e.left = s;
                        } else {
                            if (f > l) {
                                e.left = s + r - a.collisionWidth;
                            } else {
                                e.left = s;
                            }
                        }
                    } else if (f > 0) {
                        e.left += f;
                    } else if (l > 0) {
                        e.left -= l;
                    } else {
                        e.left = y(e.left - i, e.left);
                    }
                    j.ui.pos._trigger(e, a, "posCollided", "fitLeft");
                },
                top: function(e, a) {
                    j.ui.pos._trigger(e, a, "posCollide", "fitTop");
                    var t = a.within, s = t.isWindow ? t.scrollTop : t.offset.top, r = a.within.height, i = e.top - a.collisionPosition.marginTop, f = s - i, l = i + a.collisionHeight - r - s, c;
                    if (a.collisionHeight > r) {
                        if (f > 0 && l <= 0) {
                            c = e.top + f + a.collisionHeight - r - s;
                            e.top += f - c;
                        } else if (l > 0 && f <= 0) {
                            e.top = s;
                        } else {
                            if (f > l) {
                                e.top = s + r - a.collisionHeight;
                            } else {
                                e.top = s;
                            }
                        }
                    } else if (f > 0) {
                        e.top += f;
                    } else if (l > 0) {
                        e.top -= l;
                    } else {
                        e.top = y(e.top - i, e.top);
                    }
                    j.ui.pos._trigger(e, a, "posCollided", "fitTop");
                }
            },
            flip: {
                left: function(e, a) {
                    j.ui.pos._trigger(e, a, "posCollide", "flipLeft");
                    var t = a.within, s = t.offset.left + t.scrollLeft, r = t.width, i = t.isWindow ? t.scrollLeft : t.offset.left, f = e.left - a.collisionPosition.marginLeft, l = f - i, c = f + a.collisionWidth - r - i, o = a.my[0] === "left" ? -a.elemWidth : a.my[0] === "right" ? a.elemWidth : 0, n = a.at[0] === "left" ? a.targetWidth : a.at[0] === "right" ? -a.targetWidth : 0, h = -2 * a.offset[0], m, p;
                    if (l < 0) {
                        m = e.left + o + n + h + a.collisionWidth - r - s;
                        if (m < 0 || m < x(l)) {
                            e.left += o + n + h;
                        }
                    } else if (c > 0) {
                        p = e.left - a.collisionPosition.marginLeft + o + n + h - i;
                        if (p > 0 || x(p) < c) {
                            e.left += o + n + h;
                        }
                    }
                    j.ui.pos._trigger(e, a, "posCollided", "flipLeft");
                },
                top: function(e, a) {
                    j.ui.pos._trigger(e, a, "posCollide", "flipTop");
                    var t = a.within, s = t.offset.top + t.scrollTop, r = t.height, i = t.isWindow ? t.scrollTop : t.offset.top, f = e.top - a.collisionPosition.marginTop, l = f - i, c = f + a.collisionHeight - r - i, o = a.my[1] === "top", n = o ? -a.elemHeight : a.my[1] === "bottom" ? a.elemHeight : 0, h = a.at[1] === "top" ? a.targetHeight : a.at[1] === "bottom" ? -a.targetHeight : 0, m = -2 * a.offset[1], p, d;
                    if (l < 0) {
                        d = e.top + n + h + m + a.collisionHeight - r - s;
                        if (d < 0 || d < x(l)) {
                            e.top += n + h + m;
                        }
                    } else if (c > 0) {
                        p = e.top - a.collisionPosition.marginTop + n + h + m - i;
                        if (p > 0 || x(p) < c) {
                            e.top += n + h + m;
                        }
                    }
                    j.ui.pos._trigger(e, a, "posCollided", "flipTop");
                }
            },
            flipfit: {
                left: function() {
                    j.ui.pos.flip.left.apply(this, arguments);
                    j.ui.pos.fit.left.apply(this, arguments);
                },
                top: function() {
                    j.ui.pos.flip.top.apply(this, arguments);
                    j.ui.pos.fit.top.apply(this, arguments);
                }
            }
        };
        (function() {
            var e, a, t, s, r, i = document.getElementsByTagName("body")[0], f = document.createElement("div");
            e = document.createElement(i ? "div" : "body");
            t = {
                visibility: "hidden",
                width: 0,
                height: 0,
                border: 0,
                margin: 0,
                background: "none"
            };
            if (i) {
                j.extend(t, {
                    position: "absolute",
                    left: "-1000px",
                    top: "-1000px"
                });
            }
            for (r in t) {
                e.style[r] = t[r];
            }
            e.appendChild(f);
            a = i || document.documentElement;
            a.insertBefore(e, a.firstChild);
            f.style.cssText = "position: absolute; left: 10.7432222px;";
            s = j(f).offset().left;
            j.support.offsetFractions = s > 10 && s < 11;
            e.innerHTML = "";
            a.removeChild(e);
        })();
    })();
    var a = j.ui.position;
});

(function(e) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        define([ "jquery" ], e);
    } else if (window.jQuery && !window.jQuery.fn.iconpicker) {
        e(window.jQuery);
    }
})(function(c) {
    "use strict";
    var f = {
        isEmpty: function(e) {
            return e === false || e === "" || e === null || e === undefined;
        },
        isEmptyObject: function(e) {
            return this.isEmpty(e) === true || e.length === 0;
        },
        isElement: function(e) {
            return c(e).length > 0;
        },
        isString: function(e) {
            return typeof e === "string" || e instanceof String;
        },
        isArray: function(e) {
            return c.isArray(e);
        },
        inArray: function(e, a) {
            return c.inArray(e, a) !== -1;
        },
        throwError: function(e) {
            throw "Font Awesome Icon Picker Exception: " + e;
        }
    };
    var t = function(e, a) {
        this._id = t._idCounter++;
        this.element = c(e).addClass("iconpicker-element");
        this._trigger("iconpickerCreate", {
            iconpickerValue: this.iconpickerValue
        });
        this.options = c.extend({}, t.defaultOptions, this.element.data(), a);
        this.options.templates = c.extend({}, t.defaultOptions.templates, this.options.templates);
        this.options.originalPlacement = this.options.placement;
        this.container = f.isElement(this.options.container) ? c(this.options.container) : false;
        if (this.container === false) {
            if (this.element.is(".dropdown-toggle")) {
                this.container = c("~ .dropdown-menu:first", this.element);
            } else {
                this.container = this.element.is("input,textarea,button,.btn") ? this.element.parent() : this.element;
            }
        }
        this.container.addClass("iconpicker-container");
        if (this.isDropdownMenu()) {
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
        this._trigger("iconpickerCreated", {
            iconpickerValue: this.iconpickerValue
        });
    };
    t._idCounter = 0;
    t.defaultOptions = {
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
            iconpickerItem: '<a role="button" href="javascript:;" class="iconpicker-item"><i></i></a>'
        }
    };
    t.batch = function(e, a) {
        var t = Array.prototype.slice.call(arguments, 2);
        return c(e).each(function() {
            var e = c(this).data("iconpicker");
            if (!!e) {
                e[a].apply(e, t);
            }
        });
    };
    t.prototype = {
        constructor: t,
        options: {},
        _id: 0,
        _trigger: function(e, a) {
            a = a || {};
            this.element.trigger(c.extend({
                type: e,
                iconpickerInstance: this
            }, a));
        },
        _createPopover: function() {
            this.popover = c(this.options.templates.popover);
            var e = this.popover.find(".popover-title");
            if (!!this.options.title) {
                e.append(c('<div class="popover-title-text">' + this.options.title + "</div>"));
            }
            if (this.hasSeparatedSearchInput() && !this.options.searchInFooter) {
                e.append(this.options.templates.search);
            } else if (!this.options.title) {
                e.remove();
            }
            if (this.options.showFooter && !f.isEmpty(this.options.templates.footer)) {
                var a = c(this.options.templates.footer);
                if (this.hasSeparatedSearchInput() && this.options.searchInFooter) {
                    a.append(c(this.options.templates.search));
                }
                if (!f.isEmpty(this.options.templates.buttons)) {
                    a.append(c(this.options.templates.buttons));
                }
                this.popover.append(a);
            }
            if (this.options.animation === true) {
                this.popover.addClass("fade");
            }
            return this.popover;
        },
        _createIconpicker: function() {
            var t = this;
            this.iconpicker = c(this.options.templates.iconpicker);
            var e = function(e) {
                var a = c(this);
                if (a.is("i")) {
                    a = a.parent();
                }
                t._trigger("iconpickerSelect", {
                    iconpickerItem: a,
                    iconpickerValue: t.iconpickerValue
                });
                if (t.options.mustAccept === false) {
                    t.update(a.data("iconpickerValue"));
                    t._trigger("iconpickerSelected", {
                        iconpickerItem: this,
                        iconpickerValue: t.iconpickerValue
                    });
                } else {
                    t.update(a.data("iconpickerValue"), true);
                }
                if (t.options.hideOnSelect && t.options.mustAccept === false) {
                    t.hide();
                }
            };
            var a = c(this.options.templates.iconpickerItem);
            var s = [];
            for (var r in this.options.icons) {
                if (typeof this.options.icons[r] === "string") {
                    var i = a.clone();
                    i.find("i").addClass(this.options.fullClassFormatter(this.options.icons[r]));
                    i.data("iconpickerValue", this.options.icons[r]).on("click.iconpicker", e);
                    i.attr("title", "." + this.options.icons[r]);
                    s.push(i);
                }
            }
            this.iconpicker.find(".iconpicker-items").append(s);
            this.popover.find(".popover-content").append(this.iconpicker);
            return this.iconpicker;
        },
        _isEventInsideIconpicker: function(e) {
            var a = c(e.target);
            if ((!a.hasClass("iconpicker-element") || a.hasClass("iconpicker-element") && !a.is(this.element)) && a.parents(".iconpicker-popover").length === 0) {
                return false;
            }
            return true;
        },
        _bindElementEvents: function() {
            var a = this;
            this.getSearchInput().on("keyup.iconpicker", function() {
                a.filter(c(this).val().toLowerCase());
            });
            this.getAcceptButton().on("click.iconpicker", function() {
                var e = a.iconpicker.find(".iconpicker-selected").get(0);
                a.update(a.iconpickerValue);
                a._trigger("iconpickerSelected", {
                    iconpickerItem: e,
                    iconpickerValue: a.iconpickerValue
                });
                if (!a.isInline()) {
                    a.hide();
                }
            });
            this.getCancelButton().on("click.iconpicker", function() {
                if (!a.isInline()) {
                    a.hide();
                }
            });
            this.element.on("focus.iconpicker", function(e) {
                a.show();
                e.stopPropagation();
            });
            if (this.hasComponent()) {
                this.component.on("click.iconpicker", function() {
                    a.toggle();
                });
            }
            if (this.hasInput()) {
                this.input.on("keyup.iconpicker", function(e) {
                    if (!f.inArray(e.keyCode, [ 38, 40, 37, 39, 16, 17, 18, 9, 8, 91, 93, 20, 46, 186, 190, 46, 78, 188, 44, 86 ])) {
                        a.update();
                    } else {
                        a._updateFormGroupStatus(a.getValid(this.value) !== false);
                    }
                    if (a.options.inputSearch === true) {
                        a.filter(c(this).val().toLowerCase());
                    }
                });
            }
        },
        _bindWindowEvents: function() {
            var e = c(window.document);
            var a = this;
            var t = ".iconpicker.inst" + this._id;
            c(window).on("resize.iconpicker" + t + " orientationchange.iconpicker" + t, function(e) {
                if (a.popover.hasClass("in")) {
                    a.updatePlacement();
                }
            });
            if (!a.isInline()) {
                e.on("mouseup" + t, function(e) {
                    if (!a._isEventInsideIconpicker(e) && !a.isInline()) {
                        a.hide();
                    }
                });
            }
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
            c(window).off(".iconpicker.inst" + this._id);
            c(window.document).off(".iconpicker.inst" + this._id);
        },
        updatePlacement: function(e, a) {
            e = e || this.options.placement;
            this.options.placement = e;
            a = a || this.options.collision;
            a = a === true ? "flip" : a;
            var t = {
                at: "right bottom",
                my: "right top",
                of: this.hasInput() && !this.isInputGroup() ? this.input : this.container,
                collision: a === true ? "flip" : a,
                within: window
            };
            this.popover.removeClass("inline topLeftCorner topLeft top topRight topRightCorner " + "rightTop right rightBottom bottomRight bottomRightCorner " + "bottom bottomLeft bottomLeftCorner leftBottom left leftTop");
            if (typeof e === "object") {
                return this.popover.pos(c.extend({}, t, e));
            }
            switch (e) {
              case "inline":
                {
                    t = false;
                }
                break;

              case "topLeftCorner":
                {
                    t.my = "right bottom";
                    t.at = "left top";
                }
                break;

              case "topLeft":
                {
                    t.my = "left bottom";
                    t.at = "left top";
                }
                break;

              case "top":
                {
                    t.my = "center bottom";
                    t.at = "center top";
                }
                break;

              case "topRight":
                {
                    t.my = "right bottom";
                    t.at = "right top";
                }
                break;

              case "topRightCorner":
                {
                    t.my = "left bottom";
                    t.at = "right top";
                }
                break;

              case "rightTop":
                {
                    t.my = "left bottom";
                    t.at = "right center";
                }
                break;

              case "right":
                {
                    t.my = "left center";
                    t.at = "right center";
                }
                break;

              case "rightBottom":
                {
                    t.my = "left top";
                    t.at = "right center";
                }
                break;

              case "bottomRightCorner":
                {
                    t.my = "left top";
                    t.at = "right bottom";
                }
                break;

              case "bottomRight":
                {
                    t.my = "right top";
                    t.at = "right bottom";
                }
                break;

              case "bottom":
                {
                    t.my = "center top";
                    t.at = "center bottom";
                }
                break;

              case "bottomLeft":
                {
                    t.my = "left top";
                    t.at = "left bottom";
                }
                break;

              case "bottomLeftCorner":
                {
                    t.my = "right top";
                    t.at = "left bottom";
                }
                break;

              case "leftBottom":
                {
                    t.my = "right top";
                    t.at = "left center";
                }
                break;

              case "left":
                {
                    t.my = "right center";
                    t.at = "left center";
                }
                break;

              case "leftTop":
                {
                    t.my = "right bottom";
                    t.at = "left center";
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
            if (t !== false) {
                this.popover.pos(t).css("maxWidth", c(window).width() - this.container.offset().left - 5);
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
                var e = this.component.find("i");
                if (e.length > 0) {
                    e.attr("class", this.options.fullClassFormatter(this.iconpickerValue));
                } else {
                    this.component.html(this.getHtml());
                }
            }
        },
        _updateFormGroupStatus: function(e) {
            if (this.hasInput()) {
                if (e !== false) {
                    this.input.parents(".form-group:first").removeClass("is-invalid");
                } else {
                    this.input.parents(".form-group:first").addClass("is-invalid");
                }
                return true;
            }
            return false;
        },
        getValid: function(e) {
            if (!f.isString(e)) {
                e = "";
            }
            var a = e === "";
            e = c.trim(e);
            var t = false;
            for (var s = 0; s < this.options.icons.length; s++) {
                if (this.options.icons[s] === e) {
                    t = true;
                    break;
                }
            }
            if (t || a) {
                return e;
            }
            return false;
        },
        setValue: function(e) {
            var a = this.getValid(e);
            if (a !== false) {
                this.iconpickerValue = a;
                this._trigger("iconpickerSetValue", {
                    iconpickerValue: a
                });
                return this.iconpickerValue;
            } else {
                this._trigger("iconpickerInvalid", {
                    iconpickerValue: e
                });
                return false;
            }
        },
        getHtml: function() {
            return '<i class="' + this.options.fullClassFormatter(this.iconpickerValue) + '"></i>';
        },
        setSourceValue: function(e) {
            e = this.setValue(e);
            if (e !== false && e !== "") {
                if (this.hasInput()) {
                    this.input.val(this.iconpickerValue);
                } else {
                    this.element.data("iconpickerValue", this.iconpickerValue);
                }
                this._trigger("iconpickerSetSourceValue", {
                    iconpickerValue: e
                });
            }
            return e;
        },
        getSourceValue: function(e) {
            e = e || this.options.defaultValue;
            var a = e;
            if (this.hasInput()) {
                a = this.input.val();
            } else {
                a = this.element.data("iconpickerValue");
            }
            if (a === undefined || a === "" || a === null || a === false) {
                a = e;
            }
            return a;
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
        filter: function(r) {
            if (f.isEmpty(r)) {
                this.iconpicker.find(".iconpicker-item").show();
                return c(false);
            } else {
                var i = [];
                this.iconpicker.find(".iconpicker-item").each(function() {
                    var e = c(this);
                    var a = e.attr("title").toLowerCase();
                    var t = e.attr("data-search-terms") ? e.attr("data-search-terms").toLowerCase() : "";
                    a = a + " " + t;
                    var s = false;
                    try {
                        s = new RegExp("(^|\\W)" + r, "g");
                    } catch (e) {
                        s = false;
                    }
                    if (s !== false && a.match(s)) {
                        i.push(e);
                        e.show();
                    } else {
                        e.hide();
                    }
                });
                return i;
            }
        },
        show: function() {
            if (this.popover.hasClass("show")) {
                return false;
            }
            c.iconpicker.batch(c(".iconpicker-popover.in:not(.inline)").not(this.popover), "hide");
            this._trigger("iconpickerShow", {
                iconpickerValue: this.iconpickerValue
            });
            this.updatePlacement();
            this.popover.addClass("show");
            setTimeout(c.proxy(function() {
                this.popover.css("display", this.isInline() ? "" : "block");
                this._trigger("iconpickerShown", {
                    iconpickerValue: this.iconpickerValue
                });
            }, this), this.options.animation ? 300 : 1);
        },
        hide: function() {
            if (!this.popover.hasClass("show")) {
                return false;
            }
            this._trigger("iconpickerHide", {
                iconpickerValue: this.iconpickerValue
            });
            this.popover.removeClass("show");
            setTimeout(c.proxy(function() {
                this.popover.css("display", "none");
                this.getSearchInput().val("");
                this.filter("");
                this._trigger("iconpickerHidden", {
                    iconpickerValue: this.iconpickerValue
                });
            }, this), this.options.animation ? 300 : 1);
        },
        toggle: function() {
            if (this.popover.is(":visible")) {
                this.hide();
            } else {
                this.show();
            }
        },
        update: function(e, a) {
            e = e ? e : this.getSourceValue(this.iconpickerValue);
            this._trigger("iconpickerUpdate", {
                iconpickerValue: this.iconpickerValue
            });
            if (a === true) {
                e = this.setValue(e);
            } else {
                e = this.setSourceValue(e);
                this._updateFormGroupStatus(e !== false);
            }
            if (e !== false) {
                this._updateComponents();
            }
            this._trigger("iconpickerUpdated", {
                iconpickerValue: this.iconpickerValue
            });
            return e;
        },
        destroy: function() {
            this._trigger("iconpickerDestroy", {
                iconpickerValue: this.iconpickerValue
            });
            this.element.removeData("iconpicker").removeData("iconpickerValue").removeClass("iconpicker-element");
            this._unbindElementEvents();
            this._unbindWindowEvents();
            c(this.popover).remove();
            this._trigger("iconpickerDestroyed", {
                iconpickerValue: this.iconpickerValue
            });
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
    c.iconpicker = t;
    c.fn.iconpicker = function(a) {
        return this.each(function() {
            var e = c(this);
            if (!e.data("iconpicker")) {
                e.data("iconpicker", new t(this, typeof a === "object" ? a : {}));
            }
        });
    };
    t.defaultOptions = c.extend(t.defaultOptions, {
        icons: [ '', 'fa fa-500px',
'fa fa-address-book',
'fa fa-address-book-o',
'fa fa-address-card',
'fa fa-address-card-o',
'fa fa-adjust',
'fa fa-adn',
'fa fa-align-center',
'fa fa-align-justify',
'fa fa-align-left',
'fa fa-align-right',
'fa fa-amazon',
'fa fa-ambulance',
'fa fa-american-sign-language-interpreting',
'fa fa-anchor',
'fa fa-android',
'fa fa-angellist',
'fa fa-angle-double-down',
'fa fa-angle-double-left',
'fa fa-angle-double-right',
'fa fa-angle-double-up',
'fa fa-angle-down',
'fa fa-angle-left',
'fa fa-angle-right',
'fa fa-angle-up',
'fa fa-apple',
'fa fa-archive',
'fa fa-area-chart',
'fa fa-arrow-circle-down',
'fa fa-arrow-circle-left',
'fa fa-arrow-circle-o-down',
'fa fa-arrow-circle-o-left',
'fa fa-arrow-circle-o-right',
'fa fa-arrow-circle-o-up',
'fa fa-arrow-circle-right',
'fa fa-arrow-circle-up',
'fa fa-arrow-down',
'fa fa-arrow-left',
'fa fa-arrow-right',
'fa fa-arrow-up',
'fa fa-arrows',
'fa fa-arrows-alt',
'fa fa-arrows-h',
'fa fa-arrows-v',
'fa fa-asl-interpreting',
'fa fa-assistive-listening-systems',
'fa fa-asterisk',
'fa fa-at',
'fa fa-audio-description',
'fa fa-automobile',
'fa fa-backward',
'fa fa-balance-scale',
'fa fa-ban',
'fa fa-bandcamp',
'fa fa-bank',
'fa fa-bar-chart',
'fa fa-bar-chart-o',
'fa fa-barcode',
'fa fa-bars',
'fa fa-bath',
'fa fa-bathtub',
'fa fa-battery',
'fa fa-battery-0',
'fa fa-battery-1',
'fa fa-battery-2',
'fa fa-battery-3',
'fa fa-battery-4',
'fa fa-battery-empty',
'fa fa-battery-full',
'fa fa-battery-half',
'fa fa-battery-quarter',
'fa fa-battery-three-quarters',
'fa fa-bed',
'fa fa-beer',
'fa fa-behance',
'fa fa-behance-square',
'fa fa-bell',
'fa fa-bell-o',
'fa fa-bell-slash',
'fa fa-bell-slash-o',
'fa fa-bicycle',
'fa fa-binoculars',
'fa fa-birthday-cake',
'fa fa-bitbucket',
'fa fa-bitbucket-square',
'fa fa-bitcoin',
'fa fa-black-tie',
'fa fa-blind',
'fa fa-bluetooth',
'fa fa-bluetooth-b',
'fa fa-bold',
'fa fa-bolt',
'fa fa-bomb',
'fa fa-book',
'fa fa-bookmark',
'fa fa-bookmark-o',
'fa fa-braille',
'fa fa-briefcase',
'fa fa-btc',
'fa fa-bug',
'fa fa-building',
'fa fa-building-o',
'fa fa-bullhorn',
'fa fa-bullseye',
'fa fa-bus',
'fa fa-buysellads',
'fa fa-cab',
'fa fa-calculator',
'fa fa-calendar',
'fa fa-calendar-check-o',
'fa fa-calendar-minus-o',
'fa fa-calendar-o',
'fa fa-calendar-plus-o',
'fa fa-calendar-times-o',
'fa fa-camera',
'fa fa-camera-retro',
'fa fa-car',
'fa fa-caret-down',
'fa fa-caret-left',
'fa fa-caret-right',
'fa fa-caret-square-o-down',
'fa fa-caret-square-o-left',
'fa fa-caret-square-o-right',
'fa fa-caret-square-o-up',
'fa fa-caret-up',
'fa fa-cart-arrow-down',
'fa fa-cart-plus',
'fa fa-cc',
'fa fa-cc-amex',
'fa fa-cc-diners-club',
'fa fa-cc-discover',
'fa fa-cc-jcb',
'fa fa-cc-mastercard',
'fa fa-cc-paypal',
'fa fa-cc-stripe',
'fa fa-cc-visa',
'fa fa-certificate',
'fa fa-chain',
'fa fa-chain-broken',
'fa fa-check',
'fa fa-check-circle',
'fa fa-check-circle-o',
'fa fa-check-square',
'fa fa-check-square-o',
'fa fa-chevron-circle-down',
'fa fa-chevron-circle-left',
'fa fa-chevron-circle-right',
'fa fa-chevron-circle-up',
'fa fa-chevron-down',
'fa fa-chevron-left',
'fa fa-chevron-right',
'fa fa-chevron-up',
'fa fa-child',
'fa fa-chrome',
'fa fa-circle',
'fa fa-circle-o',
'fa fa-circle-o-notch',
'fa fa-circle-thin',
'fa fa-clipboard',
'fa fa-clock-o',
'fa fa-clone',
'fa fa-close',
'fa fa-cloud',
'fa fa-cloud-download',
'fa fa-cloud-upload',
'fa fa-cny',
'fa fa-code',
'fa fa-code-fork',
'fa fa-codepen',
'fa fa-codiepie',
'fa fa-coffee',
'fa fa-cog',
'fa fa-cogs',
'fa fa-columns',
'fa fa-comment',
'fa fa-comment-o',
'fa fa-commenting',
'fa fa-commenting-o',
'fa fa-comments',
'fa fa-comments-o',
'fa fa-compass',
'fa fa-compress',
'fa fa-connectdevelop',
'fa fa-contao',
'fa fa-copy',
'fa fa-copyright',
'fa fa-creative-commons',
'fa fa-credit-card',
'fa fa-credit-card-alt',
'fa fa-crop',
'fa fa-crosshairs',
'fa fa-css3',
'fa fa-cube',
'fa fa-cubes',
'fa fa-cut',
'fa fa-cutlery',
'fa fa-dashboard',
'fa fa-dashcube',
'fa fa-database',
'fa fa-deaf',
'fa fa-deafness',
'fa fa-dedent',
'fa fa-delicious',
'fa fa-desktop',
'fa fa-deviantart',
'fa fa-diamond',
'fa fa-digg',
'fa fa-dollar',
'fa fa-dot-circle-o',
'fa fa-download',
'fa fa-dribbble',
'fa fa-drivers-license',
'fa fa-drivers-license-o',
'fa fa-dropbox',
'fa fa-drupal',
'fa fa-edge',
'fa fa-edit',
'fa fa-eercast',
'fa fa-eject',
'fa fa-ellipsis-h',
'fa fa-ellipsis-v',
'fa fa-empire',
'fa fa-envelope',
'fa fa-envelope-o',
'fa fa-envelope-open',
'fa fa-envelope-open-o',
'fa fa-envelope-square',
'fa fa-envira',
'fa fa-eraser',
'fa fa-etsy',
'fa fa-eur',
'fa fa-euro',
'fa fa-exchange',
'fa fa-exclamation',
'fa fa-exclamation-circle',
'fa fa-exclamation-triangle',
'fa fa-expand',
'fa fa-expeditedssl',
'fa fa-external-link',
'fa fa-external-link-square',
'fa fa-eye',
'fa fa-eye-slash',
'fa fa-eyedropper',
'fa fa-fa',
'fa fa-facebook',
'fa fa-facebook-f',
'fa fa-facebook-official',
'fa fa-facebook-square',
'fa fa-fast-backward',
'fa fa-fast-forward',
'fa fa-fax',
'fa fa-feed',
'fa fa-female',
'fa fa-fighter-jet',
'fa fa-file',
'fa fa-file-archive-o',
'fa fa-file-audio-o',
'fa fa-file-code-o',
'fa fa-file-excel-o',
'fa fa-file-image-o',
'fa fa-file-movie-o',
'fa fa-file-o',
'fa fa-file-pdf-o',
'fa fa-file-photo-o',
'fa fa-file-picture-o',
'fa fa-file-powerpoint-o',
'fa fa-file-sound-o',
'fa fa-file-text',
'fa fa-file-text-o',
'fa fa-file-video-o',
'fa fa-file-word-o',
'fa fa-file-zip-o',
'fa fa-files-o',
'fa fa-film',
'fa fa-filter',
'fa fa-fire',
'fa fa-fire-extinguisher',
'fa fa-firefox',
'fa fa-first-order',
'fa fa-flag',
'fa fa-flag-checkered',
'fa fa-flag-o',
'fa fa-flash',
'fa fa-flask',
'fa fa-flickr',
'fa fa-floppy-o',
'fa fa-folder',
'fa fa-folder-o',
'fa fa-folder-open',
'fa fa-folder-open-o',
'fa fa-font',
'fa fa-font-awesome',
'fa fa-fonticons',
'fa fa-fort-awesome',
'fa fa-forumbee',
'fa fa-forward',
'fa fa-foursquare',
'fa fa-free-code-camp',
'fa fa-frown-o',
'fa fa-futbol-o',
'fa fa-gamepad',
'fa fa-gavel',
'fa fa-gbp',
'fa fa-ge',
'fa fa-gear',
'fa fa-gears',
'fa fa-genderless',
'fa fa-get-pocket',
'fa fa-gg',
'fa fa-gg-circle',
'fa fa-gift',
'fa fa-git',
'fa fa-git-square',
'fa fa-github',
'fa fa-github-alt',
'fa fa-github-square',
'fa fa-gitlab',
'fa fa-gittip',
'fa fa-glass',
'fa fa-glide',
'fa fa-glide-g',
'fa fa-globe',
'fa fa-google',
'fa fa-google-plus',
'fa fa-google-plus-circle',
'fa fa-google-plus-official',
'fa fa-google-plus-square',
'fa fa-google-wallet',
'fa fa-graduation-cap',
'fa fa-gratipay',
'fa fa-grav',
'fa fa-group',
'fa fa-h-square',
'fa fa-hacker-news',
'fa fa-hand-grab-o',
'fa fa-hand-lizard-o',
'fa fa-hand-o-down',
'fa fa-hand-o-left',
'fa fa-hand-o-right',
'fa fa-hand-o-up',
'fa fa-hand-paper-o',
'fa fa-hand-peace-o',
'fa fa-hand-pointer-o',
'fa fa-hand-rock-o',
'fa fa-hand-scissors-o',
'fa fa-hand-spock-o',
'fa fa-hand-stop-o',
'fa fa-handshake-o',
'fa fa-hard-of-hearing',
'fa fa-hashtag',
'fa fa-hdd-o',
'fa fa-header',
'fa fa-headphones',
'fa fa-heart',
'fa fa-heart-o',
'fa fa-heartbeat',
'fa fa-history',
'fa fa-home',
'fa fa-hospital-o',
'fa fa-hotel',
'fa fa-hourglass',
'fa fa-hourglass-1',
'fa fa-hourglass-2',
'fa fa-hourglass-3',
'fa fa-hourglass-end',
'fa fa-hourglass-half',
'fa fa-hourglass-o',
'fa fa-hourglass-start',
'fa fa-houzz',
'fa fa-html5',
'fa fa-i-cursor',
'fa fa-id-badge',
'fa fa-id-card',
'fa fa-id-card-o',
'fa fa-ils',
'fa fa-image',
'fa fa-imdb',
'fa fa-inbox',
'fa fa-indent',
'fa fa-industry',
'fa fa-info',
'fa fa-info-circle',
'fa fa-inr',
'fa fa-instagram',
'fa fa-institution',
'fa fa-internet-explorer',
'fa fa-intersex',
'fa fa-ioxhost',
'fa fa-italic',
'fa fa-joomla',
'fa fa-jpy',
'fa fa-jsfiddle',
'fa fa-key',
'fa fa-keyboard-o',
'fa fa-krw',
'fa fa-language',
'fa fa-laptop',
'fa fa-lastfm',
'fa fa-lastfm-square',
'fa fa-leaf',
'fa fa-leanpub',
'fa fa-legal',
'fa fa-lemon-o',
'fa fa-level-down',
'fa fa-level-up',
'fa fa-life-bouy',
'fa fa-life-buoy',
'fa fa-life-ring',
'fa fa-life-saver',
'fa fa-lightbulb-o',
'fa fa-line-chart',
'fa fa-link',
'fa fa-linkedin',
'fa fa-linkedin-square',
'fa fa-linode',
'fa fa-linux',
'fa fa-list',
'fa fa-list-alt',
'fa fa-list-ol',
'fa fa-list-ul',
'fa fa-location-arrow',
'fa fa-lock',
'fa fa-long-arrow-down',
'fa fa-long-arrow-left',
'fa fa-long-arrow-right',
'fa fa-long-arrow-up',
'fa fa-low-vision',
'fa fa-magic',
'fa fa-magnet',
'fa fa-mail-forward',
'fa fa-mail-reply',
'fa fa-mail-reply-all',
'fa fa-male',
'fa fa-map',
'fa fa-map-marker',
'fa fa-map-o',
'fa fa-map-pin',
'fa fa-map-signs',
'fa fa-mars',
'fa fa-mars-double',
'fa fa-mars-stroke',
'fa fa-mars-stroke-h',
'fa fa-mars-stroke-v',
'fa fa-maxcdn',
'fa fa-meanpath',
'fa fa-medium',
'fa fa-medkit',
'fa fa-meetup',
'fa fa-meh-o',
'fa fa-mercury',
'fa fa-microchip',
'fa fa-microphone',
'fa fa-microphone-slash',
'fa fa-minus',
'fa fa-minus-circle',
'fa fa-minus-square',
'fa fa-minus-square-o',
'fa fa-mixcloud',
'fa fa-mobile',
'fa fa-mobile-phone',
'fa fa-modx',
'fa fa-money',
'fa fa-moon-o',
'fa fa-mortar-board',
'fa fa-motorcycle',
'fa fa-mouse-pointer',
'fa fa-music',
'fa fa-navicon',
'fa fa-neuter',
'fa fa-newspaper-o',
'fa fa-object-group',
'fa fa-object-ungroup',
'fa fa-odnoklassniki',
'fa fa-odnoklassniki-square',
'fa fa-opencart',
'fa fa-openid',
'fa fa-opera',
'fa fa-optin-monster',
'fa fa-outdent',
'fa fa-pagelines',
'fa fa-paint-brush',
'fa fa-paper-plane',
'fa fa-paper-plane-o',
'fa fa-paperclip',
'fa fa-paragraph',
'fa fa-paste',
'fa fa-pause',
'fa fa-pause-circle',
'fa fa-pause-circle-o',
'fa fa-paw',
'fa fa-paypal',
'fa fa-pencil',
'fa fa-pencil-square',
'fa fa-pencil-square-o',
'fa fa-percent',
'fa fa-phone',
'fa fa-phone-square',
'fa fa-photo',
'fa fa-picture-o',
'fa fa-pie-chart',
'fa fa-pied-piper',
'fa fa-pied-piper-alt',
'fa fa-pied-piper-pp',
'fa fa-pinterest',
'fa fa-pinterest-p',
'fa fa-pinterest-square',
'fa fa-plane',
'fa fa-play',
'fa fa-play-circle',
'fa fa-play-circle-o',
'fa fa-plug',
'fa fa-plus',
'fa fa-plus-circle',
'fa fa-plus-square',
'fa fa-plus-square-o',
'fa fa-podcast',
'fa fa-power-off',
'fa fa-print',
'fa fa-product-hunt',
'fa fa-puzzle-piece',
'fa fa-qq',
'fa fa-qrcode',
'fa fa-question',
'fa fa-question-circle',
'fa fa-question-circle-o',
'fa fa-quora',
'fa fa-quote-left',
'fa fa-quote-right',
'fa fa-ra',
'fa fa-random',
'fa fa-ravelry',
'fa fa-rebel',
'fa fa-recycle',
'fa fa-reddit',
'fa fa-reddit-alien',
'fa fa-reddit-square',
'fa fa-refresh',
'fa fa-registered',
'fa fa-remove',
'fa fa-renren',
'fa fa-reorder',
'fa fa-repeat',
'fa fa-reply',
'fa fa-reply-all',
'fa fa-resistance',
'fa fa-retweet',
'fa fa-rmb',
'fa fa-road',
'fa fa-rocket',
'fa fa-rotate-left',
'fa fa-rotate-right',
'fa fa-rouble',
'fa fa-rss',
'fa fa-rss-square',
'fa fa-rub',
'fa fa-ruble',
'fa fa-rupee',
'fa fa-s15',
'fa fa-safari',
'fa fa-save',
'fa fa-scissors',
'fa fa-scribd',
'fa fa-search',
'fa fa-search-minus',
'fa fa-search-plus',
'fa fa-sellsy',
'fa fa-send',
'fa fa-send-o',
'fa fa-server',
'fa fa-share',
'fa fa-share-alt',
'fa fa-share-alt-square',
'fa fa-share-square',
'fa fa-share-square-o',
'fa fa-shekel',
'fa fa-sheqel',
'fa fa-shield',
'fa fa-ship',
'fa fa-shirtsinbulk',
'fa fa-shopping-bag',
'fa fa-shopping-basket',
'fa fa-shopping-cart',
'fa fa-shower',
'fa fa-sign-in',
'fa fa-sign-language',
'fa fa-sign-out',
'fa fa-signal',
'fa fa-signing',
'fa fa-simplybuilt',
'fa fa-sitemap',
'fa fa-skyatlas',
'fa fa-skype',
'fa fa-slack',
'fa fa-sliders',
'fa fa-slideshare',
'fa fa-smile-o',
'fa fa-snapchat',
'fa fa-snapchat-ghost',
'fa fa-snapchat-square',
'fa fa-snowflake-o',
'fa fa-soccer-ball-o',
'fa fa-sort',
'fa fa-sort-alpha-asc',
'fa fa-sort-alpha-desc',
'fa fa-sort-amount-asc',
'fa fa-sort-amount-desc',
'fa fa-sort-asc',
'fa fa-sort-desc',
'fa fa-sort-down',
'fa fa-sort-numeric-asc',
'fa fa-sort-numeric-desc',
'fa fa-sort-up',
'fa fa-soundcloud',
'fa fa-space-shuttle',
'fa fa-spinner',
'fa fa-spoon',
'fa fa-spotify',
'fa fa-square',
'fa fa-square-o',
'fa fa-stack-exchange',
'fa fa-stack-overflow',
'fa fa-star',
'fa fa-star-half',
'fa fa-star-half-empty',
'fa fa-star-half-full',
'fa fa-star-half-o',
'fa fa-star-o',
'fa fa-steam',
'fa fa-steam-square',
'fa fa-step-backward',
'fa fa-step-forward',
'fa fa-stethoscope',
'fa fa-sticky-note',
'fa fa-sticky-note-o',
'fa fa-stop',
'fa fa-stop-circle',
'fa fa-stop-circle-o',
'fa fa-street-view',
'fa fa-strikethrough',
'fa fa-stumbleupon',
'fa fa-stumbleupon-circle',
'fa fa-subscript',
'fa fa-subway',
'fa fa-suitcase',
'fa fa-sun-o',
'fa fa-superpowers',
'fa fa-superscript',
'fa fa-support',
'fa fa-table',
'fa fa-tablet',
'fa fa-tachometer',
'fa fa-tag',
'fa fa-tags',
'fa fa-tasks',
'fa fa-taxi',
'fa fa-telegram',
'fa fa-television',
'fa fa-tencent-weibo',
'fa fa-terminal',
'fa fa-text-height',
'fa fa-text-width',
'fa fa-th',
'fa fa-th-large',
'fa fa-th-list',
'fa fa-themeisle',
'fa fa-thermometer',
'fa fa-thermometer-0',
'fa fa-thermometer-1',
'fa fa-thermometer-2',
'fa fa-thermometer-3',
'fa fa-thermometer-4',
'fa fa-thermometer-empty',
'fa fa-thermometer-full',
'fa fa-thermometer-half',
'fa fa-thermometer-quarter',
'fa fa-thermometer-three-quarters',
'fa fa-thumb-tack',
'fa fa-thumbs-down',
'fa fa-thumbs-o-down',
'fa fa-thumbs-o-up',
'fa fa-thumbs-up',
'fa fa-ticket',
'fa fa-times',
'fa fa-times-circle',
'fa fa-times-circle-o',
'fa fa-times-rectangle',
'fa fa-times-rectangle-o',
'fa fa-tint',
'fa fa-toggle-down',
'fa fa-toggle-left',
'fa fa-toggle-off',
'fa fa-toggle-on',
'fa fa-toggle-right',
'fa fa-toggle-up',
'fa fa-trademark',
'fa fa-train',
'fa fa-transgender',
'fa fa-transgender-alt',
'fa fa-trash',
'fa fa-trash-o',
'fa fa-tree',
'fa fa-trello',
'fa fa-tripadvisor',
'fa fa-trophy',
'fa fa-truck',
'fa fa-try',
'fa fa-tty',
'fa fa-tumblr',
'fa fa-tumblr-square',
'fa fa-turkish-lira',
'fa fa-tv',
'fa fa-twitch',
'fa fa-twitter',
'fa fa-twitter-square',
'fa fa-umbrella',
'fa fa-underline',
'fa fa-undo',
'fa fa-universal-access',
'fa fa-university',
'fa fa-unlink',
'fa fa-unlock',
'fa fa-unlock-alt',
'fa fa-unsorted',
'fa fa-upload',
'fa fa-usb',
'fa fa-usd',
'fa fa-user',
'fa fa-user-circle',
'fa fa-user-circle-o',
'fa fa-user-md',
'fa fa-user-o',
'fa fa-user-plus',
'fa fa-user-secret',
'fa fa-user-times',
'fa fa-users',
'fa fa-vcard',
'fa fa-vcard-o',
'fa fa-venus',
'fa fa-venus-double',
'fa fa-venus-mars',
'fa fa-viacoin',
'fa fa-viadeo',
'fa fa-viadeo-square',
'fa fa-video-camera',
'fa fa-vimeo',
'fa fa-vimeo-square',
'fa fa-vine',
'fa fa-vk',
'fa fa-volume-control-phone',
'fa fa-volume-down',
'fa fa-volume-off',
'fa fa-volume-up',
'fa fa-warning',
'fa fa-wechat',
'fa fa-weibo',
'fa fa-weixin',
'fa fa-whatsapp',
'fa fa-wheelchair',
'fa fa-wheelchair-alt',
'fa fa-wifi',
'fa fa-wikipedia-w',
'fa fa-window-close',
'fa fa-window-close-o',
'fa fa-window-maximize',
'fa fa-window-minimize',
'fa fa-window-restore',
'fa fa-windows',
'fa fa-won',
'fa fa-wordpress',
'fa fa-wpbeginner',
'fa fa-wpexplorer',
'fa fa-wpforms',
'fa fa-wrench',
'fa fa-xing',
'fa fa-xing-square',
'fa fa-y-combinator',
'fa fa-y-combinator-square',
'fa fa-yahoo',
'fa fa-yc',
'fa fa-yc-square',
'fa fa-yelp',
'fa fa-yen',
'fa fa-yoast',
'fa fa-youtube',
'fa fa-youtube-play',
'fa fa-youtube-square',
'icon ion-alert',
'icon ion-alert-circled',
'icon ion-android-add',
'icon ion-android-add-circle',
'icon ion-android-alarm-clock',
'icon ion-android-alert',
'icon ion-android-apps',
'icon ion-android-archive',
'icon ion-android-arrow-back',
'icon ion-android-arrow-down',
'icon ion-android-arrow-dropdown',
'icon ion-android-arrow-dropdown-circle',
'icon ion-android-arrow-dropleft',
'icon ion-android-arrow-dropleft-circle',
'icon ion-android-arrow-dropright',
'icon ion-android-arrow-dropright-circle',
'icon ion-android-arrow-dropup',
'icon ion-android-arrow-dropup-circle',
'icon ion-android-arrow-forward',
'icon ion-android-arrow-up',
'icon ion-android-attach',
'icon ion-android-bar',
'icon ion-android-bicycle',
'icon ion-android-boat',
'icon ion-android-bookmark',
'icon ion-android-bulb',
'icon ion-android-bus',
'icon ion-android-calendar',
'icon ion-android-call',
'icon ion-android-camera',
'icon ion-android-cancel',
'icon ion-android-car',
'icon ion-android-cart',
'icon ion-android-chat',
'icon ion-android-checkbox',
'icon ion-android-checkbox-blank',
'icon ion-android-checkbox-outline',
'icon ion-android-checkbox-outline-blank',
'icon ion-android-checkmark-circle',
'icon ion-android-clipboard',
'icon ion-android-close',
'icon ion-android-cloud',
'icon ion-android-cloud-circle',
'icon ion-android-cloud-done',
'icon ion-android-cloud-outline',
'icon ion-android-color-palette',
'icon ion-android-compass',
'icon ion-android-contact',
'icon ion-android-contacts',
'icon ion-android-contract',
'icon ion-android-create',
'icon ion-android-delete',
'icon ion-android-desktop',
'icon ion-android-document',
'icon ion-android-done',
'icon ion-android-done-all',
'icon ion-android-download',
'icon ion-android-drafts',
'icon ion-android-exit',
'icon ion-android-expand',
'icon ion-android-favorite',
'icon ion-android-favorite-outline',
'icon ion-android-film',
'icon ion-android-folder',
'icon ion-android-folder-open',
'icon ion-android-funnel',
'icon ion-android-globe',
'icon ion-android-hand',
'icon ion-android-hangout',
'icon ion-android-happy',
'icon ion-android-home',
'icon ion-android-image',
'icon ion-android-laptop',
'icon ion-android-list',
'icon ion-android-locate',
'icon ion-android-lock',
'icon ion-android-mail',
'icon ion-android-map',
'icon ion-android-menu',
'icon ion-android-microphone',
'icon ion-android-microphone-off',
'icon ion-android-more-horizontal',
'icon ion-android-more-vertical',
'icon ion-android-navigate',
'icon ion-android-notifications',
'icon ion-android-notifications-none',
'icon ion-android-notifications-off',
'icon ion-android-open',
'icon ion-android-options',
'icon ion-android-people',
'icon ion-android-person',
'icon ion-android-person-add',
'icon ion-android-phone-landscape',
'icon ion-android-phone-portrait',
'icon ion-android-pin',
'icon ion-android-plane',
'icon ion-android-playstore',
'icon ion-android-print',
'icon ion-android-radio-button-off',
'icon ion-android-radio-button-on',
'icon ion-android-refresh',
'icon ion-android-remove',
'icon ion-android-remove-circle',
'icon ion-android-restaurant',
'icon ion-android-sad',
'icon ion-android-search',
'icon ion-android-send',
'icon ion-android-settings',
'icon ion-android-share',
'icon ion-android-share-alt',
'icon ion-android-star',
'icon ion-android-star-half',
'icon ion-android-star-outline',
'icon ion-android-stopwatch',
'icon ion-android-subway',
'icon ion-android-sunny',
'icon ion-android-sync',
'icon ion-android-textsms',
'icon ion-android-time',
'icon ion-android-train',
'icon ion-android-unlock',
'icon ion-android-upload',
'icon ion-android-volume-down',
'icon ion-android-volume-mute',
'icon ion-android-volume-off',
'icon ion-android-volume-up',
'icon ion-android-walk',
'icon ion-android-warning',
'icon ion-android-watch',
'icon ion-android-wifi',
'icon ion-aperture',
'icon ion-archive',
'icon ion-arrow-down-a',
'icon ion-arrow-down-b',
'icon ion-arrow-down-c',
'icon ion-arrow-expand',
'icon ion-arrow-graph-down-left',
'icon ion-arrow-graph-down-right',
'icon ion-arrow-graph-up-left',
'icon ion-arrow-graph-up-right',
'icon ion-arrow-left-a',
'icon ion-arrow-left-b',
'icon ion-arrow-left-c',
'icon ion-arrow-move',
'icon ion-arrow-resize',
'icon ion-arrow-return-left',
'icon ion-arrow-return-right',
'icon ion-arrow-right-a',
'icon ion-arrow-right-b',
'icon ion-arrow-right-c',
'icon ion-arrow-shrink',
'icon ion-arrow-swap',
'icon ion-arrow-up-a',
'icon ion-arrow-up-b',
'icon ion-arrow-up-c',
'icon ion-asterisk',
'icon ion-at',
'icon ion-backspace',
'icon ion-backspace-outline',
'icon ion-bag',
'icon ion-battery-charging',
'icon ion-battery-empty',
'icon ion-battery-full',
'icon ion-battery-half',
'icon ion-battery-low',
'icon ion-beaker',
'icon ion-beer',
'icon ion-bluetooth',
'icon ion-bonfire',
'icon ion-bookmark',
'icon ion-bowtie',
'icon ion-briefcase',
'icon ion-bug',
'icon ion-calculator',
'icon ion-calendar',
'icon ion-camera',
'icon ion-card',
'icon ion-cash',
'icon ion-chatbox',
'icon ion-chatbox-working',
'icon ion-chatboxes',
'icon ion-chatbubble',
'icon ion-chatbubble-working',
'icon ion-chatbubbles',
'icon ion-checkmark',
'icon ion-checkmark-circled',
'icon ion-checkmark-round',
'icon ion-chevron-down',
'icon ion-chevron-left',
'icon ion-chevron-right',
'icon ion-chevron-up',
'icon ion-clipboard',
'icon ion-clock',
'icon ion-close',
'icon ion-close-circled',
'icon ion-close-round',
'icon ion-closed-captioning',
'icon ion-cloud',
'icon ion-code',
'icon ion-code-download',
'icon ion-code-working',
'icon ion-coffee',
'icon ion-compass',
'icon ion-compose',
'icon ion-connection-bars',
'icon ion-contrast',
'icon ion-crop',
'icon ion-cube',
'icon ion-disc',
'icon ion-document',
'icon ion-document-text',
'icon ion-drag',
'icon ion-earth',
'icon ion-easel',
'icon ion-edit',
'icon ion-egg',
'icon ion-eject',
'icon ion-email',
'icon ion-email-unread',
'icon ion-erlenmeyer-flask',
'icon ion-erlenmeyer-flask-bubbles',
'icon ion-eye',
'icon ion-eye-disabled',
'icon ion-female',
'icon ion-filing',
'icon ion-film-marker',
'icon ion-fireball',
'icon ion-flag',
'icon ion-flame',
'icon ion-flash',
'icon ion-flash-off',
'icon ion-folder',
'icon ion-fork',
'icon ion-fork-repo',
'icon ion-forward',
'icon ion-funnel',
'icon ion-gear-a',
'icon ion-gear-b',
'icon ion-grid',
'icon ion-hammer',
'icon ion-happy',
'icon ion-happy-outline',
'icon ion-headphone',
'icon ion-heart',
'icon ion-heart-broken',
'icon ion-help',
'icon ion-help-buoy',
'icon ion-help-circled',
'icon ion-home',
'icon ion-icecream',
'icon ion-image',
'icon ion-images',
'icon ion-information',
'icon ion-information-circled',
'icon ion-ionic',
'icon ion-ios-alarm',
'icon ion-ios-alarm-outline',
'icon ion-ios-albums',
'icon ion-ios-albums-outline',
'icon ion-ios-americanfootball',
'icon ion-ios-americanfootball-outline',
'icon ion-ios-analytics',
'icon ion-ios-analytics-outline',
'icon ion-ios-arrow-back',
'icon ion-ios-arrow-down',
'icon ion-ios-arrow-forward',
'icon ion-ios-arrow-left',
'icon ion-ios-arrow-right',
'icon ion-ios-arrow-thin-down',
'icon ion-ios-arrow-thin-left',
'icon ion-ios-arrow-thin-right',
'icon ion-ios-arrow-thin-up',
'icon ion-ios-arrow-up',
'icon ion-ios-at',
'icon ion-ios-at-outline',
'icon ion-ios-barcode',
'icon ion-ios-barcode-outline',
'icon ion-ios-baseball',
'icon ion-ios-baseball-outline',
'icon ion-ios-basketball',
'icon ion-ios-basketball-outline',
'icon ion-ios-bell',
'icon ion-ios-bell-outline',
'icon ion-ios-body',
'icon ion-ios-body-outline',
'icon ion-ios-bolt',
'icon ion-ios-bolt-outline',
'icon ion-ios-book',
'icon ion-ios-book-outline',
'icon ion-ios-bookmarks',
'icon ion-ios-bookmarks-outline',
'icon ion-ios-box',
'icon ion-ios-box-outline',
'icon ion-ios-briefcase',
'icon ion-ios-briefcase-outline',
'icon ion-ios-browsers',
'icon ion-ios-browsers-outline',
'icon ion-ios-calculator',
'icon ion-ios-calculator-outline',
'icon ion-ios-calendar',
'icon ion-ios-calendar-outline',
'icon ion-ios-camera',
'icon ion-ios-camera-outline',
'icon ion-ios-cart',
'icon ion-ios-cart-outline',
'icon ion-ios-chatboxes',
'icon ion-ios-chatboxes-outline',
'icon ion-ios-chatbubble',
'icon ion-ios-chatbubble-outline',
'icon ion-ios-checkmark',
'icon ion-ios-checkmark-empty',
'icon ion-ios-checkmark-outline',
'icon ion-ios-circle-filled',
'icon ion-ios-circle-outline',
'icon ion-ios-clock',
'icon ion-ios-clock-outline',
'icon ion-ios-close',
'icon ion-ios-close-empty',
'icon ion-ios-close-outline',
'icon ion-ios-cloud',
'icon ion-ios-cloud-download',
'icon ion-ios-cloud-download-outline',
'icon ion-ios-cloud-outline',
'icon ion-ios-cloud-upload',
'icon ion-ios-cloud-upload-outline',
'icon ion-ios-cloudy',
'icon ion-ios-cloudy-night',
'icon ion-ios-cloudy-night-outline',
'icon ion-ios-cloudy-outline',
'icon ion-ios-cog',
'icon ion-ios-cog-outline',
'icon ion-ios-color-filter',
'icon ion-ios-color-filter-outline',
'icon ion-ios-color-wand',
'icon ion-ios-color-wand-outline',
'icon ion-ios-compose',
'icon ion-ios-compose-outline',
'icon ion-ios-contact',
'icon ion-ios-contact-outline',
'icon ion-ios-copy',
'icon ion-ios-copy-outline',
'icon ion-ios-crop',
'icon ion-ios-crop-strong',
'icon ion-ios-download',
'icon ion-ios-download-outline',
'icon ion-ios-drag',
'icon ion-ios-email',
'icon ion-ios-email-outline',
'icon ion-ios-eye',
'icon ion-ios-eye-outline',
'icon ion-ios-fastforward',
'icon ion-ios-fastforward-outline',
'icon ion-ios-filing',
'icon ion-ios-filing-outline',
'icon ion-ios-film',
'icon ion-ios-film-outline',
'icon ion-ios-flag',
'icon ion-ios-flag-outline',
'icon ion-ios-flame',
'icon ion-ios-flame-outline',
'icon ion-ios-flask',
'icon ion-ios-flask-outline',
'icon ion-ios-flower',
'icon ion-ios-flower-outline',
'icon ion-ios-folder',
'icon ion-ios-folder-outline',
'icon ion-ios-football',
'icon ion-ios-football-outline',
'icon ion-ios-game-controller-a',
'icon ion-ios-game-controller-a-outline',
'icon ion-ios-game-controller-b',
'icon ion-ios-game-controller-b-outline',
'icon ion-ios-gear',
'icon ion-ios-gear-outline',
'icon ion-ios-glasses',
'icon ion-ios-glasses-outline',
'icon ion-ios-grid-view',
'icon ion-ios-grid-view-outline',
'icon ion-ios-heart',
'icon ion-ios-heart-outline',
'icon ion-ios-help',
'icon ion-ios-help-empty',
'icon ion-ios-help-outline',
'icon ion-ios-home',
'icon ion-ios-home-outline',
'icon ion-ios-infinite',
'icon ion-ios-infinite-outline',
'icon ion-ios-information',
'icon ion-ios-information-empty',
'icon ion-ios-information-outline',
'icon ion-ios-ionic-outline',
'icon ion-ios-keypad',
'icon ion-ios-keypad-outline',
'icon ion-ios-lightbulb',
'icon ion-ios-lightbulb-outline',
'icon ion-ios-list',
'icon ion-ios-list-outline',
'icon ion-ios-location',
'icon ion-ios-location-outline',
'icon ion-ios-locked',
'icon ion-ios-locked-outline',
'icon ion-ios-loop',
'icon ion-ios-loop-strong',
'icon ion-ios-medical',
'icon ion-ios-medical-outline',
'icon ion-ios-medkit',
'icon ion-ios-medkit-outline',
'icon ion-ios-mic',
'icon ion-ios-mic-off',
'icon ion-ios-mic-outline',
'icon ion-ios-minus',
'icon ion-ios-minus-empty',
'icon ion-ios-minus-outline',
'icon ion-ios-monitor',
'icon ion-ios-monitor-outline',
'icon ion-ios-moon',
'icon ion-ios-moon-outline',
'icon ion-ios-more',
'icon ion-ios-more-outline',
'icon ion-ios-musical-note',
'icon ion-ios-musical-notes',
'icon ion-ios-navigate',
'icon ion-ios-navigate-outline',
'icon ion-ios-nutrition',
'icon ion-ios-nutrition-outline',
'icon ion-ios-paper',
'icon ion-ios-paper-outline',
'icon ion-ios-paperplane',
'icon ion-ios-paperplane-outline',
'icon ion-ios-partlysunny',
'icon ion-ios-partlysunny-outline',
'icon ion-ios-pause',
'icon ion-ios-pause-outline',
'icon ion-ios-paw',
'icon ion-ios-paw-outline',
'icon ion-ios-people',
'icon ion-ios-people-outline',
'icon ion-ios-person',
'icon ion-ios-person-outline',
'icon ion-ios-personadd',
'icon ion-ios-personadd-outline',
'icon ion-ios-photos',
'icon ion-ios-photos-outline',
'icon ion-ios-pie',
'icon ion-ios-pie-outline',
'icon ion-ios-pint',
'icon ion-ios-pint-outline',
'icon ion-ios-play',
'icon ion-ios-play-outline',
'icon ion-ios-plus',
'icon ion-ios-plus-empty',
'icon ion-ios-plus-outline',
'icon ion-ios-pricetag',
'icon ion-ios-pricetag-outline',
'icon ion-ios-pricetags',
'icon ion-ios-pricetags-outline',
'icon ion-ios-printer',
'icon ion-ios-printer-outline',
'icon ion-ios-pulse',
'icon ion-ios-pulse-strong',
'icon ion-ios-rainy',
'icon ion-ios-rainy-outline',
'icon ion-ios-recording',
'icon ion-ios-recording-outline',
'icon ion-ios-redo',
'icon ion-ios-redo-outline',
'icon ion-ios-refresh',
'icon ion-ios-refresh-empty',
'icon ion-ios-refresh-outline',
'icon ion-ios-reload',
'icon ion-ios-reverse-camera',
'icon ion-ios-reverse-camera-outline',
'icon ion-ios-rewind',
'icon ion-ios-rewind-outline',
'icon ion-ios-rose',
'icon ion-ios-rose-outline',
'icon ion-ios-search',
'icon ion-ios-search-strong',
'icon ion-ios-settings',
'icon ion-ios-settings-strong',
'icon ion-ios-shuffle',
'icon ion-ios-shuffle-strong',
'icon ion-ios-skipbackward',
'icon ion-ios-skipbackward-outline',
'icon ion-ios-skipforward',
'icon ion-ios-skipforward-outline',
'icon ion-ios-snowy',
'icon ion-ios-speedometer',
'icon ion-ios-speedometer-outline',
'icon ion-ios-star',
'icon ion-ios-star-half',
'icon ion-ios-star-outline',
'icon ion-ios-stopwatch',
'icon ion-ios-stopwatch-outline',
'icon ion-ios-sunny',
'icon ion-ios-sunny-outline',
'icon ion-ios-telephone',
'icon ion-ios-telephone-outline',
'icon ion-ios-tennisball',
'icon ion-ios-tennisball-outline',
'icon ion-ios-thunderstorm',
'icon ion-ios-thunderstorm-outline',
'icon ion-ios-time',
'icon ion-ios-time-outline',
'icon ion-ios-timer',
'icon ion-ios-timer-outline',
'icon ion-ios-toggle',
'icon ion-ios-toggle-outline',
'icon ion-ios-trash',
'icon ion-ios-trash-outline',
'icon ion-ios-undo',
'icon ion-ios-undo-outline',
'icon ion-ios-unlocked',
'icon ion-ios-unlocked-outline',
'icon ion-ios-upload',
'icon ion-ios-upload-outline',
'icon ion-ios-videocam',
'icon ion-ios-videocam-outline',
'icon ion-ios-volume-high',
'icon ion-ios-volume-low',
'icon ion-ios-wineglass',
'icon ion-ios-wineglass-outline',
'icon ion-ios-world',
'icon ion-ios-world-outline',
'icon ion-ipad',
'icon ion-iphone',
'icon ion-ipod',
'icon ion-jet',
'icon ion-key',
'icon ion-knife',
'icon ion-laptop',
'icon ion-leaf',
'icon ion-levels',
'icon ion-lightbulb',
'icon ion-link',
'icon ion-load-a',
'icon ion-load-b',
'icon ion-load-c',
'icon ion-load-d',
'icon ion-location',
'icon ion-lock-combination',
'icon ion-locked',
'icon ion-log-in',
'icon ion-log-out',
'icon ion-loop',
'icon ion-magnet',
'icon ion-male',
'icon ion-man',
'icon ion-map',
'icon ion-medkit',
'icon ion-merge',
'icon ion-mic-a',
'icon ion-mic-b',
'icon ion-mic-c',
'icon ion-minus',
'icon ion-minus-circled',
'icon ion-minus-round',
'icon ion-model-s',
'icon ion-monitor',
'icon ion-more',
'icon ion-mouse',
'icon ion-music-note',
'icon ion-navicon',
'icon ion-navicon-round',
'icon ion-navigate',
'icon ion-network',
'icon ion-no-smoking',
'icon ion-nuclear',
'icon ion-outlet',
'icon ion-paintbrush',
'icon ion-paintbucket',
'icon ion-paper-airplane',
'icon ion-paperclip',
'icon ion-pause',
'icon ion-person',
'icon ion-person-add',
'icon ion-person-stalker',
'icon ion-pie-graph',
'icon ion-pin',
'icon ion-pinpoint',
'icon ion-pizza',
'icon ion-plane',
'icon ion-planet',
'icon ion-play',
'icon ion-playstation',
'icon ion-plus',
'icon ion-plus-circled',
'icon ion-plus-round',
'icon ion-podium',
'icon ion-pound',
'icon ion-power',
'icon ion-pricetag',
'icon ion-pricetags',
'icon ion-printer',
'icon ion-pull-request',
'icon ion-qr-scanner',
'icon ion-quote',
'icon ion-radio-waves',
'icon ion-record',
'icon ion-refresh',
'icon ion-reply',
'icon ion-reply-all',
'icon ion-ribbon-a',
'icon ion-ribbon-b',
'icon ion-sad',
'icon ion-sad-outline',
'icon ion-scissors',
'icon ion-search',
'icon ion-settings',
'icon ion-share',
'icon ion-shuffle',
'icon ion-skip-backward',
'icon ion-skip-forward',
'icon ion-social-android',
'icon ion-social-android-outline',
'icon ion-social-angular',
'icon ion-social-angular-outline',
'icon ion-social-apple',
'icon ion-social-apple-outline',
'icon ion-social-bitcoin',
'icon ion-social-bitcoin-outline',
'icon ion-social-buffer',
'icon ion-social-buffer-outline',
'icon ion-social-chrome',
'icon ion-social-chrome-outline',
'icon ion-social-codepen',
'icon ion-social-codepen-outline',
'icon ion-social-css3',
'icon ion-social-css3-outline',
'icon ion-social-designernews',
'icon ion-social-designernews-outline',
'icon ion-social-dribbble',
'icon ion-social-dribbble-outline',
'icon ion-social-dropbox',
'icon ion-social-dropbox-outline',
'icon ion-social-euro',
'icon ion-social-euro-outline',
'icon ion-social-facebook',
'icon ion-social-facebook-outline',
'icon ion-social-foursquare',
'icon ion-social-foursquare-outline',
'icon ion-social-freebsd-devil',
'icon ion-social-github',
'icon ion-social-github-outline',
'icon ion-social-google',
'icon ion-social-google-outline',
'icon ion-social-googleplus',
'icon ion-social-googleplus-outline',
'icon ion-social-hackernews',
'icon ion-social-hackernews-outline',
'icon ion-social-html5',
'icon ion-social-html5-outline',
'icon ion-social-instagram',
'icon ion-social-instagram-outline',
'icon ion-social-javascript',
'icon ion-social-javascript-outline',
'icon ion-social-linkedin',
'icon ion-social-linkedin-outline',
'icon ion-social-markdown',
'icon ion-social-nodejs',
'icon ion-social-octocat',
'icon ion-social-pinterest',
'icon ion-social-pinterest-outline',
'icon ion-social-python',
'icon ion-social-reddit',
'icon ion-social-reddit-outline',
'icon ion-social-rss',
'icon ion-social-rss-outline',
'icon ion-social-sass',
'icon ion-social-skype',
'icon ion-social-skype-outline',
'icon ion-social-snapchat',
'icon ion-social-snapchat-outline',
'icon ion-social-tumblr',
'icon ion-social-tumblr-outline',
'icon ion-social-tux',
'icon ion-social-twitch',
'icon ion-social-twitch-outline',
'icon ion-social-twitter',
'icon ion-social-twitter-outline',
'icon ion-social-usd',
'icon ion-social-usd-outline',
'icon ion-social-vimeo',
'icon ion-social-vimeo-outline',
'icon ion-social-whatsapp',
'icon ion-social-whatsapp-outline',
'icon ion-social-windows',
'icon ion-social-windows-outline',
'icon ion-social-wordpress',
'icon ion-social-wordpress-outline',
'icon ion-social-yahoo',
'icon ion-social-yahoo-outline',
'icon ion-social-yen',
'icon ion-social-yen-outline',
'icon ion-social-youtube',
'icon ion-social-youtube-outline',
'icon ion-soup-can',
'icon ion-soup-can-outline',
'icon ion-speakerphone',
'icon ion-speedometer',
'icon ion-spoon',
'icon ion-star',
'icon ion-stats-bars',
'icon ion-steam',
'icon ion-stop',
'icon ion-thermometer',
'icon ion-thumbsdown',
'icon ion-thumbsup',
'icon ion-toggle',
'icon ion-toggle-filled',
'icon ion-transgender',
'icon ion-trash-a',
'icon ion-trash-b',
'icon ion-trophy',
'icon ion-tshirt',
'icon ion-tshirt-outline',
'icon ion-umbrella',
'icon ion-university',
'icon ion-unlocked',
'icon ion-upload',
'icon ion-usb',
'icon ion-videocamera',
'icon ion-volume-high',
'icon ion-volume-low',
'icon ion-volume-medium',
'icon ion-volume-mute',
'icon ion-wand',
'icon ion-waterdrop',
'icon ion-wifi',
'icon ion-wineglass',
'icon ion-woman',
'icon ion-wrench',
'icon ion-xbox' ];
    });
});
