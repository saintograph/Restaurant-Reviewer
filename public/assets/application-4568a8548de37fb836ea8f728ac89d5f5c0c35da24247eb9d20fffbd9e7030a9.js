/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*
Turbolinks 5.0.0
Copyright © 2016 Basecamp, LLC
 */

(function(){(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame}(),visit:function(e,r){return t.controller.visit(e,r)},clearCache:function(){return t.controller.clearCache()}}}).call(this)}).call(this);var t=this.Turbolinks;(function(){(function(){var e,r;t.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},t.closest=function(t,r){return e.call(t,r)},e=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),t.defer=function(t){return setTimeout(t,1)},t.dispatch=function(t,e){var r,n,o,i,s;return i=null!=e?e:{},s=i.target,r=i.cancelable,n=i.data,o=document.createEvent("Events"),o.initEvent(t,!0,r===!0),o.data=null!=n?n:{},(null!=s?s:document).dispatchEvent(o),o},t.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),t.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){t.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.absoluteURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=e(this.requestCanceled,this),this.requestTimedOut=e(this.requestTimedOut,this),this.requestFailed=e(this.requestFailed,this),this.requestLoaded=e(this.requestLoaded,this),this.requestProgressed=e(this.requestProgressed,this),this.url=t.Location.wrap(n).requestURL,this.referrer=t.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return t.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return t.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ProgressBar=function(){function t(){this.trickle=e(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,t.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",t.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},t.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},t.prototype.setValue=function(t){return this.value=t,this.refresh()},t.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},t.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},t.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},t.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},t.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},t.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},t.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},t.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},t.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},t.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=e(this.showProgressBar,this),this.progressBar=new t.ProgressBar}var n,o,i,s;return s=t.HttpRequest,n=s.NETWORK_FAILURE,i=s.TIMEOUT_FAILURE,o=500,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case i:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,o)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var e,r=function(t,e){return function(){return t.apply(e,arguments)}};e=!1,addEventListener("load",function(){return t.defer(function(){return e=!0})},!1),t.History=function(){function n(t){this.delegate=t,this.onPopState=r(this.onPopState,this)}return n.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),this.started=!0)},n.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),this.started=!1):void 0},n.prototype.push=function(e,r){return e=t.Location.wrap(e),this.update("push",e,r)},n.prototype.replace=function(e,r){return e=t.Location.wrap(e),this.update("replace",e,r)},n.prototype.onPopState=function(e){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=e.state)?n.turbolinks:void 0)?(r=t.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},n.prototype.shouldHandlePopState=function(){return e===!0},n.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},n}()}.call(this),function(){t.Snapshot=function(){function e(t){var e,r;r=t.head,e=t.body,this.head=null!=r?r:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return e.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},e.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},e.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},e.prototype.clone=function(){return new e({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},e.prototype.getRootLocation=function(){var e,r;return r=null!=(e=this.getSetting("root"))?e:"/",new t.Location(r)},e.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},e.prototype.hasAnchor=function(t){try{return null!=this.body.querySelector("[id='"+t+"']")}catch(e){}},e.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},e.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},e.prototype.getSetting=function(t){var e,r;return r=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=r[r.length-1],null!=e?e.getAttribute("content"):void 0},e}()}.call(this),function(){var e=[].slice;t.Renderer=function(){function t(){}var r;return t.render=function(){var t,r,n,o;return n=arguments[0],r=arguments[1],t=3<=arguments.length?e.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,t,function(){}),o.delegate=n,o.render(r),o},t.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},t.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},t.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},t}()}.call(this),function(){t.HeadDetails=function(){function t(t){var e,r,i,s,a,u,c;for(this.element=t,this.elements={},c=this.element.childNodes,s=0,u=c.length;u>s;s++)i=c[s],i.nodeType===Node.ELEMENT_NODE&&(a=i.outerHTML,r=null!=(e=this.elements)[a]?e[a]:e[a]={type:o(i),tracked:n(i),elements:[]},r.elements.push(i))}var e,r,n,o;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},o=function(t){return e(t)?"script":r(t)?"stylesheet":void 0},n=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},r=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.SnapshotRenderer=function(r){function n(e,r){this.currentSnapshot=e,this.newSnapshot=r,this.currentHeadDetails=new t.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new t.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return e(n,r),n.prototype.render=function(t){return this.trackedElementsAreIdentical()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},n.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},n.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},n.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},n.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},n.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},n.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.importBodyPermanentElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyPermanentElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],(t=this.findCurrentBodyPermanentElement(o))?i.push(o.parentNode.replaceChild(t,o)):i.push(void 0);return i},n.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},n.prototype.assignNewBody=function(){return document.body=this.newBody},n.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},n.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},n.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},n.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},n.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},n.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},n.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},n.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},n.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},n}(t.Renderer)}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.ErrorRenderer=function(t){function r(t){this.html=t}return e(r,t),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(t.Renderer)}.call(this),function(){t.View=function(){function e(t){this.delegate=t,this.element=document.documentElement}return e.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},e.prototype.getSnapshot=function(){return t.Snapshot.fromElement(this.element)},e.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,e):this.renderError(r,e)},e.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},e.prototype.renderSnapshot=function(e,r){return t.SnapshotRenderer.render(this.delegate,r,this.getSnapshot(),t.Snapshot.wrap(e))},e.prototype.renderError=function(e,r){return t.ErrorRenderer.render(this.delegate,r,e)},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ScrollManager=function(){function t(t){this.delegate=t,this.onScroll=e(this.onScroll,this)}return t.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},t.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},t.prototype.scrollToElement=function(t){return t.scrollIntoView()},t.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},t.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},t.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},t}()}.call(this),function(){t.SnapshotCache=function(){function e(t){this.size=t,this.keys=[],this.snapshots={}}var r;return e.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},e.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},e.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},e.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},e.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},e.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},e.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(e){return t.Location.wrap(e).toCacheKey()},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=e(this.performScroll,this),this.identifier=t.uuid(),this.location=t.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new t.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(e,r){return this.response=e,null!=r&&(this.redirectedToLocation=t.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return t.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Controller=function(){function r(){this.clickBubbled=e(this.clickBubbled,this),this.clickCaptured=e(this.clickCaptured,this),this.pageLoaded=e(this.pageLoaded,this),this.history=new t.History(this),this.view=new t.View(this),this.scrollManager=new t.ScrollManager(this),this.restorationData={},this.clearCache()}return r.prototype.start=function(){return t.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new t.SnapshotCache(10)},r.prototype.visit=function(e,r){var n,o;return null==r&&(r={}),e=t.Location.wrap(e),this.applicationAllowsVisitingLocation(e)?this.locationIsVisitable(e)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(e,n)):window.location=e:void 0},r.prototype.startVisitToLocationWithAction=function(e,r,n){var o;return t.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(e,r,{restorationData:o})):window.location=e},r.prototype.startHistory=function(){return this.location=t.Location.wrap(window.location),this.restorationIdentifier=t.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(e,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(e,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=t.Location.wrap(e)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},r.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=document.getElementById(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(e,r){return t.dispatch("turbolinks:click",{target:e,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(e){return t.dispatch("turbolinks:before-visit",{data:{url:e.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(e){return t.dispatch("turbolinks:visit",{data:{url:e.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return t.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(e){return t.dispatch("turbolinks:before-render",{data:{newBody:e}})},r.prototype.notifyApplicationAfterRender=function(){return t.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(e){return null==e&&(e={}),t.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:e}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(e,r,n){
var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new t.Visit(this,e,r),u.restorationIdentifier=null!=a?a:t.uuid(),u.restorationData=t.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(e){return this.nodeIsVisitable(e)?t.closest(e,"a[href]:not([target])"):void 0},r.prototype.getVisitableLocationForLink=function(e){var r;return r=new t.Location(e.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(e){var r;return(r=t.closest(e,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){var e,r,n;t.start=function(){return r()?(null==t.controller&&(t.controller=e()),t.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=t),n()},e=function(){var e;return e=new t.Controller,e.adapter=new t.BrowserAdapter(e),e},n=function(){return window.Turbolinks===t},n()&&t.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=t:"function"==typeof define&&define.amd&&define(t)}).call(this);
/*!
 * Bootstrap v3.3.5 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */

if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.5",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.5",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")?(c.prop("checked")&&(a=!1),b.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==c.prop("type")&&(c.prop("checked")!==this.$element.hasClass("active")&&(a=!1),this.$element.toggleClass("active")),c.prop("checked",this.$element.hasClass("active")),a&&c.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),a(c.target).is('input[type="radio"]')||a(c.target).is('input[type="checkbox"]')||c.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.5",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));return a>this.$items.length-1||0>a?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&/show|hide/.test(b)&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a('[data-toggle="collapse"][href="#'+b.id+'"],[data-toggle="collapse"][data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.5",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":e.data();c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function c(c){c&&3===c.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=b(d),f={relatedTarget:this};e.hasClass("open")&&(c&&"click"==c.type&&/input|textarea/i.test(c.target.tagName)&&a.contains(e[0],c.target)||(e.trigger(c=a.Event("hide.bs.dropdown",f)),c.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger("hidden.bs.dropdown",f))))}))}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.5",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=b(e),g=f.hasClass("open");if(c(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click",c);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger("shown.bs.dropdown",h)}return!1}},g.prototype.keydown=function(c){if(/(38|40|27|32)/.test(c.which)&&!/input|textarea/i.test(c.target.tagName)){var d=a(this);if(c.preventDefault(),c.stopPropagation(),!d.is(".disabled, :disabled")){var e=b(d),g=e.hasClass("open");if(!g&&27!=c.which||g&&27==c.which)return 27==c.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.disabled):visible a",i=e.find(".dropdown-menu"+h);if(i.length){var j=i.index(c.target);38==c.which&&j>0&&j--,40==c.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",c).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.5",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){d.$element.one("mouseup.dismiss.bs.modal",function(b){a(b.target).is(d.$element)&&(d.ignoreBackdropClick=!0)})}),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in"),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$dialog.one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a(document.createElement("div")).addClass("modal-backdrop "+e).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.adjustDialog()},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){var a=window.innerWidth;if(!a){var b=document.documentElement.getBoundingClientRect();a=b.right-Math.abs(b.left)}this.bodyIsOverflowing=document.body.clientWidth<a,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",a,b)};c.VERSION="3.3.5",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(a.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusin"==b.type?"focus":"hover"]=!0),c.tip().hasClass("in")||"in"==c.hoverState?void(c.hoverState="in"):(clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.isInStateTrue=function(){for(var a in this.inState)if(this.inState[a])return!0;return!1},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusout"==b.type?"focus":"hover"]=!1),c.isInStateTrue()?void 0:(clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide())},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.getPosition(this.$viewport);h="bottom"==h&&k.bottom+m>o.bottom?"top":"top"==h&&k.top-m<o.top?"bottom":"right"==h&&k.right+l>o.width?"left":"left"==h&&k.left-l<o.left?"right":h,f.removeClass(n).addClass(h)}var p=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(p,h);var q=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",q).emulateTransitionEnd(c.TRANSITION_DURATION):q()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top+=g,b.left+=h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=a(this.$tip),g=a.Event("hide.bs."+this.type);return this.$element.trigger(g),g.isDefaultPrevented()?void 0:(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=d?{top:0,left:0}:b.offset(),g={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},h=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,g,h,f)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.right&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){if(!this.$tip&&(this.$tip=a(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),b?(c.inState.click=!c.inState.click,c.isInStateTrue()?c.enter(c):c.leave(c)):c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type),a.$tip&&a.$tip.detach(),a.$tip=null,a.$arrow=null,a.$viewport=null})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.5",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){this.$body=a(document.body),this.$scrollElement=a(a(c).is(document.body)?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",a.proxy(this.process,this)),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.5",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b=this,c="offset",d=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),a.isWindow(this.$scrollElement[0])||(c="position",d=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var b=a(this),e=b.data("target")||b.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[c]().top+d,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(void 0===e[a+1]||b<e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),
d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.5",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu").length&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.5",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return c>e?"top":!1;if("bottom"==this.affixed)return null!=c?e+this.unpin<=f.top?!1:"bottom":a-d>=e+g?!1:"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&c>=e?"top":null!=d&&i+j>=a-d?"bottom":!1},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=Math.max(a(document).height(),a(document.body).height());"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);
function validate() {
    let valid = true;
    valid = checkName(document.getElementById('form-register-full-name').value);
    valid = valid && checkEmail(document.getElementById('form-register-email').value);
    valid = valid && checkPassword(document.getElementById('form-register-password').value);
    valid = valid && checkPasswordConfirm(document.getElementById('form-register-confirm-password').value);
    $("#register_button").attr("disabled", true);
    if (valid) {
        $("#register_button").attr("disabled", false);
    }
}

function checkName(obj) {
    let result = true;
    let inputT = /[a-zA-Z0-9]+/.test(obj);
    let msg = document.getElementById('confirmName');
   
    if( inputT == true) {
        msg.innerHTML = '<small>' + 'Thank you ' + '</small>';
        return result = true;
    } else {
        msg.innerHTML = '<small>' + 'Please provide a valid name' + '</small>';
        return result = false;
    }
}
function checkEmail(obj) {
    let result = true;
    let itemC = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(obj);
    let change = document.getElementById('testEmail');
    if(itemC == true) {
        change.innerHTML = '<small>' + 'Thank you!' + '</small>';
        return result = true;
    } else {
        change.innerHTML = '<small>' + 'Valid email address please' + '</small>';
        return result = false;
    }
}

function checkPassword(obj) {
    let result = true;
    let itemC = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(obj);
    let change = document.getElementById('testPassword');
    if(itemC == true) {
        change.innerHTML = '<small>' + 'Great password' + '</small>';
        return result = true;
    } else {
        change.innerHTML = '<small>' + 'Passwords require a symbol, number, lowercase and uppercase letter' + '</small>';
        return result = false;
    }
}

function checkPasswordConfirm(obj) {
    let result = true;
    let msg = document.getElementById('form-register-password').value;
    let change = document.getElementById('confirmPassword2');
    if(obj == msg && obj !== "") {
        change.innerHTML = '<small>' + 'Passwords match!' + '</small>';
        return result = true;
    } else if(obj == "") {
        change.innerHTML = '<small>' + 'Password confirmation needed' + '</small>';
        return result = false;
    } else {
        change.innerHTML = '<small>' + 'Password must match the above' + '</small>';
        return result = false;
    }
}
;
"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function e(t,n,o){function r(a,s){if(!n[a]){if(!t[a]){var c="function"==typeof require&&require;if(!s&&c)return c(a,!0);if(i)return i(a,!0);throw new Error("Cannot find module '"+a+"'")}var u=n[a]={exports:{}};t[a][0].call(u.exports,function(e){var n=t[a][1][e];return r(n?n:e)},u,u.exports,e,t,n,o)}return n[a].exports}for(var i="function"==typeof require&&require,a=0;a<o.length;a++)r(o[a]);return r}({1:[function(e,t,n){var o=e("react"),r=(e("react-star-rating-component"),o.createClass({displayName:"ReviewForm",getInitialState:function(){return{rating:1}},onStarClick:function(e,t,n){this.setState({rating:e})},handleClick:function(e){var t=this,n=document.getElementById("form-review");$.ajax({url:"/api/v1/restaurants/"+document.getElementById("restaurant_id").value+"/reviews",type:"POST",data:{review:{rating:this.state.rating,comment:this.refs.review.value,restaurant_id:document.getElementById("restaurant_id").value}},beforeSend:function(e,t){e.setRequestHeader("X-CSRF-Token",$('meta[name="csrf-token"]').attr("content"))},success:function(e){t.props.handleSubmit(e),n.reset(),t.setState({rating:1})}}),e.preventDefault()},starRating:function(e){console.log(e),this.setState({rating:e})},render:function(){this.state.rating;return o.createElement("div",null,o.createElement("section",null,o.createElement("header",null,o.createElement("h2",null,"Leave a Review")),o.createElement("form",{id:"form-review",role:"form",method:"post",className:"background-color-white"},o.createElement("div",{className:"row"},o.createElement("div",{className:"col-md-12"},o.createElement("fieldset",{className:"starability-basic"},o.createElement("legend",null,"Your rating:"),o.createElement("input",{type:"radio",id:"first-rate5",name:"rating",value:"5",onClick:this.starRating.bind(null,5),onKeyUp:this.starRating.bind(null,5)}),o.createElement("label",{htmlFor:"first-rate5",title:"Amazing"},"5 stars"),o.createElement("input",{type:"radio",id:"first-rate4",name:"rating",value:"4",onClick:this.starRating.bind(null,4),onKeyUp:this.starRating.bind(null,4)}),o.createElement("label",{htmlFor:"first-rate4",title:"Very good"},"4 stars"),o.createElement("input",{type:"radio",id:"first-rate3",name:"rating",value:"3",onClick:this.starRating.bind(null,3),onKeyUp:this.starRating.bind(null,3)}),o.createElement("label",{htmlFor:"first-rate3",title:"Average"},"3 stars"),o.createElement("input",{type:"radio",id:"first-rate2",name:"rating",value:"2",onClick:this.starRating.bind(null,2),onKeyUp:this.starRating.bind(null,2)}),o.createElement("label",{htmlFor:"first-rate2",title:"Not good"},"2 stars"),o.createElement("input",{type:"radio",id:"first-rate1",name:"rating",value:"1",onClick:this.starRating.bind(null,1),onKeyUp:this.starRating.bind(null,1)}),o.createElement("label",{htmlFor:"first-rate1",title:"Terrible"},"1 star")),o.createElement("div",{className:"form-group"},o.createElement("label",{htmlFor:"form-review-message"},"Review"),o.createElement("textarea",{ref:"review",className:"form-control",id:"form-review-message",name:"form-review-message",rows:"3",required:""})),o.createElement("div",{className:"form-group"},o.createElement("button",{type:"submit",className:"btn btn-default",onClick:this.handleClick},"Submit Review")))))))}}));t.exports=r},{react:182,"react-star-rating-component":157}],2:[function(e,t,n){var o=e("react"),r=e("react-star-rating-component"),i=o.createClass({displayName:"Reviews",render:function(){return o.createElement("div",null,o.createElement("section",{className:"reviews"},o.createElement("article",{className:"review"},o.createElement("div",{className:"wrapper"},o.createElement(r,{name:"rate2",editing:!1,value:this.props.singleReview.rating,starCount:5}),o.createElement("p",null,this.props.singleReview.comment),o.createElement("h5",null,this.props.singleReview.user.first_name),o.createElement("div",null,"Reviewed on: ",o.createElement("p",{className:"date"},this.props.singleReview.created_at))))))}});t.exports=i},{react:182,"react-star-rating-component":157}],3:[function(e,t,n){var o=e("react"),r=e("react-dom"),i=e("./components/review_form"),a=e("./components/reviews"),s=e("react-star-rating-component"),c=o.createClass({displayName:"MainInterface",getInitialState:function(){return{reviews:[]}},componentDidMount:function(){var e=this;fetch("/api/v1/restaurants/"+document.getElementById("restaurant_id").value+"/reviews.json").then(function(e){return e.json()}).then(function(t){e.setState({reviews:t})})},handleSubmit:function(e){this.setState({reviews:[]});var t=this.state.reviews.concat(e);this.setState({reviews:t})},render:function(){var e=this.state.reviews;e=e.map(function(e,t){return o.createElement(a,{key:t,singleReview:e})});var t=o.createElement("div",null,o.createElement("h3",null,"Please sign in or register to leave a review"));return o.createElement("div",null,o.createElement("section",{className:"block",id:"reviews"},o.createElement("header",{className:"clearfix"},o.createElement("h2",{className:"pull-left"},"Reviews")),e),""==document.getElementById("current_user").value?t:o.createElement(i,{handleSubmit:this.handleSubmit}))}});r.render(o.createElement(c,null),document.getElementById("app"));var u=o.createClass({displayName:"AverageRating",render:function(){return o.createElement("div",null,o.createElement(s,{name:"avg_rating",starCount:5,editing:!1,value:Number(document.getElementById("avg_rating").value)}))}});r.render(o.createElement(u,null),document.getElementById("average_rating"))},{"./components/review_form":1,"./components/reviews":2,react:182,"react-dom":30,"react-star-rating-component":157}],4:[function(e,t,n){!function(){function e(){for(var t=[],o=0;o<arguments.length;o++){var r=arguments[o];if(r){var i="undefined"==typeof r?"undefined":_typeof(r);if("string"===i||"number"===i)t.push(r);else if(Array.isArray(r))t.push(e.apply(null,r));else if("object"===i)for(var a in r)n.call(r,a)&&r[a]&&t.push(a)}}return t.join(" ")}var n={}.hasOwnProperty;"undefined"!=typeof t&&t.exports?t.exports=e:"function"==typeof define&&"object"===_typeof(define.amd)&&define.amd?define("classnames",[],function(){return e}):window.classNames=e}()},{}],5:[function(e,t,n){(function(n){var o=e("./emptyFunction"),r={listen:function(e,t,n){return e.addEventListener?(e.addEventListener(t,n,!1),{remove:function(){e.removeEventListener(t,n,!1)}}):e.attachEvent?(e.attachEvent("on"+t,n),{remove:function(){e.detachEvent("on"+t,n)}}):void 0},capture:function(e,t,r){return e.addEventListener?(e.addEventListener(t,r,!0),{remove:function(){e.removeEventListener(t,r,!0)}}):("production"!==n.env.NODE_ENV&&console.error("Attempted to listen to events during the capture phase on a browser that does not support the capture phase. Your application will not receive some events."),{remove:o})},registerDefault:function(){}};t.exports=r}).call(this,e("rH1JPG"))},{"./emptyFunction":12,rH1JPG:29}],6:[function(e,t,n){var o=!("undefined"==typeof window||!window.document||!window.document.createElement),r={canUseDOM:o,canUseWorkers:"undefined"!=typeof Worker,canUseEventListeners:o&&!(!window.addEventListener&&!window.attachEvent),canUseViewport:o&&!!window.screen,isInWorker:!o};t.exports=r},{}],7:[function(e,t,n){function o(e){return e.replace(r,function(e,t){return t.toUpperCase()})}var r=/-(.)/g;t.exports=o},{}],8:[function(e,t,n){function o(e){return r(e.replace(i,"ms-"))}var r=e("./camelize"),i=/^-ms-/;t.exports=o},{"./camelize":7}],9:[function(e,t,n){function o(e,t){return!(!e||!t)&&(e===t||!r(e)&&(r(t)?o(e,t.parentNode):"contains"in e?e.contains(t):!!e.compareDocumentPosition&&!!(16&e.compareDocumentPosition(t))))}var r=e("./isTextNode");t.exports=o},{"./isTextNode":22}],10:[function(e,t,n){(function(n){function o(e){var t=e.length;if(Array.isArray(e)||"object"!==("undefined"==typeof e?"undefined":_typeof(e))&&"function"!=typeof e?"production"!==n.env.NODE_ENV?a(!1,"toArray: Array-like object expected"):a(!1):void 0,"number"!=typeof t?"production"!==n.env.NODE_ENV?a(!1,"toArray: Object needs a length property"):a(!1):void 0,0===t||t-1 in e?void 0:"production"!==n.env.NODE_ENV?a(!1,"toArray: Object should have keys for indices"):a(!1),"function"==typeof e.callee?"production"!==n.env.NODE_ENV?a(!1,"toArray: Object can't be `arguments`. Use rest params (function(...args) {}) or Array.from() instead."):a(!1):void 0,e.hasOwnProperty)try{return Array.prototype.slice.call(e)}catch(e){}for(var o=Array(t),r=0;r<t;r++)o[r]=e[r];return o}function r(e){return!!e&&("object"==("undefined"==typeof e?"undefined":_typeof(e))||"function"==typeof e)&&"length"in e&&!("setInterval"in e)&&"number"!=typeof e.nodeType&&(Array.isArray(e)||"callee"in e||"item"in e)}function i(e){return r(e)?Array.isArray(e)?e.slice():o(e):[e]}var a=e("./invariant");t.exports=i}).call(this,e("rH1JPG"))},{"./invariant":20,rH1JPG:29}],11:[function(e,t,n){(function(n){function o(e){var t=e.match(l);return t&&t[1].toLowerCase()}function r(e,t){var r=u;u?void 0:"production"!==n.env.NODE_ENV?c(!1,"createNodesFromMarkup dummy not initialized"):c(!1);var i=o(e),l=i&&s(i);if(l){r.innerHTML=l[1]+e+l[2];for(var p=l[0];p--;)r=r.lastChild}else r.innerHTML=e;var d=r.getElementsByTagName("script");d.length&&(t?void 0:"production"!==n.env.NODE_ENV?c(!1,"createNodesFromMarkup(...): Unexpected <script> element rendered."):c(!1),a(d).forEach(t));for(var f=Array.from(r.childNodes);r.lastChild;)r.removeChild(r.lastChild);return f}var i=e("./ExecutionEnvironment"),a=e("./createArrayFromMixed"),s=e("./getMarkupWrap"),c=e("./invariant"),u=i.canUseDOM?document.createElement("div"):null,l=/^\s*<(\w+)/;t.exports=r}).call(this,e("rH1JPG"))},{"./ExecutionEnvironment":6,"./createArrayFromMixed":10,"./getMarkupWrap":16,"./invariant":20,rH1JPG:29}],12:[function(e,t,n){function o(e){return function(){return e}}var r=function(){};r.thatReturns=o,r.thatReturnsFalse=o(!1),r.thatReturnsTrue=o(!0),r.thatReturnsNull=o(null),r.thatReturnsThis=function(){return this},r.thatReturnsArgument=function(e){return e},t.exports=r},{}],13:[function(e,t,n){(function(e){var n={};"production"!==e.env.NODE_ENV&&Object.freeze(n),t.exports=n}).call(this,e("rH1JPG"))},{rH1JPG:29}],14:[function(e,t,n){function o(e){try{e.focus()}catch(e){}}t.exports=o},{}],15:[function(e,t,n){function o(){if("undefined"==typeof document)return null;try{return document.activeElement||document.body}catch(e){return document.body}}t.exports=o},{}],16:[function(e,t,n){(function(n){function o(e){return a?void 0:"production"!==n.env.NODE_ENV?i(!1,"Markup wrapping node not initialized"):i(!1),d.hasOwnProperty(e)||(e="*"),s.hasOwnProperty(e)||("*"===e?a.innerHTML="<link />":a.innerHTML="<"+e+"></"+e+">",s[e]=!a.firstChild),s[e]?d[e]:null}var r=e("./ExecutionEnvironment"),i=e("./invariant"),a=r.canUseDOM?document.createElement("div"):null,s={},c=[1,'<select multiple="true">',"</select>"],u=[1,"<table>","</table>"],l=[3,"<table><tbody><tr>","</tr></tbody></table>"],p=[1,'<svg xmlns="http://www.w3.org/2000/svg">',"</svg>"],d={"*":[1,"?<div>","</div>"],area:[1,"<map>","</map>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],legend:[1,"<fieldset>","</fieldset>"],param:[1,"<object>","</object>"],tr:[2,"<table><tbody>","</tbody></table>"],optgroup:c,option:c,caption:u,colgroup:u,tbody:u,tfoot:u,thead:u,td:l,th:l},f=["circle","clipPath","defs","ellipse","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","text","tspan"];f.forEach(function(e){d[e]=p,s[e]=!0}),t.exports=o}).call(this,e("rH1JPG"))},{"./ExecutionEnvironment":6,"./invariant":20,rH1JPG:29}],17:[function(e,t,n){function o(e){return e===window?{x:window.pageXOffset||document.documentElement.scrollLeft,y:window.pageYOffset||document.documentElement.scrollTop}:{x:e.scrollLeft,y:e.scrollTop}}t.exports=o},{}],18:[function(e,t,n){function o(e){return e.replace(r,"-$1").toLowerCase()}var r=/([A-Z])/g;t.exports=o},{}],19:[function(e,t,n){function o(e){return r(e).replace(i,"-ms-")}var r=e("./hyphenate"),i=/^ms-/;t.exports=o},{"./hyphenate":18}],20:[function(e,t,n){(function(e){function n(t,n,o,r,i,a,s,c){if("production"!==e.env.NODE_ENV&&void 0===n)throw new Error("invariant requires an error message argument");if(!t){var u;if(void 0===n)u=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var l=[o,r,i,a,s,c],p=0;u=new Error(n.replace(/%s/g,function(){return l[p++]})),u.name="Invariant Violation"}throw u.framesToPop=1,u}}t.exports=n}).call(this,e("rH1JPG"))},{rH1JPG:29}],21:[function(e,t,n){function o(e){return!(!e||!("function"==typeof Node?e instanceof Node:"object"===("undefined"==typeof e?"undefined":_typeof(e))&&"number"==typeof e.nodeType&&"string"==typeof e.nodeName))}t.exports=o},{}],22:[function(e,t,n){function o(e){return r(e)&&3==e.nodeType}var r=e("./isNode");t.exports=o},{"./isNode":21}],23:[function(e,t,n){function o(e){var t={};return function(n){return t.hasOwnProperty(n)||(t[n]=e.call(this,n)),t[n]}}t.exports=o},{}],24:[function(e,t,n){var o,r=e("./ExecutionEnvironment");r.canUseDOM&&(o=window.performance||window.msPerformance||window.webkitPerformance),t.exports=o||{}},{"./ExecutionEnvironment":6}],25:[function(e,t,n){var o,r=e("./performance");o=r.now?function(){return r.now()}:function(){return Date.now()},t.exports=o},{"./performance":24}],26:[function(e,t,n){function o(e,t){return e===t?0!==e||0!==t||1/e===1/t:e!==e&&t!==t}function r(e,t){if(o(e,t))return!0;if("object"!==("undefined"==typeof e?"undefined":_typeof(e))||null===e||"object"!==("undefined"==typeof t?"undefined":_typeof(t))||null===t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(var a=0;a<n.length;a++)if(!i.call(t,n[a])||!o(e[n[a]],t[n[a]]))return!1;return!0}var i=Object.prototype.hasOwnProperty;t.exports=r},{}],27:[function(e,t,n){(function(n){var o=e("./emptyFunction"),r=o;"production"!==n.env.NODE_ENV&&!function(){var e=function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];var r=0,i="Warning: "+e.replace(/%s/g,function(){return n[r++]});"undefined"!=typeof console&&console.error(i);try{throw new Error(i)}catch(e){}};r=function(t,n){if(void 0===n)throw new Error("`warning(condition, format, ...args)` requires a warning message argument");if(0!==n.indexOf("Failed Composite propType: ")&&!t){for(var o=arguments.length,r=Array(o>2?o-2:0),i=2;i<o;i++)r[i-2]=arguments[i];e.apply(void 0,[n].concat(r))}}}(),t.exports=r}).call(this,e("rH1JPG"))},{"./emptyFunction":12,rH1JPG:29}],28:[function(e,t,n){function o(e){if(null===e||void 0===e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}function r(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;var o=Object.getOwnPropertyNames(t).map(function(e){return t[e]});if("0123456789"!==o.join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach(function(e){r[e]=e}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(e){return!1}}var i=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable;t.exports=r()?Object.assign:function(e,t){for(var n,r,s=o(e),c=1;c<arguments.length;c++){n=Object(arguments[c]);for(var u in n)i.call(n,u)&&(s[u]=n[u]);if(Object.getOwnPropertySymbols){r=Object.getOwnPropertySymbols(n);for(var l=0;l<r.length;l++)a.call(n,r[l])&&(s[r[l]]=n[r[l]])}}return s}},{}],29:[function(e,t,n){function o(){}var r=t.exports={};r.nextTick=function(){var e="undefined"!=typeof window&&window.setImmediate,t="undefined"!=typeof window&&window.postMessage&&window.addEventListener;if(e)return function(e){return window.setImmediate(e)};if(t){var n=[];return window.addEventListener("message",function(e){var t=e.source;if((t===window||null===t)&&"process-tick"===e.data&&(e.stopPropagation(),n.length>0)){var o=n.shift();o()}},!0),function(e){n.push(e),window.postMessage("process-tick","*")}}return function(e){setTimeout(e,0)}}(),r.title="browser",r.browser=!0,r.env={},r.argv=[],r.on=o,r.addListener=o,r.once=o,r.off=o,r.removeListener=o,r.removeAllListeners=o,r.emit=o,r.binding=function(e){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(e){throw new Error("process.chdir is not supported")}},{}],30:[function(e,t,n){t.exports=e("./lib/ReactDOM")},{"./lib/ReactDOM":60}],31:[function(e,t,n){var o={Properties:{"aria-current":0,"aria-details":0,"aria-disabled":0,"aria-hidden":0,"aria-invalid":0,"aria-keyshortcuts":0,"aria-label":0,"aria-roledescription":0,"aria-autocomplete":0,"aria-checked":0,"aria-expanded":0,"aria-haspopup":0,"aria-level":0,"aria-modal":0,"aria-multiline":0,"aria-multiselectable":0,"aria-orientation":0,"aria-placeholder":0,"aria-pressed":0,"aria-readonly":0,"aria-required":0,"aria-selected":0,"aria-sort":0,"aria-valuemax":0,"aria-valuemin":0,"aria-valuenow":0,"aria-valuetext":0,"aria-atomic":0,"aria-busy":0,"aria-live":0,"aria-relevant":0,"aria-dropeffect":0,"aria-grabbed":0,"aria-activedescendant":0,"aria-colcount":0,"aria-colindex":0,"aria-colspan":0,"aria-controls":0,"aria-describedby":0,"aria-errormessage":0,"aria-flowto":0,"aria-labelledby":0,"aria-owns":0,"aria-posinset":0,"aria-rowcount":0,"aria-rowindex":0,"aria-rowspan":0,"aria-setsize":0},DOMAttributeNames:{},DOMPropertyNames:{}};t.exports=o},{}],32:[function(e,t,n){var o=e("./ReactDOMComponentTree"),r=e("fbjs/lib/focusNode"),i={focusDOMComponent:function(){r(o.getNodeFromInstance(this))}};t.exports=i},{"./ReactDOMComponentTree":63,"fbjs/lib/focusNode":14}],33:[function(e,t,n){function o(){var e=window.opera;return"object"===("undefined"==typeof e?"undefined":_typeof(e))&&"function"==typeof e.version&&parseInt(e.version(),10)<=12}function r(e){return(e.ctrlKey||e.altKey||e.metaKey)&&!(e.ctrlKey&&e.altKey)}function i(e){switch(e){case"topCompositionStart":return w.compositionStart;case"topCompositionEnd":return w.compositionEnd;case"topCompositionUpdate":return w.compositionUpdate}}function a(e,t){return"topKeyDown"===e&&t.keyCode===b}function s(e,t){switch(e){case"topKeyUp":return y.indexOf(t.keyCode)!==-1;case"topKeyDown":return t.keyCode!==b;case"topKeyPress":case"topMouseDown":case"topBlur":return!0;default:return!1}}function c(e){var t=e.detail;return"object"===("undefined"==typeof t?"undefined":_typeof(t))&&"data"in t?t.data:null}function u(e,t,n,o){var r,u;if(E?r=i(e):P?s(e,n)&&(r=w.compositionEnd):a(e,n)&&(r=w.compositionStart),!r)return null;C&&(P||r!==w.compositionStart?r===w.compositionEnd&&P&&(u=P.getData()):P=h.getPooled(o));var l=m.getPooled(r,t,n,o);if(u)l.data=u;else{var p=c(n);null!==p&&(l.data=p)}return f.accumulateTwoPhaseDispatches(l),l}function l(e,t){switch(e){case"topCompositionEnd":return c(t);case"topKeyPress":var n=t.which;return n!==O?null:(R=!0,D);case"topTextInput":var o=t.data;return o===D&&R?null:o;default:return null}}function p(e,t){if(P){if("topCompositionEnd"===e||!E&&s(e,t)){var n=P.getData();return h.release(P),P=null,n}return null}switch(e){case"topPaste":return null;case"topKeyPress":return t.which&&!r(t)?String.fromCharCode(t.which):null;case"topCompositionEnd":return C?null:t.data;default:return null}}function d(e,t,n,o){var r;if(r=N?l(e,n):p(e,n),!r)return null;var i=g.getPooled(w.beforeInput,t,n,o);return i.data=r,f.accumulateTwoPhaseDispatches(i),i}var f=e("./EventPropagators"),v=e("fbjs/lib/ExecutionEnvironment"),h=e("./FallbackCompositionState"),m=e("./SyntheticCompositionEvent"),g=e("./SyntheticInputEvent"),y=[9,13,27,32],b=229,E=v.canUseDOM&&"CompositionEvent"in window,_=null;v.canUseDOM&&"documentMode"in document&&(_=document.documentMode);var N=v.canUseDOM&&"TextEvent"in window&&!_&&!o(),C=v.canUseDOM&&(!E||_&&_>8&&_<=11),O=32,D=String.fromCharCode(O),w={beforeInput:{phasedRegistrationNames:{bubbled:"onBeforeInput",captured:"onBeforeInputCapture"},dependencies:["topCompositionEnd","topKeyPress","topTextInput","topPaste"]},compositionEnd:{phasedRegistrationNames:{bubbled:"onCompositionEnd",captured:"onCompositionEndCapture"},dependencies:["topBlur","topCompositionEnd","topKeyDown","topKeyPress","topKeyUp","topMouseDown"]},compositionStart:{phasedRegistrationNames:{bubbled:"onCompositionStart",captured:"onCompositionStartCapture"},dependencies:["topBlur","topCompositionStart","topKeyDown","topKeyPress","topKeyUp","topMouseDown"]},compositionUpdate:{phasedRegistrationNames:{bubbled:"onCompositionUpdate",captured:"onCompositionUpdateCapture"},dependencies:["topBlur","topCompositionUpdate","topKeyDown","topKeyPress","topKeyUp","topMouseDown"]}},R=!1,P=null,T={eventTypes:w,extractEvents:function(e,t,n,o){return[u(e,t,n,o),d(e,t,n,o)]}};t.exports=T},{"./EventPropagators":49,"./FallbackCompositionState":50,"./SyntheticCompositionEvent":114,"./SyntheticInputEvent":118,"fbjs/lib/ExecutionEnvironment":6}],34:[function(e,t,n){function o(e,t){return e+t.charAt(0).toUpperCase()+t.substring(1)}var r={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridRow:!0,gridColumn:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},i=["Webkit","ms","Moz","O"];Object.keys(r).forEach(function(e){i.forEach(function(t){r[o(t,e)]=r[e]})});var a={background:{backgroundAttachment:!0,backgroundColor:!0,backgroundImage:!0,backgroundPositionX:!0,backgroundPositionY:!0,backgroundRepeat:!0},backgroundPosition:{backgroundPositionX:!0,backgroundPositionY:!0},border:{borderWidth:!0,borderStyle:!0,borderColor:!0},borderBottom:{borderBottomWidth:!0,borderBottomStyle:!0,borderBottomColor:!0},borderLeft:{borderLeftWidth:!0,borderLeftStyle:!0,borderLeftColor:!0},borderRight:{borderRightWidth:!0,borderRightStyle:!0,borderRightColor:!0},borderTop:{borderTopWidth:!0,borderTopStyle:!0,borderTopColor:!0},font:{fontStyle:!0,fontVariant:!0,fontWeight:!0,fontSize:!0,lineHeight:!0,fontFamily:!0},outline:{outlineWidth:!0,outlineStyle:!0,outlineColor:!0}},s={isUnitlessNumber:r,shorthandPropertyExpansions:a};t.exports=s},{}],35:[function(e,t,n){(function(n){var o=e("./CSSProperty"),r=e("fbjs/lib/ExecutionEnvironment"),i=e("./ReactInstrumentation"),a=e("fbjs/lib/camelizeStyleName"),s=e("./dangerousStyleValue"),c=e("fbjs/lib/hyphenateStyleName"),u=e("fbjs/lib/memoizeStringOnly"),l=e("fbjs/lib/warning"),p=u(function(e){return c(e)}),d=!1,f="cssFloat";if(r.canUseDOM){var v=document.createElement("div").style;try{v.font=""}catch(e){d=!0}void 0===document.documentElement.style.cssFloat&&(f="styleFloat")}if("production"!==n.env.NODE_ENV)var h=/^(?:webkit|moz|o)[A-Z]/,m=/;\s*$/,g={},y={},b=!1,E=function(e,t){g.hasOwnProperty(e)&&g[e]||(g[e]=!0,"production"!==n.env.NODE_ENV?l(!1,"Unsupported style property %s. Did you mean %s?%s",e,a(e),O(t)):void 0)},_=function(e,t){g.hasOwnProperty(e)&&g[e]||(g[e]=!0,"production"!==n.env.NODE_ENV?l(!1,"Unsupported vendor-prefixed style property %s. Did you mean %s?%s",e,e.charAt(0).toUpperCase()+e.slice(1),O(t)):void 0)},N=function(e,t,o){y.hasOwnProperty(t)&&y[t]||(y[t]=!0,"production"!==n.env.NODE_ENV?l(!1,'Style property values shouldn\'t contain a semicolon.%s Try "%s: %s" instead.',O(o),e,t.replace(m,"")):void 0)},C=function(e,t,o){b||(b=!0,"production"!==n.env.NODE_ENV?l(!1,"`NaN` is an invalid value for the `%s` css style property.%s",e,O(o)):void 0)},O=function(e){if(e){var t=e.getName();if(t)return" Check the render method of `"+t+"`."}return""},D=function(e,t,n){var o;n&&(o=n._currentElement._owner),e.indexOf("-")>-1?E(e,o):h.test(e)?_(e,o):m.test(t)&&N(e,t,o),"number"==typeof t&&isNaN(t)&&C(e,t,o)};var w={createMarkupForStyles:function(e,t){var o="";for(var r in e)if(e.hasOwnProperty(r)){var i=e[r];"production"!==n.env.NODE_ENV&&D(r,i,t),null!=i&&(o+=p(r)+":",o+=s(r,i,t)+";")}return o||null},setValueForStyles:function(e,t,r){"production"!==n.env.NODE_ENV&&i.debugTool.onHostOperation({instanceID:r._debugID,type:"update styles",payload:t});var a=e.style;for(var c in t)if(t.hasOwnProperty(c)){"production"!==n.env.NODE_ENV&&D(c,t[c],r);var u=s(c,t[c],r);if("float"!==c&&"cssFloat"!==c||(c=f),u)a[c]=u;else{var l=d&&o.shorthandPropertyExpansions[c];if(l)for(var p in l)a[p]="";else a[c]=""}}}};t.exports=w}).call(this,e("rH1JPG"))},{"./CSSProperty":34,"./ReactInstrumentation":92,"./dangerousStyleValue":131,"fbjs/lib/ExecutionEnvironment":6,"fbjs/lib/camelizeStyleName":8,"fbjs/lib/hyphenateStyleName":19,"fbjs/lib/memoizeStringOnly":23,"fbjs/lib/warning":27,rH1JPG:29}],36:[function(e,t,n){(function(n){function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var r=e("./reactProdInvariant"),i=e("./PooledClass"),a=e("fbjs/lib/invariant"),s=function(){function e(t){o(this,e),this._callbacks=null,this._contexts=null,this._arg=t}return e.prototype.enqueue=function(e,t){this._callbacks=this._callbacks||[],this._callbacks.push(e),this._contexts=this._contexts||[],this._contexts.push(t)},e.prototype.notifyAll=function(){var e=this._callbacks,t=this._contexts,o=this._arg;if(e&&t){e.length!==t.length?"production"!==n.env.NODE_ENV?a(!1,"Mismatched list of contexts in callback queue"):r("24"):void 0,this._callbacks=null,this._contexts=null;for(var i=0;i<e.length;i++)e[i].call(t[i],o);e.length=0,t.length=0}},e.prototype.checkpoint=function(){return this._callbacks?this._callbacks.length:0},e.prototype.rollback=function(e){this._callbacks&&this._contexts&&(this._callbacks.length=e,this._contexts.length=e)},e.prototype.reset=function(){this._callbacks=null,this._contexts=null},e.prototype.destructor=function(){this.reset()},e}();t.exports=i.addPoolingTo(s)}).call(this,e("rH1JPG"))},{"./PooledClass":54,"./reactProdInvariant":150,"fbjs/lib/invariant":20,rH1JPG:29}],37:[function(e,t,n){function o(e){var t=e.nodeName&&e.nodeName.toLowerCase();return"select"===t||"input"===t&&"file"===e.type}function r(e){var t=C.getPooled(R.change,T,e,O(e));b.accumulateTwoPhaseDispatches(t),N.batchedUpdates(i,t)}function i(e){y.enqueueEvents(e),y.processEventQueue(!1)}function a(e,t){P=e,T=t,P.attachEvent("onchange",r)}function s(){P&&(P.detachEvent("onchange",r),P=null,T=null)}function c(e,t){if("topChange"===e)return t}function u(e,t,n){"topFocus"===e?(s(),a(t,n)):"topBlur"===e&&s()}function l(e,t){P=e,T=t,I=e.value,x=Object.getOwnPropertyDescriptor(e.constructor.prototype,"value"),Object.defineProperty(P,"value",S),P.attachEvent?P.attachEvent("onpropertychange",d):P.addEventListener("propertychange",d,!1)}function p(){P&&(delete P.value,P.detachEvent?P.detachEvent("onpropertychange",d):P.removeEventListener("propertychange",d,!1),P=null,T=null,I=null,x=null)}function d(e){if("value"===e.propertyName){var t=e.srcElement.value;t!==I&&(I=t,r(e))}}function f(e,t){if("topInput"===e)return t}function v(e,t,n){"topFocus"===e?(p(),l(t,n)):"topBlur"===e&&p()}function h(e,t){if(("topSelectionChange"===e||"topKeyUp"===e||"topKeyDown"===e)&&P&&P.value!==I)return I=P.value,T}function m(e){return e.nodeName&&"input"===e.nodeName.toLowerCase()&&("checkbox"===e.type||"radio"===e.type)}function g(e,t){if("topClick"===e)return t}var y=e("./EventPluginHub"),b=e("./EventPropagators"),E=e("fbjs/lib/ExecutionEnvironment"),_=e("./ReactDOMComponentTree"),N=e("./ReactUpdates"),C=e("./SyntheticEvent"),O=e("./getEventTarget"),D=e("./isEventSupported"),w=e("./isTextInputElement"),R={change:{phasedRegistrationNames:{bubbled:"onChange",captured:"onChangeCapture"},dependencies:["topBlur","topChange","topClick","topFocus","topInput","topKeyDown","topKeyUp","topSelectionChange"]}},P=null,T=null,I=null,x=null,k=!1;E.canUseDOM&&(k=D("change")&&(!document.documentMode||document.documentMode>8));var M=!1;E.canUseDOM&&(M=D("input")&&(!document.documentMode||document.documentMode>11));var S={get:function(){return x.get.call(this)},set:function(e){I=""+e,x.set.call(this,e)}},V={eventTypes:R,extractEvents:function(e,t,n,r){var i,a,s=t?_.getNodeFromInstance(t):window;if(o(s)?k?i=c:a=u:w(s)?M?i=f:(i=h,a=v):m(s)&&(i=g),i){var l=i(e,t);if(l){var p=C.getPooled(R.change,l,n,r);return p.type="change",b.accumulateTwoPhaseDispatches(p),p}}a&&a(e,s,t)}};t.exports=V},{"./EventPluginHub":46,"./EventPropagators":49,"./ReactDOMComponentTree":63,"./ReactUpdates":107,"./SyntheticEvent":116,"./getEventTarget":139,"./isEventSupported":147,"./isTextInputElement":148,"fbjs/lib/ExecutionEnvironment":6}],38:[function(e,t,n){(function(n){function o(e,t){return Array.isArray(t)&&(t=t[1]),t?t.nextSibling:e.firstChild}function r(e,t,n){l.insertTreeBefore(e,t,n)}function i(e,t,n){Array.isArray(t)?s(e,t[0],t[1],n):g(e,t,n)}function a(e,t){if(Array.isArray(t)){var n=t[1];t=t[0],c(e,t,n),e.removeChild(n)}e.removeChild(t)}function s(e,t,n,o){for(var r=t;;){var i=r.nextSibling;if(g(e,r,o),r===n)break;r=i}}function c(e,t,n){for(;;){var o=t.nextSibling;if(o===n)break;e.removeChild(o)}}function u(e,t,o){var r=e.parentNode,i=e.nextSibling;i===t?o&&g(r,document.createTextNode(o),i):o?(m(i,o),c(r,i,t)):c(r,e,t),"production"!==n.env.NODE_ENV&&f.debugTool.onHostOperation({instanceID:d.getInstanceFromNode(e)._debugID,type:"replace text",payload:o})}var l=e("./DOMLazyTree"),p=e("./Danger"),d=e("./ReactDOMComponentTree"),f=e("./ReactInstrumentation"),v=e("./createMicrosoftUnsafeLocalFunction"),h=e("./setInnerHTML"),m=e("./setTextContent"),g=v(function(e,t,n){e.insertBefore(t,n)}),y=p.dangerouslyReplaceNodeWithMarkup;"production"!==n.env.NODE_ENV&&(y=function(e,t,n){if(p.dangerouslyReplaceNodeWithMarkup(e,t),0!==n._debugID)f.debugTool.onHostOperation({instanceID:n._debugID,type:"replace with",payload:t.toString()});else{var o=d.getInstanceFromNode(t.node);0!==o._debugID&&f.debugTool.onHostOperation({instanceID:o._debugID,type:"mount",payload:t.toString()})}});var b={dangerouslyReplaceNodeWithMarkup:y,replaceDelimitedText:u,processUpdates:function(e,t){if("production"!==n.env.NODE_ENV)var s=d.getInstanceFromNode(e)._debugID;for(var c=0;c<t.length;c++){var u=t[c];switch(u.type){case"INSERT_MARKUP":r(e,u.content,o(e,u.afterNode)),"production"!==n.env.NODE_ENV&&f.debugTool.onHostOperation({instanceID:s,type:"insert child",payload:{toIndex:u.toIndex,content:u.content.toString()}});break;case"MOVE_EXISTING":i(e,u.fromNode,o(e,u.afterNode)),"production"!==n.env.NODE_ENV&&f.debugTool.onHostOperation({instanceID:s,type:"move child",payload:{fromIndex:u.fromIndex,toIndex:u.toIndex}});break;case"SET_MARKUP":h(e,u.content),"production"!==n.env.NODE_ENV&&f.debugTool.onHostOperation({instanceID:s,type:"replace children",payload:u.content.toString()});break;case"TEXT_CONTENT":m(e,u.content),"production"!==n.env.NODE_ENV&&f.debugTool.onHostOperation({instanceID:s,type:"replace text",payload:u.content.toString()});break;case"REMOVE_NODE":a(e,u.fromNode),"production"!==n.env.NODE_ENV&&f.debugTool.onHostOperation({instanceID:s,type:"remove child",payload:{fromIndex:u.fromIndex}})}}}};t.exports=b}).call(this,e("rH1JPG"))},{"./DOMLazyTree":39,"./Danger":43,"./ReactDOMComponentTree":63,"./ReactInstrumentation":92,"./createMicrosoftUnsafeLocalFunction":130,"./setInnerHTML":152,"./setTextContent":153,rH1JPG:29}],39:[function(e,t,n){function o(e){if(m){var t=e.node,n=e.children;if(n.length)for(var o=0;o<n.length;o++)g(t,n[o],null);else null!=e.html?p(t,e.html):null!=e.text&&f(t,e.text)}}function r(e,t){e.parentNode.replaceChild(t.node,e),o(t)}function i(e,t){m?e.children.push(t):e.node.appendChild(t.node)}function a(e,t){m?e.html=t:p(e.node,t)}function s(e,t){m?e.text=t:f(e.node,t)}function c(){return this.node.nodeName;
}function u(e){return{node:e,children:[],html:null,text:null,toString:c}}var l=e("./DOMNamespaces"),p=e("./setInnerHTML"),d=e("./createMicrosoftUnsafeLocalFunction"),f=e("./setTextContent"),v=1,h=11,m="undefined"!=typeof document&&"number"==typeof document.documentMode||"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent&&/\bEdge\/\d/.test(navigator.userAgent),g=d(function(e,t,n){t.node.nodeType===h||t.node.nodeType===v&&"object"===t.node.nodeName.toLowerCase()&&(null==t.node.namespaceURI||t.node.namespaceURI===l.html)?(o(t),e.insertBefore(t.node,n)):(e.insertBefore(t.node,n),o(t))});u.insertTreeBefore=g,u.replaceChildWithTree=r,u.queueChild=i,u.queueHTML=a,u.queueText=s,t.exports=u},{"./DOMNamespaces":40,"./createMicrosoftUnsafeLocalFunction":130,"./setInnerHTML":152,"./setTextContent":153}],40:[function(e,t,n){var o={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"};t.exports=o},{}],41:[function(e,t,n){(function(n){function o(e,t){return(e&t)===t}var r=e("./reactProdInvariant"),i=e("fbjs/lib/invariant"),a={MUST_USE_PROPERTY:1,HAS_BOOLEAN_VALUE:4,HAS_NUMERIC_VALUE:8,HAS_POSITIVE_NUMERIC_VALUE:24,HAS_OVERLOADED_BOOLEAN_VALUE:32,injectDOMPropertyConfig:function(e){var t=a,s=e.Properties||{},u=e.DOMAttributeNamespaces||{},l=e.DOMAttributeNames||{},p=e.DOMPropertyNames||{},d=e.DOMMutationMethods||{};e.isCustomAttribute&&c._isCustomAttributeFunctions.push(e.isCustomAttribute);for(var f in s){c.properties.hasOwnProperty(f)?"production"!==n.env.NODE_ENV?i(!1,"injectDOMPropertyConfig(...): You're trying to inject DOM property '%s' which has already been injected. You may be accidentally injecting the same DOM property config twice, or you may be injecting two configs that have conflicting property names.",f):r("48",f):void 0;var v=f.toLowerCase(),h=s[f],m={attributeName:v,attributeNamespace:null,propertyName:f,mutationMethod:null,mustUseProperty:o(h,t.MUST_USE_PROPERTY),hasBooleanValue:o(h,t.HAS_BOOLEAN_VALUE),hasNumericValue:o(h,t.HAS_NUMERIC_VALUE),hasPositiveNumericValue:o(h,t.HAS_POSITIVE_NUMERIC_VALUE),hasOverloadedBooleanValue:o(h,t.HAS_OVERLOADED_BOOLEAN_VALUE)};if(m.hasBooleanValue+m.hasNumericValue+m.hasOverloadedBooleanValue<=1?void 0:"production"!==n.env.NODE_ENV?i(!1,"DOMProperty: Value can be one of boolean, overloaded boolean, or numeric value, but not a combination: %s",f):r("50",f),"production"!==n.env.NODE_ENV&&(c.getPossibleStandardName[v]=f),l.hasOwnProperty(f)){var g=l[f];m.attributeName=g,"production"!==n.env.NODE_ENV&&(c.getPossibleStandardName[g]=f)}u.hasOwnProperty(f)&&(m.attributeNamespace=u[f]),p.hasOwnProperty(f)&&(m.propertyName=p[f]),d.hasOwnProperty(f)&&(m.mutationMethod=d[f]),c.properties[f]=m}}},s=":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",c={ID_ATTRIBUTE_NAME:"data-reactid",ROOT_ATTRIBUTE_NAME:"data-reactroot",ATTRIBUTE_NAME_START_CHAR:s,ATTRIBUTE_NAME_CHAR:s+"\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040",properties:{},getPossibleStandardName:"production"!==n.env.NODE_ENV?{autofocus:"autoFocus"}:null,_isCustomAttributeFunctions:[],isCustomAttribute:function(e){for(var t=0;t<c._isCustomAttributeFunctions.length;t++){var n=c._isCustomAttributeFunctions[t];if(n(e))return!0}return!1},injection:a};t.exports=c}).call(this,e("rH1JPG"))},{"./reactProdInvariant":150,"fbjs/lib/invariant":20,rH1JPG:29}],42:[function(e,t,n){(function(n){function o(e){return!!d.hasOwnProperty(e)||!p.hasOwnProperty(e)&&(l.test(e)?(d[e]=!0,!0):(p[e]=!0,"production"!==n.env.NODE_ENV?u(!1,"Invalid attribute name: `%s`",e):void 0,!1))}function r(e,t){return null==t||e.hasBooleanValue&&!t||e.hasNumericValue&&isNaN(t)||e.hasPositiveNumericValue&&t<1||e.hasOverloadedBooleanValue&&t===!1}var i=e("./DOMProperty"),a=e("./ReactDOMComponentTree"),s=e("./ReactInstrumentation"),c=e("./quoteAttributeValueForBrowser"),u=e("fbjs/lib/warning"),l=new RegExp("^["+i.ATTRIBUTE_NAME_START_CHAR+"]["+i.ATTRIBUTE_NAME_CHAR+"]*$"),p={},d={},f={createMarkupForID:function(e){return i.ID_ATTRIBUTE_NAME+"="+c(e)},setAttributeForID:function(e,t){e.setAttribute(i.ID_ATTRIBUTE_NAME,t)},createMarkupForRoot:function(){return i.ROOT_ATTRIBUTE_NAME+'=""'},setAttributeForRoot:function(e){e.setAttribute(i.ROOT_ATTRIBUTE_NAME,"")},createMarkupForProperty:function(e,t){var n=i.properties.hasOwnProperty(e)?i.properties[e]:null;if(n){if(r(n,t))return"";var o=n.attributeName;return n.hasBooleanValue||n.hasOverloadedBooleanValue&&t===!0?o+'=""':o+"="+c(t)}return i.isCustomAttribute(e)?null==t?"":e+"="+c(t):null},createMarkupForCustomAttribute:function(e,t){return o(e)&&null!=t?e+"="+c(t):""},setValueForProperty:function(e,t,o){var c=i.properties.hasOwnProperty(t)?i.properties[t]:null;if(c){var u=c.mutationMethod;if(u)u(e,o);else{if(r(c,o))return void this.deleteValueForProperty(e,t);if(c.mustUseProperty)e[c.propertyName]=o;else{var l=c.attributeName,p=c.attributeNamespace;p?e.setAttributeNS(p,l,""+o):c.hasBooleanValue||c.hasOverloadedBooleanValue&&o===!0?e.setAttribute(l,""):e.setAttribute(l,""+o)}}}else if(i.isCustomAttribute(t))return void f.setValueForAttribute(e,t,o);if("production"!==n.env.NODE_ENV){var d={};d[t]=o,s.debugTool.onHostOperation({instanceID:a.getInstanceFromNode(e)._debugID,type:"update attribute",payload:d})}},setValueForAttribute:function(e,t,r){if(o(t)&&(null==r?e.removeAttribute(t):e.setAttribute(t,""+r),"production"!==n.env.NODE_ENV)){var i={};i[t]=r,s.debugTool.onHostOperation({instanceID:a.getInstanceFromNode(e)._debugID,type:"update attribute",payload:i})}},deleteValueForAttribute:function(e,t){e.removeAttribute(t),"production"!==n.env.NODE_ENV&&s.debugTool.onHostOperation({instanceID:a.getInstanceFromNode(e)._debugID,type:"remove attribute",payload:t})},deleteValueForProperty:function(e,t){var o=i.properties.hasOwnProperty(t)?i.properties[t]:null;if(o){var r=o.mutationMethod;if(r)r(e,void 0);else if(o.mustUseProperty){var c=o.propertyName;o.hasBooleanValue?e[c]=!1:e[c]=""}else e.removeAttribute(o.attributeName)}else i.isCustomAttribute(t)&&e.removeAttribute(t);"production"!==n.env.NODE_ENV&&s.debugTool.onHostOperation({instanceID:a.getInstanceFromNode(e)._debugID,type:"remove attribute",payload:t})}};t.exports=f}).call(this,e("rH1JPG"))},{"./DOMProperty":41,"./ReactDOMComponentTree":63,"./ReactInstrumentation":92,"./quoteAttributeValueForBrowser":149,"fbjs/lib/warning":27,rH1JPG:29}],43:[function(e,t,n){(function(n){var o=e("./reactProdInvariant"),r=e("./DOMLazyTree"),i=e("fbjs/lib/ExecutionEnvironment"),a=e("fbjs/lib/createNodesFromMarkup"),s=e("fbjs/lib/emptyFunction"),c=e("fbjs/lib/invariant"),u={dangerouslyReplaceNodeWithMarkup:function(e,t){if(i.canUseDOM?void 0:"production"!==n.env.NODE_ENV?c(!1,"dangerouslyReplaceNodeWithMarkup(...): Cannot render markup in a worker thread. Make sure `window` and `document` are available globally before requiring React when unit testing or use ReactDOMServer.renderToString() for server rendering."):o("56"),t?void 0:"production"!==n.env.NODE_ENV?c(!1,"dangerouslyReplaceNodeWithMarkup(...): Missing markup."):o("57"),"HTML"===e.nodeName?"production"!==n.env.NODE_ENV?c(!1,"dangerouslyReplaceNodeWithMarkup(...): Cannot replace markup of the <html> node. This is because browser quirks make this unreliable and/or slow. If you want to render to the root you must use server rendering. See ReactDOMServer.renderToString()."):o("58"):void 0,"string"==typeof t){var u=a(t,s)[0];e.parentNode.replaceChild(u,e)}else r.replaceChildWithTree(e,t)}};t.exports=u}).call(this,e("rH1JPG"))},{"./DOMLazyTree":39,"./reactProdInvariant":150,"fbjs/lib/ExecutionEnvironment":6,"fbjs/lib/createNodesFromMarkup":11,"fbjs/lib/emptyFunction":12,"fbjs/lib/invariant":20,rH1JPG:29}],44:[function(e,t,n){var o=["ResponderEventPlugin","SimpleEventPlugin","TapEventPlugin","EnterLeaveEventPlugin","ChangeEventPlugin","SelectEventPlugin","BeforeInputEventPlugin"];t.exports=o},{}],45:[function(e,t,n){var o=e("./EventPropagators"),r=e("./ReactDOMComponentTree"),i=e("./SyntheticMouseEvent"),a={mouseEnter:{registrationName:"onMouseEnter",dependencies:["topMouseOut","topMouseOver"]},mouseLeave:{registrationName:"onMouseLeave",dependencies:["topMouseOut","topMouseOver"]}},s={eventTypes:a,extractEvents:function(e,t,n,s){if("topMouseOver"===e&&(n.relatedTarget||n.fromElement))return null;if("topMouseOut"!==e&&"topMouseOver"!==e)return null;var c;if(s.window===s)c=s;else{var u=s.ownerDocument;c=u?u.defaultView||u.parentWindow:window}var l,p;if("topMouseOut"===e){l=t;var d=n.relatedTarget||n.toElement;p=d?r.getClosestInstanceFromNode(d):null}else l=null,p=t;if(l===p)return null;var f=null==l?c:r.getNodeFromInstance(l),v=null==p?c:r.getNodeFromInstance(p),h=i.getPooled(a.mouseLeave,l,n,s);h.type="mouseleave",h.target=f,h.relatedTarget=v;var m=i.getPooled(a.mouseEnter,p,n,s);return m.type="mouseenter",m.target=v,m.relatedTarget=f,o.accumulateEnterLeaveDispatches(h,m,l,p),[h,m]}};t.exports=s},{"./EventPropagators":49,"./ReactDOMComponentTree":63,"./SyntheticMouseEvent":120}],46:[function(e,t,n){(function(n){function o(e){return"button"===e||"input"===e||"select"===e||"textarea"===e}function r(e,t,n){switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":return!(!n.disabled||!o(t));default:return!1}}var i=e("./reactProdInvariant"),a=e("./EventPluginRegistry"),s=e("./EventPluginUtils"),c=e("./ReactErrorUtils"),u=e("./accumulateInto"),l=e("./forEachAccumulated"),p=e("fbjs/lib/invariant"),d={},f=null,v=function(e,t){e&&(s.executeDispatchesInOrder(e,t),e.isPersistent()||e.constructor.release(e))},h=function(e){return v(e,!0)},m=function(e){return v(e,!1)},g=function(e){return"."+e._rootNodeID},y={injection:{injectEventPluginOrder:a.injectEventPluginOrder,injectEventPluginsByName:a.injectEventPluginsByName},putListener:function(e,t,o){"function"!=typeof o?"production"!==n.env.NODE_ENV?p(!1,"Expected %s listener to be a function, instead got type %s",t,"undefined"==typeof o?"undefined":_typeof(o)):i("94",t,"undefined"==typeof o?"undefined":_typeof(o)):void 0;var r=g(e),s=d[t]||(d[t]={});s[r]=o;var c=a.registrationNameModules[t];c&&c.didPutListener&&c.didPutListener(e,t,o)},getListener:function(e,t){var n=d[t];if(r(t,e._currentElement.type,e._currentElement.props))return null;var o=g(e);return n&&n[o]},deleteListener:function(e,t){var n=a.registrationNameModules[t];n&&n.willDeleteListener&&n.willDeleteListener(e,t);var o=d[t];if(o){var r=g(e);delete o[r]}},deleteAllListeners:function(e){var t=g(e);for(var n in d)if(d.hasOwnProperty(n)&&d[n][t]){var o=a.registrationNameModules[n];o&&o.willDeleteListener&&o.willDeleteListener(e,n),delete d[n][t]}},extractEvents:function(e,t,n,o){for(var r,i=a.plugins,s=0;s<i.length;s++){var c=i[s];if(c){var l=c.extractEvents(e,t,n,o);l&&(r=u(r,l))}}return r},enqueueEvents:function(e){e&&(f=u(f,e))},processEventQueue:function(e){var t=f;f=null,e?l(t,h):l(t,m),f?"production"!==n.env.NODE_ENV?p(!1,"processEventQueue(): Additional events were enqueued while processing an event queue. Support for this has not yet been implemented."):i("95"):void 0,c.rethrowCaughtError()},__purge:function(){d={}},__getListenerBank:function(){return d}};t.exports=y}).call(this,e("rH1JPG"))},{"./EventPluginRegistry":47,"./EventPluginUtils":48,"./ReactErrorUtils":83,"./accumulateInto":127,"./forEachAccumulated":135,"./reactProdInvariant":150,"fbjs/lib/invariant":20,rH1JPG:29}],47:[function(e,t,n){(function(n){function o(){if(c)for(var e in u){var t=u[e],o=c.indexOf(e);if(o>-1?void 0:"production"!==n.env.NODE_ENV?s(!1,"EventPluginRegistry: Cannot inject event plugins that do not exist in the plugin ordering, `%s`.",e):a("96",e),!l.plugins[o]){t.extractEvents?void 0:"production"!==n.env.NODE_ENV?s(!1,"EventPluginRegistry: Event plugins must implement an `extractEvents` method, but `%s` does not.",e):a("97",e),l.plugins[o]=t;var i=t.eventTypes;for(var p in i)r(i[p],t,p)?void 0:"production"!==n.env.NODE_ENV?s(!1,"EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.",p,e):a("98",p,e)}}}function r(e,t,o){l.eventNameDispatchConfigs.hasOwnProperty(o)?"production"!==n.env.NODE_ENV?s(!1,"EventPluginHub: More than one plugin attempted to publish the same event name, `%s`.",o):a("99",o):void 0,l.eventNameDispatchConfigs[o]=e;var r=e.phasedRegistrationNames;if(r){for(var c in r)if(r.hasOwnProperty(c)){var u=r[c];i(u,t,o)}return!0}return!!e.registrationName&&(i(e.registrationName,t,o),!0)}function i(e,t,o){if(l.registrationNameModules[e]?"production"!==n.env.NODE_ENV?s(!1,"EventPluginHub: More than one plugin attempted to publish the same registration name, `%s`.",e):a("100",e):void 0,l.registrationNameModules[e]=t,l.registrationNameDependencies[e]=t.eventTypes[o].dependencies,"production"!==n.env.NODE_ENV){var r=e.toLowerCase();l.possibleRegistrationNames[r]=e,"onDoubleClick"===e&&(l.possibleRegistrationNames.ondblclick=e)}}var a=e("./reactProdInvariant"),s=e("fbjs/lib/invariant"),c=null,u={},l={plugins:[],eventNameDispatchConfigs:{},registrationNameModules:{},registrationNameDependencies:{},possibleRegistrationNames:"production"!==n.env.NODE_ENV?{}:null,injectEventPluginOrder:function(e){c?"production"!==n.env.NODE_ENV?s(!1,"EventPluginRegistry: Cannot inject event plugin ordering more than once. You are likely trying to load more than one copy of React."):a("101"):void 0,c=Array.prototype.slice.call(e),o()},injectEventPluginsByName:function(e){var t=!1;for(var r in e)if(e.hasOwnProperty(r)){var i=e[r];u.hasOwnProperty(r)&&u[r]===i||(u[r]?"production"!==n.env.NODE_ENV?s(!1,"EventPluginRegistry: Cannot inject two different event plugins using the same name, `%s`.",r):a("102",r):void 0,u[r]=i,t=!0)}t&&o()},getPluginModuleForEvent:function(e){var t=e.dispatchConfig;if(t.registrationName)return l.registrationNameModules[t.registrationName]||null;if(void 0!==t.phasedRegistrationNames){var n=t.phasedRegistrationNames;for(var o in n)if(n.hasOwnProperty(o)){var r=l.registrationNameModules[n[o]];if(r)return r}}return null},_resetEventPlugins:function(){c=null;for(var e in u)u.hasOwnProperty(e)&&delete u[e];l.plugins.length=0;var t=l.eventNameDispatchConfigs;for(var o in t)t.hasOwnProperty(o)&&delete t[o];var r=l.registrationNameModules;for(var i in r)r.hasOwnProperty(i)&&delete r[i];if("production"!==n.env.NODE_ENV){var a=l.possibleRegistrationNames;for(var s in a)a.hasOwnProperty(s)&&delete a[s]}}};t.exports=l}).call(this,e("rH1JPG"))},{"./reactProdInvariant":150,"fbjs/lib/invariant":20,rH1JPG:29}],48:[function(e,t,n){(function(n){function o(e){return"topMouseUp"===e||"topTouchEnd"===e||"topTouchCancel"===e}function r(e){return"topMouseMove"===e||"topTouchMove"===e}function i(e){return"topMouseDown"===e||"topTouchStart"===e}function a(e,t,n,o){var r=e.type||"unknown-event";e.currentTarget=E.getNodeFromInstance(o),t?m.invokeGuardedCallbackWithCatch(r,n,e):m.invokeGuardedCallback(r,n,e),e.currentTarget=null}function s(e,t){var o=e._dispatchListeners,r=e._dispatchInstances;if("production"!==n.env.NODE_ENV&&v(e),Array.isArray(o))for(var i=0;i<o.length&&!e.isPropagationStopped();i++)a(e,t,o[i],r[i]);else o&&a(e,t,o,r);e._dispatchListeners=null,e._dispatchInstances=null}function c(e){var t=e._dispatchListeners,o=e._dispatchInstances;if("production"!==n.env.NODE_ENV&&v(e),Array.isArray(t)){for(var r=0;r<t.length&&!e.isPropagationStopped();r++)if(t[r](e,o[r]))return o[r]}else if(t&&t(e,o))return o;return null}function u(e){var t=c(e);return e._dispatchInstances=null,e._dispatchListeners=null,t}function l(e){"production"!==n.env.NODE_ENV&&v(e);var t=e._dispatchListeners,o=e._dispatchInstances;Array.isArray(t)?"production"!==n.env.NODE_ENV?g(!1,"executeDirectDispatch(...): Invalid `event`."):h("103"):void 0,e.currentTarget=t?E.getNodeFromInstance(o):null;var r=t?t(e):null;return e.currentTarget=null,e._dispatchListeners=null,e._dispatchInstances=null,r}function p(e){return!!e._dispatchListeners}var d,f,v,h=e("./reactProdInvariant"),m=e("./ReactErrorUtils"),g=e("fbjs/lib/invariant"),y=e("fbjs/lib/warning"),b={injectComponentTree:function(e){d=e,"production"!==n.env.NODE_ENV&&("production"!==n.env.NODE_ENV?y(e&&e.getNodeFromInstance&&e.getInstanceFromNode,"EventPluginUtils.injection.injectComponentTree(...): Injected module is missing getNodeFromInstance or getInstanceFromNode."):void 0)},injectTreeTraversal:function(e){f=e,"production"!==n.env.NODE_ENV&&("production"!==n.env.NODE_ENV?y(e&&e.isAncestor&&e.getLowestCommonAncestor,"EventPluginUtils.injection.injectTreeTraversal(...): Injected module is missing isAncestor or getLowestCommonAncestor."):void 0)}};"production"!==n.env.NODE_ENV&&(v=function(e){var t=e._dispatchListeners,o=e._dispatchInstances,r=Array.isArray(t),i=r?t.length:t?1:0,a=Array.isArray(o),s=a?o.length:o?1:0;"production"!==n.env.NODE_ENV?y(a===r&&s===i,"EventPluginUtils: Invalid `event`."):void 0});var E={isEndish:o,isMoveish:r,isStartish:i,executeDirectDispatch:l,executeDispatchesInOrder:s,executeDispatchesInOrderStopAtTrue:u,hasDispatches:p,getInstanceFromNode:function(e){return d.getInstanceFromNode(e)},getNodeFromInstance:function(e){return d.getNodeFromInstance(e)},isAncestor:function(e,t){return f.isAncestor(e,t)},getLowestCommonAncestor:function(e,t){return f.getLowestCommonAncestor(e,t)},getParentInstance:function(e){return f.getParentInstance(e)},traverseTwoPhase:function(e,t,n){return f.traverseTwoPhase(e,t,n)},traverseEnterLeave:function(e,t,n,o,r){return f.traverseEnterLeave(e,t,n,o,r)},injection:b};t.exports=E}).call(this,e("rH1JPG"))},{"./ReactErrorUtils":83,"./reactProdInvariant":150,"fbjs/lib/invariant":20,"fbjs/lib/warning":27,rH1JPG:29}],49:[function(e,t,n){(function(n){function o(e,t,n){var o=t.dispatchConfig.phasedRegistrationNames[n];return y(e,o)}function r(e,t,r){"production"!==n.env.NODE_ENV&&("production"!==n.env.NODE_ENV?g(e,"Dispatching inst must not be null"):void 0);var i=o(e,r,t);i&&(r._dispatchListeners=h(r._dispatchListeners,i),r._dispatchInstances=h(r._dispatchInstances,e))}function i(e){e&&e.dispatchConfig.phasedRegistrationNames&&v.traverseTwoPhase(e._targetInst,r,e)}function a(e){if(e&&e.dispatchConfig.phasedRegistrationNames){var t=e._targetInst,n=t?v.getParentInstance(t):null;v.traverseTwoPhase(n,r,e)}}function s(e,t,n){if(n&&n.dispatchConfig.registrationName){var o=n.dispatchConfig.registrationName,r=y(e,o);r&&(n._dispatchListeners=h(n._dispatchListeners,r),n._dispatchInstances=h(n._dispatchInstances,e))}}function c(e){e&&e.dispatchConfig.registrationName&&s(e._targetInst,null,e)}function u(e){m(e,i)}function l(e){m(e,a)}function p(e,t,n,o){v.traverseEnterLeave(n,o,s,e,t)}function d(e){m(e,c)}var f=e("./EventPluginHub"),v=e("./EventPluginUtils"),h=e("./accumulateInto"),m=e("./forEachAccumulated"),g=e("fbjs/lib/warning"),y=f.getListener,b={accumulateTwoPhaseDispatches:u,accumulateTwoPhaseDispatchesSkipTarget:l,accumulateDirectDispatches:d,accumulateEnterLeaveDispatches:p};t.exports=b}).call(this,e("rH1JPG"))},{"./EventPluginHub":46,"./EventPluginUtils":48,"./accumulateInto":127,"./forEachAccumulated":135,"fbjs/lib/warning":27,rH1JPG:29}],50:[function(e,t,n){function o(e){this._root=e,this._startText=this.getText(),this._fallbackText=null}var r=e("object-assign"),i=e("./PooledClass"),a=e("./getTextContentAccessor");r(o.prototype,{destructor:function(){this._root=null,this._startText=null,this._fallbackText=null},getText:function(){return"value"in this._root?this._root.value:this._root[a()]},getData:function(){if(this._fallbackText)return this._fallbackText;var e,t,n=this._startText,o=n.length,r=this.getText(),i=r.length;for(e=0;e<o&&n[e]===r[e];e++);var a=o-e;for(t=1;t<=a&&n[o-t]===r[i-t];t++);var s=t>1?1-t:void 0;return this._fallbackText=r.slice(e,s),this._fallbackText}}),i.addPoolingTo(o),t.exports=o},{"./PooledClass":54,"./getTextContentAccessor":144,"object-assign":28}],51:[function(e,t,n){var o=e("./DOMProperty"),r=o.injection.MUST_USE_PROPERTY,i=o.injection.HAS_BOOLEAN_VALUE,a=o.injection.HAS_NUMERIC_VALUE,s=o.injection.HAS_POSITIVE_NUMERIC_VALUE,c=o.injection.HAS_OVERLOADED_BOOLEAN_VALUE,u={isCustomAttribute:RegExp.prototype.test.bind(new RegExp("^(data|aria)-["+o.ATTRIBUTE_NAME_CHAR+"]*$")),Properties:{accept:0,acceptCharset:0,accessKey:0,action:0,allowFullScreen:i,allowTransparency:0,alt:0,as:0,async:i,autoComplete:0,autoPlay:i,capture:i,cellPadding:0,cellSpacing:0,charSet:0,challenge:0,checked:r|i,cite:0,classID:0,className:0,cols:s,colSpan:0,content:0,contentEditable:0,contextMenu:0,controls:i,coords:0,crossOrigin:0,data:0,dateTime:0,default:i,defer:i,dir:0,disabled:i,download:c,draggable:0,encType:0,form:0,formAction:0,formEncType:0,formMethod:0,formNoValidate:i,formTarget:0,frameBorder:0,headers:0,height:0,hidden:i,high:0,href:0,hrefLang:0,htmlFor:0,httpEquiv:0,icon:0,id:0,inputMode:0,integrity:0,is:0,keyParams:0,keyType:0,kind:0,label:0,lang:0,list:0,loop:i,low:0,manifest:0,marginHeight:0,marginWidth:0,max:0,maxLength:0,media:0,mediaGroup:0,method:0,min:0,minLength:0,multiple:r|i,muted:r|i,name:0,nonce:0,noValidate:i,open:i,optimum:0,pattern:0,placeholder:0,playsInline:i,poster:0,preload:0,profile:0,radioGroup:0,readOnly:i,referrerPolicy:0,rel:0,required:i,reversed:i,role:0,rows:s,rowSpan:a,sandbox:0,scope:0,scoped:i,scrolling:0,seamless:i,selected:r|i,shape:0,size:s,sizes:0,span:s,spellCheck:0,src:0,srcDoc:0,srcLang:0,srcSet:0,start:a,step:0,style:0,summary:0,tabIndex:0,target:0,title:0,type:0,useMap:0,value:0,width:0,wmode:0,wrap:0,about:0,datatype:0,inlist:0,prefix:0,property:0,resource:0,typeof:0,vocab:0,autoCapitalize:0,autoCorrect:0,autoSave:0,color:0,itemProp:0,itemScope:i,itemType:0,itemID:0,itemRef:0,results:0,security:0,unselectable:0},DOMAttributeNames:{acceptCharset:"accept-charset",className:"class",htmlFor:"for",httpEquiv:"http-equiv"},DOMPropertyNames:{}};t.exports=u},{"./DOMProperty":41}],52:[function(e,t,n){function o(e){var t=/[=:]/g,n={"=":"=0",":":"=2"},o=(""+e).replace(t,function(e){return n[e]});return"$"+o}function r(e){var t=/(=0|=2)/g,n={"=0":"=","=2":":"},o="."===e[0]&&"$"===e[1]?e.substring(2):e.substring(1);return(""+o).replace(t,function(e){return n[e]})}var i={escape:o,unescape:r};t.exports=i},{}],53:[function(e,t,n){(function(n){function o(e){null!=e.checkedLink&&null!=e.valueLink?"production"!==n.env.NODE_ENV?l(!1,"Cannot provide a checkedLink and a valueLink. If you want to use checkedLink, you probably don't want to use valueLink and vice versa."):s("87"):void 0}function r(e){o(e),null!=e.value||null!=e.onChange?"production"!==n.env.NODE_ENV?l(!1,"Cannot provide a valueLink and a value or onChange event. If you want to use value or onChange, you probably don't want to use valueLink."):s("88"):void 0}function i(e){o(e),null!=e.checked||null!=e.onChange?"production"!==n.env.NODE_ENV?l(!1,"Cannot provide a checkedLink and a checked property or onChange event. If you want to use checked or onChange, you probably don't want to use checkedLink"):s("89"):void 0}function a(e){if(e){var t=e.getName();if(t)return" Check the render method of `"+t+"`."}return""}var s=e("./reactProdInvariant"),c=e("react/lib/React"),u=e("./ReactPropTypesSecret"),l=e("fbjs/lib/invariant"),p=e("fbjs/lib/warning"),d={button:!0,checkbox:!0,image:!0,hidden:!0,radio:!0,reset:!0,submit:!0},f={value:function(e,t,n){return!e[t]||d[e.type]||e.onChange||e.readOnly||e.disabled?null:new Error("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.")},checked:function(e,t,n){return!e[t]||e.onChange||e.readOnly||e.disabled?null:new Error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.")},onChange:c.PropTypes.func},v={},h={checkPropTypes:function(e,t,o){for(var r in f){if(f.hasOwnProperty(r))var i=f[r](t,r,e,"prop",null,u);if(i instanceof Error&&!(i.message in v)){v[i.message]=!0;var s=a(o);"production"!==n.env.NODE_ENV?p(!1,"Failed form propType: %s%s",i.message,s):void 0}}},getValue:function(e){return e.valueLink?(r(e),e.valueLink.value):e.value},getChecked:function(e){return e.checkedLink?(i(e),e.checkedLink.value):e.checked},executeOnChange:function(e,t){return e.valueLink?(r(e),e.valueLink.requestChange(t.target.value)):e.checkedLink?(i(e),e.checkedLink.requestChange(t.target.checked)):e.onChange?e.onChange.call(void 0,t):void 0}};t.exports=h}).call(this,e("rH1JPG"))},{"./ReactPropTypesSecret":100,"./reactProdInvariant":150,"fbjs/lib/invariant":20,"fbjs/lib/warning":27,rH1JPG:29,"react/lib/React":160}],54:[function(e,t,n){(function(n){var o=e("./reactProdInvariant"),r=e("fbjs/lib/invariant"),i=function(e){var t=this;if(t.instancePool.length){var n=t.instancePool.pop();return t.call(n,e),n}return new t(e)},a=function(e,t){var n=this;if(n.instancePool.length){var o=n.instancePool.pop();return n.call(o,e,t),o}return new n(e,t)},s=function(e,t,n){var o=this;if(o.instancePool.length){var r=o.instancePool.pop();return o.call(r,e,t,n),r}return new o(e,t,n)},c=function(e,t,n,o){var r=this;if(r.instancePool.length){var i=r.instancePool.pop();return r.call(i,e,t,n,o),i}return new r(e,t,n,o)},u=function(e,t,n,o,r){var i=this;if(i.instancePool.length){var a=i.instancePool.pop();return i.call(a,e,t,n,o,r),a}return new i(e,t,n,o,r)},l=function(e){var t=this;e instanceof t?void 0:"production"!==n.env.NODE_ENV?r(!1,"Trying to release an instance into a pool of a different type."):o("25"),e.destructor(),t.instancePool.length<t.poolSize&&t.instancePool.push(e)},p=10,d=i,f=function(e,t){var n=e;return n.instancePool=[],n.getPooled=t||d,n.poolSize||(n.poolSize=p),n.release=l,n},v={addPoolingTo:f,oneArgumentPooler:i,twoArgumentPooler:a,threeArgumentPooler:s,fourArgumentPooler:c,fiveArgumentPooler:u};t.exports=v}).call(this,e("rH1JPG"))},{"./reactProdInvariant":150,"fbjs/lib/invariant":20,rH1JPG:29}],55:[function(e,t,n){function o(e){return Object.prototype.hasOwnProperty.call(e,h)||(e[h]=f++,p[e[h]]={}),p[e[h]]}var r,i=e("object-assign"),a=e("./EventPluginRegistry"),s=e("./ReactEventEmitterMixin"),c=e("./ViewportMetrics"),u=e("./getVendorPrefixedEventName"),l=e("./isEventSupported"),p={},d=!1,f=0,v={topAbort:"abort",topAnimationEnd:u("animationend")||"animationend",topAnimationIteration:u("animationiteration")||"animationiteration",topAnimationStart:u("animationstart")||"animationstart",topBlur:"blur",topCanPlay:"canplay",topCanPlayThrough:"canplaythrough",topChange:"change",topClick:"click",topCompositionEnd:"compositionend",topCompositionStart:"compositionstart",topCompositionUpdate:"compositionupdate",topContextMenu:"contextmenu",topCopy:"copy",topCut:"cut",topDoubleClick:"dblclick",topDrag:"drag",topDragEnd:"dragend",topDragEnter:"dragenter",topDragExit:"dragexit",topDragLeave:"dragleave",topDragOver:"dragover",topDragStart:"dragstart",topDrop:"drop",topDurationChange:"durationchange",topEmptied:"emptied",topEncrypted:"encrypted",topEnded:"ended",topError:"error",topFocus:"focus",topInput:"input",topKeyDown:"keydown",topKeyPress:"keypress",topKeyUp:"keyup",topLoadedData:"loadeddata",topLoadedMetadata:"loadedmetadata",topLoadStart:"loadstart",topMouseDown:"mousedown",topMouseMove:"mousemove",topMouseOut:"mouseout",topMouseOver:"mouseover",topMouseUp:"mouseup",topPaste:"paste",topPause:"pause",topPlay:"play",topPlaying:"playing",topProgress:"progress",topRateChange:"ratechange",topScroll:"scroll",topSeeked:"seeked",topSeeking:"seeking",topSelectionChange:"selectionchange",topStalled:"stalled",topSuspend:"suspend",topTextInput:"textInput",topTimeUpdate:"timeupdate",topTouchCancel:"touchcancel",topTouchEnd:"touchend",topTouchMove:"touchmove",topTouchStart:"touchstart",topTransitionEnd:u("transitionend")||"transitionend",topVolumeChange:"volumechange",topWaiting:"waiting",topWheel:"wheel"},h="_reactListenersID"+String(Math.random()).slice(2),m=i({},s,{ReactEventListener:null,injection:{injectReactEventListener:function(e){e.setHandleTopLevel(m.handleTopLevel),m.ReactEventListener=e}},setEnabled:function(e){m.ReactEventListener&&m.ReactEventListener.setEnabled(e)},isEnabled:function(){return!(!m.ReactEventListener||!m.ReactEventListener.isEnabled())},listenTo:function(e,t){for(var n=t,r=o(n),i=a.registrationNameDependencies[e],s=0;s<i.length;s++){var c=i[s];r.hasOwnProperty(c)&&r[c]||("topWheel"===c?l("wheel")?m.ReactEventListener.trapBubbledEvent("topWheel","wheel",n):l("mousewheel")?m.ReactEventListener.trapBubbledEvent("topWheel","mousewheel",n):m.ReactEventListener.trapBubbledEvent("topWheel","DOMMouseScroll",n):"topScroll"===c?l("scroll",!0)?m.ReactEventListener.trapCapturedEvent("topScroll","scroll",n):m.ReactEventListener.trapBubbledEvent("topScroll","scroll",m.ReactEventListener.WINDOW_HANDLE):"topFocus"===c||"topBlur"===c?(l("focus",!0)?(m.ReactEventListener.trapCapturedEvent("topFocus","focus",n),m.ReactEventListener.trapCapturedEvent("topBlur","blur",n)):l("focusin")&&(m.ReactEventListener.trapBubbledEvent("topFocus","focusin",n),m.ReactEventListener.trapBubbledEvent("topBlur","focusout",n)),r.topBlur=!0,r.topFocus=!0):v.hasOwnProperty(c)&&m.ReactEventListener.trapBubbledEvent(c,v[c],n),r[c]=!0)}},trapBubbledEvent:function(e,t,n){return m.ReactEventListener.trapBubbledEvent(e,t,n)},trapCapturedEvent:function(e,t,n){return m.ReactEventListener.trapCapturedEvent(e,t,n)},supportsEventPageXY:function(){if(!document.createEvent)return!1;var e=document.createEvent("MouseEvent");return null!=e&&"pageX"in e},ensureScrollValueMonitoring:function(){if(void 0===r&&(r=m.supportsEventPageXY()),!r&&!d){var e=c.refreshScrollValues;m.ReactEventListener.monitorScrollValue(e),d=!0}}});t.exports=m},{"./EventPluginRegistry":47,"./ReactEventEmitterMixin":84,"./ViewportMetrics":126,"./getVendorPrefixedEventName":145,"./isEventSupported":147,"object-assign":28}],56:[function(e,t,n){(function(n){function o(t,o,i,c){var u=void 0===t[i];"production"!==n.env.NODE_ENV&&(r||(r=e("react/lib/ReactComponentTreeHook")),u||("production"!==n.env.NODE_ENV?l(!1,"flattenChildren(...): Encountered two children with the same key, `%s`. Child keys must be unique; when two children share a key, only the first child will be used.%s",s.unescape(i),r.getStackAddendumByID(c)):void 0)),null!=o&&u&&(t[i]=a(o,!0))}var r,i=e("./ReactReconciler"),a=e("./instantiateReactComponent"),s=e("./KeyEscapeUtils"),c=e("./shouldUpdateReactComponent"),u=e("./traverseAllChildren"),l=e("fbjs/lib/warning");"undefined"!=typeof n&&n.env&&"test"===n.env.NODE_ENV&&(r=e("react/lib/ReactComponentTreeHook"));var p={instantiateChildren:function(e,t,r,i){if(null==e)return null;var a={};return"production"!==n.env.NODE_ENV?u(e,function(e,t,n){return o(e,t,n,i)},a):u(e,o,a),a},updateChildren:function(e,t,n,o,r,s,u,l,p){if(t||e){var d,f;for(d in t)if(t.hasOwnProperty(d)){f=e&&e[d];var v=f&&f._currentElement,h=t[d];if(null!=f&&c(v,h))i.receiveComponent(f,h,r,l),t[d]=f;else{f&&(o[d]=i.getHostNode(f),i.unmountComponent(f,!1));var m=a(h,!0);t[d]=m;var g=i.mountComponent(m,r,s,u,l,p);n.push(g)}}for(d in e)!e.hasOwnProperty(d)||t&&t.hasOwnProperty(d)||(f=e[d],o[d]=i.getHostNode(f),i.unmountComponent(f,!1))}},unmountChildren:function(e,t){for(var n in e)if(e.hasOwnProperty(n)){var o=e[n];i.unmountComponent(o,t)}}};t.exports=p}).call(this,e("rH1JPG"))},{"./KeyEscapeUtils":52,"./ReactReconciler":102,"./instantiateReactComponent":146,"./shouldUpdateReactComponent":154,"./traverseAllChildren":155,"fbjs/lib/warning":27,rH1JPG:29,"react/lib/ReactComponentTreeHook":164}],57:[function(e,t,n){var o=e("./DOMChildrenOperations"),r=e("./ReactDOMIDOperations"),i={processChildrenUpdates:r.dangerouslyProcessChildrenUpdates,replaceNodeWithMarkup:o.dangerouslyReplaceNodeWithMarkup};t.exports=i},{"./DOMChildrenOperations":38,
"./ReactDOMIDOperations":67}],58:[function(e,t,n){(function(n){var o=e("./reactProdInvariant"),r=e("fbjs/lib/invariant"),i=!1,a={replaceNodeWithMarkup:null,processChildrenUpdates:null,injection:{injectEnvironment:function(e){i?"production"!==n.env.NODE_ENV?r(!1,"ReactCompositeComponent: injectEnvironment() can only be called once."):o("104"):void 0,a.replaceNodeWithMarkup=e.replaceNodeWithMarkup,a.processChildrenUpdates=e.processChildrenUpdates,i=!0}}};t.exports=a}).call(this,e("rH1JPG"))},{"./reactProdInvariant":150,"fbjs/lib/invariant":20,rH1JPG:29}],59:[function(e,t,n){(function(n){function o(e){}function r(e,t){"production"!==n.env.NODE_ENV&&("production"!==n.env.NODE_ENV?C(null===t||t===!1||l.isValidElement(t),"%s(...): A valid React element (or null) must be returned. You may have returned undefined, an array or some other invalid object.",e.displayName||e.name||"Component"):void 0,"production"!==n.env.NODE_ENV?C(!e.childContextTypes,"%s(...): childContextTypes cannot be defined on a functional component.",e.displayName||e.name||"Component"):void 0)}function i(e){return!(!e.prototype||!e.prototype.isReactComponent)}function a(e){return!(!e.prototype||!e.prototype.isPureReactComponent)}function s(e,t,n){if(0===t)return e();h.debugTool.onBeginLifeCycleTimer(t,n);try{return e()}finally{h.debugTool.onEndLifeCycleTimer(t,n)}}var c=e("./reactProdInvariant"),u=e("object-assign"),l=e("react/lib/React"),p=e("./ReactComponentEnvironment"),d=e("react/lib/ReactCurrentOwner"),f=e("./ReactErrorUtils"),v=e("./ReactInstanceMap"),h=e("./ReactInstrumentation"),m=e("./ReactNodeTypes"),g=e("./ReactReconciler");if("production"!==n.env.NODE_ENV)var y=e("./checkReactTypeSpec");var b=e("fbjs/lib/emptyObject"),E=e("fbjs/lib/invariant"),_=e("fbjs/lib/shallowEqual"),N=e("./shouldUpdateReactComponent"),C=e("fbjs/lib/warning"),O={ImpureClass:0,PureClass:1,StatelessFunctional:2};o.prototype.render=function(){var e=v.get(this)._currentElement.type,t=e(this.props,this.context,this.updater);return r(e,t),t};var D=1,w={construct:function(e){this._currentElement=e,this._rootNodeID=0,this._compositeType=null,this._instance=null,this._hostParent=null,this._hostContainerInfo=null,this._updateBatchNumber=null,this._pendingElement=null,this._pendingStateQueue=null,this._pendingReplaceState=!1,this._pendingForceUpdate=!1,this._renderedNodeType=null,this._renderedComponent=null,this._context=null,this._mountOrder=0,this._topLevelWrapper=null,this._pendingCallbacks=null,this._calledComponentWillUnmount=!1,"production"!==n.env.NODE_ENV&&(this._warnedAboutRefsInRender=!1)},mountComponent:function(e,t,u,p){var d=this;this._context=p,this._mountOrder=D++,this._hostParent=t,this._hostContainerInfo=u;var f,h=this._currentElement.props,m=this._processContext(p),g=this._currentElement.type,y=e.getUpdateQueue(),_=i(g),N=this._constructComponent(_,h,m,y);if(_||null!=N&&null!=N.render?a(g)?this._compositeType=O.PureClass:this._compositeType=O.ImpureClass:(f=N,r(g,f),null===N||N===!1||l.isValidElement(N)?void 0:"production"!==n.env.NODE_ENV?E(!1,"%s(...): A valid React element (or null) must be returned. You may have returned undefined, an array or some other invalid object.",g.displayName||g.name||"Component"):c("105",g.displayName||g.name||"Component"),N=new o(g),this._compositeType=O.StatelessFunctional),"production"!==n.env.NODE_ENV){null==N.render&&("production"!==n.env.NODE_ENV?C(!1,"%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.",g.displayName||g.name||"Component"):void 0);var w=N.props!==h,R=g.displayName||g.name||"Component";"production"!==n.env.NODE_ENV?C(void 0===N.props||!w,"%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.",R,R):void 0}N.props=h,N.context=m,N.refs=b,N.updater=y,this._instance=N,v.set(N,this),"production"!==n.env.NODE_ENV&&("production"!==n.env.NODE_ENV?C(!N.getInitialState||N.getInitialState.isReactClassApproved,"getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?",this.getName()||"a component"):void 0,"production"!==n.env.NODE_ENV?C(!N.getDefaultProps||N.getDefaultProps.isReactClassApproved,"getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.",this.getName()||"a component"):void 0,"production"!==n.env.NODE_ENV?C(!N.propTypes,"propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.",this.getName()||"a component"):void 0,"production"!==n.env.NODE_ENV?C(!N.contextTypes,"contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.",this.getName()||"a component"):void 0,"production"!==n.env.NODE_ENV?C("function"!=typeof N.componentShouldUpdate,"%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.",this.getName()||"A component"):void 0,"production"!==n.env.NODE_ENV?C("function"!=typeof N.componentDidUnmount,"%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?",this.getName()||"A component"):void 0,"production"!==n.env.NODE_ENV?C("function"!=typeof N.componentWillRecieveProps,"%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?",this.getName()||"A component"):void 0);var P=N.state;void 0===P&&(N.state=P=null),"object"!==("undefined"==typeof P?"undefined":_typeof(P))||Array.isArray(P)?"production"!==n.env.NODE_ENV?E(!1,"%s.state: must be set to an object or null",this.getName()||"ReactCompositeComponent"):c("106",this.getName()||"ReactCompositeComponent"):void 0,this._pendingStateQueue=null,this._pendingReplaceState=!1,this._pendingForceUpdate=!1;var T;return T=N.unstable_handleError?this.performInitialMountWithErrorHandling(f,t,u,e,p):this.performInitialMount(f,t,u,e,p),N.componentDidMount&&("production"!==n.env.NODE_ENV?e.getReactMountReady().enqueue(function(){s(function(){return N.componentDidMount()},d._debugID,"componentDidMount")}):e.getReactMountReady().enqueue(N.componentDidMount,N)),T},_constructComponent:function(e,t,o,r){if("production"===n.env.NODE_ENV)return this._constructComponentWithoutOwner(e,t,o,r);d.current=this;try{return this._constructComponentWithoutOwner(e,t,o,r)}finally{d.current=null}},_constructComponentWithoutOwner:function(e,t,o,r){var i=this._currentElement.type;return e?"production"!==n.env.NODE_ENV?s(function(){return new i(t,o,r)},this._debugID,"ctor"):new i(t,o,r):"production"!==n.env.NODE_ENV?s(function(){return i(t,o,r)},this._debugID,"render"):i(t,o,r)},performInitialMountWithErrorHandling:function(e,t,n,o,r){var i,a=o.checkpoint();try{i=this.performInitialMount(e,t,n,o,r)}catch(s){o.rollback(a),this._instance.unstable_handleError(s),this._pendingStateQueue&&(this._instance.state=this._processPendingState(this._instance.props,this._instance.context)),a=o.checkpoint(),this._renderedComponent.unmountComponent(!0),o.rollback(a),i=this.performInitialMount(e,t,n,o,r)}return i},performInitialMount:function(e,t,o,r,i){var a=this._instance,c=0;"production"!==n.env.NODE_ENV&&(c=this._debugID),a.componentWillMount&&("production"!==n.env.NODE_ENV?s(function(){return a.componentWillMount()},c,"componentWillMount"):a.componentWillMount(),this._pendingStateQueue&&(a.state=this._processPendingState(a.props,a.context))),void 0===e&&(e=this._renderValidatedComponent());var u=m.getType(e);this._renderedNodeType=u;var l=this._instantiateReactComponent(e,u!==m.EMPTY);this._renderedComponent=l;var p=g.mountComponent(l,r,t,o,this._processChildContext(i),c);if("production"!==n.env.NODE_ENV&&0!==c){var d=0!==l._debugID?[l._debugID]:[];h.debugTool.onSetChildren(c,d)}return p},getHostNode:function(){return g.getHostNode(this._renderedComponent)},unmountComponent:function(e){if(this._renderedComponent){var t=this._instance;if(t.componentWillUnmount&&!t._calledComponentWillUnmount)if(t._calledComponentWillUnmount=!0,e){var o=this.getName()+".componentWillUnmount()";f.invokeGuardedCallback(o,t.componentWillUnmount.bind(t))}else"production"!==n.env.NODE_ENV?s(function(){return t.componentWillUnmount()},this._debugID,"componentWillUnmount"):t.componentWillUnmount();this._renderedComponent&&(g.unmountComponent(this._renderedComponent,e),this._renderedNodeType=null,this._renderedComponent=null,this._instance=null),this._pendingStateQueue=null,this._pendingReplaceState=!1,this._pendingForceUpdate=!1,this._pendingCallbacks=null,this._pendingElement=null,this._context=null,this._rootNodeID=0,this._topLevelWrapper=null,v.remove(t)}},_maskContext:function(e){var t=this._currentElement.type,n=t.contextTypes;if(!n)return b;var o={};for(var r in n)o[r]=e[r];return o},_processContext:function(e){var t=this._maskContext(e);if("production"!==n.env.NODE_ENV){var o=this._currentElement.type;o.contextTypes&&this._checkContextTypes(o.contextTypes,t,"context")}return t},_processChildContext:function(e){var t,o=this._currentElement.type,r=this._instance;if(r.getChildContext)if("production"!==n.env.NODE_ENV){h.debugTool.onBeginProcessingChildContext();try{t=r.getChildContext()}finally{h.debugTool.onEndProcessingChildContext()}}else t=r.getChildContext();if(t){"object"!==_typeof(o.childContextTypes)?"production"!==n.env.NODE_ENV?E(!1,"%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().",this.getName()||"ReactCompositeComponent"):c("107",this.getName()||"ReactCompositeComponent"):void 0,"production"!==n.env.NODE_ENV&&this._checkContextTypes(o.childContextTypes,t,"childContext");for(var i in t)i in o.childContextTypes?void 0:"production"!==n.env.NODE_ENV?E(!1,'%s.getChildContext(): key "%s" is not defined in childContextTypes.',this.getName()||"ReactCompositeComponent",i):c("108",this.getName()||"ReactCompositeComponent",i);return u({},e,t)}return e},_checkContextTypes:function(e,t,o){"production"!==n.env.NODE_ENV&&y(e,t,o,this.getName(),null,this._debugID)},receiveComponent:function(e,t,n){var o=this._currentElement,r=this._context;this._pendingElement=null,this.updateComponent(t,o,e,r,n)},performUpdateIfNecessary:function(e){null!=this._pendingElement?g.receiveComponent(this,this._pendingElement,e,this._context):null!==this._pendingStateQueue||this._pendingForceUpdate?this.updateComponent(e,this._currentElement,this._currentElement,this._context,this._context):this._updateBatchNumber=null},updateComponent:function(e,t,o,r,i){var a=this._instance;null==a?"production"!==n.env.NODE_ENV?E(!1,"Attempted to update component `%s` that has already been unmounted (or failed to mount).",this.getName()||"ReactCompositeComponent"):c("136",this.getName()||"ReactCompositeComponent"):void 0;var u,l=!1;this._context===i?u=a.context:(u=this._processContext(i),l=!0);var p=t.props,d=o.props;t!==o&&(l=!0),l&&a.componentWillReceiveProps&&("production"!==n.env.NODE_ENV?s(function(){return a.componentWillReceiveProps(d,u)},this._debugID,"componentWillReceiveProps"):a.componentWillReceiveProps(d,u));var f=this._processPendingState(d,u),v=!0;this._pendingForceUpdate||(a.shouldComponentUpdate?v="production"!==n.env.NODE_ENV?s(function(){return a.shouldComponentUpdate(d,f,u)},this._debugID,"shouldComponentUpdate"):a.shouldComponentUpdate(d,f,u):this._compositeType===O.PureClass&&(v=!_(p,d)||!_(a.state,f))),"production"!==n.env.NODE_ENV&&("production"!==n.env.NODE_ENV?C(void 0!==v,"%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.",this.getName()||"ReactCompositeComponent"):void 0),this._updateBatchNumber=null,v?(this._pendingForceUpdate=!1,this._performComponentUpdate(o,d,f,u,e,i)):(this._currentElement=o,this._context=i,a.props=d,a.state=f,a.context=u)},_processPendingState:function(e,t){var n=this._instance,o=this._pendingStateQueue,r=this._pendingReplaceState;if(this._pendingReplaceState=!1,this._pendingStateQueue=null,!o)return n.state;if(r&&1===o.length)return o[0];for(var i=u({},r?o[0]:n.state),a=r?1:0;a<o.length;a++){var s=o[a];u(i,"function"==typeof s?s.call(n,i,e,t):s)}return i},_performComponentUpdate:function(e,t,o,r,i,a){var c,u,l,p=this,d=this._instance,f=Boolean(d.componentDidUpdate);f&&(c=d.props,u=d.state,l=d.context),d.componentWillUpdate&&("production"!==n.env.NODE_ENV?s(function(){return d.componentWillUpdate(t,o,r)},this._debugID,"componentWillUpdate"):d.componentWillUpdate(t,o,r)),this._currentElement=e,this._context=a,d.props=t,d.state=o,d.context=r,this._updateRenderedComponent(i,a),f&&("production"!==n.env.NODE_ENV?i.getReactMountReady().enqueue(function(){s(d.componentDidUpdate.bind(d,c,u,l),p._debugID,"componentDidUpdate")}):i.getReactMountReady().enqueue(d.componentDidUpdate.bind(d,c,u,l),d))},_updateRenderedComponent:function(e,t){var o=this._renderedComponent,r=o._currentElement,i=this._renderValidatedComponent(),a=0;if("production"!==n.env.NODE_ENV&&(a=this._debugID),N(r,i))g.receiveComponent(o,i,e,this._processChildContext(t));else{var s=g.getHostNode(o);g.unmountComponent(o,!1);var c=m.getType(i);this._renderedNodeType=c;var u=this._instantiateReactComponent(i,c!==m.EMPTY);this._renderedComponent=u;var l=g.mountComponent(u,e,this._hostParent,this._hostContainerInfo,this._processChildContext(t),a);if("production"!==n.env.NODE_ENV&&0!==a){var p=0!==u._debugID?[u._debugID]:[];h.debugTool.onSetChildren(a,p)}this._replaceNodeWithMarkup(s,l,o)}},_replaceNodeWithMarkup:function(e,t,n){p.replaceNodeWithMarkup(e,t,n)},_renderValidatedComponentWithoutOwnerOrContext:function(){var e,t=this._instance;return e="production"!==n.env.NODE_ENV?s(function(){return t.render()},this._debugID,"render"):t.render(),"production"!==n.env.NODE_ENV&&void 0===e&&t.render._isMockFunction&&(e=null),e},_renderValidatedComponent:function(){var e;if("production"!==n.env.NODE_ENV||this._compositeType!==O.StatelessFunctional){d.current=this;try{e=this._renderValidatedComponentWithoutOwnerOrContext()}finally{d.current=null}}else e=this._renderValidatedComponentWithoutOwnerOrContext();return null===e||e===!1||l.isValidElement(e)?void 0:"production"!==n.env.NODE_ENV?E(!1,"%s.render(): A valid React element (or null) must be returned. You may have returned undefined, an array or some other invalid object.",this.getName()||"ReactCompositeComponent"):c("109",this.getName()||"ReactCompositeComponent"),e},attachRef:function(e,t){var o=this.getPublicInstance();null==o?"production"!==n.env.NODE_ENV?E(!1,"Stateless function components cannot have refs."):c("110"):void 0;var r=t.getPublicInstance();if("production"!==n.env.NODE_ENV){var i=t&&t.getName?t.getName():"a component";"production"!==n.env.NODE_ENV?C(null!=r||t._compositeType!==O.StatelessFunctional,'Stateless function components cannot be given refs (See ref "%s" in %s created by %s). Attempts to access this ref will fail.',e,i,this.getName()):void 0}var a=o.refs===b?o.refs={}:o.refs;a[e]=r},detachRef:function(e){var t=this.getPublicInstance().refs;delete t[e]},getName:function(){var e=this._currentElement.type,t=this._instance&&this._instance.constructor;return e.displayName||t&&t.displayName||e.name||t&&t.name||null},getPublicInstance:function(){var e=this._instance;return this._compositeType===O.StatelessFunctional?null:e},_instantiateReactComponent:null};t.exports=w}).call(this,e("rH1JPG"))},{"./ReactComponentEnvironment":58,"./ReactErrorUtils":83,"./ReactInstanceMap":91,"./ReactInstrumentation":92,"./ReactNodeTypes":97,"./ReactReconciler":102,"./checkReactTypeSpec":129,"./reactProdInvariant":150,"./shouldUpdateReactComponent":154,"fbjs/lib/emptyObject":13,"fbjs/lib/invariant":20,"fbjs/lib/shallowEqual":26,"fbjs/lib/warning":27,"object-assign":28,rH1JPG:29,"react/lib/React":160,"react/lib/ReactCurrentOwner":165}],60:[function(e,t,n){(function(n){var o=e("./ReactDOMComponentTree"),r=e("./ReactDefaultInjection"),i=e("./ReactMount"),a=e("./ReactReconciler"),s=e("./ReactUpdates"),c=e("./ReactVersion"),u=e("./findDOMNode"),l=e("./getHostComponentFromComposite"),p=e("./renderSubtreeIntoContainer"),d=e("fbjs/lib/warning");r.inject();var f={findDOMNode:u,render:i.render,unmountComponentAtNode:i.unmountComponentAtNode,version:c,unstable_batchedUpdates:s.batchedUpdates,unstable_renderSubtreeIntoContainer:p};if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject&&__REACT_DEVTOOLS_GLOBAL_HOOK__.inject({ComponentTree:{getClosestInstanceFromNode:o.getClosestInstanceFromNode,getNodeFromInstance:function(e){return e._renderedComponent&&(e=l(e)),e?o.getNodeFromInstance(e):null}},Mount:i,Reconciler:a}),"production"!==n.env.NODE_ENV){var v=e("fbjs/lib/ExecutionEnvironment");if(v.canUseDOM&&window.top===window.self){if("undefined"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&(navigator.userAgent.indexOf("Chrome")>-1&&navigator.userAgent.indexOf("Edge")===-1||navigator.userAgent.indexOf("Firefox")>-1)){var h=window.location.protocol.indexOf("http")===-1&&navigator.userAgent.indexOf("Firefox")===-1;console.debug("Download the React DevTools "+(h?"and use an HTTP server (instead of a file: URL) ":"")+"for a better development experience: https://fb.me/react-devtools")}var m=function(){};"production"!==n.env.NODE_ENV?d((m.name||m.toString()).indexOf("testFn")!==-1,"It looks like you're using a minified copy of the development build of React. When deploying React apps to production, make sure to use the production build which skips development warnings and is faster. See https://fb.me/react-minification for more details."):void 0;var g=document.documentMode&&document.documentMode<8;"production"!==n.env.NODE_ENV?d(!g,'Internet Explorer is running in compatibility mode; please add the following tag to your HTML to prevent this from happening: <meta http-equiv="X-UA-Compatible" content="IE=edge" />'):void 0;for(var y=[Array.isArray,Array.prototype.every,Array.prototype.forEach,Array.prototype.indexOf,Array.prototype.map,Date.now,Function.prototype.bind,Object.keys,String.prototype.trim],b=0;b<y.length;b++)if(!y[b]){"production"!==n.env.NODE_ENV?d(!1,"One or more ES5 shims expected by React are not available: https://fb.me/react-warning-polyfills"):void 0;break}}}if("production"!==n.env.NODE_ENV){var E=e("./ReactInstrumentation"),_=e("./ReactDOMUnknownPropertyHook"),N=e("./ReactDOMNullInputValuePropHook"),C=e("./ReactDOMInvalidARIAHook");E.debugTool.addHook(_),E.debugTool.addHook(N),E.debugTool.addHook(C)}t.exports=f}).call(this,e("rH1JPG"))},{"./ReactDOMComponentTree":63,"./ReactDOMInvalidARIAHook":69,"./ReactDOMNullInputValuePropHook":70,"./ReactDOMUnknownPropertyHook":77,"./ReactDefaultInjection":80,"./ReactInstrumentation":92,"./ReactMount":95,"./ReactReconciler":102,"./ReactUpdates":107,"./ReactVersion":108,"./findDOMNode":133,"./getHostComponentFromComposite":140,"./renderSubtreeIntoContainer":151,"fbjs/lib/ExecutionEnvironment":6,"fbjs/lib/warning":27,rH1JPG:29}],61:[function(e,t,n){(function(n){function o(e){if(e){var t=e._currentElement._owner||null;if(t){var n=t.getName();if(n)return" This DOM node was rendered by `"+n+"`."}}return""}function r(e){if("object"===("undefined"==typeof e?"undefined":_typeof(e))){if(Array.isArray(e))return"["+e.map(r).join(", ")+"]";var t=[];for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var o=/^[a-z$_][\w$_]*$/i.test(n)?n:JSON.stringify(n);t.push(o+": "+r(e[n]))}return"{"+t.join(", ")+"}"}return"string"==typeof e?JSON.stringify(e):"function"==typeof e?"[function object]":String(e)}function i(e,t,o){if(null!=e&&null!=t&&!L(e,t)){var i,a=o._tag,s=o._currentElement._owner;s&&(i=s.getName());var c=i+"|"+a;ee.hasOwnProperty(c)||(ee[c]=!0,"production"!==n.env.NODE_ENV?G(!1,"`%s` was passed a style object that has previously been mutated. Mutating `style` is deprecated. Consider cloning it beforehand. Check the `render` %s. Previous style: %s. Mutated style: %s.",a,s?"of `"+i+"`":"using <"+a+">",r(e),r(t)):void 0)}}function a(e,t){t&&(ie[e._tag]&&(null!=t.children||null!=t.dangerouslySetInnerHTML?"production"!==n.env.NODE_ENV?H(!1,"%s is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.%s",e._tag,e._currentElement._owner?" Check the render method of "+e._currentElement._owner.getName()+".":""):g("137",e._tag,e._currentElement._owner?" Check the render method of "+e._currentElement._owner.getName()+".":""):void 0),null!=t.dangerouslySetInnerHTML&&(null!=t.children?"production"!==n.env.NODE_ENV?H(!1,"Can only set one of `children` or `props.dangerouslySetInnerHTML`."):g("60"):void 0,"object"===_typeof(t.dangerouslySetInnerHTML)&&X in t.dangerouslySetInnerHTML?void 0:"production"!==n.env.NODE_ENV?H(!1,"`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://fb.me/react-invariant-dangerously-set-inner-html for more information."):g("61")),"production"!==n.env.NODE_ENV&&("production"!==n.env.NODE_ENV?G(null==t.innerHTML,"Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."):void 0,"production"!==n.env.NODE_ENV?G(t.suppressContentEditableWarning||!t.contentEditable||null==t.children,"A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."):void 0,"production"!==n.env.NODE_ENV?G(null==t.onFocusIn&&null==t.onFocusOut,"React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."):void 0),null!=t.style&&"object"!==_typeof(t.style)?"production"!==n.env.NODE_ENV?H(!1,"The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.%s",o(e)):g("62",o(e)):void 0)}function s(e,t,o,r){if(!(r instanceof j)){"production"!==n.env.NODE_ENV&&("production"!==n.env.NODE_ENV?G("onScroll"!==t||F("scroll",!0),"This browser doesn't support the `onScroll` event"):void 0);var i=e._hostContainerInfo,a=i._node&&i._node.nodeType===Z,s=a?i._node:i._ownerDocument;K(t,s),r.getReactMountReady().enqueue(c,{inst:e,registrationName:t,listener:o})}}function c(){var e=this;D.putListener(e.inst,e.registrationName,e.listener)}function u(){var e=this;I.postMountWrapper(e)}function l(){var e=this;M.postMountWrapper(e)}function p(){var e=this;x.postMountWrapper(e)}function d(){var e=this;e._rootNodeID?void 0:"production"!==n.env.NODE_ENV?H(!1,"Must be mounted to trap events"):g("63");var t=q(e);switch(t?void 0:"production"!==n.env.NODE_ENV?H(!1,"trapBubbledEvent(...): Requires node to be rendered."):g("64"),e._tag){case"iframe":case"object":e._wrapperState.listeners=[R.trapBubbledEvent("topLoad","load",t)];break;case"video":case"audio":e._wrapperState.listeners=[];for(var o in ne)ne.hasOwnProperty(o)&&e._wrapperState.listeners.push(R.trapBubbledEvent(o,ne[o],t));break;case"source":e._wrapperState.listeners=[R.trapBubbledEvent("topError","error",t)];break;case"img":e._wrapperState.listeners=[R.trapBubbledEvent("topError","error",t),R.trapBubbledEvent("topLoad","load",t)];break;case"form":e._wrapperState.listeners=[R.trapBubbledEvent("topReset","reset",t),R.trapBubbledEvent("topSubmit","submit",t)];break;case"input":case"select":case"textarea":e._wrapperState.listeners=[R.trapBubbledEvent("topInvalid","invalid",t)]}}function f(){k.postUpdateWrapper(this)}function v(e){ce.call(se,e)||(ae.test(e)?void 0:"production"!==n.env.NODE_ENV?H(!1,"Invalid tag: %s",e):g("65",e),se[e]=!0)}function h(e,t){return e.indexOf("-")>=0||null!=t.is}function m(e){var t=e.type;v(t),this._currentElement=e,this._tag=t.toLowerCase(),this._namespaceURI=null,this._renderedChildren=null,this._previousStyle=null,this._previousStyleCopy=null,this._hostNode=null,this._hostParent=null,this._rootNodeID=0,this._domID=0,this._hostContainerInfo=null,this._wrapperState=null,this._topLevelWrapper=null,this._flags=0,"production"!==n.env.NODE_ENV&&(this._ancestorInfo=null,te.call(this,null))}var g=e("./reactProdInvariant"),y=e("object-assign"),b=e("./AutoFocusUtils"),E=e("./CSSPropertyOperations"),_=e("./DOMLazyTree"),N=e("./DOMNamespaces"),C=e("./DOMProperty"),O=e("./DOMPropertyOperations"),D=e("./EventPluginHub"),w=e("./EventPluginRegistry"),R=e("./ReactBrowserEventEmitter"),P=e("./ReactDOMComponentFlags"),T=e("./ReactDOMComponentTree"),I=e("./ReactDOMInput"),x=e("./ReactDOMOption"),k=e("./ReactDOMSelect"),M=e("./ReactDOMTextarea"),S=e("./ReactInstrumentation"),V=e("./ReactMultiChild"),j=e("./ReactServerRenderingTransaction"),A=e("fbjs/lib/emptyFunction"),U=e("./escapeTextContentForBrowser"),H=e("fbjs/lib/invariant"),F=e("./isEventSupported"),L=e("fbjs/lib/shallowEqual"),B=e("./validateDOMNesting"),G=e("fbjs/lib/warning"),W=P,J=D.deleteListener,q=T.getNodeFromInstance,K=R.listenTo,Y=w.registrationNameModules,z={string:!0,number:!0},Q="style",X="__html",$={children:null,dangerouslySetInnerHTML:null,suppressContentEditableWarning:null},Z=11,ee={},te=A;"production"!==n.env.NODE_ENV&&(te=function(e){var t=null!=this._contentDebugID,n=this._debugID,o=-n;return null==e?(t&&S.debugTool.onUnmountComponent(this._contentDebugID),void(this._contentDebugID=null)):(B(null,String(e),this,this._ancestorInfo),this._contentDebugID=o,void(t?(S.debugTool.onBeforeUpdateComponent(o,e),S.debugTool.onUpdateComponent(o)):(S.debugTool.onBeforeMountComponent(o,e,n),S.debugTool.onMountComponent(o),S.debugTool.onSetChildren(n,[o]))))});var ne={topAbort:"abort",topCanPlay:"canplay",topCanPlayThrough:"canplaythrough",topDurationChange:"durationchange",topEmptied:"emptied",topEncrypted:"encrypted",topEnded:"ended",topError:"error",topLoadedData:"loadeddata",topLoadedMetadata:"loadedmetadata",topLoadStart:"loadstart",topPause:"pause",topPlay:"play",topPlaying:"playing",topProgress:"progress",topRateChange:"ratechange",topSeeked:"seeked",topSeeking:"seeking",topStalled:"stalled",topSuspend:"suspend",topTimeUpdate:"timeupdate",topVolumeChange:"volumechange",topWaiting:"waiting"},oe={area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0},re={listing:!0,pre:!0,textarea:!0},ie=y({menuitem:!0},oe),ae=/^[a-zA-Z][a-zA-Z:_\.\-\d]*$/,se={},ce={}.hasOwnProperty,ue=1;m.displayName="ReactDOMComponent",m.Mixin={mountComponent:function(e,t,o,r){this._rootNodeID=ue++,this._domID=o._idCounter++,this._hostParent=t,this._hostContainerInfo=o;var i=this._currentElement.props;switch(this._tag){case"audio":case"form":case"iframe":case"img":case"link":case"object":case"source":case"video":this._wrapperState={listeners:null},e.getReactMountReady().enqueue(d,this);break;case"input":I.mountWrapper(this,i,t),i=I.getHostProps(this,i),e.getReactMountReady().enqueue(d,this);break;case"option":x.mountWrapper(this,i,t),i=x.getHostProps(this,i);break;case"select":k.mountWrapper(this,i,t),i=k.getHostProps(this,i),e.getReactMountReady().enqueue(d,this);break;case"textarea":M.mountWrapper(this,i,t),i=M.getHostProps(this,i),e.getReactMountReady().enqueue(d,this)}a(this,i);var s,c;if(null!=t?(s=t._namespaceURI,c=t._tag):o._tag&&(s=o._namespaceURI,c=o._tag),(null==s||s===N.svg&&"foreignobject"===c)&&(s=N.html),s===N.html&&("svg"===this._tag?s=N.svg:"math"===this._tag&&(s=N.mathml)),this._namespaceURI=s,"production"!==n.env.NODE_ENV){var f;null!=t?f=t._ancestorInfo:o._tag&&(f=o._ancestorInfo),f&&B(this._tag,null,this,f),this._ancestorInfo=B.updatedAncestorInfo(f,this._tag,this)}var v;if(e.useCreateElement){var h,m=o._ownerDocument;if(s===N.html)if("script"===this._tag){var g=m.createElement("div"),y=this._currentElement.type;g.innerHTML="<"+y+"></"+y+">",h=g.removeChild(g.firstChild)}else h=i.is?m.createElement(this._currentElement.type,i.is):m.createElement(this._currentElement.type);else h=m.createElementNS(s,this._currentElement.type);T.precacheNode(this,h),this._flags|=W.hasCachedChildNodes,this._hostParent||O.setAttributeForRoot(h),this._updateDOMProperties(null,i,e);var E=_(h);this._createInitialChildren(e,i,r,E),v=E}else{var C=this._createOpenTagMarkupAndPutListeners(e,i),D=this._createContentMarkup(e,i,r);v=!D&&oe[this._tag]?C+"/>":C+">"+D+"</"+this._currentElement.type+">"}switch(this._tag){case"input":e.getReactMountReady().enqueue(u,this),i.autoFocus&&e.getReactMountReady().enqueue(b.focusDOMComponent,this);break;case"textarea":e.getReactMountReady().enqueue(l,this),i.autoFocus&&e.getReactMountReady().enqueue(b.focusDOMComponent,this);break;case"select":i.autoFocus&&e.getReactMountReady().enqueue(b.focusDOMComponent,this);break;case"button":i.autoFocus&&e.getReactMountReady().enqueue(b.focusDOMComponent,this);break;case"option":e.getReactMountReady().enqueue(p,this)}return v},_createOpenTagMarkupAndPutListeners:function(e,t){var o="<"+this._currentElement.type;for(var r in t)if(t.hasOwnProperty(r)){var i=t[r];if(null!=i)if(Y.hasOwnProperty(r))i&&s(this,r,i,e);else{r===Q&&(i&&("production"!==n.env.NODE_ENV&&(this._previousStyle=i),i=this._previousStyleCopy=y({},t.style)),i=E.createMarkupForStyles(i,this));var a=null;null!=this._tag&&h(this._tag,t)?$.hasOwnProperty(r)||(a=O.createMarkupForCustomAttribute(r,i)):a=O.createMarkupForProperty(r,i),a&&(o+=" "+a)}}return e.renderToStaticMarkup?o:(this._hostParent||(o+=" "+O.createMarkupForRoot()),o+=" "+O.createMarkupForID(this._domID))},_createContentMarkup:function(e,t,o){var r="",i=t.dangerouslySetInnerHTML;if(null!=i)null!=i.__html&&(r=i.__html);else{var a=z[_typeof(t.children)]?t.children:null,s=null!=a?null:t.children;if(null!=a)r=U(a),"production"!==n.env.NODE_ENV&&te.call(this,a);else if(null!=s){var c=this.mountChildren(s,e,o);r=c.join("")}}return re[this._tag]&&"\n"===r.charAt(0)?"\n"+r:r},_createInitialChildren:function(e,t,o,r){var i=t.dangerouslySetInnerHTML;if(null!=i)null!=i.__html&&_.queueHTML(r,i.__html);else{var a=z[_typeof(t.children)]?t.children:null,s=null!=a?null:t.children;if(null!=a)"production"!==n.env.NODE_ENV&&te.call(this,a),_.queueText(r,a);else if(null!=s)for(var c=this.mountChildren(s,e,o),u=0;u<c.length;u++)_.queueChild(r,c[u])}},receiveComponent:function(e,t,n){var o=this._currentElement;this._currentElement=e,this.updateComponent(t,o,e,n)},updateComponent:function(e,t,n,o){var r=t.props,i=this._currentElement.props;switch(this._tag){case"input":r=I.getHostProps(this,r),i=I.getHostProps(this,i);break;case"option":r=x.getHostProps(this,r),i=x.getHostProps(this,i);break;case"select":r=k.getHostProps(this,r),i=k.getHostProps(this,i);break;case"textarea":r=M.getHostProps(this,r),i=M.getHostProps(this,i)}switch(a(this,i),this._updateDOMProperties(r,i,e),this._updateDOMChildren(r,i,e,o),this._tag){case"input":I.updateWrapper(this);break;case"textarea":M.updateWrapper(this);break;case"select":e.getReactMountReady().enqueue(f,this)}},_updateDOMProperties:function(e,t,o){var r,a,c;for(r in e)if(!t.hasOwnProperty(r)&&e.hasOwnProperty(r)&&null!=e[r])if(r===Q){var u=this._previousStyleCopy;for(a in u)u.hasOwnProperty(a)&&(c=c||{},c[a]="");this._previousStyleCopy=null}else Y.hasOwnProperty(r)?e[r]&&J(this,r):h(this._tag,e)?$.hasOwnProperty(r)||O.deleteValueForAttribute(q(this),r):(C.properties[r]||C.isCustomAttribute(r))&&O.deleteValueForProperty(q(this),r);for(r in t){var l=t[r],p=r===Q?this._previousStyleCopy:null!=e?e[r]:void 0;if(t.hasOwnProperty(r)&&l!==p&&(null!=l||null!=p))if(r===Q)if(l?("production"!==n.env.NODE_ENV&&(i(this._previousStyleCopy,this._previousStyle,this),this._previousStyle=l),l=this._previousStyleCopy=y({},l)):this._previousStyleCopy=null,p){for(a in p)!p.hasOwnProperty(a)||l&&l.hasOwnProperty(a)||(c=c||{},c[a]="");for(a in l)l.hasOwnProperty(a)&&p[a]!==l[a]&&(c=c||{},c[a]=l[a])}else c=l;else if(Y.hasOwnProperty(r))l?s(this,r,l,o):p&&J(this,r);else if(h(this._tag,t))$.hasOwnProperty(r)||O.setValueForAttribute(q(this),r,l);else if(C.properties[r]||C.isCustomAttribute(r)){
var d=q(this);null!=l?O.setValueForProperty(d,r,l):O.deleteValueForProperty(d,r)}}c&&E.setValueForStyles(q(this),c,this)},_updateDOMChildren:function(e,t,o,r){var i=z[_typeof(e.children)]?e.children:null,a=z[_typeof(t.children)]?t.children:null,s=e.dangerouslySetInnerHTML&&e.dangerouslySetInnerHTML.__html,c=t.dangerouslySetInnerHTML&&t.dangerouslySetInnerHTML.__html,u=null!=i?null:e.children,l=null!=a?null:t.children,p=null!=i||null!=s,d=null!=a||null!=c;null!=u&&null==l?this.updateChildren(null,o,r):p&&!d&&(this.updateTextContent(""),"production"!==n.env.NODE_ENV&&S.debugTool.onSetChildren(this._debugID,[])),null!=a?i!==a&&(this.updateTextContent(""+a),"production"!==n.env.NODE_ENV&&te.call(this,a)):null!=c?(s!==c&&this.updateMarkup(""+c),"production"!==n.env.NODE_ENV&&S.debugTool.onSetChildren(this._debugID,[])):null!=l&&("production"!==n.env.NODE_ENV&&te.call(this,null),this.updateChildren(l,o,r))},getHostNode:function(){return q(this)},unmountComponent:function(e){switch(this._tag){case"audio":case"form":case"iframe":case"img":case"link":case"object":case"source":case"video":var t=this._wrapperState.listeners;if(t)for(var o=0;o<t.length;o++)t[o].remove();break;case"html":case"head":case"body":"production"!==n.env.NODE_ENV?H(!1,"<%s> tried to unmount. Because of cross-browser quirks it is impossible to unmount some top-level components (eg <html>, <head>, and <body>) reliably and efficiently. To fix this, have a single top-level component that never unmounts render these elements.",this._tag):g("66",this._tag)}this.unmountChildren(e),T.uncacheNode(this),D.deleteAllListeners(this),this._rootNodeID=0,this._domID=0,this._wrapperState=null,"production"!==n.env.NODE_ENV&&te.call(this,null)},getPublicInstance:function(){return q(this)}},y(m.prototype,m.Mixin,V.Mixin),t.exports=m}).call(this,e("rH1JPG"))},{"./AutoFocusUtils":32,"./CSSPropertyOperations":35,"./DOMLazyTree":39,"./DOMNamespaces":40,"./DOMProperty":41,"./DOMPropertyOperations":42,"./EventPluginHub":46,"./EventPluginRegistry":47,"./ReactBrowserEventEmitter":55,"./ReactDOMComponentFlags":62,"./ReactDOMComponentTree":63,"./ReactDOMInput":68,"./ReactDOMOption":71,"./ReactDOMSelect":72,"./ReactDOMTextarea":75,"./ReactInstrumentation":92,"./ReactMultiChild":96,"./ReactServerRenderingTransaction":104,"./escapeTextContentForBrowser":132,"./isEventSupported":147,"./reactProdInvariant":150,"./validateDOMNesting":156,"fbjs/lib/emptyFunction":12,"fbjs/lib/invariant":20,"fbjs/lib/shallowEqual":26,"fbjs/lib/warning":27,"object-assign":28,rH1JPG:29}],62:[function(e,t,n){var o={hasCachedChildNodes:1};t.exports=o},{}],63:[function(e,t,n){(function(n){function o(e){for(var t;t=e._renderedComponent;)e=t;return e}function r(e,t){var n=o(e);n._hostNode=t,t[m]=n}function i(e){var t=e._hostNode;t&&(delete t[m],e._hostNode=null)}function a(e,t){if(!(e._flags&h.hasCachedChildNodes)){var i=e._renderedChildren,a=t.firstChild;e:for(var s in i)if(i.hasOwnProperty(s)){var c=i[s],u=o(c)._domID;if(0!==u){for(;null!==a;a=a.nextSibling)if(1===a.nodeType&&a.getAttribute(v)===String(u)||8===a.nodeType&&a.nodeValue===" react-text: "+u+" "||8===a.nodeType&&a.nodeValue===" react-empty: "+u+" "){r(c,a);continue e}"production"!==n.env.NODE_ENV?f(!1,"Unable to find element with ID %s.",u):l("32",u)}}e._flags|=h.hasCachedChildNodes}}function s(e){if(e[m])return e[m];for(var t=[];!e[m];){if(t.push(e),!e.parentNode)return null;e=e.parentNode}for(var n,o;e&&(o=e[m]);e=t.pop())n=o,t.length&&a(o,e);return n}function c(e){var t=s(e);return null!=t&&t._hostNode===e?t:null}function u(e){if(void 0===e._hostNode?"production"!==n.env.NODE_ENV?f(!1,"getNodeFromInstance: Invalid argument."):l("33"):void 0,e._hostNode)return e._hostNode;for(var t=[];!e._hostNode;)t.push(e),e._hostParent?void 0:"production"!==n.env.NODE_ENV?f(!1,"React DOM tree root should always have a node reference."):l("34"),e=e._hostParent;for(;t.length;e=t.pop())a(e,e._hostNode);return e._hostNode}var l=e("./reactProdInvariant"),p=e("./DOMProperty"),d=e("./ReactDOMComponentFlags"),f=e("fbjs/lib/invariant"),v=p.ID_ATTRIBUTE_NAME,h=d,m="__reactInternalInstance$"+Math.random().toString(36).slice(2),g={getClosestInstanceFromNode:s,getInstanceFromNode:c,getNodeFromInstance:u,precacheChildNodes:a,precacheNode:r,uncacheNode:i};t.exports=g}).call(this,e("rH1JPG"))},{"./DOMProperty":41,"./ReactDOMComponentFlags":62,"./reactProdInvariant":150,"fbjs/lib/invariant":20,rH1JPG:29}],64:[function(e,t,n){(function(n){function o(e,t){var o={_topLevelWrapper:e,_idCounter:1,_ownerDocument:t?t.nodeType===i?t:t.ownerDocument:null,_node:t,_tag:t?t.nodeName.toLowerCase():null,_namespaceURI:t?t.namespaceURI:null};return"production"!==n.env.NODE_ENV&&(o._ancestorInfo=t?r.updatedAncestorInfo(null,o._tag,null):null),o}var r=e("./validateDOMNesting"),i=9;t.exports=o}).call(this,e("rH1JPG"))},{"./validateDOMNesting":156,rH1JPG:29}],65:[function(e,t,n){var o=e("object-assign"),r=e("./DOMLazyTree"),i=e("./ReactDOMComponentTree"),a=function(e){this._currentElement=null,this._hostNode=null,this._hostParent=null,this._hostContainerInfo=null,this._domID=0};o(a.prototype,{mountComponent:function(e,t,n,o){var a=n._idCounter++;this._domID=a,this._hostParent=t,this._hostContainerInfo=n;var s=" react-empty: "+this._domID+" ";if(e.useCreateElement){var c=n._ownerDocument,u=c.createComment(s);return i.precacheNode(this,u),r(u)}return e.renderToStaticMarkup?"":"<!--"+s+"-->"},receiveComponent:function(){},getHostNode:function(){return i.getNodeFromInstance(this)},unmountComponent:function(){i.uncacheNode(this)}}),t.exports=a},{"./DOMLazyTree":39,"./ReactDOMComponentTree":63,"object-assign":28}],66:[function(e,t,n){var o={useCreateElement:!0,useFiber:!1};t.exports=o},{}],67:[function(e,t,n){var o=e("./DOMChildrenOperations"),r=e("./ReactDOMComponentTree"),i={dangerouslyProcessChildrenUpdates:function(e,t){var n=r.getNodeFromInstance(e);o.processUpdates(n,t)}};t.exports=i},{"./DOMChildrenOperations":38,"./ReactDOMComponentTree":63}],68:[function(e,t,n){(function(n){function o(){this._rootNodeID&&E.updateWrapper(this)}function r(e){var t="checkbox"===e.type||"radio"===e.type;return t?null!=e.checked:null!=e.value}function i(e){var t=this._currentElement.props,r=u.executeOnChange(t,e);p.asap(o,this);var i=t.name;if("radio"===t.type&&null!=i){for(var s=l.getNodeFromInstance(this),c=s;c.parentNode;)c=c.parentNode;for(var f=c.querySelectorAll("input[name="+JSON.stringify(""+i)+'][type="radio"]'),v=0;v<f.length;v++){var h=f[v];if(h!==s&&h.form===s.form){var m=l.getInstanceFromNode(h);m?void 0:"production"!==n.env.NODE_ENV?d(!1,"ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported."):a("90"),p.asap(o,m)}}}return r}var a=e("./reactProdInvariant"),s=e("object-assign"),c=e("./DOMPropertyOperations"),u=e("./LinkedValueUtils"),l=e("./ReactDOMComponentTree"),p=e("./ReactUpdates"),d=e("fbjs/lib/invariant"),f=e("fbjs/lib/warning"),v=!1,h=!1,m=!1,g=!1,y=!1,b=!1,E={getHostProps:function(e,t){var n=u.getValue(t),o=u.getChecked(t),r=s({type:void 0,step:void 0,min:void 0,max:void 0},t,{defaultChecked:void 0,defaultValue:void 0,value:null!=n?n:e._wrapperState.initialValue,checked:null!=o?o:e._wrapperState.initialChecked,onChange:e._wrapperState.onChange});return r},mountWrapper:function(e,t){if("production"!==n.env.NODE_ENV){u.checkPropTypes("input",t,e._currentElement._owner);var o=e._currentElement._owner;void 0===t.valueLink||v||("production"!==n.env.NODE_ENV?f(!1,"`valueLink` prop on `input` is deprecated; set `value` and `onChange` instead."):void 0,v=!0),void 0===t.checkedLink||h||("production"!==n.env.NODE_ENV?f(!1,"`checkedLink` prop on `input` is deprecated; set `value` and `onChange` instead."):void 0,h=!0),void 0===t.checked||void 0===t.defaultChecked||g||("production"!==n.env.NODE_ENV?f(!1,"%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://fb.me/react-controlled-components",o&&o.getName()||"A component",t.type):void 0,g=!0),void 0===t.value||void 0===t.defaultValue||m||("production"!==n.env.NODE_ENV?f(!1,"%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://fb.me/react-controlled-components",o&&o.getName()||"A component",t.type):void 0,m=!0)}var a=t.defaultValue;e._wrapperState={initialChecked:null!=t.checked?t.checked:t.defaultChecked,initialValue:null!=t.value?t.value:a,listeners:null,onChange:i.bind(e)},"production"!==n.env.NODE_ENV&&(e._wrapperState.controlled=r(t))},updateWrapper:function(e){var t=e._currentElement.props;if("production"!==n.env.NODE_ENV){var o=r(t),i=e._currentElement._owner;e._wrapperState.controlled||!o||b||("production"!==n.env.NODE_ENV?f(!1,"%s is changing an uncontrolled input of type %s to be controlled. Input elements should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://fb.me/react-controlled-components",i&&i.getName()||"A component",t.type):void 0,b=!0),!e._wrapperState.controlled||o||y||("production"!==n.env.NODE_ENV?f(!1,"%s is changing a controlled input of type %s to be uncontrolled. Input elements should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://fb.me/react-controlled-components",i&&i.getName()||"A component",t.type):void 0,y=!0)}var a=t.checked;null!=a&&c.setValueForProperty(l.getNodeFromInstance(e),"checked",a||!1);var s=l.getNodeFromInstance(e),p=u.getValue(t);if(null!=p){var d=""+p;d!==s.value&&(s.value=d)}else null==t.value&&null!=t.defaultValue&&(s.defaultValue=""+t.defaultValue),null==t.checked&&null!=t.defaultChecked&&(s.defaultChecked=!!t.defaultChecked)},postMountWrapper:function(e){var t=e._currentElement.props,n=l.getNodeFromInstance(e);switch(t.type){case"submit":case"reset":break;case"color":case"date":case"datetime":case"datetime-local":case"month":case"time":case"week":n.value="",n.value=n.defaultValue;break;default:n.value=n.value}var o=n.name;""!==o&&(n.name=""),n.defaultChecked=!n.defaultChecked,n.defaultChecked=!n.defaultChecked,""!==o&&(n.name=o)}};t.exports=E}).call(this,e("rH1JPG"))},{"./DOMPropertyOperations":42,"./LinkedValueUtils":53,"./ReactDOMComponentTree":63,"./ReactUpdates":107,"./reactProdInvariant":150,"fbjs/lib/invariant":20,"fbjs/lib/warning":27,"object-assign":28,rH1JPG:29}],69:[function(e,t,n){(function(n){function o(e,t,o){if(u.hasOwnProperty(t)&&u[t])return!0;if(l.test(t)){var r=t.toLowerCase(),i=a.getPossibleStandardName.hasOwnProperty(r)?a.getPossibleStandardName[r]:null;if(null==i)return u[t]=!0,!1;if(t!==i)return"production"!==n.env.NODE_ENV?c(!1,"Unknown ARIA attribute %s. Did you mean %s?%s",t,i,s.getStackAddendumByID(o)):void 0,u[t]=!0,!0}return!0}function r(e,t){var r=[];for(var i in t.props){var a=o(t.type,i,e);a||r.push(i)}var u=r.map(function(e){return"`"+e+"`"}).join(", ");1===r.length?"production"!==n.env.NODE_ENV?c(!1,"Invalid aria prop %s on <%s> tag. For details, see https://fb.me/invalid-aria-prop%s",u,t.type,s.getStackAddendumByID(e)):void 0:r.length>1&&("production"!==n.env.NODE_ENV?c(!1,"Invalid aria props %s on <%s> tag. For details, see https://fb.me/invalid-aria-prop%s",u,t.type,s.getStackAddendumByID(e)):void 0)}function i(e,t){null!=t&&"string"==typeof t.type&&(t.type.indexOf("-")>=0||t.props.is||r(e,t))}var a=e("./DOMProperty"),s=e("react/lib/ReactComponentTreeHook"),c=e("fbjs/lib/warning"),u={},l=new RegExp("^(aria)-["+a.ATTRIBUTE_NAME_CHAR+"]*$"),p={onBeforeMountComponent:function(e,t){"production"!==n.env.NODE_ENV&&i(e,t)},onBeforeUpdateComponent:function(e,t){"production"!==n.env.NODE_ENV&&i(e,t)}};t.exports=p}).call(this,e("rH1JPG"))},{"./DOMProperty":41,"fbjs/lib/warning":27,rH1JPG:29,"react/lib/ReactComponentTreeHook":164}],70:[function(e,t,n){(function(n){function o(e,t){null!=t&&("input"!==t.type&&"textarea"!==t.type&&"select"!==t.type||null==t.props||null!==t.props.value||a||("production"!==n.env.NODE_ENV?i(!1,"`value` prop on `%s` should not be null. Consider using the empty string to clear the component or `undefined` for uncontrolled components.%s",t.type,r.getStackAddendumByID(e)):void 0,a=!0))}var r=e("react/lib/ReactComponentTreeHook"),i=e("fbjs/lib/warning"),a=!1,s={onBeforeMountComponent:function(e,t){o(e,t)},onBeforeUpdateComponent:function(e,t){o(e,t)}};t.exports=s}).call(this,e("rH1JPG"))},{"fbjs/lib/warning":27,rH1JPG:29,"react/lib/ReactComponentTreeHook":164}],71:[function(e,t,n){(function(n){function o(e){var t="";return i.Children.forEach(e,function(e){null!=e&&("string"==typeof e||"number"==typeof e?t+=e:u||(u=!0,"production"!==n.env.NODE_ENV?c(!1,"Only strings and numbers are supported as <option> children."):void 0))}),t}var r=e("object-assign"),i=e("react/lib/React"),a=e("./ReactDOMComponentTree"),s=e("./ReactDOMSelect"),c=e("fbjs/lib/warning"),u=!1,l={mountWrapper:function(e,t,r){"production"!==n.env.NODE_ENV&&("production"!==n.env.NODE_ENV?c(null==t.selected,"Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."):void 0);var i=null;if(null!=r){var a=r;"optgroup"===a._tag&&(a=a._hostParent),null!=a&&"select"===a._tag&&(i=s.getSelectValueContext(a))}var u=null;if(null!=i){var l;if(l=null!=t.value?t.value+"":o(t.children),u=!1,Array.isArray(i)){for(var p=0;p<i.length;p++)if(""+i[p]===l){u=!0;break}}else u=""+i===l}e._wrapperState={selected:u}},postMountWrapper:function(e){var t=e._currentElement.props;if(null!=t.value){var n=a.getNodeFromInstance(e);n.setAttribute("value",t.value)}},getHostProps:function(e,t){var n=r({selected:void 0,children:void 0},t);null!=e._wrapperState.selected&&(n.selected=e._wrapperState.selected);var i=o(t.children);return i&&(n.children=i),n}};t.exports=l}).call(this,e("rH1JPG"))},{"./ReactDOMComponentTree":63,"./ReactDOMSelect":72,"fbjs/lib/warning":27,"object-assign":28,rH1JPG:29,"react/lib/React":160}],72:[function(e,t,n){(function(n){function o(){if(this._rootNodeID&&this._wrapperState.pendingUpdate){this._wrapperState.pendingUpdate=!1;var e=this._currentElement.props,t=u.getValue(e);null!=t&&a(this,Boolean(e.multiple),t)}}function r(e){if(e){var t=e.getName();if(t)return" Check the render method of `"+t+"`."}return""}function i(e,t){var o=e._currentElement._owner;u.checkPropTypes("select",t,o),void 0===t.valueLink||f||("production"!==n.env.NODE_ENV?d(!1,"`valueLink` prop on `select` is deprecated; set `value` and `onChange` instead."):void 0,f=!0);for(var i=0;i<h.length;i++){var a=h[i];if(null!=t[a]){var s=Array.isArray(t[a]);t.multiple&&!s?"production"!==n.env.NODE_ENV?d(!1,"The `%s` prop supplied to <select> must be an array if `multiple` is true.%s",a,r(o)):void 0:!t.multiple&&s&&("production"!==n.env.NODE_ENV?d(!1,"The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s",a,r(o)):void 0)}}}function a(e,t,n){var o,r,i=l.getNodeFromInstance(e).options;if(t){for(o={},r=0;r<n.length;r++)o[""+n[r]]=!0;for(r=0;r<i.length;r++){var a=o.hasOwnProperty(i[r].value);i[r].selected!==a&&(i[r].selected=a)}}else{for(o=""+n,r=0;r<i.length;r++)if(i[r].value===o)return void(i[r].selected=!0);i.length&&(i[0].selected=!0)}}function s(e){var t=this._currentElement.props,n=u.executeOnChange(t,e);return this._rootNodeID&&(this._wrapperState.pendingUpdate=!0),p.asap(o,this),n}var c=e("object-assign"),u=e("./LinkedValueUtils"),l=e("./ReactDOMComponentTree"),p=e("./ReactUpdates"),d=e("fbjs/lib/warning"),f=!1,v=!1,h=["value","defaultValue"],m={getHostProps:function(e,t){return c({},t,{onChange:e._wrapperState.onChange,value:void 0})},mountWrapper:function(e,t){"production"!==n.env.NODE_ENV&&i(e,t);var o=u.getValue(t);e._wrapperState={pendingUpdate:!1,initialValue:null!=o?o:t.defaultValue,listeners:null,onChange:s.bind(e),wasMultiple:Boolean(t.multiple)},void 0===t.value||void 0===t.defaultValue||v||("production"!==n.env.NODE_ENV?d(!1,"Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://fb.me/react-controlled-components"):void 0,v=!0)},getSelectValueContext:function(e){return e._wrapperState.initialValue},postUpdateWrapper:function(e){var t=e._currentElement.props;e._wrapperState.initialValue=void 0;var n=e._wrapperState.wasMultiple;e._wrapperState.wasMultiple=Boolean(t.multiple);var o=u.getValue(t);null!=o?(e._wrapperState.pendingUpdate=!1,a(e,Boolean(t.multiple),o)):n!==Boolean(t.multiple)&&(null!=t.defaultValue?a(e,Boolean(t.multiple),t.defaultValue):a(e,Boolean(t.multiple),t.multiple?[]:""))}};t.exports=m}).call(this,e("rH1JPG"))},{"./LinkedValueUtils":53,"./ReactDOMComponentTree":63,"./ReactUpdates":107,"fbjs/lib/warning":27,"object-assign":28,rH1JPG:29}],73:[function(e,t,n){function o(e,t,n,o){return e===n&&t===o}function r(e){var t=document.selection,n=t.createRange(),o=n.text.length,r=n.duplicate();r.moveToElementText(e),r.setEndPoint("EndToStart",n);var i=r.text.length,a=i+o;return{start:i,end:a}}function i(e){var t=window.getSelection&&window.getSelection();if(!t||0===t.rangeCount)return null;var n=t.anchorNode,r=t.anchorOffset,i=t.focusNode,a=t.focusOffset,s=t.getRangeAt(0);try{s.startContainer.nodeType,s.endContainer.nodeType}catch(e){return null}var c=o(t.anchorNode,t.anchorOffset,t.focusNode,t.focusOffset),u=c?0:s.toString().length,l=s.cloneRange();l.selectNodeContents(e),l.setEnd(s.startContainer,s.startOffset);var p=o(l.startContainer,l.startOffset,l.endContainer,l.endOffset),d=p?0:l.toString().length,f=d+u,v=document.createRange();v.setStart(n,r),v.setEnd(i,a);var h=v.collapsed;return{start:h?f:d,end:h?d:f}}function a(e,t){var n,o,r=document.selection.createRange().duplicate();void 0===t.end?(n=t.start,o=n):t.start>t.end?(n=t.end,o=t.start):(n=t.start,o=t.end),r.moveToElementText(e),r.moveStart("character",n),r.setEndPoint("EndToStart",r),r.moveEnd("character",o-n),r.select()}function s(e,t){if(window.getSelection){var n=window.getSelection(),o=e[l()].length,r=Math.min(t.start,o),i=void 0===t.end?r:Math.min(t.end,o);if(!n.extend&&r>i){var a=i;i=r,r=a}var s=u(e,r),c=u(e,i);if(s&&c){var p=document.createRange();p.setStart(s.node,s.offset),n.removeAllRanges(),r>i?(n.addRange(p),n.extend(c.node,c.offset)):(p.setEnd(c.node,c.offset),n.addRange(p))}}}var c=e("fbjs/lib/ExecutionEnvironment"),u=e("./getNodeForCharacterOffset"),l=e("./getTextContentAccessor"),p=c.canUseDOM&&"selection"in document&&!("getSelection"in window),d={getOffsets:p?r:i,setOffsets:p?a:s};t.exports=d},{"./getNodeForCharacterOffset":143,"./getTextContentAccessor":144,"fbjs/lib/ExecutionEnvironment":6}],74:[function(e,t,n){(function(n){var o=e("./reactProdInvariant"),r=e("object-assign"),i=e("./DOMChildrenOperations"),a=e("./DOMLazyTree"),s=e("./ReactDOMComponentTree"),c=e("./escapeTextContentForBrowser"),u=e("fbjs/lib/invariant"),l=e("./validateDOMNesting"),p=function(e){this._currentElement=e,this._stringText=""+e,this._hostNode=null,this._hostParent=null,this._domID=0,this._mountIndex=0,this._closingComment=null,this._commentNodes=null};r(p.prototype,{mountComponent:function(e,t,o,r){if("production"!==n.env.NODE_ENV){var i;null!=t?i=t._ancestorInfo:null!=o&&(i=o._ancestorInfo),i&&l(null,this._stringText,this,i)}var u=o._idCounter++,p=" react-text: "+u+" ",d=" /react-text ";if(this._domID=u,this._hostParent=t,e.useCreateElement){var f=o._ownerDocument,v=f.createComment(p),h=f.createComment(d),m=a(f.createDocumentFragment());return a.queueChild(m,a(v)),this._stringText&&a.queueChild(m,a(f.createTextNode(this._stringText))),a.queueChild(m,a(h)),s.precacheNode(this,v),this._closingComment=h,m}var g=c(this._stringText);return e.renderToStaticMarkup?g:"<!--"+p+"-->"+g+"<!--"+d+"-->"},receiveComponent:function(e,t){if(e!==this._currentElement){this._currentElement=e;var n=""+e;if(n!==this._stringText){this._stringText=n;var o=this.getHostNode();i.replaceDelimitedText(o[0],o[1],n)}}},getHostNode:function(){var e=this._commentNodes;if(e)return e;if(!this._closingComment)for(var t=s.getNodeFromInstance(this),r=t.nextSibling;;){if(null==r?"production"!==n.env.NODE_ENV?u(!1,"Missing closing comment for text component %s",this._domID):o("67",this._domID):void 0,8===r.nodeType&&" /react-text "===r.nodeValue){this._closingComment=r;break}r=r.nextSibling}return e=[this._hostNode,this._closingComment],this._commentNodes=e,e},unmountComponent:function(){this._closingComment=null,this._commentNodes=null,s.uncacheNode(this)}}),t.exports=p}).call(this,e("rH1JPG"))},{"./DOMChildrenOperations":38,"./DOMLazyTree":39,"./ReactDOMComponentTree":63,"./escapeTextContentForBrowser":132,"./reactProdInvariant":150,"./validateDOMNesting":156,"fbjs/lib/invariant":20,"object-assign":28,rH1JPG:29}],75:[function(e,t,n){(function(n){function o(){this._rootNodeID&&v.updateWrapper(this)}function r(e){var t=this._currentElement.props,n=s.executeOnChange(t,e);return u.asap(o,this),n}var i=e("./reactProdInvariant"),a=e("object-assign"),s=e("./LinkedValueUtils"),c=e("./ReactDOMComponentTree"),u=e("./ReactUpdates"),l=e("fbjs/lib/invariant"),p=e("fbjs/lib/warning"),d=!1,f=!1,v={getHostProps:function(e,t){null!=t.dangerouslySetInnerHTML?"production"!==n.env.NODE_ENV?l(!1,"`dangerouslySetInnerHTML` does not make sense on <textarea>."):i("91"):void 0;var o=a({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue,onChange:e._wrapperState.onChange});return o},mountWrapper:function(e,t){"production"!==n.env.NODE_ENV&&(s.checkPropTypes("textarea",t,e._currentElement._owner),void 0===t.valueLink||d||("production"!==n.env.NODE_ENV?p(!1,"`valueLink` prop on `textarea` is deprecated; set `value` and `onChange` instead."):void 0,d=!0),void 0===t.value||void 0===t.defaultValue||f||("production"!==n.env.NODE_ENV?p(!1,"Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://fb.me/react-controlled-components"):void 0,f=!0));var o=s.getValue(t),a=o;if(null==o){var c=t.defaultValue,u=t.children;null!=u&&("production"!==n.env.NODE_ENV&&("production"!==n.env.NODE_ENV?p(!1,"Use the `defaultValue` or `value` props instead of setting children on <textarea>."):void 0),null!=c?"production"!==n.env.NODE_ENV?l(!1,"If you supply `defaultValue` on a <textarea>, do not pass children."):i("92"):void 0,Array.isArray(u)&&(u.length<=1?void 0:"production"!==n.env.NODE_ENV?l(!1,"<textarea> can only have at most one child."):i("93"),u=u[0]),c=""+u),null==c&&(c=""),a=c}e._wrapperState={initialValue:""+a,listeners:null,onChange:r.bind(e)}},updateWrapper:function(e){var t=e._currentElement.props,n=c.getNodeFromInstance(e),o=s.getValue(t);if(null!=o){var r=""+o;r!==n.value&&(n.value=r),null==t.defaultValue&&(n.defaultValue=r)}null!=t.defaultValue&&(n.defaultValue=t.defaultValue)},postMountWrapper:function(e){var t=c.getNodeFromInstance(e);t.value=t.textContent}};t.exports=v}).call(this,e("rH1JPG"))},{"./LinkedValueUtils":53,"./ReactDOMComponentTree":63,"./ReactUpdates":107,"./reactProdInvariant":150,"fbjs/lib/invariant":20,"fbjs/lib/warning":27,"object-assign":28,rH1JPG:29}],76:[function(e,t,n){(function(n){function o(e,t){"_hostNode"in e?void 0:"production"!==n.env.NODE_ENV?u(!1,"getNodeFromInstance: Invalid argument."):c("33"),"_hostNode"in t?void 0:"production"!==n.env.NODE_ENV?u(!1,"getNodeFromInstance: Invalid argument."):c("33");for(var o=0,r=e;r;r=r._hostParent)o++;for(var i=0,a=t;a;a=a._hostParent)i++;for(;o-i>0;)e=e._hostParent,o--;for(;i-o>0;)t=t._hostParent,i--;for(var s=o;s--;){if(e===t)return e;e=e._hostParent,t=t._hostParent}return null}function r(e,t){"_hostNode"in e?void 0:"production"!==n.env.NODE_ENV?u(!1,"isAncestor: Invalid argument."):c("35"),"_hostNode"in t?void 0:"production"!==n.env.NODE_ENV?u(!1,"isAncestor: Invalid argument."):c("35");for(;t;){if(t===e)return!0;t=t._hostParent}return!1}function i(e){return"_hostNode"in e?void 0:"production"!==n.env.NODE_ENV?u(!1,"getParentInstance: Invalid argument."):c("36"),e._hostParent}function a(e,t,n){for(var o=[];e;)o.push(e),e=e._hostParent;var r;for(r=o.length;r-- >0;)t(o[r],"captured",n);for(r=0;r<o.length;r++)t(o[r],"bubbled",n)}function s(e,t,n,r,i){for(var a=e&&t?o(e,t):null,s=[];e&&e!==a;)s.push(e),e=e._hostParent;for(var c=[];t&&t!==a;)c.push(t),t=t._hostParent;var u;for(u=0;u<s.length;u++)n(s[u],"bubbled",r);for(u=c.length;u-- >0;)n(c[u],"captured",i)}var c=e("./reactProdInvariant"),u=e("fbjs/lib/invariant");t.exports={isAncestor:r,getLowestCommonAncestor:o,getParentInstance:i,traverseTwoPhase:a,traverseEnterLeave:s}}).call(this,e("rH1JPG"))},{"./reactProdInvariant":150,"fbjs/lib/invariant":20,rH1JPG:29}],77:[function(e,t,n){(function(n){function o(e,t){null!=t&&"string"==typeof t.type&&(t.type.indexOf("-")>=0||t.props.is||p(e,t))}var r=e("./DOMProperty"),i=e("./EventPluginRegistry"),a=e("react/lib/ReactComponentTreeHook"),s=e("fbjs/lib/warning");if("production"!==n.env.NODE_ENV)var c={children:!0,dangerouslySetInnerHTML:!0,key:!0,ref:!0,autoFocus:!0,defaultValue:!0,valueLink:!0,defaultChecked:!0,checkedLink:!0,innerHTML:!0,suppressContentEditableWarning:!0,onFocusIn:!0,onFocusOut:!0},u={},l=function(e,t,o){if(r.properties.hasOwnProperty(t)||r.isCustomAttribute(t))return!0;if(c.hasOwnProperty(t)&&c[t]||u.hasOwnProperty(t)&&u[t])return!0;if(i.registrationNameModules.hasOwnProperty(t))return!0;u[t]=!0;var l=t.toLowerCase(),p=r.isCustomAttribute(l)?l:r.getPossibleStandardName.hasOwnProperty(l)?r.getPossibleStandardName[l]:null,d=i.possibleRegistrationNames.hasOwnProperty(l)?i.possibleRegistrationNames[l]:null;return null!=p?("production"!==n.env.NODE_ENV?s(!1,"Unknown DOM property %s. Did you mean %s?%s",t,p,a.getStackAddendumByID(o)):void 0,!0):null!=d&&("production"!==n.env.NODE_ENV?s(!1,"Unknown event handler property %s. Did you mean `%s`?%s",t,d,a.getStackAddendumByID(o)):void 0,!0)};var p=function(e,t){var o=[];for(var r in t.props){var i=l(t.type,r,e);i||o.push(r)}var c=o.map(function(e){return"`"+e+"`"}).join(", ");1===o.length?"production"!==n.env.NODE_ENV?s(!1,"Unknown prop %s on <%s> tag. Remove this prop from the element. For details, see https://fb.me/react-unknown-prop%s",c,t.type,a.getStackAddendumByID(e)):void 0:o.length>1&&("production"!==n.env.NODE_ENV?s(!1,"Unknown props %s on <%s> tag. Remove these props from the element. For details, see https://fb.me/react-unknown-prop%s",c,t.type,a.getStackAddendumByID(e)):void 0)},d={onBeforeMountComponent:function(e,t){o(e,t)},onBeforeUpdateComponent:function(e,t){o(e,t)}};t.exports=d}).call(this,e("rH1JPG"))},{"./DOMProperty":41,"./EventPluginRegistry":47,"fbjs/lib/warning":27,rH1JPG:29,"react/lib/ReactComponentTreeHook":164}],78:[function(e,t,n){(function(n){function o(e,t,o,r,i,a,s,c){try{t.call(o,r,i,a,s,c)}catch(t){"production"!==n.env.NODE_ENV?_(C[e],"Exception thrown by hook while handling %s: %s",e,t+"\n"+t.stack):void 0,C[e]=!0}}function r(e,t,n,r,i,a){for(var s=0;s<N.length;s++){var c=N[s],u=c[e];u&&o(e,u,c,t,n,r,i,a)}}function i(){y.purgeUnmountedComponents(),g.clearHistory()}function a(e){return e.reduce(function(e,t){var n=y.getOwnerID(t),o=y.getParentID(t);return e[t]={displayName:y.getDisplayName(t),text:y.getText(t),updateCount:y.getUpdateCount(t),childIDs:y.getChildIDs(t),ownerID:n||o&&y.getOwnerID(o)||0,parentID:o},e},{})}function s(){var e=T,t=P,n=g.getHistory();if(0===R)return T=0,P=[],void i();if(t.length||n.length){var o=y.getRegisteredIDs();D.push({duration:E()-e,measurements:t||[],operations:n||[],treeSnapshot:a(o)})}i(),T=E(),P=[]}function c(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];t&&0===e||e||("production"!==n.env.NODE_ENV?_(!1,"ReactDebugTool: debugID may not be empty."):void 0)}function u(e,t){0!==R&&(M&&!S&&("production"!==n.env.NODE_ENV?_(!1,"There is an internal error in the React performance measurement code. Did not expect %s timer to start while %s timer is still in progress for %s instance.",t,M||"no",e===I?"the same":"another"):void 0,S=!0),x=E(),k=0,I=e,M=t)}function l(e,t){0!==R&&(M===t||S||("production"!==n.env.NODE_ENV?_(!1,"There is an internal error in the React performance measurement code. We did not expect %s timer to stop while %s timer is still in progress for %s instance. Please report this as a bug in React.",t,M||"no",e===I?"the same":"another"):void 0,S=!0),O&&P.push({timerType:t,instanceID:e,duration:E()-x-k}),x=0,k=0,I=null,M=null)}function p(){var e={startTime:x,nestedFlushStartTime:E(),debugID:I,timerType:M};w.push(e),x=0,k=0,I=null,M=null}function d(){var e=w.pop(),t=e.startTime,n=e.nestedFlushStartTime,o=e.debugID,r=e.timerType,i=E()-n;x=t,k+=i,I=o,M=r}function f(e){if(!O||!j)return!1;var t=y.getElement(e);if(null==t||"object"!==("undefined"==typeof t?"undefined":_typeof(t)))return!1;var n="string"==typeof t.type;return!n}function v(e,t){if(f(e)){var n=e+"::"+t;V=E(),performance.mark(n)}}function h(e,t){if(f(e)){var n=e+"::"+t,o=y.getDisplayName(e)||"Unknown",r=E();if(r-V>.1){var i=o+" ["+t+"]";performance.measure(i,n)}performance.clearMarks(n),performance.clearMeasures(i)}}var m=e("./ReactInvalidSetStateWarningHook"),g=e("./ReactHostOperationHistoryHook"),y=e("react/lib/ReactComponentTreeHook"),b=e("fbjs/lib/ExecutionEnvironment"),E=e("fbjs/lib/performanceNow"),_=e("fbjs/lib/warning"),N=[],C={},O=!1,D=[],w=[],R=0,P=[],T=0,I=null,x=0,k=0,M=null,S=!1,V=0,j="undefined"!=typeof performance&&"function"==typeof performance.mark&&"function"==typeof performance.clearMarks&&"function"==typeof performance.measure&&"function"==typeof performance.clearMeasures,A={addHook:function(e){N.push(e)},removeHook:function(e){for(var t=0;t<N.length;t++)N[t]===e&&(N.splice(t,1),t--)},isProfiling:function(){return O},beginProfiling:function(){O||(O=!0,D.length=0,s(),A.addHook(g))},endProfiling:function(){O&&(O=!1,s(),A.removeHook(g))},getFlushHistory:function(){return D},onBeginFlush:function(){R++,s(),p(),r("onBeginFlush")},onEndFlush:function(){s(),R--,d(),r("onEndFlush")},onBeginLifeCycleTimer:function(e,t){c(e),r("onBeginLifeCycleTimer",e,t),v(e,t),u(e,t)},onEndLifeCycleTimer:function(e,t){c(e),l(e,t),h(e,t),r("onEndLifeCycleTimer",e,t)},onBeginProcessingChildContext:function(){r("onBeginProcessingChildContext")},onEndProcessingChildContext:function(){r("onEndProcessingChildContext")},onHostOperation:function(e){c(e.instanceID),r("onHostOperation",e)},onSetState:function(){r("onSetState")},onSetChildren:function(e,t){c(e),t.forEach(c),r("onSetChildren",e,t)},onBeforeMountComponent:function(e,t,n){c(e),c(n,!0),r("onBeforeMountComponent",e,t,n),v(e,"mount")},onMountComponent:function(e){c(e),h(e,"mount"),r("onMountComponent",e)},onBeforeUpdateComponent:function(e,t){c(e),r("onBeforeUpdateComponent",e,t),v(e,"update")},onUpdateComponent:function(e){c(e),h(e,"update"),r("onUpdateComponent",e)},onBeforeUnmountComponent:function(e){c(e),r("onBeforeUnmountComponent",e),v(e,"unmount")},onUnmountComponent:function(e){c(e),h(e,"unmount"),r("onUnmountComponent",e)},onTestEvent:function(){r("onTestEvent")}};A.addDevtool=A.addHook,A.removeDevtool=A.removeHook,A.addHook(m),A.addHook(y);var U=b.canUseDOM&&window.location.href||"";/[?&]react_perf\b/.test(U)&&A.beginProfiling(),t.exports=A}).call(this,e("rH1JPG"))},{"./ReactHostOperationHistoryHook":88,"./ReactInvalidSetStateWarningHook":93,"fbjs/lib/ExecutionEnvironment":6,"fbjs/lib/performanceNow":25,"fbjs/lib/warning":27,
rH1JPG:29,"react/lib/ReactComponentTreeHook":164}],79:[function(e,t,n){function o(){this.reinitializeTransaction()}var r=e("object-assign"),i=e("./ReactUpdates"),a=e("./Transaction"),s=e("fbjs/lib/emptyFunction"),c={initialize:s,close:function(){d.isBatchingUpdates=!1}},u={initialize:s,close:i.flushBatchedUpdates.bind(i)},l=[u,c];r(o.prototype,a,{getTransactionWrappers:function(){return l}});var p=new o,d={isBatchingUpdates:!1,batchedUpdates:function(e,t,n,o,r,i){var a=d.isBatchingUpdates;return d.isBatchingUpdates=!0,a?e(t,n,o,r,i):p.perform(e,null,t,n,o,r,i)}};t.exports=d},{"./ReactUpdates":107,"./Transaction":125,"fbjs/lib/emptyFunction":12,"object-assign":28}],80:[function(e,t,n){function o(){C||(C=!0,y.EventEmitter.injectReactEventListener(g),y.EventPluginHub.injectEventPluginOrder(s),y.EventPluginUtils.injectComponentTree(d),y.EventPluginUtils.injectTreeTraversal(v),y.EventPluginHub.injectEventPluginsByName({SimpleEventPlugin:N,EnterLeaveEventPlugin:c,ChangeEventPlugin:a,SelectEventPlugin:_,BeforeInputEventPlugin:i}),y.HostComponent.injectGenericComponentClass(p),y.HostComponent.injectTextComponentClass(h),y.DOMProperty.injectDOMPropertyConfig(r),y.DOMProperty.injectDOMPropertyConfig(u),y.DOMProperty.injectDOMPropertyConfig(E),y.EmptyComponent.injectEmptyComponentFactory(function(e){return new f(e)}),y.Updates.injectReconcileTransaction(b),y.Updates.injectBatchingStrategy(m),y.Component.injectEnvironment(l))}var r=e("./ARIADOMPropertyConfig"),i=e("./BeforeInputEventPlugin"),a=e("./ChangeEventPlugin"),s=e("./DefaultEventPluginOrder"),c=e("./EnterLeaveEventPlugin"),u=e("./HTMLDOMPropertyConfig"),l=e("./ReactComponentBrowserEnvironment"),p=e("./ReactDOMComponent"),d=e("./ReactDOMComponentTree"),f=e("./ReactDOMEmptyComponent"),v=e("./ReactDOMTreeTraversal"),h=e("./ReactDOMTextComponent"),m=e("./ReactDefaultBatchingStrategy"),g=e("./ReactEventListener"),y=e("./ReactInjection"),b=e("./ReactReconcileTransaction"),E=e("./SVGDOMPropertyConfig"),_=e("./SelectEventPlugin"),N=e("./SimpleEventPlugin"),C=!1;t.exports={inject:o}},{"./ARIADOMPropertyConfig":31,"./BeforeInputEventPlugin":33,"./ChangeEventPlugin":37,"./DefaultEventPluginOrder":44,"./EnterLeaveEventPlugin":45,"./HTMLDOMPropertyConfig":51,"./ReactComponentBrowserEnvironment":57,"./ReactDOMComponent":61,"./ReactDOMComponentTree":63,"./ReactDOMEmptyComponent":65,"./ReactDOMTextComponent":74,"./ReactDOMTreeTraversal":76,"./ReactDefaultBatchingStrategy":79,"./ReactEventListener":85,"./ReactInjection":89,"./ReactReconcileTransaction":101,"./SVGDOMPropertyConfig":109,"./SelectEventPlugin":110,"./SimpleEventPlugin":111}],81:[function(e,t,n){var o="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;t.exports=o},{}],82:[function(e,t,n){var o,r={injectEmptyComponentFactory:function(e){o=e}},i={create:function(e){return o(e)}};i.injection=r,t.exports=i},{}],83:[function(e,t,n){(function(e){function n(e,t,n){try{t(n)}catch(e){null===o&&(o=e)}}var o=null,r={invokeGuardedCallback:n,invokeGuardedCallbackWithCatch:n,rethrowCaughtError:function(){if(o){var e=o;throw o=null,e}}};if("production"!==e.env.NODE_ENV&&"undefined"!=typeof window&&"function"==typeof window.dispatchEvent&&"undefined"!=typeof document&&"function"==typeof document.createEvent){var i=document.createElement("react");r.invokeGuardedCallback=function(e,t,n){var o=t.bind(null,n),r="react-"+e;i.addEventListener(r,o,!1);var a=document.createEvent("Event");a.initEvent(r,!1,!1),i.dispatchEvent(a),i.removeEventListener(r,o,!1)}}t.exports=r}).call(this,e("rH1JPG"))},{rH1JPG:29}],84:[function(e,t,n){function o(e){r.enqueueEvents(e),r.processEventQueue(!1)}var r=e("./EventPluginHub"),i={handleTopLevel:function(e,t,n,i){var a=r.extractEvents(e,t,n,i);o(a)}};t.exports=i},{"./EventPluginHub":46}],85:[function(e,t,n){function o(e){for(;e._hostParent;)e=e._hostParent;var t=p.getNodeFromInstance(e),n=t.parentNode;return p.getClosestInstanceFromNode(n)}function r(e,t){this.topLevelType=e,this.nativeEvent=t,this.ancestors=[]}function i(e){var t=f(e.nativeEvent),n=p.getClosestInstanceFromNode(t),r=n;do e.ancestors.push(r),r=r&&o(r);while(r);for(var i=0;i<e.ancestors.length;i++)n=e.ancestors[i],h._handleTopLevel(e.topLevelType,n,e.nativeEvent,f(e.nativeEvent))}function a(e){var t=v(window);e(t)}var s=e("object-assign"),c=e("fbjs/lib/EventListener"),u=e("fbjs/lib/ExecutionEnvironment"),l=e("./PooledClass"),p=e("./ReactDOMComponentTree"),d=e("./ReactUpdates"),f=e("./getEventTarget"),v=e("fbjs/lib/getUnboundedScrollPosition");s(r.prototype,{destructor:function(){this.topLevelType=null,this.nativeEvent=null,this.ancestors.length=0}}),l.addPoolingTo(r,l.twoArgumentPooler);var h={_enabled:!0,_handleTopLevel:null,WINDOW_HANDLE:u.canUseDOM?window:null,setHandleTopLevel:function(e){h._handleTopLevel=e},setEnabled:function(e){h._enabled=!!e},isEnabled:function(){return h._enabled},trapBubbledEvent:function(e,t,n){return n?c.listen(n,t,h.dispatchEvent.bind(null,e)):null},trapCapturedEvent:function(e,t,n){return n?c.capture(n,t,h.dispatchEvent.bind(null,e)):null},monitorScrollValue:function(e){var t=a.bind(null,e);c.listen(window,"scroll",t)},dispatchEvent:function(e,t){if(h._enabled){var n=r.getPooled(e,t);try{d.batchedUpdates(i,n)}finally{r.release(n)}}}};t.exports=h},{"./PooledClass":54,"./ReactDOMComponentTree":63,"./ReactUpdates":107,"./getEventTarget":139,"fbjs/lib/EventListener":5,"fbjs/lib/ExecutionEnvironment":6,"fbjs/lib/getUnboundedScrollPosition":17,"object-assign":28}],86:[function(e,t,n){var o={logTopLevelRenders:!1};t.exports=o},{}],87:[function(e,t,n){(function(n){function o(e){return u?void 0:"production"!==n.env.NODE_ENV?c(!1,"There is no registered component for the tag %s",e.type):a("111",e.type),new u(e)}function r(e){return new p(e)}function i(e){return e instanceof p}var a=e("./reactProdInvariant"),s=e("object-assign"),c=e("fbjs/lib/invariant"),u=null,l={},p=null,d={injectGenericComponentClass:function(e){u=e},injectTextComponentClass:function(e){p=e},injectComponentClasses:function(e){s(l,e)}},f={createInternalComponent:o,createInstanceForText:r,isTextComponent:i,injection:d};t.exports=f}).call(this,e("rH1JPG"))},{"./reactProdInvariant":150,"fbjs/lib/invariant":20,"object-assign":28,rH1JPG:29}],88:[function(e,t,n){var o=[],r={onHostOperation:function(e){o.push(e)},clearHistory:function(){r._preventClearing||(o=[])},getHistory:function(){return o}};t.exports=r},{}],89:[function(e,t,n){var o=e("./DOMProperty"),r=e("./EventPluginHub"),i=e("./EventPluginUtils"),a=e("./ReactComponentEnvironment"),s=e("./ReactEmptyComponent"),c=e("./ReactBrowserEventEmitter"),u=e("./ReactHostComponent"),l=e("./ReactUpdates"),p={Component:a.injection,DOMProperty:o.injection,EmptyComponent:s.injection,EventPluginHub:r.injection,EventPluginUtils:i.injection,EventEmitter:c.injection,HostComponent:u.injection,Updates:l.injection};t.exports=p},{"./DOMProperty":41,"./EventPluginHub":46,"./EventPluginUtils":48,"./ReactBrowserEventEmitter":55,"./ReactComponentEnvironment":58,"./ReactEmptyComponent":82,"./ReactHostComponent":87,"./ReactUpdates":107}],90:[function(e,t,n){function o(e){return i(document.documentElement,e)}var r=e("./ReactDOMSelection"),i=e("fbjs/lib/containsNode"),a=e("fbjs/lib/focusNode"),s=e("fbjs/lib/getActiveElement"),c={hasSelectionCapabilities:function(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&("input"===t&&"text"===e.type||"textarea"===t||"true"===e.contentEditable)},getSelectionInformation:function(){var e=s();return{focusedElem:e,selectionRange:c.hasSelectionCapabilities(e)?c.getSelection(e):null}},restoreSelection:function(e){var t=s(),n=e.focusedElem,r=e.selectionRange;t!==n&&o(n)&&(c.hasSelectionCapabilities(n)&&c.setSelection(n,r),a(n))},getSelection:function(e){var t;if("selectionStart"in e)t={start:e.selectionStart,end:e.selectionEnd};else if(document.selection&&e.nodeName&&"input"===e.nodeName.toLowerCase()){var n=document.selection.createRange();n.parentElement()===e&&(t={start:-n.moveStart("character",-e.value.length),end:-n.moveEnd("character",-e.value.length)})}else t=r.getOffsets(e);return t||{start:0,end:0}},setSelection:function(e,t){var n=t.start,o=t.end;if(void 0===o&&(o=n),"selectionStart"in e)e.selectionStart=n,e.selectionEnd=Math.min(o,e.value.length);else if(document.selection&&e.nodeName&&"input"===e.nodeName.toLowerCase()){var i=e.createTextRange();i.collapse(!0),i.moveStart("character",n),i.moveEnd("character",o-n),i.select()}else r.setOffsets(e,t)}};t.exports=c},{"./ReactDOMSelection":73,"fbjs/lib/containsNode":9,"fbjs/lib/focusNode":14,"fbjs/lib/getActiveElement":15}],91:[function(e,t,n){var o={remove:function(e){e._reactInternalInstance=void 0},get:function(e){return e._reactInternalInstance},has:function(e){return void 0!==e._reactInternalInstance},set:function(e,t){e._reactInternalInstance=t}};t.exports=o},{}],92:[function(e,t,n){(function(n){var o=null;if("production"!==n.env.NODE_ENV){var r=e("./ReactDebugTool");o=r}t.exports={debugTool:o}}).call(this,e("rH1JPG"))},{"./ReactDebugTool":78,rH1JPG:29}],93:[function(e,t,n){(function(n){var o=e("fbjs/lib/warning");if("production"!==n.env.NODE_ENV)var r=!1,i=function(){"production"!==n.env.NODE_ENV?o(!r,"setState(...): Cannot call setState() inside getChildContext()"):void 0};var a={onBeginProcessingChildContext:function(){r=!0},onEndProcessingChildContext:function(){r=!1},onSetState:function(){i()}};t.exports=a}).call(this,e("rH1JPG"))},{"fbjs/lib/warning":27,rH1JPG:29}],94:[function(e,t,n){var o=e("./adler32"),r=/\/?>/,i=/^<\!\-\-/,a={CHECKSUM_ATTR_NAME:"data-react-checksum",addChecksumToMarkup:function(e){var t=o(e);return i.test(e)?e:e.replace(r," "+a.CHECKSUM_ATTR_NAME+'="'+t+'"$&')},canReuseMarkup:function(e,t){var n=t.getAttribute(a.CHECKSUM_ATTR_NAME);n=n&&parseInt(n,10);var r=o(e);return r===n}};t.exports=a},{"./adler32":128}],95:[function(e,t,n){(function(n){function o(e,t){for(var n=Math.min(e.length,t.length),o=0;o<n;o++)if(e.charAt(o)!==t.charAt(o))return o;return e.length===t.length?-1:n}function r(e){return e?e.nodeType===F?e.documentElement:e.firstChild:null}function i(e){return e.getAttribute&&e.getAttribute(A)||""}function a(e,t,n,o,r){var i;if(O.logTopLevelRenders){var a=e._currentElement.props.child,s=a.type;i="React mount: "+("string"==typeof s?s:s.displayName||s.name),console.time(i)}var c=P.mountComponent(e,n,null,N(e,t),r,0);i&&console.timeEnd(i),e._renderedComponent._topLevelWrapper=e,J._mountImageIntoNode(c,t,e,o,n)}function s(e,t,n,o){var r=I.ReactReconcileTransaction.getPooled(!n&&C.useCreateElement);r.perform(a,null,e,t,r,n,o),I.ReactReconcileTransaction.release(r)}function c(e,t,o){for("production"!==n.env.NODE_ENV&&w.debugTool.onBeginFlush(),P.unmountComponent(e,o),"production"!==n.env.NODE_ENV&&w.debugTool.onEndFlush(),t.nodeType===F&&(t=t.documentElement);t.lastChild;)t.removeChild(t.lastChild)}function u(e){var t=r(e);if(t){var n=_.getInstanceFromNode(t);return!(!n||!n._hostParent)}}function l(e){var t=r(e);return!(!t||!d(t)||_.getInstanceFromNode(t))}function p(e){return!(!e||e.nodeType!==H&&e.nodeType!==F&&e.nodeType!==L)}function d(e){return p(e)&&(e.hasAttribute(U)||e.hasAttribute(A))}function f(e){var t=r(e),n=t&&_.getInstanceFromNode(t);return n&&!n._hostParent?n:null}function v(e){var t=f(e);return t?t._hostContainerInfo._topLevelWrapper:null}var h=e("./reactProdInvariant"),m=e("./DOMLazyTree"),g=e("./DOMProperty"),y=e("react/lib/React"),b=e("./ReactBrowserEventEmitter"),E=e("react/lib/ReactCurrentOwner"),_=e("./ReactDOMComponentTree"),N=e("./ReactDOMContainerInfo"),C=e("./ReactDOMFeatureFlags"),O=e("./ReactFeatureFlags"),D=e("./ReactInstanceMap"),w=e("./ReactInstrumentation"),R=e("./ReactMarkupChecksum"),P=e("./ReactReconciler"),T=e("./ReactUpdateQueue"),I=e("./ReactUpdates"),x=e("fbjs/lib/emptyObject"),k=e("./instantiateReactComponent"),M=e("fbjs/lib/invariant"),S=e("./setInnerHTML"),V=e("./shouldUpdateReactComponent"),j=e("fbjs/lib/warning"),A=g.ID_ATTRIBUTE_NAME,U=g.ROOT_ATTRIBUTE_NAME,H=1,F=9,L=11,B={},G=1,W=function(){this.rootID=G++};W.prototype.isReactComponent={},"production"!==n.env.NODE_ENV&&(W.displayName="TopLevelWrapper"),W.prototype.render=function(){return this.props.child},W.isReactTopLevelWrapper=!0;var J={TopLevelWrapper:W,_instancesByReactRootID:B,scrollMonitor:function(e,t){t()},_updateRootComponent:function(e,t,n,o,r){return J.scrollMonitor(o,function(){T.enqueueElementInternal(e,t,n),r&&T.enqueueCallbackInternal(e,r)}),e},_renderNewRootComponent:function(e,t,o,r){"production"!==n.env.NODE_ENV?j(null==E.current,"_renderNewRootComponent(): Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate. Check the render method of %s.",E.current&&E.current.getName()||"ReactCompositeComponent"):void 0,p(t)?void 0:"production"!==n.env.NODE_ENV?M(!1,"_registerComponent(...): Target container is not a DOM element."):h("37"),b.ensureScrollValueMonitoring();var i=k(e,!1);I.batchedUpdates(s,i,t,o,r);var a=i._instance.rootID;return B[a]=i,i},renderSubtreeIntoContainer:function(e,t,o,r){return null!=e&&D.has(e)?void 0:"production"!==n.env.NODE_ENV?M(!1,"parentComponent must be a valid React Component"):h("38"),J._renderSubtreeIntoContainer(e,t,o,r)},_renderSubtreeIntoContainer:function(e,t,o,a){T.validateCallback(a,"ReactDOM.render"),y.isValidElement(t)?void 0:"production"!==n.env.NODE_ENV?M(!1,"ReactDOM.render(): Invalid component element.%s","string"==typeof t?" Instead of passing a string like 'div', pass React.createElement('div') or <div />.":"function"==typeof t?" Instead of passing a class like Foo, pass React.createElement(Foo) or <Foo />.":null!=t&&void 0!==t.props?" This may be caused by unintentionally loading two independent copies of React.":""):h("39","string"==typeof t?" Instead of passing a string like 'div', pass React.createElement('div') or <div />.":"function"==typeof t?" Instead of passing a class like Foo, pass React.createElement(Foo) or <Foo />.":null!=t&&void 0!==t.props?" This may be caused by unintentionally loading two independent copies of React.":""),"production"!==n.env.NODE_ENV?j(!o||!o.tagName||"BODY"!==o.tagName.toUpperCase(),"render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app."):void 0;var s,c=y.createElement(W,{child:t});if(e){var l=D.get(e);s=l._processChildContext(l._context)}else s=x;var p=v(o);if(p){var d=p._currentElement,f=d.props.child;if(V(f,t)){var m=p._renderedComponent.getPublicInstance(),g=a&&function(){a.call(m)};return J._updateRootComponent(p,c,s,o,g),m}J.unmountComponentAtNode(o)}var b=r(o),E=b&&!!i(b),_=u(o);if("production"!==n.env.NODE_ENV&&("production"!==n.env.NODE_ENV?j(!_,"render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."):void 0,!E||b.nextSibling))for(var N=b;N;){if(i(N)){"production"!==n.env.NODE_ENV?j(!1,"render(): Target node has markup rendered by React, but there are unrelated nodes as well. This is most commonly caused by white-space inserted around server-rendered markup."):void 0;break}N=N.nextSibling}var C=E&&!p&&!_,O=J._renderNewRootComponent(c,o,C,s)._renderedComponent.getPublicInstance();return a&&a.call(O),O},render:function(e,t,n){return J._renderSubtreeIntoContainer(null,e,t,n)},unmountComponentAtNode:function(e){"production"!==n.env.NODE_ENV?j(null==E.current,"unmountComponentAtNode(): Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate. Check the render method of %s.",E.current&&E.current.getName()||"ReactCompositeComponent"):void 0,p(e)?void 0:"production"!==n.env.NODE_ENV?M(!1,"unmountComponentAtNode(...): Target container is not a DOM element."):h("40"),"production"!==n.env.NODE_ENV&&("production"!==n.env.NODE_ENV?j(!l(e),"unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React."):void 0);var t=v(e);if(!t){var o=u(e),r=1===e.nodeType&&e.hasAttribute(U);return"production"!==n.env.NODE_ENV&&("production"!==n.env.NODE_ENV?j(!o,"unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s",r?"You may have accidentally passed in a React root node instead of its container.":"Instead, have the parent component update its state and rerender in order to remove this component."):void 0),!1}return delete B[t._instance.rootID],I.batchedUpdates(c,t,e,!1),!0},_mountImageIntoNode:function(e,t,i,a,s){if(p(t)?void 0:"production"!==n.env.NODE_ENV?M(!1,"mountComponentIntoNode(...): Target container is not valid."):h("41"),a){var c=r(t);if(R.canReuseMarkup(e,c))return void _.precacheNode(i,c);var u=c.getAttribute(R.CHECKSUM_ATTR_NAME);c.removeAttribute(R.CHECKSUM_ATTR_NAME);var l=c.outerHTML;c.setAttribute(R.CHECKSUM_ATTR_NAME,u);var d=e;if("production"!==n.env.NODE_ENV){var f;t.nodeType===H?(f=document.createElement("div"),f.innerHTML=e,d=f.innerHTML):(f=document.createElement("iframe"),document.body.appendChild(f),f.contentDocument.write(e),d=f.contentDocument.documentElement.outerHTML,document.body.removeChild(f))}var v=o(d,l),g=" (client) "+d.substring(v-20,v+20)+"\n (server) "+l.substring(v-20,v+20);t.nodeType===F?"production"!==n.env.NODE_ENV?M(!1,"You're trying to render a component to the document using server rendering but the checksum was invalid. This usually means you rendered a different component type or props on the client from the one on the server, or your render() methods are impure. React cannot handle this case due to cross-browser quirks by rendering at the document root. You should look for environment dependent code in your components and ensure the props are the same client and server side:\n%s",g):h("42",g):void 0,"production"!==n.env.NODE_ENV&&("production"!==n.env.NODE_ENV?j(!1,"React attempted to reuse markup in a container but the checksum was invalid. This generally means that you are using server rendering and the markup generated on the server was not what the client was expecting. React injected new markup to compensate which works but you have lost many of the benefits of server rendering. Instead, figure out why the markup being generated is different on the client or server:\n%s",g):void 0)}if(t.nodeType===F?"production"!==n.env.NODE_ENV?M(!1,"You're trying to render a component to the document but you didn't use server rendering. We can't do this without using server rendering due to cross-browser quirks. See ReactDOMServer.renderToString() for server rendering."):h("43"):void 0,s.useCreateElement){for(;t.lastChild;)t.removeChild(t.lastChild);m.insertTreeBefore(t,e,null)}else S(t,e),_.precacheNode(i,t.firstChild);if("production"!==n.env.NODE_ENV){var y=_.getInstanceFromNode(t.firstChild);0!==y._debugID&&w.debugTool.onHostOperation({instanceID:y._debugID,type:"mount",payload:e.toString()})}}};t.exports=J}).call(this,e("rH1JPG"))},{"./DOMLazyTree":39,"./DOMProperty":41,"./ReactBrowserEventEmitter":55,"./ReactDOMComponentTree":63,"./ReactDOMContainerInfo":64,"./ReactDOMFeatureFlags":66,"./ReactFeatureFlags":86,"./ReactInstanceMap":91,"./ReactInstrumentation":92,"./ReactMarkupChecksum":94,"./ReactReconciler":102,"./ReactUpdateQueue":106,"./ReactUpdates":107,"./instantiateReactComponent":146,"./reactProdInvariant":150,"./setInnerHTML":152,"./shouldUpdateReactComponent":154,"fbjs/lib/emptyObject":13,"fbjs/lib/invariant":20,"fbjs/lib/warning":27,rH1JPG:29,"react/lib/React":160,"react/lib/ReactCurrentOwner":165}],96:[function(e,t,n){(function(n){function o(e,t,n){return{type:"INSERT_MARKUP",content:e,fromIndex:null,fromNode:null,toIndex:n,afterNode:t}}function r(e,t,n){return{type:"MOVE_EXISTING",content:null,fromIndex:e._mountIndex,fromNode:h.getHostNode(e),toIndex:n,afterNode:t}}function i(e,t){return{type:"REMOVE_NODE",content:null,fromIndex:e._mountIndex,fromNode:t,toIndex:null,afterNode:null}}function a(e){return{type:"SET_MARKUP",content:e,fromIndex:null,fromNode:null,toIndex:null,afterNode:null}}function s(e){return{type:"TEXT_CONTENT",content:e,fromIndex:null,fromNode:null,toIndex:null,afterNode:null}}function c(e,t){return t&&(e=e||[],e.push(t)),e}function u(e,t){p.processChildrenUpdates(e,t)}var l=e("./reactProdInvariant"),p=e("./ReactComponentEnvironment"),d=e("./ReactInstanceMap"),f=e("./ReactInstrumentation"),v=e("react/lib/ReactCurrentOwner"),h=e("./ReactReconciler"),m=e("./ReactChildReconciler"),g=e("fbjs/lib/emptyFunction"),y=e("./flattenChildren"),b=e("fbjs/lib/invariant"),E=g;if("production"!==n.env.NODE_ENV){var _=function(e){if(!e._debugID){var t;(t=d.get(e))&&(e=t)}return e._debugID};E=function(e){var t=_(this);0!==t&&f.debugTool.onSetChildren(t,e?Object.keys(e).map(function(t){return e[t]._debugID}):[])}}var N={Mixin:{_reconcilerInstantiateChildren:function(e,t,o){if("production"!==n.env.NODE_ENV){var r=_(this);if(this._currentElement)try{return v.current=this._currentElement._owner,m.instantiateChildren(e,t,o,r)}finally{v.current=null}}return m.instantiateChildren(e,t,o)},_reconcilerUpdateChildren:function(e,t,o,r,i,a){var s,c=0;if("production"!==n.env.NODE_ENV&&(c=_(this),this._currentElement)){try{v.current=this._currentElement._owner,s=y(t,c)}finally{v.current=null}return m.updateChildren(e,s,o,r,i,this,this._hostContainerInfo,a,c),s}return s=y(t,c),m.updateChildren(e,s,o,r,i,this,this._hostContainerInfo,a,c),s},mountChildren:function(e,t,o){var r=this._reconcilerInstantiateChildren(e,t,o);this._renderedChildren=r;var i=[],a=0;for(var s in r)if(r.hasOwnProperty(s)){var c=r[s],u=0;"production"!==n.env.NODE_ENV&&(u=_(this));var l=h.mountComponent(c,t,this,this._hostContainerInfo,o,u);c._mountIndex=a++,i.push(l)}return"production"!==n.env.NODE_ENV&&E.call(this,r),i},updateTextContent:function(e){var t=this._renderedChildren;m.unmountChildren(t,!1);for(var o in t)t.hasOwnProperty(o)&&("production"!==n.env.NODE_ENV?b(!1,"updateTextContent called on non-empty component."):l("118"));var r=[s(e)];u(this,r)},updateMarkup:function(e){var t=this._renderedChildren;m.unmountChildren(t,!1);for(var o in t)t.hasOwnProperty(o)&&("production"!==n.env.NODE_ENV?b(!1,"updateTextContent called on non-empty component."):l("118"));var r=[a(e)];u(this,r)},updateChildren:function(e,t,n){this._updateChildren(e,t,n)},_updateChildren:function(e,t,o){var r=this._renderedChildren,i={},a=[],s=this._reconcilerUpdateChildren(r,e,a,i,t,o);if(s||r){var l,p=null,d=0,f=0,v=0,m=null;for(l in s)if(s.hasOwnProperty(l)){var g=r&&r[l],y=s[l];g===y?(p=c(p,this.moveChild(g,m,d,f)),f=Math.max(g._mountIndex,f),g._mountIndex=d):(g&&(f=Math.max(g._mountIndex,f)),p=c(p,this._mountChildAtIndex(y,a[v],m,d,t,o)),v++),d++,m=h.getHostNode(y)}for(l in i)i.hasOwnProperty(l)&&(p=c(p,this._unmountChild(r[l],i[l])));p&&u(this,p),this._renderedChildren=s,"production"!==n.env.NODE_ENV&&E.call(this,s)}},unmountChildren:function(e){var t=this._renderedChildren;m.unmountChildren(t,e),this._renderedChildren=null},moveChild:function(e,t,n,o){if(e._mountIndex<o)return r(e,t,n)},createChild:function(e,t,n){return o(n,t,e._mountIndex)},removeChild:function(e,t){return i(e,t)},_mountChildAtIndex:function(e,t,n,o,r,i){return e._mountIndex=o,this.createChild(e,n,t)},_unmountChild:function(e,t){var n=this.removeChild(e,t);return e._mountIndex=null,n}}};t.exports=N}).call(this,e("rH1JPG"))},{"./ReactChildReconciler":56,"./ReactComponentEnvironment":58,"./ReactInstanceMap":91,"./ReactInstrumentation":92,"./ReactReconciler":102,"./flattenChildren":134,"./reactProdInvariant":150,"fbjs/lib/emptyFunction":12,"fbjs/lib/invariant":20,rH1JPG:29,"react/lib/ReactCurrentOwner":165}],97:[function(e,t,n){(function(n){var o=e("./reactProdInvariant"),r=e("react/lib/React"),i=e("fbjs/lib/invariant"),a={HOST:0,COMPOSITE:1,EMPTY:2,getType:function(e){return null===e||e===!1?a.EMPTY:r.isValidElement(e)?"function"==typeof e.type?a.COMPOSITE:a.HOST:void("production"!==n.env.NODE_ENV?i(!1,"Unexpected node: %s",e):o("26",e))}};t.exports=a}).call(this,e("rH1JPG"))},{"./reactProdInvariant":150,"fbjs/lib/invariant":20,rH1JPG:29,"react/lib/React":160}],98:[function(e,t,n){(function(n){function o(e){return!(!e||"function"!=typeof e.attachRef||"function"!=typeof e.detachRef)}var r=e("./reactProdInvariant"),i=e("fbjs/lib/invariant"),a={addComponentAsRefTo:function(e,t,a){o(a)?void 0:"production"!==n.env.NODE_ENV?i(!1,"addComponentAsRefTo(...): Only a ReactOwner can have refs. You might be adding a ref to a component that was not created inside a component's `render` method, or you have multiple copies of React loaded (details: https://fb.me/react-refs-must-have-owner)."):r("119"),a.attachRef(t,e)},removeComponentAsRefFrom:function(e,t,a){o(a)?void 0:"production"!==n.env.NODE_ENV?i(!1,"removeComponentAsRefFrom(...): Only a ReactOwner can have refs. You might be removing a ref to a component that was not created inside a component's `render` method, or you have multiple copies of React loaded (details: https://fb.me/react-refs-must-have-owner)."):r("120");var s=a.getPublicInstance();s&&s.refs[t]===e.getPublicInstance()&&a.detachRef(t)}};t.exports=a}).call(this,e("rH1JPG"))},{"./reactProdInvariant":150,"fbjs/lib/invariant":20,rH1JPG:29}],99:[function(e,t,n){(function(e){var n={};"production"!==e.env.NODE_ENV&&(n={prop:"prop",context:"context",childContext:"child context"}),t.exports=n}).call(this,e("rH1JPG"))},{rH1JPG:29}],100:[function(e,t,n){var o="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";t.exports=o},{}],101:[function(e,t,n){(function(n){function o(e){this.reinitializeTransaction(),this.renderToStaticMarkup=!1,this.reactMountReady=i.getPooled(null),this.useCreateElement=e}var r=e("object-assign"),i=e("./CallbackQueue"),a=e("./PooledClass"),s=e("./ReactBrowserEventEmitter"),c=e("./ReactInputSelection"),u=e("./ReactInstrumentation"),l=e("./Transaction"),p=e("./ReactUpdateQueue"),d={initialize:c.getSelectionInformation,close:c.restoreSelection},f={initialize:function(){var e=s.isEnabled();return s.setEnabled(!1),e},close:function(e){s.setEnabled(e)}},v={initialize:function(){this.reactMountReady.reset()},close:function(){this.reactMountReady.notifyAll()}},h=[d,f,v];"production"!==n.env.NODE_ENV&&h.push({initialize:u.debugTool.onBeginFlush,close:u.debugTool.onEndFlush});var m={getTransactionWrappers:function(){return h},getReactMountReady:function(){return this.reactMountReady},getUpdateQueue:function(){return p},checkpoint:function(){return this.reactMountReady.checkpoint()},rollback:function(e){this.reactMountReady.rollback(e)},destructor:function(){i.release(this.reactMountReady),this.reactMountReady=null}};r(o.prototype,l,m),a.addPoolingTo(o),t.exports=o}).call(this,e("rH1JPG"))},{"./CallbackQueue":36,"./PooledClass":54,"./ReactBrowserEventEmitter":55,"./ReactInputSelection":90,"./ReactInstrumentation":92,"./ReactUpdateQueue":106,"./Transaction":125,"object-assign":28,rH1JPG:29}],102:[function(e,t,n){(function(n){function o(){r.attachRefs(this,this._currentElement)}var r=e("./ReactRef"),i=e("./ReactInstrumentation"),a=e("fbjs/lib/warning"),s={mountComponent:function(e,t,r,a,s,c){"production"!==n.env.NODE_ENV&&0!==e._debugID&&i.debugTool.onBeforeMountComponent(e._debugID,e._currentElement,c);var u=e.mountComponent(t,r,a,s,c);return e._currentElement&&null!=e._currentElement.ref&&t.getReactMountReady().enqueue(o,e),"production"!==n.env.NODE_ENV&&0!==e._debugID&&i.debugTool.onMountComponent(e._debugID),u},getHostNode:function(e){return e.getHostNode()},unmountComponent:function(e,t){"production"!==n.env.NODE_ENV&&0!==e._debugID&&i.debugTool.onBeforeUnmountComponent(e._debugID),r.detachRefs(e,e._currentElement),e.unmountComponent(t),"production"!==n.env.NODE_ENV&&0!==e._debugID&&i.debugTool.onUnmountComponent(e._debugID)},receiveComponent:function(e,t,a,s){var c=e._currentElement;if(t!==c||s!==e._context){"production"!==n.env.NODE_ENV&&0!==e._debugID&&i.debugTool.onBeforeUpdateComponent(e._debugID,t);var u=r.shouldUpdateRefs(c,t);u&&r.detachRefs(e,c),e.receiveComponent(t,a,s),u&&e._currentElement&&null!=e._currentElement.ref&&a.getReactMountReady().enqueue(o,e),"production"!==n.env.NODE_ENV&&0!==e._debugID&&i.debugTool.onUpdateComponent(e._debugID)}},performUpdateIfNecessary:function(e,t,o){return e._updateBatchNumber!==o?void("production"!==n.env.NODE_ENV?a(null==e._updateBatchNumber||e._updateBatchNumber===o+1,"performUpdateIfNecessary: Unexpected batch number (current %s, pending %s)",o,e._updateBatchNumber):void 0):("production"!==n.env.NODE_ENV&&0!==e._debugID&&i.debugTool.onBeforeUpdateComponent(e._debugID,e._currentElement),e.performUpdateIfNecessary(t),void("production"!==n.env.NODE_ENV&&0!==e._debugID&&i.debugTool.onUpdateComponent(e._debugID)))}};t.exports=s}).call(this,e("rH1JPG"))},{"./ReactInstrumentation":92,"./ReactRef":103,"fbjs/lib/warning":27,rH1JPG:29}],103:[function(e,t,n){function o(e,t,n){"function"==typeof e?e(t.getPublicInstance()):i.addComponentAsRefTo(t,e,n)}function r(e,t,n){"function"==typeof e?e(null):i.removeComponentAsRefFrom(t,e,n)}var i=e("./ReactOwner"),a={};a.attachRefs=function(e,t){if(null!==t&&"object"===("undefined"==typeof t?"undefined":_typeof(t))){var n=t.ref;null!=n&&o(n,e,t._owner)}},a.shouldUpdateRefs=function(e,t){var n=null,o=null;null!==e&&"object"===("undefined"==typeof e?"undefined":_typeof(e))&&(n=e.ref,o=e._owner);var r=null,i=null;return null!==t&&"object"===("undefined"==typeof t?"undefined":_typeof(t))&&(r=t.ref,i=t._owner),n!==r||"string"==typeof r&&i!==o},a.detachRefs=function(e,t){if(null!==t&&"object"===("undefined"==typeof t?"undefined":_typeof(t))){var n=t.ref;null!=n&&r(n,e,t._owner)}},t.exports=a},{"./ReactOwner":98}],104:[function(e,t,n){(function(n){function o(e){this.reinitializeTransaction(),this.renderToStaticMarkup=e,this.useCreateElement=!1,this.updateQueue=new c(this)}var r=e("object-assign"),i=e("./PooledClass"),a=e("./Transaction"),s=e("./ReactInstrumentation"),c=e("./ReactServerUpdateQueue"),u=[];"production"!==n.env.NODE_ENV&&u.push({initialize:s.debugTool.onBeginFlush,close:s.debugTool.onEndFlush});var l={enqueue:function(){}},p={getTransactionWrappers:function(){return u},getReactMountReady:function(){return l},getUpdateQueue:function(){return this.updateQueue},destructor:function(){},checkpoint:function(){},rollback:function(){}};r(o.prototype,a,p),i.addPoolingTo(o),t.exports=o}).call(this,e("rH1JPG"))},{"./PooledClass":54,"./ReactInstrumentation":92,"./ReactServerUpdateQueue":105,"./Transaction":125,"object-assign":28,rH1JPG:29}],105:[function(e,t,n){(function(n){function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if("production"!==n.env.NODE_ENV){var o=e.constructor;"production"!==n.env.NODE_ENV?a(!1,"%s(...): Can only update a mounting component. This usually means you called %s() outside componentWillMount() on the server. This is a no-op. Please check the code for the %s component.",t,t,o&&(o.displayName||o.name)||"ReactClass"):void 0}}var i=e("./ReactUpdateQueue"),a=e("fbjs/lib/warning"),s=function(){function e(t){o(this,e),this.transaction=t}return e.prototype.isMounted=function(e){return!1},e.prototype.enqueueCallback=function(e,t,n){this.transaction.isInTransaction()&&i.enqueueCallback(e,t,n)},e.prototype.enqueueForceUpdate=function(e){this.transaction.isInTransaction()?i.enqueueForceUpdate(e):r(e,"forceUpdate")},e.prototype.enqueueReplaceState=function(e,t){this.transaction.isInTransaction()?i.enqueueReplaceState(e,t):r(e,"replaceState")},e.prototype.enqueueSetState=function(e,t){this.transaction.isInTransaction()?i.enqueueSetState(e,t):r(e,"setState")},e}();t.exports=s}).call(this,e("rH1JPG"))},{"./ReactUpdateQueue":106,
"fbjs/lib/warning":27,rH1JPG:29}],106:[function(e,t,n){(function(n){function o(e){l.enqueueUpdate(e)}function r(e){var t="undefined"==typeof e?"undefined":_typeof(e);if("object"!==t)return t;var n=e.constructor&&e.constructor.name||t,o=Object.keys(e);return o.length>0&&o.length<20?n+" (keys: "+o.join(", ")+")":n}function i(e,t){var o=c.get(e);if(!o){if("production"!==n.env.NODE_ENV){var r=e.constructor;"production"!==n.env.NODE_ENV?d(!t,"%s(...): Can only update a mounted or mounting component. This usually means you called %s() on an unmounted component. This is a no-op. Please check the code for the %s component.",t,t,r&&(r.displayName||r.name)||"ReactClass"):void 0}return null}return"production"!==n.env.NODE_ENV&&("production"!==n.env.NODE_ENV?d(null==s.current,"%s(...): Cannot update during an existing state transition (such as within `render` or another component's constructor). Render methods should be a pure function of props and state; constructor side-effects are an anti-pattern, but can be moved to `componentWillMount`.",t):void 0),o}var a=e("./reactProdInvariant"),s=e("react/lib/ReactCurrentOwner"),c=e("./ReactInstanceMap"),u=e("./ReactInstrumentation"),l=e("./ReactUpdates"),p=e("fbjs/lib/invariant"),d=e("fbjs/lib/warning"),f={isMounted:function(e){if("production"!==n.env.NODE_ENV){var t=s.current;null!==t&&("production"!==n.env.NODE_ENV?d(t._warnedAboutRefsInRender,"%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.",t.getName()||"A component"):void 0,t._warnedAboutRefsInRender=!0)}var o=c.get(e);return!!o&&!!o._renderedComponent},enqueueCallback:function(e,t,n){f.validateCallback(t,n);var r=i(e);return r?(r._pendingCallbacks?r._pendingCallbacks.push(t):r._pendingCallbacks=[t],void o(r)):null},enqueueCallbackInternal:function(e,t){e._pendingCallbacks?e._pendingCallbacks.push(t):e._pendingCallbacks=[t],o(e)},enqueueForceUpdate:function(e){var t=i(e,"forceUpdate");t&&(t._pendingForceUpdate=!0,o(t))},enqueueReplaceState:function(e,t){var n=i(e,"replaceState");n&&(n._pendingStateQueue=[t],n._pendingReplaceState=!0,o(n))},enqueueSetState:function(e,t){"production"!==n.env.NODE_ENV&&(u.debugTool.onSetState(),"production"!==n.env.NODE_ENV?d(null!=t,"setState(...): You passed an undefined or null state object; instead, use forceUpdate()."):void 0);var r=i(e,"setState");if(r){var a=r._pendingStateQueue||(r._pendingStateQueue=[]);a.push(t),o(r)}},enqueueElementInternal:function(e,t,n){e._pendingElement=t,e._context=n,o(e)},validateCallback:function(e,t){e&&"function"!=typeof e?"production"!==n.env.NODE_ENV?p(!1,"%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.",t,r(e)):a("122",t,r(e)):void 0}};t.exports=f}).call(this,e("rH1JPG"))},{"./ReactInstanceMap":91,"./ReactInstrumentation":92,"./ReactUpdates":107,"./reactProdInvariant":150,"fbjs/lib/invariant":20,"fbjs/lib/warning":27,rH1JPG:29,"react/lib/ReactCurrentOwner":165}],107:[function(e,t,n){(function(n){function o(){P.ReactReconcileTransaction&&N?void 0:"production"!==n.env.NODE_ENV?g(!1,"ReactUpdates: must inject a reconcile transaction class and batching strategy"):l("123")}function r(){this.reinitializeTransaction(),this.dirtyComponentsLength=null,this.callbackQueue=d.getPooled(),this.reconcileTransaction=P.ReactReconcileTransaction.getPooled(!0)}function i(e,t,n,r,i,a){return o(),N.batchedUpdates(e,t,n,r,i,a)}function a(e,t){return e._mountOrder-t._mountOrder}function s(e){var t=e.dirtyComponentsLength;t!==y.length?"production"!==n.env.NODE_ENV?g(!1,"Expected flush transaction's stored dirty-components length (%s) to match dirty-components array length (%s).",t,y.length):l("124",t,y.length):void 0,y.sort(a),b++;for(var o=0;o<t;o++){var r=y[o],i=r._pendingCallbacks;r._pendingCallbacks=null;var s;if(v.logTopLevelRenders){var c=r;r._currentElement.type.isReactTopLevelWrapper&&(c=r._renderedComponent),s="React update: "+c.getName(),console.time(s)}if(h.performUpdateIfNecessary(r,e.reconcileTransaction,b),s&&console.timeEnd(s),i)for(var u=0;u<i.length;u++)e.callbackQueue.enqueue(i[u],r.getPublicInstance())}}function c(e){return o(),N.isBatchingUpdates?(y.push(e),void(null==e._updateBatchNumber&&(e._updateBatchNumber=b+1))):void N.batchedUpdates(c,e)}function u(e,t){N.isBatchingUpdates?void 0:"production"!==n.env.NODE_ENV?g(!1,"ReactUpdates.asap: Can't enqueue an asap callback in a context whereupdates are not being batched."):l("125"),E.enqueue(e,t),_=!0}var l=e("./reactProdInvariant"),p=e("object-assign"),d=e("./CallbackQueue"),f=e("./PooledClass"),v=e("./ReactFeatureFlags"),h=e("./ReactReconciler"),m=e("./Transaction"),g=e("fbjs/lib/invariant"),y=[],b=0,E=d.getPooled(),_=!1,N=null,C={initialize:function(){this.dirtyComponentsLength=y.length},close:function(){this.dirtyComponentsLength!==y.length?(y.splice(0,this.dirtyComponentsLength),w()):y.length=0}},O={initialize:function(){this.callbackQueue.reset()},close:function(){this.callbackQueue.notifyAll()}},D=[C,O];p(r.prototype,m,{getTransactionWrappers:function(){return D},destructor:function(){this.dirtyComponentsLength=null,d.release(this.callbackQueue),this.callbackQueue=null,P.ReactReconcileTransaction.release(this.reconcileTransaction),this.reconcileTransaction=null},perform:function(e,t,n){return m.perform.call(this,this.reconcileTransaction.perform,this.reconcileTransaction,e,t,n)}}),f.addPoolingTo(r);var w=function(){for(;y.length||_;){if(y.length){var e=r.getPooled();e.perform(s,null,e),r.release(e)}if(_){_=!1;var t=E;E=d.getPooled(),t.notifyAll(),d.release(t)}}},R={injectReconcileTransaction:function(e){e?void 0:"production"!==n.env.NODE_ENV?g(!1,"ReactUpdates: must provide a reconcile transaction class"):l("126"),P.ReactReconcileTransaction=e},injectBatchingStrategy:function(e){e?void 0:"production"!==n.env.NODE_ENV?g(!1,"ReactUpdates: must provide a batching strategy"):l("127"),"function"!=typeof e.batchedUpdates?"production"!==n.env.NODE_ENV?g(!1,"ReactUpdates: must provide a batchedUpdates() function"):l("128"):void 0,"boolean"!=typeof e.isBatchingUpdates?"production"!==n.env.NODE_ENV?g(!1,"ReactUpdates: must provide an isBatchingUpdates boolean attribute"):l("129"):void 0,N=e}},P={ReactReconcileTransaction:null,batchedUpdates:i,enqueueUpdate:c,flushBatchedUpdates:w,injection:R,asap:u};t.exports=P}).call(this,e("rH1JPG"))},{"./CallbackQueue":36,"./PooledClass":54,"./ReactFeatureFlags":86,"./ReactReconciler":102,"./Transaction":125,"./reactProdInvariant":150,"fbjs/lib/invariant":20,"object-assign":28,rH1JPG:29}],108:[function(e,t,n){t.exports="15.4.1"},{}],109:[function(e,t,n){var o={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"},r={accentHeight:"accent-height",accumulate:0,additive:0,alignmentBaseline:"alignment-baseline",allowReorder:"allowReorder",alphabetic:0,amplitude:0,arabicForm:"arabic-form",ascent:0,attributeName:"attributeName",attributeType:"attributeType",autoReverse:"autoReverse",azimuth:0,baseFrequency:"baseFrequency",baseProfile:"baseProfile",baselineShift:"baseline-shift",bbox:0,begin:0,bias:0,by:0,calcMode:"calcMode",capHeight:"cap-height",clip:0,clipPath:"clip-path",clipRule:"clip-rule",clipPathUnits:"clipPathUnits",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",contentScriptType:"contentScriptType",contentStyleType:"contentStyleType",cursor:0,cx:0,cy:0,d:0,decelerate:0,descent:0,diffuseConstant:"diffuseConstant",direction:0,display:0,divisor:0,dominantBaseline:"dominant-baseline",dur:0,dx:0,dy:0,edgeMode:"edgeMode",elevation:0,enableBackground:"enable-background",end:0,exponent:0,externalResourcesRequired:"externalResourcesRequired",fill:0,fillOpacity:"fill-opacity",fillRule:"fill-rule",filter:0,filterRes:"filterRes",filterUnits:"filterUnits",floodColor:"flood-color",floodOpacity:"flood-opacity",focusable:0,fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",format:0,from:0,fx:0,fy:0,g1:0,g2:0,glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",glyphRef:"glyphRef",gradientTransform:"gradientTransform",gradientUnits:"gradientUnits",hanging:0,horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",ideographic:0,imageRendering:"image-rendering",in:0,in2:0,intercept:0,k:0,k1:0,k2:0,k3:0,k4:0,kernelMatrix:"kernelMatrix",kernelUnitLength:"kernelUnitLength",kerning:0,keyPoints:"keyPoints",keySplines:"keySplines",keyTimes:"keyTimes",lengthAdjust:"lengthAdjust",letterSpacing:"letter-spacing",lightingColor:"lighting-color",limitingConeAngle:"limitingConeAngle",local:0,markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",markerHeight:"markerHeight",markerUnits:"markerUnits",markerWidth:"markerWidth",mask:0,maskContentUnits:"maskContentUnits",maskUnits:"maskUnits",mathematical:0,mode:0,numOctaves:"numOctaves",offset:0,opacity:0,operator:0,order:0,orient:0,orientation:0,origin:0,overflow:0,overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pathLength:"pathLength",patternContentUnits:"patternContentUnits",patternTransform:"patternTransform",patternUnits:"patternUnits",pointerEvents:"pointer-events",points:0,pointsAtX:"pointsAtX",pointsAtY:"pointsAtY",pointsAtZ:"pointsAtZ",preserveAlpha:"preserveAlpha",preserveAspectRatio:"preserveAspectRatio",primitiveUnits:"primitiveUnits",r:0,radius:0,refX:"refX",refY:"refY",renderingIntent:"rendering-intent",repeatCount:"repeatCount",repeatDur:"repeatDur",requiredExtensions:"requiredExtensions",requiredFeatures:"requiredFeatures",restart:0,result:0,rotate:0,rx:0,ry:0,scale:0,seed:0,shapeRendering:"shape-rendering",slope:0,spacing:0,specularConstant:"specularConstant",specularExponent:"specularExponent",speed:0,spreadMethod:"spreadMethod",startOffset:"startOffset",stdDeviation:"stdDeviation",stemh:0,stemv:0,stitchTiles:"stitchTiles",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",string:0,stroke:0,strokeDasharray:"stroke-dasharray",strokeDashoffset:"stroke-dashoffset",strokeLinecap:"stroke-linecap",strokeLinejoin:"stroke-linejoin",strokeMiterlimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",surfaceScale:"surfaceScale",systemLanguage:"systemLanguage",tableValues:"tableValues",targetX:"targetX",targetY:"targetY",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",textLength:"textLength",to:0,transform:0,u1:0,u2:0,underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicode:0,unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",values:0,vectorEffect:"vector-effect",version:0,vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",viewBox:"viewBox",viewTarget:"viewTarget",visibility:0,widths:0,wordSpacing:"word-spacing",writingMode:"writing-mode",x:0,xHeight:"x-height",x1:0,x2:0,xChannelSelector:"xChannelSelector",xlinkActuate:"xlink:actuate",xlinkArcrole:"xlink:arcrole",xlinkHref:"xlink:href",xlinkRole:"xlink:role",xlinkShow:"xlink:show",xlinkTitle:"xlink:title",xlinkType:"xlink:type",xmlBase:"xml:base",xmlns:0,xmlnsXlink:"xmlns:xlink",xmlLang:"xml:lang",xmlSpace:"xml:space",y:0,y1:0,y2:0,yChannelSelector:"yChannelSelector",z:0,zoomAndPan:"zoomAndPan"},i={Properties:{},DOMAttributeNamespaces:{xlinkActuate:o.xlink,xlinkArcrole:o.xlink,xlinkHref:o.xlink,xlinkRole:o.xlink,xlinkShow:o.xlink,xlinkTitle:o.xlink,xlinkType:o.xlink,xmlBase:o.xml,xmlLang:o.xml,xmlSpace:o.xml},DOMAttributeNames:{}};Object.keys(r).forEach(function(e){i.Properties[e]=0,r[e]&&(i.DOMAttributeNames[e]=r[e])}),t.exports=i},{}],110:[function(e,t,n){function o(e){if("selectionStart"in e&&c.hasSelectionCapabilities(e))return{start:e.selectionStart,end:e.selectionEnd};if(window.getSelection){var t=window.getSelection();return{anchorNode:t.anchorNode,anchorOffset:t.anchorOffset,focusNode:t.focusNode,focusOffset:t.focusOffset}}if(document.selection){var n=document.selection.createRange();return{parentElement:n.parentElement(),text:n.text,top:n.boundingTop,left:n.boundingLeft}}}function r(e,t){if(y||null==h||h!==l())return null;var n=o(h);if(!g||!d(g,n)){g=n;var r=u.getPooled(v.select,m,e,t);return r.type="select",r.target=h,i.accumulateTwoPhaseDispatches(r),r}return null}var i=e("./EventPropagators"),a=e("fbjs/lib/ExecutionEnvironment"),s=e("./ReactDOMComponentTree"),c=e("./ReactInputSelection"),u=e("./SyntheticEvent"),l=e("fbjs/lib/getActiveElement"),p=e("./isTextInputElement"),d=e("fbjs/lib/shallowEqual"),f=a.canUseDOM&&"documentMode"in document&&document.documentMode<=11,v={select:{phasedRegistrationNames:{bubbled:"onSelect",captured:"onSelectCapture"},dependencies:["topBlur","topContextMenu","topFocus","topKeyDown","topKeyUp","topMouseDown","topMouseUp","topSelectionChange"]}},h=null,m=null,g=null,y=!1,b=!1,E={eventTypes:v,extractEvents:function(e,t,n,o){if(!b)return null;var i=t?s.getNodeFromInstance(t):window;switch(e){case"topFocus":(p(i)||"true"===i.contentEditable)&&(h=i,m=t,g=null);break;case"topBlur":h=null,m=null,g=null;break;case"topMouseDown":y=!0;break;case"topContextMenu":case"topMouseUp":return y=!1,r(n,o);case"topSelectionChange":if(f)break;case"topKeyDown":case"topKeyUp":return r(n,o)}return null},didPutListener:function(e,t,n){"onSelect"===t&&(b=!0)}};t.exports=E},{"./EventPropagators":49,"./ReactDOMComponentTree":63,"./ReactInputSelection":90,"./SyntheticEvent":116,"./isTextInputElement":148,"fbjs/lib/ExecutionEnvironment":6,"fbjs/lib/getActiveElement":15,"fbjs/lib/shallowEqual":26}],111:[function(e,t,n){(function(n){function o(e){return"."+e._rootNodeID}function r(e){return"button"===e||"input"===e||"select"===e||"textarea"===e}var i=e("./reactProdInvariant"),a=e("fbjs/lib/EventListener"),s=e("./EventPropagators"),c=e("./ReactDOMComponentTree"),u=e("./SyntheticAnimationEvent"),l=e("./SyntheticClipboardEvent"),p=e("./SyntheticEvent"),d=e("./SyntheticFocusEvent"),f=e("./SyntheticKeyboardEvent"),v=e("./SyntheticMouseEvent"),h=e("./SyntheticDragEvent"),m=e("./SyntheticTouchEvent"),g=e("./SyntheticTransitionEvent"),y=e("./SyntheticUIEvent"),b=e("./SyntheticWheelEvent"),E=e("fbjs/lib/emptyFunction"),_=e("./getEventCharCode"),N=e("fbjs/lib/invariant"),C={},O={};["abort","animationEnd","animationIteration","animationStart","blur","canPlay","canPlayThrough","click","contextMenu","copy","cut","doubleClick","drag","dragEnd","dragEnter","dragExit","dragLeave","dragOver","dragStart","drop","durationChange","emptied","encrypted","ended","error","focus","input","invalid","keyDown","keyPress","keyUp","load","loadedData","loadedMetadata","loadStart","mouseDown","mouseMove","mouseOut","mouseOver","mouseUp","paste","pause","play","playing","progress","rateChange","reset","scroll","seeked","seeking","stalled","submit","suspend","timeUpdate","touchCancel","touchEnd","touchMove","touchStart","transitionEnd","volumeChange","waiting","wheel"].forEach(function(e){var t=e[0].toUpperCase()+e.slice(1),n="on"+t,o="top"+t,r={phasedRegistrationNames:{bubbled:n,captured:n+"Capture"},dependencies:[o]};C[e]=r,O[o]=r});var D={},w={eventTypes:C,extractEvents:function(e,t,o,r){var a=O[e];if(!a)return null;var c;switch(e){case"topAbort":case"topCanPlay":case"topCanPlayThrough":case"topDurationChange":case"topEmptied":case"topEncrypted":case"topEnded":case"topError":case"topInput":case"topInvalid":case"topLoad":case"topLoadedData":case"topLoadedMetadata":case"topLoadStart":case"topPause":case"topPlay":case"topPlaying":case"topProgress":case"topRateChange":case"topReset":case"topSeeked":case"topSeeking":case"topStalled":case"topSubmit":case"topSuspend":case"topTimeUpdate":case"topVolumeChange":case"topWaiting":c=p;break;case"topKeyPress":if(0===_(o))return null;case"topKeyDown":case"topKeyUp":c=f;break;case"topBlur":case"topFocus":c=d;break;case"topClick":if(2===o.button)return null;case"topDoubleClick":case"topMouseDown":case"topMouseMove":case"topMouseUp":case"topMouseOut":case"topMouseOver":case"topContextMenu":c=v;break;case"topDrag":case"topDragEnd":case"topDragEnter":case"topDragExit":case"topDragLeave":case"topDragOver":case"topDragStart":case"topDrop":c=h;break;case"topTouchCancel":case"topTouchEnd":case"topTouchMove":case"topTouchStart":c=m;break;case"topAnimationEnd":case"topAnimationIteration":case"topAnimationStart":c=u;break;case"topTransitionEnd":c=g;break;case"topScroll":c=y;break;case"topWheel":c=b;break;case"topCopy":case"topCut":case"topPaste":c=l}c?void 0:"production"!==n.env.NODE_ENV?N(!1,"SimpleEventPlugin: Unhandled event type, `%s`.",e):i("86",e);var E=c.getPooled(a,t,o,r);return s.accumulateTwoPhaseDispatches(E),E},didPutListener:function(e,t,n){if("onClick"===t&&!r(e._tag)){var i=o(e),s=c.getNodeFromInstance(e);D[i]||(D[i]=a.listen(s,"click",E))}},willDeleteListener:function(e,t){if("onClick"===t&&!r(e._tag)){var n=o(e);D[n].remove(),delete D[n]}}};t.exports=w}).call(this,e("rH1JPG"))},{"./EventPropagators":49,"./ReactDOMComponentTree":63,"./SyntheticAnimationEvent":112,"./SyntheticClipboardEvent":113,"./SyntheticDragEvent":115,"./SyntheticEvent":116,"./SyntheticFocusEvent":117,"./SyntheticKeyboardEvent":119,"./SyntheticMouseEvent":120,"./SyntheticTouchEvent":121,"./SyntheticTransitionEvent":122,"./SyntheticUIEvent":123,"./SyntheticWheelEvent":124,"./getEventCharCode":136,"./reactProdInvariant":150,"fbjs/lib/EventListener":5,"fbjs/lib/emptyFunction":12,"fbjs/lib/invariant":20,rH1JPG:29}],112:[function(e,t,n){function o(e,t,n,o){return r.call(this,e,t,n,o)}var r=e("./SyntheticEvent"),i={animationName:null,elapsedTime:null,pseudoElement:null};r.augmentClass(o,i),t.exports=o},{"./SyntheticEvent":116}],113:[function(e,t,n){function o(e,t,n,o){return r.call(this,e,t,n,o)}var r=e("./SyntheticEvent"),i={clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}};r.augmentClass(o,i),t.exports=o},{"./SyntheticEvent":116}],114:[function(e,t,n){function o(e,t,n,o){return r.call(this,e,t,n,o)}var r=e("./SyntheticEvent"),i={data:null};r.augmentClass(o,i),t.exports=o},{"./SyntheticEvent":116}],115:[function(e,t,n){function o(e,t,n,o){return r.call(this,e,t,n,o)}var r=e("./SyntheticMouseEvent"),i={dataTransfer:null};r.augmentClass(o,i),t.exports=o},{"./SyntheticMouseEvent":120}],116:[function(e,t,n){(function(n){function o(e,t,o,r){"production"!==n.env.NODE_ENV&&(delete this.nativeEvent,delete this.preventDefault,delete this.stopPropagation),this.dispatchConfig=e,this._targetInst=t,this.nativeEvent=o;var i=this.constructor.Interface;for(var a in i)if(i.hasOwnProperty(a)){"production"!==n.env.NODE_ENV&&delete this[a];var c=i[a];c?this[a]=c(o):"target"===a?this.target=r:this[a]=o[a]}var u=null!=o.defaultPrevented?o.defaultPrevented:o.returnValue===!1;return u?this.isDefaultPrevented=s.thatReturnsTrue:this.isDefaultPrevented=s.thatReturnsFalse,this.isPropagationStopped=s.thatReturnsFalse,this}function r(e,t){function o(e){var t=a?"setting the method":"setting the property";return i(t,"This is effectively a no-op"),e}function r(){var e=a?"accessing the method":"accessing the property",n=a?"This is a no-op function":"This is set to null";return i(e,n),t}function i(t,o){var r=!1;"production"!==n.env.NODE_ENV?c(r,"This synthetic event is reused for performance reasons. If you're seeing this, you're %s `%s` on a released/nullified synthetic event. %s. If you must keep the original synthetic event around, use event.persist(). See https://fb.me/react-event-pooling for more information.",t,e,o):void 0}var a="function"==typeof t;return{configurable:!0,set:o,get:r}}var i=e("object-assign"),a=e("./PooledClass"),s=e("fbjs/lib/emptyFunction"),c=e("fbjs/lib/warning"),u=!1,l="function"==typeof Proxy,p=["dispatchConfig","_targetInst","nativeEvent","isDefaultPrevented","isPropagationStopped","_dispatchListeners","_dispatchInstances"],d={type:null,target:null,currentTarget:s.thatReturnsNull,eventPhase:null,bubbles:null,cancelable:null,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:null,isTrusted:null};i(o.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():"unknown"!=typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=s.thatReturnsTrue)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():"unknown"!=typeof e.cancelBubble&&(e.cancelBubble=!0),this.isPropagationStopped=s.thatReturnsTrue)},persist:function(){this.isPersistent=s.thatReturnsTrue},isPersistent:s.thatReturnsFalse,destructor:function(){var e=this.constructor.Interface;for(var t in e)"production"!==n.env.NODE_ENV?Object.defineProperty(this,t,r(t,e[t])):this[t]=null;for(var o=0;o<p.length;o++)this[p[o]]=null;"production"!==n.env.NODE_ENV&&(Object.defineProperty(this,"nativeEvent",r("nativeEvent",null)),Object.defineProperty(this,"preventDefault",r("preventDefault",s)),Object.defineProperty(this,"stopPropagation",r("stopPropagation",s)))}}),o.Interface=d,"production"!==n.env.NODE_ENV&&l&&(o=new Proxy(o,{construct:function(e,t){return this.apply(e,Object.create(e.prototype),t)},apply:function(e,t,o){return new Proxy(e.apply(t,o),{set:function(e,t,o){return"isPersistent"===t||e.constructor.Interface.hasOwnProperty(t)||p.indexOf(t)!==-1||("production"!==n.env.NODE_ENV?c(u||e.isPersistent(),"This synthetic event is reused for performance reasons. If you're seeing this, you're adding a new property in the synthetic event object. The property is never released. See https://fb.me/react-event-pooling for more information."):void 0,u=!0),e[t]=o,!0}})}})),o.augmentClass=function(e,t){var n=this,o=function(){};o.prototype=n.prototype;var r=new o;i(r,e.prototype),e.prototype=r,e.prototype.constructor=e,e.Interface=i({},n.Interface,t),e.augmentClass=n.augmentClass,a.addPoolingTo(e,a.fourArgumentPooler)},a.addPoolingTo(o,a.fourArgumentPooler),t.exports=o}).call(this,e("rH1JPG"))},{"./PooledClass":54,"fbjs/lib/emptyFunction":12,"fbjs/lib/warning":27,"object-assign":28,rH1JPG:29}],117:[function(e,t,n){function o(e,t,n,o){return r.call(this,e,t,n,o)}var r=e("./SyntheticUIEvent"),i={relatedTarget:null};r.augmentClass(o,i),t.exports=o},{"./SyntheticUIEvent":123}],118:[function(e,t,n){function o(e,t,n,o){return r.call(this,e,t,n,o)}var r=e("./SyntheticEvent"),i={data:null};r.augmentClass(o,i),t.exports=o},{"./SyntheticEvent":116}],119:[function(e,t,n){function o(e,t,n,o){return r.call(this,e,t,n,o)}var r=e("./SyntheticUIEvent"),i=e("./getEventCharCode"),a=e("./getEventKey"),s=e("./getEventModifierState"),c={key:a,location:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,repeat:null,locale:null,getModifierState:s,charCode:function(e){return"keypress"===e.type?i(e):0},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){return"keypress"===e.type?i(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}};r.augmentClass(o,c),t.exports=o},{"./SyntheticUIEvent":123,"./getEventCharCode":136,"./getEventKey":137,"./getEventModifierState":138}],120:[function(e,t,n){function o(e,t,n,o){return r.call(this,e,t,n,o)}var r=e("./SyntheticUIEvent"),i=e("./ViewportMetrics"),a=e("./getEventModifierState"),s={screenX:null,screenY:null,clientX:null,clientY:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,getModifierState:a,button:function e(t){var e=t.button;return"which"in t?e:2===e?2:4===e?1:0},buttons:null,relatedTarget:function(e){return e.relatedTarget||(e.fromElement===e.srcElement?e.toElement:e.fromElement)},pageX:function(e){return"pageX"in e?e.pageX:e.clientX+i.currentScrollLeft},pageY:function(e){return"pageY"in e?e.pageY:e.clientY+i.currentScrollTop}};r.augmentClass(o,s),t.exports=o},{"./SyntheticUIEvent":123,"./ViewportMetrics":126,"./getEventModifierState":138}],121:[function(e,t,n){function o(e,t,n,o){return r.call(this,e,t,n,o)}var r=e("./SyntheticUIEvent"),i=e("./getEventModifierState"),a={touches:null,targetTouches:null,changedTouches:null,altKey:null,metaKey:null,ctrlKey:null,shiftKey:null,getModifierState:i};r.augmentClass(o,a),t.exports=o},{"./SyntheticUIEvent":123,"./getEventModifierState":138}],122:[function(e,t,n){function o(e,t,n,o){return r.call(this,e,t,n,o)}var r=e("./SyntheticEvent"),i={propertyName:null,elapsedTime:null,pseudoElement:null};r.augmentClass(o,i),t.exports=o},{"./SyntheticEvent":116}],123:[function(e,t,n){function o(e,t,n,o){return r.call(this,e,t,n,o)}var r=e("./SyntheticEvent"),i=e("./getEventTarget"),a={view:function(e){if(e.view)return e.view;var t=i(e);if(t.window===t)return t;var n=t.ownerDocument;return n?n.defaultView||n.parentWindow:window},detail:function(e){return e.detail||0}};r.augmentClass(o,a),t.exports=o},{"./SyntheticEvent":116,"./getEventTarget":139}],124:[function(e,t,n){function o(e,t,n,o){return r.call(this,e,t,n,o)}var r=e("./SyntheticMouseEvent"),i={deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:null,deltaMode:null};r.augmentClass(o,i),t.exports=o},{"./SyntheticMouseEvent":120}],125:[function(e,t,n){(function(n){var o=e("./reactProdInvariant"),r=e("fbjs/lib/invariant"),i={},a={reinitializeTransaction:function(){this.transactionWrappers=this.getTransactionWrappers(),this.wrapperInitData?this.wrapperInitData.length=0:this.wrapperInitData=[],this._isInTransaction=!1},_isInTransaction:!1,getTransactionWrappers:null,isInTransaction:function(){return!!this._isInTransaction},perform:function(e,t,i,a,s,c,u,l){this.isInTransaction()?"production"!==n.env.NODE_ENV?r(!1,"Transaction.perform(...): Cannot initialize a transaction when there is already an outstanding transaction."):o("27"):void 0;var p,d;try{this._isInTransaction=!0,p=!0,this.initializeAll(0),d=e.call(t,i,a,s,c,u,l),p=!1}finally{try{if(p)try{this.closeAll(0)}catch(e){}else this.closeAll(0)}finally{this._isInTransaction=!1}}return d},initializeAll:function(e){for(var t=this.transactionWrappers,n=e;n<t.length;n++){var o=t[n];try{this.wrapperInitData[n]=i,this.wrapperInitData[n]=o.initialize?o.initialize.call(this):null}finally{if(this.wrapperInitData[n]===i)try{this.initializeAll(n+1)}catch(e){}}}},closeAll:function(e){this.isInTransaction()?void 0:"production"!==n.env.NODE_ENV?r(!1,"Transaction.closeAll(): Cannot close transaction when none are open."):o("28");for(var t=this.transactionWrappers,a=e;a<t.length;a++){var s,c=t[a],u=this.wrapperInitData[a];try{s=!0,u!==i&&c.close&&c.close.call(this,u),s=!1}finally{if(s)try{this.closeAll(a+1)}catch(e){}}}this.wrapperInitData.length=0}};t.exports=a}).call(this,e("rH1JPG"))},{"./reactProdInvariant":150,"fbjs/lib/invariant":20,rH1JPG:29}],126:[function(e,t,n){var o={currentScrollLeft:0,currentScrollTop:0,refreshScrollValues:function(e){o.currentScrollLeft=e.x,o.currentScrollTop=e.y}};t.exports=o},{}],127:[function(e,t,n){(function(n){function o(e,t){return null==t?"production"!==n.env.NODE_ENV?i(!1,"accumulateInto(...): Accumulated items must not be null or undefined."):r("30"):void 0,null==e?t:Array.isArray(e)?Array.isArray(t)?(e.push.apply(e,t),e):(e.push(t),e):Array.isArray(t)?[e].concat(t):[e,t]}var r=e("./reactProdInvariant"),i=e("fbjs/lib/invariant");t.exports=o}).call(this,e("rH1JPG"))},{"./reactProdInvariant":150,"fbjs/lib/invariant":20,rH1JPG:29}],128:[function(e,t,n){function o(e){for(var t=1,n=0,o=0,i=e.length,a=i&-4;o<a;){for(var s=Math.min(o+4096,a);o<s;o+=4)n+=(t+=e.charCodeAt(o))+(t+=e.charCodeAt(o+1))+(t+=e.charCodeAt(o+2))+(t+=e.charCodeAt(o+3));t%=r,n%=r}for(;o<i;o++)n+=t+=e.charCodeAt(o);return t%=r,n%=r,t|n<<16}var r=65521;t.exports=o},{}],129:[function(e,t,n){(function(n){function o(t,o,p,d,f,v){for(var h in t)if(t.hasOwnProperty(h)){var m;try{"function"!=typeof t[h]?"production"!==n.env.NODE_ENV?c(!1,"%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.",d||"React class",a[p],h):i("84",d||"React class",a[p],h):void 0,m=t[h](o,h,d,p,null,s)}catch(e){m=e}if("production"!==n.env.NODE_ENV?u(!m||m instanceof Error,"%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",d||"React class",a[p],h,"undefined"==typeof m?"undefined":_typeof(m)):void 0,m instanceof Error&&!(m.message in l)){l[m.message]=!0;var g="";"production"!==n.env.NODE_ENV&&(r||(r=e("react/lib/ReactComponentTreeHook")),null!==v?g=r.getStackAddendumByID(v):null!==f&&(g=r.getCurrentStackAddendum(f))),"production"!==n.env.NODE_ENV?u(!1,"Failed %s type: %s%s",p,m.message,g):void 0}}}var r,i=e("./reactProdInvariant"),a=e("./ReactPropTypeLocationNames"),s=e("./ReactPropTypesSecret"),c=e("fbjs/lib/invariant"),u=e("fbjs/lib/warning");"undefined"!=typeof n&&n.env&&"test"===n.env.NODE_ENV&&(r=e("react/lib/ReactComponentTreeHook"));var l={};t.exports=o}).call(this,e("rH1JPG"))},{"./ReactPropTypeLocationNames":99,"./ReactPropTypesSecret":100,"./reactProdInvariant":150,"fbjs/lib/invariant":20,"fbjs/lib/warning":27,rH1JPG:29,"react/lib/ReactComponentTreeHook":164}],130:[function(e,t,n){var o=function(e){return"undefined"!=typeof MSApp&&MSApp.execUnsafeLocalFunction?function(t,n,o,r){MSApp.execUnsafeLocalFunction(function(){return e(t,n,o,r)})}:e};t.exports=o},{}],131:[function(e,t,n){(function(n){function o(e,t,o){var r=null==t||"boolean"==typeof t||""===t;if(r)return"";var c=isNaN(t);if(c||0===t||a.hasOwnProperty(e)&&a[e])return""+t;if("string"==typeof t){if("production"!==n.env.NODE_ENV&&o&&"0"!==t){var u=o._currentElement._owner,l=u?u.getName():null;l&&!s[l]&&(s[l]={});var p=!1;if(l){var d=s[l];p=d[e],p||(d[e]=!0)}p||("production"!==n.env.NODE_ENV?i(!1,"a `%s` tag (owner: `%s`) was passed a numeric string value for CSS property `%s` (value: `%s`) which will be treated as a unitless number in a future version of React.",o._currentElement.type,l||"unknown",e,t):void 0)}t=t.trim()}return t+"px"}var r=e("./CSSProperty"),i=e("fbjs/lib/warning"),a=r.isUnitlessNumber,s={};t.exports=o}).call(this,e("rH1JPG"))},{"./CSSProperty":34,"fbjs/lib/warning":27,rH1JPG:29}],132:[function(e,t,n){function o(e){var t=""+e,n=i.exec(t);if(!n)return t;var o,r="",a=0,s=0;for(a=n.index;a<t.length;a++){switch(t.charCodeAt(a)){case 34:o="&quot;";break;case 38:o="&amp;";break;case 39:o="&#x27;";break;case 60:o="&lt;";break;case 62:o="&gt;";break;default:continue}s!==a&&(r+=t.substring(s,a)),s=a+1,r+=o}return s!==a?r+t.substring(s,a):r}function r(e){return"boolean"==typeof e||"number"==typeof e?""+e:o(e)}var i=/["'&<>]/;t.exports=r},{}],133:[function(e,t,n){(function(n){function o(e){if("production"!==n.env.NODE_ENV){var t=i.current;null!==t&&("production"!==n.env.NODE_ENV?l(t._warnedAboutRefsInRender,"%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.",t.getName()||"A component"):void 0,t._warnedAboutRefsInRender=!0)}if(null==e)return null;if(1===e.nodeType)return e;var o=s.get(e);return o?(o=c(o),o?a.getNodeFromInstance(o):null):void("function"==typeof e.render?"production"!==n.env.NODE_ENV?u(!1,"findDOMNode was called on an unmounted component."):r("44"):"production"!==n.env.NODE_ENV?u(!1,"Element appears to be neither ReactComponent nor DOMNode (keys: %s)",Object.keys(e)):r("45",Object.keys(e)));
}var r=e("./reactProdInvariant"),i=e("react/lib/ReactCurrentOwner"),a=e("./ReactDOMComponentTree"),s=e("./ReactInstanceMap"),c=e("./getHostComponentFromComposite"),u=e("fbjs/lib/invariant"),l=e("fbjs/lib/warning");t.exports=o}).call(this,e("rH1JPG"))},{"./ReactDOMComponentTree":63,"./ReactInstanceMap":91,"./getHostComponentFromComposite":140,"./reactProdInvariant":150,"fbjs/lib/invariant":20,"fbjs/lib/warning":27,rH1JPG:29,"react/lib/ReactCurrentOwner":165}],134:[function(e,t,n){(function(n){function o(t,o,r,s){if(t&&"object"===("undefined"==typeof t?"undefined":_typeof(t))){var u=t,l=void 0===u[r];"production"!==n.env.NODE_ENV&&(i||(i=e("react/lib/ReactComponentTreeHook")),l||("production"!==n.env.NODE_ENV?c(!1,"flattenChildren(...): Encountered two children with the same key, `%s`. Child keys must be unique; when two children share a key, only the first child will be used.%s",a.unescape(r),i.getStackAddendumByID(s)):void 0)),l&&null!=o&&(u[r]=o)}}function r(e,t){if(null==e)return e;var r={};return"production"!==n.env.NODE_ENV?s(e,function(e,n,r){return o(e,n,r,t)},r):s(e,o,r),r}var i,a=e("./KeyEscapeUtils"),s=e("./traverseAllChildren"),c=e("fbjs/lib/warning");"undefined"!=typeof n&&n.env&&"test"===n.env.NODE_ENV&&(i=e("react/lib/ReactComponentTreeHook")),t.exports=r}).call(this,e("rH1JPG"))},{"./KeyEscapeUtils":52,"./traverseAllChildren":155,"fbjs/lib/warning":27,rH1JPG:29,"react/lib/ReactComponentTreeHook":164}],135:[function(e,t,n){function o(e,t,n){Array.isArray(e)?e.forEach(t,n):e&&t.call(n,e)}t.exports=o},{}],136:[function(e,t,n){function o(e){var t,n=e.keyCode;return"charCode"in e?(t=e.charCode,0===t&&13===n&&(t=13)):t=n,t>=32||13===t?t:0}t.exports=o},{}],137:[function(e,t,n){function o(e){if(e.key){var t=i[e.key]||e.key;if("Unidentified"!==t)return t}if("keypress"===e.type){var n=r(e);return 13===n?"Enter":String.fromCharCode(n)}return"keydown"===e.type||"keyup"===e.type?a[e.keyCode]||"Unidentified":""}var r=e("./getEventCharCode"),i={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},a={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"};t.exports=o},{"./getEventCharCode":136}],138:[function(e,t,n){function o(e){var t=this,n=t.nativeEvent;if(n.getModifierState)return n.getModifierState(e);var o=i[e];return!!o&&!!n[o]}function r(e){return o}var i={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};t.exports=r},{}],139:[function(e,t,n){function o(e){var t=e.target||e.srcElement||window;return t.correspondingUseElement&&(t=t.correspondingUseElement),3===t.nodeType?t.parentNode:t}t.exports=o},{}],140:[function(e,t,n){function o(e){for(var t;(t=e._renderedNodeType)===r.COMPOSITE;)e=e._renderedComponent;return t===r.HOST?e._renderedComponent:t===r.EMPTY?null:void 0}var r=e("./ReactNodeTypes");t.exports=o},{"./ReactNodeTypes":97}],141:[function(e,t,n){function o(e){var t=e&&(r&&e[r]||e[i]);if("function"==typeof t)return t}var r="function"==typeof Symbol&&Symbol.iterator,i="@@iterator";t.exports=o},{}],142:[function(e,t,n){function o(){return r++}var r=1;t.exports=o},{}],143:[function(e,t,n){function o(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function r(e){for(;e;){if(e.nextSibling)return e.nextSibling;e=e.parentNode}}function i(e,t){for(var n=o(e),i=0,a=0;n;){if(3===n.nodeType){if(a=i+n.textContent.length,i<=t&&a>=t)return{node:n,offset:t-i};i=a}n=o(r(n))}}t.exports=i},{}],144:[function(e,t,n){function o(){return!i&&r.canUseDOM&&(i="textContent"in document.documentElement?"textContent":"innerText"),i}var r=e("fbjs/lib/ExecutionEnvironment"),i=null;t.exports=o},{"fbjs/lib/ExecutionEnvironment":6}],145:[function(e,t,n){function o(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n["ms"+e]="MS"+t,n["O"+e]="o"+t.toLowerCase(),n}function r(e){if(s[e])return s[e];if(!a[e])return e;var t=a[e];for(var n in t)if(t.hasOwnProperty(n)&&n in c)return s[e]=t[n];return""}var i=e("fbjs/lib/ExecutionEnvironment"),a={animationend:o("Animation","AnimationEnd"),animationiteration:o("Animation","AnimationIteration"),animationstart:o("Animation","AnimationStart"),transitionend:o("Transition","TransitionEnd")},s={},c={};i.canUseDOM&&(c=document.createElement("div").style,"AnimationEvent"in window||(delete a.animationend.animation,delete a.animationiteration.animation,delete a.animationstart.animation),"TransitionEvent"in window||delete a.transitionend.transition),t.exports=r},{"fbjs/lib/ExecutionEnvironment":6}],146:[function(e,t,n){(function(n){function o(e){if(e){var t=e.getName();if(t)return" Check the render method of `"+t+"`."}return""}function r(e){return"function"==typeof e&&"undefined"!=typeof e.prototype&&"function"==typeof e.prototype.mountComponent&&"function"==typeof e.prototype.receiveComponent}function i(e,t){var s;if(null===e||e===!1)s=u.create(i);else if("object"===("undefined"==typeof e?"undefined":_typeof(e))){var c=e;!c||"function"!=typeof c.type&&"string"!=typeof c.type?"production"!==n.env.NODE_ENV?d(!1,"Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",null==c.type?c.type:_typeof(c.type),o(c._owner)):a("130",null==c.type?c.type:_typeof(c.type),o(c._owner)):void 0,"string"==typeof c.type?s=l.createInternalComponent(c):r(c.type)?(s=new c.type(c),s.getHostNode||(s.getHostNode=s.getNativeNode)):s=new v(c)}else"string"==typeof e||"number"==typeof e?s=l.createInstanceForText(e):"production"!==n.env.NODE_ENV?d(!1,"Encountered invalid React node of type %s","undefined"==typeof e?"undefined":_typeof(e)):a("131","undefined"==typeof e?"undefined":_typeof(e));return"production"!==n.env.NODE_ENV&&("production"!==n.env.NODE_ENV?f("function"==typeof s.mountComponent&&"function"==typeof s.receiveComponent&&"function"==typeof s.getHostNode&&"function"==typeof s.unmountComponent,"Only React Components can be mounted."):void 0),s._mountIndex=0,s._mountImage=null,"production"!==n.env.NODE_ENV&&(s._debugID=t?p():0),"production"!==n.env.NODE_ENV&&Object.preventExtensions&&Object.preventExtensions(s),s}var a=e("./reactProdInvariant"),s=e("object-assign"),c=e("./ReactCompositeComponent"),u=e("./ReactEmptyComponent"),l=e("./ReactHostComponent"),p=e("./getNextDebugID"),d=e("fbjs/lib/invariant"),f=e("fbjs/lib/warning"),v=function(e){this.construct(e)};s(v.prototype,c,{_instantiateReactComponent:i}),t.exports=i}).call(this,e("rH1JPG"))},{"./ReactCompositeComponent":59,"./ReactEmptyComponent":82,"./ReactHostComponent":87,"./getNextDebugID":142,"./reactProdInvariant":150,"fbjs/lib/invariant":20,"fbjs/lib/warning":27,"object-assign":28,rH1JPG:29}],147:[function(e,t,n){function o(e,t){if(!i.canUseDOM||t&&!("addEventListener"in document))return!1;var n="on"+e,o=n in document;if(!o){var a=document.createElement("div");a.setAttribute(n,"return;"),o="function"==typeof a[n]}return!o&&r&&"wheel"===e&&(o=document.implementation.hasFeature("Events.wheel","3.0")),o}var r,i=e("fbjs/lib/ExecutionEnvironment");i.canUseDOM&&(r=document.implementation&&document.implementation.hasFeature&&document.implementation.hasFeature("","")!==!0),t.exports=o},{"fbjs/lib/ExecutionEnvironment":6}],148:[function(e,t,n){function o(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return"input"===t?!!r[e.type]:"textarea"===t}var r={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};t.exports=o},{}],149:[function(e,t,n){function o(e){return'"'+r(e)+'"'}var r=e("./escapeTextContentForBrowser");t.exports=o},{"./escapeTextContentForBrowser":132}],150:[function(e,t,n){function o(e){for(var t=arguments.length-1,n="Minified React error #"+e+"; visit http://facebook.github.io/react/docs/error-decoder.html?invariant="+e,o=0;o<t;o++)n+="&args[]="+encodeURIComponent(arguments[o+1]);n+=" for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";var r=new Error(n);throw r.name="Invariant Violation",r.framesToPop=1,r}t.exports=o},{}],151:[function(e,t,n){var o=e("./ReactMount");t.exports=o.renderSubtreeIntoContainer},{"./ReactMount":95}],152:[function(e,t,n){var o,r=e("fbjs/lib/ExecutionEnvironment"),i=e("./DOMNamespaces"),a=/^[ \r\n\t\f]/,s=/<(!--|link|noscript|meta|script|style)[ \r\n\t\f\/>]/,c=e("./createMicrosoftUnsafeLocalFunction"),u=c(function(e,t){if(e.namespaceURI!==i.svg||"innerHTML"in e)e.innerHTML=t;else{o=o||document.createElement("div"),o.innerHTML="<svg>"+t+"</svg>";for(var n=o.firstChild;n.firstChild;)e.appendChild(n.firstChild)}});if(r.canUseDOM){var l=document.createElement("div");l.innerHTML=" ",""===l.innerHTML&&(u=function(e,t){if(e.parentNode&&e.parentNode.replaceChild(e,e),a.test(t)||"<"===t[0]&&s.test(t)){e.innerHTML=String.fromCharCode(65279)+t;var n=e.firstChild;1===n.data.length?e.removeChild(n):n.deleteData(0,1)}else e.innerHTML=t}),l=null}t.exports=u},{"./DOMNamespaces":40,"./createMicrosoftUnsafeLocalFunction":130,"fbjs/lib/ExecutionEnvironment":6}],153:[function(e,t,n){var o=e("fbjs/lib/ExecutionEnvironment"),r=e("./escapeTextContentForBrowser"),i=e("./setInnerHTML"),a=function(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&3===n.nodeType)return void(n.nodeValue=t)}e.textContent=t};o.canUseDOM&&("textContent"in document.documentElement||(a=function(e,t){return 3===e.nodeType?void(e.nodeValue=t):void i(e,r(t))})),t.exports=a},{"./escapeTextContentForBrowser":132,"./setInnerHTML":152,"fbjs/lib/ExecutionEnvironment":6}],154:[function(e,t,n){function o(e,t){var n=null===e||e===!1,o=null===t||t===!1;if(n||o)return n===o;var r="undefined"==typeof e?"undefined":_typeof(e),i="undefined"==typeof t?"undefined":_typeof(t);return"string"===r||"number"===r?"string"===i||"number"===i:"object"===i&&e.type===t.type&&e.key===t.key}t.exports=o},{}],155:[function(e,t,n){(function(n){function o(e,t){return e&&"object"===("undefined"==typeof e?"undefined":_typeof(e))&&null!=e.key?p.escape(e.key):t.toString(36)}function r(e,t,i,m){var g="undefined"==typeof e?"undefined":_typeof(e);if("undefined"!==g&&"boolean"!==g||(e=null),null===e||"string"===g||"number"===g||"object"===g&&e.$$typeof===c)return i(m,e,""===t?f+o(e,0):t),1;var y,b,E=0,_=""===t?f:t+v;if(Array.isArray(e))for(var N=0;N<e.length;N++)y=e[N],b=_+o(y,N),E+=r(y,b,i,m);else{var C=u(e);if(C){var O,D=C.call(e);if(C!==e.entries)for(var w=0;!(O=D.next()).done;)y=O.value,b=_+o(y,w++),E+=r(y,b,i,m);else{if("production"!==n.env.NODE_ENV){var R="";if(s.current){var P=s.current.getName();P&&(R=" Check the render method of `"+P+"`.")}"production"!==n.env.NODE_ENV?d(h,"Using Maps as children is not yet fully supported. It is an experimental feature that might be removed. Convert it to a sequence / iterable of keyed ReactElements instead.%s",R):void 0,h=!0}for(;!(O=D.next()).done;){var T=O.value;T&&(y=T[1],b=_+p.escape(T[0])+v+o(y,0),E+=r(y,b,i,m))}}}else if("object"===g){var I="";if("production"!==n.env.NODE_ENV&&(I=" If you meant to render a collection of children, use an array instead or wrap the object using createFragment(object) from the React add-ons.",e._isReactElement&&(I=" It looks like you're using an element created by a different version of React. Make sure to use only one copy of React."),s.current)){var x=s.current.getName();x&&(I+=" Check the render method of `"+x+"`.")}var k=String(e);"production"!==n.env.NODE_ENV?l(!1,"Objects are not valid as a React child (found: %s).%s","[object Object]"===k?"object with keys {"+Object.keys(e).join(", ")+"}":k,I):a("31","[object Object]"===k?"object with keys {"+Object.keys(e).join(", ")+"}":k,I)}}return E}function i(e,t,n){return null==e?0:r(e,"",t,n)}var a=e("./reactProdInvariant"),s=e("react/lib/ReactCurrentOwner"),c=e("./ReactElementSymbol"),u=e("./getIteratorFn"),l=e("fbjs/lib/invariant"),p=e("./KeyEscapeUtils"),d=e("fbjs/lib/warning"),f=".",v=":",h=!1;t.exports=i}).call(this,e("rH1JPG"))},{"./KeyEscapeUtils":52,"./ReactElementSymbol":81,"./getIteratorFn":141,"./reactProdInvariant":150,"fbjs/lib/invariant":20,"fbjs/lib/warning":27,rH1JPG:29,"react/lib/ReactCurrentOwner":165}],156:[function(e,t,n){(function(n){var o=e("object-assign"),r=e("fbjs/lib/emptyFunction"),i=e("fbjs/lib/warning"),a=r;if("production"!==n.env.NODE_ENV){var s=["address","applet","area","article","aside","base","basefont","bgsound","blockquote","body","br","button","caption","center","col","colgroup","dd","details","dir","div","dl","dt","embed","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","iframe","img","input","isindex","li","link","listing","main","marquee","menu","menuitem","meta","nav","noembed","noframes","noscript","object","ol","p","param","plaintext","pre","script","section","select","source","style","summary","table","tbody","td","template","textarea","tfoot","th","thead","title","tr","track","ul","wbr","xmp"],c=["applet","caption","html","table","td","th","marquee","object","template","foreignObject","desc","title"],u=c.concat(["button"]),l=["dd","dt","li","option","optgroup","p","rp","rt"],p={current:null,formTag:null,aTagInScope:null,buttonTagInScope:null,nobrTagInScope:null,pTagInButtonScope:null,listItemTagAutoclosing:null,dlItemTagAutoclosing:null},d=function(e,t,n){var r=o({},e||p),i={tag:t,instance:n};return c.indexOf(t)!==-1&&(r.aTagInScope=null,r.buttonTagInScope=null,r.nobrTagInScope=null),u.indexOf(t)!==-1&&(r.pTagInButtonScope=null),s.indexOf(t)!==-1&&"address"!==t&&"div"!==t&&"p"!==t&&(r.listItemTagAutoclosing=null,r.dlItemTagAutoclosing=null),r.current=i,"form"===t&&(r.formTag=i),"a"===t&&(r.aTagInScope=i),"button"===t&&(r.buttonTagInScope=i),"nobr"===t&&(r.nobrTagInScope=i),"p"===t&&(r.pTagInButtonScope=i),"li"===t&&(r.listItemTagAutoclosing=i),"dd"!==t&&"dt"!==t||(r.dlItemTagAutoclosing=i),r},f=function(e,t){switch(t){case"select":return"option"===e||"optgroup"===e||"#text"===e;case"optgroup":return"option"===e||"#text"===e;case"option":return"#text"===e;case"tr":return"th"===e||"td"===e||"style"===e||"script"===e||"template"===e;case"tbody":case"thead":case"tfoot":return"tr"===e||"style"===e||"script"===e||"template"===e;case"colgroup":return"col"===e||"template"===e;case"table":return"caption"===e||"colgroup"===e||"tbody"===e||"tfoot"===e||"thead"===e||"style"===e||"script"===e||"template"===e;case"head":return"base"===e||"basefont"===e||"bgsound"===e||"link"===e||"meta"===e||"title"===e||"noscript"===e||"noframes"===e||"style"===e||"script"===e||"template"===e;case"html":return"head"===e||"body"===e;case"#document":return"html"===e}switch(e){case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":return"h1"!==t&&"h2"!==t&&"h3"!==t&&"h4"!==t&&"h5"!==t&&"h6"!==t;case"rp":case"rt":return l.indexOf(t)===-1;case"body":case"caption":case"col":case"colgroup":case"frame":case"head":case"html":case"tbody":case"td":case"tfoot":case"th":case"thead":case"tr":return null==t}return!0},v=function(e,t){switch(e){case"address":case"article":case"aside":case"blockquote":case"center":case"details":case"dialog":case"dir":case"div":case"dl":case"fieldset":case"figcaption":case"figure":case"footer":case"header":case"hgroup":case"main":case"menu":case"nav":case"ol":case"p":case"section":case"summary":case"ul":case"pre":case"listing":case"table":case"hr":case"xmp":case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":return t.pTagInButtonScope;case"form":return t.formTag||t.pTagInButtonScope;case"li":return t.listItemTagAutoclosing;case"dd":case"dt":return t.dlItemTagAutoclosing;case"button":return t.buttonTagInScope;case"a":return t.aTagInScope;case"nobr":return t.nobrTagInScope}return null},h=function(e){if(!e)return[];var t=[];do t.push(e);while(e=e._currentElement._owner);return t.reverse(),t},m={};a=function(e,t,o,r){r=r||p;var a=r.current,s=a&&a.tag;null!=t&&("production"!==n.env.NODE_ENV?i(null==e,"validateDOMNesting: when childText is passed, childTag should be null"):void 0,e="#text");var c=f(e,s)?null:a,u=c?null:v(e,r),l=c||u;if(l){var d,g=l.tag,y=l.instance,b=o&&o._currentElement._owner,E=y&&y._currentElement._owner,_=h(b),N=h(E),C=Math.min(_.length,N.length),O=-1;for(d=0;d<C&&_[d]===N[d];d++)O=d;var D="(unknown)",w=_.slice(O+1).map(function(e){return e.getName()||D}),R=N.slice(O+1).map(function(e){return e.getName()||D}),P=[].concat(O!==-1?_[O].getName()||D:[],R,g,u?["..."]:[],w,e).join(" > "),T=!!c+"|"+e+"|"+g+"|"+P;if(m[T])return;m[T]=!0;var I=e,x="";if("#text"===e?/\S/.test(t)?I="Text nodes":(I="Whitespace text nodes",x=" Make sure you don't have any extra whitespace between tags on each line of your source code."):I="<"+e+">",c){var k="";"table"===g&&"tr"===e&&(k+=" Add a <tbody> to your code to match the DOM tree generated by the browser."),"production"!==n.env.NODE_ENV?i(!1,"validateDOMNesting(...): %s cannot appear as a child of <%s>.%s See %s.%s",I,g,x,P,k):void 0}else"production"!==n.env.NODE_ENV?i(!1,"validateDOMNesting(...): %s cannot appear as a descendant of <%s>. See %s.",I,g,P):void 0}},a.updatedAncestorInfo=d,a.isTagValidInContext=function(e,t){t=t||p;var n=t.current,o=n&&n.tag;return f(e,o)&&!v(e,t)}}t.exports=a}).call(this,e("rH1JPG"))},{"fbjs/lib/emptyFunction":12,"fbjs/lib/warning":27,"object-assign":28,rH1JPG:29}],157:[function(e,t,n){function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":_typeof(t))&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":_typeof(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(n,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),c=e("react"),u=o(c),l=e("classnames"),p=o(l),d=function(e){function t(e){r(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return n.state={value:e.value},n}return a(t,e),s(t,[{key:"componentWillReceiveProps",value:function(e){var t=e.value;null!=t&&t!==this.state.value&&this.setState({value:t})}},{key:"onChange",value:function(e){var t=this.props.editing;t&&this.setState({value:e})}},{key:"onStarClick",value:function e(t,n,o){var r=this.props,e=r.onStarClick,i=r.editing;i&&e&&e(t,n,o)}},{key:"renderStars",value:function(){for(var e=this.props,t=e.name,n=e.starCount,o=e.starColor,r=e.emptyStarColor,i=e.editing,a=this.state.value,s=function(e,t){return{float:"right",cursor:i?"pointer":"default",color:t>=e?o:r}},c={display:"none",position:"absolute",marginLeft:-9999},l=[],p=n;p>0;p--){var d=t+"_"+p,f=u.default.createElement("input",{key:"input_"+d,style:c,className:"dv-star-rating-input",type:"radio",name:t,id:d,value:p,checked:a===p,onChange:this.onChange.bind(this,p,t)}),v=u.default.createElement("label",{key:"label_"+d,style:s(p,a),className:"dv-star-rating-star",htmlFor:d,onClick:this.onStarClick.bind(this,p,a,t)},this.renderIcon(p,a,t));l.push(f),l.push(v)}return l}},{key:"renderIcon",value:function(e,t,n){var o=this.props,r=o.renderStarIcon,i=o.renderStarIconHalf;return"function"==typeof i&&Math.floor(t)===e&&t%1!==0?i(e,t,n):"function"==typeof r?r(e,t,n):u.default.createElement("i",{style:{fontStyle:"normal"}},"★")}},{key:"render",value:function(){var e=this.props,t=e.editing,n=e.className,o=(0,p.default)("dv-star-rating",{"dv-star-rating-non-editable":!t},n);return u.default.createElement("div",{style:{display:"inline-block",position:"relative"},className:o},this.renderStars())}}]),t}(c.Component);d.propTypes={name:c.PropTypes.string.isRequired,value:c.PropTypes.number,editing:c.PropTypes.bool,starCount:c.PropTypes.number,starColor:c.PropTypes.string,onStarClick:c.PropTypes.func,renderStarIcon:c.PropTypes.func,renderStarIconHalf:c.PropTypes.func},d.defaultProps={starCount:5,value:0,editing:!0,starColor:"#ffb400",emptyStarColor:"#333"},n.default=d,t.exports=n.default},{classnames:4,react:182}],158:[function(e,t,n){t.exports=e(52)},{}],159:[function(e,t,n){t.exports=e(54)},{"./reactProdInvariant":180,"fbjs/lib/invariant":20,rH1JPG:29}],160:[function(e,t,n){(function(n){var o=e("object-assign"),r=e("./ReactChildren"),i=e("./ReactComponent"),a=e("./ReactPureComponent"),s=e("./ReactClass"),c=e("./ReactDOMFactories"),u=e("./ReactElement"),l=e("./ReactPropTypes"),p=e("./ReactVersion"),d=e("./onlyChild"),f=e("fbjs/lib/warning"),v=u.createElement,h=u.createFactory,m=u.cloneElement;if("production"!==n.env.NODE_ENV){var g=e("./ReactElementValidator");v=g.createElement,h=g.createFactory,m=g.cloneElement}var y=o;if("production"!==n.env.NODE_ENV){var b=!1;y=function(){return"production"!==n.env.NODE_ENV?f(b,"React.__spread is deprecated and should not be used. Use Object.assign directly or another helper function with similar semantics. You may be seeing this warning due to your compiler. See https://fb.me/react-spread-deprecation for more details."):void 0,b=!0,o.apply(null,arguments)}}var E={Children:{map:r.map,forEach:r.forEach,count:r.count,toArray:r.toArray,only:d},Component:i,PureComponent:a,createElement:v,cloneElement:m,isValidElement:u.isValidElement,PropTypes:l,createClass:s.createClass,createFactory:h,createMixin:function(e){return e},DOM:c,version:p,__spread:y};t.exports=E}).call(this,e("rH1JPG"))},{"./ReactChildren":161,"./ReactClass":162,"./ReactComponent":163,"./ReactDOMFactories":166,"./ReactElement":167,"./ReactElementValidator":169,"./ReactPropTypes":172,"./ReactPureComponent":174,"./ReactVersion":175,"./onlyChild":179,"fbjs/lib/warning":27,"object-assign":28,rH1JPG:29}],161:[function(e,t,n){function o(e){return(""+e).replace(E,"$&/")}function r(e,t){this.func=e,this.context=t,this.count=0}function i(e,t,n){var o=e.func,r=e.context;o.call(r,t,e.count++)}function a(e,t,n){if(null==e)return e;var o=r.getPooled(t,n);g(e,i,o),r.release(o)}function s(e,t,n,o){this.result=e,this.keyPrefix=t,this.func=n,this.context=o,this.count=0}function c(e,t,n){var r=e.result,i=e.keyPrefix,a=e.func,s=e.context,c=a.call(s,t,e.count++);Array.isArray(c)?u(c,r,n,m.thatReturnsArgument):null!=c&&(h.isValidElement(c)&&(c=h.cloneAndReplaceKey(c,i+(!c.key||t&&t.key===c.key?"":o(c.key)+"/")+n)),r.push(c))}function u(e,t,n,r,i){var a="";null!=n&&(a=o(n)+"/");var u=s.getPooled(t,a,r,i);g(e,c,u),s.release(u)}function l(e,t,n){if(null==e)return e;var o=[];return u(e,o,null,t,n),o}function p(e,t,n){return null}function d(e,t){return g(e,p,null)}function f(e){var t=[];return u(e,t,null,m.thatReturnsArgument),t}var v=e("./PooledClass"),h=e("./ReactElement"),m=e("fbjs/lib/emptyFunction"),g=e("./traverseAllChildren"),y=v.twoArgumentPooler,b=v.fourArgumentPooler,E=/\/+/g;r.prototype.destructor=function(){this.func=null,this.context=null,this.count=0},v.addPoolingTo(r,y),s.prototype.destructor=function(){this.result=null,this.keyPrefix=null,this.func=null,this.context=null,this.count=0},v.addPoolingTo(s,b);var _={forEach:a,map:l,mapIntoWithKeyPrefixInternal:u,count:d,toArray:f};t.exports=_},{"./PooledClass":159,"./ReactElement":167,"./traverseAllChildren":181,"fbjs/lib/emptyFunction":12}],162:[function(e,t,n){(function(n){function o(e){return e}function r(e,t,o){for(var r in t)t.hasOwnProperty(r)&&("production"!==n.env.NODE_ENV?_("function"==typeof t[r],"%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.",e.displayName||"ReactClass",g[o],r):void 0)}function i(e,t){var o=O.hasOwnProperty(t)?O[t]:null;w.hasOwnProperty(t)&&("OVERRIDE_BASE"!==o?"production"!==n.env.NODE_ENV?E(!1,"ReactClassInterface: You are attempting to override `%s` from your class specification. Ensure that your method names do not overlap with React methods.",t):f("73",t):void 0),e&&("DEFINE_MANY"!==o&&"DEFINE_MANY_MERGED"!==o?"production"!==n.env.NODE_ENV?E(!1,"ReactClassInterface: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.",t):f("74",t):void 0)}function a(e,t){if(t){"function"==typeof t?"production"!==n.env.NODE_ENV?E(!1,"ReactClass: You're attempting to use a component class or function as a mixin. Instead, just use a regular object."):f("75"):void 0,m.isValidElement(t)?"production"!==n.env.NODE_ENV?E(!1,"ReactClass: You're attempting to use a component as a mixin. Instead, just use a regular object."):f("76"):void 0;var o=e.prototype,r=o.__reactAutoBindPairs;t.hasOwnProperty(N)&&D.mixins(e,t.mixins);for(var a in t)if(t.hasOwnProperty(a)&&a!==N){var s=t[a],c=o.hasOwnProperty(a);if(i(c,a),D.hasOwnProperty(a))D[a](e,s);else{var p=O.hasOwnProperty(a),d="function"==typeof s,v=d&&!p&&!c&&t.autobind!==!1;if(v)r.push(a,s),o[a]=s;else if(c){var h=O[a];!p||"DEFINE_MANY_MERGED"!==h&&"DEFINE_MANY"!==h?"production"!==n.env.NODE_ENV?E(!1,"ReactClass: Unexpected spec policy %s for key %s when mixing in component specs.",h,a):f("77",h,a):void 0,"DEFINE_MANY_MERGED"===h?o[a]=u(o[a],s):"DEFINE_MANY"===h&&(o[a]=l(o[a],s))}else o[a]=s,"production"!==n.env.NODE_ENV&&"function"==typeof s&&t.displayName&&(o[a].displayName=t.displayName+"_"+a)}}}else if("production"!==n.env.NODE_ENV){var g="undefined"==typeof t?"undefined":_typeof(t),y="object"===g&&null!==t;"production"!==n.env.NODE_ENV?_(y,"%s: You're attempting to include a mixin that is either null or not an object. Check the mixins included by the component, as well as any mixins they include themselves. Expected object but got %s.",e.displayName||"ReactClass",null===t?null:g):void 0}}function s(e,t){if(t)for(var o in t){var r=t[o];if(t.hasOwnProperty(o)){var i=o in D;i?"production"!==n.env.NODE_ENV?E(!1,'ReactClass: You are attempting to define a reserved property, `%s`, that shouldn\'t be on the "statics" key. Define it as an instance property instead; it will still be accessible on the constructor.',o):f("78",o):void 0;var a=o in e;a?"production"!==n.env.NODE_ENV?E(!1,"ReactClass: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.",o):f("79",o):void 0,e[o]=r}}}function c(e,t){e&&t&&"object"===("undefined"==typeof e?"undefined":_typeof(e))&&"object"===("undefined"==typeof t?"undefined":_typeof(t))?void 0:"production"!==n.env.NODE_ENV?E(!1,"mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects."):f("80");for(var o in t)t.hasOwnProperty(o)&&(void 0!==e[o]?"production"!==n.env.NODE_ENV?E(!1,"mergeIntoWithNoDuplicateKeys(): Tried to merge two objects with the same key: `%s`. This conflict may be due to a mixin; in particular, this may be caused by two getInitialState() or getDefaultProps() methods returning objects with clashing keys.",o):f("81",o):void 0,e[o]=t[o]);return e}function u(e,t){return function(){var n=e.apply(this,arguments),o=t.apply(this,arguments);if(null==n)return o;if(null==o)return n;var r={};return c(r,n),c(r,o),r}}function l(e,t){return function(){e.apply(this,arguments),t.apply(this,arguments)}}function p(e,t){var o=t.bind(e);if("production"!==n.env.NODE_ENV){o.__reactBoundContext=e,o.__reactBoundMethod=t,o.__reactBoundArguments=null;var r=e.constructor.displayName,i=o.bind;o.bind=function(a){for(var s=arguments.length,c=Array(s>1?s-1:0),u=1;u<s;u++)c[u-1]=arguments[u];if(a!==e&&null!==a)"production"!==n.env.NODE_ENV?_(!1,"bind(): React component methods may only be bound to the component instance. See %s",r):void 0;else if(!c.length)return"production"!==n.env.NODE_ENV?_(!1,"bind(): You are binding a component method to the component. React does this for you automatically in a high-performance way, so you can safely remove this call. See %s",r):void 0,o;var l=i.apply(o,arguments);return l.__reactBoundContext=e,l.__reactBoundMethod=t,l.__reactBoundArguments=c,l}}return o}function d(e){for(var t=e.__reactAutoBindPairs,n=0;n<t.length;n+=2){var o=t[n],r=t[n+1];e[o]=p(e,r)}}var f=e("./reactProdInvariant"),v=e("object-assign"),h=e("./ReactComponent"),m=e("./ReactElement"),g=e("./ReactPropTypeLocationNames"),y=e("./ReactNoopUpdateQueue"),b=e("fbjs/lib/emptyObject"),E=e("fbjs/lib/invariant"),_=e("fbjs/lib/warning"),N="mixins",C=[],O={mixins:"DEFINE_MANY",statics:"DEFINE_MANY",propTypes:"DEFINE_MANY",contextTypes:"DEFINE_MANY",childContextTypes:"DEFINE_MANY",getDefaultProps:"DEFINE_MANY_MERGED",getInitialState:"DEFINE_MANY_MERGED",getChildContext:"DEFINE_MANY_MERGED",render:"DEFINE_ONCE",componentWillMount:"DEFINE_MANY",componentDidMount:"DEFINE_MANY",componentWillReceiveProps:"DEFINE_MANY",shouldComponentUpdate:"DEFINE_ONCE",componentWillUpdate:"DEFINE_MANY",componentDidUpdate:"DEFINE_MANY",componentWillUnmount:"DEFINE_MANY",updateComponent:"OVERRIDE_BASE"},D={displayName:function(e,t){e.displayName=t},mixins:function(e,t){if(t)for(var n=0;n<t.length;n++)a(e,t[n])},childContextTypes:function(e,t){"production"!==n.env.NODE_ENV&&r(e,t,"childContext"),e.childContextTypes=v({},e.childContextTypes,t)},contextTypes:function(e,t){"production"!==n.env.NODE_ENV&&r(e,t,"context"),e.contextTypes=v({},e.contextTypes,t)},getDefaultProps:function(e,t){e.getDefaultProps?e.getDefaultProps=u(e.getDefaultProps,t):e.getDefaultProps=t},propTypes:function(e,t){"production"!==n.env.NODE_ENV&&r(e,t,"prop"),e.propTypes=v({},e.propTypes,t)},statics:function(e,t){s(e,t)},autobind:function(){}},w={replaceState:function(e,t){this.updater.enqueueReplaceState(this,e),t&&this.updater.enqueueCallback(this,t,"replaceState")},isMounted:function(){return this.updater.isMounted(this)}},R=function(){};v(R.prototype,h.prototype,w);var P={createClass:function(e){var t=o(function(e,o,r){"production"!==n.env.NODE_ENV&&("production"!==n.env.NODE_ENV?_(this instanceof t,"Something is calling a React component directly. Use a factory or JSX instead. See: https://fb.me/react-legacyfactory"):void 0),this.__reactAutoBindPairs.length&&d(this),this.props=e,this.context=o,this.refs=b,this.updater=r||y,this.state=null;var i=this.getInitialState?this.getInitialState():null;"production"!==n.env.NODE_ENV&&void 0===i&&this.getInitialState._isMockFunction&&(i=null),"object"!==("undefined"==typeof i?"undefined":_typeof(i))||Array.isArray(i)?"production"!==n.env.NODE_ENV?E(!1,"%s.getInitialState(): must return an object or null",t.displayName||"ReactCompositeComponent"):f("82",t.displayName||"ReactCompositeComponent"):void 0,this.state=i});t.prototype=new R,t.prototype.constructor=t,t.prototype.__reactAutoBindPairs=[],C.forEach(a.bind(null,t)),a(t,e),t.getDefaultProps&&(t.defaultProps=t.getDefaultProps()),"production"!==n.env.NODE_ENV&&(t.getDefaultProps&&(t.getDefaultProps.isReactClassApproved={}),t.prototype.getInitialState&&(t.prototype.getInitialState.isReactClassApproved={})),t.prototype.render?void 0:"production"!==n.env.NODE_ENV?E(!1,"createClass(...): Class specification must implement a `render` method."):f("83"),"production"!==n.env.NODE_ENV&&("production"!==n.env.NODE_ENV?_(!t.prototype.componentShouldUpdate,"%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.",e.displayName||"A component"):void 0,"production"!==n.env.NODE_ENV?_(!t.prototype.componentWillRecieveProps,"%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?",e.displayName||"A component"):void 0);
for(var r in O)t.prototype[r]||(t.prototype[r]=null);return t},injection:{injectMixin:function(e){C.push(e)}}};t.exports=P}).call(this,e("rH1JPG"))},{"./ReactComponent":163,"./ReactElement":167,"./ReactNoopUpdateQueue":170,"./ReactPropTypeLocationNames":171,"./reactProdInvariant":180,"fbjs/lib/emptyObject":13,"fbjs/lib/invariant":20,"fbjs/lib/warning":27,"object-assign":28,rH1JPG:29}],163:[function(e,t,n){(function(n){function o(e,t,n){this.props=e,this.context=t,this.refs=s,this.updater=n||i}var r=e("./reactProdInvariant"),i=e("./ReactNoopUpdateQueue"),a=e("./canDefineProperty"),s=e("fbjs/lib/emptyObject"),c=e("fbjs/lib/invariant"),u=e("fbjs/lib/warning");if(o.prototype.isReactComponent={},o.prototype.setState=function(e,t){"object"!==("undefined"==typeof e?"undefined":_typeof(e))&&"function"!=typeof e&&null!=e?"production"!==n.env.NODE_ENV?c(!1,"setState(...): takes an object of state variables to update or a function which returns an object of state variables."):r("85"):void 0,this.updater.enqueueSetState(this,e),t&&this.updater.enqueueCallback(this,t,"setState")},o.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this),e&&this.updater.enqueueCallback(this,e,"forceUpdate")},"production"!==n.env.NODE_ENV){var l={isMounted:["isMounted","Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],replaceState:["replaceState","Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]},p=function(e,t){a&&Object.defineProperty(o.prototype,e,{get:function(){"production"!==n.env.NODE_ENV?u(!1,"%s(...) is deprecated in plain JavaScript React classes. %s",t[0],t[1]):void 0}})};for(var d in l)l.hasOwnProperty(d)&&p(d,l[d])}t.exports=o}).call(this,e("rH1JPG"))},{"./ReactNoopUpdateQueue":170,"./canDefineProperty":176,"./reactProdInvariant":180,"fbjs/lib/emptyObject":13,"fbjs/lib/invariant":20,"fbjs/lib/warning":27,rH1JPG:29}],164:[function(e,t,n){(function(n){function o(e){var t=Function.prototype.toString,n=Object.prototype.hasOwnProperty,o=RegExp("^"+t.call(n).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");try{var r=t.call(e);return o.test(r)}catch(e){return!1}}function r(e){var t=u(e);if(t){var n=t.childIDs;l(e),n.forEach(r)}}function i(e,t,n){return"\n    in "+(e||"Unknown")+(t?" (at "+t.fileName.replace(/^.*[\\\/]/,"")+":"+t.lineNumber+")":n?" (created by "+n+")":"")}function a(e){return null==e?"#empty":"string"==typeof e||"number"==typeof e?"#text":"string"==typeof e.type?e.type:e.type.displayName||e.type.name||"Unknown"}function s(e){var t,o=R.getDisplayName(e),r=R.getElement(e),a=R.getOwnerID(e);return a&&(t=R.getDisplayName(a)),"production"!==n.env.NODE_ENV?y(r,"ReactComponentTreeHook: Missing React element for debugID %s when building stack",e):void 0,i(o,r&&r._source,t)}var c,u,l,p,d,f,v,h=e("./reactProdInvariant"),m=e("./ReactCurrentOwner"),g=e("fbjs/lib/invariant"),y=e("fbjs/lib/warning"),b="function"==typeof Array.from&&"function"==typeof Map&&o(Map)&&null!=Map.prototype&&"function"==typeof Map.prototype.keys&&o(Map.prototype.keys)&&"function"==typeof Set&&o(Set)&&null!=Set.prototype&&"function"==typeof Set.prototype.keys&&o(Set.prototype.keys);if(b){var E=new Map,_=new Set;c=function(e,t){E.set(e,t)},u=function(e){return E.get(e)},l=function(e){E.delete(e)},p=function(){return Array.from(E.keys())},d=function(e){_.add(e)},f=function(e){_.delete(e)},v=function(){return Array.from(_.keys())}}else{var N={},C={},O=function(e){return"."+e},D=function(e){return parseInt(e.substr(1),10)};c=function(e,t){var n=O(e);N[n]=t},u=function(e){var t=O(e);return N[t]},l=function(e){var t=O(e);delete N[t]},p=function(){return Object.keys(N).map(D)},d=function(e){var t=O(e);C[t]=!0},f=function(e){var t=O(e);delete C[t]},v=function(){return Object.keys(C).map(D)}}var w=[],R={onSetChildren:function(e,t){var o=u(e);o?void 0:"production"!==n.env.NODE_ENV?g(!1,"Item must have been set"):h("144"),o.childIDs=t;for(var r=0;r<t.length;r++){var i=t[r],a=u(i);a?void 0:"production"!==n.env.NODE_ENV?g(!1,"Expected hook events to fire for the child before its parent includes it in onSetChildren()."):h("140"),null==a.childIDs&&"object"===_typeof(a.element)&&null!=a.element?"production"!==n.env.NODE_ENV?g(!1,"Expected onSetChildren() to fire for a container child before its parent includes it in onSetChildren()."):h("141"):void 0,a.isMounted?void 0:"production"!==n.env.NODE_ENV?g(!1,"Expected onMountComponent() to fire for the child before its parent includes it in onSetChildren()."):h("71"),null==a.parentID&&(a.parentID=e),a.parentID!==e?"production"!==n.env.NODE_ENV?g(!1,"Expected onBeforeMountComponent() parent and onSetChildren() to be consistent (%s has parents %s and %s).",i,a.parentID,e):h("142",i,a.parentID,e):void 0}},onBeforeMountComponent:function(e,t,n){var o={element:t,parentID:n,text:null,childIDs:[],isMounted:!1,updateCount:0};c(e,o)},onBeforeUpdateComponent:function(e,t){var n=u(e);n&&n.isMounted&&(n.element=t)},onMountComponent:function(e){var t=u(e);t?void 0:"production"!==n.env.NODE_ENV?g(!1,"Item must have been set"):h("144"),t.isMounted=!0;var o=0===t.parentID;o&&d(e)},onUpdateComponent:function(e){var t=u(e);t&&t.isMounted&&t.updateCount++},onUnmountComponent:function(e){var t=u(e);if(t){t.isMounted=!1;var n=0===t.parentID;n&&f(e)}w.push(e)},purgeUnmountedComponents:function(){if(!R._preventPurging){for(var e=0;e<w.length;e++){var t=w[e];r(t)}w.length=0}},isMounted:function(e){var t=u(e);return!!t&&t.isMounted},getCurrentStackAddendum:function(e){var t="";if(e){var n=a(e),o=e._owner;t+=i(n,e._source,o&&o.getName())}var r=m.current,s=r&&r._debugID;return t+=R.getStackAddendumByID(s)},getStackAddendumByID:function(e){for(var t="";e;)t+=s(e),e=R.getParentID(e);return t},getChildIDs:function(e){var t=u(e);return t?t.childIDs:[]},getDisplayName:function(e){var t=R.getElement(e);return t?a(t):null},getElement:function(e){var t=u(e);return t?t.element:null},getOwnerID:function(e){var t=R.getElement(e);return t&&t._owner?t._owner._debugID:null},getParentID:function(e){var t=u(e);return t?t.parentID:null},getSource:function(e){var t=u(e),n=t?t.element:null,o=null!=n?n._source:null;return o},getText:function(e){var t=R.getElement(e);return"string"==typeof t?t:"number"==typeof t?""+t:null},getUpdateCount:function(e){var t=u(e);return t?t.updateCount:0},getRootIDs:v,getRegisteredIDs:p};t.exports=R}).call(this,e("rH1JPG"))},{"./ReactCurrentOwner":165,"./reactProdInvariant":180,"fbjs/lib/invariant":20,"fbjs/lib/warning":27,rH1JPG:29}],165:[function(e,t,n){var o={current:null};t.exports=o},{}],166:[function(e,t,n){(function(n){var o=e("./ReactElement"),r=o.createFactory;if("production"!==n.env.NODE_ENV){var i=e("./ReactElementValidator");r=i.createFactory}var a={a:r("a"),abbr:r("abbr"),address:r("address"),area:r("area"),article:r("article"),aside:r("aside"),audio:r("audio"),b:r("b"),base:r("base"),bdi:r("bdi"),bdo:r("bdo"),big:r("big"),blockquote:r("blockquote"),body:r("body"),br:r("br"),button:r("button"),canvas:r("canvas"),caption:r("caption"),cite:r("cite"),code:r("code"),col:r("col"),colgroup:r("colgroup"),data:r("data"),datalist:r("datalist"),dd:r("dd"),del:r("del"),details:r("details"),dfn:r("dfn"),dialog:r("dialog"),div:r("div"),dl:r("dl"),dt:r("dt"),em:r("em"),embed:r("embed"),fieldset:r("fieldset"),figcaption:r("figcaption"),figure:r("figure"),footer:r("footer"),form:r("form"),h1:r("h1"),h2:r("h2"),h3:r("h3"),h4:r("h4"),h5:r("h5"),h6:r("h6"),head:r("head"),header:r("header"),hgroup:r("hgroup"),hr:r("hr"),html:r("html"),i:r("i"),iframe:r("iframe"),img:r("img"),input:r("input"),ins:r("ins"),kbd:r("kbd"),keygen:r("keygen"),label:r("label"),legend:r("legend"),li:r("li"),link:r("link"),main:r("main"),map:r("map"),mark:r("mark"),menu:r("menu"),menuitem:r("menuitem"),meta:r("meta"),meter:r("meter"),nav:r("nav"),noscript:r("noscript"),object:r("object"),ol:r("ol"),optgroup:r("optgroup"),option:r("option"),output:r("output"),p:r("p"),param:r("param"),picture:r("picture"),pre:r("pre"),progress:r("progress"),q:r("q"),rp:r("rp"),rt:r("rt"),ruby:r("ruby"),s:r("s"),samp:r("samp"),script:r("script"),section:r("section"),select:r("select"),small:r("small"),source:r("source"),span:r("span"),strong:r("strong"),style:r("style"),sub:r("sub"),summary:r("summary"),sup:r("sup"),table:r("table"),tbody:r("tbody"),td:r("td"),textarea:r("textarea"),tfoot:r("tfoot"),th:r("th"),thead:r("thead"),time:r("time"),title:r("title"),tr:r("tr"),track:r("track"),u:r("u"),ul:r("ul"),var:r("var"),video:r("video"),wbr:r("wbr"),circle:r("circle"),clipPath:r("clipPath"),defs:r("defs"),ellipse:r("ellipse"),g:r("g"),image:r("image"),line:r("line"),linearGradient:r("linearGradient"),mask:r("mask"),path:r("path"),pattern:r("pattern"),polygon:r("polygon"),polyline:r("polyline"),radialGradient:r("radialGradient"),rect:r("rect"),stop:r("stop"),svg:r("svg"),text:r("text"),tspan:r("tspan")};t.exports=a}).call(this,e("rH1JPG"))},{"./ReactElement":167,"./ReactElementValidator":169,rH1JPG:29}],167:[function(e,t,n){(function(n){function o(e){if("production"!==n.env.NODE_ENV&&f.call(e,"ref")){var t=Object.getOwnPropertyDescriptor(e,"ref").get;if(t&&t.isReactWarning)return!1}return void 0!==e.ref}function r(e){if("production"!==n.env.NODE_ENV&&f.call(e,"key")){var t=Object.getOwnPropertyDescriptor(e,"key").get;if(t&&t.isReactWarning)return!1}return void 0!==e.key}function i(e,t){var o=function(){s||(s=!0,"production"!==n.env.NODE_ENV?p(!1,"%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://fb.me/react-special-props)",t):void 0)};o.isReactWarning=!0,Object.defineProperty(e,"key",{get:o,configurable:!0})}function a(e,t){var o=function(){c||(c=!0,"production"!==n.env.NODE_ENV?p(!1,"%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://fb.me/react-special-props)",t):void 0)};o.isReactWarning=!0,Object.defineProperty(e,"ref",{get:o,configurable:!0})}var s,c,u=e("object-assign"),l=e("./ReactCurrentOwner"),p=e("fbjs/lib/warning"),d=e("./canDefineProperty"),f=Object.prototype.hasOwnProperty,v=e("./ReactElementSymbol"),h={key:!0,ref:!0,__self:!0,__source:!0},m=function(e,t,o,r,i,a,s){var c={$$typeof:v,type:e,key:t,ref:o,props:s,_owner:a};return"production"!==n.env.NODE_ENV&&(c._store={},d?(Object.defineProperty(c._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:!1}),Object.defineProperty(c,"_self",{configurable:!1,enumerable:!1,writable:!1,value:r}),Object.defineProperty(c,"_source",{configurable:!1,enumerable:!1,writable:!1,value:i})):(c._store.validated=!1,c._self=r,c._source=i),Object.freeze&&(Object.freeze(c.props),Object.freeze(c))),c};m.createElement=function(e,t,s){var c,u={},p=null,d=null,g=null,y=null;if(null!=t){o(t)&&(d=t.ref),r(t)&&(p=""+t.key),g=void 0===t.__self?null:t.__self,y=void 0===t.__source?null:t.__source;for(c in t)f.call(t,c)&&!h.hasOwnProperty(c)&&(u[c]=t[c])}var b=arguments.length-2;if(1===b)u.children=s;else if(b>1){for(var E=Array(b),_=0;_<b;_++)E[_]=arguments[_+2];"production"!==n.env.NODE_ENV&&Object.freeze&&Object.freeze(E),u.children=E}if(e&&e.defaultProps){var N=e.defaultProps;for(c in N)void 0===u[c]&&(u[c]=N[c])}if("production"!==n.env.NODE_ENV&&(p||d)&&("undefined"==typeof u.$$typeof||u.$$typeof!==v)){var C="function"==typeof e?e.displayName||e.name||"Unknown":e;p&&i(u,C),d&&a(u,C)}return m(e,p,d,g,y,l.current,u)},m.createFactory=function(e){var t=m.createElement.bind(null,e);return t.type=e,t},m.cloneAndReplaceKey=function(e,t){var n=m(e.type,t,e.ref,e._self,e._source,e._owner,e.props);return n},m.cloneElement=function(e,t,n){var i,a=u({},e.props),s=e.key,c=e.ref,p=e._self,d=e._source,v=e._owner;if(null!=t){o(t)&&(c=t.ref,v=l.current),r(t)&&(s=""+t.key);var g;e.type&&e.type.defaultProps&&(g=e.type.defaultProps);for(i in t)f.call(t,i)&&!h.hasOwnProperty(i)&&(void 0===t[i]&&void 0!==g?a[i]=g[i]:a[i]=t[i])}var y=arguments.length-2;if(1===y)a.children=n;else if(y>1){for(var b=Array(y),E=0;E<y;E++)b[E]=arguments[E+2];a.children=b}return m(e.type,s,c,p,d,v,a)},m.isValidElement=function(e){return"object"===("undefined"==typeof e?"undefined":_typeof(e))&&null!==e&&e.$$typeof===v},t.exports=m}).call(this,e("rH1JPG"))},{"./ReactCurrentOwner":165,"./ReactElementSymbol":168,"./canDefineProperty":176,"fbjs/lib/warning":27,"object-assign":28,rH1JPG:29}],168:[function(e,t,n){t.exports=e(81)},{}],169:[function(e,t,n){(function(n){function o(){if(c.current){var e=c.current.getName();if(e)return" Check the render method of `"+e+"`."}return""}function r(e){var t=o();if(!t){var n="string"==typeof e?e:e.displayName||e.name;n&&(t=" Check the top-level render call using <"+n+">.")}return t}function i(e,t){if(e._store&&!e._store.validated&&null==e.key){e._store.validated=!0;var o=h.uniqueKey||(h.uniqueKey={}),i=r(t);if(!o[i]){o[i]=!0;var a="";e&&e._owner&&e._owner!==c.current&&(a=" It was passed a child from "+e._owner.getName()+"."),"production"!==n.env.NODE_ENV?v(!1,'Each child in an array or iterator should have a unique "key" prop.%s%s See https://fb.me/react-warning-keys for more information.%s',i,a,u.getCurrentStackAddendum(e)):void 0}}}function a(e,t){if("object"===("undefined"==typeof e?"undefined":_typeof(e)))if(Array.isArray(e))for(var n=0;n<e.length;n++){var o=e[n];l.isValidElement(o)&&i(o,t)}else if(l.isValidElement(e))e._store&&(e._store.validated=!0);else if(e){var r=f(e);if(r&&r!==e.entries)for(var a,s=r.call(e);!(a=s.next()).done;)l.isValidElement(a.value)&&i(a.value,t)}}function s(e){var t=e.type;if("function"==typeof t){var o=t.displayName||t.name;t.propTypes&&p(t.propTypes,e.props,"prop",o,e,null),"function"==typeof t.getDefaultProps&&("production"!==n.env.NODE_ENV?v(t.getDefaultProps.isReactClassApproved,"getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead."):void 0)}}var c=e("./ReactCurrentOwner"),u=e("./ReactComponentTreeHook"),l=e("./ReactElement"),p=e("./checkReactTypeSpec"),d=e("./canDefineProperty"),f=e("./getIteratorFn"),v=e("fbjs/lib/warning"),h={},m={createElement:function(e,t,r){var i="string"==typeof e||"function"==typeof e;i||("production"!==n.env.NODE_ENV?v(!1,"React.createElement: type should not be null, undefined, boolean, or number. It should be a string (for DOM elements) or a ReactClass (for composite components).%s",o()):void 0);var c=l.createElement.apply(this,arguments);if(null==c)return c;if(i)for(var u=2;u<arguments.length;u++)a(arguments[u],e);return s(c),c},createFactory:function(e){var t=m.createElement.bind(null,e);return t.type=e,"production"!==n.env.NODE_ENV&&d&&Object.defineProperty(t,"type",{enumerable:!1,get:function(){return"production"!==n.env.NODE_ENV?v(!1,"Factory.type is deprecated. Access the class directly before passing it to createFactory."):void 0,Object.defineProperty(this,"type",{value:e}),e}}),t},cloneElement:function(e,t,n){for(var o=l.cloneElement.apply(this,arguments),r=2;r<arguments.length;r++)a(arguments[r],o.type);return s(o),o}};t.exports=m}).call(this,e("rH1JPG"))},{"./ReactComponentTreeHook":164,"./ReactCurrentOwner":165,"./ReactElement":167,"./canDefineProperty":176,"./checkReactTypeSpec":177,"./getIteratorFn":178,"fbjs/lib/warning":27,rH1JPG:29}],170:[function(e,t,n){(function(n){function o(e,t){if("production"!==n.env.NODE_ENV){var o=e.constructor;"production"!==n.env.NODE_ENV?r(!1,"%s(...): Can only update a mounted or mounting component. This usually means you called %s() on an unmounted component. This is a no-op. Please check the code for the %s component.",t,t,o&&(o.displayName||o.name)||"ReactClass"):void 0}}var r=e("fbjs/lib/warning"),i={isMounted:function(e){return!1},enqueueCallback:function(e,t){},enqueueForceUpdate:function(e){o(e,"forceUpdate")},enqueueReplaceState:function(e,t){o(e,"replaceState")},enqueueSetState:function(e,t){o(e,"setState")}};t.exports=i}).call(this,e("rH1JPG"))},{"fbjs/lib/warning":27,rH1JPG:29}],171:[function(e,t,n){t.exports=e(99)},{rH1JPG:29}],172:[function(e,t,n){(function(n){function o(e,t){return e===t?0!==e||1/e===1/t:e!==e&&t!==t}function r(e){this.message=e,this.stack=""}function i(e){function t(t,i,a,s,c,u,l){if(s=s||R,u=u||a,"production"!==n.env.NODE_ENV&&l!==C&&"undefined"!=typeof console){var p=s+":"+a;o[p]||("production"!==n.env.NODE_ENV?w(!1,"You are manually calling a React.PropTypes validation function for the `%s` prop on `%s`. This is deprecated and will not work in production with the next major version. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.",u,s):void 0,o[p]=!0)}if(null==i[a]){var d=N[c];return t?new r(null===i[a]?"The "+d+" `"+u+"` is marked as required "+("in `"+s+"`, but its value is `null`."):"The "+d+" `"+u+"` is marked as required in "+("`"+s+"`, but its value is `undefined`.")):null}return e(i,a,s,c,u)}if("production"!==n.env.NODE_ENV)var o={};var i=t.bind(null,!1);return i.isRequired=t.bind(null,!0),i}function a(e){function t(t,n,o,i,a,s){var c=t[n],u=y(c);if(u!==e){var l=N[i],p=b(c);return new r("Invalid "+l+" `"+a+"` of type "+("`"+p+"` supplied to `"+o+"`, expected ")+("`"+e+"`."))}return null}return i(t)}function s(){return i(O.thatReturns(null))}function c(e){function t(t,n,o,i,a){if("function"!=typeof e)return new r("Property `"+a+"` of component `"+o+"` has invalid PropType notation inside arrayOf.");var s=t[n];if(!Array.isArray(s)){var c=N[i],u=y(s);return new r("Invalid "+c+" `"+a+"` of type "+("`"+u+"` supplied to `"+o+"`, expected an array."))}for(var l=0;l<s.length;l++){var p=e(s,l,o,i,a+"["+l+"]",C);if(p instanceof Error)return p}return null}return i(t)}function u(){function e(e,t,n,o,i){var a=e[t];if(!_.isValidElement(a)){var s=N[o],c=y(a);return new r("Invalid "+s+" `"+i+"` of type "+("`"+c+"` supplied to `"+n+"`, expected a single ReactElement."))}return null}return i(e)}function l(e){function t(t,n,o,i,a){if(!(t[n]instanceof e)){var s=N[i],c=e.name||R,u=E(t[n]);return new r("Invalid "+s+" `"+a+"` of type "+("`"+u+"` supplied to `"+o+"`, expected ")+("instance of `"+c+"`."))}return null}return i(t)}function p(e){function t(t,n,i,a,s){for(var c=t[n],u=0;u<e.length;u++)if(o(c,e[u]))return null;var l=N[a],p=JSON.stringify(e);return new r("Invalid "+l+" `"+s+"` of value `"+c+"` "+("supplied to `"+i+"`, expected one of "+p+"."))}return Array.isArray(e)?i(t):("production"!==n.env.NODE_ENV?w(!1,"Invalid argument supplied to oneOf, expected an instance of array."):void 0,O.thatReturnsNull)}function d(e){function t(t,n,o,i,a){if("function"!=typeof e)return new r("Property `"+a+"` of component `"+o+"` has invalid PropType notation inside objectOf.");var s=t[n],c=y(s);if("object"!==c){var u=N[i];return new r("Invalid "+u+" `"+a+"` of type "+("`"+c+"` supplied to `"+o+"`, expected an object."))}for(var l in s)if(s.hasOwnProperty(l)){var p=e(s,l,o,i,a+"."+l,C);if(p instanceof Error)return p}return null}return i(t)}function f(e){function t(t,n,o,i,a){for(var s=0;s<e.length;s++){var c=e[s];if(null==c(t,n,o,i,a,C))return null}var u=N[i];return new r("Invalid "+u+" `"+a+"` supplied to "+("`"+o+"`."))}return Array.isArray(e)?i(t):("production"!==n.env.NODE_ENV?w(!1,"Invalid argument supplied to oneOfType, expected an instance of array."):void 0,O.thatReturnsNull)}function v(){function e(e,t,n,o,i){if(!m(e[t])){var a=N[o];return new r("Invalid "+a+" `"+i+"` supplied to "+("`"+n+"`, expected a ReactNode."))}return null}return i(e)}function h(e){function t(t,n,o,i,a){var s=t[n],c=y(s);if("object"!==c){var u=N[i];return new r("Invalid "+u+" `"+a+"` of type `"+c+"` "+("supplied to `"+o+"`, expected `object`."))}for(var l in e){var p=e[l];if(p){var d=p(s,l,o,i,a+"."+l,C);if(d)return d}}return null}return i(t)}function m(e){switch("undefined"==typeof e?"undefined":_typeof(e)){case"number":case"string":case"undefined":return!0;case"boolean":return!e;case"object":if(Array.isArray(e))return e.every(m);if(null===e||_.isValidElement(e))return!0;var t=D(e);if(!t)return!1;var n,o=t.call(e);if(t!==e.entries){for(;!(n=o.next()).done;)if(!m(n.value))return!1}else for(;!(n=o.next()).done;){var r=n.value;if(r&&!m(r[1]))return!1}return!0;default:return!1}}function g(e,t){return"symbol"===e||("Symbol"===t["@@toStringTag"]||"function"==typeof Symbol&&t instanceof Symbol)}function y(e){var t="undefined"==typeof e?"undefined":_typeof(e);return Array.isArray(e)?"array":e instanceof RegExp?"object":g(t,e)?"symbol":t}function b(e){var t=y(e);if("object"===t){if(e instanceof Date)return"date";if(e instanceof RegExp)return"regexp"}return t}function E(e){return e.constructor&&e.constructor.name?e.constructor.name:R}var _=e("./ReactElement"),N=e("./ReactPropTypeLocationNames"),C=e("./ReactPropTypesSecret"),O=e("fbjs/lib/emptyFunction"),D=e("./getIteratorFn"),w=e("fbjs/lib/warning"),R="<<anonymous>>",P={array:a("array"),bool:a("boolean"),func:a("function"),number:a("number"),object:a("object"),string:a("string"),symbol:a("symbol"),any:s(),arrayOf:c,element:u(),instanceOf:l,node:v(),objectOf:d,oneOf:p,oneOfType:f,shape:h};r.prototype=Error.prototype,t.exports=P}).call(this,e("rH1JPG"))},{"./ReactElement":167,"./ReactPropTypeLocationNames":171,"./ReactPropTypesSecret":173,"./getIteratorFn":178,"fbjs/lib/emptyFunction":12,"fbjs/lib/warning":27,rH1JPG:29}],173:[function(e,t,n){t.exports=e(100)},{}],174:[function(e,t,n){function o(e,t,n){this.props=e,this.context=t,this.refs=c,this.updater=n||s}function r(){}var i=e("object-assign"),a=e("./ReactComponent"),s=e("./ReactNoopUpdateQueue"),c=e("fbjs/lib/emptyObject");r.prototype=a.prototype,o.prototype=new r,o.prototype.constructor=o,i(o.prototype,a.prototype),o.prototype.isPureReactComponent=!0,t.exports=o},{"./ReactComponent":163,"./ReactNoopUpdateQueue":170,"fbjs/lib/emptyObject":13,"object-assign":28}],175:[function(e,t,n){t.exports=e(108)},{}],176:[function(e,t,n){(function(e){var n=!1;if("production"!==e.env.NODE_ENV)try{Object.defineProperty({},"x",{get:function(){}}),n=!0}catch(e){}t.exports=n}).call(this,e("rH1JPG"))},{rH1JPG:29}],177:[function(e,t,n){(function(n){function o(t,o,p,d,f,v){for(var h in t)if(t.hasOwnProperty(h)){var m;try{"function"!=typeof t[h]?"production"!==n.env.NODE_ENV?c(!1,"%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.",d||"React class",a[p],h):i("84",d||"React class",a[p],h):void 0,m=t[h](o,h,d,p,null,s)}catch(e){m=e}if("production"!==n.env.NODE_ENV?u(!m||m instanceof Error,"%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",d||"React class",a[p],h,"undefined"==typeof m?"undefined":_typeof(m)):void 0,m instanceof Error&&!(m.message in l)){l[m.message]=!0;var g="";"production"!==n.env.NODE_ENV&&(r||(r=e("./ReactComponentTreeHook")),null!==v?g=r.getStackAddendumByID(v):null!==f&&(g=r.getCurrentStackAddendum(f))),"production"!==n.env.NODE_ENV?u(!1,"Failed %s type: %s%s",p,m.message,g):void 0}}}var r,i=e("./reactProdInvariant"),a=e("./ReactPropTypeLocationNames"),s=e("./ReactPropTypesSecret"),c=e("fbjs/lib/invariant"),u=e("fbjs/lib/warning");"undefined"!=typeof n&&n.env&&"test"===n.env.NODE_ENV&&(r=e("./ReactComponentTreeHook"));var l={};t.exports=o}).call(this,e("rH1JPG"))},{"./ReactComponentTreeHook":164,"./ReactPropTypeLocationNames":171,"./ReactPropTypesSecret":173,"./reactProdInvariant":180,"fbjs/lib/invariant":20,"fbjs/lib/warning":27,rH1JPG:29}],178:[function(e,t,n){t.exports=e(141)},{}],179:[function(e,t,n){(function(n){function o(e){return i.isValidElement(e)?void 0:"production"!==n.env.NODE_ENV?a(!1,"React.Children.only expected to receive a single React element child."):r("143"),e}var r=e("./reactProdInvariant"),i=e("./ReactElement"),a=e("fbjs/lib/invariant");t.exports=o}).call(this,e("rH1JPG"))},{"./ReactElement":167,"./reactProdInvariant":180,"fbjs/lib/invariant":20,rH1JPG:29}],180:[function(e,t,n){t.exports=e(150)},{}],181:[function(e,t,n){(function(n){function o(e,t){return e&&"object"===("undefined"==typeof e?"undefined":_typeof(e))&&null!=e.key?p.escape(e.key):t.toString(36)}function r(e,t,i,m){var g="undefined"==typeof e?"undefined":_typeof(e);if("undefined"!==g&&"boolean"!==g||(e=null),null===e||"string"===g||"number"===g||"object"===g&&e.$$typeof===c)return i(m,e,""===t?f+o(e,0):t),1;var y,b,E=0,_=""===t?f:t+v;if(Array.isArray(e))for(var N=0;N<e.length;N++)y=e[N],b=_+o(y,N),E+=r(y,b,i,m);else{var C=u(e);if(C){var O,D=C.call(e);if(C!==e.entries)for(var w=0;!(O=D.next()).done;)y=O.value,b=_+o(y,w++),E+=r(y,b,i,m);else{if("production"!==n.env.NODE_ENV){var R="";if(s.current){var P=s.current.getName();P&&(R=" Check the render method of `"+P+"`.")}"production"!==n.env.NODE_ENV?d(h,"Using Maps as children is not yet fully supported. It is an experimental feature that might be removed. Convert it to a sequence / iterable of keyed ReactElements instead.%s",R):void 0,h=!0}for(;!(O=D.next()).done;){var T=O.value;T&&(y=T[1],b=_+p.escape(T[0])+v+o(y,0),E+=r(y,b,i,m))}}}else if("object"===g){var I="";if("production"!==n.env.NODE_ENV&&(I=" If you meant to render a collection of children, use an array instead or wrap the object using createFragment(object) from the React add-ons.",e._isReactElement&&(I=" It looks like you're using an element created by a different version of React. Make sure to use only one copy of React."),s.current)){var x=s.current.getName();x&&(I+=" Check the render method of `"+x+"`.")}var k=String(e);"production"!==n.env.NODE_ENV?l(!1,"Objects are not valid as a React child (found: %s).%s","[object Object]"===k?"object with keys {"+Object.keys(e).join(", ")+"}":k,I):a("31","[object Object]"===k?"object with keys {"+Object.keys(e).join(", ")+"}":k,I)}}return E}function i(e,t,n){return null==e?0:r(e,"",t,n)}var a=e("./reactProdInvariant"),s=e("./ReactCurrentOwner"),c=e("./ReactElementSymbol"),u=e("./getIteratorFn"),l=e("fbjs/lib/invariant"),p=e("./KeyEscapeUtils"),d=e("fbjs/lib/warning"),f=".",v=":",h=!1;t.exports=i}).call(this,e("rH1JPG"))},{"./KeyEscapeUtils":158,"./ReactCurrentOwner":165,"./ReactElementSymbol":168,"./getIteratorFn":178,"./reactProdInvariant":180,"fbjs/lib/invariant":20,"fbjs/lib/warning":27,rH1JPG:29}],182:[function(e,t,n){t.exports=e("./lib/React")},{"./lib/React":160}]},{},[3]);
(function() {
  var slice = [].slice;

  this.ActionCable = {
    INTERNAL: {
      "message_types": {
        "welcome": "welcome",
        "ping": "ping",
        "confirmation": "confirm_subscription",
        "rejection": "reject_subscription"
      },
      "default_mount_path": "/cable",
      "protocols": ["actioncable-v1-json", "actioncable-unsupported"]
    },
    createConsumer: function(url) {
      var ref;
      if (url == null) {
        url = (ref = this.getConfig("url")) != null ? ref : this.INTERNAL.default_mount_path;
      }
      return new ActionCable.Consumer(this.createWebSocketURL(url));
    },
    getConfig: function(name) {
      var element;
      element = document.head.querySelector("meta[name='action-cable-" + name + "']");
      return element != null ? element.getAttribute("content") : void 0;
    },
    createWebSocketURL: function(url) {
      var a;
      if (url && !/^wss?:/i.test(url)) {
        a = document.createElement("a");
        a.href = url;
        a.href = a.href;
        a.protocol = a.protocol.replace("http", "ws");
        return a.href;
      } else {
        return url;
      }
    },
    startDebugging: function() {
      return this.debugging = true;
    },
    stopDebugging: function() {
      return this.debugging = null;
    },
    log: function() {
      var messages;
      messages = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      if (this.debugging) {
        messages.push(Date.now());
        return console.log.apply(console, ["[ActionCable]"].concat(slice.call(messages)));
      }
    }
  };

  if (typeof window !== "undefined" && window !== null) {
    window.ActionCable = this.ActionCable;
  }

  if (typeof module !== "undefined" && module !== null) {
    module.exports = this.ActionCable;
  }

}).call(this);
(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  ActionCable.ConnectionMonitor = (function() {
    var clamp, now, secondsSince;

    ConnectionMonitor.pollInterval = {
      min: 3,
      max: 30
    };

    ConnectionMonitor.staleThreshold = 6;

    function ConnectionMonitor(connection) {
      this.connection = connection;
      this.visibilityDidChange = bind(this.visibilityDidChange, this);
      this.reconnectAttempts = 0;
    }

    ConnectionMonitor.prototype.start = function() {
      if (!this.isRunning()) {
        this.startedAt = now();
        delete this.stoppedAt;
        this.startPolling();
        document.addEventListener("visibilitychange", this.visibilityDidChange);
        return ActionCable.log("ConnectionMonitor started. pollInterval = " + (this.getPollInterval()) + " ms");
      }
    };

    ConnectionMonitor.prototype.stop = function() {
      if (this.isRunning()) {
        this.stoppedAt = now();
        this.stopPolling();
        document.removeEventListener("visibilitychange", this.visibilityDidChange);
        return ActionCable.log("ConnectionMonitor stopped");
      }
    };

    ConnectionMonitor.prototype.isRunning = function() {
      return (this.startedAt != null) && (this.stoppedAt == null);
    };

    ConnectionMonitor.prototype.recordPing = function() {
      return this.pingedAt = now();
    };

    ConnectionMonitor.prototype.recordConnect = function() {
      this.reconnectAttempts = 0;
      this.recordPing();
      delete this.disconnectedAt;
      return ActionCable.log("ConnectionMonitor recorded connect");
    };

    ConnectionMonitor.prototype.recordDisconnect = function() {
      this.disconnectedAt = now();
      return ActionCable.log("ConnectionMonitor recorded disconnect");
    };

    ConnectionMonitor.prototype.startPolling = function() {
      this.stopPolling();
      return this.poll();
    };

    ConnectionMonitor.prototype.stopPolling = function() {
      return clearTimeout(this.pollTimeout);
    };

    ConnectionMonitor.prototype.poll = function() {
      return this.pollTimeout = setTimeout((function(_this) {
        return function() {
          _this.reconnectIfStale();
          return _this.poll();
        };
      })(this), this.getPollInterval());
    };

    ConnectionMonitor.prototype.getPollInterval = function() {
      var interval, max, min, ref;
      ref = this.constructor.pollInterval, min = ref.min, max = ref.max;
      interval = 5 * Math.log(this.reconnectAttempts + 1);
      return Math.round(clamp(interval, min, max) * 1000);
    };

    ConnectionMonitor.prototype.reconnectIfStale = function() {
      if (this.connectionIsStale()) {
        ActionCable.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + (this.getPollInterval()) + " ms, time disconnected = " + (secondsSince(this.disconnectedAt)) + " s, stale threshold = " + this.constructor.staleThreshold + " s");
        this.reconnectAttempts++;
        if (this.disconnectedRecently()) {
          return ActionCable.log("ConnectionMonitor skipping reopening recent disconnect");
        } else {
          ActionCable.log("ConnectionMonitor reopening");
          return this.connection.reopen();
        }
      }
    };

    ConnectionMonitor.prototype.connectionIsStale = function() {
      var ref;
      return secondsSince((ref = this.pingedAt) != null ? ref : this.startedAt) > this.constructor.staleThreshold;
    };

    ConnectionMonitor.prototype.disconnectedRecently = function() {
      return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
    };

    ConnectionMonitor.prototype.visibilityDidChange = function() {
      if (document.visibilityState === "visible") {
        return setTimeout((function(_this) {
          return function() {
            if (_this.connectionIsStale() || !_this.connection.isOpen()) {
              ActionCable.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState);
              return _this.connection.reopen();
            }
          };
        })(this), 200);
      }
    };

    now = function() {
      return new Date().getTime();
    };

    secondsSince = function(time) {
      return (now() - time) / 1000;
    };

    clamp = function(number, min, max) {
      return Math.max(min, Math.min(max, number));
    };

    return ConnectionMonitor;

  })();

}).call(this);
(function() {
  var i, message_types, protocols, ref, supportedProtocols, unsupportedProtocol,
    slice = [].slice,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  ref = ActionCable.INTERNAL, message_types = ref.message_types, protocols = ref.protocols;

  supportedProtocols = 2 <= protocols.length ? slice.call(protocols, 0, i = protocols.length - 1) : (i = 0, []), unsupportedProtocol = protocols[i++];

  ActionCable.Connection = (function() {
    Connection.reopenDelay = 500;

    function Connection(consumer) {
      this.consumer = consumer;
      this.open = bind(this.open, this);
      this.subscriptions = this.consumer.subscriptions;
      this.monitor = new ActionCable.ConnectionMonitor(this);
      this.disconnected = true;
    }

    Connection.prototype.send = function(data) {
      if (this.isOpen()) {
        this.webSocket.send(JSON.stringify(data));
        return true;
      } else {
        return false;
      }
    };

    Connection.prototype.open = function() {
      if (this.isActive()) {
        ActionCable.log("Attempted to open WebSocket, but existing socket is " + (this.getState()));
        throw new Error("Existing connection must be closed before opening");
      } else {
        ActionCable.log("Opening WebSocket, current state is " + (this.getState()) + ", subprotocols: " + protocols);
        if (this.webSocket != null) {
          this.uninstallEventHandlers();
        }
        this.webSocket = new WebSocket(this.consumer.url, protocols);
        this.installEventHandlers();
        this.monitor.start();
        return true;
      }
    };

    Connection.prototype.close = function(arg) {
      var allowReconnect, ref1;
      allowReconnect = (arg != null ? arg : {
        allowReconnect: true
      }).allowReconnect;
      if (!allowReconnect) {
        this.monitor.stop();
      }
      if (this.isActive()) {
        return (ref1 = this.webSocket) != null ? ref1.close() : void 0;
      }
    };

    Connection.prototype.reopen = function() {
      var error, error1;
      ActionCable.log("Reopening WebSocket, current state is " + (this.getState()));
      if (this.isActive()) {
        try {
          return this.close();
        } catch (error1) {
          error = error1;
          return ActionCable.log("Failed to reopen WebSocket", error);
        } finally {
          ActionCable.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms");
          setTimeout(this.open, this.constructor.reopenDelay);
        }
      } else {
        return this.open();
      }
    };

    Connection.prototype.getProtocol = function() {
      var ref1;
      return (ref1 = this.webSocket) != null ? ref1.protocol : void 0;
    };

    Connection.prototype.isOpen = function() {
      return this.isState("open");
    };

    Connection.prototype.isActive = function() {
      return this.isState("open", "connecting");
    };

    Connection.prototype.isProtocolSupported = function() {
      var ref1;
      return ref1 = this.getProtocol(), indexOf.call(supportedProtocols, ref1) >= 0;
    };

    Connection.prototype.isState = function() {
      var ref1, states;
      states = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return ref1 = this.getState(), indexOf.call(states, ref1) >= 0;
    };

    Connection.prototype.getState = function() {
      var ref1, state, value;
      for (state in WebSocket) {
        value = WebSocket[state];
        if (value === ((ref1 = this.webSocket) != null ? ref1.readyState : void 0)) {
          return state.toLowerCase();
        }
      }
      return null;
    };

    Connection.prototype.installEventHandlers = function() {
      var eventName, handler;
      for (eventName in this.events) {
        handler = this.events[eventName].bind(this);
        this.webSocket["on" + eventName] = handler;
      }
    };

    Connection.prototype.uninstallEventHandlers = function() {
      var eventName;
      for (eventName in this.events) {
        this.webSocket["on" + eventName] = function() {};
      }
    };

    Connection.prototype.events = {
      message: function(event) {
        var identifier, message, ref1, type;
        if (!this.isProtocolSupported()) {
          return;
        }
        ref1 = JSON.parse(event.data), identifier = ref1.identifier, message = ref1.message, type = ref1.type;
        switch (type) {
          case message_types.welcome:
            this.monitor.recordConnect();
            return this.subscriptions.reload();
          case message_types.ping:
            return this.monitor.recordPing();
          case message_types.confirmation:
            return this.subscriptions.notify(identifier, "connected");
          case message_types.rejection:
            return this.subscriptions.reject(identifier);
          default:
            return this.subscriptions.notify(identifier, "received", message);
        }
      },
      open: function() {
        ActionCable.log("WebSocket onopen event, using '" + (this.getProtocol()) + "' subprotocol");
        this.disconnected = false;
        if (!this.isProtocolSupported()) {
          ActionCable.log("Protocol is unsupported. Stopping monitor and disconnecting.");
          return this.close({
            allowReconnect: false
          });
        }
      },
      close: function(event) {
        ActionCable.log("WebSocket onclose event");
        if (this.disconnected) {
          return;
        }
        this.disconnected = true;
        this.monitor.recordDisconnect();
        return this.subscriptions.notifyAll("disconnected", {
          willAttemptReconnect: this.monitor.isRunning()
        });
      },
      error: function() {
        return ActionCable.log("WebSocket onerror event");
      }
    };

    return Connection;

  })();

}).call(this);
(function() {
  var slice = [].slice;

  ActionCable.Subscriptions = (function() {
    function Subscriptions(consumer) {
      this.consumer = consumer;
      this.subscriptions = [];
    }

    Subscriptions.prototype.create = function(channelName, mixin) {
      var channel, params, subscription;
      channel = channelName;
      params = typeof channel === "object" ? channel : {
        channel: channel
      };
      subscription = new ActionCable.Subscription(this.consumer, params, mixin);
      return this.add(subscription);
    };

    Subscriptions.prototype.add = function(subscription) {
      this.subscriptions.push(subscription);
      this.consumer.ensureActiveConnection();
      this.notify(subscription, "initialized");
      this.sendCommand(subscription, "subscribe");
      return subscription;
    };

    Subscriptions.prototype.remove = function(subscription) {
      this.forget(subscription);
      if (!this.findAll(subscription.identifier).length) {
        this.sendCommand(subscription, "unsubscribe");
      }
      return subscription;
    };

    Subscriptions.prototype.reject = function(identifier) {
      var i, len, ref, results, subscription;
      ref = this.findAll(identifier);
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        subscription = ref[i];
        this.forget(subscription);
        this.notify(subscription, "rejected");
        results.push(subscription);
      }
      return results;
    };

    Subscriptions.prototype.forget = function(subscription) {
      var s;
      this.subscriptions = (function() {
        var i, len, ref, results;
        ref = this.subscriptions;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          s = ref[i];
          if (s !== subscription) {
            results.push(s);
          }
        }
        return results;
      }).call(this);
      return subscription;
    };

    Subscriptions.prototype.findAll = function(identifier) {
      var i, len, ref, results, s;
      ref = this.subscriptions;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        s = ref[i];
        if (s.identifier === identifier) {
          results.push(s);
        }
      }
      return results;
    };

    Subscriptions.prototype.reload = function() {
      var i, len, ref, results, subscription;
      ref = this.subscriptions;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        subscription = ref[i];
        results.push(this.sendCommand(subscription, "subscribe"));
      }
      return results;
    };

    Subscriptions.prototype.notifyAll = function() {
      var args, callbackName, i, len, ref, results, subscription;
      callbackName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      ref = this.subscriptions;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        subscription = ref[i];
        results.push(this.notify.apply(this, [subscription, callbackName].concat(slice.call(args))));
      }
      return results;
    };

    Subscriptions.prototype.notify = function() {
      var args, callbackName, i, len, results, subscription, subscriptions;
      subscription = arguments[0], callbackName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
      if (typeof subscription === "string") {
        subscriptions = this.findAll(subscription);
      } else {
        subscriptions = [subscription];
      }
      results = [];
      for (i = 0, len = subscriptions.length; i < len; i++) {
        subscription = subscriptions[i];
        results.push(typeof subscription[callbackName] === "function" ? subscription[callbackName].apply(subscription, args) : void 0);
      }
      return results;
    };

    Subscriptions.prototype.sendCommand = function(subscription, command) {
      var identifier;
      identifier = subscription.identifier;
      return this.consumer.send({
        command: command,
        identifier: identifier
      });
    };

    return Subscriptions;

  })();

}).call(this);
(function() {
  ActionCable.Subscription = (function() {
    var extend;

    function Subscription(consumer, params, mixin) {
      this.consumer = consumer;
      if (params == null) {
        params = {};
      }
      this.identifier = JSON.stringify(params);
      extend(this, mixin);
    }

    Subscription.prototype.perform = function(action, data) {
      if (data == null) {
        data = {};
      }
      data.action = action;
      return this.send(data);
    };

    Subscription.prototype.send = function(data) {
      return this.consumer.send({
        command: "message",
        identifier: this.identifier,
        data: JSON.stringify(data)
      });
    };

    Subscription.prototype.unsubscribe = function() {
      return this.consumer.subscriptions.remove(this);
    };

    extend = function(object, properties) {
      var key, value;
      if (properties != null) {
        for (key in properties) {
          value = properties[key];
          object[key] = value;
        }
      }
      return object;
    };

    return Subscription;

  })();

}).call(this);
(function() {
  ActionCable.Consumer = (function() {
    function Consumer(url) {
      this.url = url;
      this.subscriptions = new ActionCable.Subscriptions(this);
      this.connection = new ActionCable.Connection(this);
    }

    Consumer.prototype.send = function(data) {
      return this.connection.send(data);
    };

    Consumer.prototype.connect = function() {
      return this.connection.open();
    };

    Consumer.prototype.disconnect = function() {
      return this.connection.close({
        allowReconnect: false
      });
    };

    Consumer.prototype.ensureActiveConnection = function() {
      if (!this.connection.isActive()) {
        return this.connection.open();
      }
    };

    return Consumer;

  })();

}).call(this);
// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the rails generate channel command.
//




(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);
/**
 * what-input - A global utility for tracking the current input method (mouse, keyboard or touch).
 * @version v4.0.3
 * @link https://github.com/ten1seven/what-input
 * @license MIT
 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("whatInput", [], factory);
	else if(typeof exports === 'object')
		exports["whatInput"] = factory();
	else
		root["whatInput"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	module.exports = (function() {

	  /*
	    ---------------
	    Variables
	    ---------------
	  */

	  // cache document.documentElement
	  var docElem = document.documentElement;

	  // last used input type
	  var currentInput = 'initial';

	  // last used input intent
	  var currentIntent = null;

	  // form input types
	  var formInputs = [
	    'input',
	    'select',
	    'textarea'
	  ];

	  // list of modifier keys commonly used with the mouse and
	  // can be safely ignored to prevent false keyboard detection
	  var ignoreMap = [
	    16, // shift
	    17, // control
	    18, // alt
	    91, // Windows key / left Apple cmd
	    93  // Windows menu / right Apple cmd
	  ];

	  // mapping of events to input types
	  var inputMap = {
	    'keyup': 'keyboard',
	    'mousedown': 'mouse',
	    'mousemove': 'mouse',
	    'MSPointerDown': 'pointer',
	    'MSPointerMove': 'pointer',
	    'pointerdown': 'pointer',
	    'pointermove': 'pointer',
	    'touchstart': 'touch'
	  };

	  // array of all used input types
	  var inputTypes = [];

	  // boolean: true if touch buffer timer is running
	  var isBuffering = false;

	  // map of IE 10 pointer events
	  var pointerMap = {
	    2: 'touch',
	    3: 'touch', // treat pen like touch
	    4: 'mouse'
	  };

	  // touch buffer timer
	  var touchTimer = null;


	  /*
	    ---------------
	    Set up
	    ---------------
	  */

	  var setUp = function() {

	    // add correct mouse wheel event mapping to `inputMap`
	    inputMap[detectWheel()] = 'mouse';

	    addListeners();
	    setInput();
	  };


	  /*
	    ---------------
	    Events
	    ---------------
	  */

	  var addListeners = function() {

	    // `pointermove`, `MSPointerMove`, `mousemove` and mouse wheel event binding
	    // can only demonstrate potential, but not actual, interaction
	    // and are treated separately

	    // pointer events (mouse, pen, touch)
	    if (window.PointerEvent) {
	      docElem.addEventListener('pointerdown', updateInput);
	      docElem.addEventListener('pointermove', setIntent);
	    } else if (window.MSPointerEvent) {
	      docElem.addEventListener('MSPointerDown', updateInput);
	      docElem.addEventListener('MSPointerMove', setIntent);
	    } else {

	      // mouse events
	      docElem.addEventListener('mousedown', updateInput);
	      docElem.addEventListener('mousemove', setIntent);

	      // touch events
	      if ('ontouchstart' in window) {
	        docElem.addEventListener('touchstart', touchBuffer);
	      }
	    }

	    // mouse wheel
	    docElem.addEventListener(detectWheel(), setIntent);

	    // keyboard events
	    docElem.addEventListener('keydown', updateInput);
	    docElem.addEventListener('keyup', updateInput);
	  };

	  // checks conditions before updating new input
	  var updateInput = function(event) {

	    // only execute if the touch buffer timer isn't running
	    if (!isBuffering) {
	      var eventKey = event.which;
	      var value = inputMap[event.type];
	      if (value === 'pointer') value = pointerType(event);

	      if (
	        currentInput !== value ||
	        currentIntent !== value
	      ) {

	        var activeInput = (
	          document.activeElement &&
	          formInputs.indexOf(document.activeElement.nodeName.toLowerCase()) === -1
	        ) ? true : false;

	        if (
	          value === 'touch' ||

	          // ignore mouse modifier keys
	          (value === 'mouse' && ignoreMap.indexOf(eventKey) === -1) ||

	          // don't switch if the current element is a form input
	          (value === 'keyboard' && activeInput)
	        ) {

	          // set the current and catch-all variable
	          currentInput = currentIntent = value;

	          setInput();
	        }
	      }
	    }
	  };

	  // updates the doc and `inputTypes` array with new input
	  var setInput = function() {
	    docElem.setAttribute('data-whatinput', currentInput);
	    docElem.setAttribute('data-whatintent', currentInput);

	    if (inputTypes.indexOf(currentInput) === -1) {
	      inputTypes.push(currentInput);
	      docElem.classList.add('whatinput-types-' + currentInput);
	    }
	  };

	  // updates input intent for `mousemove` and `pointermove`
	  var setIntent = function(event) {

	    // only execute if the touch buffer timer isn't running
	    if (!isBuffering) {
	      var value = inputMap[event.type];
	      if (value === 'pointer') value = pointerType(event);

	      if (currentIntent !== value) {
	        currentIntent = value;

	        docElem.setAttribute('data-whatintent', currentIntent);
	      }
	    }
	  };

	  // buffers touch events because they frequently also fire mouse events
	  var touchBuffer = function(event) {

	    // clear the timer if it happens to be running
	    window.clearTimeout(touchTimer);

	    // set the current input
	    updateInput(event);

	    // set the isBuffering to `true`
	    isBuffering = true;

	    // run the timer
	    touchTimer = window.setTimeout(function() {

	      // if the timer runs out, set isBuffering back to `false`
	      isBuffering = false;
	    }, 200);
	  };


	  /*
	    ---------------
	    Utilities
	    ---------------
	  */

	  var pointerType = function(event) {
	   if (typeof event.pointerType === 'number') {
	      return pointerMap[event.pointerType];
	   } else {
	      return (event.pointerType === 'pen') ? 'touch' : event.pointerType; // treat pen like touch
	   }
	  };

	  // detect version of mouse wheel event to use
	  // via https://developer.mozilla.org/en-US/docs/Web/Events/wheel
	  var detectWheel = function() {
	    return 'onwheel' in document.createElement('div') ?
	      'wheel' : // Modern browsers support "wheel"

	      document.onmousewheel !== undefined ?
	        'mousewheel' : // Webkit and IE support at least "mousewheel"
	        'DOMMouseScroll'; // let's assume that remaining browsers are older Firefox
	  };


	  /*
	    ---------------
	    Init
	    don't start script unless browser cuts the mustard
	    (also passes if polyfills are used)
	    ---------------
	  */

	  if (
	    'addEventListener' in window &&
	    Array.prototype.indexOf
	  ) {
	    setUp();
	  }


	  /*
	    ---------------
	    API
	    ---------------
	  */

	  return {

	    // returns string: the current input type
	    // opt: 'loose'|'strict'
	    // 'strict' (default): returns the same value as the `data-whatinput` attribute
	    // 'loose': includes `data-whatintent` value if it's more current than `data-whatinput`
	    ask: function(opt) { return (opt === 'loose') ? currentIntent : currentInput; },

	    // returns array: all the detected input types
	    types: function() { return inputTypes; }

	  };

	}());


/***/ }
/******/ ])
});
;
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//






;
