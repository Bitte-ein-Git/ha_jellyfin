/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = globalThis, X = O.ShadowRoot && (O.ShadyCSS === void 0 || O.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, W = Symbol(), J = /* @__PURE__ */ new WeakMap();
let ct = class {
  constructor(t, i, s) {
    if (this._$cssResult$ = !0, s !== W) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (X && t === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (t = J.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && J.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const _t = (e) => new ct(typeof e == "string" ? e : e + "", void 0, W), ht = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((s, a, o) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(a) + e[o + 1], e[0]);
  return new ct(i, e, W);
}, mt = (e, t) => {
  if (X) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const s = document.createElement("style"), a = O.litNonce;
    a !== void 0 && s.setAttribute("nonce", a), s.textContent = i.cssText, e.appendChild(s);
  }
}, K = X ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return _t(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: vt, defineProperty: wt, getOwnPropertyDescriptor: yt, getOwnPropertyNames: bt, getOwnPropertySymbols: $t, getPrototypeOf: xt } = Object, H = globalThis, Z = H.trustedTypes, St = Z ? Z.emptyScript : "", Ct = H.reactiveElementPolyfillSupport, E = (e, t) => e, L = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? St : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let i = e;
  switch (t) {
    case Boolean:
      i = e !== null;
      break;
    case Number:
      i = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(e);
      } catch {
        i = null;
      }
  }
  return i;
} }, B = (e, t) => !vt(e, t), Q = { attribute: !0, type: String, converter: L, reflect: !1, useDefault: !1, hasChanged: B };
Symbol.metadata ??= Symbol("metadata"), H.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let x = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Q) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const s = Symbol(), a = this.getPropertyDescriptor(t, s, i);
      a !== void 0 && wt(this.prototype, t, a);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    const { get: a, set: o } = yt(this.prototype, t) ?? { get() {
      return this[i];
    }, set(n) {
      this[i] = n;
    } };
    return { get: a, set(n) {
      const l = a?.call(this);
      o?.call(this, n), this.requestUpdate(t, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Q;
  }
  static _$Ei() {
    if (this.hasOwnProperty(E("elementProperties"))) return;
    const t = xt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(E("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(E("properties"))) {
      const i = this.properties, s = [...bt(i), ...$t(i)];
      for (const a of s) this.createProperty(a, i[a]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [s, a] of i) this.elementProperties.set(s, a);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, s] of this.elementProperties) {
      const a = this._$Eu(i, s);
      a !== void 0 && this._$Eh.set(a, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const a of s) i.unshift(K(a));
    } else t !== void 0 && i.push(K(t));
    return i;
  }
  static _$Eu(t, i) {
    const s = i.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const s of i.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return mt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, i, s) {
    this._$AK(t, s);
  }
  _$ET(t, i) {
    const s = this.constructor.elementProperties.get(t), a = this.constructor._$Eu(t, s);
    if (a !== void 0 && s.reflect === !0) {
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : L).toAttribute(i, s.type);
      this._$Em = t, o == null ? this.removeAttribute(a) : this.setAttribute(a, o), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const s = this.constructor, a = s._$Eh.get(t);
    if (a !== void 0 && this._$Em !== a) {
      const o = s.getPropertyOptions(a), n = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : L;
      this._$Em = a;
      const l = n.fromAttribute(i, o.type);
      this[a] = l ?? this._$Ej?.get(a) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, i, s, a = !1, o) {
    if (t !== void 0) {
      const n = this.constructor;
      if (a === !1 && (o = this[t]), s ??= n.getPropertyOptions(t), !((s.hasChanged ?? B)(o, i) || s.useDefault && s.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, s)))) return;
      this.C(t, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: s, reflect: a, wrapped: o }, n) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, n ?? i ?? this[t]), o !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (i = void 0), this._$AL.set(t, i)), a === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [a, o] of this._$Ep) this[a] = o;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [a, o] of s) {
        const { wrapped: n } = o, l = this[a];
        n !== !0 || this._$AL.has(a) || l === void 0 || this.C(a, void 0, o, l);
      }
    }
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((i) => i.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((i) => this._$ET(i, this[i])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
x.elementStyles = [], x.shadowRootOptions = { mode: "open" }, x[E("elementProperties")] = /* @__PURE__ */ new Map(), x[E("finalized")] = /* @__PURE__ */ new Map(), Ct?.({ ReactiveElement: x }), (H.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Y = globalThis, tt = (e) => e, R = Y.trustedTypes, et = R ? R.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, dt = "$lit$", w = `lit$${Math.random().toFixed(9).slice(2)}$`, pt = "?" + w, At = `<${pt}>`, $ = document, k = () => $.createComment(""), T = (e) => e === null || typeof e != "object" && typeof e != "function", q = Array.isArray, Pt = (e) => q(e) || typeof e?.[Symbol.iterator] == "function", U = `[ 	
\f\r]`, P = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, it = /-->/g, st = />/g, y = RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), at = /'/g, ot = /"/g, ft = /^(?:script|style|textarea|title)$/i, Et = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), c = Et(1), C = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), nt = /* @__PURE__ */ new WeakMap(), b = $.createTreeWalker($, 129);
function gt(e, t) {
  if (!q(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return et !== void 0 ? et.createHTML(t) : t;
}
const kt = (e, t) => {
  const i = e.length - 1, s = [];
  let a, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = P;
  for (let l = 0; l < i; l++) {
    const r = e[l];
    let p, f, d = -1, g = 0;
    for (; g < r.length && (n.lastIndex = g, f = n.exec(r), f !== null); ) g = n.lastIndex, n === P ? f[1] === "!--" ? n = it : f[1] !== void 0 ? n = st : f[2] !== void 0 ? (ft.test(f[2]) && (a = RegExp("</" + f[2], "g")), n = y) : f[3] !== void 0 && (n = y) : n === y ? f[0] === ">" ? (n = a ?? P, d = -1) : f[1] === void 0 ? d = -2 : (d = n.lastIndex - f[2].length, p = f[1], n = f[3] === void 0 ? y : f[3] === '"' ? ot : at) : n === ot || n === at ? n = y : n === it || n === st ? n = P : (n = y, a = void 0);
    const v = n === y && e[l + 1].startsWith("/>") ? " " : "";
    o += n === P ? r + At : d >= 0 ? (s.push(p), r.slice(0, d) + dt + r.slice(d) + w + v) : r + w + (d === -2 ? l : v);
  }
  return [gt(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class M {
  constructor({ strings: t, _$litType$: i }, s) {
    let a;
    this.parts = [];
    let o = 0, n = 0;
    const l = t.length - 1, r = this.parts, [p, f] = kt(t, i);
    if (this.el = M.createElement(p, s), b.currentNode = this.el.content, i === 2 || i === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (a = b.nextNode()) !== null && r.length < l; ) {
      if (a.nodeType === 1) {
        if (a.hasAttributes()) for (const d of a.getAttributeNames()) if (d.endsWith(dt)) {
          const g = f[n++], v = a.getAttribute(d).split(w), z = /([.?@])?(.*)/.exec(g);
          r.push({ type: 1, index: o, name: z[2], strings: v, ctor: z[1] === "." ? Mt : z[1] === "?" ? jt : z[1] === "@" ? It : N }), a.removeAttribute(d);
        } else d.startsWith(w) && (r.push({ type: 6, index: o }), a.removeAttribute(d));
        if (ft.test(a.tagName)) {
          const d = a.textContent.split(w), g = d.length - 1;
          if (g > 0) {
            a.textContent = R ? R.emptyScript : "";
            for (let v = 0; v < g; v++) a.append(d[v], k()), b.nextNode(), r.push({ type: 2, index: ++o });
            a.append(d[g], k());
          }
        }
      } else if (a.nodeType === 8) if (a.data === pt) r.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = a.data.indexOf(w, d + 1)) !== -1; ) r.push({ type: 7, index: o }), d += w.length - 1;
      }
      o++;
    }
  }
  static createElement(t, i) {
    const s = $.createElement("template");
    return s.innerHTML = t, s;
  }
}
function A(e, t, i = e, s) {
  if (t === C) return t;
  let a = s !== void 0 ? i._$Co?.[s] : i._$Cl;
  const o = T(t) ? void 0 : t._$litDirective$;
  return a?.constructor !== o && (a?._$AO?.(!1), o === void 0 ? a = void 0 : (a = new o(e), a._$AT(e, i, s)), s !== void 0 ? (i._$Co ??= [])[s] = a : i._$Cl = a), a !== void 0 && (t = A(e, a._$AS(e, t.values), a, s)), t;
}
class Tt {
  constructor(t, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: i }, parts: s } = this._$AD, a = (t?.creationScope ?? $).importNode(i, !0);
    b.currentNode = a;
    let o = b.nextNode(), n = 0, l = 0, r = s[0];
    for (; r !== void 0; ) {
      if (n === r.index) {
        let p;
        r.type === 2 ? p = new I(o, o.nextSibling, this, t) : r.type === 1 ? p = new r.ctor(o, r.name, r.strings, this, t) : r.type === 6 && (p = new zt(o, this, t)), this._$AV.push(p), r = s[++l];
      }
      n !== r?.index && (o = b.nextNode(), n++);
    }
    return b.currentNode = $, a;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class I {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, s, a) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = a, this._$Cv = a?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && t?.nodeType === 11 && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    t = A(this, t, i), T(t) ? t === h || t == null || t === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : t !== this._$AH && t !== C && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Pt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== h && T(this._$AH) ? this._$AA.nextSibling.data = t : this.T($.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: s } = t, a = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = M.createElement(gt(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === a) this._$AH.p(i);
    else {
      const o = new Tt(a, this), n = o.u(this.options);
      o.p(i), this.T(n), this._$AH = o;
    }
  }
  _$AC(t) {
    let i = nt.get(t.strings);
    return i === void 0 && nt.set(t.strings, i = new M(t)), i;
  }
  k(t) {
    q(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, a = 0;
    for (const o of t) a === i.length ? i.push(s = new I(this.O(k()), this.O(k()), this, this.options)) : s = i[a], s._$AI(o), a++;
    a < i.length && (this._$AR(s && s._$AB.nextSibling, a), i.length = a);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const s = tt(t).nextSibling;
      tt(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class N {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, s, a, o) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = t, this.name = i, this._$AM = a, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = h;
  }
  _$AI(t, i = this, s, a) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = A(this, t, i, 0), n = !T(t) || t !== this._$AH && t !== C, n && (this._$AH = t);
    else {
      const l = t;
      let r, p;
      for (t = o[0], r = 0; r < o.length - 1; r++) p = A(this, l[s + r], i, r), p === C && (p = this._$AH[r]), n ||= !T(p) || p !== this._$AH[r], p === h ? t = h : t !== h && (t += (p ?? "") + o[r + 1]), this._$AH[r] = p;
    }
    n && !a && this.j(t);
  }
  j(t) {
    t === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Mt extends N {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === h ? void 0 : t;
  }
}
class jt extends N {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== h);
  }
}
class It extends N {
  constructor(t, i, s, a, o) {
    super(t, i, s, a, o), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = A(this, t, i, 0) ?? h) === C) return;
    const s = this._$AH, a = t === h && s !== h || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== h && (s === h || a);
    a && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class zt {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    A(this, t);
  }
}
const Dt = Y.litHtmlPolyfillSupport;
Dt?.(M, I), (Y.litHtmlVersions ??= []).push("3.3.2");
const Ot = (e, t, i) => {
  const s = i?.renderBefore ?? t;
  let a = s._$litPart$;
  if (a === void 0) {
    const o = i?.renderBefore ?? null;
    s._$litPart$ = a = new I(t.insertBefore(k(), o), o, void 0, i ?? {});
  }
  return a._$AI(e), a;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const G = globalThis;
class S extends x {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ot(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return C;
  }
}
S._$litElement$ = !0, S.finalized = !0, G.litElementHydrateSupport?.({ LitElement: S });
const Lt = G.litElementPolyfillSupport;
Lt?.({ LitElement: S });
(G.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ut = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Rt = { attribute: !0, type: String, converter: L, reflect: !1, hasChanged: B }, Ht = (e = Rt, t, i) => {
  const { kind: s, metadata: a } = i;
  let o = globalThis.litPropertyMetadata.get(a);
  if (o === void 0 && globalThis.litPropertyMetadata.set(a, o = /* @__PURE__ */ new Map()), s === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(i.name, e), s === "accessor") {
    const { name: n } = i;
    return { set(l) {
      const r = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(n, r, e, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(n, void 0, e, l), l;
    } };
  }
  if (s === "setter") {
    const { name: n } = i;
    return function(l) {
      const r = this[n];
      t.call(this, l), this.requestUpdate(n, r, e, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function V(e) {
  return (t, i) => typeof i == "object" ? Ht(e, t, i) : ((s, a, o) => {
    const n = a.hasOwnProperty(o);
    return a.constructor.createProperty(o, s), n ? Object.getOwnPropertyDescriptor(a, o) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function m(e) {
  return V({ ...e, state: !0, attribute: !1 });
}
const Nt = ht`
  :host {
    display: block;
    --jf-card-bg: var(--card-background-color, #1c1c1c);
    --jf-primary: var(--primary-color, #03a9f4);
    --jf-text: var(--primary-text-color, #fff);
    --jf-text-secondary: var(--secondary-text-color, rgba(255, 255, 255, 0.7));
    --jf-divider: var(--divider-color, rgba(255, 255, 255, 0.12));
    --jf-poster-radius: 10px;
    --jf-transition: 0s;
    --jf-movie-badge: rgb(99, 102, 241);
    --jf-series-badge: rgb(245, 158, 11);
    --jf-border-color: var(--divider-color, rgba(255, 255, 255, 0.15));
  }

  ha-card {
    background: var(--jf-card-bg);
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    z-index: 0;
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 16px 8px;
  }

  .card-header h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--jf-text);
  }

  /* Theme currently playing title */
  .media-item.playing .media-title,
  .media-item.playing .list-title {
    color: var(--jf-primary);
  }

  .card-content {
    padding: 0;
    padding-top: 12px;
    overflow: hidden;
  }

  /* Carousel Layout - Responsive with auto-fit */
  .carousel-wrapper {
    position: relative;
    overflow: hidden;
    touch-action: pan-y; /* Allow vertical scroll, handle horizontal swipe ourselves */
  }

  /* Center alignment uses text-align on wrapper + inline-flex on carousel */
  .carousel-wrapper.align-center {
    text-align: center;
  }

  .carousel {
    display: flex;
    gap: 16px;
    padding: 8px 16px 18px 16px; /* Extra bottom padding for shadow */
    transition: transform 0.3s ease;
    justify-content: flex-start;
  }

  /* Center alignment: inline-flex shrinks to content, max-width allows scroll when needed */
  .carousel-wrapper.align-center .carousel {
    display: inline-flex;
    text-align: left;
    max-width: 100%;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    padding-left: 0;
    padding-right: 0;
  }

  .carousel-wrapper.align-center .carousel::-webkit-scrollbar {
    display: none;
  }

  /* Spacers inside scrollable area for balanced centering */
  .carousel-wrapper.align-center .carousel::before,
  .carousel-wrapper.align-center .carousel::after {
    content: '';
  }

  .carousel.scrollable {
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .carousel.scrollable::-webkit-scrollbar {
    display: none;
  }

  .carousel.paginated {
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-x: none; /* Disable native browser navigation/rubber-banding to use custom */
  }

  .carousel.paginated::-webkit-scrollbar {
    display: none;
  }

  .carousel .media-item {
    flex: 0 0 auto;
  }

  /* Pagination Dots */
  .pagination-dots {
    display: flex;
    justify-content: center;
    gap: 8px;
    padding: 8px 0 12px;
  }

  .pagination-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--jf-divider);
    border: none;
    cursor: pointer;
    padding: 0;
    transition: background var(--jf-transition), transform var(--jf-transition);
    pointer-events: auto;
    z-index: 100;
  }

  .pagination-dot:hover {
    background: var(--jf-text-secondary);
  }

  .pagination-dot.active {
    background: var(--jf-primary);
    transform: scale(1.2);
  }

  /* Scroll Indicator - Elastic pill that stretches between dots */
  .scroll-indicator {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    padding: 8px 0 12px;
    position: relative;
    z-index: 1; /* Below hovered media items */
  }

  /* Base scroll element */
  .scroll-dot {
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: var(--jf-divider);
    transition: width 0.15s ease-out, background 0.15s ease-out, border-radius 0.15s ease-out;
  }

  /* Active dot */
  .scroll-dot.active {
    background: var(--jf-primary);
  }

  /* Pill shape at start/end positions */
  .scroll-dot.pill {
    width: 20px;
  }

  /* Grid outer container to hold scrollable area + fixed indicator */
  .grid-outer {
    position: relative;
  }

  /* Grid Layout */
  .grid {
    display: grid;
    grid-template-columns: repeat(var(--jf-columns, 4), 1fr);
    gap: 16px;
    justify-items: center;
    padding: 8px 16px 18px 16px; /* Extra bottom padding for shadow */
    min-width: fit-content;
  }

  /* Auto-fill responsive grid when columns = 1 (Auto) */
  .grid.auto-columns {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    justify-items: center;
    justify-content: center;
  }

  /* List Wrapper for pagination */
  .list-wrapper {
    position: relative;
    overflow: hidden;
    touch-action: pan-y; /* Allow vertical scroll, handle horizontal swipe ourselves */
  }

  /* Grid Wrapper for pagination */
  .grid-wrapper {
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;
    touch-action: auto; /* Allow both vertical and horizontal touch scrolling */
    -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
    overscroll-behavior-x: none;
  }

  .grid-wrapper::-webkit-scrollbar {
    display: none;
  }

  /* List Layout - supports 1-8 columns, responsive collapse when cramped */
  .list {
    display: grid;
    /* Uses exact column count, each item has min-width so they wrap naturally */
    grid-template-columns: repeat(var(--jf-list-columns, 1), 1fr);
    gap: 16px;
    padding: 8px 16px 20px 16px;
  }

  /* List item min-width handled via JavaScript ResizeObserver */

  /* Single column uses flex for better layout */
  .list.single-column {
    display: flex;
    flex-direction: column;
  }
  
  .list.single-column .media-item {
    min-width: 0;
  }

  /* Extra bottom padding when pagination is enabled */
  .list.paginated {
    padding-bottom: 8px;
  }

  .list .media-item {
    flex-direction: row;
    align-items: flex-start;
    gap: 16px;
  }

  .list .poster-container {
    width: 100px;
    min-width: 100px;
    height: 150px;
    flex-shrink: 0;
  }

  /* List poster wrapper for date */
  .list-poster-wrapper {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .list-date-added {
    margin: 0 0 -1px 0;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--jf-text-secondary);
    text-align: center;
    opacity: 0.8;
    transition: transform 0.2s ease, font-weight 0.2s ease;
  }

  /* Vertical alignment when title is hidden - align with poster top */
  .list-item.no-title .list-info {
    padding-top: 7px;
  }

  /* List info container */
  .list-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
    padding-top: 0;
    justify-content: flex-start;
  }

  /* When metadata is BELOW poster (default), align info with poster top */
  .list-item:not(.metadata-above) .list-info {
    padding-top: 7px;
  }

  /* When metadata is ABOVE poster, align info with the date text above poster */
  .list-item.metadata-above .list-info {
    padding-top: 31px;
  }

  .list-title {
    margin: 0 0 3px 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--jf-text);
    line-height: 1.3;
  }

  .list-metadata {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .list-year {
    font-size: 0.9rem;
    color: var(--jf-text-secondary);
    font-weight: 500;
  }

  .list-type-badge {
    padding: 2px 8px;
    border-radius: 6px;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    color: #fff;
  }

  .list-type-badge.movie {
    background: var(--jf-movie-badge);
  }

  .list-type-badge.series {
    background: var(--jf-series-badge);
  }

  .list-runtime {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--jf-text-secondary);
  }

  .list-runtime ha-icon {
    --mdc-icon-size: 14px;
    margin-top: -2px;
  }

  .list-rating {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    font-size: 0.85rem;
    color: var(--jf-series-badge);
    font-weight: 600;
  }

  .list-rating ha-icon {
    --mdc-icon-size: 14px;
    color: var(--jf-series-badge);
    margin-top: -2px;
  }



  .list-genres {
    margin: 0;
    font-size: 0.85rem;
    color: var(--jf-text-secondary);
    line-height: 1.4;
  }

  .list-description {
    margin: 0;
    font-size: 0.85rem;
    color: var(--jf-text-secondary);
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Remove hover overlay for list layout */
  .list .hover-overlay {
    display: none;
  }

  /* Keep badges visible in list layout */
  .list .media-item:hover .rating,
  .list .media-item:hover .runtime {
    opacity: 1;
  }

  /* Emphasize metadata on hover */
  .list .media-item:hover .list-title {
    color: var(--jf-primary);
  }

  .list .media-item:hover .list-info {
    transform: translateX(2px);
    transition: transform 0.2s ease;
  }

  .list .media-item:hover .list-date-added {
    font-weight: 600;
  }

  /* Move date up when it's above poster */
  .list .media-item:hover .list-poster-wrapper .list-date-added:first-child {
    transform: translateY(-2px);
  }

  /* Move date down when it's below poster */
  .list .media-item:hover .list-poster-wrapper .list-date-added:last-child {
    transform: translateY(2px);
  }

  .list .media-item:hover .list-year,
  .list .media-item:hover .list-runtime,
  .list .media-item:hover .list-rating {
    font-weight: 700;
  }

  /* Media Item Container - NO MOVEMENT on hover */
  .media-item {
    position: relative;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    width: auto;
    z-index: 1;
  }

  .media-item:hover {
    z-index: 10; /* Bring hovered item forward so shadow shows above other elements */
  }

  .media-item:focus {
    outline: none;
  }

  .media-item:focus-visible {
    outline: 2px solid var(--jf-primary);
    outline-offset: 2px;
  }

  /* Poster Container with border */
  .poster-container {
    position: relative;
    width: 140px;
    aspect-ratio: 2/3;
    border-radius: var(--jf-poster-radius);
    overflow: visible;
    background: var(--jf-divider);
    border: 1px solid var(--jf-border-color);
    transition: border-color var(--jf-transition);
  }

  /* Brighter border on hover for dark theme */
  .poster-container:hover {
    border-color: rgba(255, 255, 255, 0.7);
  }

  .poster-inner {
    position: absolute;
    inset: 0;
    border-radius: var(--jf-poster-radius);
    overflow: hidden;
    transition: transform var(--jf-transition), box-shadow var(--jf-transition);
    z-index: 1;
    transform-origin: center center;
    transform: translate3d(0, 0, 0);
    will-change: transform;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    image-rendering: high-quality;
    image-rendering: -webkit-optimize-contrast;
    filter: blur(0);
    -webkit-filter: blur(0);
  }

  /* Only the poster pops out on hover, stays in place */
  .media-item:hover .poster-inner {
    transform: scale(1.05);
    /* Dual shadow: white glow for dark themes, dark shadow for light themes */
    box-shadow: 
      0 0 10px rgba(255, 255, 255, 0.15),
      0 4px 8px rgba(0, 0, 0, 0.25);
    z-index: 10; /* Above scroll indicator */
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: var(--jf-poster-radius);
  }

  /* Press effect for mobile/touch */
  .media-item.active-press .poster-container,
  .media-item:active .poster-container {
    transform: scale(0.96);
    transition: transform 0.1s ease-out;
  }

  /* Vignette overlay for list items on hover */
  .list .poster-inner::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--jf-poster-radius);
    background: radial-gradient(
      ellipse at center,
      transparent 50%,
      rgba(0, 0, 0, 0.4) 100%
    );
    opacity: 0;
    transition: opacity var(--jf-transition);
    pointer-events: none;
  }

  .list .media-item:hover .poster-inner::after {
    opacity: 1;
  }

  .poster {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity var(--jf-transition);
  }

  .poster.loaded {
    opacity: 1;
  }

  /* Skeleton loader */
  .poster-skeleton {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      var(--jf-divider) 25%,
      rgba(255, 255, 255, 0.1) 50%,
      var(--jf-divider) 75%
    );
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
  }

  .poster.loaded + .poster-skeleton {
    display: none;
  }

  @keyframes skeleton-loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* Media Type Badge (MOVIE/SERIES) - Top Left - matches new-badge style */
  .media-type-badge {
    position: absolute;
    top: 6px;
    left: 6px;
    padding: 2px 8px;
    border-radius: 6px;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    color: #fff;
    z-index: 5;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    opacity: 0.90;
  }

  .media-type-badge.movie {
    background: var(--jf-movie-badge);
  }

  .media-type-badge.series {
    background: var(--jf-series-badge);
  }

  /* New Badge - Top Right */
  .new-badge {
    position: absolute;
    top: 6px;
    right: 6px;
    background: var(--jf-primary);
    color: #fff;
    padding: 2px 8px;
    border-radius: 6px;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    z-index: 5;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    opacity: 0.90;
  }

  /* Status Badge (Watched/Unplayed) - Top Right */
  .status-badge {
    position: absolute;
    top: 6px;
    right: 6px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }

  /* Watched Checkmark - Rectangular Green */
  .status-badge.watched {
    padding: 2px 8px;
    border-radius: 6px;
    background: #4CAF50; /* Material Green 500 */
    color: #fff;
    font-size: 0.7rem;
    opacity: 0.90;
  }

  .status-badge.watched ha-icon {
    --mdc-icon-size: 14px;
    margin-top: -1px;
  }

  /* Unplayed Count - Theme Colored Badge */
  .status-badge.unplayed {
    padding: 2px 8px;
    border-radius: 6px;
    background: var(--jf-primary);
    color: #fff;
    font-size: 0.7rem;
    font-weight: 700;
    opacity: 0.90;
  }

  /* Rating Badge - Bottom Right */
  .rating {
    position: absolute;
    bottom: 6px;
    right: 6px;
    display: inline-flex;
    align-items: center;
    gap: 2px;
    background: rgba(0, 0, 0, 0.6);
    color: #ffc107;
    padding: 3px 6px;
    border-radius: 6px;
    font-weight: 600;
    font-size: 0.8rem;
    z-index: 5;
    transition: opacity var(--jf-transition);
  }

  .rating ha-icon {
    --mdc-icon-size: 13px;
    color: #ffc107;
    margin-top: -1px;
  }

  .media-item:hover .rating {
    opacity: 0;
  }

  /* Runtime Badge (bottom-left, gray) */
  .runtime {
    position: absolute;
    bottom: 6px;
    left: 6px;
    display: inline-flex;
    align-items: center;
    gap: 2px;
    background: rgba(0, 0, 0, 0.6);
    color: rgba(255, 255, 255, 0.85);
    padding: 3px 6px;
    border-radius: 6px;
    font-weight: 600;
    font-size: 0.8rem;
    z-index: 5;
    transition: opacity var(--jf-transition);
  }

  .runtime ha-icon {
    --mdc-icon-size: 12px;
    color: rgba(255, 255, 255, 0.85);
    margin-top: -1px;
  }

  .media-item:hover .runtime {
    opacity: 0;
  }

  /* Hover Overlay with bottom gradient - FORCE WHITE TEXT */
  .hover-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.95) 0%,
      rgba(0, 0, 0, 0.85) 25%,
      rgba(0, 0, 0, 0.5) 50%,
      transparent 100%
    );
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 10px;
    opacity: 0;
    transition: opacity var(--jf-transition);
    border-radius: var(--jf-poster-radius);
    z-index: 4;
  }

  .media-item:hover .hover-overlay {
    opacity: 1;
  }

  .hover-overlay .overlay-year {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--jf-primary) !important;
    margin-bottom: 2px;
  }

  .hover-overlay .overlay-title {
    font-size: 0.9rem;
    font-weight: 600;
    color: #fff !important;
    margin: 0 0 6px 0;
    line-height: 1.2;
  }

  .hover-overlay .overlay-description {
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.9) !important;
    margin: 0;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .hover-overlay .overlay-genres {
    font-size: 0.65rem;
    color: rgba(255, 255, 255, 0.65) !important;
    margin: 2px 0 4px 0;
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  /* Metadata Below Image (Default View) */
  .media-info-below {
    padding: 6px 2px 0;
    text-align: center;
    max-width: 140px;
    transition: transform var(--jf-transition);
  }

  /* Metadata Above Image */
  .media-info-above {
    padding: 0 2px 4px;
    text-align: center;
    max-width: 140px;
    transition: transform var(--jf-transition);
  }

  .media-info-above .media-title {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--jf-text);
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1.3;
  }

  .media-info-above .media-year {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--jf-text-secondary);
    margin: 2px 0 0 0;
  }

  .media-info-above .media-date-added {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--jf-text-secondary);
    margin: 0;
    opacity: 0.8;
    transition: font-weight var(--jf-transition);
  }

  .media-item:hover .media-info-above .media-date-added {
    font-weight: 600;
  }

  .media-item:hover .media-info-above {
    transform: translateY(-4px);
  }

  .media-item:hover .media-info-above .media-title {
    font-weight: 700;
    color: var(--jf-primary);
  }

  .media-item:hover .media-info-above .media-year {
    font-weight: 600;
  }

  .media-item:hover .media-info-below {
    transform: translateY(4px);
  }

  .media-info-below .media-title {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--jf-text);
    margin: 0 0 2px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1.3;
    transition: font-weight var(--jf-transition), color var(--jf-transition);
  }

  .media-item:hover .media-info-below .media-title {
    font-weight: 700;
    color: var(--jf-primary);
  }

  .media-info-below .media-year {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--jf-text-secondary);
    margin: 2px 0 0 0;
    transition: font-weight var(--jf-transition);
  }

  .media-item:hover .media-info-below .media-year {
    font-weight: 600;
  }

  .media-info-below .media-date-added {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--jf-text-secondary);
    margin: 0;
    opacity: 0.8;
    transition: font-weight var(--jf-transition);
  }

  .media-item:hover .media-info-below .media-date-added {
    font-weight: 600;
  }

  /* Now Playing Overlay on Poster */
  .now-playing-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    z-index: 10;
    border-radius: var(--jf-poster-radius);
    animation: fadeIn 0.3s ease-out;
  }

  .now-playing-controls {
    display: flex;
    gap: 16px;
    color: #fff;
  }

  .now-playing-controls ha-icon {
    --mdc-icon-size: 32px;
    cursor: pointer;
    transition: transform 0.2s ease, color 0.2s ease;
  }

  .now-playing-controls ha-icon:hover {
    transform: scale(1.1);
    color: var(--jf-primary);
  }

  .now-playing-controls ha-icon.stop:hover {
    color: #f44336;
  }

  .now-playing-status {
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--jf-primary);
    text-transform: uppercase;
    letter-spacing: 1px;
    background: rgba(0, 0, 0, 0.4);
    padding: 2px 8px;
    border-radius: 4px;
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  /* Loading state */
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    color: var(--jf-text-secondary);
  }

  /* Error state */
  .error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    padding: 16px;
    text-align: center;
    color: var(--error-color, #f44336);
  }

  .error ha-icon {
    --mdc-icon-size: 48px;
    margin-bottom: 8px;
  }

  /* Empty state */
  .empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    padding: 16px;
    text-align: center;
    color: var(--jf-text-secondary);
  }

  .empty ha-icon {
    --mdc-icon-size: 48px;
    margin-bottom: 8px;
    opacity: 0.5;
  }

  /* Responsive - smaller screens */
  @media (max-width: 600px) {
    .poster-container {
      width: 120px;
    }

    .media-info-below {
      max-width: 120px;
    }

    .hover-overlay .overlay-description {
      -webkit-line-clamp: 2;
    }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .spinning {
    animation: spin 1s linear infinite;
    transform-origin: center;
  }
`, D = {
  en: {
    loading: "Loading...",
    no_media: "No recent media found",
    error: "Error loading media",
    new: "New",
    minutes: "min"
  },
  de: {
    loading: "Laden...",
    no_media: "Keine neuen Medien gefunden",
    error: "Fehler beim Laden der Medien",
    new: "Neu",
    minutes: "Min"
  },
  fr: {
    loading: "Chargement...",
    no_media: "Aucun média récent trouvé",
    error: "Erreur lors du chargement des médias",
    new: "Nouveau",
    minutes: "min"
  },
  es: {
    loading: "Cargando...",
    no_media: "No se encontraron medios recientes",
    error: "Error al cargar medios",
    new: "Nuevo",
    minutes: "min"
  },
  it: {
    loading: "Caricamento...",
    no_media: "Nessun media recente trovato",
    error: "Errore durante il caricamento dei media",
    new: "Nuovo",
    minutes: "min"
  },
  nl: {
    loading: "Laden...",
    no_media: "Geen recente media gevonden",
    error: "Fout bij het laden van media",
    new: "Nieuw",
    minutes: "min"
  }
};
function rt(e, t) {
  const i = e.split("-")[0].toLowerCase();
  return D[i]?.[t] ? D[i][t] : D.en?.[t] ? D.en[t] : t;
}
var Ut = Object.defineProperty, Xt = Object.getOwnPropertyDescriptor, F = (e, t, i, s) => {
  for (var a = s > 1 ? void 0 : s ? Xt(t, i) : t, o = e.length - 1, n; o >= 0; o--)
    (n = e[o]) && (a = (s ? n(t, i, a) : n(a)) || a);
  return s && a && Ut(t, i, a), a;
};
function Wt(e, t, i) {
  const s = new CustomEvent(t, {
    bubbles: !0,
    composed: !0,
    detail: i
  });
  e.dispatchEvent(s);
}
let j = class extends S {
  setConfig(e) {
    this._config = e;
  }
  render() {
    if (!this.hass || !this._config)
      return c``;
    const e = this._config.click_action || "jellyfin", t = this._config.hold_action || "cast";
    return c`
      <div class="card-config">
        <div class="form-row">
          <ha-selector
            .hass=${this.hass}
            .selector=${{ entity: { domain: "sensor" } }}
            .value=${this._config.entity}
            label="Entity (required)"
            @value-changed=${this._entityChanged}
          ></ha-selector>
        </div>

        <div class="form-row">
          <ha-textfield
            label="Title"
            .value=${this._config.title || ""}
            @input=${this._titleChanged}
          ></ha-textfield>
        </div>

        <div class="form-row">
          <ha-select
            label="Layout"
            .value=${this._config.layout || "carousel"}
            @selected=${this._layoutChanged}
            @closed=${(i) => i.stopPropagation()}
          >
            <mwc-list-item value="carousel">Carousel</mwc-list-item>
            <mwc-list-item value="grid">Grid</mwc-list-item>
            <mwc-list-item value="list">List</mwc-list-item>
          </ha-select>
        </div>

        ${this._config.layout === "grid" || this._config.layout === "list" ? c`
              <div class="form-row">
                <ha-slider
                  labeled
                  min="1"
                  max="${this._config.layout === "list" ? 8 : 12}"
                  .value=${this._config.columns || 1}
                  @change=${this._columnsChanged}
                ></ha-slider>
                <span>Columns: ${(this._config.columns || 1) === 1 ? "Auto" : this._config.columns}</span>
              </div>
            ` : ""}

        <div class="form-row">
          <ha-select
            label="Media Type"
            .value=${this._config.media_type || "both"}
            @selected=${this._mediaTypeChanged}
            @closed=${(i) => i.stopPropagation()}
          >
            <mwc-list-item value="both">Movies & TV Shows</mwc-list-item>
            <mwc-list-item value="movies">Movies Only</mwc-list-item>
            <mwc-list-item value="series">TV Shows Only</mwc-list-item>
          </ha-select>
        </div>

        <div class="form-row">
          <ha-textfield
            label="Items Per Page"
            type="number"
            min="1"
            .value=${this._config.items_per_page !== void 0 ? String(this._config.items_per_page) : ""}
            @input=${this._itemsPerPageChanged}
          ></ha-textfield>
        </div>

        <div class="form-row">
          <ha-textfield
            label="Max Pages"
            type="number"
            min="1"
            max="20"
            .value=${String(this._config.max_pages || 5)}
            @input=${this._maxPagesChanged}
          ></ha-textfield>
        </div>

        <div class="form-row">
          <ha-textfield
            label="Auto Swipe Interval (seconds, 0 = off)"
            type="number"
            min="0"
            max="60"
            .value=${String(this._config.auto_swipe_interval || 0)}
            @input=${this._autoSwipeIntervalChanged}
          ></ha-textfield>
        </div>

        <div class="form-row">
          <ha-textfield
            label="New Badge Days"
            type="number"
            min="0"
            max="30"
            .value=${String(this._config.new_badge_days || 7)}
            @input=${this._newBadgeDaysChanged}
          ></ha-textfield>
        </div>

        <div class="form-row">
          <ha-select
            label="Click Action"
            .value=${e}
            @selected=${this._clickActionChanged}
            @closed=${(i) => i.stopPropagation()}
          >
            <mwc-list-item value="jellyfin">Open in Jellyfin</mwc-list-item>
            <mwc-list-item value="cast">Cast to Chromecast</mwc-list-item>
            <mwc-list-item value="more-info">Show More Info</mwc-list-item>
            <mwc-list-item value="none">No Action</mwc-list-item>
          </ha-select>
        </div>

        <div class="form-row">
          <ha-select
            label="Hold (Long Press) Action"
            .value=${t}
            @selected=${this._holdActionChanged}
            @closed=${(i) => i.stopPropagation()}
          >
            <mwc-list-item value="jellyfin">Open in Jellyfin</mwc-list-item>
            <mwc-list-item value="cast">Cast to Chromecast</mwc-list-item>
            <mwc-list-item value="more-info">Show More Info</mwc-list-item>
            <mwc-list-item value="none">No Action</mwc-list-item>
          </ha-select>
        </div>

        ${e === "cast" || t === "cast" ? c`
              <div class="form-row">
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{ entity: { domain: "media_player" } }}
                  .value=${this._config.default_cast_device}
                  label="Default Cast Device"
                  @value-changed=${this._defaultCastDeviceChanged}
                ></ha-selector>
              </div>
              <div class="checkbox-row">
                <ha-switch
                  .checked=${this._config.show_now_playing !== !1}
                  @change=${this._showNowPlayingChanged}
                ></ha-switch>
                <span>Show "Now Playing" Overlay on Posters</span>
              </div>
            ` : ""}

    <div class="checkbox-row">
      <ha-switch
        .checked=${this._config.show_title !== !1}
        @change=${this._showTitleChanged}
      ></ha-switch>
      <span>Show Title</span>
    </div>

    <div class="checkbox-row">
      <ha-switch
        .checked=${this._config.show_year !== !1}
        @change=${this._showYearChanged}
      ></ha-switch>
      <span>Show Year</span>
    </div>

    <div class="checkbox-row">
      <ha-switch
        .checked=${this._config.show_date_added === !0}
        @change=${this._showDateAddedChanged}
      ></ha-switch>
      <span>Show Date Added</span>
    </div>

    <div class="checkbox-row">
      <ha-switch
        .checked=${this._config.show_ratings !== !1}
        @change=${this._showRatingsChanged}
      ></ha-switch>
      <span>Show Ratings</span>
    </div>

    <div class="checkbox-row">
      <ha-switch
        .checked=${this._config.show_runtime === !0}
        @change=${this._showRuntimeChanged}
      ></ha-switch>
      <span>Show Runtime</span>
    </div>

    <div class="checkbox-row">
      <ha-switch
        .checked=${this._config.show_media_type_badge !== !1}
        @change=${this._showMediaTypeBadgeChanged}
      ></ha-switch>
      <span>Show Media Type Badge (Movie/Series)</span>
    </div>

    <div class="checkbox-row">
      <ha-switch
        .checked=${this._config.show_watched_status !== !1}
        @change=${this._showWatchedStatusChanged}
      ></ha-switch>
      <span>Show Watched Status</span>
    </div>

    <div class="checkbox-row">
      <ha-switch
        .checked=${this._config.show_genres === !0}
        @change=${this._showGenresChanged}
      ></ha-switch>
      <span>Show Genres</span>
    </div>

    <div class="checkbox-row">
      <ha-switch
        .checked=${this._config.show_description_on_hover !== !1}
        @change=${this._showDescriptionOnHoverChanged}
      ></ha-switch>
      <span>Show Description</span>
    </div>

    <div class="form-row">
      <ha-select
        label="Metadata Position"
        .value=${this._config.metadata_position || "below"}
        @selected=${this._metadataPositionChanged}
        @closed=${(i) => i.stopPropagation()}
      >
        <mwc-list-item value="below">Below</mwc-list-item>
        <mwc-list-item value="above">Above</mwc-list-item>
      </ha-select>
    </div>

    <div class="checkbox-row">
      <ha-switch
        .checked=${this._config.show_pagination !== !1}
        @change=${this._showPaginationChanged}
      ></ha-switch>
      <span>Show Pagination Dots</span>
    </div>

    <div class="checkbox-row">
      <ha-switch
        .checked=${this._config.filter_favorites === !0}
        @change=${this._filterFavoritesChanged}
      ></ha-switch>
      <span>Show Only Favorites</span>
    </div>

    <div class="checkbox-row">
      <ha-switch
        .checked=${this._config.filter_unwatched === !0}
        @change=${this._filterUnwatchedChanged}
      ></ha-switch>
      <span>Show Only Unwatched</span>
    </div>
  </div>
`;
  }
  _entityChanged(e) {
    this._updateConfig("entity", e.detail.value);
  }
  _titleChanged(e) {
    const t = e.target;
    this._updateConfig("title", t.value);
  }
  _layoutChanged(e) {
    const t = e.target;
    this._updateConfig("layout", t.value);
  }
  _columnsChanged(e) {
    const t = e.target;
    this._updateConfig("columns", Number(t.value));
  }
  _mediaTypeChanged(e) {
    const t = e.target;
    this._updateConfig("media_type", t.value);
  }
  _itemsPerPageChanged(e) {
    const i = e.target.value.trim();
    i !== "" && this._updateConfig("items_per_page", Number(i));
  }
  _maxPagesChanged(e) {
    const t = e.target;
    this._updateConfig("max_pages", Number(t.value));
  }
  _autoSwipeIntervalChanged(e) {
    const t = e.target;
    this._updateConfig("auto_swipe_interval", Number(t.value));
  }
  _newBadgeDaysChanged(e) {
    const t = e.target;
    this._updateConfig("new_badge_days", Number(t.value));
  }
  _clickActionChanged(e) {
    const t = e.target;
    this._updateConfig("click_action", t.value);
  }
  _holdActionChanged(e) {
    const t = e.target;
    this._updateConfig("hold_action", t.value);
  }
  _defaultCastDeviceChanged(e) {
    this._updateConfig("default_cast_device", e.detail.value);
  }
  _showNowPlayingChanged(e) {
    const t = e.target;
    this._updateConfig("show_now_playing", t.checked);
  }
  _showTitleChanged(e) {
    const t = e.target;
    this._updateConfig("show_title", t.checked);
  }
  _showYearChanged(e) {
    const t = e.target;
    this._updateConfig("show_year", t.checked);
  }
  _showRatingsChanged(e) {
    const t = e.target;
    this._updateConfig("show_ratings", t.checked);
  }
  _showRuntimeChanged(e) {
    const t = e.target;
    this._updateConfig("show_runtime", t.checked);
  }
  _showMediaTypeBadgeChanged(e) {
    const t = e.target;
    this._updateConfig("show_media_type_badge", t.checked);
  }
  _showWatchedStatusChanged(e) {
    const t = e.target;
    this._updateConfig("show_watched_status", t.checked);
  }
  _showGenresChanged(e) {
    const t = e.target;
    this._updateConfig("show_genres", t.checked);
  }
  _showDateAddedChanged(e) {
    const t = e.target;
    this._updateConfig("show_date_added", t.checked);
  }
  _showDescriptionOnHoverChanged(e) {
    const t = e.target;
    this._updateConfig("show_description_on_hover", t.checked);
  }
  _metadataPositionChanged(e) {
    const t = e.target;
    this._updateConfig("metadata_position", t.value);
  }
  _horizontalAlignmentChanged(e) {
    const t = e.target;
    this._updateConfig("horizontal_alignment", t.value);
  }
  _showPaginationChanged(e) {
    const t = e.target;
    this._updateConfig("show_pagination", t.checked);
  }
  _filterFavoritesChanged(e) {
    const t = e.target;
    this._updateConfig("filter_favorites", t.checked);
  }
  _filterUnwatchedChanged(e) {
    const t = e.target;
    this._updateConfig("filter_unwatched", t.checked);
  }
  _updateConfig(e, t) {
    if (!this._config)
      return;
    const i = { ...this._config, [e]: t };
    this._config = i, Wt(this, "config-changed", { config: i });
  }
};
j.styles = ht`
    .form-row {
      margin-bottom: 16px;
    }
    .form-row ha-textfield,
    .form-row ha-select,
    .form-row ha-entity-picker,
    .form-row ha-selector {
      width: 100%;
    }
    .checkbox-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }
  `;
F([
  V({ attribute: !1 })
], j.prototype, "hass", 2);
F([
  m()
], j.prototype, "_config", 2);
j = F([
  ut("jellyha-library-editor")
], j);
var Bt = Object.defineProperty, Yt = Object.getOwnPropertyDescriptor, _ = (e, t, i, s) => {
  for (var a = s > 1 ? void 0 : s ? Yt(t, i) : t, o = e.length - 1, n; o >= 0; o--)
    (n = e[o]) && (a = (s ? n(t, i, a) : n(a)) || a);
  return s && a && Bt(t, i, a), a;
};
const qt = "1.0.0";
console.info(
  `%c JELLYHA-LIBRARY-CARD %c v${qt} `,
  "color: white; background: #00a4dc; font-weight: bold;",
  "color: #00a4dc; background: white; font-weight: bold;"
);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "jellyha-library-card",
  name: "JellyHA Library",
  description: "Display media from Jellyfin",
  preview: !0
});
const lt = {
  title: "Jellyfin Library",
  layout: "carousel",
  media_type: "both",
  items_per_page: 3,
  max_pages: 5,
  auto_swipe_interval: 0,
  // 0 = disabled, otherwise seconds
  columns: 4,
  show_title: !0,
  show_year: !0,
  show_runtime: !0,
  show_ratings: !0,
  show_media_type_badge: !0,
  show_genres: !0,
  show_description_on_hover: !0,
  show_pagination: !0,
  metadata_position: "below",
  rating_source: "auto",
  new_badge_days: 3,
  theme: "auto",
  show_watched_status: !0,
  click_action: "jellyfin",
  hold_action: "cast",
  default_cast_device: "",
  show_now_playing: !0,
  filter_favorites: !1,
  filter_unwatched: !1
};
function Gt(e, t, i) {
  const s = new CustomEvent(t, {
    bubbles: !0,
    composed: !0,
    detail: i
  });
  e.dispatchEvent(s);
}
let u = class extends S {
  constructor() {
    super(), this._currentPage = 0, this._itemsPerPage = 5, this._pressStartTime = 0, this._isHoldActive = !1, this._rewindActive = !1, this._items = [], this._lastUpdate = "", this._touchStartX = 0, this._touchStartY = 0, this._isOverscrolling = !1, this._elasticAnchorX = 0, this._itemTouchStartX = 0, this._itemTouchStartY = 0, this._containerWidth = 0, this.ITEM_WIDTH = 148, this.LIST_ITEM_MIN_WIDTH = 380, this._effectiveListColumns = 1, this._isSwiping = !1, this._scrollProgress = 0, this._hasScrollableContent = !1, this.SCROLL_INDICATOR_DOTS = 5, this._onDotClick = this._onDotClick.bind(this), this._handleTouchStart = this._handleTouchStart.bind(this), this._handleTouchMove = this._handleTouchMove.bind(this), this._handleTouchEnd = this._handleTouchEnd.bind(this), this._handlePointerDown = this._handlePointerDown.bind(this), this._handlePointerMove = this._handlePointerMove.bind(this), this._handlePointerUp = this._handlePointerUp.bind(this), this._handleScroll = this._handleScroll.bind(this);
  }
  connectedCallback() {
    super.connectedCallback(), this._setupResizeHandler(), this._setupAutoSwipe();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._resizeObserver?.disconnect(), this._resizeHandler && window.removeEventListener("resize", this._resizeHandler), this._clearAutoSwipe();
  }
  _setupAutoSwipe() {
    this._clearAutoSwipe();
    const e = this._config?.auto_swipe_interval;
    e && e > 0 && (this._autoSwipeTimer = window.setInterval(() => {
      this._nextPage();
    }, e * 1e3));
  }
  _clearAutoSwipe() {
    this._autoSwipeTimer && (clearInterval(this._autoSwipeTimer), this._autoSwipeTimer = void 0);
  }
  /* Pagination Handlers */
  async _nextPage() {
    if (!this._config?.entity || !this.hass || !this.hass.states[this._config.entity]) return;
    const t = this._filterItems(this._items || []), i = this._config.items_per_page || this._itemsPerPage, s = this._config.max_pages || 10, a = Math.min(Math.ceil(t.length / i), s);
    this._currentPage < a - 1 && await this._animatePageChange("next", () => {
      this._currentPage++;
    });
  }
  async _prevPage() {
    this._currentPage > 0 && await this._animatePageChange("prev", () => {
      this._currentPage--;
    });
  }
  /**
   * Helper to set scroll position after page change
   */
  _setScrollPosition(e) {
    const t = this.shadowRoot?.querySelector(".carousel, .grid-wrapper");
    t && (e === "start" ? t.scrollLeft = 0 : t.scrollLeft = t.scrollWidth);
  }
  /**
   * Helper to animate page changes (Slide & Fade)
   **/
  async _animatePageChange(e, t) {
    const i = this.shadowRoot?.querySelector(".carousel, .grid-wrapper");
    if (!i) {
      t();
      return;
    }
    const s = e === "next" ? "-30px" : "30px";
    i.style.transition = "transform 0.2s ease-out, opacity 0.2s ease-out", i.style.transform = `translateX(${s})`, i.style.opacity = "0", await new Promise((o) => setTimeout(o, 200)), t(), await this.updateComplete, this._setScrollPosition(e === "next" ? "start" : "end");
    const a = e === "next" ? "30px" : "-30px";
    i.style.transition = "none", i.style.opacity = "0", i.style.transform = `translateX(${a})`, i.offsetHeight, i.style.transition = "transform 0.25s ease-out, opacity 0.25s ease-out", i.style.transform = "translateX(0)", i.style.opacity = "1", await new Promise((o) => setTimeout(o, 250)), i.style.transition = "", i.style.transform = "", i.style.opacity = "";
  }
  /**
   * Helper to get total pages (used for elastic check)
   */
  _getTotalPages() {
    if (!this._config?.entity || !this.hass || !this.hass.states[this._config.entity]) return 1;
    const t = this._filterItems(this._items || []), i = this._config.items_per_page || this._itemsPerPage, s = this._config.max_pages || 10;
    return Math.min(Math.ceil(t.length / i), s);
  }
  // Touch/Swipe handlers
  _handleTouchStart(e) {
    this._touchStartX = e.touches[0].clientX, this._touchStartY = e.touches[0].clientY, this._isSwiping = !1, this._isOverscrolling = !1, this._elasticAnchorX = 0;
  }
  _handleTouchMove(e) {
    if (!this._touchStartX) return;
    const t = e.touches[0].clientX - this._touchStartX, i = e.touches[0].clientY - this._touchStartY;
    if (Math.abs(t) > Math.abs(i)) {
      const s = this.shadowRoot?.querySelector(".carousel, .grid-wrapper");
      if (s && Math.abs(t) > 0) {
        const { scrollLeft: a, scrollWidth: o, clientWidth: n } = s, l = o - n, r = a <= 5, p = a >= l - 5, f = this._config.show_pagination !== !1;
        let d = !1;
        if (f) {
          const g = this._getTotalPages();
          r && t > 0 && this._currentPage === 0 && (d = !0), p && t < 0 && this._currentPage >= g - 1 && (d = !0);
        } else
          r && t > 0 && (d = !0), p && t < 0 && (d = !0);
        if (d) {
          this._isOverscrolling || (this._isOverscrolling = !0, this._elasticAnchorX = t), e.preventDefault();
          const g = 0.3, v = t - this._elasticAnchorX;
          s.style.transition = "none", s.style.transform = `translateX(${v * g}px)`;
          return;
        }
      }
      Math.abs(t) > 30 && (this._isSwiping = !0);
    }
  }
  _handleTouchEnd(e) {
    if (this._isOverscrolling) {
      const a = this.shadowRoot?.querySelector(".carousel, .grid-wrapper");
      a && (a.style.transition = "transform 0.4s cubic-bezier(0.25, 0.8, 0.5, 1)", a.style.transform = ""), this._isOverscrolling = !1, this._elasticAnchorX = 0, this._touchStartX = 0, this._isSwiping = !1;
      return;
    }
    if (!this._isSwiping) {
      this._touchStartX = 0;
      return;
    }
    if (this._config.show_pagination === !1) {
      this._touchStartX = 0, this._isSwiping = !1;
      return;
    }
    const t = e.changedTouches[0].clientX - this._touchStartX, i = 50, s = this.shadowRoot?.querySelector(".carousel, .grid-wrapper");
    if (t < -i)
      if (s) {
        const { scrollLeft: a, scrollWidth: o, clientWidth: n } = s;
        a + n >= o - 10 && this._nextPage();
      } else
        this._nextPage();
    else t > i && (s ? s.scrollLeft <= 10 && this._prevPage() : this._prevPage());
    this._touchStartX = 0, this._isSwiping = !1;
  }
  // Pointer events for Android Companion App (uses same logic as touch)
  // Pointer events for Android Companion App (uses same logic as touch)
  _handlePointerDown(e) {
    e.pointerType !== "mouse" && (this._touchStartX = e.clientX, this._touchStartY = e.clientY, this._isSwiping = !1, this._isOverscrolling = !1, this._elasticAnchorX = 0, e.target.setPointerCapture?.(e.pointerId));
  }
  _handlePointerMove(e) {
    if (e.pointerType === "mouse" || !this._touchStartX) return;
    const t = e.clientX - this._touchStartX, i = e.clientY - this._touchStartY;
    if (Math.abs(t) > Math.abs(i)) {
      const s = this.shadowRoot?.querySelector(".carousel, .grid-wrapper");
      if (s && Math.abs(t) > 0) {
        const { scrollLeft: a, scrollWidth: o, clientWidth: n } = s, l = o - n, r = a <= 5, p = a >= l - 5, f = this._config.show_pagination !== !1;
        let d = !1;
        if (f) {
          const g = this._getTotalPages();
          r && t > 0 && this._currentPage === 0 && (d = !0), p && t < 0 && this._currentPage >= g - 1 && (d = !0);
        } else
          r && t > 0 && (d = !0), p && t < 0 && (d = !0);
        if (d) {
          this._isOverscrolling || (this._isOverscrolling = !0, this._elasticAnchorX = t), e.preventDefault();
          const g = 0.3, v = t - this._elasticAnchorX;
          s.style.transition = "none", s.style.transform = `translateX(${v * g}px)`;
          return;
        }
      }
      Math.abs(t) > 30 && (this._isSwiping = !0);
    }
  }
  _handlePointerUp(e) {
    if (e.target.releasePointerCapture?.(e.pointerId), this._isOverscrolling) {
      const a = this.shadowRoot?.querySelector(".carousel, .grid-wrapper");
      a && (a.style.transition = "transform 0.4s cubic-bezier(0.25, 0.8, 0.5, 1)", a.style.transform = ""), this._isOverscrolling = !1, this._elasticAnchorX = 0, this._touchStartX = 0, this._isSwiping = !1;
      return;
    }
    if (e.pointerType === "mouse" || !this._isSwiping) {
      this._touchStartX = 0;
      return;
    }
    if (this._config.show_pagination === !1) {
      this._touchStartX = 0, this._isSwiping = !1;
      return;
    }
    const t = e.clientX - this._touchStartX, i = 50, s = this.shadowRoot?.querySelector(".carousel, .grid-wrapper");
    if (t < -i)
      if (s) {
        const { scrollLeft: a, scrollWidth: o, clientWidth: n } = s;
        a + n >= o - 10 && this._nextPage();
      } else
        this._nextPage();
    else t > i && (s ? s.scrollLeft <= 10 && this._prevPage() : this._prevPage());
    this._touchStartX = 0, this._isSwiping = !1;
  }
  // Scroll handler for elastic dot indicator
  _handleScroll(e) {
    const t = e.target, i = t.scrollWidth, s = t.clientWidth, a = t.scrollLeft, o = i > s + 10;
    if (o !== this._hasScrollableContent && (this._hasScrollableContent = o), o) {
      const n = i - s;
      let l = a / n;
      (n - a < 10 || l > 0.98) && (l = 1), (a < 10 || l < 0.02) && (l = 0), l = Math.min(1, Math.max(0, l)), this._scrollProgress = l;
    }
  }
  // Render scroll indicator for non-paginated scrollable content
  _renderScrollIndicator() {
    if (!this._hasScrollableContent) return c``;
    const e = this.SCROLL_INDICATOR_DOTS, t = this._scrollProgress, i = Math.round(t * (e - 1));
    return c`
      <div class="scroll-indicator">
        ${Array.from({ length: e }, (s, a) => {
      const o = a === i, n = a === 0 && t < 0.1 || a === e - 1 && t > 0.9;
      return c`
        <span 
          class="scroll-dot ${o ? "active" : ""} ${n ? "pill" : ""}"
        ></span>
      `;
    })}
      </div>
    `;
  }
  _setupResizeHandler() {
    this._resizeHandler = () => {
      const t = this.getBoundingClientRect().width;
      if (t === 0) return;
      const i = Math.max(0, t - 32);
      if (i !== this._containerWidth) {
        this._containerWidth = i;
        const a = Math.max(2, Math.floor(i / 160));
        if (a !== this._itemsPerPage && (this._itemsPerPage = a, this.requestUpdate()), this._config) {
          const o = this._config.columns || 1, n = 300;
          if (o > 1) {
            const l = Math.max(1, Math.floor(i / n)), r = Math.min(o, l);
            r !== this._effectiveListColumns && (this._effectiveListColumns = r, this.requestUpdate());
          } else this._effectiveListColumns !== 1 && (this._effectiveListColumns = 1, this.requestUpdate());
        }
      }
    };
    try {
      this._resizeObserver = new ResizeObserver(() => {
        this._resizeHandler && window.requestAnimationFrame(() => this._resizeHandler());
      }), this._resizeObserver.observe(this);
    } catch (e) {
      console.warn("ResizeObserver not supported, falling back to window resize", e), window.addEventListener("resize", this._resizeHandler);
    }
    this._resizeHandler();
  }
  _handleDotClick(e) {
    e !== this._currentPage && (this._currentPage = e, this.requestUpdate());
  }
  _onDotClick(e) {
    e.stopPropagation(), e.preventDefault();
    const t = e.currentTarget, i = parseInt(t.dataset.page || "0", 10);
    this._handleDotClick(i);
  }
  /**
   * Set card configuration
   */
  setConfig(e) {
    if (!e.entity)
      throw new Error("Please define an entity");
    this._config = { ...lt, ...e }, this._effectiveListColumns = this._config.columns || 1;
  }
  /**
   * Return the card editor element
   */
  static getConfigElement() {
    return document.createElement("jellyha-library-editor");
  }
  /**
   * Return default stub config for card picker
   */
  static getStubConfig() {
    return {
      entity: "sensor.jellyha_library",
      ...lt
    };
  }
  /**
   * Get card size for layout
   */
  getCardSize() {
    return this._config?.layout === "list" ? 5 : 3;
  }
  /**
   * Determine if component should update
   */
  shouldUpdate(e) {
    if (!this._config)
      return !1;
    if (e.has("_currentPage") || e.has("_itemsPerPage") || e.has("_items") || e.has("_error") || e.has("_scrollProgress") || e.has("_hasScrollableContent"))
      return !0;
    if (e.has("hass")) {
      const t = e.get("hass");
      if (t) {
        const i = t.states[this._config.entity], s = this.hass.states[this._config.entity], a = this._config.default_cast_device;
        if (a) {
          const o = t.states[a], n = this.hass.states[a];
          if (o !== n) return !0;
        }
        return i !== s;
      }
    }
    return e.has("_config");
  }
  /**
   * Fetch items from WebSocket
   */
  async _fetchItems() {
    if (!(!this._config || !this.hass || !this.hass.states[this._config.entity])) {
      this._error = void 0;
      try {
        const t = await this.hass.callWS({
          type: "jellyha/get_items",
          entity_id: this._config.entity
        });
        t && t.items && (this._items = t.items);
      } catch (t) {
        console.error("Error fetching JellyHA items:", t), this._error = `Error fetching items: ${t}`;
      }
    }
  }
  /**
   * Called after update - check for scrollable content and fetch data
   */
  updated(e) {
    if (super.updated(e), e.has("hass") || e.has("_config")) {
      const t = this.hass?.states[this._config?.entity];
      if (t) {
        const i = t.attributes.entry_id, s = t.attributes.last_updated;
        (s !== this._lastUpdate || this._items.length === 0 && i) && (this._lastUpdate = s, this._fetchItems());
      }
    }
    this._config.show_pagination || requestAnimationFrame(() => {
      const t = this.shadowRoot?.querySelector(".carousel.scrollable, .grid-wrapper, .list-wrapper");
      if (t) {
        const i = t.scrollWidth > t.clientWidth + 10;
        i !== this._hasScrollableContent && (this._hasScrollableContent = i);
      }
    });
  }
  /**
   * Render the card
   */
  render() {
    if (!this._config || !this.hass)
      return c``;
    if (!this.hass.states[this._config.entity])
      return this._renderError(`Entity not found: ${this._config.entity}`);
    if (this._error)
      return this._renderError(this._error);
    const t = this._filterItems(this._items || []);
    return c`
      <ha-card>
        ${this._config.title ? c`
              <div class="card-header">
                <h2>${this._config.title}</h2>
              </div>
            ` : h}
        <div class="card-content">
          ${t.length === 0 ? this._renderEmpty() : this._renderLayout(t)}
        </div>
      </ha-card>
    `;
  }
  /**
   * Filter items based on config
   */
  _filterItems(e) {
    let t = e;
    this._config.media_type === "movies" ? t = t.filter((s) => s.type === "Movie") : this._config.media_type === "series" && (t = t.filter((s) => s.type === "Series")), this._config.filter_favorites && (t = t.filter((s) => s.is_favorite === !0)), this._config.filter_unwatched && (t = t.filter((s) => !s.is_played));
    const i = (this._config.items_per_page || 5) * (this._config.max_pages || 5);
    return t = t.slice(0, i), t;
  }
  /**
   * Render layout based on config
   */
  _renderLayout(e) {
    const t = this._config.layout || "carousel", i = this._config.show_pagination !== !1;
    return t === "carousel" ? this._renderCarousel(e, i) : t === "list" ? this._renderList(e, i) : t === "grid" ? this._renderGrid(e, i) : c`
      <div class="${t}">
        ${e.map((s) => this._renderMediaItem(s))}
      </div>
    `;
  }
  /**
   * Render carousel with optional pagination
   */
  _renderCarousel(e, t) {
    const i = this._config.items_per_page || this._itemsPerPage, s = this._config.max_pages || 10, a = Math.min(Math.ceil(e.length / i), s), o = this._currentPage * i, n = t ? e.slice(o, o + i) : e;
    return c`
      <div 
        class="carousel-wrapper ${this._config.horizontal_alignment !== "left" ? "align-center" : ""}"
        @touchstart="${this._handleTouchStart}"
        @touchmove="${this._handleTouchMove}"
        @touchend="${this._handleTouchEnd}"
        @pointerdown="${this._handlePointerDown}"
        @pointermove="${this._handlePointerMove}"
        @pointerup="${this._handlePointerUp}"
      >
        <div 
          class="carousel ${t ? "paginated" : "scrollable"}"
          @scroll="${t ? h : this._handleScroll}"
        >
          ${n.map((l) => this._renderMediaItem(l))}
        </div>
        ${t && a > 1 ? c`
              <div class="pagination-dots">
                ${Array.from({ length: a }, (l, r) => c`
                  <button
                    type="button"
                    class="pagination-dot ${r === this._currentPage ? "active" : ""}"
                    data-page="${r}"
                    @click="${this._onDotClick}"
                    aria-label="Go to page ${r + 1}"
                  ></button>
                `)}
              </div>
            ` : h}
        ${t ? h : this._renderScrollIndicator()}
      </div>
    `;
  }
  /**
   * Render list with optional pagination
   */
  _renderList(e, t) {
    const i = this._config.items_per_page || this._itemsPerPage, s = this._config.max_pages || 10, a = Math.min(Math.ceil(e.length / i), s), o = this._currentPage * i, n = t ? e.slice(o, o + i) : e, l = this._effectiveListColumns, r = l === 1;
    return c`
      <div 
        class="list-wrapper"
        @touchstart="${this._handleTouchStart}"
        @touchmove="${this._handleTouchMove}"
        @touchend="${this._handleTouchEnd}"
        @pointerdown="${this._handlePointerDown}"
        @pointermove="${this._handlePointerMove}"
        @pointerup="${this._handlePointerUp}"
      >
        <div 
          class="list ${t ? "paginated" : ""} ${r ? "single-column" : ""}"
          style="--jf-list-columns: ${l}"
        >
          ${n.map((p) => this._renderListItem(p))}
        </div>
        ${t && a > 1 ? c`
              <div class="pagination-dots">
                ${Array.from({ length: a }, (p, f) => c`
                  <button
                    type="button"
                    class="pagination-dot ${f === this._currentPage ? "active" : ""}"
                    data-page="${f}"
                    @click="${this._onDotClick}"
                    aria-label="Go to page ${f + 1}"
                  ></button>
                `)}
              </div>
            ` : h}
      </div>
    `;
  }
  /**
   * Render grid with optional pagination
   */
  _renderGrid(e, t) {
    const i = this._config.items_per_page || this._itemsPerPage, s = this._config.max_pages || 10, a = Math.min(Math.ceil(e.length / i), s), o = this._currentPage * i, n = t ? e.slice(o, o + i) : e, l = this._config.columns || 1, r = l === 1;
    return c`
      <div class="grid-outer">
        <div 
          class="grid-wrapper"
          @touchstart="${this._handleTouchStart}"
          @touchmove="${this._handleTouchMove}"
          @touchend="${this._handleTouchEnd}"
          @pointerdown="${this._handlePointerDown}"
          @pointermove="${this._handlePointerMove}"
          @pointerup="${this._handlePointerUp}"
          @scroll="${t ? h : this._handleScroll}"
        >
          <div
            class="grid ${t ? "paginated" : ""} ${r ? "auto-columns" : ""}"
            style="--jf-columns: ${l}"
          >
            ${n.map((p) => this._renderMediaItem(p))}
          </div>
        </div>
        ${t && a > 1 ? c`
              <div class="pagination-dots">
                ${Array.from({ length: a }, (p, f) => c`
                  <button
                    type="button"
                    class="pagination-dot ${f === this._currentPage ? "active" : ""}"
                    data-page="${f}"
                    @click="${this._onDotClick}"
                    aria-label="Go to page ${f + 1}"
                  ></button>
                `)}
              </div>
            ` : h}
        ${t ? h : this._renderScrollIndicator()}
      </div>
    `;
  }
  /**
   * Render individual list item (horizontal layout with metadata outside poster)
   */
  _renderListItem(e) {
    const t = this._isNewItem(e), i = this._getRating(e), s = this._config.show_media_type_badge !== !1, a = this._isItemPlaying(e);
    return c`
      <div
        class="media-item list-item ${a ? "playing" : ""} ${this._config.show_title ? "" : "no-title"} ${this._config.metadata_position === "above" ? "metadata-above" : ""}"
        tabindex="0"
        role="button"
        aria-label="${e.name}"
        @mousedown="${(o) => this._handleMouseDown(o, e)}"
        @mouseup="${(o) => this._handleMouseUp(o, e)}"
        @touchstart="${(o) => this._handleTouchStartItem(o, e)}"
        @touchmove="${(o) => this._handleTouchMoveItem(o, e)}"
        @touchend="${(o) => this._handleTouchEndItem(o, e)}"
        @touchcancel="${(o) => this._handleTouchEndItem(o, e)}"
        @keydown="${(o) => this._handleKeydown(o, e)}"
      >
        <div class="list-poster-wrapper">
          ${this._config.metadata_position === "above" && this._config.show_date_added && e.date_added ? c`<p class="list-date-added">${this._formatDate(e.date_added)}</p>` : h}
          <div class="poster-container" id="poster-${e.id}">
            <div class="poster-inner">
              <img
                class="poster"
                src="${e.poster_url}"
                alt="${e.name}"
                loading="lazy"
                @load="${this._handleImageLoad}"
                @error="${this._handleImageError}"
              />
              <div class="poster-skeleton"></div>
              
              ${s && !a ? c`<span class="list-type-badge ${e.type === "Movie" ? "movie" : "series"}">
                  ${e.type === "Movie" ? "Movie" : "Series"}
                </span>` : h}
              
              ${a ? h : this._renderStatusBadge(e, t)}
              ${this._renderNowPlayingOverlay(e)}
            </div>
          </div>
          ${this._config.metadata_position !== "above" && this._config.show_date_added && e.date_added ? c`<p class="list-date-added">${this._formatDate(e.date_added)}</p>` : h}
        </div>
        
        <div class="list-info">
          ${this._config.show_title ? c`<h3 class="list-title">${e.name}</h3>` : h}
          
          <div class="list-metadata">
            ${s && !a ? c`<span class="list-type-badge ${e.type === "Movie" ? "movie" : "series"}">
                  ${e.type === "Movie" ? "Movie" : "Series"}
                </span>` : h}
            ${this._config.show_year && e.year ? c`<span class="list-year">${e.year}</span>` : h}
            ${this._config.show_ratings && i ? c`<span class="list-rating">
                  <ha-icon icon="mdi:star"></ha-icon>
                  ${i.toFixed(1)}
                </span>` : h}
            ${this._config.show_runtime && e.runtime_minutes ? c`<span class="list-runtime">
                  <ha-icon icon="mdi:clock-outline"></ha-icon>
                  ${this._formatRuntime(e.runtime_minutes)}
                </span>` : h}
          </div>
          
          ${this._config.show_genres && e.genres && e.genres.length > 0 ? c`<p class="list-genres">${e.genres.slice(0, 3).join(", ")}</p>` : h}
          
          ${this._config.show_description_on_hover !== !1 && e.description ? c`<p class="list-description">${e.description}</p>` : h}
        </div>
      </div>
    `;
  }
  /**
   * Render status badge (watched checkmark, unplayed count, or new badge)
   */
  _renderStatusBadge(e, t) {
    const i = this._config.show_watched_status !== !1;
    return i && e.is_played ? c`
        <div class="status-badge watched">
          <ha-icon icon="mdi:check-bold"></ha-icon>
        </div>
      ` : i && e.type === "Series" && (e.unplayed_count || 0) > 0 ? c`
        <div class="status-badge unplayed">
          ${e.unplayed_count}
        </div>
      ` : t ? c`<span class="new-badge">${rt(this.hass.language, "new")}</span>` : c``;
  }
  /**
   * Render individual media item
   */
  _renderMediaItem(e) {
    const t = this._isNewItem(e), i = this._getRating(e), s = this._config.show_media_type_badge !== !1, a = this._isItemPlaying(e);
    return c`
      <div
        class="media-item ${a ? "playing" : ""}"
        tabindex="0"
        role="button"
        aria-label="${e.name}"
        @mousedown="${(o) => this._handleMouseDown(o, e)}"
        @mouseup="${(o) => this._handleMouseUp(o, e)}"
        @touchstart="${(o) => this._handleTouchStartItem(o, e)}"
        @touchmove="${(o) => this._handleTouchMoveItem(o, e)}"
        @touchend="${(o) => this._handleTouchEndItem(o, e)}"
        @touchcancel="${(o) => this._handleTouchEndItem(o, e)}"
        @keydown="${(o) => this._handleKeydown(o, e)}"
      >
        ${this._config.metadata_position === "above" ? c`
              <div class="media-info-above">
                ${this._config.show_title ? c`<p class="media-title">${e.name}</p>` : h}
                ${this._config.show_year && e.year ? c`<p class="media-year">${e.year}</p>` : h}
                ${this._config.show_date_added && e.date_added ? c`<p class="media-date-added">${this._formatDate(e.date_added)}</p>` : h}
              </div>
            ` : h}
        <div class="poster-container" id="poster-${e.id}">
          <div class="poster-inner">
            <img
              class="poster"
              src="${e.poster_url}"
              alt="${e.name}"
              loading="lazy"
              @load="${this._handleImageLoad}"
              @error="${this._handleImageError}"
            />
            <div class="poster-skeleton"></div>
            
            ${s && !a ? c`<span class="media-type-badge ${e.type === "Movie" ? "movie" : "series"}">
                  ${e.type === "Movie" ? "Movie" : "Series"}
                </span>` : h}
            
            ${a ? h : this._renderStatusBadge(e, t)}
            
            ${this._config.show_ratings && i && !a ? c`
                  <span class="rating">
                    <ha-icon icon="mdi:star"></ha-icon>
                    ${i.toFixed(1)}
                  </span>
                ` : h}
            
            ${this._config.show_runtime && e.runtime_minutes && !a ? c`
                  <span class="runtime">
                    <ha-icon icon="mdi:clock-outline"></ha-icon>
                    ${this._formatRuntime(e.runtime_minutes)}
                  </span>
                ` : h}
            
            ${a ? h : c`
            <div class="hover-overlay">
                    ${e.year ? c`<span class="overlay-year">${e.year}</span>` : h}
                    <h3 class="overlay-title">${e.name}</h3>
                    ${this._config.show_genres && e.genres && e.genres.length > 0 ? c`<span class="overlay-genres">${e.genres.slice(0, 3).join(", ")}</span>` : h}
                    ${this._config.show_description_on_hover !== !1 && e.description ? c`<p class="overlay-description">${e.description}</p>` : h}
            </div>`}

            ${this._renderNowPlayingOverlay(e)}
          </div>
        </div>
        
        ${this._config.metadata_position === "below" ? c`
              <div class="media-info-below">
                ${this._config.show_title ? c`<p class="media-title">${e.name}</p>` : h}
                ${this._config.show_year && e.year ? c`<p class="media-year">${e.year}</p>` : h}
                ${this._config.show_date_added && e.date_added ? c`<p class="media-date-added">${this._formatDate(e.date_added)}</p>` : h}
              </div>
            ` : h}
      </div>
    `;
  }
  /**
   * Get rating based on config (IMDB for movies, TMDB for TV)
   */
  _getRating(e) {
    return this._config.rating_source === "auto", e.rating || null;
  }
  /**
   * Format date using Home Assistant's locale
   */
  _formatDate(e) {
    try {
      const t = new Date(e), i = this.hass?.language || "en";
      return t.toLocaleDateString(i, {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    } catch {
      return e;
    }
  }
  /**
   * Format runtime in hours and minutes
   */
  _formatRuntime(e) {
    if (e < 60)
      return `${e}m`;
    const t = Math.floor(e / 60), i = e % 60;
    return i > 0 ? `${t}h ${i}m` : `${t}h`;
  }
  /**
   * Check if item was added within new_badge_days
   */
  _isNewItem(e) {
    if (!this._config.new_badge_days || !e.date_added)
      return !1;
    const t = new Date(e.date_added);
    return ((/* @__PURE__ */ new Date()).getTime() - t.getTime()) / (1e3 * 60 * 60 * 24) <= this._config.new_badge_days;
  }
  /**
   * Start hold timer
   */
  _startHoldTimer(e) {
    this._pressStartTime = Date.now(), this._isHoldActive = !1, this._holdTimer = window.setTimeout(() => {
      this._isHoldActive = !0, this._performAction(e, "hold");
    }, 500);
  }
  /**
   * Clear hold timer
   */
  _clearHoldTimer() {
    this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = void 0);
  }
  /**
   * Handle mouse down on media item
   */
  _handleMouseDown(e, t) {
    e.button === 0 && this._startHoldTimer(t);
  }
  /**
   * Handle mouse up on media item
   */
  _handleMouseUp(e, t) {
    this._isHoldActive ? (e.preventDefault(), e.stopPropagation()) : Date.now() - this._pressStartTime < 500 && this._performAction(t, "click"), this._clearHoldTimer();
  }
  /**
   * Handle touch start on media item
   */
  _handleTouchStartItem(e, t) {
    e.touches.length > 0 && (this._itemTouchStartX = e.touches[0].clientX, this._itemTouchStartY = e.touches[0].clientY, e.currentTarget.classList.add("active-press")), this._startHoldTimer(t);
  }
  _handleTouchMoveItem(e, t) {
    if (e.touches.length > 0) {
      const i = Math.abs(e.touches[0].clientX - this._itemTouchStartX), s = Math.abs(e.touches[0].clientY - this._itemTouchStartY);
      (i > 10 || s > 10) && (this._clearHoldTimer(), e.currentTarget.classList.remove("active-press"));
    }
  }
  _handleTouchEndItem(e, t) {
    e.currentTarget.classList.remove("active-press"), this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = void 0);
    let s = 0;
    if (e.changedTouches.length > 0) {
      const a = e.changedTouches[0].clientX - this._itemTouchStartX, o = e.changedTouches[0].clientY - this._itemTouchStartY;
      s = Math.sqrt(a * a + o * o);
    }
    if (e.preventDefault(), this._isHoldActive) {
      this._isHoldActive = !1;
      return;
    }
    s > 10 || this._performAction(t, "click");
  }
  /**
   * Check if item is currently playing
   */
  _isItemPlaying(e) {
    if (!this._config.default_cast_device || !this.hass) return !1;
    const t = this.hass.states[this._config.default_cast_device];
    if (!t || t.state !== "playing" && t.state !== "paused" && t.state !== "buffering")
      return !1;
    const i = t.attributes.media_title, s = t.attributes.media_series_title;
    return e.name && (i === e.name || s === e.name) || e.type === "Series" && s === e.name;
  }
  /**
   * Perform configured action
   */
  _performAction(e, t) {
    const i = new CustomEvent("haptic", {
      detail: "selection",
      bubbles: !0,
      composed: !0
    });
    switch (this.dispatchEvent(i), t === "click" ? this._config.click_action : this._config.hold_action) {
      case "jellyfin":
        window.open(e.jellyfin_url, "_blank");
        break;
      case "cast":
        this._castMedia(e);
        break;
      case "more-info":
        Gt(this, "hass-more-info", {
          entityId: this._config.entity
        });
        break;
    }
  }
  /**
   * Cast media to default device
   */
  async _castMedia(e) {
    const t = this._config.default_cast_device;
    if (!t) {
      console.warn("JellyHA: No default cast device configured");
      return;
    }
    try {
      await this.hass.callService("jellyha", "play_on_chromecast", {
        entity_id: t,
        item_id: e.id
      });
    } catch (i) {
      console.error("JellyHA: Failed to cast media", i);
    }
  }
  /**
   * Handle click on media item (for accessibility)
   */
  _handleClick(e) {
    this._performAction(e, "click");
  }
  /**
   * Handle keyboard navigation
   */
  _handleKeydown(e, t) {
    (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this._performAction(t, "click"));
  }
  /**
   * Handle image load - add loaded class for transition
   */
  _handleImageLoad(e) {
    e.target.classList.add("loaded");
  }
  /**
   * Handle image error - could show placeholder
   */
  _handleImageError(e) {
    const t = e.target;
    t.style.display = "none";
  }
  /**
   * Render Now Playing overlay if item matches currently playing media
   */
  _renderNowPlayingOverlay(e) {
    if (!this._config.show_now_playing || !this._isItemPlaying(e))
      return h;
    const t = this.hass.states[this._config.default_cast_device];
    return c`
      <div 
        class="now-playing-overlay" 
        @click="${() => this._handleRewind(this._config.default_cast_device)}"
        @mousedown="${this._stopPropagation}"
        @mouseup="${this._stopPropagation}"
        @touchstart="${this._stopPropagation}"
        @touchend="${this._stopPropagation}"
        @touchcancel="${this._stopPropagation}"
      >
        <span class="now-playing-status">
          ${this._rewindActive ? "REWINDING" : t.state}
        </span>
        <div class="now-playing-controls">
          <ha-icon
            class="${this._rewindActive ? "spinning" : ""}"
            icon="${this._rewindActive ? "mdi:loading" : t.state === "playing" ? "mdi:pause" : "mdi:play"}"
            @click="${(i) => {
      i.stopPropagation(), this._handlePlayPause(this._config.default_cast_device);
    }}"
          ></ha-icon>
          <ha-icon
            class="stop"
            icon="mdi:stop"
            @click="${(i) => {
      i.stopPropagation(), this._handleStop(this._config.default_cast_device);
    }}"
          ></ha-icon>
        </div>
      </div>
    `;
  }
  _stopPropagation(e) {
    e.stopPropagation();
  }
  /**
   * Toggle play/pause on player
   */
  _handlePlayPause(e) {
    const t = new CustomEvent("haptic", {
      detail: "selection",
      bubbles: !0,
      composed: !0
    });
    this.dispatchEvent(t), this.hass.callService("media_player", "media_play_pause", { entity_id: e });
  }
  /**
   * Stop playback on player
   */
  _handleStop(e) {
    const t = new CustomEvent("haptic", {
      detail: "selection",
      bubbles: !0,
      composed: !0
    });
    this.dispatchEvent(t), this.hass.callService("media_player", "turn_off", { entity_id: e });
  }
  /**
   * Handle rewind on overlay click
   */
  _handleRewind(e) {
    this._rewindActive = !0, setTimeout(() => {
      this._rewindActive = !1;
    }, 2e3);
    const t = new CustomEvent("haptic", {
      detail: "selection",
      bubbles: !0,
      composed: !0
    });
    this.dispatchEvent(t);
    const i = this.hass.states[e];
    if (i && i.attributes.media_position) {
      const s = i.attributes.media_position, a = i.attributes.media_position_updated_at;
      let o = s;
      if (a) {
        const l = (/* @__PURE__ */ new Date()).getTime(), r = new Date(a).getTime(), p = (l - r) / 1e3;
        i.state === "playing" && (o += p);
      }
      const n = Math.max(0, o - 20);
      this.hass.callService("media_player", "media_seek", {
        entity_id: e,
        seek_position: n
      });
    }
  }
  /**
   * Render empty state
   */
  _renderEmpty() {
    return c`
      <div class="empty">
        <ha-icon icon="mdi:movie-open-outline"></ha-icon>
        <p>${rt(this.hass.language, "no_media")}</p>
      </div>
    `;
  }
  /**
   * Render error state
   */
  _renderError(e) {
    return c`
      <ha-card>
        <div class="error">
          <ha-icon icon="mdi:alert-circle"></ha-icon>
          <p>${e}</p>
        </div>
      </ha-card>
    `;
  }
};
u.styles = Nt;
_([
  V({ attribute: !1 })
], u.prototype, "hass", 2);
_([
  m()
], u.prototype, "_config", 2);
_([
  m()
], u.prototype, "_currentPage", 2);
_([
  m()
], u.prototype, "_itemsPerPage", 2);
_([
  m()
], u.prototype, "_error", 2);
_([
  m()
], u.prototype, "_pressStartTime", 2);
_([
  m()
], u.prototype, "_holdTimer", 2);
_([
  m()
], u.prototype, "_isHoldActive", 2);
_([
  m()
], u.prototype, "_rewindActive", 2);
_([
  m()
], u.prototype, "_items", 2);
_([
  m()
], u.prototype, "_lastUpdate", 2);
_([
  m()
], u.prototype, "_scrollProgress", 2);
_([
  m()
], u.prototype, "_hasScrollableContent", 2);
u = _([
  ut("jellyha-library-card")
], u);
//# sourceMappingURL=jellyha-cards.js.map
