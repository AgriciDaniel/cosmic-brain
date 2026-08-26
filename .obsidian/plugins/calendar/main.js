'use strict';

var obsidian = require('obsidian');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var obsidian__default = /*#__PURE__*/_interopDefaultLegacy(obsidian);

const VIEW_TYPE_CALENDAR = "calendar";
const TRIGGER_ON_OPEN = "calendar:open";

const debug = (
  typeof process === 'object' &&
  process.env &&
  process.env.NODE_DEBUG &&
  /\bsemver\b/i.test(process.env.NODE_DEBUG)
) ? (...args) => console.error('SEMVER', ...args)
  : () => {};

var debug_1 = debug;

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
const SEMVER_SPEC_VERSION = '2.0.0';

const MAX_LENGTH$1 = 256;
const MAX_SAFE_INTEGER$1 = Number.MAX_SAFE_INTEGER ||
  /* istanbul ignore next */ 9007199254740991;

// Max safe segment length for coercion.
const MAX_SAFE_COMPONENT_LENGTH = 16;

var constants = {
  SEMVER_SPEC_VERSION,
  MAX_LENGTH: MAX_LENGTH$1,
  MAX_SAFE_INTEGER: MAX_SAFE_INTEGER$1,
  MAX_SAFE_COMPONENT_LENGTH
};

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

var re_1 = createCommonjsModule(function (module, exports) {
const { MAX_SAFE_COMPONENT_LENGTH } = constants;

exports = module.exports = {};

// The actual regexps go on exports.re
const re = exports.re = [];
const src = exports.src = [];
const t = exports.t = {};
let R = 0;

const createToken = (name, value, isGlobal) => {
  const index = R++;
  debug_1(index, value);
  t[name] = index;
  src[index] = value;
  re[index] = new RegExp(value, isGlobal ? 'g' : undefined);
};

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

createToken('NUMERICIDENTIFIER', '0|[1-9]\\d*');
createToken('NUMERICIDENTIFIERLOOSE', '[0-9]+');

// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

createToken('NONNUMERICIDENTIFIER', '\\d*[a-zA-Z-][a-zA-Z0-9-]*');

// ## Main Version
// Three dot-separated numeric identifiers.

createToken('MAINVERSION', `(${src[t.NUMERICIDENTIFIER]})\\.` +
                   `(${src[t.NUMERICIDENTIFIER]})\\.` +
                   `(${src[t.NUMERICIDENTIFIER]})`);

createToken('MAINVERSIONLOOSE', `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
                        `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
                        `(${src[t.NUMERICIDENTIFIERLOOSE]})`);

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

createToken('PRERELEASEIDENTIFIER', `(?:${src[t.NUMERICIDENTIFIER]
}|${src[t.NONNUMERICIDENTIFIER]})`);

createToken('PRERELEASEIDENTIFIERLOOSE', `(?:${src[t.NUMERICIDENTIFIERLOOSE]
}|${src[t.NONNUMERICIDENTIFIER]})`);

// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

createToken('PRERELEASE', `(?:-(${src[t.PRERELEASEIDENTIFIER]
}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);

createToken('PRERELEASELOOSE', `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]
}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

createToken('BUILDIDENTIFIER', '[0-9A-Za-z-]+');

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

createToken('BUILD', `(?:\\+(${src[t.BUILDIDENTIFIER]
}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);

// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

createToken('FULLPLAIN', `v?${src[t.MAINVERSION]
}${src[t.PRERELEASE]}?${
  src[t.BUILD]}?`);

createToken('FULL', `^${src[t.FULLPLAIN]}$`);

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
createToken('LOOSEPLAIN', `[v=\\s]*${src[t.MAINVERSIONLOOSE]
}${src[t.PRERELEASELOOSE]}?${
  src[t.BUILD]}?`);

createToken('LOOSE', `^${src[t.LOOSEPLAIN]}$`);

createToken('GTLT', '((?:<|>)?=?)');

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
createToken('XRANGEIDENTIFIERLOOSE', `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
createToken('XRANGEIDENTIFIER', `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);

createToken('XRANGEPLAIN', `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})` +
                   `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
                   `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
                   `(?:${src[t.PRERELEASE]})?${
                     src[t.BUILD]}?` +
                   `)?)?`);

createToken('XRANGEPLAINLOOSE', `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                        `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                        `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                        `(?:${src[t.PRERELEASELOOSE]})?${
                          src[t.BUILD]}?` +
                        `)?)?`);

createToken('XRANGE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
createToken('XRANGELOOSE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);

// Coercion.
// Extract anything that could conceivably be a part of a valid semver
createToken('COERCE', `${'(^|[^\\d])' +
              '(\\d{1,'}${MAX_SAFE_COMPONENT_LENGTH}})` +
              `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` +
              `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` +
              `(?:$|[^\\d])`);
createToken('COERCERTL', src[t.COERCE], true);

// Tilde ranges.
// Meaning is "reasonably at or greater than"
createToken('LONETILDE', '(?:~>?)');

createToken('TILDETRIM', `(\\s*)${src[t.LONETILDE]}\\s+`, true);
exports.tildeTrimReplace = '$1~';

createToken('TILDE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
createToken('TILDELOOSE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);

// Caret ranges.
// Meaning is "at least and backwards compatible with"
createToken('LONECARET', '(?:\\^)');

createToken('CARETTRIM', `(\\s*)${src[t.LONECARET]}\\s+`, true);
exports.caretTrimReplace = '$1^';

createToken('CARET', `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
createToken('CARETLOOSE', `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);

// A simple gt/lt/eq thing, or just "" to indicate "any version"
createToken('COMPARATORLOOSE', `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
createToken('COMPARATOR', `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);

// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
createToken('COMPARATORTRIM', `(\\s*)${src[t.GTLT]
}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
exports.comparatorTrimReplace = '$1$2$3';

// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
createToken('HYPHENRANGE', `^\\s*(${src[t.XRANGEPLAIN]})` +
                   `\\s+-\\s+` +
                   `(${src[t.XRANGEPLAIN]})` +
                   `\\s*$`);

createToken('HYPHENRANGELOOSE', `^\\s*(${src[t.XRANGEPLAINLOOSE]})` +
                        `\\s+-\\s+` +
                        `(${src[t.XRANGEPLAINLOOSE]})` +
                        `\\s*$`);

// Star ranges basically just allow anything at all.
createToken('STAR', '(<|>)?=?\\s*\\*');
// >=0.0.0 is like a star
createToken('GTE0', '^\\s*>=\\s*0\.0\.0\\s*$');
createToken('GTE0PRE', '^\\s*>=\\s*0\.0\.0-0\\s*$');
});

// parse out just the options we care about so we always get a consistent
// obj with keys in a consistent order.
const opts = ['includePrerelease', 'loose', 'rtl'];
const parseOptions = options =>
  !options ? {}
  : typeof options !== 'object' ? { loose: true }
  : opts.filter(k => options[k]).reduce((options, k) => {
    options[k] = true;
    return options
  }, {});
var parseOptions_1 = parseOptions;

const numeric = /^[0-9]+$/;
const compareIdentifiers$1 = (a, b) => {
  const anum = numeric.test(a);
  const bnum = numeric.test(b);

  if (anum && bnum) {
    a = +a;
    b = +b;
  }

  return a === b ? 0
    : (anum && !bnum) ? -1
    : (bnum && !anum) ? 1
    : a < b ? -1
    : 1
};

const rcompareIdentifiers = (a, b) => compareIdentifiers$1(b, a);

var identifiers = {
  compareIdentifiers: compareIdentifiers$1,
  rcompareIdentifiers
};

const { MAX_LENGTH, MAX_SAFE_INTEGER } = constants;
const { re, t } = re_1;


const { compareIdentifiers } = identifiers;
class SemVer {
  constructor (version, options) {
    options = parseOptions_1(options);

    if (version instanceof SemVer) {
      if (version.loose === !!options.loose &&
          version.includePrerelease === !!options.includePrerelease) {
        return version
      } else {
        version = version.version;
      }
    } else if (typeof version !== 'string') {
      throw new TypeError(`Invalid Version: ${version}`)
    }

    if (version.length > MAX_LENGTH) {
      throw new TypeError(
        `version is longer than ${MAX_LENGTH} characters`
      )
    }

    debug_1('SemVer', version, options);
    this.options = options;
    this.loose = !!options.loose;
    // this isn't actually relevant for versions, but keep it so that we
    // don't run into trouble passing this.options around.
    this.includePrerelease = !!options.includePrerelease;

    const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);

    if (!m) {
      throw new TypeError(`Invalid Version: ${version}`)
    }

    this.raw = version;

    // these are actually numbers
    this.major = +m[1];
    this.minor = +m[2];
    this.patch = +m[3];

    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
      throw new TypeError('Invalid major version')
    }

    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
      throw new TypeError('Invalid minor version')
    }

    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
      throw new TypeError('Invalid patch version')
    }

    // numberify any prerelease numeric ids
    if (!m[4]) {
      this.prerelease = [];
    } else {
      this.prerelease = m[4].split('.').map((id) => {
        if (/^[0-9]+$/.test(id)) {
          const num = +id;
          if (num >= 0 && num < MAX_SAFE_INTEGER) {
            return num
          }
        }
        return id
      });
    }

    this.build = m[5] ? m[5].split('.') : [];
    this.format();
  }

  format () {
    this.version = `${this.major}.${this.minor}.${this.patch}`;
    if (this.prerelease.length) {
      this.version += `-${this.prerelease.join('.')}`;
    }
    return this.version
  }

  toString () {
    return this.version
  }

  compare (other) {
    debug_1('SemVer.compare', this.version, this.options, other);
    if (!(other instanceof SemVer)) {
      if (typeof other === 'string' && other === this.version) {
        return 0
      }
      other = new SemVer(other, this.options);
    }

    if (other.version === this.version) {
      return 0
    }

    return this.compareMain(other) || this.comparePre(other)
  }

  compareMain (other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }

    return (
      compareIdentifiers(this.major, other.major) ||
      compareIdentifiers(this.minor, other.minor) ||
      compareIdentifiers(this.patch, other.patch)
    )
  }

  comparePre (other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }

    // NOT having a prerelease is > having one
    if (this.prerelease.length && !other.prerelease.length) {
      return -1
    } else if (!this.prerelease.length && other.prerelease.length) {
      return 1
    } else if (!this.prerelease.length && !other.prerelease.length) {
      return 0
    }

    let i = 0;
    do {
      const a = this.prerelease[i];
      const b = other.prerelease[i];
      debug_1('prerelease compare', i, a, b);
      if (a === undefined && b === undefined) {
        return 0
      } else if (b === undefined) {
        return 1
      } else if (a === undefined) {
        return -1
      } else if (a === b) {
        continue
      } else {
        return compareIdentifiers(a, b)
      }
    } while (++i)
  }

  compareBuild (other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }

    let i = 0;
    do {
      const a = this.build[i];
      const b = other.build[i];
      debug_1('prerelease compare', i, a, b);
      if (a === undefined && b === undefined) {
        return 0
      } else if (b === undefined) {
        return 1
      } else if (a === undefined) {
        return -1
      } else if (a === b) {
        continue
      } else {
        return compareIdentifiers(a, b)
      }
    } while (++i)
  }

  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc (release, identifier) {
    switch (release) {
      case 'premajor':
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor = 0;
        this.major++;
        this.inc('pre', identifier);
        break
      case 'preminor':
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor++;
        this.inc('pre', identifier);
        break
      case 'prepatch':
        // If this is already a prerelease, it will bump to the next version
        // drop any prereleases that might already exist, since they are not
        // relevant at this point.
        this.prerelease.length = 0;
        this.inc('patch', identifier);
        this.inc('pre', identifier);
        break
      // If the input is a non-prerelease version, this acts the same as
      // prepatch.
      case 'prerelease':
        if (this.prerelease.length === 0) {
          this.inc('patch', identifier);
        }
        this.inc('pre', identifier);
        break

      case 'major':
        // If this is a pre-major version, bump up to the same major version.
        // Otherwise increment major.
        // 1.0.0-5 bumps to 1.0.0
        // 1.1.0 bumps to 2.0.0
        if (
          this.minor !== 0 ||
          this.patch !== 0 ||
          this.prerelease.length === 0
        ) {
          this.major++;
        }
        this.minor = 0;
        this.patch = 0;
        this.prerelease = [];
        break
      case 'minor':
        // If this is a pre-minor version, bump up to the same minor version.
        // Otherwise increment minor.
        // 1.2.0-5 bumps to 1.2.0
        // 1.2.1 bumps to 1.3.0
        if (this.patch !== 0 || this.prerelease.length === 0) {
          this.minor++;
        }
        this.patch = 0;
        this.prerelease = [];
        break
      case 'patch':
        // If this is not a pre-release version, it will increment the patch.
        // If it is a pre-release it will bump up to the same patch version.
        // 1.2.0-5 patches to 1.2.0
        // 1.2.0 patches to 1.2.1
        if (this.prerelease.length === 0) {
          this.patch++;
        }
        this.prerelease = [];
        break
      // This probably shouldn't be used publicly.
      // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
      case 'pre':
        if (this.prerelease.length === 0) {
          this.prerelease = [0];
        } else {
          let i = this.prerelease.length;
          while (--i >= 0) {
            if (typeof this.prerelease[i] === 'number') {
              this.prerelease[i]++;
              i = -2;
            }
          }
          if (i === -1) {
            // didn't increment anything
            this.prerelease.push(0);
          }
        }
        if (identifier) {
          // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
          // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
          if (this.prerelease[0] === identifier) {
            if (isNaN(this.prerelease[1])) {
              this.prerelease = [identifier, 0];
            }
          } else {
            this.prerelease = [identifier, 0];
          }
        }
        break

      default:
        throw new Error(`invalid increment argument: ${release}`)
    }
    this.format();
    this.raw = this.version;
    return this
  }
}

var semver = SemVer;

const compare = (a, b, loose) =>
  new semver(a, loose).compare(new semver(b, loose));

var compare_1 = compare;

const gte = (a, b, loose) => compare_1(a, b, loose) >= 0;
var gte_1 = gte;

const lt = (a, b, loose) => compare_1(a, b, loose) < 0;
var lt_1 = lt;

const migrations = [];
function applyMigrations(settings) {
    const previousVersion = settings.version || "1.0.0";
    const currentVersion = "1.5.3";
    for (const migration of migrations) {
        if (lt_1(previousVersion, migration.version) &&
            gte_1(currentVersion, migration.version)) {
            migration.apply(settings);
        }
    }
    return settings;
}

function noop$1() { }
function assign$1(tar, src) {
    // @ts-ignore
    for (const k in src)
        tar[k] = src[k];
    return tar;
}
function run$1(fn) {
    return fn();
}
function blank_object$1() {
    return Object.create(null);
}
function run_all$1(fns) {
    fns.forEach(run$1);
}
function is_function$1(thing) {
    return typeof thing === 'function';
}
function safe_not_equal$1(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function is_empty$1(obj) {
    return Object.keys(obj).length === 0;
}
function subscribe$1(store, ...callbacks) {
    if (store == null) {
        return noop$1;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value$1(store) {
    let value;
    subscribe$1(store, _ => value = _)();
    return value;
}
function component_subscribe$1(component, store, callback) {
    component.$$.on_destroy.push(subscribe$1(store, callback));
}
function create_slot$1(definition, ctx, $$scope, fn) {
    if (definition) {
        const slot_ctx = get_slot_context$1(definition, ctx, $$scope, fn);
        return definition[0](slot_ctx);
    }
}
function get_slot_context$1(definition, ctx, $$scope, fn) {
    return definition[1] && fn
        ? assign$1($$scope.ctx.slice(), definition[1](fn(ctx)))
        : $$scope.ctx;
}
function get_slot_changes$1(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
        const lets = definition[2](fn(dirty));
        if ($$scope.dirty === undefined) {
            return lets;
        }
        if (typeof lets === 'object') {
            const merged = [];
            const len = Math.max($$scope.dirty.length, lets.length);
            for (let i = 0; i < len; i += 1) {
                merged[i] = $$scope.dirty[i] | lets[i];
            }
            return merged;
        }
        return $$scope.dirty | lets;
    }
    return $$scope.dirty;
}
function update_slot$1(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
    const slot_changes = get_slot_changes$1(slot_definition, $$scope, dirty, get_slot_changes_fn);
    if (slot_changes) {
        const slot_context = get_slot_context$1(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
    }
}
function set_store_value(store, ret, value = ret) {
    store.set(value);
    return ret;
}
function action_destroyer$1(action_result) {
    return action_result && is_function$1(action_result.destroy) ? action_result.destroy : noop$1;
}

function append$1(target, node) {
    target.appendChild(node);
}
function insert$1(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function detach$1(node) {
    node.parentNode.removeChild(node);
}
function destroy_each$1(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element$1(name) {
    return document.createElement(name);
}
function svg_element$1(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}
function text$1(data) {
    return document.createTextNode(data);
}
function space$1() {
    return text$1(' ');
}
function empty$1() {
    return text$1('');
}
function listen$1(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function stop_propagation(fn) {
    return function (event) {
        event.stopPropagation();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function attr$1(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function set_attributes$1(node, attributes) {
    // @ts-ignore
    const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
    for (const key in attributes) {
        if (attributes[key] == null) {
            node.removeAttribute(key);
        }
        else if (key === 'style') {
            node.style.cssText = attributes[key];
        }
        else if (key === '__value') {
            node.value = node[key] = attributes[key];
        }
        else if (descriptors[key] && descriptors[key].set) {
            node[key] = attributes[key];
        }
        else {
            attr$1(node, key, attributes[key]);
        }
    }
}
function children$1(element) {
    return Array.from(element.childNodes);
}
function set_data$1(text, data) {
    data = '' + data;
    if (text.wholeText !== data)
        text.data = data;
}
function set_input_value(input, value) {
    input.value = value == null ? '' : value;
}
function set_style$1(node, key, value, important) {
    node.style.setProperty(key, value, important ? 'important' : '');
}
function select_option(select, value) {
    for (let i = 0; i < select.options.length; i += 1) {
        const option = select.options[i];
        if (option.__value === value) {
            option.selected = true;
            return;
        }
    }
}
function select_value(select) {
    const selected_option = select.querySelector(':checked') || select.options[0];
    return selected_option && selected_option.__value;
}
function toggle_class$1(element, name, toggle) {
    element.classList[toggle ? 'add' : 'remove'](name);
}
function custom_event$1(type, detail) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, false, false, detail);
    return e;
}

let current_component$1;
function set_current_component$1(component) {
    current_component$1 = component;
}
function get_current_component$1() {
    if (!current_component$1)
        throw new Error('Function called outside component initialization');
    return current_component$1;
}
function onDestroy$1(fn) {
    get_current_component$1().$$.on_destroy.push(fn);
}
function createEventDispatcher$1() {
    const component = get_current_component$1();
    return (type, detail) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
            // TODO are there situations where events could be dispatched
            // in a server (non-DOM) environment?
            const event = custom_event$1(type, detail);
            callbacks.slice().forEach(fn => {
                fn.call(component, event);
            });
        }
    };
}
// TODO figure out if we still want to support
// shorthand events, or if we want to implement
// a real bubbling mechanism
function bubble$1(component, event) {
    const callbacks = component.$$.callbacks[event.type];
    if (callbacks) {
        callbacks.slice().forEach(fn => fn(event));
    }
}

const dirty_components$1 = [];
const binding_callbacks$1 = [];
const render_callbacks$1 = [];
const flush_callbacks$1 = [];
const resolved_promise$1 = Promise.resolve();
let update_scheduled$1 = false;
function schedule_update$1() {
    if (!update_scheduled$1) {
        update_scheduled$1 = true;
        resolved_promise$1.then(flush$1);
    }
}
function tick$1() {
    schedule_update$1();
    return resolved_promise$1;
}
function add_render_callback$1(fn) {
    render_callbacks$1.push(fn);
}
function add_flush_callback$1(fn) {
    flush_callbacks$1.push(fn);
}
let flushing$1 = false;
const seen_callbacks$1 = new Set();
function flush$1() {
    if (flushing$1)
        return;
    flushing$1 = true;
    do {
        // first, call beforeUpdate functions
        // and update components
        for (let i = 0; i < dirty_components$1.length; i += 1) {
            const component = dirty_components$1[i];
            set_current_component$1(component);
            update$1(component.$$);
        }
        set_current_component$1(null);
        dirty_components$1.length = 0;
        while (binding_callbacks$1.length)
            binding_callbacks$1.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks$1.length; i += 1) {
            const callback = render_callbacks$1[i];
            if (!seen_callbacks$1.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks$1.add(callback);
                callback();
            }
        }
        render_callbacks$1.length = 0;
    } while (dirty_components$1.length);
    while (flush_callbacks$1.length) {
        flush_callbacks$1.pop()();
    }
    update_scheduled$1 = false;
    flushing$1 = false;
    seen_callbacks$1.clear();
}
function update$1($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all$1($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback$1);
    }
}
const outroing$1 = new Set();
let outros$1;
function group_outros$1() {
    outros$1 = {
        r: 0,
        c: [],
        p: outros$1 // parent group
    };
}
function check_outros$1() {
    if (!outros$1.r) {
        run_all$1(outros$1.c);
    }
    outros$1 = outros$1.p;
}
function transition_in$1(block, local) {
    if (block && block.i) {
        outroing$1.delete(block);
        block.i(local);
    }
}
function transition_out$1(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing$1.has(block))
            return;
        outroing$1.add(block);
        outros$1.c.push(() => {
            outroing$1.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
}
function outro_and_destroy_block$1(block, lookup) {
    transition_out$1(block, 1, 1, () => {
        lookup.delete(block.key);
    });
}
function update_keyed_each$1(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
    let o = old_blocks.length;
    let n = list.length;
    let i = o;
    const old_indexes = {};
    while (i--)
        old_indexes[old_blocks[i].key] = i;
    const new_blocks = [];
    const new_lookup = new Map();
    const deltas = new Map();
    i = n;
    while (i--) {
        const child_ctx = get_context(ctx, list, i);
        const key = get_key(child_ctx);
        let block = lookup.get(key);
        if (!block) {
            block = create_each_block(key, child_ctx);
            block.c();
        }
        else if (dynamic) {
            block.p(child_ctx, dirty);
        }
        new_lookup.set(key, new_blocks[i] = block);
        if (key in old_indexes)
            deltas.set(key, Math.abs(i - old_indexes[key]));
    }
    const will_move = new Set();
    const did_move = new Set();
    function insert(block) {
        transition_in$1(block, 1);
        block.m(node, next);
        lookup.set(block.key, block);
        next = block.first;
        n--;
    }
    while (o && n) {
        const new_block = new_blocks[n - 1];
        const old_block = old_blocks[o - 1];
        const new_key = new_block.key;
        const old_key = old_block.key;
        if (new_block === old_block) {
            // do nothing
            next = new_block.first;
            o--;
            n--;
        }
        else if (!new_lookup.has(old_key)) {
            // remove old block
            destroy(old_block, lookup);
            o--;
        }
        else if (!lookup.has(new_key) || will_move.has(new_key)) {
            insert(new_block);
        }
        else if (did_move.has(old_key)) {
            o--;
        }
        else if (deltas.get(new_key) > deltas.get(old_key)) {
            did_move.add(new_key);
            insert(new_block);
        }
        else {
            will_move.add(old_key);
            o--;
        }
    }
    while (o--) {
        const old_block = old_blocks[o];
        if (!new_lookup.has(old_block.key))
            destroy(old_block, lookup);
    }
    while (n)
        insert(new_blocks[n - 1]);
    return new_blocks;
}

function get_spread_update$1(levels, updates) {
    const update = {};
    const to_null_out = {};
    const accounted_for = { $$scope: 1 };
    let i = levels.length;
    while (i--) {
        const o = levels[i];
        const n = updates[i];
        if (n) {
            for (const key in o) {
                if (!(key in n))
                    to_null_out[key] = 1;
            }
            for (const key in n) {
                if (!accounted_for[key]) {
                    update[key] = n[key];
                    accounted_for[key] = 1;
                }
            }
            levels[i] = n;
        }
        else {
            for (const key in o) {
                accounted_for[key] = 1;
            }
        }
    }
    for (const key in to_null_out) {
        if (!(key in update))
            update[key] = undefined;
    }
    return update;
}

function bind$1(component, name, callback) {
    const index = component.$$.props[name];
    if (index !== undefined) {
        component.$$.bound[index] = callback;
        callback(component.$$.ctx[index]);
    }
}
function create_component$1(block) {
    block && block.c();
}
function mount_component$1(component, target, anchor, customElement) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
        // onMount happens before the initial afterUpdate
        add_render_callback$1(() => {
            const new_on_destroy = on_mount.map(run$1).filter(is_function$1);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all$1(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
    }
    after_update.forEach(add_render_callback$1);
}
function destroy_component$1(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all$1($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty$1(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components$1.push(component);
        schedule_update$1();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init$1(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
    const parent_component = current_component$1;
    set_current_component$1(component);
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: noop$1,
        not_equal,
        bound: blank_object$1(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(parent_component ? parent_component.$$.context : options.context || []),
        // everything else
        callbacks: blank_object$1(),
        dirty,
        skip_bound: false
    };
    let ready = false;
    $$.ctx = instance
        ? instance(component, options.props || {}, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty$1(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all$1($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            const nodes = children$1(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach$1);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in$1(component.$$.fragment);
        mount_component$1(component, options.target, options.anchor, options.customElement);
        flush$1();
    }
    set_current_component$1(parent_component);
}
/**
 * Base class for Svelte components. Used when dev=false.
 */
class SvelteComponent$1 {
    $destroy() {
        destroy_component$1(this, 1);
        this.$destroy = noop$1;
    }
    $on(type, callback) {
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty$1($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}

const subscriber_queue$1 = [];
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable$1(value, start = noop$1) {
    let stop;
    const subscribers = [];
    function set(new_value) {
        if (safe_not_equal$1(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue$1.length;
                for (let i = 0; i < subscribers.length; i += 1) {
                    const s = subscribers[i];
                    s[1]();
                    subscriber_queue$1.push(s, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue$1.length; i += 2) {
                        subscriber_queue$1[i][0](subscriber_queue$1[i + 1]);
                    }
                    subscriber_queue$1.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = noop$1) {
        const subscriber = [run, invalidate];
        subscribers.push(subscriber);
        if (subscribers.length === 1) {
            stop = start(set) || noop$1;
        }
        run(value);
        return () => {
            const index = subscribers.indexOf(subscriber);
            if (index !== -1) {
                subscribers.splice(index, 1);
            }
            if (subscribers.length === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}

const defaultSettings = Object.freeze({
    shouldConfirmBeforeCreate: true,
    localeOverride: "system-default",
    weekStart: "locale",
    showWeeklyNote: false,
    sourceSettings: {},
});

const DEFAULT_DAILY_NOTE_FORMAT$1 = "YYYY-MM-DD";
const DEFAULT_WEEKLY_NOTE_FORMAT$1 = "gggg-[W]ww";
const DEFAULT_MONTHLY_NOTE_FORMAT$1 = "YYYY-MM";

function shouldUsePeriodicNotesSettings$1(periodicity) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const periodicNotes = window.app.plugins.getPlugin("periodic-notes");
    return periodicNotes && periodicNotes.settings?.[periodicity]?.enabled;
}
/**
 * Read the user settings for the `daily-notes` plugin
 * to keep behavior of creating a new note in-sync.
 */
function getDailyNoteSettings$1() {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { internalPlugins, plugins } = window.app;
        if (shouldUsePeriodicNotesSettings$1("daily")) {
            const { format, folder, template } = plugins.getPlugin("periodic-notes")?.settings?.daily || {};
            return {
                format: format || DEFAULT_DAILY_NOTE_FORMAT$1,
                folder: folder?.trim() || "",
                template: template?.trim() || "",
            };
        }
        const { folder, format, template } = internalPlugins.getPluginById("daily-notes")?.instance?.options || {};
        return {
            format: format || DEFAULT_DAILY_NOTE_FORMAT$1,
            folder: folder?.trim() || "",
            template: template?.trim() || "",
        };
    }
    catch (err) {
        console.info("No custom daily note settings found!", err);
    }
}
/**
 * Read the user settings for the `weekly-notes` plugin
 * to keep behavior of creating a new note in-sync.
 */
function getWeeklyNoteSettings$1() {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pluginManager = window.app.plugins;
        const calendarSettings = pluginManager.getPlugin("calendar")?.options;
        const periodicNotesSettings = pluginManager.getPlugin("periodic-notes")
            ?.settings?.weekly;
        if (shouldUsePeriodicNotesSettings$1("weekly")) {
            return {
                format: periodicNotesSettings.format || DEFAULT_WEEKLY_NOTE_FORMAT$1,
                folder: periodicNotesSettings.folder?.trim() || "",
                template: periodicNotesSettings.template?.trim() || "",
            };
        }
        const settings = calendarSettings || {};
        return {
            format: settings.weeklyNoteFormat || DEFAULT_WEEKLY_NOTE_FORMAT$1,
            folder: settings.weeklyNoteFolder?.trim() || "",
            template: settings.weeklyNoteTemplate?.trim() || "",
        };
    }
    catch (err) {
        console.info("No custom weekly note settings found!", err);
    }
}
/**
 * Read the user settings for the `periodic-notes` plugin
 * to keep behavior of creating a new note in-sync.
 */
function getMonthlyNoteSettings$1() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pluginManager = window.app.plugins;
    try {
        const settings = (shouldUsePeriodicNotesSettings$1("monthly") &&
            pluginManager.getPlugin("periodic-notes")?.settings?.monthly) ||
            {};
        return {
            format: settings.format || DEFAULT_MONTHLY_NOTE_FORMAT$1,
            folder: settings.folder?.trim() || "",
            template: settings.template?.trim() || "",
        };
    }
    catch (err) {
        console.info("No custom monthly note settings found!", err);
    }
}

// Credit: @creationix/path.js
function join(...partSegments) {
    // Split the inputs into a list of path commands.
    let parts = [];
    for (let i = 0, l = partSegments.length; i < l; i++) {
        parts = parts.concat(partSegments[i].split("/"));
    }
    // Interpret the path commands to get the new resolved path.
    const newParts = [];
    for (let i = 0, l = parts.length; i < l; i++) {
        const part = parts[i];
        // Remove leading and trailing slashes
        // Also remove "." segments
        if (!part || part === ".")
            continue;
        // Push new path segments.
        else
            newParts.push(part);
    }
    // Preserve the initial slash if there was one.
    if (parts[0] === "")
        newParts.unshift("");
    // Turn back into a single string path.
    return newParts.join("/");
}
async function ensureFolderExists(path) {
    const dirs = path.replace(/\\/g, "/").split("/");
    dirs.pop(); // remove basename
    if (dirs.length) {
        const dir = join(...dirs);
        if (!window.app.vault.getAbstractFileByPath(dir)) {
            await window.app.vault.createFolder(dir);
        }
    }
}
async function getNotePath(directory, filename) {
    if (!filename.endsWith(".md")) {
        filename += ".md";
    }
    const path = obsidian__default['default'].normalizePath(join(directory, filename));
    await ensureFolderExists(path);
    return path;
}
async function getTemplateInfo(template) {
    const { metadataCache, vault } = window.app;
    const templatePath = obsidian__default['default'].normalizePath(template);
    if (templatePath === "/") {
        return Promise.resolve(["", null]);
    }
    try {
        const templateFile = metadataCache.getFirstLinkpathDest(templatePath, "");
        const contents = await vault.cachedRead(templateFile);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const IFoldInfo = window.app.foldManager.load(templateFile);
        return [contents, IFoldInfo];
    }
    catch (err) {
        console.error(`Failed to read the daily note template '${templatePath}'`, err);
        new obsidian__default['default'].Notice("Failed to read the daily note template");
        return ["", null];
    }
}

/**
 * dateUID is a way of weekly identifying daily/weekly/monthly notes.
 * They are prefixed with the granularity to avoid ambiguity.
 */
function getDateUID$1(date, granularity = "day") {
    const ts = date.clone().startOf(granularity).format();
    return `${granularity}-${ts}`;
}
function removeEscapedCharacters$1(format) {
    return format.replace(/\[[^\]]*\]/g, ""); // remove everything within brackets
}
/**
 * XXX: When parsing dates that contain both week numbers and months,
 * Moment choses to ignore the week numbers. For the week dateUID, we
 * want the opposite behavior. Strip the MMM from the format to patch.
 */
function isFormatAmbiguous$1(format, granularity) {
    if (granularity === "week") {
        const cleanFormat = removeEscapedCharacters$1(format);
        return (/w{1,2}/i.test(cleanFormat) &&
            (/M{1,4}/.test(cleanFormat) || /D{1,4}/.test(cleanFormat)));
    }
    return false;
}
function getDateFromFile$1(file, granularity) {
    return getDateFromFilename$1(file.basename, granularity);
}
function getDateFromFilename$1(filename, granularity) {
    const getSettings = {
        day: getDailyNoteSettings$1,
        week: getWeeklyNoteSettings$1,
        month: getMonthlyNoteSettings$1,
    };
    const format = getSettings[granularity]().format.split("/").pop();
    const noteDate = window.moment(filename, format, true);
    if (!noteDate.isValid()) {
        return null;
    }
    if (isFormatAmbiguous$1(format, granularity)) {
        if (granularity === "week") {
            const cleanFormat = removeEscapedCharacters$1(format);
            if (/w{1,2}/i.test(cleanFormat)) {
                return window.moment(filename, 
                // If format contains week, remove day & month formatting
                format.replace(/M{1,4}/g, "").replace(/D{1,4}/g, ""), false);
            }
        }
    }
    return noteDate;
}
/**
 * This function mimics the behavior of the daily-notes plugin
 * so it will replace {{date}}, {{title}}, and {{time}} with the
 * formatted timestamp.
 *
 * Note: it has an added bonus that it's not 'today' specific.
 */
async function createDailyNote(date) {
    const app = window.app;
    const { vault } = app;
    const moment = window.moment;
    const { template, format, folder } = getDailyNoteSettings$1();
    const [templateContents, IFoldInfo] = await getTemplateInfo(template);
    const filename = date.format(format);
    const normalizedPath = await getNotePath(folder, filename);
    try {
        const createdFile = await vault.create(normalizedPath, templateContents
            .replace(/{{\s*date\s*}}/gi, filename)
            .replace(/{{\s*time\s*}}/gi, moment().format("HH:mm"))
            .replace(/{{\s*title\s*}}/gi, filename)
            .replace(/{{\s*(date|time)\s*(([+-]\d+)([yqmwdhs]))?\s*(:.+?)?}}/gi, (_, _timeOrDate, calc, timeDelta, unit, momentFormat) => {
            const now = moment();
            const currentDate = date.clone().set({
                hour: now.get("hour"),
                minute: now.get("minute"),
                second: now.get("second"),
            });
            if (calc) {
                currentDate.add(parseInt(timeDelta, 10), unit);
            }
            if (momentFormat) {
                return currentDate.format(momentFormat.substring(1).trim());
            }
            return currentDate.format(format);
        })
            .replace(/{{\s*yesterday\s*}}/gi, date.clone().subtract(1, "day").format(format))
            .replace(/{{\s*tomorrow\s*}}/gi, date.clone().add(1, "d").format(format)));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        app.foldManager.save(createdFile, IFoldInfo);
        return createdFile;
    }
    catch (err) {
        console.error(`Failed to create file: '${normalizedPath}'`, err);
        new obsidian__default['default'].Notice("Unable to create new file.");
    }
}
function getDaysOfWeek$1() {
    const { moment } = window;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let weekStart = moment.localeData()._week.dow;
    const daysOfWeek = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
    ];
    while (weekStart) {
        daysOfWeek.push(daysOfWeek.shift());
        weekStart--;
    }
    return daysOfWeek;
}
function getDayOfWeekNumericalValue(dayOfWeekName) {
    return getDaysOfWeek$1().indexOf(dayOfWeekName.toLowerCase());
}
async function createWeeklyNote(date) {
    const { vault } = window.app;
    const { template, format, folder } = getWeeklyNoteSettings$1();
    const [templateContents, IFoldInfo] = await getTemplateInfo(template);
    const filename = date.format(format);
    const normalizedPath = await getNotePath(folder, filename);
    try {
        const createdFile = await vault.create(normalizedPath, templateContents
            .replace(/{{\s*(date|time)\s*(([+-]\d+)([yqmwdhs]))?\s*(:.+?)?}}/gi, (_, _timeOrDate, calc, timeDelta, unit, momentFormat) => {
            const now = window.moment();
            const currentDate = date.clone().set({
                hour: now.get("hour"),
                minute: now.get("minute"),
                second: now.get("second"),
            });
            if (calc) {
                currentDate.add(parseInt(timeDelta, 10), unit);
            }
            if (momentFormat) {
                return currentDate.format(momentFormat.substring(1).trim());
            }
            return currentDate.format(format);
        })
            .replace(/{{\s*title\s*}}/gi, filename)
            .replace(/{{\s*time\s*}}/gi, window.moment().format("HH:mm"))
            .replace(/{{\s*(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\s*:(.*?)}}/gi, (_, dayOfWeek, momentFormat) => {
            const day = getDayOfWeekNumericalValue(dayOfWeek);
            return date.weekday(day).format(momentFormat.trim());
        }));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.app.foldManager.save(createdFile, IFoldInfo);
        return createdFile;
    }
    catch (err) {
        console.error(`Failed to create file: '${normalizedPath}'`, err);
        new obsidian__default['default'].Notice("Unable to create new file.");
    }
}
/**
 * This function mimics the behavior of the daily-notes plugin
 * so it will replace {{date}}, {{title}}, and {{time}} with the
 * formatted timestamp.
 *
 * Note: it has an added bonus that it's not 'today' specific.
 */
async function createMonthlyNote(date) {
    const { vault } = window.app;
    const { template, format, folder } = getMonthlyNoteSettings$1();
    const [templateContents, IFoldInfo] = await getTemplateInfo(template);
    const filename = date.format(format);
    const normalizedPath = await getNotePath(folder, filename);
    try {
        const createdFile = await vault.create(normalizedPath, templateContents
            .replace(/{{\s*(date|time)\s*(([+-]\d+)([yqmwdhs]))?\s*(:.+?)?}}/gi, (_, _timeOrDate, calc, timeDelta, unit, momentFormat) => {
            const now = window.moment();
            const currentDate = date.clone().set({
                hour: now.get("hour"),
                minute: now.get("minute"),
                second: now.get("second"),
            });
            if (calc) {
                currentDate.add(parseInt(timeDelta, 10), unit);
            }
            if (momentFormat) {
                return currentDate.format(momentFormat.substring(1).trim());
            }
            return currentDate.format(format);
        })
            .replace(/{{\s*date\s*}}/gi, filename)
            .replace(/{{\s*time\s*}}/gi, window.moment().format("HH:mm"))
            .replace(/{{\s*title\s*}}/gi, filename));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.app.foldManager.save(createdFile, IFoldInfo);
        return createdFile;
    }
    catch (err) {
        console.error(`Failed to create file: '${normalizedPath}'`, err);
        new obsidian__default['default'].Notice("Unable to create new file.");
    }
}
function getPeriodicNoteSettings(granularity) {
    const getSettings = {
        day: getDailyNoteSettings$1,
        week: getWeeklyNoteSettings$1,
        month: getMonthlyNoteSettings$1,
    }[granularity];
    return getSettings();
}
function createPeriodicNote(granularity, date) {
    const createFn = {
        day: createDailyNote,
        month: createMonthlyNote,
        week: createWeeklyNote,
    };
    return createFn[granularity](date);
}
var createPeriodicNote_1 = createPeriodicNote;
var getDateFromFile_1$1 = getDateFromFile$1;
var getDateUID_1$1 = getDateUID$1;
var getPeriodicNoteSettings_1 = getPeriodicNoteSettings;

function partition(arr, predicate) {
    const pass = [];
    const fail = [];
    arr.forEach((elem) => {
        if (predicate(elem)) {
            pass.push(elem);
        }
        else {
            fail.push(elem);
        }
    });
    return [pass, fail];
}
/**
 * Lookup the dateUID for a given file. It compares the filename
 * to the daily and weekly note formats to find a match.
 *
 * @param file
 */
function getDateUIDFromFile$1(file) {
    if (!file) {
        return null;
    }
    // TODO: I'm not checking the path!
    let date = getDateFromFile_1$1(file, "day");
    if (date) {
        return getDateUID_1$1(date, "day");
    }
    date = getDateFromFile_1$1(file, "week");
    if (date) {
        return getDateUID_1$1(date, "week");
    }
    return null;
}
function getWordCount(text) {
    const spaceDelimitedChars = /A-Za-z\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC/
        .source;
    const nonSpaceDelimitedWords = /[\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u4E00-\u9FD5\uAC00-\uD7A3\uA960-\uA97C\uD7B0-\uD7C6]/
        .source;
    const pattern = new RegExp([
        `(?:[0-9]+(?:(?:,|\\.)[0-9]+)*|[\\-${spaceDelimitedChars}஀-௿가-힣ꥠ-ꥼힰ-ퟆ])+`,
        nonSpaceDelimitedWords,
    ].join("|"), "g");
    return (text.match(pattern) || []).length;
}

function createSettingsStore() {
    const store = writable$1(defaultSettings);
    return Object.assign({ getSourceSettings: (sourceId) => {
            var _a;
            const defaultSourceSettings = (((_a = get_store_value$1(sources).find((source) => source.id === sourceId)) === null || _a === void 0 ? void 0 : _a.defaultSettings) || {});
            const userSettings = (get_store_value$1(store).sourceSettings[sourceId] ||
                {});
            return Object.assign(Object.assign({}, defaultSourceSettings), userSettings);
        } }, store);
}
const settings = createSettingsStore();
function createSelectedFileStore() {
    const store = writable$1(null);
    return Object.assign({ setFile: (file) => {
            const id = getDateUIDFromFile$1(file);
            store.set(id);
        } }, store);
}
const activeFile = createSelectedFileStore();
function createSourcesStore() {
    const store = writable$1([]);
    return Object.assign({ registerSource: (source) => {
            store.update((val) => {
                val.push(source);
                return val;
            });
            settings.update((existingSettings) => {
                existingSettings.sourceSettings[source.id] = settings.getSourceSettings(source.id);
                return existingSettings;
            });
        } }, store);
}
const sources = createSourcesStore();

class ConfirmationModal extends obsidian.Modal {
    constructor(app, config) {
        super(app);
        const { cta, onAccept, text, title } = config;
        this.contentEl.createEl("h2", { text: title });
        this.contentEl.createEl("p", { text });
        this.contentEl.createEl("form", { cls: "modal-button-container" }, (buttonsEl) => {
            buttonsEl
                .createEl("button", { text: "Never mind" })
                .addEventListener("click", () => this.close());
            this.submitEl = buttonsEl.createEl("button", {
                attr: { type: "submit" },
                cls: "mod-cta",
                text: cta,
            });
            buttonsEl.addEventListener("submit", async (e) => {
                e.preventDefault();
                await onAccept(e);
                this.close();
            });
        });
    }
    onOpen() {
        this.submitEl.focus();
    }
}
function createConfirmationDialog({ cta, onAccept, text, title, }) {
    new ConfirmationModal(window.app, { cta, onAccept, text, title }).open();
}

function getPeriodicity(granularity) {
    const periodicity = {
        day: "daily",
        week: "weekly",
        month: "monthly",
    };
    return periodicity[granularity];
}
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}
/**
 * Create a Daily Note for a given date.
 */
async function tryToCreatePeriodicNote(granularity, date, inNewSplit, settings, cb) {
    const { workspace } = window.app;
    const { format } = getPeriodicNoteSettings_1(granularity);
    const filename = date.format(format);
    const createFile = async () => {
        const periodicNote = await createPeriodicNote_1(granularity, date);
        const leaf = inNewSplit
            ? workspace.splitActiveLeaf()
            : workspace.getUnpinnedLeaf();
        await leaf.openFile(periodicNote);
        cb === null || cb === void 0 ? void 0 : cb(periodicNote);
    };
    if (settings.shouldConfirmBeforeCreate) {
        createConfirmationDialog({
            cta: "Create",
            onAccept: createFile,
            text: `File ${filename} does not exist. Would you like to create it?`,
            title: `New ${capitalize(getPeriodicity(granularity))} Note`,
        });
    }
    else {
        await createFile();
    }
}

function noop() { }
function assign(tar, src) {
    // @ts-ignore
    for (const k in src)
        tar[k] = src[k];
    return tar;
}
function is_promise(value) {
    return value && typeof value === 'object' && typeof value.then === 'function';
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function not_equal(a, b) {
    return a != a ? b == b : a !== b;
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}
function subscribe(store, ...callbacks) {
    if (store == null) {
        return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
    let value;
    subscribe(store, _ => value = _)();
    return value;
}
function component_subscribe(component, store, callback) {
    component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
        const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
        return definition[0](slot_ctx);
    }
}
function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn
        ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
        : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
        const lets = definition[2](fn(dirty));
        if ($$scope.dirty === undefined) {
            return lets;
        }
        if (typeof lets === 'object') {
            const merged = [];
            const len = Math.max($$scope.dirty.length, lets.length);
            for (let i = 0; i < len; i += 1) {
                merged[i] = $$scope.dirty[i] | lets[i];
            }
            return merged;
        }
        return $$scope.dirty | lets;
    }
    return $$scope.dirty;
}
function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
    const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
    if (slot_changes) {
        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
    }
}
function action_destroyer(action_result) {
    return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}

function append(target, node) {
    target.appendChild(node);
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function detach(node) {
    node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element(name) {
    return document.createElement(name);
}
function svg_element(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function empty() {
    return text('');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function set_attributes(node, attributes) {
    // @ts-ignore
    const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
    for (const key in attributes) {
        if (attributes[key] == null) {
            node.removeAttribute(key);
        }
        else if (key === 'style') {
            node.style.cssText = attributes[key];
        }
        else if (key === '__value') {
            node.value = node[key] = attributes[key];
        }
        else if (descriptors[key] && descriptors[key].set) {
            node[key] = attributes[key];
        }
        else {
            attr(node, key, attributes[key]);
        }
    }
}
function children(element) {
    return Array.from(element.childNodes);
}
function set_data(text, data) {
    data = '' + data;
    if (text.wholeText !== data)
        text.data = data;
}
function set_style(node, key, value, important) {
    node.style.setProperty(key, value, important ? 'important' : '');
}
function toggle_class(element, name, toggle) {
    element.classList[toggle ? 'add' : 'remove'](name);
}
function custom_event(type, detail) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, false, false, detail);
    return e;
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
            // TODO are there situations where events could be dispatched
            // in a server (non-DOM) environment?
            const event = custom_event(type, detail);
            callbacks.slice().forEach(fn => {
                fn.call(component, event);
            });
        }
    };
}
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
}
function getContext(key) {
    return get_current_component().$$.context.get(key);
}
// TODO figure out if we still want to support
// shorthand events, or if we want to implement
// a real bubbling mechanism
function bubble(component, event) {
    const callbacks = component.$$.callbacks[event.type];
    if (callbacks) {
        callbacks.slice().forEach(fn => fn(event));
    }
}

const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function tick() {
    schedule_update();
    return resolved_promise;
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
function add_flush_callback(fn) {
    flush_callbacks.push(fn);
}
let flushing = false;
const seen_callbacks = new Set();
function flush() {
    if (flushing)
        return;
    flushing = true;
    do {
        // first, call beforeUpdate functions
        // and update components
        for (let i = 0; i < dirty_components.length; i += 1) {
            const component = dirty_components[i];
            set_current_component(component);
            update(component.$$);
        }
        set_current_component(null);
        dirty_components.length = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    flushing = false;
    seen_callbacks.clear();
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) {
        run_all(outros.c);
    }
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
}

function handle_promise(promise, info) {
    const token = info.token = {};
    function update(type, index, key, value) {
        if (info.token !== token)
            return;
        info.resolved = value;
        let child_ctx = info.ctx;
        if (key !== undefined) {
            child_ctx = child_ctx.slice();
            child_ctx[key] = value;
        }
        const block = type && (info.current = type)(child_ctx);
        let needs_flush = false;
        if (info.block) {
            if (info.blocks) {
                info.blocks.forEach((block, i) => {
                    if (i !== index && block) {
                        group_outros();
                        transition_out(block, 1, 1, () => {
                            if (info.blocks[i] === block) {
                                info.blocks[i] = null;
                            }
                        });
                        check_outros();
                    }
                });
            }
            else {
                info.block.d(1);
            }
            block.c();
            transition_in(block, 1);
            block.m(info.mount(), info.anchor);
            needs_flush = true;
        }
        info.block = block;
        if (info.blocks)
            info.blocks[index] = block;
        if (needs_flush) {
            flush();
        }
    }
    if (is_promise(promise)) {
        const current_component = get_current_component();
        promise.then(value => {
            set_current_component(current_component);
            update(info.then, 1, info.value, value);
            set_current_component(null);
        }, error => {
            set_current_component(current_component);
            update(info.catch, 2, info.error, error);
            set_current_component(null);
            if (!info.hasCatch) {
                throw error;
            }
        });
        // if we previously had a then/catch block, destroy it
        if (info.current !== info.pending) {
            update(info.pending, 0);
            return true;
        }
    }
    else {
        if (info.current !== info.then) {
            update(info.then, 1, info.value, promise);
            return true;
        }
        info.resolved = promise;
    }
}
function outro_and_destroy_block(block, lookup) {
    transition_out(block, 1, 1, () => {
        lookup.delete(block.key);
    });
}
function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
    let o = old_blocks.length;
    let n = list.length;
    let i = o;
    const old_indexes = {};
    while (i--)
        old_indexes[old_blocks[i].key] = i;
    const new_blocks = [];
    const new_lookup = new Map();
    const deltas = new Map();
    i = n;
    while (i--) {
        const child_ctx = get_context(ctx, list, i);
        const key = get_key(child_ctx);
        let block = lookup.get(key);
        if (!block) {
            block = create_each_block(key, child_ctx);
            block.c();
        }
        else if (dynamic) {
            block.p(child_ctx, dirty);
        }
        new_lookup.set(key, new_blocks[i] = block);
        if (key in old_indexes)
            deltas.set(key, Math.abs(i - old_indexes[key]));
    }
    const will_move = new Set();
    const did_move = new Set();
    function insert(block) {
        transition_in(block, 1);
        block.m(node, next);
        lookup.set(block.key, block);
        next = block.first;
        n--;
    }
    while (o && n) {
        const new_block = new_blocks[n - 1];
        const old_block = old_blocks[o - 1];
        const new_key = new_block.key;
        const old_key = old_block.key;
        if (new_block === old_block) {
            // do nothing
            next = new_block.first;
            o--;
            n--;
        }
        else if (!new_lookup.has(old_key)) {
            // remove old block
            destroy(old_block, lookup);
            o--;
        }
        else if (!lookup.has(new_key) || will_move.has(new_key)) {
            insert(new_block);
        }
        else if (did_move.has(old_key)) {
            o--;
        }
        else if (deltas.get(new_key) > deltas.get(old_key)) {
            did_move.add(new_key);
            insert(new_block);
        }
        else {
            will_move.add(old_key);
            o--;
        }
    }
    while (o--) {
        const old_block = old_blocks[o];
        if (!new_lookup.has(old_block.key))
            destroy(old_block, lookup);
    }
    while (n)
        insert(new_blocks[n - 1]);
    return new_blocks;
}

function get_spread_update(levels, updates) {
    const update = {};
    const to_null_out = {};
    const accounted_for = { $$scope: 1 };
    let i = levels.length;
    while (i--) {
        const o = levels[i];
        const n = updates[i];
        if (n) {
            for (const key in o) {
                if (!(key in n))
                    to_null_out[key] = 1;
            }
            for (const key in n) {
                if (!accounted_for[key]) {
                    update[key] = n[key];
                    accounted_for[key] = 1;
                }
            }
            levels[i] = n;
        }
        else {
            for (const key in o) {
                accounted_for[key] = 1;
            }
        }
    }
    for (const key in to_null_out) {
        if (!(key in update))
            update[key] = undefined;
    }
    return update;
}
function get_spread_object(spread_props) {
    return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
}

function bind(component, name, callback) {
    const index = component.$$.props[name];
    if (index !== undefined) {
        component.$$.bound[index] = callback;
        callback(component.$$.ctx[index]);
    }
}
function create_component(block) {
    block && block.c();
}
function mount_component(component, target, anchor, customElement) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
    }
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(parent_component ? parent_component.$$.context : options.context || []),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false
    };
    let ready = false;
    $$.ctx = instance
        ? instance(component, options.props || {}, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor, options.customElement);
        flush();
    }
    set_current_component(parent_component);
}
/**
 * Base class for Svelte components. Used when dev=false.
 */
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}

const subscriber_queue = [];
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = noop) {
    let stop;
    const subscribers = [];
    function set(new_value) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (let i = 0; i < subscribers.length; i += 1) {
                    const s = subscribers[i];
                    s[1]();
                    subscriber_queue.push(s, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = noop) {
        const subscriber = [run, invalidate];
        subscribers.push(subscriber);
        if (subscribers.length === 1) {
            stop = start(set) || noop;
        }
        run(value);
        return () => {
            const index = subscribers.indexOf(subscriber);
            if (index !== -1) {
                subscribers.splice(index, 1);
            }
            if (subscribers.length === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}

const IS_MOBILE = Symbol("isMobile");
const DISPLAYED_MONTH = Symbol("displayedMonth");

/* node_modules/svelte-portal/src/Portal.svelte generated by Svelte v3.37.0 */

function create_fragment$d(ctx) {
	let div;
	let portal_action;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[2].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

	return {
		c() {
			div = element("div");
			if (default_slot) default_slot.c();
			div.hidden = true;
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			current = true;

			if (!mounted) {
				dispose = action_destroyer(portal_action = portal.call(null, div, /*target*/ ctx[0]));
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && dirty & /*$$scope*/ 2) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[1], dirty, null, null);
				}
			}

			if (portal_action && is_function(portal_action.update) && dirty & /*target*/ 1) portal_action.update.call(null, /*target*/ ctx[0]);
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (default_slot) default_slot.d(detaching);
			mounted = false;
			dispose();
		}
	};
}

function portal(el, target = "body") {
	let targetEl;

	async function update(newTarget) {
		target = newTarget;

		if (typeof target === "string") {
			targetEl = document.querySelector(target);

			if (targetEl === null) {
				await tick();
				targetEl = document.querySelector(target);
			}

			if (targetEl === null) {
				throw new Error(`No element found matching css selector: "${target}"`);
			}
		} else if (target instanceof HTMLElement) {
			targetEl = target;
		} else {
			throw new TypeError(`Unknown portal target type: ${target === null ? "null" : typeof target}. Allowed types: string (CSS selector) or HTMLElement.`);
		}

		targetEl.appendChild(el);
		el.hidden = false;
	}

	function destroy() {
		if (el.parentNode) {
			el.parentNode.removeChild(el);
		}
	}

	update(target);
	return { update, destroy };
}

function instance$d($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	let { target = "body" } = $$props;

	$$self.$$set = $$props => {
		if ("target" in $$props) $$invalidate(0, target = $$props.target);
		if ("$$scope" in $$props) $$invalidate(1, $$scope = $$props.$$scope);
	};

	return [target, $$scope, slots];
}

class Portal extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$d, create_fragment$d, safe_not_equal, { target: 0 });
	}
}

/* src/components/popover/Box.svelte generated by Svelte v3.37.0 */

function add_css$9() {
	var style = element("style");
	style.id = "svelte-evqoh3-style";
	style.textContent = ".container.svelte-evqoh3.svelte-evqoh3{background-color:var(--background-primary);border-radius:4px;box-shadow:0 4px 12px 0 rgba(0, 0, 0, 0.25);color:var(--text-normal);display:flex;flex-direction:column;padding:24px}.is-mobile .container.svelte-evqoh3.svelte-evqoh3{box-shadow:unset;padding:0}.overflow-items.svelte-evqoh3.svelte-evqoh3{align-items:center;display:grid;grid-row-gap:8px;grid-template-columns:auto auto minmax(160px, 2fr)}.showcase.svelte-evqoh3.svelte-evqoh3{display:grid;gap:12px;grid-template-columns:minmax(0, 1fr) minmax(0, 1fr);margin-bottom:12px}.showcase-item.svelte-evqoh3.svelte-evqoh3{display:flex;flex-direction:column;justify-content:space-between;letter-spacing:0.8px;text-align:right}.showcase.svelte-evqoh3 .item-value.svelte-evqoh3{font-size:32px;margin-bottom:4px;width:100%}.showcase.svelte-evqoh3 .item-name.svelte-evqoh3{align-items:center;color:var(--text-muted);display:flex;font-size:14px;font-weight:700;justify-content:flex-end;text-transform:uppercase}.item-value.svelte-evqoh3.svelte-evqoh3{font-size:20px;font-weight:500}.item-name.svelte-evqoh3.svelte-evqoh3{color:var(--text-muted)}.overflow-item.svelte-evqoh3.svelte-evqoh3{display:contents;padding:8px}.goal.svelte-evqoh3.svelte-evqoh3{font-size:50%;opacity:0.6;letter-spacing:1px}.overflow-item.svelte-evqoh3 .item-value.svelte-evqoh3{margin-right:8px}.showcase-dot.svelte-evqoh3.svelte-evqoh3,.dot.svelte-evqoh3.svelte-evqoh3{flex-shrink:0;margin-right:6px;height:8px;width:8px}.showcase-dot.svelte-evqoh3.svelte-evqoh3{height:10px;width:10px}.empty.svelte-evqoh3 .item-value.svelte-evqoh3,.empty.svelte-evqoh3 .dot.svelte-evqoh3,.empty.svelte-evqoh3 .item-name.svelte-evqoh3{color:var(--text-faint)}";
	append(document.head, style);
}

function get_each_context$2$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[3] = list[i];
	return child_ctx;
}

function get_each_context_1$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[6] = list[i];
	return child_ctx;
}

// (17:13) {#if showcaseItem.goal}
function create_if_block$5(ctx) {
	let span;
	let t0;
	let t1_value = /*showcaseItem*/ ctx[6].goal + "";
	let t1;

	return {
		c() {
			span = element("span");
			t0 = text("/");
			t1 = text(t1_value);
			attr(span, "class", "goal svelte-evqoh3");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, t0);
			append(span, t1);
		},
		p(ctx, dirty) {
			if (dirty & /*showcaseItems*/ 1 && t1_value !== (t1_value = /*showcaseItem*/ ctx[6].goal + "")) set_data(t1, t1_value);
		},
		d(detaching) {
			if (detaching) detach(span);
		}
	};
}

// (13:4) {#each showcaseItems as showcaseItem}
function create_each_block_1$2(ctx) {
	let div2;
	let div0;
	let t0_value = /*showcaseItem*/ ctx[6].value + "";
	let t0;
	let t1;
	let div1;
	let svg;
	let circle;
	let circle_fill_value;
	let t2;
	let t3_value = /*showcaseItem*/ ctx[6].name + "";
	let t3;
	let t4;
	let if_block = /*showcaseItem*/ ctx[6].goal && create_if_block$5(ctx);

	return {
		c() {
			div2 = element("div");
			div0 = element("div");
			t0 = text(t0_value);
			if (if_block) if_block.c();
			t1 = space();
			div1 = element("div");
			svg = svg_element("svg");
			circle = svg_element("circle");
			t2 = space();
			t3 = text(t3_value);
			t4 = space();
			attr(div0, "class", "item-value svelte-evqoh3");
			attr(circle, "fill", circle_fill_value = /*showcaseItem*/ ctx[6].color);
			attr(circle, "cx", "3");
			attr(circle, "cy", "3");
			attr(circle, "r", "2");
			attr(svg, "class", "showcase-dot svelte-evqoh3");
			attr(svg, "viewBox", "0 0 6 6");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(div1, "class", "item-name svelte-evqoh3");
			attr(div2, "class", "showcase-item svelte-evqoh3");
		},
		m(target, anchor) {
			insert(target, div2, anchor);
			append(div2, div0);
			append(div0, t0);
			if (if_block) if_block.m(div0, null);
			append(div2, t1);
			append(div2, div1);
			append(div1, svg);
			append(svg, circle);
			append(div1, t2);
			append(div1, t3);
			append(div2, t4);
		},
		p(ctx, dirty) {
			if (dirty & /*showcaseItems*/ 1 && t0_value !== (t0_value = /*showcaseItem*/ ctx[6].value + "")) set_data(t0, t0_value);

			if (/*showcaseItem*/ ctx[6].goal) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$5(ctx);
					if_block.c();
					if_block.m(div0, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty & /*showcaseItems*/ 1 && circle_fill_value !== (circle_fill_value = /*showcaseItem*/ ctx[6].color)) {
				attr(circle, "fill", circle_fill_value);
			}

			if (dirty & /*showcaseItems*/ 1 && t3_value !== (t3_value = /*showcaseItem*/ ctx[6].name + "")) set_data(t3, t3_value);
		},
		d(detaching) {
			if (detaching) detach(div2);
			if (if_block) if_block.d();
		}
	};
}

// (35:4) {#each overflowItems as overflowItem}
function create_each_block$2$1(ctx) {
	let div2;
	let div0;
	let t0_value = /*overflowItem*/ ctx[3].value + "";
	let t0;
	let t1;
	let svg;
	let circle;
	let circle_fill_value;
	let t2;
	let div1;
	let t3_value = /*overflowItem*/ ctx[3].name + "";
	let t3;
	let t4;

	return {
		c() {
			div2 = element("div");
			div0 = element("div");
			t0 = text(t0_value);
			t1 = space();
			svg = svg_element("svg");
			circle = svg_element("circle");
			t2 = space();
			div1 = element("div");
			t3 = text(t3_value);
			t4 = space();
			attr(div0, "class", "item-value svelte-evqoh3");

			attr(circle, "fill", circle_fill_value = /*overflowItem*/ ctx[3].value
			? /*overflowItem*/ ctx[3].color
			: "currentColor");

			attr(circle, "cx", "3");
			attr(circle, "cy", "3");
			attr(circle, "r", "2");
			attr(svg, "class", "dot svelte-evqoh3");
			attr(svg, "viewBox", "0 0 6 6");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(div1, "class", "item-name svelte-evqoh3");
			attr(div2, "class", "overflow-item svelte-evqoh3");
			toggle_class(div2, "empty", !/*overflowItem*/ ctx[3].value);
		},
		m(target, anchor) {
			insert(target, div2, anchor);
			append(div2, div0);
			append(div0, t0);
			append(div2, t1);
			append(div2, svg);
			append(svg, circle);
			append(div2, t2);
			append(div2, div1);
			append(div1, t3);
			append(div2, t4);
		},
		p(ctx, dirty) {
			if (dirty & /*overflowItems*/ 2 && t0_value !== (t0_value = /*overflowItem*/ ctx[3].value + "")) set_data(t0, t0_value);

			if (dirty & /*overflowItems*/ 2 && circle_fill_value !== (circle_fill_value = /*overflowItem*/ ctx[3].value
			? /*overflowItem*/ ctx[3].color
			: "currentColor")) {
				attr(circle, "fill", circle_fill_value);
			}

			if (dirty & /*overflowItems*/ 2 && t3_value !== (t3_value = /*overflowItem*/ ctx[3].name + "")) set_data(t3, t3_value);

			if (dirty & /*overflowItems*/ 2) {
				toggle_class(div2, "empty", !/*overflowItem*/ ctx[3].value);
			}
		},
		d(detaching) {
			if (detaching) detach(div2);
		}
	};
}

function create_fragment$c(ctx) {
	let div2;
	let div0;
	let t;
	let div1;
	let each_value_1 = /*showcaseItems*/ ctx[0];
	let each_blocks_1 = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks_1[i] = create_each_block_1$2(get_each_context_1$2(ctx, each_value_1, i));
	}

	let each_value = /*overflowItems*/ ctx[1];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$2$1(get_each_context$2$1(ctx, each_value, i));
	}

	return {
		c() {
			div2 = element("div");
			div0 = element("div");

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			t = space();
			div1 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(div0, "class", "showcase svelte-evqoh3");
			attr(div1, "class", "overflow-items svelte-evqoh3");
			attr(div2, "class", "container svelte-evqoh3");
		},
		m(target, anchor) {
			insert(target, div2, anchor);
			append(div2, div0);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].m(div0, null);
			}

			append(div2, t);
			append(div2, div1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div1, null);
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*showcaseItems*/ 1) {
				each_value_1 = /*showcaseItems*/ ctx[0];
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1$2(ctx, each_value_1, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
					} else {
						each_blocks_1[i] = create_each_block_1$2(child_ctx);
						each_blocks_1[i].c();
						each_blocks_1[i].m(div0, null);
					}
				}

				for (; i < each_blocks_1.length; i += 1) {
					each_blocks_1[i].d(1);
				}

				each_blocks_1.length = each_value_1.length;
			}

			if (dirty & /*overflowItems*/ 2) {
				each_value = /*overflowItems*/ ctx[1];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$2$1(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$2$1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div1, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div2);
			destroy_each(each_blocks_1, detaching);
			destroy_each(each_blocks, detaching);
		}
	};
}

function instance$c($$self, $$props, $$invalidate) {
	
	let { menuItems } = $$props;
	let showcaseItems;
	let overflowItems;

	$$self.$$set = $$props => {
		if ("menuItems" in $$props) $$invalidate(2, menuItems = $$props.menuItems);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*menuItems*/ 4) {
			{
				$$invalidate(0, showcaseItems = (menuItems || []).slice(0, 2));
				$$invalidate(1, overflowItems = (menuItems || []).slice(2));
			}
		}
	};

	return [showcaseItems, overflowItems, menuItems];
}

class Box extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-evqoh3-style")) add_css$9();
		init(this, options, instance$c, create_fragment$c, safe_not_equal, { menuItems: 2 });
	}
}

var top$1 = 'top';
var bottom$1 = 'bottom';
var right$1 = 'right';
var left$1 = 'left';
var auto$1 = 'auto';
var basePlacements$1 = [top$1, bottom$1, right$1, left$1];
var start$1 = 'start';
var end$1 = 'end';
var clippingParents$1 = 'clippingParents';
var viewport$1 = 'viewport';
var popper$1 = 'popper';
var reference$1 = 'reference';
var variationPlacements$1 = /*#__PURE__*/basePlacements$1.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start$1, placement + "-" + end$1]);
}, []);
var placements$1 = /*#__PURE__*/[].concat(basePlacements$1, [auto$1]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start$1, placement + "-" + end$1]);
}, []); // modifiers that need to read the DOM

var beforeRead$1 = 'beforeRead';
var read$1 = 'read';
var afterRead$1 = 'afterRead'; // pure-logic modifiers

var beforeMain$1 = 'beforeMain';
var main$1 = 'main';
var afterMain$1 = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite$1 = 'beforeWrite';
var write$1 = 'write';
var afterWrite$1 = 'afterWrite';
var modifierPhases$1 = [beforeRead$1, read$1, afterRead$1, beforeMain$1, main$1, afterMain$1, beforeWrite$1, write$1, afterWrite$1];

function getNodeName$1(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

function getWindow$1(node) {
  if (node == null) {
    return window;
  }

  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

function isElement$1(node) {
  var OwnElement = getWindow$1(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}

function isHTMLElement$1(node) {
  var OwnElement = getWindow$1(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function isShadowRoot$1(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  var OwnElement = getWindow$1(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

// and applies them to the HTMLElements such as popper and arrow

function applyStyles$2(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!isHTMLElement$1(element) || !getNodeName$1(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect$2$1(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!isHTMLElement$1(element) || !getNodeName$1(element)) {
        return;
      }

      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


var applyStyles$1$1 = {
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles$2,
  effect: effect$2$1,
  requires: ['computeStyles']
};

function getBasePlacement$1(placement) {
  return placement.split('-')[0];
}

function getBoundingClientRect$1(element) {
  var rect = element.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    x: rect.left,
    y: rect.top
  };
}

// means it doesn't take into account transforms.

function getLayoutRect$1(element) {
  var clientRect = getBoundingClientRect$1(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;

  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }

  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }

  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}

function contains$1(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && isShadowRoot$1(rootNode)) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe[prop-missing]: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}

function getComputedStyle$2(element) {
  return getWindow$1(element).getComputedStyle(element);
}

function isTableElement$1(element) {
  return ['table', 'td', 'th'].indexOf(getNodeName$1(element)) >= 0;
}

function getDocumentElement$1(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return ((isElement$1(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}

function getParentNode$1(element) {
  if (getNodeName$1(element) === 'html') {
    return element;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || ( // DOM Element detected
    isShadowRoot$1(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement$1(element) // fallback

  );
}

function getTrueOffsetParent$1(element) {
  if (!isHTMLElement$1(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle$2(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock$1(element) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
  var isIE = navigator.userAgent.indexOf('Trident') !== -1;

  if (isIE && isHTMLElement$1(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = getComputedStyle$2(element);

    if (elementCss.position === 'fixed') {
      return null;
    }
  }

  var currentNode = getParentNode$1(element);

  while (isHTMLElement$1(currentNode) && ['html', 'body'].indexOf(getNodeName$1(currentNode)) < 0) {
    var css = getComputedStyle$2(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent$1(element) {
  var window = getWindow$1(element);
  var offsetParent = getTrueOffsetParent$1(element);

  while (offsetParent && isTableElement$1(offsetParent) && getComputedStyle$2(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent$1(offsetParent);
  }

  if (offsetParent && (getNodeName$1(offsetParent) === 'html' || getNodeName$1(offsetParent) === 'body' && getComputedStyle$2(offsetParent).position === 'static')) {
    return window;
  }

  return offsetParent || getContainingBlock$1(element) || window;
}

function getMainAxisFromPlacement$1(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

var max$1 = Math.max;
var min$1 = Math.min;
var round$1 = Math.round;

function within$1(min$1$1, value, max$1$1) {
  return max$1(min$1$1, min$1(value, max$1$1));
}

function getFreshSideObject$1() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

function mergePaddingObject$1(paddingObject) {
  return Object.assign({}, getFreshSideObject$1(), paddingObject);
}

function expandToHashMap$1(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

var toPaddingObject$1 = function toPaddingObject(padding, state) {
  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject$1(typeof padding !== 'number' ? padding : expandToHashMap$1(padding, basePlacements$1));
};

function arrow$2(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name,
      options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement$1(state.placement);
  var axis = getMainAxisFromPlacement$1(basePlacement);
  var isVertical = [left$1, right$1].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = toPaddingObject$1(options.padding, state);
  var arrowRect = getLayoutRect$1(arrowElement);
  var minProp = axis === 'y' ? top$1 : left$1;
  var maxProp = axis === 'y' ? bottom$1 : right$1;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent$1(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = within$1(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function effect$1$1(_ref2) {
  var state = _ref2.state,
      options = _ref2.options;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (process.env.NODE_ENV !== "production") {
    if (!isHTMLElement$1(arrowElement)) {
      console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', 'To use an SVG arrow, wrap it in an HTMLElement that will be used as', 'the arrow.'].join(' '));
    }
  }

  if (!contains$1(state.elements.popper, arrowElement)) {
    if (process.env.NODE_ENV !== "production") {
      console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', 'element.'].join(' '));
    }

    return;
  }

  state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules


var arrow$1$1 = {
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow$2,
  effect: effect$1$1,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
};

var unsetSides$1 = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR$1(_ref) {
  var x = _ref.x,
      y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round$1(round$1(x * dpr) / dpr) || 0,
    y: round$1(round$1(y * dpr) / dpr) || 0
  };
}

function mapToStyles$1(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets;

  var _ref3 = roundOffsets === true ? roundOffsetsByDPR$1(offsets) : typeof roundOffsets === 'function' ? roundOffsets(offsets) : offsets,
      _ref3$x = _ref3.x,
      x = _ref3$x === void 0 ? 0 : _ref3$x,
      _ref3$y = _ref3.y,
      y = _ref3$y === void 0 ? 0 : _ref3$y;

  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = left$1;
  var sideY = top$1;
  var win = window;

  if (adaptive) {
    var offsetParent = getOffsetParent$1(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';

    if (offsetParent === getWindow$1(popper)) {
      offsetParent = getDocumentElement$1(popper);

      if (getComputedStyle$2(offsetParent).position !== 'static') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


    offsetParent = offsetParent;

    if (placement === top$1) {
      sideY = bottom$1; // $FlowFixMe[prop-missing]

      y -= offsetParent[heightProp] - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === left$1) {
      sideX = right$1; // $FlowFixMe[prop-missing]

      x -= offsetParent[widthProp] - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides$1);

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) < 2 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles$2(_ref4) {
  var state = _ref4.state,
      options = _ref4.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

  if (process.env.NODE_ENV !== "production") {
    var transitionProperty = getComputedStyle$2(state.elements.popper).transitionProperty || '';

    if (adaptive && ['transform', 'top', 'right', 'bottom', 'left'].some(function (property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(['Popper: Detected CSS transitions on at least one of the following', 'CSS properties: "transform", "top", "right", "bottom", "left".', '\n\n', 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', 'for smooth transitions, or remove these properties from the CSS', 'transition declaration on the popper element if only transitioning', 'opacity or background-color for example.', '\n\n', 'We recommend using the popper element as a wrapper around an inner', 'element that can have any CSS property transitioned for animations.'].join(' '));
    }
  }

  var commonStyles = {
    placement: getBasePlacement$1(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles$1(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles$1(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


var computeStyles$1$1 = {
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles$2,
  data: {}
};

var passive$1 = {
  passive: true
};

function effect$3(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = getWindow$1(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive$1);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive$1);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive$1);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive$1);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


var eventListeners$1 = {
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect$3,
  data: {}
};

var hash$1$1 = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement$1(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash$1$1[matched];
  });
}

var hash$2 = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement$1(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash$2[matched];
  });
}

function getWindowScroll$1(node) {
  var win = getWindow$1(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

function getWindowScrollBarX$1(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return getBoundingClientRect$1(getDocumentElement$1(element)).left + getWindowScroll$1(element).scrollLeft;
}

function getViewportRect$1(element) {
  var win = getWindow$1(element);
  var html = getDocumentElement$1(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
  // can be obscured underneath it.
  // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
  // if it isn't open, so if this isn't available, the popper will be detected
  // to overflow the bottom of the screen too early.

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
    // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
    // errors due to floating point numbers, so we need to check precision.
    // Safari returns a number <= 0, usually < -1 when pinch-zoomed
    // Feature detection fails in mobile emulation mode in Chrome.
    // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
    // 0.001
    // Fallback here: "Not Safari" userAgent

    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + getWindowScrollBarX$1(element),
    y: y
  };
}

// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect$1(element) {
  var _element$ownerDocumen;

  var html = getDocumentElement$1(element);
  var winScroll = getWindowScroll$1(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max$1(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max$1(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX$1(element);
  var y = -winScroll.scrollTop;

  if (getComputedStyle$2(body || html).direction === 'rtl') {
    x += max$1(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}

function isScrollParent$1(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = getComputedStyle$2(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

function getScrollParent$1(node) {
  if (['html', 'body', '#document'].indexOf(getNodeName$1(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }

  if (isHTMLElement$1(node) && isScrollParent$1(node)) {
    return node;
  }

  return getScrollParent$1(getParentNode$1(node));
}

/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents$1(element, list) {
  var _element$ownerDocumen;

  if (list === void 0) {
    list = [];
  }

  var scrollParent = getScrollParent$1(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow$1(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent$1(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents$1(getParentNode$1(target)));
}

function rectToClientRect$1(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

function getInnerBoundingClientRect$1(element) {
  var rect = getBoundingClientRect$1(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType$1(element, clippingParent) {
  return clippingParent === viewport$1 ? rectToClientRect$1(getViewportRect$1(element)) : isHTMLElement$1(clippingParent) ? getInnerBoundingClientRect$1(clippingParent) : rectToClientRect$1(getDocumentRect$1(getDocumentElement$1(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents$1(element) {
  var clippingParents = listScrollParents$1(getParentNode$1(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$2(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement$1(element) ? getOffsetParent$1(element) : element;

  if (!isElement$1(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return isElement$1(clippingParent) && contains$1(clippingParent, clipperElement) && getNodeName$1(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect$1(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents$1(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType$1(element, clippingParent);
    accRect.top = max$1(rect.top, accRect.top);
    accRect.right = min$1(rect.right, accRect.right);
    accRect.bottom = min$1(rect.bottom, accRect.bottom);
    accRect.left = max$1(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType$1(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

function getVariation$1(placement) {
  return placement.split('-')[1];
}

function computeOffsets$1(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement$1(placement) : null;
  var variation = placement ? getVariation$1(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case top$1:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case bottom$1:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case right$1:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case left$1:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? getMainAxisFromPlacement$1(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case start$1:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;

      case end$1:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;
    }
  }

  return offsets;
}

function detectOverflow$1(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? clippingParents$1 : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? viewport$1 : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? popper$1 : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject$1(typeof padding !== 'number' ? padding : expandToHashMap$1(padding, basePlacements$1));
  var altContext = elementContext === popper$1 ? reference$1 : popper$1;
  var referenceElement = state.elements.reference;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect$1(isElement$1(element) ? element : element.contextElement || getDocumentElement$1(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = getBoundingClientRect$1(referenceElement);
  var popperOffsets = computeOffsets$1({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = rectToClientRect$1(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === popper$1 ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === popper$1 && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [right$1, bottom$1].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top$1, bottom$1].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}

function computeAutoPlacement$1(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements$1 : _options$allowedAutoP;
  var variation = getVariation$1(placement);
  var placements$1$1 = variation ? flipVariations ? variationPlacements$1 : variationPlacements$1.filter(function (placement) {
    return getVariation$1(placement) === variation;
  }) : basePlacements$1;
  var allowedPlacements = placements$1$1.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements$1$1;

    if (process.env.NODE_ENV !== "production") {
      console.error(['Popper: The `allowedAutoPlacements` option did not allow any', 'placements. Ensure the `placement` option matches the variation', 'of the allowed placements.', 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(' '));
    }
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = detectOverflow$1(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[getBasePlacement$1(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

function getExpandedFallbackPlacements$1(placement) {
  if (getBasePlacement$1(placement) === auto$1) {
    return [];
  }

  var oppositePlacement = getOppositePlacement$1(placement);
  return [getOppositeVariationPlacement$1(placement), oppositePlacement, getOppositeVariationPlacement$1(oppositePlacement)];
}

function flip$2(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement$1(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement$1(preferredPlacement)] : getExpandedFallbackPlacements$1(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat(getBasePlacement$1(placement) === auto$1 ? computeAutoPlacement$1(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = getBasePlacement$1(placement);

    var isStartVariation = getVariation$1(placement) === start$1;
    var isVertical = [top$1, bottom$1].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = detectOverflow$1(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right$1 : left$1 : isStartVariation ? bottom$1 : top$1;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement$1(mainVariationSide);
    }

    var altVariationSide = getOppositePlacement$1(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


var flip$1$1 = {
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip$2,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
};

function getSideOffsets$1(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped$1(overflow) {
  return [top$1, right$1, bottom$1, left$1].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide$2(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow$1(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = detectOverflow$1(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets$1(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets$1(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped$1(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped$1(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


var hide$1$1 = {
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide$2
};

function distanceAndSkiddingToXY$1(placement, rects, offset) {
  var basePlacement = getBasePlacement$1(placement);
  var invertDistance = [left$1, top$1].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left$1, right$1].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset$2(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements$1.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY$1(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


var offset$1$1 = {
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset$2
};

function popperOffsets$2(_ref) {
  var state = _ref.state,
      name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = computeOffsets$1({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


var popperOffsets$1$1 = {
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets$2,
  data: {}
};

function getAltAxis$1(axis) {
  return axis === 'x' ? 'y' : 'x';
}

function preventOverflow$2(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow$1(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = getBasePlacement$1(state.placement);
  var variation = getVariation$1(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement$1(basePlacement);
  var altAxis = getAltAxis$1(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis || checkAltAxis) {
    var mainSide = mainAxis === 'y' ? top$1 : left$1;
    var altSide = mainAxis === 'y' ? bottom$1 : right$1;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min$1$1 = popperOffsets[mainAxis] + overflow[mainSide];
    var max$1$1 = popperOffsets[mainAxis] - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start$1 ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start$1 ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect$1(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject$1();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = within$1(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent$1(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
    var tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;

    if (checkMainAxis) {
      var preventedOffset = within$1(tether ? min$1(min$1$1, tetherMin) : min$1$1, offset, tether ? max$1(max$1$1, tetherMax) : max$1$1);
      popperOffsets[mainAxis] = preventedOffset;
      data[mainAxis] = preventedOffset - offset;
    }

    if (checkAltAxis) {
      var _mainSide = mainAxis === 'x' ? top$1 : left$1;

      var _altSide = mainAxis === 'x' ? bottom$1 : right$1;

      var _offset = popperOffsets[altAxis];

      var _min = _offset + overflow[_mainSide];

      var _max = _offset - overflow[_altSide];

      var _preventedOffset = within$1(tether ? min$1(_min, tetherMin) : _min, _offset, tether ? max$1(_max, tetherMax) : _max);

      popperOffsets[altAxis] = _preventedOffset;
      data[altAxis] = _preventedOffset - _offset;
    }
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


var preventOverflow$1$1 = {
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow$2,
  requiresIfExists: ['offset']
};

function getHTMLElementScroll$1(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

function getNodeScroll$1(node) {
  if (node === getWindow$1(node) || !isHTMLElement$1(node)) {
    return getWindowScroll$1(node);
  } else {
    return getHTMLElementScroll$1(node);
  }
}

// Composite means it takes into account transforms as well as layout.

function getCompositeRect$1(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var documentElement = getDocumentElement$1(offsetParent);
  var rect = getBoundingClientRect$1(elementOrVirtualElement);
  var isOffsetParentAnElement = isHTMLElement$1(offsetParent);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName$1(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent$1(documentElement)) {
      scroll = getNodeScroll$1(offsetParent);
    }

    if (isHTMLElement$1(offsetParent)) {
      offsets = getBoundingClientRect$1(offsetParent);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX$1(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

function order$1(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers$1(modifiers) {
  // order based on dependencies
  var orderedModifiers = order$1(modifiers); // order based on phase

  return modifierPhases$1.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

function debounce$1(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

function format$1(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return [].concat(args).reduce(function (p, c) {
    return p.replace(/%s/, c);
  }, str);
}

var INVALID_MODIFIER_ERROR$1 = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR$1 = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES$1 = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
function validateModifiers$1(modifiers) {
  modifiers.forEach(function (modifier) {
    Object.keys(modifier).forEach(function (key) {
      switch (key) {
        case 'name':
          if (typeof modifier.name !== 'string') {
            console.error(format$1(INVALID_MODIFIER_ERROR$1, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
          }

          break;

        case 'enabled':
          if (typeof modifier.enabled !== 'boolean') {
            console.error(format$1(INVALID_MODIFIER_ERROR$1, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
          }

        case 'phase':
          if (modifierPhases$1.indexOf(modifier.phase) < 0) {
            console.error(format$1(INVALID_MODIFIER_ERROR$1, modifier.name, '"phase"', "either " + modifierPhases$1.join(', '), "\"" + String(modifier.phase) + "\""));
          }

          break;

        case 'fn':
          if (typeof modifier.fn !== 'function') {
            console.error(format$1(INVALID_MODIFIER_ERROR$1, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'effect':
          if (typeof modifier.effect !== 'function') {
            console.error(format$1(INVALID_MODIFIER_ERROR$1, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'requires':
          if (!Array.isArray(modifier.requires)) {
            console.error(format$1(INVALID_MODIFIER_ERROR$1, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
          }

          break;

        case 'requiresIfExists':
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error(format$1(INVALID_MODIFIER_ERROR$1, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
          }

          break;

        case 'options':
        case 'data':
          break;

        default:
          console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES$1.map(function (s) {
            return "\"" + s + "\"";
          }).join(', ') + "; but \"" + key + "\" was provided.");
      }

      modifier.requires && modifier.requires.forEach(function (requirement) {
        if (modifiers.find(function (mod) {
          return mod.name === requirement;
        }) == null) {
          console.error(format$1(MISSING_DEPENDENCY_ERROR$1, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}

function uniqueBy$1(arr, fn) {
  var identifiers = new Set();
  return arr.filter(function (item) {
    var identifier = fn(item);

    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}

function mergeByName$1(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

var INVALID_ELEMENT_ERROR$1 = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
var INFINITE_LOOP_ERROR$1 = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
var DEFAULT_OPTIONS$1 = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements$1() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator$1(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS$1 : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS$1, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(options) {
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: isElement$1(reference) ? listScrollParents$1(reference) : reference.contextElement ? listScrollParents$1(reference.contextElement) : [],
          popper: listScrollParents$1(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = orderModifiers$1(mergeByName$1([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned
        // if one of the modifiers is invalid for any reason

        if (process.env.NODE_ENV !== "production") {
          var modifiers = uniqueBy$1([].concat(orderedModifiers, state.options.modifiers), function (_ref) {
            var name = _ref.name;
            return name;
          });
          validateModifiers$1(modifiers);

          if (getBasePlacement$1(state.options.placement) === auto$1) {
            var flipModifier = state.orderedModifiers.find(function (_ref2) {
              var name = _ref2.name;
              return name === 'flip';
            });

            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', 'present and enabled to work.'].join(' '));
            }
          }

          var _getComputedStyle = getComputedStyle$2(popper),
              marginTop = _getComputedStyle.marginTop,
              marginRight = _getComputedStyle.marginRight,
              marginBottom = _getComputedStyle.marginBottom,
              marginLeft = _getComputedStyle.marginLeft; // We no longer take into account `margins` on the popper, and it can
          // cause bugs with positioning, so we'll warn the consumer


          if ([marginTop, marginRight, marginBottom, marginLeft].some(function (margin) {
            return parseFloat(margin);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', 'between the popper and its reference element or boundary.', 'To replicate margin, use the `offset` modifier, as well as', 'the `padding` option in the `preventOverflow` and `flip`', 'modifiers.'].join(' '));
          }
        }

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements$1(reference, popper)) {
          if (process.env.NODE_ENV !== "production") {
            console.error(INVALID_ELEMENT_ERROR$1);
          }

          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: getCompositeRect$1(reference, getOffsetParent$1(popper), state.options.strategy === 'fixed'),
          popper: getLayoutRect$1(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;

        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (process.env.NODE_ENV !== "production") {
            __debug_loops__ += 1;

            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR$1);
              break;
            }
          }

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce$1(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements$1(reference, popper)) {
      if (process.env.NODE_ENV !== "production") {
        console.error(INVALID_ELEMENT_ERROR$1);
      }

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}

var defaultModifiers$1 = [eventListeners$1, popperOffsets$1$1, computeStyles$1$1, applyStyles$1$1, offset$1$1, flip$1$1, preventOverflow$1$1, arrow$1$1, hide$1$1];
var createPopper$1 = /*#__PURE__*/popperGenerator$1({
  defaultModifiers: defaultModifiers$1
}); // eslint-disable-next-line import/no-unused-modules

/* node_modules/@popperjs/svelte/src/Popper.svelte generated by Svelte v3.37.0 */

function create_fragment$b$1(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[12].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[11], null);

	return {
		c() {
			if (default_slot) default_slot.c();
		},
		m(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && dirty & /*$$scope*/ 2048) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[11], dirty, null, null);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};
}

function instance$b($$self, $$props, $$invalidate) {
	let $store,
		$$unsubscribe_store = noop,
		$$subscribe_store = () => ($$unsubscribe_store(), $$unsubscribe_store = subscribe(store, $$value => $$invalidate(10, $store = $$value)), store);

	$$self.$$.on_destroy.push(() => $$unsubscribe_store());
	let { $$slots: slots = {}, $$scope } = $$props;
	let { reference: referenceElement } = $$props;
	let { popper: popperElement } = $$props;
	let { options = {} } = $$props;
	const store = writable({});
	$$subscribe_store();
	let previousReferenceElement;
	let previousPopperElement;
	let popperInstance;

	const updateStateModifier = {
		name: "updateState",
		enabled: true,
		phase: "write",
		fn: ({ state }) => store.set(state)
	};

	onDestroy(() => {
		popperInstance && popperInstance.destroy();
		$$invalidate(9, popperInstance = null);
	});

	let { styles = {} } = $$props;
	let { attributes = {} } = $$props;
	let { state = {} } = $$props;

	$$self.$$set = $$props => {
		if ("reference" in $$props) $$invalidate(4, referenceElement = $$props.reference);
		if ("popper" in $$props) $$invalidate(5, popperElement = $$props.popper);
		if ("options" in $$props) $$invalidate(6, options = $$props.options);
		if ("styles" in $$props) $$invalidate(1, styles = $$props.styles);
		if ("attributes" in $$props) $$invalidate(2, attributes = $$props.attributes);
		if ("state" in $$props) $$invalidate(3, state = $$props.state);
		if ("$$scope" in $$props) $$invalidate(11, $$scope = $$props.$$scope);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*previousPopperElement, popperElement, previousReferenceElement, referenceElement, popperInstance, options*/ 1008) {
			(async () => {
				if (previousPopperElement != popperElement || previousReferenceElement != referenceElement) {
					await tick();
					popperInstance && popperInstance.destroy();

					if (referenceElement != null && popperElement != null) {
						$$invalidate(9, popperInstance = createPopper$1(referenceElement, popperElement, {
							...options,
							modifiers: [
								...options.modifiers,
								updateStateModifier,
								{ name: "applyStyles", enabled: false }
							]
						}));

						$$invalidate(8, previousPopperElement = popperElement);
						$$invalidate(7, previousReferenceElement = referenceElement);
					}
				}
			})();
		}

		if ($$self.$$.dirty & /*popperInstance, options*/ 576) {
			{
				if (popperInstance != null) {
					popperInstance.setOptions({
						...options,
						modifiers: [
							...options.modifiers,
							updateStateModifier,
							{ name: "applyStyles", enabled: false }
						]
					});
				}
			}
		}

		if ($$self.$$.dirty & /*$store*/ 1024) {
			$$invalidate(1, styles = $store.styles || {});
		}

		if ($$self.$$.dirty & /*$store*/ 1024) {
			$$invalidate(2, attributes = $store.attributes || {});
		}

		if ($$self.$$.dirty & /*$store*/ 1024) {
			$$invalidate(3, state = $store);
		}
	};

	return [
		store,
		styles,
		attributes,
		state,
		referenceElement,
		popperElement,
		options,
		previousReferenceElement,
		previousPopperElement,
		popperInstance,
		$store,
		$$scope,
		slots
	];
}

class Popper$1 extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$b, create_fragment$b$1, safe_not_equal, {
			reference: 4,
			popper: 5,
			options: 6,
			store: 0,
			styles: 1,
			attributes: 2,
			state: 3
		});
	}

	get store() {
		return this.$$.ctx[0];
	}
}

/* src/components/popover/Popper.svelte generated by Svelte v3.37.0 */

function add_css$8() {
	var style = element("style");
	style.id = "svelte-ejuyfk-style";
	style.textContent = ".popper.svelte-ejuyfk{transition:opacity 0.1s ease-in;opacity:0;pointer-events:none;position:absolute;z-index:var(--layer-popover)}.popper.visible.svelte-ejuyfk{opacity:1}";
	append(document.head, style);
}

// (27:0) <Popper   reference="{referenceElement}"   popper="{popperElement}"   options="{popperOptions}"   bind:styles   bind:attributes >
function create_default_slot$4(ctx) {
	let div;
	let div_style_value;
	let current;
	const default_slot_template = /*#slots*/ ctx[7].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[11], null);

	let div_levels = [
		{ class: "popper" },
		{
			style: div_style_value = /*css*/ ctx[6](/*styles*/ ctx[3].popper)
		},
		/*attributes*/ ctx[4].popper
	];

	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	return {
		c() {
			div = element("div");
			if (default_slot) default_slot.c();
			set_attributes(div, div_data);
			toggle_class(div, "visible", !!/*referenceElement*/ ctx[1] && /*isVisible*/ ctx[0]);
			toggle_class(div, "svelte-ejuyfk", true);
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			/*div_binding*/ ctx[8](div);
			current = true;
		},
		p(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && dirty & /*$$scope*/ 2048) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[11], dirty, null, null);
				}
			}

			set_attributes(div, div_data = get_spread_update(div_levels, [
				{ class: "popper" },
				(!current || dirty & /*styles*/ 8 && div_style_value !== (div_style_value = /*css*/ ctx[6](/*styles*/ ctx[3].popper))) && { style: div_style_value },
				dirty & /*attributes*/ 16 && /*attributes*/ ctx[4].popper
			]));

			toggle_class(div, "visible", !!/*referenceElement*/ ctx[1] && /*isVisible*/ ctx[0]);
			toggle_class(div, "svelte-ejuyfk", true);
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (default_slot) default_slot.d(detaching);
			/*div_binding*/ ctx[8](null);
		}
	};
}

function create_fragment$a$1(ctx) {
	let popper;
	let updating_styles;
	let updating_attributes;
	let current;

	function popper_styles_binding(value) {
		/*popper_styles_binding*/ ctx[9](value);
	}

	function popper_attributes_binding(value) {
		/*popper_attributes_binding*/ ctx[10](value);
	}

	let popper_props = {
		reference: /*referenceElement*/ ctx[1],
		popper: /*popperElement*/ ctx[2],
		options: /*popperOptions*/ ctx[5],
		$$slots: { default: [create_default_slot$4] },
		$$scope: { ctx }
	};

	if (/*styles*/ ctx[3] !== void 0) {
		popper_props.styles = /*styles*/ ctx[3];
	}

	if (/*attributes*/ ctx[4] !== void 0) {
		popper_props.attributes = /*attributes*/ ctx[4];
	}

	popper = new Popper$1({ props: popper_props });
	binding_callbacks.push(() => bind(popper, "styles", popper_styles_binding));
	binding_callbacks.push(() => bind(popper, "attributes", popper_attributes_binding));

	return {
		c() {
			create_component(popper.$$.fragment);
		},
		m(target, anchor) {
			mount_component(popper, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const popper_changes = {};
			if (dirty & /*referenceElement*/ 2) popper_changes.reference = /*referenceElement*/ ctx[1];
			if (dirty & /*popperElement*/ 4) popper_changes.popper = /*popperElement*/ ctx[2];
			if (dirty & /*popperOptions*/ 32) popper_changes.options = /*popperOptions*/ ctx[5];

			if (dirty & /*$$scope, styles, attributes, popperElement, referenceElement, isVisible*/ 2079) {
				popper_changes.$$scope = { dirty, ctx };
			}

			if (!updating_styles && dirty & /*styles*/ 8) {
				updating_styles = true;
				popper_changes.styles = /*styles*/ ctx[3];
				add_flush_callback(() => updating_styles = false);
			}

			if (!updating_attributes && dirty & /*attributes*/ 16) {
				updating_attributes = true;
				popper_changes.attributes = /*attributes*/ ctx[4];
				add_flush_callback(() => updating_attributes = false);
			}

			popper.$set(popper_changes);
		},
		i(local) {
			if (current) return;
			transition_in(popper.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(popper.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(popper, detaching);
		}
	};
}

function instance$a$1($$self, $$props, $$invalidate) {
	let popperOptions;
	let { $$slots: slots = {}, $$scope } = $$props;
	const css = obj => Object.entries(obj || {}).map(x => x.join(":")).join(";");
	let { isVisible } = $$props;
	let { referenceElement } = $$props;
	let popperElement;

	// bound variables where Popper will store styles and attributes
	let styles = {};

	let attributes = {};

	function div_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			popperElement = $$value;
			$$invalidate(2, popperElement);
		});
	}

	function popper_styles_binding(value) {
		styles = value;
		$$invalidate(3, styles);
	}

	function popper_attributes_binding(value) {
		attributes = value;
		$$invalidate(4, attributes);
	}

	$$self.$$set = $$props => {
		if ("isVisible" in $$props) $$invalidate(0, isVisible = $$props.isVisible);
		if ("referenceElement" in $$props) $$invalidate(1, referenceElement = $$props.referenceElement);
		if ("$$scope" in $$props) $$invalidate(11, $$scope = $$props.$$scope);
	};

	$$invalidate(5, popperOptions = {
		modifiers: [
			{
				name: "offset",
				options: { offset: [0, 5] }
			},
			{ name: "hide", enabled: true }
		],
		placement: "bottom-end"
	});

	return [
		isVisible,
		referenceElement,
		popperElement,
		styles,
		attributes,
		popperOptions,
		css,
		slots,
		div_binding,
		popper_styles_binding,
		popper_attributes_binding,
		$$scope
	];
}

class Popper_1$1 extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-ejuyfk-style")) add_css$8();
		init(this, options, instance$a$1, create_fragment$a$1, safe_not_equal, { isVisible: 0, referenceElement: 1 });
	}
}

/* src/components/popover/PopoverMenu.svelte generated by Svelte v3.37.0 */

function create_else_block$1(ctx) {
	let portal;
	let current;

	portal = new Portal({
			props: {
				target: ".app-container",
				$$slots: { default: [create_default_slot$3] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(portal.$$.fragment);
		},
		m(target, anchor) {
			mount_component(portal, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const portal_changes = {};

			if (dirty & /*$$scope, referenceElement, isVisible, menuItems*/ 39) {
				portal_changes.$$scope = { dirty, ctx };
			}

			portal.$set(portal_changes);
		},
		i(local) {
			if (current) return;
			transition_in(portal.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(portal.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(portal, detaching);
		}
	};
}

// (18:0) {#if isMobile}
function create_if_block$4(ctx) {
	let box;
	let current;

	box = new Box({
			props: { menuItems: /*menuItems*/ ctx[2] }
		});

	return {
		c() {
			create_component(box.$$.fragment);
		},
		m(target, anchor) {
			mount_component(box, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const box_changes = {};
			if (dirty & /*menuItems*/ 4) box_changes.menuItems = /*menuItems*/ ctx[2];
			box.$set(box_changes);
		},
		i(local) {
			if (current) return;
			transition_in(box.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(box.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(box, detaching);
		}
	};
}

// (22:4) <Popper referenceElement="{referenceElement}" isVisible="{isVisible}">
function create_default_slot_1(ctx) {
	let box;
	let current;

	box = new Box({
			props: { menuItems: /*menuItems*/ ctx[2] }
		});

	return {
		c() {
			create_component(box.$$.fragment);
		},
		m(target, anchor) {
			mount_component(box, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const box_changes = {};
			if (dirty & /*menuItems*/ 4) box_changes.menuItems = /*menuItems*/ ctx[2];
			box.$set(box_changes);
		},
		i(local) {
			if (current) return;
			transition_in(box.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(box.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(box, detaching);
		}
	};
}

// (21:2) <Portal target=".app-container">
function create_default_slot$3(ctx) {
	let popper;
	let current;

	popper = new Popper_1$1({
			props: {
				referenceElement: /*referenceElement*/ ctx[0],
				isVisible: /*isVisible*/ ctx[1],
				$$slots: { default: [create_default_slot_1] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(popper.$$.fragment);
		},
		m(target, anchor) {
			mount_component(popper, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const popper_changes = {};
			if (dirty & /*referenceElement*/ 1) popper_changes.referenceElement = /*referenceElement*/ ctx[0];
			if (dirty & /*isVisible*/ 2) popper_changes.isVisible = /*isVisible*/ ctx[1];

			if (dirty & /*$$scope, menuItems*/ 36) {
				popper_changes.$$scope = { dirty, ctx };
			}

			popper.$set(popper_changes);
		},
		i(local) {
			if (current) return;
			transition_in(popper.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(popper.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(popper, detaching);
		}
	};
}

function create_fragment$9$1(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block$4, create_else_block$1];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*isMobile*/ ctx[3]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			if_block.p(ctx, dirty);
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function instance$9$1($$self, $$props, $$invalidate) {
	
	let { referenceElement } = $$props;
	let { metadata } = $$props;
	let { isVisible } = $$props;
	const isMobile = getContext(IS_MOBILE);
	let menuItems;

	$$self.$$set = $$props => {
		if ("referenceElement" in $$props) $$invalidate(0, referenceElement = $$props.referenceElement);
		if ("metadata" in $$props) $$invalidate(4, metadata = $$props.metadata);
		if ("isVisible" in $$props) $$invalidate(1, isVisible = $$props.isVisible);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*metadata*/ 16) {
			$$invalidate(2, menuItems = (metadata || []).filter(meta => ["menu", "calendar-and-menu"].includes(meta.display)).filter(meta => meta.value !== undefined).sort((a, b) => a.order - b.order));
		}
	};

	return [referenceElement, isVisible, menuItems, isMobile, metadata];
}

class PopoverMenu extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$9$1, create_fragment$9$1, safe_not_equal, {
			referenceElement: 0,
			metadata: 4,
			isVisible: 1
		});
	}
}

const DEFAULT_DAILY_NOTE_FORMAT = "YYYY-MM-DD";
const DEFAULT_WEEKLY_NOTE_FORMAT = "gggg-[W]ww";
const DEFAULT_MONTHLY_NOTE_FORMAT = "YYYY-MM";

function shouldUsePeriodicNotesSettings(periodicity) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const periodicNotes = window.app.plugins.getPlugin("periodic-notes");
    return periodicNotes && periodicNotes.settings?.[periodicity]?.enabled;
}
/**
 * Read the user settings for the `daily-notes` plugin
 * to keep behavior of creating a new note in-sync.
 */
function getDailyNoteSettings() {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { internalPlugins, plugins } = window.app;
        if (shouldUsePeriodicNotesSettings("daily")) {
            const { format, folder, template } = plugins.getPlugin("periodic-notes")?.settings?.daily || {};
            return {
                format: format || DEFAULT_DAILY_NOTE_FORMAT,
                folder: folder?.trim() || "",
                template: template?.trim() || "",
            };
        }
        const { folder, format, template } = internalPlugins.getPluginById("daily-notes")?.instance?.options || {};
        return {
            format: format || DEFAULT_DAILY_NOTE_FORMAT,
            folder: folder?.trim() || "",
            template: template?.trim() || "",
        };
    }
    catch (err) {
        console.info("No custom daily note settings found!", err);
    }
}
/**
 * Read the user settings for the `weekly-notes` plugin
 * to keep behavior of creating a new note in-sync.
 */
function getWeeklyNoteSettings() {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pluginManager = window.app.plugins;
        const calendarSettings = pluginManager.getPlugin("calendar")?.options;
        const periodicNotesSettings = pluginManager.getPlugin("periodic-notes")
            ?.settings?.weekly;
        if (shouldUsePeriodicNotesSettings("weekly")) {
            return {
                format: periodicNotesSettings.format || DEFAULT_WEEKLY_NOTE_FORMAT,
                folder: periodicNotesSettings.folder?.trim() || "",
                template: periodicNotesSettings.template?.trim() || "",
            };
        }
        const settings = calendarSettings || {};
        return {
            format: settings.weeklyNoteFormat || DEFAULT_WEEKLY_NOTE_FORMAT,
            folder: settings.weeklyNoteFolder?.trim() || "",
            template: settings.weeklyNoteTemplate?.trim() || "",
        };
    }
    catch (err) {
        console.info("No custom weekly note settings found!", err);
    }
}
/**
 * Read the user settings for the `periodic-notes` plugin
 * to keep behavior of creating a new note in-sync.
 */
function getMonthlyNoteSettings() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pluginManager = window.app.plugins;
    try {
        const settings = (shouldUsePeriodicNotesSettings("monthly") &&
            pluginManager.getPlugin("periodic-notes")?.settings?.monthly) ||
            {};
        return {
            format: settings.format || DEFAULT_MONTHLY_NOTE_FORMAT,
            folder: settings.folder?.trim() || "",
            template: settings.template?.trim() || "",
        };
    }
    catch (err) {
        console.info("No custom monthly note settings found!", err);
    }
}
function basename(fullPath) {
    let base = fullPath.substring(fullPath.lastIndexOf("/") + 1);
    if (base.lastIndexOf(".") != -1)
        base = base.substring(0, base.lastIndexOf("."));
    return base;
}

/**
 * dateUID is a way of weekly identifying daily/weekly/monthly notes.
 * They are prefixed with the granularity to avoid ambiguity.
 */
function getDateUID(date, granularity = "day") {
    const ts = date.clone().startOf(granularity).format();
    return `${granularity}-${ts}`;
}
function removeEscapedCharacters(format) {
    return format.replace(/\[[^\]]*\]/g, ""); // remove everything within brackets
}
/**
 * XXX: When parsing dates that contain both week numbers and months,
 * Moment choses to ignore the week numbers. For the week dateUID, we
 * want the opposite behavior. Strip the MMM from the format to patch.
 */
function isFormatAmbiguous(format, granularity) {
    if (granularity === "week") {
        const cleanFormat = removeEscapedCharacters(format);
        return (/w{1,2}/i.test(cleanFormat) &&
            (/M{1,4}/.test(cleanFormat) || /D{1,4}/.test(cleanFormat)));
    }
    return false;
}
function getDateFromFile(file, granularity) {
    return getDateFromFilename(file.basename, granularity);
}
function getDateFromPath(path, granularity) {
    return getDateFromFilename(basename(path), granularity);
}
function getDateFromFilename(filename, granularity) {
    const getSettings = {
        day: getDailyNoteSettings,
        week: getWeeklyNoteSettings,
        month: getMonthlyNoteSettings,
    };
    const format = getSettings[granularity]().format.split("/").pop();
    const noteDate = window.moment(filename, format, true);
    if (!noteDate.isValid()) {
        return null;
    }
    if (isFormatAmbiguous(format, granularity)) {
        if (granularity === "week") {
            const cleanFormat = removeEscapedCharacters(format);
            if (/w{1,2}/i.test(cleanFormat)) {
                return window.moment(filename, 
                // If format contains week, remove day & month formatting
                format.replace(/M{1,4}/g, "").replace(/D{1,4}/g, ""), false);
            }
        }
    }
    return noteDate;
}

class DailyNotesFolderMissingError extends Error {
}
function getAllDailyNotes() {
    /**
     * Find all daily notes in the daily note folder
     */
    const { vault } = window.app;
    const { folder } = getDailyNoteSettings();
    const dailyNotesFolder = vault.getAbstractFileByPath(obsidian__default['default'].normalizePath(folder));
    if (!dailyNotesFolder) {
        throw new DailyNotesFolderMissingError("Failed to find daily notes folder");
    }
    const dailyNotes = {};
    obsidian__default['default'].Vault.recurseChildren(dailyNotesFolder, (note) => {
        if (note instanceof obsidian__default['default'].TFile) {
            const date = getDateFromFile(note, "day");
            if (date) {
                const dateString = getDateUID(date, "day");
                dailyNotes[dateString] = note;
            }
        }
    });
    return dailyNotes;
}

class WeeklyNotesFolderMissingError extends Error {
}
function getAllWeeklyNotes() {
    const weeklyNotes = {};
    if (!appHasWeeklyNotesPluginLoaded()) {
        return weeklyNotes;
    }
    const { vault } = window.app;
    const { folder } = getWeeklyNoteSettings();
    const weeklyNotesFolder = vault.getAbstractFileByPath(obsidian__default['default'].normalizePath(folder));
    if (!weeklyNotesFolder) {
        throw new WeeklyNotesFolderMissingError("Failed to find weekly notes folder");
    }
    obsidian__default['default'].Vault.recurseChildren(weeklyNotesFolder, (note) => {
        if (note instanceof obsidian__default['default'].TFile) {
            const date = getDateFromFile(note, "week");
            if (date) {
                const dateString = getDateUID(date, "week");
                weeklyNotes[dateString] = note;
            }
        }
    });
    return weeklyNotes;
}

class MonthlyNotesFolderMissingError extends Error {
}
function getAllMonthlyNotes() {
    const monthlyNotes = {};
    if (!appHasMonthlyNotesPluginLoaded()) {
        return monthlyNotes;
    }
    const { vault } = window.app;
    const { folder } = getMonthlyNoteSettings();
    const monthlyNotesFolder = vault.getAbstractFileByPath(obsidian__default['default'].normalizePath(folder));
    if (!monthlyNotesFolder) {
        throw new MonthlyNotesFolderMissingError("Failed to find monthly notes folder");
    }
    obsidian__default['default'].Vault.recurseChildren(monthlyNotesFolder, (note) => {
        if (note instanceof obsidian__default['default'].TFile) {
            const date = getDateFromFile(note, "month");
            if (date) {
                const dateString = getDateUID(date, "month");
                monthlyNotes[dateString] = note;
            }
        }
    });
    return monthlyNotes;
}
/**
 * XXX: "Weekly Notes" live in either the Calendar plugin or the periodic-notes plugin.
 * Check both until the weekly notes feature is removed from the Calendar plugin.
 */
function appHasWeeklyNotesPluginLoaded() {
    const { app } = window;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (app.plugins.getPlugin("calendar")) {
        return true;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const periodicNotes = app.plugins.getPlugin("periodic-notes");
    return periodicNotes && periodicNotes.settings?.weekly?.enabled;
}
function appHasMonthlyNotesPluginLoaded() {
    const { app } = window;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const periodicNotes = app.plugins.getPlugin("periodic-notes");
    return periodicNotes && periodicNotes.settings?.monthly?.enabled;
}
var appHasMonthlyNotesPluginLoaded_1 = appHasMonthlyNotesPluginLoaded;
var getAllDailyNotes_1 = getAllDailyNotes;
var getAllMonthlyNotes_1 = getAllMonthlyNotes;
var getAllWeeklyNotes_1 = getAllWeeklyNotes;
var getDateFromFile_1 = getDateFromFile;
var getDateFromPath_1 = getDateFromPath;
var getDateUID_1 = getDateUID;

/* src/components/Dot.svelte generated by Svelte v3.37.0 */

function add_css$7() {
	var style = element("style");
	style.id = "svelte-uhbjqd-style";
	style.textContent = ".dot.svelte-uhbjqd{display:inline-block;height:6px;width:6px;margin:0 1px}.active.svelte-uhbjqd{color:var(--text-on-accent)}";
	append(document.head, style);
}

function create_fragment$8$1(ctx) {
	let svg;
	let circle;
	let circle_stroke_value;
	let circle_fill_value;

	return {
		c() {
			svg = svg_element("svg");
			circle = svg_element("circle");
			attr(circle, "stroke", circle_stroke_value = !/*isFilled*/ ctx[1] ? "currentColor" : "none");
			attr(circle, "fill", circle_fill_value = /*isFilled*/ ctx[1] ? "currentColor" : "none");
			attr(circle, "cx", "3");
			attr(circle, "cy", "3");
			attr(circle, "r", "2");
			attr(svg, "class", "dot svelte-uhbjqd");
			set_style(svg, "color", /*color*/ ctx[0]);
			attr(svg, "viewBox", "0 0 6 6");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			toggle_class(svg, "active", /*isActive*/ ctx[2]);
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, circle);
		},
		p(ctx, [dirty]) {
			if (dirty & /*isFilled*/ 2 && circle_stroke_value !== (circle_stroke_value = !/*isFilled*/ ctx[1] ? "currentColor" : "none")) {
				attr(circle, "stroke", circle_stroke_value);
			}

			if (dirty & /*isFilled*/ 2 && circle_fill_value !== (circle_fill_value = /*isFilled*/ ctx[1] ? "currentColor" : "none")) {
				attr(circle, "fill", circle_fill_value);
			}

			if (dirty & /*color*/ 1) {
				set_style(svg, "color", /*color*/ ctx[0]);
			}

			if (dirty & /*isActive*/ 4) {
				toggle_class(svg, "active", /*isActive*/ ctx[2]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

function instance$8$1($$self, $$props, $$invalidate) {
	let { color } = $$props;
	let { isFilled } = $$props;
	let { isActive } = $$props;

	$$self.$$set = $$props => {
		if ("color" in $$props) $$invalidate(0, color = $$props.color);
		if ("isFilled" in $$props) $$invalidate(1, isFilled = $$props.isFilled);
		if ("isActive" in $$props) $$invalidate(2, isActive = $$props.isActive);
	};

	return [color, isFilled, isActive];
}

class Dot extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-uhbjqd-style")) add_css$7();
		init(this, options, instance$8$1, create_fragment$8$1, safe_not_equal, { color: 0, isFilled: 1, isActive: 2 });
	}
}

/* src/components/Dots.svelte generated by Svelte v3.37.0 */

function add_css$6() {
	var style = element("style");
	style.id = "svelte-1jd3oq9-style";
	style.textContent = ".dot-container.svelte-1jd3oq9{display:flex;flex-wrap:wrap;line-height:6px;min-height:6px}.centered.svelte-1jd3oq9{justify-content:center}";
	append(document.head, style);
}

function get_each_context$1$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[3] = list[i].color;
	child_ctx[4] = list[i].display;
	child_ctx[5] = list[i].dots !== undefined ? list[i].dots : [];
	return child_ctx;
}

function get_each_context_1$1$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[8] = list[i];
	return child_ctx;
}

// (11:2) {#if metadata}
function create_if_block$3(ctx) {
	let each_1_anchor;
	let current;
	let each_value = /*sortedMeta*/ ctx[2];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$1$1(get_each_context$1$1(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, each_1_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if (dirty & /*sortedMeta, MAX_DOTS_PER_SOURCE*/ 4) {
				each_value = /*sortedMeta*/ ctx[2];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$1$1(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$1$1(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach(each_1_anchor);
		}
	};
}

// (13:6) {#if display === "calendar-and-menu"}
function create_if_block_1$1(ctx) {
	let each_1_anchor;
	let current;
	let each_value_1 = /*dots*/ ctx[5].slice(0, MAX_DOTS_PER_SOURCE);
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1$1$1(get_each_context_1$1$1(ctx, each_value_1, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, each_1_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if (dirty & /*sortedMeta, MAX_DOTS_PER_SOURCE*/ 4) {
				each_value_1 = /*dots*/ ctx[5].slice(0, MAX_DOTS_PER_SOURCE);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1$1$1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block_1$1$1(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				group_outros();

				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value_1.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach(each_1_anchor);
		}
	};
}

// (14:8) {#each dots.slice(0, MAX_DOTS_PER_SOURCE) as dot}
function create_each_block_1$1$1(ctx) {
	let dot;
	let current;
	const dot_spread_levels = [/*dot*/ ctx[8], { color: /*color*/ ctx[3] }];
	let dot_props = {};

	for (let i = 0; i < dot_spread_levels.length; i += 1) {
		dot_props = assign(dot_props, dot_spread_levels[i]);
	}

	dot = new Dot({ props: dot_props });

	return {
		c() {
			create_component(dot.$$.fragment);
		},
		m(target, anchor) {
			mount_component(dot, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const dot_changes = (dirty & /*sortedMeta, MAX_DOTS_PER_SOURCE*/ 4)
			? get_spread_update(dot_spread_levels, [
					get_spread_object(/*dot*/ ctx[8]),
					dirty & /*sortedMeta*/ 4 && { color: /*color*/ ctx[3] }
				])
			: {};

			dot.$set(dot_changes);
		},
		i(local) {
			if (current) return;
			transition_in(dot.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(dot.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(dot, detaching);
		}
	};
}

// (12:4) {#each sortedMeta as { color, display, dots = [] }}
function create_each_block$1$1(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*display*/ ctx[4] === "calendar-and-menu" && create_if_block_1$1(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if (/*display*/ ctx[4] === "calendar-and-menu") {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*sortedMeta*/ 4) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block_1$1(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function create_fragment$7$1(ctx) {
	let div;
	let current;
	let if_block = /*metadata*/ ctx[1] && create_if_block$3(ctx);

	return {
		c() {
			div = element("div");
			if (if_block) if_block.c();
			attr(div, "class", "dot-container svelte-1jd3oq9");
			toggle_class(div, "centered", /*centered*/ ctx[0]);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if (if_block) if_block.m(div, null);
			current = true;
		},
		p(ctx, [dirty]) {
			if (/*metadata*/ ctx[1]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*metadata*/ 2) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$3(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(div, null);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}

			if (dirty & /*centered*/ 1) {
				toggle_class(div, "centered", /*centered*/ ctx[0]);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (if_block) if_block.d();
		}
	};
}

const MAX_DOTS_PER_SOURCE = 5;

function instance$7$1($$self, $$props, $$invalidate) {
	
	let { centered = true } = $$props;
	let { metadata } = $$props;
	let sortedMeta;

	$$self.$$set = $$props => {
		if ("centered" in $$props) $$invalidate(0, centered = $$props.centered);
		if ("metadata" in $$props) $$invalidate(1, metadata = $$props.metadata);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*metadata*/ 2) {
			$$invalidate(2, sortedMeta = metadata && metadata.sort((a, b) => a.order - b.order));
		}
	};

	return [centered, metadata, sortedMeta];
}

class Dots extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-1jd3oq9-style")) add_css$6();
		init(this, options, instance$7$1, create_fragment$7$1, safe_not_equal, { centered: 0, metadata: 1 });
	}
}

/* src/components/MetadataResolver.svelte generated by Svelte v3.37.0 */

const get_default_slot_changes_2 = dirty => ({});
const get_default_slot_context_2 = ctx => ({ metadata: null });
const get_default_slot_changes_1 = dirty => ({ metadata: dirty & /*metadata*/ 1 });
const get_default_slot_context_1 = ctx => ({ metadata: /*resolvedMeta*/ ctx[3] });
const get_default_slot_changes = dirty => ({});
const get_default_slot_context = ctx => ({ metadata: null });

// (13:0) {:else}
function create_else_block(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[2].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], get_default_slot_context_2);

	return {
		c() {
			if (default_slot) default_slot.c();
		},
		m(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && dirty & /*$$scope*/ 2) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[1], dirty, get_default_slot_changes_2, get_default_slot_context_2);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};
}

// (7:0) {#if metadata}
function create_if_block$2(ctx) {
	let await_block_anchor;
	let promise;
	let current;

	let info = {
		ctx,
		current: null,
		token: null,
		hasCatch: false,
		pending: create_pending_block,
		then: create_then_block,
		catch: create_catch_block,
		value: 3,
		blocks: [,,,]
	};

	handle_promise(promise = /*metadata*/ ctx[0], info);

	return {
		c() {
			await_block_anchor = empty();
			info.block.c();
		},
		m(target, anchor) {
			insert(target, await_block_anchor, anchor);
			info.block.m(target, info.anchor = anchor);
			info.mount = () => await_block_anchor.parentNode;
			info.anchor = await_block_anchor;
			current = true;
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			info.ctx = ctx;

			if (dirty & /*metadata*/ 1 && promise !== (promise = /*metadata*/ ctx[0]) && handle_promise(promise, info)) ; else {
				const child_ctx = ctx.slice();
				child_ctx[3] = info.resolved;
				info.block.p(child_ctx, dirty);
			}
		},
		i(local) {
			if (current) return;
			transition_in(info.block);
			current = true;
		},
		o(local) {
			for (let i = 0; i < 3; i += 1) {
				const block = info.blocks[i];
				transition_out(block);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach(await_block_anchor);
			info.block.d(detaching);
			info.token = null;
			info = null;
		}
	};
}

// (1:0) <svelte:options immutable />  <script lang="ts">; export let metadata; </script>  {#if metadata}
function create_catch_block(ctx) {
	return {
		c: noop,
		m: noop,
		p: noop,
		i: noop,
		o: noop,
		d: noop
	};
}

// (10:2) {:then resolvedMeta}
function create_then_block(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[2].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], get_default_slot_context_1);

	return {
		c() {
			if (default_slot) default_slot.c();
		},
		m(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && dirty & /*$$scope, metadata*/ 3) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[1], dirty, get_default_slot_changes_1, get_default_slot_context_1);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};
}

// (8:19)      <slot metadata="{null}
function create_pending_block(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[2].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], get_default_slot_context);

	return {
		c() {
			if (default_slot) default_slot.c();
		},
		m(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && dirty & /*$$scope*/ 2) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[1], dirty, get_default_slot_changes, get_default_slot_context);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};
}

function create_fragment$6$1(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block$2, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*metadata*/ ctx[0]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function instance$6$1($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	
	let { metadata } = $$props;

	$$self.$$set = $$props => {
		if ("metadata" in $$props) $$invalidate(0, metadata = $$props.metadata);
		if ("$$scope" in $$props) $$invalidate(1, $$scope = $$props.$$scope);
	};

	return [metadata, $$scope, slots];
}

class MetadataResolver extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$6$1, create_fragment$6$1, not_equal, { metadata: 0 });
	}
}

function isMacOS() {
    return navigator.appVersion.indexOf("Mac") !== -1;
}
function isMetaPressed(e) {
    return isMacOS() ? e.metaKey : e.ctrlKey;
}
function getDaysOfWeek(..._args) {
    return window.moment.weekdaysShort(true);
}
function isWeekend(date) {
    return date.isoWeekday() === 6 || date.isoWeekday() === 7;
}
function getStartOfWeek(days) {
    return days[0].weekday(0);
}
/**
 * Generate a 2D array of daily information to power
 * the calendar view.
 */
function getMonth(displayedMonth, ..._args) {
    const locale = window.moment().locale();
    const month = [];
    let week;
    const startOfMonth = displayedMonth.clone().locale(locale).date(1);
    const startOffset = startOfMonth.weekday();
    let date = startOfMonth.clone().subtract(startOffset, "days");
    for (let _day = 0; _day < 42; _day++) {
        if (_day % 7 === 0) {
            week = {
                days: [],
                weekNum: date.week(),
            };
            month.push(week);
        }
        week.days.push(date);
        date = date.clone().add(1, "days");
    }
    return month;
}

/* src/components/Day.svelte generated by Svelte v3.37.0 */

function add_css$5$1() {
	var style = element("style");
	style.id = "svelte-u43nt5-style";
	style.textContent = ".day.svelte-u43nt5{background-color:var(--color-background-day);border-radius:4px;color:var(--color-text-day);cursor:pointer;font-size:0.8em;height:100%;padding:4px;position:relative;text-align:center;transition:background-color 0.1s ease-in, color 0.1s ease-in;vertical-align:baseline}.day.svelte-u43nt5:hover{background-color:var(--interactive-hover)}.day.active.svelte-u43nt5:hover{background-color:var(--interactive-accent-hover)}.adjacent-month.svelte-u43nt5{opacity:0.25}.today.svelte-u43nt5{color:var(--color-text-today)}.day.svelte-u43nt5:active,.active.svelte-u43nt5,.active.today.svelte-u43nt5{color:var(--text-on-accent);background-color:var(--interactive-accent)}";
	append(document.head, style);
}

// (73:2) <MetadataResolver metadata="{metadata}" let:metadata>
function create_default_slot$2(ctx) {
	let div;
	let t0_value = /*date*/ ctx[0].format("D") + "";
	let t0;
	let t1;
	let dots;
	let div_draggable_value;
	let current;
	let mounted;
	let dispose;
	dots = new Dots({ props: { metadata: /*metadata*/ ctx[6] } });

	let div_levels = [
		{ class: "day" },
		{ draggable: div_draggable_value = true },
		getAttributes(/*metadata*/ ctx[6])
	];

	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	function click_handler(...args) {
		return /*click_handler*/ ctx[16](/*metadata*/ ctx[6], ...args);
	}

	function pointerenter_handler(...args) {
		return /*pointerenter_handler*/ ctx[17](/*metadata*/ ctx[6], ...args);
	}

	return {
		c() {
			div = element("div");
			t0 = text(t0_value);
			t1 = space();
			create_component(dots.$$.fragment);
			set_attributes(div, div_data);
			toggle_class(div, "active", /*selectedId*/ ctx[3] === getDateUID_1(/*date*/ ctx[0], "day"));
			toggle_class(div, "adjacent-month", !/*date*/ ctx[0].isSame(/*$displayedMonth*/ ctx[5], "month"));
			toggle_class(div, "has-note", !!/*file*/ ctx[4]);
			toggle_class(div, "today", /*date*/ ctx[0].isSame(/*today*/ ctx[2], "day"));
			toggle_class(div, "svelte-u43nt5", true);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t0);
			append(div, t1);
			mount_component(dots, div, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen(div, "click", click_handler),
					listen(div, "contextmenu", /*handleContextmenu*/ ctx[11]),
					listen(div, "pointerenter", pointerenter_handler),
					listen(div, "pointerleave", /*endHover*/ ctx[10]),
					listen(div, "dragstart", /*dragstart_handler*/ ctx[18])
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if ((!current || dirty & /*date*/ 1) && t0_value !== (t0_value = /*date*/ ctx[0].format("D") + "")) set_data(t0, t0_value);
			const dots_changes = {};
			if (dirty & /*metadata*/ 64) dots_changes.metadata = /*metadata*/ ctx[6];
			dots.$set(dots_changes);

			set_attributes(div, div_data = get_spread_update(div_levels, [
				{ class: "day" },
				{ draggable: div_draggable_value },
				dirty & /*metadata*/ 64 && getAttributes(/*metadata*/ ctx[6])
			]));

			toggle_class(div, "active", /*selectedId*/ ctx[3] === getDateUID_1(/*date*/ ctx[0], "day"));
			toggle_class(div, "adjacent-month", !/*date*/ ctx[0].isSame(/*$displayedMonth*/ ctx[5], "month"));
			toggle_class(div, "has-note", !!/*file*/ ctx[4]);
			toggle_class(div, "today", /*date*/ ctx[0].isSame(/*today*/ ctx[2], "day"));
			toggle_class(div, "svelte-u43nt5", true);
		},
		i(local) {
			if (current) return;
			transition_in(dots.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(dots.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(dots);
			mounted = false;
			run_all(dispose);
		}
	};
}

function create_fragment$5$1(ctx) {
	let td;
	let metadataresolver;
	let current;

	metadataresolver = new MetadataResolver({
			props: {
				metadata: /*metadata*/ ctx[6],
				$$slots: {
					default: [
						create_default_slot$2,
						({ metadata }) => ({ 6: metadata }),
						({ metadata }) => metadata ? 64 : 0
					]
				},
				$$scope: { ctx }
			}
		});

	return {
		c() {
			td = element("td");
			create_component(metadataresolver.$$.fragment);
		},
		m(target, anchor) {
			insert(target, td, anchor);
			mount_component(metadataresolver, td, null);
			current = true;
		},
		p(ctx, [dirty]) {
			const metadataresolver_changes = {};
			if (dirty & /*metadata*/ 64) metadataresolver_changes.metadata = /*metadata*/ ctx[6];

			if (dirty & /*$$scope, metadata, selectedId, date, $displayedMonth, file, today, fileCache*/ 2097279) {
				metadataresolver_changes.$$scope = { dirty, ctx };
			}

			metadataresolver.$set(metadataresolver_changes);
		},
		i(local) {
			if (current) return;
			transition_in(metadataresolver.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(metadataresolver.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(td);
			destroy_component(metadataresolver);
		}
	};
}

function getAttributes(metadata) {
	if (!metadata) {
		return {};
	}

	return metadata.filter(meta => meta.display === "calendar-and-menu").reduce(
		(acc, meta) => {
			return Object.assign(Object.assign({}, acc), meta.attrs);
		},
		{}
	);
}

function instance$5$1($$self, $$props, $$invalidate) {
	let $displayedMonth;
	
	
	
	
	
	let { date } = $$props;
	let { fileCache } = $$props;
	let { getSourceSettings } = $$props;
	let file;
	let { onHover } = $$props;
	let { onClick } = $$props;
	let { onContextMenu } = $$props;
	let { today } = $$props;
	let { selectedId = null } = $$props;
	const isMobile = getContext(IS_MOBILE);
	const displayedMonth = getContext(DISPLAYED_MONTH);
	component_subscribe($$self, displayedMonth, value => $$invalidate(5, $displayedMonth = value));
	const dispatch = createEventDispatcher();
	let metadata;

	fileCache.store.subscribe(() => {
		$$invalidate(4, file = fileCache.getFile(date, "day"));
		$$invalidate(6, metadata = fileCache.getEvaluatedMetadata("day", date, getSourceSettings));
	});

	function handleClick(event, meta) {
		onClick === null || onClick === void 0
		? void 0
		: onClick("day", date, file, isMetaPressed(event));

		if (isMobile) {
			dispatch("hoverDay", {
				date,
				metadata: meta,
				target: event.target
			});
		}
	}

	function handleHover(event, meta) {
		onHover === null || onHover === void 0
		? void 0
		: onHover("day", date, file, event.target, isMetaPressed(event));

		dispatch("hoverDay", {
			date,
			metadata: meta,
			target: event.target
		});
	}

	function endHover(event) {
		dispatch("endHoverDay", { target: event.target });
	}

	function handleContextmenu(event) {
		onContextMenu === null || onContextMenu === void 0
		? void 0
		: onContextMenu("day", date, file, event);

		endHover(event);
	}

	const click_handler = (metadata, event) => handleClick(event, metadata);
	const pointerenter_handler = (metadata, event) => handleHover(event, metadata);
	const dragstart_handler = event => fileCache.onDragStart(event, file);

	$$self.$$set = $$props => {
		if ("date" in $$props) $$invalidate(0, date = $$props.date);
		if ("fileCache" in $$props) $$invalidate(1, fileCache = $$props.fileCache);
		if ("getSourceSettings" in $$props) $$invalidate(12, getSourceSettings = $$props.getSourceSettings);
		if ("onHover" in $$props) $$invalidate(13, onHover = $$props.onHover);
		if ("onClick" in $$props) $$invalidate(14, onClick = $$props.onClick);
		if ("onContextMenu" in $$props) $$invalidate(15, onContextMenu = $$props.onContextMenu);
		if ("today" in $$props) $$invalidate(2, today = $$props.today);
		if ("selectedId" in $$props) $$invalidate(3, selectedId = $$props.selectedId);
	};

	return [
		date,
		fileCache,
		today,
		selectedId,
		file,
		$displayedMonth,
		metadata,
		displayedMonth,
		handleClick,
		handleHover,
		endHover,
		handleContextmenu,
		getSourceSettings,
		onHover,
		onClick,
		onContextMenu,
		click_handler,
		pointerenter_handler,
		dragstart_handler
	];
}

class Day extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-u43nt5-style")) add_css$5$1();

		init(this, options, instance$5$1, create_fragment$5$1, not_equal, {
			date: 0,
			fileCache: 1,
			getSourceSettings: 12,
			onHover: 13,
			onClick: 14,
			onContextMenu: 15,
			today: 2,
			selectedId: 3
		});
	}
}

/* src/components/Arrow.svelte generated by Svelte v3.37.0 */

function add_css$4$1() {
	var style = element("style");
	style.id = "svelte-156w7na-style";
	style.textContent = ".arrow.svelte-156w7na.svelte-156w7na{align-items:center;cursor:pointer;display:flex;justify-content:center;width:24px}.arrow.is-mobile.svelte-156w7na.svelte-156w7na{width:32px}.right.svelte-156w7na.svelte-156w7na{transform:rotate(180deg)}.arrow.svelte-156w7na svg.svelte-156w7na{color:var(--color-arrow);height:16px;width:16px}";
	append(document.head, style);
}

function create_fragment$4$1(ctx) {
	let div;
	let svg;
	let path;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			svg = svg_element("svg");
			path = svg_element("path");
			attr(path, "fill", "currentColor");
			attr(path, "d", "M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z");
			attr(svg, "focusable", "false");
			attr(svg, "role", "img");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "viewBox", "0 0 320 512");
			attr(svg, "class", "svelte-156w7na");
			attr(div, "class", "arrow svelte-156w7na");
			attr(div, "aria-label", /*tooltip*/ ctx[1]);
			toggle_class(div, "is-mobile", /*isMobile*/ ctx[3]);
			toggle_class(div, "right", /*direction*/ ctx[2] === "right");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, svg);
			append(svg, path);

			if (!mounted) {
				dispose = listen(div, "click", function () {
					if (is_function(/*onClick*/ ctx[0])) /*onClick*/ ctx[0].apply(this, arguments);
				});

				mounted = true;
			}
		},
		p(new_ctx, [dirty]) {
			ctx = new_ctx;

			if (dirty & /*tooltip*/ 2) {
				attr(div, "aria-label", /*tooltip*/ ctx[1]);
			}

			if (dirty & /*direction*/ 4) {
				toggle_class(div, "right", /*direction*/ ctx[2] === "right");
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			dispose();
		}
	};
}

function instance$4$1($$self, $$props, $$invalidate) {
	let { onClick } = $$props;
	let { tooltip } = $$props;
	let { direction } = $$props;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let isMobile = window.app.isMobile;

	$$self.$$set = $$props => {
		if ("onClick" in $$props) $$invalidate(0, onClick = $$props.onClick);
		if ("tooltip" in $$props) $$invalidate(1, tooltip = $$props.tooltip);
		if ("direction" in $$props) $$invalidate(2, direction = $$props.direction);
	};

	return [onClick, tooltip, direction, isMobile];
}

class Arrow extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-156w7na-style")) add_css$4$1();
		init(this, options, instance$4$1, create_fragment$4$1, safe_not_equal, { onClick: 0, tooltip: 1, direction: 2 });
	}
}

/* src/components/Month.svelte generated by Svelte v3.37.0 */

function add_css$3$1() {
	var style = element("style");
	style.id = "svelte-ael2gn-style";
	style.textContent = ".title.svelte-ael2gn{color:var(--color-text-title);cursor:pointer;display:flex;font-size:1.4em;gap:0.3em;margin:0}.month.svelte-ael2gn{font-weight:500}.year.svelte-ael2gn{color:var(--interactive-accent)}";
	append(document.head, style);
}

// (74:4) {#if metadata}
function create_if_block$1$1(ctx) {
	let dots;
	let current;

	dots = new Dots({
			props: {
				metadata: /*metadata*/ ctx[4],
				centered: false
			}
		});

	return {
		c() {
			create_component(dots.$$.fragment);
		},
		m(target, anchor) {
			mount_component(dots, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const dots_changes = {};
			if (dirty & /*metadata*/ 16) dots_changes.metadata = /*metadata*/ ctx[4];
			dots.$set(dots_changes);
		},
		i(local) {
			if (current) return;
			transition_in(dots.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(dots.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(dots, detaching);
		}
	};
}

// (55:0) <MetadataResolver metadata="{metadata}" let:metadata>
function create_default_slot$1$1(ctx) {
	let div;
	let span2;
	let span0;
	let t0_value = /*$displayedMonth*/ ctx[3].format("MMM") + "";
	let t0;
	let t1;
	let span1;
	let t2_value = /*$displayedMonth*/ ctx[3].format("YYYY") + "";
	let t2;
	let t3;
	let current;
	let mounted;
	let dispose;
	let if_block = /*metadata*/ ctx[4] && create_if_block$1$1(ctx);

	function pointerenter_handler(...args) {
		return /*pointerenter_handler*/ ctx[15](/*metadata*/ ctx[4], ...args);
	}

	return {
		c() {
			div = element("div");
			span2 = element("span");
			span0 = element("span");
			t0 = text(t0_value);
			t1 = space();
			span1 = element("span");
			t2 = text(t2_value);
			t3 = space();
			if (if_block) if_block.c();
			attr(span0, "class", "month svelte-ael2gn");
			attr(span1, "class", "year svelte-ael2gn");
			attr(span2, "class", "title svelte-ael2gn");
			attr(div, "draggable", true);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, span2);
			append(span2, span0);
			append(span0, t0);
			append(span2, t1);
			append(span2, span1);
			append(span1, t2);
			append(div, t3);
			if (if_block) if_block.m(div, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen(div, "click", /*handleClick*/ ctx[8]),
					listen(div, "contextmenu", function () {
						if (is_function(/*metadata*/ ctx[4] && /*onContextMenu*/ ctx[1] && /*contextmenu_handler*/ ctx[13])) (/*metadata*/ ctx[4] && /*onContextMenu*/ ctx[1] && /*contextmenu_handler*/ ctx[13]).apply(this, arguments);
					}),
					listen(div, "dragstart", /*dragstart_handler*/ ctx[14]),
					listen(div, "pointerenter", pointerenter_handler),
					listen(div, "pointerleave", /*endHover*/ ctx[7])
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if ((!current || dirty & /*$displayedMonth*/ 8) && t0_value !== (t0_value = /*$displayedMonth*/ ctx[3].format("MMM") + "")) set_data(t0, t0_value);
			if ((!current || dirty & /*$displayedMonth*/ 8) && t2_value !== (t2_value = /*$displayedMonth*/ ctx[3].format("YYYY") + "")) set_data(t2, t2_value);

			if (/*metadata*/ ctx[4]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*metadata*/ 16) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$1$1(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(div, null);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (if_block) if_block.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

function create_fragment$3$1(ctx) {
	let metadataresolver;
	let current;

	metadataresolver = new MetadataResolver({
			props: {
				metadata: /*metadata*/ ctx[4],
				$$slots: {
					default: [
						create_default_slot$1$1,
						({ metadata }) => ({ 4: metadata }),
						({ metadata }) => metadata ? 16 : 0
					]
				},
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(metadataresolver.$$.fragment);
		},
		m(target, anchor) {
			mount_component(metadataresolver, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const metadataresolver_changes = {};
			if (dirty & /*metadata*/ 16) metadataresolver_changes.metadata = /*metadata*/ ctx[4];

			if (dirty & /*$$scope, metadata, onContextMenu, $displayedMonth, file, fileCache*/ 262175) {
				metadataresolver_changes.$$scope = { dirty, ctx };
			}

			metadataresolver.$set(metadataresolver_changes);
		},
		i(local) {
			if (current) return;
			transition_in(metadataresolver.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(metadataresolver.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(metadataresolver, detaching);
		}
	};
}

function instance$3$1($$self, $$props, $$invalidate) {
	let $displayedMonth;
	
	
	
	
	
	let { fileCache } = $$props;
	let { getSourceSettings } = $$props;
	let { onHover } = $$props;
	let { onClick } = $$props;
	let { onContextMenu } = $$props;
	let { resetDisplayedMonth } = $$props;
	let displayedMonth = getContext(DISPLAYED_MONTH);
	component_subscribe($$self, displayedMonth, value => $$invalidate(3, $displayedMonth = value));
	let metadata;
	const dispatch = createEventDispatcher();
	let file;

	function getMetadata() {
		$$invalidate(2, file = fileCache.getFile($displayedMonth, "month"));
		$$invalidate(4, metadata = fileCache.getEvaluatedMetadata("month", $displayedMonth, getSourceSettings));
	}

	fileCache.store.subscribe(getMetadata);
	displayedMonth.subscribe(getMetadata);

	function handleHover(event, meta) {
		if (!appHasMonthlyNotesPluginLoaded_1()) {
			return;
		}

		const date = $displayedMonth;

		onHover === null || onHover === void 0
		? void 0
		: onHover("month", date, file, event.target, isMetaPressed(event));

		dispatch("hoverDay", {
			date,
			metadata: meta,
			target: event.target
		});
	}

	function endHover(event) {
		dispatch("endHoverDay", { target: event.target });
	}

	function handleClick(event) {
		if (appHasMonthlyNotesPluginLoaded_1()) {
			onClick === null || onClick === void 0
			? void 0
			: onClick("month", $displayedMonth, file, isMetaPressed(event));
		} else {
			resetDisplayedMonth();
		}
	}

	const contextmenu_handler = e => onContextMenu("month", $displayedMonth, file, e);
	const dragstart_handler = event => fileCache.onDragStart(event, file);
	const pointerenter_handler = (metadata, event) => handleHover(event, metadata);

	$$self.$$set = $$props => {
		if ("fileCache" in $$props) $$invalidate(0, fileCache = $$props.fileCache);
		if ("getSourceSettings" in $$props) $$invalidate(9, getSourceSettings = $$props.getSourceSettings);
		if ("onHover" in $$props) $$invalidate(10, onHover = $$props.onHover);
		if ("onClick" in $$props) $$invalidate(11, onClick = $$props.onClick);
		if ("onContextMenu" in $$props) $$invalidate(1, onContextMenu = $$props.onContextMenu);
		if ("resetDisplayedMonth" in $$props) $$invalidate(12, resetDisplayedMonth = $$props.resetDisplayedMonth);
	};

	return [
		fileCache,
		onContextMenu,
		file,
		$displayedMonth,
		metadata,
		displayedMonth,
		handleHover,
		endHover,
		handleClick,
		getSourceSettings,
		onHover,
		onClick,
		resetDisplayedMonth,
		contextmenu_handler,
		dragstart_handler,
		pointerenter_handler
	];
}

class Month extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-ael2gn-style")) add_css$3$1();

		init(this, options, instance$3$1, create_fragment$3$1, safe_not_equal, {
			fileCache: 0,
			getSourceSettings: 9,
			onHover: 10,
			onClick: 11,
			onContextMenu: 1,
			resetDisplayedMonth: 12
		});
	}
}

/* src/components/Nav.svelte generated by Svelte v3.37.0 */

function add_css$2$1() {
	var style = element("style");
	style.id = "svelte-1fgn8mc-style";
	style.textContent = ".nav.svelte-1fgn8mc{align-items:baseline;display:flex;margin:0.6em 0 1em;padding:0 8px;width:100%}.right-nav.svelte-1fgn8mc{align-items:center;display:flex;justify-content:center;margin-left:auto}.reset-button.svelte-1fgn8mc{align-items:center;color:var(--color-arrow);display:flex;opacity:0.4;padding:0.5em}.reset-button.active.svelte-1fgn8mc{cursor:pointer;opacity:1}";
	append(document.head, style);
}

function create_fragment$2$1(ctx) {
	let div2;
	let month;
	let t0;
	let div1;
	let arrow0;
	let t1;
	let div0;
	let dot;
	let div0_aria_label_value;
	let t2;
	let arrow1;
	let current;
	let mounted;
	let dispose;

	const month_spread_levels = [
		{ fileCache: /*fileCache*/ ctx[1] },
		{
			getSourceSettings: /*getSourceSettings*/ ctx[0]
		},
		{
			resetDisplayedMonth: /*resetDisplayedMonth*/ ctx[7]
		},
		/*eventHandlers*/ ctx[2]
	];

	let month_props = {};

	for (let i = 0; i < month_spread_levels.length; i += 1) {
		month_props = assign(month_props, month_spread_levels[i]);
	}

	month = new Month({ props: month_props });
	month.$on("hoverDay", /*hoverDay_handler*/ ctx[10]);
	month.$on("endHoverDay", /*endHoverDay_handler*/ ctx[11]);

	arrow0 = new Arrow({
			props: {
				direction: "left",
				onClick: /*decrementDisplayedMonth*/ ctx[6],
				tooltip: "Previous Month"
			}
		});

	dot = new Dot({ props: { isFilled: true } });

	arrow1 = new Arrow({
			props: {
				direction: "right",
				onClick: /*incrementDisplayedMonth*/ ctx[5],
				tooltip: "Next Month"
			}
		});

	return {
		c() {
			div2 = element("div");
			create_component(month.$$.fragment);
			t0 = space();
			div1 = element("div");
			create_component(arrow0.$$.fragment);
			t1 = space();
			div0 = element("div");
			create_component(dot.$$.fragment);
			t2 = space();
			create_component(arrow1.$$.fragment);

			attr(div0, "aria-label", div0_aria_label_value = !/*showingCurrentMonth*/ ctx[3]
			? "Reset to current month"
			: null);

			attr(div0, "class", "reset-button svelte-1fgn8mc");
			toggle_class(div0, "active", !/*showingCurrentMonth*/ ctx[3]);
			attr(div1, "class", "right-nav svelte-1fgn8mc");
			attr(div2, "class", "nav svelte-1fgn8mc");
		},
		m(target, anchor) {
			insert(target, div2, anchor);
			mount_component(month, div2, null);
			append(div2, t0);
			append(div2, div1);
			mount_component(arrow0, div1, null);
			append(div1, t1);
			append(div1, div0);
			mount_component(dot, div0, null);
			append(div1, t2);
			mount_component(arrow1, div1, null);
			current = true;

			if (!mounted) {
				dispose = listen(div0, "click", /*resetDisplayedMonth*/ ctx[7]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			const month_changes = (dirty & /*fileCache, getSourceSettings, resetDisplayedMonth, eventHandlers*/ 135)
			? get_spread_update(month_spread_levels, [
					dirty & /*fileCache*/ 2 && { fileCache: /*fileCache*/ ctx[1] },
					dirty & /*getSourceSettings*/ 1 && {
						getSourceSettings: /*getSourceSettings*/ ctx[0]
					},
					dirty & /*resetDisplayedMonth*/ 128 && {
						resetDisplayedMonth: /*resetDisplayedMonth*/ ctx[7]
					},
					dirty & /*eventHandlers*/ 4 && get_spread_object(/*eventHandlers*/ ctx[2])
				])
			: {};

			month.$set(month_changes);

			if (!current || dirty & /*showingCurrentMonth*/ 8 && div0_aria_label_value !== (div0_aria_label_value = !/*showingCurrentMonth*/ ctx[3]
			? "Reset to current month"
			: null)) {
				attr(div0, "aria-label", div0_aria_label_value);
			}

			if (dirty & /*showingCurrentMonth*/ 8) {
				toggle_class(div0, "active", !/*showingCurrentMonth*/ ctx[3]);
			}
		},
		i(local) {
			if (current) return;
			transition_in(month.$$.fragment, local);
			transition_in(arrow0.$$.fragment, local);
			transition_in(dot.$$.fragment, local);
			transition_in(arrow1.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(month.$$.fragment, local);
			transition_out(arrow0.$$.fragment, local);
			transition_out(dot.$$.fragment, local);
			transition_out(arrow1.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div2);
			destroy_component(month);
			destroy_component(arrow0);
			destroy_component(dot);
			destroy_component(arrow1);
			mounted = false;
			dispose();
		}
	};
}

function instance$2$1($$self, $$props, $$invalidate) {
	let $displayedMonth;
	
	
	
	
	let { getSourceSettings } = $$props;
	let { fileCache } = $$props;
	let { today } = $$props;
	let { eventHandlers } = $$props;
	let displayedMonth = getContext(DISPLAYED_MONTH);
	component_subscribe($$self, displayedMonth, value => $$invalidate(9, $displayedMonth = value));

	function incrementDisplayedMonth() {
		displayedMonth.update(month => month.clone().add(1, "month"));
	}

	function decrementDisplayedMonth() {
		displayedMonth.update(month => month.clone().subtract(1, "month"));
	}

	function resetDisplayedMonth() {
		displayedMonth.set(today.clone());
	}

	let showingCurrentMonth;

	function hoverDay_handler(event) {
		bubble($$self, event);
	}

	function endHoverDay_handler(event) {
		bubble($$self, event);
	}

	$$self.$$set = $$props => {
		if ("getSourceSettings" in $$props) $$invalidate(0, getSourceSettings = $$props.getSourceSettings);
		if ("fileCache" in $$props) $$invalidate(1, fileCache = $$props.fileCache);
		if ("today" in $$props) $$invalidate(8, today = $$props.today);
		if ("eventHandlers" in $$props) $$invalidate(2, eventHandlers = $$props.eventHandlers);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$displayedMonth, today*/ 768) {
			$$invalidate(3, showingCurrentMonth = $displayedMonth.isSame(today, "month"));
		}
	};

	return [
		getSourceSettings,
		fileCache,
		eventHandlers,
		showingCurrentMonth,
		displayedMonth,
		incrementDisplayedMonth,
		decrementDisplayedMonth,
		resetDisplayedMonth,
		today,
		$displayedMonth,
		hoverDay_handler,
		endHoverDay_handler
	];
}

class Nav extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-1fgn8mc-style")) add_css$2$1();

		init(this, options, instance$2$1, create_fragment$2$1, safe_not_equal, {
			getSourceSettings: 0,
			fileCache: 1,
			today: 8,
			eventHandlers: 2
		});
	}
}

/* src/components/WeekNum.svelte generated by Svelte v3.37.0 */

function add_css$1$1() {
	var style = element("style");
	style.id = "svelte-t99tv9-style";
	style.textContent = "td.svelte-t99tv9{border-right:1px solid var(--background-modifier-border)}.week-num.svelte-t99tv9{background-color:var(--color-background-weeknum);border-radius:4px;color:var(--color-text-weeknum);cursor:pointer;font-size:0.65em;height:100%;padding:4px;text-align:center;transition:background-color 0.1s ease-in, color 0.1s ease-in;vertical-align:baseline}.week-num.svelte-t99tv9:hover{background-color:var(--interactive-hover)}.week-num.active.svelte-t99tv9:hover{background-color:var(--interactive-accent-hover)}.active.svelte-t99tv9{color:var(--text-on-accent);background-color:var(--interactive-accent)}";
	append(document.head, style);
}

// (48:2) <MetadataResolver metadata="{metadata}" let:metadata>
function create_default_slot$5(ctx) {
	let div;
	let t0;
	let t1;
	let dots;
	let current;
	let mounted;
	let dispose;
	dots = new Dots({ props: { metadata: /*metadata*/ ctx[8] } });

	function pointerenter_handler(...args) {
		return /*pointerenter_handler*/ ctx[16](/*metadata*/ ctx[8], ...args);
	}

	return {
		c() {
			div = element("div");
			t0 = text(/*weekNum*/ ctx[0]);
			t1 = space();
			create_component(dots.$$.fragment);
			attr(div, "class", "week-num svelte-t99tv9");
			attr(div, "draggable", true);
			toggle_class(div, "active", /*selectedId*/ ctx[5] === getDateUID_1(/*days*/ ctx[1][0], "week"));
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t0);
			append(div, t1);
			mount_component(dots, div, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen(div, "click", function () {
						if (is_function(/*onClick*/ ctx[2] && /*click_handler*/ ctx[13])) (/*onClick*/ ctx[2] && /*click_handler*/ ctx[13]).apply(this, arguments);
					}),
					listen(div, "contextmenu", function () {
						if (is_function(/*onContextMenu*/ ctx[3] && /*contextmenu_handler*/ ctx[14])) (/*onContextMenu*/ ctx[3] && /*contextmenu_handler*/ ctx[14]).apply(this, arguments);
					}),
					listen(div, "dragstart", /*dragstart_handler*/ ctx[15]),
					listen(div, "pointerenter", pointerenter_handler),
					listen(div, "pointerleave", /*endHover*/ ctx[10])
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (!current || dirty & /*weekNum*/ 1) set_data(t0, /*weekNum*/ ctx[0]);
			const dots_changes = {};
			if (dirty & /*metadata*/ 256) dots_changes.metadata = /*metadata*/ ctx[8];
			dots.$set(dots_changes);

			if (dirty & /*selectedId, getDateUID, days*/ 34) {
				toggle_class(div, "active", /*selectedId*/ ctx[5] === getDateUID_1(/*days*/ ctx[1][0], "week"));
			}
		},
		i(local) {
			if (current) return;
			transition_in(dots.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(dots.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(dots);
			mounted = false;
			run_all(dispose);
		}
	};
}

function create_fragment$1$1(ctx) {
	let td;
	let metadataresolver;
	let current;

	metadataresolver = new MetadataResolver({
			props: {
				metadata: /*metadata*/ ctx[8],
				$$slots: {
					default: [
						create_default_slot$5,
						({ metadata }) => ({ 8: metadata }),
						({ metadata }) => metadata ? 256 : 0
					]
				},
				$$scope: { ctx }
			}
		});

	return {
		c() {
			td = element("td");
			create_component(metadataresolver.$$.fragment);
			attr(td, "class", "svelte-t99tv9");
		},
		m(target, anchor) {
			insert(target, td, anchor);
			mount_component(metadataresolver, td, null);
			current = true;
		},
		p(ctx, [dirty]) {
			const metadataresolver_changes = {};
			if (dirty & /*metadata*/ 256) metadataresolver_changes.metadata = /*metadata*/ ctx[8];

			if (dirty & /*$$scope, selectedId, days, onClick, startOfWeek, file, onContextMenu, fileCache, metadata, weekNum*/ 262655) {
				metadataresolver_changes.$$scope = { dirty, ctx };
			}

			metadataresolver.$set(metadataresolver_changes);
		},
		i(local) {
			if (current) return;
			transition_in(metadataresolver.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(metadataresolver.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(td);
			destroy_component(metadataresolver);
		}
	};
}

function instance$1$1($$self, $$props, $$invalidate) {
	
	
	
	
	let { weekNum } = $$props;
	let { days } = $$props;
	let { getSourceSettings } = $$props;
	let { onHover } = $$props;
	let { onClick } = $$props;
	let { onContextMenu } = $$props;
	let { fileCache } = $$props;
	let { selectedId = null } = $$props;
	let file;
	let startOfWeek;
	let metadata;

	fileCache.store.subscribe(() => {
		$$invalidate(6, file = fileCache.getFile(days[0], "week"));
		$$invalidate(8, metadata = fileCache.getEvaluatedMetadata("week", days[0], getSourceSettings));
	});

	const dispatch = createEventDispatcher();

	function handleHover(event, meta) {
		onHover === null || onHover === void 0
		? void 0
		: onHover("week", days[0], file, event.target, isMetaPressed(event));

		dispatch("hoverDay", {
			date: days[0],
			metadata: meta,
			target: event.target
		});
	}

	function endHover(event) {
		dispatch("endHoverDay", { target: event.target });
	}

	const click_handler = e => onClick("week", startOfWeek, file, isMetaPressed(e));
	const contextmenu_handler = e => onContextMenu("week", days[0], file, e);
	const dragstart_handler = event => fileCache.onDragStart(event, file);
	const pointerenter_handler = (metadata, event) => handleHover(event, metadata);

	$$self.$$set = $$props => {
		if ("weekNum" in $$props) $$invalidate(0, weekNum = $$props.weekNum);
		if ("days" in $$props) $$invalidate(1, days = $$props.days);
		if ("getSourceSettings" in $$props) $$invalidate(11, getSourceSettings = $$props.getSourceSettings);
		if ("onHover" in $$props) $$invalidate(12, onHover = $$props.onHover);
		if ("onClick" in $$props) $$invalidate(2, onClick = $$props.onClick);
		if ("onContextMenu" in $$props) $$invalidate(3, onContextMenu = $$props.onContextMenu);
		if ("fileCache" in $$props) $$invalidate(4, fileCache = $$props.fileCache);
		if ("selectedId" in $$props) $$invalidate(5, selectedId = $$props.selectedId);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*days*/ 2) {
			$$invalidate(7, startOfWeek = getStartOfWeek(days));
		}
	};

	return [
		weekNum,
		days,
		onClick,
		onContextMenu,
		fileCache,
		selectedId,
		file,
		startOfWeek,
		metadata,
		handleHover,
		endHover,
		getSourceSettings,
		onHover,
		click_handler,
		contextmenu_handler,
		dragstart_handler,
		pointerenter_handler
	];
}

class WeekNum extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-t99tv9-style")) add_css$1$1();

		init(this, options, instance$1$1, create_fragment$1$1, not_equal, {
			weekNum: 0,
			days: 1,
			getSourceSettings: 11,
			onHover: 12,
			onClick: 2,
			onContextMenu: 3,
			fileCache: 4,
			selectedId: 5
		});
	}
}

function getDateUIDFromFile(file) {
    if (!file) {
        return null;
    }
    for (const granularity of ["day", "week", "month"]) {
        const date = getDateFromFile_1(file, granularity);
        if (date) {
            return getDateUID_1(date, granularity);
        }
    }
    return null;
}
function getDateUIDFromPath(path) {
    if (!path) {
        return null;
    }
    for (const granularity of ["day", "week", "month"]) {
        const date = getDateFromPath_1(path, granularity);
        if (date) {
            return getDateUID_1(date, granularity);
        }
    }
    return null;
}
class PeriodicNotesCache {
    constructor(plugin, sources) {
        this.app = plugin.app;
        this.sources = sources;
        this.store = writable({});
        plugin.app.workspace.onLayoutReady(() => {
            const { vault } = this.app;
            plugin.registerEvent(vault.on("create", this.onFileCreated, this));
            plugin.registerEvent(vault.on("delete", this.onFileDeleted, this));
            plugin.registerEvent(vault.on("rename", this.onFileRenamed, this));
            plugin.registerEvent(vault.on("modify", this.onFileModified, this));
            this.initialize();
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const workspace = this.app.workspace;
        plugin.registerEvent(workspace.on("periodic-notes:settings-updated", this.initialize, this));
        plugin.registerEvent(workspace.on("calendar:metadata-updated", this.initialize, this));
    }
    onFileCreated(file) {
        if (file instanceof obsidian.TFile && file.extension == "md") {
            const uid = getDateUIDFromFile(file);
            if (uid) {
                this.store.update((notes) => (Object.assign(Object.assign({}, notes), { [uid]: file })));
            }
        }
    }
    onFileDeleted(file) {
        if (file instanceof obsidian.TFile && file.extension == "md") {
            const uid = getDateUIDFromFile(file);
            if (uid) {
                this.store.update((notes) => (Object.assign(Object.assign({}, notes), { [uid]: undefined })));
            }
        }
    }
    onFileModified(file) {
        if (file instanceof obsidian.TFile && file.extension == "md") {
            const uid = getDateUIDFromFile(file);
            if (uid) {
                this.store.update((notes) => (Object.assign(Object.assign({}, notes), { [uid]: file })));
            }
        }
    }
    onFileRenamed(file, oldPath) {
        const uid = getDateUIDFromPath(oldPath);
        if (uid) {
            this.store.update((notes) => (Object.assign(Object.assign({}, notes), { [uid]: undefined })));
        }
        this.onFileCreated(file);
    }
    /**
     * Load any necessary state asynchronously
     */
    initialize() {
        this.store.set(Object.assign(Object.assign(Object.assign({}, getAllDailyNotes_1()), getAllWeeklyNotes_1()), getAllMonthlyNotes_1()));
    }
    getFile(date, granularity) {
        const uid = getDateUID_1(date, granularity);
        return get_store_value(this.store)[uid];
    }
    getFileForPeriodicNote(id) {
        return get_store_value(this.store)[id];
    }
    async getEvaluatedMetadata(granularity, date, getSourceSettings, ..._args) {
        var _a;
        const uid = getDateUID_1(date, granularity);
        const file = this.getFileForPeriodicNote(uid);
        const metadata = [];
        for (const source of this.sources) {
            const evaluatedMetadata = (await ((_a = source.getMetadata) === null || _a === void 0 ? void 0 : _a.call(source, granularity, date, file))) || {};
            const sourceSettings = getSourceSettings(source.id);
            metadata.push(Object.assign(Object.assign(Object.assign({}, evaluatedMetadata), source), sourceSettings));
        }
        return metadata;
    }
    onDragStart(event, file) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const dragManager = this.app.dragManager;
        const dragData = dragManager.dragFile(event, file);
        dragManager.onDragStart(event, dragData);
    }
}

/* src/components/Calendar.svelte generated by Svelte v3.37.0 */

function add_css$a() {
	var style = element("style");
	style.id = "svelte-uvowgi-style";
	style.textContent = ".container.svelte-uvowgi{--color-background-heading:transparent;--color-background-day:transparent;--color-background-weeknum:transparent;--color-background-weekend:transparent;--color-dot:var(--text-muted);--color-arrow:var(--text-muted);--color-button:var(--text-muted);--color-text-title:var(--text-normal);--color-text-heading:var(--text-muted);--color-text-day:var(--text-normal);--color-text-today:var(--interactive-accent);--color-text-weeknum:var(--text-muted)}.container.svelte-uvowgi{padding:0 8px}.weekend.svelte-uvowgi{background-color:var(--color-background-weekend)}.calendar.svelte-uvowgi{border-collapse:collapse;width:100%}th.svelte-uvowgi{background-color:var(--color-background-heading);color:var(--color-text-heading);font-size:0.6em;letter-spacing:1px;padding:4px;text-align:center;text-transform:uppercase}";
	append(document.head, style);
}

function get_each_context$3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[22] = list[i];
	return child_ctx;
}

function get_each_context_1$3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[25] = list[i];
	return child_ctx;
}

function get_each_context_2$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[28] = list[i];
	return child_ctx;
}

function get_each_context_3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[31] = list[i];
	return child_ctx;
}

// (77:6) {#if showWeekNums}
function create_if_block_2(ctx) {
	let col;

	return {
		c() {
			col = element("col");
		},
		m(target, anchor) {
			insert(target, col, anchor);
		},
		d(detaching) {
			if (detaching) detach(col);
		}
	};
}

// (80:6) {#each month[1].days as date}
function create_each_block_3(ctx) {
	let col;

	return {
		c() {
			col = element("col");
			attr(col, "class", "svelte-uvowgi");
			toggle_class(col, "weekend", isWeekend(/*date*/ ctx[31]));
		},
		m(target, anchor) {
			insert(target, col, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*month*/ 32) {
				toggle_class(col, "weekend", isWeekend(/*date*/ ctx[31]));
			}
		},
		d(detaching) {
			if (detaching) detach(col);
		}
	};
}

// (86:8) {#if showWeekNums}
function create_if_block_1(ctx) {
	let th;

	return {
		c() {
			th = element("th");
			th.textContent = "W";
			attr(th, "class", "svelte-uvowgi");
		},
		m(target, anchor) {
			insert(target, th, anchor);
		},
		d(detaching) {
			if (detaching) detach(th);
		}
	};
}

// (89:8) {#each daysOfWeek as dayOfWeek}
function create_each_block_2$1(ctx) {
	let th;
	let t_value = /*dayOfWeek*/ ctx[28] + "";
	let t;

	return {
		c() {
			th = element("th");
			t = text(t_value);
			attr(th, "class", "svelte-uvowgi");
		},
		m(target, anchor) {
			insert(target, th, anchor);
			append(th, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*daysOfWeek*/ 64 && t_value !== (t_value = /*dayOfWeek*/ ctx[28] + "")) set_data(t, t_value);
		},
		d(detaching) {
			if (detaching) detach(th);
		}
	};
}

// (97:10) {#if showWeekNums}
function create_if_block$6(ctx) {
	let weeknum;
	let current;

	const weeknum_spread_levels = [
		{ fileCache: /*fileCache*/ ctx[12] },
		{ selectedId: /*selectedId*/ ctx[3] },
		{
			getSourceSettings: /*getSourceSettings*/ ctx[2]
		},
		/*week*/ ctx[22],
		/*eventHandlers*/ ctx[1]
	];

	let weeknum_props = {};

	for (let i = 0; i < weeknum_spread_levels.length; i += 1) {
		weeknum_props = assign(weeknum_props, weeknum_spread_levels[i]);
	}

	weeknum = new WeekNum({ props: weeknum_props });
	weeknum.$on("hoverDay", /*updatePopover*/ ctx[13]);
	weeknum.$on("endHoverDay", /*dismissPopover*/ ctx[14]);

	return {
		c() {
			create_component(weeknum.$$.fragment);
		},
		m(target, anchor) {
			mount_component(weeknum, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const weeknum_changes = (dirty[0] & /*fileCache, selectedId, getSourceSettings, month, eventHandlers*/ 4142)
			? get_spread_update(weeknum_spread_levels, [
					dirty[0] & /*fileCache*/ 4096 && { fileCache: /*fileCache*/ ctx[12] },
					dirty[0] & /*selectedId*/ 8 && { selectedId: /*selectedId*/ ctx[3] },
					dirty[0] & /*getSourceSettings*/ 4 && {
						getSourceSettings: /*getSourceSettings*/ ctx[2]
					},
					dirty[0] & /*month*/ 32 && get_spread_object(/*week*/ ctx[22]),
					dirty[0] & /*eventHandlers*/ 2 && get_spread_object(/*eventHandlers*/ ctx[1])
				])
			: {};

			weeknum.$set(weeknum_changes);
		},
		i(local) {
			if (current) return;
			transition_in(weeknum.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(weeknum.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(weeknum, detaching);
		}
	};
}

// (108:10) {#each week.days as day (day.format())}
function create_each_block_1$3(key_1, ctx) {
	let first;
	let day;
	let current;

	const day_spread_levels = [
		{ date: /*day*/ ctx[25] },
		{ fileCache: /*fileCache*/ ctx[12] },
		{
			getSourceSettings: /*getSourceSettings*/ ctx[2]
		},
		{ today: /*today*/ ctx[4] },
		{ selectedId: /*selectedId*/ ctx[3] },
		/*eventHandlers*/ ctx[1]
	];

	let day_props = {};

	for (let i = 0; i < day_spread_levels.length; i += 1) {
		day_props = assign(day_props, day_spread_levels[i]);
	}

	day = new Day({ props: day_props });
	day.$on("hoverDay", /*updatePopover*/ ctx[13]);
	day.$on("endHoverDay", /*dismissPopover*/ ctx[14]);

	return {
		key: key_1,
		first: null,
		c() {
			first = empty();
			create_component(day.$$.fragment);
			this.first = first;
		},
		m(target, anchor) {
			insert(target, first, anchor);
			mount_component(day, target, anchor);
			current = true;
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			const day_changes = (dirty[0] & /*month, fileCache, getSourceSettings, today, selectedId, eventHandlers*/ 4158)
			? get_spread_update(day_spread_levels, [
					dirty[0] & /*month*/ 32 && { date: /*day*/ ctx[25] },
					dirty[0] & /*fileCache*/ 4096 && { fileCache: /*fileCache*/ ctx[12] },
					dirty[0] & /*getSourceSettings*/ 4 && {
						getSourceSettings: /*getSourceSettings*/ ctx[2]
					},
					dirty[0] & /*today*/ 16 && { today: /*today*/ ctx[4] },
					dirty[0] & /*selectedId*/ 8 && { selectedId: /*selectedId*/ ctx[3] },
					dirty[0] & /*eventHandlers*/ 2 && get_spread_object(/*eventHandlers*/ ctx[1])
				])
			: {};

			day.$set(day_changes);
		},
		i(local) {
			if (current) return;
			transition_in(day.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(day.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(first);
			destroy_component(day, detaching);
		}
	};
}

// (95:6) {#each month as week (week.weekNum)}
function create_each_block$3(key_1, ctx) {
	let tr;
	let t0;
	let each_blocks = [];
	let each_1_lookup = new Map();
	let t1;
	let current;
	let if_block = /*showWeekNums*/ ctx[0] && create_if_block$6(ctx);
	let each_value_1 = /*week*/ ctx[22].days;
	const get_key = ctx => /*day*/ ctx[25].format();

	for (let i = 0; i < each_value_1.length; i += 1) {
		let child_ctx = get_each_context_1$3(ctx, each_value_1, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block_1$3(key, child_ctx));
	}

	return {
		key: key_1,
		first: null,
		c() {
			tr = element("tr");
			if (if_block) if_block.c();
			t0 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t1 = space();
			this.first = tr;
		},
		m(target, anchor) {
			insert(target, tr, anchor);
			if (if_block) if_block.m(tr, null);
			append(tr, t0);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(tr, null);
			}

			append(tr, t1);
			current = true;
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (/*showWeekNums*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty[0] & /*showWeekNums*/ 1) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$6(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(tr, t0);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}

			if (dirty[0] & /*month, fileCache, getSourceSettings, today, selectedId, eventHandlers, updatePopover, dismissPopover*/ 28734) {
				each_value_1 = /*week*/ ctx[22].days;
				group_outros();
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value_1, each_1_lookup, tr, outro_and_destroy_block, create_each_block_1$3, t1, get_each_context_1$3);
				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);

			for (let i = 0; i < each_value_1.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			transition_out(if_block);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach(tr);
			if (if_block) if_block.d();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}
		}
	};
}

function create_fragment$e(ctx) {
	let div;
	let nav;
	let t0;
	let table;
	let colgroup;
	let t1;
	let t2;
	let thead;
	let tr;
	let t3;
	let t4;
	let tbody;
	let each_blocks = [];
	let each2_lookup = new Map();
	let t5;
	let popovermenu;
	let current;

	nav = new Nav({
			props: {
				fileCache: /*fileCache*/ ctx[12],
				today: /*today*/ ctx[4],
				getSourceSettings: /*getSourceSettings*/ ctx[2],
				eventHandlers: /*eventHandlers*/ ctx[1]
			}
		});

	nav.$on("hoverDay", /*updatePopover*/ ctx[13]);
	nav.$on("endHoverDay", /*dismissPopover*/ ctx[14]);
	let if_block0 = /*showWeekNums*/ ctx[0] && create_if_block_2();
	let each_value_3 = /*month*/ ctx[5][1].days;
	let each_blocks_2 = [];

	for (let i = 0; i < each_value_3.length; i += 1) {
		each_blocks_2[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
	}

	let if_block1 = /*showWeekNums*/ ctx[0] && create_if_block_1();
	let each_value_2 = /*daysOfWeek*/ ctx[6];
	let each_blocks_1 = [];

	for (let i = 0; i < each_value_2.length; i += 1) {
		each_blocks_1[i] = create_each_block_2$1(get_each_context_2$1(ctx, each_value_2, i));
	}

	let each_value = /*month*/ ctx[5];
	const get_key = ctx => /*week*/ ctx[22].weekNum;

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context$3(ctx, each_value, i);
		let key = get_key(child_ctx);
		each2_lookup.set(key, each_blocks[i] = create_each_block$3(key, child_ctx));
	}

	popovermenu = new PopoverMenu({
			props: {
				referenceElement: /*$hoveredDay*/ ctx[9],
				metadata: /*popoverMetadata*/ ctx[8],
				isVisible: /*showPopover*/ ctx[7]
			}
		});

	return {
		c() {
			div = element("div");
			create_component(nav.$$.fragment);
			t0 = space();
			table = element("table");
			colgroup = element("colgroup");
			if (if_block0) if_block0.c();
			t1 = space();

			for (let i = 0; i < each_blocks_2.length; i += 1) {
				each_blocks_2[i].c();
			}

			t2 = space();
			thead = element("thead");
			tr = element("tr");
			if (if_block1) if_block1.c();
			t3 = space();

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			t4 = space();
			tbody = element("tbody");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t5 = space();
			create_component(popovermenu.$$.fragment);
			attr(table, "class", "calendar svelte-uvowgi");
			attr(div, "id", "calendar-container");
			attr(div, "class", "container svelte-uvowgi");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(nav, div, null);
			append(div, t0);
			append(div, table);
			append(table, colgroup);
			if (if_block0) if_block0.m(colgroup, null);
			append(colgroup, t1);

			for (let i = 0; i < each_blocks_2.length; i += 1) {
				each_blocks_2[i].m(colgroup, null);
			}

			append(table, t2);
			append(table, thead);
			append(thead, tr);
			if (if_block1) if_block1.m(tr, null);
			append(tr, t3);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].m(tr, null);
			}

			append(table, t4);
			append(table, tbody);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(tbody, null);
			}

			append(div, t5);
			mount_component(popovermenu, div, null);
			current = true;
		},
		p(ctx, dirty) {
			const nav_changes = {};
			if (dirty[0] & /*today*/ 16) nav_changes.today = /*today*/ ctx[4];
			if (dirty[0] & /*getSourceSettings*/ 4) nav_changes.getSourceSettings = /*getSourceSettings*/ ctx[2];
			if (dirty[0] & /*eventHandlers*/ 2) nav_changes.eventHandlers = /*eventHandlers*/ ctx[1];
			nav.$set(nav_changes);

			if (/*showWeekNums*/ ctx[0]) {
				if (if_block0) ; else {
					if_block0 = create_if_block_2();
					if_block0.c();
					if_block0.m(colgroup, t1);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (dirty[0] & /*month*/ 32) {
				each_value_3 = /*month*/ ctx[5][1].days;
				let i;

				for (i = 0; i < each_value_3.length; i += 1) {
					const child_ctx = get_each_context_3(ctx, each_value_3, i);

					if (each_blocks_2[i]) {
						each_blocks_2[i].p(child_ctx, dirty);
					} else {
						each_blocks_2[i] = create_each_block_3(child_ctx);
						each_blocks_2[i].c();
						each_blocks_2[i].m(colgroup, null);
					}
				}

				for (; i < each_blocks_2.length; i += 1) {
					each_blocks_2[i].d(1);
				}

				each_blocks_2.length = each_value_3.length;
			}

			if (/*showWeekNums*/ ctx[0]) {
				if (if_block1) ; else {
					if_block1 = create_if_block_1();
					if_block1.c();
					if_block1.m(tr, t3);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (dirty[0] & /*daysOfWeek*/ 64) {
				each_value_2 = /*daysOfWeek*/ ctx[6];
				let i;

				for (i = 0; i < each_value_2.length; i += 1) {
					const child_ctx = get_each_context_2$1(ctx, each_value_2, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
					} else {
						each_blocks_1[i] = create_each_block_2$1(child_ctx);
						each_blocks_1[i].c();
						each_blocks_1[i].m(tr, null);
					}
				}

				for (; i < each_blocks_1.length; i += 1) {
					each_blocks_1[i].d(1);
				}

				each_blocks_1.length = each_value_2.length;
			}

			if (dirty[0] & /*month, fileCache, getSourceSettings, today, selectedId, eventHandlers, updatePopover, dismissPopover, showWeekNums*/ 28735) {
				each_value = /*month*/ ctx[5];
				group_outros();
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each2_lookup, tbody, outro_and_destroy_block, create_each_block$3, null, get_each_context$3);
				check_outros();
			}

			const popovermenu_changes = {};
			if (dirty[0] & /*$hoveredDay*/ 512) popovermenu_changes.referenceElement = /*$hoveredDay*/ ctx[9];
			if (dirty[0] & /*popoverMetadata*/ 256) popovermenu_changes.metadata = /*popoverMetadata*/ ctx[8];
			if (dirty[0] & /*showPopover*/ 128) popovermenu_changes.isVisible = /*showPopover*/ ctx[7];
			popovermenu.$set(popovermenu_changes);
		},
		i(local) {
			if (current) return;
			transition_in(nav.$$.fragment, local);

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			transition_in(popovermenu.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(nav.$$.fragment, local);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			transition_out(popovermenu.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(nav);
			if (if_block0) if_block0.d();
			destroy_each(each_blocks_2, detaching);
			if (if_block1) if_block1.d();
			destroy_each(each_blocks_1, detaching);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}

			destroy_component(popovermenu);
		}
	};
}

function instance$e($$self, $$props, $$invalidate) {
	let $displayedMonthStore;
	let $hoveredDay;
	
	
	
	let { localeData } = $$props;
	let { showWeekNums = false } = $$props;
	let { eventHandlers } = $$props;
	let { plugin } = $$props;
	let { sources = [] } = $$props;
	let { getSourceSettings } = $$props;
	let { selectedId } = $$props;
	let { today = window.moment() } = $$props;
	let { displayedMonth = today } = $$props;
	setContext(IS_MOBILE, plugin.app.isMobile);
	let displayedMonthStore = writable(displayedMonth);
	component_subscribe($$self, displayedMonthStore, value => $$invalidate(19, $displayedMonthStore = value));
	setContext(DISPLAYED_MONTH, displayedMonthStore);
	let month;
	let daysOfWeek;
	let hoverTimeout;
	let showPopover = false;
	let popoverMetadata;
	let hoveredDay = writable(null);
	component_subscribe($$self, hoveredDay, value => $$invalidate(9, $hoveredDay = value));
	const fileCache = new PeriodicNotesCache(plugin, sources);

	function openPopover() {
		$$invalidate(7, showPopover = true);
	}

	function updatePopover(event) {
		const { metadata, target } = event.detail;

		if (!showPopover) {
			window.clearTimeout(hoverTimeout);

			hoverTimeout = window.setTimeout(
				() => {
					if ($hoveredDay === target) {
						openPopover();
					}
				},
				750
			);
		}

		if ($hoveredDay !== target) {
			hoveredDay.set(target);
			$$invalidate(8, popoverMetadata = metadata);
		}
	}

	const dismissPopover = obsidian.debounce(
		event => {
			// if the user didn't hover onto another day
			if ($hoveredDay === event.detail.target) {
				hoveredDay.set(null);
				$$invalidate(7, showPopover = false);
			}
		},
		250,
		true
	);

	$$self.$$set = $$props => {
		if ("localeData" in $$props) $$invalidate(15, localeData = $$props.localeData);
		if ("showWeekNums" in $$props) $$invalidate(0, showWeekNums = $$props.showWeekNums);
		if ("eventHandlers" in $$props) $$invalidate(1, eventHandlers = $$props.eventHandlers);
		if ("plugin" in $$props) $$invalidate(16, plugin = $$props.plugin);
		if ("sources" in $$props) $$invalidate(17, sources = $$props.sources);
		if ("getSourceSettings" in $$props) $$invalidate(2, getSourceSettings = $$props.getSourceSettings);
		if ("selectedId" in $$props) $$invalidate(3, selectedId = $$props.selectedId);
		if ("today" in $$props) $$invalidate(4, today = $$props.today);
		if ("displayedMonth" in $$props) $$invalidate(18, displayedMonth = $$props.displayedMonth);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*$displayedMonthStore, localeData*/ 557056) {
			$$invalidate(5, month = getMonth($displayedMonthStore, localeData));
		}

		if ($$self.$$.dirty[0] & /*today, localeData*/ 32784) {
			$$invalidate(6, daysOfWeek = getDaysOfWeek(today, localeData));
		}
	};

	return [
		showWeekNums,
		eventHandlers,
		getSourceSettings,
		selectedId,
		today,
		month,
		daysOfWeek,
		showPopover,
		popoverMetadata,
		$hoveredDay,
		displayedMonthStore,
		hoveredDay,
		fileCache,
		updatePopover,
		dismissPopover,
		localeData,
		plugin,
		sources,
		displayedMonth,
		$displayedMonthStore
	];
}

class Calendar$1 extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-uvowgi-style")) add_css$a();

		init(
			this,
			options,
			instance$e,
			create_fragment$e,
			not_equal,
			{
				localeData: 15,
				showWeekNums: 0,
				eventHandlers: 1,
				plugin: 16,
				sources: 17,
				getSourceSettings: 2,
				selectedId: 3,
				today: 4,
				displayedMonth: 18
			},
			[-1, -1]
		);
	}
}

const langToMomentLocale = {
    en: "en-gb",
    zh: "zh-cn",
    "zh-TW": "zh-tw",
    ru: "ru",
    ko: "ko",
    it: "it",
    id: "id",
    ro: "ro",
    "pt-BR": "pt-br",
    cz: "cs",
    da: "da",
    de: "de",
    es: "es",
    fr: "fr",
    no: "nn",
    pl: "pl",
    pt: "pt",
    tr: "tr",
    hi: "hi",
    nl: "nl",
    ar: "ar",
    ja: "ja",
};
const weekdays = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
];
function overrideGlobalMomentWeekStart(weekStart) {
    const { moment } = window;
    const currentLocale = moment.locale();
    // Save the initial locale weekspec so that we can restore
    // it when toggling between the different options in settings.
    if (!window._bundledLocaleWeekSpec) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window._bundledLocaleWeekSpec = moment.localeData()._week;
    }
    if (weekStart === "locale") {
        moment.updateLocale(currentLocale, {
            week: window._bundledLocaleWeekSpec,
        });
    }
    else {
        moment.updateLocale(currentLocale, {
            week: {
                dow: weekdays.indexOf(weekStart) || 0,
            },
        });
    }
}
/**
 * Sets the locale used by the calendar. This allows the calendar to
 * default to the user's locale (e.g. Start Week on Sunday/Monday/Friday)
 *
 * @param localeOverride locale string (e.g. "en-US")
 */
function configureGlobalMomentLocale(localeOverride = "system-default", weekStart = "locale") {
    var _a;
    const obsidianLang = localStorage.getItem("language") || "en";
    const systemLang = (_a = navigator.language) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    let momentLocale = langToMomentLocale[obsidianLang];
    if (localeOverride !== "system-default") {
        momentLocale = localeOverride;
    }
    else if (systemLang.startsWith(obsidianLang)) {
        // If the system locale is more specific (en-gb vs en), use the system locale.
        momentLocale = systemLang;
    }
    const currentLocale = window.moment.locale(momentLocale);
    console.debug(`[Calendar] Trying to switch Moment.js global locale to ${momentLocale}, got ${currentLocale}`);
    overrideGlobalMomentWeekStart(weekStart);
    return currentLocale;
}

/* src/ui/Calendar.svelte generated by Svelte v3.37.0 */

function create_fragment$b(ctx) {
	let calendarbase;
	let updating_displayedMonth;
	let current;

	function calendarbase_displayedMonth_binding(value) {
		/*calendarbase_displayedMonth_binding*/ ctx[8](value);
	}

	let calendarbase_props = {
		plugin: /*plugin*/ ctx[1],
		sources: /*$sources*/ ctx[5],
		getSourceSettings: settings.getSourceSettings,
		today: /*today*/ ctx[4],
		eventHandlers: /*eventHandlers*/ ctx[2],
		localeData: /*today*/ ctx[4].localeData(),
		selectedId: /*$activeFile*/ ctx[6],
		showWeekNums: /*$settings*/ ctx[3].showWeeklyNote
	};

	if (/*displayedMonth*/ ctx[0] !== void 0) {
		calendarbase_props.displayedMonth = /*displayedMonth*/ ctx[0];
	}

	calendarbase = new Calendar$1({ props: calendarbase_props });
	binding_callbacks$1.push(() => bind$1(calendarbase, "displayedMonth", calendarbase_displayedMonth_binding));

	return {
		c() {
			create_component$1(calendarbase.$$.fragment);
		},
		m(target, anchor) {
			mount_component$1(calendarbase, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const calendarbase_changes = {};
			if (dirty & /*plugin*/ 2) calendarbase_changes.plugin = /*plugin*/ ctx[1];
			if (dirty & /*$sources*/ 32) calendarbase_changes.sources = /*$sources*/ ctx[5];
			if (dirty & /*today*/ 16) calendarbase_changes.today = /*today*/ ctx[4];
			if (dirty & /*eventHandlers*/ 4) calendarbase_changes.eventHandlers = /*eventHandlers*/ ctx[2];
			if (dirty & /*today*/ 16) calendarbase_changes.localeData = /*today*/ ctx[4].localeData();
			if (dirty & /*$activeFile*/ 64) calendarbase_changes.selectedId = /*$activeFile*/ ctx[6];
			if (dirty & /*$settings*/ 8) calendarbase_changes.showWeekNums = /*$settings*/ ctx[3].showWeeklyNote;

			if (!updating_displayedMonth && dirty & /*displayedMonth*/ 1) {
				updating_displayedMonth = true;
				calendarbase_changes.displayedMonth = /*displayedMonth*/ ctx[0];
				add_flush_callback$1(() => updating_displayedMonth = false);
			}

			calendarbase.$set(calendarbase_changes);
		},
		i(local) {
			if (current) return;
			transition_in$1(calendarbase.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out$1(calendarbase.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component$1(calendarbase, detaching);
		}
	};
}

function instance$a($$self, $$props, $$invalidate) {
	let $settings;
	let $sources;
	let $activeFile;
	component_subscribe$1($$self, settings, $$value => $$invalidate(3, $settings = $$value));
	component_subscribe$1($$self, sources, $$value => $$invalidate(5, $sources = $$value));
	component_subscribe$1($$self, activeFile, $$value => $$invalidate(6, $activeFile = $$value));
	
	
	
	let today;
	let { plugin } = $$props;
	let { displayedMonth = today } = $$props;
	let { eventHandlers } = $$props;

	function tick() {
		$$invalidate(4, today = window.moment());
	}

	function getToday(settings) {
		configureGlobalMomentLocale(settings.localeOverride, settings.weekStart);
		return window.moment();
	}

	// 1 minute heartbeat to keep `today` reflecting the current day
	let heartbeat = setInterval(
		() => {
			tick();
			const isViewingCurrentMonth = displayedMonth.isSame(today, "day");

			if (isViewingCurrentMonth) {
				// if it's midnight on the last day of the month, this will
				// update the display to show the new month.
				$$invalidate(0, displayedMonth = today);
			}
		},
		1000 * 60
	);

	onDestroy$1(() => {
		clearInterval(heartbeat);
	});

	function calendarbase_displayedMonth_binding(value) {
		displayedMonth = value;
		$$invalidate(0, displayedMonth);
	}

	$$self.$$set = $$props => {
		if ("plugin" in $$props) $$invalidate(1, plugin = $$props.plugin);
		if ("displayedMonth" in $$props) $$invalidate(0, displayedMonth = $$props.displayedMonth);
		if ("eventHandlers" in $$props) $$invalidate(2, eventHandlers = $$props.eventHandlers);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$settings*/ 8) {
			$$invalidate(4, today = getToday($settings));
		}
	};

	return [
		displayedMonth,
		plugin,
		eventHandlers,
		$settings,
		today,
		$sources,
		$activeFile,
		tick,
		calendarbase_displayedMonth_binding
	];
}

class Calendar extends SvelteComponent$1 {
	constructor(options) {
		super();

		init$1(this, options, instance$a, create_fragment$b, safe_not_equal$1, {
			plugin: 1,
			displayedMonth: 0,
			eventHandlers: 2,
			tick: 7
		});
	}

	get tick() {
		return this.$$.ctx[7];
	}
}

function showFileMenu(app, file, position) {
    const fileMenu = new obsidian.Menu(app);
    fileMenu.addItem((item) => item
        .setTitle("Delete")
        .setIcon("trash")
        .onClick(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        app.fileManager.promptForFileDeletion(file);
    }));
    app.workspace.trigger("file-menu", fileMenu, file, "calendar-context-menu", null);
    fileMenu.showAtPosition(position);
}

const emptyDot = () => ({ isFilled: false });
const emptyDots = (numDots) => numDots ? [...Array(numDots).keys()].map(emptyDot) : [];
const filledDot = () => ({ isFilled: true });
const filledDots = (numDots) => numDots ? [...Array(numDots).keys()].map(filledDot) : [];

function getNumBacklinks(note) {
    if (!note) {
        return 0;
    }
    return Object.values(window.app.metadataCache.resolvedLinks).reduce((acc, links) => acc + (links[note.path] || 0), 0);
}
const backlinksSource = {
    id: "backlinks",
    name: "Backlinks",
    getMetadata: async (_granularity, _date, file) => {
        const numBacklinks = getNumBacklinks(file);
        return {
            dots: filledDots(numBacklinks),
            value: numBacklinks,
        };
    },
    defaultSettings: Object.freeze({
        color: "#5e81ac",
        display: "menu",
    }),
};

function getNoteTags(note) {
    if (!note) {
        return [];
    }
    const allTags = [];
    const { metadataCache } = window.app;
    const { frontmatter, tags } = metadataCache.getFileCache(note) || {};
    if (frontmatter) {
        const frontmatterTags = obsidian.parseFrontMatterTags(frontmatter) || [];
        allTags.push(...frontmatterTags);
    }
    if (tags) {
        const nonfrontmatterTags = tags.map((tagCache) => tagCache.tag);
        allTags.push(...nonfrontmatterTags);
    }
    // strip the '#' at the beginning
    return allTags.map((tag) => tag.substring(1));
}
function getEmojiTag(note) {
    const tags = getNoteTags(note);
    const [emojiTags] = partition(tags, (tag) => /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/.test(tag));
    return emojiTags[0];
}
const emojiTagsSource = {
    id: "emoji-tags",
    name: "Emoji Tags",
    description: "Show tags containing emojis directly on the calendar face",
    getMetadata: async (_granularity, _date, file) => {
        return {
            attrs: {
                "data-emoji-tag": getEmojiTag(file),
            },
            dots: [],
            value: undefined,
        };
    },
    defaultSettings: {
        display: "none",
    },
};

function getNumLinks(note) {
    var _a, _b;
    if (!note) {
        return 0;
    }
    return ((_b = (_a = window.app.metadataCache.getCache(note.path)) === null || _a === void 0 ? void 0 : _a.links) === null || _b === void 0 ? void 0 : _b.length) || 0;
}
const linksSource = {
    id: "links",
    name: "Links",
    getMetadata: async (_granularity, _date, file) => {
        const numLinks = getNumLinks(file);
        return {
            dots: filledDots(numLinks),
            value: numLinks,
        };
    },
    defaultSettings: Object.freeze({
        color: "#a3be8c",
        display: "menu",
    }),
};

const TASK_SOURCE_ID = "tasks";
async function getNumberOfTasks(note) {
    if (!note) {
        return [0, 0];
    }
    const { vault } = window.app;
    const fileContents = await vault.cachedRead(note);
    return [
        (fileContents.match(/(-|\*) \[ \] /g) || []).length,
        (fileContents.match(/(-|\*) \[x\] /gi) || []).length,
    ];
}
const tasksSource = {
    id: TASK_SOURCE_ID,
    name: "Tasks",
    description: "Track your pending tasks for any given day",
    getMetadata: async (_granularity, _date, file) => {
        const [numRemainingTasks, numCompletedTasks] = await getNumberOfTasks(file);
        const totalTasks = numRemainingTasks + numCompletedTasks;
        const sourceSettings = get_store_value$1(settings).sourceSettings[TASK_SOURCE_ID];
        const maxDots = (sourceSettings === null || sourceSettings === void 0 ? void 0 : sourceSettings.maxIncompleteTaskDots) || 1;
        const numDots = Math.min(numRemainingTasks, maxDots);
        return {
            dots: emptyDots(numDots),
            value: numCompletedTasks,
            goal: totalTasks,
        };
    },
    defaultSettings: Object.freeze({
        color: "#d08770",
        display: "calendar-and-menu",
        maxIncompleteTaskDots: 1,
    }),
    registerSettings: (containerEl, sourceSettings, saveSettings) => {
        new obsidian.Setting(containerEl)
            .setName("Max incomplete tasks shown")
            .setDesc("Limit the number of dots shown for incomplete tasks")
            .addSlider((slider) => slider
            .setLimits(1, 5, 1)
            .setDynamicTooltip()
            .setValue((sourceSettings === null || sourceSettings === void 0 ? void 0 : sourceSettings.maxIncompleteTaskDots) || 1)
            .onChange((maxIncompleteTaskDots) => {
            saveSettings({ maxIncompleteTaskDots });
        }));
    },
};

async function getFileWordCount(note) {
    if (!note) {
        return 0;
    }
    const fileContents = await window.app.vault.cachedRead(note);
    return getWordCount(fileContents);
}
const wordCountSource = {
    id: "wordCount",
    name: "Words",
    description: "Visualize the word count of your daily note.",
    getMetadata: async (_granularity, _date, file) => {
        const wordsPerDot = settings.getSourceSettings("wordCount").wordsPerDot;
        const wordCount = await getFileWordCount(file);
        const numDots = Math.floor(wordCount / wordsPerDot);
        const dots = filledDots(numDots);
        if (file && !numDots) {
            dots.push(emptyDot());
        }
        return {
            dots,
            value: wordCount,
        };
    },
    defaultSettings: Object.freeze({
        color: "#ebcb8b",
        display: "calendar-and-menu",
        wordsPerDot: 250,
    }),
    registerSettings: (containerEl, sourceSettings, saveSettings) => {
        new obsidian.Setting(containerEl)
            .setName("Words per dot")
            .setDesc("How many words should be represented by a single dot?")
            .addText((textfield) => {
            textfield.inputEl.type = "number";
            textfield.setValue(String(sourceSettings.wordsPerDot));
            textfield.onChange((val) => {
                saveSettings({ wordsPerDot: Number(val) });
            });
        });
    },
};

function getNumZettels(granularity, date) {
    if (granularity !== "day") {
        return 0;
    }
    const zettelPrefix = date.format("YYYYMMDD");
    return window.app.vault
        .getMarkdownFiles()
        .filter((file) => file.name.startsWith(zettelPrefix)).length;
}
const zettelsSource = {
    id: "zettels",
    name: "Zettels",
    description: "Show how many notes use a Zettelkasten prefix matching the current day",
    getMetadata: async (granularity, date, _file) => {
        const numZettels = getNumZettels(granularity, date);
        return {
            dots: filledDots(numZettels),
            value: numZettels,
        };
    },
    defaultSettings: Object.freeze({
        color: "#b48ead",
        display: "calendar-and-menu",
    }),
};

class CalendarView extends obsidian.ItemView {
    constructor(leaf) {
        super(leaf);
        this.onNoteSettingsUpdate = this.onNoteSettingsUpdate.bind(this);
        this.onFileOpen = this.onFileOpen.bind(this);
        this.openOrCreatePeriodicNote = this.openOrCreatePeriodicNote.bind(this);
        this.onHover = this.onHover.bind(this);
        this.onContextMenu = this.onContextMenu.bind(this);
        this.registerEvent(this.app.workspace.on("file-open", this.onFileOpen));
        this.settings = null;
        settings.subscribe((val) => {
            this.settings = val;
        });
    }
    getViewType() {
        return VIEW_TYPE_CALENDAR;
    }
    getDisplayText() {
        return "Calendar";
    }
    getIcon() {
        return "calendar-with-checkmark";
    }
    onClose() {
        if (this.calendar) {
            this.calendar.$destroy();
        }
        return Promise.resolve();
    }
    async onOpen() {
        // Integration point: external plugins can listen for `calendar:open`
        // to feed in additional sources.
        const baseSources = [
            wordCountSource,
            tasksSource,
            linksSource,
            backlinksSource,
            zettelsSource,
            emojiTagsSource,
        ];
        // TODO move this into a writable. subscribe the settings component
        // to the writable
        this.app.workspace.trigger(TRIGGER_ON_OPEN, baseSources);
        baseSources.forEach(sources.registerSource);
        this.calendar = new Calendar({
            target: this.contentEl,
            props: {
                plugin: this,
                eventHandlers: {
                    onClick: this.openOrCreatePeriodicNote,
                    onHover: this.onHover,
                    onContextMenu: this.onContextMenu,
                },
            },
        });
    }
    onHover(granularity, date, file, targetEl, isMetaPressed) {
        if (!isMetaPressed) {
            return;
        }
        const { format } = getPeriodicNoteSettings_1(granularity);
        this.app.workspace.trigger("link-hover", this, targetEl, date.format(format), file === null || file === void 0 ? void 0 : file.path);
    }
    onContextMenu(_granularity, _date, file, event) {
        if (!file) {
            // If no file exists for a given day, show nothing.
            return;
        }
        showFileMenu(this.app, file, {
            x: event.pageX,
            y: event.pageY,
        });
    }
    async openOrCreatePeriodicNote(granularity, date, existingFile, inNewSplit) {
        const { workspace } = this.app;
        if (!existingFile) {
            // File doesn't exist
            tryToCreatePeriodicNote(granularity, date, inNewSplit, this.settings, (dailyNote) => {
                activeFile.setFile(dailyNote);
            });
            return;
        }
        const leaf = inNewSplit
            ? workspace.splitActiveLeaf()
            : workspace.getUnpinnedLeaf();
        await leaf.openFile(existingFile);
        activeFile.setFile(existingFile);
    }
    onNoteSettingsUpdate() {
        this.updateActiveFile();
    }
    onFileOpen(_file) {
        if (this.app.workspace.layoutReady) {
            this.updateActiveFile();
        }
    }
    updateActiveFile() {
        const { view } = this.app.workspace.activeLeaf;
        let file = null;
        if (view instanceof obsidian.FileView) {
            file = view.file;
        }
        activeFile.setFile(file);
    }
    revealActiveNote() {
        const { activeLeaf } = this.app.workspace;
        if (activeLeaf.view instanceof obsidian.FileView) {
            for (const granularity of ["day", "week", "month"]) {
                const date = getDateFromFile_1$1(activeLeaf.view.file, granularity);
                if (date) {
                    this.calendar.$set({ displayedMonth: date });
                    return;
                }
            }
        }
    }
}

/* src/ui/settings/Footer.svelte generated by Svelte v3.37.0 */

function add_css$5() {
	var style = element$1("style");
	style.id = "svelte-1kza10w-style";
	style.textContent = ".footer.svelte-1kza10w{align-items:center;border-top:1px solid var(--background-modifier-border);display:flex;gap:16px;justify-content:center;margin-top:24px;padding:16px 0;width:100%}.footer-description.svelte-1kza10w{color:var(--text-muted);font-size:0.8em;font-style:italic}";
	append$1(document.head, style);
}

function create_fragment$a(ctx) {
	let div1;

	return {
		c() {
			div1 = element$1("div");

			div1.innerHTML = `<div class="footer-description svelte-1kza10w">made by Liam Cain</div> 
  <a href="https://www.buymeacoffee.com/liamcain"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-violet.png" alt="BuyMeACoffee" width="100"/></a>`;

			attr$1(div1, "class", "footer svelte-1kza10w");
		},
		m(target, anchor) {
			insert$1(target, div1, anchor);
		},
		p: noop$1,
		i: noop$1,
		o: noop$1,
		d(detaching) {
			if (detaching) detach$1(div1);
		}
	};
}

class Footer extends SvelteComponent$1 {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-1kza10w-style")) add_css$5();
		init$1(this, options, null, create_fragment$a, safe_not_equal$1, {});
	}
}

/* src/ui/settings/SettingItem.svelte generated by Svelte v3.37.0 */

const get_control_slot_changes = dirty => ({});
const get_control_slot_context = ctx => ({});

// (18:4) {#if description}
function create_if_block$1(ctx) {
	let div;
	let t;

	return {
		c() {
			div = element$1("div");
			t = text$1(/*description*/ ctx[1]);
			attr$1(div, "class", "setting-item-description");
		},
		m(target, anchor) {
			insert$1(target, div, anchor);
			append$1(div, t);
		},
		p(ctx, dirty) {
			if (dirty & /*description*/ 2) set_data$1(t, /*description*/ ctx[1]);
		},
		d(detaching) {
			if (detaching) detach$1(div);
		}
	};
}

function create_fragment$9(ctx) {
	let div4;
	let div2;
	let div1;
	let div0;
	let t0;
	let t1;
	let t2;
	let div3;
	let current;
	let if_block = /*description*/ ctx[1] && create_if_block$1(ctx);
	const control_slot_template = /*#slots*/ ctx[5].control;
	const control_slot = create_slot$1(control_slot_template, ctx, /*$$scope*/ ctx[4], get_control_slot_context);

	return {
		c() {
			div4 = element$1("div");
			div2 = element$1("div");
			div1 = element$1("div");
			div0 = element$1("div");
			t0 = text$1(/*name*/ ctx[0]);
			t1 = space$1();
			if (if_block) if_block.c();
			t2 = space$1();
			div3 = element$1("div");
			if (control_slot) control_slot.c();
			attr$1(div1, "class", "setting-item-name");
			attr$1(div2, "class", "setting-item-info");
			attr$1(div3, "class", "setting-item-control");
			attr$1(div4, "class", "setting-item");
			toggle_class$1(div4, "setting-item-heading", /*isHeading*/ ctx[2]);
			toggle_class$1(div4, "mod-dropdown", /*type*/ ctx[3] === "dropdown");
		},
		m(target, anchor) {
			insert$1(target, div4, anchor);
			append$1(div4, div2);
			append$1(div2, div1);
			append$1(div1, div0);
			append$1(div0, t0);
			append$1(div2, t1);
			if (if_block) if_block.m(div2, null);
			append$1(div4, t2);
			append$1(div4, div3);

			if (control_slot) {
				control_slot.m(div3, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (!current || dirty & /*name*/ 1) set_data$1(t0, /*name*/ ctx[0]);

			if (/*description*/ ctx[1]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$1(ctx);
					if_block.c();
					if_block.m(div2, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (control_slot) {
				if (control_slot.p && dirty & /*$$scope*/ 16) {
					update_slot$1(control_slot, control_slot_template, ctx, /*$$scope*/ ctx[4], dirty, get_control_slot_changes, get_control_slot_context);
				}
			}

			if (dirty & /*isHeading*/ 4) {
				toggle_class$1(div4, "setting-item-heading", /*isHeading*/ ctx[2]);
			}

			if (dirty & /*type*/ 8) {
				toggle_class$1(div4, "mod-dropdown", /*type*/ ctx[3] === "dropdown");
			}
		},
		i(local) {
			if (current) return;
			transition_in$1(control_slot, local);
			current = true;
		},
		o(local) {
			transition_out$1(control_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach$1(div4);
			if (if_block) if_block.d();
			if (control_slot) control_slot.d(detaching);
		}
	};
}

function instance$9($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	let { name } = $$props;
	let { description } = $$props;
	let { isHeading } = $$props;
	let { type } = $$props;

	$$self.$$set = $$props => {
		if ("name" in $$props) $$invalidate(0, name = $$props.name);
		if ("description" in $$props) $$invalidate(1, description = $$props.description);
		if ("isHeading" in $$props) $$invalidate(2, isHeading = $$props.isHeading);
		if ("type" in $$props) $$invalidate(3, type = $$props.type);
		if ("$$scope" in $$props) $$invalidate(4, $$scope = $$props.$$scope);
	};

	return [name, description, isHeading, type, $$scope, slots];
}

class SettingItem extends SvelteComponent$1 {
	constructor(options) {
		super();

		init$1(this, options, instance$9, create_fragment$9, safe_not_equal$1, {
			name: 0,
			description: 1,
			isHeading: 2,
			type: 3
		});
	}
}

// external events
const FINALIZE_EVENT_NAME = "finalize";
const CONSIDER_EVENT_NAME = "consider";

/**
 * @typedef {Object} Info
 * @property {string} trigger
 * @property {string} id
 * @property {string} source
 * @param {Node} el
 * @param {Array} items
 * @param {Info} info
 */
function dispatchFinalizeEvent(el, items, info) {
    el.dispatchEvent(
        new CustomEvent(FINALIZE_EVENT_NAME, {
            detail: {items, info}
        })
    );
}

/**
 * Dispatches a consider event
 * @param {Node} el
 * @param {Array} items
 * @param {Info} info
 */
function dispatchConsiderEvent(el, items, info) {
    el.dispatchEvent(
        new CustomEvent(CONSIDER_EVENT_NAME, {
            detail: {items, info}
        })
    );
}

// internal events
const DRAGGED_ENTERED_EVENT_NAME = "draggedEntered";
const DRAGGED_LEFT_EVENT_NAME = "draggedLeft";
const DRAGGED_OVER_INDEX_EVENT_NAME = "draggedOverIndex";
const DRAGGED_LEFT_DOCUMENT_EVENT_NAME = "draggedLeftDocument";

const DRAGGED_LEFT_TYPES = {
    LEFT_FOR_ANOTHER: "leftForAnother",
    OUTSIDE_OF_ANY: "outsideOfAny"
};

function dispatchDraggedElementEnteredContainer(containerEl, indexObj, draggedEl) {
    containerEl.dispatchEvent(
        new CustomEvent(DRAGGED_ENTERED_EVENT_NAME, {
            detail: {indexObj, draggedEl}
        })
    );
}

/**
 * @param containerEl - the dropzone the element left
 * @param draggedEl - the dragged element
 * @param theOtherDz - the new dropzone the element entered
 */
function dispatchDraggedElementLeftContainerForAnother(containerEl, draggedEl, theOtherDz) {
    containerEl.dispatchEvent(
        new CustomEvent(DRAGGED_LEFT_EVENT_NAME, {
            detail: {draggedEl, type: DRAGGED_LEFT_TYPES.LEFT_FOR_ANOTHER, theOtherDz}
        })
    );
}

function dispatchDraggedElementLeftContainerForNone(containerEl, draggedEl) {
    containerEl.dispatchEvent(
        new CustomEvent(DRAGGED_LEFT_EVENT_NAME, {
            detail: {draggedEl, type: DRAGGED_LEFT_TYPES.OUTSIDE_OF_ANY}
        })
    );
}
function dispatchDraggedElementIsOverIndex(containerEl, indexObj, draggedEl) {
    containerEl.dispatchEvent(
        new CustomEvent(DRAGGED_OVER_INDEX_EVENT_NAME, {
            detail: {indexObj, draggedEl}
        })
    );
}
function dispatchDraggedLeftDocument(draggedEl) {
    window.dispatchEvent(
        new CustomEvent(DRAGGED_LEFT_DOCUMENT_EVENT_NAME, {
            detail: {draggedEl}
        })
    );
}

const TRIGGERS = {
    DRAG_STARTED: "dragStarted",
    DRAGGED_ENTERED: DRAGGED_ENTERED_EVENT_NAME,
    DRAGGED_ENTERED_ANOTHER: "dragEnteredAnother",
    DRAGGED_OVER_INDEX: DRAGGED_OVER_INDEX_EVENT_NAME,
    DRAGGED_LEFT: DRAGGED_LEFT_EVENT_NAME,
    DRAGGED_LEFT_ALL: "draggedLeftAll",
    DROPPED_INTO_ZONE: "droppedIntoZone",
    DROPPED_INTO_ANOTHER: "droppedIntoAnother",
    DROPPED_OUTSIDE_OF_ANY: "droppedOutsideOfAny",
    DRAG_STOPPED: "dragStopped"
};

const SOURCES = {
    POINTER: "pointer",
    KEYBOARD: "keyboard"
};

const SHADOW_ITEM_MARKER_PROPERTY_NAME = "isDndShadowItem";
const SHADOW_ELEMENT_ATTRIBUTE_NAME = "data-is-dnd-shadow-item";
const SHADOW_PLACEHOLDER_ITEM_ID = "id:dnd-shadow-placeholder-0000";
const DRAGGED_ELEMENT_ID = "dnd-action-dragged-el";

let ITEM_ID_KEY = "id";
let activeDndZoneCount = 0;
function incrementActiveDropZoneCount() {
    activeDndZoneCount++;
}
function decrementActiveDropZoneCount() {
    if (activeDndZoneCount === 0) {
        throw new Error("Bug! trying to decrement when there are no dropzones");
    }
    activeDndZoneCount--;
}

const isOnServer = typeof window === "undefined";

// This is based off https://stackoverflow.com/questions/27745438/how-to-compute-getboundingclientrect-without-considering-transforms/57876601#57876601
// It removes the transforms that are potentially applied by the flip animations
/**
 * Gets the bounding rect but removes transforms (ex: flip animation)
 * @param {HTMLElement} el
 * @return {{top: number, left: number, bottom: number, right: number}}
 */
function getBoundingRectNoTransforms(el) {
    let ta;
    const rect = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    const tx = style.transform;

    if (tx) {
        let sx, sy, dx, dy;
        if (tx.startsWith("matrix3d(")) {
            ta = tx.slice(9, -1).split(/, /);
            sx = +ta[0];
            sy = +ta[5];
            dx = +ta[12];
            dy = +ta[13];
        } else if (tx.startsWith("matrix(")) {
            ta = tx.slice(7, -1).split(/, /);
            sx = +ta[0];
            sy = +ta[3];
            dx = +ta[4];
            dy = +ta[5];
        } else {
            return rect;
        }

        const to = style.transformOrigin;
        const x = rect.x - dx - (1 - sx) * parseFloat(to);
        const y = rect.y - dy - (1 - sy) * parseFloat(to.slice(to.indexOf(" ") + 1));
        const w = sx ? rect.width / sx : el.offsetWidth;
        const h = sy ? rect.height / sy : el.offsetHeight;
        return {
            x: x,
            y: y,
            width: w,
            height: h,
            top: y,
            right: x + w,
            bottom: y + h,
            left: x
        };
    } else {
        return rect;
    }
}

/**
 * Gets the absolute bounding rect (accounts for the window's scroll position and removes transforms)
 * @param {HTMLElement} el
 * @return {{top: number, left: number, bottom: number, right: number}}
 */
function getAbsoluteRectNoTransforms(el) {
    const rect = getBoundingRectNoTransforms(el);
    return {
        top: rect.top + window.scrollY,
        bottom: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        right: rect.right + window.scrollX
    };
}

/**
 * Gets the absolute bounding rect (accounts for the window's scroll position)
 * @param {HTMLElement} el
 * @return {{top: number, left: number, bottom: number, right: number}}
 */
function getAbsoluteRect(el) {
    const rect = el.getBoundingClientRect();
    return {
        top: rect.top + window.scrollY,
        bottom: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        right: rect.right + window.scrollX
    };
}

/**
 * finds the center :)
 * @typedef {Object} Rect
 * @property {number} top
 * @property {number} bottom
 * @property {number} left
 * @property {number} right
 * @param {Rect} rect
 * @return {{x: number, y: number}}
 */
function findCenter(rect) {
    return {
        x: (rect.left + rect.right) / 2,
        y: (rect.top + rect.bottom) / 2
    };
}

/**
 * @typedef {Object} Point
 * @property {number} x
 * @property {number} y
 * @param {Point} pointA
 * @param {Point} pointB
 * @return {number}
 */
function calcDistance(pointA, pointB) {
    return Math.sqrt(Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2));
}

/**
 * @param {Point} point
 * @param {Rect} rect
 * @return {boolean|boolean}
 */
function isPointInsideRect(point, rect) {
    return point.y <= rect.bottom && point.y >= rect.top && point.x >= rect.left && point.x <= rect.right;
}

/**
 * find the absolute coordinates of the center of a dom element
 * @param el {HTMLElement}
 * @returns {{x: number, y: number}}
 */
function findCenterOfElement(el) {
    return findCenter(getAbsoluteRect(el));
}

/**
 * @param {HTMLElement} elA
 * @param {HTMLElement} elB
 * @return {boolean}
 */
function isCenterOfAInsideB(elA, elB) {
    const centerOfA = findCenterOfElement(elA);
    const rectOfB = getAbsoluteRectNoTransforms(elB);
    return isPointInsideRect(centerOfA, rectOfB);
}

/**
 * @param {HTMLElement|ChildNode} elA
 * @param {HTMLElement|ChildNode} elB
 * @return {number}
 */
function calcDistanceBetweenCenters(elA, elB) {
    const centerOfA = findCenterOfElement(elA);
    const centerOfB = findCenterOfElement(elB);
    return calcDistance(centerOfA, centerOfB);
}

/**
 * @param {HTMLElement} el - the element to check
 * @returns {boolean} - true if the element in its entirety is off screen including the scrollable area (the normal dom events look at the mouse rather than the element)
 */
function isElementOffDocument(el) {
    const rect = getAbsoluteRect(el);
    return rect.right < 0 || rect.left > document.documentElement.scrollWidth || rect.bottom < 0 || rect.top > document.documentElement.scrollHeight;
}

/**
 * If the point is inside the element returns its distances from the sides, otherwise returns null
 * @param {Point} point
 * @param {HTMLElement} el
 * @return {null|{top: number, left: number, bottom: number, right: number}}
 */
function calcInnerDistancesBetweenPointAndSidesOfElement(point, el) {
    const rect = getAbsoluteRect(el);
    if (!isPointInsideRect(point, rect)) {
        return null;
    }
    return {
        top: point.y - rect.top,
        bottom: rect.bottom - point.y,
        left: point.x - rect.left,
        // TODO - figure out what is so special about right (why the rect is too big)
        right: Math.min(rect.right, document.documentElement.clientWidth) - point.x
    };
}

let dzToShadowIndexToRect;

/**
 * Resets the cache that allows for smarter "would be index" resolution. Should be called after every drag operation
 */
function resetIndexesCache() {
    dzToShadowIndexToRect = new Map();
}
resetIndexesCache();

/**
 * Caches the coordinates of the shadow element when it's in a certain index in a certain dropzone.
 * Helpful in order to determine "would be index" more effectively
 * @param {HTMLElement} dz
 * @return {number} - the shadow element index
 */
function cacheShadowRect(dz) {
    const shadowElIndex = Array.from(dz.children).findIndex(child => child.getAttribute(SHADOW_ELEMENT_ATTRIBUTE_NAME));
    if (shadowElIndex >= 0) {
        if (!dzToShadowIndexToRect.has(dz)) {
            dzToShadowIndexToRect.set(dz, new Map());
        }
        dzToShadowIndexToRect.get(dz).set(shadowElIndex, getAbsoluteRectNoTransforms(dz.children[shadowElIndex]));
        return shadowElIndex;
    }
    return undefined;
}

/**
 * @typedef {Object} Index
 * @property {number} index - the would be index
 * @property {boolean} isProximityBased - false if the element is actually over the index, true if it is not over it but this index is the closest
 */
/**
 * Find the index for the dragged element in the list it is dragged over
 * @param {HTMLElement} floatingAboveEl
 * @param {HTMLElement} collectionBelowEl
 * @returns {Index|null} -  if the element is over the container the Index object otherwise null
 */
function findWouldBeIndex(floatingAboveEl, collectionBelowEl) {
    if (!isCenterOfAInsideB(floatingAboveEl, collectionBelowEl)) {
        return null;
    }
    const children = collectionBelowEl.children;
    // the container is empty, floating element should be the first
    if (children.length === 0) {
        return {index: 0, isProximityBased: true};
    }
    const shadowElIndex = cacheShadowRect(collectionBelowEl);

    // the search could be more efficient but keeping it simple for now
    // a possible improvement: pass in the lastIndex it was found in and check there first, then expand from there
    for (let i = 0; i < children.length; i++) {
        if (isCenterOfAInsideB(floatingAboveEl, children[i])) {
            const cachedShadowRect = dzToShadowIndexToRect.has(collectionBelowEl) && dzToShadowIndexToRect.get(collectionBelowEl).get(i);
            if (cachedShadowRect) {
                if (!isPointInsideRect(findCenterOfElement(floatingAboveEl), cachedShadowRect)) {
                    return {index: shadowElIndex, isProximityBased: false};
                }
            }
            return {index: i, isProximityBased: false};
        }
    }
    // this can happen if there is space around the children so the floating element has
    //entered the container but not any of the children, in this case we will find the nearest child
    let minDistanceSoFar = Number.MAX_VALUE;
    let indexOfMin = undefined;
    // we are checking all of them because we don't know whether we are dealing with a horizontal or vertical container and where the floating element entered from
    for (let i = 0; i < children.length; i++) {
        const distance = calcDistanceBetweenCenters(floatingAboveEl, children[i]);
        if (distance < minDistanceSoFar) {
            minDistanceSoFar = distance;
            indexOfMin = i;
        }
    }
    return {index: indexOfMin, isProximityBased: true};
}

const SCROLL_ZONE_PX = 25;

function makeScroller() {
    let scrollingInfo;
    function resetScrolling() {
        scrollingInfo = {directionObj: undefined, stepPx: 0};
    }
    resetScrolling();
    // directionObj {x: 0|1|-1, y:0|1|-1} - 1 means down in y and right in x
    function scrollContainer(containerEl) {
        const {directionObj, stepPx} = scrollingInfo;
        if (directionObj) {
            containerEl.scrollBy(directionObj.x * stepPx, directionObj.y * stepPx);
            window.requestAnimationFrame(() => scrollContainer(containerEl));
        }
    }
    function calcScrollStepPx(distancePx) {
        return SCROLL_ZONE_PX - distancePx;
    }

    /**
     * If the pointer is next to the sides of the element to scroll, will trigger scrolling
     * Can be called repeatedly with updated pointer and elementToScroll values without issues
     * @return {boolean} - true if scrolling was needed
     */
    function scrollIfNeeded(pointer, elementToScroll) {
        if (!elementToScroll) {
            return false;
        }
        const distances = calcInnerDistancesBetweenPointAndSidesOfElement(pointer, elementToScroll);
        if (distances === null) {
            resetScrolling();
            return false;
        }
        const isAlreadyScrolling = !!scrollingInfo.directionObj;
        let [scrollingVertically, scrollingHorizontally] = [false, false];
        // vertical
        if (elementToScroll.scrollHeight > elementToScroll.clientHeight) {
            if (distances.bottom < SCROLL_ZONE_PX) {
                scrollingVertically = true;
                scrollingInfo.directionObj = {x: 0, y: 1};
                scrollingInfo.stepPx = calcScrollStepPx(distances.bottom);
            } else if (distances.top < SCROLL_ZONE_PX) {
                scrollingVertically = true;
                scrollingInfo.directionObj = {x: 0, y: -1};
                scrollingInfo.stepPx = calcScrollStepPx(distances.top);
            }
            if (!isAlreadyScrolling && scrollingVertically) {
                scrollContainer(elementToScroll);
                return true;
            }
        }
        // horizontal
        if (elementToScroll.scrollWidth > elementToScroll.clientWidth) {
            if (distances.right < SCROLL_ZONE_PX) {
                scrollingHorizontally = true;
                scrollingInfo.directionObj = {x: 1, y: 0};
                scrollingInfo.stepPx = calcScrollStepPx(distances.right);
            } else if (distances.left < SCROLL_ZONE_PX) {
                scrollingHorizontally = true;
                scrollingInfo.directionObj = {x: -1, y: 0};
                scrollingInfo.stepPx = calcScrollStepPx(distances.left);
            }
            if (!isAlreadyScrolling && scrollingHorizontally) {
                scrollContainer(elementToScroll);
                return true;
            }
        }
        resetScrolling();
        return false;
    }

    return {
        scrollIfNeeded,
        resetScrolling
    };
}

/**
 * @param {Object} object
 * @return {string}
 */
function toString(object) {
    return JSON.stringify(object, null, 2);
}

/**
 * Finds the depth of the given node in the DOM tree
 * @param {HTMLElement} node
 * @return {number} - the depth of the node
 */
function getDepth(node) {
    if (!node) {
        throw new Error("cannot get depth of a falsy node");
    }
    return _getDepth(node, 0);
}
function _getDepth(node, countSoFar = 0) {
    if (!node.parentElement) {
        return countSoFar - 1;
    }
    return _getDepth(node.parentElement, countSoFar + 1);
}

/**
 * A simple util to shallow compare objects quickly, it doesn't validate the arguments so pass objects in
 * @param {Object} objA
 * @param {Object} objB
 * @return {boolean} - true if objA and objB are shallow equal
 */
function areObjectsShallowEqual(objA, objB) {
    if (Object.keys(objA).length !== Object.keys(objB).length) {
        return false;
    }
    for (const keyA in objA) {
        if (!{}.hasOwnProperty.call(objB, keyA) || objB[keyA] !== objA[keyA]) {
            return false;
        }
    }
    return true;
}

/**
 * Shallow compares two arrays
 * @param arrA
 * @param arrB
 * @return {boolean} - whether the arrays are shallow equal
 */
function areArraysShallowEqualSameOrder(arrA, arrB) {
    if (arrA.length !== arrB.length) {
        return false;
    }
    for (let i = 0; i < arrA.length; i++) {
        if (arrA[i] !== arrB[i]) {
            return false;
        }
    }
    return true;
}

const INTERVAL_MS$1 = 200;
const TOLERANCE_PX = 10;
const {scrollIfNeeded: scrollIfNeeded$1, resetScrolling: resetScrolling$1} = makeScroller();
let next$1;

/**
 * Tracks the dragged elements and performs the side effects when it is dragged over a drop zone (basically dispatching custom-events scrolling)
 * @param {Set<HTMLElement>} dropZones
 * @param {HTMLElement} draggedEl
 * @param {number} [intervalMs = INTERVAL_MS]
 */
function observe(draggedEl, dropZones, intervalMs = INTERVAL_MS$1) {
    // initialization
    let lastDropZoneFound;
    let lastIndexFound;
    let lastIsDraggedInADropZone = false;
    let lastCentrePositionOfDragged;
    // We are sorting to make sure that in case of nested zones of the same type the one "on top" is considered first
    const dropZonesFromDeepToShallow = Array.from(dropZones).sort((dz1, dz2) => getDepth(dz2) - getDepth(dz1));

    /**
     * The main function in this module. Tracks where everything is/ should be a take the actions
     */
    function andNow() {
        const currentCenterOfDragged = findCenterOfElement(draggedEl);
        const scrolled = scrollIfNeeded$1(currentCenterOfDragged, lastDropZoneFound);
        // we only want to make a new decision after the element was moved a bit to prevent flickering
        if (
            !scrolled &&
            lastCentrePositionOfDragged &&
            Math.abs(lastCentrePositionOfDragged.x - currentCenterOfDragged.x) < TOLERANCE_PX &&
            Math.abs(lastCentrePositionOfDragged.y - currentCenterOfDragged.y) < TOLERANCE_PX
        ) {
            next$1 = window.setTimeout(andNow, intervalMs);
            return;
        }
        if (isElementOffDocument(draggedEl)) {
            dispatchDraggedLeftDocument(draggedEl);
            return;
        }

        lastCentrePositionOfDragged = currentCenterOfDragged;
        // this is a simple algorithm, potential improvement: first look at lastDropZoneFound
        let isDraggedInADropZone = false;
        for (const dz of dropZonesFromDeepToShallow) {
            const indexObj = findWouldBeIndex(draggedEl, dz);
            if (indexObj === null) {
                // it is not inside
                continue;
            }
            const {index} = indexObj;
            isDraggedInADropZone = true;
            // the element is over a container
            if (dz !== lastDropZoneFound) {
                lastDropZoneFound && dispatchDraggedElementLeftContainerForAnother(lastDropZoneFound, draggedEl, dz);
                dispatchDraggedElementEnteredContainer(dz, indexObj, draggedEl);
                lastDropZoneFound = dz;
            } else if (index !== lastIndexFound) {
                dispatchDraggedElementIsOverIndex(dz, indexObj, draggedEl);
                lastIndexFound = index;
            }
            // we handle looping with the 'continue' statement above
            break;
        }
        // the first time the dragged element is not in any dropzone we need to notify the last dropzone it was in
        if (!isDraggedInADropZone && lastIsDraggedInADropZone && lastDropZoneFound) {
            dispatchDraggedElementLeftContainerForNone(lastDropZoneFound, draggedEl);
            lastDropZoneFound = undefined;
            lastIndexFound = undefined;
            lastIsDraggedInADropZone = false;
        } else {
            lastIsDraggedInADropZone = true;
        }
        next$1 = window.setTimeout(andNow, intervalMs);
    }
    andNow();
}

// assumption - we can only observe one dragged element at a time, this could be changed in the future
function unobserve() {
    clearTimeout(next$1);
    resetScrolling$1();
    resetIndexesCache();
}

const INTERVAL_MS = 300;
let mousePosition;

/**
 * Do not use this! it is visible for testing only until we get over the issue Cypress not triggering the mousemove listeners
 * // TODO - make private (remove export)
 * @param {{clientX: number, clientY: number}} e
 */
function updateMousePosition(e) {
    const c = e.touches ? e.touches[0] : e;
    mousePosition = {x: c.clientX, y: c.clientY};
}
const {scrollIfNeeded, resetScrolling} = makeScroller();
let next;

function loop() {
    if (mousePosition) {
        scrollIfNeeded(mousePosition, document.documentElement);
    }
    next = window.setTimeout(loop, INTERVAL_MS);
}

/**
 * will start watching the mouse pointer and scroll the window if it goes next to the edges
 */
function armWindowScroller() {
    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("touchmove", updateMousePosition);
    loop();
}

/**
 * will stop watching the mouse pointer and won't scroll the window anymore
 */
function disarmWindowScroller() {
    window.removeEventListener("mousemove", updateMousePosition);
    window.removeEventListener("touchmove", updateMousePosition);
    mousePosition = undefined;
    window.clearTimeout(next);
    resetScrolling();
}

const TRANSITION_DURATION_SECONDS = 0.2;

/**
 * private helper function - creates a transition string for a property
 * @param {string} property
 * @return {string} - the transition string
 */
function trs(property) {
    return `${property} ${TRANSITION_DURATION_SECONDS}s ease`;
}
/**
 * clones the given element and applies proper styles and transitions to the dragged element
 * @param {HTMLElement} originalElement
 * @param {Point} [positionCenterOnXY]
 * @return {Node} - the cloned, styled element
 */
function createDraggedElementFrom(originalElement, positionCenterOnXY) {
    const rect = originalElement.getBoundingClientRect();
    const draggedEl = originalElement.cloneNode(true);
    copyStylesFromTo(originalElement, draggedEl);
    draggedEl.id = DRAGGED_ELEMENT_ID;
    draggedEl.style.position = "fixed";
    let elTopPx = rect.top;
    let elLeftPx = rect.left;
    draggedEl.style.top = `${elTopPx}px`;
    draggedEl.style.left = `${elLeftPx}px`;
    if (positionCenterOnXY) {
        const center = findCenter(rect);
        elTopPx -= center.y - positionCenterOnXY.y;
        elLeftPx -= center.x - positionCenterOnXY.x;
        window.setTimeout(() => {
            draggedEl.style.top = `${elTopPx}px`;
            draggedEl.style.left = `${elLeftPx}px`;
        }, 0);
    }
    draggedEl.style.margin = "0";
    // we can't have relative or automatic height and width or it will break the illusion
    draggedEl.style.boxSizing = "border-box";
    draggedEl.style.height = `${rect.height}px`;
    draggedEl.style.width = `${rect.width}px`;
    draggedEl.style.transition = `${trs("top")}, ${trs("left")}, ${trs("background-color")}, ${trs("opacity")}, ${trs("color")} `;
    // this is a workaround for a strange browser bug that causes the right border to disappear when all the transitions are added at the same time
    window.setTimeout(() => (draggedEl.style.transition += `, ${trs("width")}, ${trs("height")}`), 0);
    draggedEl.style.zIndex = "9999";
    draggedEl.style.cursor = "grabbing";

    return draggedEl;
}

/**
 * styles the dragged element to a 'dropped' state
 * @param {HTMLElement} draggedEl
 */
function moveDraggedElementToWasDroppedState(draggedEl) {
    draggedEl.style.cursor = "grab";
}

/**
 * Morphs the dragged element style, maintains the mouse pointer within the element
 * @param {HTMLElement} draggedEl
 * @param {HTMLElement} copyFromEl - the element the dragged element should look like, typically the shadow element
 * @param {number} currentMouseX
 * @param {number} currentMouseY
 * @param {function} transformDraggedElement - function to transform the dragged element, does nothing by default.
 */
function morphDraggedElementToBeLike(draggedEl, copyFromEl, currentMouseX, currentMouseY, transformDraggedElement) {
    const newRect = copyFromEl.getBoundingClientRect();
    const draggedElRect = draggedEl.getBoundingClientRect();
    const widthChange = newRect.width - draggedElRect.width;
    const heightChange = newRect.height - draggedElRect.height;
    if (widthChange || heightChange) {
        const relativeDistanceOfMousePointerFromDraggedSides = {
            left: (currentMouseX - draggedElRect.left) / draggedElRect.width,
            top: (currentMouseY - draggedElRect.top) / draggedElRect.height
        };
        draggedEl.style.height = `${newRect.height}px`;
        draggedEl.style.width = `${newRect.width}px`;
        draggedEl.style.left = `${parseFloat(draggedEl.style.left) - relativeDistanceOfMousePointerFromDraggedSides.left * widthChange}px`;
        draggedEl.style.top = `${parseFloat(draggedEl.style.top) - relativeDistanceOfMousePointerFromDraggedSides.top * heightChange}px`;
    }

    /// other properties
    copyStylesFromTo(copyFromEl, draggedEl);
    transformDraggedElement();
}

/**
 * @param {HTMLElement} copyFromEl
 * @param {HTMLElement} copyToEl
 */
function copyStylesFromTo(copyFromEl, copyToEl) {
    const computedStyle = window.getComputedStyle(copyFromEl);
    Array.from(computedStyle)
        .filter(
            s =>
                s.startsWith("background") ||
                s.startsWith("padding") ||
                s.startsWith("font") ||
                s.startsWith("text") ||
                s.startsWith("align") ||
                s.startsWith("justify") ||
                s.startsWith("display") ||
                s.startsWith("flex") ||
                s.startsWith("border") ||
                s === "opacity" ||
                s === "color" ||
                s === "list-style-type"
        )
        .forEach(s => copyToEl.style.setProperty(s, computedStyle.getPropertyValue(s), computedStyle.getPropertyPriority(s)));
}

/**
 * makes the element compatible with being draggable
 * @param {HTMLElement} draggableEl
 * @param {boolean} dragDisabled
 */
function styleDraggable(draggableEl, dragDisabled) {
    draggableEl.draggable = false;
    draggableEl.ondragstart = () => false;
    if (!dragDisabled) {
        draggableEl.style.userSelect = "none";
        draggableEl.style.WebkitUserSelect = "none";
        draggableEl.style.cursor = "grab";
    } else {
        draggableEl.style.userSelect = "";
        draggableEl.style.WebkitUserSelect = "";
        draggableEl.style.cursor = "";
    }
}

/**
 * Hides the provided element so that it can stay in the dom without interrupting
 * @param {HTMLElement} dragTarget
 */
function hideOriginalDragTarget(dragTarget) {
    dragTarget.style.display = "none";
    dragTarget.style.position = "fixed";
    dragTarget.style.zIndex = "-5";
}

/**
 * styles the shadow element
 * @param {HTMLElement} shadowEl
 */
function decorateShadowEl(shadowEl) {
    shadowEl.style.visibility = "hidden";
    shadowEl.setAttribute(SHADOW_ELEMENT_ATTRIBUTE_NAME, "true");
}

/**
 * undo the styles the shadow element
 * @param {HTMLElement} shadowEl
 */
function unDecorateShadowElement(shadowEl) {
    shadowEl.style.visibility = "";
    shadowEl.removeAttribute(SHADOW_ELEMENT_ATTRIBUTE_NAME);
}

/**
 * will mark the given dropzones as visually active
 * @param {Array<HTMLElement>} dropZones
 * @param {Function} getStyles - maps a dropzone to a styles object (so the styles can be removed)
 * @param {Function} getClasses - maps a dropzone to a classList
 */
function styleActiveDropZones(dropZones, getStyles = () => {}, getClasses = () => []) {
    dropZones.forEach(dz => {
        const styles = getStyles(dz);
        Object.keys(styles).forEach(style => {
            dz.style[style] = styles[style];
        });
        getClasses(dz).forEach(c => dz.classList.add(c));
    });
}

/**
 * will remove the 'active' styling from given dropzones
 * @param {Array<HTMLElement>} dropZones
 * @param {Function} getStyles - maps a dropzone to a styles object
 * @param {Function} getClasses - maps a dropzone to a classList
 */
function styleInactiveDropZones(dropZones, getStyles = () => {}, getClasses = () => []) {
    dropZones.forEach(dz => {
        const styles = getStyles(dz);
        Object.keys(styles).forEach(style => {
            dz.style[style] = "";
        });
        getClasses(dz).forEach(c => dz.classList.contains(c) && dz.classList.remove(c));
    });
}

/**
 * will prevent the provided element from shrinking by setting its minWidth and minHeight to the current width and height values
 * @param {HTMLElement} el
 * @return {function(): void} - run this function to undo the operation and restore the original values
 */
function preventShrinking(el) {
    const originalMinHeight = el.style.minHeight;
    el.style.minHeight = window.getComputedStyle(el).getPropertyValue("height");
    const originalMinWidth = el.style.minWidth;
    el.style.minWidth = window.getComputedStyle(el).getPropertyValue("width");
    return function undo() {
        el.style.minHeight = originalMinHeight;
        el.style.minWidth = originalMinWidth;
    };
}

const DEFAULT_DROP_ZONE_TYPE$1 = "--any--";
const MIN_OBSERVATION_INTERVAL_MS = 100;
const MIN_MOVEMENT_BEFORE_DRAG_START_PX = 3;
const DEFAULT_DROP_TARGET_STYLE$1 = {
    outline: "rgba(255, 255, 102, 0.7) solid 2px"
};

let originalDragTarget;
let draggedEl;
let draggedElData;
let draggedElType;
let originDropZone;
let originIndex;
let shadowElData;
let shadowElDropZone;
let dragStartMousePosition;
let currentMousePosition;
let isWorkingOnPreviousDrag = false;
let finalizingPreviousDrag = false;
let unlockOriginDzMinDimensions;
let isDraggedOutsideOfAnyDz = false;

// a map from type to a set of drop-zones
const typeToDropZones$1 = new Map();
// important - this is needed because otherwise the config that would be used for everyone is the config of the element that created the event listeners
const dzToConfig$1 = new Map();
// this is needed in order to be able to cleanup old listeners and avoid stale closures issues (as the listener is defined within each zone)
const elToMouseDownListener = new WeakMap();

/* drop-zones registration management */
function registerDropZone$1(dropZoneEl, type) {
    if (!typeToDropZones$1.has(type)) {
        typeToDropZones$1.set(type, new Set());
    }
    if (!typeToDropZones$1.get(type).has(dropZoneEl)) {
        typeToDropZones$1.get(type).add(dropZoneEl);
        incrementActiveDropZoneCount();
    }
}
function unregisterDropZone$1(dropZoneEl, type) {
    typeToDropZones$1.get(type).delete(dropZoneEl);
    decrementActiveDropZoneCount();
    if (typeToDropZones$1.get(type).size === 0) {
        typeToDropZones$1.delete(type);
    }
}

/* functions to manage observing the dragged element and trigger custom drag-events */
function watchDraggedElement() {
    armWindowScroller();
    const dropZones = typeToDropZones$1.get(draggedElType);
    for (const dz of dropZones) {
        dz.addEventListener(DRAGGED_ENTERED_EVENT_NAME, handleDraggedEntered);
        dz.addEventListener(DRAGGED_LEFT_EVENT_NAME, handleDraggedLeft);
        dz.addEventListener(DRAGGED_OVER_INDEX_EVENT_NAME, handleDraggedIsOverIndex);
    }
    window.addEventListener(DRAGGED_LEFT_DOCUMENT_EVENT_NAME, handleDrop$1);
    // it is important that we don't have an interval that is faster than the flip duration because it can cause elements to jump bach and forth
    const observationIntervalMs = Math.max(
        MIN_OBSERVATION_INTERVAL_MS,
        ...Array.from(dropZones.keys()).map(dz => dzToConfig$1.get(dz).dropAnimationDurationMs)
    );
    observe(draggedEl, dropZones, observationIntervalMs * 1.07);
}
function unWatchDraggedElement() {
    disarmWindowScroller();
    const dropZones = typeToDropZones$1.get(draggedElType);
    for (const dz of dropZones) {
        dz.removeEventListener(DRAGGED_ENTERED_EVENT_NAME, handleDraggedEntered);
        dz.removeEventListener(DRAGGED_LEFT_EVENT_NAME, handleDraggedLeft);
        dz.removeEventListener(DRAGGED_OVER_INDEX_EVENT_NAME, handleDraggedIsOverIndex);
    }
    window.removeEventListener(DRAGGED_LEFT_DOCUMENT_EVENT_NAME, handleDrop$1);
    unobserve();
}

// finds the initial placeholder that is placed there on drag start
function findShadowPlaceHolderIdx(items) {
    return items.findIndex(item => item[ITEM_ID_KEY] === SHADOW_PLACEHOLDER_ITEM_ID);
}
function findShadowElementIdx(items) {
    // checking that the id is not the placeholder's for Dragula like usecases
    return items.findIndex(item => !!item[SHADOW_ITEM_MARKER_PROPERTY_NAME] && item[ITEM_ID_KEY] !== SHADOW_PLACEHOLDER_ITEM_ID);
}

/* custom drag-events handlers */
function handleDraggedEntered(e) {
    let {items, dropFromOthersDisabled} = dzToConfig$1.get(e.currentTarget);
    if (dropFromOthersDisabled && e.currentTarget !== originDropZone) {
        return;
    }
    isDraggedOutsideOfAnyDz = false;
    // this deals with another race condition. in rare occasions (super rapid operations) the list hasn't updated yet
    items = items.filter(item => item[ITEM_ID_KEY] !== shadowElData[ITEM_ID_KEY]);

    if (originDropZone !== e.currentTarget) {
        const originZoneItems = dzToConfig$1.get(originDropZone).items;
        const newOriginZoneItems = originZoneItems.filter(item => !item[SHADOW_ITEM_MARKER_PROPERTY_NAME]);
        dispatchConsiderEvent(originDropZone, newOriginZoneItems, {
            trigger: TRIGGERS.DRAGGED_ENTERED_ANOTHER,
            id: draggedElData[ITEM_ID_KEY],
            source: SOURCES.POINTER
        });
    } else {
        const shadowPlaceHolderIdx = findShadowPlaceHolderIdx(items);
        if (shadowPlaceHolderIdx !== -1) {
            items.splice(shadowPlaceHolderIdx, 1);
        }
    }

    const {index, isProximityBased} = e.detail.indexObj;
    const shadowElIdx = isProximityBased && index === e.currentTarget.children.length - 1 ? index + 1 : index;
    shadowElDropZone = e.currentTarget;
    items.splice(shadowElIdx, 0, shadowElData);
    dispatchConsiderEvent(e.currentTarget, items, {trigger: TRIGGERS.DRAGGED_ENTERED, id: draggedElData[ITEM_ID_KEY], source: SOURCES.POINTER});
}

function handleDraggedLeft(e) {
    // dealing with a rare race condition on extremely rapid clicking and dropping
    if (!isWorkingOnPreviousDrag) return;
    const {items, dropFromOthersDisabled} = dzToConfig$1.get(e.currentTarget);
    if (dropFromOthersDisabled && e.currentTarget !== originDropZone) {
        return;
    }
    const shadowElIdx = findShadowElementIdx(items);
    const shadowItem = items.splice(shadowElIdx, 1)[0];
    shadowElDropZone = undefined;
    const {type, theOtherDz} = e.detail;
    if (
        type === DRAGGED_LEFT_TYPES.OUTSIDE_OF_ANY ||
        (type === DRAGGED_LEFT_TYPES.LEFT_FOR_ANOTHER && theOtherDz !== originDropZone && dzToConfig$1.get(theOtherDz).dropFromOthersDisabled)
    ) {
        isDraggedOutsideOfAnyDz = true;
        shadowElDropZone = originDropZone;
        const originZoneItems = dzToConfig$1.get(originDropZone).items;
        originZoneItems.splice(originIndex, 0, shadowItem);
        dispatchConsiderEvent(originDropZone, originZoneItems, {
            trigger: TRIGGERS.DRAGGED_LEFT_ALL,
            id: draggedElData[ITEM_ID_KEY],
            source: SOURCES.POINTER
        });
    }
    // for the origin dz, when the dragged is outside of any, this will be fired in addition to the previous. this is for simplicity
    dispatchConsiderEvent(e.currentTarget, items, {
        trigger: TRIGGERS.DRAGGED_LEFT,
        id: draggedElData[ITEM_ID_KEY],
        source: SOURCES.POINTER
    });
}
function handleDraggedIsOverIndex(e) {
    const {items, dropFromOthersDisabled} = dzToConfig$1.get(e.currentTarget);
    if (dropFromOthersDisabled && e.currentTarget !== originDropZone) {
        return;
    }
    isDraggedOutsideOfAnyDz = false;
    const {index} = e.detail.indexObj;
    const shadowElIdx = findShadowElementIdx(items);
    items.splice(shadowElIdx, 1);
    items.splice(index, 0, shadowElData);
    dispatchConsiderEvent(e.currentTarget, items, {trigger: TRIGGERS.DRAGGED_OVER_INDEX, id: draggedElData[ITEM_ID_KEY], source: SOURCES.POINTER});
}

// Global mouse/touch-events handlers
function handleMouseMove(e) {
    e.preventDefault();
    const c = e.touches ? e.touches[0] : e;
    currentMousePosition = {x: c.clientX, y: c.clientY};
    draggedEl.style.transform = `translate3d(${currentMousePosition.x - dragStartMousePosition.x}px, ${
        currentMousePosition.y - dragStartMousePosition.y
    }px, 0)`;
}

function handleDrop$1() {
    finalizingPreviousDrag = true;
    // cleanup
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("touchmove", handleMouseMove);
    window.removeEventListener("mouseup", handleDrop$1);
    window.removeEventListener("touchend", handleDrop$1);
    unWatchDraggedElement();
    moveDraggedElementToWasDroppedState(draggedEl);

    if (!shadowElDropZone) {
        shadowElDropZone = originDropZone;
    }
    let {items, type} = dzToConfig$1.get(shadowElDropZone);
    styleInactiveDropZones(
        typeToDropZones$1.get(type),
        dz => dzToConfig$1.get(dz).dropTargetStyle,
        dz => dzToConfig$1.get(dz).dropTargetClasses
    );
    let shadowElIdx = findShadowElementIdx(items);
    // the handler might remove the shadow element, ex: dragula like copy on drag
    if (shadowElIdx === -1) shadowElIdx = originIndex;
    items = items.map(item => (item[SHADOW_ITEM_MARKER_PROPERTY_NAME] ? draggedElData : item));
    function finalizeWithinZone() {
        unlockOriginDzMinDimensions();
        dispatchFinalizeEvent(shadowElDropZone, items, {
            trigger: isDraggedOutsideOfAnyDz ? TRIGGERS.DROPPED_OUTSIDE_OF_ANY : TRIGGERS.DROPPED_INTO_ZONE,
            id: draggedElData[ITEM_ID_KEY],
            source: SOURCES.POINTER
        });
        if (shadowElDropZone !== originDropZone) {
            // letting the origin drop zone know the element was permanently taken away
            dispatchFinalizeEvent(originDropZone, dzToConfig$1.get(originDropZone).items, {
                trigger: TRIGGERS.DROPPED_INTO_ANOTHER,
                id: draggedElData[ITEM_ID_KEY],
                source: SOURCES.POINTER
            });
        }
        unDecorateShadowElement(shadowElDropZone.children[shadowElIdx]);
        cleanupPostDrop();
    }
    animateDraggedToFinalPosition(shadowElIdx, finalizeWithinZone);
}

// helper function for handleDrop
function animateDraggedToFinalPosition(shadowElIdx, callback) {
    const shadowElRect = getBoundingRectNoTransforms(shadowElDropZone.children[shadowElIdx]);
    const newTransform = {
        x: shadowElRect.left - parseFloat(draggedEl.style.left),
        y: shadowElRect.top - parseFloat(draggedEl.style.top)
    };
    const {dropAnimationDurationMs} = dzToConfig$1.get(shadowElDropZone);
    const transition = `transform ${dropAnimationDurationMs}ms ease`;
    draggedEl.style.transition = draggedEl.style.transition ? draggedEl.style.transition + "," + transition : transition;
    draggedEl.style.transform = `translate3d(${newTransform.x}px, ${newTransform.y}px, 0)`;
    window.setTimeout(callback, dropAnimationDurationMs);
}

/* cleanup */
function cleanupPostDrop() {
    draggedEl.remove();
    originalDragTarget.remove();
    draggedEl = undefined;
    originalDragTarget = undefined;
    draggedElData = undefined;
    draggedElType = undefined;
    originDropZone = undefined;
    originIndex = undefined;
    shadowElData = undefined;
    shadowElDropZone = undefined;
    dragStartMousePosition = undefined;
    currentMousePosition = undefined;
    isWorkingOnPreviousDrag = false;
    finalizingPreviousDrag = false;
    unlockOriginDzMinDimensions = undefined;
    isDraggedOutsideOfAnyDz = false;
}

function dndzone$2(node, options) {
    const config = {
        items: undefined,
        type: undefined,
        flipDurationMs: 0,
        dragDisabled: false,
        morphDisabled: false,
        dropFromOthersDisabled: false,
        dropTargetStyle: DEFAULT_DROP_TARGET_STYLE$1,
        dropTargetClasses: [],
        transformDraggedElement: () => {},
        centreDraggedOnCursor: false
    };
    let elToIdx = new Map();

    function addMaybeListeners() {
        window.addEventListener("mousemove", handleMouseMoveMaybeDragStart, {passive: false});
        window.addEventListener("touchmove", handleMouseMoveMaybeDragStart, {passive: false, capture: false});
        window.addEventListener("mouseup", handleFalseAlarm, {passive: false});
        window.addEventListener("touchend", handleFalseAlarm, {passive: false});
    }
    function removeMaybeListeners() {
        window.removeEventListener("mousemove", handleMouseMoveMaybeDragStart);
        window.removeEventListener("touchmove", handleMouseMoveMaybeDragStart);
        window.removeEventListener("mouseup", handleFalseAlarm);
        window.removeEventListener("touchend", handleFalseAlarm);
    }
    function handleFalseAlarm() {
        removeMaybeListeners();
        originalDragTarget = undefined;
        dragStartMousePosition = undefined;
        currentMousePosition = undefined;
    }

    function handleMouseMoveMaybeDragStart(e) {
        e.preventDefault();
        const c = e.touches ? e.touches[0] : e;
        currentMousePosition = {x: c.clientX, y: c.clientY};
        if (
            Math.abs(currentMousePosition.x - dragStartMousePosition.x) >= MIN_MOVEMENT_BEFORE_DRAG_START_PX ||
            Math.abs(currentMousePosition.y - dragStartMousePosition.y) >= MIN_MOVEMENT_BEFORE_DRAG_START_PX
        ) {
            removeMaybeListeners();
            handleDragStart();
        }
    }
    function handleMouseDown(e) {
        // on safari clicking on a select element doesn't fire mouseup at the end of the click and in general this makes more sense
        if (e.target !== e.currentTarget && (e.target.value !== undefined || e.target.isContentEditable)) {
            return;
        }
        // prevents responding to any button but left click which equals 0 (which is falsy)
        if (e.button) {
            return;
        }
        if (isWorkingOnPreviousDrag) {
            return;
        }
        e.stopPropagation();
        const c = e.touches ? e.touches[0] : e;
        dragStartMousePosition = {x: c.clientX, y: c.clientY};
        currentMousePosition = {...dragStartMousePosition};
        originalDragTarget = e.currentTarget;
        addMaybeListeners();
    }

    function handleDragStart() {
        isWorkingOnPreviousDrag = true;

        // initialising globals
        const currentIdx = elToIdx.get(originalDragTarget);
        originIndex = currentIdx;
        originDropZone = originalDragTarget.parentElement;
        const {items, type, centreDraggedOnCursor} = config;
        draggedElData = {...items[currentIdx]};
        draggedElType = type;
        shadowElData = {...draggedElData, [SHADOW_ITEM_MARKER_PROPERTY_NAME]: true};
        // The initial shadow element. We need a different id at first in order to avoid conflicts and timing issues
        const placeHolderElData = {...shadowElData, [ITEM_ID_KEY]: SHADOW_PLACEHOLDER_ITEM_ID};

        // creating the draggable element
        draggedEl = createDraggedElementFrom(originalDragTarget, centreDraggedOnCursor && currentMousePosition);
        // We will keep the original dom node in the dom because touch events keep firing on it, we want to re-add it after the framework removes it
        function keepOriginalElementInDom() {
            if (!draggedEl.parentElement) {
                document.body.appendChild(draggedEl);
                // to prevent the outline from disappearing
                draggedEl.focus();
                watchDraggedElement();
                hideOriginalDragTarget(originalDragTarget);
                document.body.appendChild(originalDragTarget);
            } else {
                window.requestAnimationFrame(keepOriginalElementInDom);
            }
        }
        window.requestAnimationFrame(keepOriginalElementInDom);

        styleActiveDropZones(
            Array.from(typeToDropZones$1.get(config.type)).filter(dz => dz === originDropZone || !dzToConfig$1.get(dz).dropFromOthersDisabled),
            dz => dzToConfig$1.get(dz).dropTargetStyle,
            dz => dzToConfig$1.get(dz).dropTargetClasses
        );

        // removing the original element by removing its data entry
        items.splice(currentIdx, 1, placeHolderElData);
        unlockOriginDzMinDimensions = preventShrinking(originDropZone);

        dispatchConsiderEvent(originDropZone, items, {trigger: TRIGGERS.DRAG_STARTED, id: draggedElData[ITEM_ID_KEY], source: SOURCES.POINTER});

        // handing over to global handlers - starting to watch the element
        window.addEventListener("mousemove", handleMouseMove, {passive: false});
        window.addEventListener("touchmove", handleMouseMove, {passive: false, capture: false});
        window.addEventListener("mouseup", handleDrop$1, {passive: false});
        window.addEventListener("touchend", handleDrop$1, {passive: false});
    }

    function configure({
        items = undefined,
        flipDurationMs: dropAnimationDurationMs = 0,
        type: newType = DEFAULT_DROP_ZONE_TYPE$1,
        dragDisabled = false,
        morphDisabled = false,
        dropFromOthersDisabled = false,
        dropTargetStyle = DEFAULT_DROP_TARGET_STYLE$1,
        dropTargetClasses = [],
        transformDraggedElement = () => {},
        centreDraggedOnCursor = false
    }) {
        config.dropAnimationDurationMs = dropAnimationDurationMs;
        if (config.type && newType !== config.type) {
            unregisterDropZone$1(node, config.type);
        }
        config.type = newType;
        registerDropZone$1(node, newType);

        config.items = [...items];
        config.dragDisabled = dragDisabled;
        config.morphDisabled = morphDisabled;
        config.transformDraggedElement = transformDraggedElement;
        config.centreDraggedOnCursor = centreDraggedOnCursor;

        // realtime update for dropTargetStyle
        if (
            isWorkingOnPreviousDrag &&
            !finalizingPreviousDrag &&
            (!areObjectsShallowEqual(dropTargetStyle, config.dropTargetStyle) ||
                !areArraysShallowEqualSameOrder(dropTargetClasses, config.dropTargetClasses))
        ) {
            styleInactiveDropZones(
                [node],
                () => config.dropTargetStyle,
                () => dropTargetClasses
            );
            styleActiveDropZones(
                [node],
                () => dropTargetStyle,
                () => dropTargetClasses
            );
        }
        config.dropTargetStyle = dropTargetStyle;
        config.dropTargetClasses = [...dropTargetClasses];

        // realtime update for dropFromOthersDisabled
        function getConfigProp(dz, propName) {
            return dzToConfig$1.get(dz) ? dzToConfig$1.get(dz)[propName] : config[propName];
        }
        if (isWorkingOnPreviousDrag && config.dropFromOthersDisabled !== dropFromOthersDisabled) {
            if (dropFromOthersDisabled) {
                styleInactiveDropZones(
                    [node],
                    dz => getConfigProp(dz, "dropTargetStyle"),
                    dz => getConfigProp(dz, "dropTargetClasses")
                );
            } else {
                styleActiveDropZones(
                    [node],
                    dz => getConfigProp(dz, "dropTargetStyle"),
                    dz => getConfigProp(dz, "dropTargetClasses")
                );
            }
        }
        config.dropFromOthersDisabled = dropFromOthersDisabled;

        dzToConfig$1.set(node, config);
        const shadowElIdx = findShadowElementIdx(config.items);
        for (let idx = 0; idx < node.children.length; idx++) {
            const draggableEl = node.children[idx];
            styleDraggable(draggableEl, dragDisabled);
            if (idx === shadowElIdx) {
                if (!morphDisabled) {
                    morphDraggedElementToBeLike(draggedEl, draggableEl, currentMousePosition.x, currentMousePosition.y, () =>
                        config.transformDraggedElement(draggedEl, draggedElData, idx)
                    );
                }
                decorateShadowEl(draggableEl);
                continue;
            }
            draggableEl.removeEventListener("mousedown", elToMouseDownListener.get(draggableEl));
            draggableEl.removeEventListener("touchstart", elToMouseDownListener.get(draggableEl));
            if (!dragDisabled) {
                draggableEl.addEventListener("mousedown", handleMouseDown);
                draggableEl.addEventListener("touchstart", handleMouseDown);
                elToMouseDownListener.set(draggableEl, handleMouseDown);
            }
            // updating the idx
            elToIdx.set(draggableEl, idx);
        }
    }
    configure(options);

    return {
        update: newOptions => {
            configure(newOptions);
        },
        destroy: () => {
            unregisterDropZone$1(node, config.type);
            dzToConfig$1.delete(node);
        }
    };
}

const INSTRUCTION_IDs$1 = {
    DND_ZONE_ACTIVE: "dnd-zone-active",
    DND_ZONE_DRAG_DISABLED: "dnd-zone-drag-disabled"
};
const ID_TO_INSTRUCTION = {
    [INSTRUCTION_IDs$1.DND_ZONE_ACTIVE]: "Tab to one the items and press space-bar or enter to start dragging it",
    [INSTRUCTION_IDs$1.DND_ZONE_DRAG_DISABLED]: "This is a disabled drag and drop list"
};

const ALERT_DIV_ID = "dnd-action-aria-alert";
let alertsDiv;

function initAriaOnBrowser() {
    // setting the dynamic alerts
    alertsDiv = document.createElement("div");
    (function initAlertsDiv() {
        alertsDiv.id = ALERT_DIV_ID;
        // tab index -1 makes the alert be read twice on chrome for some reason
        //alertsDiv.tabIndex = -1;
        alertsDiv.style.position = "fixed";
        alertsDiv.style.bottom = "0";
        alertsDiv.style.left = "0";
        alertsDiv.style.zIndex = "-5";
        alertsDiv.style.opacity = "0";
        alertsDiv.style.height = "0";
        alertsDiv.style.width = "0";
        alertsDiv.setAttribute("role", "alert");
    })();
    document.body.prepend(alertsDiv);

    // setting the instructions
    Object.entries(ID_TO_INSTRUCTION).forEach(([id, txt]) => document.body.prepend(instructionToHiddenDiv(id, txt)));
}

/**
 * Initializes the static aria instructions so they can be attached to zones
 * @return {{DND_ZONE_ACTIVE: string, DND_ZONE_DRAG_DISABLED: string} | null} - the IDs for static aria instruction (to be used via aria-describedby) or null on the server
 */
function initAria() {
    if (isOnServer) return null;
    if (document.readyState === "complete") {
        initAriaOnBrowser();
    } else {
        window.addEventListener("DOMContentLoaded", initAriaOnBrowser);
    }
    return {...INSTRUCTION_IDs$1};
}
function instructionToHiddenDiv(id, txt) {
    const div = document.createElement("div");
    div.id = id;
    div.innerHTML = `<p>${txt}</p>`;
    div.style.display = "none";
    div.style.position = "fixed";
    div.style.zIndex = "-5";
    return div;
}

/**
 * Will make the screen reader alert the provided text to the user
 * @param {string} txt
 */
function alertToScreenReader(txt) {
    alertsDiv.innerHTML = "";
    const alertText = document.createTextNode(txt);
    alertsDiv.appendChild(alertText);
    // this is needed for Safari
    alertsDiv.style.display = "none";
    alertsDiv.style.display = "inline";
}

const DEFAULT_DROP_ZONE_TYPE = "--any--";
const DEFAULT_DROP_TARGET_STYLE = {
    outline: "rgba(255, 255, 102, 0.7) solid 2px"
};

let isDragging = false;
let draggedItemType;
let focusedDz;
let focusedDzLabel = "";
let focusedItem;
let focusedItemId;
let focusedItemLabel = "";
const allDragTargets = new WeakSet();
const elToKeyDownListeners = new WeakMap();
const elToFocusListeners = new WeakMap();
const dzToHandles = new Map();
const dzToConfig = new Map();
const typeToDropZones = new Map();

/* TODO (potentially)
 * what's the deal with the black border of voice-reader not following focus?
 * maybe keep focus on the last dragged item upon drop?
 */

const INSTRUCTION_IDs = initAria();

/* drop-zones registration management */
function registerDropZone(dropZoneEl, type) {
    if (typeToDropZones.size === 0) {
        window.addEventListener("keydown", globalKeyDownHandler);
        window.addEventListener("click", globalClickHandler);
    }
    if (!typeToDropZones.has(type)) {
        typeToDropZones.set(type, new Set());
    }
    if (!typeToDropZones.get(type).has(dropZoneEl)) {
        typeToDropZones.get(type).add(dropZoneEl);
        incrementActiveDropZoneCount();
    }
}
function unregisterDropZone(dropZoneEl, type) {
    if (focusedDz === dropZoneEl) {
        handleDrop();
    }
    typeToDropZones.get(type).delete(dropZoneEl);
    decrementActiveDropZoneCount();
    if (typeToDropZones.get(type).size === 0) {
        typeToDropZones.delete(type);
    }
    if (typeToDropZones.size === 0) {
        window.removeEventListener("keydown", globalKeyDownHandler);
        window.removeEventListener("click", globalClickHandler);
    }
}

function globalKeyDownHandler(e) {
    if (!isDragging) return;
    switch (e.key) {
        case "Escape": {
            handleDrop();
            break;
        }
    }
}

function globalClickHandler() {
    if (!isDragging) return;
    if (!allDragTargets.has(document.activeElement)) {
        handleDrop();
    }
}

function handleZoneFocus(e) {
    if (!isDragging) return;
    const newlyFocusedDz = e.currentTarget;
    if (newlyFocusedDz === focusedDz) return;

    focusedDzLabel = newlyFocusedDz.getAttribute("aria-label") || "";
    const {items: originItems} = dzToConfig.get(focusedDz);
    const originItem = originItems.find(item => item[ITEM_ID_KEY] === focusedItemId);
    const originIdx = originItems.indexOf(originItem);
    const itemToMove = originItems.splice(originIdx, 1)[0];
    const {items: targetItems, autoAriaDisabled} = dzToConfig.get(newlyFocusedDz);
    if (
        newlyFocusedDz.getBoundingClientRect().top < focusedDz.getBoundingClientRect().top ||
        newlyFocusedDz.getBoundingClientRect().left < focusedDz.getBoundingClientRect().left
    ) {
        targetItems.push(itemToMove);
        if (!autoAriaDisabled) {
            alertToScreenReader(`Moved item ${focusedItemLabel} to the end of the list ${focusedDzLabel}`);
        }
    } else {
        targetItems.unshift(itemToMove);
        if (!autoAriaDisabled) {
            alertToScreenReader(`Moved item ${focusedItemLabel} to the beginning of the list ${focusedDzLabel}`);
        }
    }
    const dzFrom = focusedDz;
    dispatchFinalizeEvent(dzFrom, originItems, {trigger: TRIGGERS.DROPPED_INTO_ANOTHER, id: focusedItemId, source: SOURCES.KEYBOARD});
    dispatchFinalizeEvent(newlyFocusedDz, targetItems, {trigger: TRIGGERS.DROPPED_INTO_ZONE, id: focusedItemId, source: SOURCES.KEYBOARD});
    focusedDz = newlyFocusedDz;
}

function triggerAllDzsUpdate() {
    dzToHandles.forEach(({update}, dz) => update(dzToConfig.get(dz)));
}

function handleDrop(dispatchConsider = true) {
    if (!dzToConfig.get(focusedDz).autoAriaDisabled) {
        alertToScreenReader(`Stopped dragging item ${focusedItemLabel}`);
    }
    if (allDragTargets.has(document.activeElement)) {
        document.activeElement.blur();
    }
    if (dispatchConsider) {
        dispatchConsiderEvent(focusedDz, dzToConfig.get(focusedDz).items, {
            trigger: TRIGGERS.DRAG_STOPPED,
            id: focusedItemId,
            source: SOURCES.KEYBOARD
        });
    }
    styleInactiveDropZones(
        typeToDropZones.get(draggedItemType),
        dz => dzToConfig.get(dz).dropTargetStyle,
        dz => dzToConfig.get(dz).dropTargetClasses
    );
    focusedItem = null;
    focusedItemId = null;
    focusedItemLabel = "";
    draggedItemType = null;
    focusedDz = null;
    focusedDzLabel = "";
    isDragging = false;
    triggerAllDzsUpdate();
}
//////
function dndzone$1(node, options) {
    const config = {
        items: undefined,
        type: undefined,
        dragDisabled: false,
        dropFromOthersDisabled: false,
        dropTargetStyle: DEFAULT_DROP_TARGET_STYLE,
        dropTargetClasses: [],
        autoAriaDisabled: false
    };

    function swap(arr, i, j) {
        if (arr.length <= 1) return;
        arr.splice(j, 1, arr.splice(i, 1, arr[j])[0]);
    }

    function handleKeyDown(e) {
        switch (e.key) {
            case "Enter":
            case " ": {
                // we don't want to affect nested input elements or clickable elements
                if ((e.target.disabled !== undefined || e.target.href || e.target.isContentEditable) && !allDragTargets.has(e.target)) {
                    return;
                }
                e.preventDefault(); // preventing scrolling on spacebar
                e.stopPropagation();
                if (isDragging) {
                    // TODO - should this trigger a drop? only here or in general (as in when hitting space or enter outside of any zone)?
                    handleDrop();
                } else {
                    // drag start
                    handleDragStart(e);
                }
                break;
            }
            case "ArrowDown":
            case "ArrowRight": {
                if (!isDragging) return;
                e.preventDefault(); // prevent scrolling
                e.stopPropagation();
                const {items} = dzToConfig.get(node);
                const children = Array.from(node.children);
                const idx = children.indexOf(e.currentTarget);
                if (idx < children.length - 1) {
                    if (!config.autoAriaDisabled) {
                        alertToScreenReader(`Moved item ${focusedItemLabel} to position ${idx + 2} in the list ${focusedDzLabel}`);
                    }
                    swap(items, idx, idx + 1);
                    dispatchFinalizeEvent(node, items, {trigger: TRIGGERS.DROPPED_INTO_ZONE, id: focusedItemId, source: SOURCES.KEYBOARD});
                }
                break;
            }
            case "ArrowUp":
            case "ArrowLeft": {
                if (!isDragging) return;
                e.preventDefault(); // prevent scrolling
                e.stopPropagation();
                const {items} = dzToConfig.get(node);
                const children = Array.from(node.children);
                const idx = children.indexOf(e.currentTarget);
                if (idx > 0) {
                    if (!config.autoAriaDisabled) {
                        alertToScreenReader(`Moved item ${focusedItemLabel} to position ${idx} in the list ${focusedDzLabel}`);
                    }
                    swap(items, idx, idx - 1);
                    dispatchFinalizeEvent(node, items, {trigger: TRIGGERS.DROPPED_INTO_ZONE, id: focusedItemId, source: SOURCES.KEYBOARD});
                }
                break;
            }
        }
    }
    function handleDragStart(e) {
        setCurrentFocusedItem(e.currentTarget);
        focusedDz = node;
        draggedItemType = config.type;
        isDragging = true;
        const dropTargets = Array.from(typeToDropZones.get(config.type)).filter(dz => dz === focusedDz || !dzToConfig.get(dz).dropFromOthersDisabled);
        styleActiveDropZones(
            dropTargets,
            dz => dzToConfig.get(dz).dropTargetStyle,
            dz => dzToConfig.get(dz).dropTargetClasses
        );
        if (!config.autoAriaDisabled) {
            let msg = `Started dragging item ${focusedItemLabel}. Use the arrow keys to move it within its list ${focusedDzLabel}`;
            if (dropTargets.length > 1) {
                msg += `, or tab to another list in order to move the item into it`;
            }
            alertToScreenReader(msg);
        }
        dispatchConsiderEvent(node, dzToConfig.get(node).items, {trigger: TRIGGERS.DRAG_STARTED, id: focusedItemId, source: SOURCES.KEYBOARD});
        triggerAllDzsUpdate();
    }

    function handleClick(e) {
        if (!isDragging) return;
        if (e.currentTarget === focusedItem) return;
        e.stopPropagation();
        handleDrop(false);
        handleDragStart(e);
    }
    function setCurrentFocusedItem(draggableEl) {
        const {items} = dzToConfig.get(node);
        const children = Array.from(node.children);
        const focusedItemIdx = children.indexOf(draggableEl);
        focusedItem = draggableEl;
        focusedItem.tabIndex = 0;
        focusedItemId = items[focusedItemIdx][ITEM_ID_KEY];
        focusedItemLabel = children[focusedItemIdx].getAttribute("aria-label") || "";
    }

    function configure({
        items = [],
        type: newType = DEFAULT_DROP_ZONE_TYPE,
        dragDisabled = false,
        dropFromOthersDisabled = false,
        dropTargetStyle = DEFAULT_DROP_TARGET_STYLE,
        dropTargetClasses = [],
        autoAriaDisabled = false
    }) {
        config.items = [...items];
        config.dragDisabled = dragDisabled;
        config.dropFromOthersDisabled = dropFromOthersDisabled;
        config.dropTargetStyle = dropTargetStyle;
        config.dropTargetClasses = dropTargetClasses;
        config.autoAriaDisabled = autoAriaDisabled;
        if (!autoAriaDisabled) {
            node.setAttribute("aria-disabled", dragDisabled);
            node.setAttribute("role", "list");
            node.setAttribute("aria-describedby", dragDisabled ? INSTRUCTION_IDs.DND_ZONE_DRAG_DISABLED : INSTRUCTION_IDs.DND_ZONE_ACTIVE);
        }
        if (config.type && newType !== config.type) {
            unregisterDropZone(node, config.type);
        }
        config.type = newType;
        registerDropZone(node, newType);
        dzToConfig.set(node, config);

        node.tabIndex =
            isDragging &&
            (node === focusedDz ||
                focusedItem.contains(node) ||
                config.dropFromOthersDisabled ||
                (focusedDz && config.type !== dzToConfig.get(focusedDz).type))
                ? -1
                : 0;
        node.addEventListener("focus", handleZoneFocus);

        for (let i = 0; i < node.children.length; i++) {
            const draggableEl = node.children[i];
            allDragTargets.add(draggableEl);
            draggableEl.tabIndex = isDragging ? -1 : 0;
            if (!autoAriaDisabled) {
                draggableEl.setAttribute("role", "listitem");
            }
            draggableEl.removeEventListener("keydown", elToKeyDownListeners.get(draggableEl));
            draggableEl.removeEventListener("click", elToFocusListeners.get(draggableEl));
            if (!dragDisabled) {
                draggableEl.addEventListener("keydown", handleKeyDown);
                elToKeyDownListeners.set(draggableEl, handleKeyDown);
                draggableEl.addEventListener("click", handleClick);
                elToFocusListeners.set(draggableEl, handleClick);
            }
            if (isDragging && config.items[i][ITEM_ID_KEY] === focusedItemId) {
                // if it is a nested dropzone, it was re-rendered and we need to refresh our pointer
                focusedItem = draggableEl;
                focusedItem.tabIndex = 0;
                // without this the element loses focus if it moves backwards in the list
                draggableEl.focus();
            }
        }
    }
    configure(options);

    const handles = {
        update: newOptions => {
            configure(newOptions);
        },
        destroy: () => {
            unregisterDropZone(node, config.type);
            dzToConfig.delete(node);
            dzToHandles.delete(node);
        }
    };
    dzToHandles.set(node, handles);
    return handles;
}

/**
 * A custom action to turn any container to a dnd zone and all of its direct children to draggables
 * Supports mouse, touch and keyboard interactions.
 * Dispatches two events that the container is expected to react to by modifying its list of items,
 * which will then feed back in to this action via the update function
 *
 * @typedef {object} Options
 * @property {array} items - the list of items that was used to generate the children of the given node (the list used in the #each block
 * @property {string} [type] - the type of the dnd zone. children dragged from here can only be dropped in other zones of the same type, default to a base type
 * @property {number} [flipDurationMs] - if the list animated using flip (recommended), specifies the flip duration such that everything syncs with it without conflict, defaults to zero
 * @property {boolean} [dragDisabled]
 * @property {boolean} [morphDisabled] - whether dragged element should morph to zone dimensions
 * @property {boolean} [dropFromOthersDisabled]
 * @property {object} [dropTargetStyle]
 * @property {string[]} [dropTargetClasses]
 * @property {function} [transformDraggedElement]
 * @param {HTMLElement} node - the element to enhance
 * @param {Options} options
 * @return {{update: function, destroy: function}}
 */
function dndzone(node, options) {
    validateOptions(options);
    const pointerZone = dndzone$2(node, options);
    const keyboardZone = dndzone$1(node, options);
    return {
        update: newOptions => {
            validateOptions(newOptions);
            pointerZone.update(newOptions);
            keyboardZone.update(newOptions);
        },
        destroy: () => {
            pointerZone.destroy();
            keyboardZone.destroy();
        }
    };
}

function validateOptions(options) {
    /*eslint-disable*/
    const {
        items,
        flipDurationMs,
        type,
        dragDisabled,
        morphDisabled,
        dropFromOthersDisabled,
        dropTargetStyle,
        dropTargetClasses,
        transformDraggedElement,
        autoAriaDisabled,
        centreDraggedOnCursor,
        ...rest
    } = options;
    /*eslint-enable*/
    if (Object.keys(rest).length > 0) {
        console.warn(`dndzone will ignore unknown options`, rest);
    }
    if (!items) {
        throw new Error("no 'items' key provided to dndzone");
    }
    const itemWithMissingId = items.find(item => !{}.hasOwnProperty.call(item, ITEM_ID_KEY));
    if (itemWithMissingId) {
        throw new Error(`missing '${ITEM_ID_KEY}' property for item ${toString(itemWithMissingId)}`);
    }
    if (dropTargetClasses && !Array.isArray(dropTargetClasses)) {
        throw new Error(`dropTargetClasses should be an array but instead it is a ${typeof dropTargetClasses}, ${toString(dropTargetClasses)}`);
    }
}

/* src/ui/settings/DragHandle.svelte generated by Svelte v3.37.0 */

function add_css$4() {
	var style = element$1("style");
	style.id = "svelte-m1gtpn-style";
	style.textContent = ".handle.svelte-m1gtpn.svelte-m1gtpn{color:var(--background-modifier-border);height:16px;margin-right:8px;width:16px}.active .handle.svelte-m1gtpn.svelte-m1gtpn{color:var(--text-accent-hover)}.handle.svelte-m1gtpn svg.svelte-m1gtpn{width:16px;height:16px}";
	append$1(document.head, style);
}

function create_fragment$8(ctx) {
	let div;
	let svg;
	let circle0;
	let circle1;
	let circle2;
	let circle3;
	let circle4;
	let circle5;
	let div_style_value;
	let mounted;
	let dispose;

	return {
		c() {
			div = element$1("div");
			svg = svg_element$1("svg");
			circle0 = svg_element$1("circle");
			circle1 = svg_element$1("circle");
			circle2 = svg_element$1("circle");
			circle3 = svg_element$1("circle");
			circle4 = svg_element$1("circle");
			circle5 = svg_element$1("circle");
			attr$1(circle0, "cx", "3.13232");
			attr$1(circle0, "cy", "3.64536");
			attr$1(circle0, "r", "3");
			attr$1(circle0, "fill", "currentColor");
			attr$1(circle1, "cx", "13.167");
			attr$1(circle1, "cy", "3.64536");
			attr$1(circle1, "r", "3");
			attr$1(circle1, "fill", "currentColor");
			attr$1(circle2, "cx", "3.13232");
			attr$1(circle2, "cy", "15.8953");
			attr$1(circle2, "r", "3");
			attr$1(circle2, "fill", "currentColor");
			attr$1(circle3, "cx", "13.167");
			attr$1(circle3, "cy", "15.8953");
			attr$1(circle3, "r", "3");
			attr$1(circle3, "fill", "currentColor");
			attr$1(circle4, "cx", "3.13232");
			attr$1(circle4, "cy", "28.1452");
			attr$1(circle4, "r", "3");
			attr$1(circle4, "fill", "currentColor");
			attr$1(circle5, "cx", "13.167");
			attr$1(circle5, "cy", "28.1452");
			attr$1(circle5, "r", "3");
			attr$1(circle5, "fill", "currentColor");
			attr$1(svg, "fill", "none");
			attr$1(svg, "height", "32");
			attr$1(svg, "viewBox", "0 0 17 32");
			attr$1(svg, "width", "17");
			attr$1(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr$1(svg, "class", "svelte-m1gtpn");
			attr$1(div, "aria-label", "Drag to rearrange");

			attr$1(div, "style", div_style_value = /*dragDisabled*/ ctx[0]
			? "cursor: grab"
			: "cursor: grabbing");

			attr$1(div, "class", "handle svelte-m1gtpn");
		},
		m(target, anchor) {
			insert$1(target, div, anchor);
			append$1(div, svg);
			append$1(svg, circle0);
			append$1(svg, circle1);
			append$1(svg, circle2);
			append$1(svg, circle3);
			append$1(svg, circle4);
			append$1(svg, circle5);

			if (!mounted) {
				dispose = [
					listen$1(div, "mousedown", function () {
						if (is_function$1(/*startDrag*/ ctx[1])) /*startDrag*/ ctx[1].apply(this, arguments);
					}),
					listen$1(div, "touchstart", function () {
						if (is_function$1(/*startDrag*/ ctx[1])) /*startDrag*/ ctx[1].apply(this, arguments);
					}),
					listen$1(div, "keydown", function () {
						if (is_function$1(/*handleKeyDown*/ ctx[2])) /*handleKeyDown*/ ctx[2].apply(this, arguments);
					})
				];

				mounted = true;
			}
		},
		p(new_ctx, [dirty]) {
			ctx = new_ctx;

			if (dirty & /*dragDisabled*/ 1 && div_style_value !== (div_style_value = /*dragDisabled*/ ctx[0]
			? "cursor: grab"
			: "cursor: grabbing")) {
				attr$1(div, "style", div_style_value);
			}
		},
		i: noop$1,
		o: noop$1,
		d(detaching) {
			if (detaching) detach$1(div);
			mounted = false;
			run_all$1(dispose);
		}
	};
}

function instance$8($$self, $$props, $$invalidate) {
	let { dragDisabled } = $$props;
	let { startDrag } = $$props;
	let { handleKeyDown } = $$props;

	$$self.$$set = $$props => {
		if ("dragDisabled" in $$props) $$invalidate(0, dragDisabled = $$props.dragDisabled);
		if ("startDrag" in $$props) $$invalidate(1, startDrag = $$props.startDrag);
		if ("handleKeyDown" in $$props) $$invalidate(2, handleKeyDown = $$props.handleKeyDown);
	};

	return [dragDisabled, startDrag, handleKeyDown];
}

class DragHandle extends SvelteComponent$1 {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-m1gtpn-style")) add_css$4();

		init$1(this, options, instance$8, create_fragment$8, safe_not_equal$1, {
			dragDisabled: 0,
			startDrag: 1,
			handleKeyDown: 2
		});
	}
}

/* eslint-disable */
function clickOutside(node, onEventFunction) {
  const handleClick = (event) => {
    var path = event.composedPath();

    if (!path.includes(node)) {
      onEventFunction();
    }
  };

  document.addEventListener("click", handleClick);

  return {
    destroy() {
      document.removeEventListener("click", handleClick);
    },
  };
}
/* eslint-enable */

const colors = {
    Gruvbox: [
        [
            { value: "#282828", name: "dark0" },
            { value: "#32302f", name: "dark0-soft" },
            { value: "#3c3836", name: "dark1" },
            { value: "#504945", name: "dark2" },
            { value: "#665c54", name: "dark3" },
            { value: "#7c6f64", name: "dark4" },
            { value: "#928374", name: "gray" },
            { value: "#f9f5d7", name: "light0-hard" },
            { value: "#fbf1c7", name: "light0" },
            { value: "#f2e5bc", name: "light0-soft" },
            { value: "#ebdbb2", name: "light1" },
            { value: "#d5c4a1", name: "light2" },
            { value: "#bdae93", name: "light3" },
            { value: "#a89984", name: "light4" },
        ],
        [
            { name: "bright-red", value: "#fb4934" },
            { name: "bright-green", value: "#b8bb26" },
            { name: "bright-yellow", value: "#fabd2f" },
            { name: "bright-blue", value: "#83a598" },
            { name: "bright-purple", value: "#d3869b" },
            { name: "bright-aqua", value: "#8ec07c" },
            { name: "bright-orange", value: "#fe8019" },
        ],
        [
            { name: "neutral-red", value: "#cc241d" },
            { name: "neutral-green", value: "#98971a" },
            { name: "neutral-yellow", value: "#d79921" },
            { name: "neutral-blue", value: "#458588" },
            { name: "neutral-purple", value: "#b16286" },
            { name: "neutral-aqua", value: "#689d6a" },
            { name: "neutral-orange", value: "#d65d0e" },
        ],
        [
            { name: "faded-red", value: "#9d0006" },
            { name: "faded-green", value: "#79740e" },
            { name: "faded-yellow", value: "#b57614" },
            { name: "faded-blue", value: "#076678" },
            { name: "faded-purple", value: "#8f3f71" },
            { name: "faded-aqua", value: "#427b58" },
            { name: "faded-orange", value: "#af3a03" },
        ],
    ],
    Nord: [
        [
            { value: "#2e3440", name: "Gunmetal" },
            { value: "#3b4252", name: "Bright Gray" },
            { value: "#434c5e", name: "River Bed" },
            { value: "#4c566a", name: "Easy Bay" },
            { value: "#d8dee9", name: "Hawkes Blue" },
            { value: "#e5e9f0", name: "Mystic" },
            { value: "#eceff4", name: "Athens Gray" },
        ],
        [
            { value: "#bf616a", name: "Contessa" },
            { value: "#d08770", name: "Feldspar" },
            { value: "#ebcb8b", name: "Putty" },
            { value: "#a3be8c", name: "Norway" },
            { value: "#b48ead", name: "London Hue" },
        ],
        [
            { value: "#8fbcbb", name: "Shadow Green" },
            { value: "#88c0d0", name: "Half Baked" },
            { value: "#81a1c1", name: "Dark Pastel Blue" },
            { value: "#5e81ac", name: "Air Force Blue" },
        ],
        [
            { value: "#292e39", name: "Black Rock" },
            { value: "#abb9cf", name: "Casper" },
        ],
    ],
    Default: [
        [
            { value: "#197300", name: "Japanese Laurel" },
            { value: "#483699", name: "Blue Gem" },
            { value: "#7f6df2", name: "Medium Slate Blue" },
            { value: "#990000", name: "Ou Crimson Red" },
            { value: "#2a2a2a", name: "Jaguar" },
            { value: "#303030", name: "Code Gray" },
            { value: "#333333", name: "Mineshaft" },
            { value: "#4d3ca6", name: "Gigas" },
            { value: "#666666", name: "Steel" },
            { value: "#999999", name: "Aluminium" },
            { value: "#DCDDDE", name: "Athens Gray" },
            { value: "#FF3333", name: "Red Orange" },
            { value: "#FF999040", name: "Mona Lisa 40%" },
            { value: "#FFFF0040", name: "Yellow 40%" },
        ],
    ],
    Minimal: [
        [
            { value: "#ffffff", name: "White" },
            { value: "#d4d4d4", name: "Light Gray" },
            { value: "#556b77", name: "Dark Electric Blue" },
            { value: "#5c5c5c", name: "Chicago" },
            { value: "#414141", name: "Charcoal" },
            { value: "#1d1d1d", name: "Dark Jungle Green" },
        ],
        [{ value: "#fc3233", name: "Red Orange" }],
    ],
    "Clair de Lune": [
        [
            { name: "background-secondary", value: "#1e2030" },
            { name: "background-tag", value: "#131421" },
            { name: "background-quick", value: "#191a2a" },
        ],
        [
            { name: "interactive-hover", value: "#2f334d" },
            { name: "interactive-accent", value: "#444a73" },
            { name: "interactive-accent-hover", value: "#828bb8" },
            { name: "text-accent", value: "#50c4fa" },
            { name: "text-muted", value: "#a9b8e8" },
            { name: "text-normal", value: "#c8d3f5" },
            { name: "text-on-accent", value: "#e2e8fa" },
            { name: "text-tag", value: "#7a88cf" },
            { name: "text-error", value: "#ff98a4" },
        ],
    ],
};
function getPaletteNames() {
    return Object.keys(colors);
}
function getPaletteName(themeName) {
    const palette = colors[themeName];
    // Exact match
    if (palette) {
        return themeName;
    }
    // Partial matches
    if (themeName.toLowerCase().contains("gruvbox")) {
        return "Gruvbox";
    }
    if (themeName.toLowerCase().contains("nord") ||
        themeName.toLowerCase().contains("stormcloak")) {
        return "Nord";
    }
    return "Default";
}
function getColors(paletteName) {
    return colors[paletteName];
}

/* src/ui/settings/palette/Palette.svelte generated by Svelte v3.37.0 */

function add_css$3() {
	var style = element$1("style");
	style.id = "svelte-1d1m25g-style";
	style.textContent = ".container.svelte-1d1m25g{display:flex;flex-direction:column;gap:8px}.palette-bottom-bar.svelte-1d1m25g{display:flex;gap:8px;margin-top:8px}.palette-dropdown.svelte-1d1m25g{background-color:var(--background-primary);font-size:14px;padding:0.3em 1.5em 0.3em 0.8em}.hex-input.svelte-1d1m25g{font-size:14px;background-color:var(--background-primary);width:100%}.palette.svelte-1d1m25g{display:flex;gap:8px;flex-wrap:wrap;flex-direction:row}.is-mobile .palette.svelte-1d1m25g{gap:12px}.opacity-grid.svelte-1d1m25g,.swatch.svelte-1d1m25g{border:1px solid var(--background-modifier-border);border-radius:50%;cursor:pointer;display:flex;height:24px;width:24px}.is-mobile .opacity-grid.svelte-1d1m25g,.is-mobile .swatch.svelte-1d1m25g{height:36px;width:36px}.swatch.svelte-1d1m25g{position:absolute}.swatch.svelte-1d1m25g:hover{border:1px solid var(--text-muted)}.opacity-grid.svelte-1d1m25g{background-image:linear-gradient(45deg, #808080 25%, transparent 25%),\n      linear-gradient(-45deg, #808080 25%, transparent 25%),\n      linear-gradient(45deg, transparent 75%, #808080 75%),\n      linear-gradient(-45deg, transparent 75%, #808080 75%);background-size:10px 10px;background-position:0 0, 0 5px, 5px -5px, -5px 0px;border-radius:50%;border:none;position:relative}.swatch.selected.svelte-1d1m25g{border:2px solid var(--text-normal)}";
	append$1(document.head, style);
}

function get_each_context$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[11] = list[i];
	return child_ctx;
}

function get_each_context_1$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[14] = list[i];
	return child_ctx;
}

function get_each_context_2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[17] = list[i].value;
	child_ctx[18] = list[i].name;
	return child_ctx;
}

// (23:6) {#each palette as { value: hex, name }}
function create_each_block_2(ctx) {
	let div1;
	let div0;
	let div0_aria_label_value;
	let mounted;
	let dispose;

	function click_handler() {
		return /*click_handler*/ ctx[6](/*hex*/ ctx[17]);
	}

	return {
		c() {
			div1 = element$1("div");
			div0 = element$1("div");
			attr$1(div0, "aria-label", div0_aria_label_value = /*name*/ ctx[18]);
			attr$1(div0, "class", "swatch svelte-1d1m25g");
			set_style$1(div0, "background-color", /*hex*/ ctx[17]);
			toggle_class$1(div0, "selected", /*hex*/ ctx[17] === /*value*/ ctx[0]);
			attr$1(div1, "class", "opacity-grid svelte-1d1m25g");
		},
		m(target, anchor) {
			insert$1(target, div1, anchor);
			append$1(div1, div0);

			if (!mounted) {
				dispose = listen$1(div0, "click", stop_propagation(click_handler));
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty & /*swatches*/ 4 && div0_aria_label_value !== (div0_aria_label_value = /*name*/ ctx[18])) {
				attr$1(div0, "aria-label", div0_aria_label_value);
			}

			if (dirty & /*swatches*/ 4) {
				set_style$1(div0, "background-color", /*hex*/ ctx[17]);
			}

			if (dirty & /*swatches, value*/ 5) {
				toggle_class$1(div0, "selected", /*hex*/ ctx[17] === /*value*/ ctx[0]);
			}
		},
		d(detaching) {
			if (detaching) detach$1(div1);
			mounted = false;
			dispose();
		}
	};
}

// (21:2) {#each swatches as palette}
function create_each_block_1$1(ctx) {
	let div;
	let each_value_2 = /*palette*/ ctx[14];
	let each_blocks = [];

	for (let i = 0; i < each_value_2.length; i += 1) {
		each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
	}

	return {
		c() {
			div = element$1("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr$1(div, "class", "palette svelte-1d1m25g");
		},
		m(target, anchor) {
			insert$1(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}
		},
		p(ctx, dirty) {
			if (dirty & /*swatches, value, selectSwatch*/ 13) {
				each_value_2 = /*palette*/ ctx[14];
				let i;

				for (i = 0; i < each_value_2.length; i += 1) {
					const child_ctx = get_each_context_2(ctx, each_value_2, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_2(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_2.length;
			}
		},
		d(detaching) {
			if (detaching) detach$1(div);
			destroy_each$1(each_blocks, detaching);
		}
	};
}

// (38:6) {#each getPaletteNames() as paletteOption}
function create_each_block$2(ctx) {
	let option;
	let t0_value = /*paletteOption*/ ctx[11] + "";
	let t0;
	let t1;

	return {
		c() {
			option = element$1("option");
			t0 = text$1(t0_value);
			t1 = text$1(" palette");
			option.__value = /*paletteOption*/ ctx[11];
			option.value = option.__value;
		},
		m(target, anchor) {
			insert$1(target, option, anchor);
			append$1(option, t0);
			append$1(option, t1);
		},
		p: noop$1,
		d(detaching) {
			if (detaching) detach$1(option);
		}
	};
}

function create_fragment$7(ctx) {
	let div1;
	let t0;
	let div0;
	let select;
	let t1;
	let input;
	let mounted;
	let dispose;
	let each_value_1 = /*swatches*/ ctx[2];
	let each_blocks_1 = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks_1[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
	}

	let each_value = getPaletteNames();
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
	}

	return {
		c() {
			div1 = element$1("div");

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			t0 = space$1();
			div0 = element$1("div");
			select = element$1("select");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t1 = space$1();
			input = element$1("input");
			attr$1(select, "class", "dropdown palette-dropdown svelte-1d1m25g");
			if (/*activePalette*/ ctx[1] === void 0) add_render_callback$1(() => /*select_change_handler*/ ctx[7].call(select));
			attr$1(input, "class", "hex-input svelte-1d1m25g");
			attr$1(input, "type", "text");
			attr$1(div0, "class", "palette-bottom-bar svelte-1d1m25g");
			attr$1(div1, "class", "container svelte-1d1m25g");
		},
		m(target, anchor) {
			insert$1(target, div1, anchor);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].m(div1, null);
			}

			append$1(div1, t0);
			append$1(div1, div0);
			append$1(div0, select);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(select, null);
			}

			select_option(select, /*activePalette*/ ctx[1]);
			append$1(div0, t1);
			append$1(div0, input);
			set_input_value(input, /*value*/ ctx[0]);

			if (!mounted) {
				dispose = [
					listen$1(select, "change", /*select_change_handler*/ ctx[7]),
					listen$1(input, "input", /*input_input_handler*/ ctx[8])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*swatches, value, selectSwatch*/ 13) {
				each_value_1 = /*swatches*/ ctx[2];
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
					} else {
						each_blocks_1[i] = create_each_block_1$1(child_ctx);
						each_blocks_1[i].c();
						each_blocks_1[i].m(div1, t0);
					}
				}

				for (; i < each_blocks_1.length; i += 1) {
					each_blocks_1[i].d(1);
				}

				each_blocks_1.length = each_value_1.length;
			}

			if (dirty & /*getPaletteNames*/ 0) {
				each_value = getPaletteNames();
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$2(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$2(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(select, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (dirty & /*activePalette, getPaletteNames*/ 2) {
				select_option(select, /*activePalette*/ ctx[1]);
			}

			if (dirty & /*value*/ 1 && input.value !== /*value*/ ctx[0]) {
				set_input_value(input, /*value*/ ctx[0]);
			}
		},
		i: noop$1,
		o: noop$1,
		d(detaching) {
			if (detaching) detach$1(div1);
			destroy_each$1(each_blocks_1, detaching);
			destroy_each$1(each_blocks, detaching);
			mounted = false;
			run_all$1(dispose);
		}
	};
}

function instance$7($$self, $$props, $$invalidate) {
	let { value } = $$props;
	let { close } = $$props;
	let { setValue } = $$props;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const theme = window.app.customCss.theme;

	let activePalette = getPaletteName(theme);
	let swatches;
	const dispatch = createEventDispatcher$1();

	function selectSwatch(swatch) {
		$$invalidate(0, value = swatch);
		dispatch("input", swatch);

		setValue === null || setValue === void 0
		? void 0
		: setValue(swatch);

		close();
	}

	const click_handler = hex => selectSwatch(hex);

	function select_change_handler() {
		activePalette = select_value(this);
		$$invalidate(1, activePalette);
	}

	function input_input_handler() {
		value = this.value;
		$$invalidate(0, value);
	}

	$$self.$$set = $$props => {
		if ("value" in $$props) $$invalidate(0, value = $$props.value);
		if ("close" in $$props) $$invalidate(4, close = $$props.close);
		if ("setValue" in $$props) $$invalidate(5, setValue = $$props.setValue);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*activePalette*/ 2) {
			$$invalidate(2, swatches = getColors(activePalette));
		}
	};

	return [
		value,
		activePalette,
		swatches,
		selectSwatch,
		close,
		setValue,
		click_handler,
		select_change_handler,
		input_input_handler
	];
}

class Palette extends SvelteComponent$1 {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-1d1m25g-style")) add_css$3();
		init$1(this, options, instance$7, create_fragment$7, safe_not_equal$1, { value: 0, close: 4, setValue: 5 });
	}
}

var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}

function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect$2(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }

      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


var applyStyles$1 = {
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect$2,
  requires: ['computeStyles']
};

function getBasePlacement(placement) {
  return placement.split('-')[0];
}

function getBoundingClientRect(element) {
  var rect = element.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    x: rect.left,
    y: rect.top
  };
}

// means it doesn't take into account transforms.

function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;

  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }

  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }

  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}

function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && isShadowRoot(rootNode)) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe[prop-missing]: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}

function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
}

function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}

function getParentNode(element) {
  if (getNodeName(element) === 'html') {
    return element;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || ( // DOM Element detected
    isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element) // fallback

  );
}

function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle$1(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
  var isIE = navigator.userAgent.indexOf('Trident') !== -1;

  if (isIE && isHTMLElement(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = getComputedStyle$1(element);

    if (elementCss.position === 'fixed') {
      return null;
    }
  }

  var currentNode = getParentNode(element);

  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static')) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

var max = Math.max;
var min = Math.min;
var round = Math.round;

function within(min$1, value, max$1) {
  return max(min$1, min(value, max$1));
}

function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}

function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

var toPaddingObject = function toPaddingObject(padding, state) {
  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name,
      options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === 'y' ? top : left;
  var maxProp = axis === 'y' ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function effect$1(_ref2) {
  var state = _ref2.state,
      options = _ref2.options;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (process.env.NODE_ENV !== "production") {
    if (!isHTMLElement(arrowElement)) {
      console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', 'To use an SVG arrow, wrap it in an HTMLElement that will be used as', 'the arrow.'].join(' '));
    }
  }

  if (!contains(state.elements.popper, arrowElement)) {
    if (process.env.NODE_ENV !== "production") {
      console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', 'element.'].join(' '));
    }

    return;
  }

  state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules


var arrow$1 = {
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect$1,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
};

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref) {
  var x = _ref.x,
      y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(round(x * dpr) / dpr) || 0,
    y: round(round(y * dpr) / dpr) || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets;

  var _ref3 = roundOffsets === true ? roundOffsetsByDPR(offsets) : typeof roundOffsets === 'function' ? roundOffsets(offsets) : offsets,
      _ref3$x = _ref3.x,
      x = _ref3$x === void 0 ? 0 : _ref3$x,
      _ref3$y = _ref3.y,
      y = _ref3$y === void 0 ? 0 : _ref3$y;

  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = left;
  var sideY = top;
  var win = window;

  if (adaptive) {
    var offsetParent = getOffsetParent(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';

    if (offsetParent === getWindow(popper)) {
      offsetParent = getDocumentElement(popper);

      if (getComputedStyle$1(offsetParent).position !== 'static') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


    offsetParent = offsetParent;

    if (placement === top) {
      sideY = bottom; // $FlowFixMe[prop-missing]

      y -= offsetParent[heightProp] - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === left) {
      sideX = right; // $FlowFixMe[prop-missing]

      x -= offsetParent[widthProp] - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) < 2 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref4) {
  var state = _ref4.state,
      options = _ref4.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

  if (process.env.NODE_ENV !== "production") {
    var transitionProperty = getComputedStyle$1(state.elements.popper).transitionProperty || '';

    if (adaptive && ['transform', 'top', 'right', 'bottom', 'left'].some(function (property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(['Popper: Detected CSS transitions on at least one of the following', 'CSS properties: "transform", "top", "right", "bottom", "left".', '\n\n', 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', 'for smooth transitions, or remove these properties from the CSS', 'transition declaration on the popper element if only transitioning', 'opacity or background-color for example.', '\n\n', 'We recommend using the popper element as a wrapper around an inner', 'element that can have any CSS property transitioned for animations.'].join(' '));
    }
  }

  var commonStyles = {
    placement: getBasePlacement(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


var computeStyles$1 = {
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
};

var passive = {
  passive: true
};

function effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


var eventListeners = {
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
};

var hash$1 = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash$1[matched];
  });
}

var hash = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash[matched];
  });
}

function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

function getViewportRect(element) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
  // can be obscured underneath it.
  // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
  // if it isn't open, so if this isn't available, the popper will be detected
  // to overflow the bottom of the screen too early.

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
    // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
    // errors due to floating point numbers, so we need to check precision.
    // Safari returns a number <= 0, usually < -1 when pinch-zoomed
    // Feature detection fails in mobile emulation mode in Chrome.
    // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
    // 0.001
    // Fallback here: "Not Safari" userAgent

    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + getWindowScrollBarX(element),
    y: y
  };
}

// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;

  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;

  if (getComputedStyle$1(body || html).direction === 'rtl') {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = getComputedStyle$1(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }

  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }

  return getScrollParent(getParentNode(node));
}

/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents(element, list) {
  var _element$ownerDocumen;

  if (list === void 0) {
    list = [];
  }

  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents(getParentNode(target)));
}

function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

function getInnerBoundingClientRect(element) {
  var rect = getBoundingClientRect(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isHTMLElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = listScrollParents(getParentNode(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

  if (!isElement(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

function getVariation(placement) {
  return placement.split('-')[1];
}

function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;

      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;
    }
  }

  return offsets;
}

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var referenceElement = state.elements.reference;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = getBoundingClientRect(referenceElement);
  var popperOffsets = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}

function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
    return getVariation(placement) === variation;
  }) : basePlacements;
  var allowedPlacements = placements$1.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements$1;

    if (process.env.NODE_ENV !== "production") {
      console.error(['Popper: The `allowedAutoPlacements` option did not allow any', 'placements. Ensure the `placement` option matches the variation', 'of the allowed placements.', 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(' '));
    }
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[getBasePlacement(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }

  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = getBasePlacement(placement);

    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }

    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


var flip$1 = {
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
};

function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


var hide$1 = {
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
};

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


var offset$1 = {
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
};

function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


var popperOffsets$1 = {
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
};

function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis || checkAltAxis) {
    var mainSide = mainAxis === 'y' ? top : left;
    var altSide = mainAxis === 'y' ? bottom : right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min$1 = popperOffsets[mainAxis] + overflow[mainSide];
    var max$1 = popperOffsets[mainAxis] - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
    var tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;

    if (checkMainAxis) {
      var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
      popperOffsets[mainAxis] = preventedOffset;
      data[mainAxis] = preventedOffset - offset;
    }

    if (checkAltAxis) {
      var _mainSide = mainAxis === 'x' ? top : left;

      var _altSide = mainAxis === 'x' ? bottom : right;

      var _offset = popperOffsets[altAxis];

      var _min = _offset + overflow[_mainSide];

      var _max = _offset - overflow[_altSide];

      var _preventedOffset = within(tether ? min(_min, tetherMin) : _min, _offset, tether ? max(_max, tetherMax) : _max);

      popperOffsets[altAxis] = _preventedOffset;
      data[altAxis] = _preventedOffset - _offset;
    }
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


var preventOverflow$1 = {
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
};

function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

// Composite means it takes into account transforms as well as layout.

function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement);
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }

    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

function format(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return [].concat(args).reduce(function (p, c) {
    return p.replace(/%s/, c);
  }, str);
}

var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
function validateModifiers(modifiers) {
  modifiers.forEach(function (modifier) {
    Object.keys(modifier).forEach(function (key) {
      switch (key) {
        case 'name':
          if (typeof modifier.name !== 'string') {
            console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
          }

          break;

        case 'enabled':
          if (typeof modifier.enabled !== 'boolean') {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
          }

        case 'phase':
          if (modifierPhases.indexOf(modifier.phase) < 0) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(', '), "\"" + String(modifier.phase) + "\""));
          }

          break;

        case 'fn':
          if (typeof modifier.fn !== 'function') {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'effect':
          if (typeof modifier.effect !== 'function') {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'requires':
          if (!Array.isArray(modifier.requires)) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
          }

          break;

        case 'requiresIfExists':
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
          }

          break;

        case 'options':
        case 'data':
          break;

        default:
          console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function (s) {
            return "\"" + s + "\"";
          }).join(', ') + "; but \"" + key + "\" was provided.");
      }

      modifier.requires && modifier.requires.forEach(function (requirement) {
        if (modifiers.find(function (mod) {
          return mod.name === requirement;
        }) == null) {
          console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}

function uniqueBy(arr, fn) {
  var identifiers = new Set();
  return arr.filter(function (item) {
    var identifier = fn(item);

    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}

function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(options) {
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
          popper: listScrollParents(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned
        // if one of the modifiers is invalid for any reason

        if (process.env.NODE_ENV !== "production") {
          var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function (_ref) {
            var name = _ref.name;
            return name;
          });
          validateModifiers(modifiers);

          if (getBasePlacement(state.options.placement) === auto) {
            var flipModifier = state.orderedModifiers.find(function (_ref2) {
              var name = _ref2.name;
              return name === 'flip';
            });

            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', 'present and enabled to work.'].join(' '));
            }
          }

          var _getComputedStyle = getComputedStyle$1(popper),
              marginTop = _getComputedStyle.marginTop,
              marginRight = _getComputedStyle.marginRight,
              marginBottom = _getComputedStyle.marginBottom,
              marginLeft = _getComputedStyle.marginLeft; // We no longer take into account `margins` on the popper, and it can
          // cause bugs with positioning, so we'll warn the consumer


          if ([marginTop, marginRight, marginBottom, marginLeft].some(function (margin) {
            return parseFloat(margin);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', 'between the popper and its reference element or boundary.', 'To replicate margin, use the `offset` modifier, as well as', 'the `padding` option in the `preventOverflow` and `flip`', 'modifiers.'].join(' '));
          }
        }

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          if (process.env.NODE_ENV !== "production") {
            console.error(INVALID_ELEMENT_ERROR);
          }

          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
          popper: getLayoutRect(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;

        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (process.env.NODE_ENV !== "production") {
            __debug_loops__ += 1;

            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {
      if (process.env.NODE_ENV !== "production") {
        console.error(INVALID_ELEMENT_ERROR);
      }

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}

var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
var createPopper = /*#__PURE__*/popperGenerator({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

/* node_modules/@popperjs/svelte/src/Popper.svelte generated by Svelte v3.37.0 */

function create_fragment$6(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[12].default;
	const default_slot = create_slot$1(default_slot_template, ctx, /*$$scope*/ ctx[11], null);

	return {
		c() {
			if (default_slot) default_slot.c();
		},
		m(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && dirty & /*$$scope*/ 2048) {
					update_slot$1(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[11], dirty, null, null);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in$1(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out$1(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};
}

function instance$6($$self, $$props, $$invalidate) {
	let $store,
		$$unsubscribe_store = noop$1,
		$$subscribe_store = () => ($$unsubscribe_store(), $$unsubscribe_store = subscribe$1(store, $$value => $$invalidate(10, $store = $$value)), store);

	$$self.$$.on_destroy.push(() => $$unsubscribe_store());
	let { $$slots: slots = {}, $$scope } = $$props;
	let { reference: referenceElement } = $$props;
	let { popper: popperElement } = $$props;
	let { options = {} } = $$props;
	const store = writable$1({});
	$$subscribe_store();
	let previousReferenceElement;
	let previousPopperElement;
	let popperInstance;

	const updateStateModifier = {
		name: "updateState",
		enabled: true,
		phase: "write",
		fn: ({ state }) => store.set(state)
	};

	onDestroy$1(() => {
		popperInstance && popperInstance.destroy();
		$$invalidate(9, popperInstance = null);
	});

	let { styles = {} } = $$props;
	let { attributes = {} } = $$props;
	let { state = {} } = $$props;

	$$self.$$set = $$props => {
		if ("reference" in $$props) $$invalidate(4, referenceElement = $$props.reference);
		if ("popper" in $$props) $$invalidate(5, popperElement = $$props.popper);
		if ("options" in $$props) $$invalidate(6, options = $$props.options);
		if ("styles" in $$props) $$invalidate(1, styles = $$props.styles);
		if ("attributes" in $$props) $$invalidate(2, attributes = $$props.attributes);
		if ("state" in $$props) $$invalidate(3, state = $$props.state);
		if ("$$scope" in $$props) $$invalidate(11, $$scope = $$props.$$scope);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*previousPopperElement, popperElement, previousReferenceElement, referenceElement, popperInstance, options*/ 1008) {
			(async () => {
				if (previousPopperElement != popperElement || previousReferenceElement != referenceElement) {
					await tick$1();
					popperInstance && popperInstance.destroy();

					if (referenceElement != null && popperElement != null) {
						$$invalidate(9, popperInstance = createPopper(referenceElement, popperElement, {
							...options,
							modifiers: [
								...options.modifiers,
								updateStateModifier,
								{ name: "applyStyles", enabled: false }
							]
						}));

						$$invalidate(8, previousPopperElement = popperElement);
						$$invalidate(7, previousReferenceElement = referenceElement);
					}
				}
			})();
		}

		if ($$self.$$.dirty & /*popperInstance, options*/ 576) {
			{
				if (popperInstance != null) {
					popperInstance.setOptions({
						...options,
						modifiers: [
							...options.modifiers,
							updateStateModifier,
							{ name: "applyStyles", enabled: false }
						]
					});
				}
			}
		}

		if ($$self.$$.dirty & /*$store*/ 1024) {
			$$invalidate(1, styles = $store.styles || {});
		}

		if ($$self.$$.dirty & /*$store*/ 1024) {
			$$invalidate(2, attributes = $store.attributes || {});
		}

		if ($$self.$$.dirty & /*$store*/ 1024) {
			$$invalidate(3, state = $store);
		}
	};

	return [
		store,
		styles,
		attributes,
		state,
		referenceElement,
		popperElement,
		options,
		previousReferenceElement,
		previousPopperElement,
		popperInstance,
		$store,
		$$scope,
		slots
	];
}

class Popper extends SvelteComponent$1 {
	constructor(options) {
		super();

		init$1(this, options, instance$6, create_fragment$6, safe_not_equal$1, {
			reference: 4,
			popper: 5,
			options: 6,
			store: 0,
			styles: 1,
			attributes: 2,
			state: 3
		});
	}

	get store() {
		return this.$$.ctx[0];
	}
}

/* src/ui/settings/palette/Popper.svelte generated by Svelte v3.37.0 */

function add_css$2() {
	var style = element$1("style");
	style.id = "svelte-1tkxxcu-style";
	style.textContent = ".popper.svelte-1tkxxcu{cursor:default;transition:opacity 0.1s ease-in;opacity:0;position:absolute;z-index:var(--layer-popover)}.popper.visible.svelte-1tkxxcu{opacity:1}";
	append$1(document.head, style);
}

// (29:0) <Popper   reference={referenceElement}   popper={popperElement}   options={popperOptions}   bind:styles   bind:attributes >
function create_default_slot$1(ctx) {
	let div;
	let div_style_value;
	let current;
	const default_slot_template = /*#slots*/ ctx[8].default;
	const default_slot = create_slot$1(default_slot_template, ctx, /*$$scope*/ ctx[12], null);

	let div_levels = [
		{ class: "popper" },
		{
			style: div_style_value = /*css*/ ctx[6](/*styles*/ ctx[3].popper)
		},
		/*attributes*/ ctx[4].popper
	];

	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign$1(div_data, div_levels[i]);
	}

	return {
		c() {
			div = element$1("div");
			if (default_slot) default_slot.c();
			set_attributes$1(div, div_data);
			toggle_class$1(div, "visible", !!/*referenceElement*/ ctx[1] && /*isVisible*/ ctx[0]);
			toggle_class$1(div, "svelte-1tkxxcu", true);
		},
		m(target, anchor) {
			insert$1(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			/*div_binding*/ ctx[9](div);
			current = true;
		},
		p(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && dirty & /*$$scope*/ 4096) {
					update_slot$1(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[12], dirty, null, null);
				}
			}

			set_attributes$1(div, div_data = get_spread_update$1(div_levels, [
				{ class: "popper" },
				(!current || dirty & /*styles*/ 8 && div_style_value !== (div_style_value = /*css*/ ctx[6](/*styles*/ ctx[3].popper))) && { style: div_style_value },
				dirty & /*attributes*/ 16 && /*attributes*/ ctx[4].popper
			]));

			toggle_class$1(div, "visible", !!/*referenceElement*/ ctx[1] && /*isVisible*/ ctx[0]);
			toggle_class$1(div, "svelte-1tkxxcu", true);
		},
		i(local) {
			if (current) return;
			transition_in$1(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out$1(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach$1(div);
			if (default_slot) default_slot.d(detaching);
			/*div_binding*/ ctx[9](null);
		}
	};
}

function create_fragment$5(ctx) {
	let popper;
	let updating_styles;
	let updating_attributes;
	let current;

	function popper_styles_binding(value) {
		/*popper_styles_binding*/ ctx[10](value);
	}

	function popper_attributes_binding(value) {
		/*popper_attributes_binding*/ ctx[11](value);
	}

	let popper_props = {
		reference: /*referenceElement*/ ctx[1],
		popper: /*popperElement*/ ctx[2],
		options: /*popperOptions*/ ctx[5],
		$$slots: { default: [create_default_slot$1] },
		$$scope: { ctx }
	};

	if (/*styles*/ ctx[3] !== void 0) {
		popper_props.styles = /*styles*/ ctx[3];
	}

	if (/*attributes*/ ctx[4] !== void 0) {
		popper_props.attributes = /*attributes*/ ctx[4];
	}

	popper = new Popper({ props: popper_props });
	binding_callbacks$1.push(() => bind$1(popper, "styles", popper_styles_binding));
	binding_callbacks$1.push(() => bind$1(popper, "attributes", popper_attributes_binding));

	return {
		c() {
			create_component$1(popper.$$.fragment);
		},
		m(target, anchor) {
			mount_component$1(popper, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const popper_changes = {};
			if (dirty & /*referenceElement*/ 2) popper_changes.reference = /*referenceElement*/ ctx[1];
			if (dirty & /*popperElement*/ 4) popper_changes.popper = /*popperElement*/ ctx[2];
			if (dirty & /*popperOptions*/ 32) popper_changes.options = /*popperOptions*/ ctx[5];

			if (dirty & /*$$scope, styles, attributes, popperElement, referenceElement, isVisible*/ 4127) {
				popper_changes.$$scope = { dirty, ctx };
			}

			if (!updating_styles && dirty & /*styles*/ 8) {
				updating_styles = true;
				popper_changes.styles = /*styles*/ ctx[3];
				add_flush_callback$1(() => updating_styles = false);
			}

			if (!updating_attributes && dirty & /*attributes*/ 16) {
				updating_attributes = true;
				popper_changes.attributes = /*attributes*/ ctx[4];
				add_flush_callback$1(() => updating_attributes = false);
			}

			popper.$set(popper_changes);
		},
		i(local) {
			if (current) return;
			transition_in$1(popper.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out$1(popper.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component$1(popper, detaching);
		}
	};
}

function instance$5($$self, $$props, $$invalidate) {
	let popperOptions;
	let { $$slots: slots = {}, $$scope } = $$props;
	const css = obj => Object.entries(obj || {}).map(x => x.join(":")).join(";");
	let { isVisible } = $$props;
	let { referenceElement } = $$props;
	let { placement = "bottom-end" } = $$props;
	let popperElement;

	// bound variables where Popper will store styles and attributes
	let styles = {};

	let attributes = {};

	function div_binding($$value) {
		binding_callbacks$1[$$value ? "unshift" : "push"](() => {
			popperElement = $$value;
			$$invalidate(2, popperElement);
		});
	}

	function popper_styles_binding(value) {
		styles = value;
		$$invalidate(3, styles);
	}

	function popper_attributes_binding(value) {
		attributes = value;
		$$invalidate(4, attributes);
	}

	$$self.$$set = $$props => {
		if ("isVisible" in $$props) $$invalidate(0, isVisible = $$props.isVisible);
		if ("referenceElement" in $$props) $$invalidate(1, referenceElement = $$props.referenceElement);
		if ("placement" in $$props) $$invalidate(7, placement = $$props.placement);
		if ("$$scope" in $$props) $$invalidate(12, $$scope = $$props.$$scope);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*placement*/ 128) {
			$$invalidate(5, popperOptions = {
				modifiers: [
					{
						name: "offset",
						options: { offset: [0, 5] }
					},
					{ name: "hide", enabled: true }
				],
				placement
			});
		}
	};

	return [
		isVisible,
		referenceElement,
		popperElement,
		styles,
		attributes,
		popperOptions,
		css,
		placement,
		slots,
		div_binding,
		popper_styles_binding,
		popper_attributes_binding,
		$$scope
	];
}

class Popper_1 extends SvelteComponent$1 {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-1tkxxcu-style")) add_css$2();

		init$1(this, options, instance$5, create_fragment$5, safe_not_equal$1, {
			isVisible: 0,
			referenceElement: 1,
			placement: 7
		});
	}
}

class MobileColorModal extends obsidian.Modal {
    constructor(app, props) {
        super(app);
        this.close = this.close.bind(this);
        this.handleTeardown = props.close;
        this.palette = new Palette({
            target: this.contentEl,
            props: Object.assign({ isMobile: true }, props),
        });
        this.contentEl.createDiv("modal-button-container", (buttonsEl) => {
            buttonsEl
                .createEl("button", {
                cls: "mod-cta",
                text: "Close",
            })
                .addEventListener("click", this.close);
        });
    }
    onClose() {
        var _a;
        this.handleTeardown();
        (_a = this.palette) === null || _a === void 0 ? void 0 : _a.$destroy();
    }
}

/* src/ui/settings/palette/Picker.svelte generated by Svelte v3.37.0 */

function add_css$1() {
	var style = element$1("style");
	style.id = "svelte-131nkpg-style";
	style.textContent = ".picker.svelte-131nkpg{background-color:var(--background-primary);border-radius:8px;box-shadow:0 4px 12px 0 rgba(0, 0, 0, 0.25);max-width:290px;padding:12px;z-index:var(--layer-popover)}.picker-btn.svelte-131nkpg{margin-left:auto}.picker-btn.svelte-131nkpg{border:1px solid var(--background-modifier-border);border-radius:50%;cursor:pointer;display:flex;height:24px;width:24px}.is-mobile .picker-btn.svelte-131nkpg{height:32px;width:32px}.picker-btn.svelte-131nkpg:hover{border:1px solid var(--text-muted)}.picker-btn.open.svelte-131nkpg{border:2px solid var(--text-normal)}.picker-btn.highlighted.svelte-131nkpg{box-shadow:0 0 0 8px rgba(255, 255, 255, 0.15)}.picker-btn.disabled.svelte-131nkpg{background-color:transparent !important}";
	append$1(document.head, style);
}

// (44:0) {#if isVisible && !isMobile}
function create_if_block(ctx) {
	let popper;
	let current;

	popper = new Popper_1({
			props: {
				referenceElement: /*referenceElement*/ ctx[3],
				isVisible: /*isVisible*/ ctx[4],
				placement: "bottom",
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component$1(popper.$$.fragment);
		},
		m(target, anchor) {
			mount_component$1(popper, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const popper_changes = {};
			if (dirty & /*referenceElement*/ 8) popper_changes.referenceElement = /*referenceElement*/ ctx[3];
			if (dirty & /*isVisible*/ 16) popper_changes.isVisible = /*isVisible*/ ctx[4];

			if (dirty & /*$$scope, value*/ 16385) {
				popper_changes.$$scope = { dirty, ctx };
			}

			popper.$set(popper_changes);
		},
		i(local) {
			if (current) return;
			transition_in$1(popper.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out$1(popper.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component$1(popper, detaching);
		}
	};
}

// (45:2) <Popper {referenceElement} {isVisible} placement="bottom">
function create_default_slot(ctx) {
	let div;
	let palette;
	let updating_value;
	let current;
	let mounted;
	let dispose;

	function palette_value_binding(value) {
		/*palette_value_binding*/ ctx[10](value);
	}

	let palette_props = { close: /*close*/ ctx[6] };

	if (/*value*/ ctx[0] !== void 0) {
		palette_props.value = /*value*/ ctx[0];
	}

	palette = new Palette({ props: palette_props });
	binding_callbacks$1.push(() => bind$1(palette, "value", palette_value_binding));
	palette.$on("input", /*input_handler*/ ctx[11]);

	return {
		c() {
			div = element$1("div");
			create_component$1(palette.$$.fragment);
			attr$1(div, "class", "picker svelte-131nkpg");
		},
		m(target, anchor) {
			insert$1(target, div, anchor);
			mount_component$1(palette, div, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen$1(div, "click", stop_propagation(/*click_handler*/ ctx[8])),
					action_destroyer$1(clickOutside.call(null, div, /*close*/ ctx[6]))
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			const palette_changes = {};

			if (!updating_value && dirty & /*value*/ 1) {
				updating_value = true;
				palette_changes.value = /*value*/ ctx[0];
				add_flush_callback$1(() => updating_value = false);
			}

			palette.$set(palette_changes);
		},
		i(local) {
			if (current) return;
			transition_in$1(palette.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out$1(palette.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach$1(div);
			destroy_component$1(palette);
			mounted = false;
			run_all$1(dispose);
		}
	};
}

function create_fragment$4(ctx) {
	let div;
	let t;
	let if_block_anchor;
	let current;
	let mounted;
	let dispose;
	let if_block = /*isVisible*/ ctx[4] && !/*isMobile*/ ctx[5] && create_if_block(ctx);

	return {
		c() {
			div = element$1("div");
			t = space$1();
			if (if_block) if_block.c();
			if_block_anchor = empty$1();
			attr$1(div, "class", "picker-btn svelte-131nkpg");
			set_style$1(div, "background-color", /*value*/ ctx[0]);
			attr$1(div, "value", /*value*/ ctx[0]);
			toggle_class$1(div, "open", /*isVisible*/ ctx[4]);
			toggle_class$1(div, "highlighted", /*highlighted*/ ctx[2]);
			toggle_class$1(div, "disabled", /*disabled*/ ctx[1]);
		},
		m(target, anchor) {
			insert$1(target, div, anchor);
			/*div_binding*/ ctx[9](div);
			insert$1(target, t, anchor);
			if (if_block) if_block.m(target, anchor);
			insert$1(target, if_block_anchor, anchor);
			current = true;

			if (!mounted) {
				dispose = listen$1(div, "click", /*toggleOpen*/ ctx[7]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (!current || dirty & /*value*/ 1) {
				set_style$1(div, "background-color", /*value*/ ctx[0]);
			}

			if (!current || dirty & /*value*/ 1) {
				attr$1(div, "value", /*value*/ ctx[0]);
			}

			if (dirty & /*isVisible*/ 16) {
				toggle_class$1(div, "open", /*isVisible*/ ctx[4]);
			}

			if (dirty & /*highlighted*/ 4) {
				toggle_class$1(div, "highlighted", /*highlighted*/ ctx[2]);
			}

			if (dirty & /*disabled*/ 2) {
				toggle_class$1(div, "disabled", /*disabled*/ ctx[1]);
			}

			if (/*isVisible*/ ctx[4] && !/*isMobile*/ ctx[5]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*isVisible*/ 16) {
						transition_in$1(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					transition_in$1(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros$1();

				transition_out$1(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros$1();
			}
		},
		i(local) {
			if (current) return;
			transition_in$1(if_block);
			current = true;
		},
		o(local) {
			transition_out$1(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach$1(div);
			/*div_binding*/ ctx[9](null);
			if (detaching) detach$1(t);
			if (if_block) if_block.d(detaching);
			if (detaching) detach$1(if_block_anchor);
			mounted = false;
			dispose();
		}
	};
}

function instance$4($$self, $$props, $$invalidate) {
	const isMobile = window.app.isMobile;
	let { disabled } = $$props;
	let { highlighted } = $$props;
	let { value } = $$props;
	let referenceElement;
	let isVisible = false;
	const dispatch = createEventDispatcher$1();

	function setValue(newValue) {
		$$invalidate(0, value = newValue);
		dispatch("input", value);
	}

	function close() {
		$$invalidate(4, isVisible = false);
	}

	function toggleOpen(event) {
		$$invalidate(4, isVisible = !isVisible);
		event.stopPropagation();

		if (isVisible && isMobile) {
			new MobileColorModal(window.app, { close, setValue, value }).open();
		}
	}

	function click_handler(event) {
		bubble$1($$self, event);
	}

	function div_binding($$value) {
		binding_callbacks$1[$$value ? "unshift" : "push"](() => {
			referenceElement = $$value;
			$$invalidate(3, referenceElement);
		});
	}

	function palette_value_binding(value$1) {
		value = value$1;
		$$invalidate(0, value);
	}

	function input_handler(event) {
		bubble$1($$self, event);
	}

	$$self.$$set = $$props => {
		if ("disabled" in $$props) $$invalidate(1, disabled = $$props.disabled);
		if ("highlighted" in $$props) $$invalidate(2, highlighted = $$props.highlighted);
		if ("value" in $$props) $$invalidate(0, value = $$props.value);
	};

	return [
		value,
		disabled,
		highlighted,
		referenceElement,
		isVisible,
		isMobile,
		close,
		toggleOpen,
		click_handler,
		div_binding,
		palette_value_binding,
		input_handler
	];
}

class Picker extends SvelteComponent$1 {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-131nkpg-style")) add_css$1();
		init$1(this, options, instance$4, create_fragment$4, safe_not_equal$1, { disabled: 1, highlighted: 2, value: 0 });
	}
}

class SourceSettingsModal extends obsidian.Modal {
    constructor(app, source, saveSource, handleTeardown) {
        var _a;
        super(app);
        this.onClose = handleTeardown;
        this.close = this.close.bind(this);
        const sourceSettings = settings.getSourceSettings(source.id);
        const displayValue = sourceSettings.display;
        this.contentEl.createEl("h3", {
            text: `${source.name} Settings`,
        });
        if (source.description) {
            this.contentEl.createEl("div", {
                cls: "setting-item-description",
                text: source.description,
            });
        }
        new obsidian.Setting(this.contentEl).setName("Display").addDropdown((dropdown) => {
            dropdown
                .addOption("calendar-and-menu", "On Calendar")
                .addOption("menu", "In Menu")
                .addOption("none", "Hidden")
                .onChange((display) => {
                saveSource({ display });
            })
                .setValue(displayValue);
        });
        (_a = source.registerSettings) === null || _a === void 0 ? void 0 : _a.call(source, this.contentEl, sourceSettings, saveSource);
        this.contentEl.createDiv("modal-button-container", (buttonsEl) => {
            buttonsEl
                .createEl("button", {
                cls: "mod-cta",
                text: "Close",
            })
                .addEventListener("click", this.close);
        });
    }
}

/* src/ui/settings/Sources.svelte generated by Svelte v3.37.0 */

function add_css() {
	var style = element$1("style");
	style.id = "svelte-sda0g6-style";
	style.textContent = ".container.svelte-sda0g6{border-top:1px solid var(--background-modifier-border);display:flex;display:grid;gap:24px;margin:8px 0;padding-top:8px;width:100%}.layout-grid.svelte-sda0g6{display:flex;flex-wrap:wrap;justify-content:space-between}.calendar-source.svelte-sda0g6{transition:border-color 0.1s ease-in-out;align-items:center;cursor:pointer;background-color:var(--background-secondary);border-radius:8px;border:1px solid var(--background-modifier-border);display:flex;font-size:14px;margin:4px 0;padding:8px;width:100%}.calendar-source.disabled.svelte-sda0g6{color:var(--text-muted);padding-left:32px}.calendar-source.svelte-sda0g6:hover{border:1px solid var(--text-faint)}.calendar-source.active.svelte-sda0g6{border:1px solid var(--text-accent-hover)}.calendar-source.svelte-sda0g6:nth-child(1),.calendar-source.svelte-sda0g6:nth-child(2){width:calc(50% - 6px)}";
	append$1(document.head, style);
}

function get_each_context$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[22] = list[i];
	child_ctx[23] = list;
	child_ctx[24] = i;
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[22] = list[i];
	child_ctx[25] = list;
	child_ctx[26] = i;
	return child_ctx;
}

// (117:4) {#each enabledItems as item (item.id)}
function create_each_block_1(key_1, ctx) {
	let div;
	let draghandle;
	let t0;
	let t1_value = /*item*/ ctx[22].name + "";
	let t1;
	let t2;
	let picker;
	let updating_value;
	let current;
	let mounted;
	let dispose;

	draghandle = new DragHandle({
			props: {
				dragDisabled: /*dragDisabled*/ ctx[0],
				startDrag: /*startDrag*/ ctx[8],
				handleKeyDown: /*handleKeyDown*/ ctx[9]
			}
		});

	function picker_value_binding(value) {
		/*picker_value_binding*/ ctx[13](value, /*item*/ ctx[22]);
	}

	let picker_props = {
		disabled: /*item*/ ctx[22].display === "none",
		highlighted: /*item*/ ctx[22].display === "calendar-and-menu"
	};

	if (/*item*/ ctx[22].color !== void 0) {
		picker_props.value = /*item*/ ctx[22].color;
	}

	picker = new Picker({ props: picker_props });
	binding_callbacks$1.push(() => bind$1(picker, "value", picker_value_binding));
	picker.$on("input", /*saveSettings*/ ctx[5]);

	function click_handler() {
		return /*click_handler*/ ctx[14](/*item*/ ctx[22]);
	}

	return {
		key: key_1,
		first: null,
		c() {
			div = element$1("div");
			create_component$1(draghandle.$$.fragment);
			t0 = space$1();
			t1 = text$1(t1_value);
			t2 = space$1();
			create_component$1(picker.$$.fragment);
			attr$1(div, "class", "calendar-source svelte-sda0g6");
			toggle_class$1(div, "active", /*item*/ ctx[22].id === /*activeItemId*/ ctx[1]);
			this.first = div;
		},
		m(target, anchor) {
			insert$1(target, div, anchor);
			mount_component$1(draghandle, div, null);
			append$1(div, t0);
			append$1(div, t1);
			append$1(div, t2);
			mount_component$1(picker, div, null);
			current = true;

			if (!mounted) {
				dispose = listen$1(div, "click", stop_propagation(click_handler));
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			const draghandle_changes = {};
			if (dirty & /*dragDisabled*/ 1) draghandle_changes.dragDisabled = /*dragDisabled*/ ctx[0];
			draghandle.$set(draghandle_changes);
			if ((!current || dirty & /*enabledItems*/ 4) && t1_value !== (t1_value = /*item*/ ctx[22].name + "")) set_data$1(t1, t1_value);
			const picker_changes = {};
			if (dirty & /*enabledItems*/ 4) picker_changes.disabled = /*item*/ ctx[22].display === "none";
			if (dirty & /*enabledItems*/ 4) picker_changes.highlighted = /*item*/ ctx[22].display === "calendar-and-menu";

			if (!updating_value && dirty & /*enabledItems*/ 4) {
				updating_value = true;
				picker_changes.value = /*item*/ ctx[22].color;
				add_flush_callback$1(() => updating_value = false);
			}

			picker.$set(picker_changes);

			if (dirty & /*enabledItems, activeItemId*/ 6) {
				toggle_class$1(div, "active", /*item*/ ctx[22].id === /*activeItemId*/ ctx[1]);
			}
		},
		i(local) {
			if (current) return;
			transition_in$1(draghandle.$$.fragment, local);
			transition_in$1(picker.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out$1(draghandle.$$.fragment, local);
			transition_out$1(picker.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach$1(div);
			destroy_component$1(draghandle);
			destroy_component$1(picker);
			mounted = false;
			dispose();
		}
	};
}

// (133:4) {#each disabledItems as item (item.id)}
function create_each_block$1(key_1, ctx) {
	let div;
	let t0_value = /*item*/ ctx[22].name + "";
	let t0;
	let t1;
	let picker;
	let updating_value;
	let t2;
	let current;
	let mounted;
	let dispose;

	function picker_value_binding_1(value) {
		/*picker_value_binding_1*/ ctx[15](value, /*item*/ ctx[22]);
	}

	let picker_props = {
		disabled: /*item*/ ctx[22].display === "none",
		highlighted: /*item*/ ctx[22].display === "calendar-and-menu"
	};

	if (/*item*/ ctx[22].color !== void 0) {
		picker_props.value = /*item*/ ctx[22].color;
	}

	picker = new Picker({ props: picker_props });
	binding_callbacks$1.push(() => bind$1(picker, "value", picker_value_binding_1));
	picker.$on("input", /*saveSettings*/ ctx[5]);

	function click_handler_1() {
		return /*click_handler_1*/ ctx[16](/*item*/ ctx[22]);
	}

	return {
		key: key_1,
		first: null,
		c() {
			div = element$1("div");
			t0 = text$1(t0_value);
			t1 = space$1();
			create_component$1(picker.$$.fragment);
			t2 = space$1();
			attr$1(div, "class", "calendar-source disabled svelte-sda0g6");
			toggle_class$1(div, "active", /*item*/ ctx[22].id === /*activeItemId*/ ctx[1]);
			this.first = div;
		},
		m(target, anchor) {
			insert$1(target, div, anchor);
			append$1(div, t0);
			append$1(div, t1);
			mount_component$1(picker, div, null);
			append$1(div, t2);
			current = true;

			if (!mounted) {
				dispose = listen$1(div, "click", stop_propagation(click_handler_1));
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if ((!current || dirty & /*disabledItems*/ 8) && t0_value !== (t0_value = /*item*/ ctx[22].name + "")) set_data$1(t0, t0_value);
			const picker_changes = {};
			if (dirty & /*disabledItems*/ 8) picker_changes.disabled = /*item*/ ctx[22].display === "none";
			if (dirty & /*disabledItems*/ 8) picker_changes.highlighted = /*item*/ ctx[22].display === "calendar-and-menu";

			if (!updating_value && dirty & /*disabledItems*/ 8) {
				updating_value = true;
				picker_changes.value = /*item*/ ctx[22].color;
				add_flush_callback$1(() => updating_value = false);
			}

			picker.$set(picker_changes);

			if (dirty & /*disabledItems, activeItemId*/ 10) {
				toggle_class$1(div, "active", /*item*/ ctx[22].id === /*activeItemId*/ ctx[1]);
			}
		},
		i(local) {
			if (current) return;
			transition_in$1(picker.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out$1(picker.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach$1(div);
			destroy_component$1(picker);
			mounted = false;
			dispose();
		}
	};
}

function create_fragment$3(ctx) {
	let div1;
	let div0;
	let each_blocks_1 = [];
	let each0_lookup = new Map();
	let t;
	let each_blocks = [];
	let each1_lookup = new Map();
	let dndzone_action;
	let current;
	let mounted;
	let dispose;
	let each_value_1 = /*enabledItems*/ ctx[2];
	const get_key = ctx => /*item*/ ctx[22].id;

	for (let i = 0; i < each_value_1.length; i += 1) {
		let child_ctx = get_each_context_1(ctx, each_value_1, i);
		let key = get_key(child_ctx);
		each0_lookup.set(key, each_blocks_1[i] = create_each_block_1(key, child_ctx));
	}

	let each_value = /*disabledItems*/ ctx[3];
	const get_key_1 = ctx => /*item*/ ctx[22].id;

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context$1(ctx, each_value, i);
		let key = get_key_1(child_ctx);
		each1_lookup.set(key, each_blocks[i] = create_each_block$1(key, child_ctx));
	}

	return {
		c() {
			div1 = element$1("div");
			div0 = element$1("div");

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			t = space$1();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr$1(div0, "class", "layout-grid svelte-sda0g6");
			attr$1(div1, "class", "container svelte-sda0g6");
		},
		m(target, anchor) {
			insert$1(target, div1, anchor);
			append$1(div1, div0);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].m(div0, null);
			}

			append$1(div0, t);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div0, null);
			}

			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer$1(dndzone_action = dndzone.call(null, div0, {
						items: /*enabledItems*/ ctx[2],
						dragDisabled: /*dragDisabled*/ ctx[0],
						dropTargetStyle: {},
						flipDurationMs
					})),
					listen$1(div0, "consider", /*handleConsider*/ ctx[6]),
					listen$1(div0, "finalize", /*handleFinalize*/ ctx[7])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*enabledItems, activeItemId, setActiveItem, saveSettings, dragDisabled, startDrag, handleKeyDown*/ 1831) {
				each_value_1 = /*enabledItems*/ ctx[2];
				group_outros$1();
				each_blocks_1 = update_keyed_each$1(each_blocks_1, dirty, get_key, 1, ctx, each_value_1, each0_lookup, div0, outro_and_destroy_block$1, create_each_block_1, t, get_each_context_1);
				check_outros$1();
			}

			if (dirty & /*disabledItems, activeItemId, setActiveItem, saveSettings*/ 1066) {
				each_value = /*disabledItems*/ ctx[3];
				group_outros$1();
				each_blocks = update_keyed_each$1(each_blocks, dirty, get_key_1, 1, ctx, each_value, each1_lookup, div0, outro_and_destroy_block$1, create_each_block$1, null, get_each_context$1);
				check_outros$1();
			}

			if (dndzone_action && is_function$1(dndzone_action.update) && dirty & /*enabledItems, dragDisabled*/ 5) dndzone_action.update.call(null, {
				items: /*enabledItems*/ ctx[2],
				dragDisabled: /*dragDisabled*/ ctx[0],
				dropTargetStyle: {},
				flipDurationMs
			});
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value_1.length; i += 1) {
				transition_in$1(each_blocks_1[i]);
			}

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in$1(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			for (let i = 0; i < each_blocks_1.length; i += 1) {
				transition_out$1(each_blocks_1[i]);
			}

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out$1(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach$1(div1);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].d();
			}

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}

			mounted = false;
			run_all$1(dispose);
		}
	};
}

const flipDurationMs = 100;

function instance$3($$self, $$props, $$invalidate) {
	let $items;
	let $sources;
	component_subscribe$1($$self, sources, $$value => $$invalidate(18, $sources = $$value));
	let { saveAllSourceSettings } = $$props;
	let { writeSettingsToDisk } = $$props;
	let dragDisabled = true;
	let activeItemId;
	let enabledItems;
	let disabledItems;
	let items = writable$1([]);
	component_subscribe$1($$self, items, value => $$invalidate(17, $items = value));
	let saveSettings = obsidian.debounce(() => saveAllSourceSettings($items), 200, false);

	function refreshItems() {
		const allItems = $sources.map(getSourceSettings).sort((a, b) => a.order - b.order);
		$$invalidate(2, [enabledItems, disabledItems] = partition(allItems, item => item.display !== "none"), enabledItems, $$invalidate(3, disabledItems));
	}

	sources.subscribe(refreshItems);

	function getSourceSettings(source) {
		return {
			...source,
			...source.defaultSettings || {},
			...settings.getSourceSettings(source.id)
		};
	}

	function handleConsider(event) {
		$$invalidate(2, enabledItems = event.detail.items);

		if (event.detail.info.trigger === TRIGGERS.DRAG_STOPPED) {
			$$invalidate(0, dragDisabled = true);
		}
	}

	function handleFinalize(event) {
		$$invalidate(2, enabledItems = event.detail.items);
		$$invalidate(0, dragDisabled = true);
		saveAllSourceSettings($items);
	}

	function startDrag(e) {
		// preventing default to prevent lag on touch devices (because of the browser checking for screen scrolling)
		e.preventDefault();

		$$invalidate(0, dragDisabled = false);
	}

	function handleKeyDown(e) {
		if ((e.key === "Enter" || e.key === " ") && dragDisabled) $$invalidate(0, dragDisabled = false);
	}

	function handleTeardown() {
		$$invalidate(1, activeItemId = null);
	}

	function setActiveItem(item) {
		$$invalidate(1, activeItemId = item.id);
		const source = $sources.find(s => s.id === item.id);

		const saveSource = sourceSettings => writeSettingsToDisk(existingSettings => {
			const newSettings = {
				...existingSettings,
				sourceSettings: {
					...existingSettings.sourceSettings,
					[item.id]: {
						...existingSettings.sourceSettings[item.id],
						...sourceSettings
					}
				}
			};

			item.display = sourceSettings.display;
			refreshItems();
			settings.set(newSettings);
			return newSettings;
		});

		new SourceSettingsModal(window.app, source, saveSource, handleTeardown).open();
	}

	function picker_value_binding(value, item) {
		if ($$self.$$.not_equal(item.color, value)) {
			item.color = value;
			$$invalidate(2, enabledItems);
		}
	}

	const click_handler = item => setActiveItem(item);

	function picker_value_binding_1(value, item) {
		if ($$self.$$.not_equal(item.color, value)) {
			item.color = value;
			$$invalidate(3, disabledItems);
		}
	}

	const click_handler_1 = item => setActiveItem(item);

	$$self.$$set = $$props => {
		if ("saveAllSourceSettings" in $$props) $$invalidate(11, saveAllSourceSettings = $$props.saveAllSourceSettings);
		if ("writeSettingsToDisk" in $$props) $$invalidate(12, writeSettingsToDisk = $$props.writeSettingsToDisk);
	};

	return [
		dragDisabled,
		activeItemId,
		enabledItems,
		disabledItems,
		items,
		saveSettings,
		handleConsider,
		handleFinalize,
		startDrag,
		handleKeyDown,
		setActiveItem,
		saveAllSourceSettings,
		writeSettingsToDisk,
		picker_value_binding,
		click_handler,
		picker_value_binding_1,
		click_handler_1
	];
}

class Sources extends SvelteComponent$1 {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-sda0g6-style")) add_css();

		init$1(this, options, instance$3, create_fragment$3, safe_not_equal$1, {
			saveAllSourceSettings: 11,
			writeSettingsToDisk: 12
		});
	}
}

/* src/ui/settings/controls/Dropdown.svelte generated by Svelte v3.37.0 */

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[4] = list[i].label;
	child_ctx[5] = list[i].value;
	return child_ctx;
}

// (12:2) {#each options as { label, value }}
function create_each_block(ctx) {
	let option;
	let t_value = /*label*/ ctx[4] + "";
	let t;
	let option_value_value;

	return {
		c() {
			option = element$1("option");
			t = text$1(t_value);
			option.__value = option_value_value = /*value*/ ctx[5];
			option.value = option.__value;
		},
		m(target, anchor) {
			insert$1(target, option, anchor);
			append$1(option, t);
		},
		p(ctx, dirty) {
			if (dirty & /*options*/ 1 && t_value !== (t_value = /*label*/ ctx[4] + "")) set_data$1(t, t_value);

			if (dirty & /*options*/ 1 && option_value_value !== (option_value_value = /*value*/ ctx[5])) {
				option.__value = option_value_value;
				option.value = option.__value;
			}
		},
		d(detaching) {
			if (detaching) detach$1(option);
		}
	};
}

function create_fragment$2(ctx) {
	let select;
	let mounted;
	let dispose;
	let each_value = /*options*/ ctx[0];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	return {
		c() {
			select = element$1("select");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr$1(select, "class", "dropdown");
		},
		m(target, anchor) {
			insert$1(target, select, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(select, null);
			}

			if (!mounted) {
				dispose = listen$1(select, "change", /*onSelect*/ ctx[1]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*options*/ 1) {
				each_value = /*options*/ ctx[0];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(select, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: noop$1,
		o: noop$1,
		d(detaching) {
			if (detaching) detach$1(select);
			destroy_each$1(each_blocks, detaching);
			mounted = false;
			dispose();
		}
	};
}

function instance$2($$self, $$props, $$invalidate) {
	let $settings;
	component_subscribe$1($$self, settings, $$value => $$invalidate(3, $settings = $$value));
	let { name } = $$props;
	let { options = [] } = $$props;

	function onSelect(event) {
		const newValue = event.target.value;
		set_store_value(settings, $settings[name] = newValue, $settings);
	}

	$$self.$$set = $$props => {
		if ("name" in $$props) $$invalidate(2, name = $$props.name);
		if ("options" in $$props) $$invalidate(0, options = $$props.options);
	};

	return [options, onSelect, name];
}

class Dropdown extends SvelteComponent$1 {
	constructor(options) {
		super();
		init$1(this, options, instance$2, create_fragment$2, safe_not_equal$1, { name: 2, options: 0 });
	}
}

/* src/ui/settings/controls/Toggle.svelte generated by Svelte v3.37.0 */

function create_fragment$1(ctx) {
	let div;
	let mounted;
	let dispose;

	return {
		c() {
			div = element$1("div");
			attr$1(div, "class", "checkbox-container");
			toggle_class$1(div, "is-enabled", /*$settings*/ ctx[1][/*name*/ ctx[0]]);
		},
		m(target, anchor) {
			insert$1(target, div, anchor);

			if (!mounted) {
				dispose = listen$1(div, "click", /*toggleEnabled*/ ctx[2]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*$settings, name*/ 3) {
				toggle_class$1(div, "is-enabled", /*$settings*/ ctx[1][/*name*/ ctx[0]]);
			}
		},
		i: noop$1,
		o: noop$1,
		d(detaching) {
			if (detaching) detach$1(div);
			mounted = false;
			dispose();
		}
	};
}

function instance$1($$self, $$props, $$invalidate) {
	let $settings;
	component_subscribe$1($$self, settings, $$value => $$invalidate(1, $settings = $$value));
	let { name } = $$props;

	function toggleEnabled() {
		set_store_value(settings, $settings[name] = !$settings[name], $settings);
	}

	$$self.$$set = $$props => {
		if ("name" in $$props) $$invalidate(0, name = $$props.name);
	};

	return [name, $settings, toggleEnabled];
}

class Toggle extends SvelteComponent$1 {
	constructor(options) {
		super();
		init$1(this, options, instance$1, create_fragment$1, safe_not_equal$1, { name: 0 });
	}
}

/* src/ui/settings/SettingsTab.svelte generated by Svelte v3.37.0 */

function create_control_slot_3(ctx) {
	let toggle;
	let current;

	toggle = new Toggle({
			props: {
				slot: "control",
				name: "shouldConfirmBeforeCreate"
			}
		});

	return {
		c() {
			create_component$1(toggle.$$.fragment);
		},
		m(target, anchor) {
			mount_component$1(toggle, target, anchor);
			current = true;
		},
		p: noop$1,
		i(local) {
			if (current) return;
			transition_in$1(toggle.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out$1(toggle.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component$1(toggle, detaching);
		}
	};
}

// (49:4) 
function create_control_slot_2(ctx) {
	let toggle;
	let current;

	toggle = new Toggle({
			props: { slot: "control", name: "showWeeklyNote" }
		});

	return {
		c() {
			create_component$1(toggle.$$.fragment);
		},
		m(target, anchor) {
			mount_component$1(toggle, target, anchor);
			current = true;
		},
		p: noop$1,
		i(local) {
			if (current) return;
			transition_in$1(toggle.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out$1(toggle.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component$1(toggle, detaching);
		}
	};
}

// (65:4) 
function create_control_slot_1(ctx) {
	let dropdown;
	let current;

	dropdown = new Dropdown({
			props: {
				slot: "control",
				name: "weekStart",
				options: /*weekStartOptions*/ ctx[2]
			}
		});

	return {
		c() {
			create_component$1(dropdown.$$.fragment);
		},
		m(target, anchor) {
			mount_component$1(dropdown, target, anchor);
			current = true;
		},
		p: noop$1,
		i(local) {
			if (current) return;
			transition_in$1(dropdown.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out$1(dropdown.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component$1(dropdown, detaching);
		}
	};
}

// (73:4) 
function create_control_slot(ctx) {
	let dropdown;
	let current;

	dropdown = new Dropdown({
			props: {
				slot: "control",
				name: "localeOverride",
				options: /*localeOptions*/ ctx[3]
			}
		});

	return {
		c() {
			create_component$1(dropdown.$$.fragment);
		},
		m(target, anchor) {
			mount_component$1(dropdown, target, anchor);
			current = true;
		},
		p: noop$1,
		i(local) {
			if (current) return;
			transition_in$1(dropdown.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out$1(dropdown.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component$1(dropdown, detaching);
		}
	};
}

function create_fragment(ctx) {
	let div1;
	let h30;
	let t1;
	let settingitem0;
	let t2;
	let settingitem1;
	let t3;
	let h31;
	let t5;
	let div0;
	let t7;
	let sources;
	let t8;
	let h32;
	let t10;
	let settingitem2;
	let t11;
	let settingitem3;
	let t12;
	let footer;
	let current;

	settingitem0 = new SettingItem({
			props: {
				name: "Confirm before creating new note",
				description: "Show a confirmation modal before creating a new note",
				$$slots: { control: [create_control_slot_3] },
				$$scope: { ctx }
			}
		});

	settingitem1 = new SettingItem({
			props: {
				name: "Show week numbers",
				description: "Enable this to add a column with the week number",
				$$slots: { control: [create_control_slot_2] },
				$$scope: { ctx }
			}
		});

	sources = new Sources({
			props: {
				saveAllSourceSettings: /*saveAllSourceSettings*/ ctx[0],
				writeSettingsToDisk: /*writeSettingsToDisk*/ ctx[1]
			}
		});

	settingitem2 = new SettingItem({
			props: {
				name: "Start week on",
				description: "Choose what day of the week to start. Select 'locale default' to use the default specified by moment.js",
				type: "dropdown",
				$$slots: { control: [create_control_slot_1] },
				$$scope: { ctx }
			}
		});

	settingitem3 = new SettingItem({
			props: {
				name: "Locale",
				description: "Override the locale used by the calendar and other plugins",
				type: "dropdown",
				$$slots: { control: [create_control_slot] },
				$$scope: { ctx }
			}
		});

	footer = new Footer({});

	return {
		c() {
			div1 = element$1("div");
			h30 = element$1("h3");
			h30.textContent = "General Settings";
			t1 = space$1();
			create_component$1(settingitem0.$$.fragment);
			t2 = space$1();
			create_component$1(settingitem1.$$.fragment);
			t3 = space$1();
			h31 = element$1("h3");
			h31.textContent = "Sources";
			t5 = space$1();
			div0 = element$1("div");
			div0.textContent = "Configure what appears on the calendar and what shows in the hover menu.\n    Drag to reorder.";
			t7 = space$1();
			create_component$1(sources.$$.fragment);
			t8 = space$1();
			h32 = element$1("h3");
			h32.textContent = "Localization";
			t10 = space$1();
			create_component$1(settingitem2.$$.fragment);
			t11 = space$1();
			create_component$1(settingitem3.$$.fragment);
			t12 = space$1();
			create_component$1(footer.$$.fragment);
			attr$1(div0, "class", "setting-item-description");
		},
		m(target, anchor) {
			insert$1(target, div1, anchor);
			append$1(div1, h30);
			append$1(div1, t1);
			mount_component$1(settingitem0, div1, null);
			append$1(div1, t2);
			mount_component$1(settingitem1, div1, null);
			append$1(div1, t3);
			append$1(div1, h31);
			append$1(div1, t5);
			append$1(div1, div0);
			append$1(div1, t7);
			mount_component$1(sources, div1, null);
			append$1(div1, t8);
			append$1(div1, h32);
			append$1(div1, t10);
			mount_component$1(settingitem2, div1, null);
			append$1(div1, t11);
			mount_component$1(settingitem3, div1, null);
			append$1(div1, t12);
			mount_component$1(footer, div1, null);
			current = true;
		},
		p(ctx, [dirty]) {
			const settingitem0_changes = {};

			if (dirty & /*$$scope*/ 1024) {
				settingitem0_changes.$$scope = { dirty, ctx };
			}

			settingitem0.$set(settingitem0_changes);
			const settingitem1_changes = {};

			if (dirty & /*$$scope*/ 1024) {
				settingitem1_changes.$$scope = { dirty, ctx };
			}

			settingitem1.$set(settingitem1_changes);
			const sources_changes = {};
			if (dirty & /*saveAllSourceSettings*/ 1) sources_changes.saveAllSourceSettings = /*saveAllSourceSettings*/ ctx[0];
			if (dirty & /*writeSettingsToDisk*/ 2) sources_changes.writeSettingsToDisk = /*writeSettingsToDisk*/ ctx[1];
			sources.$set(sources_changes);
			const settingitem2_changes = {};

			if (dirty & /*$$scope*/ 1024) {
				settingitem2_changes.$$scope = { dirty, ctx };
			}

			settingitem2.$set(settingitem2_changes);
			const settingitem3_changes = {};

			if (dirty & /*$$scope*/ 1024) {
				settingitem3_changes.$$scope = { dirty, ctx };
			}

			settingitem3.$set(settingitem3_changes);
		},
		i(local) {
			if (current) return;
			transition_in$1(settingitem0.$$.fragment, local);
			transition_in$1(settingitem1.$$.fragment, local);
			transition_in$1(sources.$$.fragment, local);
			transition_in$1(settingitem2.$$.fragment, local);
			transition_in$1(settingitem3.$$.fragment, local);
			transition_in$1(footer.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out$1(settingitem0.$$.fragment, local);
			transition_out$1(settingitem1.$$.fragment, local);
			transition_out$1(sources.$$.fragment, local);
			transition_out$1(settingitem2.$$.fragment, local);
			transition_out$1(settingitem3.$$.fragment, local);
			transition_out$1(footer.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach$1(div1);
			destroy_component$1(settingitem0);
			destroy_component$1(settingitem1);
			destroy_component$1(sources);
			destroy_component$1(settingitem2);
			destroy_component$1(settingitem3);
			destroy_component$1(footer);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	var _a;
	
	
	let { saveAllSourceSettings } = $$props;
	let { writeSettingsToDisk } = $$props;
	const weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
	const localizedWeekdays = window.moment.weekdays();
	const localeWeekStartNum = window._bundledLocaleWeekSpec.dow;
	const localeWeekStart = localizedWeekdays[localeWeekStartNum];

	const weekStartOptions = [
		{
			label: `Locale default (${localeWeekStart})`,
			value: "locale"
		},
		...localizedWeekdays.map((day, i) => ({ value: weekdays[i], label: day }))
	];

	const sysLocale = (_a = navigator.language) === null || _a === void 0
	? void 0
	: _a.toLowerCase();

	const localeOptions = [
		{
			label: `Same as system (${sysLocale})`,
			value: "system-default"
		},
		...window.moment.locales().map(locale => ({ label: locale, value: locale }))
	];

	$$self.$$set = $$props => {
		if ("saveAllSourceSettings" in $$props) $$invalidate(0, saveAllSourceSettings = $$props.saveAllSourceSettings);
		if ("writeSettingsToDisk" in $$props) $$invalidate(1, writeSettingsToDisk = $$props.writeSettingsToDisk);
	};

	return [saveAllSourceSettings, writeSettingsToDisk, weekStartOptions, localeOptions];
}

class SettingsTab extends SvelteComponent$1 {
	constructor(options) {
		super();

		init$1(this, options, instance, create_fragment, safe_not_equal$1, {
			saveAllSourceSettings: 0,
			writeSettingsToDisk: 1
		});
	}
}

function getSavedSourceSettings(source) {
    const blacklistedKeys = [
        "name",
        "description",
        "getMetadata",
        "defaultSettings",
        "registerSettings",
    ];
    return Object.keys(source)
        .filter((key) => !blacklistedKeys.includes(key))
        .reduce((obj, key) => {
        obj[key] = source[key];
        return obj;
    }, {});
}
class CalendarSettingsTab extends obsidian.PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
        this.saveAllSourceSettings = this.saveAllSourceSettings.bind(this);
    }
    // call destroy from the plugin
    // close(): void {
    //   super.close();
    //   this.view?.$destroy();
    // }
    async saveAllSourceSettings(sources) {
        const sourceSettings = sources.reduce((acc, source, i) => {
            acc[source.id] = Object.assign(Object.assign({}, getSavedSourceSettings(source)), { order: i });
            return acc;
        }, {});
        return this.plugin.writeSettingsToDisk(() => ({
            sourceSettings,
        }));
    }
    display() {
        this.containerEl.empty();
        this.view = new SettingsTab({
            target: this.containerEl,
            props: {
                saveAllSourceSettings: this.saveAllSourceSettings,
                writeSettingsToDisk: this.plugin.writeSettingsToDisk,
            },
        });
    }
}

class CalendarPlugin extends obsidian.Plugin {
    onunload() {
        this.app.workspace
            .getLeavesOfType(VIEW_TYPE_CALENDAR)
            .forEach((leaf) => leaf.detach());
    }
    async onload() {
        // monkeyPatchConsole(this);
        this.initLeaf = this.initLeaf.bind(this);
        this.writeSettingsToDisk = this.writeSettingsToDisk.bind(this);
        this.toggleWeekNumbers = this.toggleWeekNumbers.bind(this);
        this.register(settings.subscribe((value) => {
            if (this.settings) {
                // avoid saving when initializing
                this.saveData(value);
            }
            this.settings = value;
        }));
        this.registerView(VIEW_TYPE_CALENDAR, (leaf) => (this.view = new CalendarView(leaf)));
        this.addCommand({
            id: "show-calendar-view",
            name: "Open view",
            checkCallback: (checking) => {
                if (checking) {
                    return (this.app.workspace.getLeavesOfType(VIEW_TYPE_CALENDAR).length === 0);
                }
                this.initLeaf();
            },
        });
        this.addCommand({
            id: "toggle-week-numbers",
            name: "Toggle week numbers",
            callback: this.toggleWeekNumbers,
        });
        this.addCommand({
            id: "reveal-active-note",
            name: "Reveal active note",
            callback: () => this.view.revealActiveNote(),
        });
        await this.loadSettings();
        this.addSettingTab(new CalendarSettingsTab(this.app, this));
        this.app.workspace.onLayoutReady(this.initLeaf);
    }
    initLeaf() {
        if (this.app.workspace.getLeavesOfType(VIEW_TYPE_CALENDAR).length) {
            return;
        }
        this.app.workspace.getRightLeaf(false).setViewState({
            type: VIEW_TYPE_CALENDAR,
        });
    }
    toggleWeekNumbers() {
        settings.update((existingSettings) => (Object.assign(Object.assign({}, existingSettings), { showWeeklyNote: !existingSettings.showWeeklyNote })));
    }
    async loadSettings() {
        const savedSettings = await this.loadData();
        const settingsWithMigrationsApplied = applyMigrations(savedSettings || {});
        settings.update((existingSettings) => (Object.assign(Object.assign({}, existingSettings), settingsWithMigrationsApplied)));
    }
    onSettingsUpdate() {
        this.app.workspace.trigger("calendar:metadata-updated");
    }
    async writeSettingsToDisk(settingsUpdater) {
        settings.update((old) => (Object.assign(Object.assign({}, old), settingsUpdater(old))));
        this.onSettingsUpdate();
    }
}

module.exports = CalendarPlugin;
