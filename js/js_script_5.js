! function(a, b) {
    var c = b(a, a.document);
    a.lazySizes = c, "object" == typeof module && module.exports && (module.exports = c)
}(window, function(a, b) {
    "use strict";
    if (b.getElementsByClassName) {
        var c, d, e = b.documentElement,
            f = a.Date,
            g = a.HTMLPictureElement,
            h = "addEventListener",
            i = "getAttribute",
            j = a[h],
            k = a.setTimeout,
            l = a.requestAnimationFrame || k,
            m = a.requestIdleCallback,
            n = /^picture$/i,
            o = ["load", "error", "lazyincluded", "_lazyloaded"],
            p = {},
            q = Array.prototype.forEach,
            r = function(a, b) {
                return p[b] || (p[b] = new RegExp("(\\s|^)" + b + "(\\s|$)")), p[b].test(a[i]("class") || "") && p[b]
            },
            s = function(a, b) {
                r(a, b) || a.setAttribute("class", (a[i]("class") || "").trim() + " " + b)
            },
            t = function(a, b) {
                var c;
                (c = r(a, b)) && a.setAttribute("class", (a[i]("class") || "").replace(c, " "))
            },
            u = function(a, b, c) {
                var d = c ? h : "removeEventListener";
                c && u(a, b), o.forEach(function(c) {
                    a[d](c, b)
                })
            },
            v = function(a, d, e, f, g) {
                var h = b.createEvent("CustomEvent");
                return e || (e = {}), e.instance = c, h.initCustomEvent(d, !f, !g, e), a.dispatchEvent(h), h
            },
            w = function(b, c) {
                var e;
                !g && (e = a.picturefill || d.pf) ? (c && c.src && !b[i]("srcset") && b.setAttribute("srcset", c.src), e({
                    reevaluate: !0,
                    elements: [b]
                })) : c && c.src && (b.src = c.src)
            },
            x = function(a, b) {
                return (getComputedStyle(a, null) || {})[b]
            },
            y = function(a, b, c) {
                for (c = c || a.offsetWidth; c < d.minSize && b && !a._lazysizesWidth;) c = b.offsetWidth, b = b.parentNode;
                return c
            },
            z = function() {
                var a, c, d = [],
                    e = [],
                    f = d,
                    g = function() {
                        var b = f;
                        for (f = d.length ? e : d, a = !0, c = !1; b.length;) b.shift()();
                        a = !1
                    },
                    h = function(d, e) {
                        a && !e ? d.apply(this, arguments) : (f.push(d), c || (c = !0, (b.hidden ? k : l)(g)))
                    };
                return h._lsFlush = g, h
            }(),
            A = function(a, b) {
                return b ? function() {
                    z(a)
                } : function() {
                    var b = this,
                        c = arguments;
                    z(function() {
                        a.apply(b, c)
                    })
                }
            },
            B = function(a) {
                var b, c = 0,
                    e = d.throttleDelay,
                    g = d.ricTimeout,
                    h = function() {
                        b = !1, c = f.now(), a()
                    },
                    i = m && g > 49 ? function() {
                        m(h, {
                            timeout: g
                        }), g !== d.ricTimeout && (g = d.ricTimeout)
                    } : A(function() {
                        k(h)
                    }, !0);
                return function(a) {
                    var d;
                    (a = a === !0) && (g = 33), b || (b = !0, d = e - (f.now() - c), 0 > d && (d = 0), a || 9 > d ? i() : k(i, d))
                }
            },
            C = function(a) {
                var b, c, d = 99,
                    e = function() {
                        b = null, a()
                    },
                    g = function() {
                        var a = f.now() - c;
                        d > a ? k(g, d - a) : (m || e)(e)
                    };
                return function() {
                    c = f.now(), b || (b = k(g, d))
                }
            };
        ! function() {
            var b, c = {
                lazyClass: "lazyload",
                loadedClass: "lazyloaded",
                loadingClass: "lazyloading",
                preloadClass: "lazypreload",
                errorClass: "lazyerror",
                autosizesClass: "lazyautosizes",
                srcAttr: "data-src",
                srcsetAttr: "data-srcset",
                sizesAttr: "data-sizes",
                minSize: 40,
                customMedia: {},
                init: !0,
                expFactor: 1.5,
                hFac: .8,
                loadMode: 2,
                loadHidden: !0,
                ricTimeout: 0,
                throttleDelay: 125
            };
            d = a.lazySizesConfig || a.lazysizesConfig || {};
            for (b in c) b in d || (d[b] = c[b]);
            a.lazySizesConfig = d, k(function() {
                d.init && F()
            })
        }();
        var D = function() {
                var g, l, m, o, p, y, D, F, G, H, I, J, K, L, M = /^img$/i,
                    N = /^iframe$/i,
                    O = "onscroll" in a && !/(gle|ng)bot/.test(navigator.userAgent),
                    P = 0,
                    Q = 0,
                    R = 0,
                    S = -1,
                    T = function(a) {
                        R--, a && a.target && u(a.target, T), (!a || 0 > R || !a.target) && (R = 0)
                    },
                    U = function(a, c) {
                        var d, f = a,
                            g = "hidden" == x(b.body, "visibility") || "hidden" != x(a.parentNode, "visibility") && "hidden" != x(a, "visibility");
                        for (F -= c, I += c, G -= c, H += c; g && (f = f.offsetParent) && f != b.body && f != e;) g = (x(f, "opacity") || 1) > 0, g && "visible" != x(f, "overflow") && (d = f.getBoundingClientRect(), g = H > d.left && G < d.right && I > d.top - 1 && F < d.bottom + 1);
                        return g
                    },
                    V = function() {
                        var a, f, h, j, k, m, n, p, q, r = c.elements;
                        if ((o = d.loadMode) && 8 > R && (a = r.length)) {
                            f = 0, S++, null == K && ("expand" in d || (d.expand = e.clientHeight > 500 && e.clientWidth > 500 ? 500 : 370), J = d.expand, K = J * d.expFactor), K > Q && 1 > R && S > 2 && o > 2 && !b.hidden ? (Q = K, S = 0) : Q = o > 1 && S > 1 && 6 > R ? J : P;
                            for (; a > f; f++)
                                if (r[f] && !r[f]._lazyRace)
                                    if (O)
                                        if ((p = r[f][i]("data-expand")) && (m = 1 * p) || (m = Q), q !== m && (y = innerWidth + m * L, D = innerHeight + m, n = -1 * m, q = m), h = r[f].getBoundingClientRect(), (I = h.bottom) >= n && (F = h.top) <= D && (H = h.right) >= n * L && (G = h.left) <= y && (I || H || G || F) && (d.loadHidden || "hidden" != x(r[f], "visibility")) && (l && 3 > R && !p && (3 > o || 4 > S) || U(r[f], m))) {
                                            if (ba(r[f]), k = !0, R > 9) break
                                        } else !k && l && !j && 4 > R && 4 > S && o > 2 && (g[0] || d.preloadAfterLoad) && (g[0] || !p && (I || H || G || F || "auto" != r[f][i](d.sizesAttr))) && (j = g[0] || r[f]);
                            else ba(r[f]);
                            j && !k && ba(j)
                        }
                    },
                    W = B(V),
                    X = function(a) {
                        s(a.target, d.loadedClass), t(a.target, d.loadingClass), u(a.target, Z), v(a.target, "lazyloaded")
                    },
                    Y = A(X),
                    Z = function(a) {
                        Y({
                            target: a.target
                        })
                    },
                    $ = function(a, b) {
                        try {
                            a.contentWindow.location.replace(b)
                        } catch (c) {
                            a.src = b
                        }
                    },
                    _ = function(a) {
                        var b, c = a[i](d.srcsetAttr);
                        (b = d.customMedia[a[i]("data-media") || a[i]("media")]) && a.setAttribute("media", b), c && a.setAttribute("srcset", c)
                    },
                    aa = A(function(a, b, c, e, f) {
                        var g, h, j, l, o, p;
                        (o = v(a, "lazybeforeunveil", b)).defaultPrevented || (e && (c ? s(a, d.autosizesClass) : a.setAttribute("sizes", e)), h = a[i](d.srcsetAttr), g = a[i](d.srcAttr), f && (j = a.parentNode, l = j && n.test(j.nodeName || "")), p = b.firesLoad || "src" in a && (h || g || l), o = {
                            target: a
                        }, p && (u(a, T, !0), clearTimeout(m), m = k(T, 2500), s(a, d.loadingClass), u(a, Z, !0)), l && q.call(j.getElementsByTagName("source"), _), h ? a.setAttribute("srcset", h) : g && !l && (N.test(a.nodeName) ? $(a, g) : a.src = g), f && (h || l) && w(a, {
                            src: g
                        })), a._lazyRace && delete a._lazyRace, t(a, d.lazyClass), z(function() {
                            (!p || a.complete && a.naturalWidth > 1) && (p ? T(o) : R--, X(o))
                        }, !0)
                    }),
                    ba = function(a) {
                        var b, c = M.test(a.nodeName),
                            e = c && (a[i](d.sizesAttr) || a[i]("sizes")),
                            f = "auto" == e;
                        (!f && l || !c || !a[i]("src") && !a.srcset || a.complete || r(a, d.errorClass) || !r(a, d.lazyClass)) && (b = v(a, "lazyunveilread").detail, f && E.updateElem(a, !0, a.offsetWidth), a._lazyRace = !0, R++, aa(a, b, f, e, c))
                    },
                    ca = function() {
                        if (!l) {
                            if (f.now() - p < 999) return void k(ca, 999);
                            var a = C(function() {
                                d.loadMode = 3, W()
                            });
                            l = !0, d.loadMode = 3, W(), j("scroll", function() {
                                3 == d.loadMode && (d.loadMode = 2), a()
                            }, !0)
                        }
                    };
                return {
                    _: function() {
                        p = f.now(), c.elements = b.getElementsByClassName(d.lazyClass), g = b.getElementsByClassName(d.lazyClass + " " + d.preloadClass), L = d.hFac, j("scroll", W, !0), j("resize", W, !0), a.MutationObserver ? new MutationObserver(W).observe(e, {
                            childList: !0,
                            subtree: !0,
                            attributes: !0
                        }) : (e[h]("DOMNodeInserted", W, !0), e[h]("DOMAttrModified", W, !0), setInterval(W, 999)), j("hashchange", W, !0), ["focus", "mouseover", "click", "load", "transitionend", "animationend", "webkitAnimationEnd"].forEach(function(a) {
                            b[h](a, W, !0)
                        }), /d$|^c/.test(b.readyState) ? ca() : (j("load", ca), b[h]("DOMContentLoaded", W), k(ca, 2e4)), c.elements.length ? (V(), z._lsFlush()) : W()
                    },
                    checkElems: W,
                    unveil: ba
                }
            }(),
            E = function() {
                var a, c = A(function(a, b, c, d) {
                        var e, f, g;
                        if (a._lazysizesWidth = d, d += "px", a.setAttribute("sizes", d), n.test(b.nodeName || ""))
                            for (e = b.getElementsByTagName("source"), f = 0, g = e.length; g > f; f++) e[f].setAttribute("sizes", d);
                        c.detail.dataAttr || w(a, c.detail)
                    }),
                    e = function(a, b, d) {
                        var e, f = a.parentNode;
                        f && (d = y(a, f, d), e = v(a, "lazybeforesizes", {
                            width: d,
                            dataAttr: !!b
                        }), e.defaultPrevented || (d = e.detail.width, d && d !== a._lazysizesWidth && c(a, f, e, d)))
                    },
                    f = function() {
                        var b, c = a.length;
                        if (c)
                            for (b = 0; c > b; b++) e(a[b])
                    },
                    g = C(f);
                return {
                    _: function() {
                        a = b.getElementsByClassName(d.autosizesClass), j("resize", g)
                    },
                    checkElems: g,
                    updateElem: e
                }
            }(),
            F = function() {
                F.i || (F.i = !0, E._(), D._())
            };
        return c = {
            cfg: d,
            autoSizer: E,
            loader: D,
            init: F,
            uP: w,
            aC: s,
            rC: t,
            hC: r,
            fire: v,
            gW: y,
            rAF: z
        }
    }
});
(function(window, document) {
    'use strict';
    if ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
        if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
            Object.defineProperty(window.IntersectionObserverEntry.prototype, 'isIntersecting', {
                get: function() {
                    return this.intersectionRatio > 0;
                }
            });
        }
        return;
    }
    var registry = [];

    function IntersectionObserverEntry(entry) {
        this.time = entry.time;
        this.target = entry.target;
        this.rootBounds = entry.rootBounds;
        this.boundingClientRect = entry.boundingClientRect;
        this.intersectionRect = entry.intersectionRect || getEmptyRect();
        this.isIntersecting = !!entry.intersectionRect;
        var targetRect = this.boundingClientRect;
        var targetArea = targetRect.width * targetRect.height;
        var intersectionRect = this.intersectionRect;
        var intersectionArea = intersectionRect.width * intersectionRect.height;
        if (targetArea) {
            this.intersectionRatio = intersectionArea / targetArea;
        } else {
            this.intersectionRatio = this.isIntersecting ? 1 : 0;
        }
    }

    function IntersectionObserver(callback, opt_options) {
        var options = opt_options || {};
        if (typeof callback != 'function') {
            throw new Error('callback must be a function');
        }
        if (options.root && options.root.nodeType != 1) {
            throw new Error('root must be an Element');
        }
        this._checkForIntersections = throttle(this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT);
        this._callback = callback;
        this._observationTargets = [];
        this._queuedEntries = [];
        this._rootMarginValues = this._parseRootMargin(options.rootMargin);
        this.thresholds = this._initThresholds(options.threshold);
        this.root = options.root || null;
        this.rootMargin = this._rootMarginValues.map(function(margin) {
            return margin.value + margin.unit;
        }).join(' ');
    }
    IntersectionObserver.prototype.THROTTLE_TIMEOUT = 100;
    IntersectionObserver.prototype.POLL_INTERVAL = null;
    IntersectionObserver.prototype.USE_MUTATION_OBSERVER = true;
    IntersectionObserver.prototype.observe = function(target) {
        var isTargetAlreadyObserved = this._observationTargets.some(function(item) {
            return item.element == target;
        });
        if (isTargetAlreadyObserved) {
            return;
        }
        if (!(target && target.nodeType == 1)) {
            throw new Error('target must be an Element');
        }
        this._registerInstance();
        this._observationTargets.push({
            element: target,
            entry: null
        });
        this._monitorIntersections();
        this._checkForIntersections();
    };
    IntersectionObserver.prototype.unobserve = function(target) {
        this._observationTargets = this._observationTargets.filter(function(item) {
            return item.element != target;
        });
        if (!this._observationTargets.length) {
            this._unmonitorIntersections();
            this._unregisterInstance();
        }
    };
    IntersectionObserver.prototype.disconnect = function() {
        this._observationTargets = [];
        this._unmonitorIntersections();
        this._unregisterInstance();
    };
    IntersectionObserver.prototype.takeRecords = function() {
        var records = this._queuedEntries.slice();
        this._queuedEntries = [];
        return records;
    };
    IntersectionObserver.prototype._initThresholds = function(opt_threshold) {
        var threshold = opt_threshold || [0];
        if (!Array.isArray(threshold)) threshold = [threshold];
        return threshold.sort().filter(function(t, i, a) {
            if (typeof t != 'number' || isNaN(t) || t < 0 || t > 1) {
                throw new Error('threshold must be a number between 0 and 1 inclusively');
            }
            return t !== a[i - 1];
        });
    };
    IntersectionObserver.prototype._parseRootMargin = function(opt_rootMargin) {
        var marginString = opt_rootMargin || '0px';
        var margins = marginString.split(/\s+/).map(function(margin) {
            var parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);
            if (!parts) {
                throw new Error('rootMargin must be specified in pixels or percent');
            }
            return {
                value: parseFloat(parts[1]),
                unit: parts[2]
            };
        });
        margins[1] = margins[1] || margins[0];
        margins[2] = margins[2] || margins[0];
        margins[3] = margins[3] || margins[1];
        return margins;
    };
    IntersectionObserver.prototype._monitorIntersections = function() {
        if (!this._monitoringIntersections) {
            this._monitoringIntersections = true;
            if (this.POLL_INTERVAL) {
                this._monitoringInterval = setInterval(this._checkForIntersections, this.POLL_INTERVAL);
            } else {
                addEvent(window, 'resize', this._checkForIntersections, true);
                addEvent(document, 'scroll', this._checkForIntersections, true);
                if (this.USE_MUTATION_OBSERVER && 'MutationObserver' in window) {
                    this._domObserver = new MutationObserver(this._checkForIntersections);
                    this._domObserver.observe(document, {
                        attributes: true,
                        childList: true,
                        characterData: true,
                        subtree: true
                    });
                }
            }
        }
    };
    IntersectionObserver.prototype._unmonitorIntersections = function() {
        if (this._monitoringIntersections) {
            this._monitoringIntersections = false;
            clearInterval(this._monitoringInterval);
            this._monitoringInterval = null;
            removeEvent(window, 'resize', this._checkForIntersections, true);
            removeEvent(document, 'scroll', this._checkForIntersections, true);
            if (this._domObserver) {
                this._domObserver.disconnect();
                this._domObserver = null;
            }
        }
    };
    IntersectionObserver.prototype._checkForIntersections = function() {
        var rootIsInDom = this._rootIsInDom();
        var rootRect = rootIsInDom ? this._getRootRect() : getEmptyRect();
        this._observationTargets.forEach(function(item) {
            var target = item.element;
            var targetRect = getBoundingClientRect(target);
            var rootContainsTarget = this._rootContainsTarget(target);
            var oldEntry = item.entry;
            var intersectionRect = rootIsInDom && rootContainsTarget && this._computeTargetAndRootIntersection(target, rootRect);
            var newEntry = item.entry = new IntersectionObserverEntry({
                time: now(),
                target: target,
                boundingClientRect: targetRect,
                rootBounds: rootRect,
                intersectionRect: intersectionRect
            });
            if (!oldEntry) {
                this._queuedEntries.push(newEntry);
            } else if (rootIsInDom && rootContainsTarget) {
                if (this._hasCrossedThreshold(oldEntry, newEntry)) {
                    this._queuedEntries.push(newEntry);
                }
            } else {
                if (oldEntry && oldEntry.isIntersecting) {
                    this._queuedEntries.push(newEntry);
                }
            }
        }, this);
        if (this._queuedEntries.length) {
            this._callback(this.takeRecords(), this);
        }
    };
    IntersectionObserver.prototype._computeTargetAndRootIntersection = function(target, rootRect) {
        if (window.getComputedStyle(target).display == 'none') return;
        var targetRect = getBoundingClientRect(target);
        var intersectionRect = targetRect;
        var parent = getParentNode(target);
        var atRoot = false;
        while (!atRoot) {
            var parentRect = null;
            var parentComputedStyle = parent.nodeType == 1 ? window.getComputedStyle(parent) : {};
            if (parentComputedStyle.display == 'none') return;
            if (parent == this.root || parent == document) {
                atRoot = true;
                parentRect = rootRect;
            } else {
                if (parent != document.body && parent != document.documentElement && parentComputedStyle.overflow != 'visible') {
                    parentRect = getBoundingClientRect(parent);
                }
            }
            if (parentRect) {
                intersectionRect = computeRectIntersection(parentRect, intersectionRect);
                if (!intersectionRect) break;
            }
            parent = getParentNode(parent);
        }
        return intersectionRect;
    };
    IntersectionObserver.prototype._getRootRect = function() {
        var rootRect;
        if (this.root) {
            rootRect = getBoundingClientRect(this.root);
        } else {
            var html = document.documentElement;
            var body = document.body;
            rootRect = {
                top: 0,
                left: 0,
                right: html.clientWidth || body.clientWidth,
                width: html.clientWidth || body.clientWidth,
                bottom: html.clientHeight || body.clientHeight,
                height: html.clientHeight || body.clientHeight
            };
        }
        return this._expandRectByRootMargin(rootRect);
    };
    IntersectionObserver.prototype._expandRectByRootMargin = function(rect) {
        var margins = this._rootMarginValues.map(function(margin, i) {
            return margin.unit == 'px' ? margin.value : margin.value * (i % 2 ? rect.width : rect.height) / 100;
        });
        var newRect = {
            top: rect.top - margins[0],
            right: rect.right + margins[1],
            bottom: rect.bottom + margins[2],
            left: rect.left - margins[3]
        };
        newRect.width = newRect.right - newRect.left;
        newRect.height = newRect.bottom - newRect.top;
        return newRect;
    };
    IntersectionObserver.prototype._hasCrossedThreshold = function(oldEntry, newEntry) {
        var oldRatio = oldEntry && oldEntry.isIntersecting ? oldEntry.intersectionRatio || 0 : -1;
        var newRatio = newEntry.isIntersecting ? newEntry.intersectionRatio || 0 : -1;
        if (oldRatio === newRatio) return;
        for (var i = 0; i < this.thresholds.length; i++) {
            var threshold = this.thresholds[i];
            if (threshold == oldRatio || threshold == newRatio || threshold < oldRatio !== threshold < newRatio) {
                return true;
            }
        }
    };
    IntersectionObserver.prototype._rootIsInDom = function() {
        return !this.root || containsDeep(document, this.root);
    };
    IntersectionObserver.prototype._rootContainsTarget = function(target) {
        return containsDeep(this.root || document, target);
    };
    IntersectionObserver.prototype._registerInstance = function() {
        if (registry.indexOf(this) < 0) {
            registry.push(this);
        }
    };
    IntersectionObserver.prototype._unregisterInstance = function() {
        var index = registry.indexOf(this);
        if (index != -1) registry.splice(index, 1);
    };

    function now() {
        return window.performance && performance.now && performance.now();
    }

    function throttle(fn, timeout) {
        var timer = null;
        return function() {
            if (!timer) {
                timer = setTimeout(function() {
                    fn();
                    timer = null;
                }, timeout);
            }
        };
    }

    function addEvent(node, event, fn, opt_useCapture) {
        if (typeof node.addEventListener == 'function') {
            node.addEventListener(event, fn, opt_useCapture || false);
        } else if (typeof node.attachEvent == 'function') {
            node.attachEvent('on' + event, fn);
        }
    }

    function removeEvent(node, event, fn, opt_useCapture) {
        if (typeof node.removeEventListener == 'function') {
            node.removeEventListener(event, fn, opt_useCapture || false);
        } else if (typeof node.detatchEvent == 'function') {
            node.detatchEvent('on' + event, fn);
        }
    }

    function computeRectIntersection(rect1, rect2) {
        var top = Math.max(rect1.top, rect2.top);
        var bottom = Math.min(rect1.bottom, rect2.bottom);
        var left = Math.max(rect1.left, rect2.left);
        var right = Math.min(rect1.right, rect2.right);
        var width = right - left;
        var height = bottom - top;
        return (width >= 0 && height >= 0) && {
            top: top,
            bottom: bottom,
            left: left,
            right: right,
            width: width,
            height: height
        };
    }

    function getBoundingClientRect(el) {
        var rect;
        try {
            rect = el.getBoundingClientRect();
        } catch (err) {}
        if (!rect) return getEmptyRect();
        if (!(rect.width && rect.height)) {
            rect = {
                top: rect.top,
                right: rect.right,
                bottom: rect.bottom,
                left: rect.left,
                width: rect.right - rect.left,
                height: rect.bottom - rect.top
            };
        }
        return rect;
    }

    function getEmptyRect() {
        return {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: 0,
            height: 0
        };
    }

    function containsDeep(parent, child) {
        var node = child;
        while (node) {
            if (node == parent) return true;
            node = getParentNode(node);
        }
        return false;
    }

    function getParentNode(node) {
        var parent = node.parentNode;
        if (parent && parent.nodeType == 11 && parent.host) {
            return parent.host;
        }
        return parent;
    }
    window.IntersectionObserver = IntersectionObserver;
    window.IntersectionObserverEntry = IntersectionObserverEntry;
}(window, document));
! function(e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        var n;
        "undefined" != typeof window ? n = window : "undefined" != typeof global ? n = global : "undefined" != typeof self && (n = self), n.Countdown = e()
    }
}(function() {
    var define, module, exports;
    return function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;
                    if (!u && a) return a(o, !0);
                    if (i) return i(o, !0);
                    var f = new Error("Cannot find module '" + o + "'");
                    throw f.code = "MODULE_NOT_FOUND", f
                }
                var l = n[o] = {
                    exports: {}
                };
                t[o][0].call(l.exports, function(e) {
                    var n = t[o][1][e];
                    return s(n ? n : e)
                }, l, l.exports, e, t, n, r)
            }
            return n[o].exports
        }
        var i = typeof require == "function" && require;
        for (var o = 0; o < r.length; o++) s(r[o]);
        return s
    }({
        1: [function(require, module, exports) {
            var defaultOptions = {
                date: "June 7, 2087 15:03:25",
                refresh: 1e3,
                offset: 0,
                onEnd: function() {
                    return
                },
                render: function(date) {
                    this.el.innerHTML = date.years + " years, " + date.days + " days, " + this.leadingZeros(date.hours) + " hours, " + this.leadingZeros(date.min) + " min and " + this.leadingZeros(date.sec) + " sec"
                }
            };
            var Countdown = function(el, options) {
                this.el = el;
                this.options = {};
                this.interval = false;
                this.mergeOptions = function(options) {
                    for (var i in defaultOptions) {
                        if (defaultOptions.hasOwnProperty(i)) {
                            this.options[i] = typeof options[i] !== "undefined" ? options[i] : defaultOptions[i];
                            if (i === "date" && typeof this.options.date !== "object") {
                                this.options.date = new Date(this.options.date)
                            }
                            if (typeof this.options[i] === "function") {
                                this.options[i] = this.options[i].bind(this)
                            }
                        }
                    }
                    if (typeof this.options.date !== "object") {
                        this.options.date = new Date(this.options.date)
                    }
                }.bind(this);
                this.mergeOptions(options);
                this.getDiffDate = function() {
                    var diff = (this.options.date.getTime() - Date.now() + this.options.offset) / 1e3;
                    var dateData = {
                        years: 0,
                        days: 0,
                        hours: 0,
                        min: 0,
                        sec: 0,
                        millisec: 0
                    };
                    if (diff <= 0) {
                        if (this.interval) {
                            this.stop();
                            this.options.onEnd()
                        }
                        return dateData
                    }
                    if (diff >= 365.25 * 86400) {
                        dateData.years = Math.floor(diff / (365.25 * 86400));
                        diff -= dateData.years * 365.25 * 86400
                    }
                    if (diff >= 86400) {
                        dateData.days = Math.floor(diff / 86400);
                        diff -= dateData.days * 86400
                    }
                    if (diff >= 3600) {
                        dateData.hours = Math.floor(diff / 3600);
                        diff -= dateData.hours * 3600
                    }
                    if (diff >= 60) {
                        dateData.min = Math.floor(diff / 60);
                        diff -= dateData.min * 60
                    }
                    dateData.sec = Math.round(diff);
                    dateData.millisec = diff % 1 * 1e3;
                    return dateData
                }.bind(this);
                this.leadingZeros = function(num, length) {
                    length = length || 2;
                    num = String(num);
                    if (num.length > length) {
                        return num
                    }
                    return (Array(length + 1).join("0") + num).substr(-length)
                };
                this.update = function(newDate) {
                    if (typeof newDate !== "object") {
                        newDate = new Date(newDate)
                    }
                    this.options.date = newDate;
                    this.render();
                    return this
                }.bind(this);
                this.stop = function() {
                    if (this.interval) {
                        clearInterval(this.interval);
                        this.interval = false
                    }
                    return this
                }.bind(this);
                this.render = function() {
                    this.options.render(this.getDiffDate());
                    return this
                }.bind(this);
                this.start = function() {
                    if (this.interval) {
                        return
                    }
                    this.render();
                    if (this.options.refresh) {
                        this.interval = setInterval(this.render, this.options.refresh)
                    }
                    return this
                }.bind(this);
                this.updateOffset = function(offset) {
                    this.options.offset = offset;
                    return this
                }.bind(this);
                this.restart = function(options) {
                    this.mergeOptions(options);
                    this.interval = false;
                    this.start();
                    return this
                }.bind(this);
                this.start()
            };
            module.exports = Countdown
        }, {}],
        2: [function(require, module, exports) {
            var Countdown = require("./countdown.js");
            var NAME = "countdown";
            var DATA_ATTR = "date";
            jQuery.fn.countdown = function(options) {
                return $.each(this, function(i, el) {
                    var $el = $(el);
                    if (!$el.data(NAME)) {
                        if ($el.data(DATA_ATTR)) {
                            options.date = $el.data(DATA_ATTR)
                        }
                        $el.data(NAME, new Countdown(el, options))
                    }
                })
            };
            module.exports = Countdown
        }, {
            "./countdown.js": 1
        }]
    }, {}, [2])(2)
});
! function(a, b) {
    "function" == typeof define && define.amd ? define("typeahead.js", ["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(jQuery)
}(this, function(a) {
    var b = function() {
            "use strict";
            return {
                isMsie: function() {
                    return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : !1
                },
                isBlankString: function(a) {
                    return !a || /^\s*$/.test(a)
                },
                escapeRegExChars: function(a) {
                    return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
                },
                isString: function(a) {
                    return "string" == typeof a
                },
                isNumber: function(a) {
                    return "number" == typeof a
                },
                isArray: a.isArray,
                isFunction: a.isFunction,
                isObject: a.isPlainObject,
                isUndefined: function(a) {
                    return "undefined" == typeof a
                },
                isElement: function(a) {
                    return !(!a || 1 !== a.nodeType)
                },
                isJQuery: function(b) {
                    return b instanceof a
                },
                toStr: function(a) {
                    return b.isUndefined(a) || null === a ? "" : a + ""
                },
                bind: a.proxy,
                each: function(b, c) {
                    function d(a, b) {
                        return c(b, a)
                    }
                    a.each(b, d)
                },
                map: a.map,
                filter: a.grep,
                every: function(b, c) {
                    var d = !0;
                    return b ? (a.each(b, function(a, e) {
                        return (d = c.call(null, e, a, b)) ? void 0 : !1
                    }), !!d) : d
                },
                some: function(b, c) {
                    var d = !1;
                    return b ? (a.each(b, function(a, e) {
                        return (d = c.call(null, e, a, b)) ? !1 : void 0
                    }), !!d) : d
                },
                mixin: a.extend,
                identity: function(a) {
                    return a
                },
                clone: function(b) {
                    return a.extend(!0, {}, b)
                },
                getIdGenerator: function() {
                    var a = 0;
                    return function() {
                        return a++
                    }
                },
                templatify: function(b) {
                    function c() {
                        return String(b)
                    }
                    return a.isFunction(b) ? b : c
                },
                defer: function(a) {
                    setTimeout(a, 0)
                },
                debounce: function(a, b, c) {
                    var d, e;
                    return function() {
                        var f, g, h = this,
                            i = arguments;
                        return f = function() {
                            d = null, c || (e = a.apply(h, i))
                        }, g = c && !d, clearTimeout(d), d = setTimeout(f, b), g && (e = a.apply(h, i)), e
                    }
                },
                throttle: function(a, b) {
                    var c, d, e, f, g, h;
                    return g = 0, h = function() {
                            g = new Date, e = null, f = a.apply(c, d)
                        },
                        function() {
                            var i = new Date,
                                j = b - (i - g);
                            return c = this, d = arguments, 0 >= j ? (clearTimeout(e), e = null, g = i, f = a.apply(c, d)) : e || (e = setTimeout(h, j)), f
                        }
                },
                stringify: function(a) {
                    return b.isString(a) ? a : JSON.stringify(a)
                },
                noop: function() {}
            }
        }(),
        c = function() {
            "use strict";

            function a(a) {
                var g, h;
                return h = b.mixin({}, f, a), g = {
                    css: e(),
                    classes: h,
                    html: c(h),
                    selectors: d(h)
                }, {
                    css: g.css,
                    html: g.html,
                    classes: g.classes,
                    selectors: g.selectors,
                    mixin: function(a) {
                        b.mixin(a, g)
                    }
                }
            }

            function c(a) {
                return {
                    wrapper: '<span class="' + a.wrapper + '"></span>',
                    menu: '<div class="' + a.menu + '"></div>'
                }
            }

            function d(a) {
                var c = {};
                return b.each(a, function(a, b) {
                    c[b] = "." + a
                }), c
            }

            function e() {
                var a = {
                    wrapper: {
                        position: "relative",
                        display: "inline-block"
                    },
                    hint: {
                        position: "absolute",
                        top: "0",
                        left: "0",
                        borderColor: "transparent",
                        boxShadow: "none",
                        opacity: "1"
                    },
                    input: {
                        position: "relative",
                        verticalAlign: "top",
                        backgroundColor: "transparent"
                    },
                    inputWithNoHint: {
                        position: "relative",
                        verticalAlign: "top"
                    },
                    menu: {
                        position: "absolute",
                        top: "100%",
                        left: "0",
                        zIndex: "100",
                        display: "none"
                    },
                    ltr: {
                        left: "0",
                        right: "auto"
                    },
                    rtl: {
                        left: "auto",
                        right: " 0"
                    }
                };
                return b.isMsie() && b.mixin(a.input, {
                    backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"
                }), a
            }
            var f = {
                wrapper: "twitter-typeahead",
                input: "tt-input",
                hint: "tt-hint",
                menu: "tt-menu",
                dataset: "tt-dataset",
                suggestion: "tt-suggestion",
                selectable: "tt-selectable",
                empty: "tt-empty",
                open: "tt-open",
                cursor: "tt-cursor",
                highlight: "tt-highlight"
            };
            return a
        }(),
        d = function() {
            "use strict";

            function c(b) {
                b && b.el || a.error("EventBus initialized without el"), this.$el = a(b.el)
            }
            var d, e;
            return d = "typeahead:", e = {
                render: "rendered",
                cursorchange: "cursorchanged",
                select: "selected",
                autocomplete: "autocompleted"
            }, b.mixin(c.prototype, {
                _trigger: function(b, c) {
                    var e;
                    return e = a.Event(d + b), (c = c || []).unshift(e), this.$el.trigger.apply(this.$el, c), e
                },
                before: function(a) {
                    var b, c;
                    return b = [].slice.call(arguments, 1), c = this._trigger("before" + a, b), c.isDefaultPrevented()
                },
                trigger: function(a) {
                    var b;
                    this._trigger(a, [].slice.call(arguments, 1)), (b = e[a]) && this._trigger(b, [].slice.call(arguments, 1))
                }
            }), c
        }(),
        e = function() {
            "use strict";

            function a(a, b, c, d) {
                var e;
                if (!c) return this;
                for (b = b.split(i), c = d ? h(c, d) : c, this._callbacks = this._callbacks || {}; e = b.shift();) this._callbacks[e] = this._callbacks[e] || {
                    sync: [],
                    async: []
                }, this._callbacks[e][a].push(c);
                return this
            }

            function b(b, c, d) {
                return a.call(this, "async", b, c, d)
            }

            function c(b, c, d) {
                return a.call(this, "sync", b, c, d)
            }

            function d(a) {
                var b;
                if (!this._callbacks) return this;
                for (a = a.split(i); b = a.shift();) delete this._callbacks[b];
                return this
            }

            function e(a) {
                var b, c, d, e, g;
                if (!this._callbacks) return this;
                for (a = a.split(i), d = [].slice.call(arguments, 1);
                    (b = a.shift()) && (c = this._callbacks[b]);) e = f(c.sync, this, [b].concat(d)), g = f(c.async, this, [b].concat(d)), e() && j(g);
                return this
            }

            function f(a, b, c) {
                function d() {
                    for (var d, e = 0, f = a.length; !d && f > e; e += 1) d = a[e].apply(b, c) === !1;
                    return !d
                }
                return d
            }

            function g() {
                var a;
                return a = window.setImmediate ? function(a) {
                    setImmediate(function() {
                        a()
                    })
                } : function(a) {
                    setTimeout(function() {
                        a()
                    }, 0)
                }
            }

            function h(a, b) {
                return a.bind ? a.bind(b) : function() {
                    a.apply(b, [].slice.call(arguments, 0))
                }
            }
            var i = /\s+/,
                j = g();
            return {
                onSync: c,
                onAsync: b,
                off: d,
                trigger: e
            }
        }(),
        f = function(a) {
            "use strict";

            function c(a, c, d) {
                for (var e, f = [], g = 0, h = a.length; h > g; g++) f.push(b.escapeRegExChars(a[g]));
                return e = d ? "\\b(" + f.join("|") + ")\\b" : "(" + f.join("|") + ")", c ? new RegExp(e) : new RegExp(e, "i")
            }
            var d = {
                node: null,
                pattern: null,
                tagName: "strong",
                className: null,
                wordsOnly: !1,
                caseSensitive: !1
            };
            return function(e) {
                function f(b) {
                    var c, d, f;
                    return (c = h.exec(b.data)) && (f = a.createElement(e.tagName), e.className && (f.className = e.className), d = b.splitText(c.index), d.splitText(c[0].length), f.appendChild(d.cloneNode(!0)), b.parentNode.replaceChild(f, d)), !!c
                }

                function g(a, b) {
                    for (var c, d = 3, e = 0; e < a.childNodes.length; e++) c = a.childNodes[e], c.nodeType === d ? e += b(c) ? 1 : 0 : g(c, b)
                }
                var h;
                e = b.mixin({}, d, e), e.node && e.pattern && (e.pattern = b.isArray(e.pattern) ? e.pattern : [e.pattern], h = c(e.pattern, e.caseSensitive, e.wordsOnly), g(e.node, f))
            }
        }(window.document),
        g = function() {
            "use strict";

            function c(c, e) {
                c = c || {}, c.input || a.error("input is missing"), e.mixin(this), this.$hint = a(c.hint), this.$input = a(c.input), this.query = this.$input.val(), this.queryWhenFocused = this.hasFocus() ? this.query : null, this.$overflowHelper = d(this.$input), this._checkLanguageDirection(), 0 === this.$hint.length && (this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid = b.noop)
            }

            function d(b) {
                return a('<pre aria-hidden="true"></pre>').css({
                    position: "absolute",
                    visibility: "hidden",
                    whiteSpace: "pre",
                    fontFamily: b.css("font-family"),
                    fontSize: b.css("font-size"),
                    fontStyle: b.css("font-style"),
                    fontVariant: b.css("font-variant"),
                    fontWeight: b.css("font-weight"),
                    wordSpacing: b.css("word-spacing"),
                    letterSpacing: b.css("letter-spacing"),
                    textIndent: b.css("text-indent"),
                    textRendering: b.css("text-rendering"),
                    textTransform: b.css("text-transform")
                }).insertAfter(b)
            }

            function f(a, b) {
                return c.normalizeQuery(a) === c.normalizeQuery(b)
            }

            function g(a) {
                return a.altKey || a.ctrlKey || a.metaKey || a.shiftKey
            }
            var h;
            return h = {
                9: "tab",
                27: "esc",
                37: "left",
                39: "right",
                13: "enter",
                38: "up",
                40: "down"
            }, c.normalizeQuery = function(a) {
                return b.toStr(a).replace(/^\s*/g, "").replace(/\s{2,}/g, " ")
            }, b.mixin(c.prototype, e, {
                _onBlur: function() {
                    this.resetInputValue(), this.trigger("blurred")
                },
                _onFocus: function() {
                    this.queryWhenFocused = this.query, this.trigger("focused")
                },
                _onKeydown: function(a) {
                    var b = h[a.which || a.keyCode];
                    this._managePreventDefault(b, a), b && this._shouldTrigger(b, a) && this.trigger(b + "Keyed", a)
                },
                _onInput: function() {
                    this._setQuery(this.getInputValue()), this.clearHintIfInvalid(), this._checkLanguageDirection()
                },
                _managePreventDefault: function(a, b) {
                    var c;
                    switch (a) {
                        case "up":
                        case "down":
                            c = !g(b);
                            break;
                        default:
                            c = !1
                    }
                    c && b.preventDefault()
                },
                _shouldTrigger: function(a, b) {
                    var c;
                    switch (a) {
                        case "tab":
                            c = !g(b);
                            break;
                        default:
                            c = !0
                    }
                    return c
                },
                _checkLanguageDirection: function() {
                    var a = (this.$input.css("direction") || "ltr").toLowerCase();
                    this.dir !== a && (this.dir = a, this.$hint.attr("dir", a), this.trigger("langDirChanged", a))
                },
                _setQuery: function(a, b) {
                    var c, d;
                    c = f(a, this.query), d = c ? this.query.length !== a.length : !1, this.query = a, b || c ? !b && d && this.trigger("whitespaceChanged", this.query) : this.trigger("queryChanged", this.query)
                },
                bind: function() {
                    var a, c, d, e, f = this;
                    return a = b.bind(this._onBlur, this), c = b.bind(this._onFocus, this), d = b.bind(this._onKeydown, this), e = b.bind(this._onInput, this), this.$input.on("blur.tt", a).on("focus.tt", c).on("keydown.tt", d), !b.isMsie() || b.isMsie() > 9 ? this.$input.on("input.tt", e) : this.$input.on("keydown.tt keypress.tt cut.tt paste.tt", function(a) {
                        h[a.which || a.keyCode] || b.defer(b.bind(f._onInput, f, a))
                    }), this
                },
                focus: function() {
                    this.$input.focus()
                },
                blur: function() {
                    this.$input.blur()
                },
                getLangDir: function() {
                    return this.dir
                },
                getQuery: function() {
                    return this.query || ""
                },
                setQuery: function(a, b) {
                    this.setInputValue(a), this._setQuery(a, b)
                },
                hasQueryChangedSinceLastFocus: function() {
                    return this.query !== this.queryWhenFocused
                },
                getInputValue: function() {
                    return this.$input.val()
                },
                setInputValue: function(a) {
                    this.$input.val(a), this.clearHintIfInvalid(), this._checkLanguageDirection()
                },
                resetInputValue: function() {
                    this.setInputValue(this.query)
                },
                getHint: function() {
                    return this.$hint.val()
                },
                setHint: function(a) {
                    this.$hint.val(a)
                },
                clearHint: function() {
                    this.setHint("")
                },
                clearHintIfInvalid: function() {
                    var a, b, c, d;
                    a = this.getInputValue(), b = this.getHint(), c = a !== b && 0 === b.indexOf(a), d = "" !== a && c && !this.hasOverflow(), !d && this.clearHint()
                },
                hasFocus: function() {
                    return this.$input.is(":focus")
                },
                hasOverflow: function() {
                    var a = this.$input.width() - 2;
                    return this.$overflowHelper.text(this.getInputValue()), this.$overflowHelper.width() >= a
                },
                isCursorAtEnd: function() {
                    var a, c, d;
                    return a = this.$input.val().length, c = this.$input[0].selectionStart, b.isNumber(c) ? c === a : document.selection ? (d = document.selection.createRange(), d.moveStart("character", -a), a === d.text.length) : !0
                },
                destroy: function() {
                    this.$hint.off(".tt"), this.$input.off(".tt"), this.$overflowHelper.remove(), this.$hint = this.$input = this.$overflowHelper = a("<div>")
                }
            }), c
        }(),
        h = function() {
            "use strict";

            function c(c, e) {
                c = c || {}, c.templates = c.templates || {}, c.templates.notFound = c.templates.notFound || c.templates.empty, c.source || a.error("missing source"), c.node || a.error("missing node"), c.name && !h(c.name) && a.error("invalid dataset name: " + c.name), e.mixin(this), this.highlight = !!c.highlight, this.name = c.name || j(), this.limit = c.limit || 5, this.displayFn = d(c.display || c.displayKey), this.templates = g(c.templates, this.displayFn), this.source = c.source.__ttAdapter ? c.source.__ttAdapter() : c.source, this.async = b.isUndefined(c.async) ? this.source.length > 2 : !!c.async, this._resetLastSuggestion(), this.$el = a(c.node).addClass(this.classes.dataset).addClass(this.classes.dataset + "-" + this.name)
            }

            function d(a) {
                function c(b) {
                    return b[a]
                }
                return a = a || b.stringify, b.isFunction(a) ? a : c
            }

            function g(c, d) {
                function e(b) {
                    return a("<div>").text(d(b))
                }
                return {
                    notFound: c.notFound && b.templatify(c.notFound),
                    pending: c.pending && b.templatify(c.pending),
                    header: c.header && b.templatify(c.header),
                    footer: c.footer && b.templatify(c.footer),
                    suggestion: c.suggestion || e
                }
            }

            function h(a) {
                return /^[_a-zA-Z0-9-]+$/.test(a)
            }
            var i, j;
            return i = {
                val: "tt-selectable-display",
                obj: "tt-selectable-object"
            }, j = b.getIdGenerator(), c.extractData = function(b) {
                var c = a(b);
                return c.data(i.obj) ? {
                    val: c.data(i.val) || "",
                    obj: c.data(i.obj) || null
                } : null
            }, b.mixin(c.prototype, e, {
                _overwrite: function(a, b) {
                    b = b || [], b.length ? this._renderSuggestions(a, b) : this.async && this.templates.pending ? this._renderPending(a) : !this.async && this.templates.notFound ? this._renderNotFound(a) : this._empty(), this.trigger("rendered", this.name, b, !1)
                },
                _append: function(a, b) {
                    b = b || [], b.length && this.$lastSuggestion.length ? this._appendSuggestions(a, b) : b.length ? this._renderSuggestions(a, b) : !this.$lastSuggestion.length && this.templates.notFound && this._renderNotFound(a), this.trigger("rendered", this.name, b, !0)
                },
                _renderSuggestions: function(a, b) {
                    var c;
                    c = this._getSuggestionsFragment(a, b), this.$lastSuggestion = c.children().last(), this.$el.html(c).prepend(this._getHeader(a, b)).append(this._getFooter(a, b))
                },
                _appendSuggestions: function(a, b) {
                    var c, d;
                    c = this._getSuggestionsFragment(a, b), d = c.children().last(), this.$lastSuggestion.after(c), this.$lastSuggestion = d
                },
                _renderPending: function(a) {
                    var b = this.templates.pending;
                    this._resetLastSuggestion(), b && this.$el.html(b({
                        query: a,
                        dataset: this.name
                    }))
                },
                _renderNotFound: function(a) {
                    var b = this.templates.notFound;
                    this._resetLastSuggestion(), b && this.$el.html(b({
                        query: a,
                        dataset: this.name
                    }))
                },
                _empty: function() {
                    this.$el.empty(), this._resetLastSuggestion()
                },
                _getSuggestionsFragment: function(c, d) {
                    var e, g = this;
                    return e = document.createDocumentFragment(), b.each(d, function(b) {
                        var d, f;
                        f = g._injectQuery(c, b), d = a(g.templates.suggestion(f)).data(i.obj, b).data(i.val, g.displayFn(b)).addClass(g.classes.suggestion + " " + g.classes.selectable), e.appendChild(d[0])
                    }), this.highlight && f({
                        className: this.classes.highlight,
                        node: e,
                        pattern: c
                    }), a(e)
                },
                _getFooter: function(a, b) {
                    return this.templates.footer ? this.templates.footer({
                        query: a,
                        suggestions: b,
                        dataset: this.name
                    }) : null
                },
                _getHeader: function(a, b) {
                    return this.templates.header ? this.templates.header({
                        query: a,
                        suggestions: b,
                        dataset: this.name
                    }) : null
                },
                _resetLastSuggestion: function() {
                    this.$lastSuggestion = a()
                },
                _injectQuery: function(a, c) {
                    return b.isObject(c) ? b.mixin({
                        _query: a
                    }, c) : c
                },
                update: function(b) {
                    function c(a) {
                        g || (g = !0, a = (a || []).slice(0, e.limit), h = a.length, e._overwrite(b, a), h < e.limit && e.async && e.trigger("asyncRequested", b))
                    }

                    function d(c) {
                        c = c || [], !f && h < e.limit && (e.cancel = a.noop, h += c.length, e._append(b, c.slice(0, e.limit - h)), e.async && e.trigger("asyncReceived", b))
                    }
                    var e = this,
                        f = !1,
                        g = !1,
                        h = 0;
                    this.cancel(), this.cancel = function() {
                        f = !0, e.cancel = a.noop, e.async && e.trigger("asyncCanceled", b)
                    }, this.source(b, c, d), !g && c([])
                },
                cancel: a.noop,
                clear: function() {
                    this._empty(), this.cancel(), this.trigger("cleared")
                },
                isEmpty: function() {
                    return this.$el.is(":empty")
                },
                destroy: function() {
                    this.$el = a("<div>")
                }
            }), c
        }(),
        i = function() {
            "use strict";

            function c(c, d) {
                function e(b) {
                    var c = f.$node.find(b.node).first();
                    return b.node = c.length ? c : a("<div>").appendTo(f.$node), new h(b, d)
                }
                var f = this;
                c = c || {}, c.node || a.error("node is required"), d.mixin(this), this.$node = a(c.node), this.query = null, this.datasets = b.map(c.datasets, e)
            }
            return b.mixin(c.prototype, e, {
                _onSelectableClick: function(b) {
                    this.trigger("selectableClicked", a(b.currentTarget))
                },
                _onRendered: function(a, b, c, d) {
                    this.$node.toggleClass(this.classes.empty, this._allDatasetsEmpty()), this.trigger("datasetRendered", b, c, d)
                },
                _onCleared: function() {
                    this.$node.toggleClass(this.classes.empty, this._allDatasetsEmpty()), this.trigger("datasetCleared")
                },
                _propagate: function() {
                    this.trigger.apply(this, arguments)
                },
                _allDatasetsEmpty: function() {
                    function a(a) {
                        return a.isEmpty()
                    }
                    return b.every(this.datasets, a)
                },
                _getSelectables: function() {
                    return this.$node.find(this.selectors.selectable)
                },
                _removeCursor: function() {
                    var a = this.getActiveSelectable();
                    a && a.removeClass(this.classes.cursor)
                },
                _ensureVisible: function(a) {
                    var b, c, d, e;
                    b = a.position().top, c = b + a.outerHeight(!0), d = this.$node.scrollTop(), e = this.$node.height() + parseInt(this.$node.css("paddingTop"), 10) + parseInt(this.$node.css("paddingBottom"), 10), 0 > b ? this.$node.scrollTop(d + b) : c > e && this.$node.scrollTop(d + (c - e))
                },
                bind: function() {
                    var a, c = this;
                    return a = b.bind(this._onSelectableClick, this), this.$node.on("click.tt", this.selectors.selectable, a), b.each(this.datasets, function(a) {
                        a.onSync("asyncRequested", c._propagate, c).onSync("asyncCanceled", c._propagate, c).onSync("asyncReceived", c._propagate, c).onSync("rendered", c._onRendered, c).onSync("cleared", c._onCleared, c)
                    }), this
                },
                isOpen: function() {
                    return this.$node.hasClass(this.classes.open)
                },
                open: function() {
                    this.$node.addClass(this.classes.open)
                },
                close: function() {
                    this.$node.removeClass(this.classes.open), this._removeCursor()
                },
                setLanguageDirection: function(a) {
                    this.$node.attr("dir", a)
                },
                selectableRelativeToCursor: function(a) {
                    var b, c, d, e;
                    return c = this.getActiveSelectable(), b = this._getSelectables(), d = c ? b.index(c) : -1, e = d + a, e = (e + 1) % (b.length + 1) - 1, e = -1 > e ? b.length - 1 : e, -1 === e ? null : b.eq(e)
                },
                setCursor: function(a) {
                    this._removeCursor(), (a = a && a.first()) && (a.addClass(this.classes.cursor), this._ensureVisible(a))
                },
                getSelectableData: function(a) {
                    return a && a.length ? h.extractData(a) : null
                },
                getActiveSelectable: function() {
                    var a = this._getSelectables().filter(this.selectors.cursor).first();
                    return a.length ? a : null
                },
                getTopSelectable: function() {
                    var a = this._getSelectables().first();
                    return a.length ? a : null
                },
                update: function(a) {
                    function c(b) {
                        b.update(a)
                    }
                    var d = a !== this.query;
                    return d && (this.query = a, b.each(this.datasets, c)), d
                },
                empty: function() {
                    function a(a) {
                        a.clear()
                    }
                    b.each(this.datasets, a), this.query = null, this.$node.addClass(this.classes.empty)
                },
                destroy: function() {
                    function c(a) {
                        a.destroy()
                    }
                    this.$node.off(".tt"), this.$node = a("<div>"), b.each(this.datasets, c)
                }
            }), c
        }(),
        j = function() {
            "use strict";

            function a() {
                i.apply(this, [].slice.call(arguments, 0))
            }
            var c = i.prototype;
            return b.mixin(a.prototype, i.prototype, {
                open: function() {
                    return !this._allDatasetsEmpty() && this._show(), c.open.apply(this, [].slice.call(arguments, 0))
                },
                close: function() {
                    return this._hide(), c.close.apply(this, [].slice.call(arguments, 0))
                },
                _onRendered: function() {
                    return this._allDatasetsEmpty() ? this._hide() : this.isOpen() && this._show(), c._onRendered.apply(this, [].slice.call(arguments, 0))
                },
                _onCleared: function() {
                    return this._allDatasetsEmpty() ? this._hide() : this.isOpen() && this._show(), c._onCleared.apply(this, [].slice.call(arguments, 0))
                },
                setLanguageDirection: function(a) {
                    return this.$node.css("ltr" === a ? this.css.ltr : this.css.rtl), c.setLanguageDirection.apply(this, [].slice.call(arguments, 0))
                },
                _hide: function() {
                    this.$node.hide()
                },
                _show: function() {
                    this.$node.css("display", "block")
                }
            }), a
        }(),
        k = function() {
            "use strict";

            function c(c, e) {
                var f, g, h, i, j, k, l, m, n, o, p;
                c = c || {}, c.input || a.error("missing input"), c.menu || a.error("missing menu"), c.eventBus || a.error("missing event bus"), e.mixin(this), this.eventBus = c.eventBus, this.minLength = b.isNumber(c.minLength) ? c.minLength : 1, this.input = c.input, this.menu = c.menu, this.enabled = !0, this.active = !1, this.input.hasFocus() && this.activate(), this.dir = this.input.getLangDir(), this._hacks(), this.menu.bind().onSync("selectableClicked", this._onSelectableClicked, this).onSync("asyncRequested", this._onAsyncRequested, this).onSync("asyncCanceled", this._onAsyncCanceled, this).onSync("asyncReceived", this._onAsyncReceived, this).onSync("datasetRendered", this._onDatasetRendered, this).onSync("datasetCleared", this._onDatasetCleared, this), f = d(this, "activate", "open", "_onFocused"), g = d(this, "deactivate", "_onBlurred"), h = d(this, "isActive", "isOpen", "_onEnterKeyed"), i = d(this, "isActive", "isOpen", "_onTabKeyed"), j = d(this, "isActive", "_onEscKeyed"), k = d(this, "isActive", "open", "_onUpKeyed"), l = d(this, "isActive", "open", "_onDownKeyed"), m = d(this, "isActive", "isOpen", "_onLeftKeyed"), n = d(this, "isActive", "isOpen", "_onRightKeyed"), o = d(this, "_openIfActive", "_onQueryChanged"), p = d(this, "_openIfActive", "_onWhitespaceChanged"), this.input.bind().onSync("focused", f, this).onSync("blurred", g, this).onSync("enterKeyed", h, this).onSync("tabKeyed", i, this).onSync("escKeyed", j, this).onSync("upKeyed", k, this).onSync("downKeyed", l, this).onSync("leftKeyed", m, this).onSync("rightKeyed", n, this).onSync("queryChanged", o, this).onSync("whitespaceChanged", p, this).onSync("langDirChanged", this._onLangDirChanged, this)
            }

            function d(a) {
                var c = [].slice.call(arguments, 1);
                return function() {
                    var d = [].slice.call(arguments);
                    b.each(c, function(b) {
                        return a[b].apply(a, d)
                    })
                }
            }
            return b.mixin(c.prototype, {
                _hacks: function() {
                    var c, d;
                    c = this.input.$input || a("<div>"), d = this.menu.$node || a("<div>"), c.on("blur.tt", function(a) {
                        var e, f, g;
                        e = document.activeElement, f = d.is(e), g = d.has(e).length > 0, b.isMsie() && (f || g) && (a.preventDefault(), a.stopImmediatePropagation(), b.defer(function() {
                            c.focus()
                        }))
                    }), d.on("mousedown.tt", function(a) {
                        a.preventDefault()
                    })
                },
                _onSelectableClicked: function(a, b) {
                    this.select(b)
                },
                _onDatasetCleared: function() {
                    this._updateHint()
                },
                _onDatasetRendered: function(a, b, c, d) {
                    this._updateHint(), this.eventBus.trigger("render", c, d, b)
                },
                _onAsyncRequested: function(a, b, c) {
                    this.eventBus.trigger("asyncrequest", c, b)
                },
                _onAsyncCanceled: function(a, b, c) {
                    this.eventBus.trigger("asynccancel", c, b)
                },
                _onAsyncReceived: function(a, b, c) {
                    this.eventBus.trigger("asyncreceive", c, b)
                },
                _onFocused: function() {
                    this._minLengthMet() && this.menu.update(this.input.getQuery())
                },
                _onBlurred: function() {
                    this.input.hasQueryChangedSinceLastFocus() && this.eventBus.trigger("change", this.input.getQuery())
                },
                _onEnterKeyed: function(a, b) {
                    var c;
                    (c = this.menu.getActiveSelectable()) && this.select(c) && b.preventDefault()
                },
                _onTabKeyed: function(a, b) {
                    var c;
                    (c = this.menu.getActiveSelectable()) ? this.select(c) && b.preventDefault(): (c = this.menu.getTopSelectable()) && this.autocomplete(c) && b.preventDefault()
                },
                _onEscKeyed: function() {
                    this.close()
                },
                _onUpKeyed: function() {
                    this.moveCursor(-1)
                },
                _onDownKeyed: function() {
                    this.moveCursor(1)
                },
                _onLeftKeyed: function() {
                    "rtl" === this.dir && this.input.isCursorAtEnd() && this.autocomplete(this.menu.getTopSelectable())
                },
                _onRightKeyed: function() {
                    "ltr" === this.dir && this.input.isCursorAtEnd() && this.autocomplete(this.menu.getTopSelectable())
                },
                _onQueryChanged: function(a, b) {
                    this._minLengthMet(b) ? this.menu.update(b) : this.menu.empty()
                },
                _onWhitespaceChanged: function() {
                    this._updateHint()
                },
                _onLangDirChanged: function(a, b) {
                    this.dir !== b && (this.dir = b, this.menu.setLanguageDirection(b))
                },
                _openIfActive: function() {
                    this.isActive() && this.open()
                },
                _minLengthMet: function(a) {
                    return a = b.isString(a) ? a : this.input.getQuery() || "", a.length >= this.minLength
                },
                _updateHint: function() {
                    var a, c, d, e, f, h, i;
                    a = this.menu.getTopSelectable(), c = this.menu.getSelectableData(a), d = this.input.getInputValue(), !c || b.isBlankString(d) || this.input.hasOverflow() ? this.input.clearHint() : (e = g.normalizeQuery(d), f = b.escapeRegExChars(e), h = new RegExp("^(?:" + f + ")(.+$)", "i"), i = h.exec(c.val), i && this.input.setHint(d + i[1]))
                },
                isEnabled: function() {
                    return this.enabled
                },
                enable: function() {
                    this.enabled = !0
                },
                disable: function() {
                    this.enabled = !1
                },
                isActive: function() {
                    return this.active
                },
                activate: function() {
                    return this.isActive() ? !0 : !this.isEnabled() || this.eventBus.before("active") ? !1 : (this.active = !0, this.eventBus.trigger("active"), !0)
                },
                deactivate: function() {
                    return this.isActive() ? this.eventBus.before("idle") ? !1 : (this.active = !1, this.close(), this.eventBus.trigger("idle"), !0) : !0
                },
                isOpen: function() {
                    return this.menu.isOpen()
                },
                open: function() {
                    return this.isOpen() || this.eventBus.before("open") || (this.menu.open(), this._updateHint(), this.eventBus.trigger("open")), this.isOpen()
                },
                close: function() {
                    return this.isOpen() && !this.eventBus.before("close") && (this.menu.close(), this.input.clearHint(), this.input.resetInputValue(), this.eventBus.trigger("close")), !this.isOpen()
                },
                setVal: function(a) {
                    this.input.setQuery(b.toStr(a))
                },
                getVal: function() {
                    return this.input.getQuery()
                },
                select: function(a) {
                    var b = this.menu.getSelectableData(a);
                    return b && !this.eventBus.before("select", b.obj) ? (this.input.setQuery(b.val, !0), this.eventBus.trigger("select", b.obj), this.close(), !0) : !1
                },
                autocomplete: function(a) {
                    var b, c, d;
                    return b = this.input.getQuery(), c = this.menu.getSelectableData(a), d = c && b !== c.val, d && !this.eventBus.before("autocomplete", c.obj) ? (this.input.setQuery(c.val), this.eventBus.trigger("autocomplete", c.obj), !0) : !1
                },
                moveCursor: function(a) {
                    var b, c, d, e, f;
                    return b = this.input.getQuery(), c = this.menu.selectableRelativeToCursor(a), d = this.menu.getSelectableData(c), e = d ? d.obj : null, f = this._minLengthMet() && this.menu.update(b), f || this.eventBus.before("cursorchange", e) ? !1 : (this.menu.setCursor(c), d ? this.input.setInputValue(d.val) : (this.input.resetInputValue(), this._updateHint()), this.eventBus.trigger("cursorchange", e), !0)
                },
                destroy: function() {
                    this.input.destroy(), this.menu.destroy()
                }
            }), c
        }();
    ! function() {
        "use strict";

        function e(b, c) {
            b.each(function() {
                var b, d = a(this);
                (b = d.data(p.typeahead)) && c(b, d)
            })
        }

        function f(a, b) {
            return a.clone().addClass(b.classes.hint).removeData().css(b.css.hint).css(l(a)).prop("readonly", !0).removeAttr("id name placeholder required").attr({
                autocomplete: "off",
                spellcheck: "false",
                tabindex: -1
            })
        }

        function h(a, b) {
            a.data(p.attrs, {
                dir: a.attr("dir"),
                autocomplete: a.attr("autocomplete"),
                spellcheck: a.attr("spellcheck"),
                style: a.attr("style")
            }), a.addClass(b.classes.input).attr({
                autocomplete: "off",
                spellcheck: !1
            });
            try {
                !a.attr("dir") && a.attr("dir", "auto")
            } catch (c) {}
            return a
        }

        function l(a) {
            return {
                backgroundAttachment: a.css("background-attachment"),
                backgroundClip: a.css("background-clip"),
                backgroundColor: a.css("background-color"),
                backgroundImage: a.css("background-image"),
                backgroundOrigin: a.css("background-origin"),
                backgroundPosition: a.css("background-position"),
                backgroundRepeat: a.css("background-repeat"),
                backgroundSize: a.css("background-size")
            }
        }

        function m(a) {
            var c, d;
            c = a.data(p.www), d = a.parent().filter(c.selectors.wrapper), b.each(a.data(p.attrs), function(c, d) {
                b.isUndefined(c) ? a.removeAttr(d) : a.attr(d, c)
            }), a.removeData(p.typeahead).removeData(p.www).removeData(p.attr).removeClass(c.classes.input), d.length && (a.detach().insertAfter(d), d.remove())
        }

        function n(c) {
            var d, e;
            return d = b.isJQuery(c) || b.isElement(c), e = d ? a(c).first() : [], e.length ? e : null
        }
        var o, p, q;
        o = a.fn.typeahead, p = {
            www: "tt-www",
            attrs: "tt-attrs",
            typeahead: "tt-typeahead"
        }, q = {
            initialize: function(e, l) {
                function m() {
                    var c, m, q, r, s, t, u, v, w, x, y;
                    b.each(l, function(a) {
                        a.highlight = !!e.highlight
                    }), c = a(this), m = a(o.html.wrapper), q = n(e.hint), r = n(e.menu), s = e.hint !== !1 && !q, t = e.menu !== !1 && !r, s && (q = f(c, o)), t && (r = a(o.html.menu).css(o.css.menu)), q && q.val(""), c = h(c, o), (s || t) && (m.css(o.css.wrapper), c.css(s ? o.css.input : o.css.inputWithNoHint), c.wrap(m).parent().prepend(s ? q : null).append(t ? r : null)), y = t ? j : i, u = new d({
                        el: c
                    }), v = new g({
                        hint: q,
                        input: c
                    }, o), w = new y({
                        node: r,
                        datasets: l
                    }, o), x = new k({
                        input: v,
                        menu: w,
                        eventBus: u,
                        minLength: e.minLength
                    }, o), c.data(p.www, o), c.data(p.typeahead, x)
                }
                var o;
                return l = b.isArray(l) ? l : [].slice.call(arguments, 1), e = e || {}, o = c(e.classNames), this.each(m)
            },
            isEnabled: function() {
                var a;
                return e(this.first(), function(b) {
                    a = b.isEnabled()
                }), a
            },
            enable: function() {
                return e(this, function(a) {
                    a.enable()
                }), this
            },
            disable: function() {
                return e(this, function(a) {
                    a.disable()
                }), this
            },
            isActive: function() {
                var a;
                return e(this.first(), function(b) {
                    a = b.isActive()
                }), a
            },
            activate: function() {
                return e(this, function(a) {
                    a.activate()
                }), this
            },
            deactivate: function() {
                return e(this, function(a) {
                    a.deactivate()
                }), this
            },
            isOpen: function() {
                var a;
                return e(this.first(), function(b) {
                    a = b.isOpen()
                }), a
            },
            open: function() {
                return e(this, function(a) {
                    a.open()
                }), this
            },
            close: function() {
                return e(this, function(a) {
                    a.close()
                }), this
            },
            select: function(b) {
                var c = !1,
                    d = a(b);
                return e(this.first(), function(a) {
                    c = a.select(d)
                }), c
            },
            autocomplete: function(b) {
                var c = !1,
                    d = a(b);
                return e(this.first(), function(a) {
                    c = a.autocomplete(d)
                }), c
            },
            moveCursor: function(a) {
                var b = !1;
                return e(this.first(), function(c) {
                    b = c.moveCursor(a)
                }), b
            },
            val: function(a) {
                var b;
                return arguments.length ? (e(this, function(b) {
                    b.setVal(a)
                }), this) : (e(this.first(), function(a) {
                    b = a.getVal()
                }), b)
            },
            destroy: function() {
                return e(this, function(a, b) {
                    m(b), a.destroy()
                }), this
            }
        }, a.fn.typeahead = function(a) {
            return q[a] ? q[a].apply(this, [].slice.call(arguments, 1)) : q.initialize.apply(this, arguments)
        }, a.fn.typeahead.noConflict = function() {
            return a.fn.typeahead = o, this
        }
    }()
});;
(function(factory) {
    var registeredInModuleLoader;
    if (typeof define === 'function' && define.amd) {
        define(factory);
        registeredInModuleLoader = true;
    }
    if (typeof exports === 'object') {
        module.exports = factory();
        registeredInModuleLoader = true;
    }
    if (!registeredInModuleLoader) {
        var OldCookies = window.Cookies;
        var api = window.Cookies = factory();
        api.noConflict = function() {
            window.Cookies = OldCookies;
            return api;
        };
    }
}(function() {
    function extend() {
        var i = 0;
        var result = {};
        for (; i < arguments.length; i++) {
            var attributes = arguments[i];
            for (var key in attributes) {
                result[key] = attributes[key];
            }
        }
        return result;
    }

    function init(converter) {
        function api(key, value, attributes) {
            if (typeof document === 'undefined') {
                return;
            }
            if (arguments.length > 1) {
                attributes = extend({
                    path: '/'
                }, api.defaults, attributes);
                if (typeof attributes.expires === 'number') {
                    attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
                }
                attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';
                try {
                    var result = JSON.stringify(value);
                    if (/^[\{\[]/.test(result)) {
                        value = result;
                    }
                } catch (e) {}
                value = converter.write ? converter.write(value, key) : encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
                key = encodeURIComponent(String(key)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
                var stringifiedAttributes = '';
                for (var attributeName in attributes) {
                    if (!attributes[attributeName]) {
                        continue;
                    }
                    stringifiedAttributes += '; ' + attributeName;
                    if (attributes[attributeName] === true) {
                        continue;
                    }
                    stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
                }
                return (document.cookie = key + '=' + value + stringifiedAttributes);
            }
            var jar = {};
            var decode = function(s) {
                return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
            };
            var cookies = document.cookie ? document.cookie.split('; ') : [];
            var i = 0;
            for (; i < cookies.length; i++) {
                var parts = cookies[i].split('=');
                var cookie = parts.slice(1).join('=');
                if (!this.json && cookie.charAt(0) === '"') {
                    cookie = cookie.slice(1, -1);
                }
                try {
                    var name = decode(parts[0]);
                    cookie = (converter.read || converter)(cookie, name) || decode(cookie);
                    if (this.json) {
                        try {
                            cookie = JSON.parse(cookie);
                        } catch (e) {}
                    }
                    jar[name] = cookie;
                    if (key === name) {
                        break;
                    }
                } catch (e) {}
            }
            return key ? jar[key] : jar;
        }
        api.set = api;
        api.get = function(key) {
            return api.call(api, key);
        };
        api.getJSON = function() {
            return api.apply({
                json: true
            }, arguments);
        };
        api.remove = function(key, attributes) {
            api(key, '', extend(attributes, {
                expires: -1
            }));
        };
        api.defaults = {};
        api.withConverter = init;
        return api;
    }
    return init(function() {});
}));
! function(a, b) {
    a.ImageZoom = function(c, d) {
        function f(a) {
            var b = parseInt(a);
            return b = isNaN(b) ? 0 : b
        }
        var e = this;
        e.$el = a(c), e.$el.data("imagezoom", e), e.init = function(b) {
            e.options = a.extend({}, a.ImageZoom.defaults, b), e.$viewer = a('<div class="zm-viewer ' + e.options.zoomViewerClass + '"></div>').appendTo("body"), e.$handler = a('<div class="zm-handler' + e.options.zoomHandlerClass + '"></div>').appendTo("body"), e.isBigImageReady = -1, e.$largeImg = null, e.isActive = !1, e.$handlerArea = null, e.isWebkit = /chrome/.test(navigator.userAgent.toLowerCase()) || /safari/.test(navigator.userAgent.toLowerCase()), e.evt = {
                x: -1,
                y: -1
            }, e.options.bigImageSrc = "" == e.options.bigImageSrc ? e.$el.attr("src") : e.options.bigImageSrc, (new Image).src = e.options.bigImageSrc, e.callIndex = a.ImageZoom._calltimes + 1, e.animateTimer = null, a.ImageZoom._calltimes += 1, a(document).bind("mousemove.imagezoom" + e.callIndex, function(a) {
                e.isActive && e.moveHandler(a.pageX, a.pageY)
            }), e.$el.bind("mouseover.imagezoom", function(a) {
                e.isActive = !0, e.showViewer(a)
            })
        }, e.moveHandler = function(a, c) {
            var i, j, k, l, m, n, o, p, d = e.$el.offset(),
                g = e.$el.outerWidth(!1),
                h = e.$el.outerHeight(!1);
            a >= d.left && a <= d.left + g && c >= d.top && c <= d.top + h ? (d.left = d.left + f(e.$el.css("borderLeftWidth")) + f(e.$el.css("paddingLeft")), d.top = d.top + f(e.$el.css("borderTopWidth")) + f(e.$el.css("paddingTop")), g = e.$el.width(), h = e.$el.height(), a >= d.left && a <= d.left + g && c >= d.top && c <= d.top + h && (e.evt = {
                x: a,
                y: c
            }, "follow" == e.options.type && e.$viewer.css({
                top: c - e.$viewer.outerHeight() / 2,
                left: a - e.$viewer.outerWidth() / 2
            }), 1 == e.isBigImageReady && (k = c - d.top, l = a - d.left, "inner" == e.options.type ? (i = -e.$largeImg.height() * k / h + k, j = -e.$largeImg.width() * l / g + l) : "standard" == e.options.type ? (m = l - e.$handlerArea.width() / 2, n = k - e.$handlerArea.height() / 2, o = e.$handlerArea.width(), p = e.$handlerArea.height(), 0 > m ? m = 0 : m > g - o && (m = g - o), 0 > n ? n = 0 : n > h - p && (n = h - p), j = -m / e.scale, i = -n / e.scale, e.isWebkit ? (e.$handlerArea.css({
                opacity: .99
            }), setTimeout(function() {
                e.$handlerArea.css({
                    top: n,
                    left: m,
                    opacity: 1
                })
            }, 0)) : e.$handlerArea.css({
                top: n,
                left: m
            })) : "follow" == e.options.type && (i = -e.$largeImg.height() / h * k + e.options.zoomSize[1] / 2, j = -e.$largeImg.width() / g * l + e.options.zoomSize[0] / 2, -i > e.$largeImg.height() - e.options.zoomSize[1] ? i = -(e.$largeImg.height() - e.options.zoomSize[1]) : i > 0 && (i = 0), -j > e.$largeImg.width() - e.options.zoomSize[0] ? j = -(e.$largeImg.width() - e.options.zoomSize[0]) : j > 0 && (j = 0)), e.options.smoothMove ? (b.clearTimeout(e.animateTimer), e.smoothMove(j, i)) : e.$viewer.find("img").css({
                top: i,
                left: j
            })))) : (e.isActive = !1, e.$viewer.hide(), e.$handler.hide(), e.options.onHide(e), b.clearTimeout(e.animateTimer), e.animateTimer = null)
        }, e.showViewer = function(b) {
            var k, l, m, n, o, c = e.$el.offset().top,
                d = f(e.$el.css("borderTopWidth")),
                g = f(e.$el.css("paddingTop")),
                h = e.$el.offset().left,
                i = f(e.$el.css("borderLeftWidth")),
                j = f(e.$el.css("paddingLeft"));
            c = c + d + g, h = h + i + j, k = e.$el.width(), l = e.$el.height(), e.isBigImageReady < 1 && a("div", e.$viewer).remove(), "inner" == e.options.type ? e.$viewer.css({
                top: c,
                left: h,
                width: k,
                height: l
            }).show() : "standard" == e.options.type ? (m = "" == e.options.alignTo ? e.$el : a("#" + e.options.alignTo), "left" == e.options.position ? (n = m.offset().left - e.options.zoomSize[0] - e.options.offset[0], o = m.offset().top + e.options.offset[1]) : "right" == e.options.position && (n = m.offset().left + m.width() + e.options.offset[0], o = m.offset().top + e.options.offset[1]), e.$viewer.css({
                top: o,
                left: n,
                width: e.options.zoomSize[0],
                height: e.options.zoomSize[1]
            }).show(), e.$handlerArea && (e.scale = k / e.$largeImg.width(), e.$handlerArea.css({
                width: e.$viewer.width() * e.scale,
                height: e.$viewer.height() * e.scale
            }))) : "follow" == e.options.type && e.$viewer.css({
                width: e.options.zoomSize[0],
                height: e.options.zoomSize[1],
                top: b.pageY - e.options.zoomSize[1] / 2,
                left: b.pageX - e.options.zoomSize[0] / 2
            }).show(), e.$handler.css({
                top: c,
                left: h,
                width: k,
                height: l
            }).show(), e.options.onShow(e), -1 == e.isBigImageReady && (e.isBigImageReady = 0, fastImg(e.options.bigImageSrc, function() {
                if (a.trim(a(this).attr("src")) == a.trim(e.options.bigImageSrc)) {
                    if (e.$viewer.append('<img src="' + e.$el.attr("src") + '" class="zm-fast" style="position:absolute;width:' + this.width + "px;height:" + this.height + 'px">'), e.isBigImageReady = 1, e.$largeImg = a('<img src="' + e.options.bigImageSrc + '" style="position:absolute;width:' + this.width + "px;height:" + this.height + 'px">'), e.$viewer.append(e.$largeImg), "standard" == e.options.type) {
                        var c = k / this.width;
                        e.$handlerArea = a('<div class="zm-handlerarea" style="width:' + e.$viewer.width() * c + "px;height:" + e.$viewer.height() * c + 'px"></div>').appendTo(e.$handler), e.scale = c
                    } - 1 == e.evt.x && -1 == e.evt.y ? e.moveHandler(b.pageX, b.pageY) : e.moveHandler(e.evt.x, e.evt.y), e.options.showDescription && e.$el.attr("alt") && "" != a.trim(e.$el.attr("alt")) && e.$viewer.append('<div class="' + e.options.descriptionClass + '">' + e.$el.attr("alt") + "</div>")
                }
            }, function() {}, function() {}))
        }, e.changeImage = function(a, b) {
            this.$el.attr("src", a), this.isBigImageReady = -1, this.options.bigImageSrc = "string" == typeof b ? b : a, e.options.preload && ((new Image).src = this.options.bigImageSrc), this.$viewer.hide().empty(), this.$handler.hide().empty(), this.$handlerArea = null
        }, e.changeZoomSize = function(a, b) {
            e.options.zoomSize = [a, b]
        }, e.destroy = function() {
            a(document).unbind("mousemove.imagezoom" + e.callIndex), this.$el.unbind(".imagezoom"), this.$viewer.remove(), this.$handler.remove(), this.$el.removeData("imagezoom")
        }, e.smoothMove = function(a, c) {
            var g, h, i, j, k, d = 10,
                f = parseInt(e.$largeImg.css("top"));
            return f = isNaN(f) ? 0 : f, g = parseInt(e.$largeImg.css("left")), g = isNaN(g) ? 0 : g, c = parseInt(c), a = parseInt(a), f == c && g == a ? (b.clearTimeout(e.animateTimer), e.animateTimer = null, void 0) : (h = c - f, i = a - g, j = f + h / Math.abs(h) * Math.ceil(Math.abs(h / d)), k = g + i / Math.abs(i) * Math.ceil(Math.abs(i / d)), e.$viewer.find("img").css({
                top: j,
                left: k
            }), e.animateTimer = setTimeout(function() {
                e.smoothMove(a, c)
            }, 10), void 0)
        }, e.init(d)
    }, a.ImageZoom.defaults = {
        bigImageSrc: "",
        preload: !0,
        type: "inner",
        smoothMove: !0,
        position: "right",
        offset: [10, 0],
        alignTo: "",
        zoomSize: [100, 100],
        descriptionClass: "zm-description",
        zoomViewerClass: "",
        zoomHandlerClass: "",
        showDescription: !0,
        onShow: function() {},
        onHide: function() {}
    }, a.ImageZoom._calltimes = 0, a.fn.ImageZoom = function(b) {
        return this.each(function() {
            new a.ImageZoom(this, b)
        })
    }
}(jQuery, window);
var fastImg = function() {
    var a = [],
        b = null,
        c = function() {
            for (var b = 0; b < a.length; b++) a[b].end ? a.splice(b--, 1) : a[b]();
            !a.length && d()
        },
        d = function() {
            clearInterval(b), b = null
        };
    return function(d, e, f, g) {
        var h, i, j, k, l, m = new Image;
        return m.src = d, m.complete ? (e.call(m), f && f.call(m), void 0) : (i = m.width, j = m.height, m.onerror = function() {
            g && g.call(m), h.end = !0, m = m.onload = m.onerror = null
        }, h = function() {
            k = m.width, l = m.height, (k !== i || l !== j || k * l > 1024) && (e.call(m), h.end = !0)
        }, h(), m.onload = function() {
            !h.end && h(), f && f.call(m), m = m.onload = m.onerror = null
        }, h.end || (a.push(h), null === b && (b = setInterval(c, 40))), void 0)
    }
}();
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], function(a0) {
            return (factory(a0));
        });
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('jquery'));
    } else {
        factory(root["jQuery"]);
    }
}(this, function($) {
    (function() {
        'use strict';
        var defaults = {
            mode: 'lg-slide',
            cssEasing: 'ease',
            easing: 'linear',
            speed: 600,
            height: '100%',
            width: '100%',
            addClass: '',
            startClass: 'lg-start-zoom',
            backdropDuration: 150,
            hideBarsDelay: 6000,
            useLeft: false,
            closable: true,
            loop: true,
            escKey: true,
            keyPress: true,
            controls: true,
            slideEndAnimatoin: true,
            hideControlOnEnd: false,
            mousewheel: true,
            getCaptionFromTitleOrAlt: true,
            appendSubHtmlTo: '.lg-sub-html',
            subHtmlSelectorRelative: false,
            preload: 1,
            showAfterLoad: true,
            selector: '',
            selectWithin: '',
            nextHtml: '',
            prevHtml: '',
            index: false,
            iframeMaxWidth: '100%',
            download: true,
            counter: true,
            appendCounterTo: '.lg-toolbar',
            swipeThreshold: 50,
            enableSwipe: true,
            enableDrag: true,
            dynamic: false,
            dynamicEl: [],
            galleryId: 1
        };

        function Plugin(element, options) {
            this.el = element;
            this.$el = $(element);
            this.s = $.extend({}, defaults, options);
            if (this.s.dynamic && this.s.dynamicEl !== 'undefined' && this.s.dynamicEl.constructor === Array && !this.s.dynamicEl.length) {
                throw ('When using dynamic mode, you must also define dynamicEl as an Array.');
            }
            this.modules = {};
            this.lGalleryOn = false;
            this.lgBusy = false;
            this.hideBartimeout = false;
            this.isTouch = ('ontouchstart' in document.documentElement);
            if (this.s.slideEndAnimatoin) {
                this.s.hideControlOnEnd = false;
            }
            if (this.s.dynamic) {
                this.s.dynamicEl = imagenes;
                this.$items = this.s.dynamicEl;
            } else {
                if (this.s.selector === 'this') {
                    this.$items = this.$el;
                } else if (this.s.selector !== '') {
                    if (this.s.selectWithin) {
                        this.$items = $(this.s.selectWithin).find(this.s.selector);
                    } else {
                        this.$items = this.$el.find($(this.s.selector));
                    }
                } else {
                    this.$items = this.$el.children();
                }
            }
            this.$slide = '';
            this.$outer = '';
            this.init();
            return this;
        }
        Plugin.prototype.init = function() {
            var _this = this;
            if (_this.s.preload > _this.$items.length) {
                _this.s.preload = _this.$items.length;
            }
            var _hash = window.location.hash;
            if (_hash.indexOf('lg=' + this.s.galleryId) > 0) {
                _this.index = parseInt(_hash.split('&slide=')[1], 10);
                $('body').addClass('lg-from-hash');
                if (!$('body').hasClass('lg-on')) {
                    setTimeout(function() {
                        _this.build(_this.index);
                    });
                    $('body').addClass('lg-on');
                }
            }
            if (_this.s.dynamic) {
                _this.$el.trigger('onBeforeOpen.lg');
                _this.index = _this.s.index || 0;
                if (!$('body').hasClass('lg-on')) {
                    setTimeout(function() {
                        _this.build(_this.index);
                        $('body').addClass('lg-on');
                    });
                }
            } else {
                _this.$items.on('click.lgcustom', function(event) {
                    try {
                        event.preventDefault();
                        event.preventDefault();
                    } catch (er) {
                        event.returnValue = false;
                    }
                    _this.$el.trigger('onBeforeOpen.lg');
                    _this.index = _this.s.index || _this.$items.index(this);
                    if (!$('body').hasClass('lg-on')) {
                        _this.build(_this.index);
                        $('body').addClass('lg-on');
                    }
                });
            }
        };
        Plugin.prototype.build = function(index) {
            var _this = this;
            _this.structure();
            $.each($.fn.lightGallery.modules, function(key) {
                _this.modules[key] = new $.fn.lightGallery.modules[key](_this.el);
            });
            _this.slide(index, false, false, false);
            if (_this.s.keyPress) {
                _this.keyPress();
            }
            if (_this.$items.length > 1) {
                _this.arrow();
                setTimeout(function() {
                    _this.enableDrag();
                    _this.enableSwipe();
                }, 50);
                if (_this.s.mousewheel) {
                    _this.mousewheel();
                }
            } else {
                _this.$slide.on('click.lg', function() {
                    _this.$el.trigger('onSlideClick.lg');
                });
            }
            _this.counter();
            _this.closeGallery();
            _this.$el.trigger('onAfterOpen.lg');
            _this.$outer.on('mousemove.lg click.lg touchstart.lg', function() {
                _this.$outer.removeClass('lg-hide-items');
                clearTimeout(_this.hideBartimeout);
                _this.hideBartimeout = setTimeout(function() {
                    _this.$outer.addClass('lg-hide-items');
                }, _this.s.hideBarsDelay);
            });
            _this.$outer.trigger('mousemove.lg');
        };
        Plugin.prototype.structure = function() {
            var list = '';
            var controls = '';
            var i = 0;
            var subHtmlCont = '';
            var template;
            var _this = this;
            $('body').append('<div class="lg-backdrop"></div>');
            $('.lg-backdrop').css('transition-duration', this.s.backdropDuration + 'ms');
            for (i = 0; i < this.$items.length; i++) {
                list += '<div class="lg-item"></div>';
            }
            if (this.s.controls && this.$items.length > 1) {
                controls = '<div class="lg-actions">' + '<button class="lg-prev lg-icon">' + this.s.prevHtml + '</button>' + '<button class="lg-next lg-icon">' + this.s.nextHtml + '</button>' + '</div>';
            }
            if (this.s.appendSubHtmlTo === '.lg-sub-html') {
                subHtmlCont = '<div class="lg-sub-html"></div>';
            }
            template = '<div class="lg-outer ' + this.s.addClass + ' ' + this.s.startClass + '">' + '<div class="lg" style="width:' + this.s.width + '; height:' + this.s.height + '">' + '<div class="lg-inner">' + list + '</div>' + '<div class="lg-toolbar lg-group">' + '<span class="lg-close lg-icon"></span>' + '</div>' +
                controls +
                subHtmlCont + '</div>' + '</div>';
            $('body').append(template);
            this.$outer = $('.lg-outer');
            this.$slide = this.$outer.find('.lg-item');
            if (this.s.useLeft) {
                this.$outer.addClass('lg-use-left');
                this.s.mode = 'lg-slide';
            } else {
                this.$outer.addClass('lg-use-css3');
            }
            _this.setTop();
            $(window).on('resize.lg orientationchange.lg', function() {
                setTimeout(function() {
                    _this.setTop();
                }, 100);
            });
            this.$slide.eq(this.index).addClass('lg-current');
            if (this.doCss()) {
                this.$outer.addClass('lg-css3');
            } else {
                this.$outer.addClass('lg-css');
                this.s.speed = 0;
            }
            this.$outer.addClass(this.s.mode);
            if (this.s.enableDrag && this.$items.length > 1) {
                this.$outer.addClass('lg-grab');
            }
            if (this.s.showAfterLoad) {
                this.$outer.addClass('lg-show-after-load');
            }
            if (this.doCss()) {
                var $inner = this.$outer.find('.lg-inner');
                $inner.css('transition-timing-function', this.s.cssEasing);
                $inner.css('transition-duration', this.s.speed + 'ms');
            }
            setTimeout(function() {
                $('.lg-backdrop').addClass('in');
            });
            setTimeout(function() {
                _this.$outer.addClass('lg-visible');
            }, this.s.backdropDuration);
            if (this.s.download) {
                this.$outer.find('.lg-toolbar').append('<a id="lg-download" target="_blank" download class="lg-download lg-icon"></a>');
            }
            this.prevScrollTop = $(window).scrollTop();
        };
        Plugin.prototype.setTop = function() {
            if (this.s.height !== '100%') {
                var wH = $(window).height();
                var top = (wH - parseInt(this.s.height, 10)) / 2;
                var $lGallery = this.$outer.find('.lg');
                if (wH >= parseInt(this.s.height, 10)) {
                    $lGallery.css('top', top + 'px');
                } else {
                    $lGallery.css('top', '0px');
                }
            }
        };
        Plugin.prototype.doCss = function() {
            var support = function() {
                var transition = ['transition', 'MozTransition', 'WebkitTransition', 'OTransition', 'msTransition', 'KhtmlTransition'];
                var root = document.documentElement;
                var i = 0;
                for (i = 0; i < transition.length; i++) {
                    if (transition[i] in root.style) {
                        return true;
                    }
                }
            };
            if (support()) {
                return true;
            }
            return false;
        };
        Plugin.prototype.isVideo = function(src, index) {
            var html;
            if (this.s.dynamic) {
                html = this.s.dynamicEl[index].html;
            } else {
                html = this.$items.eq(index).attr('data-html');
            }
            if (!src) {
                if (html) {
                    return {
                        html5: true
                    };
                } else {
                    console.error('lightGallery :- data-src is not pvovided on slide item ' + (index + 1) + '. Please make sure the selector property is properly configured. More info - http://sachinchoolur.github.io/lightGallery/demos/html-markup.html');
                    return false;
                }
            }
            var youtube = src.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)/i);
            var vimeo = src.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i);
            var dailymotion = src.match(/\/\/(?:www\.)?dai.ly\/([0-9a-z\-_]+)/i);
            var vk = src.match(/\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/(?:video_ext\.php\?)(.*)/i);
            if (youtube) {
                return {
                    youtube: youtube
                };
            } else if (vimeo) {
                return {
                    vimeo: vimeo
                };
            } else if (dailymotion) {
                return {
                    dailymotion: dailymotion
                };
            } else if (vk) {
                return {
                    vk: vk
                };
            }
        };
        Plugin.prototype.counter = function() {
            if (this.s.counter) {
                $(this.s.appendCounterTo).append('<div id="lg-counter"><span id="lg-counter-current">' + (parseInt(this.index, 10) + 1) + '</span> / <span id="lg-counter-all">' + this.$items.length + '</span></div>');
            }
        };
        Plugin.prototype.addHtml = function(index) {
            var subHtml = null;
            var subHtmlUrl;
            var $currentEle;
            if (this.s.dynamic) {
                if (this.s.dynamicEl[index].subHtmlUrl) {
                    subHtmlUrl = this.s.dynamicEl[index].subHtmlUrl;
                } else {
                    subHtml = this.s.dynamicEl[index].subHtml;
                }
            } else {
                $currentEle = this.$items.eq(index);
                if ($currentEle.attr('data-sub-html-url')) {
                    subHtmlUrl = $currentEle.attr('data-sub-html-url');
                } else {
                    subHtml = $currentEle.attr('data-sub-html');
                    if (this.s.getCaptionFromTitleOrAlt && !subHtml) {
                        subHtml = $currentEle.attr('title') || $currentEle.find('img').first().attr('alt');
                    }
                }
            }
            if (!subHtmlUrl) {
                if (typeof subHtml !== 'undefined' && subHtml !== null) {
                    var fL = subHtml.substring(0, 1);
                    if (fL === '.' || fL === '#') {
                        if (this.s.subHtmlSelectorRelative && !this.s.dynamic) {
                            subHtml = $currentEle.find(subHtml).html();
                        } else {
                            subHtml = $(subHtml).html();
                        }
                    }
                } else {
                    subHtml = '';
                }
            }
            if (this.s.appendSubHtmlTo === '.lg-sub-html') {
                if (subHtmlUrl) {
                    this.$outer.find(this.s.appendSubHtmlTo).load(subHtmlUrl);
                } else {
                    this.$outer.find(this.s.appendSubHtmlTo).html(subHtml);
                }
            } else {
                if (subHtmlUrl) {
                    this.$slide.eq(index).load(subHtmlUrl);
                } else {
                    this.$slide.eq(index).append(subHtml);
                }
            }
            if (typeof subHtml !== 'undefined' && subHtml !== null) {
                if (subHtml === '') {
                    this.$outer.find(this.s.appendSubHtmlTo).addClass('lg-empty-html');
                } else {
                    this.$outer.find(this.s.appendSubHtmlTo).removeClass('lg-empty-html');
                }
            }
            this.$el.trigger('onAfterAppendSubHtml.lg', [index]);
        };
        Plugin.prototype.preload = function(index) {
            var i = 1;
            var j = 1;
            for (i = 1; i <= this.s.preload; i++) {
                if (i >= this.$items.length - index) {
                    break;
                }
                this.loadContent(index + i, false, 0);
            }
            for (j = 1; j <= this.s.preload; j++) {
                if (index - j < 0) {
                    break;
                }
                this.loadContent(index - j, false, 0);
            }
        };
        Plugin.prototype.loadContent = function(index, rec, delay) {
            var _this = this;
            var _hasPoster = false;
            var _$img;
            var _src;
            var _poster;
            var _srcset;
            var _sizes;
            var _html;
            var getResponsiveSrc = function(srcItms) {
                var rsWidth = [];
                var rsSrc = [];
                for (var i = 0; i < srcItms.length; i++) {
                    var __src = srcItms[i].split(' ');
                    if (__src[0] === '') {
                        __src.splice(0, 1);
                    }
                    rsSrc.push(__src[0]);
                    rsWidth.push(__src[1]);
                }
                var wWidth = $(window).width();
                for (var j = 0; j < rsWidth.length; j++) {
                    if (parseInt(rsWidth[j], 10) > wWidth) {
                        _src = rsSrc[j];
                        break;
                    }
                }
            };
            if (_this.s.dynamic) {
                if (_this.s.dynamicEl[index].poster) {
                    _hasPoster = true;
                    _poster = _this.s.dynamicEl[index].poster;
                }
                _html = _this.s.dynamicEl[index].html;
                _src = _this.s.dynamicEl[index].src;
                if (_this.s.dynamicEl[index].responsive) {
                    var srcDyItms = _this.s.dynamicEl[index].responsive.split(',');
                    getResponsiveSrc(srcDyItms);
                }
                _srcset = _this.s.dynamicEl[index].srcset;
                _sizes = _this.s.dynamicEl[index].sizes;
            } else {
                if (_this.$items.eq(index).attr('data-poster')) {
                    _hasPoster = true;
                    _poster = _this.$items.eq(index).attr('data-poster');
                }
                _html = _this.$items.eq(index).attr('data-html');
                _src = _this.$items.eq(index).attr('href') || _this.$items.eq(index).attr('data-src');
                if (_this.$items.eq(index).attr('data-responsive')) {
                    var srcItms = _this.$items.eq(index).attr('data-responsive').split(',');
                    getResponsiveSrc(srcItms);
                }
                _srcset = _this.$items.eq(index).attr('data-srcset');
                _sizes = _this.$items.eq(index).attr('data-sizes');
            }
            var iframe = false;
            if (_this.s.dynamic) {
                if (_this.s.dynamicEl[index].iframe) {
                    iframe = true;
                }
            } else {
                if (_this.$items.eq(index).attr('data-iframe') === 'true') {
                    iframe = true;
                }
            }
            var _isVideo = _this.isVideo(_src, index);
            if (!_this.$slide.eq(index).hasClass('lg-loaded')) {
                if (iframe) {
                    _this.$slide.eq(index).prepend('<div class="lg-video-cont lg-has-iframe" style="max-width:' + _this.s.iframeMaxWidth + '"><div class="lg-video"><iframe class="lg-object" frameborder="0" src="' + _src + '"  allowfullscreen="true"></iframe></div></div>');
                } else if (_hasPoster) {
                    var videoClass = '';
                    if (_isVideo && _isVideo.youtube) {
                        videoClass = 'lg-has-youtube';
                    } else if (_isVideo && _isVideo.vimeo) {
                        videoClass = 'lg-has-vimeo';
                    } else {
                        videoClass = 'lg-has-html5';
                    }
                    _this.$slide.eq(index).prepend('<div class="lg-video-cont ' + videoClass + ' "><div class="lg-video"><span class="lg-video-play"></span><img class="lg-object lg-has-poster" src="' + _poster + '" /></div></div>');
                } else if (_isVideo) {
                    _this.$slide.eq(index).prepend('<div class="lg-video-cont "><div class="lg-video"></div></div>');
                    _this.$el.trigger('hasVideo.lg', [index, _src, _html]);
                } else {
                    _this.$slide.eq(index).prepend('<div class="lg-img-wrap"><img class="lg-object lg-image" src="' + _src + '" /></div>');
                }
                _this.$el.trigger('onAferAppendSlide.lg', [index]);
                _$img = _this.$slide.eq(index).find('.lg-object');
                if (_sizes) {
                    _$img.attr('sizes', _sizes);
                }
                if (_srcset) {
                    _$img.attr('srcset', _srcset);
                    try {
                        picturefill({
                            elements: [_$img[0]]
                        });
                    } catch (e) {
                        console.warn('lightGallery :- If you want srcset to be supported for older browser please include picturefil version 2 javascript library in your document.');
                    }
                }
                if (this.s.appendSubHtmlTo !== '.lg-sub-html') {
                    _this.addHtml(index);
                }
                _this.$slide.eq(index).addClass('lg-loaded');
            }
            _this.$slide.eq(index).find('.lg-object').on('load.lg error.lg', function() {
                var _speed = 0;
                if (delay && !$('body').hasClass('lg-from-hash')) {
                    _speed = delay;
                }
                setTimeout(function() {
                    _this.$slide.eq(index).addClass('lg-complete');
                    _this.$el.trigger('onSlideItemLoad.lg', [index, delay || 0]);
                }, _speed);
            });
            if (_isVideo && _isVideo.html5 && !_hasPoster) {
                _this.$slide.eq(index).addClass('lg-complete');
            }
            if (rec === true) {
                if (!_this.$slide.eq(index).hasClass('lg-complete')) {
                    _this.$slide.eq(index).find('.lg-object').on('load.lg error.lg', function() {
                        _this.preload(index);
                    });
                } else {
                    _this.preload(index);
                }
            }
        };
        Plugin.prototype.slide = function(index, fromTouch, fromThumb, direction) {
            var _prevIndex = this.$outer.find('.lg-current').index();
            var _this = this;
            if (_this.lGalleryOn && (_prevIndex === index)) {
                return;
            }
            var _length = this.$slide.length;
            var _time = _this.lGalleryOn ? this.s.speed : 0;
            if (!_this.lgBusy) {
                if (this.s.download) {
                    var _src;
                    if (_this.s.dynamic) {
                        _src = _this.s.dynamicEl[index].downloadUrl !== false && (_this.s.dynamicEl[index].downloadUrl || _this.s.dynamicEl[index].src);
                    } else {
                        _src = _this.$items.eq(index).attr('data-download-url') !== 'false' && (_this.$items.eq(index).attr('data-download-url') || _this.$items.eq(index).attr('href') || _this.$items.eq(index).attr('data-src'));
                    }
                    if (_src) {
                        $('#lg-download').attr('href', _src);
                        _this.$outer.removeClass('lg-hide-download');
                    } else {
                        _this.$outer.addClass('lg-hide-download');
                    }
                }
                this.$el.trigger('onBeforeSlide.lg', [_prevIndex, index, fromTouch, fromThumb]);
                _this.lgBusy = true;
                clearTimeout(_this.hideBartimeout);
                if (this.s.appendSubHtmlTo === '.lg-sub-html') {
                    setTimeout(function() {
                        _this.addHtml(index);
                    }, _time);
                }
                this.arrowDisable(index);
                if (!direction) {
                    if (index < _prevIndex) {
                        direction = 'prev';
                    } else if (index > _prevIndex) {
                        direction = 'next';
                    }
                }
                if (!fromTouch) {
                    _this.$outer.addClass('lg-no-trans');
                    this.$slide.removeClass('lg-prev-slide lg-next-slide');
                    if (direction === 'prev') {
                        this.$slide.eq(index).addClass('lg-prev-slide');
                        this.$slide.eq(_prevIndex).addClass('lg-next-slide');
                    } else {
                        this.$slide.eq(index).addClass('lg-next-slide');
                        this.$slide.eq(_prevIndex).addClass('lg-prev-slide');
                    }
                    setTimeout(function() {
                        _this.$slide.removeClass('lg-current');
                        _this.$slide.eq(index).addClass('lg-current');
                        _this.$outer.removeClass('lg-no-trans');
                    }, 50);
                } else {
                    this.$slide.removeClass('lg-prev-slide lg-current lg-next-slide');
                    var touchPrev;
                    var touchNext;
                    if (_length > 2) {
                        touchPrev = index - 1;
                        touchNext = index + 1;
                        if ((index === 0) && (_prevIndex === _length - 1)) {
                            touchNext = 0;
                            touchPrev = _length - 1;
                        } else if ((index === _length - 1) && (_prevIndex === 0)) {
                            touchNext = 0;
                            touchPrev = _length - 1;
                        }
                    } else {
                        touchPrev = 0;
                        touchNext = 1;
                    }
                    if (direction === 'prev') {
                        _this.$slide.eq(touchNext).addClass('lg-next-slide');
                    } else {
                        _this.$slide.eq(touchPrev).addClass('lg-prev-slide');
                    }
                    _this.$slide.eq(index).addClass('lg-current');
                }
                if (_this.lGalleryOn) {
                    setTimeout(function() {
                        _this.loadContent(index, true, 0);
                    }, this.s.speed + 50);
                    setTimeout(function() {
                        _this.lgBusy = false;
                        _this.$el.trigger('onAfterSlide.lg', [_prevIndex, index, fromTouch, fromThumb]);
                    }, this.s.speed);
                } else {
                    _this.loadContent(index, true, _this.s.backdropDuration);
                    _this.lgBusy = false;
                    _this.$el.trigger('onAfterSlide.lg', [_prevIndex, index, fromTouch, fromThumb]);
                }
                _this.lGalleryOn = true;
                if (this.s.counter) {
                    $('#lg-counter-current').text(index + 1);
                }
            }
            _this.index = index;
        };
        Plugin.prototype.goToNextSlide = function(fromTouch) {
            var _this = this;
            var _loop = _this.s.loop;
            if (fromTouch && _this.$slide.length < 3) {
                _loop = false;
            }
            if (!_this.lgBusy) {
                if ((_this.index + 1) < _this.$slide.length) {
                    _this.index++;
                    _this.$el.trigger('onBeforeNextSlide.lg', [_this.index]);
                    _this.slide(_this.index, fromTouch, false, 'next');
                } else {
                    if (_loop) {
                        _this.index = 0;
                        _this.$el.trigger('onBeforeNextSlide.lg', [_this.index]);
                        _this.slide(_this.index, fromTouch, false, 'next');
                    } else if (_this.s.slideEndAnimatoin && !fromTouch) {
                        _this.$outer.addClass('lg-right-end');
                        setTimeout(function() {
                            _this.$outer.removeClass('lg-right-end');
                        }, 400);
                    }
                }
            }
        };
        Plugin.prototype.goToPrevSlide = function(fromTouch) {
            var _this = this;
            var _loop = _this.s.loop;
            if (fromTouch && _this.$slide.length < 3) {
                _loop = false;
            }
            if (!_this.lgBusy) {
                if (_this.index > 0) {
                    _this.index--;
                    _this.$el.trigger('onBeforePrevSlide.lg', [_this.index, fromTouch]);
                    _this.slide(_this.index, fromTouch, false, 'prev');
                } else {
                    if (_loop) {
                        _this.index = _this.$items.length - 1;
                        _this.$el.trigger('onBeforePrevSlide.lg', [_this.index, fromTouch]);
                        _this.slide(_this.index, fromTouch, false, 'prev');
                    } else if (_this.s.slideEndAnimatoin && !fromTouch) {
                        _this.$outer.addClass('lg-left-end');
                        setTimeout(function() {
                            _this.$outer.removeClass('lg-left-end');
                        }, 400);
                    }
                }
            }
        };
        Plugin.prototype.keyPress = function() {
            var _this = this;
            if (this.$items.length > 1) {
                $(window).on('keyup.lg', function(e) {
                    if (_this.$items.length > 1) {
                        if (e.keyCode === 37) {
                            e.preventDefault();
                            _this.goToPrevSlide();
                        }
                        if (e.keyCode === 39) {
                            e.preventDefault();
                            _this.goToNextSlide();
                        }
                    }
                });
            }
            $(window).on('keydown.lg', function(e) {
                if (_this.s.escKey === true && e.keyCode === 27) {
                    e.preventDefault();
                    if (!_this.$outer.hasClass('lg-thumb-open')) {
                        _this.destroy();
                    } else {
                        _this.$outer.removeClass('lg-thumb-open');
                    }
                }
            });
        };
        Plugin.prototype.arrow = function() {
            var _this = this;
            this.$outer.find('.lg-prev').on('click.lg', function() {
                _this.goToPrevSlide();
            });
            this.$outer.find('.lg-next').on('click.lg', function() {
                _this.goToNextSlide();
            });
        };
        Plugin.prototype.arrowDisable = function(index) {
            if (!this.s.loop && this.s.hideControlOnEnd) {
                if ((index + 1) < this.$slide.length) {
                    this.$outer.find('.lg-next').removeAttr('disabled').removeClass('disabled');
                } else {
                    this.$outer.find('.lg-next').attr('disabled', 'disabled').addClass('disabled');
                }
                if (index > 0) {
                    this.$outer.find('.lg-prev').removeAttr('disabled').removeClass('disabled');
                } else {
                    this.$outer.find('.lg-prev').attr('disabled', 'disabled').addClass('disabled');
                }
            }
        };
        Plugin.prototype.setTranslate = function($el, xValue, yValue) {
            if (this.s.useLeft) {
                $el.css('left', xValue);
            } else {
                $el.css({
                    transform: 'translate3d(' + (xValue) + 'px, ' + yValue + 'px, 0px)'
                });
            }
        };
        Plugin.prototype.touchMove = function(startCoords, endCoords) {
            var distance = endCoords - startCoords;
            if (Math.abs(distance) > 15) {
                this.$outer.addClass('lg-dragging');
                this.setTranslate(this.$slide.eq(this.index), distance, 0);
                this.setTranslate($('.lg-prev-slide'), -this.$slide.eq(this.index).width() + distance, 0);
                this.setTranslate($('.lg-next-slide'), this.$slide.eq(this.index).width() + distance, 0);
            }
        };
        Plugin.prototype.touchEnd = function(distance) {
            var _this = this;
            if (_this.s.mode !== 'lg-slide') {
                _this.$outer.addClass('lg-slide');
            }
            this.$slide.not('.lg-current, .lg-prev-slide, .lg-next-slide').css('opacity', '0');
            setTimeout(function() {
                _this.$outer.removeClass('lg-dragging');
                if ((distance < 0) && (Math.abs(distance) > _this.s.swipeThreshold)) {
                    _this.goToNextSlide(true);
                } else if ((distance > 0) && (Math.abs(distance) > _this.s.swipeThreshold)) {
                    _this.goToPrevSlide(true);
                } else if (Math.abs(distance) < 5) {
                    _this.$el.trigger('onSlideClick.lg');
                }
                _this.$slide.removeAttr('style');
            });
            setTimeout(function() {
                if (!_this.$outer.hasClass('lg-dragging') && _this.s.mode !== 'lg-slide') {
                    _this.$outer.removeClass('lg-slide');
                }
            }, _this.s.speed + 100);
        };
        Plugin.prototype.enableSwipe = function() {
            var _this = this;
            var startCoords = 0;
            var endCoords = 0;
            var isMoved = false;
            if (_this.s.enableSwipe && _this.doCss()) {
                _this.$slide.on('touchstart.lg', function(e) {
                    if (!_this.$outer.hasClass('lg-zoomed') && !_this.lgBusy) {
                        e.preventDefault();
                        _this.manageSwipeClass();
                        startCoords = e.originalEvent.targetTouches[0].pageX;
                    }
                });
                _this.$slide.on('touchmove.lg', function(e) {
                    if (!_this.$outer.hasClass('lg-zoomed')) {
                        e.preventDefault();
                        endCoords = e.originalEvent.targetTouches[0].pageX;
                        _this.touchMove(startCoords, endCoords);
                        isMoved = true;
                    }
                });
                _this.$slide.on('touchend.lg', function() {
                    if (!_this.$outer.hasClass('lg-zoomed')) {
                        if (isMoved) {
                            isMoved = false;
                            _this.touchEnd(endCoords - startCoords);
                        } else {
                            _this.$el.trigger('onSlideClick.lg');
                        }
                    }
                });
            }
        };
        Plugin.prototype.enableDrag = function() {
            var _this = this;
            var startCoords = 0;
            var endCoords = 0;
            var isDraging = false;
            var isMoved = false;
            if (_this.s.enableDrag && _this.doCss()) {
                _this.$slide.on('mousedown.lg', function(e) {
                    if (!_this.$outer.hasClass('lg-zoomed') && !_this.lgBusy && !$(e.target).text().trim()) {
                        e.preventDefault();
                        _this.manageSwipeClass();
                        startCoords = e.pageX;
                        isDraging = true;
                        _this.$outer.scrollLeft += 1;
                        _this.$outer.scrollLeft -= 1;
                        _this.$outer.removeClass('lg-grab').addClass('lg-grabbing');
                        _this.$el.trigger('onDragstart.lg');
                    }
                });
                $(window).on('mousemove.lg', function(e) {
                    if (isDraging) {
                        isMoved = true;
                        endCoords = e.pageX;
                        _this.touchMove(startCoords, endCoords);
                        _this.$el.trigger('onDragmove.lg');
                    }
                });
                $(window).on('mouseup.lg', function(e) {
                    if (isMoved) {
                        isMoved = false;
                        _this.touchEnd(endCoords - startCoords);
                        _this.$el.trigger('onDragend.lg');
                    } else if ($(e.target).hasClass('lg-object') || $(e.target).hasClass('lg-video-play')) {
                        _this.$el.trigger('onSlideClick.lg');
                    }
                    if (isDraging) {
                        isDraging = false;
                        _this.$outer.removeClass('lg-grabbing').addClass('lg-grab');
                    }
                });
            }
        };
        Plugin.prototype.manageSwipeClass = function() {
            var _touchNext = this.index + 1;
            var _touchPrev = this.index - 1;
            if (this.s.loop && this.$slide.length > 2) {
                if (this.index === 0) {
                    _touchPrev = this.$slide.length - 1;
                } else if (this.index === this.$slide.length - 1) {
                    _touchNext = 0;
                }
            }
            this.$slide.removeClass('lg-next-slide lg-prev-slide');
            if (_touchPrev > -1) {
                this.$slide.eq(_touchPrev).addClass('lg-prev-slide');
            }
            this.$slide.eq(_touchNext).addClass('lg-next-slide');
        };
        Plugin.prototype.mousewheel = function() {
            var _this = this;
            _this.$outer.on('mousewheel.lg', function(e) {
                if (!e.deltaY) {
                    return;
                }
                if (e.deltaY > 0) {
                    _this.goToPrevSlide();
                } else {
                    _this.goToNextSlide();
                }
                e.preventDefault();
            });
        };
        Plugin.prototype.closeGallery = function() {
            var _this = this;
            var mousedown = false;
            this.$outer.find('.lg-close').on('click.lg', function() {
                _this.destroy();
            });
            if (_this.s.closable) {
                _this.$outer.on('mousedown.lg', function(e) {
                    if ($(e.target).is('.lg-outer') || $(e.target).is('.lg-item ') || $(e.target).is('.lg-img-wrap')) {
                        mousedown = true;
                    } else {
                        mousedown = false;
                    }
                });
                _this.$outer.on('mousemove.lg', function() {
                    mousedown = false;
                });
                _this.$outer.on('mouseup.lg', function(e) {
                    if ($(e.target).is('.lg-outer') || $(e.target).is('.lg-item ') || $(e.target).is('.lg-img-wrap') && mousedown) {
                        if (!_this.$outer.hasClass('lg-dragging')) {
                            _this.destroy();
                        }
                    }
                });
            }
        };
        Plugin.prototype.destroy = function(d) {
            var _this = this;
            if (!d) {
                _this.$el.trigger('onBeforeClose.lg');
                $(window).scrollTop(_this.prevScrollTop);
            }
            if (d) {
                if (!_this.s.dynamic) {
                    this.$items.off('click.lg click.lgcustom');
                }
                $.removeData(_this.el, 'lightGallery');
            }
            this.$el.off('.lg.tm');
            $.each($.fn.lightGallery.modules, function(key) {
                if (_this.modules[key]) {
                    _this.modules[key].destroy();
                }
            });
            this.lGalleryOn = false;
            clearTimeout(_this.hideBartimeout);
            this.hideBartimeout = false;
            $(window).off('.lg');
            $('body').removeClass('lg-on lg-from-hash');
            if (_this.$outer) {
                _this.$outer.removeClass('lg-visible');
            }
            $('.lg-backdrop').removeClass('in');
            setTimeout(function() {
                if (_this.$outer) {
                    _this.$outer.remove();
                }
                $('.lg-backdrop').remove();
                if (!d) {
                    _this.$el.trigger('onCloseAfter.lg');
                }
            }, _this.s.backdropDuration + 50);
        };
        $.fn.lightGallery = function(options) {
            return this.each(function() {
                if (!$.data(this, 'lightGallery')) {
                    $.data(this, 'lightGallery', new Plugin(this, options));
                } else {
                    try {
                        $(this).data('lightGallery').init();
                    } catch (err) {
                        console.error('lightGallery has not initiated properly');
                    }
                }
            });
        };
        $.fn.lightGallery.modules = {};
    })();
}));
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], function(a0) {
            return (factory(a0));
        });
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(this, function($) {
    (function() {
        'use strict';
        var defaults = {
            autoplay: false,
            pause: 5000,
            progressBar: true,
            fourceAutoplay: false,
            autoplayControls: true,
            appendAutoplayControlsTo: '.lg-toolbar'
        };
        var Autoplay = function(element) {
            this.core = $(element).data('lightGallery');
            this.$el = $(element);
            if (this.core.$items.length < 2) {
                return false;
            }
            this.core.s = $.extend({}, defaults, this.core.s);
            this.interval = false;
            this.fromAuto = true;
            this.canceledOnTouch = false;
            this.fourceAutoplayTemp = this.core.s.fourceAutoplay;
            if (!this.core.doCss()) {
                this.core.s.progressBar = false;
            }
            this.init();
            return this;
        };
        Autoplay.prototype.init = function() {
            var _this = this;
            if (_this.core.s.autoplayControls) {
                _this.controls();
            }
            if (_this.core.s.progressBar) {
                _this.core.$outer.find('.lg').append('<div class="lg-progress-bar"><div class="lg-progress"></div></div>');
            }
            _this.progress();
            if (_this.core.s.autoplay) {
                _this.$el.one('onSlideItemLoad.lg.tm', function() {
                    _this.startlAuto();
                });
            }
            _this.$el.on('onDragstart.lg.tm touchstart.lg.tm', function() {
                if (_this.interval) {
                    _this.cancelAuto();
                    _this.canceledOnTouch = true;
                }
            });
            _this.$el.on('onDragend.lg.tm touchend.lg.tm onSlideClick.lg.tm', function() {
                if (!_this.interval && _this.canceledOnTouch) {
                    _this.startlAuto();
                    _this.canceledOnTouch = false;
                }
            });
        };
        Autoplay.prototype.progress = function() {
            var _this = this;
            var _$progressBar;
            var _$progress;
            _this.$el.on('onBeforeSlide.lg.tm', function() {
                if (_this.core.s.progressBar && _this.fromAuto) {
                    _$progressBar = _this.core.$outer.find('.lg-progress-bar');
                    _$progress = _this.core.$outer.find('.lg-progress');
                    if (_this.interval) {
                        _$progress.removeAttr('style');
                        _$progressBar.removeClass('lg-start');
                        setTimeout(function() {
                            _$progress.css('transition', 'width ' + (_this.core.s.speed + _this.core.s.pause) + 'ms ease 0s');
                            _$progressBar.addClass('lg-start');
                        }, 20);
                    }
                }
                if (!_this.fromAuto && !_this.core.s.fourceAutoplay) {
                    _this.cancelAuto();
                }
                _this.fromAuto = false;
            });
        };
        Autoplay.prototype.controls = function() {
            var _this = this;
            var _html = '<span class="lg-autoplay-button lg-icon"></span>';
            $(this.core.s.appendAutoplayControlsTo).append(_html);
            _this.core.$outer.find('.lg-autoplay-button').on('click.lg', function() {
                if ($(_this.core.$outer).hasClass('lg-show-autoplay')) {
                    _this.cancelAuto();
                    _this.core.s.fourceAutoplay = false;
                } else {
                    if (!_this.interval) {
                        _this.startlAuto();
                        _this.core.s.fourceAutoplay = _this.fourceAutoplayTemp;
                    }
                }
            });
        };
        Autoplay.prototype.startlAuto = function() {
            var _this = this;
            _this.core.$outer.find('.lg-progress').css('transition', 'width ' + (_this.core.s.speed + _this.core.s.pause) + 'ms ease 0s');
            _this.core.$outer.addClass('lg-show-autoplay');
            _this.core.$outer.find('.lg-progress-bar').addClass('lg-start');
            _this.interval = setInterval(function() {
                if (_this.core.index + 1 < _this.core.$items.length) {
                    _this.core.index++;
                } else {
                    _this.core.index = 0;
                }
                _this.fromAuto = true;
                _this.core.slide(_this.core.index, false, false, 'next');
            }, _this.core.s.speed + _this.core.s.pause);
        };
        Autoplay.prototype.cancelAuto = function() {
            clearInterval(this.interval);
            this.interval = false;
            this.core.$outer.find('.lg-progress').removeAttr('style');
            this.core.$outer.removeClass('lg-show-autoplay');
            this.core.$outer.find('.lg-progress-bar').removeClass('lg-start');
        };
        Autoplay.prototype.destroy = function() {
            this.cancelAuto();
            this.core.$outer.find('.lg-progress-bar').remove();
        };
        $.fn.lightGallery.modules.autoplay = Autoplay;
    })();
}));
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], function(a0) {
            return (factory(a0));
        });
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(this, function($) {
    (function() {
        'use strict';
        var defaults = {
            fullScreen: true
        };
        var Fullscreen = function(element) {
            this.core = $(element).data('lightGallery');
            this.$el = $(element);
            this.core.s = $.extend({}, defaults, this.core.s);
            this.init();
            return this;
        };
        Fullscreen.prototype.init = function() {
            var fullScreen = '';
            if (this.core.s.fullScreen) {
                if (!document.fullscreenEnabled && !document.webkitFullscreenEnabled && !document.mozFullScreenEnabled && !document.msFullscreenEnabled) {
                    return;
                } else {
                    fullScreen = '<span class="lg-fullscreen lg-icon"></span>';
                    this.core.$outer.find('.lg-toolbar').append(fullScreen);
                    this.fullScreen();
                }
            }
        };
        Fullscreen.prototype.requestFullscreen = function() {
            var el = document.documentElement;
            if (el.requestFullscreen) {
                el.requestFullscreen();
            } else if (el.msRequestFullscreen) {
                el.msRequestFullscreen();
            } else if (el.mozRequestFullScreen) {
                el.mozRequestFullScreen();
            } else if (el.webkitRequestFullscreen) {
                el.webkitRequestFullscreen();
            }
        };
        Fullscreen.prototype.exitFullscreen = function() {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        };
        Fullscreen.prototype.fullScreen = function() {
            var _this = this;
            $(document).on('fullscreenchange.lg webkitfullscreenchange.lg mozfullscreenchange.lg MSFullscreenChange.lg', function() {
                _this.core.$outer.toggleClass('lg-fullscreen-on');
            });
            this.core.$outer.find('.lg-fullscreen').on('click.lg', function() {
                if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
                    _this.requestFullscreen();
                } else {
                    _this.exitFullscreen();
                }
            });
        };
        Fullscreen.prototype.destroy = function() {
            $(document).off('fullscreenchange.lg webkitfullscreenchange.lg mozfullscreenchange.lg MSFullscreenChange.lg');
        };
        $.fn.lightGallery.modules.fullscreen = Fullscreen;
    })();
}));
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], function(a0) {
            return (factory(a0));
        });
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(this, function($) {
    (function() {
        'use strict';
        var defaults = {
            pager: false
        };
        var Pager = function(element) {
            this.core = $(element).data('lightGallery');
            this.$el = $(element);
            this.core.s = $.extend({}, defaults, this.core.s);
            if (this.core.s.pager && this.core.$items.length > 1) {
                this.init();
            }
            return this;
        };
        Pager.prototype.init = function() {
            var _this = this;
            var pagerList = '';
            var $pagerCont;
            var $pagerOuter;
            var timeout;
            _this.core.$outer.find('.lg').append('<div class="lg-pager-outer"></div>');
            if (_this.core.s.dynamic) {
                for (var i = 0; i < _this.core.s.dynamicEl.length; i++) {
                    pagerList += '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + _this.core.s.dynamicEl[i].thumb + '" /></div></span>';
                }
            } else {
                _this.core.$items.each(function() {
                    if (!_this.core.s.exThumbImage) {
                        pagerList += '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + $(this).find('img').attr('src') + '" /></div></span>';
                    } else {
                        pagerList += '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + $(this).attr(_this.core.s.exThumbImage) + '" /></div></span>';
                    }
                });
            }
            $pagerOuter = _this.core.$outer.find('.lg-pager-outer');
            $pagerOuter.html(pagerList);
            $pagerCont = _this.core.$outer.find('.lg-pager-cont');
            $pagerCont.on('click.lg touchend.lg', function() {
                var _$this = $(this);
                _this.core.index = _$this.index();
                _this.core.slide(_this.core.index, false, true, false);
            });
            $pagerOuter.on('mouseover.lg', function() {
                clearTimeout(timeout);
                $pagerOuter.addClass('lg-pager-hover');
            });
            $pagerOuter.on('mouseout.lg', function() {
                timeout = setTimeout(function() {
                    $pagerOuter.removeClass('lg-pager-hover');
                });
            });
            _this.core.$el.on('onBeforeSlide.lg.tm', function(e, prevIndex, index) {
                $pagerCont.removeClass('lg-pager-active');
                $pagerCont.eq(index).addClass('lg-pager-active');
            });
        };
        Pager.prototype.destroy = function() {};
        $.fn.lightGallery.modules.pager = Pager;
    })();
}));
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], function(a0) {
            return (factory(a0));
        });
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(this, function($) {
    (function() {
        'use strict';
        var defaults = {
            thumbnail: true,
            animateThumb: true,
            currentPagerPosition: 'middle',
            thumbWidth: 100,
            thumbHeight: '80px',
            thumbContHeight: 100,
            thumbMargin: 5,
            exThumbImage: false,
            showThumbByDefault: true,
            toogleThumb: true,
            pullCaptionUp: true,
            enableThumbDrag: true,
            enableThumbSwipe: true,
            swipeThreshold: 50,
            loadYoutubeThumbnail: true,
            youtubeThumbSize: 1,
            loadVimeoThumbnail: true,
            vimeoThumbSize: 'thumbnail_small',
            loadDailymotionThumbnail: true
        };
        var Thumbnail = function(element) {
            this.core = $(element).data('lightGallery');
            this.core.s = $.extend({}, defaults, this.core.s);
            this.$el = $(element);
            this.$thumbOuter = null;
            this.thumbOuterWidth = 0;
            this.thumbTotalWidth = (this.core.$items.length * (this.core.s.thumbWidth + this.core.s.thumbMargin));
            this.thumbIndex = this.core.index;
            if (this.core.s.animateThumb) {
                this.core.s.thumbHeight = '100%';
            }
            this.left = 0;
            this.init();
            return this;
        };
        Thumbnail.prototype.init = function() {
            var _this = this;
            if (this.core.s.thumbnail && this.core.$items.length > 1) {
                if (this.core.s.showThumbByDefault) {
                    setTimeout(function() {
                        _this.core.$outer.addClass('lg-thumb-open');
                    }, 700);
                }
                if (this.core.s.pullCaptionUp) {
                    this.core.$outer.addClass('lg-pull-caption-up');
                }
                this.build();
                if (this.core.s.animateThumb && this.core.doCss()) {
                    if (this.core.s.enableThumbDrag) {
                        this.enableThumbDrag();
                    }
                    if (this.core.s.enableThumbSwipe) {
                        this.enableThumbSwipe();
                    }
                    this.thumbClickable = false;
                } else {
                    this.thumbClickable = true;
                }
                this.toogle();
                this.thumbkeyPress();
            }
        };
        Thumbnail.prototype.build = function() {
            var _this = this;
            var thumbList = '';
            var vimeoErrorThumbSize = '';
            var $thumb;
            var html = '<div class="lg-thumb-outer">' + '<div class="lg-thumb lg-group">' + '</div>' + '</div>';
            switch (this.core.s.vimeoThumbSize) {
                case 'thumbnail_large':
                    vimeoErrorThumbSize = '640';
                    break;
                case 'thumbnail_medium':
                    vimeoErrorThumbSize = '200x150';
                    break;
                case 'thumbnail_small':
                    vimeoErrorThumbSize = '100x75';
            }
            _this.core.$outer.addClass('lg-has-thumb');
            _this.core.$outer.find('.lg').append(html);
            _this.$thumbOuter = _this.core.$outer.find('.lg-thumb-outer');
            _this.thumbOuterWidth = _this.$thumbOuter.width();
            if (_this.core.s.animateThumb) {
                _this.core.$outer.find('.lg-thumb').css({
                    width: _this.thumbTotalWidth + 'px',
                    position: 'relative'
                });
            }
            if (this.core.s.animateThumb) {
                _this.$thumbOuter.css('height', _this.core.s.thumbContHeight + 'px');
            }

            function getThumb(src, thumb, index) {
                var isVideo = _this.core.isVideo(src, index) || {};
                var thumbImg;
                var vimeoId = '';
                if (isVideo.youtube || isVideo.vimeo || isVideo.dailymotion) {
                    if (isVideo.youtube) {
                        if (_this.core.s.loadYoutubeThumbnail) {
                            thumbImg = '//img.youtube.com/vi/' + isVideo.youtube[1] + '/' + _this.core.s.youtubeThumbSize + '.jpg';
                        } else {
                            thumbImg = thumb;
                        }
                    } else if (isVideo.vimeo) {
                        if (_this.core.s.loadVimeoThumbnail) {
                            thumbImg = '//i.vimeocdn.com/video/error_' + vimeoErrorThumbSize + '.jpg';
                            vimeoId = isVideo.vimeo[1];
                        } else {
                            thumbImg = thumb;
                        }
                    } else if (isVideo.dailymotion) {
                        if (_this.core.s.loadDailymotionThumbnail) {
                            thumbImg = '//www.dailymotion.com/thumbnail/video/' + isVideo.dailymotion[1];
                        } else {
                            thumbImg = thumb;
                        }
                    }
                } else {
                    thumbImg = thumb;
                }
                thumbList += '<div data-vimeo-id="' + vimeoId + '" class="lg-thumb-item" style="width:' + _this.core.s.thumbWidth + 'px; height: ' + _this.core.s.thumbHeight + '; margin-right: ' + _this.core.s.thumbMargin + 'px"><img src="' + thumbImg + '" /></div>';
                vimeoId = '';
            }
            if (_this.core.s.dynamic) {
                for (var i = 0; i < _this.core.s.dynamicEl.length; i++) {
                    getThumb(_this.core.s.dynamicEl[i].src, _this.core.s.dynamicEl[i].thumb, i);
                }
            } else {
                _this.core.$items.each(function(i) {
                    if (!_this.core.s.exThumbImage) {
                        getThumb($(this).attr('href') || $(this).attr('data-src'), $(this).find('img').attr('src'), i);
                    } else {
                        getThumb($(this).attr('href') || $(this).attr('data-src'), $(this).attr(_this.core.s.exThumbImage), i);
                    }
                });
            }
            _this.core.$outer.find('.lg-thumb').html(thumbList);
            $thumb = _this.core.$outer.find('.lg-thumb-item');
            $thumb.each(function() {
                var $this = $(this);
                var vimeoVideoId = $this.attr('data-vimeo-id');
                if (vimeoVideoId) {
                    $.getJSON('//www.vimeo.com/api/v2/video/' + vimeoVideoId + '.json?callback=?', {
                        format: 'json'
                    }, function(data) {
                        $this.find('img').attr('src', data[0][_this.core.s.vimeoThumbSize]);
                    });
                }
            });
            $thumb.eq(_this.core.index).addClass('active');
            _this.core.$el.on('onBeforeSlide.lg.tm', function() {
                $thumb.removeClass('active');
                $thumb.eq(_this.core.index).addClass('active');
            });
            $thumb.on('click.lg touchend.lg', function() {
                var _$this = $(this);
                setTimeout(function() {
                    if ((_this.thumbClickable && !_this.core.lgBusy) || !_this.core.doCss()) {
                        _this.core.index = _$this.index();
                        _this.core.slide(_this.core.index, false, true, false);
                    }
                }, 50);
            });
            _this.core.$el.on('onBeforeSlide.lg.tm', function() {
                _this.animateThumb(_this.core.index);
            });
            $(window).on('resize.lg.thumb orientationchange.lg.thumb', function() {
                setTimeout(function() {
                    _this.animateThumb(_this.core.index);
                    _this.thumbOuterWidth = _this.$thumbOuter.width();
                }, 200);
            });
        };
        Thumbnail.prototype.setTranslate = function(value) {
            this.core.$outer.find('.lg-thumb').css({
                transform: 'translate3d(-' + (value) + 'px, 0px, 0px)'
            });
        };
        Thumbnail.prototype.animateThumb = function(index) {
            var $thumb = this.core.$outer.find('.lg-thumb');
            if (this.core.s.animateThumb) {
                var position;
                switch (this.core.s.currentPagerPosition) {
                    case 'left':
                        position = 0;
                        break;
                    case 'middle':
                        position = (this.thumbOuterWidth / 2) - (this.core.s.thumbWidth / 2);
                        break;
                    case 'right':
                        position = this.thumbOuterWidth - this.core.s.thumbWidth;
                }
                this.left = ((this.core.s.thumbWidth + this.core.s.thumbMargin) * index - 1) - position;
                if (this.left > (this.thumbTotalWidth - this.thumbOuterWidth)) {
                    this.left = this.thumbTotalWidth - this.thumbOuterWidth;
                }
                if (this.left < 0) {
                    this.left = 0;
                }
                if (this.core.lGalleryOn) {
                    if (!$thumb.hasClass('on')) {
                        this.core.$outer.find('.lg-thumb').css('transition-duration', this.core.s.speed + 'ms');
                    }
                    if (!this.core.doCss()) {
                        $thumb.animate({
                            left: -this.left + 'px'
                        }, this.core.s.speed);
                    }
                } else {
                    if (!this.core.doCss()) {
                        $thumb.css('left', -this.left + 'px');
                    }
                }
                this.setTranslate(this.left);
            }
        };
        Thumbnail.prototype.enableThumbDrag = function() {
            var _this = this;
            var startCoords = 0;
            var endCoords = 0;
            var isDraging = false;
            var isMoved = false;
            var tempLeft = 0;
            _this.$thumbOuter.addClass('lg-grab');
            _this.core.$outer.find('.lg-thumb').on('mousedown.lg.thumb', function(e) {
                if (_this.thumbTotalWidth > _this.thumbOuterWidth) {
                    e.preventDefault();
                    startCoords = e.pageX;
                    isDraging = true;
                    _this.core.$outer.scrollLeft += 1;
                    _this.core.$outer.scrollLeft -= 1;
                    _this.thumbClickable = false;
                    _this.$thumbOuter.removeClass('lg-grab').addClass('lg-grabbing');
                }
            });
            $(window).on('mousemove.lg.thumb', function(e) {
                if (isDraging) {
                    tempLeft = _this.left;
                    isMoved = true;
                    endCoords = e.pageX;
                    _this.$thumbOuter.addClass('lg-dragging');
                    tempLeft = tempLeft - (endCoords - startCoords);
                    if (tempLeft > (_this.thumbTotalWidth - _this.thumbOuterWidth)) {
                        tempLeft = _this.thumbTotalWidth - _this.thumbOuterWidth;
                    }
                    if (tempLeft < 0) {
                        tempLeft = 0;
                    }
                    _this.setTranslate(tempLeft);
                }
            });
            $(window).on('mouseup.lg.thumb', function() {
                if (isMoved) {
                    isMoved = false;
                    _this.$thumbOuter.removeClass('lg-dragging');
                    _this.left = tempLeft;
                    if (Math.abs(endCoords - startCoords) < _this.core.s.swipeThreshold) {
                        _this.thumbClickable = true;
                    }
                } else {
                    _this.thumbClickable = true;
                }
                if (isDraging) {
                    isDraging = false;
                    _this.$thumbOuter.removeClass('lg-grabbing').addClass('lg-grab');
                }
            });
        };
        Thumbnail.prototype.enableThumbSwipe = function() {
            var _this = this;
            var startCoords = 0;
            var endCoords = 0;
            var isMoved = false;
            var tempLeft = 0;
            _this.core.$outer.find('.lg-thumb').on('touchstart.lg', function(e) {
                if (_this.thumbTotalWidth > _this.thumbOuterWidth) {
                    e.preventDefault();
                    startCoords = e.originalEvent.targetTouches[0].pageX;
                    _this.thumbClickable = false;
                }
            });
            _this.core.$outer.find('.lg-thumb').on('touchmove.lg', function(e) {
                if (_this.thumbTotalWidth > _this.thumbOuterWidth) {
                    e.preventDefault();
                    endCoords = e.originalEvent.targetTouches[0].pageX;
                    isMoved = true;
                    _this.$thumbOuter.addClass('lg-dragging');
                    tempLeft = _this.left;
                    tempLeft = tempLeft - (endCoords - startCoords);
                    if (tempLeft > (_this.thumbTotalWidth - _this.thumbOuterWidth)) {
                        tempLeft = _this.thumbTotalWidth - _this.thumbOuterWidth;
                    }
                    if (tempLeft < 0) {
                        tempLeft = 0;
                    }
                    _this.setTranslate(tempLeft);
                }
            });
            _this.core.$outer.find('.lg-thumb').on('touchend.lg', function() {
                if (_this.thumbTotalWidth > _this.thumbOuterWidth) {
                    if (isMoved) {
                        isMoved = false;
                        _this.$thumbOuter.removeClass('lg-dragging');
                        if (Math.abs(endCoords - startCoords) < _this.core.s.swipeThreshold) {
                            _this.thumbClickable = true;
                        }
                        _this.left = tempLeft;
                    } else {
                        _this.thumbClickable = true;
                    }
                } else {
                    _this.thumbClickable = true;
                }
            });
        };
        Thumbnail.prototype.toogle = function() {
            var _this = this;
            if (_this.core.s.toogleThumb) {
                _this.core.$outer.addClass('lg-can-toggle');
                _this.$thumbOuter.append('<span class="lg-toogle-thumb lg-icon"></span>');
                _this.core.$outer.find('.lg-toogle-thumb').on('click.lg', function() {
                    _this.core.$outer.toggleClass('lg-thumb-open');
                });
            }
        };
        Thumbnail.prototype.thumbkeyPress = function() {
            var _this = this;
            $(window).on('keydown.lg.thumb', function(e) {
                if (e.keyCode === 38) {
                    e.preventDefault();
                    _this.core.$outer.addClass('lg-thumb-open');
                } else if (e.keyCode === 40) {
                    e.preventDefault();
                    _this.core.$outer.removeClass('lg-thumb-open');
                }
            });
        };
        Thumbnail.prototype.destroy = function() {
            if (this.core.s.thumbnail && this.core.$items.length > 1) {
                $(window).off('resize.lg.thumb orientationchange.lg.thumb keydown.lg.thumb');
                this.$thumbOuter.remove();
                this.core.$outer.removeClass('lg-has-thumb');
            }
        };
        $.fn.lightGallery.modules.Thumbnail = Thumbnail;
    })();
}));
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], function(a0) {
            return (factory(a0));
        });
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('jquery'));
    } else {
        factory(root["jQuery"]);
    }
}(this, function($) {
    (function() {
        'use strict';
        var defaults = {
            videoMaxWidth: '855px',
            autoplayFirstVideo: true,
            youtubePlayerParams: false,
            vimeoPlayerParams: false,
            dailymotionPlayerParams: false,
            vkPlayerParams: false,
            videojs: false,
            videojsOptions: {}
        };
        var Video = function(element) {
            this.core = $(element).data('lightGallery');
            this.$el = $(element);
            this.core.s = $.extend({}, defaults, this.core.s);
            this.videoLoaded = false;
            this.init();
            return this;
        };
        Video.prototype.init = function() {
            var _this = this;
            _this.core.$el.on('hasVideo.lg.tm', onHasVideo.bind(this));
            _this.core.$el.on('onAferAppendSlide.lg.tm', onAferAppendSlide.bind(this));
            if (_this.core.doCss() && (_this.core.$items.length > 1) && (_this.core.s.enableSwipe || _this.core.s.enableDrag)) {
                _this.core.$el.on('onSlideClick.lg.tm', function() {
                    var $el = _this.core.$slide.eq(_this.core.index);
                    _this.loadVideoOnclick($el);
                });
            } else {
                _this.core.$slide.on('click.lg', function() {
                    _this.loadVideoOnclick($(this));
                });
            }
            _this.core.$el.on('onBeforeSlide.lg.tm', onBeforeSlide.bind(this));
            _this.core.$el.on('onAfterSlide.lg.tm', function(event, prevIndex) {
                _this.core.$slide.eq(prevIndex).removeClass('lg-video-playing');
            });
        };
        Video.prototype.loadVideo = function(src, addClass, noPoster, index, html) {
            var video = '';
            var autoplay = 1;
            var a = '';
            var isVideo = this.core.isVideo(src, index) || {};
            if (noPoster) {
                if (this.videoLoaded) {
                    autoplay = 0;
                } else {
                    autoplay = this.core.s.autoplayFirstVideo ? 1 : 0;
                }
            }
            if (isVideo.youtube) {
                a = '?wmode=opaque&autoplay=' + autoplay + '&enablejsapi=1';
                if (this.core.s.youtubePlayerParams) {
                    a = a + '&' + $.param(this.core.s.youtubePlayerParams);
                }
                video = '<iframe class="lg-video-object lg-youtube ' + addClass + '" width="560" height="315" src="//www.youtube.com/embed/' + isVideo.youtube[1] + a + '" frameborder="0" allowfullscreen></iframe>';
            } else if (isVideo.vimeo) {
                a = '?autoplay=' + autoplay + '&api=1';
                if (this.core.s.vimeoPlayerParams) {
                    a = a + '&' + $.param(this.core.s.vimeoPlayerParams);
                }
                video = '<iframe class="lg-video-object lg-vimeo ' + addClass + '" width="560" height="315"  src="//player.vimeo.com/video/' + isVideo.vimeo[1] + a + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
            } else if (isVideo.dailymotion) {
                a = '?wmode=opaque&autoplay=' + autoplay + '&api=postMessage';
                if (this.core.s.dailymotionPlayerParams) {
                    a = a + '&' + $.param(this.core.s.dailymotionPlayerParams);
                }
                video = '<iframe class="lg-video-object lg-dailymotion ' + addClass + '" width="560" height="315" src="//www.dailymotion.com/embed/video/' + isVideo.dailymotion[1] + a + '" frameborder="0" allowfullscreen></iframe>';
            } else if (isVideo.html5) {
                var fL = html.substring(0, 1);
                if (fL === '.' || fL === '#') {
                    html = $(html).html();
                }
                video = html;
            } else if (isVideo.vk) {
                a = '&autoplay=' + autoplay;
                if (this.core.s.vkPlayerParams) {
                    a = a + '&' + $.param(this.core.s.vkPlayerParams);
                }
                video = '<iframe class="lg-video-object lg-vk ' + addClass + '" width="560" height="315" src="//vk.com/video_ext.php?' + isVideo.vk[1] + a + '" frameborder="0" allowfullscreen></iframe>';
            }
            return video;
        };
        Video.prototype.loadVideoOnclick = function($el) {
            var _this = this;
            if ($el.find('.lg-object').hasClass('lg-has-poster') && $el.find('.lg-object').is(':visible')) {
                if (!$el.hasClass('lg-has-video')) {
                    $el.addClass('lg-video-playing lg-has-video');
                    var _src;
                    var _html;
                    var _loadVideo = function(_src, _html) {
                        $el.find('.lg-video').append(_this.loadVideo(_src, '', false, _this.core.index, _html));
                        if (_html) {
                            if (_this.core.s.videojs) {
                                try {
                                    videojs(_this.core.$slide.eq(_this.core.index).find('.lg-html5').get(0), _this.core.s.videojsOptions, function() {
                                        this.play();
                                    });
                                } catch (e) {
                                    console.error('Make sure you have included videojs');
                                }
                            } else {
                                _this.core.$slide.eq(_this.core.index).find('.lg-html5').get(0).play();
                            }
                        }
                    };
                    if (_this.core.s.dynamic) {
                        _src = _this.core.s.dynamicEl[_this.core.index].src;
                        _html = _this.core.s.dynamicEl[_this.core.index].html;
                        _loadVideo(_src, _html);
                    } else {
                        _src = _this.core.$items.eq(_this.core.index).attr('href') || _this.core.$items.eq(_this.core.index).attr('data-src');
                        _html = _this.core.$items.eq(_this.core.index).attr('data-html');
                        _loadVideo(_src, _html);
                    }
                    var $tempImg = $el.find('.lg-object');
                    $el.find('.lg-video').append($tempImg);
                    if (!$el.find('.lg-video-object').hasClass('lg-html5')) {
                        $el.removeClass('lg-complete');
                        $el.find('.lg-video-object').on('load.lg error.lg', function() {
                            $el.addClass('lg-complete');
                        });
                    }
                } else {
                    var youtubePlayer = $el.find('.lg-youtube').get(0);
                    var vimeoPlayer = $el.find('.lg-vimeo').get(0);
                    var dailymotionPlayer = $el.find('.lg-dailymotion').get(0);
                    var html5Player = $el.find('.lg-html5').get(0);
                    if (youtubePlayer) {
                        youtubePlayer.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                    } else if (vimeoPlayer) {
                        try {
                            $f(vimeoPlayer).api('play');
                        } catch (e) {
                            console.error('Make sure you have included froogaloop2 js');
                        }
                    } else if (dailymotionPlayer) {
                        dailymotionPlayer.contentWindow.postMessage('play', '*');
                    } else if (html5Player) {
                        if (_this.core.s.videojs) {
                            try {
                                videojs(html5Player).play();
                            } catch (e) {
                                console.error('Make sure you have included videojs');
                            }
                        } else {
                            html5Player.play();
                        }
                    }
                    $el.addClass('lg-video-playing');
                }
            }
        };
        Video.prototype.destroy = function() {
            this.videoLoaded = false;
        };

        function onHasVideo(event, index, src, html) {
            var _this = this;
            _this.core.$slide.eq(index).find('.lg-video').append(_this.loadVideo(src, 'lg-object', true, index, html));
            if (html) {
                if (_this.core.s.videojs) {
                    try {
                        videojs(_this.core.$slide.eq(index).find('.lg-html5').get(0), _this.core.s.videojsOptions, function() {
                            if (!_this.videoLoaded && _this.core.s.autoplayFirstVideo) {
                                this.play();
                            }
                        });
                    } catch (e) {
                        console.error('Make sure you have included videojs');
                    }
                } else {
                    if (!_this.videoLoaded && _this.core.s.autoplayFirstVideo) {
                        _this.core.$slide.eq(index).find('.lg-html5').get(0).play();
                    }
                }
            }
        }

        function onAferAppendSlide(event, index) {
            var $videoCont = this.core.$slide.eq(index).find('.lg-video-cont');
            if (!$videoCont.hasClass('lg-has-iframe')) {
                $videoCont.css('max-width', this.core.s.videoMaxWidth);
                this.videoLoaded = true;
            }
        }

        function onBeforeSlide(event, prevIndex, index) {
            var _this = this;
            var $videoSlide = _this.core.$slide.eq(prevIndex);
            var youtubePlayer = $videoSlide.find('.lg-youtube').get(0);
            var vimeoPlayer = $videoSlide.find('.lg-vimeo').get(0);
            var dailymotionPlayer = $videoSlide.find('.lg-dailymotion').get(0);
            var vkPlayer = $videoSlide.find('.lg-vk').get(0);
            var html5Player = $videoSlide.find('.lg-html5').get(0);
            if (youtubePlayer) {
                youtubePlayer.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            } else if (vimeoPlayer) {
                try {
                    $f(vimeoPlayer).api('pause');
                } catch (e) {
                    console.error('Make sure you have included froogaloop2 js');
                }
            } else if (dailymotionPlayer) {
                dailymotionPlayer.contentWindow.postMessage('pause', '*');
            } else if (html5Player) {
                if (_this.core.s.videojs) {
                    try {
                        videojs(html5Player).pause();
                    } catch (e) {
                        console.error('Make sure you have included videojs');
                    }
                } else {
                    html5Player.pause();
                }
            }
            if (vkPlayer) {
                $(vkPlayer).attr('src', $(vkPlayer).attr('src').replace('&autoplay', '&noplay'));
            }
            var _src;
            if (_this.core.s.dynamic) {
                _src = _this.core.s.dynamicEl[index].src;
            } else {
                _src = _this.core.$items.eq(index).attr('href') || _this.core.$items.eq(index).attr('data-src');
                _src = imagenes;
            }
            var _isVideo = _this.core.isVideo(_src, index) || {};
            if (_isVideo.youtube || _isVideo.vimeo || _isVideo.dailymotion || _isVideo.vk) {
                _this.core.$outer.addClass('lg-hide-download');
            }
        }
        $.fn.lightGallery.modules.video = Video;
    })();
}));
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], function(a0) {
            return (factory(a0));
        });
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(this, function($) {
    (function() {
        'use strict';
        var getUseLeft = function() {
            var useLeft = false;
            var isChrome = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
            if (isChrome && parseInt(isChrome[2], 10) < 54) {
                useLeft = true;
            }
            return useLeft;
        };
        var defaults = {
            scale: 1,
            zoom: true,
            actualSize: true,
            enableZoomAfter: 300,
            useLeftForZoom: getUseLeft()
        };
        var Zoom = function(element) {
            this.core = $(element).data('lightGallery');
            this.core.s = $.extend({}, defaults, this.core.s);
            if (this.core.s.zoom && this.core.doCss()) {
                this.init();
                this.zoomabletimeout = false;
                this.pageX = $(window).width() / 2;
                this.pageY = ($(window).height() / 2) + $(window).scrollTop();
            }
            return this;
        };
        Zoom.prototype.init = function() {
            var _this = this;
            var zoomIcons = '<span id="lg-zoom-in" class="lg-icon"></span><span id="lg-zoom-out" class="lg-icon"></span>';
            if (_this.core.s.actualSize) {
                zoomIcons += '<span id="lg-actual-size" class="lg-icon"></span>';
            }
            if (_this.core.s.useLeftForZoom) {
                _this.core.$outer.addClass('lg-use-left-for-zoom');
            } else {
                _this.core.$outer.addClass('lg-use-transition-for-zoom');
            }
            this.core.$outer.find('.lg-toolbar').append(zoomIcons);
            _this.core.$el.on('onSlideItemLoad.lg.tm.zoom', function(event, index, delay) {
                var _speed = _this.core.s.enableZoomAfter + delay;
                if ($('body').hasClass('lg-from-hash') && delay) {
                    _speed = 0;
                } else {
                    $('body').removeClass('lg-from-hash');
                }
                _this.zoomabletimeout = setTimeout(function() {
                    _this.core.$slide.eq(index).addClass('lg-zoomable');
                }, _speed + 30);
            });
            var scale = 1;
            var zoom = function(scaleVal) {
                var $image = _this.core.$outer.find('.lg-current .lg-image');
                var _x;
                var _y;
                var offsetX = ($(window).width() - $image.prop('offsetWidth')) / 2;
                var offsetY = (($(window).height() - $image.prop('offsetHeight')) / 2) + $(window).scrollTop();
                _x = _this.pageX - offsetX;
                _y = _this.pageY - offsetY;
                var x = (scaleVal - 1) * (_x);
                var y = (scaleVal - 1) * (_y);
                $image.css('transform', 'scale3d(' + scaleVal + ', ' + scaleVal + ', 1)').attr('data-scale', scaleVal);
                if (_this.core.s.useLeftForZoom) {
                    $image.parent().css({
                        left: -x + 'px',
                        top: -y + 'px'
                    }).attr('data-x', x).attr('data-y', y);
                } else {
                    $image.parent().css('transform', 'translate3d(-' + x + 'px, -' + y + 'px, 0)').attr('data-x', x).attr('data-y', y);
                }
            };
            var callScale = function() {
                if (scale > 1) {
                    _this.core.$outer.addClass('lg-zoomed');
                } else {
                    _this.resetZoom();
                }
                if (scale < 1) {
                    scale = 1;
                }
                zoom(scale);
            };
            var actualSize = function(event, $image, index, fromIcon) {
                var w = $image.prop('offsetWidth');
                var nw;
                if (_this.core.s.dynamic) {
                    nw = _this.core.s.dynamicEl[index].width || $image[0].naturalWidth || w;
                } else {
                    nw = _this.core.$items.eq(index).attr('data-width') || $image[0].naturalWidth || w;
                }
                var _scale;
                if (_this.core.$outer.hasClass('lg-zoomed')) {
                    scale = 1;
                } else {
                    if (nw > w) {
                        _scale = nw / w;
                        scale = _scale || 2;
                    }
                }
                if (fromIcon) {
                    _this.pageX = $(window).width() / 2;
                    _this.pageY = ($(window).height() / 2) + $(window).scrollTop();
                } else {
                    _this.pageX = event.pageX || event.originalEvent.targetTouches[0].pageX;
                    _this.pageY = event.pageY || event.originalEvent.targetTouches[0].pageY;
                }
                callScale();
                setTimeout(function() {
                    _this.core.$outer.removeClass('lg-grabbing').addClass('lg-grab');
                }, 10);
            };
            var tapped = false;
            _this.core.$el.on('onAferAppendSlide.lg.tm.zoom', function(event, index) {
                var $image = _this.core.$slide.eq(index).find('.lg-image');
                $image.on('dblclick', function(event) {
                    actualSize(event, $image, index);
                });
                $image.on('touchstart', function(event) {
                    if (!tapped) {
                        tapped = setTimeout(function() {
                            tapped = null;
                        }, 300);
                    } else {
                        clearTimeout(tapped);
                        tapped = null;
                        actualSize(event, $image, index);
                    }
                    event.preventDefault();
                });
            });
            $(window).on('resize.lg.zoom scroll.lg.zoom orientationchange.lg.zoom', function() {
                _this.pageX = $(window).width() / 2;
                _this.pageY = ($(window).height() / 2) + $(window).scrollTop();
                zoom(scale);
            });
            $('#lg-zoom-out').on('click.lg', function() {
                if (_this.core.$outer.find('.lg-current .lg-image').length) {
                    scale -= _this.core.s.scale;
                    callScale();
                }
            });
            $('#lg-zoom-in').on('click.lg', function() {
                if (_this.core.$outer.find('.lg-current .lg-image').length) {
                    scale += _this.core.s.scale;
                    callScale();
                }
            });
            $('#lg-actual-size').on('click.lg', function(event) {
                actualSize(event, _this.core.$slide.eq(_this.core.index).find('.lg-image'), _this.core.index, true);
            });
            _this.core.$el.on('onBeforeSlide.lg.tm', function() {
                scale = 1;
                _this.resetZoom();
            });
            _this.zoomDrag();
            _this.zoomSwipe();
        };
        Zoom.prototype.resetZoom = function() {
            this.core.$outer.removeClass('lg-zoomed');
            this.core.$slide.find('.lg-img-wrap').removeAttr('style data-x data-y');
            this.core.$slide.find('.lg-image').removeAttr('style data-scale');
            this.pageX = $(window).width() / 2;
            this.pageY = ($(window).height() / 2) + $(window).scrollTop();
        };
        Zoom.prototype.zoomSwipe = function() {
            var _this = this;
            var startCoords = {};
            var endCoords = {};
            var isMoved = false;
            var allowX = false;
            var allowY = false;
            _this.core.$slide.on('touchstart.lg', function(e) {
                if (_this.core.$outer.hasClass('lg-zoomed')) {
                    var $image = _this.core.$slide.eq(_this.core.index).find('.lg-object');
                    allowY = $image.prop('offsetHeight') * $image.attr('data-scale') > _this.core.$outer.find('.lg').height();
                    allowX = $image.prop('offsetWidth') * $image.attr('data-scale') > _this.core.$outer.find('.lg').width();
                    if ((allowX || allowY)) {
                        e.preventDefault();
                        startCoords = {
                            x: e.originalEvent.targetTouches[0].pageX,
                            y: e.originalEvent.targetTouches[0].pageY
                        };
                    }
                }
            });
            _this.core.$slide.on('touchmove.lg', function(e) {
                if (_this.core.$outer.hasClass('lg-zoomed')) {
                    var _$el = _this.core.$slide.eq(_this.core.index).find('.lg-img-wrap');
                    var distanceX;
                    var distanceY;
                    e.preventDefault();
                    isMoved = true;
                    endCoords = {
                        x: e.originalEvent.targetTouches[0].pageX,
                        y: e.originalEvent.targetTouches[0].pageY
                    };
                    _this.core.$outer.addClass('lg-zoom-dragging');
                    if (allowY) {
                        distanceY = (-Math.abs(_$el.attr('data-y'))) + (endCoords.y - startCoords.y);
                    } else {
                        distanceY = -Math.abs(_$el.attr('data-y'));
                    }
                    if (allowX) {
                        distanceX = (-Math.abs(_$el.attr('data-x'))) + (endCoords.x - startCoords.x);
                    } else {
                        distanceX = -Math.abs(_$el.attr('data-x'));
                    }
                    if ((Math.abs(endCoords.x - startCoords.x) > 15) || (Math.abs(endCoords.y - startCoords.y) > 15)) {
                        if (_this.core.s.useLeftForZoom) {
                            _$el.css({
                                left: distanceX + 'px',
                                top: distanceY + 'px'
                            });
                        } else {
                            _$el.css('transform', 'translate3d(' + distanceX + 'px, ' + distanceY + 'px, 0)');
                        }
                    }
                }
            });
            _this.core.$slide.on('touchend.lg', function() {
                if (_this.core.$outer.hasClass('lg-zoomed')) {
                    if (isMoved) {
                        isMoved = false;
                        _this.core.$outer.removeClass('lg-zoom-dragging');
                        _this.touchendZoom(startCoords, endCoords, allowX, allowY);
                    }
                }
            });
        };
        Zoom.prototype.zoomDrag = function() {
            var _this = this;
            var startCoords = {};
            var endCoords = {};
            var isDraging = false;
            var isMoved = false;
            var allowX = false;
            var allowY = false;
            _this.core.$slide.on('mousedown.lg.zoom', function(e) {
                var $image = _this.core.$slide.eq(_this.core.index).find('.lg-object');
                allowY = $image.prop('offsetHeight') * $image.attr('data-scale') > _this.core.$outer.find('.lg').height();
                allowX = $image.prop('offsetWidth') * $image.attr('data-scale') > _this.core.$outer.find('.lg').width();
                if (_this.core.$outer.hasClass('lg-zoomed')) {
                    if ($(e.target).hasClass('lg-object') && (allowX || allowY)) {
                        e.preventDefault();
                        startCoords = {
                            x: e.pageX,
                            y: e.pageY
                        };
                        isDraging = true;
                        _this.core.$outer.scrollLeft += 1;
                        _this.core.$outer.scrollLeft -= 1;
                        _this.core.$outer.removeClass('lg-grab').addClass('lg-grabbing');
                    }
                }
            });
            $(window).on('mousemove.lg.zoom', function(e) {
                if (isDraging) {
                    var _$el = _this.core.$slide.eq(_this.core.index).find('.lg-img-wrap');
                    var distanceX;
                    var distanceY;
                    isMoved = true;
                    endCoords = {
                        x: e.pageX,
                        y: e.pageY
                    };
                    _this.core.$outer.addClass('lg-zoom-dragging');
                    if (allowY) {
                        distanceY = (-Math.abs(_$el.attr('data-y'))) + (endCoords.y - startCoords.y);
                    } else {
                        distanceY = -Math.abs(_$el.attr('data-y'));
                    }
                    if (allowX) {
                        distanceX = (-Math.abs(_$el.attr('data-x'))) + (endCoords.x - startCoords.x);
                    } else {
                        distanceX = -Math.abs(_$el.attr('data-x'));
                    }
                    if (_this.core.s.useLeftForZoom) {
                        _$el.css({
                            left: distanceX + 'px',
                            top: distanceY + 'px'
                        });
                    } else {
                        _$el.css('transform', 'translate3d(' + distanceX + 'px, ' + distanceY + 'px, 0)');
                    }
                }
            });
            $(window).on('mouseup.lg.zoom', function(e) {
                if (isDraging) {
                    isDraging = false;
                    _this.core.$outer.removeClass('lg-zoom-dragging');
                    if (isMoved && ((startCoords.x !== endCoords.x) || (startCoords.y !== endCoords.y))) {
                        endCoords = {
                            x: e.pageX,
                            y: e.pageY
                        };
                        _this.touchendZoom(startCoords, endCoords, allowX, allowY);
                    }
                    isMoved = false;
                }
                _this.core.$outer.removeClass('lg-grabbing').addClass('lg-grab');
            });
        };
        Zoom.prototype.touchendZoom = function(startCoords, endCoords, allowX, allowY) {
            var _this = this;
            var _$el = _this.core.$slide.eq(_this.core.index).find('.lg-img-wrap');
            var $image = _this.core.$slide.eq(_this.core.index).find('.lg-object');
            var distanceX = (-Math.abs(_$el.attr('data-x'))) + (endCoords.x - startCoords.x);
            var distanceY = (-Math.abs(_$el.attr('data-y'))) + (endCoords.y - startCoords.y);
            var minY = (_this.core.$outer.find('.lg').height() - $image.prop('offsetHeight')) / 2;
            var maxY = Math.abs(($image.prop('offsetHeight') * Math.abs($image.attr('data-scale'))) - _this.core.$outer.find('.lg').height() + minY);
            var minX = (_this.core.$outer.find('.lg').width() - $image.prop('offsetWidth')) / 2;
            var maxX = Math.abs(($image.prop('offsetWidth') * Math.abs($image.attr('data-scale'))) - _this.core.$outer.find('.lg').width() + minX);
            if ((Math.abs(endCoords.x - startCoords.x) > 15) || (Math.abs(endCoords.y - startCoords.y) > 15)) {
                if (allowY) {
                    if (distanceY <= -maxY) {
                        distanceY = -maxY;
                    } else if (distanceY >= -minY) {
                        distanceY = -minY;
                    }
                }
                if (allowX) {
                    if (distanceX <= -maxX) {
                        distanceX = -maxX;
                    } else if (distanceX >= -minX) {
                        distanceX = -minX;
                    }
                }
                if (allowY) {
                    _$el.attr('data-y', Math.abs(distanceY));
                } else {
                    distanceY = -Math.abs(_$el.attr('data-y'));
                }
                if (allowX) {
                    _$el.attr('data-x', Math.abs(distanceX));
                } else {
                    distanceX = -Math.abs(_$el.attr('data-x'));
                }
                if (_this.core.s.useLeftForZoom) {
                    _$el.css({
                        left: distanceX + 'px',
                        top: distanceY + 'px'
                    });
                } else {
                    _$el.css('transform', 'translate3d(' + distanceX + 'px, ' + distanceY + 'px, 0)');
                }
            }
        };
        Zoom.prototype.destroy = function() {
            var _this = this;
            _this.core.$el.off('.lg.zoom');
            $(window).off('.lg.zoom');
            _this.core.$slide.off('.lg.zoom');
            _this.core.$el.off('.lg.tm.zoom');
            _this.resetZoom();
            clearTimeout(_this.zoomabletimeout);
            _this.zoomabletimeout = false;
        };
        $.fn.lightGallery.modules.zoom = Zoom;
    })();
}));
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], function(a0) {
            return (factory(a0));
        });
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(this, function($) {
    (function() {
        'use strict';
        var defaults = {
            hash: true
        };
        var Hash = function(element) {
            this.core = $(element).data('lightGallery');
            this.core.s = $.extend({}, defaults, this.core.s);
            if (this.core.s.hash) {
                this.oldHash = window.location.hash;
                this.init();
            }
            return this;
        };
        Hash.prototype.init = function() {
            var _this = this;
            var _hash;
            _this.core.$el.on('onAfterSlide.lg.tm', function(event, prevIndex, index) {
                if (history.replaceState) {
                    history.replaceState(null, null, window.location.pathname + window.location.search + '#lg=' + _this.core.s.galleryId + '&slide=' + index);
                } else {
                    window.location.hash = 'lg=' + _this.core.s.galleryId + '&slide=' + index;
                }
            });
            $(window).on('hashchange.lg.hash', function() {
                _hash = window.location.hash;
                var _idx = parseInt(_hash.split('&slide=')[1], 10);
                if ((_hash.indexOf('lg=' + _this.core.s.galleryId) > -1)) {
                    _this.core.slide(_idx, false, false);
                } else if (_this.core.lGalleryOn) {
                    _this.core.destroy();
                }
            });
        };
        Hash.prototype.destroy = function() {
            if (!this.core.s.hash) {
                return;
            }
            if (this.oldHash && this.oldHash.indexOf('lg=' + this.core.s.galleryId) < 0) {
                if (history.replaceState) {
                    history.replaceState(null, null, this.oldHash);
                } else {
                    window.location.hash = this.oldHash;
                }
            } else {
                if (history.replaceState) {
                    history.replaceState(null, document.title, window.location.pathname + window.location.search);
                } else {
                    window.location.hash = '';
                }
            }
            this.core.$el.off('.lg.hash');
        };
        $.fn.lightGallery.modules.hash = Hash;
    })();
}));
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], function(a0) {
            return (factory(a0));
        });
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(this, function($) {
    (function() {
        'use strict';
        var defaults = {
            share: true,
            facebook: true,
            facebookDropdownText: 'Facebook',
            twitter: true,
            twitterDropdownText: 'Twitter',
            googlePlus: true,
            googlePlusDropdownText: 'GooglePlus',
            pinterest: true,
            pinterestDropdownText: 'Pinterest'
        };
        var Share = function(element) {
            this.core = $(element).data('lightGallery');
            this.core.s = $.extend({}, defaults, this.core.s);
            if (this.core.s.share) {
                this.init();
            }
            return this;
        };
        Share.prototype.init = function() {
            var _this = this;
            var shareHtml = '<span id="lg-share" class="lg-icon">' + '<ul class="lg-dropdown" style="position: absolute;">';
            shareHtml += _this.core.s.facebook ? '<li><a id="lg-share-facebook" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' + this.core.s.facebookDropdownText + '</span></a></li>' : '';
            shareHtml += _this.core.s.twitter ? '<li><a id="lg-share-twitter" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' + this.core.s.twitterDropdownText + '</span></a></li>' : '';
            shareHtml += _this.core.s.googlePlus ? '<li><a id="lg-share-googleplus" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' + this.core.s.googlePlusDropdownText + '</span></a></li>' : '';
            shareHtml += _this.core.s.pinterest ? '<li><a id="lg-share-pinterest" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' + this.core.s.pinterestDropdownText + '</span></a></li>' : '';
            shareHtml += '</ul></span>';
            this.core.$outer.find('.lg-toolbar').append(shareHtml);
            this.core.$outer.find('.lg').append('<div id="lg-dropdown-overlay"></div>');
            $('#lg-share').on('click.lg', function() {
                _this.core.$outer.toggleClass('lg-dropdown-active');
            });
            $('#lg-dropdown-overlay').on('click.lg', function() {
                _this.core.$outer.removeClass('lg-dropdown-active');
            });
            _this.core.$el.on('onAfterSlide.lg.tm', function(event, prevIndex, index) {
                setTimeout(function() {
                    $('#lg-share-facebook').attr('href', 'https://www.facebook.com/sharer/sharer.php?u=' + (encodeURIComponent(_this.getSahreProps(index, 'facebookShareUrl') || window.location.href)));
                    $('#lg-share-twitter').attr('href', 'https://twitter.com/intent/tweet?text=' + _this.getSahreProps(index, 'tweetText') + '&url=' + (encodeURIComponent(_this.getSahreProps(index, 'twitterShareUrl') || window.location.href)));
                    $('#lg-share-googleplus').attr('href', 'https://plus.google.com/share?url=' + (encodeURIComponent(_this.getSahreProps(index, 'googleplusShareUrl') || window.location.href)));
                    $('#lg-share-pinterest').attr('href', 'http://www.pinterest.com/pin/create/button/?url=' + (encodeURIComponent(_this.getSahreProps(index, 'pinterestShareUrl') || window.location.href)) + '&media=' + encodeURIComponent(_this.getSahreProps(index, 'src')) + '&description=' + _this.getSahreProps(index, 'pinterestText'));
                }, 100);
            });
        };
        Share.prototype.getSahreProps = function(index, prop) {
            var shareProp = '';
            if (this.core.s.dynamic) {
                shareProp = this.core.s.dynamicEl[index][prop];
            } else {
                var _href = this.core.$items.eq(index).attr('href');
                var _prop = this.core.$items.eq(index).data(prop);
                shareProp = prop === 'src' ? _href || _prop : _prop;
            }
            return shareProp;
        };
        Share.prototype.destroy = function() {};
        $.fn.lightGallery.modules.share = Share;
    })();
}));
! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Swiper = t()
}(this, function() {
    "use strict";
    var f = "undefined" == typeof document ? {
            body: {},
            addEventListener: function() {},
            removeEventListener: function() {},
            activeElement: {
                blur: function() {},
                nodeName: ""
            },
            querySelector: function() {
                return null
            },
            querySelectorAll: function() {
                return []
            },
            getElementById: function() {
                return null
            },
            createEvent: function() {
                return {
                    initEvent: function() {}
                }
            },
            createElement: function() {
                return {
                    children: [],
                    childNodes: [],
                    style: {},
                    setAttribute: function() {},
                    getElementsByTagName: function() {
                        return []
                    }
                }
            },
            location: {
                hash: ""
            }
        } : document,
        B = "undefined" == typeof window ? {
            document: f,
            navigator: {
                userAgent: ""
            },
            location: {},
            history: {},
            CustomEvent: function() {
                return this
            },
            addEventListener: function() {},
            removeEventListener: function() {},
            getComputedStyle: function() {
                return {
                    getPropertyValue: function() {
                        return ""
                    }
                }
            },
            Image: function() {},
            Date: function() {},
            screen: {},
            setTimeout: function() {},
            clearTimeout: function() {}
        } : window,
        l = function(e) {
            for (var t = 0; t < e.length; t += 1) this[t] = e[t];
            return this.length = e.length, this
        };

    function L(e, t) {
        var a = [],
            i = 0;
        if (e && !t && e instanceof l) return e;
        if (e)
            if ("string" == typeof e) {
                var s, r, n = e.trim();
                if (0 <= n.indexOf("<") && 0 <= n.indexOf(">")) {
                    var o = "div";
                    for (0 === n.indexOf("<li") && (o = "ul"), 0 === n.indexOf("<tr") && (o = "tbody"), 0 !== n.indexOf("<td") && 0 !== n.indexOf("<th") || (o = "tr"), 0 === n.indexOf("<tbody") && (o = "table"), 0 === n.indexOf("<option") && (o = "select"), (r = f.createElement(o)).innerHTML = n, i = 0; i < r.childNodes.length; i += 1) a.push(r.childNodes[i])
                } else
                    for (s = t || "#" !== e[0] || e.match(/[ .<>:~]/) ? (t || f).querySelectorAll(e.trim()) : [f.getElementById(e.trim().split("#")[1])], i = 0; i < s.length; i += 1) s[i] && a.push(s[i])
            } else if (e.nodeType || e === B || e === f) a.push(e);
        else if (0 < e.length && e[0].nodeType)
            for (i = 0; i < e.length; i += 1) a.push(e[i]);
        return new l(a)
    }

    function r(e) {
        for (var t = [], a = 0; a < e.length; a += 1) - 1 === t.indexOf(e[a]) && t.push(e[a]);
        return t
    }
    L.fn = l.prototype, L.Class = l, L.Dom7 = l;
    var t = {
        addClass: function(e) {
            if (void 0 === e) return this;
            for (var t = e.split(" "), a = 0; a < t.length; a += 1)
                for (var i = 0; i < this.length; i += 1) void 0 !== this[i] && void 0 !== this[i].classList && this[i].classList.add(t[a]);
            return this
        },
        removeClass: function(e) {
            for (var t = e.split(" "), a = 0; a < t.length; a += 1)
                for (var i = 0; i < this.length; i += 1) void 0 !== this[i] && void 0 !== this[i].classList && this[i].classList.remove(t[a]);
            return this
        },
        hasClass: function(e) {
            return !!this[0] && this[0].classList.contains(e)
        },
        toggleClass: function(e) {
            for (var t = e.split(" "), a = 0; a < t.length; a += 1)
                for (var i = 0; i < this.length; i += 1) void 0 !== this[i] && void 0 !== this[i].classList && this[i].classList.toggle(t[a]);
            return this
        },
        attr: function(e, t) {
            var a = arguments;
            if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
            for (var i = 0; i < this.length; i += 1)
                if (2 === a.length) this[i].setAttribute(e, t);
                else
                    for (var s in e) this[i][s] = e[s], this[i].setAttribute(s, e[s]);
            return this
        },
        removeAttr: function(e) {
            for (var t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
            return this
        },
        data: function(e, t) {
            var a;
            if (void 0 !== t) {
                for (var i = 0; i < this.length; i += 1)(a = this[i]).dom7ElementDataStorage || (a.dom7ElementDataStorage = {}), a.dom7ElementDataStorage[e] = t;
                return this
            }
            if (a = this[0]) {
                if (a.dom7ElementDataStorage && e in a.dom7ElementDataStorage) return a.dom7ElementDataStorage[e];
                var s = a.getAttribute("data-" + e);
                return s || void 0
            }
        },
        transform: function(e) {
            for (var t = 0; t < this.length; t += 1) {
                var a = this[t].style;
                a.webkitTransform = e, a.transform = e
            }
            return this
        },
        transition: function(e) {
            "string" != typeof e && (e += "ms");
            for (var t = 0; t < this.length; t += 1) {
                var a = this[t].style;
                a.webkitTransitionDuration = e, a.transitionDuration = e
            }
            return this
        },
        on: function() {
            for (var e, t = [], a = arguments.length; a--;) t[a] = arguments[a];
            var i = t[0],
                r = t[1],
                n = t[2],
                s = t[3];

            function o(e) {
                var t = e.target;
                if (t) {
                    var a = e.target.dom7EventData || [];
                    if (a.indexOf(e) < 0 && a.unshift(e), L(t).is(r)) n.apply(t, a);
                    else
                        for (var i = L(t).parents(), s = 0; s < i.length; s += 1) L(i[s]).is(r) && n.apply(i[s], a)
                }
            }

            function l(e) {
                var t = e && e.target && e.target.dom7EventData || [];
                t.indexOf(e) < 0 && t.unshift(e), n.apply(this, t)
            }
            "function" == typeof t[1] && (i = (e = t)[0], n = e[1], s = e[2], r = void 0), s || (s = !1);
            for (var d, p = i.split(" "), c = 0; c < this.length; c += 1) {
                var u = this[c];
                if (r)
                    for (d = 0; d < p.length; d += 1) {
                        var h = p[d];
                        u.dom7LiveListeners || (u.dom7LiveListeners = {}), u.dom7LiveListeners[h] || (u.dom7LiveListeners[h] = []), u.dom7LiveListeners[h].push({
                            listener: n,
                            proxyListener: o
                        }), u.addEventListener(h, o, s)
                    } else
                        for (d = 0; d < p.length; d += 1) {
                            var v = p[d];
                            u.dom7Listeners || (u.dom7Listeners = {}), u.dom7Listeners[v] || (u.dom7Listeners[v] = []), u.dom7Listeners[v].push({
                                listener: n,
                                proxyListener: l
                            }), u.addEventListener(v, l, s)
                        }
            }
            return this
        },
        off: function() {
            for (var e, t = [], a = arguments.length; a--;) t[a] = arguments[a];
            var i = t[0],
                s = t[1],
                r = t[2],
                n = t[3];
            "function" == typeof t[1] && (i = (e = t)[0], r = e[1], n = e[2], s = void 0), n || (n = !1);
            for (var o = i.split(" "), l = 0; l < o.length; l += 1)
                for (var d = o[l], p = 0; p < this.length; p += 1) {
                    var c = this[p],
                        u = void 0;
                    if (!s && c.dom7Listeners ? u = c.dom7Listeners[d] : s && c.dom7LiveListeners && (u = c.dom7LiveListeners[d]), u && u.length)
                        for (var h = u.length - 1; 0 <= h; h -= 1) {
                            var v = u[h];
                            r && v.listener === r ? (c.removeEventListener(d, v.proxyListener, n), u.splice(h, 1)) : r || (c.removeEventListener(d, v.proxyListener, n), u.splice(h, 1))
                        }
                }
            return this
        },
        trigger: function() {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            for (var a = e[0].split(" "), i = e[1], s = 0; s < a.length; s += 1)
                for (var r = a[s], n = 0; n < this.length; n += 1) {
                    var o = this[n],
                        l = void 0;
                    try {
                        l = new B.CustomEvent(r, {
                            detail: i,
                            bubbles: !0,
                            cancelable: !0
                        })
                    } catch (e) {
                        (l = f.createEvent("Event")).initEvent(r, !0, !0), l.detail = i
                    }
                    o.dom7EventData = e.filter(function(e, t) {
                        return 0 < t
                    }), o.dispatchEvent(l), o.dom7EventData = [], delete o.dom7EventData
                }
            return this
        },
        transitionEnd: function(t) {
            var a, i = ["webkitTransitionEnd", "transitionend"],
                s = this;

            function r(e) {
                if (e.target === this)
                    for (t.call(this, e), a = 0; a < i.length; a += 1) s.off(i[a], r)
            }
            if (t)
                for (a = 0; a < i.length; a += 1) s.on(i[a], r);
            return this
        },
        outerWidth: function(e) {
            if (0 < this.length) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetWidth + parseFloat(t.getPropertyValue("margin-right")) + parseFloat(t.getPropertyValue("margin-left"))
                }
                return this[0].offsetWidth
            }
            return null
        },
        outerHeight: function(e) {
            if (0 < this.length) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetHeight + parseFloat(t.getPropertyValue("margin-top")) + parseFloat(t.getPropertyValue("margin-bottom"))
                }
                return this[0].offsetHeight
            }
            return null
        },
        offset: function() {
            if (0 < this.length) {
                var e = this[0],
                    t = e.getBoundingClientRect(),
                    a = f.body,
                    i = e.clientTop || a.clientTop || 0,
                    s = e.clientLeft || a.clientLeft || 0,
                    r = e === B ? B.scrollY : e.scrollTop,
                    n = e === B ? B.scrollX : e.scrollLeft;
                return {
                    top: t.top + r - i,
                    left: t.left + n - s
                }
            }
            return null
        },
        css: function(e, t) {
            var a;
            if (1 === arguments.length) {
                if ("string" != typeof e) {
                    for (a = 0; a < this.length; a += 1)
                        for (var i in e) this[a].style[i] = e[i];
                    return this
                }
                if (this[0]) return B.getComputedStyle(this[0], null).getPropertyValue(e)
            }
            if (2 === arguments.length && "string" == typeof e) {
                for (a = 0; a < this.length; a += 1) this[a].style[e] = t;
                return this
            }
            return this
        },
        each: function(e) {
            if (!e) return this;
            for (var t = 0; t < this.length; t += 1)
                if (!1 === e.call(this[t], t, this[t])) return this;
            return this
        },
        html: function(e) {
            if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;
            for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e;
            return this
        },
        text: function(e) {
            if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
            for (var t = 0; t < this.length; t += 1) this[t].textContent = e;
            return this
        },
        is: function(e) {
            var t, a, i = this[0];
            if (!i || void 0 === e) return !1;
            if ("string" == typeof e) {
                if (i.matches) return i.matches(e);
                if (i.webkitMatchesSelector) return i.webkitMatchesSelector(e);
                if (i.msMatchesSelector) return i.msMatchesSelector(e);
                for (t = L(e), a = 0; a < t.length; a += 1)
                    if (t[a] === i) return !0;
                return !1
            }
            if (e === f) return i === f;
            if (e === B) return i === B;
            if (e.nodeType || e instanceof l) {
                for (t = e.nodeType ? [e] : e, a = 0; a < t.length; a += 1)
                    if (t[a] === i) return !0;
                return !1
            }
            return !1
        },
        index: function() {
            var e, t = this[0];
            if (t) {
                for (e = 0; null !== (t = t.previousSibling);) 1 === t.nodeType && (e += 1);
                return e
            }
        },
        eq: function(e) {
            if (void 0 === e) return this;
            var t, a = this.length;
            return new l(a - 1 < e ? [] : e < 0 ? (t = a + e) < 0 ? [] : [this[t]] : [this[e]])
        },
        append: function() {
            for (var e, t = [], a = arguments.length; a--;) t[a] = arguments[a];
            for (var i = 0; i < t.length; i += 1) {
                e = t[i];
                for (var s = 0; s < this.length; s += 1)
                    if ("string" == typeof e) {
                        var r = f.createElement("div");
                        for (r.innerHTML = e; r.firstChild;) this[s].appendChild(r.firstChild)
                    } else if (e instanceof l)
                    for (var n = 0; n < e.length; n += 1) this[s].appendChild(e[n]);
                else this[s].appendChild(e)
            }
            return this
        },
        prepend: function(e) {
            var t, a, i = this;
            for (t = 0; t < this.length; t += 1)
                if ("string" == typeof e) {
                    var s = f.createElement("div");
                    for (s.innerHTML = e, a = s.childNodes.length - 1; 0 <= a; a -= 1) i[t].insertBefore(s.childNodes[a], i[t].childNodes[0])
                } else if (e instanceof l)
                for (a = 0; a < e.length; a += 1) i[t].insertBefore(e[a], i[t].childNodes[0]);
            else i[t].insertBefore(e, i[t].childNodes[0]);
            return this
        },
        next: function(e) {
            return 0 < this.length ? e ? this[0].nextElementSibling && L(this[0].nextElementSibling).is(e) ? new l([this[0].nextElementSibling]) : new l([]) : this[0].nextElementSibling ? new l([this[0].nextElementSibling]) : new l([]) : new l([])
        },
        nextAll: function(e) {
            var t = [],
                a = this[0];
            if (!a) return new l([]);
            for (; a.nextElementSibling;) {
                var i = a.nextElementSibling;
                e ? L(i).is(e) && t.push(i) : t.push(i), a = i
            }
            return new l(t)
        },
        prev: function(e) {
            if (0 < this.length) {
                var t = this[0];
                return e ? t.previousElementSibling && L(t.previousElementSibling).is(e) ? new l([t.previousElementSibling]) : new l([]) : t.previousElementSibling ? new l([t.previousElementSibling]) : new l([])
            }
            return new l([])
        },
        prevAll: function(e) {
            var t = [],
                a = this[0];
            if (!a) return new l([]);
            for (; a.previousElementSibling;) {
                var i = a.previousElementSibling;
                e ? L(i).is(e) && t.push(i) : t.push(i), a = i
            }
            return new l(t)
        },
        parent: function(e) {
            for (var t = [], a = 0; a < this.length; a += 1) null !== this[a].parentNode && (e ? L(this[a].parentNode).is(e) && t.push(this[a].parentNode) : t.push(this[a].parentNode));
            return L(r(t))
        },
        parents: function(e) {
            for (var t = [], a = 0; a < this.length; a += 1)
                for (var i = this[a].parentNode; i;) e ? L(i).is(e) && t.push(i) : t.push(i), i = i.parentNode;
            return L(r(t))
        },
        closest: function(e) {
            var t = this;
            return void 0 === e ? new l([]) : (t.is(e) || (t = t.parents(e).eq(0)), t)
        },
        find: function(e) {
            for (var t = [], a = 0; a < this.length; a += 1)
                for (var i = this[a].querySelectorAll(e), s = 0; s < i.length; s += 1) t.push(i[s]);
            return new l(t)
        },
        children: function(e) {
            for (var t = [], a = 0; a < this.length; a += 1)
                for (var i = this[a].childNodes, s = 0; s < i.length; s += 1) e ? 1 === i[s].nodeType && L(i[s]).is(e) && t.push(i[s]) : 1 === i[s].nodeType && t.push(i[s]);
            return new l(r(t))
        },
        remove: function() {
            for (var e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
            return this
        },
        add: function() {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            var a, i;
            for (a = 0; a < e.length; a += 1) {
                var s = L(e[a]);
                for (i = 0; i < s.length; i += 1) this[this.length] = s[i], this.length += 1
            }
            return this
        },
        styles: function() {
            return this[0] ? B.getComputedStyle(this[0], null) : {}
        }
    };
    Object.keys(t).forEach(function(e) {
        L.fn[e] = t[e]
    });
    var e, a, i, X = {
            deleteProps: function(e) {
                var t = e;
                Object.keys(t).forEach(function(e) {
                    try {
                        t[e] = null
                    } catch (e) {}
                    try {
                        delete t[e]
                    } catch (e) {}
                })
            },
            nextTick: function(e, t) {
                return void 0 === t && (t = 0), setTimeout(e, t)
            },
            now: function() {
                return Date.now()
            },
            getTranslate: function(e, t) {
                var a, i, s;
                void 0 === t && (t = "x");
                var r = B.getComputedStyle(e, null);
                return B.WebKitCSSMatrix ? (6 < (i = r.transform || r.webkitTransform).split(",").length && (i = i.split(", ").map(function(e) {
                    return e.replace(",", ".")
                }).join(", ")), s = new B.WebKitCSSMatrix("none" === i ? "" : i)) : a = (s = r.MozTransform || r.OTransform || r.MsTransform || r.msTransform || r.transform || r.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","), "x" === t && (i = B.WebKitCSSMatrix ? s.m41 : 16 === a.length ? parseFloat(a[12]) : parseFloat(a[4])), "y" === t && (i = B.WebKitCSSMatrix ? s.m42 : 16 === a.length ? parseFloat(a[13]) : parseFloat(a[5])), i || 0
            },
            parseUrlQuery: function(e) {
                var t, a, i, s, r = {},
                    n = e || B.location.href;
                if ("string" == typeof n && n.length)
                    for (s = (a = (n = -1 < n.indexOf("?") ? n.replace(/\S*\?/, "") : "").split("&").filter(function(e) {
                            return "" !== e
                        })).length, t = 0; t < s; t += 1) i = a[t].replace(/#\S+/g, "").split("="), r[decodeURIComponent(i[0])] = void 0 === i[1] ? void 0 : decodeURIComponent(i[1]) || "";
                return r
            },
            isObject: function(e) {
                return "object" == typeof e && null !== e && e.constructor && e.constructor === Object
            },
            extend: function() {
                for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
                for (var a = Object(e[0]), i = 1; i < e.length; i += 1) {
                    var s = e[i];
                    if (null != s)
                        for (var r = Object.keys(Object(s)), n = 0, o = r.length; n < o; n += 1) {
                            var l = r[n],
                                d = Object.getOwnPropertyDescriptor(s, l);
                            void 0 !== d && d.enumerable && (X.isObject(a[l]) && X.isObject(s[l]) ? X.extend(a[l], s[l]) : !X.isObject(a[l]) && X.isObject(s[l]) ? (a[l] = {}, X.extend(a[l], s[l])) : a[l] = s[l])
                        }
                }
                return a
            }
        },
        Y = (i = f.createElement("div"), {
            touch: B.Modernizr && !0 === B.Modernizr.touch || !!("ontouchstart" in B || B.DocumentTouch && f instanceof B.DocumentTouch),
            pointerEvents: !(!B.navigator.pointerEnabled && !B.PointerEvent),
            prefixedPointerEvents: !!B.navigator.msPointerEnabled,
            transition: (a = i.style, "transition" in a || "webkitTransition" in a || "MozTransition" in a),
            transforms3d: B.Modernizr && !0 === B.Modernizr.csstransforms3d || (e = i.style, "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e),
            flexbox: function() {
                for (var e = i.style, t = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), a = 0; a < t.length; a += 1)
                    if (t[a] in e) return !0;
                return !1
            }(),
            observer: "MutationObserver" in B || "WebkitMutationObserver" in B,
            passiveListener: function() {
                var e = !1;
                try {
                    var t = Object.defineProperty({}, "passive", {
                        get: function() {
                            e = !0
                        }
                    });
                    B.addEventListener("testPassiveListener", null, t)
                } catch (e) {}
                return e
            }(),
            gestures: "ongesturestart" in B
        }),
        s = function(e) {
            void 0 === e && (e = {});
            var t = this;
            t.params = e, t.eventsListeners = {}, t.params && t.params.on && Object.keys(t.params.on).forEach(function(e) {
                t.on(e, t.params.on[e])
            })
        },
        n = {
            components: {
                configurable: !0
            }
        };
    s.prototype.on = function(e, t, a) {
        var i = this;
        if ("function" != typeof t) return i;
        var s = a ? "unshift" : "push";
        return e.split(" ").forEach(function(e) {
            i.eventsListeners[e] || (i.eventsListeners[e] = []), i.eventsListeners[e][s](t)
        }), i
    }, s.prototype.once = function(i, s, e) {
        var r = this;
        if ("function" != typeof s) return r;
        return r.on(i, function e() {
            for (var t = [], a = arguments.length; a--;) t[a] = arguments[a];
            s.apply(r, t), r.off(i, e)
        }, e)
    }, s.prototype.off = function(e, i) {
        var s = this;
        return s.eventsListeners && e.split(" ").forEach(function(a) {
            void 0 === i ? s.eventsListeners[a] = [] : s.eventsListeners[a].forEach(function(e, t) {
                e === i && s.eventsListeners[a].splice(t, 1)
            })
        }), s
    }, s.prototype.emit = function() {
        for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
        var a, i, s, r = this;
        return r.eventsListeners && ("string" == typeof e[0] || Array.isArray(e[0]) ? (a = e[0], i = e.slice(1, e.length), s = r) : (a = e[0].events, i = e[0].data, s = e[0].context || r), (Array.isArray(a) ? a : a.split(" ")).forEach(function(e) {
            if (r.eventsListeners && r.eventsListeners[e]) {
                var t = [];
                r.eventsListeners[e].forEach(function(e) {
                    t.push(e)
                }), t.forEach(function(e) {
                    e.apply(s, i)
                })
            }
        })), r
    }, s.prototype.useModulesParams = function(a) {
        var i = this;
        i.modules && Object.keys(i.modules).forEach(function(e) {
            var t = i.modules[e];
            t.params && X.extend(a, t.params)
        })
    }, s.prototype.useModules = function(i) {
        void 0 === i && (i = {});
        var s = this;
        s.modules && Object.keys(s.modules).forEach(function(e) {
            var a = s.modules[e],
                t = i[e] || {};
            a.instance && Object.keys(a.instance).forEach(function(e) {
                var t = a.instance[e];
                s[e] = "function" == typeof t ? t.bind(s) : t
            }), a.on && s.on && Object.keys(a.on).forEach(function(e) {
                s.on(e, a.on[e])
            }), a.create && a.create.bind(s)(t)
        })
    }, n.components.set = function(e) {
        this.use && this.use(e)
    }, s.installModule = function(t) {
        for (var e = [], a = arguments.length - 1; 0 < a--;) e[a] = arguments[a + 1];
        var i = this;
        i.prototype.modules || (i.prototype.modules = {});
        var s = t.name || Object.keys(i.prototype.modules).length + "_" + X.now();
        return (i.prototype.modules[s] = t).proto && Object.keys(t.proto).forEach(function(e) {
            i.prototype[e] = t.proto[e]
        }), t.static && Object.keys(t.static).forEach(function(e) {
            i[e] = t.static[e]
        }), t.install && t.install.apply(i, e), i
    }, s.use = function(e) {
        for (var t = [], a = arguments.length - 1; 0 < a--;) t[a] = arguments[a + 1];
        var i = this;
        return Array.isArray(e) ? (e.forEach(function(e) {
            return i.installModule(e)
        }), i) : i.installModule.apply(i, [e].concat(t))
    }, Object.defineProperties(s, n);
    var o = {
        updateSize: function() {
            var e, t, a = this,
                i = a.$el;
            e = void 0 !== a.params.width ? a.params.width : i[0].clientWidth, t = void 0 !== a.params.height ? a.params.height : i[0].clientHeight, 0 === e && a.isHorizontal() || 0 === t && a.isVertical() || (e = e - parseInt(i.css("padding-left"), 10) - parseInt(i.css("padding-right"), 10), t = t - parseInt(i.css("padding-top"), 10) - parseInt(i.css("padding-bottom"), 10), X.extend(a, {
                width: e,
                height: t,
                size: a.isHorizontal() ? e : t
            }))
        },
        updateSlides: function() {
            var e = this,
                t = e.params,
                a = e.$wrapperEl,
                i = e.size,
                s = e.rtlTranslate,
                r = e.wrongRTL,
                n = e.virtual && t.virtual.enabled,
                o = n ? e.virtual.slides.length : e.slides.length,
                l = a.children("." + e.params.slideClass),
                d = n ? e.virtual.slides.length : l.length,
                p = [],
                c = [],
                u = [],
                h = t.slidesOffsetBefore;
            "function" == typeof h && (h = t.slidesOffsetBefore.call(e));
            var v = t.slidesOffsetAfter;
            "function" == typeof v && (v = t.slidesOffsetAfter.call(e));
            var f = e.snapGrid.length,
                m = e.snapGrid.length,
                g = t.spaceBetween,
                b = -h,
                w = 0,
                y = 0;
            if (void 0 !== i) {
                var x, E;
                "string" == typeof g && 0 <= g.indexOf("%") && (g = parseFloat(g.replace("%", "")) / 100 * i), e.virtualSize = -g, s ? l.css({
                    marginLeft: "",
                    marginTop: ""
                }) : l.css({
                    marginRight: "",
                    marginBottom: ""
                }), 1 < t.slidesPerColumn && (x = Math.floor(d / t.slidesPerColumn) === d / e.params.slidesPerColumn ? d : Math.ceil(d / t.slidesPerColumn) * t.slidesPerColumn, "auto" !== t.slidesPerView && "row" === t.slidesPerColumnFill && (x = Math.max(x, t.slidesPerView * t.slidesPerColumn)));
                for (var T, S = t.slidesPerColumn, C = x / S, M = C - (t.slidesPerColumn * C - d), z = 0; z < d; z += 1) {
                    E = 0;
                    var k = l.eq(z);
                    if (1 < t.slidesPerColumn) {
                        var P = void 0,
                            $ = void 0,
                            L = void 0;
                        "column" === t.slidesPerColumnFill ? (L = z - ($ = Math.floor(z / S)) * S, (M < $ || $ === M && L === S - 1) && S <= (L += 1) && (L = 0, $ += 1), P = $ + L * x / S, k.css({
                            "-webkit-box-ordinal-group": P,
                            "-moz-box-ordinal-group": P,
                            "-ms-flex-order": P,
                            "-webkit-order": P,
                            order: P
                        })) : $ = z - (L = Math.floor(z / C)) * C, k.css("margin-" + (e.isHorizontal() ? "top" : "left"), 0 !== L && t.spaceBetween && t.spaceBetween + "px").attr("data-swiper-column", $).attr("data-swiper-row", L)
                    }
                    if ("none" !== k.css("display")) {
                        if ("auto" === t.slidesPerView) {
                            var I = B.getComputedStyle(k[0], null),
                                D = k[0].style.transform,
                                O = k[0].style.webkitTransform;
                            D && (k[0].style.transform = "none"), O && (k[0].style.webkitTransform = "none"), E = e.isHorizontal() ? k[0].getBoundingClientRect().width + parseFloat(I.getPropertyValue("margin-left")) + parseFloat(I.getPropertyValue("margin-right")) : k[0].getBoundingClientRect().height + parseFloat(I.getPropertyValue("margin-top")) + parseFloat(I.getPropertyValue("margin-bottom")), D && (k[0].style.transform = D), O && (k[0].style.webkitTransform = O), t.roundLengths && (E = Math.floor(E))
                        } else E = (i - (t.slidesPerView - 1) * g) / t.slidesPerView, t.roundLengths && (E = Math.floor(E)), l[z] && (e.isHorizontal() ? l[z].style.width = E + "px" : l[z].style.height = E + "px");
                        l[z] && (l[z].swiperSlideSize = E), u.push(E), t.centeredSlides ? (b = b + E / 2 + w / 2 + g, 0 === w && 0 !== z && (b = b - i / 2 - g), 0 === z && (b = b - i / 2 - g), Math.abs(b) < .001 && (b = 0), t.roundLengths && (b = Math.floor(b)), y % t.slidesPerGroup == 0 && p.push(b), c.push(b)) : (t.roundLengths && (b = Math.floor(b)), y % t.slidesPerGroup == 0 && p.push(b), c.push(b), b = b + E + g), e.virtualSize += E + g, w = E, y += 1
                    }
                }
                if (e.virtualSize = Math.max(e.virtualSize, i) + v, s && r && ("slide" === t.effect || "coverflow" === t.effect) && a.css({
                        width: e.virtualSize + t.spaceBetween + "px"
                    }), Y.flexbox && !t.setWrapperSize || (e.isHorizontal() ? a.css({
                        width: e.virtualSize + t.spaceBetween + "px"
                    }) : a.css({
                        height: e.virtualSize + t.spaceBetween + "px"
                    })), 1 < t.slidesPerColumn && (e.virtualSize = (E + t.spaceBetween) * x, e.virtualSize = Math.ceil(e.virtualSize / t.slidesPerColumn) - t.spaceBetween, e.isHorizontal() ? a.css({
                        width: e.virtualSize + t.spaceBetween + "px"
                    }) : a.css({
                        height: e.virtualSize + t.spaceBetween + "px"
                    }), t.centeredSlides)) {
                    T = [];
                    for (var A = 0; A < p.length; A += 1) {
                        var H = p[A];
                        t.roundLengths && (H = Math.floor(H)), p[A] < e.virtualSize + p[0] && T.push(H)
                    }
                    p = T
                }
                if (!t.centeredSlides) {
                    T = [];
                    for (var G = 0; G < p.length; G += 1) {
                        var N = p[G];
                        t.roundLengths && (N = Math.floor(N)), p[G] <= e.virtualSize - i && T.push(N)
                    }
                    p = T, 1 < Math.floor(e.virtualSize - i) - Math.floor(p[p.length - 1]) && p.push(e.virtualSize - i)
                }
                0 === p.length && (p = [0]), 0 !== t.spaceBetween && (e.isHorizontal() ? s ? l.css({
                    marginLeft: g + "px"
                }) : l.css({
                    marginRight: g + "px"
                }) : l.css({
                    marginBottom: g + "px"
                })), X.extend(e, {
                    slides: l,
                    snapGrid: p,
                    slidesGrid: c,
                    slidesSizesGrid: u
                }), d !== o && e.emit("slidesLengthChange"), p.length !== f && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), c.length !== m && e.emit("slidesGridLengthChange"), (t.watchSlidesProgress || t.watchSlidesVisibility) && e.updateSlidesOffset()
            }
        },
        updateAutoHeight: function(e) {
            var t, a = this,
                i = [],
                s = 0;
            if ("number" == typeof e ? a.setTransition(e) : !0 === e && a.setTransition(a.params.speed), "auto" !== a.params.slidesPerView && 1 < a.params.slidesPerView)
                for (t = 0; t < Math.ceil(a.params.slidesPerView); t += 1) {
                    var r = a.activeIndex + t;
                    if (r > a.slides.length) break;
                    i.push(a.slides.eq(r)[0])
                } else i.push(a.slides.eq(a.activeIndex)[0]);
            for (t = 0; t < i.length; t += 1)
                if (void 0 !== i[t]) {
                    var n = i[t].offsetHeight;
                    s = s < n ? n : s
                }
            s && a.$wrapperEl.css("height", s + "px")
        },
        updateSlidesOffset: function() {
            for (var e = this.slides, t = 0; t < e.length; t += 1) e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop
        },
        updateSlidesProgress: function(e) {
            void 0 === e && (e = this && this.translate || 0);
            var t = this,
                a = t.params,
                i = t.slides,
                s = t.rtlTranslate;
            if (0 !== i.length) {
                void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
                var r = -e;
                s && (r = e), i.removeClass(a.slideVisibleClass);
                for (var n = 0; n < i.length; n += 1) {
                    var o = i[n],
                        l = (r + (a.centeredSlides ? t.minTranslate() : 0) - o.swiperSlideOffset) / (o.swiperSlideSize + a.spaceBetween);
                    if (a.watchSlidesVisibility) {
                        var d = -(r - o.swiperSlideOffset),
                            p = d + t.slidesSizesGrid[n];
                        (0 <= d && d < t.size || 0 < p && p <= t.size || d <= 0 && p >= t.size) && i.eq(n).addClass(a.slideVisibleClass)
                    }
                    o.progress = s ? -l : l
                }
            }
        },
        updateProgress: function(e) {
            void 0 === e && (e = this && this.translate || 0);
            var t = this,
                a = t.params,
                i = t.maxTranslate() - t.minTranslate(),
                s = t.progress,
                r = t.isBeginning,
                n = t.isEnd,
                o = r,
                l = n;
            0 === i ? n = r = !(s = 0) : (r = (s = (e - t.minTranslate()) / i) <= 0, n = 1 <= s), X.extend(t, {
                progress: s,
                isBeginning: r,
                isEnd: n
            }), (a.watchSlidesProgress || a.watchSlidesVisibility) && t.updateSlidesProgress(e), r && !o && t.emit("reachBeginning toEdge"), n && !l && t.emit("reachEnd toEdge"), (o && !r || l && !n) && t.emit("fromEdge"), t.emit("progress", s)
        },
        updateSlidesClasses: function() {
            var e, t = this,
                a = t.slides,
                i = t.params,
                s = t.$wrapperEl,
                r = t.activeIndex,
                n = t.realIndex,
                o = t.virtual && i.virtual.enabled;
            a.removeClass(i.slideActiveClass + " " + i.slideNextClass + " " + i.slidePrevClass + " " + i.slideDuplicateActiveClass + " " + i.slideDuplicateNextClass + " " + i.slideDuplicatePrevClass), (e = o ? t.$wrapperEl.find("." + i.slideClass + '[data-swiper-slide-index="' + r + '"]') : a.eq(r)).addClass(i.slideActiveClass), i.loop && (e.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + n + '"]').addClass(i.slideDuplicateActiveClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + n + '"]').addClass(i.slideDuplicateActiveClass));
            var l = e.nextAll("." + i.slideClass).eq(0).addClass(i.slideNextClass);
            i.loop && 0 === l.length && (l = a.eq(0)).addClass(i.slideNextClass);
            var d = e.prevAll("." + i.slideClass).eq(0).addClass(i.slidePrevClass);
            i.loop && 0 === d.length && (d = a.eq(-1)).addClass(i.slidePrevClass), i.loop && (l.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass), d.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + d.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + d.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass))
        },
        updateActiveIndex: function(e) {
            var t, a = this,
                i = a.rtlTranslate ? a.translate : -a.translate,
                s = a.slidesGrid,
                r = a.snapGrid,
                n = a.params,
                o = a.activeIndex,
                l = a.realIndex,
                d = a.snapIndex,
                p = e;
            if (void 0 === p) {
                for (var c = 0; c < s.length; c += 1) void 0 !== s[c + 1] ? i >= s[c] && i < s[c + 1] - (s[c + 1] - s[c]) / 2 ? p = c : i >= s[c] && i < s[c + 1] && (p = c + 1) : i >= s[c] && (p = c);
                n.normalizeSlideIndex && (p < 0 || void 0 === p) && (p = 0)
            }
            if ((t = 0 <= r.indexOf(i) ? r.indexOf(i) : Math.floor(p / n.slidesPerGroup)) >= r.length && (t = r.length - 1), p !== o) {
                var u = parseInt(a.slides.eq(p).attr("data-swiper-slide-index") || p, 10);
                X.extend(a, {
                    snapIndex: t,
                    realIndex: u,
                    previousIndex: o,
                    activeIndex: p
                }), a.emit("activeIndexChange"), a.emit("snapIndexChange"), l !== u && a.emit("realIndexChange"), a.emit("slideChange")
            } else t !== d && (a.snapIndex = t, a.emit("snapIndexChange"))
        },
        updateClickedSlide: function(e) {
            var t = this,
                a = t.params,
                i = L(e.target).closest("." + a.slideClass)[0],
                s = !1;
            if (i)
                for (var r = 0; r < t.slides.length; r += 1) t.slides[r] === i && (s = !0);
            if (!i || !s) return t.clickedSlide = void 0, void(t.clickedIndex = void 0);
            t.clickedSlide = i, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(L(i).attr("data-swiper-slide-index"), 10) : t.clickedIndex = L(i).index(), a.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide()
        }
    };
    var d = {
        getTranslate: function(e) {
            void 0 === e && (e = this.isHorizontal() ? "x" : "y");
            var t = this.params,
                a = this.rtlTranslate,
                i = this.translate,
                s = this.$wrapperEl;
            if (t.virtualTranslate) return a ? -i : i;
            var r = X.getTranslate(s[0], e);
            return a && (r = -r), r || 0
        },
        setTranslate: function(e, t) {
            var a = this,
                i = a.rtlTranslate,
                s = a.params,
                r = a.$wrapperEl,
                n = a.progress,
                o = 0,
                l = 0;
            a.isHorizontal() ? o = i ? -e : e : l = e, s.roundLengths && (o = Math.floor(o), l = Math.floor(l)), s.virtualTranslate || (Y.transforms3d ? r.transform("translate3d(" + o + "px, " + l + "px, 0px)") : r.transform("translate(" + o + "px, " + l + "px)")), a.previousTranslate = a.translate, a.translate = a.isHorizontal() ? o : l;
            var d = a.maxTranslate() - a.minTranslate();
            (0 === d ? 0 : (e - a.minTranslate()) / d) !== n && a.updateProgress(e), a.emit("setTranslate", a.translate, t)
        },
        minTranslate: function() {
            return -this.snapGrid[0]
        },
        maxTranslate: function() {
            return -this.snapGrid[this.snapGrid.length - 1]
        }
    };
    var p = {
        setTransition: function(e, t) {
            this.$wrapperEl.transition(e), this.emit("setTransition", e, t)
        },
        transitionStart: function(e, t) {
            void 0 === e && (e = !0);
            var a = this,
                i = a.activeIndex,
                s = a.params,
                r = a.previousIndex;
            s.autoHeight && a.updateAutoHeight();
            var n = t;
            if (n || (n = r < i ? "next" : i < r ? "prev" : "reset"), a.emit("transitionStart"), e && i !== r) {
                if ("reset" === n) return void a.emit("slideResetTransitionStart");
                a.emit("slideChangeTransitionStart"), "next" === n ? a.emit("slideNextTransitionStart") : a.emit("slidePrevTransitionStart")
            }
        },
        transitionEnd: function(e, t) {
            void 0 === e && (e = !0);
            var a = this,
                i = a.activeIndex,
                s = a.previousIndex;
            a.animating = !1, a.setTransition(0);
            var r = t;
            if (r || (r = s < i ? "next" : i < s ? "prev" : "reset"), a.emit("transitionEnd"), e && i !== s) {
                if ("reset" === r) return void a.emit("slideResetTransitionEnd");
                a.emit("slideChangeTransitionEnd"), "next" === r ? a.emit("slideNextTransitionEnd") : a.emit("slidePrevTransitionEnd")
            }
        }
    };
    var c = {
        slideTo: function(e, t, a, i) {
            void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === a && (a = !0);
            var s = this,
                r = e;
            r < 0 && (r = 0);
            var n = s.params,
                o = s.snapGrid,
                l = s.slidesGrid,
                d = s.previousIndex,
                p = s.activeIndex,
                c = s.rtlTranslate;
            if (s.animating && n.preventInteractionOnTransition) return !1;
            var u = Math.floor(r / n.slidesPerGroup);
            u >= o.length && (u = o.length - 1), (p || n.initialSlide || 0) === (d || 0) && a && s.emit("beforeSlideChangeStart");
            var h, v = -o[u];
            if (s.updateProgress(v), n.normalizeSlideIndex)
                for (var f = 0; f < l.length; f += 1) - Math.floor(100 * v) >= Math.floor(100 * l[f]) && (r = f);
            if (s.initialized && r !== p) {
                if (!s.allowSlideNext && v < s.translate && v < s.minTranslate()) return !1;
                if (!s.allowSlidePrev && v > s.translate && v > s.maxTranslate() && (p || 0) !== r) return !1
            }
            return h = p < r ? "next" : r < p ? "prev" : "reset", c && -v === s.translate || !c && v === s.translate ? (s.updateActiveIndex(r), n.autoHeight && s.updateAutoHeight(), s.updateSlidesClasses(), "slide" !== n.effect && s.setTranslate(v), "reset" !== h && (s.transitionStart(a, h), s.transitionEnd(a, h)), !1) : (0 !== t && Y.transition ? (s.setTransition(t), s.setTranslate(v), s.updateActiveIndex(r), s.updateSlidesClasses(), s.emit("beforeTransitionStart", t, i), s.transitionStart(a, h), s.animating || (s.animating = !0, s.onSlideToWrapperTransitionEnd || (s.onSlideToWrapperTransitionEnd = function(e) {
                s && !s.destroyed && e.target === this && (s.$wrapperEl[0].removeEventListener("transitionend", s.onSlideToWrapperTransitionEnd), s.$wrapperEl[0].removeEventListener("webkitTransitionEnd", s.onSlideToWrapperTransitionEnd), s.onSlideToWrapperTransitionEnd = null, delete s.onSlideToWrapperTransitionEnd, s.transitionEnd(a, h))
            }), s.$wrapperEl[0].addEventListener("transitionend", s.onSlideToWrapperTransitionEnd), s.$wrapperEl[0].addEventListener("webkitTransitionEnd", s.onSlideToWrapperTransitionEnd))) : (s.setTransition(0), s.setTranslate(v), s.updateActiveIndex(r), s.updateSlidesClasses(), s.emit("beforeTransitionStart", t, i), s.transitionStart(a, h), s.transitionEnd(a, h)), !0)
        },
        slideToLoop: function(e, t, a, i) {
            void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === a && (a = !0);
            var s = e;
            return this.params.loop && (s += this.loopedSlides), this.slideTo(s, t, a, i)
        },
        slideNext: function(e, t, a) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            var i = this,
                s = i.params,
                r = i.animating;
            return s.loop ? !r && (i.loopFix(), i._clientLeft = i.$wrapperEl[0].clientLeft, i.slideTo(i.activeIndex + s.slidesPerGroup, e, t, a)) : i.slideTo(i.activeIndex + s.slidesPerGroup, e, t, a)
        },
        slidePrev: function(e, t, a) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            var i = this,
                s = i.params,
                r = i.animating,
                n = i.snapGrid,
                o = i.slidesGrid,
                l = i.rtlTranslate;
            if (s.loop) {
                if (r) return !1;
                i.loopFix(), i._clientLeft = i.$wrapperEl[0].clientLeft
            }

            function d(e) {
                return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
            }
            var p, c = d(l ? i.translate : -i.translate),
                u = n.map(function(e) {
                    return d(e)
                }),
                h = (o.map(function(e) {
                    return d(e)
                }), n[u.indexOf(c)], n[u.indexOf(c) - 1]);
            return void 0 !== h && (p = o.indexOf(h)) < 0 && (p = i.activeIndex - 1), i.slideTo(p, e, t, a)
        },
        slideReset: function(e, t, a) {
            return void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), this.slideTo(this.activeIndex, e, t, a)
        },
        slideToClosest: function(e, t, a) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            var i = this,
                s = i.activeIndex,
                r = Math.floor(s / i.params.slidesPerGroup);
            if (r < i.snapGrid.length - 1) {
                var n = i.rtlTranslate ? i.translate : -i.translate,
                    o = i.snapGrid[r];
                (i.snapGrid[r + 1] - o) / 2 < n - o && (s = i.params.slidesPerGroup)
            }
            return i.slideTo(s, e, t, a)
        },
        slideToClickedSlide: function() {
            var e, t = this,
                a = t.params,
                i = t.$wrapperEl,
                s = "auto" === a.slidesPerView ? t.slidesPerViewDynamic() : a.slidesPerView,
                r = t.clickedIndex;
            if (a.loop) {
                if (t.animating) return;
                e = parseInt(L(t.clickedSlide).attr("data-swiper-slide-index"), 10), a.centeredSlides ? r < t.loopedSlides - s / 2 || r > t.slides.length - t.loopedSlides + s / 2 ? (t.loopFix(), r = i.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + a.slideDuplicateClass + ")").eq(0).index(), X.nextTick(function() {
                    t.slideTo(r)
                })) : t.slideTo(r) : r > t.slides.length - s ? (t.loopFix(), r = i.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + a.slideDuplicateClass + ")").eq(0).index(), X.nextTick(function() {
                    t.slideTo(r)
                })) : t.slideTo(r)
            } else t.slideTo(r)
        }
    };
    var u = {
        loopCreate: function() {
            var i = this,
                e = i.params,
                t = i.$wrapperEl;
            t.children("." + e.slideClass + "." + e.slideDuplicateClass).remove();
            var s = t.children("." + e.slideClass);
            if (e.loopFillGroupWithBlank) {
                var a = e.slidesPerGroup - s.length % e.slidesPerGroup;
                if (a !== e.slidesPerGroup) {
                    for (var r = 0; r < a; r += 1) {
                        var n = L(f.createElement("div")).addClass(e.slideClass + " " + e.slideBlankClass);
                        t.append(n)
                    }
                    s = t.children("." + e.slideClass)
                }
            }
            "auto" !== e.slidesPerView || e.loopedSlides || (e.loopedSlides = s.length), i.loopedSlides = parseInt(e.loopedSlides || e.slidesPerView, 10), i.loopedSlides += e.loopAdditionalSlides, i.loopedSlides > s.length && (i.loopedSlides = s.length);
            var o = [],
                l = [];
            s.each(function(e, t) {
                var a = L(t);
                e < i.loopedSlides && l.push(t), e < s.length && e >= s.length - i.loopedSlides && o.push(t), a.attr("data-swiper-slide-index", e)
            });
            for (var d = 0; d < l.length; d += 1) t.append(L(l[d].cloneNode(!0)).addClass(e.slideDuplicateClass));
            for (var p = o.length - 1; 0 <= p; p -= 1) t.prepend(L(o[p].cloneNode(!0)).addClass(e.slideDuplicateClass))
        },
        loopFix: function() {
            var e, t = this,
                a = t.params,
                i = t.activeIndex,
                s = t.slides,
                r = t.loopedSlides,
                n = t.allowSlidePrev,
                o = t.allowSlideNext,
                l = t.snapGrid,
                d = t.rtlTranslate;
            t.allowSlidePrev = !0, t.allowSlideNext = !0;
            var p = -l[i] - t.getTranslate();
            i < r ? (e = s.length - 3 * r + i, e += r, t.slideTo(e, 0, !1, !0) && 0 !== p && t.setTranslate((d ? -t.translate : t.translate) - p)) : ("auto" === a.slidesPerView && 2 * r <= i || i >= s.length - r) && (e = -s.length + i + r, e += r, t.slideTo(e, 0, !1, !0) && 0 !== p && t.setTranslate((d ? -t.translate : t.translate) - p));
            t.allowSlidePrev = n, t.allowSlideNext = o
        },
        loopDestroy: function() {
            var e = this.$wrapperEl,
                t = this.params,
                a = this.slides;
            e.children("." + t.slideClass + "." + t.slideDuplicateClass).remove(), a.removeAttr("data-swiper-slide-index")
        }
    };
    var h = {
        setGrabCursor: function(e) {
            if (!(Y.touch || !this.params.simulateTouch || this.params.watchOverflow && this.isLocked)) {
                var t = this.el;
                t.style.cursor = "move", t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", t.style.cursor = e ? "-moz-grabbin" : "-moz-grab", t.style.cursor = e ? "grabbing" : "grab"
            }
        },
        unsetGrabCursor: function() {
            Y.touch || this.params.watchOverflow && this.isLocked || (this.el.style.cursor = "")
        }
    };
    var v = {
            appendSlide: function(e) {
                var t = this,
                    a = t.$wrapperEl,
                    i = t.params;
                if (i.loop && t.loopDestroy(), "object" == typeof e && "length" in e)
                    for (var s = 0; s < e.length; s += 1) e[s] && a.append(e[s]);
                else a.append(e);
                i.loop && t.loopCreate(), i.observer && Y.observer || t.update()
            },
            prependSlide: function(e) {
                var t = this,
                    a = t.params,
                    i = t.$wrapperEl,
                    s = t.activeIndex;
                a.loop && t.loopDestroy();
                var r = s + 1;
                if ("object" == typeof e && "length" in e) {
                    for (var n = 0; n < e.length; n += 1) e[n] && i.prepend(e[n]);
                    r = s + e.length
                } else i.prepend(e);
                a.loop && t.loopCreate(), a.observer && Y.observer || t.update(), t.slideTo(r, 0, !1)
            },
            addSlide: function(e, t) {
                var a = this,
                    i = a.$wrapperEl,
                    s = a.params,
                    r = a.activeIndex;
                s.loop && (r -= a.loopedSlides, a.loopDestroy(), a.slides = i.children("." + s.slideClass));
                var n = a.slides.length;
                if (e <= 0) a.prependSlide(t);
                else if (n <= e) a.appendSlide(t);
                else {
                    for (var o = e < r ? r + 1 : r, l = [], d = n - 1; e <= d; d -= 1) {
                        var p = a.slides.eq(d);
                        p.remove(), l.unshift(p)
                    }
                    if ("object" == typeof t && "length" in t) {
                        for (var c = 0; c < t.length; c += 1) t[c] && i.append(t[c]);
                        o = e < r ? r + t.length : r
                    } else i.append(t);
                    for (var u = 0; u < l.length; u += 1) i.append(l[u]);
                    s.loop && a.loopCreate(), s.observer && Y.observer || a.update(), s.loop ? a.slideTo(o + a.loopedSlides, 0, !1) : a.slideTo(o, 0, !1)
                }
            },
            removeSlide: function(e) {
                var t = this,
                    a = t.params,
                    i = t.$wrapperEl,
                    s = t.activeIndex;
                a.loop && (s -= t.loopedSlides, t.loopDestroy(), t.slides = i.children("." + a.slideClass));
                var r, n = s;
                if ("object" == typeof e && "length" in e) {
                    for (var o = 0; o < e.length; o += 1) r = e[o], t.slides[r] && t.slides.eq(r).remove(), r < n && (n -= 1);
                    n = Math.max(n, 0)
                } else r = e, t.slides[r] && t.slides.eq(r).remove(), r < n && (n -= 1), n = Math.max(n, 0);
                a.loop && t.loopCreate(), a.observer && Y.observer || t.update(), a.loop ? t.slideTo(n + t.loopedSlides, 0, !1) : t.slideTo(n, 0, !1)
            },
            removeAllSlides: function() {
                for (var e = [], t = 0; t < this.slides.length; t += 1) e.push(t);
                this.removeSlide(e)
            }
        },
        m = function() {
            var e = B.navigator.userAgent,
                t = {
                    ios: !1,
                    android: !1,
                    androidChrome: !1,
                    desktop: !1,
                    windows: !1,
                    iphone: !1,
                    ipod: !1,
                    ipad: !1,
                    cordova: B.cordova || B.phonegap,
                    phonegap: B.cordova || B.phonegap
                },
                a = e.match(/(Windows Phone);?[\s\/]+([\d.]+)?/),
                i = e.match(/(Android);?[\s\/]+([\d.]+)?/),
                s = e.match(/(iPad).*OS\s([\d_]+)/),
                r = e.match(/(iPod)(.*OS\s([\d_]+))?/),
                n = !s && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
            if (a && (t.os = "windows", t.osVersion = a[2], t.windows = !0), i && !a && (t.os = "android", t.osVersion = i[2], t.android = !0, t.androidChrome = 0 <= e.toLowerCase().indexOf("chrome")), (s || n || r) && (t.os = "ios", t.ios = !0), n && !r && (t.osVersion = n[2].replace(/_/g, "."), t.iphone = !0), s && (t.osVersion = s[2].replace(/_/g, "."), t.ipad = !0), r && (t.osVersion = r[3] ? r[3].replace(/_/g, ".") : null, t.iphone = !0), t.ios && t.osVersion && 0 <= e.indexOf("Version/") && "10" === t.osVersion.split(".")[0] && (t.osVersion = e.toLowerCase().split("version/")[1].split(" ")[0]), t.desktop = !(t.os || t.android || t.webView), t.webView = (n || s || r) && e.match(/.*AppleWebKit(?!.*Safari)/i), t.os && "ios" === t.os) {
                var o = t.osVersion.split("."),
                    l = f.querySelector('meta[name="viewport"]');
                t.minimalUi = !t.webView && (r || n) && (1 * o[0] == 7 ? 1 <= 1 * o[1] : 7 < 1 * o[0]) && l && 0 <= l.getAttribute("content").indexOf("minimal-ui")
            }
            return t.pixelRatio = B.devicePixelRatio || 1, t
        }();

    function g() {
        var e = this,
            t = e.params,
            a = e.el;
        if (!a || 0 !== a.offsetWidth) {
            t.breakpoints && e.setBreakpoint();
            var i = e.allowSlideNext,
                s = e.allowSlidePrev,
                r = e.snapGrid;
            if (e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), t.freeMode) {
                var n = Math.min(Math.max(e.translate, e.maxTranslate()), e.minTranslate());
                e.setTranslate(n), e.updateActiveIndex(), e.updateSlidesClasses(), t.autoHeight && e.updateAutoHeight()
            } else e.updateSlidesClasses(), ("auto" === t.slidesPerView || 1 < t.slidesPerView) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0);
            e.allowSlidePrev = s, e.allowSlideNext = i, e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow()
        }
    }
    var b = {
        attachEvents: function() {
            var e = this,
                t = e.params,
                a = e.touchEvents,
                i = e.el,
                s = e.wrapperEl;
            e.onTouchStart = function(e) {
                var t = this,
                    a = t.touchEventsData,
                    i = t.params,
                    s = t.touches;
                if (!t.animating || !i.preventInteractionOnTransition) {
                    var r = e;
                    if (r.originalEvent && (r = r.originalEvent), a.isTouchEvent = "touchstart" === r.type, (a.isTouchEvent || !("which" in r) || 3 !== r.which) && (!a.isTouched || !a.isMoved))
                        if (i.noSwiping && L(r.target).closest(i.noSwipingSelector ? i.noSwipingSelector : "." + i.noSwipingClass)[0]) t.allowClick = !0;
                        else if (!i.swipeHandler || L(r).closest(i.swipeHandler)[0]) {
                        s.currentX = "touchstart" === r.type ? r.targetTouches[0].pageX : r.pageX, s.currentY = "touchstart" === r.type ? r.targetTouches[0].pageY : r.pageY;
                        var n = s.currentX,
                            o = s.currentY,
                            l = i.edgeSwipeDetection || i.iOSEdgeSwipeDetection,
                            d = i.edgeSwipeThreshold || i.iOSEdgeSwipeThreshold;
                        if (!l || !(n <= d || n >= B.screen.width - d)) {
                            if (X.extend(a, {
                                    isTouched: !0,
                                    isMoved: !1,
                                    allowTouchCallbacks: !0,
                                    isScrolling: void 0,
                                    startMoving: void 0
                                }), s.startX = n, s.startY = o, a.touchStartTime = X.now(), t.allowClick = !0, t.updateSize(), t.swipeDirection = void 0, 0 < i.threshold && (a.allowThresholdMove = !1), "touchstart" !== r.type) {
                                var p = !0;
                                L(r.target).is(a.formElements) && (p = !1), f.activeElement && L(f.activeElement).is(a.formElements) && f.activeElement !== r.target && f.activeElement.blur(), p && t.allowTouchMove && r.preventDefault()
                            }
                            t.emit("touchStart", r)
                        }
                    }
                }
            }.bind(e), e.onTouchMove = function(e) {
                var t = this,
                    a = t.touchEventsData,
                    i = t.params,
                    s = t.touches,
                    r = t.rtlTranslate,
                    n = e;
                if (n.originalEvent && (n = n.originalEvent), a.isTouched) {
                    if (!a.isTouchEvent || "mousemove" !== n.type) {
                        var o = "touchmove" === n.type ? n.targetTouches[0].pageX : n.pageX,
                            l = "touchmove" === n.type ? n.targetTouches[0].pageY : n.pageY;
                        if (n.preventedByNestedSwiper) return s.startX = o, void(s.startY = l);
                        if (!t.allowTouchMove) return t.allowClick = !1, void(a.isTouched && (X.extend(s, {
                            startX: o,
                            startY: l,
                            currentX: o,
                            currentY: l
                        }), a.touchStartTime = X.now()));
                        if (a.isTouchEvent && i.touchReleaseOnEdges && !i.loop)
                            if (t.isVertical()) {
                                if (l < s.startY && t.translate <= t.maxTranslate() || l > s.startY && t.translate >= t.minTranslate()) return a.isTouched = !1, void(a.isMoved = !1)
                            } else if (o < s.startX && t.translate <= t.maxTranslate() || o > s.startX && t.translate >= t.minTranslate()) return;
                        if (a.isTouchEvent && f.activeElement && n.target === f.activeElement && L(n.target).is(a.formElements)) return a.isMoved = !0, void(t.allowClick = !1);
                        if (a.allowTouchCallbacks && t.emit("touchMove", n), !(n.targetTouches && 1 < n.targetTouches.length)) {
                            s.currentX = o, s.currentY = l;
                            var d, p = s.currentX - s.startX,
                                c = s.currentY - s.startY;
                            if (!(t.params.threshold && Math.sqrt(Math.pow(p, 2) + Math.pow(c, 2)) < t.params.threshold))
                                if (void 0 === a.isScrolling && (t.isHorizontal() && s.currentY === s.startY || t.isVertical() && s.currentX === s.startX ? a.isScrolling = !1 : 25 <= p * p + c * c && (d = 180 * Math.atan2(Math.abs(c), Math.abs(p)) / Math.PI, a.isScrolling = t.isHorizontal() ? d > i.touchAngle : 90 - d > i.touchAngle)), a.isScrolling && t.emit("touchMoveOpposite", n), void 0 === a.startMoving && (s.currentX === s.startX && s.currentY === s.startY || (a.startMoving = !0)), a.isScrolling) a.isTouched = !1;
                                else if (a.startMoving) {
                                t.allowClick = !1, n.preventDefault(), i.touchMoveStopPropagation && !i.nested && n.stopPropagation(), a.isMoved || (i.loop && t.loopFix(), a.startTranslate = t.getTranslate(), t.setTransition(0), t.animating && t.$wrapperEl.trigger("webkitTransitionEnd transitionend"), a.allowMomentumBounce = !1, !i.grabCursor || !0 !== t.allowSlideNext && !0 !== t.allowSlidePrev || t.setGrabCursor(!0), t.emit("sliderFirstMove", n)), t.emit("sliderMove", n), a.isMoved = !0;
                                var u = t.isHorizontal() ? p : c;
                                s.diff = u, u *= i.touchRatio, r && (u = -u), t.swipeDirection = 0 < u ? "prev" : "next", a.currentTranslate = u + a.startTranslate;
                                var h = !0,
                                    v = i.resistanceRatio;
                                if (i.touchReleaseOnEdges && (v = 0), 0 < u && a.currentTranslate > t.minTranslate() ? (h = !1, i.resistance && (a.currentTranslate = t.minTranslate() - 1 + Math.pow(-t.minTranslate() + a.startTranslate + u, v))) : u < 0 && a.currentTranslate < t.maxTranslate() && (h = !1, i.resistance && (a.currentTranslate = t.maxTranslate() + 1 - Math.pow(t.maxTranslate() - a.startTranslate - u, v))), h && (n.preventedByNestedSwiper = !0), !t.allowSlideNext && "next" === t.swipeDirection && a.currentTranslate < a.startTranslate && (a.currentTranslate = a.startTranslate), !t.allowSlidePrev && "prev" === t.swipeDirection && a.currentTranslate > a.startTranslate && (a.currentTranslate = a.startTranslate), 0 < i.threshold) {
                                    if (!(Math.abs(u) > i.threshold || a.allowThresholdMove)) return void(a.currentTranslate = a.startTranslate);
                                    if (!a.allowThresholdMove) return a.allowThresholdMove = !0, s.startX = s.currentX, s.startY = s.currentY, a.currentTranslate = a.startTranslate, void(s.diff = t.isHorizontal() ? s.currentX - s.startX : s.currentY - s.startY)
                                }
                                i.followFinger && ((i.freeMode || i.watchSlidesProgress || i.watchSlidesVisibility) && (t.updateActiveIndex(), t.updateSlidesClasses()), i.freeMode && (0 === a.velocities.length && a.velocities.push({
                                    position: s[t.isHorizontal() ? "startX" : "startY"],
                                    time: a.touchStartTime
                                }), a.velocities.push({
                                    position: s[t.isHorizontal() ? "currentX" : "currentY"],
                                    time: X.now()
                                })), t.updateProgress(a.currentTranslate), t.setTranslate(a.currentTranslate))
                            }
                        }
                    }
                } else a.startMoving && a.isScrolling && t.emit("touchMoveOpposite", n)
            }.bind(e), e.onTouchEnd = function(e) {
                var t = this,
                    a = t.touchEventsData,
                    i = t.params,
                    s = t.touches,
                    r = t.rtlTranslate,
                    n = t.$wrapperEl,
                    o = t.slidesGrid,
                    l = t.snapGrid,
                    d = e;
                if (d.originalEvent && (d = d.originalEvent), a.allowTouchCallbacks && t.emit("touchEnd", d), a.allowTouchCallbacks = !1, !a.isTouched) return a.isMoved && i.grabCursor && t.setGrabCursor(!1), a.isMoved = !1, void(a.startMoving = !1);
                i.grabCursor && a.isMoved && a.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
                var p, c = X.now(),
                    u = c - a.touchStartTime;
                if (t.allowClick && (t.updateClickedSlide(d), t.emit("tap", d), u < 300 && 300 < c - a.lastClickTime && (a.clickTimeout && clearTimeout(a.clickTimeout), a.clickTimeout = X.nextTick(function() {
                        t && !t.destroyed && t.emit("click", d)
                    }, 300)), u < 300 && c - a.lastClickTime < 300 && (a.clickTimeout && clearTimeout(a.clickTimeout), t.emit("doubleTap", d))), a.lastClickTime = X.now(), X.nextTick(function() {
                        t.destroyed || (t.allowClick = !0)
                    }), !a.isTouched || !a.isMoved || !t.swipeDirection || 0 === s.diff || a.currentTranslate === a.startTranslate) return a.isTouched = !1, a.isMoved = !1, void(a.startMoving = !1);
                if (a.isTouched = !1, a.isMoved = !1, a.startMoving = !1, p = i.followFinger ? r ? t.translate : -t.translate : -a.currentTranslate, i.freeMode) {
                    if (p < -t.minTranslate()) return void t.slideTo(t.activeIndex);
                    if (p > -t.maxTranslate()) return void(t.slides.length < l.length ? t.slideTo(l.length - 1) : t.slideTo(t.slides.length - 1));
                    if (i.freeModeMomentum) {
                        if (1 < a.velocities.length) {
                            var h = a.velocities.pop(),
                                v = a.velocities.pop(),
                                f = h.position - v.position,
                                m = h.time - v.time;
                            t.velocity = f / m, t.velocity /= 2, Math.abs(t.velocity) < i.freeModeMinimumVelocity && (t.velocity = 0), (150 < m || 300 < X.now() - h.time) && (t.velocity = 0)
                        } else t.velocity = 0;
                        t.velocity *= i.freeModeMomentumVelocityRatio, a.velocities.length = 0;
                        var g = 1e3 * i.freeModeMomentumRatio,
                            b = t.velocity * g,
                            w = t.translate + b;
                        r && (w = -w);
                        var y, x, E = !1,
                            T = 20 * Math.abs(t.velocity) * i.freeModeMomentumBounceRatio;
                        if (w < t.maxTranslate()) i.freeModeMomentumBounce ? (w + t.maxTranslate() < -T && (w = t.maxTranslate() - T), y = t.maxTranslate(), E = !0, a.allowMomentumBounce = !0) : w = t.maxTranslate(), i.loop && i.centeredSlides && (x = !0);
                        else if (w > t.minTranslate()) i.freeModeMomentumBounce ? (w - t.minTranslate() > T && (w = t.minTranslate() + T), y = t.minTranslate(), E = !0, a.allowMomentumBounce = !0) : w = t.minTranslate(), i.loop && i.centeredSlides && (x = !0);
                        else if (i.freeModeSticky) {
                            for (var S, C = 0; C < l.length; C += 1)
                                if (l[C] > -w) {
                                    S = C;
                                    break
                                }
                            w = -(w = Math.abs(l[S] - w) < Math.abs(l[S - 1] - w) || "next" === t.swipeDirection ? l[S] : l[S - 1])
                        }
                        if (x && t.once("transitionEnd", function() {
                                t.loopFix()
                            }), 0 !== t.velocity) g = r ? Math.abs((-w - t.translate) / t.velocity) : Math.abs((w - t.translate) / t.velocity);
                        else if (i.freeModeSticky) return void t.slideToClosest();
                        i.freeModeMomentumBounce && E ? (t.updateProgress(y), t.setTransition(g), t.setTranslate(w), t.transitionStart(!0, t.swipeDirection), t.animating = !0, n.transitionEnd(function() {
                            t && !t.destroyed && a.allowMomentumBounce && (t.emit("momentumBounce"), t.setTransition(i.speed), t.setTranslate(y), n.transitionEnd(function() {
                                t && !t.destroyed && t.transitionEnd()
                            }))
                        })) : t.velocity ? (t.updateProgress(w), t.setTransition(g), t.setTranslate(w), t.transitionStart(!0, t.swipeDirection), t.animating || (t.animating = !0, n.transitionEnd(function() {
                            t && !t.destroyed && t.transitionEnd()
                        }))) : t.updateProgress(w), t.updateActiveIndex(), t.updateSlidesClasses()
                    } else if (i.freeModeSticky) return void t.slideToClosest();
                    (!i.freeModeMomentum || u >= i.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses())
                } else {
                    for (var M = 0, z = t.slidesSizesGrid[0], k = 0; k < o.length; k += i.slidesPerGroup) void 0 !== o[k + i.slidesPerGroup] ? p >= o[k] && p < o[k + i.slidesPerGroup] && (z = o[(M = k) + i.slidesPerGroup] - o[k]) : p >= o[k] && (M = k, z = o[o.length - 1] - o[o.length - 2]);
                    var P = (p - o[M]) / z;
                    if (u > i.longSwipesMs) {
                        if (!i.longSwipes) return void t.slideTo(t.activeIndex);
                        "next" === t.swipeDirection && (P >= i.longSwipesRatio ? t.slideTo(M + i.slidesPerGroup) : t.slideTo(M)), "prev" === t.swipeDirection && (P > 1 - i.longSwipesRatio ? t.slideTo(M + i.slidesPerGroup) : t.slideTo(M))
                    } else {
                        if (!i.shortSwipes) return void t.slideTo(t.activeIndex);
                        "next" === t.swipeDirection && t.slideTo(M + i.slidesPerGroup), "prev" === t.swipeDirection && t.slideTo(M)
                    }
                }
            }.bind(e), e.onClick = function(e) {
                this.allowClick || (this.params.preventClicks && e.preventDefault(), this.params.preventClicksPropagation && this.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
            }.bind(e);
            var r = "container" === t.touchEventsTarget ? i : s,
                n = !!t.nested;
            if (Y.touch || !Y.pointerEvents && !Y.prefixedPointerEvents) {
                if (Y.touch) {
                    var o = !("touchstart" !== a.start || !Y.passiveListener || !t.passiveListeners) && {
                        passive: !0,
                        capture: !1
                    };
                    r.addEventListener(a.start, e.onTouchStart, o), r.addEventListener(a.move, e.onTouchMove, Y.passiveListener ? {
                        passive: !1,
                        capture: n
                    } : n), r.addEventListener(a.end, e.onTouchEnd, o)
                }(t.simulateTouch && !m.ios && !m.android || t.simulateTouch && !Y.touch && m.ios) && (r.addEventListener("mousedown", e.onTouchStart, !1), f.addEventListener("mousemove", e.onTouchMove, n), f.addEventListener("mouseup", e.onTouchEnd, !1))
            } else r.addEventListener(a.start, e.onTouchStart, !1), f.addEventListener(a.move, e.onTouchMove, n), f.addEventListener(a.end, e.onTouchEnd, !1);
            (t.preventClicks || t.preventClicksPropagation) && r.addEventListener("click", e.onClick, !0), e.on(m.ios || m.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", g, !0)
        },
        detachEvents: function() {
            var e = this,
                t = e.params,
                a = e.touchEvents,
                i = e.el,
                s = e.wrapperEl,
                r = "container" === t.touchEventsTarget ? i : s,
                n = !!t.nested;
            if (Y.touch || !Y.pointerEvents && !Y.prefixedPointerEvents) {
                if (Y.touch) {
                    var o = !("onTouchStart" !== a.start || !Y.passiveListener || !t.passiveListeners) && {
                        passive: !0,
                        capture: !1
                    };
                    r.removeEventListener(a.start, e.onTouchStart, o), r.removeEventListener(a.move, e.onTouchMove, n), r.removeEventListener(a.end, e.onTouchEnd, o)
                }(t.simulateTouch && !m.ios && !m.android || t.simulateTouch && !Y.touch && m.ios) && (r.removeEventListener("mousedown", e.onTouchStart, !1), f.removeEventListener("mousemove", e.onTouchMove, n), f.removeEventListener("mouseup", e.onTouchEnd, !1))
            } else r.removeEventListener(a.start, e.onTouchStart, !1), f.removeEventListener(a.move, e.onTouchMove, n), f.removeEventListener(a.end, e.onTouchEnd, !1);
            (t.preventClicks || t.preventClicksPropagation) && r.removeEventListener("click", e.onClick, !0), e.off(m.ios || m.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", g)
        }
    };
    var w, y = {
            setBreakpoint: function() {
                var e = this,
                    t = e.activeIndex,
                    a = e.initialized,
                    i = e.loopedSlides;
                void 0 === i && (i = 0);
                var s = e.params,
                    r = s.breakpoints;
                if (r && (!r || 0 !== Object.keys(r).length)) {
                    var n = e.getBreakpoint(r);
                    if (n && e.currentBreakpoint !== n) {
                        var o = n in r ? r[n] : e.originalParams,
                            l = s.loop && o.slidesPerView !== s.slidesPerView;
                        X.extend(e.params, o), X.extend(e, {
                            allowTouchMove: e.params.allowTouchMove,
                            allowSlideNext: e.params.allowSlideNext,
                            allowSlidePrev: e.params.allowSlidePrev
                        }), e.currentBreakpoint = n, l && a && (e.loopDestroy(), e.loopCreate(), e.updateSlides(), e.slideTo(t - i + e.loopedSlides, 0, !1)), e.emit("breakpoint", o)
                    }
                }
            },
            getBreakpoint: function(e) {
                if (e) {
                    var t = !1,
                        a = [];
                    Object.keys(e).forEach(function(e) {
                        a.push(e)
                    }), a.sort(function(e, t) {
                        return parseInt(e, 10) - parseInt(t, 10)
                    });
                    for (var i = 0; i < a.length; i += 1) {
                        var s = a[i];
                        s >= B.innerWidth && !t && (t = s)
                    }
                    return t || "max"
                }
            }
        },
        I = {
            isIE: !!B.navigator.userAgent.match(/Trident/g) || !!B.navigator.userAgent.match(/MSIE/g),
            isSafari: (w = B.navigator.userAgent.toLowerCase(), 0 <= w.indexOf("safari") && w.indexOf("chrome") < 0 && w.indexOf("android") < 0),
            isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(B.navigator.userAgent)
        };
    var x = {
            init: !0,
            direction: "horizontal",
            touchEventsTarget: "container",
            initialSlide: 0,
            speed: 300,
            preventInteractionOnTransition: !1,
            edgeSwipeDetection: !1,
            edgeSwipeThreshold: 20,
            freeMode: !1,
            freeModeMomentum: !0,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: !0,
            freeModeMomentumBounceRatio: 1,
            freeModeMomentumVelocityRatio: 1,
            freeModeSticky: !1,
            freeModeMinimumVelocity: .02,
            autoHeight: !1,
            setWrapperSize: !1,
            virtualTranslate: !1,
            effect: "slide",
            breakpoints: void 0,
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: "column",
            slidesPerGroup: 1,
            centeredSlides: !1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            normalizeSlideIndex: !0,
            watchOverflow: !1,
            roundLengths: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: .5,
            longSwipesMs: 300,
            followFinger: !0,
            allowTouchMove: !0,
            threshold: 0,
            touchMoveStopPropagation: !0,
            touchReleaseOnEdges: !1,
            uniqueNavElements: !0,
            resistance: !0,
            resistanceRatio: .85,
            watchSlidesProgress: !1,
            watchSlidesVisibility: !1,
            grabCursor: !1,
            preventClicks: !0,
            preventClicksPropagation: !0,
            slideToClickedSlide: !1,
            preloadImages: !0,
            updateOnImagesReady: !0,
            loop: !1,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            loopFillGroupWithBlank: !1,
            allowSlidePrev: !0,
            allowSlideNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: "swiper-no-swiping",
            noSwipingSelector: null,
            passiveListeners: !0,
            containerModifierClass: "swiper-container-",
            slideClass: "swiper-slide",
            slideBlankClass: "swiper-slide-invisible-blank",
            slideActiveClass: "swiper-slide-active",
            slideDuplicateActiveClass: "swiper-slide-duplicate-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slideDuplicateNextClass: "swiper-slide-duplicate-next",
            slidePrevClass: "swiper-slide-prev",
            slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
            wrapperClass: "swiper-wrapper",
            runCallbacksOnInit: !0
        },
        E = {
            update: o,
            translate: d,
            transition: p,
            slide: c,
            loop: u,
            grabCursor: h,
            manipulation: v,
            events: b,
            breakpoints: y,
            checkOverflow: {
                checkOverflow: function() {
                    var e = this,
                        t = e.isLocked;
                    e.isLocked = 1 === e.snapGrid.length, e.allowSlideNext = !e.isLocked, e.allowSlidePrev = !e.isLocked, t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock"), t && t !== e.isLocked && (e.isEnd = !1, e.navigation.update())
                }
            },
            classes: {
                addClasses: function() {
                    var t = this.classNames,
                        a = this.params,
                        e = this.rtl,
                        i = this.$el,
                        s = [];
                    s.push(a.direction), a.freeMode && s.push("free-mode"), Y.flexbox || s.push("no-flexbox"), a.autoHeight && s.push("autoheight"), e && s.push("rtl"), 1 < a.slidesPerColumn && s.push("multirow"), m.android && s.push("android"), m.ios && s.push("ios"), I.isIE && (Y.pointerEvents || Y.prefixedPointerEvents) && s.push("wp8-" + a.direction), s.forEach(function(e) {
                        t.push(a.containerModifierClass + e)
                    }), i.addClass(t.join(" "))
                },
                removeClasses: function() {
                    var e = this.$el,
                        t = this.classNames;
                    e.removeClass(t.join(" "))
                }
            },
            images: {
                loadImage: function(e, t, a, i, s, r) {
                    var n;

                    function o() {
                        r && r()
                    }
                    e.complete && s ? o() : t ? ((n = new B.Image).onload = o, n.onerror = o, i && (n.sizes = i), a && (n.srcset = a), t && (n.src = t)) : o()
                },
                preloadImages: function() {
                    var e = this;

                    function t() {
                        null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")))
                    }
                    e.imagesToLoad = e.$el.find("img");
                    for (var a = 0; a < e.imagesToLoad.length; a += 1) {
                        var i = e.imagesToLoad[a];
                        e.loadImage(i, i.currentSrc || i.getAttribute("src"), i.srcset || i.getAttribute("srcset"), i.sizes || i.getAttribute("sizes"), !0, t)
                    }
                }
            }
        },
        T = {},
        S = function(u) {
            function h() {
                for (var e, t, s, a = [], i = arguments.length; i--;) a[i] = arguments[i];
                1 === a.length && a[0].constructor && a[0].constructor === Object ? s = a[0] : (t = (e = a)[0], s = e[1]), s || (s = {}), s = X.extend({}, s), t && !s.el && (s.el = t), u.call(this, s), Object.keys(E).forEach(function(t) {
                    Object.keys(E[t]).forEach(function(e) {
                        h.prototype[e] || (h.prototype[e] = E[t][e])
                    })
                });
                var r = this;
                void 0 === r.modules && (r.modules = {}), Object.keys(r.modules).forEach(function(e) {
                    var t = r.modules[e];
                    if (t.params) {
                        var a = Object.keys(t.params)[0],
                            i = t.params[a];
                        if ("object" != typeof i) return;
                        if (!(a in s && "enabled" in i)) return;
                        !0 === s[a] && (s[a] = {
                            enabled: !0
                        }), "object" != typeof s[a] || "enabled" in s[a] || (s[a].enabled = !0), s[a] || (s[a] = {
                            enabled: !1
                        })
                    }
                });
                var n = X.extend({}, x);
                r.useModulesParams(n), r.params = X.extend({}, n, T, s), r.originalParams = X.extend({}, r.params), r.passedParams = X.extend({}, s);
                var o = (r.$ = L)(r.params.el);
                if (t = o[0]) {
                    if (1 < o.length) {
                        var l = [];
                        return o.each(function(e, t) {
                            var a = X.extend({}, s, {
                                el: t
                            });
                            l.push(new h(a))
                        }), l
                    }
                    t.swiper = r, o.data("swiper", r);
                    var d, p, c = o.children("." + r.params.wrapperClass);
                    return X.extend(r, {
                        $el: o,
                        el: t,
                        $wrapperEl: c,
                        wrapperEl: c[0],
                        classNames: [],
                        slides: L(),
                        slidesGrid: [],
                        snapGrid: [],
                        slidesSizesGrid: [],
                        isHorizontal: function() {
                            return "horizontal" === r.params.direction
                        },
                        isVertical: function() {
                            return "vertical" === r.params.direction
                        },
                        rtl: "rtl" === t.dir.toLowerCase() || "rtl" === o.css("direction"),
                        rtlTranslate: "horizontal" === r.params.direction && ("rtl" === t.dir.toLowerCase() || "rtl" === o.css("direction")),
                        wrongRTL: "-webkit-box" === c.css("display"),
                        activeIndex: 0,
                        realIndex: 0,
                        isBeginning: !0,
                        isEnd: !1,
                        translate: 0,
                        previousTranslate: 0,
                        progress: 0,
                        velocity: 0,
                        animating: !1,
                        allowSlideNext: r.params.allowSlideNext,
                        allowSlidePrev: r.params.allowSlidePrev,
                        touchEvents: (d = ["touchstart", "touchmove", "touchend"], p = ["mousedown", "mousemove", "mouseup"], Y.pointerEvents ? p = ["pointerdown", "pointermove", "pointerup"] : Y.prefixedPointerEvents && (p = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), r.touchEventsTouch = {
                            start: d[0],
                            move: d[1],
                            end: d[2]
                        }, r.touchEventsDesktop = {
                            start: p[0],
                            move: p[1],
                            end: p[2]
                        }, Y.touch || !r.params.simulateTouch ? r.touchEventsTouch : r.touchEventsDesktop),
                        touchEventsData: {
                            isTouched: void 0,
                            isMoved: void 0,
                            allowTouchCallbacks: void 0,
                            touchStartTime: void 0,
                            isScrolling: void 0,
                            currentTranslate: void 0,
                            startTranslate: void 0,
                            allowThresholdMove: void 0,
                            formElements: "input, select, option, textarea, button, video",
                            lastClickTime: X.now(),
                            clickTimeout: void 0,
                            velocities: [],
                            allowMomentumBounce: void 0,
                            isTouchEvent: void 0,
                            startMoving: void 0
                        },
                        allowClick: !0,
                        allowTouchMove: r.params.allowTouchMove,
                        touches: {
                            startX: 0,
                            startY: 0,
                            currentX: 0,
                            currentY: 0,
                            diff: 0
                        },
                        imagesToLoad: [],
                        imagesLoaded: 0
                    }), r.useModules(), r.params.init && r.init(), r
                }
            }
            u && (h.__proto__ = u);
            var e = {
                extendedDefaults: {
                    configurable: !0
                },
                defaults: {
                    configurable: !0
                },
                Class: {
                    configurable: !0
                },
                $: {
                    configurable: !0
                }
            };
            return ((h.prototype = Object.create(u && u.prototype)).constructor = h).prototype.slidesPerViewDynamic = function() {
                var e = this,
                    t = e.params,
                    a = e.slides,
                    i = e.slidesGrid,
                    s = e.size,
                    r = e.activeIndex,
                    n = 1;
                if (t.centeredSlides) {
                    for (var o, l = a[r].swiperSlideSize, d = r + 1; d < a.length; d += 1) a[d] && !o && (n += 1, s < (l += a[d].swiperSlideSize) && (o = !0));
                    for (var p = r - 1; 0 <= p; p -= 1) a[p] && !o && (n += 1, s < (l += a[p].swiperSlideSize) && (o = !0))
                } else
                    for (var c = r + 1; c < a.length; c += 1) i[c] - i[r] < s && (n += 1);
                return n
            }, h.prototype.update = function() {
                var a = this;
                if (a && !a.destroyed) {
                    var e = a.snapGrid,
                        t = a.params;
                    t.breakpoints && a.setBreakpoint(), a.updateSize(), a.updateSlides(), a.updateProgress(), a.updateSlidesClasses(), a.params.freeMode ? (i(), a.params.autoHeight && a.updateAutoHeight()) : (("auto" === a.params.slidesPerView || 1 < a.params.slidesPerView) && a.isEnd && !a.params.centeredSlides ? a.slideTo(a.slides.length - 1, 0, !1, !0) : a.slideTo(a.activeIndex, 0, !1, !0)) || i(), t.watchOverflow && e !== a.snapGrid && a.checkOverflow(), a.emit("update")
                }

                function i() {
                    var e = a.rtlTranslate ? -1 * a.translate : a.translate,
                        t = Math.min(Math.max(e, a.maxTranslate()), a.minTranslate());
                    a.setTranslate(t), a.updateActiveIndex(), a.updateSlidesClasses()
                }
            }, h.prototype.init = function() {
                var e = this;
                e.initialized || (e.emit("beforeInit"), e.params.breakpoints && e.setBreakpoint(), e.addClasses(), e.params.loop && e.loopCreate(), e.updateSize(), e.updateSlides(), e.params.watchOverflow && e.checkOverflow(), e.params.grabCursor && e.setGrabCursor(), e.params.preloadImages && e.preloadImages(), e.params.loop ? e.slideTo(e.params.initialSlide + e.loopedSlides, 0, e.params.runCallbacksOnInit) : e.slideTo(e.params.initialSlide, 0, e.params.runCallbacksOnInit), e.attachEvents(), e.initialized = !0, e.emit("init"))
            }, h.prototype.destroy = function(e, t) {
                void 0 === e && (e = !0), void 0 === t && (t = !0);
                var a = this,
                    i = a.params,
                    s = a.$el,
                    r = a.$wrapperEl,
                    n = a.slides;
                return void 0 === a.params || a.destroyed || (a.emit("beforeDestroy"), a.initialized = !1, a.detachEvents(), i.loop && a.loopDestroy(), t && (a.removeClasses(), s.removeAttr("style"), r.removeAttr("style"), n && n.length && n.removeClass([i.slideVisibleClass, i.slideActiveClass, i.slideNextClass, i.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index").removeAttr("data-swiper-column").removeAttr("data-swiper-row")), a.emit("destroy"), Object.keys(a.eventsListeners).forEach(function(e) {
                    a.off(e)
                }), !1 !== e && (a.$el[0].swiper = null, a.$el.data("swiper", null), X.deleteProps(a)), a.destroyed = !0), null
            }, h.extendDefaults = function(e) {
                X.extend(T, e)
            }, e.extendedDefaults.get = function() {
                return T
            }, e.defaults.get = function() {
                return x
            }, e.Class.get = function() {
                return u
            }, e.$.get = function() {
                return L
            }, Object.defineProperties(h, e), h
        }(s),
        C = {
            name: "device",
            proto: {
                device: m
            },
            static: {
                device: m
            }
        },
        M = {
            name: "support",
            proto: {
                support: Y
            },
            static: {
                support: Y
            }
        },
        z = {
            name: "browser",
            proto: {
                browser: I
            },
            static: {
                browser: I
            }
        },
        k = {
            name: "resize",
            create: function() {
                var e = this;
                X.extend(e, {
                    resize: {
                        resizeHandler: function() {
                            e && !e.destroyed && e.initialized && (e.emit("beforeResize"), e.emit("resize"))
                        },
                        orientationChangeHandler: function() {
                            e && !e.destroyed && e.initialized && e.emit("orientationchange")
                        }
                    }
                })
            },
            on: {
                init: function() {
                    B.addEventListener("resize", this.resize.resizeHandler), B.addEventListener("orientationchange", this.resize.orientationChangeHandler)
                },
                destroy: function() {
                    B.removeEventListener("resize", this.resize.resizeHandler), B.removeEventListener("orientationchange", this.resize.orientationChangeHandler)
                }
            }
        },
        P = {
            func: B.MutationObserver || B.WebkitMutationObserver,
            attach: function(e, t) {
                void 0 === t && (t = {});
                var a = this,
                    i = new P.func(function(e) {
                        if (1 !== e.length) {
                            var t = function() {
                                a.emit("observerUpdate", e[0])
                            };
                            B.requestAnimationFrame ? B.requestAnimationFrame(t) : B.setTimeout(t, 0)
                        } else a.emit("observerUpdate", e[0])
                    });
                i.observe(e, {
                    attributes: void 0 === t.attributes || t.attributes,
                    childList: void 0 === t.childList || t.childList,
                    characterData: void 0 === t.characterData || t.characterData
                }), a.observer.observers.push(i)
            },
            init: function() {
                var e = this;
                if (Y.observer && e.params.observer) {
                    if (e.params.observeParents)
                        for (var t = e.$el.parents(), a = 0; a < t.length; a += 1) e.observer.attach(t[a]);
                    e.observer.attach(e.$el[0], {
                        childList: !1
                    }), e.observer.attach(e.$wrapperEl[0], {
                        attributes: !1
                    })
                }
            },
            destroy: function() {
                this.observer.observers.forEach(function(e) {
                    e.disconnect()
                }), this.observer.observers = []
            }
        },
        $ = {
            name: "observer",
            params: {
                observer: !1,
                observeParents: !1
            },
            create: function() {
                X.extend(this, {
                    observer: {
                        init: P.init.bind(this),
                        attach: P.attach.bind(this),
                        destroy: P.destroy.bind(this),
                        observers: []
                    }
                })
            },
            on: {
                init: function() {
                    this.observer.init()
                },
                destroy: function() {
                    this.observer.destroy()
                }
            }
        },
        D = {
            update: function(e) {
                var t = this,
                    a = t.params,
                    i = a.slidesPerView,
                    s = a.slidesPerGroup,
                    r = a.centeredSlides,
                    n = t.virtual,
                    o = n.from,
                    l = n.to,
                    d = n.slides,
                    p = n.slidesGrid,
                    c = n.renderSlide,
                    u = n.offset;
                t.updateActiveIndex();
                var h, v, f, m = t.activeIndex || 0;
                h = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top", r ? (v = Math.floor(i / 2) + s, f = Math.floor(i / 2) + s) : (v = i + (s - 1), f = s);
                var g = Math.max((m || 0) - f, 0),
                    b = Math.min((m || 0) + v, d.length - 1),
                    w = (t.slidesGrid[g] || 0) - (t.slidesGrid[0] || 0);

                function y() {
                    t.updateSlides(), t.updateProgress(), t.updateSlidesClasses(), t.lazy && t.params.lazy.enabled && t.lazy.load()
                }
                if (X.extend(t.virtual, {
                        from: g,
                        to: b,
                        offset: w,
                        slidesGrid: t.slidesGrid
                    }), o === g && l === b && !e) return t.slidesGrid !== p && w !== u && t.slides.css(h, w + "px"), void t.updateProgress();
                if (t.params.virtual.renderExternal) return t.params.virtual.renderExternal.call(t, {
                    offset: w,
                    from: g,
                    to: b,
                    slides: function() {
                        for (var e = [], t = g; t <= b; t += 1) e.push(d[t]);
                        return e
                    }()
                }), void y();
                var x = [],
                    E = [];
                if (e) t.$wrapperEl.find("." + t.params.slideClass).remove();
                else
                    for (var T = o; T <= l; T += 1)(T < g || b < T) && t.$wrapperEl.find("." + t.params.slideClass + '[data-swiper-slide-index="' + T + '"]').remove();
                for (var S = 0; S < d.length; S += 1) g <= S && S <= b && (void 0 === l || e ? E.push(S) : (l < S && E.push(S), S < o && x.push(S)));
                E.forEach(function(e) {
                    t.$wrapperEl.append(c(d[e], e))
                }), x.sort(function(e, t) {
                    return e < t
                }).forEach(function(e) {
                    t.$wrapperEl.prepend(c(d[e], e))
                }), t.$wrapperEl.children(".swiper-slide").css(h, w + "px"), y()
            },
            renderSlide: function(e, t) {
                var a = this,
                    i = a.params.virtual;
                if (i.cache && a.virtual.cache[t]) return a.virtual.cache[t];
                var s = i.renderSlide ? L(i.renderSlide.call(a, e, t)) : L('<div class="' + a.params.slideClass + '" data-swiper-slide-index="' + t + '">' + e + "</div>");
                return s.attr("data-swiper-slide-index") || s.attr("data-swiper-slide-index", t), i.cache && (a.virtual.cache[t] = s), s
            },
            appendSlide: function(e) {
                this.virtual.slides.push(e), this.virtual.update(!0)
            },
            prependSlide: function(e) {
                var t = this;
                if (t.virtual.slides.unshift(e), t.params.virtual.cache) {
                    var a = t.virtual.cache,
                        i = {};
                    Object.keys(a).forEach(function(e) {
                        i[e + 1] = a[e]
                    }), t.virtual.cache = i
                }
                t.virtual.update(!0), t.slideNext(0)
            }
        },
        O = {
            name: "virtual",
            params: {
                virtual: {
                    enabled: !1,
                    slides: [],
                    cache: !0,
                    renderSlide: null,
                    renderExternal: null
                }
            },
            create: function() {
                var e = this;
                X.extend(e, {
                    virtual: {
                        update: D.update.bind(e),
                        appendSlide: D.appendSlide.bind(e),
                        prependSlide: D.prependSlide.bind(e),
                        renderSlide: D.renderSlide.bind(e),
                        slides: e.params.virtual.slides,
                        cache: {}
                    }
                })
            },
            on: {
                beforeInit: function() {
                    var e = this;
                    if (e.params.virtual.enabled) {
                        e.classNames.push(e.params.containerModifierClass + "virtual");
                        var t = {
                            watchSlidesProgress: !0
                        };
                        X.extend(e.params, t), X.extend(e.originalParams, t), e.virtual.update()
                    }
                },
                setTranslate: function() {
                    this.params.virtual.enabled && this.virtual.update()
                }
            }
        },
        A = {
            handle: function(e) {
                var t = this,
                    a = t.rtlTranslate,
                    i = e;
                i.originalEvent && (i = i.originalEvent);
                var s = i.keyCode || i.charCode;
                if (!t.allowSlideNext && (t.isHorizontal() && 39 === s || t.isVertical() && 40 === s)) return !1;
                if (!t.allowSlidePrev && (t.isHorizontal() && 37 === s || t.isVertical() && 38 === s)) return !1;
                if (!(i.shiftKey || i.altKey || i.ctrlKey || i.metaKey || f.activeElement && f.activeElement.nodeName && ("input" === f.activeElement.nodeName.toLowerCase() || "textarea" === f.activeElement.nodeName.toLowerCase()))) {
                    if (t.params.keyboard.onlyInViewport && (37 === s || 39 === s || 38 === s || 40 === s)) {
                        var r = !1;
                        if (0 < t.$el.parents("." + t.params.slideClass).length && 0 === t.$el.parents("." + t.params.slideActiveClass).length) return;
                        var n = B.innerWidth,
                            o = B.innerHeight,
                            l = t.$el.offset();
                        a && (l.left -= t.$el[0].scrollLeft);
                        for (var d = [
                                [l.left, l.top],
                                [l.left + t.width, l.top],
                                [l.left, l.top + t.height],
                                [l.left + t.width, l.top + t.height]
                            ], p = 0; p < d.length; p += 1) {
                            var c = d[p];
                            0 <= c[0] && c[0] <= n && 0 <= c[1] && c[1] <= o && (r = !0)
                        }
                        if (!r) return
                    }
                    t.isHorizontal() ? (37 !== s && 39 !== s || (i.preventDefault ? i.preventDefault() : i.returnValue = !1), (39 === s && !a || 37 === s && a) && t.slideNext(), (37 === s && !a || 39 === s && a) && t.slidePrev()) : (38 !== s && 40 !== s || (i.preventDefault ? i.preventDefault() : i.returnValue = !1), 40 === s && t.slideNext(), 38 === s && t.slidePrev()), t.emit("keyPress", s)
                }
            },
            enable: function() {
                this.keyboard.enabled || (L(f).on("keydown", this.keyboard.handle), this.keyboard.enabled = !0)
            },
            disable: function() {
                this.keyboard.enabled && (L(f).off("keydown", this.keyboard.handle), this.keyboard.enabled = !1)
            }
        },
        H = {
            name: "keyboard",
            params: {
                keyboard: {
                    enabled: !1,
                    onlyInViewport: !0
                }
            },
            create: function() {
                X.extend(this, {
                    keyboard: {
                        enabled: !1,
                        enable: A.enable.bind(this),
                        disable: A.disable.bind(this),
                        handle: A.handle.bind(this)
                    }
                })
            },
            on: {
                init: function() {
                    this.params.keyboard.enabled && this.keyboard.enable()
                },
                destroy: function() {
                    this.keyboard.enabled && this.keyboard.disable()
                }
            }
        };
    var G = {
            lastScrollTime: X.now(),
            event: -1 < B.navigator.userAgent.indexOf("firefox") ? "DOMMouseScroll" : function() {
                var e = "onwheel",
                    t = e in f;
                if (!t) {
                    var a = f.createElement("div");
                    a.setAttribute(e, "return;"), t = "function" == typeof a[e]
                }
                return !t && f.implementation && f.implementation.hasFeature && !0 !== f.implementation.hasFeature("", "") && (t = f.implementation.hasFeature("Events.wheel", "3.0")), t
            }() ? "wheel" : "mousewheel",
            normalize: function(e) {
                var t = 0,
                    a = 0,
                    i = 0,
                    s = 0;
                return "detail" in e && (a = e.detail), "wheelDelta" in e && (a = -e.wheelDelta / 120), "wheelDeltaY" in e && (a = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = a, a = 0), i = 10 * t, s = 10 * a, "deltaY" in e && (s = e.deltaY), "deltaX" in e && (i = e.deltaX), (i || s) && e.deltaMode && (1 === e.deltaMode ? (i *= 40, s *= 40) : (i *= 800, s *= 800)), i && !t && (t = i < 1 ? -1 : 1), s && !a && (a = s < 1 ? -1 : 1), {
                    spinX: t,
                    spinY: a,
                    pixelX: i,
                    pixelY: s
                }
            },
            handleMouseEnter: function() {
                this.mouseEntered = !0
            },
            handleMouseLeave: function() {
                this.mouseEntered = !1
            },
            handle: function(e) {
                var t = e,
                    a = this,
                    i = a.params.mousewheel;
                if (!a.mouseEntered && !i.releaseOnEdges) return !0;
                t.originalEvent && (t = t.originalEvent);
                var s = 0,
                    r = a.rtlTranslate ? -1 : 1,
                    n = G.normalize(t);
                if (i.forceToAxis)
                    if (a.isHorizontal()) {
                        if (!(Math.abs(n.pixelX) > Math.abs(n.pixelY))) return !0;
                        s = n.pixelX * r
                    } else {
                        if (!(Math.abs(n.pixelY) > Math.abs(n.pixelX))) return !0;
                        s = n.pixelY
                    } else s = Math.abs(n.pixelX) > Math.abs(n.pixelY) ? -n.pixelX * r : -n.pixelY;
                if (0 === s) return !0;
                if (i.invert && (s = -s), a.params.freeMode) {
                    a.params.loop && a.loopFix();
                    var o = a.getTranslate() + s * i.sensitivity,
                        l = a.isBeginning,
                        d = a.isEnd;
                    if (o >= a.minTranslate() && (o = a.minTranslate()), o <= a.maxTranslate() && (o = a.maxTranslate()), a.setTransition(0), a.setTranslate(o), a.updateProgress(), a.updateActiveIndex(), a.updateSlidesClasses(), (!l && a.isBeginning || !d && a.isEnd) && a.updateSlidesClasses(), a.params.freeModeSticky && (clearTimeout(a.mousewheel.timeout), a.mousewheel.timeout = X.nextTick(function() {
                            a.slideToClosest()
                        }, 300)), a.emit("scroll", t), a.params.autoplay && a.params.autoplayDisableOnInteraction && a.autoplay.stop(), o === a.minTranslate() || o === a.maxTranslate()) return !0
                } else {
                    if (60 < X.now() - a.mousewheel.lastScrollTime)
                        if (s < 0)
                            if (a.isEnd && !a.params.loop || a.animating) {
                                if (i.releaseOnEdges) return !0
                            } else a.slideNext(), a.emit("scroll", t);
                    else if (a.isBeginning && !a.params.loop || a.animating) {
                        if (i.releaseOnEdges) return !0
                    } else a.slidePrev(), a.emit("scroll", t);
                    a.mousewheel.lastScrollTime = (new B.Date).getTime()
                }
                return t.preventDefault ? t.preventDefault() : t.returnValue = !1, !1
            },
            enable: function() {
                var e = this;
                if (!G.event) return !1;
                if (e.mousewheel.enabled) return !1;
                var t = e.$el;
                return "container" !== e.params.mousewheel.eventsTarged && (t = L(e.params.mousewheel.eventsTarged)), t.on("mouseenter", e.mousewheel.handleMouseEnter), t.on("mouseleave", e.mousewheel.handleMouseLeave), t.on(G.event, e.mousewheel.handle), e.mousewheel.enabled = !0
            },
            disable: function() {
                var e = this;
                if (!G.event) return !1;
                if (!e.mousewheel.enabled) return !1;
                var t = e.$el;
                return "container" !== e.params.mousewheel.eventsTarged && (t = L(e.params.mousewheel.eventsTarged)), t.off(G.event, e.mousewheel.handle), !(e.mousewheel.enabled = !1)
            }
        },
        N = {
            update: function() {
                var e = this,
                    t = e.params.navigation;
                if (!e.params.loop) {
                    var a = e.navigation,
                        i = a.$nextEl,
                        s = a.$prevEl;
                    s && 0 < s.length && (e.isBeginning ? s.addClass(t.disabledClass) : s.removeClass(t.disabledClass), s[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](t.lockClass)), i && 0 < i.length && (e.isEnd ? i.addClass(t.disabledClass) : i.removeClass(t.disabledClass), i[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](t.lockClass))
                }
            },
            init: function() {
                var e, t, a = this,
                    i = a.params.navigation;
                (i.nextEl || i.prevEl) && (i.nextEl && (e = L(i.nextEl), a.params.uniqueNavElements && "string" == typeof i.nextEl && 1 < e.length && 1 === a.$el.find(i.nextEl).length && (e = a.$el.find(i.nextEl))), i.prevEl && (t = L(i.prevEl), a.params.uniqueNavElements && "string" == typeof i.prevEl && 1 < t.length && 1 === a.$el.find(i.prevEl).length && (t = a.$el.find(i.prevEl))), e && 0 < e.length && e.on("click", function(e) {
                    e.preventDefault(), a.isEnd && !a.params.loop || a.slideNext()
                }), t && 0 < t.length && t.on("click", function(e) {
                    e.preventDefault(), a.isBeginning && !a.params.loop || a.slidePrev()
                }), X.extend(a.navigation, {
                    $nextEl: e,
                    nextEl: e && e[0],
                    $prevEl: t,
                    prevEl: t && t[0]
                }))
            },
            destroy: function() {
                var e = this.navigation,
                    t = e.$nextEl,
                    a = e.$prevEl;
                t && t.length && (t.off("click"), t.removeClass(this.params.navigation.disabledClass)), a && a.length && (a.off("click"), a.removeClass(this.params.navigation.disabledClass))
            }
        },
        V = {
            update: function() {
                var e = this,
                    t = e.rtl,
                    s = e.params.pagination;
                if (s.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                    var r, a = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
                        i = e.pagination.$el,
                        n = e.params.loop ? Math.ceil((a - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
                    if (e.params.loop ? ((r = Math.ceil((e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup)) > a - 1 - 2 * e.loopedSlides && (r -= a - 2 * e.loopedSlides), n - 1 < r && (r -= n), r < 0 && "bullets" !== e.params.paginationType && (r = n + r)) : r = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0, "bullets" === s.type && e.pagination.bullets && 0 < e.pagination.bullets.length) {
                        var o, l, d, p = e.pagination.bullets;
                        if (s.dynamicBullets && (e.pagination.bulletSize = p.eq(0)[e.isHorizontal() ? "outerWidth" : "outerHeight"](!0), i.css(e.isHorizontal() ? "width" : "height", e.pagination.bulletSize * (s.dynamicMainBullets + 4) + "px"), 1 < s.dynamicMainBullets && void 0 !== e.previousIndex && (e.pagination.dynamicBulletIndex += r - e.previousIndex, e.pagination.dynamicBulletIndex > s.dynamicMainBullets - 1 ? e.pagination.dynamicBulletIndex = s.dynamicMainBullets - 1 : e.pagination.dynamicBulletIndex < 0 && (e.pagination.dynamicBulletIndex = 0)), o = r - e.pagination.dynamicBulletIndex, d = ((l = o + (Math.min(p.length, s.dynamicMainBullets) - 1)) + o) / 2), p.removeClass(s.bulletActiveClass + " " + s.bulletActiveClass + "-next " + s.bulletActiveClass + "-next-next " + s.bulletActiveClass + "-prev " + s.bulletActiveClass + "-prev-prev " + s.bulletActiveClass + "-main"), 1 < i.length) p.each(function(e, t) {
                            var a = L(t),
                                i = a.index();
                            i === r && a.addClass(s.bulletActiveClass), s.dynamicBullets && (o <= i && i <= l && a.addClass(s.bulletActiveClass + "-main"), i === o && a.prev().addClass(s.bulletActiveClass + "-prev").prev().addClass(s.bulletActiveClass + "-prev-prev"), i === l && a.next().addClass(s.bulletActiveClass + "-next").next().addClass(s.bulletActiveClass + "-next-next"))
                        });
                        else if (p.eq(r).addClass(s.bulletActiveClass), s.dynamicBullets) {
                            for (var c = p.eq(o), u = p.eq(l), h = o; h <= l; h += 1) p.eq(h).addClass(s.bulletActiveClass + "-main");
                            c.prev().addClass(s.bulletActiveClass + "-prev").prev().addClass(s.bulletActiveClass + "-prev-prev"), u.next().addClass(s.bulletActiveClass + "-next").next().addClass(s.bulletActiveClass + "-next-next")
                        }
                        if (s.dynamicBullets) {
                            var v = Math.min(p.length, s.dynamicMainBullets + 4),
                                f = (e.pagination.bulletSize * v - e.pagination.bulletSize) / 2 - d * e.pagination.bulletSize,
                                m = t ? "right" : "left";
                            p.css(e.isHorizontal() ? m : "top", f + "px")
                        }
                    }
                    if ("fraction" === s.type && (i.find("." + s.currentClass).text(s.formatFractionCurrent(r + 1)), i.find("." + s.totalClass).text(s.formatFractionTotal(n))), "progressbar" === s.type) {
                        var g;
                        g = s.progressbarOpposite ? e.isHorizontal() ? "vertical" : "horizontal" : e.isHorizontal() ? "horizontal" : "vertical";
                        var b = (r + 1) / n,
                            w = 1,
                            y = 1;
                        "horizontal" === g ? w = b : y = b, i.find("." + s.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + w + ") scaleY(" + y + ")").transition(e.params.speed)
                    }
                    "custom" === s.type && s.renderCustom ? (i.html(s.renderCustom(e, r + 1, n)), e.emit("paginationRender", e, i[0])) : e.emit("paginationUpdate", e, i[0]), i[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](s.lockClass)
                }
            },
            render: function() {
                var e = this,
                    t = e.params.pagination;
                if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                    var a = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
                        i = e.pagination.$el,
                        s = "";
                    if ("bullets" === t.type) {
                        for (var r = e.params.loop ? Math.ceil((a - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length, n = 0; n < r; n += 1) t.renderBullet ? s += t.renderBullet.call(e, n, t.bulletClass) : s += "<" + t.bulletElement + ' class="' + t.bulletClass + '"></' + t.bulletElement + ">";
                        i.html(s), e.pagination.bullets = i.find("." + t.bulletClass)
                    }
                    "fraction" === t.type && (s = t.renderFraction ? t.renderFraction.call(e, t.currentClass, t.totalClass) : '<span class="' + t.currentClass + '"></span> / <span class="' + t.totalClass + '"></span>', i.html(s)), "progressbar" === t.type && (s = t.renderProgressbar ? t.renderProgressbar.call(e, t.progressbarFillClass) : '<span class="' + t.progressbarFillClass + '"></span>', i.html(s)), "custom" !== t.type && e.emit("paginationRender", e.pagination.$el[0])
                }
            },
            init: function() {
                var a = this,
                    e = a.params.pagination;
                if (e.el) {
                    var t = L(e.el);
                    0 !== t.length && (a.params.uniqueNavElements && "string" == typeof e.el && 1 < t.length && 1 === a.$el.find(e.el).length && (t = a.$el.find(e.el)), "bullets" === e.type && e.clickable && t.addClass(e.clickableClass), t.addClass(e.modifierClass + e.type), "bullets" === e.type && e.dynamicBullets && (t.addClass("" + e.modifierClass + e.type + "-dynamic"), a.pagination.dynamicBulletIndex = 0, e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)), "progressbar" === e.type && e.progressbarOpposite && t.addClass(e.progressbarOppositeClass), e.clickable && t.on("click", "." + e.bulletClass, function(e) {
                        e.preventDefault();
                        var t = L(this).index() * a.params.slidesPerGroup;
                        a.params.loop && (t += a.loopedSlides), a.slideTo(t)
                    }), X.extend(a.pagination, {
                        $el: t,
                        el: t[0]
                    }))
                }
            },
            destroy: function() {
                var e = this,
                    t = e.params.pagination;
                if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                    var a = e.pagination.$el;
                    a.removeClass(t.hiddenClass), a.removeClass(t.modifierClass + t.type), e.pagination.bullets && e.pagination.bullets.removeClass(t.bulletActiveClass), t.clickable && a.off("click", "." + t.bulletClass)
                }
            }
        },
        R = {
            setTranslate: function() {
                var e = this;
                if (e.params.scrollbar.el && e.scrollbar.el) {
                    var t = e.scrollbar,
                        a = e.rtlTranslate,
                        i = e.progress,
                        s = t.dragSize,
                        r = t.trackSize,
                        n = t.$dragEl,
                        o = t.$el,
                        l = e.params.scrollbar,
                        d = s,
                        p = (r - s) * i;
                    a ? 0 < (p = -p) ? (d = s - p, p = 0) : r < -p + s && (d = r + p) : p < 0 ? (d = s + p, p = 0) : r < p + s && (d = r - p), e.isHorizontal() ? (Y.transforms3d ? n.transform("translate3d(" + p + "px, 0, 0)") : n.transform("translateX(" + p + "px)"), n[0].style.width = d + "px") : (Y.transforms3d ? n.transform("translate3d(0px, " + p + "px, 0)") : n.transform("translateY(" + p + "px)"), n[0].style.height = d + "px"), l.hide && (clearTimeout(e.scrollbar.timeout), o[0].style.opacity = 1, e.scrollbar.timeout = setTimeout(function() {
                        o[0].style.opacity = 0, o.transition(400)
                    }, 1e3))
                }
            },
            setTransition: function(e) {
                this.params.scrollbar.el && this.scrollbar.el && this.scrollbar.$dragEl.transition(e)
            },
            updateSize: function() {
                var e = this;
                if (e.params.scrollbar.el && e.scrollbar.el) {
                    var t = e.scrollbar,
                        a = t.$dragEl,
                        i = t.$el;
                    a[0].style.width = "", a[0].style.height = "";
                    var s, r = e.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight,
                        n = e.size / e.virtualSize,
                        o = n * (r / e.size);
                    s = "auto" === e.params.scrollbar.dragSize ? r * n : parseInt(e.params.scrollbar.dragSize, 10), e.isHorizontal() ? a[0].style.width = s + "px" : a[0].style.height = s + "px", i[0].style.display = 1 <= n ? "none" : "", e.params.scrollbarHide && (i[0].style.opacity = 0), X.extend(t, {
                        trackSize: r,
                        divider: n,
                        moveDivider: o,
                        dragSize: s
                    }), t.$el[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](e.params.scrollbar.lockClass)
                }
            },
            setDragPosition: function(e) {
                var t, a = this,
                    i = a.scrollbar,
                    s = a.rtlTranslate,
                    r = i.$el,
                    n = i.dragSize,
                    o = i.trackSize;
                t = ((a.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY) - r.offset()[a.isHorizontal() ? "left" : "top"] - n / 2) / (o - n), t = Math.max(Math.min(t, 1), 0), s && (t = 1 - t);
                var l = a.minTranslate() + (a.maxTranslate() - a.minTranslate()) * t;
                a.updateProgress(l), a.setTranslate(l), a.updateActiveIndex(), a.updateSlidesClasses()
            },
            onDragStart: function(e) {
                var t = this,
                    a = t.params.scrollbar,
                    i = t.scrollbar,
                    s = t.$wrapperEl,
                    r = i.$el,
                    n = i.$dragEl;
                t.scrollbar.isTouched = !0, e.preventDefault(), e.stopPropagation(), s.transition(100), n.transition(100), i.setDragPosition(e), clearTimeout(t.scrollbar.dragTimeout), r.transition(0), a.hide && r.css("opacity", 1), t.emit("scrollbarDragStart", e)
            },
            onDragMove: function(e) {
                var t = this.scrollbar,
                    a = this.$wrapperEl,
                    i = t.$el,
                    s = t.$dragEl;
                this.scrollbar.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, t.setDragPosition(e), a.transition(0), i.transition(0), s.transition(0), this.emit("scrollbarDragMove", e))
            },
            onDragEnd: function(e) {
                var t = this,
                    a = t.params.scrollbar,
                    i = t.scrollbar.$el;
                t.scrollbar.isTouched && (t.scrollbar.isTouched = !1, a.hide && (clearTimeout(t.scrollbar.dragTimeout), t.scrollbar.dragTimeout = X.nextTick(function() {
                    i.css("opacity", 0), i.transition(400)
                }, 1e3)), t.emit("scrollbarDragEnd", e), a.snapOnRelease && t.slideToClosest())
            },
            enableDraggable: function() {
                var e = this;
                if (e.params.scrollbar.el) {
                    var t = e.scrollbar,
                        a = e.touchEvents,
                        i = e.touchEventsDesktop,
                        s = e.params,
                        r = t.$el[0],
                        n = !(!Y.passiveListener || !s.passiveListeners) && {
                            passive: !1,
                            capture: !1
                        },
                        o = !(!Y.passiveListener || !s.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                    Y.touch || !Y.pointerEvents && !Y.prefixedPointerEvents ? (Y.touch && (r.addEventListener(a.start, e.scrollbar.onDragStart, n), r.addEventListener(a.move, e.scrollbar.onDragMove, n), r.addEventListener(a.end, e.scrollbar.onDragEnd, o)), (s.simulateTouch && !m.ios && !m.android || s.simulateTouch && !Y.touch && m.ios) && (r.addEventListener("mousedown", e.scrollbar.onDragStart, n), f.addEventListener("mousemove", e.scrollbar.onDragMove, n), f.addEventListener("mouseup", e.scrollbar.onDragEnd, o))) : (r.addEventListener(i.start, e.scrollbar.onDragStart, n), f.addEventListener(i.move, e.scrollbar.onDragMove, n), f.addEventListener(i.end, e.scrollbar.onDragEnd, o))
                }
            },
            disableDraggable: function() {
                var e = this;
                if (e.params.scrollbar.el) {
                    var t = e.scrollbar,
                        a = e.touchEvents,
                        i = e.touchEventsDesktop,
                        s = e.params,
                        r = t.$el[0],
                        n = !(!Y.passiveListener || !s.passiveListeners) && {
                            passive: !1,
                            capture: !1
                        },
                        o = !(!Y.passiveListener || !s.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                    Y.touch || !Y.pointerEvents && !Y.prefixedPointerEvents ? (Y.touch && (r.removeEventListener(a.start, e.scrollbar.onDragStart, n), r.removeEventListener(a.move, e.scrollbar.onDragMove, n), r.removeEventListener(a.end, e.scrollbar.onDragEnd, o)), (s.simulateTouch && !m.ios && !m.android || s.simulateTouch && !Y.touch && m.ios) && (r.removeEventListener("mousedown", e.scrollbar.onDragStart, n), f.removeEventListener("mousemove", e.scrollbar.onDragMove, n), f.removeEventListener("mouseup", e.scrollbar.onDragEnd, o))) : (r.removeEventListener(i.start, e.scrollbar.onDragStart, n), f.removeEventListener(i.move, e.scrollbar.onDragMove, n), f.removeEventListener(i.end, e.scrollbar.onDragEnd, o))
                }
            },
            init: function() {
                var e = this;
                if (e.params.scrollbar.el) {
                    var t = e.scrollbar,
                        a = e.$el,
                        i = e.params.scrollbar,
                        s = L(i.el);
                    e.params.uniqueNavElements && "string" == typeof i.el && 1 < s.length && 1 === a.find(i.el).length && (s = a.find(i.el));
                    var r = s.find("." + e.params.scrollbar.dragClass);
                    0 === r.length && (r = L('<div class="' + e.params.scrollbar.dragClass + '"></div>'), s.append(r)), X.extend(t, {
                        $el: s,
                        el: s[0],
                        $dragEl: r,
                        dragEl: r[0]
                    }), i.draggable && t.enableDraggable()
                }
            },
            destroy: function() {
                this.scrollbar.disableDraggable()
            }
        },
        F = {
            setTransform: function(e, t) {
                var a = this.rtl,
                    i = L(e),
                    s = a ? -1 : 1,
                    r = i.attr("data-swiper-parallax") || "0",
                    n = i.attr("data-swiper-parallax-x"),
                    o = i.attr("data-swiper-parallax-y"),
                    l = i.attr("data-swiper-parallax-scale"),
                    d = i.attr("data-swiper-parallax-opacity");
                if (n || o ? (n = n || "0", o = o || "0") : this.isHorizontal() ? (n = r, o = "0") : (o = r, n = "0"), n = 0 <= n.indexOf("%") ? parseInt(n, 10) * t * s + "%" : n * t * s + "px", o = 0 <= o.indexOf("%") ? parseInt(o, 10) * t + "%" : o * t + "px", null != d) {
                    var p = d - (d - 1) * (1 - Math.abs(t));
                    i[0].style.opacity = p
                }
                if (null == l) i.transform("translate3d(" + n + ", " + o + ", 0px)");
                else {
                    var c = l - (l - 1) * (1 - Math.abs(t));
                    i.transform("translate3d(" + n + ", " + o + ", 0px) scale(" + c + ")")
                }
            },
            setTranslate: function() {
                var i = this,
                    e = i.$el,
                    t = i.slides,
                    s = i.progress,
                    r = i.snapGrid;
                e.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(e, t) {
                    i.parallax.setTransform(t, s)
                }), t.each(function(e, t) {
                    var a = t.progress;
                    1 < i.params.slidesPerGroup && "auto" !== i.params.slidesPerView && (a += Math.ceil(e / 2) - s * (r.length - 1)), a = Math.min(Math.max(a, -1), 1), L(t).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(e, t) {
                        i.parallax.setTransform(t, a)
                    })
                })
            },
            setTransition: function(s) {
                void 0 === s && (s = this.params.speed);
                this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(e, t) {
                    var a = L(t),
                        i = parseInt(a.attr("data-swiper-parallax-duration"), 10) || s;
                    0 === s && (i = 0), a.transition(i)
                })
            }
        },
        W = {
            getDistanceBetweenTouches: function(e) {
                if (e.targetTouches.length < 2) return 1;
                var t = e.targetTouches[0].pageX,
                    a = e.targetTouches[0].pageY,
                    i = e.targetTouches[1].pageX,
                    s = e.targetTouches[1].pageY;
                return Math.sqrt(Math.pow(i - t, 2) + Math.pow(s - a, 2))
            },
            onGestureStart: function(e) {
                var t = this,
                    a = t.params.zoom,
                    i = t.zoom,
                    s = i.gesture;
                if (i.fakeGestureTouched = !1, i.fakeGestureMoved = !1, !Y.gestures) {
                    if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return;
                    i.fakeGestureTouched = !0, s.scaleStart = W.getDistanceBetweenTouches(e)
                }
                s.$slideEl && s.$slideEl.length || (s.$slideEl = L(e.target).closest(".swiper-slide"), 0 === s.$slideEl.length && (s.$slideEl = t.slides.eq(t.activeIndex)), s.$imageEl = s.$slideEl.find("img, svg, canvas"), s.$imageWrapEl = s.$imageEl.parent("." + a.containerClass), s.maxRatio = s.$imageWrapEl.attr("data-swiper-zoom") || a.maxRatio, 0 !== s.$imageWrapEl.length) ? (s.$imageEl.transition(0), t.zoom.isScaling = !0) : s.$imageEl = void 0
            },
            onGestureChange: function(e) {
                var t = this.params.zoom,
                    a = this.zoom,
                    i = a.gesture;
                if (!Y.gestures) {
                    if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
                    a.fakeGestureMoved = !0, i.scaleMove = W.getDistanceBetweenTouches(e)
                }
                i.$imageEl && 0 !== i.$imageEl.length && (Y.gestures ? this.zoom.scale = e.scale * a.currentScale : a.scale = i.scaleMove / i.scaleStart * a.currentScale, a.scale > i.maxRatio && (a.scale = i.maxRatio - 1 + Math.pow(a.scale - i.maxRatio + 1, .5)), a.scale < t.minRatio && (a.scale = t.minRatio + 1 - Math.pow(t.minRatio - a.scale + 1, .5)), i.$imageEl.transform("translate3d(0,0,0) scale(" + a.scale + ")"))
            },
            onGestureEnd: function(e) {
                var t = this.params.zoom,
                    a = this.zoom,
                    i = a.gesture;
                if (!Y.gestures) {
                    if (!a.fakeGestureTouched || !a.fakeGestureMoved) return;
                    if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !m.android) return;
                    a.fakeGestureTouched = !1, a.fakeGestureMoved = !1
                }
                i.$imageEl && 0 !== i.$imageEl.length && (a.scale = Math.max(Math.min(a.scale, i.maxRatio), t.minRatio), i.$imageEl.transition(this.params.speed).transform("translate3d(0,0,0) scale(" + a.scale + ")"), a.currentScale = a.scale, a.isScaling = !1, 1 === a.scale && (i.$slideEl = void 0))
            },
            onTouchStart: function(e) {
                var t = this.zoom,
                    a = t.gesture,
                    i = t.image;
                a.$imageEl && 0 !== a.$imageEl.length && (i.isTouched || (m.android && e.preventDefault(), i.isTouched = !0, i.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, i.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY))
            },
            onTouchMove: function(e) {
                var t = this,
                    a = t.zoom,
                    i = a.gesture,
                    s = a.image,
                    r = a.velocity;
                if (i.$imageEl && 0 !== i.$imageEl.length && (t.allowClick = !1, s.isTouched && i.$slideEl)) {
                    s.isMoved || (s.width = i.$imageEl[0].offsetWidth, s.height = i.$imageEl[0].offsetHeight, s.startX = X.getTranslate(i.$imageWrapEl[0], "x") || 0, s.startY = X.getTranslate(i.$imageWrapEl[0], "y") || 0, i.slideWidth = i.$slideEl[0].offsetWidth, i.slideHeight = i.$slideEl[0].offsetHeight, i.$imageWrapEl.transition(0), t.rtl && (s.startX = -s.startX, s.startY = -s.startY));
                    var n = s.width * a.scale,
                        o = s.height * a.scale;
                    if (!(n < i.slideWidth && o < i.slideHeight)) {
                        if (s.minX = Math.min(i.slideWidth / 2 - n / 2, 0), s.maxX = -s.minX, s.minY = Math.min(i.slideHeight / 2 - o / 2, 0), s.maxY = -s.minY, s.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, s.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !s.isMoved && !a.isScaling) {
                            if (t.isHorizontal() && (Math.floor(s.minX) === Math.floor(s.startX) && s.touchesCurrent.x < s.touchesStart.x || Math.floor(s.maxX) === Math.floor(s.startX) && s.touchesCurrent.x > s.touchesStart.x)) return void(s.isTouched = !1);
                            if (!t.isHorizontal() && (Math.floor(s.minY) === Math.floor(s.startY) && s.touchesCurrent.y < s.touchesStart.y || Math.floor(s.maxY) === Math.floor(s.startY) && s.touchesCurrent.y > s.touchesStart.y)) return void(s.isTouched = !1)
                        }
                        e.preventDefault(), e.stopPropagation(), s.isMoved = !0, s.currentX = s.touchesCurrent.x - s.touchesStart.x + s.startX, s.currentY = s.touchesCurrent.y - s.touchesStart.y + s.startY, s.currentX < s.minX && (s.currentX = s.minX + 1 - Math.pow(s.minX - s.currentX + 1, .8)), s.currentX > s.maxX && (s.currentX = s.maxX - 1 + Math.pow(s.currentX - s.maxX + 1, .8)), s.currentY < s.minY && (s.currentY = s.minY + 1 - Math.pow(s.minY - s.currentY + 1, .8)), s.currentY > s.maxY && (s.currentY = s.maxY - 1 + Math.pow(s.currentY - s.maxY + 1, .8)), r.prevPositionX || (r.prevPositionX = s.touchesCurrent.x), r.prevPositionY || (r.prevPositionY = s.touchesCurrent.y), r.prevTime || (r.prevTime = Date.now()), r.x = (s.touchesCurrent.x - r.prevPositionX) / (Date.now() - r.prevTime) / 2, r.y = (s.touchesCurrent.y - r.prevPositionY) / (Date.now() - r.prevTime) / 2, Math.abs(s.touchesCurrent.x - r.prevPositionX) < 2 && (r.x = 0), Math.abs(s.touchesCurrent.y - r.prevPositionY) < 2 && (r.y = 0), r.prevPositionX = s.touchesCurrent.x, r.prevPositionY = s.touchesCurrent.y, r.prevTime = Date.now(), i.$imageWrapEl.transform("translate3d(" + s.currentX + "px, " + s.currentY + "px,0)")
                    }
                }
            },
            onTouchEnd: function() {
                var e = this.zoom,
                    t = e.gesture,
                    a = e.image,
                    i = e.velocity;
                if (t.$imageEl && 0 !== t.$imageEl.length) {
                    if (!a.isTouched || !a.isMoved) return a.isTouched = !1, void(a.isMoved = !1);
                    a.isTouched = !1, a.isMoved = !1;
                    var s = 300,
                        r = 300,
                        n = i.x * s,
                        o = a.currentX + n,
                        l = i.y * r,
                        d = a.currentY + l;
                    0 !== i.x && (s = Math.abs((o - a.currentX) / i.x)), 0 !== i.y && (r = Math.abs((d - a.currentY) / i.y));
                    var p = Math.max(s, r);
                    a.currentX = o, a.currentY = d;
                    var c = a.width * e.scale,
                        u = a.height * e.scale;
                    a.minX = Math.min(t.slideWidth / 2 - c / 2, 0), a.maxX = -a.minX, a.minY = Math.min(t.slideHeight / 2 - u / 2, 0), a.maxY = -a.minY, a.currentX = Math.max(Math.min(a.currentX, a.maxX), a.minX), a.currentY = Math.max(Math.min(a.currentY, a.maxY), a.minY), t.$imageWrapEl.transition(p).transform("translate3d(" + a.currentX + "px, " + a.currentY + "px,0)")
                }
            },
            onTransitionEnd: function() {
                var e = this.zoom,
                    t = e.gesture;
                t.$slideEl && this.previousIndex !== this.activeIndex && (t.$imageEl.transform("translate3d(0,0,0) scale(1)"), t.$imageWrapEl.transform("translate3d(0,0,0)"), t.$slideEl = void 0, t.$imageEl = void 0, t.$imageWrapEl = void 0, e.scale = 1, e.currentScale = 1)
            },
            toggle: function(e) {
                var t = this.zoom;
                t.scale && 1 !== t.scale ? t.out() : t.in(e)
            },
            in : function(e) {
                var t, a, i, s, r, n, o, l, d, p, c, u, h, v, f, m, g = this,
                    b = g.zoom,
                    w = g.params.zoom,
                    y = b.gesture,
                    x = b.image;
                (y.$slideEl || (y.$slideEl = g.clickedSlide ? L(g.clickedSlide) : g.slides.eq(g.activeIndex), y.$imageEl = y.$slideEl.find("img, svg, canvas"), y.$imageWrapEl = y.$imageEl.parent("." + w.containerClass)), y.$imageEl && 0 !== y.$imageEl.length) && (y.$slideEl.addClass("" + w.zoomedSlideClass), void 0 === x.touchesStart.x && e ? (t = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX, a = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (t = x.touchesStart.x, a = x.touchesStart.y), b.scale = y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio, b.currentScale = y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio, e ? (f = y.$slideEl[0].offsetWidth, m = y.$slideEl[0].offsetHeight, i = y.$slideEl.offset().left + f / 2 - t, s = y.$slideEl.offset().top + m / 2 - a, o = y.$imageEl[0].offsetWidth, l = y.$imageEl[0].offsetHeight, d = o * b.scale, p = l * b.scale, h = -(c = Math.min(f / 2 - d / 2, 0)), v = -(u = Math.min(m / 2 - p / 2, 0)), (r = i * b.scale) < c && (r = c), h < r && (r = h), (n = s * b.scale) < u && (n = u), v < n && (n = v)) : n = r = 0, y.$imageWrapEl.transition(300).transform("translate3d(" + r + "px, " + n + "px,0)"), y.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + b.scale + ")"))
            },
            out: function() {
                var e = this,
                    t = e.zoom,
                    a = e.params.zoom,
                    i = t.gesture;
                i.$slideEl || (i.$slideEl = e.clickedSlide ? L(e.clickedSlide) : e.slides.eq(e.activeIndex), i.$imageEl = i.$slideEl.find("img, svg, canvas"), i.$imageWrapEl = i.$imageEl.parent("." + a.containerClass)), i.$imageEl && 0 !== i.$imageEl.length && (t.scale = 1, t.currentScale = 1, i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), i.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), i.$slideEl.removeClass("" + a.zoomedSlideClass), i.$slideEl = void 0)
            },
            enable: function() {
                var e = this,
                    t = e.zoom;
                if (!t.enabled) {
                    t.enabled = !0;
                    var a = !("touchstart" !== e.touchEvents.start || !Y.passiveListener || !e.params.passiveListeners) && {
                        passive: !0,
                        capture: !1
                    };
                    Y.gestures ? (e.$wrapperEl.on("gesturestart", ".swiper-slide", t.onGestureStart, a), e.$wrapperEl.on("gesturechange", ".swiper-slide", t.onGestureChange, a), e.$wrapperEl.on("gestureend", ".swiper-slide", t.onGestureEnd, a)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.on(e.touchEvents.start, ".swiper-slide", t.onGestureStart, a), e.$wrapperEl.on(e.touchEvents.move, ".swiper-slide", t.onGestureChange, a), e.$wrapperEl.on(e.touchEvents.end, ".swiper-slide", t.onGestureEnd, a)), e.$wrapperEl.on(e.touchEvents.move, "." + e.params.zoom.containerClass, t.onTouchMove)
                }
            },
            disable: function() {
                var e = this,
                    t = e.zoom;
                if (t.enabled) {
                    e.zoom.enabled = !1;
                    var a = !("touchstart" !== e.touchEvents.start || !Y.passiveListener || !e.params.passiveListeners) && {
                        passive: !0,
                        capture: !1
                    };
                    Y.gestures ? (e.$wrapperEl.off("gesturestart", ".swiper-slide", t.onGestureStart, a), e.$wrapperEl.off("gesturechange", ".swiper-slide", t.onGestureChange, a), e.$wrapperEl.off("gestureend", ".swiper-slide", t.onGestureEnd, a)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.off(e.touchEvents.start, ".swiper-slide", t.onGestureStart, a), e.$wrapperEl.off(e.touchEvents.move, ".swiper-slide", t.onGestureChange, a), e.$wrapperEl.off(e.touchEvents.end, ".swiper-slide", t.onGestureEnd, a)), e.$wrapperEl.off(e.touchEvents.move, "." + e.params.zoom.containerClass, t.onTouchMove)
                }
            }
        },
        q = {
            loadInSlide: function(e, l) {
                void 0 === l && (l = !0);
                var d = this,
                    p = d.params.lazy;
                if (void 0 !== e && 0 !== d.slides.length) {
                    var c = d.virtual && d.params.virtual.enabled ? d.$wrapperEl.children("." + d.params.slideClass + '[data-swiper-slide-index="' + e + '"]') : d.slides.eq(e),
                        t = c.find("." + p.elementClass + ":not(." + p.loadedClass + "):not(." + p.loadingClass + ")");
                    !c.hasClass(p.elementClass) || c.hasClass(p.loadedClass) || c.hasClass(p.loadingClass) || (t = t.add(c[0])), 0 !== t.length && t.each(function(e, t) {
                        var i = L(t);
                        i.addClass(p.loadingClass);
                        var s = i.attr("data-background"),
                            r = i.attr("data-src"),
                            n = i.attr("data-srcset"),
                            o = i.attr("data-sizes");
                        d.loadImage(i[0], r || s, n, o, !1, function() {
                            if (null != d && d && (!d || d.params) && !d.destroyed) {
                                if (s ? (i.css("background-image", 'url("' + s + '")'), i.removeAttr("data-background")) : (n && (i.attr("srcset", n), i.removeAttr("data-srcset")), o && (i.attr("sizes", o), i.removeAttr("data-sizes")), r && (i.attr("src", r), i.removeAttr("data-src"))), i.addClass(p.loadedClass).removeClass(p.loadingClass), c.find("." + p.preloaderClass).remove(), d.params.loop && l) {
                                    var e = c.attr("data-swiper-slide-index");
                                    if (c.hasClass(d.params.slideDuplicateClass)) {
                                        var t = d.$wrapperEl.children('[data-swiper-slide-index="' + e + '"]:not(.' + d.params.slideDuplicateClass + ")");
                                        d.lazy.loadInSlide(t.index(), !1)
                                    } else {
                                        var a = d.$wrapperEl.children("." + d.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                                        d.lazy.loadInSlide(a.index(), !1)
                                    }
                                }
                                d.emit("lazyImageReady", c[0], i[0])
                            }
                        }), d.emit("lazyImageLoad", c[0], i[0])
                    })
                }
            },
            load: function() {
                var i = this,
                    t = i.$wrapperEl,
                    a = i.params,
                    s = i.slides,
                    e = i.activeIndex,
                    r = i.virtual && a.virtual.enabled,
                    n = a.lazy,
                    o = a.slidesPerView;

                function l(e) {
                    if (r) {
                        if (t.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]').length) return !0
                    } else if (s[e]) return !0;
                    return !1
                }

                function d(e) {
                    return r ? L(e).attr("data-swiper-slide-index") : L(e).index()
                }
                if ("auto" === o && (o = 0), i.lazy.initialImageLoaded || (i.lazy.initialImageLoaded = !0), i.params.watchSlidesVisibility) t.children("." + a.slideVisibleClass).each(function(e, t) {
                    var a = r ? L(t).attr("data-swiper-slide-index") : L(t).index();
                    i.lazy.loadInSlide(a)
                });
                else if (1 < o)
                    for (var p = e; p < e + o; p += 1) l(p) && i.lazy.loadInSlide(p);
                else i.lazy.loadInSlide(e);
                if (n.loadPrevNext)
                    if (1 < o || n.loadPrevNextAmount && 1 < n.loadPrevNextAmount) {
                        for (var c = n.loadPrevNextAmount, u = o, h = Math.min(e + u + Math.max(c, u), s.length), v = Math.max(e - Math.max(u, c), 0), f = e + o; f < h; f += 1) l(f) && i.lazy.loadInSlide(f);
                        for (var m = v; m < e; m += 1) l(m) && i.lazy.loadInSlide(m)
                    } else {
                        var g = t.children("." + a.slideNextClass);
                        0 < g.length && i.lazy.loadInSlide(d(g));
                        var b = t.children("." + a.slidePrevClass);
                        0 < b.length && i.lazy.loadInSlide(d(b))
                    }
            }
        },
        j = {
            LinearSpline: function(e, t) {
                var a, i, s, r, n, o = function(e, t) {
                    for (i = -1, a = e.length; 1 < a - i;) e[s = a + i >> 1] <= t ? i = s : a = s;
                    return a
                };
                return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function(e) {
                    return e ? (n = o(this.x, e), r = n - 1, (e - this.x[r]) * (this.y[n] - this.y[r]) / (this.x[n] - this.x[r]) + this.y[r]) : 0
                }, this
            },
            getInterpolateFunction: function(e) {
                var t = this;
                t.controller.spline || (t.controller.spline = t.params.loop ? new j.LinearSpline(t.slidesGrid, e.slidesGrid) : new j.LinearSpline(t.snapGrid, e.snapGrid))
            },
            setTranslate: function(e, t) {
                var a, i, s = this,
                    r = s.controller.control;

                function n(e) {
                    var t = s.rtlTranslate ? -s.translate : s.translate;
                    "slide" === s.params.controller.by && (s.controller.getInterpolateFunction(e), i = -s.controller.spline.interpolate(-t)), i && "container" !== s.params.controller.by || (a = (e.maxTranslate() - e.minTranslate()) / (s.maxTranslate() - s.minTranslate()), i = (t - s.minTranslate()) * a + e.minTranslate()), s.params.controller.inverse && (i = e.maxTranslate() - i), e.updateProgress(i), e.setTranslate(i, s), e.updateActiveIndex(), e.updateSlidesClasses()
                }
                if (Array.isArray(r))
                    for (var o = 0; o < r.length; o += 1) r[o] !== t && r[o] instanceof S && n(r[o]);
                else r instanceof S && t !== r && n(r)
            },
            setTransition: function(t, e) {
                var a, i = this,
                    s = i.controller.control;

                function r(e) {
                    e.setTransition(t, i), 0 !== t && (e.transitionStart(), e.params.autoHeight && X.nextTick(function() {
                        e.updateAutoHeight()
                    }), e.$wrapperEl.transitionEnd(function() {
                        s && (e.params.loop && "slide" === i.params.controller.by && e.loopFix(), e.transitionEnd())
                    }))
                }
                if (Array.isArray(s))
                    for (a = 0; a < s.length; a += 1) s[a] !== e && s[a] instanceof S && r(s[a]);
                else s instanceof S && e !== s && r(s)
            }
        },
        K = {
            makeElFocusable: function(e) {
                return e.attr("tabIndex", "0"), e
            },
            addElRole: function(e, t) {
                return e.attr("role", t), e
            },
            addElLabel: function(e, t) {
                return e.attr("aria-label", t), e
            },
            disableEl: function(e) {
                return e.attr("aria-disabled", !0), e
            },
            enableEl: function(e) {
                return e.attr("aria-disabled", !1), e
            },
            onEnterKey: function(e) {
                var t = this,
                    a = t.params.a11y;
                if (13 === e.keyCode) {
                    var i = L(e.target);
                    t.navigation && t.navigation.$nextEl && i.is(t.navigation.$nextEl) && (t.isEnd && !t.params.loop || t.slideNext(), t.isEnd ? t.a11y.notify(a.lastSlideMessage) : t.a11y.notify(a.nextSlideMessage)), t.navigation && t.navigation.$prevEl && i.is(t.navigation.$prevEl) && (t.isBeginning && !t.params.loop || t.slidePrev(), t.isBeginning ? t.a11y.notify(a.firstSlideMessage) : t.a11y.notify(a.prevSlideMessage)), t.pagination && i.is("." + t.params.pagination.bulletClass) && i[0].click()
                }
            },
            notify: function(e) {
                var t = this.a11y.liveRegion;
                0 !== t.length && (t.html(""), t.html(e))
            },
            updateNavigation: function() {
                var e = this;
                if (!e.params.loop) {
                    var t = e.navigation,
                        a = t.$nextEl,
                        i = t.$prevEl;
                    i && 0 < i.length && (e.isBeginning ? e.a11y.disableEl(i) : e.a11y.enableEl(i)), a && 0 < a.length && (e.isEnd ? e.a11y.disableEl(a) : e.a11y.enableEl(a))
                }
            },
            updatePagination: function() {
                var i = this,
                    s = i.params.a11y;
                i.pagination && i.params.pagination.clickable && i.pagination.bullets && i.pagination.bullets.length && i.pagination.bullets.each(function(e, t) {
                    var a = L(t);
                    i.a11y.makeElFocusable(a), i.a11y.addElRole(a, "button"), i.a11y.addElLabel(a, s.paginationBulletMessage.replace(/{{index}}/, a.index() + 1))
                })
            },
            init: function() {
                var e = this;
                e.$el.append(e.a11y.liveRegion);
                var t, a, i = e.params.a11y;
                e.navigation && e.navigation.$nextEl && (t = e.navigation.$nextEl), e.navigation && e.navigation.$prevEl && (a = e.navigation.$prevEl), t && (e.a11y.makeElFocusable(t), e.a11y.addElRole(t, "button"), e.a11y.addElLabel(t, i.nextSlideMessage), t.on("keydown", e.a11y.onEnterKey)), a && (e.a11y.makeElFocusable(a), e.a11y.addElRole(a, "button"), e.a11y.addElLabel(a, i.prevSlideMessage), a.on("keydown", e.a11y.onEnterKey)), e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.$el.on("keydown", "." + e.params.pagination.bulletClass, e.a11y.onEnterKey)
            },
            destroy: function() {
                var e, t, a = this;
                a.a11y.liveRegion && 0 < a.a11y.liveRegion.length && a.a11y.liveRegion.remove(), a.navigation && a.navigation.$nextEl && (e = a.navigation.$nextEl), a.navigation && a.navigation.$prevEl && (t = a.navigation.$prevEl), e && e.off("keydown", a.a11y.onEnterKey), t && t.off("keydown", a.a11y.onEnterKey), a.pagination && a.params.pagination.clickable && a.pagination.bullets && a.pagination.bullets.length && a.pagination.$el.off("keydown", "." + a.params.pagination.bulletClass, a.a11y.onEnterKey)
            }
        },
        U = {
            init: function() {
                var e = this;
                if (e.params.history) {
                    if (!B.history || !B.history.pushState) return e.params.history.enabled = !1, void(e.params.hashNavigation.enabled = !0);
                    var t = e.history;
                    t.initialized = !0, t.paths = U.getPathValues(), (t.paths.key || t.paths.value) && (t.scrollToSlide(0, t.paths.value, e.params.runCallbacksOnInit), e.params.history.replaceState || B.addEventListener("popstate", e.history.setHistoryPopState))
                }
            },
            destroy: function() {
                this.params.history.replaceState || B.removeEventListener("popstate", this.history.setHistoryPopState)
            },
            setHistoryPopState: function() {
                this.history.paths = U.getPathValues(), this.history.scrollToSlide(this.params.speed, this.history.paths.value, !1)
            },
            getPathValues: function() {
                var e = B.location.pathname.slice(1).split("/").filter(function(e) {
                        return "" !== e
                    }),
                    t = e.length;
                return {
                    key: e[t - 2],
                    value: e[t - 1]
                }
            },
            setHistory: function(e, t) {
                if (this.history.initialized && this.params.history.enabled) {
                    var a = this.slides.eq(t),
                        i = U.slugify(a.attr("data-history"));
                    B.location.pathname.includes(e) || (i = e + "/" + i);
                    var s = B.history.state;
                    s && s.value === i || (this.params.history.replaceState ? B.history.replaceState({
                        value: i
                    }, null, i) : B.history.pushState({
                        value: i
                    }, null, i))
                }
            },
            slugify: function(e) {
                return e.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
            },
            scrollToSlide: function(e, t, a) {
                var i = this;
                if (t)
                    for (var s = 0, r = i.slides.length; s < r; s += 1) {
                        var n = i.slides.eq(s);
                        if (U.slugify(n.attr("data-history")) === t && !n.hasClass(i.params.slideDuplicateClass)) {
                            var o = n.index();
                            i.slideTo(o, e, a)
                        }
                    } else i.slideTo(0, e, a)
            }
        },
        _ = {
            onHashCange: function() {
                var e = this,
                    t = f.location.hash.replace("#", "");
                t !== e.slides.eq(e.activeIndex).attr("data-hash") && e.slideTo(e.$wrapperEl.children("." + e.params.slideClass + '[data-hash="' + t + '"]').index())
            },
            setHash: function() {
                var e = this;
                if (e.hashNavigation.initialized && e.params.hashNavigation.enabled)
                    if (e.params.hashNavigation.replaceState && B.history && B.history.replaceState) B.history.replaceState(null, null, "#" + e.slides.eq(e.activeIndex).attr("data-hash") || "");
                    else {
                        var t = e.slides.eq(e.activeIndex),
                            a = t.attr("data-hash") || t.attr("data-history");
                        f.location.hash = a || ""
                    }
            },
            init: function() {
                var e = this;
                if (!(!e.params.hashNavigation.enabled || e.params.history && e.params.history.enabled)) {
                    e.hashNavigation.initialized = !0;
                    var t = f.location.hash.replace("#", "");
                    if (t)
                        for (var a = 0, i = e.slides.length; a < i; a += 1) {
                            var s = e.slides.eq(a);
                            if ((s.attr("data-hash") || s.attr("data-history")) === t && !s.hasClass(e.params.slideDuplicateClass)) {
                                var r = s.index();
                                e.slideTo(r, 0, e.params.runCallbacksOnInit, !0)
                            }
                        }
                    e.params.hashNavigation.watchState && L(B).on("hashchange", e.hashNavigation.onHashCange)
                }
            },
            destroy: function() {
                this.params.hashNavigation.watchState && L(B).off("hashchange", this.hashNavigation.onHashCange)
            }
        },
        Z = {
            run: function() {
                var e = this,
                    t = e.slides.eq(e.activeIndex),
                    a = e.params.autoplay.delay;
                t.attr("data-swiper-autoplay") && (a = t.attr("data-swiper-autoplay") || e.params.autoplay.delay), e.autoplay.timeout = X.nextTick(function() {
                    e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(), e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.params.loop ? (e.loopFix(), e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slideNext(e.params.speed, !0, !0), e.emit("autoplay"))
                }, a)
            },
            start: function() {
                var e = this;
                return void 0 === e.autoplay.timeout && (!e.autoplay.running && (e.autoplay.running = !0, e.emit("autoplayStart"), e.autoplay.run(), !0))
            },
            stop: function() {
                var e = this;
                return !!e.autoplay.running && (void 0 !== e.autoplay.timeout && (e.autoplay.timeout && (clearTimeout(e.autoplay.timeout), e.autoplay.timeout = void 0), e.autoplay.running = !1, e.emit("autoplayStop"), !0))
            },
            pause: function(e) {
                var t = this;
                t.autoplay.running && (t.autoplay.paused || (t.autoplay.timeout && clearTimeout(t.autoplay.timeout), t.autoplay.paused = !0, 0 !== e && t.params.autoplay.waitForTransition ? (t.$wrapperEl[0].addEventListener("transitionend", t.autoplay.onTransitionEnd), t.$wrapperEl[0].addEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd)) : (t.autoplay.paused = !1, t.autoplay.run())))
            }
        },
        Q = {
            setTranslate: function() {
                for (var e = this, t = e.slides, a = 0; a < t.length; a += 1) {
                    var i = e.slides.eq(a),
                        s = -i[0].swiperSlideOffset;
                    e.params.virtualTranslate || (s -= e.translate);
                    var r = 0;
                    e.isHorizontal() || (r = s, s = 0);
                    var n = e.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(i[0].progress), 0) : 1 + Math.min(Math.max(i[0].progress, -1), 0);
                    i.css({
                        opacity: n
                    }).transform("translate3d(" + s + "px, " + r + "px, 0px)")
                }
            },
            setTransition: function(e) {
                var a = this,
                    t = a.slides,
                    i = a.$wrapperEl;
                if (t.transition(e), a.params.virtualTranslate && 0 !== e) {
                    var s = !1;
                    t.transitionEnd(function() {
                        if (!s && a && !a.destroyed) {
                            s = !0, a.animating = !1;
                            for (var e = ["webkitTransitionEnd", "transitionend"], t = 0; t < e.length; t += 1) i.trigger(e[t])
                        }
                    })
                }
            }
        },
        J = {
            setTranslate: function() {
                var e, t = this,
                    a = t.$el,
                    i = t.$wrapperEl,
                    s = t.slides,
                    r = t.width,
                    n = t.height,
                    o = t.rtlTranslate,
                    l = t.size,
                    d = t.params.cubeEffect,
                    p = t.isHorizontal(),
                    c = t.virtual && t.params.virtual.enabled,
                    u = 0;
                d.shadow && (p ? (0 === (e = i.find(".swiper-cube-shadow")).length && (e = L('<div class="swiper-cube-shadow"></div>'), i.append(e)), e.css({
                    height: r + "px"
                })) : 0 === (e = a.find(".swiper-cube-shadow")).length && (e = L('<div class="swiper-cube-shadow"></div>'), a.append(e)));
                for (var h = 0; h < s.length; h += 1) {
                    var v = s.eq(h),
                        f = h;
                    c && (f = parseInt(v.attr("data-swiper-slide-index"), 10));
                    var m = 90 * f,
                        g = Math.floor(m / 360);
                    o && (m = -m, g = Math.floor(-m / 360));
                    var b = Math.max(Math.min(v[0].progress, 1), -1),
                        w = 0,
                        y = 0,
                        x = 0;
                    f % 4 == 0 ? (w = 4 * -g * l, x = 0) : (f - 1) % 4 == 0 ? (w = 0, x = 4 * -g * l) : (f - 2) % 4 == 0 ? (w = l + 4 * g * l, x = l) : (f - 3) % 4 == 0 && (w = -l, x = 3 * l + 4 * l * g), o && (w = -w), p || (y = w, w = 0);
                    var E = "rotateX(" + (p ? 0 : -m) + "deg) rotateY(" + (p ? m : 0) + "deg) translate3d(" + w + "px, " + y + "px, " + x + "px)";
                    if (b <= 1 && -1 < b && (u = 90 * f + 90 * b, o && (u = 90 * -f - 90 * b)), v.transform(E), d.slideShadows) {
                        var T = p ? v.find(".swiper-slide-shadow-left") : v.find(".swiper-slide-shadow-top"),
                            S = p ? v.find(".swiper-slide-shadow-right") : v.find(".swiper-slide-shadow-bottom");
                        0 === T.length && (T = L('<div class="swiper-slide-shadow-' + (p ? "left" : "top") + '"></div>'), v.append(T)), 0 === S.length && (S = L('<div class="swiper-slide-shadow-' + (p ? "right" : "bottom") + '"></div>'), v.append(S)), T.length && (T[0].style.opacity = Math.max(-b, 0)), S.length && (S[0].style.opacity = Math.max(b, 0))
                    }
                }
                if (i.css({
                        "-webkit-transform-origin": "50% 50% -" + l / 2 + "px",
                        "-moz-transform-origin": "50% 50% -" + l / 2 + "px",
                        "-ms-transform-origin": "50% 50% -" + l / 2 + "px",
                        "transform-origin": "50% 50% -" + l / 2 + "px"
                    }), d.shadow)
                    if (p) e.transform("translate3d(0px, " + (r / 2 + d.shadowOffset) + "px, " + -r / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + d.shadowScale + ")");
                    else {
                        var C = Math.abs(u) - 90 * Math.floor(Math.abs(u) / 90),
                            M = 1.5 - (Math.sin(2 * C * Math.PI / 360) / 2 + Math.cos(2 * C * Math.PI / 360) / 2),
                            z = d.shadowScale,
                            k = d.shadowScale / M,
                            P = d.shadowOffset;
                        e.transform("scale3d(" + z + ", 1, " + k + ") translate3d(0px, " + (n / 2 + P) + "px, " + -n / 2 / k + "px) rotateX(-90deg)")
                    }
                var $ = I.isSafari || I.isUiWebView ? -l / 2 : 0;
                i.transform("translate3d(0px,0," + $ + "px) rotateX(" + (t.isHorizontal() ? 0 : u) + "deg) rotateY(" + (t.isHorizontal() ? -u : 0) + "deg)")
            },
            setTransition: function(e) {
                var t = this.$el;
                this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), this.params.cubeEffect.shadow && !this.isHorizontal() && t.find(".swiper-cube-shadow").transition(e)
            }
        },
        ee = {
            setTranslate: function() {
                for (var e = this, t = e.slides, a = e.rtlTranslate, i = 0; i < t.length; i += 1) {
                    var s = t.eq(i),
                        r = s[0].progress;
                    e.params.flipEffect.limitRotation && (r = Math.max(Math.min(s[0].progress, 1), -1));
                    var n = -180 * r,
                        o = 0,
                        l = -s[0].swiperSlideOffset,
                        d = 0;
                    if (e.isHorizontal() ? a && (n = -n) : (d = l, o = -n, n = l = 0), s[0].style.zIndex = -Math.abs(Math.round(r)) + t.length, e.params.flipEffect.slideShadows) {
                        var p = e.isHorizontal() ? s.find(".swiper-slide-shadow-left") : s.find(".swiper-slide-shadow-top"),
                            c = e.isHorizontal() ? s.find(".swiper-slide-shadow-right") : s.find(".swiper-slide-shadow-bottom");
                        0 === p.length && (p = L('<div class="swiper-slide-shadow-' + (e.isHorizontal() ? "left" : "top") + '"></div>'), s.append(p)), 0 === c.length && (c = L('<div class="swiper-slide-shadow-' + (e.isHorizontal() ? "right" : "bottom") + '"></div>'), s.append(c)), p.length && (p[0].style.opacity = Math.max(-r, 0)), c.length && (c[0].style.opacity = Math.max(r, 0))
                    }
                    s.transform("translate3d(" + l + "px, " + d + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)")
                }
            },
            setTransition: function(e) {
                var a = this,
                    t = a.slides,
                    i = a.activeIndex,
                    s = a.$wrapperEl;
                if (t.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), a.params.virtualTranslate && 0 !== e) {
                    var r = !1;
                    t.eq(i).transitionEnd(function() {
                        if (!r && a && !a.destroyed) {
                            r = !0, a.animating = !1;
                            for (var e = ["webkitTransitionEnd", "transitionend"], t = 0; t < e.length; t += 1) s.trigger(e[t])
                        }
                    })
                }
            }
        },
        te = {
            setTranslate: function() {
                for (var e = this, t = e.width, a = e.height, i = e.slides, s = e.$wrapperEl, r = e.slidesSizesGrid, n = e.params.coverflowEffect, o = e.isHorizontal(), l = e.translate, d = o ? t / 2 - l : a / 2 - l, p = o ? n.rotate : -n.rotate, c = n.depth, u = 0, h = i.length; u < h; u += 1) {
                    var v = i.eq(u),
                        f = r[u],
                        m = (d - v[0].swiperSlideOffset - f / 2) / f * n.modifier,
                        g = o ? p * m : 0,
                        b = o ? 0 : p * m,
                        w = -c * Math.abs(m),
                        y = o ? 0 : n.stretch * m,
                        x = o ? n.stretch * m : 0;
                    Math.abs(x) < .001 && (x = 0), Math.abs(y) < .001 && (y = 0), Math.abs(w) < .001 && (w = 0), Math.abs(g) < .001 && (g = 0), Math.abs(b) < .001 && (b = 0);
                    var E = "translate3d(" + x + "px," + y + "px," + w + "px)  rotateX(" + b + "deg) rotateY(" + g + "deg)";
                    if (v.transform(E), v[0].style.zIndex = 1 - Math.abs(Math.round(m)), n.slideShadows) {
                        var T = o ? v.find(".swiper-slide-shadow-left") : v.find(".swiper-slide-shadow-top"),
                            S = o ? v.find(".swiper-slide-shadow-right") : v.find(".swiper-slide-shadow-bottom");
                        0 === T.length && (T = L('<div class="swiper-slide-shadow-' + (o ? "left" : "top") + '"></div>'), v.append(T)), 0 === S.length && (S = L('<div class="swiper-slide-shadow-' + (o ? "right" : "bottom") + '"></div>'), v.append(S)), T.length && (T[0].style.opacity = 0 < m ? m : 0), S.length && (S[0].style.opacity = 0 < -m ? -m : 0)
                    }
                }(Y.pointerEvents || Y.prefixedPointerEvents) && (s[0].style.perspectiveOrigin = d + "px 50%")
            },
            setTransition: function(e) {
                this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
            }
        },
        ae = [C, M, z, k, $, O, H, {
            name: "mousewheel",
            params: {
                mousewheel: {
                    enabled: !1,
                    releaseOnEdges: !1,
                    invert: !1,
                    forceToAxis: !1,
                    sensitivity: 1,
                    eventsTarged: "container"
                }
            },
            create: function() {
                var e = this;
                X.extend(e, {
                    mousewheel: {
                        enabled: !1,
                        enable: G.enable.bind(e),
                        disable: G.disable.bind(e),
                        handle: G.handle.bind(e),
                        handleMouseEnter: G.handleMouseEnter.bind(e),
                        handleMouseLeave: G.handleMouseLeave.bind(e),
                        lastScrollTime: X.now()
                    }
                })
            },
            on: {
                init: function() {
                    this.params.mousewheel.enabled && this.mousewheel.enable()
                },
                destroy: function() {
                    this.mousewheel.enabled && this.mousewheel.disable()
                }
            }
        }, {
            name: "navigation",
            params: {
                navigation: {
                    nextEl: null,
                    prevEl: null,
                    hideOnClick: !1,
                    disabledClass: "swiper-button-disabled",
                    hiddenClass: "swiper-button-hidden",
                    lockClass: "swiper-button-lock"
                }
            },
            create: function() {
                X.extend(this, {
                    navigation: {
                        init: N.init.bind(this),
                        update: N.update.bind(this),
                        destroy: N.destroy.bind(this)
                    }
                })
            },
            on: {
                init: function() {
                    this.navigation.init(), this.navigation.update()
                },
                toEdge: function() {
                    this.navigation.update()
                },
                fromEdge: function() {
                    this.navigation.update()
                },
                destroy: function() {
                    this.navigation.destroy()
                },
                click: function(e) {
                    var t = this.navigation,
                        a = t.$nextEl,
                        i = t.$prevEl;
                    !this.params.navigation.hideOnClick || L(e.target).is(i) || L(e.target).is(a) || (a && a.toggleClass(this.params.navigation.hiddenClass), i && i.toggleClass(this.params.navigation.hiddenClass))
                }
            }
        }, {
            name: "pagination",
            params: {
                pagination: {
                    el: null,
                    bulletElement: "span",
                    clickable: !1,
                    hideOnClick: !1,
                    renderBullet: null,
                    renderProgressbar: null,
                    renderFraction: null,
                    renderCustom: null,
                    progressbarOpposite: !1,
                    type: "bullets",
                    dynamicBullets: !1,
                    dynamicMainBullets: 1,
                    formatFractionCurrent: function(e) {
                        return e
                    },
                    formatFractionTotal: function(e) {
                        return e
                    },
                    bulletClass: "swiper-pagination-bullet",
                    bulletActiveClass: "swiper-pagination-bullet-active",
                    modifierClass: "swiper-pagination-",
                    currentClass: "swiper-pagination-current",
                    totalClass: "swiper-pagination-total",
                    hiddenClass: "swiper-pagination-hidden",
                    progressbarFillClass: "swiper-pagination-progressbar-fill",
                    progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
                    clickableClass: "swiper-pagination-clickable",
                    lockClass: "swiper-pagination-lock"
                }
            },
            create: function() {
                var e = this;
                X.extend(e, {
                    pagination: {
                        init: V.init.bind(e),
                        render: V.render.bind(e),
                        update: V.update.bind(e),
                        destroy: V.destroy.bind(e),
                        dynamicBulletIndex: 0
                    }
                })
            },
            on: {
                init: function() {
                    this.pagination.init(), this.pagination.render(), this.pagination.update()
                },
                activeIndexChange: function() {
                    this.params.loop ? this.pagination.update() : void 0 === this.snapIndex && this.pagination.update()
                },
                snapIndexChange: function() {
                    this.params.loop || this.pagination.update()
                },
                slidesLengthChange: function() {
                    this.params.loop && (this.pagination.render(), this.pagination.update())
                },
                snapGridLengthChange: function() {
                    this.params.loop || (this.pagination.render(), this.pagination.update())
                },
                destroy: function() {
                    this.pagination.destroy()
                },
                click: function(e) {
                    var t = this;
                    t.params.pagination.el && t.params.pagination.hideOnClick && 0 < t.pagination.$el.length && !L(e.target).hasClass(t.params.pagination.bulletClass) && t.pagination.$el.toggleClass(t.params.pagination.hiddenClass)
                }
            }
        }, {
            name: "scrollbar",
            params: {
                scrollbar: {
                    el: null,
                    dragSize: "auto",
                    hide: !1,
                    draggable: !1,
                    snapOnRelease: !0,
                    lockClass: "swiper-scrollbar-lock",
                    dragClass: "swiper-scrollbar-drag"
                }
            },
            create: function() {
                var e = this;
                X.extend(e, {
                    scrollbar: {
                        init: R.init.bind(e),
                        destroy: R.destroy.bind(e),
                        updateSize: R.updateSize.bind(e),
                        setTranslate: R.setTranslate.bind(e),
                        setTransition: R.setTransition.bind(e),
                        enableDraggable: R.enableDraggable.bind(e),
                        disableDraggable: R.disableDraggable.bind(e),
                        setDragPosition: R.setDragPosition.bind(e),
                        onDragStart: R.onDragStart.bind(e),
                        onDragMove: R.onDragMove.bind(e),
                        onDragEnd: R.onDragEnd.bind(e),
                        isTouched: !1,
                        timeout: null,
                        dragTimeout: null
                    }
                })
            },
            on: {
                init: function() {
                    this.scrollbar.init(), this.scrollbar.updateSize(), this.scrollbar.setTranslate()
                },
                update: function() {
                    this.scrollbar.updateSize()
                },
                resize: function() {
                    this.scrollbar.updateSize()
                },
                observerUpdate: function() {
                    this.scrollbar.updateSize()
                },
                setTranslate: function() {
                    this.scrollbar.setTranslate()
                },
                setTransition: function(e) {
                    this.scrollbar.setTransition(e)
                },
                destroy: function() {
                    this.scrollbar.destroy()
                }
            }
        }, {
            name: "parallax",
            params: {
                parallax: {
                    enabled: !1
                }
            },
            create: function() {
                X.extend(this, {
                    parallax: {
                        setTransform: F.setTransform.bind(this),
                        setTranslate: F.setTranslate.bind(this),
                        setTransition: F.setTransition.bind(this)
                    }
                })
            },
            on: {
                beforeInit: function() {
                    this.params.parallax.enabled && (this.params.watchSlidesProgress = !0)
                },
                init: function() {
                    this.params.parallax && this.parallax.setTranslate()
                },
                setTranslate: function() {
                    this.params.parallax && this.parallax.setTranslate()
                },
                setTransition: function(e) {
                    this.params.parallax && this.parallax.setTransition(e)
                }
            }
        }, {
            name: "zoom",
            params: {
                zoom: {
                    enabled: !1,
                    maxRatio: 3,
                    minRatio: 1,
                    toggle: !0,
                    containerClass: "swiper-zoom-container",
                    zoomedSlideClass: "swiper-slide-zoomed"
                }
            },
            create: function() {
                var t = this,
                    a = {
                        enabled: !1,
                        scale: 1,
                        currentScale: 1,
                        isScaling: !1,
                        gesture: {
                            $slideEl: void 0,
                            slideWidth: void 0,
                            slideHeight: void 0,
                            $imageEl: void 0,
                            $imageWrapEl: void 0,
                            maxRatio: 3
                        },
                        image: {
                            isTouched: void 0,
                            isMoved: void 0,
                            currentX: void 0,
                            currentY: void 0,
                            minX: void 0,
                            minY: void 0,
                            maxX: void 0,
                            maxY: void 0,
                            width: void 0,
                            height: void 0,
                            startX: void 0,
                            startY: void 0,
                            touchesStart: {},
                            touchesCurrent: {}
                        },
                        velocity: {
                            x: void 0,
                            y: void 0,
                            prevPositionX: void 0,
                            prevPositionY: void 0,
                            prevTime: void 0
                        }
                    };
                "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out".split(" ").forEach(function(e) {
                    a[e] = W[e].bind(t)
                }), X.extend(t, {
                    zoom: a
                })
            },
            on: {
                init: function() {
                    this.params.zoom.enabled && this.zoom.enable()
                },
                destroy: function() {
                    this.zoom.disable()
                },
                touchStart: function(e) {
                    this.zoom.enabled && this.zoom.onTouchStart(e)
                },
                touchEnd: function(e) {
                    this.zoom.enabled && this.zoom.onTouchEnd(e)
                },
                doubleTap: function(e) {
                    this.params.zoom.enabled && this.zoom.enabled && this.params.zoom.toggle && this.zoom.toggle(e)
                },
                transitionEnd: function() {
                    this.zoom.enabled && this.params.zoom.enabled && this.zoom.onTransitionEnd()
                }
            }
        }, {
            name: "lazy",
            params: {
                lazy: {
                    enabled: !1,
                    loadPrevNext: !1,
                    loadPrevNextAmount: 1,
                    loadOnTransitionStart: !1,
                    elementClass: "swiper-lazy",
                    loadingClass: "swiper-lazy-loading",
                    loadedClass: "swiper-lazy-loaded",
                    preloaderClass: "swiper-lazy-preloader"
                }
            },
            create: function() {
                X.extend(this, {
                    lazy: {
                        initialImageLoaded: !1,
                        load: q.load.bind(this),
                        loadInSlide: q.loadInSlide.bind(this)
                    }
                })
            },
            on: {
                beforeInit: function() {
                    this.params.lazy.enabled && this.params.preloadImages && (this.params.preloadImages = !1)
                },
                init: function() {
                    this.params.lazy.enabled && !this.params.loop && 0 === this.params.initialSlide && this.lazy.load()
                },
                scroll: function() {
                    this.params.freeMode && !this.params.freeModeSticky && this.lazy.load()
                },
                resize: function() {
                    this.params.lazy.enabled && this.lazy.load()
                },
                scrollbarDragMove: function() {
                    this.params.lazy.enabled && this.lazy.load()
                },
                transitionStart: function() {
                    var e = this;
                    e.params.lazy.enabled && (e.params.lazy.loadOnTransitionStart || !e.params.lazy.loadOnTransitionStart && !e.lazy.initialImageLoaded) && e.lazy.load()
                },
                transitionEnd: function() {
                    this.params.lazy.enabled && !this.params.lazy.loadOnTransitionStart && this.lazy.load()
                }
            }
        }, {
            name: "controller",
            params: {
                controller: {
                    control: void 0,
                    inverse: !1,
                    by: "slide"
                }
            },
            create: function() {
                var e = this;
                X.extend(e, {
                    controller: {
                        control: e.params.controller.control,
                        getInterpolateFunction: j.getInterpolateFunction.bind(e),
                        setTranslate: j.setTranslate.bind(e),
                        setTransition: j.setTransition.bind(e)
                    }
                })
            },
            on: {
                update: function() {
                    this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
                },
                resize: function() {
                    this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
                },
                observerUpdate: function() {
                    this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
                },
                setTranslate: function(e, t) {
                    this.controller.control && this.controller.setTranslate(e, t)
                },
                setTransition: function(e, t) {
                    this.controller.control && this.controller.setTransition(e, t)
                }
            }
        }, {
            name: "a11y",
            params: {
                a11y: {
                    enabled: !0,
                    notificationClass: "swiper-notification",
                    prevSlideMessage: "Previous slide",
                    nextSlideMessage: "Next slide",
                    firstSlideMessage: "This is the first slide",
                    lastSlideMessage: "This is the last slide",
                    paginationBulletMessage: "Go to slide {{index}}"
                }
            },
            create: function() {
                var t = this;
                X.extend(t, {
                    a11y: {
                        liveRegion: L('<span class="' + t.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>')
                    }
                }), Object.keys(K).forEach(function(e) {
                    t.a11y[e] = K[e].bind(t)
                })
            },
            on: {
                init: function() {
                    this.params.a11y.enabled && (this.a11y.init(), this.a11y.updateNavigation())
                },
                toEdge: function() {
                    this.params.a11y.enabled && this.a11y.updateNavigation()
                },
                fromEdge: function() {
                    this.params.a11y.enabled && this.a11y.updateNavigation()
                },
                paginationUpdate: function() {
                    this.params.a11y.enabled && this.a11y.updatePagination()
                },
                destroy: function() {
                    this.params.a11y.enabled && this.a11y.destroy()
                }
            }
        }, {
            name: "history",
            params: {
                history: {
                    enabled: !1,
                    replaceState: !1,
                    key: "slides"
                }
            },
            create: function() {
                var e = this;
                X.extend(e, {
                    history: {
                        init: U.init.bind(e),
                        setHistory: U.setHistory.bind(e),
                        setHistoryPopState: U.setHistoryPopState.bind(e),
                        scrollToSlide: U.scrollToSlide.bind(e),
                        destroy: U.destroy.bind(e)
                    }
                })
            },
            on: {
                init: function() {
                    this.params.history.enabled && this.history.init()
                },
                destroy: function() {
                    this.params.history.enabled && this.history.destroy()
                },
                transitionEnd: function() {
                    this.history.initialized && this.history.setHistory(this.params.history.key, this.activeIndex)
                }
            }
        }, {
            name: "hash-navigation",
            params: {
                hashNavigation: {
                    enabled: !1,
                    replaceState: !1,
                    watchState: !1
                }
            },
            create: function() {
                var e = this;
                X.extend(e, {
                    hashNavigation: {
                        initialized: !1,
                        init: _.init.bind(e),
                        destroy: _.destroy.bind(e),
                        setHash: _.setHash.bind(e),
                        onHashCange: _.onHashCange.bind(e)
                    }
                })
            },
            on: {
                init: function() {
                    this.params.hashNavigation.enabled && this.hashNavigation.init()
                },
                destroy: function() {
                    this.params.hashNavigation.enabled && this.hashNavigation.destroy()
                },
                transitionEnd: function() {
                    this.hashNavigation.initialized && this.hashNavigation.setHash()
                }
            }
        }, {
            name: "autoplay",
            params: {
                autoplay: {
                    enabled: !1,
                    delay: 3e3,
                    waitForTransition: !0,
                    disableOnInteraction: !0,
                    stopOnLastSlide: !1,
                    reverseDirection: !1
                }
            },
            create: function() {
                var t = this;
                X.extend(t, {
                    autoplay: {
                        running: !1,
                        paused: !1,
                        run: Z.run.bind(t),
                        start: Z.start.bind(t),
                        stop: Z.stop.bind(t),
                        pause: Z.pause.bind(t),
                        onTransitionEnd: function(e) {
                            t && !t.destroyed && t.$wrapperEl && e.target === this && (t.$wrapperEl[0].removeEventListener("transitionend", t.autoplay.onTransitionEnd), t.$wrapperEl[0].removeEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd), t.autoplay.paused = !1, t.autoplay.running ? t.autoplay.run() : t.autoplay.stop())
                        }
                    }
                })
            },
            on: {
                init: function() {
                    this.params.autoplay.enabled && this.autoplay.start()
                },
                beforeTransitionStart: function(e, t) {
                    this.autoplay.running && (t || !this.params.autoplay.disableOnInteraction ? this.autoplay.pause(e) : this.autoplay.stop())
                },
                sliderFirstMove: function() {
                    this.autoplay.running && (this.params.autoplay.disableOnInteraction ? this.autoplay.stop() : this.autoplay.pause())
                },
                destroy: function() {
                    this.autoplay.running && this.autoplay.stop()
                }
            }
        }, {
            name: "effect-fade",
            params: {
                fadeEffect: {
                    crossFade: !1
                }
            },
            create: function() {
                X.extend(this, {
                    fadeEffect: {
                        setTranslate: Q.setTranslate.bind(this),
                        setTransition: Q.setTransition.bind(this)
                    }
                })
            },
            on: {
                beforeInit: function() {
                    var e = this;
                    if ("fade" === e.params.effect) {
                        e.classNames.push(e.params.containerModifierClass + "fade");
                        var t = {
                            slidesPerView: 1,
                            slidesPerColumn: 1,
                            slidesPerGroup: 1,
                            watchSlidesProgress: !0,
                            spaceBetween: 0,
                            virtualTranslate: !0
                        };
                        X.extend(e.params, t), X.extend(e.originalParams, t)
                    }
                },
                setTranslate: function() {
                    "fade" === this.params.effect && this.fadeEffect.setTranslate()
                },
                setTransition: function(e) {
                    "fade" === this.params.effect && this.fadeEffect.setTransition(e)
                }
            }
        }, {
            name: "effect-cube",
            params: {
                cubeEffect: {
                    slideShadows: !0,
                    shadow: !0,
                    shadowOffset: 20,
                    shadowScale: .94
                }
            },
            create: function() {
                X.extend(this, {
                    cubeEffect: {
                        setTranslate: J.setTranslate.bind(this),
                        setTransition: J.setTransition.bind(this)
                    }
                })
            },
            on: {
                beforeInit: function() {
                    var e = this;
                    if ("cube" === e.params.effect) {
                        e.classNames.push(e.params.containerModifierClass + "cube"), e.classNames.push(e.params.containerModifierClass + "3d");
                        var t = {
                            slidesPerView: 1,
                            slidesPerColumn: 1,
                            slidesPerGroup: 1,
                            watchSlidesProgress: !0,
                            resistanceRatio: 0,
                            spaceBetween: 0,
                            centeredSlides: !1,
                            virtualTranslate: !0
                        };
                        X.extend(e.params, t), X.extend(e.originalParams, t)
                    }
                },
                setTranslate: function() {
                    "cube" === this.params.effect && this.cubeEffect.setTranslate()
                },
                setTransition: function(e) {
                    "cube" === this.params.effect && this.cubeEffect.setTransition(e)
                }
            }
        }, {
            name: "effect-flip",
            params: {
                flipEffect: {
                    slideShadows: !0,
                    limitRotation: !0
                }
            },
            create: function() {
                X.extend(this, {
                    flipEffect: {
                        setTranslate: ee.setTranslate.bind(this),
                        setTransition: ee.setTransition.bind(this)
                    }
                })
            },
            on: {
                beforeInit: function() {
                    var e = this;
                    if ("flip" === e.params.effect) {
                        e.classNames.push(e.params.containerModifierClass + "flip"), e.classNames.push(e.params.containerModifierClass + "3d");
                        var t = {
                            slidesPerView: 1,
                            slidesPerColumn: 1,
                            slidesPerGroup: 1,
                            watchSlidesProgress: !0,
                            spaceBetween: 0,
                            virtualTranslate: !0
                        };
                        X.extend(e.params, t), X.extend(e.originalParams, t)
                    }
                },
                setTranslate: function() {
                    "flip" === this.params.effect && this.flipEffect.setTranslate()
                },
                setTransition: function(e) {
                    "flip" === this.params.effect && this.flipEffect.setTransition(e)
                }
            }
        }, {
            name: "effect-coverflow",
            params: {
                coverflowEffect: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: !0
                }
            },
            create: function() {
                X.extend(this, {
                    coverflowEffect: {
                        setTranslate: te.setTranslate.bind(this),
                        setTransition: te.setTransition.bind(this)
                    }
                })
            },
            on: {
                beforeInit: function() {
                    var e = this;
                    "coverflow" === e.params.effect && (e.classNames.push(e.params.containerModifierClass + "coverflow"), e.classNames.push(e.params.containerModifierClass + "3d"), e.params.watchSlidesProgress = !0, e.originalParams.watchSlidesProgress = !0)
                },
                setTranslate: function() {
                    "coverflow" === this.params.effect && this.coverflowEffect.setTranslate()
                },
                setTransition: function(e) {
                    "coverflow" === this.params.effect && this.coverflowEffect.setTransition(e)
                }
            }
        }];
    return void 0 === S.use && (S.use = S.Class.use, S.installModule = S.Class.installModule), S.use(ae), S
});
if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
        value: function(searchElement, fromIndex) {
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }
            var o = Object(this);
            var len = o.length >>> 0;
            if (len === 0) {
                return false;
            }
            var n = fromIndex | 0;
            var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

            function sameValueZero(x, y) {
                return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
            }
            while (k < len) {
                if (sameValueZero(o[k], searchElement)) {
                    return true;
                }
                k++;
            }
            return false;
        }
    });
}
$(function() {
    $('#form-currency .currency-select').unbind().on('click', function(e) {
        e.preventDefault();
        $('#form-currency input[name=\'code\']').val($(this).data('name'));
        $('#form-currency').submit();
    });
    $('#form-language .language-select').unbind().on('click', function(e) {
        e.preventDefault();
        $('#form-language input[name=\'code\']').val($(this).data('name'));
        $('#form-language').submit();
    });
});
window['cart'].add = function(product_id, quantity, quick_buy) {
    quantity = quantity || 1;
    $.ajax({
        url: 'index.php?route=checkout/cart/add',
        type: 'post',
        data: 'product_id=' + product_id + '&quantity=' + quantity,
        dataType: 'json',
        beforeSend: function() {
            $('[data-toggle="tooltip"]').tooltip('hide');
            $('[onclick*="cart.add(\'' + product_id + '\'"]').button('loading');
        },
        complete: function() {
            $('[onclick*="cart.add(\'' + product_id + '\'"]').button('reset');
        },
        success: function(json) {
            $('.alert, .text-danger').remove();
            if (json['redirect']) {
                if (json['options_popup']) {
                    if ($('html').hasClass('iphone') || $('html').hasClass('ipad')) {
                        iNoBounce.enable();
                    }
                    var html = '';
                    html += '<div class="popup-wrapper popup-options">';
                    html += ' <div class="popup-container">';
                    html += '  <button class="btn popup-close"></button>';
                    html += '  <div class="popup-body">';
                    html += '  <div class="popup-inner-body">';
                    html += '   <div class="journal-loading"><i class="fa fa-spinner fa-spin"></i></div>';
                    html += '   <iframe src="index.php?route=journal3/product&product_id=' + product_id + '&popup=options&product_quantity=' + quantity + '&' + (quick_buy ? 'quick_buy=true' : '') + '" width="100%" height="100%" frameborder="0" onload="this.height = this.contentWindow.document.body.offsetHeight; $(this).prev(\'.journal-loading\').fadeOut();"></iframe>';
                    html += '  </div>';
                    html += '  </div>';
                    html += ' </div>';
                    html += ' <div class="popup-bg popup-bg-closable"></div>';
                    html += '</div>';
                    $('.popup-wrapper').remove();
                    $('body').append(html);
                    setTimeout(function() {
                        $('html').addClass('popup-open popup-center');
                    }, 10);
                } else {
                    location = json['redirect'];
                }
            }
            if (json['success']) {
                if (json['options_popup']) {
                    if ($('html').hasClass('iphone') || $('html').hasClass('ipad')) {
                        iNoBounce.enable();
                    }
                    var html = '';
                    html += '<div class="popup-wrapper popup-options">';
                    html += ' <div class="popup-container">';
                    html += '  <button class="btn popup-close"></button>';
                    html += '  <div class="popup-body">';
                    html += '  <div class="popup-inner-body">';
                    html += '   <div class="journal-loading"><i class="fa fa-spinner fa-spin"></i></div>';
                    html += '   <iframe src="index.php?route=journal3/product&product_id=' + product_id + '&popup=options&' + (quick_buy ? 'quick_buy=true' : '') + '" width="100%" height="100%" frameborder="0" onload="this.height = this.contentWindow.document.body.offsetHeight; $(this).prev(\'.journal-loading\').fadeOut();"></iframe>';
                    html += '  </div>';
                    html += '  </div>';
                    html += ' </div>';
                    html += ' <div class="popup-bg popup-bg-closable"></div>';
                    html += '</div>';
                    $('.popup-wrapper').remove();
                    $('body').append(html);
                    setTimeout(function() {
                        $('html').addClass('popup-open popup-center');
                    }, 10);
                } else {
                    if (json['notification']) {
                        show_notification(json['notification']);
                        if (quick_buy) {
                            location = Journal['checkoutUrl'];
                        }
                    } else {
                        $('header').after('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');
                    }
                }
                setTimeout(function() {
                    $('#cart-total').html(json['total']);
                    $('#cart-items').html(json['items_count']);
                    if (json['items_count']) {
                        $('#cart-items').removeClass('count-zero');
                    } else {
                        $('#cart-items').addClass('count-zero');
                    }
                }, 100);
                if (Journal['scrollToTop']) {
                    $('html, body').animate({
                        scrollTop: 0
                    }, 'slow');
                }
                $('.cart-content ul').load('index.php?route=common/cart/info ul li');
                if (parent.window['_QuickCheckout']) {
                    parent.window['_QuickCheckout'].save();
                }
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(thrownError + '\r\n' + xhr.statusText + '\r\n' + xhr.responseText);
        }
    });
};
window['cart'].remove = function(key) {
    $.ajax({
        url: 'index.php?route=checkout/cart/remove',
        type: 'post',
        data: 'key=' + key,
        dataType: 'json',
        beforeSend: function() {
            $('#cart > button').button('loading');
        },
        complete: function() {
            $('#cart > button').button('reset');
        },
        success: function(json) {
            setTimeout(function() {
                $('#cart-total').html(json['total']);
                $('#cart-items').html(json['items_count']);
                if (json['items_count']) {
                    $('#cart-items').removeClass('count-zero');
                } else {
                    $('#cart-items').addClass('count-zero');
                }
            }, 100);
            if ($('html').hasClass('route-checkout-cart') || $('html').hasClass('route-checkout-checkout')) {
                location = 'index.php?route=checkout/cart';
            } else {
                $('.cart-content ul').load('index.php?route=common/cart/info ul li');
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(thrownError + '\r\n' + xhr.statusText + '\r\n' + xhr.responseText);
        }
    });
};
window['cart'].update = function(key, quantity) {
    $.ajax({
        url: 'index.php?route=checkout/cart/edit',
        type: 'post',
        data: 'key=' + key + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
        dataType: 'json',
        beforeSend: function() {
            $('#cart > button').button('loading');
        },
        complete: function() {
            $('#cart > button').button('reset');
        },
        success: function(json) {
            setTimeout(function() {
                $('#cart-total').html(json['total']);
                $('#cart-items').html(json['items_count']);
                if (json['items_count']) {
                    $('#cart-items').removeClass('count-zero');
                } else {
                    $('#cart-items').addClass('count-zero');
                }
            }, 100);
            if ($('html').hasClass('route-checkout-cart') || $('html').hasClass('route-checkout-checkout')) {
                location = 'index.php?route=checkout/cart';
            } else {
                $('.cart-content ul').load('index.php?route=common/cart/info ul li');
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(thrownError + '\r\n' + xhr.statusText + '\r\n' + xhr.responseText);
        }
    });
};
window['wishlist'].add = function(product_id) {
    $.ajax({
        url: 'index.php?route=account/wishlist/add',
        type: 'post',
        data: 'product_id=' + product_id,
        dataType: 'json',
        success: function(json) {
            $('.alert').remove();
            if (json['redirect']) {
                location = json['redirect'];
            }
            if (json['success']) {
                $('[data-toggle="tooltip"]').tooltip('hide');
                if (json['notification']) {
                    show_notification(json['notification']);
                } else {
                    $('header').after('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');
                }
            }
            $('#wishlist-total span').html(json['total']);
            $('#wishlist-total').attr('title', json['total']);
            $('.wishlist-badge').text(json['count']);
            if (json['count']) {
                $('.wishlist-badge').removeClass('count-zero');
            } else {
                $('.wishlist-badge').addClass('count-zero');
            }
            if (Journal['scrollToTop']) {
                $('html, body').animate({
                    scrollTop: 0
                }, 'slow');
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(thrownError + '\r\n' + xhr.statusText + '\r\n' + xhr.responseText);
        }
    });
};
window['compare'].add = function(product_id) {
    $.ajax({
        url: 'index.php?route=product/compare/add',
        type: 'post',
        data: 'product_id=' + product_id,
        dataType: 'json',
        success: function(json) {
            $('.alert').remove();
            if (json['success']) {
                $('[data-toggle="tooltip"]').tooltip('hide');
                if (json['notification']) {
                    show_notification(json['notification']);
                } else {
                    $('header').after('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');
                }
                $('#compare-total').html(json['total']);
                $('.compare-badge').text(json['count']);
                if (json['count']) {
                    $('.compare-badge').removeClass('count-zero');
                } else {
                    $('.compare-badge').addClass('count-zero');
                }
                if (Journal['scrollToTop']) {
                    $('html, body').animate({
                        scrollTop: 0
                    }, 'slow');
                }
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(thrownError + '\r\n' + xhr.statusText + '\r\n' + xhr.responseText);
        }
    });
};
window['quickview'] = function(product_id) {
    product_id = parseInt(product_id, 10);
    $('[data-toggle="tooltip"]').tooltip('hide');
    var html = '';
    html += '<div class="popup-wrapper popup-quickview">';
    html += ' <div class="popup-container">';
    html += '  <button class="btn popup-close"></button>';
    html += '  <div class="popup-body">';
    html += '   <div class="popup-inner-body">';
    html += '    <div class="journal-loading"><i class="fa fa-spinner fa-spin"></i></div>';
    html += '    <iframe src="index.php?route=journal3/product&product_id=' + product_id + '&popup=quickview" width="100%" height="100%" frameborder="0" onload="this.height = this.contentWindow.document.body.offsetHeight; $(this).prev(\'.journal-loading\').hide();"></iframe>';
    html += '   </div>';
    html += '  </div>';
    html += ' </div>';
    html += ' <div class="popup-bg popup-bg-closable"></div>';
    html += '</div>';
    $('.popup-wrapper').remove();
    $('body').append(html);
    setTimeout(function() {
        $('html').addClass('popup-open popup-center');
    }, 10);
};
window['open_popup'] = function(module_id) {
    if ($('html').hasClass('iphone') || $('html').hasClass('ipad')) {
        iNoBounce.enable();
    }
    module_id = parseInt(module_id, 10);
    var html = '';
    html += '<div class="popup-wrapper popup-module">';
    html += ' <div class="popup-container">';
    html += '  <button class="btn popup-close"></button>';
    html += '  <div class="popup-body">';
    html += '  <div class="popup-inner-body">';
    html += '  </div>';
    html += '  </div>';
    html += ' </div>';
    html += ' <div class="popup-bg popup-bg-closable"></div>';
    html += '</div>';
    $('.popup-wrapper').remove();
    $('body').append(html);
    setTimeout(function() {
        $('html').addClass('popup-open popup-center');
    }, 10);
    $('.popup-container').css('visibility', 'hidden');
    $.ajax({
        url: 'index.php?route=journal3/popup/get&module_id=' + module_id + '&popup=module',
        success: function(html) {
            var $html = $(html);
            var $popup = $html.siblings('.module-popup');
            var $style = $html.siblings('style');
            var $content = $popup.find('.popup-container');
            $('#popup-style-' + module_id).remove();
            $('head').append($style.attr('id', 'popup-style-' + module_id));
            $('.popup-wrapper').attr('class', $popup.attr('class'));
            $('.popup-container').html($content.html());
            $('.popup-container').css('visibility', 'visible');
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(thrownError + '\r\n' + xhr.statusText + '\r\n' + xhr.responseText);
        }
    });
};
window['open_login_popup'] = function() {
    if ($('html').hasClass('iphone') || $('html').hasClass('ipad')) {
        iNoBounce.enable();
    }
    var html = '';
    html += '<div class="popup-wrapper popup-login">';
    html += ' <div class="popup-container">';
    html += '  <button class="btn popup-close"></button>';
    html += '  <div class="popup-body">';
    html += '  <div class="popup-inner-body">';
    html += '   <div class="journal-loading"><i class="fa fa-spinner fa-spin"></i></div>';
    html += '   <iframe src="index.php?route=account/login&popup=login" width="100%" height="100%" frameborder="0" onload="this.height = this.contentWindow.document.body.offsetHeight; $(this).prev(\'.journal-loading\').fadeOut();"></iframe>';
    html += '  </div>';
    html += '  </div>';
    html += ' </div>';
    html += ' <div class="popup-bg popup-bg-closable"></div>';
    html += '</div>';
    $('.popup-wrapper').remove();
    $('body').append(html);
    setTimeout(function() {
        $('html').addClass('popup-open popup-center');
    }, 10);
};
window['open_register_popup'] = function() {
    if ($('html').hasClass('iphone') || $('html').hasClass('ipad')) {
        iNoBounce.enable();
    }
    var html = '';
    html += '<div class="popup-wrapper popup-register">';
    html += ' <div class="popup-container">';
    html += '  <button class="btn popup-close"></button>';
    html += '  <div class="popup-body">';
    html += '  <div class="popup-inner-body">';
    html += '   <div class="journal-loading"><i class="fa fa-spinner fa-spin"></i></div>';
    html += '   <iframe src="index.php?route=account/register&popup=register" width="100%" height="100%" frameborder="0" onload="this.height = this.contentWindow.document.body.offsetHeight; $(this).prev(\'.journal-loading\').fadeOut();"></iframe>';
    html += '  </div>';
    html += '  </div>';
    html += ' </div>';
    html += ' <div class="popup-bg popup-bg-closable"></div>';
    html += '</div>';
    $('.popup-wrapper').remove();
    $('body').append(html);
    setTimeout(function() {
        $('html').addClass('popup-open popup-center');
    }, 10);
};
window['show_notification'] = function(opts) {
    opts = $.extend({
        position: 'center',
        className: '',
        title: '',
        image: '',
        message: '',
        buttons: [],
        timeout: Journal.notificationHideAfter
    }, opts);
    if ($('.notification-wrapper-' + opts.position).length === 0) {
        $('body').append('<div class="notification-wrapper notification-wrapper-' + opts.position + '"></div>');
    }
    var html = '';
    var buttons = $.map(opts.buttons, function(button) {
        return '<a class="' + button.className + '" href="' + button.href + '">' + button.name + '</a>';
    });
    html += '<div class="notification ' + opts.className + '">';
    html += ' <button class="btn notification-close"></button>';
    html += ' <div class="notification-content">';
    if (opts.image) {
        html += '  <img src="' + opts.image + '" srcset="' + opts.image + ' 1x, ' + opts.image2x + ' 2x">';
    }
    html += '  <div>';
    html += '   <div class="notification-title">' + opts.title + '</div>';
    html += '   <div class="notification-text">' + opts.message + '</div>';
    html += '  </div>';
    html += ' </div>';
    if (buttons && buttons.length) {
        html += '<div class="notification-buttons">' + buttons.join('\n') + '</div>';
    }
    html += '</div>';
    var $notification = $(html);
    $('.notification-wrapper-' + opts.position).append($notification);
    if (opts.timeout) {
        setTimeout(function() {
            $notification.find('.notification-close').trigger('click');
        }, opts.timeout);
    }
    return $notification;
};
window['loader'] = function(el, status) {
    var $el = $(el);
    if (status) {
        $el.attr('style', 'position: relative');
        $el.append('<div class="journal-loading-overlay"><div class="journal-loading"><i class="fa fa-spinner fa-spin"></i></div></div>');
    } else {
        $el.attr('style', '');
        $el.find('.journal-loading-overlay').remove();
    }
};
window['resize_iframe'] = function(module_id, height) {
    $('.module-popup-' + module_id + ' iframe').height(height);
};

function journal_enable_countdown() {
    $('.countdown').each(function() {
        var $this = $(this);
        if ($this.data('_isEnabled')) {
            return;
        }
        $this.data('_isEnabled', true);
        $this.countdown({
            date: $this.data('date'),
            render: function(data) {
                return $(this.el).html('<div>' + this.leadingZeros(data.days, 2) + ' <span>' + Journal['countdownDay'] + '</span></div>' + '<div>' + this.leadingZeros(data.hours, 2) + ' <span>' + Journal['countdownHour'] + '</span></div>' + '<div>' + this.leadingZeros(data.min, 2) + ' <span>' + Journal['countdownMin'] + '</span></div>' + '<div>' + this.leadingZeros(data.sec, 2) + ' <span>' + Journal['countdownSec'] + '</span></div>');
            }
        });
    });
}

function journal_enable_stepper() {
    $('.stepper').each(function() {
        var $this = $(this);
        if ($this.data('_isEnabled')) {
            return;
        }
        $this.data('_isEnabled', true);
        var $input = $this.find('input[name^="quantity"]');
        var value = $input.val();
        var minimum = parseInt($input.data('minimum')) || 1;
        $this.find('.fa-angle-up').on('click', function() {
            $input.val(parseInt($input.val()) + 1);
            $input.trigger('change');
        });
        $this.find('.fa-angle-down').on('click', function() {
            if (parseInt($input.val()) > minimum) {
                $input.val(parseInt($input.val()) - 1);
                $input.trigger('change');
            }
        });
        $input.on('keypress', function(e) {
            if ((e.which < 48 || e.which > 57) && [8].indexOf(e.which) === -1) {
                e.preventDefault();
            }
        });
        $input.on('keydown', function(e) {
            if (e.which === 38) {
                e.preventDefault();
                $input.val(parseInt($input.val()) + 1);
                $input.trigger('change');
            }
            if (e.which === 40) {
                e.preventDefault();
                if (parseInt($input.val()) > minimum) {
                    $input.val(parseInt($input.val()) - 1);
                    $input.trigger('change');
                }
            }
        });
        $input.on('blur', function() {
            if ((parseInt($input.val()) || 0) < minimum) {
                $input.val(value);
                $input.trigger('change');
            }
        });
    });
}
jQuery(function($) {
    var $html = $('html');
    var $body = $('body');
    var $content = $('#content');
    var $column_left = $('#column-left');
    var $column_right = $('#column-right');
    var $panel_group = $('.panel-group');
    var $main_products = $('.main-products');
    (function() {
        var lazyVideos = [].slice.call(document.querySelectorAll('.video-bg'));
        if ('IntersectionObserver' in window) {
            var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(video) {
                    if (video.isIntersecting) {
                        var source = document.createElement('source');
                        source.src = video.target.getAttribute('data-src');
                        video.target.appendChild(source);
                        video.target.load();
                        video.target.classList.remove('lazy');
                        lazyVideoObserver.unobserve(video.target);
                    }
                });
            });
            lazyVideos.forEach(function(lazyVideo) {
                lazyVideoObserver.observe(lazyVideo);
            });
        }
    })();
    $(document).on('show.bs.tooltip', function(e) {
        if ($html.hasClass('touchevents')) {
            e.preventDefault();
        }
        var $target = $(e.target);
        var cls = $target.data('tooltipClass');
        if (cls) {
            $target.data('bs.tooltip').$tip.addClass(cls);
        }
    });
    $(document).on('show.bs.popover', function(e) {
        if ($html.hasClass('touchevents')) {
            e.preventDefault();
        }
        var $target = $(e.target);
        var cls = $target.data('popoverClass');
        if (cls) {
            $target.data('bs.popover').$tip.addClass(cls);
        }
    });
    $(document).on('dp.show', function(e) {
        var $target = $(e.target);
        var cls = $target.data('pickerClass');
        if (cls) {
            $target.data('DateTimePicker').widget.addClass(cls);
        }
    });
    $(document).on('shown.bs.dropdown', function(e) {
        var $target = $(e.target);
        var $toggle = $target.find('> .dropdown-toggle');
        $toggle.addClass('disabled');
        $target.outerWidth();
        $target.addClass('animating');
    });
    $(document).on('hide.bs.dropdown', function(e) {
        var $target = $(e.target);
        var $toggle = $target.find('> .dropdown-toggle');
        $target.removeClass('animating');
        $toggle.removeClass('disabled');
    });
    if ('ontouchstart' in document) {
        $('.main-menu .dropdown .dropdown > .dropdown-toggle, .flyout-menu .dropdown .dropdown > .dropdown-toggle, .mini-search .search-categories-button').on('click', function(e) {
            var $this = $(this);
            var $parent = $this.parent();
            var isOpen = $parent.hasClass('open');
            var isLink = false;
            $parent.parent().find('.open').removeClass('open');
            if (isOpen) {
                if ($this.attr('href')) {
                    isLink = true;
                } else {
                    $parent.removeClass('open').trigger('hide.bs.dropdown');
                }
            } else {
                $parent.addClass('open').trigger('shown.bs.dropdown');
            }
            if (!isLink) {
                return false;
            }
        });
    } else {
        function mouseOver() {
            var $this = $(this);
            var $trigger = $('> .dropdown-toggle', this);
            clearTimeout(this.__timeout);
            $trigger.attr('aria-expanded', 'true').attr('data-toggle', '');
            $this.addClass('open');
            $this.outerWidth();
            $this.addClass('animating');
        }

        function mouseOut() {
            var $this = $(this);
            var $trigger = $('> .dropdown-toggle', this);
            $this.removeClass('animating');
            clearTimeout(this.__timeout);
            this.__timeout = setTimeout(function() {
                $this.removeClass('open');
                $trigger.attr('aria-expanded', 'false');
            }, 300);
        }
        $('.dropdown').each(function() {
            var $this = $(this);
            if ($this.is($('.search-page #search'))) {
                $('> .dropdown-toggle', this).on('click', function() {
                    var $this = $(this);
                    var $parent = $this.parent();
                    var isOpen = $parent.hasClass('open');
                    var isLink = false;
                    $parent.parent().find('.open').removeClass('open');
                    if (isOpen) {
                        if ($this.attr('href')) {
                            isLink = true;
                        } else {
                            $parent.removeClass('open').trigger('hide.bs.dropdown');
                        }
                    } else {
                        $parent.addClass('open').trigger('shown.bs.dropdown');
                    }
                    if (!isLink) {
                        return false;
                    }
                });
            } else if ($this.hasClass('main-menu-item')) {
                $this.hoverIntent(mouseOver, mouseOut);
            } else {
                $this.hover(mouseOver, mouseOut);
            }
        });
    }
    $panel_group.on('show.bs.collapse', function(e) {
        $(e.target).parent().addClass('panel-active');
        $(e.target).parent().removeClass('panel-collapsed');
    });
    $panel_group.on('hide.bs.collapse', function(e) {
        $(e.target).parent().removeClass('panel-active');
        $(e.target).parent().addClass('panel-collapsing');
    });
    $panel_group.on('hidden.bs.collapse', function(e) {
        $(e.target).parent().removeClass('panel-collapsing');
        $(e.target).parent().addClass('panel-collapsed');
    });
    $(document).delegate('.accordion-menu span[data-toggle="collapse"]', 'click', function(e) {
        e.preventDefault();
        $(this).closest('.menu-item').toggleClass('open');
    });
    $(document).delegate('.mobile .accordion-menu li > a', 'click', function(e) {
        var $this = $(this);
        var $trigger = $this.find('.open-menu');
        if (!$trigger.length) {
            return;
        }
        if ($trigger.attr('aria-expanded') === 'true' && $this.attr('href')) {
            return;
        }
        e.preventDefault();
        $($trigger.data('target')).collapse('toggle');
    });
    if (Journal['infiniteScrollStatus'] && $.ias && $main_products.length) {
        Journal.infiniteScrollInstance = $.ias({
            container: '.main-products',
            item: '.product-layout',
            pagination: '.pagination-results',
            next: '.pagination a.next'
        });
        Journal.infiniteScrollInstance.extension(new IASTriggerExtension({
            offset: parseInt(Journal['infiniteScrollOffset'], 10) || Infinity,
            text: Journal['infiniteScrollLoadNext'],
            textPrev: Journal['infiniteScrollLoadPrev'],
            htmlPrev: '<div class="ias-trigger ias-trigger-prev"><a class="btn">{text}</a></div>',
            html: '<div class="ias-trigger ias-trigger-next"><a class="btn">{text}</a></div>'
        }));
        Journal.infiniteScrollInstance.extension(new IASSpinnerExtension({
            html: '<div class="ias-spinner"><i class="fa fa-spinner fa-spin"></i></div>'
        }));
        Journal.infiniteScrollInstance.extension(new IASNoneLeftExtension({
            text: Journal['infiniteScrollNoneLeft']
        }));
        Journal.infiniteScrollInstance.extension(new IASPagingExtension());
        Journal.infiniteScrollInstance.extension(new IASHistoryExtension({
            prev: '.pagination a.prev'
        }));
        Journal.infiniteScrollInstance.on('loaded', function(data) {
            $('.pagination-results').html($(data).find('.pagination-results'));
        });
        Journal.infiniteScrollInstance.on('rendered', function(data) {
            journal_enable_countdown();
            journal_enable_stepper();
        });
    }
    $('.revolution').each(function() {
        var $this = $(this);
        var $img = $('>img', this);
        $this.css('height', $img.height());
        var options = $.extend(true, {
            spinner: 'off',
            sliderType: 'standard',
            sliderLayout: 'auto',
            autoHeight: 'on',
            navigation: {
                arrows: {
                    enable: true
                }
            }
        }, $this.data('options'));
        var $slider = $('.rev_slider', this).revolution(options);
        $slider.on('revolution.slide.onloaded', function() {
            $img.remove();
            $this.removeClass('rev_hide_navigation');
            $this.find('.tp-caption-hotspot').popover({
                container: 'body',
                trigger: 'hover',
                html: true,
                template: '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>'
            });
        });
        $slider.on('revolution.slide.onchange', function() {
            $this.removeAttr('style');
        });
        $this.data('slider', $slider);
    });
    $('.layerslider').each(function() {
        var $this = $(this);
        var $img = $('>img', this);
        $this.css({
            width: $this.width(),
            height: $this.height()
        });
        var options = $.extend(true, {
            sliderVersion: '6.1.0',
            skin: 'v6',
            maxRatio: 1,
            navStartStop: false,
            showCircleTimer: false,
            tnContainerWidth: '100%',
            skinsPath: 'catalog/view/theme/journal3/lib/layerslider/skins/'
        }, $this.data('options'));
        $this.on('sliderDidLoad', function() {
            $img.remove();
        });
        var $slider = $this.layerSlider(options);
        $slider.on('slideTimelineDidCreate', function() {
            $this.find('.ls-layer-hotspot').each(function() {
                var $this = $(this);
                if (!$this.data('bs.popover')) {
                    $this.popover({
                        container: 'body',
                        trigger: 'hover',
                        html: true,
                        template: '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>'
                    });
                }
            });
        });
    });
    $('.master-slider').each(function() {
        var $this = $(this);
        var options = $.extend(true, {
            loop: true,
            mobileBGVideo: true
        }, $this.data('options'));
        var $slider = $this.masterslider(options);
        var $img = $('>img', $(this).parent());
        $slider.masterslider('slider').api.addEventListener(MSSliderEvent.INIT, function() {
            $slider.parent().find('.journal-loading').remove();
            $img.css({
                position: 'absolute',
                'z-index': -1
            });
            setTimeout(function() {
                $img.remove();
                $this.parent().css('background-image', 'none');
            }, 1500);
        });
        $slider.masterslider('slider').api.addEventListener(MSSliderEvent.CHANGE_START, function() {
            $this.find('video').each(function() {
                $(this)[0].pause();
            });
        });
        if ($this.data('parallax')) {
            MSScrollParallax.setup($slider.masterslider('slider'), 0, $this.data('parallax'), false);
        }
    });
    $('.isotope').each(function() {
        var $this = $(this);
        var filter = $this.find('ul .active a').attr('data-filter') || null;
        var $isotope = $this.find('.isotope-grid').isotope({
            itemSelector: '.isotope-item',
            filter: filter
        });
        $this.find('ul a').on('click', function() {
            var $this2 = $(this);
            $this.find('ul li').removeClass('active');
            $this2.closest('li').addClass('active');
            $isotope.isotope({
                filter: $this2.attr('data-filter')
            });
        });
    });
    $('.swiper').each(function() {
        var $this = $(this);
        var c = 'c0';
        if ($content.has($this).length) {
            c = 'c' + window['Journal']['columnsCount'];
        } else if ($column_left.has($this).length || $column_right.has($this).length) {
            c = 'sc';
        }
        var itemsPerRow = $this.data('items-per-row') ? $this.data('items-per-row')[c] : {
            0: {
                items: 1,
                spacing: 0
            }
        };
        var breakpoints = {};
        $.each(itemsPerRow, function(v, k) {
            breakpoints[v] = {
                slidesPerView: parseInt(k.items, 10),
                slidesPerGroup: parseInt(k.items, 10),
                spaceBetween: parseInt(k.spacing, 10)
            }
        });
        var options = $.extend({
            init: false,
            slidesPerView: parseInt(itemsPerRow[0].items, 10),
            slidesPerGroup: parseInt(itemsPerRow[0].items, 10),
            spaceBetween: parseInt(itemsPerRow[0].spacing, 10),
            breakpoints: breakpoints,
            observer: true,
            observeParents: true,
            paginationClickable: true,
            preventClicks: false,
            preventClicksPropagation: false,
            simulateTouch: true,
            watchSlidesProgress: true,
            watchSlidesVisibility: true,
            navigation: {
                nextEl: $this.find('.swiper-button-next'),
                prevEl: $this.find('.swiper-button-prev')
            },
            pagination: {
                el: $this.find('.swiper-pagination'),
                type: 'bullets',
                clickable: true
            },
            scrollbar: $this.find('.swiper-scrollbar'),
            scrollbarHide: false,
            scrollbarDraggable: true
        }, $this.data('options'));
        var swiper = new Swiper($('.swiper-container', this), options);

        function checkPages() {
            if ($('.product-image').hasClass('direction-vertical') && $this.hasClass('additional-images')) {
                var height = Journal['isPopup'] ? Journal['quickviewPageStyleAdditionalImagesHeightAdjustment'] : Journal['productPageStyleAdditionalImagesHeightAdjustment'];
                var interval = setInterval(function() {
                    var imageHeight = $('.main-image .swiper-slide-visible img').outerHeight();
                    if (imageHeight) {
                        $this.css('height', imageHeight + (parseInt(height, 10) || 0));
                        swiper.update();
                        clearInterval(interval);
                        $('.product-image').addClass('additional-images-loaded');
                    }
                }, 1000);
            }
            if (swiper.isBeginning && swiper.isEnd) {
                $this.removeClass('swiper-has-pages');
            } else {
                $this.addClass('swiper-has-pages');
            }
        }
        swiper.on('init', checkPages);
        swiper.on('resize', checkPages);
        swiper.init();
        if (options.autoplay) {
            if (options.pauseOnHover) {
                $('.swiper-container', this).hover(function() {
                    swiper.autoplay.stop();
                }, function() {
                    swiper.autoplay.start();
                });
            }
            swiper.on('observerUpdate', function() {
                var visible = $(swiper.$el).is(':visible');
                var running = swiper.autoplay.running;
                if (visible && !running) {
                    swiper.autoplay.start();
                }
                if (!visible && running) {
                    swiper.autoplay.stop();
                }
            });
        }
        $this.data('swiper', swiper);
    });
    $(document).delegate('[data-gallery]', 'click', function() {
        var $this = $(this);
        var $gallery = $($this.data('gallery'));
        var index = parseInt($this.data('index'), 10) || 0;
        if ($gallery.data('lightGallery')) {
            $gallery.data('lightGallery').s.index = index;
        }
        $gallery.lightGallery($.extend({
            dynamic: true,
            dynamicEl: $gallery.data('images'),
            index: index,
            download: false,
            loadYoutubeThumbnail: false,
            loadVimeoThumbnail: false,
            share: false,
            pager: false,
            fullScreen: false,
            autoplay: false,
            autoplayControls: false,
            thumbWidth: 100,
            thumbContHeight: 100,
            thumbMargin: 0,
            showThumbByDefault: true,
            hash: false
        }, $gallery.data('options')));
        $gallery.on('onAfterOpen.lg', function() {
            $('.lg-backdrop').addClass($gallery.data('lightGallery').s.addClass);
        });
        return false;
    });
    $('.module-catalog.image-on-hover .subitem').hover(function() {
        var $this = $(this);
        var $img = $this.closest('.item-content').find('.catalog-image img');
        if ($img.length) {
            $img[0]._src = $img.attr('src');
            $img[0]._srcSet = $img.attr('srcset');
            $img.attr('src', $this.data('image'));
            $img.attr('srcset', $this.data('image2x'));
        }
    }, function() {
        var $this = $(this);
        var $img = $this.closest('.item-content').find('.catalog-image img');
        if ($img.length) {
            $img.attr('src', $img[0]._src);
            $img.attr('srcset', $img[0]._srcSet);
        }
    });
    $('.block-expand').on('click', function() {
        $(this).closest('.expand-block').find('.expand-content').toggleClass('block-expanded');
    });
    $('.search-input').focus(function() {
        $(this).closest('.header-search').addClass('focused');
    }).blur(function() {
        $(this).closest('.header-search').removeClass('focused');
    });
    journal_enable_stepper();
    journal_enable_countdown();
    $('.module-blog_search').each(function() {
        var $this = $(this);
        var $input = $this.find('input');
        var $button = $this.find('button');
        $button.on('click', function() {
            var search = $input.val().trim();
            if (search) {
                parent.window.location = $this.data('url') + encodeURIComponent(search);
            }
        });
        $input.on('keydown', function(e) {
            if (e.keyCode === 13) {
                var search = $input.val().trim();
                if (search) {
                    parent.window.location = $this.data('url') + encodeURIComponent(search);
                }
            }
        });
    });
    $(document).delegate('.module-newsletter .btn-primary', 'click', function(e) {
        e.preventDefault();
        var $this = $(this);
        var $form = $this.closest('form');

        function ajax(unsubscribe) {
            $.ajax({
                url: $form.attr('action') + (unsubscribe ? '&unsubscribe=1' : ''),
                type: 'post',
                dataType: 'json',
                data: $form.serialize(),
                beforeSend: function() {
                    $this.button('loading');
                },
                complete: function() {
                    $this.button('reset');
                },
                success: function(json) {
                    if (json.status === 'success') {
                        if (json.response.unsubscribe) {
                            if (confirm(json.response.message)) {
                                ajax(true);
                            }
                        } else {
                            alert(json.response.message);
                        }
                    } else {
                        alert(json.response);
                    }
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    alert(thrownError + '\r\n' + xhr.statusText + '\r\n' + xhr.responseText);
                }
            })
        }
        ajax();
    });
    $('.module-header_notice').each(function() {
        var $this = $(this);
        var options = $this.data('options');
        var cookie = 'hn-' + options['cookie'];
        if (!Cookies.get(cookie)) {
            $this.slideDown();
        }
        $this.find('.header-notice-close-button button').on('click', function() {
            anime({
                targets: $this[0],
                height: 0,
                duration: parseInt(options['duration']),
                easing: options['ease'],
                complete: function() {
                    $this.remove();
                }
            });
            Cookies.set(cookie, '1', {
                expires: 365
            });
        });
    });
    $('.module-layout_notice').each(function() {
        var $this = $(this);
        var options = $this.data('options');
        var cookie = 'ln-' + options['cookie'];
        if (!Cookies.get(cookie)) {
            $this.slideDown();
        }
        $this.find('.layout-notice-close-button button').on('click', function() {
            anime({
                targets: $this[0],
                height: 0,
                duration: parseInt(options['duration']),
                easing: options['ease'],
                complete: function() {
                    $this.remove();
                }
            });
            Cookies.set(cookie, '1', {
                expires: 365
            });
        });
    });
    $('.module-notification').each(function() {
        var $this = $(this);
        var options = $this.data('options');
        var cookie = 'n-' + options['cookie'];
        if (!Cookies.get(cookie)) {
            $this.find('.notification-close').on('click', function() {
                Cookies.set(cookie, '1', {
                    expires: 365
                });
            });
        }
    });
    $(document).delegate('.notification-close', 'click', function() {
        var $this = $(this);
        var height = $this.parent().outerHeight();
        $this.parent().next('div').css('margin-top', -height);
        $('.removed').removeClass('removed');
        $this.parent().addClass('fade-out').on('transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd', function() {
            $(this).next('div').addClass('removed').css('margin-top', '');
            $(this).remove();
        });
    });
    $('.module-popup').each(function() {
        var $this = $(this);
        var options = $.extend({
            message: $this.html(),
            timeout: 0
        }, $this.data('options'));
        var cookie = 'p-' + options['cookie'];
        if (!Cookies.get(cookie)) {
            setTimeout(function() {
                $('html').addClass('popup-open popup-center');
                var $checkbox = $this.find('.popup-dont-show input[type="checkbox"]');
                $checkbox.on('change', function() {
                    if ($(this).is(':checked')) {
                        Cookies.set(cookie, '1', {
                            expires: 365
                        });
                    } else {
                        Cookies.remove(cookie);
                    }
                });
                if ($checkbox.is(':checked')) {
                    Cookies.set(cookie, '1', {
                        expires: 365
                    });
                }
            }, parseInt(options['showAfter'], 10) || 1);
        }
        var hideAfter = parseInt(options['hideAfter'], 10) || 0;
        if (hideAfter) {
            setTimeout(function() {
                $html.removeClass('popup-open popup-center');
                if ($html.hasClass('iphone') || $html.hasClass('ipad')) {
                    iNoBounce.disable();
                }
                $('.popup-wrapper').attr('removing', true);
                setTimeout(function() {
                    if ($('.popup-wrapper').attr('removing')) {
                        $('.popup-wrapper').remove();
                    }
                }, 5000);
            }, hideAfter);
        }
    });
    $(document).delegate('.popup-close, .popup-bg-closable, .btn-popup:not([href])', 'click', function() {
        $html.removeClass('popup-open popup-center');
        if ($html.hasClass('iphone') || $html.hasClass('ipad')) {
            iNoBounce.disable();
        }
        $('.popup-wrapper').attr('removing', true);
        setTimeout(function() {
            if ($('.popup-wrapper').attr('removing')) {
                $('.popup-wrapper').remove();
            }
        }, 5000);
    });
    $(document).on('keydown', function(e) {
        if (e.keyCode === 27) {
            parent.$('.popup-bg-closable').trigger('click');
        }
    });
    $(document).delegate('html.popup-login .login-form button, html.popup-register .register-form .buttons button', 'click', function(e) {
        e.preventDefault();
        var $this = $(this);
        var $form = $this.closest('form');
        $form.find('.has-error').removeClass('has-error');
        $form.find('.text-danger').remove();
        $.ajax({
            url: $form.attr('action'),
            type: 'post',
            data: $form.serialize(),
            dataType: 'json',
            beforeSend: function() {
                $this.button('loading');
            },
            complete: function() {
                $this.button('reset');
            },
            success: function(json) {
                if (json.status === 'success') {
                    if ($form.hasClass('login-form')) {
                        if (parent.$('html').hasClass('route-account-logout')) {
                            parent.window.location = $('base').attr('href');
                        } else {
                            parent.window.location.reload();
                        }
                    } else {
                        if (json.customer) {
                            parent.window.location = $('base').attr('href');
                        } else {
                            parent.window.location = 'index.php?route=account/success';
                        }
                    }
                } else {
                    $.each(json.response, function(field, value) {
                        if (field === 'custom_field') {
                            $.each(value, function(key, val) {
                                $('#custom-field' + key).addClass('has-error').find('input').after('<div class="text-danger">' + val + '</div>');
                            });
                        } else {
                            $form.find('[name="' + field + '"]').closest('.form-group').addClass('has-error').after('<div class="text-danger">' + value + '</div>');
                        }
                    });
                    if (json.response.warning) {
                        alert(json.response.warning);
                    }
                }
            }
        });
    });
    $('.module-form').each(function() {
        if ($.fn.datetimepicker) {
            $('.date', this).datetimepicker({
                pickTime: false
            });
            $('.datetime', this).datetimepicker({
                pickDate: true,
                pickTime: true
            });
            $('.time', this).datetimepicker({
                pickDate: false
            });
        }
    });
    $(document).delegate('.btn-extra', 'click', function() {
        parent.window.__popup_url = $(this).data('product_url') || '';
    });
    $(document).delegate('.module-form .btn-primary', 'click', function(e) {
        e.preventDefault();
        var $this = $(this);
        var $form = $this.closest('.module-form').find('form');
        $form.find('.has-error').removeClass('has-error');
        var data = $form.serializeArray();
        data.push({
            name: 'url',
            value: parent.window.__popup_url || parent.window.location.toString()
        });
        $.ajax({
            url: $form.attr('action'),
            type: 'post',
            data: data,
            dataType: 'json',
            beforeSend: function() {
                $this.button('loading');
            },
            complete: function() {
                $this.button('reset');
            },
            success: function(response) {
                if (response.status === 'success') {
                    alert(response.response.message);
                    $form[0].reset();
                    parent.window.__popup_url = undefined;
                    parent.$('.module-popup-' + Journal['modulePopupId'] + ' .popup-close').trigger('click');
                }
                if (response.status === 'error') {
                    $.each(response.response.errors, function(field, error) {
                        if (field === 'agree') {
                            alert(error);
                        } else if (field === 'captcha') {
                            $form.find('.captcha').addClass('has-error');
                        } else {
                            $form.find('[name^="' + field + '"]').closest('.form-group').addClass('has-error');
                        }
                    });
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(thrownError + '\r\n' + xhr.statusText + '\r\n' + xhr.responseText);
            }
        });
    });
    $(document).delegate('.grid-list .view-btn', 'click', function() {
        var $this = $(this);
        var $products = $('.main-products');
        var view = $this.data('view');
        var current = $products.hasClass('product-grid') ? 'grid' : 'list';
        $this.tooltip('hide');
        if (view !== current) {
            $products.addClass('no-transitions').removeClass('product-' + current).addClass('product-' + view);
            setTimeout(function() {
                $products.removeClass('no-transitions');
            }, 1);
            Cookies.set('view', view, {
                expires: 365
            });
        }
        $('.grid-list .view-btn').removeClass('active');
        $this.addClass('active');
    });
    $('.desktop-main-menu-wrapper #main-menu > .j-menu > .main-menu-item').first().addClass('first-dropdown');
    var $desktop_main_menu_wrapper = $('.desktop-main-menu-wrapper');
    $desktop_main_menu_wrapper.delegate('.main-menu > .j-menu > .menu-item:not(.dropdown)', 'mouseover', function() {
        $body.addClass('menu-hover');
    });
    $desktop_main_menu_wrapper.delegate('.main-menu > .j-menu > .menu-item:not(.dropdown)', 'mouseleave', function() {
        $body.removeClass('menu-hover');
    });
    $desktop_main_menu_wrapper.delegate('.main-menu > .j-menu > .dropdown', 'mouseover', function() {
        $body.addClass('menu-open');
    });
    $desktop_main_menu_wrapper.delegate('.main-menu', 'mouseleave', function() {
        $body.removeClass('menu-open');
    });
    if (($html.hasClass('iphone') || $html.hasClass('ipad')) && !$html.hasClass('popup-open')) {
        iNoBounce.disable();
    }
    $(document).delegate('.menu-trigger', 'click', function(e) {
        e.stopPropagation();
        $html.addClass('mobile-overlay mobile-main-menu-container-open');
        if ($html.hasClass('mobile-menu-active')) {
            $('[data-is-open]').each(function() {
                $('> a > .open-menu', this).trigger('click');
                $(this).removeAttr('data-is-open');
            });
        }
        var $container = $('.mobile-main-menu-container');
        $container.outerWidth();
        $container.addClass('animating');
        if ($html.hasClass('iphone') || $html.hasClass('ipad')) {
            iNoBounce.enable();
        }
    });
    if ($html.hasClass('mobile-header-active')) {
        $('.cart-content > ul').appendTo('.mobile-cart-content-wrapper');
    }
    $(document).delegate('.mobile-header-active .cart-heading', 'click', function(e) {
        e.stopPropagation();
        $html.addClass('mobile-overlay mobile-cart-content-container-open');
        var $totals = $('.cart-totals').outerHeight();
        $('.cart-products').css('padding-bottom', $totals - 1);
        var $container = $('.mobile-cart-content-container');
        $container.outerWidth();
        $container.addClass('animating');
        if ($html.hasClass('iphone') || $html.hasClass('ipad')) {
            iNoBounce.enable();
        }
        return false;
    });
    if (Journal['isPhone'] || (Journal['isTablet'] && (!Journal['globalPageColumnLeftTabletStatus'] || !Journal['globalPageColumnLeftTabletStatus']))) {
        if ($('.module-filter').length) {
            $('.module-filter h3 > *').prependTo('.mobile-filter-container .mobile-wrapper-header');
            $('.module-filter').appendTo('.mobile-filter-wrapper');
            $('<a class="mobile-filter-trigger btn">' + Journal['mobileFilterButtonText'] + '</a>').appendTo('body');
        }
    }
    $(document).delegate('.mobile-header-active .mobile-filter-trigger', 'click', function(e) {
        e.stopPropagation();
        $html.addClass('mobile-overlay mobile-filter-container-open');
        var $container = $('.mobile-filter-container');
        $container.outerWidth();
        $container.addClass('animating');
        if ($html.hasClass('iphone') || $html.hasClass('ipad')) {
            iNoBounce.enable();
        }
        return false;
    });
    $(document).delegate('.x, .site-wrapper, .close-filter', 'click', function() {
        $('.mobile-container.animating').removeClass('animating');
        $html.removeClass('mobile-overlay');
        setTimeout(function() {
            $html.removeClass('mobile-main-menu-container-open mobile-cart-content-container-open mobile-filter-container-open');
        }, 300);
        if ($html.hasClass('iphone') || $html.hasClass('ipad')) {
            iNoBounce.disable();
        }
    });
    if ($html.hasClass('route-product-product')) {
        $(document).delegate('.additional-image', 'click', function() {
            $('.additional-image').removeClass('swiper-slide-active');
            $(this).addClass('swiper-slide-active');
            $('.main-image').data('swiper').slideTo($(this).data('index'), 0);
        });
        if (!('ontouchstart' in document)) {
            if (Journal['isPopup'] ? Journal['quickviewPageStyleCloudZoomStatus'] : Journal['productPageStyleCloudZoomStatus']) {
                $('.main-image img').each(function() {
                    var $this = $(this);
                    $this.ImageZoom({
                        type: Journal['isPopup'] ? Journal['quickviewPageStyleCloudZoomPosition'] : Journal['productPageStyleCloudZoomPosition'],
                        showDescription: false,
                        offset: [0, 0],
                        zoomSize: [$this.width(), $this.height()],
                        bigImageSrc: $this.data('largeimg')
                    });
                });
                $('.product-image').mouseover(function() {
                    $('.zm-viewer').delay(200).queue(function(next) {
                        $(this).css('opacity', '1');
                        next();
                    });
                }).mouseleave(function() {
                    $('.zm-viewer').css('opacity', '0');
                });
            }
        }
        if ((Journal['isPopup'] ? Journal['quickviewPageStyleOptionsSelect'] : Journal['productPageStyleOptionsSelect']) === 'all') {
            $('.product-options .form-group .radio:first-child input, .product-options .form-group .checkbox:first-child input').prop('checked', true);
            $('.product-options .form-group select').each(function() {
                $(this).find('option').eq(1).prop('selected', true);
            });
        }
        if ((Journal['isPopup'] ? Journal['quickviewPageStyleOptionsSelect'] : Journal['productPageStyleOptionsSelect']) === 'required') {
            $('.product-options .form-group.required .radio:first-child input, .product-options .form-group.required .checkbox:first-child input').prop('checked', true);
            $('.product-options .form-group.required select').each(function() {
                $(this).find('option').eq(1).prop('selected', true);
            });
        }
        if (Journal['isPopup'] ? Journal['quickviewPageStylePriceUpdate'] : Journal['productPageStylePriceUpdate']) {
            function autoUpdatePrice() {
                $.ajax({
                    url: 'index.php?route=journal3/price',
                    type: 'post',
                    data: $('#product-id, #product-quantity, #product input[type="radio"]:checked, #product input[type="checkbox"]:checked, #product select'),
                    dataType: 'json',
                    beforeSend: function() {
                        $('#button-cart').button('loading');
                    },
                    complete: function() {
                        $('#button-cart').button('reset');
                    },
                    success: function(json) {
                        if (json['response']['status'] === 'error') {
                            alert(json['response']['message']);
                        } else {
                            if (json['response']['tax']) {
                                $('.product-tax').html(json['response']['tax']);
                            }
                            if (json['response']['price']) {
                                if (json['response']['special']) {
                                    $('.product-price-group .product-price-old').html(json['response']['price']);
                                    $('.product-price-group .product-price-new').html(json['response']['special']);
                                } else {
                                    $('.product-price-group .product-price').html(json['response']['price']);
                                }
                            }
                            if (json['response']['discounts']) {
                                $('.product-discount').each(function(index) {
                                    $(this).html(json['response']['discounts'][index]);
                                });
                            }
                            if (json['response']['weight']) {
                                $('.product-stats .product-weight span').html(json['response']['weight']);
                            }
                        }
                    }
                });
            }
            $('.product-options input[type="radio"], .product-options input[type="checkbox"], .product-options select, #product-quantity').on('change', autoUpdatePrice);
            autoUpdatePrice();
        }
    }
    if ($html.hasClass('route-journal3-popup-page')) {
        $(document).on('click', function() {
            parent.resize_iframe(Journal['popupModuleId'], $('.popup-content').height());
        });
    }
    $('.links-menu .module-title').addClass('closed');
    $('.links-menu .module-title').click(function() {
        $(this).toggleClass('closed');
    });
    if (Journal.isPopup) {
        $('a[href]').each(function() {
            var $this = $(this);
            if (!$this.attr('target')) {
                $this.attr('target', '_blank');
            }
            if (Journal.isPhone || Journal.isTablet) {
                $this.removeClass('agree');
            }
        });
    }
});
$(window).on('load', function() {
    var $html = $('html');
    var $body = $('body');
    var $search = $('#search').find('input[name=\'search\']');
    $('.search-button').on('click', function() {
        var url = $(this).data('search-url');
        var value = $search.val();
        var category_id = parseInt($search.attr('data-category_id'));
        if (value) {
            url += encodeURIComponent(value);
        }
        if (Journal['searchStyleSearchAutoSuggestDescription']) {
            url += '&description=true';
        }
        if (category_id) {
            url += '&category_id=' + category_id;
        }
        location = url;
    });
    $search.on('keydown', function(e) {
        if (e.keyCode === 13) {
            $('.search-button').trigger('click');
        }
    });
    $('.search-categories li').on('click', function(e) {
        e.stopPropagation();
        var $this = $(this);
        $('.search-categories-button').html($this.html());
        $search.attr('data-category_id', $this.attr('data-category_id'))
    });
    if (Journal['searchStyleSearchAutoSuggestStatus']) {
        $search.typeahead({
            hint: true,
            minLength: 1,
            autoSelect: true
        }, {
            async: true,
            display: 'name',
            limit: Infinity,
            source: function(query, processSync, processAsync) {
                var data = {
                    search: query
                };
                var category_id = parseInt($search.attr('data-category_id'));
                if (category_id) {
                    data.category_id = category_id;
                }
                return $.ajax({
                    url: 'index.php?route=journal3/search',
                    data: data,
                    dataType: 'json',
                    success: function(json) {
                        return processAsync(json['response']);
                    }
                });
            },
            templates: {
                suggestion: function(data) {
                    if (data['view_more']) {
                        return '<div class="search-result view-more"><a href="' + data['href'] + '">' + data['name'] + '</a></div>';
                    }
                    if (data['no_results']) {
                        return '<div class="search-result no-results"><a>' + data['name'] + '</a></div>';
                    }
                    var html = '';
                    html += '<div class="search-result"><a href="' + data['href'] + '">';
                    if (data['thumb']) {
                        html += '<img src="' + data['thumb'] + '" srcset="' + data['thumb'] + ' 1x, ' + data['thumb2'] + ' 2x" />';
                    }
                    var classes = [];
                    if (data['quantity'] <= 0) {
                        classes.push('out-of-stock');
                    }
                    if (!data['price_value']) {
                        classes.push('has-zero-price');
                    }
                    html += '<span class="' + classes.join(' ') + '">';
                    html += '<span class="product-name">' + data['name'] + '</span>';
                    if (data['price']) {
                        if (data['special']) {
                            html += '<span><span class="price-old">' + data['price'] + '</span><span class="price-new">' + data['special'] + '</span></span>';
                        } else {
                            html += '<span class="price">' + data['price'] + '</span>';
                        }
                    }
                    html += '</span>';
                    html += '</a></div>';
                    return html;
                }
            }
        });
        $('.header-search > span > div').addClass('.tt-empty');
        $('.mobile .tt-menu').on('click', function(e) {
            e.stopPropagation();
        });
    }
    if (!Journal.isPopup && Journal['isDesktop'] && Journal['stickyStatus'] && (['classic', 'mega', 'default'].includes(Journal['headerType']))) {
        var holder = document.body;
        var headerHeightOffset = $('.desktop-main-menu-wrapper').offset().top + (parseInt(Journal['stickyAt'], 10) || 100);
        var menuHeight = $('.desktop-main-menu-wrapper').outerHeight();

        function enableSticky() {
            if (Journal['headerType'] === 'classic' || Journal['headerType'] === 'mega') {
                $body.css('padding-top', menuHeight);
            }
        }

        function disableSticky() {
            if (Journal['headerType'] === 'classic' || Journal['headerType'] === 'mega') {
                $body.css('padding-top', '');
            }
        }

        function checkStickyOffset() {
            return headerHeightOffset <= window.scrollY;
        }

        function checkSticky() {
            var old = holder.classList.contains('is-sticky');
            holder.classList.toggle('is-sticky', checkStickyOffset());
            var current = holder.classList.contains('is-sticky');
            if (current !== old) {
                if (current) {
                    enableSticky();
                } else {
                    disableSticky();
                }
            }
        }

        function checkStickyListener() {
            requestAnimationFrame(checkSticky)
        }
        window.addEventListener('scroll', checkStickyListener, false);
    }
    if (!Journal.isPopup && Journal['isDesktop'] && Journal['stickyStatus'] && Journal['topBarStatus'] && (['compact', 'slim'].includes(Journal['headerType']))) {
        var compact = $('.mid-bar');
        if (compact.length) {
            $(window).on('scroll', function() {
                var compactOffset = compact.offset().top;
                var scroll = $(this)[0].scrollY
                if (scroll >= compactOffset) {
                    $('body').addClass('sticky-compact');
                } else {
                    $('body').removeClass('sticky-compact');
                }
            });
        }
    }
    if (!Journal.isPopup && Journal['isDesktop'] && Journal['stickyStatus'] && !Journal['topBarStatus'] && !Journal['stickyFullHomePadding'] && (['compact', 'slim'].includes(Journal['headerType']))) {
        var site = $('.site-wrapper');
        var header = $('.mid-bar').outerHeight();
        if (site.length) {
            $(window).on('scroll', function() {
                var siteOffset = site.offset().top - header + 1;
                var scroll = $(this)[0].scrollY
                if (scroll >= siteOffset) {
                    $('body').addClass('sticky-compact');
                } else {
                    $('body').removeClass('sticky-compact');
                }
            });
        }
    }
    if (!Journal.isPopup && Journal['isDesktop'] && Journal['stickyStatus'] && !Journal['topBarStatus'] && Journal['stickyFullHomePadding'] && (['compact', 'slim'].includes(Journal['headerType']))) {
        var site = $('.site-wrapper');
        var header = $('html:not(.route-common-home) .mid-bar').outerHeight();
        if (site.length) {
            $(window).on('scroll', function() {
                var siteOffset = site.offset().top - header + 1;
                var scroll = $(this)[0].scrollY
                if (scroll >= siteOffset) {
                    $('body').addClass('sticky-compact');
                } else {
                    $('body').removeClass('sticky-compact');
                }
            });
        }
    }
    if (!Journal['isDesktop'] && Journal['headerMobileStickyStatus'] && $html.hasClass('mobile-header-active')) {
        var mobileBar = $('.mobile-header .sticky-bar');
        if (mobileBar.length) {
            var mobileBarSticky = mobileBar.offset().top;
            var mobileBarHeight = mobileBar.outerHeight();
            $(window).on('scroll', function() {
                var scroll = $(this)[0].scrollY
                if (scroll >= mobileBarSticky) {
                    mobileBar.addClass('mobile-bar-sticky');
                    $body.css('padding-top', mobileBarHeight);
                } else {
                    mobileBar.removeClass('mobile-bar-sticky');
                    $body.css('padding-top', '');
                }
            });
        }
    }
    if (Journal['isDesktop'] && (Journal['headerMiniSearchDisplay'] === 'page')) {
        $('.search-trigger, .desktop .search-categories .j-menu > li > a').click(function() {
            $('.header-search input').focus();
        });
    }
    if (Journal['scrollTop']) {
        var scrollTopTimeout;
        $(window).on('scroll', function() {
            clearTimeout(scrollTopTimeout);
            var scroll = $(this)[0].scrollY
            if (scroll > 500) {
                $('.scroll-top').addClass('scroll-top-active');
                scrollTopTimeout = setTimeout(function() {
                    $('.scroll-top').removeClass('scroll-top-active');
                }, 3000);
            } else {
                $('.scroll-top').removeClass('scroll-top-active');
            }
        });
        $('.scroll-top').click(function() {
            anime({
                targets: 'html, body',
                scrollTop: 0,
                duration: 750,
                easing: 'easeInOutQuad'
            });
        });
    }
    if ($html.hasClass('footer-reveal')) {
        var footerHeight = $('.desktop.footer-reveal footer').outerHeight();
        $('.desktop body').css('padding-bottom', footerHeight);
    }
});
$('.block-map iframe').on('load', function() {
    $('.block-map .journal-loading').hide();
});
