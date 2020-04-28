var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

module.exports = {
    $isEmpty: function(t) {
        return 0 === Object.keys(t).length;
    },
    $isEqual: function(e, r, n, o) {
        if (e === r) return 0 !== e || 1 / e == 1 / r;
        if (e !== e) return r !== r;
        if (!e || !r) return e === r;
        var i = void 0 === e ? "undefined" : t(e);
        return ("function" === i || "object" === i || "object" === (void 0 === r ? "undefined" : t(r))) && this.$isDeepEqual(e, r, n, o);
    },
    $isDeepEqual: function(e, r, n, o) {
        var i = this, c = toString.call(e);
        if (c !== toString.call(r)) return !1;
        switch (c) {
          case "[object RegExp]":
          case "[object String]":
            return "" + e == "" + r;

          case "[object Number]":
            return +e != +e ? +r != +r : 0 == +e ? 1 / +e == 1 / r : +e == +r;

          case "[object Date]":
          case "[object Boolean]":
            return +e == +r;

          case "[object Symbol]":
            var u = "undefined" != typeof Symbol ? Symbol.prototype : null;
            return u.valueOf.call(e) === u.valueOf.call(r);
        }
        var s = "[object Array]" === c;
        if (!s) {
            if ("object" !== (void 0 === e ? "undefined" : t(e)) || "object" !== (void 0 === r ? "undefined" : t(r))) return e === r;
            var a = e.constructor, l = r.constructor;
            if (a !== l && !("function" == typeof a && a instanceof a && "function" == typeof l && l instanceof l) && "constructor" in e && "constructor" in r) return !1;
        }
        n = n || [], o = o || [];
        for (var f = n.length; f--; ) if (n[f] === e) return o[f] === r;
        if (n.push(e), o.push(r), s) {
            if ((f = e.length) !== r.length) return !1;
            for (;f--; ) if (!i.$isEqual(e[f], r[f], n, o)) return !1;
        } else {
            var p, y = Object.keys(e);
            if (f = y.length, Object.keys(r).length !== f) return !1;
            for (;f--; ) if (p = y[f], !i.$has(r, p) || !i.$isEqual(e[p], r[p], n, o)) return !1;
        }
        return n.pop(), o.pop(), !0;
    },
    $has: function(t, e) {
        if ("[object Array]" !== toString.call(e)) return t && hasOwnProperty.call(t, e);
        for (var r = e.length, n = 0; n < r; n++) {
            var o = e[n];
            if (!t || !hasOwnProperty.call(t, o)) return !1;
            t = t[o];
        }
        return !!r;
    },
    $extend: function() {
        var e, r, n, o, i, c, u = arguments[0] || {}, s = 1, a = arguments.length, l = !1, f = this;
        for ("boolean" == typeof u && (l = u, u = arguments[s] || {}, s++), "object" !== (void 0 === u ? "undefined" : t(u)) && "function" != typeof u && (u = {}), 
        s === a && (u = this, s--); s < a; s++) if (e = arguments[s]) for (r in e) n = u[r], 
        u !== (o = e[r]) && (l && o && (f.$isPlainObject(o) || (i = Array.isArray(o))) ? (i ? (i = !1, 
        c = n && Array.isArray(n) ? n : []) : c = n && f.$isPlainObject(n) ? n : {}, u[r] = f.$extend(l, c, o)) : u[r] = o);
        return u;
    },
    $copy: function(e) {
        var r = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return Array.isArray(e) ? this.$extend(r, [], e) : "" + e == "null" ? e : "object" === (void 0 === e ? "undefined" : t(e)) ? this.$extend(r, {}, e) : e;
    },
    $isPlainObject: function(t) {
        var e, r;
        return !(!t || "[object Object]" !== Object.prototype.toString.call(t)) && (!(e = Object.getPrototypeOf(t)) || "function" == typeof (r = Object.prototype.hasOwnProperty.call(e, "constructor") && e.constructor) && Object.prototype.hasOwnProperty.toString.call(r) === Object.prototype.hasOwnProperty.toString.call(Object));
    },
    $resolvePath: function(t, e) {
        if (!e) return t;
        if ("/" === e[0]) return e = e.substr(1), this.$resolvePath("", e);
        if ("." !== e[0]) return this.$resolvePath(t, "./" + e);
        var r = t.split("/");
        return "." === e[0] && "/" === e[1] ? "." !== (e = e.substr(2))[0] ? (r.length ? r[r.length - 1] = e : r = [ e ], 
        1 === r.length ? "/" + r[0] : r.join("/")) : this.$resolvePath(r.join("/"), e) : "." === e[0] && "." === e[1] && "/" === e[2] ? (e = e.replace(/^\.*/gi, ""), 
        r.pop(), this.$resolvePath(r.join("/"), "." + e)) : "." === e[0] ? this.$resolvePath(t, e.substr(1)) : void 0;
    },
    $getParams: function(t) {
        var e = {}, r = t.indexOf("?");
        if (-1 !== r) {
            var n = void 0;
            t.substr(r + 1).split("&").forEach(function(t) {
                n = t.split("="), e[n[0]] = decodeURIComponent(n[1]);
            });
        }
        return e;
    }
};