! function() {
    "use strict";
    var e, o = Roblox,
        a = t;

    function t(e, t, r) {
        this.locales = e, this.formats = t, this.pluralFn = r
    }

    function i(e) {
        this.id = e
    }

    function u(e, t, r, n, o) {
        this.id = e, this.useOrdinal = t, this.offset = r, this.options = n, this.pluralFn = o
    }

    function r(e, t, r, n) {
        this.id = e, this.offset = t, this.numberFormat = r, this.string = n
    }

    function l(e, t) {
        this.id = e, this.options = t
    }

    function Ze(e, t, r, n) {
        this.message = e, this.expected = t, this.found = r, this.location = n, this.name = "SyntaxError", "function" == typeof Error.captureStackTrace && Error.captureStackTrace(this, Ze)
    }

    function n() {
        this.constructor = e
    }
    t.prototype.compile = function(e) {
        return this.pluralStack = [], this.currentPlural = null, this.pluralNumberFormat = null, this.compileMessage(e)
    }, t.prototype.compileMessage = function(e) {
        if (!e || "messageFormatPattern" !== e.type) throw new Error('Message AST is not of type: "messageFormatPattern"');
        for (var t, r = e.elements, n = [], o = 0, a = r.length; o < a; o += 1) switch ((t = r[o]).type) {
            case "messageTextElement":
                n.push(this.compileMessageText(t));
                break;
            case "argumentElement":
                n.push(this.compileArgument(t));
                break;
            default:
                throw new Error("Message element does not have a valid type")
        }
        return n
    }, t.prototype.compileMessageText = function(e) {
        return this.currentPlural && /(^|[^\\])#/g.test(e.value) ? (this.pluralNumberFormat || (this.pluralNumberFormat = new Intl.NumberFormat(this.locales)), new r(this.currentPlural.id, this.currentPlural.format.offset, this.pluralNumberFormat, e.value)) : e.value.replace(/\\#/g, "#")
    }, t.prototype.compileArgument = function(e) {
        var t = e.format;
        if (!t) return new i(e.id);
        var r, n = this.formats,
            o = this.locales,
            a = this.pluralFn;
        switch (t.type) {
            case "numberFormat":
                return r = n.number[t.style], {
                    id: e.id,
                    format: new Intl.NumberFormat(o, r).format
                };
            case "dateFormat":
                return r = n.date[t.style], {
                    id: e.id,
                    format: new Intl.DateTimeFormat(o, r).format
                };
            case "timeFormat":
                return r = n.time[t.style], {
                    id: e.id,
                    format: new Intl.DateTimeFormat(o, r).format
                };
            case "pluralFormat":
                return r = this.compileOptions(e), new u(e.id, t.ordinal, t.offset, r, a);
            case "selectFormat":
                return r = this.compileOptions(e), new l(e.id, r);
            default:
                throw new Error("Message element does not have a valid format type")
        }
    }, t.prototype.compileOptions = function(e) {
        var t, r, n, o = e.format,
            a = o.options,
            i = {};
        for (this.pluralStack.push(this.currentPlural), this.currentPlural = "pluralFormat" === o.type ? e : null, t = 0, r = a.length; t < r; t += 1) i[(n = a[t]).selector] = this.compileMessage(n.value);
        return this.currentPlural = this.pluralStack.pop(), i
    }, i.prototype.format = function(e) {
        return e || "number" == typeof e ? "string" == typeof e ? e : String(e) : ""
    }, u.prototype.getOption = function(e) {
        var t = this.options;
        return t["=" + e] || t[this.pluralFn(e - this.offset, this.useOrdinal)] || t.other
    }, r.prototype.format = function(e) {
        e = this.numberFormat.format(e - this.offset);
        return this.string.replace(/(^|[^\\])#/g, "$1" + e).replace(/\\#/g, "#")
    }, l.prototype.getOption = function(e) {
        var t = this.options;
        return t[e] || t.other
    };
    var s = (e = Ze, p = Error, n.prototype = p.prototype, e.prototype = new n, {
            SyntaxError: Ze,
            parse: function(s) {
                var e = 1 < arguments.length ? arguments[1] : {},
                    c = {},
                    t = {
                        start: Ae
                    },
                    r = Ae,
                    n = function(e) {
                        return {
                            type: "messageFormatPattern",
                            elements: e,
                            location: De()
                        }
                    },
                    i = function(e) {
                        for (var t, r, n, o = "", a = 0, i = e.length; a < i; a += 1)
                            for (t = 0, n = (r = e[a]).length; t < n; t += 1) o += r[t];
                        return o
                    },
                    o = function(e) {
                        return {
                            type: "messageTextElement",
                            value: e,
                            location: De()
                        }
                    },
                    u = /^[^ \t\n\r,.+={}#]/,
                    l = {
                        type: "class",
                        value: "[^ \\t\\n\\r,.+={}#]",
                        description: "[^ \\t\\n\\r,.+={}#]"
                    },
                    f = "{",
                    p = {
                        type: "literal",
                        value: "{",
                        description: '"{"'
                    },
                    m = ",",
                    h = {
                        type: "literal",
                        value: ",",
                        description: '","'
                    },
                    y = "}",
                    d = {
                        type: "literal",
                        value: "}",
                        description: '"}"'
                    },
                    g = function(e, t) {
                        return {
                            type: "argumentElement",
                            id: e,
                            format: t && t[2],
                            location: De()
                        }
                    },
                    v = "number",
                    b = {
                        type: "literal",
                        value: "number",
                        description: '"number"'
                    },
                    w = "date",
                    F = {
                        type: "literal",
                        value: "date",
                        description: '"date"'
                    },
                    O = "time",
                    D = {
                        type: "literal",
                        value: "time",
                        description: '"time"'
                    },
                    k = function(e, t) {
                        return {
                            type: e + "Format",
                            style: t && t[2],
                            location: De()
                        }
                    },
                    T = "plural",
                    L = {
                        type: "literal",
                        value: "plural",
                        description: '"plural"'
                    },
                    j = function(e) {
                        return {
                            type: e.type,
                            ordinal: !1,
                            offset: e.offset || 0,
                            options: e.options,
                            location: De()
                        }
                    },
                    A = "selectordinal",
                    C = {
                        type: "literal",
                        value: "selectordinal",
                        description: '"selectordinal"'
                    },
                    P = function(e) {
                        return {
                            type: e.type,
                            ordinal: !0,
                            offset: e.offset || 0,
                            options: e.options,
                            location: De()
                        }
                    },
                    x = "select",
                    _ = {
                        type: "literal",
                        value: "select",
                        description: '"select"'
                    },
                    S = function(e) {
                        return {
                            type: "selectFormat",
                            options: e,
                            location: De()
                        }
                    },
                    E = "=",
                    R = {
                        type: "literal",
                        value: "=",
                        description: '"="'
                    },
                    I = function(e, t) {
                        return {
                            type: "optionalFormatPattern",
                            selector: e,
                            value: t,
                            location: De()
                        }
                    },
                    N = "offset:",
                    M = {
                        type: "literal",
                        value: "offset:",
                        description: '"offset:"'
                    },
                    z = function(e) {
                        return e
                    },
                    Z = function(e, t) {
                        return {
                            type: "pluralFormat",
                            offset: e,
                            options: t,
                            location: De()
                        }
                    },
                    a = {
                        type: "other",
                        description: "whitespace"
                    },
                    U = /^[ \t\n\r]/,
                    W = {
                        type: "class",
                        value: "[ \\t\\n\\r]",
                        description: "[ \\t\\n\\r]"
                    },
                    q = {
                        type: "other",
                        description: "optionalWhitespace"
                    },
                    B = /^[0-9]/,
                    J = {
                        type: "class",
                        value: "[0-9]",
                        description: "[0-9]"
                    },
                    K = /^[0-9a-f]/i,
                    $ = {
                        type: "class",
                        value: "[0-9a-f]i",
                        description: "[0-9a-f]i"
                    },
                    G = "0",
                    H = {
                        type: "literal",
                        value: "0",
                        description: '"0"'
                    },
                    Q = /^[1-9]/,
                    V = {
                        type: "class",
                        value: "[1-9]",
                        description: "[1-9]"
                    },
                    X = function(e) {
                        return parseInt(e, 10)
                    },
                    Y = /^[^{}\\\0-\x1F \t\n\r]/,
                    ee = {
                        type: "class",
                        value: "[^{}\\\\\\0-\\x1F\\x7f \\t\\n\\r]",
                        description: "[^{}\\\\\\0-\\x1F\\x7f \\t\\n\\r]"
                    },
                    te = "\\\\",
                    re = {
                        type: "literal",
                        value: "\\\\",
                        description: '"\\\\\\\\"'
                    },
                    ne = function() {
                        return "\\"
                    },
                    oe = "\\#",
                    ae = {
                        type: "literal",
                        value: "\\#",
                        description: '"\\\\#"'
                    },
                    ie = function() {
                        return "\\#"
                    },
                    ue = "\\{",
                    le = {
                        type: "literal",
                        value: "\\{",
                        description: '"\\\\{"'
                    },
                    se = function() {
                        return "{"
                    },
                    ce = "\\}",
                    fe = {
                        type: "literal",
                        value: "\\}",
                        description: '"\\\\}"'
                    },
                    pe = function() {
                        return "}"
                    },
                    me = "\\u",
                    he = {
                        type: "literal",
                        value: "\\u",
                        description: '"\\\\u"'
                    },
                    ye = function(e) {
                        return String.fromCharCode(parseInt(e, 16))
                    },
                    de = function(e) {
                        return e.join("")
                    },
                    ge = 0,
                    ve = 0,
                    be = [{
                        line: 1,
                        column: 1,
                        seenCR: !1
                    }],
                    we = 0,
                    Fe = [],
                    Oe = 0;
                if ("startRule" in e) {
                    if (!(e.startRule in t)) throw new Error("Can't start parsing from rule \"" + e.startRule + '".');
                    r = t[e.startRule]
                }

                function De() {
                    return Te(ve, ge)
                }

                function ke(e) {
                    var t, r, n = be[e];
                    if (n) return n;
                    for (t = e - 1; !be[t];) t--;
                    for (n = {
                            line: (n = be[t]).line,
                            column: n.column,
                            seenCR: n.seenCR
                        }; t < e;) "\n" === (r = s.charAt(t)) ? (n.seenCR || n.line++, n.column = 1, n.seenCR = !1) : "\r" === r || "\u2028" === r || "\u2029" === r ? (n.line++, n.column = 1, n.seenCR = !0) : (n.column++, n.seenCR = !1), t++;
                    return be[e] = n
                }

                function Te(e, t) {
                    var r = ke(e),
                        n = ke(t);
                    return {
                        start: {
                            offset: e,
                            line: r.line,
                            column: r.column
                        },
                        end: {
                            offset: t,
                            line: n.line,
                            column: n.column
                        }
                    }
                }

                function Le(e) {
                    ge < we || (we < ge && (we = ge, Fe = []), Fe.push(e))
                }

                function je(e, t, r, n) {
                    return null !== t && function(e) {
                        var t = 1;
                        for (e.sort(function(e, t) {
                                return e.description < t.description ? -1 : e.description > t.description ? 1 : 0
                            }); t < e.length;) e[t - 1] === e[t] ? e.splice(t, 1) : t++
                    }(t), new Ze(null !== e ? e : function(e, t) {
                        for (var r = new Array(e.length), n = 0; n < e.length; n++) r[n] = e[n].description;

                        function o(e) {
                            return e.charCodeAt(0).toString(16).toUpperCase()
                        }
                        return "Expected " + (1 < e.length ? r.slice(0, -1).join(", ") + " or " + r[e.length - 1] : r[0]) + " but " + (t ? '"' + t.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(e) {
                            return "\\x0" + o(e)
                        }).replace(/[\x10-\x1F\x80-\xFF]/g, function(e) {
                            return "\\x" + o(e)
                        }).replace(/[\u0100-\u0FFF]/g, function(e) {
                            return "\\u0" + o(e)
                        }).replace(/[\u1000-\uFFFF]/g, function(e) {
                            return "\\u" + o(e)
                        }) + '"' : "end of input") + " found."
                    }(t, r), t, r, n)
                }

                function Ae() {
                    return Ce()
                }

                function Ce() {
                    for (var e = ge, t = [], r = Pe(); r !== c;) t.push(r), r = Pe();
                    return t !== c && (ve = e, t = n(t)), e = t
                }

                function Pe() {
                    var e = function() {
                        var e, t;
                        e = ge, (t = function() {
                            var e, t, r, n, o, a;
                            t = [], r = e = ge, r = (n = Ee()) !== c ? (o = ze(), o !== c ? (a = Ee()) !== c ? n = [n, o, a] : (ge = r, c) : (ge = r, c)) : (ge = r, c);
                            if (r !== c)
                                for (; r !== c;) t.push(r), r = ge, n = Ee(), r = n !== c ? (o = ze()) !== c ? (a = Ee()) !== c ? n = [n, o, a] : (ge = r, c) : (ge = r, c) : (ge = r, c);
                            else t = c;
                            t !== c && (ve = e, t = i(t));
                            (e = t) === c && (e = ge, t = Se(), e = t !== c ? s.substring(e, ge) : t);
                            return e
                        }()) !== c && (ve = e, t = o(t));
                        return e = t
                    }();
                    return e === c && (e = function() {
                        var e, t, r, n, o, a, i;
                        e = ge, 123 === s.charCodeAt(ge) ? (t = f, ge++) : (t = c, 0 === Oe && Le(p));
                        e = t !== c ? (i = Ee(), i !== c ? (r = function() {
                            var e, t, r;
                            if ((e = Ne()) === c) {
                                if (e = ge, t = [], u.test(s.charAt(ge)) ? (r = s.charAt(ge), ge++) : (r = c, 0 === Oe && Le(l)), r !== c)
                                    for (; r !== c;) t.push(r), u.test(s.charAt(ge)) ? (r = s.charAt(ge), ge++) : (r = c, 0 === Oe && Le(l));
                                else t = c;
                                e = t !== c ? s.substring(e, ge) : t
                            }
                            return e
                        }()) !== c ? Ee() !== c ? (n = ge, 44 === s.charCodeAt(ge) ? (o = m, ge++) : (o = c, 0 === Oe && Le(h)), (n = o !== c ? (a = Ee()) !== c ? (i = function() {
                            var e;
                            (e = function() {
                                var e, t, r, n, o, a;
                                e = ge, s.substr(ge, 6) === v ? (t = v, ge += 6) : (t = c, 0 === Oe && Le(b));
                                t === c && (s.substr(ge, 4) === w ? (t = w, ge += 4) : (t = c, 0 === Oe && Le(F)), t === c && (s.substr(ge, 4) === O ? (t = O, ge += 4) : (t = c, 0 === Oe && Le(D))));
                                e = t !== c ? (a = Ee(), a !== c ? (r = ge, 44 === s.charCodeAt(ge) ? (n = m, ge++) : (n = c, 0 === Oe && Le(h)), (r = n !== c ? (o = Ee()) !== c ? (a = ze()) !== c ? n = [n, o, a] : (ge = r, c) : (ge = r, c) : (ge = r, c)) === c && (r = null), r !== c ? (ve = e, t = k(t, r)) : (ge = e, c)) : (ge = e, c)) : (ge = e, c);
                                return e
                            }()) === c && (e = function() {
                                var e, t, r, n;
                                e = ge, s.substr(ge, 6) === T ? (t = T, ge += 6) : (t = c, 0 === Oe && Le(L));
                                e = t !== c ? (r = Ee(), r !== c ? (44 === s.charCodeAt(ge) ? (n = m, ge++) : (n = c, 0 === Oe && Le(h)), n !== c ? Ee() !== c ? (n = _e()) !== c ? (ve = e, t = j(n)) : (ge = e, c) : (ge = e, c) : (ge = e, c)) : (ge = e, c)) : (ge = e, c);
                                return e
                            }()) === c && (e = function() {
                                var e, t, r, n;
                                e = ge, s.substr(ge, 13) === A ? (t = A, ge += 13) : (t = c, 0 === Oe && Le(C));
                                e = t !== c ? (r = Ee(), r !== c ? (44 === s.charCodeAt(ge) ? (n = m, ge++) : (n = c, 0 === Oe && Le(h)), n !== c ? Ee() !== c ? (n = _e()) !== c ? (ve = e, t = P(n)) : (ge = e, c) : (ge = e, c) : (ge = e, c)) : (ge = e, c)) : (ge = e, c);
                                return e
                            }()) === c && (e = function() {
                                var e, t, r, n, o;
                                e = ge, s.substr(ge, 6) === x ? (t = x, ge += 6) : (t = c, 0 === Oe && Le(_));
                                if (t !== c)
                                    if (Ee() !== c)
                                        if (44 === s.charCodeAt(ge) ? (r = m, ge++) : (r = c, 0 === Oe && Le(h)), r !== c)
                                            if (Ee() !== c) {
                                                if (n = [], (o = xe()) !== c)
                                                    for (; o !== c;) n.push(o), o = xe();
                                                else n = c;
                                                e = n !== c ? (ve = e, t = S(n)) : (ge = e, c)
                                            } else ge = e, e = c;
                                else ge = e, e = c;
                                else ge = e, e = c;
                                else ge = e, e = c;
                                return e
                            }());
                            return e
                        }()) !== c ? o = [o, a, i] : (ge = n, c) : (ge = n, c) : (ge = n, c)) === c && (n = null), n !== c ? (o = Ee()) !== c ? (125 === s.charCodeAt(ge) ? (a = y, ge++) : (a = c, 0 === Oe && Le(d)), a !== c ? (ve = e, t = g(r, n)) : (ge = e, c)) : (ge = e, c) : (ge = e, c)) : (ge = e, c) : (ge = e, c) : (ge = e, c)) : (ge = e, c);
                        return e
                    }()), e
                }

                function xe() {
                    var e, t, r, n, o, a, i, u = ge,
                        l = Ee();
                    return u = l !== c ? (i = a = ge, 61 === s.charCodeAt(ge) ? (n = E, ge++) : (n = c, 0 === Oe && Le(R)), (a = (i = n !== c && (o = Ne()) !== c ? n = [n, o] : (ge = i, c)) !== c ? s.substring(a, ge) : i) === c && (a = ze()), (a = a) !== c && Ee() !== c ? (123 === s.charCodeAt(ge) ? (e = f, ge++) : (e = c, 0 === Oe && Le(p)), e !== c && Ee() !== c && (t = Ce()) !== c && Ee() !== c ? (125 === s.charCodeAt(ge) ? (r = y, ge++) : (r = c, 0 === Oe && Le(d)), r !== c ? (ve = u, I(a, t)) : (ge = u, c)) : (ge = u, c)) : (ge = u, c)) : (ge = u, c)
                }

                function _e() {
                    var e, t, r, n, o, a = ge;
                    if (o = ge, s.substr(ge, 7) === N ? (r = N, ge += 7) : (r = c, 0 === Oe && Le(M)), (o = o = r !== c && Ee() !== c && (n = Ne()) !== c ? (ve = o, r = z(n)) : (ge = o, c)) === c && (o = null), o !== c)
                        if (Ee() !== c) {
                            if (e = [], (t = xe()) !== c)
                                for (; t !== c;) e.push(t), t = xe();
                            else e = c;
                            a = e !== c ? (ve = a, o = Z(o, e)) : (ge = a, c)
                        } else ge = a, a = c;
                    else ge = a, a = c;
                    return a
                }

                function Se() {
                    var e, t;
                    if (Oe++, e = [], U.test(s.charAt(ge)) ? (t = s.charAt(ge), ge++) : (t = c, 0 === Oe && Le(W)), t !== c)
                        for (; t !== c;) e.push(t), U.test(s.charAt(ge)) ? (t = s.charAt(ge), ge++) : (t = c, 0 === Oe && Le(W));
                    else e = c;
                    return Oe--, e === c && (t = c, 0 === Oe && Le(a)), e
                }

                function Ee() {
                    var e, t, r;
                    for (Oe++, e = ge, t = [], r = Se(); r !== c;) t.push(r), r = Se();
                    return e = t !== c ? s.substring(e, ge) : t, Oe--, e === c && (t = c, 0 === Oe && Le(q)), e
                }

                function Re() {
                    var e;
                    return B.test(s.charAt(ge)) ? (e = s.charAt(ge), ge++) : (e = c, 0 === Oe && Le(J)), e
                }

                function Ie() {
                    var e;
                    return K.test(s.charAt(ge)) ? (e = s.charAt(ge), ge++) : (e = c, 0 === Oe && Le($)), e
                }

                function Ne() {
                    var e, t, r, n, o, a = ge;
                    if (48 === s.charCodeAt(ge) ? (e = G, ge++) : (e = c, 0 === Oe && Le(H)), e === c) {
                        if (t = e = ge, Q.test(s.charAt(ge)) ? (r = s.charAt(ge), ge++) : (r = c, 0 === Oe && Le(V)), r !== c) {
                            for (n = [], o = Re(); o !== c;) n.push(o), o = Re();
                            t = n !== c ? r = [r, n] : (ge = t, c)
                        } else ge = t, t = c;
                        e = t !== c ? s.substring(e, ge) : t
                    }
                    return e !== c && (ve = a, e = X(e)), a = e
                }

                function Me() {
                    var e, t, r, n, o, a, i, u;
                    return Y.test(s.charAt(ge)) ? (e = s.charAt(ge), ge++) : (e = c, 0 === Oe && Le(ee)), e === c && (e = ge, s.substr(ge, 2) === te ? (t = te, ge += 2) : (t = c, 0 === Oe && Le(re)), t !== c && (ve = e, t = ne()), (e = t) === c && (e = ge, s.substr(ge, 2) === oe ? (t = oe, ge += 2) : (t = c, 0 === Oe && Le(ae)), t !== c && (ve = e, t = ie()), (e = t) === c && (e = ge, s.substr(ge, 2) === ue ? (t = ue, ge += 2) : (t = c, 0 === Oe && Le(le)), t !== c && (ve = e, t = se()), (e = t) === c && (e = ge, s.substr(ge, 2) === ce ? (t = ce, ge += 2) : (t = c, 0 === Oe && Le(fe)), t !== c && (ve = e, t = pe()), (e = t) === c && (e = ge, s.substr(ge, 2) === me ? (t = me, ge += 2) : (t = c, 0 === Oe && Le(he)), e = t !== c ? (n = r = ge, (r = (n = (o = Ie()) !== c && (a = Ie()) !== c && (i = Ie()) !== c && (u = Ie()) !== c ? [o, a, i, u] : (ge = n, c)) !== c ? s.substring(r, ge) : n) !== c ? (ve = e, t = ye(r)) : (ge = e, c)) : (ge = e, c)))))), e
                }

                function ze() {
                    var e = ge,
                        t = [],
                        r = Me();
                    if (r !== c)
                        for (; r !== c;) t.push(r), r = Me();
                    else t = c;
                    return t !== c && (ve = e, t = de(t)), e = t
                }
                if ((r = r()) !== c && ge === s.length) return r;
                throw r !== c && ge < s.length && Le({
                    type: "end",
                    description: "end of input"
                }), je(null, Fe, we < s.length ? s.charAt(we) : null, we < s.length ? Te(we, we + 1) : Te(we, we))
            }
        }),
        c = f;

    function f(e, t, r) {
        var n = "string" == typeof e ? f.__parse(e) : e;
        if (!n || "messageFormatPattern" !== n.type) throw new TypeError("A message must be provided as a String or AST.");
        r = this._mergeFormats(f.formats, r), Object.defineProperty(this, "_locale", {
            value: this._resolveLocale(t)
        });
        var e = this._findPluralRuleFunction(this._locale),
            o = this._compilePattern(n, t, r, e),
            a = this;
        this.format = function(e) {
            return a._format(o, e)
        }
    }
    Object.defineProperty(f, "formats", {
        enumerable: !0,
        value: {
            number: {
                currency: {
                    style: "currency"
                },
                percent: {
                    style: "percent"
                }
            },
            date: {
                short: {
                    month: "numeric",
                    day: "numeric",
                    year: "2-digit"
                },
                medium: {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                },
                long: {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                },
                full: {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                }
            },
            time: {
                short: {
                    hour: "numeric",
                    minute: "numeric"
                },
                medium: {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric"
                },
                long: {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    timeZoneName: "short"
                },
                full: {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    timeZoneName: "short"
                }
            }
        }
    }), Object.defineProperty(f, "__localeData__", {
        value: Object.create(null)
    }), Object.defineProperty(f, "__addLocaleData", {
        value: function(e) {
            if (!e || !e.locale) throw new Error("Locale data provided to IntlMessageFormat is missing a `locale` property");
            f.__localeData__[e.locale.toLowerCase()] = e
        }
    }), Object.defineProperty(f, "__parse", {
        value: s.parse
    }), Object.defineProperty(f, "defaultLocale", {
        enumerable: !0,
        writable: !0,
        value: void 0
    }), f.prototype.resolvedOptions = function() {
        return {
            locale: this._locale
        }
    }, f.prototype._compilePattern = function(e, t, r, n) {
        return new a(t, r, n).compile(e)
    }, f.prototype._findPluralRuleFunction = function(e) {
        for (var t = f.__localeData__, r = t[e.toLowerCase()]; r;) {
            if (r.pluralRuleFunction) return r.pluralRuleFunction;
            r = r.parentLocale && t[r.parentLocale.toLowerCase()]
        }
        throw new Error("Locale data added to IntlMessageFormat is missing a `pluralRuleFunction` for :" + e)
    }, f.prototype._format = function(e, t) {
        for (var r, n, o = "", a = 0, i = e.length; a < i; a += 1)
            if ("string" != typeof(r = e[a])) {
                if (n = r.id, !t || !Object.prototype.hasOwnProperty.call(t, n)) throw new Error("A value must be provided for: " + n);
                n = t[n], r.options ? o += this._format(r.getOption(n), t) : o += r.format(n)
            } else o += r;
        return o
    }, f.prototype._mergeFormats = function(e, t) {
        var r, n, o = {};
        for (r in e) Object.prototype.hasOwnProperty.call(e, r) && (o[r] = n = Object.create(e[r]), t && Object.prototype.hasOwnProperty.call(t, r) && Object.assign(n, t[r]));
        return o
    }, f.prototype._resolveLocale = function(e) {
        "string" == typeof e && (e = [e]), e = (e || []).concat(f.defaultLocale);
        for (var t, r, n = f.__localeData__, o = 0, a = e.length; o < a; o += 1)
            for (t = e[o].toLowerCase().split("-"); t.length;) {
                if (r = n[t.join("-")]) return r.locale;
                t.pop()
            }
        var i = e.pop();
        throw new Error("No locale data has been added to IntlMessageFormat for: " + e.join(", ") + ", or the default locale: " + i)
    };
    var p = {
            locale: "en",
            pluralRuleFunction: function(e, t) {
                var r = String(e).split("."),
                    n = !r[1],
                    o = Number(r[0]) == e,
                    a = o && r[0].slice(-1),
                    r = o && r[0].slice(-2);
                return t ? 1 == a && 11 != r ? "one" : 2 == a && 12 != r ? "two" : 3 == a && 13 != r ? "few" : "other" : 1 == e && n ? "one" : "other"
            }
        },
        m = "RobloxLocaleCode";

    function h(e) {
        var t = g.indexOf(e) + 1;
        return !(!e || !t)
    }
    var y = 'meta[name="locale-data"]',
        d = "en_us",
        g = ["zh-cn", "zh-tw", "ko-kr", "ja-jp"],
        v = ["zh-tw"],
        b = {
            zh_cjv: "zh_cn"
        },
        w = function(e) {
            return e.replace(/_/g, "-")
        };

    function F() {
        var e, t = "undefined" != typeof localStorage && (o.LocalStorage ? o.LocalStorage.isAvailable() : localStorage && localStorage.getItem && localStorage.setItem),
            r = document.querySelector(y);
        return r && (e = r.dataset ? r.dataset.languageCode : r.getAttribute("data-language-code")), !e && t && (e = localStorage.getItem(m)), e = e || d, t && localStorage.setItem(m, e), e
    }
    var O = {
            short: {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            },
            full: {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
            },
            time: {
                hour: "2-digit",
                minute: "2-digit"
            }
        },
        D = new Date("Aug 17 2003"),
        k = 2017,
        T = [1, 2, 3, 4, 5, 6, 7],
        L = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        j = [{
            year: "numeric",
            month: "short",
            day: "numeric"
        }, {
            hour: "numeric",
            minute: "numeric",
            hour12: !0
        }],
        A = {
            month: 0,
            day: 1,
            year: 2
        },
        C = ["narrow", "short", "long"],
        P = ["numeric", "2-digit", "narrow", "short", "long"];

    function x(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    var _ = function() {
        function t(e) {
            ! function(e) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this), this.locale = e, this.dateOrdering = {}
        }
        var e, r, n;
        return e = t, (r = [{
            key: "getShortDate",
            value: function(e) {
                return this.getCustomDateTime(e)
            }
        }, {
            key: "getFullDate",
            value: function(e, t) {
                t = 1 < arguments.length && void 0 !== t ? t : " | ";
                return this.getCustomDateTime(e, j[0]) + t + this.getCustomDateTime(e, j[1])
            }
        }, {
            key: "getCustomDateTime",
            value: function(e, t) {
                var r = 0 < arguments.length && void 0 !== e ? e : new Date,
                    t = 1 < arguments.length ? t : void 0,
                    n = new Intl.DateTimeFormat(this.locale, t);
                try {
                    return "string" == typeof r || "number" == typeof r ? n.format(new Date(r)) : n.format(r)
                } catch (e) {
                    return ""
                }
            }
        }, {
            key: "getOrderedDateParts",
            value: function(e) {
                var r = this;
                return 0 === Object.keys(this.dateOrdering).length && (e = new Intl.DateTimeFormat(this.locale, e), this.dateOrdering = this.getDefaultDateOrdering(), !e.formatToParts || 3 === (e = e.formatToParts(new Date).filter(function(e) {
                    return "literal" !== e.type
                })).length && e.forEach(function(e, t) {
                    r.dateOrdering[e.type] = t
                })), this.dateOrdering
            }
        }, {
            key: "getDefaultDateOrdering",
            value: function() {
                var r = A,
                    e = this.getShortDate(D),
                    e = [{
                        type: "year",
                        index: e.indexOf("2003")
                    }, {
                        type: "month",
                        index: e.indexOf("8")
                    }, {
                        type: "day",
                        index: e.indexOf("17")
                    }];
                return e.some(function(e) {
                    return -1 === e.index
                }) ? A : ((e = e.sort(function(e, t) {
                    return e.index - t.index
                })).forEach(function(e, t) {
                    r[e.type] = t
                }), r)
            }
        }]) && x(e.prototype, r), n && x(e, n), t
    }();

    function S(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    var E = function() {
        function r(e, t) {
            ! function(e) {
                if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function")
            }(this), this.locale = e, this.currency = t
        }
        var e, t, n;
        return e = r, (t = [{
            key: "getCustomNumber",
            value: function(t, e) {
                try {
                    return new Intl.NumberFormat(this.locale, e).format(t)
                } catch (e) {
                    return t
                }
            }
        }]) && S(e.prototype, t), n && S(e, n), r
    }();

    function R(e, t) {
        return e < t ? -1 : t < e ? 1 : 0
    }

    function I(r) {
        return void 0 !== Intl.Collator ? new Intl.Collator(r).compare : function() {
            if (void 0 !== String.prototype.localeCompare) try {
                "foo".localeCompare("bar", "i")
            } catch (e) {
                return "RangeError" === e.name
            }
        }() ? function(e, t) {
            return e.localeCompare(t, r)
        } : R
    }

    function N(e, t, r) {
        return h(e) && r ? 0 <= v.indexOf(e) ? "".concat(t, " ").concat(r) : t + r : t
    }
    var M = function(e) {
        return {
            currency: {
                style: "currency",
                currency: e
            },
            percent: {
                style: "percent",
                maximumFractionDigits: 2
            },
            decimal: {
                style: "decimal",
                maximumFractionDigits: 2
            }
        }
    };

    function z(e) {
        return (z = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function Z(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    c.__addLocaleData(p), c.defaultLocale = "en";
    var U = function() {
        function n(e, t, r) {
            ! function(e) {
                if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function")
            }(this);
            e = e || F();
            this.locale = (e = e, Object.prototype.hasOwnProperty.call(b, e) ? w(b[e]) : w(e)), this.defaultLocale = [this.locale], this.timeZone = t || "America/Los_Angeles", this.currency = r || "USD", this.monthsList = {}, this.weekdaysList = {}, this.langSensitiveCompare = I(this.locale), this.dateTimeFormatter = null, this.numberFormatter = null
        }
        var e, t, r;
        return e = n, (t = [{
            key: "getLocale",
            value: function() {
                return w(this.locale)
            }
        }, {
            key: "getRobloxLocale",
            value: function() {
                return this.locale.replace(/-/g, "_")
            }
        }, {
            key: "getTimeZone",
            value: function() {
                return this.timeZone
            }
        }, {
            key: "getCurrency",
            value: function() {
                return this.currency
            }
        }, {
            key: "getDateTimeFormatter",
            value: function() {
                return this.dateTimeFormatter || (this.dateTimeFormatter = new _(this.locale)), this.dateTimeFormatter
            }
        }, {
            key: "getNumberFormatter",
            value: function() {
                return this.numberFormatter || (this.numberFormatter = new E(this.defaultLocale, this.currency)), this.numberFormatter
            }
        }, {
            key: "isAsianLanguage",
            value: function() {
                return h(this.locale)
            }
        }, {
            key: "getFormattedDateString",
            value: function(e, t) {
                return N(this.locale, e, t)
            }
        }, {
            key: "getMonthsI18n",
            value: function(e, t) {
                var r, n, o, e = -1 < P.indexOf(e) ? e : "short";
                return this.monthsList[e] && 0 < this.monthsList[e].length || (this.monthsList[e] = (r = this.locale, n = e, o = t, L.map(function(e) {
                    return new Date(k, e - 1)
                }).map(function(e, t) {
                    e = h(r) ? {
                        value: t + 1,
                        name: N(r, t + 1, o)
                    } : {
                        value: t + 1,
                        name: Intl.DateTimeFormat(r, {
                            month: n
                        }).format(e)
                    };
                    return e
                }))), this.monthsList[e]
            }
        }, {
            key: "f",
            value: function(e, t, r) {
                if ("string" != typeof e) throw new TypeError("'message' must be a string");
                return new c(e, this.locale, r).format(t)
            }
        }, {
            key: "d",
            value: function(e, t) {
                if (console.warn("This method has been deprecated in favor of the new DateTimeFormatter API, please do not use it anymore!"), "object" !== z(e) || !Date.prototype.isPrototypeOf(e)) throw new TypeError("'dateObj' must be a JavaScript date object");
                var r;
                if ("string" == typeof t || void 0 === t) r = O[t] || O.short;
                else {
                    if ("object" !== z(t)) throw new TypeError("'options' must be either of type string or object based on Intl.DateTimeFormat");
                    r = t
                }
                return this.getDateTimeFormatter().getCustomDateTime(e, r)
            }
        }, {
            key: "n",
            value: function(e, t) {
                if (Number.isNaN(e)) throw new TypeError("The argument 'number' must be of type number");
                var r, n = M(this.currency);
                if ("string" == typeof t || void 0 === t) r = n[t] || n.decimal;
                else {
                    if ("object" !== z(t)) throw new TypeError("'options' must be of type string or object based on Intl.NumberFormat");
                    r = t
                }
                return this.getNumberFormatter().getCustomNumber(e, r)
            }
        }, {
            key: "getWeekdaysList",
            value: function(e) {
                var r = this,
                    n = -1 < C.indexOf(e) ? e : "short";
                if (this.weekdaysList[n] && 0 < this.weekdaysList[n].length) return this.weekdaysList[n];
                e = T.map(function(e) {
                    return new Date(k, 4, e)
                });
                return this.weekdaysList[n] = e.map(function(e, t) {
                    return {
                        value: t + 1,
                        name: Intl.DateTimeFormat(r.locale, {
                            weekday: n
                        }).format(e)
                    }
                }), this.weekdaysList[n]
            }
        }, {
            key: "getMonthsList",
            value: function(e) {
                var r = this,
                    n = -1 < P.indexOf(e) ? e : "short";
                if (this.monthsList[n] && 0 < this.monthsList[n].length) return this.monthsList[n];
                e = L.map(function(e) {
                    return new Date(k, e - 1)
                });
                return this.monthsList[n] = e.map(function(e, t) {
                    return {
                        value: t + 1,
                        name: Intl.DateTimeFormat(r.locale, {
                            month: n
                        }).format(e)
                    }
                }), this.monthsList[n]
            }
        }]) && Z(e.prototype, t), r && Z(e, r), n
    }();

    function W(e) {
        return (W = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function q(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    var B = function() {
        function n(e, t, r) {
            ! function(e) {
                if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function")
            }(this), this.namespace = r, this.resourceMap = t, this.intl = e
        }
        var e, t, r;
        return e = n, (t = [{
            key: "get",
            value: function(e, t) {
                if (!e || "string" != typeof e) throw new TypeError("Parameter 'key' must be provided and it should be a string");
                var r = this.resourceMap[e] || "";
                return r || console.warn("The translation key '".concat(e, "' not found. Please check for a missing string or a typo.")), void 0 !== t && (r = t && "object" === W(t) && !Array.isArray(t) ? r ? this.intl.f(r, t) : "" : (new window.RobloxError("Second parameter must be either a plain object when provided").throw(), "")), r
            }
        }, {
            key: "addKeyForDevelopment",
            value: function(e, t) {
                if (this.resourceMap[e]) throw new Error("'key' ".concat(e, " is already present"));
                this.resourceMap[e] = t
            }
        }]) && q(e.prototype, t), r && q(e, r), n
    }();

    function J(t, e) {
        var r, n = Object.keys(t);
        return Object.getOwnPropertySymbols && (r = Object.getOwnPropertySymbols(t), e && (r = r.filter(function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable
        })), n.push.apply(n, r)), n
    }

    function K(n) {
        for (var e = 1; e < arguments.length; e++) {
            var o = null != arguments[e] ? arguments[e] : {};
            e % 2 ? J(Object(o), !0).forEach(function(e) {
                var t, r;
                t = n, e = o[r = e], r in t ? Object.defineProperty(t, r, {
                    value: e,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[r] = e
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(o)) : J(Object(o)).forEach(function(e) {
                Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(o, e))
            })
        }
        return n
    }

    function $(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function G(e, t, r) {
        return t && $(e.prototype, t), r && $(e, r), e
    }
    s = function() {
        function n() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : new U;
            ! function(e) {
                if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function")
            }(this), this.intl = e
        }
        return G(n, null, [{
            key: "combineTranslationResources",
            value: function(e) {
                for (var t = arguments.length, r = new Array(1 < t ? t - 1 : 0), n = 1; n < t; n++) r[n - 1] = arguments[n];
                var o = r.reduce(function(e, t) {
                    return Object.assign(e, t.resourceMap)
                }, {});
                return new B(e, o, null)
            }
        }]), G(n, [{
            key: "getTranslationResource",
            value: function(e) {
                var t = K(K(K({}, null === o.LangDynamicDefault || void 0 === o.LangDynamicDefault ? void 0 : o.LangDynamicDefault[e]), null === o.Lang || void 0 === o.Lang ? void 0 : o.Lang[e]), null === o.LangDynamic || void 0 === o.LangDynamic ? void 0 : o.LangDynamic[e]);
                return 0 === Object.keys(t).length && console.warn("The namespace ".concat(e, " was not found")), new B(this.intl, t, e)
            }
        }, {
            key: "mergeTranslationResources",
            value: function() {
                for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                return n.combineTranslationResources.apply(n, [this.intl].concat(t))
            }
        }]), n
    }(), (p = window.Roblox || {}).TranslationResourceProvider = s, window.Roblox = p
}();
//# sourceMappingURL=https://js.rbxcdn.com/48d686217869b3ff58bc-translationResourceProvider.js.map

/* Bundle detector */
window.Roblox && window.Roblox.BundleDetector && window.Roblox.BundleDetector.bundleDetected("TranslationResources");