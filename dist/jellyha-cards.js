/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = globalThis, B = O.ShadowRoot && (O.ShadyCSS === void 0 || O.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, W = Symbol(), F = /* @__PURE__ */ new WeakMap();
let ct = class {
  constructor(t, i, s) {
    if (this._$cssResult$ = !0, s !== W) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (B && t === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (t = F.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && F.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const _t = (e) => new ct(typeof e == "string" ? e : e + "", void 0, W), dt = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((s, a, o) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(a) + e[o + 1], e[0]);
  return new ct(i, e, W);
}, mt = (e, t) => {
  if (B) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const s = document.createElement("style"), a = O.litNonce;
    a !== void 0 && s.setAttribute("nonce", a), s.textContent = i.cssText, e.appendChild(s);
  }
}, K = B ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return _t(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: vt, defineProperty: wt, getOwnPropertyDescriptor: yt, getOwnPropertyNames: bt, getOwnPropertySymbols: $t, getPrototypeOf: xt } = Object, L = globalThis, Z = L.trustedTypes, St = Z ? Z.emptyScript : "", Ct = L.reactiveElementPolyfillSupport, k = (e, t) => e, N = { toAttribute(e, t) {
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
} }, X = (e, t) => !vt(e, t), Q = { attribute: !0, type: String, converter: N, reflect: !1, useDefault: !1, hasChanged: X };
Symbol.metadata ??= Symbol("metadata"), L.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
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
      const c = a?.call(this);
      o?.call(this, n), this.requestUpdate(t, c, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Q;
  }
  static _$Ei() {
    if (this.hasOwnProperty(k("elementProperties"))) return;
    const t = xt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(k("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(k("properties"))) {
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
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : N).toAttribute(i, s.type);
      this._$Em = t, o == null ? this.removeAttribute(a) : this.setAttribute(a, o), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const s = this.constructor, a = s._$Eh.get(t);
    if (a !== void 0 && this._$Em !== a) {
      const o = s.getPropertyOptions(a), n = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : N;
      this._$Em = a;
      const c = n.fromAttribute(i, o.type);
      this[a] = c ?? this._$Ej?.get(a) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, i, s, a = !1, o) {
    if (t !== void 0) {
      const n = this.constructor;
      if (a === !1 && (o = this[t]), s ??= n.getPropertyOptions(t), !((s.hasChanged ?? X)(o, i) || s.useDefault && s.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, s)))) return;
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
        const { wrapped: n } = o, c = this[a];
        n !== !0 || this._$AL.has(a) || c === void 0 || this.C(a, void 0, o, c);
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
x.elementStyles = [], x.shadowRootOptions = { mode: "open" }, x[k("elementProperties")] = /* @__PURE__ */ new Map(), x[k("finalized")] = /* @__PURE__ */ new Map(), Ct?.({ ReactiveElement: x }), (L.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Y = globalThis, tt = (e) => e, H = Y.trustedTypes, et = H ? H.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ht = "$lit$", w = `lit$${Math.random().toFixed(9).slice(2)}$`, pt = "?" + w, At = `<${pt}>`, $ = document, E = () => $.createComment(""), T = (e) => e === null || typeof e != "object" && typeof e != "function", q = Array.isArray, Pt = (e) => q(e) || typeof e?.[Symbol.iterator] == "function", U = `[ 	
\f\r]`, P = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, it = /-->/g, st = />/g, y = RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), at = /'/g, ot = /"/g, gt = /^(?:script|style|textarea|title)$/i, kt = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), r = kt(1), C = Symbol.for("lit-noChange"), l = Symbol.for("lit-nothing"), nt = /* @__PURE__ */ new WeakMap(), b = $.createTreeWalker($, 129);
function ut(e, t) {
  if (!q(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return et !== void 0 ? et.createHTML(t) : t;
}
const Et = (e, t) => {
  const i = e.length - 1, s = [];
  let a, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = P;
  for (let c = 0; c < i; c++) {
    const d = e[c];
    let h, p, g = -1, m = 0;
    for (; m < d.length && (n.lastIndex = m, p = n.exec(d), p !== null); ) m = n.lastIndex, n === P ? p[1] === "!--" ? n = it : p[1] !== void 0 ? n = st : p[2] !== void 0 ? (gt.test(p[2]) && (a = RegExp("</" + p[2], "g")), n = y) : p[3] !== void 0 && (n = y) : n === y ? p[0] === ">" ? (n = a ?? P, g = -1) : p[1] === void 0 ? g = -2 : (g = n.lastIndex - p[2].length, h = p[1], n = p[3] === void 0 ? y : p[3] === '"' ? ot : at) : n === ot || n === at ? n = y : n === it || n === st ? n = P : (n = y, a = void 0);
    const v = n === y && e[c + 1].startsWith("/>") ? " " : "";
    o += n === P ? d + At : g >= 0 ? (s.push(h), d.slice(0, g) + ht + d.slice(g) + w + v) : d + w + (g === -2 ? c : v);
  }
  return [ut(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class j {
  constructor({ strings: t, _$litType$: i }, s) {
    let a;
    this.parts = [];
    let o = 0, n = 0;
    const c = t.length - 1, d = this.parts, [h, p] = Et(t, i);
    if (this.el = j.createElement(h, s), b.currentNode = this.el.content, i === 2 || i === 3) {
      const g = this.el.content.firstChild;
      g.replaceWith(...g.childNodes);
    }
    for (; (a = b.nextNode()) !== null && d.length < c; ) {
      if (a.nodeType === 1) {
        if (a.hasAttributes()) for (const g of a.getAttributeNames()) if (g.endsWith(ht)) {
          const m = p[n++], v = a.getAttribute(g).split(w), I = /([.?@])?(.*)/.exec(m);
          d.push({ type: 1, index: o, name: I[2], strings: v, ctor: I[1] === "." ? jt : I[1] === "?" ? Mt : I[1] === "@" ? Dt : R }), a.removeAttribute(g);
        } else g.startsWith(w) && (d.push({ type: 6, index: o }), a.removeAttribute(g));
        if (gt.test(a.tagName)) {
          const g = a.textContent.split(w), m = g.length - 1;
          if (m > 0) {
            a.textContent = H ? H.emptyScript : "";
            for (let v = 0; v < m; v++) a.append(g[v], E()), b.nextNode(), d.push({ type: 2, index: ++o });
            a.append(g[m], E());
          }
        }
      } else if (a.nodeType === 8) if (a.data === pt) d.push({ type: 2, index: o });
      else {
        let g = -1;
        for (; (g = a.data.indexOf(w, g + 1)) !== -1; ) d.push({ type: 7, index: o }), g += w.length - 1;
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
    let o = b.nextNode(), n = 0, c = 0, d = s[0];
    for (; d !== void 0; ) {
      if (n === d.index) {
        let h;
        d.type === 2 ? h = new D(o, o.nextSibling, this, t) : d.type === 1 ? h = new d.ctor(o, d.name, d.strings, this, t) : d.type === 6 && (h = new It(o, this, t)), this._$AV.push(h), d = s[++c];
      }
      n !== d?.index && (o = b.nextNode(), n++);
    }
    return b.currentNode = $, a;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class D {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, s, a) {
    this.type = 2, this._$AH = l, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = a, this._$Cv = a?.isConnected ?? !0;
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
    t = A(this, t, i), T(t) ? t === l || t == null || t === "" ? (this._$AH !== l && this._$AR(), this._$AH = l) : t !== this._$AH && t !== C && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Pt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== l && T(this._$AH) ? this._$AA.nextSibling.data = t : this.T($.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: s } = t, a = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = j.createElement(ut(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === a) this._$AH.p(i);
    else {
      const o = new Tt(a, this), n = o.u(this.options);
      o.p(i), this.T(n), this._$AH = o;
    }
  }
  _$AC(t) {
    let i = nt.get(t.strings);
    return i === void 0 && nt.set(t.strings, i = new j(t)), i;
  }
  k(t) {
    q(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, a = 0;
    for (const o of t) a === i.length ? i.push(s = new D(this.O(E()), this.O(E()), this, this.options)) : s = i[a], s._$AI(o), a++;
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
class R {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, s, a, o) {
    this.type = 1, this._$AH = l, this._$AN = void 0, this.element = t, this.name = i, this._$AM = a, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = l;
  }
  _$AI(t, i = this, s, a) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = A(this, t, i, 0), n = !T(t) || t !== this._$AH && t !== C, n && (this._$AH = t);
    else {
      const c = t;
      let d, h;
      for (t = o[0], d = 0; d < o.length - 1; d++) h = A(this, c[s + d], i, d), h === C && (h = this._$AH[d]), n ||= !T(h) || h !== this._$AH[d], h === l ? t = l : t !== l && (t += (h ?? "") + o[d + 1]), this._$AH[d] = h;
    }
    n && !a && this.j(t);
  }
  j(t) {
    t === l ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class jt extends R {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === l ? void 0 : t;
  }
}
class Mt extends R {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== l);
  }
}
class Dt extends R {
  constructor(t, i, s, a, o) {
    super(t, i, s, a, o), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = A(this, t, i, 0) ?? l) === C) return;
    const s = this._$AH, a = t === l && s !== l || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== l && (s === l || a);
    a && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class It {
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
const zt = Y.litHtmlPolyfillSupport;
zt?.(j, D), (Y.litHtmlVersions ??= []).push("3.3.2");
const Ot = (e, t, i) => {
  const s = i?.renderBefore ?? t;
  let a = s._$litPart$;
  if (a === void 0) {
    const o = i?.renderBefore ?? null;
    s._$litPart$ = a = new D(t.insertBefore(E(), o), o, void 0, i ?? {});
  }
  return a._$AI(e), a;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const V = globalThis;
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
S._$litElement$ = !0, S.finalized = !0, V.litElementHydrateSupport?.({ LitElement: S });
const Nt = V.litElementPolyfillSupport;
Nt?.({ LitElement: S });
(V.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ft = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ht = { attribute: !0, type: String, converter: N, reflect: !1, hasChanged: X }, Lt = (e = Ht, t, i) => {
  const { kind: s, metadata: a } = i;
  let o = globalThis.litPropertyMetadata.get(a);
  if (o === void 0 && globalThis.litPropertyMetadata.set(a, o = /* @__PURE__ */ new Map()), s === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(i.name, e), s === "accessor") {
    const { name: n } = i;
    return { set(c) {
      const d = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(n, d, e, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(n, void 0, e, c), c;
    } };
  }
  if (s === "setter") {
    const { name: n } = i;
    return function(c) {
      const d = this[n];
      t.call(this, c), this.requestUpdate(n, d, e, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function G(e) {
  return (t, i) => typeof i == "object" ? Lt(e, t, i) : ((s, a, o) => {
    const n = a.hasOwnProperty(o);
    return a.constructor.createProperty(o, s), n ? Object.getOwnPropertyDescriptor(a, o) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function _(e) {
  return G({ ...e, state: !0, attribute: !1 });
}
const Rt = dt`
  :host {
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
    background: rgba(0, 0, 0, 0.6);
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
`, z = {
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
  return z[i]?.[t] ? z[i][t] : z.en?.[t] ? z.en[t] : t;
}
var Ut = Object.defineProperty, Bt = Object.getOwnPropertyDescriptor, J = (e, t, i, s) => {
  for (var a = s > 1 ? void 0 : s ? Bt(t, i) : t, o = e.length - 1, n; o >= 0; o--)
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
let M = class extends S {
  setConfig(e) {
    this._config = e;
  }
  render() {
    if (!this.hass || !this._config)
      return r``;
    const e = this._config.click_action || "jellyfin", t = this._config.hold_action || "cast";
    return r`
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

        ${this._config.layout === "grid" || this._config.layout === "list" ? r`
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
            <mwc-list-item value="cast">Cast to Device</mwc-list-item>
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
            <mwc-list-item value="cast">Cast to Device</mwc-list-item>
            <mwc-list-item value="more-info">Show More Info</mwc-list-item>
            <mwc-list-item value="none">No Action</mwc-list-item>
          </ha-select>
        </div>

        ${e === "cast" || t === "cast" ? r`
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
  _updateConfig(e, t) {
    if (!this._config)
      return;
    const i = { ...this._config, [e]: t };
    this._config = i, Wt(this, "config-changed", { config: i });
  }
};
M.styles = dt`
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
J([
  G({ attribute: !1 })
], M.prototype, "hass", 2);
J([
  _()
], M.prototype, "_config", 2);
M = J([
  ft("jellyha-library-editor")
], M);
var Xt = Object.defineProperty, Yt = Object.getOwnPropertyDescriptor, f = (e, t, i, s) => {
  for (var a = s > 1 ? void 0 : s ? Yt(t, i) : t, o = e.length - 1, n; o >= 0; o--)
    (n = e[o]) && (a = (s ? n(t, i, a) : n(a)) || a);
  return s && a && Xt(t, i, a), a;
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
  show_now_playing: !0
};
function Vt(e, t, i) {
  const s = new CustomEvent(t, {
    bubbles: !0,
    composed: !0,
    detail: i
  });
  e.dispatchEvent(s);
}
let u = class extends S {
  constructor() {
    super(), this._currentPage = 0, this._itemsPerPage = 5, this._pressStartTime = 0, this._isHoldActive = !1, this._touchStartX = 0, this._touchStartY = 0, this._containerWidth = 0, this.ITEM_WIDTH = 148, this.LIST_ITEM_MIN_WIDTH = 380, this._effectiveListColumns = 1, this._isSwiping = !1, this._scrollProgress = 0, this._hasScrollableContent = !1, this.SCROLL_INDICATOR_DOTS = 5, this._onDotClick = this._onDotClick.bind(this), this._handleTouchStart = this._handleTouchStart.bind(this), this._handleTouchMove = this._handleTouchMove.bind(this), this._handleTouchEnd = this._handleTouchEnd.bind(this), this._handlePointerDown = this._handlePointerDown.bind(this), this._handlePointerMove = this._handlePointerMove.bind(this), this._handlePointerUp = this._handlePointerUp.bind(this), this._handleScroll = this._handleScroll.bind(this);
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
  _nextPage() {
    if (!this._config || !this.hass) return;
    const e = this.hass.states[this._config.entity];
    if (!e) return;
    const t = e.attributes, i = this._filterItems(t.items || []), s = this._config?.items_per_page || this._itemsPerPage, a = this._config?.max_pages || 10, o = Math.min(Math.ceil(i.length / s), a);
    o > 1 && (this._currentPage = (this._currentPage + 1) % o, this.requestUpdate());
  }
  _prevPage() {
    if (!this._config || !this.hass) return;
    const e = this.hass.states[this._config.entity];
    if (!e) return;
    const t = e.attributes, i = this._filterItems(t.items || []), s = this._config?.items_per_page || this._itemsPerPage, a = this._config?.max_pages || 10, o = Math.min(Math.ceil(i.length / s), a);
    o > 1 && (this._currentPage = (this._currentPage - 1 + o) % o, this.requestUpdate());
  }
  // Touch/Swipe handlers
  _handleTouchStart(e) {
    this._touchStartX = e.touches[0].clientX, this._touchStartY = e.touches[0].clientY, this._isSwiping = !1;
  }
  _handleTouchMove(e) {
    if (!this._touchStartX) return;
    const t = e.touches[0].clientX - this._touchStartX, i = e.touches[0].clientY - this._touchStartY;
    Math.abs(t) > Math.abs(i) && Math.abs(t) > 30 && (this._isSwiping = !0, e.preventDefault());
  }
  _handleTouchEnd(e) {
    if (!this._isSwiping) {
      this._touchStartX = 0;
      return;
    }
    const t = e.changedTouches[0].clientX - this._touchStartX, i = 50;
    t < -i ? this._nextPage() : t > i && this._prevPage(), this._touchStartX = 0, this._isSwiping = !1;
  }
  // Pointer events for Android Companion App (uses same logic as touch)
  _handlePointerDown(e) {
    e.pointerType !== "mouse" && (this._touchStartX = e.clientX, this._touchStartY = e.clientY, this._isSwiping = !1, e.target.setPointerCapture?.(e.pointerId));
  }
  _handlePointerMove(e) {
    if (e.pointerType === "mouse" || !this._touchStartX) return;
    const t = e.clientX - this._touchStartX, i = e.clientY - this._touchStartY;
    Math.abs(t) > Math.abs(i) && Math.abs(t) > 30 && (this._isSwiping = !0, e.preventDefault());
  }
  _handlePointerUp(e) {
    if (e.target.releasePointerCapture?.(e.pointerId), e.pointerType === "mouse" || !this._isSwiping) {
      this._touchStartX = 0;
      return;
    }
    const t = e.clientX - this._touchStartX, i = 50;
    t < -i ? this._nextPage() : t > i && this._prevPage(), this._touchStartX = 0, this._isSwiping = !1;
  }
  // Scroll handler for elastic dot indicator
  _handleScroll(e) {
    const t = e.target, i = t.scrollWidth, s = t.clientWidth, a = t.scrollLeft, o = i > s + 10;
    if (o !== this._hasScrollableContent && (this._hasScrollableContent = o), o) {
      const n = i - s;
      let c = a / n;
      (n - a < 10 || c > 0.98) && (c = 1), (a < 10 || c < 0.02) && (c = 0), c = Math.min(1, Math.max(0, c)), this._scrollProgress = c;
    }
  }
  // Render scroll indicator for non-paginated scrollable content
  _renderScrollIndicator() {
    if (!this._hasScrollableContent) return r``;
    const e = this.SCROLL_INDICATOR_DOTS, t = this._scrollProgress, i = Math.round(t * (e - 1));
    return r`
      <div class="scroll-indicator">
        ${Array.from({ length: e }, (s, a) => {
      const o = a === i, n = a === 0 && t < 0.1 || a === e - 1 && t > 0.9;
      return r`
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
      const t = this.getBoundingClientRect().width - 32;
      if (!(t < 100) && t !== this._containerWidth) {
        this._containerWidth = t;
        const i = Math.max(2, Math.floor(t / this.ITEM_WIDTH));
        if (i !== this._itemsPerPage && (this._itemsPerPage = i, this._currentPage = 0, this.requestUpdate()), this._config) {
          const s = this._config.columns || 1;
          if (s > 1) {
            const a = Math.max(1, Math.floor(t / this.LIST_ITEM_MIN_WIDTH)), o = Math.min(s, a);
            o !== this._effectiveListColumns && (this._effectiveListColumns = o, this.requestUpdate());
          } else this._effectiveListColumns !== 1 && (this._effectiveListColumns = 1, this.requestUpdate());
        }
      }
    }, setTimeout(() => this._resizeHandler?.(), 100), window.addEventListener("resize", this._resizeHandler);
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
    if (e.has("_currentPage") || e.has("_itemsPerPage") || e.has("_scrollProgress") || e.has("_hasScrollableContent"))
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
   * Called after update - check for scrollable content
   */
  updated(e) {
    super.updated(e), this._config.show_pagination || requestAnimationFrame(() => {
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
      return r``;
    const e = this.hass.states[this._config.entity];
    if (!e)
      return this._renderError(`Entity not found: ${this._config.entity}`);
    const t = e.attributes, i = this._filterItems(t.items || []);
    return r`
      <ha-card>
        ${this._config.title ? r`
              <div class="card-header">
                <h2>${this._config.title}</h2>
              </div>
            ` : l}
        <div class="card-content">
          ${i.length === 0 ? this._renderEmpty() : this._renderLayout(i)}
        </div>
      </ha-card>
    `;
  }
  /**
   * Filter items based on config
   */
  _filterItems(e) {
    let t = e;
    this._config.media_type === "movies" ? t = t.filter((s) => s.type === "Movie") : this._config.media_type === "series" && (t = t.filter((s) => s.type === "Series"));
    const i = (this._config.items_per_page || 5) * (this._config.max_pages || 5);
    return t = t.slice(0, i), t;
  }
  /**
   * Render layout based on config
   */
  _renderLayout(e) {
    const t = this._config.layout || "carousel", i = this._config.show_pagination !== !1;
    return t === "carousel" ? this._renderCarousel(e, i) : t === "list" ? this._renderList(e, i) : t === "grid" ? this._renderGrid(e, i) : r`
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
    return r`
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
          @scroll="${t ? l : this._handleScroll}"
        >
          ${n.map((c) => this._renderMediaItem(c))}
        </div>
        ${t && a > 1 ? r`
              <div class="pagination-dots">
                ${Array.from({ length: a }, (c, d) => r`
                  <button
                    type="button"
                    class="pagination-dot ${d === this._currentPage ? "active" : ""}"
                    data-page="${d}"
                    @click="${this._onDotClick}"
                    aria-label="Go to page ${d + 1}"
                  ></button>
                `)}
              </div>
            ` : l}
        ${t ? l : this._renderScrollIndicator()}
      </div>
    `;
  }
  /**
   * Render list with optional pagination
   */
  _renderList(e, t) {
    const i = this._config.items_per_page || this._itemsPerPage, s = this._config.max_pages || 10, a = Math.min(Math.ceil(e.length / i), s), o = this._currentPage * i, n = t ? e.slice(o, o + i) : e, c = this._effectiveListColumns, d = c === 1;
    return r`
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
          class="list ${t ? "paginated" : ""} ${d ? "single-column" : ""}"
          style="--jf-list-columns: ${c}"
        >
          ${n.map((h) => this._renderListItem(h))}
        </div>
        ${t && a > 1 ? r`
              <div class="pagination-dots">
                ${Array.from({ length: a }, (h, p) => r`
                  <button
                    type="button"
                    class="pagination-dot ${p === this._currentPage ? "active" : ""}"
                    data-page="${p}"
                    @click="${this._onDotClick}"
                    aria-label="Go to page ${p + 1}"
                  ></button>
                `)}
              </div>
            ` : l}
      </div>
    `;
  }
  /**
   * Render grid with optional pagination
   */
  _renderGrid(e, t) {
    const i = this._config.items_per_page || this._itemsPerPage, s = this._config.max_pages || 10, a = Math.min(Math.ceil(e.length / i), s), o = this._currentPage * i, n = t ? e.slice(o, o + i) : e, c = this._config.columns || 1, d = c === 1;
    return r`
      <div class="grid-outer">
        <div 
          class="grid-wrapper"
          @touchstart="${this._handleTouchStart}"
          @touchmove="${this._handleTouchMove}"
          @touchend="${this._handleTouchEnd}"
          @pointerdown="${this._handlePointerDown}"
          @pointermove="${this._handlePointerMove}"
          @pointerup="${this._handlePointerUp}"
          @scroll="${t ? l : this._handleScroll}"
        >
          <div
            class="grid ${t ? "paginated" : ""} ${d ? "auto-columns" : ""}"
            style="--jf-columns: ${c}"
          >
            ${n.map((h) => this._renderMediaItem(h))}
          </div>
        </div>
        ${t && a > 1 ? r`
              <div class="pagination-dots">
                ${Array.from({ length: a }, (h, p) => r`
                  <button
                    type="button"
                    class="pagination-dot ${p === this._currentPage ? "active" : ""}"
                    data-page="${p}"
                    @click="${this._onDotClick}"
                    aria-label="Go to page ${p + 1}"
                  ></button>
                `)}
              </div>
            ` : l}
        ${t ? l : this._renderScrollIndicator()}
      </div>
    `;
  }
  /**
   * Render individual list item (horizontal layout with metadata outside poster)
   */
  _renderListItem(e) {
    const t = this._isNewItem(e), i = this._getRating(e), s = this._config.show_media_type_badge !== !1;
    return r`
      <div
        class="media-item list-item ${this._config.show_title ? "" : "no-title"} ${this._config.metadata_position === "above" ? "metadata-above" : ""}"
        tabindex="0"
        role="button"
        aria-label="${e.name}"
        @mousedown="${(a) => this._handleMouseDown(a, e)}"
        @mouseup="${(a) => this._handleMouseUp(a, e)}"
        @touchstart="${(a) => this._handleTouchStartItem(a, e)}"
        @touchend="${(a) => this._handleTouchEndItem(a, e)}"
        @keydown="${(a) => this._handleKeydown(a, e)}"
      >
        <div class="list-poster-wrapper">
          ${this._config.metadata_position === "above" && this._config.show_date_added && e.date_added ? r`<p class="list-date-added">${this._formatDate(e.date_added)}</p>` : l}
          <div class="poster-container">
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
              
              ${this._renderStatusBadge(e, t)}
              ${this._renderNowPlayingOverlay(e)}
            </div>
          </div>
          ${this._config.metadata_position !== "above" && this._config.show_date_added && e.date_added ? r`<p class="list-date-added">${this._formatDate(e.date_added)}</p>` : l}
        </div>
        
        <div class="list-info">
          ${this._config.show_title ? r`<h3 class="list-title">${e.name}</h3>` : l}
          
          <div class="list-metadata">
            ${s ? r`<span class="list-type-badge ${e.type === "Movie" ? "movie" : "series"}">
                  ${e.type === "Movie" ? "Movie" : "Series"}
                </span>` : l}
            ${this._config.show_year && e.year ? r`<span class="list-year">${e.year}</span>` : l}
            ${this._config.show_ratings && i ? r`<span class="list-rating">
                  <ha-icon icon="mdi:star"></ha-icon>
                  ${i.toFixed(1)}
                </span>` : l}
            ${this._config.show_runtime && e.runtime_minutes ? r`<span class="list-runtime">
                  <ha-icon icon="mdi:clock-outline"></ha-icon>
                  ${this._formatRuntime(e.runtime_minutes)}
                </span>` : l}
          </div>
          
          ${this._config.show_genres && e.genres && e.genres.length > 0 ? r`<p class="list-genres">${e.genres.slice(0, 3).join(", ")}</p>` : l}
          
          ${this._config.show_description_on_hover !== !1 && e.description ? r`<p class="list-description">${e.description}</p>` : l}
        </div>
      </div>
    `;
  }
  /**
   * Render status badge (watched checkmark, unplayed count, or new badge)
   */
  _renderStatusBadge(e, t) {
    const i = this._config.show_watched_status !== !1;
    return i && e.is_played ? r`
        <div class="status-badge watched">
          <ha-icon icon="mdi:check-bold"></ha-icon>
        </div>
      ` : i && e.type === "Series" && (e.unplayed_count || 0) > 0 ? r`
        <div class="status-badge unplayed">
          ${e.unplayed_count}
        </div>
      ` : t ? r`<span class="new-badge">${rt(this.hass.language, "new")}</span>` : r``;
  }
  /**
   * Render individual media item
   */
  _renderMediaItem(e) {
    const t = this._isNewItem(e), i = this._getRating(e), s = this._config.show_media_type_badge !== !1;
    return r`
      <div
        class="media-item"
        tabindex="0"
        role="button"
        aria-label="${e.name}"
        @mousedown="${(a) => this._handleMouseDown(a, e)}"
        @mouseup="${(a) => this._handleMouseUp(a, e)}"
        @touchstart="${(a) => this._handleTouchStartItem(a, e)}"
        @touchend="${(a) => this._handleTouchEndItem(a, e)}"
        @keydown="${(a) => this._handleKeydown(a, e)}"
      >
        ${this._config.metadata_position === "above" ? r`
              <div class="media-info-above">
                ${this._config.show_title ? r`<p class="media-title">${e.name}</p>` : l}
                ${this._config.show_year && e.year ? r`<p class="media-year">${e.year}</p>` : l}
                ${this._config.show_date_added && e.date_added ? r`<p class="media-date-added">${this._formatDate(e.date_added)}</p>` : l}
              </div>
            ` : l}
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
            
            ${s ? r`<span class="media-type-badge ${e.type === "Movie" ? "movie" : "series"}">
                  ${e.type === "Movie" ? "Movie" : "Series"}
                </span>` : l}
            
            ${this._renderStatusBadge(e, t)}
            
            ${this._config.show_ratings && i ? r`
                  <span class="rating">
                    <ha-icon icon="mdi:star"></ha-icon>
                    ${i.toFixed(1)}
                  </span>
                ` : l}
            
            ${this._config.show_runtime && e.runtime_minutes ? r`
                  <span class="runtime">
                    <ha-icon icon="mdi:clock-outline"></ha-icon>
                    ${this._formatRuntime(e.runtime_minutes)}
                  </span>
                ` : l}
            
            <div class="hover-overlay">
                    ${e.year ? r`<span class="overlay-year">${e.year}</span>` : l}
                    <h3 class="overlay-title">${e.name}</h3>
                    ${this._config.show_genres && e.genres && e.genres.length > 0 ? r`<span class="overlay-genres">${e.genres.slice(0, 3).join(", ")}</span>` : l}
                    ${this._config.show_description_on_hover !== !1 && e.description ? r`<p class="overlay-description">${e.description}</p>` : l}
            </div>

            ${this._renderNowPlayingOverlay(e)}
          </div>
        </div>
        
        ${this._config.metadata_position === "below" ? r`
              <div class="media-info-below">
                ${this._config.show_title ? r`<p class="media-title">${e.name}</p>` : l}
                ${this._config.show_year && e.year ? r`<p class="media-year">${e.year}</p>` : l}
                ${this._config.show_date_added && e.date_added ? r`<p class="media-date-added">${this._formatDate(e.date_added)}</p>` : l}
              </div>
            ` : l}
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
    e.touches.length > 0 && (this._touchStartX = e.touches[0].clientX, this._touchStartY = e.touches[0].clientY), this._startHoldTimer(t);
  }
  _handleTouchEndItem(e, t) {
    this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = void 0);
    let i = 0;
    if (e.changedTouches.length > 0) {
      const s = e.changedTouches[0].clientX - this._touchStartX, a = e.changedTouches[0].clientY - this._touchStartY;
      i = Math.sqrt(s * s + a * a);
    }
    if (e.preventDefault(), this._isHoldActive) {
      this._isHoldActive = !1;
      return;
    }
    i > 10 || this._performAction(t, "click");
  }
  /**
   * Perform configured action
   */
  _performAction(e, t) {
    switch (t === "click" ? this._config.click_action : this._config.hold_action) {
      case "jellyfin":
        window.open(e.jellyfin_url, "_blank");
        break;
      case "cast":
        this._castMedia(e);
        break;
      case "more-info":
        Vt(this, "hass-more-info", {
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
      await this.hass.callService("jellyha", "play_on_device", {
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
    if (!this._config.show_now_playing || !this._config.default_cast_device)
      return l;
    const t = this.hass.states[this._config.default_cast_device];
    if (!t || t.state !== "playing" && t.state !== "paused")
      return l;
    const i = t.attributes.media_title, s = t.attributes.media_series_title;
    return e.name && (i === e.name || s === e.name) || e.type === "Series" && s === e.name ? r`
      <div class="now-playing-overlay" @click="${(o) => o.stopPropagation()}">
        <span class="now-playing-status">${t.state}</span>
        <div class="now-playing-controls">
          <ha-icon
            icon="${t.state === "playing" ? "mdi:pause" : "mdi:play"}"
            @click="${() => this._handlePlayPause(this._config.default_cast_device)}"
          ></ha-icon>
          <ha-icon
            class="stop"
            icon="mdi:stop"
            @click="${() => this._handleStop(this._config.default_cast_device)}"
          ></ha-icon>
        </div>
      </div>
    ` : l;
  }
  /**
   * Toggle play/pause on player
   */
  _handlePlayPause(e) {
    this.hass.callService("media_player", "media_play_pause", { entity_id: e });
  }
  /**
   * Stop playback on player
   */
  _handleStop(e) {
    this.hass.callService("media_player", "media_stop", { entity_id: e });
  }
  /**
   * Render empty state
   */
  _renderEmpty() {
    return r`
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
    return r`
      <ha-card>
        <div class="error">
          <ha-icon icon="mdi:alert-circle"></ha-icon>
          <p>${e}</p>
        </div>
      </ha-card>
    `;
  }
};
u.styles = Rt;
f([
  G({ attribute: !1 })
], u.prototype, "hass", 2);
f([
  _()
], u.prototype, "_config", 2);
f([
  _()
], u.prototype, "_currentPage", 2);
f([
  _()
], u.prototype, "_itemsPerPage", 2);
f([
  _()
], u.prototype, "_error", 2);
f([
  _()
], u.prototype, "_pressStartTime", 2);
f([
  _()
], u.prototype, "_holdTimer", 2);
f([
  _()
], u.prototype, "_isHoldActive", 2);
f([
  _()
], u.prototype, "_scrollProgress", 2);
f([
  _()
], u.prototype, "_hasScrollableContent", 2);
u = f([
  ft("jellyha-library-card")
], u);
//# sourceMappingURL=jellyha-cards.js.map
