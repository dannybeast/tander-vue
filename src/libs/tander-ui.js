!(function(t, e) {
  for (var n in e) t[n] = e[n];
})(
  exports,
  (function(t) {
    var e = {};
    function n(r) {
      if (e[r]) return e[r].exports;
      var o = (e[r] = { i: r, l: !1, exports: {} });
      return t[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
    }
    return (
      (n.m = t),
      (n.c = e),
      (n.d = function(t, e, r) {
        n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r });
      }),
      (n.r = function(t) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      }),
      (n.t = function(t, e) {
        if ((1 & e && (t = n(t)), 8 & e)) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var r = Object.create(null);
        if (
          (n.r(r),
          Object.defineProperty(r, "default", { enumerable: !0, value: t }),
          2 & e && "string" != typeof t)
        )
          for (var o in t)
            n.d(
              r,
              o,
              function(e) {
                return t[e];
              }.bind(null, o)
            );
        return r;
      }),
      (n.n = function(t) {
        var e =
          t && t.__esModule
            ? function() {
                return t.default;
              }
            : function() {
                return t;
              };
        return n.d(e, "a", e), e;
      }),
      (n.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }),
      (n.p = ""),
      n((n.s = 8))
    );
  })([
    function(t, e, n) {
      var r = n(3),
        o = n(5);
      "string" == typeof (o = o.__esModule ? o.default : o) &&
        (o = [[t.i, o, ""]]);
      var i = { insert: "head", singleton: !1 };
      r(o, i);
      t.exports = o.locals || {};
    },
    function(t, e, n) {
      var r = n(3),
        o = n(7);
      "string" == typeof (o = o.__esModule ? o.default : o) &&
        (o = [[t.i, o, ""]]);
      var i = { insert: "head", singleton: !1 };
      r(o, i);
      t.exports = o.locals || {};
    },
    function(t, e, n) {
      "use strict";
      t.exports = function(t) {
        var e = [];
        return (
          (e.toString = function() {
            return this.map(function(e) {
              var n = (function(t, e) {
                var n = t[1] || "",
                  r = t[3];
                if (!r) return n;
                if (e && "function" == typeof btoa) {
                  var o =
                      ((a = r),
                      (s = btoa(
                        unescape(encodeURIComponent(JSON.stringify(a)))
                      )),
                      (c = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(
                        s
                      )),
                      "/*# ".concat(c, " */")),
                    i = r.sources.map(function(t) {
                      return "/*# sourceURL="
                        .concat(r.sourceRoot || "")
                        .concat(t, " */");
                    });
                  return [n]
                    .concat(i)
                    .concat([o])
                    .join("\n");
                }
                var a, s, c;
                return [n].join("\n");
              })(e, t);
              return e[2] ? "@media ".concat(e[2], " {").concat(n, "}") : n;
            }).join("");
          }),
          (e.i = function(t, n, r) {
            "string" == typeof t && (t = [[null, t, ""]]);
            var o = {};
            if (r)
              for (var i = 0; i < this.length; i++) {
                var a = this[i][0];
                null != a && (o[a] = !0);
              }
            for (var s = 0; s < t.length; s++) {
              var c = [].concat(t[s]);
              (r && o[c[0]]) ||
                (n &&
                  (c[2]
                    ? (c[2] = "".concat(n, " and ").concat(c[2]))
                    : (c[2] = n)),
                e.push(c));
            }
          }),
          e
        );
      };
    },
    function(t, e, n) {
      "use strict";
      var r,
        o = function() {
          return (
            void 0 === r &&
              (r = Boolean(window && document && document.all && !window.atob)),
            r
          );
        },
        i = (function() {
          var t = {};
          return function(e) {
            if (void 0 === t[e]) {
              var n = document.querySelector(e);
              if (
                window.HTMLIFrameElement &&
                n instanceof window.HTMLIFrameElement
              )
                try {
                  n = n.contentDocument.head;
                } catch (t) {
                  n = null;
                }
              t[e] = n;
            }
            return t[e];
          };
        })(),
        a = [];
      function s(t) {
        for (var e = -1, n = 0; n < a.length; n++)
          if (a[n].identifier === t) {
            e = n;
            break;
          }
        return e;
      }
      function c(t, e) {
        for (var n = {}, r = [], o = 0; o < t.length; o++) {
          var i = t[o],
            c = e.base ? i[0] + e.base : i[0],
            u = n[c] || 0,
            l = "".concat(c, " ").concat(u);
          n[c] = u + 1;
          var d = s(l),
            f = { css: i[1], media: i[2], sourceMap: i[3] };
          -1 !== d
            ? (a[d].references++, a[d].updater(f))
            : a.push({ identifier: l, updater: m(f, e), references: 1 }),
            r.push(l);
        }
        return r;
      }
      function u(t) {
        var e = document.createElement("style"),
          r = t.attributes || {};
        if (void 0 === r.nonce) {
          var o = n.nc;
          o && (r.nonce = o);
        }
        if (
          (Object.keys(r).forEach(function(t) {
            e.setAttribute(t, r[t]);
          }),
          "function" == typeof t.insert)
        )
          t.insert(e);
        else {
          var a = i(t.insert || "head");
          if (!a)
            throw new Error(
              "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid."
            );
          a.appendChild(e);
        }
        return e;
      }
      var l,
        d =
          ((l = []),
          function(t, e) {
            return (l[t] = e), l.filter(Boolean).join("\n");
          });
      function f(t, e, n, r) {
        var o = n
          ? ""
          : r.media
          ? "@media ".concat(r.media, " {").concat(r.css, "}")
          : r.css;
        if (t.styleSheet) t.styleSheet.cssText = d(e, o);
        else {
          var i = document.createTextNode(o),
            a = t.childNodes;
          a[e] && t.removeChild(a[e]),
            a.length ? t.insertBefore(i, a[e]) : t.appendChild(i);
        }
      }
      function p(t, e, n) {
        var r = n.css,
          o = n.media,
          i = n.sourceMap;
        if (
          (o ? t.setAttribute("media", o) : t.removeAttribute("media"),
          i &&
            btoa &&
            (r += "\n/*# sourceMappingURL=data:application/json;base64,".concat(
              btoa(unescape(encodeURIComponent(JSON.stringify(i)))),
              " */"
            )),
          t.styleSheet)
        )
          t.styleSheet.cssText = r;
        else {
          for (; t.firstChild; ) t.removeChild(t.firstChild);
          t.appendChild(document.createTextNode(r));
        }
      }
      var v = null,
        h = 0;
      function m(t, e) {
        var n, r, o;
        if (e.singleton) {
          var i = h++;
          (n = v || (v = u(e))),
            (r = f.bind(null, n, i, !1)),
            (o = f.bind(null, n, i, !0));
        } else
          (n = u(e)),
            (r = p.bind(null, n, e)),
            (o = function() {
              !(function(t) {
                if (null === t.parentNode) return !1;
                t.parentNode.removeChild(t);
              })(n);
            });
        return (
          r(t),
          function(e) {
            if (e) {
              if (
                e.css === t.css &&
                e.media === t.media &&
                e.sourceMap === t.sourceMap
              )
                return;
              r((t = e));
            } else o();
          }
        );
      }
      t.exports = function(t, e) {
        (e = e || {}).singleton ||
          "boolean" == typeof e.singleton ||
          (e.singleton = o());
        var n = c((t = t || []), e);
        return function(t) {
          if (
            ((t = t || []),
            "[object Array]" === Object.prototype.toString.call(t))
          ) {
            for (var r = 0; r < n.length; r++) {
              var o = s(n[r]);
              a[o].references--;
            }
            for (var i = c(t, e), u = 0; u < n.length; u++) {
              var l = s(n[u]);
              0 === a[l].references && (a[l].updater(), a.splice(l, 1));
            }
            n = i;
          }
        };
      };
    },
    function(t, e, n) {
      "use strict";
      var r = n(0);
      n.n(r).a;
    },
    function(t, e, n) {
      "use strict";
      n.r(e);
      var r = n(2),
        o = n.n(r)()(!1);
      o.push([
        t.i,
        ".t-button{font-weight:700;border:0;border-radius:3em;cursor:pointer;display:inline-block;line-height:1}.t-button--primary{color:white;background-color:red}.t-button--secondary{color:#333;background-color:transparent;box-shadow:rgba(0,0,0,0.15) 0px 0px 0px 1px inset}.t-button--small{font-size:12px;padding:10px 16px}.t-button--medium{font-size:14px;padding:11px 20px}.t-button--large{font-size:16px;padding:12px 24px}\n",
        "",
      ]),
        (e.default = o);
    },
    function(t, e, n) {
      "use strict";
      var r = n(1);
      n.n(r).a;
    },
    function(t, e, n) {
      "use strict";
      n.r(e);
      var r = n(2),
        o = n.n(r)()(!1);
      o.push([
        t.i,
        '.wrapper{font-family:"Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;border-bottom:1px solid rgba(0,0,0,0.1);padding:15px 20px;display:flex;align-items:center;justify-content:space-between}svg{display:inline-block;vertical-align:top}h1{font-weight:900;font-size:20px;line-height:1;margin:6px 0 6px 10px;display:inline-block;vertical-align:top}button+button{margin-left:10px}\n',
        "",
      ]),
        (e.default = o);
    },
    function(t, e, n) {
      "use strict";
      n.r(e),
        n.d(e, "TButton", function() {
          return s;
        }),
        n.d(e, "THeader", function() {
          return d;
        });
      var r = function() {
        var t = this.$createElement;
        return (this._self._c || t)(
          "button",
          {
            class: this.classes,
            style: this.style,
            attrs: { type: "button" },
            on: { click: this.onClick },
          },
          [this._v(this._s(this.label))]
        );
      };
      r._withStripped = !0;
      var o = {
        name: "TButton",
        props: {
          label: { type: String, required: !0 },
          primary: { type: Boolean, default: !1 },
          size: {
            type: String,
            default: "medium",
            validator: function(t) {
              return -1 !== ["small", "medium", "large"].indexOf(t);
            },
          },
          backgroundColor: { type: String },
        },
        computed: {
          classes() {
            return {
              "t-button": !0,
              "t-button--primary": this.primary,
              "t-button--secondary": !this.primary,
              ["t-button--" + this.size]: !0,
            };
          },
          style() {
            return { backgroundColor: this.backgroundColor };
          },
        },
        methods: {
          onClick() {
            this.$emit("onClick");
          },
        },
      };
      n(4);
      function i(t, e, n, r, o, i, a, s) {
        var c,
          u = "function" == typeof t ? t.options : t;
        if (
          (e && ((u.render = e), (u.staticRenderFns = n), (u._compiled = !0)),
          r && (u.functional = !0),
          i && (u._scopeId = "data-v-" + i),
          a
            ? ((c = function(t) {
                (t =
                  t ||
                  (this.$vnode && this.$vnode.ssrContext) ||
                  (this.parent &&
                    this.parent.$vnode &&
                    this.parent.$vnode.ssrContext)) ||
                  "undefined" == typeof __VUE_SSR_CONTEXT__ ||
                  (t = __VUE_SSR_CONTEXT__),
                  o && o.call(this, t),
                  t &&
                    t._registeredComponents &&
                    t._registeredComponents.add(a);
              }),
              (u._ssrRegister = c))
            : o &&
              (c = s
                ? function() {
                    o.call(
                      this,
                      (u.functional ? this.parent : this).$root.$options
                        .shadowRoot
                    );
                  }
                : o),
          c)
        )
          if (u.functional) {
            u._injectStyles = c;
            var l = u.render;
            u.render = function(t, e) {
              return c.call(e), l(t, e);
            };
          } else {
            var d = u.beforeCreate;
            u.beforeCreate = d ? [].concat(d, c) : [c];
          }
        return { exports: t, options: u };
      }
      var a = i(o, r, [], !1, null, null, null);
      a.options.__file = "src/components/Button/Button.vue";
      var s = a.exports,
        c = function() {
          var t = this,
            e = t.$createElement,
            n = t._self._c || e;
          return n("header", [
            n("div", { staticClass: "wrapper" }, [
              n("div", [
                n(
                  "svg",
                  {
                    attrs: {
                      width: "32",
                      height: "32",
                      viewBox: "0 0 32 32",
                      xmlns: "http://www.w3.org/2000/svg",
                    },
                  },
                  [
                    n(
                      "g",
                      { attrs: { fill: "none", "fill-rule": "evenodd" } },
                      [
                        n("path", {
                          attrs: {
                            d:
                              "M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z",
                            fill: "#FFF",
                          },
                        }),
                        t._v(" "),
                        n("path", {
                          attrs: {
                            d:
                              "M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z",
                            fill: "#FF0000",
                          },
                        }),
                        t._v(" "),
                        n("path", {
                          attrs: {
                            d:
                              "M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z",
                            fill: "#FF0000",
                          },
                        }),
                      ]
                    ),
                  ]
                ),
                t._v(" "),
                n("h1", [t._v("Logo")]),
              ]),
              t._v(" "),
              n(
                "div",
                [
                  t.user
                    ? t._e()
                    : n("t-button", {
                        attrs: { primary: "", size: "small", label: "Войти" },
                        on: { onClick: t.onCreateAccount },
                      }),
                  t._v(" "),
                  t.user
                    ? t._e()
                    : n("t-button", {
                        attrs: { size: "small", label: "Выйти" },
                        on: { onClick: t.onLogin },
                      }),
                ],
                1
              ),
            ]),
          ]);
        };
      c._withStripped = !0;
      var u = {
          name: "t-header",
          components: { TButton: s },
          props: { user: { type: Object } },
          methods: {
            onLogin() {
              this.$emit("onLogin");
            },
            onLogout() {
              this.$emit("onLogout");
            },
            onCreateAccount() {
              this.$emit("onCreateAccount");
            },
          },
        },
        l = (n(6), i(u, c, [], !1, null, null, null));
      l.options.__file = "src/components/Header/Header.vue";
      var d = l.exports;
    },
  ])
);
