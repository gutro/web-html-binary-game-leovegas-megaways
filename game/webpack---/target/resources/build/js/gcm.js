var gcm =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 43);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory();
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define([], factory);
	}
	else {
		// Global (browser)
		root.CryptoJS = factory();
	}
}(this, function () {

	/**
	 * CryptoJS core components.
	 */
	var CryptoJS = CryptoJS || (function (Math, undefined) {
	    /*
	     * Local polyfil of Object.create
	     */
	    var create = Object.create || (function () {
	        function F() {};

	        return function (obj) {
	            var subtype;

	            F.prototype = obj;

	            subtype = new F();

	            F.prototype = null;

	            return subtype;
	        };
	    }())

	    /**
	     * CryptoJS namespace.
	     */
	    var C = {};

	    /**
	     * Library namespace.
	     */
	    var C_lib = C.lib = {};

	    /**
	     * Base object for prototypal inheritance.
	     */
	    var Base = C_lib.Base = (function () {


	        return {
	            /**
	             * Creates a new object that inherits from this object.
	             *
	             * @param {Object} overrides Properties to copy into the new object.
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         field: 'value',
	             *
	             *         method: function () {
	             *         }
	             *     });
	             */
	            extend: function (overrides) {
	                // Spawn
	                var subtype = create(this);

	                // Augment
	                if (overrides) {
	                    subtype.mixIn(overrides);
	                }

	                // Create default initializer
	                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
	                    subtype.init = function () {
	                        subtype.$super.init.apply(this, arguments);
	                    };
	                }

	                // Initializer's prototype is the subtype object
	                subtype.init.prototype = subtype;

	                // Reference supertype
	                subtype.$super = this;

	                return subtype;
	            },

	            /**
	             * Extends this object and runs the init method.
	             * Arguments to create() will be passed to init().
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var instance = MyType.create();
	             */
	            create: function () {
	                var instance = this.extend();
	                instance.init.apply(instance, arguments);

	                return instance;
	            },

	            /**
	             * Initializes a newly created object.
	             * Override this method to add some logic when your objects are created.
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         init: function () {
	             *             // ...
	             *         }
	             *     });
	             */
	            init: function () {
	            },

	            /**
	             * Copies properties into this object.
	             *
	             * @param {Object} properties The properties to mix in.
	             *
	             * @example
	             *
	             *     MyType.mixIn({
	             *         field: 'value'
	             *     });
	             */
	            mixIn: function (properties) {
	                for (var propertyName in properties) {
	                    if (properties.hasOwnProperty(propertyName)) {
	                        this[propertyName] = properties[propertyName];
	                    }
	                }

	                // IE won't copy toString using the loop above
	                if (properties.hasOwnProperty('toString')) {
	                    this.toString = properties.toString;
	                }
	            },

	            /**
	             * Creates a copy of this object.
	             *
	             * @return {Object} The clone.
	             *
	             * @example
	             *
	             *     var clone = instance.clone();
	             */
	            clone: function () {
	                return this.init.prototype.extend(this);
	            }
	        };
	    }());

	    /**
	     * An array of 32-bit words.
	     *
	     * @property {Array} words The array of 32-bit words.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */
	    var WordArray = C_lib.WordArray = Base.extend({
	        /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of 32-bit words.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.create();
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
	         */
	        init: function (words, sigBytes) {
	            words = this.words = words || [];

	            if (sigBytes != undefined) {
	                this.sigBytes = sigBytes;
	            } else {
	                this.sigBytes = words.length * 4;
	            }
	        },

	        /**
	         * Converts this word array to a string.
	         *
	         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
	         *
	         * @return {string} The stringified word array.
	         *
	         * @example
	         *
	         *     var string = wordArray + '';
	         *     var string = wordArray.toString();
	         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
	         */
	        toString: function (encoder) {
	            return (encoder || Hex).stringify(this);
	        },

	        /**
	         * Concatenates a word array to this word array.
	         *
	         * @param {WordArray} wordArray The word array to append.
	         *
	         * @return {WordArray} This word array.
	         *
	         * @example
	         *
	         *     wordArray1.concat(wordArray2);
	         */
	        concat: function (wordArray) {
	            // Shortcuts
	            var thisWords = this.words;
	            var thatWords = wordArray.words;
	            var thisSigBytes = this.sigBytes;
	            var thatSigBytes = wordArray.sigBytes;

	            // Clamp excess bits
	            this.clamp();

	            // Concat
	            if (thisSigBytes % 4) {
	                // Copy one byte at a time
	                for (var i = 0; i < thatSigBytes; i++) {
	                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
	                }
	            } else {
	                // Copy one word at a time
	                for (var i = 0; i < thatSigBytes; i += 4) {
	                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
	                }
	            }
	            this.sigBytes += thatSigBytes;

	            // Chainable
	            return this;
	        },

	        /**
	         * Removes insignificant bits.
	         *
	         * @example
	         *
	         *     wordArray.clamp();
	         */
	        clamp: function () {
	            // Shortcuts
	            var words = this.words;
	            var sigBytes = this.sigBytes;

	            // Clamp
	            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
	            words.length = Math.ceil(sigBytes / 4);
	        },

	        /**
	         * Creates a copy of this word array.
	         *
	         * @return {WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = wordArray.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone.words = this.words.slice(0);

	            return clone;
	        },

	        /**
	         * Creates a word array filled with random bytes.
	         *
	         * @param {number} nBytes The number of random bytes to generate.
	         *
	         * @return {WordArray} The random word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.random(16);
	         */
	        random: function (nBytes) {
	            var words = [];

	            var r = (function (m_w) {
	                var m_w = m_w;
	                var m_z = 0x3ade68b1;
	                var mask = 0xffffffff;

	                return function () {
	                    m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
	                    m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
	                    var result = ((m_z << 0x10) + m_w) & mask;
	                    result /= 0x100000000;
	                    result += 0.5;
	                    return result * (Math.random() > .5 ? 1 : -1);
	                }
	            });

	            for (var i = 0, rcache; i < nBytes; i += 4) {
	                var _r = r((rcache || Math.random()) * 0x100000000);

	                rcache = _r() * 0x3ade67b7;
	                words.push((_r() * 0x100000000) | 0);
	            }

	            return new WordArray.init(words, nBytes);
	        }
	    });

	    /**
	     * Encoder namespace.
	     */
	    var C_enc = C.enc = {};

	    /**
	     * Hex encoding strategy.
	     */
	    var Hex = C_enc.Hex = {
	        /**
	         * Converts a word array to a hex string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The hex string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var hexChars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                hexChars.push((bite >>> 4).toString(16));
	                hexChars.push((bite & 0x0f).toString(16));
	            }

	            return hexChars.join('');
	        },

	        /**
	         * Converts a hex string to a word array.
	         *
	         * @param {string} hexStr The hex string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
	         */
	        parse: function (hexStr) {
	            // Shortcut
	            var hexStrLength = hexStr.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < hexStrLength; i += 2) {
	                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
	            }

	            return new WordArray.init(words, hexStrLength / 2);
	        }
	    };

	    /**
	     * Latin1 encoding strategy.
	     */
	    var Latin1 = C_enc.Latin1 = {
	        /**
	         * Converts a word array to a Latin1 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Latin1 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var latin1Chars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                latin1Chars.push(String.fromCharCode(bite));
	            }

	            return latin1Chars.join('');
	        },

	        /**
	         * Converts a Latin1 string to a word array.
	         *
	         * @param {string} latin1Str The Latin1 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
	         */
	        parse: function (latin1Str) {
	            // Shortcut
	            var latin1StrLength = latin1Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < latin1StrLength; i++) {
	                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
	            }

	            return new WordArray.init(words, latin1StrLength);
	        }
	    };

	    /**
	     * UTF-8 encoding strategy.
	     */
	    var Utf8 = C_enc.Utf8 = {
	        /**
	         * Converts a word array to a UTF-8 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-8 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            try {
	                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
	            } catch (e) {
	                throw new Error('Malformed UTF-8 data');
	            }
	        },

	        /**
	         * Converts a UTF-8 string to a word array.
	         *
	         * @param {string} utf8Str The UTF-8 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
	         */
	        parse: function (utf8Str) {
	            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
	        }
	    };

	    /**
	     * Abstract buffered block algorithm template.
	     *
	     * The property blockSize must be implemented in a concrete subtype.
	     *
	     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
	     */
	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
	        /**
	         * Resets this block algorithm's data buffer to its initial state.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm.reset();
	         */
	        reset: function () {
	            // Initial values
	            this._data = new WordArray.init();
	            this._nDataBytes = 0;
	        },

	        /**
	         * Adds new data to this block algorithm's buffer.
	         *
	         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm._append('data');
	         *     bufferedBlockAlgorithm._append(wordArray);
	         */
	        _append: function (data) {
	            // Convert string to WordArray, else assume WordArray already
	            if (typeof data == 'string') {
	                data = Utf8.parse(data);
	            }

	            // Append
	            this._data.concat(data);
	            this._nDataBytes += data.sigBytes;
	        },

	        /**
	         * Processes available data blocks.
	         *
	         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
	         *
	         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
	         *
	         * @return {WordArray} The processed data.
	         *
	         * @example
	         *
	         *     var processedData = bufferedBlockAlgorithm._process();
	         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
	         */
	        _process: function (doFlush) {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;
	            var dataSigBytes = data.sigBytes;
	            var blockSize = this.blockSize;
	            var blockSizeBytes = blockSize * 4;

	            // Count blocks ready
	            var nBlocksReady = dataSigBytes / blockSizeBytes;
	            if (doFlush) {
	                // Round up to include partial blocks
	                nBlocksReady = Math.ceil(nBlocksReady);
	            } else {
	                // Round down to include only full blocks,
	                // less the number of blocks that must remain in the buffer
	                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
	            }

	            // Count words ready
	            var nWordsReady = nBlocksReady * blockSize;

	            // Count bytes ready
	            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

	            // Process blocks
	            if (nWordsReady) {
	                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
	                    // Perform concrete-algorithm logic
	                    this._doProcessBlock(dataWords, offset);
	                }

	                // Remove processed words
	                var processedWords = dataWords.splice(0, nWordsReady);
	                data.sigBytes -= nBytesReady;
	            }

	            // Return processed words
	            return new WordArray.init(processedWords, nBytesReady);
	        },

	        /**
	         * Creates a copy of this object.
	         *
	         * @return {Object} The clone.
	         *
	         * @example
	         *
	         *     var clone = bufferedBlockAlgorithm.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone._data = this._data.clone();

	            return clone;
	        },

	        _minBufferSize: 0
	    });

	    /**
	     * Abstract hasher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
	     */
	    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
	        /**
	         * Configuration options.
	         */
	        cfg: Base.extend(),

	        /**
	         * Initializes a newly created hasher.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
	         *
	         * @example
	         *
	         *     var hasher = CryptoJS.algo.SHA256.create();
	         */
	        init: function (cfg) {
	            // Apply config defaults
	            this.cfg = this.cfg.extend(cfg);

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this hasher to its initial state.
	         *
	         * @example
	         *
	         *     hasher.reset();
	         */
	        reset: function () {
	            // Reset data buffer
	            BufferedBlockAlgorithm.reset.call(this);

	            // Perform concrete-hasher logic
	            this._doReset();
	        },

	        /**
	         * Updates this hasher with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {Hasher} This hasher.
	         *
	         * @example
	         *
	         *     hasher.update('message');
	         *     hasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            // Append
	            this._append(messageUpdate);

	            // Update the hash
	            this._process();

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the hash computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The hash.
	         *
	         * @example
	         *
	         *     var hash = hasher.finalize();
	         *     var hash = hasher.finalize('message');
	         *     var hash = hasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Final message update
	            if (messageUpdate) {
	                this._append(messageUpdate);
	            }

	            // Perform concrete-hasher logic
	            var hash = this._doFinalize();

	            return hash;
	        },

	        blockSize: 512/32,

	        /**
	         * Creates a shortcut function to a hasher's object interface.
	         *
	         * @param {Hasher} hasher The hasher to create a helper for.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
	         */
	        _createHelper: function (hasher) {
	            return function (message, cfg) {
	                return new hasher.init(cfg).finalize(message);
	            };
	        },

	        /**
	         * Creates a shortcut function to the HMAC's object interface.
	         *
	         * @param {Hasher} hasher The hasher to use in this HMAC helper.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
	         */
	        _createHmacHelper: function (hasher) {
	            return function (message, key) {
	                return new C_algo.HMAC.init(hasher, key).finalize(message);
	            };
	        }
	    });

	    /**
	     * Algorithm namespace.
	     */
	    var C_algo = C.algo = {};

	    return C;
	}(Math));


	return CryptoJS;

}));

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0), __webpack_require__(3));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./evpkdf"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	/**
	 * Cipher core components.
	 */
	CryptoJS.lib.Cipher || (function (undefined) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var WordArray = C_lib.WordArray;
	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
	    var C_enc = C.enc;
	    var Utf8 = C_enc.Utf8;
	    var Base64 = C_enc.Base64;
	    var C_algo = C.algo;
	    var EvpKDF = C_algo.EvpKDF;

	    /**
	     * Abstract base cipher template.
	     *
	     * @property {number} keySize This cipher's key size. Default: 4 (128 bits)
	     * @property {number} ivSize This cipher's IV size. Default: 4 (128 bits)
	     * @property {number} _ENC_XFORM_MODE A constant representing encryption mode.
	     * @property {number} _DEC_XFORM_MODE A constant representing decryption mode.
	     */
	    var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {WordArray} iv The IV to use for this operation.
	         */
	        cfg: Base.extend(),

	        /**
	         * Creates this cipher in encryption mode.
	         *
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {Cipher} A cipher instance.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
	         */
	        createEncryptor: function (key, cfg) {
	            return this.create(this._ENC_XFORM_MODE, key, cfg);
	        },

	        /**
	         * Creates this cipher in decryption mode.
	         *
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {Cipher} A cipher instance.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
	         */
	        createDecryptor: function (key, cfg) {
	            return this.create(this._DEC_XFORM_MODE, key, cfg);
	        },

	        /**
	         * Initializes a newly created cipher.
	         *
	         * @param {number} xformMode Either the encryption or decryption transormation mode constant.
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @example
	         *
	         *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
	         */
	        init: function (xformMode, key, cfg) {
	            // Apply config defaults
	            this.cfg = this.cfg.extend(cfg);

	            // Store transform mode and key
	            this._xformMode = xformMode;
	            this._key = key;

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this cipher to its initial state.
	         *
	         * @example
	         *
	         *     cipher.reset();
	         */
	        reset: function () {
	            // Reset data buffer
	            BufferedBlockAlgorithm.reset.call(this);

	            // Perform concrete-cipher logic
	            this._doReset();
	        },

	        /**
	         * Adds data to be encrypted or decrypted.
	         *
	         * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
	         *
	         * @return {WordArray} The data after processing.
	         *
	         * @example
	         *
	         *     var encrypted = cipher.process('data');
	         *     var encrypted = cipher.process(wordArray);
	         */
	        process: function (dataUpdate) {
	            // Append
	            this._append(dataUpdate);

	            // Process available blocks
	            return this._process();
	        },

	        /**
	         * Finalizes the encryption or decryption process.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
	         *
	         * @return {WordArray} The data after final processing.
	         *
	         * @example
	         *
	         *     var encrypted = cipher.finalize();
	         *     var encrypted = cipher.finalize('data');
	         *     var encrypted = cipher.finalize(wordArray);
	         */
	        finalize: function (dataUpdate) {
	            // Final data update
	            if (dataUpdate) {
	                this._append(dataUpdate);
	            }

	            // Perform concrete-cipher logic
	            var finalProcessedData = this._doFinalize();

	            return finalProcessedData;
	        },

	        keySize: 128/32,

	        ivSize: 128/32,

	        _ENC_XFORM_MODE: 1,

	        _DEC_XFORM_MODE: 2,

	        /**
	         * Creates shortcut functions to a cipher's object interface.
	         *
	         * @param {Cipher} cipher The cipher to create a helper for.
	         *
	         * @return {Object} An object with encrypt and decrypt shortcut functions.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
	         */
	        _createHelper: (function () {
	            function selectCipherStrategy(key) {
	                if (typeof key == 'string') {
	                    return PasswordBasedCipher;
	                } else {
	                    return SerializableCipher;
	                }
	            }

	            return function (cipher) {
	                return {
	                    encrypt: function (message, key, cfg) {
	                        return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
	                    },

	                    decrypt: function (ciphertext, key, cfg) {
	                        return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
	                    }
	                };
	            };
	        }())
	    });

	    /**
	     * Abstract base stream cipher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 1 (32 bits)
	     */
	    var StreamCipher = C_lib.StreamCipher = Cipher.extend({
	        _doFinalize: function () {
	            // Process partial blocks
	            var finalProcessedBlocks = this._process(!!'flush');

	            return finalProcessedBlocks;
	        },

	        blockSize: 1
	    });

	    /**
	     * Mode namespace.
	     */
	    var C_mode = C.mode = {};

	    /**
	     * Abstract base block cipher mode template.
	     */
	    var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
	        /**
	         * Creates this mode for encryption.
	         *
	         * @param {Cipher} cipher A block cipher instance.
	         * @param {Array} iv The IV words.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
	         */
	        createEncryptor: function (cipher, iv) {
	            return this.Encryptor.create(cipher, iv);
	        },

	        /**
	         * Creates this mode for decryption.
	         *
	         * @param {Cipher} cipher A block cipher instance.
	         * @param {Array} iv The IV words.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
	         */
	        createDecryptor: function (cipher, iv) {
	            return this.Decryptor.create(cipher, iv);
	        },

	        /**
	         * Initializes a newly created mode.
	         *
	         * @param {Cipher} cipher A block cipher instance.
	         * @param {Array} iv The IV words.
	         *
	         * @example
	         *
	         *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
	         */
	        init: function (cipher, iv) {
	            this._cipher = cipher;
	            this._iv = iv;
	        }
	    });

	    /**
	     * Cipher Block Chaining mode.
	     */
	    var CBC = C_mode.CBC = (function () {
	        /**
	         * Abstract base CBC mode.
	         */
	        var CBC = BlockCipherMode.extend();

	        /**
	         * CBC encryptor.
	         */
	        CBC.Encryptor = CBC.extend({
	            /**
	             * Processes the data block at offset.
	             *
	             * @param {Array} words The data words to operate on.
	             * @param {number} offset The offset where the block starts.
	             *
	             * @example
	             *
	             *     mode.processBlock(data.words, offset);
	             */
	            processBlock: function (words, offset) {
	                // Shortcuts
	                var cipher = this._cipher;
	                var blockSize = cipher.blockSize;

	                // XOR and encrypt
	                xorBlock.call(this, words, offset, blockSize);
	                cipher.encryptBlock(words, offset);

	                // Remember this block to use with next block
	                this._prevBlock = words.slice(offset, offset + blockSize);
	            }
	        });

	        /**
	         * CBC decryptor.
	         */
	        CBC.Decryptor = CBC.extend({
	            /**
	             * Processes the data block at offset.
	             *
	             * @param {Array} words The data words to operate on.
	             * @param {number} offset The offset where the block starts.
	             *
	             * @example
	             *
	             *     mode.processBlock(data.words, offset);
	             */
	            processBlock: function (words, offset) {
	                // Shortcuts
	                var cipher = this._cipher;
	                var blockSize = cipher.blockSize;

	                // Remember this block to use with next block
	                var thisBlock = words.slice(offset, offset + blockSize);

	                // Decrypt and XOR
	                cipher.decryptBlock(words, offset);
	                xorBlock.call(this, words, offset, blockSize);

	                // This block becomes the previous block
	                this._prevBlock = thisBlock;
	            }
	        });

	        function xorBlock(words, offset, blockSize) {
	            // Shortcut
	            var iv = this._iv;

	            // Choose mixing block
	            if (iv) {
	                var block = iv;

	                // Remove IV for subsequent blocks
	                this._iv = undefined;
	            } else {
	                var block = this._prevBlock;
	            }

	            // XOR blocks
	            for (var i = 0; i < blockSize; i++) {
	                words[offset + i] ^= block[i];
	            }
	        }

	        return CBC;
	    }());

	    /**
	     * Padding namespace.
	     */
	    var C_pad = C.pad = {};

	    /**
	     * PKCS #5/7 padding strategy.
	     */
	    var Pkcs7 = C_pad.Pkcs7 = {
	        /**
	         * Pads data using the algorithm defined in PKCS #5/7.
	         *
	         * @param {WordArray} data The data to pad.
	         * @param {number} blockSize The multiple that the data should be padded to.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
	         */
	        pad: function (data, blockSize) {
	            // Shortcut
	            var blockSizeBytes = blockSize * 4;

	            // Count padding bytes
	            var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

	            // Create padding word
	            var paddingWord = (nPaddingBytes << 24) | (nPaddingBytes << 16) | (nPaddingBytes << 8) | nPaddingBytes;

	            // Create padding
	            var paddingWords = [];
	            for (var i = 0; i < nPaddingBytes; i += 4) {
	                paddingWords.push(paddingWord);
	            }
	            var padding = WordArray.create(paddingWords, nPaddingBytes);

	            // Add padding
	            data.concat(padding);
	        },

	        /**
	         * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
	         *
	         * @param {WordArray} data The data to unpad.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     CryptoJS.pad.Pkcs7.unpad(wordArray);
	         */
	        unpad: function (data) {
	            // Get number of padding bytes from last byte
	            var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

	            // Remove padding
	            data.sigBytes -= nPaddingBytes;
	        }
	    };

	    /**
	     * Abstract base block cipher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 4 (128 bits)
	     */
	    var BlockCipher = C_lib.BlockCipher = Cipher.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {Mode} mode The block mode to use. Default: CBC
	         * @property {Padding} padding The padding strategy to use. Default: Pkcs7
	         */
	        cfg: Cipher.cfg.extend({
	            mode: CBC,
	            padding: Pkcs7
	        }),

	        reset: function () {
	            // Reset cipher
	            Cipher.reset.call(this);

	            // Shortcuts
	            var cfg = this.cfg;
	            var iv = cfg.iv;
	            var mode = cfg.mode;

	            // Reset block mode
	            if (this._xformMode == this._ENC_XFORM_MODE) {
	                var modeCreator = mode.createEncryptor;
	            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
	                var modeCreator = mode.createDecryptor;
	                // Keep at least one block in the buffer for unpadding
	                this._minBufferSize = 1;
	            }

	            if (this._mode && this._mode.__creator == modeCreator) {
	                this._mode.init(this, iv && iv.words);
	            } else {
	                this._mode = modeCreator.call(mode, this, iv && iv.words);
	                this._mode.__creator = modeCreator;
	            }
	        },

	        _doProcessBlock: function (words, offset) {
	            this._mode.processBlock(words, offset);
	        },

	        _doFinalize: function () {
	            // Shortcut
	            var padding = this.cfg.padding;

	            // Finalize
	            if (this._xformMode == this._ENC_XFORM_MODE) {
	                // Pad data
	                padding.pad(this._data, this.blockSize);

	                // Process final blocks
	                var finalProcessedBlocks = this._process(!!'flush');
	            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
	                // Process final blocks
	                var finalProcessedBlocks = this._process(!!'flush');

	                // Unpad data
	                padding.unpad(finalProcessedBlocks);
	            }

	            return finalProcessedBlocks;
	        },

	        blockSize: 128/32
	    });

	    /**
	     * A collection of cipher parameters.
	     *
	     * @property {WordArray} ciphertext The raw ciphertext.
	     * @property {WordArray} key The key to this ciphertext.
	     * @property {WordArray} iv The IV used in the ciphering operation.
	     * @property {WordArray} salt The salt used with a key derivation function.
	     * @property {Cipher} algorithm The cipher algorithm.
	     * @property {Mode} mode The block mode used in the ciphering operation.
	     * @property {Padding} padding The padding scheme used in the ciphering operation.
	     * @property {number} blockSize The block size of the cipher.
	     * @property {Format} formatter The default formatting strategy to convert this cipher params object to a string.
	     */
	    var CipherParams = C_lib.CipherParams = Base.extend({
	        /**
	         * Initializes a newly created cipher params object.
	         *
	         * @param {Object} cipherParams An object with any of the possible cipher parameters.
	         *
	         * @example
	         *
	         *     var cipherParams = CryptoJS.lib.CipherParams.create({
	         *         ciphertext: ciphertextWordArray,
	         *         key: keyWordArray,
	         *         iv: ivWordArray,
	         *         salt: saltWordArray,
	         *         algorithm: CryptoJS.algo.AES,
	         *         mode: CryptoJS.mode.CBC,
	         *         padding: CryptoJS.pad.PKCS7,
	         *         blockSize: 4,
	         *         formatter: CryptoJS.format.OpenSSL
	         *     });
	         */
	        init: function (cipherParams) {
	            this.mixIn(cipherParams);
	        },

	        /**
	         * Converts this cipher params object to a string.
	         *
	         * @param {Format} formatter (Optional) The formatting strategy to use.
	         *
	         * @return {string} The stringified cipher params.
	         *
	         * @throws Error If neither the formatter nor the default formatter is set.
	         *
	         * @example
	         *
	         *     var string = cipherParams + '';
	         *     var string = cipherParams.toString();
	         *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
	         */
	        toString: function (formatter) {
	            return (formatter || this.formatter).stringify(this);
	        }
	    });

	    /**
	     * Format namespace.
	     */
	    var C_format = C.format = {};

	    /**
	     * OpenSSL formatting strategy.
	     */
	    var OpenSSLFormatter = C_format.OpenSSL = {
	        /**
	         * Converts a cipher params object to an OpenSSL-compatible string.
	         *
	         * @param {CipherParams} cipherParams The cipher params object.
	         *
	         * @return {string} The OpenSSL-compatible string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
	         */
	        stringify: function (cipherParams) {
	            // Shortcuts
	            var ciphertext = cipherParams.ciphertext;
	            var salt = cipherParams.salt;

	            // Format
	            if (salt) {
	                var wordArray = WordArray.create([0x53616c74, 0x65645f5f]).concat(salt).concat(ciphertext);
	            } else {
	                var wordArray = ciphertext;
	            }

	            return wordArray.toString(Base64);
	        },

	        /**
	         * Converts an OpenSSL-compatible string to a cipher params object.
	         *
	         * @param {string} openSSLStr The OpenSSL-compatible string.
	         *
	         * @return {CipherParams} The cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
	         */
	        parse: function (openSSLStr) {
	            // Parse base64
	            var ciphertext = Base64.parse(openSSLStr);

	            // Shortcut
	            var ciphertextWords = ciphertext.words;

	            // Test for salt
	            if (ciphertextWords[0] == 0x53616c74 && ciphertextWords[1] == 0x65645f5f) {
	                // Extract salt
	                var salt = WordArray.create(ciphertextWords.slice(2, 4));

	                // Remove salt from ciphertext
	                ciphertextWords.splice(0, 4);
	                ciphertext.sigBytes -= 16;
	            }

	            return CipherParams.create({ ciphertext: ciphertext, salt: salt });
	        }
	    };

	    /**
	     * A cipher wrapper that returns ciphertext as a serializable cipher params object.
	     */
	    var SerializableCipher = C_lib.SerializableCipher = Base.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
	         */
	        cfg: Base.extend({
	            format: OpenSSLFormatter
	        }),

	        /**
	         * Encrypts a message.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {WordArray|string} message The message to encrypt.
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {CipherParams} A cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
	         */
	        encrypt: function (cipher, message, key, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Encrypt
	            var encryptor = cipher.createEncryptor(key, cfg);
	            var ciphertext = encryptor.finalize(message);

	            // Shortcut
	            var cipherCfg = encryptor.cfg;

	            // Create and return serializable cipher params
	            return CipherParams.create({
	                ciphertext: ciphertext,
	                key: key,
	                iv: cipherCfg.iv,
	                algorithm: cipher,
	                mode: cipherCfg.mode,
	                padding: cipherCfg.padding,
	                blockSize: cipher.blockSize,
	                formatter: cfg.format
	            });
	        },

	        /**
	         * Decrypts serialized ciphertext.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {WordArray} The plaintext.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
	         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
	         */
	        decrypt: function (cipher, ciphertext, key, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Convert string to CipherParams
	            ciphertext = this._parse(ciphertext, cfg.format);

	            // Decrypt
	            var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);

	            return plaintext;
	        },

	        /**
	         * Converts serialized ciphertext to CipherParams,
	         * else assumed CipherParams already and returns ciphertext unchanged.
	         *
	         * @param {CipherParams|string} ciphertext The ciphertext.
	         * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
	         *
	         * @return {CipherParams} The unserialized ciphertext.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
	         */
	        _parse: function (ciphertext, format) {
	            if (typeof ciphertext == 'string') {
	                return format.parse(ciphertext, this);
	            } else {
	                return ciphertext;
	            }
	        }
	    });

	    /**
	     * Key derivation function namespace.
	     */
	    var C_kdf = C.kdf = {};

	    /**
	     * OpenSSL key derivation function.
	     */
	    var OpenSSLKdf = C_kdf.OpenSSL = {
	        /**
	         * Derives a key and IV from a password.
	         *
	         * @param {string} password The password to derive from.
	         * @param {number} keySize The size in words of the key to generate.
	         * @param {number} ivSize The size in words of the IV to generate.
	         * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
	         *
	         * @return {CipherParams} A cipher params object with the key, IV, and salt.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
	         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
	         */
	        execute: function (password, keySize, ivSize, salt) {
	            // Generate random salt
	            if (!salt) {
	                salt = WordArray.random(64/8);
	            }

	            // Derive key and IV
	            var key = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);

	            // Separate key and IV
	            var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
	            key.sigBytes = keySize * 4;

	            // Return params
	            return CipherParams.create({ key: key, iv: iv, salt: salt });
	        }
	    };

	    /**
	     * A serializable cipher wrapper that derives the key from a password,
	     * and returns ciphertext as a serializable cipher params object.
	     */
	    var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
	         */
	        cfg: SerializableCipher.cfg.extend({
	            kdf: OpenSSLKdf
	        }),

	        /**
	         * Encrypts a message using a password.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {WordArray|string} message The message to encrypt.
	         * @param {string} password The password.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {CipherParams} A cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
	         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
	         */
	        encrypt: function (cipher, message, password, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Derive key and other params
	            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);

	            // Add IV to config
	            cfg.iv = derivedParams.iv;

	            // Encrypt
	            var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);

	            // Mix in derived params
	            ciphertext.mixIn(derivedParams);

	            return ciphertext;
	        },

	        /**
	         * Decrypts serialized ciphertext using a password.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
	         * @param {string} password The password.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {WordArray} The plaintext.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
	         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
	         */
	        decrypt: function (cipher, ciphertext, password, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Convert string to CipherParams
	            ciphertext = this._parse(ciphertext, cfg.format);

	            // Derive key and other params
	            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);

	            // Add IV to config
	            cfg.iv = derivedParams.iv;

	            // Decrypt
	            var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);

	            return plaintext;
	        }
	    });
	}());


}));

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(37);
var isBuffer = __webpack_require__(103);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0), __webpack_require__(20), __webpack_require__(21));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./sha1", "./hmac"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var WordArray = C_lib.WordArray;
	    var C_algo = C.algo;
	    var MD5 = C_algo.MD5;

	    /**
	     * This key derivation function is meant to conform with EVP_BytesToKey.
	     * www.openssl.org/docs/crypto/EVP_BytesToKey.html
	     */
	    var EvpKDF = C_algo.EvpKDF = Base.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
	         * @property {Hasher} hasher The hash algorithm to use. Default: MD5
	         * @property {number} iterations The number of iterations to perform. Default: 1
	         */
	        cfg: Base.extend({
	            keySize: 128/32,
	            hasher: MD5,
	            iterations: 1
	        }),

	        /**
	         * Initializes a newly created key derivation function.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for the derivation.
	         *
	         * @example
	         *
	         *     var kdf = CryptoJS.algo.EvpKDF.create();
	         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
	         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
	         */
	        init: function (cfg) {
	            this.cfg = this.cfg.extend(cfg);
	        },

	        /**
	         * Derives a key from a password.
	         *
	         * @param {WordArray|string} password The password.
	         * @param {WordArray|string} salt A salt.
	         *
	         * @return {WordArray} The derived key.
	         *
	         * @example
	         *
	         *     var key = kdf.compute(password, salt);
	         */
	        compute: function (password, salt) {
	            // Shortcut
	            var cfg = this.cfg;

	            // Init hasher
	            var hasher = cfg.hasher.create();

	            // Initial values
	            var derivedKey = WordArray.create();

	            // Shortcuts
	            var derivedKeyWords = derivedKey.words;
	            var keySize = cfg.keySize;
	            var iterations = cfg.iterations;

	            // Generate key
	            while (derivedKeyWords.length < keySize) {
	                if (block) {
	                    hasher.update(block);
	                }
	                var block = hasher.update(password).finalize(salt);
	                hasher.reset();

	                // Iterations
	                for (var i = 1; i < iterations; i++) {
	                    block = hasher.finalize(block);
	                    hasher.reset();
	                }

	                derivedKey.concat(block);
	            }
	            derivedKey.sigBytes = keySize * 4;

	            return derivedKey;
	        }
	    });

	    /**
	     * Derives a key from a password.
	     *
	     * @param {WordArray|string} password The password.
	     * @param {WordArray|string} salt A salt.
	     * @param {Object} cfg (Optional) The configuration options to use for this computation.
	     *
	     * @return {WordArray} The derived key.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var key = CryptoJS.EvpKDF(password, salt);
	     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8 });
	     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8, iterations: 1000 });
	     */
	    C.EvpKDF = function (password, salt, cfg) {
	        return EvpKDF.create(cfg).compute(password, salt);
	    };
	}());


	return CryptoJS.EvpKDF;

}));

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

/**
 *
 * @author xliu
 * Date: 30/04/13
 */
//goog.provide('gcm.notification.model.GCMNotification');

/**
 * @class The base class of notification data model.
 * @constructor
 *
 * @param {string} type The type of a notification, should be from the enum list
 *                      GCMNotification.TYPE defined in GCMNotification class.
 * @param {Object|*} body The body of a notification with its content depending on
 *                      The type of a notification.
 * @param {Function=} callback (optional) The callback function a notification. This is
 *                      optional and only applies if notification expects resumption.
 */

/**
        * enumerate of notification types
        * @enum {string}
        * */
var TYPE = {
    ERROR: 'ERROR',
    SESSION_TIMER: 'SESSION_TIMER',
    SESSION_STATS: 'SESSION_STATS',
    BONUS_BAR: 'BONUS_BAR',
    BONUS_BAR_FILLED: 'BONUS_BAR_FILLED',
    FREEBET_REWARD: 'FREEBET_REWARD',
    GENERIC_MESSAGE: 'GENERIC_MESSAGE',
    GS_MESSAGE: 'GS_MESSAGE',
    COMMONUI_FREEROUNDS_AWARD: 'COMMONUI_FREEROUNDS_AWARD',
    COMMONUI_FREEROUNDS_IN_PROGRESS: 'COMMONUI_FREEROUNDS_IN_PROGRESS',
    COMMONUI_FREEROUNDS_UPDATE: 'COMMONUI_FREEROUNDS_UPDATE',
    GAME_FREEROUNDS_UPDATE: 'GAME_FREEROUNDS_UPDATE',
    SYNDICATED_JACKPOT_WIN_AWARD: 'SYNDICATED_JACKPOT_WIN_AWARD',
    SYNDICATED_JACKPOT_PROGRESS_BAR: 'SYNDICATED_JACKPOT_PROGRESS_BAR'
};

/**
* Enumeration of parameters within body of error notification.
* Critical notification. Should be displayed straight away regardless of game state,
* then wait for CommonUI callback, meanwhile queueing all other pending notifications.
*/
var ERROR = {
    CATEGORY: 'errorCategory',
    SEVERITY: 'errorSeverity',
    CODE: 'errorCode',
    MESSAGE: 'errorMessage',
    PARAMS: 'errorParams'
};

/**
 * Enumeration of parameters within body of session stats notification.
 * Session Stats information: Important notification. Should be displayed as soon as game is idle state,
 * then wait forCommonUI callback, meanwhile queueing all other pending notifications.
 */
var SESSION_STATS = {
    STAKES: 'stakes',
    WINNINGS: 'winnings',
    TURNOVER: 'turnover'
};

/**
 * Enumeration of parameters within body of session timer notification.
 * Session Timer information: Normal notification. Pushed to CommonUI immediately and no need to wait for confirmation.
 */
var SESSION_TIMER = {
    DURATION: 'duration'
};

/**
 * Enumeration of parameters within body of bonus bar notification.
 * Bonus Bar percentage change: Normal notification.
 * Pushed to CommonUI immediately and no need to wait for confirmation.
 */
var BONUS_BAR = {
    PERCENT: 'percent'
};

/**
 * Enumeration of parameters within body of freebet  notification.
 * Freebet reward message: Important notification. Should be displayed as soon as game is idle state,
 * then wait forCommonUI callback, meanwhile queueing all other pending notifications.
 */
var FREEBET = {
    AMOUNT: 'freebet'
};

/**
 * Any of the critical/important notification types detailed here
 * can have an optional timeout field in the notification body.
 * If the user does not acknoledge within this time, the notification will be cleared.
 */
var TIMEOUT = 'timeout';

/** @type {Array}
 * array of asap notifications types
 * */
/*const ASAP = [
    TYPE.ERROR;
];*/

/** @type {Array}
 * array of acknowledgement required notification types
 * */
var ACK = [TYPE.ERROR, TYPE.SESSION_TIMER, TYPE.SESSION_STATS, TYPE.BONUS_BAR, TYPE.BONUS_BAR_FILLED, TYPE.FREEBET_REWARD, TYPE.GENERIC_MESSAGE];

var GCMNotification = exports.GCMNotification = function () {
    function GCMNotification(type, body, callback) {
        _classCallCheck(this, GCMNotification);

        this.type = type;
        this.body = body;

        /** @private
         * @type {Function|undefined}
         * The callback function a notification. This is optional
         * and only applies if notification expects resumption.*/
        this.callback_ = callback;

        /** @private
         * @type {boolean}*/
        this.isUnique_ = false;

        /**
        * Returns the unique state of this notification. A unique notification can only have once instance in
        * a notification queue.
        * @return {boolean} the unique state of this notification.
        * */
        GCMNotification.prototype.isUnique = function () {
            return this.isUnique_;
        };

        /**
         * Invokes the callback function of notification, which should be done at
         * resumption of outstanding notification.
         * @param {*=} param The feedback parameter of notification. Its content depends
         *              on the notification specific. Which should be defined in notification
         *              data model.
         * */
        GCMNotification.prototype.invokeCallback = function (param) {
            if (this.callback_) this.callback_.call(null, param);
        };

        /**
         * For notifications that should only have one unique instance in queue of a same type.
         * The newer instance of a unique notification will replace the old one in queue, but
         * not take the old notifications position in queue.
         * */
        GCMNotification.prototype.markAsUnique = function () {
            this.isUnique_ = true;
        };
    }

    _createClass(GCMNotification, null, [{
        key: 'TYPE',
        get: function get() {
            return TYPE;
        }
    }, {
        key: 'ERROR',
        get: function get() {
            return ERROR;
        }
    }, {
        key: 'SESSION_STATS',
        get: function get() {
            return SESSION_STATS;
        }
    }, {
        key: 'SESSION_TIMER',
        get: function get() {
            return;
        }
    }, {
        key: 'BONUS_BAR',
        get: function get() {
            return BONUS_BAR;
        }
    }, {
        key: 'FREEBET',
        get: function get() {
            return FREEBET;
        }
    }, {
        key: 'GENERIC_MESSAGE',
        get: function get() {
            return GENERIC_MESSAGE;
        }
    }, {
        key: 'ASAP',
        get: function get() {
            return TYPE.ERROR;
        }
    }, {
        key: 'TIMEOUT',
        get: function get() {
            return;
        }
    }, {
        key: 'ACK',
        get: function get() {
            return ACK;
        }
    }]);

    return GCMNotification;
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var C_enc = C.enc;

	    /**
	     * Base64 encoding strategy.
	     */
	    var Base64 = C_enc.Base64 = {
	        /**
	         * Converts a word array to a Base64 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Base64 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;
	            var map = this._map;

	            // Clamp excess bits
	            wordArray.clamp();

	            // Convert
	            var base64Chars = [];
	            for (var i = 0; i < sigBytes; i += 3) {
	                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
	                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
	                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

	                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

	                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
	                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
	                }
	            }

	            // Add padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                while (base64Chars.length % 4) {
	                    base64Chars.push(paddingChar);
	                }
	            }

	            return base64Chars.join('');
	        },

	        /**
	         * Converts a Base64 string to a word array.
	         *
	         * @param {string} base64Str The Base64 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
	         */
	        parse: function (base64Str) {
	            // Shortcuts
	            var base64StrLength = base64Str.length;
	            var map = this._map;
	            var reverseMap = this._reverseMap;

	            if (!reverseMap) {
	                    reverseMap = this._reverseMap = [];
	                    for (var j = 0; j < map.length; j++) {
	                        reverseMap[map.charCodeAt(j)] = j;
	                    }
	            }

	            // Ignore padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                var paddingIndex = base64Str.indexOf(paddingChar);
	                if (paddingIndex !== -1) {
	                    base64StrLength = paddingIndex;
	                }
	            }

	            // Convert
	            return parseLoop(base64Str, base64StrLength, reverseMap);

	        },

	        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
	    };

	    function parseLoop(base64Str, base64StrLength, reverseMap) {
	      var words = [];
	      var nBytes = 0;
	      for (var i = 0; i < base64StrLength; i++) {
	          if (i % 4) {
	              var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
	              var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
	              words[nBytes >>> 2] |= (bits1 | bits2) << (24 - (nBytes % 4) * 8);
	              nBytes++;
	          }
	      }
	      return WordArray.create(words, nBytes);
	    }
	}());


	return CryptoJS.enc.Base64;

}));

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Constants table
	    var T = [];

	    // Compute constants
	    (function () {
	        for (var i = 0; i < 64; i++) {
	            T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
	        }
	    }());

	    /**
	     * MD5 hash algorithm.
	     */
	    var MD5 = C_algo.MD5 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init([
	                0x67452301, 0xefcdab89,
	                0x98badcfe, 0x10325476
	            ]);
	        },

	        _doProcessBlock: function (M, offset) {
	            // Swap endian
	            for (var i = 0; i < 16; i++) {
	                // Shortcuts
	                var offset_i = offset + i;
	                var M_offset_i = M[offset_i];

	                M[offset_i] = (
	                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
	                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
	                );
	            }

	            // Shortcuts
	            var H = this._hash.words;

	            var M_offset_0  = M[offset + 0];
	            var M_offset_1  = M[offset + 1];
	            var M_offset_2  = M[offset + 2];
	            var M_offset_3  = M[offset + 3];
	            var M_offset_4  = M[offset + 4];
	            var M_offset_5  = M[offset + 5];
	            var M_offset_6  = M[offset + 6];
	            var M_offset_7  = M[offset + 7];
	            var M_offset_8  = M[offset + 8];
	            var M_offset_9  = M[offset + 9];
	            var M_offset_10 = M[offset + 10];
	            var M_offset_11 = M[offset + 11];
	            var M_offset_12 = M[offset + 12];
	            var M_offset_13 = M[offset + 13];
	            var M_offset_14 = M[offset + 14];
	            var M_offset_15 = M[offset + 15];

	            // Working varialbes
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];

	            // Computation
	            a = FF(a, b, c, d, M_offset_0,  7,  T[0]);
	            d = FF(d, a, b, c, M_offset_1,  12, T[1]);
	            c = FF(c, d, a, b, M_offset_2,  17, T[2]);
	            b = FF(b, c, d, a, M_offset_3,  22, T[3]);
	            a = FF(a, b, c, d, M_offset_4,  7,  T[4]);
	            d = FF(d, a, b, c, M_offset_5,  12, T[5]);
	            c = FF(c, d, a, b, M_offset_6,  17, T[6]);
	            b = FF(b, c, d, a, M_offset_7,  22, T[7]);
	            a = FF(a, b, c, d, M_offset_8,  7,  T[8]);
	            d = FF(d, a, b, c, M_offset_9,  12, T[9]);
	            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
	            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
	            a = FF(a, b, c, d, M_offset_12, 7,  T[12]);
	            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
	            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
	            b = FF(b, c, d, a, M_offset_15, 22, T[15]);

	            a = GG(a, b, c, d, M_offset_1,  5,  T[16]);
	            d = GG(d, a, b, c, M_offset_6,  9,  T[17]);
	            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
	            b = GG(b, c, d, a, M_offset_0,  20, T[19]);
	            a = GG(a, b, c, d, M_offset_5,  5,  T[20]);
	            d = GG(d, a, b, c, M_offset_10, 9,  T[21]);
	            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
	            b = GG(b, c, d, a, M_offset_4,  20, T[23]);
	            a = GG(a, b, c, d, M_offset_9,  5,  T[24]);
	            d = GG(d, a, b, c, M_offset_14, 9,  T[25]);
	            c = GG(c, d, a, b, M_offset_3,  14, T[26]);
	            b = GG(b, c, d, a, M_offset_8,  20, T[27]);
	            a = GG(a, b, c, d, M_offset_13, 5,  T[28]);
	            d = GG(d, a, b, c, M_offset_2,  9,  T[29]);
	            c = GG(c, d, a, b, M_offset_7,  14, T[30]);
	            b = GG(b, c, d, a, M_offset_12, 20, T[31]);

	            a = HH(a, b, c, d, M_offset_5,  4,  T[32]);
	            d = HH(d, a, b, c, M_offset_8,  11, T[33]);
	            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
	            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
	            a = HH(a, b, c, d, M_offset_1,  4,  T[36]);
	            d = HH(d, a, b, c, M_offset_4,  11, T[37]);
	            c = HH(c, d, a, b, M_offset_7,  16, T[38]);
	            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
	            a = HH(a, b, c, d, M_offset_13, 4,  T[40]);
	            d = HH(d, a, b, c, M_offset_0,  11, T[41]);
	            c = HH(c, d, a, b, M_offset_3,  16, T[42]);
	            b = HH(b, c, d, a, M_offset_6,  23, T[43]);
	            a = HH(a, b, c, d, M_offset_9,  4,  T[44]);
	            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
	            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
	            b = HH(b, c, d, a, M_offset_2,  23, T[47]);

	            a = II(a, b, c, d, M_offset_0,  6,  T[48]);
	            d = II(d, a, b, c, M_offset_7,  10, T[49]);
	            c = II(c, d, a, b, M_offset_14, 15, T[50]);
	            b = II(b, c, d, a, M_offset_5,  21, T[51]);
	            a = II(a, b, c, d, M_offset_12, 6,  T[52]);
	            d = II(d, a, b, c, M_offset_3,  10, T[53]);
	            c = II(c, d, a, b, M_offset_10, 15, T[54]);
	            b = II(b, c, d, a, M_offset_1,  21, T[55]);
	            a = II(a, b, c, d, M_offset_8,  6,  T[56]);
	            d = II(d, a, b, c, M_offset_15, 10, T[57]);
	            c = II(c, d, a, b, M_offset_6,  15, T[58]);
	            b = II(b, c, d, a, M_offset_13, 21, T[59]);
	            a = II(a, b, c, d, M_offset_4,  6,  T[60]);
	            d = II(d, a, b, c, M_offset_11, 10, T[61]);
	            c = II(c, d, a, b, M_offset_2,  15, T[62]);
	            b = II(b, c, d, a, M_offset_9,  21, T[63]);

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);

	            var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
	            var nBitsTotalL = nBitsTotal;
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = (
	                (((nBitsTotalH << 8)  | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotalH << 24) | (nBitsTotalH >>> 8))  & 0xff00ff00)
	            );
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
	                (((nBitsTotalL << 8)  | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotalL << 24) | (nBitsTotalL >>> 8))  & 0xff00ff00)
	            );

	            data.sigBytes = (dataWords.length + 1) * 4;

	            // Hash final blocks
	            this._process();

	            // Shortcuts
	            var hash = this._hash;
	            var H = hash.words;

	            // Swap endian
	            for (var i = 0; i < 4; i++) {
	                // Shortcut
	                var H_i = H[i];

	                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
	                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
	            }

	            // Return final computed hash
	            return hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    function FF(a, b, c, d, x, s, t) {
	        var n = a + ((b & c) | (~b & d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function GG(a, b, c, d, x, s, t) {
	        var n = a + ((b & d) | (c & ~d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function HH(a, b, c, d, x, s, t) {
	        var n = a + (b ^ c ^ d) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function II(a, b, c, d, x, s, t) {
	        var n = a + (c ^ (b | ~d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.MD5('message');
	     *     var hash = CryptoJS.MD5(wordArray);
	     */
	    C.MD5 = Hasher._createHelper(MD5);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacMD5(message, key);
	     */
	    C.HmacMD5 = Hasher._createHmacHelper(MD5);
	}(Math));


	return CryptoJS.MD5;

}));

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var uri = __webpack_require__(29);

var ValidationError = exports.ValidationError = function ValidationError (message, instance, schema, propertyPath, name, argument) {
  if (propertyPath) {
    this.property = propertyPath;
  }
  if (message) {
    this.message = message;
  }
  if (schema) {
    if (schema.id) {
      this.schema = schema.id;
    } else {
      this.schema = schema;
    }
  }
  if (instance) {
    this.instance = instance;
  }
  this.name = name;
  this.argument = argument;
  this.stack = this.toString();
};

ValidationError.prototype.toString = function toString() {
  return this.property + ' ' + this.message;
};

var ValidatorResult = exports.ValidatorResult = function ValidatorResult(instance, schema, options, ctx) {
  this.instance = instance;
  this.schema = schema;
  this.propertyPath = ctx.propertyPath;
  this.errors = [];
  this.throwError = options && options.throwError;
  this.disableFormat = options && options.disableFormat === true;
};

ValidatorResult.prototype.addError = function addError(detail) {
  var err;
  if (typeof detail == 'string') {
    err = new ValidationError(detail, this.instance, this.schema, this.propertyPath);
  } else {
    if (!detail) throw new Error('Missing error detail');
    if (!detail.message) throw new Error('Missing error message');
    if (!detail.name) throw new Error('Missing validator type');
    err = new ValidationError(detail.message, this.instance, this.schema, this.propertyPath, detail.name, detail.argument);
  }

  if (this.throwError) {
    throw err;
  }
  this.errors.push(err);
  return err;
};

ValidatorResult.prototype.importErrors = function importErrors(res) {
  if (typeof res == 'string' || (res && res.validatorType)) {
    this.addError(res);
  } else if (res && res.errors) {
    Array.prototype.push.apply(this.errors, res.errors);
  }
};

function stringizer (v,i){
  return i+': '+v.toString()+'\n';
}
ValidatorResult.prototype.toString = function toString(res) {
  return this.errors.map(stringizer).join('');
};

Object.defineProperty(ValidatorResult.prototype, "valid", { get: function() {
  return !this.errors.length;
} });

/**
 * Describes a problem with a Schema which prevents validation of an instance
 * @name SchemaError
 * @constructor
 */
var SchemaError = exports.SchemaError = function SchemaError (msg, schema) {
  this.message = msg;
  this.schema = schema;
  Error.call(this, msg);
  Error.captureStackTrace(this, SchemaError);
};
SchemaError.prototype = Object.create(Error.prototype,
  { constructor: {value: SchemaError, enumerable: false}
  , name: {value: 'SchemaError', enumerable: false}
  });

var SchemaContext = exports.SchemaContext = function SchemaContext (schema, options, propertyPath, base, schemas) {
  this.schema = schema;
  this.options = options;
  this.propertyPath = propertyPath;
  this.base = base;
  this.schemas = schemas;
};

SchemaContext.prototype.resolve = function resolve (target) {
  return uri.resolve(this.base, target);
};

SchemaContext.prototype.makeChild = function makeChild(schema, propertyName){
  var propertyPath = (propertyName===undefined) ? this.propertyPath : this.propertyPath+makeSuffix(propertyName);
  var base = uri.resolve(this.base, schema.id||'');
  var ctx = new SchemaContext(schema, this.options, propertyPath, base, Object.create(this.schemas));
  if(schema.id && !ctx.schemas[base]){
    ctx.schemas[base] = schema;
  }
  return ctx;
}

var FORMAT_REGEXPS = exports.FORMAT_REGEXPS = {
  'date-time': /^\d{4}-(?:0[0-9]{1}|1[0-2]{1})-(3[01]|0[1-9]|[12][0-9])[tT ](2[0-4]|[01][0-9]):([0-5][0-9]):(60|[0-5][0-9])(\.\d+)?([zZ]|[+-]([0-5][0-9]):(60|[0-5][0-9]))$/,
  'date': /^\d{4}-(?:0[0-9]{1}|1[0-2]{1})-(3[01]|0[1-9]|[12][0-9])$/,
  'time': /^(2[0-4]|[01][0-9]):([0-5][0-9]):(60|[0-5][0-9])$/,

  'email': /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/,
  'ip-address': /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  'ipv6': /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,
  'uri': /^[a-zA-Z][a-zA-Z0-9+-.]*:[^\s]*$/,

  'color': /^(#?([0-9A-Fa-f]{3}){1,2}\b|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|(rgb\(\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*\))|(rgb\(\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*\)))$/,

  // hostname regex from: http://stackoverflow.com/a/1420225/5628
  'hostname': /^(?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?$/,
  'host-name': /^(?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?$/,

  'alpha': /^[a-zA-Z]+$/,
  'alphanumeric': /^[a-zA-Z0-9]+$/,
  'utc-millisec': function (input) {
    return (typeof input === 'string') && parseFloat(input) === parseInt(input, 10) && !isNaN(input);
  },
  'regex': function (input) {
    var result = true;
    try {
      new RegExp(input);
    } catch (e) {
      result = false;
    }
    return result;
  },
  'style': /\s*(.+?):\s*([^;]+);?/g,
  'phone': /^\+(?:[0-9] ?){6,14}[0-9]$/
};

FORMAT_REGEXPS.regexp = FORMAT_REGEXPS.regex;
FORMAT_REGEXPS.pattern = FORMAT_REGEXPS.regex;
FORMAT_REGEXPS.ipv4 = FORMAT_REGEXPS['ip-address'];

exports.isFormat = function isFormat (input, format, validator) {
  if (typeof input === 'string' && FORMAT_REGEXPS[format] !== undefined) {
    if (FORMAT_REGEXPS[format] instanceof RegExp) {
      return FORMAT_REGEXPS[format].test(input);
    }
    if (typeof FORMAT_REGEXPS[format] === 'function') {
      return FORMAT_REGEXPS[format](input);
    }
  } else if (validator && validator.customFormats &&
      typeof validator.customFormats[format] === 'function') {
    return validator.customFormats[format](input);
  }
  return true;
};

var makeSuffix = exports.makeSuffix = function makeSuffix (key) {
  key = key.toString();
  // This function could be capable of outputting valid a ECMAScript string, but the
  // resulting code for testing which form to use would be tens of thousands of characters long
  // That means this will use the name form for some illegal forms
  if (!key.match(/[.\s\[\]]/) && !key.match(/^[\d]/)) {
    return '.' + key;
  }
  if (key.match(/^\d+$/)) {
    return '[' + key + ']';
  }
  return '[' + JSON.stringify(key) + ']';
};

exports.deepCompareStrict = function deepCompareStrict (a, b) {
  if (typeof a !== typeof b) {
    return false;
  }
  if (a instanceof Array) {
    if (!(b instanceof Array)) {
      return false;
    }
    if (a.length !== b.length) {
      return false;
    }
    return a.every(function (v, i) {
      return deepCompareStrict(a[i], b[i]);
    });
  }
  if (typeof a === 'object') {
    if (!a || !b) {
      return a === b;
    }
    var aKeys = Object.keys(a);
    var bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) {
      return false;
    }
    return aKeys.every(function (v) {
      return deepCompareStrict(a[v], b[v]);
    });
  }
  return a === b;
};

function deepMerger (target, dst, e, i) {
  if (typeof e === 'object') {
    dst[i] = deepMerge(target[i], e)
  } else {
    if (target.indexOf(e) === -1) {
      dst.push(e)
    }
  }
}

function copyist (src, dst, key) {
  dst[key] = src[key];
}

function copyistWithDeepMerge (target, src, dst, key) {
  if (typeof src[key] !== 'object' || !src[key]) {
    dst[key] = src[key];
  }
  else {
    if (!target[key]) {
      dst[key] = src[key];
    } else {
      dst[key] = deepMerge(target[key], src[key])
    }
  }
}

function deepMerge (target, src) {
  var array = Array.isArray(src);
  var dst = array && [] || {};

  if (array) {
    target = target || [];
    dst = dst.concat(target);
    src.forEach(deepMerger.bind(null, target, dst));
  } else {
    if (target && typeof target === 'object') {
      Object.keys(target).forEach(copyist.bind(null, target, dst));
    }
    Object.keys(src).forEach(copyistWithDeepMerge.bind(null, target, src, dst));
  }

  return dst;
};

module.exports.deepMerge = deepMerge;

/**
 * Validates instance against the provided schema
 * Implements URI+JSON Pointer encoding, e.g. "%7e"="~0"=>"~", "~1"="%2f"=>"/"
 * @param o
 * @param s The path to walk o along
 * @return any
 */
exports.objectGetPath = function objectGetPath(o, s) {
  var parts = s.split('/').slice(1);
  var k;
  while (typeof (k=parts.shift()) == 'string') {
    var n = decodeURIComponent(k.replace(/~0/,'~').replace(/~1/g,'/'));
    if (!(n in o)) return;
    o = o[n];
  }
  return o;
};

function pathEncoder (v) {
  return '/'+encodeURIComponent(v).replace(/~/g,'%7E');
}
/**
 * Accept an Array of property names and return a JSON Pointer URI fragment
 * @param Array a
 * @return {String}
 */
exports.encodePath = function encodePointer(a){
	// ~ must be encoded explicitly because hacks
	// the slash is encoded by encodeURIComponent
	return a.map(pathEncoder).join('');
};


/**
 * Calculate the number of decimal places a number uses
 * We need this to get correct results out of multipleOf and divisibleBy
 * when either figure is has decimal places, due to IEEE-754 float issues.
 * @param number
 * @returns {number}
 */
exports.getDecimalPlaces = function getDecimalPlaces(number) {

  var decimalPlaces = 0;
  if (isNaN(number)) return decimalPlaces;

  if (typeof number !== 'number') {
    number = Number(number);
  }

  var parts = number.toString().split('e');
  if (parts.length === 2) {
    if (parts[1][0] !== '-') {
      return decimalPlaces;
    } else {
      decimalPlaces = Number(parts[1].slice(1));
    }
  }

  var decimalParts = parts[0].split('.');
  if (decimalParts.length === 2) {
    decimalPlaces += decimalParts[1].length;
  }

  return decimalPlaces;
};



/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AjaxTransport = exports.WebsocketTransport = exports.DisconnectReason = exports.TransportType = undefined;

var _TransportConstants = __webpack_require__(125);

var _WebsocketTransport = __webpack_require__(126);

var _AjaxTransport = __webpack_require__(131);

// import { FetchTransport } from './Fetch'
exports.TransportType = _TransportConstants.TransportType;
exports.DisconnectReason = _TransportConstants.DisconnectReason;
exports.WebsocketTransport = _WebsocketTransport.WebsocketTransport;
exports.AjaxTransport = _AjaxTransport.AjaxTransport;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _openbetLogger = __webpack_require__(18);

var _openbetLogger2 = _interopRequireDefault(_openbetLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _openbetLogger2.default('liveserv');

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotificationHandler = undefined;

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _EventDispatcher2 = __webpack_require__(45);

var _SingletonBase = __webpack_require__(27);

var _GCMNotification = __webpack_require__(4);

var _GameStateController = __webpack_require__(26);

var _GCMEvent = __webpack_require__(17);

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

// goog.inherits(NotificationHandler, EventDispatcher);

var NotificationHandler = exports.NotificationHandler = function (_EventDispatcher) {
  _inherits(NotificationHandler, _EventDispatcher);

  function NotificationHandler() {
    var _ret;

    _classCallCheck(this, NotificationHandler);

    //EventDispatcher.call(this);

    /** @type {Object}
     * @private The reference to commonUI instance. passed from gcmCore
     * */
    var _this = _possibleConstructorReturn(this, (NotificationHandler.__proto__ || Object.getPrototypeOf(NotificationHandler)).call(this));

    _this.commonUI_ = null;

    /** @type {Object}
     * @private The reference to game instance. passed from gcmCore
     * */
    _this.game_ = null;

    /** @type {GameStateController}
     * @private
     * */
    _this.gameStateController_ = null;

    /** @type {Array}
     * @private
     * */
    _this.noteQueue_ = [];

    /** @type {GCMNotification}
     * @private The notification that waiting for user acknowledgement.
     * */
    _this.outstandingNotification_ = null;
    return _ret = _SingletonBase.SingletonBase.call(_this), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(NotificationHandler, [{
    key: 'init',
    value: function init(commonUI) {
      this.commonUI_ = commonUI;
      this.noteQueue_ = [];
      this.outstandingNotification_ = null;
      /**@type {GameStateController}
       * A reference to singleton instance gcm.GameStateController, the constructor will
       * return a reference to the singleton instance.
       * */
      this.gameStateController_ = new _GameStateController.GameStateController();
    }

    /**
     * Assign game reference to notification handler.
     * @param {Object} game A reference to the game instance.
     */

  }, {
    key: 'setGame',
    value: function setGame(game) {
      this.game_ = game;
    }
  }, {
    key: 'handleNotification',
    value: function handleNotification(notification) {
      if (notification) {
        if (notification.isUnique()) this.handleUniqueNotification_(notification);

        this.queueNotification_(notification);
      }

      //process the head notification in queue based on its importance level.
      if (this.commonUI_ && !this.outstandingNotification_) {
        var firstNote = this.noteQueue_.shift();
        if (firstNote) {
          // The notification will be send to CommonUI asap if its type is present in GCM Notification ASAP array element
          var isNotificationAsap = _GCMNotification.GCMNotification.ASAP.indexOf(firstNote.type);

          if (isNotificationAsap >= 0) {
            this.handleAlertNotification_(firstNote);
          } else if (firstNote.type == _GCMNotification.GCMNotification.TYPE.SESSION_TIMER) {

            var sessionDuration = firstNote.body[_GCMNotification.GCMNotification.SESSION_TIMER.DURATION];
            this.commonUI_.handleSessionDurationUpdate(sessionDuration);

            this.continueHandlePendingNotifications_();
          } else if (firstNote.type == _GCMNotification.GCMNotification.TYPE.BONUS_BAR) {

            var bonusBarPercent = firstNote.body[_GCMNotification.GCMNotification.BONUS_BAR.PERCENT];

            this.commonUI_.handleBonusBarUpdate(bonusBarPercent);
            this.continueHandlePendingNotifications_();
          } else {
            if (this.gameStateController_.isGameIdle()) {
              this.handleAlertNotification_(firstNote);
            } else {
              this.noteQueue_.unshift(firstNote);
            }
          }
        }
      }
    }
  }, {
    key: 'hasPendingNotification',
    value: function hasPendingNotification() {
      return this.noteQueue_.length > 0;
    }
  }, {
    key: 'resume',
    value: function resume(feedback) {
      try {
        if (this.outstandingNotification_) this.outstandingNotification_.invokeCallback(feedback);
      } catch (e) {
        throw e;
      }
      //This finally block ensure outstanding notification always get cleared on resumption
      //regardless of any possible exception in callback function.
      finally {
        this.outstandingNotification_ = null;
        this.gameStateController_.notifyCommonUIEnd();
        this.continueHandlePendingNotifications_();
      }
    }
  }, {
    key: 'continueHandlePendingNotifications_',
    value: function continueHandlePendingNotifications_() {
      if (this.hasPendingNotification()) this.handleNotification();else this.dispatchEvent(new _GCMEvent.GCMEvent(_GCMEvent.GCMEvent.COMPLETE));
    }
  }, {
    key: 'handleAlertNotification_',
    value: function handleAlertNotification_(notification) {
      this.outstandingNotification_ = notification;

      this.gameStateController_.notifyCommonUIStart();
      var timeout = notification.body[_GCMNotification.GCMNotification.TIMEOUT];

      if (notification.type == _GCMNotification.GCMNotification.TYPE.ERROR) {
        var errorCategory = notification.body[_GCMNotification.GCMNotification.ERROR.CATEGORY];
        var errorSeverity = notification.body[_GCMNotification.GCMNotification.ERROR.SEVERITY];
        var errorCode = notification.body[_GCMNotification.GCMNotification.ERROR.CODE];
        var errorMessage = notification.body[_GCMNotification.GCMNotification.ERROR.MESSAGE];
        var errorParams = notification.body[_GCMNotification.GCMNotification.ERROR.PARAMS];
        this.commonUI_.handleError(errorCategory, errorSeverity, errorCode, errorMessage, errorParams, timeout);
      } else if (notification.type == _GCMNotification.GCMNotification.TYPE.SESSION_STATS) {
        var sessonStakes = notification.body[_GCMNotification.GCMNotification.SESSION_STATS.STAKES];
        var sessionWinnings = notification.body[_GCMNotification.GCMNotification.SESSION_STATS.WINNINGS];
        var sessionTurnover = notification.body[_GCMNotification.GCMNotification.SESSION_STATS.TURNOVER];
        this.commonUI_.handleSessionStats(sessonStakes, sessionWinnings, sessionTurnover, timeout);
      } else if (notification.type == _GCMNotification.GCMNotification.TYPE.BONUS_BAR_FILLED) {
        this.commonUI_.handleBonusBarFilled(timeout);
      } else if (notification.type == _GCMNotification.GCMNotification.TYPE.FREEBET_REWARD) {
        var freebetAmount = notification.body[_GCMNotification.GCMNotification.FREEBET.AMOUNT];
        this.commonUI_.handleFreebetAward(freebetAmount, timeout);
      } else if (notification.type == _GCMNotification.GCMNotification.TYPE.GENERIC_MESSAGE) {
        this.commonUI_.handleMessageTrigger(notification.body);
      } else if (notification.type == _GCMNotification.GCMNotification.TYPE.GS_MESSAGE) {
        this.commonUI_.handleGSTrigger(notification.body);
      } else if (notification.type === _GCMNotification.GCMNotification.TYPE.COMMONUI_FREEROUNDS_AWARD) {
        this.commonUI_.handleFreeRoundsAward(notification.body);
      } else if (notification.type === _GCMNotification.GCMNotification.TYPE.COMMONUI_FREEROUNDS_IN_PROGRESS) {
        this.commonUI_.handleFreeRoundsInProgress(notification.body);
      } else if (notification.type === _GCMNotification.GCMNotification.TYPE.COMMONUI_FREEROUNDS_UPDATE) {
        this.commonUI_.handleFreeRoundsUpdate(notification.body);
      } else if (notification.type === _GCMNotification.GCMNotification.TYPE.GAME_FREEROUNDS_UPDATE) {
        this.game_.handleFreeRoundsUpdate(notification.body);
      } else if (notification.type === _GCMNotification.GCMNotification.TYPE.SYNDICATED_JACKPOT_WIN_AWARD) {
        this.commonUI_.showSyndicateJackpotWinAward(notification.body);
      } else if (notification.type === _GCMNotification.GCMNotification.TYPE.SYNDICATED_JACKPOT_PROGRESS_BAR) {
        this.commonUI_.showSyndicateJackpotProgressBar(notification.body);
      } else {
        this.outstandingNotification_ = null;
        throw Error('NotificationHandler.handleNotification: Unknown notification type [' + notification.type + '].');
      }
    }
  }, {
    key: 'disposeNotification',
    value: function disposeNotification(notification) {
      if (notification.type === _GCMNotification.GCMNotification.TYPE.SYNDICATED_JACKPOT_PROGRESS_BAR) {
        this.commonUI_.disposeSyndicateJackpotProgressBar(notification.body);
      } else {
        throw Error('NotificationHandler.disposeNotification: Unknown notification type [' + notification.type + '].');
      }
    }
  }, {
    key: 'handleUniqueNotification_',
    value: function handleUniqueNotification_(notification) {
      if (!notification.isUnique()) return;

      for (var _index = 0; _index < this.noteQueue_.length; ++_index) {
        var currentNote = this.noteQueue_[_index];
        if (currentNote.isUnique() && currentNote.type == notification.type) {
          this.noteQueue_.splice(_index, 1);
          _index--;
        }
      }
    }
  }, {
    key: 'queueNotification_',
    value: function queueNotification_(notification) {
      if (notification.type == _GCMNotification.GCMNotification.TYPE.ERROR) {
        if (this.noteQueue_.length > 0) {
          for (var _index2 = 0; _index2 < this.noteQueue_.length; ++_index2) {
            var newNotification = this.noteQueue_[_index2];
            if (newNotification.type == _GCMNotification.GCMNotification.TYPE.ERROR) {
              continue;
            } else {
              break;
            }
          }
          this.noteQueue_.splice(index, 0, notification);
        } else {
          this.noteQueue_.push(notification);
        }
      } else {
        this.noteQueue_.push(notification);
      }
    }
  }]);

  return NotificationHandler;
}(_EventDispatcher2.EventDispatcher);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

/**
 * Validation functions for input validation
 */

var gcmLauncherPostMessageMethods = ['getOGSParams', 'loadCommonUI', 'commonUIReady', 'commonUIResize', 'gameRevealed', 'reload', 'redirect', 'showCommonUI', 'hideCommonUI', 'launcherLoaded'];

var gcmPostMessageMethods = ['configure', 'launcherResized', 'registerService', 'commonUIReady', 'commonUIResize', 'gameRevealed', 'optionHasChanged', 'resume', 'reload', 'redirect', 'showCommonUI', 'hideCommonUI', 'isGameIdle', 'balancesUpdate', 'setOGSParams', 'gsPlayerAction', 'syndicateJackpotWinAwardDialogClosed'];

var commonUIPostMessageMethods = ['stakeUpdate', 'paidUpdate', 'balancesUpdate', 'loadProgressUpdate', 'gameReady', 'configReady', 'gameAnimationStart', 'gameAnimationComplete', 'gameIdle', 'handleError', 'handleSessionDurationUpdate', 'regOption', 'optionHasChanged', 'handleSessionStats', 'gameResized', 'gameHasLoadingScreen', 'handleMessageTrigger', 'handleGSTrigger', 'handleFreeRoundsAward', 'handleFreeRoundsInProgress', 'handleFreeRoundsUpdate', 'pollJackpots', 'showSyndicateJackpotWinAward', 'showSyndicateJackpotProgressBar', 'disposeSyndicateJackpotProgressBar'];

var Validate = exports.Validate = function () {
    function Validate() {
        _classCallCheck(this, Validate);
    }

    _createClass(Validate, null, [{
        key: 'isBalances',

        /**
         * Check the a balances object is in the correct format
         * @param {Object} balances object.
         * @param {string} fundMode determines whether game is use any other fund mode than cash or freebet.
         * @return {boolean} the result of the check.
         */
        value: function isBalances(balances, fundMode) {
            //return false if it's null object
            if (!balances) return false;

            //balances must include at least a CASH balance
            if (_typeof(balances['CASH']) !== 'object') {
                return false;
            }

            for (var type in balances) {
                if (typeof balances[type]['amount'] !== 'number') {
                    return false;
                }
            }
            if (fundMode && 'FREESPIN' == fundMode) {
                if (_typeof(balances['FREESPIN']) !== 'object') return false;
            } else {
                if (_typeof(balances['FREESPIN']) == 'object') return false;
            }
            return true;
        }
    }, {
        key: 'isErrorInfo',

        /**
         * Check that a errorInfo contains the correct properties.
         * @param {Object} errorInfo an errorInfo object.
         * @return {boolean} the result of the check.
         */
        value: function isErrorInfo(errorInfo) {
            if (!errorInfo) {
                return false;
            }

            return !(typeof errorInfo['errorCode'] == 'undefined' || typeof errorInfo['errorMessage'] == 'undefined');
        }
    }, {
        key: 'isValidCurrencyOps',

        /**
         * Check the a accountInfo ccy params are in the correct format
         * CCY code can be empty.
         *
         * @param {Object} accountInfo object.
         * @return {boolean} the result of the check.
         */
        value: function isValidCurrencyOps(accountInfo) {

            if (!accountInfo) return false;

            var patternSeparator = /^[\D]$/;
            var patternCCY = /^[\D]*$/;

            return patternSeparator.test(accountInfo['ccy_thousand_separator']) && patternSeparator.test(accountInfo['ccy_decimal_separator']) && patternCCY.test(accountInfo['ccy_code']);
        }
    }, {
        key: 'isNumericValue',

        /**
         * Check the input is numeric
         * @param {number} value the number to validate.
         * @return {boolean} the result of the check.
         */
        value: function isNumericValue(value) {
            return typeof value == 'number' && !isNaN(parseFloat(value)) && isFinite(value);
        }
    }, {
        key: 'isIntegerValue',

        /**
         *
         * @param {number} value the number to validate.
         * @return {boolean} the result of the check.
         */
        value: function isIntegerValue(value) {

            return typeof value == 'number' && !isNaN(parseInt(value, 10)) && parseInt(value, 10) == value && isFinite(value);
        }
    }, {
        key: 'isPercentValue',

        /**
         * @param {number} value the percentage value to validate.
         * @return {boolean} the result of the check.
         */
        value: function isPercentValue(value) {

            if (this.isNumericValue(value)) {
                return parseFloat(value) <= 100 && !(parseFloat(value) < 0);
            }
            return false;
        }
    }, {
        key: 'isHeight',

        /**
         * Checks that the input is a valid css height spec.
         * valid units: %,in,cm,mm,em,ex,pt,pc,px
         *
         * @param {string} value the number to validate.
         * @return {boolean} the result of the check.
         */
        value: function isHeight(value) {
            var height = /^\d+(\.\d+)?(%|in|cm|mm|em|ex|pt|pc|px)/;
            return height.test(value);
        }
    }, {
        key: 'isAlphaNumeric',

        /**
         * Checks that this is a string of non zero length with only letters and numbers
         * @param {string} str the value to validate.
         * @return {boolean} the result of the check.
         */
        value: function isAlphaNumeric(str) {
            if (typeof str != 'string') return false;

            return (/^[a-zA-Z0-9]+$/.test(str)
            );
        }
    }, {
        key: 'isValidGameName',

        /**
         * Checks that string is valid game name
         * @param {string} str the value to validate.
         * @return {boolean} the result of the check.
         */
        value: function isValidGameName(str) {
            if (typeof str != 'string') return false;

            return (/^[a-zA-Z0-9\-_]+$/.test(str)
            );
        }
    }, {
        key: 'isValidLanguage',

        /**
         * Checks that string is valid language
         * language can be just a 
         * @param {string} str the value to validate.
         * @return {boolean} the result of the check.
         */
        value: function isValidLanguage(str) {
            if (typeof str != 'string') return false;

            var lang_array = str.split("-");
            var patternLanguage = /^[a-z]{2}$/;

            if (lang_array.length === 1) return patternLanguage.test(lang_array[0]);

            if (lang_array.length === 2) {
                var patternCountry = /^[A-Z]{2}$/;
                return patternLanguage.test(lang_array[0]) && patternCountry.test(lang_array[1]);
            }

            // otherwise
            return false;
        }
    }, {
        key: 'isSingleLetter',

        /**
         * Checks the string is a single letter. Useful for checking channels
         * @param {string} str the value to validate.
         * @return {boolean} the result of the check.
         */
        value: function isSingleLetter(str) {
            return (/^[a-zA-Z]$/.test(str)
            );
        }
    }, {
        key: 'isSingleDigit',

        /**
         * Checks the string is a single digit. Useful for checking channels
         * @param {string} str the value to validate.
         * @return {boolean} the result of the check.
         */
        value: function isSingleDigit(str) {
            return (/^[0-9]$/.test(str)
            );
        }
    }, {
        key: 'isEnumOption',

        /**
         * @param {Object} optionTypes enum of valid options.
         * @param {string} optionType for validation.
         * @return {boolean} the result of the check.
         */
        value: function isEnumOption(optionTypes, optionType) {

            var found = false;
            for (var key in optionTypes) {
                if (optionType === optionTypes[key]) {
                    found = true;
                    break;
                }
            }
            return found;
        }
    }, {
        key: 'isFunction',

        /**
         * @param {Object} callBack function passed through.
         * @return {boolean} the result.
         */
        value: function isFunction(callBack) {
            return typeof callBack === 'function';
        }
    }, {
        key: 'isDefinedAndNotNull',

        /**
         * Helper function to check if a variable is defined, not empty and not null.
         * @param variable
         * @return {boolean} the result.
         */
        value: function isDefinedAndNotNull(inputVariable) {
            if (typeof inputVariable !== "undefined" && inputVariable !== null && inputVariable != "") return true;else return false;
        }
    }, {
        key: 'isElement',

        /**
         * @param {Element} elem value to be validated.
         * @return {boolean} Is the object a DOM element.
         */
        value: function isElement(elem) {
            return Boolean(elem && typeof elem.appendChild === 'function');
        }
    }, {
        key: 'isValidCommonUIMethod',

        /**
         * @param {String} methodName method to validate
         * @return {boolean} Returns true if the method supplied is a valid commonUI method
         */
        value: function isValidCommonUIMethod(methodName) {
            return commonUIPostMessageMethods.indexOf(methodName) != -1;
        }
    }, {
        key: 'isValidGCMMethod',

        /**
         * @param {String} methodName method to validate
         * @return {boolean} Returns true if the method supplied is a valid GCM method
         */
        value: function isValidGCMMethod(methodName) {
            return gcmPostMessageMethods.indexOf(methodName) != -1;
        }
    }, {
        key: 'isValidGCMLauncherMethod',

        /**
         * @param {String} methodName method to validate
         * @return {boolean} Returns true if the method supplied is a valid GCM Launcher method
         */
        value: function isValidGCMLauncherMethod(methodName) {
            return gcmLauncherPostMessageMethods.indexOf(methodName) != -1;
        }
    }, {
        key: 'isValidBoolean',

        /**
         * @param {boolean} boolean input
         * @return {boolean} Returns true if the variable supplied is a valid boolean
         */
        value: function isValidBoolean(booleanVariable) {
            return typeof booleanVariable === "boolean";
        }
    }]);

    return Validate;
}();

/***/ }),
/* 12 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function (undefined) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var X32WordArray = C_lib.WordArray;

	    /**
	     * x64 namespace.
	     */
	    var C_x64 = C.x64 = {};

	    /**
	     * A 64-bit word.
	     */
	    var X64Word = C_x64.Word = Base.extend({
	        /**
	         * Initializes a newly created 64-bit word.
	         *
	         * @param {number} high The high 32 bits.
	         * @param {number} low The low 32 bits.
	         *
	         * @example
	         *
	         *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
	         */
	        init: function (high, low) {
	            this.high = high;
	            this.low = low;
	        }

	        /**
	         * Bitwise NOTs this word.
	         *
	         * @return {X64Word} A new x64-Word object after negating.
	         *
	         * @example
	         *
	         *     var negated = x64Word.not();
	         */
	        // not: function () {
	            // var high = ~this.high;
	            // var low = ~this.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Bitwise ANDs this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to AND with this word.
	         *
	         * @return {X64Word} A new x64-Word object after ANDing.
	         *
	         * @example
	         *
	         *     var anded = x64Word.and(anotherX64Word);
	         */
	        // and: function (word) {
	            // var high = this.high & word.high;
	            // var low = this.low & word.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Bitwise ORs this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to OR with this word.
	         *
	         * @return {X64Word} A new x64-Word object after ORing.
	         *
	         * @example
	         *
	         *     var ored = x64Word.or(anotherX64Word);
	         */
	        // or: function (word) {
	            // var high = this.high | word.high;
	            // var low = this.low | word.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Bitwise XORs this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to XOR with this word.
	         *
	         * @return {X64Word} A new x64-Word object after XORing.
	         *
	         * @example
	         *
	         *     var xored = x64Word.xor(anotherX64Word);
	         */
	        // xor: function (word) {
	            // var high = this.high ^ word.high;
	            // var low = this.low ^ word.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Shifts this word n bits to the left.
	         *
	         * @param {number} n The number of bits to shift.
	         *
	         * @return {X64Word} A new x64-Word object after shifting.
	         *
	         * @example
	         *
	         *     var shifted = x64Word.shiftL(25);
	         */
	        // shiftL: function (n) {
	            // if (n < 32) {
	                // var high = (this.high << n) | (this.low >>> (32 - n));
	                // var low = this.low << n;
	            // } else {
	                // var high = this.low << (n - 32);
	                // var low = 0;
	            // }

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Shifts this word n bits to the right.
	         *
	         * @param {number} n The number of bits to shift.
	         *
	         * @return {X64Word} A new x64-Word object after shifting.
	         *
	         * @example
	         *
	         *     var shifted = x64Word.shiftR(7);
	         */
	        // shiftR: function (n) {
	            // if (n < 32) {
	                // var low = (this.low >>> n) | (this.high << (32 - n));
	                // var high = this.high >>> n;
	            // } else {
	                // var low = this.high >>> (n - 32);
	                // var high = 0;
	            // }

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Rotates this word n bits to the left.
	         *
	         * @param {number} n The number of bits to rotate.
	         *
	         * @return {X64Word} A new x64-Word object after rotating.
	         *
	         * @example
	         *
	         *     var rotated = x64Word.rotL(25);
	         */
	        // rotL: function (n) {
	            // return this.shiftL(n).or(this.shiftR(64 - n));
	        // },

	        /**
	         * Rotates this word n bits to the right.
	         *
	         * @param {number} n The number of bits to rotate.
	         *
	         * @return {X64Word} A new x64-Word object after rotating.
	         *
	         * @example
	         *
	         *     var rotated = x64Word.rotR(7);
	         */
	        // rotR: function (n) {
	            // return this.shiftR(n).or(this.shiftL(64 - n));
	        // },

	        /**
	         * Adds this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to add with this word.
	         *
	         * @return {X64Word} A new x64-Word object after adding.
	         *
	         * @example
	         *
	         *     var added = x64Word.add(anotherX64Word);
	         */
	        // add: function (word) {
	            // var low = (this.low + word.low) | 0;
	            // var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
	            // var high = (this.high + word.high + carry) | 0;

	            // return X64Word.create(high, low);
	        // }
	    });

	    /**
	     * An array of 64-bit words.
	     *
	     * @property {Array} words The array of CryptoJS.x64.Word objects.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */
	    var X64WordArray = C_x64.WordArray = Base.extend({
	        /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.x64.WordArray.create();
	         *
	         *     var wordArray = CryptoJS.x64.WordArray.create([
	         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
	         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
	         *     ]);
	         *
	         *     var wordArray = CryptoJS.x64.WordArray.create([
	         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
	         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
	         *     ], 10);
	         */
	        init: function (words, sigBytes) {
	            words = this.words = words || [];

	            if (sigBytes != undefined) {
	                this.sigBytes = sigBytes;
	            } else {
	                this.sigBytes = words.length * 8;
	            }
	        },

	        /**
	         * Converts this 64-bit word array to a 32-bit word array.
	         *
	         * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
	         *
	         * @example
	         *
	         *     var x32WordArray = x64WordArray.toX32();
	         */
	        toX32: function () {
	            // Shortcuts
	            var x64Words = this.words;
	            var x64WordsLength = x64Words.length;

	            // Convert
	            var x32Words = [];
	            for (var i = 0; i < x64WordsLength; i++) {
	                var x64Word = x64Words[i];
	                x32Words.push(x64Word.high);
	                x32Words.push(x64Word.low);
	            }

	            return X32WordArray.create(x32Words, this.sigBytes);
	        },

	        /**
	         * Creates a copy of this word array.
	         *
	         * @return {X64WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = x64WordArray.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);

	            // Clone "words" array
	            var words = clone.words = this.words.slice(0);

	            // Clone each X64Word object
	            var wordsLength = words.length;
	            for (var i = 0; i < wordsLength; i++) {
	                words[i] = words[i].clone();
	            }

	            return clone;
	        }
	    });
	}());


	return CryptoJS;

}));

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Parser = exports.MessageBuilder = undefined;

var _MessageBuilder = __webpack_require__(127);

var _Parser = __webpack_require__(128);

var builder = new _MessageBuilder.MessageBuilder();
var parser = new _Parser.Parser();
exports.MessageBuilder = builder;
exports.Parser = parser;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProtocolConstants = function ProtocolConstants() {
    _classCallCheck(this, ProtocolConstants);
};

exports.default = ProtocolConstants;

ProtocolConstants.Patterns = {
    Channel32Pattern: /^[A-Za-z0-9_\-=]{32}$/,
    Channel16Pattern: /^[A-Za-z0-9_]{16}$/,
    Channel16PaddedPattern: /^[A-Za-z0-9_]{6}={16}[A-Za-z0-9_]{10}$/,
    SubjectPattern: /^[A-Za-z0-9_]{16}$/,
    UUIDHexPattern: /^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/,
    UUIDBase64Pattern: /^[A-Za-z0-9_\-]{22}==$/
};
ProtocolConstants.Size = {
    Channel32Id: 32,
    Channel16Id: 16,
    SubjectId: 16,
    MessageId: 10,
    MessageLength: 6,
    PingId: 4,
    ProtocolVersion: 2,
    AuthSize: 4,
    UserId: 10,
    UserUUID: 24
};
ProtocolConstants.Base64Table = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '_'];
ProtocolConstants.HexMap = {
    '0': 0,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    'A': 10, 'a': 10,
    'B': 11, 'b': 11,
    'C': 12, 'c': 12,
    'D': 13, 'd': 13,
    'E': 14, 'e': 14,
    'F': 15, 'f': 15
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var ConnectionEvent;
(function (ConnectionEvent) {
    ConnectionEvent["CONNECTED"] = "CONNECTED";
    ConnectionEvent["DISCONNECTED"] = "DISCONNECTED";
    ConnectionEvent["MESSAGE"] = "MESSAGE";
    ConnectionEvent["ERROR"] = "ERROR";
})(ConnectionEvent || (ConnectionEvent = {}));
exports.default = ConnectionEvent;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * */
//goog.provide('gcm.event.GCMEvent');

/**
 * @class
 * Model data of Event Object. Which is used by any EventDispatcher Object.
 *
 * @see EventDispatcher
 *
 * @constructor
 *
 * @param {string} name Event string.
 * @param {*=} body (Optional) Event body, can be ignored.
 *
 * @property {string} name Event name, used when adding event listeners.
 * @property {*} body Event body, can be null.
 */

var TYPE = {
  ERROR: 'ERROR',
  SESSION_TIMER: 'SESSION_TIMER',
  SESSION_STATS: 'SESSION_STATS',
  BONUS_BAR: 'BONUS_BAR',
  BONUS_BAR_FILLED: 'BONUS_BAR_FILLED',
  FREEBET_REWARD: 'FREEBET_REWARD'
};

var COMPLETE = 'complete';

var GCMEvent = exports.GCMEvent = function () {
  function GCMEvent(name, body) {
    _classCallCheck(this, GCMEvent);

    this.name = name;
    this.body = body;
    this.target = null;
  }

  _createClass(GCMEvent, null, [{
    key: 'TYPE',
    get: function get() {
      return TYPE;
    }
  }, {
    key: 'COMPLETE',
    get: function get() {
      return COMPLETE;
    }
  }]);

  return GCMEvent;
}();

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * Copyright OpenBet Technologies Ltd, 2016, All rights reserved.
 */

/**
 * @private
 */
var COOKIE_NAME = 'OpenbetLogger';
var COOKIE_REGEX = new RegExp('(^|; )' + COOKIE_NAME + '=([^;]*)');

/**
 * @class OpenbetLogger
 *
 * @desc
 * OpenbetLogger is a logging module designed to be used by applications that
 * want to include support logging but do not wish to have this always occur.
 * Instead you must opt-in to the logging by either setting a cookie,
 * `OpenbetLogger` to any value, or setting a variable in the browser -
 * `window.OpenbetLogger` to the value `true`.
 *
 */

var OpenbetLogger = function () {

  /**
   * @method
   * @name constructor
   * @param {string} prefix - The log prefix to use for all logging coming from
   *  this instance
   */
  function OpenbetLogger() {
    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';

    _classCallCheck(this, OpenbetLogger);

    // prefix to include with each line, intended to allow quick filtering on
    // lines of interest
    this.prefix = prefix;

    // no logging happens by default
    this.enabled = false;

    // check for the methods we want to use existing in the browser
    var fallback = console && console.log ? console.log : undefined;

    this.logger = {
      error: {
        scope: console,
        func: console && console.error ? console.error : fallback
      },
      warn: {
        scope: console,
        func: console && console.warn ? console.warn : fallback
      },
      info: {
        scope: console,
        func: console && console.info ? console.info : fallback

        // check if a logging is enabled or not
      } };this.enabled = isLoggingEnabled();
  }

  /**
   * Log an error level message
   *
   * @param {...*} ...args - a string with optional placeholders followed by
   *   values to be substituted (follows the same rules as console.log)
   */

  _createClass(OpenbetLogger, [{
    key: 'error',
    value: function error() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this._log('error', args);
    }

    /**
     * Log a warning level message
     *
     * @param {...*} ...args - a string with optional placeholders followed by
     *   values to be substituted (follows the same rules as console.log)
     */

  }, {
    key: 'warn',
    value: function warn() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this._log('warn', args);
    }

    /**
     * Log an info level message
     *
     * @param {...*} ...args - a string with optional placeholders followed by
     *   values to be substituted (follows the same rules as console.log)
     */

  }, {
    key: 'info',
    value: function info() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      this._log('info', args);
    }

    /**
     * @private
     *
     * Invoke the appropriate logger
     *
     * @param {string} level - log level desired, expecting one of `error`, `warn`
     *   or `info`.
     * @param {...*} ...args - a string with optional placeholders followed by
     *   values to be substituted (follows the same rules as console.log)
     */

  }, {
    key: '_log',
    value: function _log(level, args) {

      // check logging is ok
      if (!this.enabled && !window.OpenbetLogger) {
        return;
      }

      // call appropriate logger
      var _logger$level = this.logger[level],
          scope = _logger$level.scope,
          func = _logger$level.func;

      if (scope && func) {
        args[0] = this.prefix + ' :: ' + args[0];
        func.apply(scope, args);
      }
    }
  }]);

  return OpenbetLogger;
}();

/**
 * @private
 *
 * Checks if the code is executed in node or browser based on document object availability.
 * If document is available it treats it is in browser environment and check for cookie existence and regex match
 * to enable logging.
 * If document is unavailable it is being executed in node environment where logging is enabled by default
 *
 * @returns {boolean} - true if the cookie is in place denoting logging should
 *   occur
 */

exports.default = OpenbetLogger;
function isLoggingEnabled() {
  return typeof document === 'undefined' ? true : COOKIE_REGEX.test(document.cookie);
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Validator = module.exports.Validator = __webpack_require__(52);

module.exports.ValidatorResult = __webpack_require__(7).ValidatorResult;
module.exports.ValidationError = __webpack_require__(7).ValidationError;
module.exports.SchemaError = __webpack_require__(7).SchemaError;

module.exports.validate = function (instance, schema, options) {
  var v = new Validator();
  return v.validate(instance, schema, options);
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Reusable object
	    var W = [];

	    /**
	     * SHA-1 hash algorithm.
	     */
	    var SHA1 = C_algo.SHA1 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init([
	                0x67452301, 0xefcdab89,
	                0x98badcfe, 0x10325476,
	                0xc3d2e1f0
	            ]);
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var H = this._hash.words;

	            // Working variables
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];
	            var e = H[4];

	            // Computation
	            for (var i = 0; i < 80; i++) {
	                if (i < 16) {
	                    W[i] = M[offset + i] | 0;
	                } else {
	                    var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
	                    W[i] = (n << 1) | (n >>> 31);
	                }

	                var t = ((a << 5) | (a >>> 27)) + e + W[i];
	                if (i < 20) {
	                    t += ((b & c) | (~b & d)) + 0x5a827999;
	                } else if (i < 40) {
	                    t += (b ^ c ^ d) + 0x6ed9eba1;
	                } else if (i < 60) {
	                    t += ((b & c) | (b & d) | (c & d)) - 0x70e44324;
	                } else /* if (i < 80) */ {
	                    t += (b ^ c ^ d) - 0x359d3e2a;
	                }

	                e = d;
	                d = c;
	                c = (b << 30) | (b >>> 2);
	                b = a;
	                a = t;
	            }

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	            H[4] = (H[4] + e) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Return final computed hash
	            return this._hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA1('message');
	     *     var hash = CryptoJS.SHA1(wordArray);
	     */
	    C.SHA1 = Hasher._createHelper(SHA1);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA1(message, key);
	     */
	    C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
	}());


	return CryptoJS.SHA1;

}));

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var C_enc = C.enc;
	    var Utf8 = C_enc.Utf8;
	    var C_algo = C.algo;

	    /**
	     * HMAC algorithm.
	     */
	    var HMAC = C_algo.HMAC = Base.extend({
	        /**
	         * Initializes a newly created HMAC.
	         *
	         * @param {Hasher} hasher The hash algorithm to use.
	         * @param {WordArray|string} key The secret key.
	         *
	         * @example
	         *
	         *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
	         */
	        init: function (hasher, key) {
	            // Init hasher
	            hasher = this._hasher = new hasher.init();

	            // Convert string to WordArray, else assume WordArray already
	            if (typeof key == 'string') {
	                key = Utf8.parse(key);
	            }

	            // Shortcuts
	            var hasherBlockSize = hasher.blockSize;
	            var hasherBlockSizeBytes = hasherBlockSize * 4;

	            // Allow arbitrary length keys
	            if (key.sigBytes > hasherBlockSizeBytes) {
	                key = hasher.finalize(key);
	            }

	            // Clamp excess bits
	            key.clamp();

	            // Clone key for inner and outer pads
	            var oKey = this._oKey = key.clone();
	            var iKey = this._iKey = key.clone();

	            // Shortcuts
	            var oKeyWords = oKey.words;
	            var iKeyWords = iKey.words;

	            // XOR keys with pad constants
	            for (var i = 0; i < hasherBlockSize; i++) {
	                oKeyWords[i] ^= 0x5c5c5c5c;
	                iKeyWords[i] ^= 0x36363636;
	            }
	            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this HMAC to its initial state.
	         *
	         * @example
	         *
	         *     hmacHasher.reset();
	         */
	        reset: function () {
	            // Shortcut
	            var hasher = this._hasher;

	            // Reset
	            hasher.reset();
	            hasher.update(this._iKey);
	        },

	        /**
	         * Updates this HMAC with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {HMAC} This HMAC instance.
	         *
	         * @example
	         *
	         *     hmacHasher.update('message');
	         *     hmacHasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            this._hasher.update(messageUpdate);

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the HMAC computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The HMAC.
	         *
	         * @example
	         *
	         *     var hmac = hmacHasher.finalize();
	         *     var hmac = hmacHasher.finalize('message');
	         *     var hmac = hmacHasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Shortcut
	            var hasher = this._hasher;

	            // Compute HMAC
	            var innerHash = hasher.finalize(messageUpdate);
	            hasher.reset();
	            var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));

	            return hmac;
	        }
	    });
	}());


}));

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(102);

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(2);
var normalizeHeaderName = __webpack_require__(105);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(38);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(38);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(24)))

/***/ }),
/* 24 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var require;/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   4.1.1
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}

var _isArray = undefined;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = undefined;
var customSchedulerFn = undefined;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var r = require;
    var vertx = __webpack_require__(136);
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = undefined;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var _arguments = arguments;

  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;

  if (_state) {
    (function () {
      var callback = _arguments[_state - 1];
      asap(function () {
        return invokeCallback(_state, child, callback, parent._result);
      });
    })();
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(16);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var GET_THEN_ERROR = new ErrorObject();

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    GET_THEN_ERROR.error = error;
    return GET_THEN_ERROR;
  }
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === GET_THEN_ERROR) {
      reject(promise, GET_THEN_ERROR.error);
      GET_THEN_ERROR.error = null;
    } else if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;

  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = undefined,
      callback = undefined,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function ErrorObject() {
  this.error = null;
}

var TRY_CATCH_ERROR = new ErrorObject();

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = undefined,
      error = undefined,
      succeeded = undefined,
      failed = undefined;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
      resolve(promise, value);
    } else if (failed) {
      reject(promise, error);
    } else if (settled === FULFILLED) {
      fulfill(promise, value);
    } else if (settled === REJECTED) {
      reject(promise, value);
    }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function Enumerator$1(Constructor, input) {
  this._instanceConstructor = Constructor;
  this.promise = new Constructor(noop);

  if (!this.promise[PROMISE_ID]) {
    makePromise(this.promise);
  }

  if (isArray(input)) {
    this.length = input.length;
    this._remaining = input.length;

    this._result = new Array(this.length);

    if (this.length === 0) {
      fulfill(this.promise, this._result);
    } else {
      this.length = this.length || 0;
      this._enumerate(input);
      if (this._remaining === 0) {
        fulfill(this.promise, this._result);
      }
    }
  } else {
    reject(this.promise, validationError());
  }
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

Enumerator$1.prototype._enumerate = function (input) {
  for (var i = 0; this._state === PENDING && i < input.length; i++) {
    this._eachEntry(input[i], i);
  }
};

Enumerator$1.prototype._eachEntry = function (entry, i) {
  var c = this._instanceConstructor;
  var resolve$$1 = c.resolve;

  if (resolve$$1 === resolve$1) {
    var _then = getThen(entry);

    if (_then === then && entry._state !== PENDING) {
      this._settledAt(entry._state, i, entry._result);
    } else if (typeof _then !== 'function') {
      this._remaining--;
      this._result[i] = entry;
    } else if (c === Promise$2) {
      var promise = new c(noop);
      handleMaybeThenable(promise, entry, _then);
      this._willSettleAt(promise, i);
    } else {
      this._willSettleAt(new c(function (resolve$$1) {
        return resolve$$1(entry);
      }), i);
    }
  } else {
    this._willSettleAt(resolve$$1(entry), i);
  }
};

Enumerator$1.prototype._settledAt = function (state, i, value) {
  var promise = this.promise;

  if (promise._state === PENDING) {
    this._remaining--;

    if (state === REJECTED) {
      reject(promise, value);
    } else {
      this._result[i] = value;
    }
  }

  if (this._remaining === 0) {
    fulfill(promise, this._result);
  }
};

Enumerator$1.prototype._willSettleAt = function (promise, i) {
  var enumerator = this;

  subscribe(promise, undefined, function (value) {
    return enumerator._settledAt(FULFILLED, i, value);
  }, function (reason) {
    return enumerator._settledAt(REJECTED, i, reason);
  });
};

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all$1(entries) {
  return new Enumerator$1(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race$1(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {function} resolver
  Useful for tooling.
  @constructor
*/
function Promise$2(resolver) {
  this[PROMISE_ID] = nextId();
  this._result = this._state = undefined;
  this._subscribers = [];

  if (noop !== resolver) {
    typeof resolver !== 'function' && needsResolver();
    this instanceof Promise$2 ? initializePromise(this, resolver) : needsNew();
  }
}

Promise$2.all = all$1;
Promise$2.race = race$1;
Promise$2.resolve = resolve$1;
Promise$2.reject = reject$1;
Promise$2._setScheduler = setScheduler;
Promise$2._setAsap = setAsap;
Promise$2._asap = asap;

Promise$2.prototype = {
  constructor: Promise$2,

  /**
    The primary way of interacting with a promise is through its `then` method,
    which registers callbacks to receive either a promise's eventual value or the
    reason why the promise cannot be fulfilled.
  
    ```js
    findUser().then(function(user){
      // user is available
    }, function(reason){
      // user is unavailable, and you are given the reason why
    });
    ```
  
    Chaining
    --------
  
    The return value of `then` is itself a promise.  This second, 'downstream'
    promise is resolved with the return value of the first promise's fulfillment
    or rejection handler, or rejected if the handler throws an exception.
  
    ```js
    findUser().then(function (user) {
      return user.name;
    }, function (reason) {
      return 'default name';
    }).then(function (userName) {
      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
      // will be `'default name'`
    });
  
    findUser().then(function (user) {
      throw new Error('Found user, but still unhappy');
    }, function (reason) {
      throw new Error('`findUser` rejected and we're unhappy');
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
    });
    ```
    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
  
    ```js
    findUser().then(function (user) {
      throw new PedagogicalException('Upstream error');
    }).then(function (value) {
      // never reached
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // The `PedgagocialException` is propagated all the way down to here
    });
    ```
  
    Assimilation
    ------------
  
    Sometimes the value you want to propagate to a downstream promise can only be
    retrieved asynchronously. This can be achieved by returning a promise in the
    fulfillment or rejection handler. The downstream promise will then be pending
    until the returned promise is settled. This is called *assimilation*.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // The user's comments are now available
    });
    ```
  
    If the assimliated promise rejects, then the downstream promise will also reject.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // If `findCommentsByAuthor` fulfills, we'll have the value here
    }, function (reason) {
      // If `findCommentsByAuthor` rejects, we'll have the reason here
    });
    ```
  
    Simple Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let result;
  
    try {
      result = findResult();
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
    findResult(function(result, err){
      if (err) {
        // failure
      } else {
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findResult().then(function(result){
      // success
    }, function(reason){
      // failure
    });
    ```
  
    Advanced Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let author, books;
  
    try {
      author = findAuthor();
      books  = findBooksByAuthor(author);
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
  
    function foundBooks(books) {
  
    }
  
    function failure(reason) {
  
    }
  
    findAuthor(function(author, err){
      if (err) {
        failure(err);
        // failure
      } else {
        try {
          findBoooksByAuthor(author, function(books, err) {
            if (err) {
              failure(err);
            } else {
              try {
                foundBooks(books);
              } catch(reason) {
                failure(reason);
              }
            }
          });
        } catch(error) {
          failure(err);
        }
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findAuthor().
      then(findBooksByAuthor).
      then(function(books){
        // found books
    }).catch(function(reason){
      // something went wrong
    });
    ```
  
    @method then
    @param {Function} onFulfilled
    @param {Function} onRejected
    Useful for tooling.
    @return {Promise}
  */
  then: then,

  /**
    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
    as the catch block of a try/catch statement.
  
    ```js
    function findAuthor(){
      throw new Error('couldn't find that author');
    }
  
    // synchronous
    try {
      findAuthor();
    } catch(reason) {
      // something went wrong
    }
  
    // async with promises
    findAuthor().catch(function(reason){
      // something went wrong
    });
    ```
  
    @method catch
    @param {Function} onRejection
    Useful for tooling.
    @return {Promise}
  */
  'catch': function _catch(onRejection) {
    return this.then(null, onRejection);
  }
};

/*global self*/
function polyfill$1() {
    var local = undefined;

    if (typeof global !== 'undefined') {
        local = global;
    } else if (typeof self !== 'undefined') {
        local = self;
    } else {
        try {
            local = Function('return this')();
        } catch (e) {
            throw new Error('polyfill failed because global object is unavailable in this environment');
        }
    }

    var P = local.Promise;

    if (P) {
        var promiseToString = null;
        try {
            promiseToString = Object.prototype.toString.call(P.resolve());
        } catch (e) {
            // silently ignored
        }

        if (promiseToString === '[object Promise]' && !P.cast) {
            return;
        }
    }

    local.Promise = Promise$2;
}

// Strange compat..
Promise$2.polyfill = polyfill$1;
Promise$2.Promise = Promise$2;

return Promise$2;

})));


/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(24), __webpack_require__(12)))

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameStateController = undefined;

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}(); /**
      * @author xliu
      * Date: 17/07/12
      * */

var _SingletonBase = __webpack_require__(27);

var _NotificationHandler = __webpack_require__(10);

var _Validate = __webpack_require__(11);

var _GCMEvent = __webpack_require__(17);

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * @class
 * This GameStateController is a singleton class. 

 * This class manages game states and coordinates state actions between game and commonUI.
 *
 * @constructor
 */
var GameStateController = exports.GameStateController = function () {
  function GameStateController() {
    _classCallCheck(this, GameStateController);

    /** @private
     * @type {?function()}*/
    this.gameResumeCallback_ = null;

    /**
     * The life-cycle state the system is in
     * @type {GameStateController.STATE}
     * @private
     */
    this.playState_ = GameStateController.STATE.IDLE;

    /**
     * @private
     * @type {Object}
     * */
    this.commonUI_ = null;

    /**
     * @private
     * @type {NotificationHandler}
     * */
    this.notificationHandler_ = null;

    //return new SingletonBase(this);
    return _SingletonBase.SingletonBase.call(this);
  }

  _createClass(GameStateController, [{
    key: 'init',
    value: function init(commonUI) {
      this.commonUI_ = commonUI;
      /**
       * @type {NotificationHandler}
       * A reference to singleton instance gcm.notification.NotificationHandler, the constructor will
       * return a reference to the singleton instance.
       * */
      this.notificationHandler_ = new _NotificationHandler.NotificationHandler();
    }
  }, {
    key: 'gameAnimationStart',
    value: function gameAnimationStart() {
      this.playState_ = GameStateController.STATE.GAME_ANIMATING;
      if (this.commonUI_) {
        this.commonUI_.gameAnimationStart();
      }
    }
  }, {
    key: 'gameAnimationComplete',
    value: function gameAnimationComplete(resumeCallback) {

      if (!_Validate.Validate.isFunction(resumeCallback)) {
        throw new Error('gcm.gameAnimationComplete: Invalid callback function');
      }

      //save game resumeCallback for later use
      this.gameResumeCallback_ = resumeCallback;

      // Set game state to IDLE as animation finished
      this.playState_ = GameStateController.STATE.IDLE;

      if (this.notificationHandler_.hasPendingNotification()) {
        this.notificationHandler_.addEventListener(_GCMEvent.GCMEvent.COMPLETE, this.onNotificationHandleComplete_, this);
        this.notificationHandler_.handleNotification();
      } else {
        if (this.commonUI_) {
          this.commonUI_.gameAnimationComplete();
        }
      }
    }
  }, {
    key: 'notifyCommonUIStart',
    value: function notifyCommonUIStart() {
      this.playState_ = GameStateController.STATE.COMMONUI_NOTIFY;
    }
  }, {
    key: 'notifyCommonUIEnd',
    value: function notifyCommonUIEnd() {
      this.playState_ = GameStateController.STATE.IDLE;
    }
  }, {
    key: 'isGameIdle',
    value: function isGameIdle() {
      return this.playState_ == GameStateController.STATE.IDLE;
    }
  }, {
    key: 'onNotificationHandleComplete_',
    value: function onNotificationHandleComplete_() {
      this.notificationHandler_.removeEventListener(_GCMEvent.GCMEvent.COMPLETE, this.onNotificationHandleComplete_, this);
      if (this.commonUI_) {
        this.commonUI_.gameAnimationComplete();
      }
    }
  }]);

  return GameStateController;
}();

;

/**
 * The possible life-cycle states that the system can be in:
 * COMMONUI_NOTIFY, GAME_ANIMATING and IDLE.
 * @enum {string}
 */
GameStateController.STATE = {
  COMMONUI_NOTIFY: 'COMMONUI_NOTIFY',
  GAME_ANIMATING: 'GAME_ANIMATING',
  IDLE: 'IDLE'
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SingletonBase = SingletonBase;
/**
 * @fileoverview
 * This is the singleton base constructor for any class using singleton partten. 

 * To make a class into singleton class by this contructor, change return value of
 * original constructor to:

 * 
 *   function A() {
 *    //constructor code
 *    //...
 *
 *    return SingletonBase.call(this);
 *   }
 * 

 *
 * to get a reference of singleton class A, create new instance by:

 *   var a = new A() 

 * or use reference on constructor: 

 *   var a = A.instance
 *
 * @author xliu
 * Date: 07/05/13
 */
//goog.provide('gcm.SingletonBase');

/**
 * @this {*} this pointer should be point to a reference of a singleton class instance.
 * This function is used only in singleton class constructor.
 * @return {*} The singleton instance of given class.
 * */
function SingletonBase() {
  if (!this.constructor.instance) this.constructor.instance = this;
  return this.constructor.instance;
}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorNotification = undefined;

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _GCMNotification2 = __webpack_require__(4);

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} /**
   * @author xliu
   * Date: 30/04/13
   */
//goog.provide('gcm.notification.model.ErrorNotification');
//goog.require('gcm.notification.model.GCMNotification');
//goog.inherits(ErrorNotification, GCMNotification);
/**
 * @class This is data model of GCM error notification.
 * @extends GCMNotification
 * This is data model for Error notification. 

 * The type of session stats notification is 'ERROR'.
 * The body of this notification should be in the format of:
 *     
 *       {
 *         errorCategory: string
 *         errorSeverity: string
 *         errorCode: string
 *         errorMessage: string
 *         errorParams: object
 *       }
 *     

 *
 * @constructor
 * @param {string} errorCategory the category of current error.
 *                 The current error categories are:
 *                 {
 *                     CRITICAL,
 *                     INSUFFICIENT_FUNDS,
 *                     LOGIN_ERROR,
 *                     RECOVERABLE_ERROR,
 *                     NON_RECOVERABLE_ERROR,
 *                     CONNECTION_ERROR,
 *                     MULTI_CHOICE_DIALOG,
                       OTHER_GAME_IN_PROGRESS
 *                 }.
 * @param {string} errorSeverity this signifies the severity of the error and can
 *          be 'WARNING', 'INFO' or 'ERROR'.
 * @param {string} errorCode the error code string. Note that usually nothing
 *          should be done with this parameter. The commonUI is not expected to
 *          do any business logic based on the error code, but it is passed
 *          through in case the commonUI wishes to log the error codes that
 *          have been sent.
 * @param {string} errorMessage the error message provide by game.
 * @param {Object=} errorParams (Optional) JSON object parameter to allow game to pass additional
 *          information to the commonUI on how to handle the error. Key,value pairs
 *          must be provided in a valid JSON format.
 *          e.g {'suppressMessage':'true'}.
 * */

var ErrorNotification = exports.ErrorNotification = function (_GCMNotification) {
  _inherits(ErrorNotification, _GCMNotification);

  function ErrorNotification(errorCategory, errorSeverity, errorCode, errorMessage, errorParams) {
    _classCallCheck(this, ErrorNotification);

    var errorBody = {
      'errorCategory': errorCategory,
      'errorSeverity': errorSeverity,
      'errorCode': errorCode,
      'errorMessage': errorMessage,
      'errorParams': errorParams
    };

    return _possibleConstructorReturn(this, (ErrorNotification.__proto__ || Object.getPrototypeOf(ErrorNotification)).call(this, _GCMNotification2.GCMNotification.TYPE.ERROR, errorBody, ErrorNotification.setErrorParamIndex));
  }

  /**
   * Sets error param index
   * @param {*} errorParamIndex Index to be set.
   */

  _createClass(ErrorNotification, null, [{
    key: 'setErrorParamIndex',
    value: function setErrorParamIndex(errorParamIndex) {
      ErrorNotification.gameErrorParamIndex = errorParamIndex;
    }
  }, {
    key: 'getErrorParamIndex',

    /**
     * Retrieves error param index.
     * @return {*} The error param index.
     */
    value: function getErrorParamIndex() {
      return ErrorNotification.gameErrorParamIndex;
    }
  }]);

  return ErrorNotification;
}(_GCMNotification2.GCMNotification);

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var punycode = __webpack_require__(53);
var util = __webpack_require__(55);

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(56);

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * Data model and validation for a FreeRound object as represented within a PromoInfo object
 *
 * @class
 */
var FreeRound =
/**
 * FreeRound constructor
 *
 * @param {String} campaignId
 * @param {String} activationId
 * @param {String} endDate
 * @param {Number} totalWin
 * @param {Number} campaignValue
 * @param {Boolean} rejectable 
 * @param {Object} options Object representing the option(s) available
 * @constructor
 */
exports.FreeRound = function FreeRound(campaignId, activationId, endDate, totalWin, campaignValue, rejectable, options) {
  _classCallCheck(this, FreeRound);

  this['CAMPAIGNID'] = campaignId;
  this['ACTIVATIONID'] = activationId;
  this['ENDDATE'] = endDate;
  this['TOTALWIN'] = totalWin;
  this['CAMPAIGNVALUE'] = campaignValue;
  this['REJECTABLE'] = rejectable;
  this['OPTIONS'] = new Array();

  for (var j = 0; j < options.length; j++) {
    var option = {};

    option['BETLEVEL'] = options[j]['BETLEVEL'];
    option['FEATURE'] = options[j]['FEATURE'];
    option['REMAININGROUNDS'] = options[j]['REMAININGROUNDS'];
    option['TOTALROUNDS'] = options[j]['TOTALROUNDS'];

    this['OPTIONS'].push(option);
  }
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _jsonschema = __webpack_require__(19);

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * Class representing the MessageInfo
 *
 * @class
 */
var MessageInfo = function () {

  /**
   * @param {Node} the message Node
   * @constructor
   */
  function MessageInfo(node) {
    _classCallCheck(this, MessageInfo);

    this.messageNode = node;
    this.MESSAGE = {};
    this.validator = new _jsonschema.Validator();
  }

  /**
   * Gets the Message from the message Xml element
   *
   * @function
   * @public
   */

  _createClass(MessageInfo, [{
    key: 'getMessageFromXml',
    value: function getMessageFromXml() {
      throw new Error('Abstract function getMessageFromXml is not implemented');
    }

    /**
     * Sets the Message
     *
     * @function
     * @public
     * @param {Object} Generic message representation
     */

  }, {
    key: 'setMessage',
    value: function setMessage(message) {
      this.validateMessage(message);
      this.MESSAGE = message;
    }

    /**
     * Validates the Message
     *
     * @function
     * @public
     * @param {Object} Generic message representation
     */

  }, {
    key: 'validateMessage',
    value: function validateMessage(message) {
      throw new Error('Abstract function validateMessage with paramter message=' + message + ' is not implemented');
    }
  }]);

  return MessageInfo;
}();

exports.default = MessageInfo;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidMessageType = isValidMessageType;
/**
 * Constant defining the list of supported message types
 */
var SupportedMessageTypes = exports.SupportedMessageTypes = {
  RC: '100',
  CMA: '101'
};

/**
 * Check that a message type is valid
 *
 * @function
 * @private
 */
function isValidMessageType(messageId) {
  var valid = false;

  Object.keys(SupportedMessageTypes).forEach(function (key) {
    if (SupportedMessageTypes[key] === messageId) {
      valid = true;
    }
  });

  if (!valid) {
    throw new Error('Invalid message type (Message Id: "' + messageId + '"');
  }
}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _gamesparks = __webpack_require__(75);

var _gamesparks2 = _interopRequireDefault(_gamesparks);

var _cryptoJs = __webpack_require__(34);

var _cryptoJs2 = _interopRequireDefault(_cryptoJs);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * The GameSparksExtend module includes all the gamesparks' methods that have been overwritten
 * or any new method that have been added.
 */

/**
 * The gamesparks handshake method has been overwritten, in order the onNonce callback
 * to be able to get the hmac through ajax call.
 */
_gamesparks2.default.prototype.handshake = function (result) {
  if (result['nonce']) {
    var hmac;

    if (this.options.onNonce) {
      this.options.onNonce(result['nonce']);
    } else if (this.options.secret) {
      hmac = _cryptoJs2.default.enc.Base64.stringify(_cryptoJs2.default.HmacSHA256(result['nonce'], this.options.secret));
      this.sendAuthConnectWithHmac(hmac);
    }
  } else if (result['sessionId']) {
    this.handshakeSessionId(result['sessionId']);
  }
};

/**
 * Handshake by providing the sessionId.
 */
_gamesparks2.default.prototype.handshakeSessionId = function (sessionId) {
  this.sessionId = sessionId;
  this.initialised = true;

  if (this.options.onInit) {
    this.options.onInit();
  }

  this.keepAliveInterval = window.setInterval(this.keepAlive.bind(this), 30000);
};

/**
 * Send AuthenticatedConnectRequest including the hmac.
 */
_gamesparks2.default.prototype.sendAuthConnectWithHmac = function (hmac) {
  var toSend = {
    '@class': '.AuthenticatedConnectRequest',
    hmac: hmac
  };

  if (this.authToken) {
    toSend.authToken = this.authToken;
  }

  if (this.sessionId) {
    toSend.sessionId = this.sessionId;
  }

  var browserData = this.getBrowserData();
  toSend.platform = browserData.browser;
  toSend.os = browserData.operatingSystem;

  this.webSocketSend(toSend);
};

exports.default = _gamesparks2.default;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0), __webpack_require__(13), __webpack_require__(76), __webpack_require__(77), __webpack_require__(5), __webpack_require__(6), __webpack_require__(20), __webpack_require__(35), __webpack_require__(78), __webpack_require__(36), __webpack_require__(79), __webpack_require__(80), __webpack_require__(81), __webpack_require__(21), __webpack_require__(82), __webpack_require__(3), __webpack_require__(1), __webpack_require__(83), __webpack_require__(84), __webpack_require__(85), __webpack_require__(86), __webpack_require__(87), __webpack_require__(88), __webpack_require__(89), __webpack_require__(90), __webpack_require__(91), __webpack_require__(92), __webpack_require__(93), __webpack_require__(94), __webpack_require__(95), __webpack_require__(96), __webpack_require__(97), __webpack_require__(98));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./x64-core", "./lib-typedarrays", "./enc-utf16", "./enc-base64", "./md5", "./sha1", "./sha256", "./sha224", "./sha512", "./sha384", "./sha3", "./ripemd160", "./hmac", "./pbkdf2", "./evpkdf", "./cipher-core", "./mode-cfb", "./mode-ctr", "./mode-ctr-gladman", "./mode-ofb", "./mode-ecb", "./pad-ansix923", "./pad-iso10126", "./pad-iso97971", "./pad-zeropadding", "./pad-nopadding", "./format-hex", "./aes", "./tripledes", "./rc4", "./rabbit", "./rabbit-legacy"], factory);
	}
	else {
		// Global (browser)
		root.CryptoJS = factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	return CryptoJS;

}));

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Initialization and round constants tables
	    var H = [];
	    var K = [];

	    // Compute constants
	    (function () {
	        function isPrime(n) {
	            var sqrtN = Math.sqrt(n);
	            for (var factor = 2; factor <= sqrtN; factor++) {
	                if (!(n % factor)) {
	                    return false;
	                }
	            }

	            return true;
	        }

	        function getFractionalBits(n) {
	            return ((n - (n | 0)) * 0x100000000) | 0;
	        }

	        var n = 2;
	        var nPrime = 0;
	        while (nPrime < 64) {
	            if (isPrime(n)) {
	                if (nPrime < 8) {
	                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
	                }
	                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

	                nPrime++;
	            }

	            n++;
	        }
	    }());

	    // Reusable object
	    var W = [];

	    /**
	     * SHA-256 hash algorithm.
	     */
	    var SHA256 = C_algo.SHA256 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init(H.slice(0));
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var H = this._hash.words;

	            // Working variables
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];
	            var e = H[4];
	            var f = H[5];
	            var g = H[6];
	            var h = H[7];

	            // Computation
	            for (var i = 0; i < 64; i++) {
	                if (i < 16) {
	                    W[i] = M[offset + i] | 0;
	                } else {
	                    var gamma0x = W[i - 15];
	                    var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
	                                  ((gamma0x << 14) | (gamma0x >>> 18)) ^
	                                   (gamma0x >>> 3);

	                    var gamma1x = W[i - 2];
	                    var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
	                                  ((gamma1x << 13) | (gamma1x >>> 19)) ^
	                                   (gamma1x >>> 10);

	                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
	                }

	                var ch  = (e & f) ^ (~e & g);
	                var maj = (a & b) ^ (a & c) ^ (b & c);

	                var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
	                var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));

	                var t1 = h + sigma1 + ch + K[i] + W[i];
	                var t2 = sigma0 + maj;

	                h = g;
	                g = f;
	                f = e;
	                e = (d + t1) | 0;
	                d = c;
	                c = b;
	                b = a;
	                a = (t1 + t2) | 0;
	            }

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	            H[4] = (H[4] + e) | 0;
	            H[5] = (H[5] + f) | 0;
	            H[6] = (H[6] + g) | 0;
	            H[7] = (H[7] + h) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Return final computed hash
	            return this._hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA256('message');
	     *     var hash = CryptoJS.SHA256(wordArray);
	     */
	    C.SHA256 = Hasher._createHelper(SHA256);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA256(message, key);
	     */
	    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
	}(Math));


	return CryptoJS.SHA256;

}));

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0), __webpack_require__(13));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./x64-core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Hasher = C_lib.Hasher;
	    var C_x64 = C.x64;
	    var X64Word = C_x64.Word;
	    var X64WordArray = C_x64.WordArray;
	    var C_algo = C.algo;

	    function X64Word_create() {
	        return X64Word.create.apply(X64Word, arguments);
	    }

	    // Constants
	    var K = [
	        X64Word_create(0x428a2f98, 0xd728ae22), X64Word_create(0x71374491, 0x23ef65cd),
	        X64Word_create(0xb5c0fbcf, 0xec4d3b2f), X64Word_create(0xe9b5dba5, 0x8189dbbc),
	        X64Word_create(0x3956c25b, 0xf348b538), X64Word_create(0x59f111f1, 0xb605d019),
	        X64Word_create(0x923f82a4, 0xaf194f9b), X64Word_create(0xab1c5ed5, 0xda6d8118),
	        X64Word_create(0xd807aa98, 0xa3030242), X64Word_create(0x12835b01, 0x45706fbe),
	        X64Word_create(0x243185be, 0x4ee4b28c), X64Word_create(0x550c7dc3, 0xd5ffb4e2),
	        X64Word_create(0x72be5d74, 0xf27b896f), X64Word_create(0x80deb1fe, 0x3b1696b1),
	        X64Word_create(0x9bdc06a7, 0x25c71235), X64Word_create(0xc19bf174, 0xcf692694),
	        X64Word_create(0xe49b69c1, 0x9ef14ad2), X64Word_create(0xefbe4786, 0x384f25e3),
	        X64Word_create(0x0fc19dc6, 0x8b8cd5b5), X64Word_create(0x240ca1cc, 0x77ac9c65),
	        X64Word_create(0x2de92c6f, 0x592b0275), X64Word_create(0x4a7484aa, 0x6ea6e483),
	        X64Word_create(0x5cb0a9dc, 0xbd41fbd4), X64Word_create(0x76f988da, 0x831153b5),
	        X64Word_create(0x983e5152, 0xee66dfab), X64Word_create(0xa831c66d, 0x2db43210),
	        X64Word_create(0xb00327c8, 0x98fb213f), X64Word_create(0xbf597fc7, 0xbeef0ee4),
	        X64Word_create(0xc6e00bf3, 0x3da88fc2), X64Word_create(0xd5a79147, 0x930aa725),
	        X64Word_create(0x06ca6351, 0xe003826f), X64Word_create(0x14292967, 0x0a0e6e70),
	        X64Word_create(0x27b70a85, 0x46d22ffc), X64Word_create(0x2e1b2138, 0x5c26c926),
	        X64Word_create(0x4d2c6dfc, 0x5ac42aed), X64Word_create(0x53380d13, 0x9d95b3df),
	        X64Word_create(0x650a7354, 0x8baf63de), X64Word_create(0x766a0abb, 0x3c77b2a8),
	        X64Word_create(0x81c2c92e, 0x47edaee6), X64Word_create(0x92722c85, 0x1482353b),
	        X64Word_create(0xa2bfe8a1, 0x4cf10364), X64Word_create(0xa81a664b, 0xbc423001),
	        X64Word_create(0xc24b8b70, 0xd0f89791), X64Word_create(0xc76c51a3, 0x0654be30),
	        X64Word_create(0xd192e819, 0xd6ef5218), X64Word_create(0xd6990624, 0x5565a910),
	        X64Word_create(0xf40e3585, 0x5771202a), X64Word_create(0x106aa070, 0x32bbd1b8),
	        X64Word_create(0x19a4c116, 0xb8d2d0c8), X64Word_create(0x1e376c08, 0x5141ab53),
	        X64Word_create(0x2748774c, 0xdf8eeb99), X64Word_create(0x34b0bcb5, 0xe19b48a8),
	        X64Word_create(0x391c0cb3, 0xc5c95a63), X64Word_create(0x4ed8aa4a, 0xe3418acb),
	        X64Word_create(0x5b9cca4f, 0x7763e373), X64Word_create(0x682e6ff3, 0xd6b2b8a3),
	        X64Word_create(0x748f82ee, 0x5defb2fc), X64Word_create(0x78a5636f, 0x43172f60),
	        X64Word_create(0x84c87814, 0xa1f0ab72), X64Word_create(0x8cc70208, 0x1a6439ec),
	        X64Word_create(0x90befffa, 0x23631e28), X64Word_create(0xa4506ceb, 0xde82bde9),
	        X64Word_create(0xbef9a3f7, 0xb2c67915), X64Word_create(0xc67178f2, 0xe372532b),
	        X64Word_create(0xca273ece, 0xea26619c), X64Word_create(0xd186b8c7, 0x21c0c207),
	        X64Word_create(0xeada7dd6, 0xcde0eb1e), X64Word_create(0xf57d4f7f, 0xee6ed178),
	        X64Word_create(0x06f067aa, 0x72176fba), X64Word_create(0x0a637dc5, 0xa2c898a6),
	        X64Word_create(0x113f9804, 0xbef90dae), X64Word_create(0x1b710b35, 0x131c471b),
	        X64Word_create(0x28db77f5, 0x23047d84), X64Word_create(0x32caab7b, 0x40c72493),
	        X64Word_create(0x3c9ebe0a, 0x15c9bebc), X64Word_create(0x431d67c4, 0x9c100d4c),
	        X64Word_create(0x4cc5d4be, 0xcb3e42b6), X64Word_create(0x597f299c, 0xfc657e2a),
	        X64Word_create(0x5fcb6fab, 0x3ad6faec), X64Word_create(0x6c44198c, 0x4a475817)
	    ];

	    // Reusable objects
	    var W = [];
	    (function () {
	        for (var i = 0; i < 80; i++) {
	            W[i] = X64Word_create();
	        }
	    }());

	    /**
	     * SHA-512 hash algorithm.
	     */
	    var SHA512 = C_algo.SHA512 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new X64WordArray.init([
	                new X64Word.init(0x6a09e667, 0xf3bcc908), new X64Word.init(0xbb67ae85, 0x84caa73b),
	                new X64Word.init(0x3c6ef372, 0xfe94f82b), new X64Word.init(0xa54ff53a, 0x5f1d36f1),
	                new X64Word.init(0x510e527f, 0xade682d1), new X64Word.init(0x9b05688c, 0x2b3e6c1f),
	                new X64Word.init(0x1f83d9ab, 0xfb41bd6b), new X64Word.init(0x5be0cd19, 0x137e2179)
	            ]);
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcuts
	            var H = this._hash.words;

	            var H0 = H[0];
	            var H1 = H[1];
	            var H2 = H[2];
	            var H3 = H[3];
	            var H4 = H[4];
	            var H5 = H[5];
	            var H6 = H[6];
	            var H7 = H[7];

	            var H0h = H0.high;
	            var H0l = H0.low;
	            var H1h = H1.high;
	            var H1l = H1.low;
	            var H2h = H2.high;
	            var H2l = H2.low;
	            var H3h = H3.high;
	            var H3l = H3.low;
	            var H4h = H4.high;
	            var H4l = H4.low;
	            var H5h = H5.high;
	            var H5l = H5.low;
	            var H6h = H6.high;
	            var H6l = H6.low;
	            var H7h = H7.high;
	            var H7l = H7.low;

	            // Working variables
	            var ah = H0h;
	            var al = H0l;
	            var bh = H1h;
	            var bl = H1l;
	            var ch = H2h;
	            var cl = H2l;
	            var dh = H3h;
	            var dl = H3l;
	            var eh = H4h;
	            var el = H4l;
	            var fh = H5h;
	            var fl = H5l;
	            var gh = H6h;
	            var gl = H6l;
	            var hh = H7h;
	            var hl = H7l;

	            // Rounds
	            for (var i = 0; i < 80; i++) {
	                // Shortcut
	                var Wi = W[i];

	                // Extend message
	                if (i < 16) {
	                    var Wih = Wi.high = M[offset + i * 2]     | 0;
	                    var Wil = Wi.low  = M[offset + i * 2 + 1] | 0;
	                } else {
	                    // Gamma0
	                    var gamma0x  = W[i - 15];
	                    var gamma0xh = gamma0x.high;
	                    var gamma0xl = gamma0x.low;
	                    var gamma0h  = ((gamma0xh >>> 1) | (gamma0xl << 31)) ^ ((gamma0xh >>> 8) | (gamma0xl << 24)) ^ (gamma0xh >>> 7);
	                    var gamma0l  = ((gamma0xl >>> 1) | (gamma0xh << 31)) ^ ((gamma0xl >>> 8) | (gamma0xh << 24)) ^ ((gamma0xl >>> 7) | (gamma0xh << 25));

	                    // Gamma1
	                    var gamma1x  = W[i - 2];
	                    var gamma1xh = gamma1x.high;
	                    var gamma1xl = gamma1x.low;
	                    var gamma1h  = ((gamma1xh >>> 19) | (gamma1xl << 13)) ^ ((gamma1xh << 3) | (gamma1xl >>> 29)) ^ (gamma1xh >>> 6);
	                    var gamma1l  = ((gamma1xl >>> 19) | (gamma1xh << 13)) ^ ((gamma1xl << 3) | (gamma1xh >>> 29)) ^ ((gamma1xl >>> 6) | (gamma1xh << 26));

	                    // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
	                    var Wi7  = W[i - 7];
	                    var Wi7h = Wi7.high;
	                    var Wi7l = Wi7.low;

	                    var Wi16  = W[i - 16];
	                    var Wi16h = Wi16.high;
	                    var Wi16l = Wi16.low;

	                    var Wil = gamma0l + Wi7l;
	                    var Wih = gamma0h + Wi7h + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0);
	                    var Wil = Wil + gamma1l;
	                    var Wih = Wih + gamma1h + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0);
	                    var Wil = Wil + Wi16l;
	                    var Wih = Wih + Wi16h + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0);

	                    Wi.high = Wih;
	                    Wi.low  = Wil;
	                }

	                var chh  = (eh & fh) ^ (~eh & gh);
	                var chl  = (el & fl) ^ (~el & gl);
	                var majh = (ah & bh) ^ (ah & ch) ^ (bh & ch);
	                var majl = (al & bl) ^ (al & cl) ^ (bl & cl);

	                var sigma0h = ((ah >>> 28) | (al << 4))  ^ ((ah << 30)  | (al >>> 2)) ^ ((ah << 25) | (al >>> 7));
	                var sigma0l = ((al >>> 28) | (ah << 4))  ^ ((al << 30)  | (ah >>> 2)) ^ ((al << 25) | (ah >>> 7));
	                var sigma1h = ((eh >>> 14) | (el << 18)) ^ ((eh >>> 18) | (el << 14)) ^ ((eh << 23) | (el >>> 9));
	                var sigma1l = ((el >>> 14) | (eh << 18)) ^ ((el >>> 18) | (eh << 14)) ^ ((el << 23) | (eh >>> 9));

	                // t1 = h + sigma1 + ch + K[i] + W[i]
	                var Ki  = K[i];
	                var Kih = Ki.high;
	                var Kil = Ki.low;

	                var t1l = hl + sigma1l;
	                var t1h = hh + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0);
	                var t1l = t1l + chl;
	                var t1h = t1h + chh + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0);
	                var t1l = t1l + Kil;
	                var t1h = t1h + Kih + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0);
	                var t1l = t1l + Wil;
	                var t1h = t1h + Wih + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0);

	                // t2 = sigma0 + maj
	                var t2l = sigma0l + majl;
	                var t2h = sigma0h + majh + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0);

	                // Update working variables
	                hh = gh;
	                hl = gl;
	                gh = fh;
	                gl = fl;
	                fh = eh;
	                fl = el;
	                el = (dl + t1l) | 0;
	                eh = (dh + t1h + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0;
	                dh = ch;
	                dl = cl;
	                ch = bh;
	                cl = bl;
	                bh = ah;
	                bl = al;
	                al = (t1l + t2l) | 0;
	                ah = (t1h + t2h + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0;
	            }

	            // Intermediate hash value
	            H0l = H0.low  = (H0l + al);
	            H0.high = (H0h + ah + ((H0l >>> 0) < (al >>> 0) ? 1 : 0));
	            H1l = H1.low  = (H1l + bl);
	            H1.high = (H1h + bh + ((H1l >>> 0) < (bl >>> 0) ? 1 : 0));
	            H2l = H2.low  = (H2l + cl);
	            H2.high = (H2h + ch + ((H2l >>> 0) < (cl >>> 0) ? 1 : 0));
	            H3l = H3.low  = (H3l + dl);
	            H3.high = (H3h + dh + ((H3l >>> 0) < (dl >>> 0) ? 1 : 0));
	            H4l = H4.low  = (H4l + el);
	            H4.high = (H4h + eh + ((H4l >>> 0) < (el >>> 0) ? 1 : 0));
	            H5l = H5.low  = (H5l + fl);
	            H5.high = (H5h + fh + ((H5l >>> 0) < (fl >>> 0) ? 1 : 0));
	            H6l = H6.low  = (H6l + gl);
	            H6.high = (H6h + gh + ((H6l >>> 0) < (gl >>> 0) ? 1 : 0));
	            H7l = H7.low  = (H7l + hl);
	            H7.high = (H7h + hh + ((H7l >>> 0) < (hl >>> 0) ? 1 : 0));
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 30] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 31] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Convert hash to 32-bit word array before returning
	            var hash = this._hash.toX32();

	            // Return final computed hash
	            return hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        },

	        blockSize: 1024/32
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA512('message');
	     *     var hash = CryptoJS.SHA512(wordArray);
	     */
	    C.SHA512 = Hasher._createHelper(SHA512);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA512(message, key);
	     */
	    C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
	}());


	return CryptoJS.SHA512;

}));

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(2);
var settle = __webpack_require__(106);
var buildURL = __webpack_require__(108);
var parseHeaders = __webpack_require__(109);
var isURLSameOrigin = __webpack_require__(110);
var createError = __webpack_require__(39);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(111);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if (process.env.NODE_ENV !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(112);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(24)))

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(107);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateChannel = validateChannel;
exports.validateSubject = validateSubject;

var _ProtocolConstants = __webpack_require__(15);

var _ProtocolConstants2 = _interopRequireDefault(_ProtocolConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Validate a channel against the LiveServ protocol expectations.
 *
 * @param channel
 * @returns A boolean denoting whether the channel is valid or not.
 */
function validateChannel(channel) {
  return _ProtocolConstants2.default.Patterns.Channel32Pattern.test(channel) || _ProtocolConstants2.default.Patterns.Channel16Pattern.test(channel);
}
/**
 * Validates a subject against the LiveServ protocol expectations.
 *
 * @param subject
 * @returns A boolean denoting whether the subject is valid or not.
 */
function validateSubject(subject) {
  return _ProtocolConstants2.default.Patterns.SubjectPattern.test(subject);
}

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(44);


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GcmCore = undefined;

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _GameStateController = __webpack_require__(26);

var _ErrorHandler = __webpack_require__(46);

var _GameInfo = __webpack_require__(48);

var _Validate = __webpack_require__(11);

var _NotificationHandler = __webpack_require__(10);

var _ErrorNotification = __webpack_require__(28);

var _GCMEvent = __webpack_require__(17);

var _CUIAdapter = __webpack_require__(49);

var _GCMNotification = __webpack_require__(4);

var _Promotions = __webpack_require__(50);

var _MessageTrigger = __webpack_require__(64);

var _UrlUtil = __webpack_require__(73);

var _GameSparksHandler = __webpack_require__(74);

var _LiveServHandler = __webpack_require__(120);

__webpack_require__(135);

var _es6Promise = __webpack_require__(25);

var _axios = __webpack_require__(22);

var _axios2 = _interopRequireDefault(_axios);

var _WidgetUIAdaptor = __webpack_require__(137);

var _WidgetUIAdaptor2 = _interopRequireDefault(_WidgetUIAdaptor);

var _openbetLogger = __webpack_require__(18);

var _openbetLogger2 = _interopRequireDefault(_openbetLogger);

var _OgsClient = __webpack_require__(139);

var _OgsClient2 = _interopRequireDefault(_OgsClient);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

/**
 * GcmCore class.
 * GCMCore is the main GCM interface. This is exposed within the game window.
 * When gcm is referred to elsewhere it will be referring to this API.
 * GcmCore is loaded by game and once initialized, it is responsible for initiating loading of commonUI.
 * @class GcmCore
 * @constructor
 */
var GcmCore = exports.GcmCore = function () {
    function GcmCore() {
        _classCallCheck(this, GcmCore);

        this.account = {}; // stake, paid, balances{}
        this.ccyFormatter = null;

        this.game; // Game object
        this.gameConfig = {};
        this.commonUI = null; // CUIAdapter
        this.widgetUIAdaptor = null; //Feature Widget Adaptor
        this.operator = null;
        this.launcherOrigin = null;
        this.launcherHostName = null;
        this.commonUIOrigin = null;
        this.ogsParams = null;
        this.analyticsEnabled = false;
        this.isGameReady = false;
        this.isAccountInit = false;

        // gcmCore classes
        this.gameStateController_ = new _GameStateController.GameStateController();
        this.notificationHandler_ = new _NotificationHandler.NotificationHandler();
        this.errorHandler_ = new _ErrorHandler.ErrorHandler();
        this.gameSparksHandler_ = new _GameSparksHandler.GameSparksHandler();
        this.gameInfo = new _GameInfo.GameInfo();
        this.ogsClient = new _OgsClient2.default();
        //LiveServ handler
        this.liveServHandler = new _LiveServHandler.LiveServHandler();

        this.launcherWindow = window.parent;

        this.messageTrigger = new _MessageTrigger.MessageTrigger();

        //Internal property declaring whether promotions are enabled
        this.promotionsEnabled = false;
        this.promotions = new _Promotions.Promotions(this.notificationHandler_);

        this.playerCurrency = null;
        this.latestActiveJackpotIdentifiers = [];
        this.latestJackpotBalances = [];
        this.timer = null;

        this.syndicateJackpotWinAwardDialogIsOpen = false;

        this._logger = { integration: new _openbetLogger2.default('GCM Int'), debug: new _openbetLogger2.default('GCM Debug') };
    }

    /**
    * The game should call this init method on the gcm as soon as possible
    * Here we initiate loading of commonUI into commonUIIFrame.
    * @public
    * @param {Object} game this is the game object. gcmBridge will call gcmReady on
    *          it, once gcm is available.
    * @param {string} gcmUrlString the full url of gcm . This can vary based on OGS environment the game is connected to.
    * @param {string} gameUrlString is the full url of the game (or landing pg with params for 3rd Party Partner games). Query string params passed in from the OGS Launcher should be preserved.
    */

    _createClass(GcmCore, [{
        key: 'init',
        value: function init(gameObj, gcmUrlString, gameUrlString) {
            this._logger.integration.info("GCM.init(\n\tgameObj:", gameObj, "\n\tgcmUrlString:", gcmUrlString, "\n\tgameUrlString:", gameUrlString, "\n)");

            var gcmUrl = new URL(gcmUrlString);

            if (gameUrlString != "" && gameUrlString != undefined) {
                this.gameUrl = gameUrlString;
            } else {
                this._logger.debug.warn("init: parameter gameUrlString is missing");
            }

            this.device = _UrlUtil.UrlUtil.getSearchParameterByName('device', this.gameUrl);

            if (this.device == undefined || this.device == null || this.device != "mobile") {
                this.device = "desktop";
            }

            // gcm-core & gcm-launcher are always hosted together
            this.launcherOrigin = gcmUrl.origin;
            this.launcherHostName = gcmUrl.hostname;

            this.game = gameObj;

            addEventListener("message", this.postMessageEventListener.bind(this), false);

            var isDesktop = this.device == "desktop";

            if (isDesktop) {
                var msgParam = {};
                msgParam["singlePostMsgArg"] = true;
                this.sendPostMessageToGCMLauncher("getOGSParams", msgParam);
            } else {
                this.ogsParams = this.getOGSParams(this.gameUrl, isDesktop);
                this.resumeInit();
            }
        }
    }, {
        key: 'resumeInit',
        value: function resumeInit() {
            if (this.game["getConfig"] && this.game.getConfig) {
                if (this.ogsParams == null || this.ogsParams == undefined) {
                    this._logger.integration.info("GAME.getConfig()");
                    this.gameConfig = this.game.getConfig();
                    this._logger.integration.info("gameConfig:\n\t", this.gameConfig);
                } else {
                    this._logger.integration.info("GAME.getConfig()");
                    this.gameConfig = this.game.getConfig(this.ogsParams);
                    this._logger.integration.info("gameConfig:\n\t", this.gameConfig);
                }
            }

            // don't need if Desktop? (only for Mobile extract params in launcher)
            this.gameConfig["gameUrl"] = this.gameUrl;

            if (this.device == "mobile") {
                addEventListener('resize', this.gameResized.bind(this), false);
                this.loadLauncher(this.launcherOrigin, this.gameConfig);
            } else {
                this.loadCommonUI();
            }
        }

        /**
         * This function is called from either GCM launcher.getOGSParams() for Mobile or from gcmCore.init() for Desktop.
         * @private
         * @param {Object} These are the standard list of parameters that OGS passes to game providers.
         * Note that this value is overwritten by gcmCore.configure() which is executed at a later time
         * with addition params such as RealityCheck values
         */

    }, {
        key: 'setOGSParams',
        value: function setOGSParams(params) {
            this.ogsParams = params;
            this.resumeInit();
        }

        /**
        * This is the function we expose to gcm-launcher so that it can send configuration information to gcm.
        * @private
        * @param {string} commonUIHostname gcm-launcher needs to tell gcm commonUI's hostname so that gcm can listen to post-messages from commonUI
        * @param {Object} ogsParams These are the standard list of parameters that OGS passes to game providers.
        * @param {Object} jqConfiguration Configuration for jackpot query service
        * @param {Object} ogsClientConfiguration Configuration for Ogs Client service
        * @param {Object} lsConfiguration Configuration for LiveServ service
        * These ogsParams will now be sent to game providers via gcm.
        */

    }, {
        key: 'configure',
        value: function configure(commonUIHostName, ogsParams, gcmConfiguration, gsConfiguration, jqConfiguration, ogsClientConfiguration, lsConfiguration) {
            var _this = this;

            var operatorPostMessageLibraryUrl = ogsParams["operatorPostMessageLibraryUrl"];

            if (operatorPostMessageLibraryUrl != undefined) {

                var p = this.addServiceScript(operatorPostMessageLibraryUrl);
                p.then(function (val) {
                    return _this._logger.debug.info("Operator post msg library script loaded");
                }, function (err) {
                    throw new Error("Failed to load Operator post msg library: ", err);
                });
            }

            this.commonUIHostName = commonUIHostName;
            //overwrite earlier setOGSParams() with more ogsParams (i.e. RealityCheck info)
            this.ogsParams = ogsParams;
            this.gcmConfiguration = gcmConfiguration;
            this.gsConfiguration = gsConfiguration;
            this.jqConfiguration = jqConfiguration;
            this.ogsClientConfiguration = ogsClientConfiguration;
            this.lsConfiguration = lsConfiguration;

            var gameOption = this.getGCMConfiguration('gameoption');

            if (gameOption && gameOption['MUTE']) {
                this.gameInfo.setDefaultOption('MUTE', gameOption['MUTE']);
            }

            if (this.ogsParams["device"] == "mobile") {
                this.launcherReady();
            }

            //If cmaScriptUrl is present, then load the script file into gcm window.
            if (this.ogsParams["cmaScriptUrl"]) {
                var _p = this.addServiceScript(this.ogsParams["cmaScriptUrl"]);
                _p.then(function (val) {
                    return _this._logger.debug.info("cma bridge script loaded");
                }, function (err) {
                    throw new Error("Failed to cma load bridge script: ", err);
                });
            }
        }

        /**
        * gcm-launcher is responsible for loading commonUI in commonUIIFrame.
        * So gcmCore sends a post message to gcm-launcher as soon as GCM is initialized by Game.
        * @private
        */

    }, {
        key: 'loadCommonUI',
        value: function loadCommonUI() {
            this.sendPostMessageToGCMLauncher("loadCommonUI", this.gameConfig);
        }
    }, {
        key: 'swedishRegulationParametersExist',

        // SWEDISH REGULATION PANEL METHODS
        value: function swedishRegulationParametersExist() {
            var _this2 = this;

            var swedishParameters = ['selfexclusion_url', 'selfassessment_url', 'depositlimit_url'];

            return swedishParameters.every(function (param) {
                return _this2.ogsParams[param];
            });
        }
    }, {
        key: 'loadExternalSwedishPanel',
        value: function loadExternalSwedishPanel(launcherOrigin) {
            var _this3 = this;

            var externalPanelDiv = document.createElement('div');
            externalPanelDiv.setAttribute('id', 'externalPanelContent');
            externalPanelDiv.style.left = "0";
            externalPanelDiv.style.top = "50%";
            externalPanelDiv.style.transform = "translateY(-50%)";
            externalPanelDiv.style.position = "fixed";
            //z-index set to avoid interfering with games
            externalPanelDiv.style.zIndex = 10001;
            document.body.appendChild(externalPanelDiv);

            var header = document.createElement('div');
            header.style.height = '20px';
            header.style.backgroundColor = "transparent";
            header.style.position = "absolute";
            header.style.top = '0';
            header.style.width = '100%';
            externalPanelDiv.appendChild(header);

            var panelURL = launcherOrigin + "/gcm/gcm-externalPanel/externalPanel.html";
            var panelFrame = document.createElement('iframe');
            panelFrame.setAttribute("src", panelURL);
            panelFrame.setAttribute('id', 'externalPanelIframe');
            panelFrame.setAttribute('name', 'SwedishPanel');

            panelFrame.style.border = 'none';
            panelFrame.style.width = "70px";
            panelFrame.style.height = '100px';
            panelFrame.style.overflow = "hidden";
            panelFrame.style.borderRadius = "8px 8px 0px 0px";
            panelFrame.style.border = "none";
            //fix to move responsible gaming panel in mobile for some games.
            panelFrame.style.WebkitTransform = "none";
            panelFrame.style.transform = "none";

            var swedishButtons = ['selfassessment_url', 'selfexclusion_url', 'depositlimit_url'].map(function (param) {
                return {
                    id: param.replace('_url', ''),
                    url: _this3.ogsParams[param]
                };
            });

            panelFrame.onload = function () {
                panelFrame.contentWindow.postMessage({ action: 'init', type: 'swedishRegulationPanel', params: { swedishButtons: swedishButtons, isDraggable: true } }, launcherOrigin);
            };

            externalPanelDiv.appendChild(panelFrame);

            this.makeDraggable(externalPanelDiv, header);
        }
    }, {
        key: 'makeDraggable',
        value: function makeDraggable(dragElement, dragPoint) {
            var firstTouch = true;

            if (!dragPoint) dragPoint = dragElement;

            dragPoint.addEventListener('touchstart', function (e) {
                var x = parseInt(e.touches[0].pageX);
                var y = parseInt(e.touches[0].pageY);
                var offsetX = x - parseInt(dragElement.style.left);
                var offsetY = y - parseInt(dragElement.style.top);
                if (firstTouch) {
                    dragElement.style.transform = "translateY(0)";
                    dragElement.style.top = y + "px";
                    firstTouch = false;
                }

                dragPoint.addEventListener('touchmove', function (e) {
                    e.preventDefault();
                    var x = parseInt(e.touches[0].pageX);
                    var y = parseInt(e.touches[0].pageY);

                    if (x - offsetX > 0 && x - offsetX + dragElement.offsetWidth < window.innerWidth) dragElement.style.left = x - offsetX + "px";

                    if (y - offsetY > 30 && y - offsetY + dragElement.offsetHeight < window.innerHeight) dragElement.style.top = y - offsetY + "px";
                });

                dragPoint.addEventListener('touchend', function (e) {
                    dragPoint.unbind('touchmove');
                    dragPoint.unbind('touchend');
                });
            });
        }
    }, {
        key: 'checkExternalPanelPosition',
        value: function checkExternalPanelPosition(e) {
            if (document.getElementById('externalPanelContent')) {
                var externalPanel = document.getElementById('externalPanelContent');
                var panelLeftPos = parseInt(externalPanel.style.left);
                var panelTopPos = parseInt(externalPanel.style.top);

                if (panelTopPos > window.innerHeight - externalPanel.offsetHeight) {
                    externalPanel.style.top = window.innerHeight - externalPanel.offsetHeight + "px";
                }

                if (panelLeftPos > window.innerWidth - externalPanel.offsetWidth) {
                    externalPanel.style.left = window.innerWidth - externalPanel.offsetWidth + "px";
                }
            }
        }
        // END SWEDISH REGULATION PANEL METHODS

    }, {
        key: 'loadLauncher',
        value: function loadLauncher(launcherOrigin, gameConfig) {

            var launchUrl = launcherOrigin + "/gcm/gcm-launcher/launcher.html";
            var ifrm_ = document.createElement('iframe');

            this._logger.debug.info("ifrm_ " + ifrm_);
            ifrm_.onload = function () {
                var messageObject = {};
                messageObject["action"] = "launcherLoaded";
                messageObject["params"] = gameConfig;
                var message = JSON.stringify(messageObject);
                ifrm_.contentWindow.postMessage(message, launcherOrigin);
            };

            ifrm_.name = 'launcherFrame';
            ifrm_.id = "launcherIFrame";
            ifrm_.style.borderStyle = "none";
            ifrm_.style.background = "transparent";
            ifrm_.setAttribute("background-color", 'transparent');
            ifrm_.setAttribute('allowtransparency', 'true');
            ifrm_.setAttribute('allow', 'geolocation');
            ifrm_.style.top = 0;
            ifrm_.style.left = 0;
            ifrm_.style.width = "100%";
            ifrm_.style.height = "100%";
            ifrm_.style.position = "fixed";
            ifrm_.style.zIndex = 999;
            ifrm_.setAttribute('src', launchUrl);
            document.body.appendChild(ifrm_);
        }

        /**
        * Helper method to update reference to launcher window.
        * This method is only called for mobile games where launcher window is loaded in an iframe inside game window.
        * @private
        */

    }, {
        key: 'launcherReady',
        value: function launcherReady() {
            var ifrm_ = document.getElementById("launcherIFrame");
            this.launcherWindow = ifrm_.contentWindow;
        }

        /**
        * This is a post message listener method.
        * It listens to post messages from CUI and converts them to appropriate javascript call on GCM
        * All post messages from CUI will have two parts:
        * 1. action: the gcm method name that needs to be invoked.
        * 2. params: the list of arguments that needs to be passed to the above method.
        * @private
        * @param event the event Object
        */

    }, {
        key: 'postMessageEventListener',
        value: function postMessageEventListener(event) {
            if (this.isknownOrigin(event.origin)) {
                var message = JSON.parse(event.data);
                var gcmMethod = message["action"];
                var gcmMethodParams = null;
                if (_Validate.Validate.isValidGCMMethod(gcmMethod)) {
                    if (message["params"]) {
                        gcmMethodParams = Object.keys(message["params"]).map(function (e) {
                            return message["params"][e];
                        });
                    }
                    this._logger.debug.info("Received post message: action: " + gcmMethod + ", params: " + gcmMethodParams);
                    // Initialize CUIAdapter Objects as part of first call (init) from CUI.
                    if ("commonUIReady" == gcmMethod) {
                        this.commonUI = new _CUIAdapter.CUIAdapter(this, event.source, event.origin);
                    }
                    // Make call on GCM with received method name and method params
                    this[gcmMethod].apply(this, gcmMethodParams);
                } else {
                    this._logger.debug.warn("No permission to execute method " + gcmMethod);
                }
            }
        }
    }, {
        key: 'isknownOrigin',

        /**
        * This is a helper method to validate post-message origin.
        * GCM will only accept post-messages from hostname where gcm-launcher is hosted
        * or from hostname where commonUI is hosted.
        * @private
        * @param {string} the event origin string
        */
        value: function isknownOrigin(origin) {
            return origin.indexOf(this.launcherHostName) != -1 || origin.indexOf(this.commonUIHostName) != -1;
        }
    }, {
        key: 'commonUIReady',

        /**
        * The commonUI should call this method once it has finished loading.<br>
        * The commonUI must call registerService with CCY_FORMAT before making commonUIReady call on GCM.<br>
        * GCM uses a commonUI adapter object to communicate with commonUI via post-messages
        * @public
        */
        value: function commonUIReady() {
            this._logger.integration.info("GCM.commonUIReady()");

            // Inform commonUI about game's loading screen preference as soon as commonUIReady is received
            if (this.gameConfig && this.gameConfig['gameLoadingScreen']) {
                this.commonUI.gameHasLoadingScreen();
            }

            var loggedIn = _Validate.Validate.isDefinedAndNotNull(this.ogsParams["sessionid"]);
            this.commonUI.configReady(loggedIn);

            // Provide commonUI reference to various GCM modules
            this.notificationHandler_.init(this.commonUI);
            this.gameInfo.setCommonUI(this.commonUI);
            this.gameStateController_.init(this.commonUI);

            // Tell gcm-launcher that commonUI is ready so that it can reveal commonUI window
            this.sendPostMessageToGCMLauncher("commonUIReady", null);

            // If game is already ready, then inform commonUI
            if (this.isGameReady) {
                this.commonUI.gameReady();
            }
        }
    }, {
        key: 'commonUIResize',

        /**
        * This API can be called by common UI to modify the height and width of common UI iframe.
        * GCM then delegates it to gcm-launcher which owns the page to resize commonUIIFrame.
        * @public
        * @param {string} height new height of iframe in any css unit, e.g. '20%',
        *          '20px', '20em' are all valid.
        * @param {string} width (Optional) The new width of iframe, same format as height.
        * @param {string} offsetX Gap between top/bottom and start of the iframe.
        * @param {string} offsetY Gap between sides and start of the iframe.
        * @param {boolean} reAdjust Defaults to true. Only used for desktop games
                   where we need to re-adjust gameIframe based on commonUI size.
        */
        value: function commonUIResize(height, width, offsetX, offsetY, reAdjust) {
            this._logger.integration.info("GCM.commonUIResize(\n\theight:", height, "\n\twidth:", width, "\n\toffsetX:", offsetX, "\n\toffsetY:", offsetY, "\n\treAdjust:", reAdjust, "\n)");

            if (this.device == "desktop") {
                this.sendPostMessageToGCMLauncher("commonUIResize", arguments);
            } else {
                this.commonUIResizeMobile(height, width, offsetX, offsetY);
            }
        }
    }, {
        key: 'launcherResized',

        /**
        * This method is called by launcher.js when the root window is resized.
        * game is resized directly.
        * common-ui has gameResized which performs ratio calculations in commonui.js,
        * which in turn calls commonUIResize on gcm, wich in turn calls commonUIResize back on launcher
        * which can safely (in terms of cross domain restrictions) resize the common-ui
        *
        * @private
        * @param {*} width the innerWidth of launcher.html
        * @param {*} height the innerHeight of launcher.html
        */
        value: function launcherResized(width, height) {
            this.commonUI.gameResized(width, height);
        }
    }, {
        key: 'gameResized',
        value: function gameResized(event) {
            this.commonUI.gameResized(window.innerWidth, window.innerHeight);
            this.checkExternalPanelPosition(event);
        }
    }, {
        key: 'commonUIResizeMobile',
        value: function commonUIResizeMobile(height, width, offsetX, offsetY) {

            var commonUIIFrame = document.getElementById("launcherIFrame");

            if (offsetX && offsetY) {
                commonUIIFrame.style.height = height;
                commonUIIFrame.style.width = width;
                commonUIIFrame.style.left = offsetX;
                commonUIIFrame.style.top = offsetY;
                commonUIIFrame.style.marginLeft = 0;
            } else {
                if (height) {
                    commonUIIFrame.style.height = height;
                }
                if (width) {
                    commonUIIFrame.style.width = width;
                    var currentWidth = commonUIIFrame.offsetWidth;
                    commonUIIFrame.style.left = '50%';
                    commonUIIFrame.style.marginLeft = -currentWidth / 2 + 'px';
                }
            }
        }

        /**
        * This method is a called when GCM finishes loading currencyFormat object into the window.
        * The url to currencyFormat javascript file is provided by commonUI when it calls registerService on GCM.
        * @private
        * @param {Object} script object that is loaded
        */

    }, {
        key: 'configReady',
        value: function configReady() {
            this.setupAnalytics(this.ogsParams["gameName"]);

            this.promotions.setCcyFormatter(this.ccyFormatter);
            this.promotions.setEnabled(this.ogsParams['mode'] === this.gameInfo.PlayMode.REAL);

            this._logger.integration.info("GAME.gcmReady(\n\tgcm:", this, "\n)");
            this.game.gcmReady(this);
            // is undefined for mobile (have not entered launcher yet)
            this.ogsParams["playMode"] = this.ogsParams["mode"];
            this._logger.integration.info("GAME.configReady(\n\togsParams:", this.ogsParams, "\n)");
            this.game.configReady(this.ogsParams);
        }
    }, {
        key: 'pollJackpots',

        /**
         * Game clients should invoke this method if they need to be notified
         * for any changes in the balances of any OGS jackpot(s)
         * @param {string} currency the player currency
         * @param {Object} jackpots the game's currently active jackpot pool uuids retrieved from the game server
         */
        value: function pollJackpots(currency, jackpots) {

            this.playerCurrency = currency;
            this.latestActiveJackpotIdentifiers = jackpots;

            if (typeof this.game.jackpotBalancesUpdate === "function") {
                (function (self) {
                    var querystring = Object.keys(self.latestActiveJackpotIdentifiers).map(function (key) {
                        return 'instance' + '=' + self.latestActiveJackpotIdentifiers[key];
                    }).join('&');

                    if (self.playerCurrency !== null) {
                        querystring += '&currency=' + self.playerCurrency;
                    }

                    var url = self.jqConfiguration.jqUrl + '?' + querystring;

                    clearInterval(self.timer);

                    self.timer = setInterval(function () {
                        return self.jackpotsUpdate(url, self).then(function (response) {
                            if (response.status == 200) {
                                if (response.data.hasOwnProperty('jackpots')) {
                                    self.onJackpotsUpdateSuccess(response.data.jackpots);
                                } else {
                                    self._logger.debug.error('unrecognized response from service ' + response.data);
                                }
                            }
                        }).catch(function (e) {
                            self._logger.debug.warn("Jackpots update has been failed");
                        });
                    }, self.jqConfiguration.interval || 1000);
                })(this);
            }
        }
    }, {
        key: 'jackpotsUpdate',
        value: function jackpotsUpdate(url, self) {
            var _this4 = this;

            return _axios2.default.get(url).then(function (response) {
                _this4._logger.debug.info('response: ' + JSON.stringify(response.data));
                return response;
            }).catch(function (error) {
                return self.onJackpotsUpdateFailed(error);
            });
        }
    }, {
        key: 'onJackpotsUpdateSuccess',
        value: function onJackpotsUpdateSuccess(responseData) {
            this.latestJackpotBalances = responseData;
            if (typeof this.game.jackpotBalancesUpdate === "function" && this.gameStateController_.isGameIdle()) {
                this._logger.integration.info("GAME.jackpotBalancesUpdate(\n\tresponseData:", responseData, "\n)");
                this.game.jackpotBalancesUpdate(responseData);
            }
        }
    }, {
        key: 'onJackpotsUpdateFailed',
        value: function onJackpotsUpdateFailed(error) {
            this.latestJackpotBalances = [];
            if (typeof this.game.onJackpotsUpdateFailed === "function") {
                if (error.response.hasOwnProperty('data')) {
                    this._logger.integration.info("GAME.onJackpotsUpdateFailed(\n\terrorMessage:", error.response.data, "\n)");
                    this.game.onJackpotsUpdateFailed(error.response.data);
                } else {
                    this._logger.debug.error('jackpot query api response without error message: ' + error.response.status);
                }
            }
        }

        /**
         * The game should call this method when it wants to present a jackpot dialog managed
         * by commonui
         *
         * @public
         *
         * @param {Object} includes the type of dialog that gcm should show.
         *
         * Example payload:
         * <code>
         *      {
         *          type: "syndicatedWinCalculation"
         *      }
         * </code>
         */

    }, {
        key: 'showJackpotMessageDialog',
        value: function showJackpotMessageDialog(payload) {
            if (payload && payload.type) {
                switch (payload.type) {
                    case "syndicatedWinCalculation":
                        if (!this.syndicateJackpotWinAwardDialogIsOpen) {
                            var notification = new _GCMNotification.GCMNotification(_GCMNotification.GCMNotification.TYPE.SYNDICATED_JACKPOT_PROGRESS_BAR, { timeout: 10000 });
                            this.notificationHandler_.handleNotification(notification);
                        }
                        break;
                    default:
                }
            }
        }

        /**
         * Common ui should call this method as soon as the user closes the Syndicate Jackpot Win Award Dialog.
         * 
         * @public
         */

    }, {
        key: 'syndicateJackpotWinAwardDialogClosed',
        value: function syndicateJackpotWinAwardDialogClosed() {
            this.syndicateJackpotWinAwardDialogIsOpen = false;
        }

        /**
        * The game should call this method when it is loaded and initialized.<br>
        * @public
        *
        */

    }, {
        key: 'gameReady',
        value: function gameReady() {
            this._logger.integration.info("GCM.gameReady()");

            this.isGameReady = true;
            this.gameInfo.setGame(this.game);

            if (this.device == "mobile" && this.swedishRegulationParametersExist()) this.loadExternalSwedishPanel(this.launcherOrigin);

            this.notificationHandler_.setGame(this.game);
            if (this.commonUI) {
                this.commonUI.gameReady();
            }
        }
    }, {
        key: 'gameRevealed',

        /**
        * After the commonUI has shown the game it should call this method to say it has done so.
        * GCM will ask gcm-launcher to re-adjust the page and inform the Game to enable itself.
        * @public
        */
        value: function gameRevealed() {
            this._logger.integration.info("GCM.gameRevealed()");

            if (this.analyticsEnabled) {
                ga('send', 'timing', 'gameRevealed', this.ogsParams["gameName"], Math.round(performance.now()));
            }

            // Tell gcm-launcher that game is revealed so that it can adjust commonUI size appropriately
            this.sendPostMessageToGCMLauncher("gameRevealed", null);
            this.sendPostMessageToOperator({ "gcmevent": "gameRevealed" });

            // if game has promotions then initialise promotions and call gameRevealed
            if (this.promotionsEnabled === true) {
                this.promotions.init().then(function () {
                    this._logger.integration.info("GAME.gameRevealed()");
                    this.game.gameRevealed();
                }.bind(this));
            } else {
                this._logger.integration.info("GAME.gameRevealed()");
                this.game.gameRevealed();
            }
        }
    }, {
        key: 'stakeUpdate',

        /**
        * The game must call this each time the stake changes, even though not all
        * commonUI implementations will choose to display stake in the commonUI.
        * @public
        * @function
        * @param {number} stake numeric value.
        * @return {Object} the ccy format object of the stake value in the format:
        *        {display: '£10.00', code:'GBP', value: 10.00 , currency_symbol: '£',
        *        ccy_thousand_separator: ',', ccy_decimal_separator: '.'}.
        */
        value: function stakeUpdate(stake) {
            this._logger.integration.info("GCM.stakeUpdate(\n\tstake:", stake, "\n)");

            if (!stake) {
                stake = 0.00;
            }

            if (!_Validate.Validate.isNumericValue(stake)) {
                throw new Error('gcm.stakeUpdate: Invalid stake value:' + stake);
            }

            this.account.stake_ = stake;

            var formatedValue = this.ccyFormatter['format'](this.account.stake_);

            if (this.commonUI) {
                this.commonUI.stakeUpdate(formatedValue);
            }

            return formatedValue;
        }
    }, {
        key: 'paidUpdate',

        /**
        * The game must call this each time paid changes, even though not all commonUI
        * implementations will choose to display paid in the commonUI.
        * @public
        * @param {number} paid numeric value.
        * @return {Object} the ccy format object of the paid value in the format:
        *        {display: '£10.00', code:'GBP', value: 10.00 , currency_symbol: '£',
        *        ccy_thousand_separator: ',', ccy_decimal_separator: '.'}.
        */
        value: function paidUpdate(paid) {
            this._logger.integration.info("GCM.paidUpdate(\n\tpaid:", paid, "\n)");

            if (!paid) {
                paid = 0.00;
            }

            if (!_Validate.Validate.isNumericValue(paid)) {
                throw new Error('gcm.paidUpdate: Invalid paid value:' + paid);
            }

            this.account.paid_ = paid;
            var formatedValue = this.ccyFormatter['format'](this.account.paid_);

            if (this.commonUI) {
                this.commonUI.paidUpdate(formatedValue);
            }

            return formatedValue;
        }
    }, {
        key: 'balancesUpdate',

        /**
        * The game should call this function with a balanceFudge parameter when it
        * wants to hide the winnings, then when the winnings have been revealed
        * in the game, game should call it again without the balanceFudge parameter
        * to display the actual balance.
        * The commonUI is also able to call this function in order to update the balance
        * after a quick deposit.  The commonUI should use the calledFromCommonUI parameter
        * to show that this has happened, and so that GCM will call through to the game with
        * the update balance information.
        * @public
        * @param {Object} balances A map of balances with following format:  <br>
        * <code>
        *            {
        *                'CASH': {amount: 1000.00},
        *                'BONUS': {amount: 20.00}
        *            }
        * </code>
        *
        * @param {number=} balanceFudge (Optional) the numeric amount to decrement the displayed
        *          balance by until the game play is complete. This will usually be the
        *          game winnings, which have not yet been shown to the player in the
        *          game animation.<br>
        *          If this parameter is not provided, gcm will display the actual balance.
        * @param {boolean=} changedFromCommonUI (Optional) this should be set to true when this function is called
        *          by the commonUI.
        * @return {Object} formattedBalances a balances object containing ccy format objects
        *        for each balance type:
        *            {
        *                'CASH': {display: '£10.00', code:'GBP', value: 10.00, currency_symbol: '£', ccy_thousand_separator: ',', ccy_decimal_separator: '.'},
        *                'BONUS': {display: '£10.00', code:'GBP', value: 10.00 , currency_symbol: '£', ccy_thousand_separator: ',', ccy_decimal_separator: '.'}
        *            }
        */
        value: function balancesUpdate(balances, balanceFudge, changedFromCommonUI) {
            this._logger.integration.info("GCM.balancesUpdate(\n\tbalances:", balances, "\n\tbalanceFudge:", balanceFudge, "\n\tchangedFromCommonUI:", changedFromCommonUI, "\n)");

            // Initialize 3rd party services.
            if (!this.isAccountInit) {
                this.isAccountInit = true;
                this.initExternalServices();
            }

            // Promotions impact the balance of the user in a non standard way. For instance, the winnings from freerounds
            // are only credited to the wallet upon playing the final freeround. In order to prevent game providers from
            // needing to have an understanding of the impact of promotions on the balance, we have added logic here to
            // determine if the promotions module should override the balanceFudge from the game
            if (this.promotions.isEnabled() && changedFromCommonUI !== true) {
                var promoBalanceFudge = this.promotions.getPromoBalanceFudge();

                if (promoBalanceFudge !== null) {
                    balanceFudge = promoBalanceFudge;
                }
            }

            var cashType = 'CASH'; //Account.BalanceTypes.CASH;

            if (!balanceFudge) {
                balanceFudge = 0;
            }

            //copy balances
            //don't clear the balances - we want to maintain any balance types
            //which are not included in the balances parameter, so that the commonUI
            //is able to just update the cash amount
            this.account.balances_ = {};
            for (var type in balances) {
                this.account.balances_[type] = {};
                this.account.balances_[type]['amount'] = balances[type]['amount'];
            }

            //copy to fudgedBalances (note that we copy the balances_ not the balances, so
            //that we are including any persisted freebet balance etc.)
            var fudgedBalances = {};
            for (var type in this.account.balances_) {
                fudgedBalances[type] = {};
                fudgedBalances[type]['amount'] = this.account.balances_[type]['amount'];
            }

            //deduct balanceFudge from CASH balance
            if (fudgedBalances[cashType]) {
                fudgedBalances[cashType]['amount'] = +this.account.balances_[cashType]['amount'] - balanceFudge;
            }

            var formattedBalances = {};
            //format each balance
            for (var type in fudgedBalances) {
                formattedBalances[type] = {};
                formattedBalances[type] = this.ccyFormatter['format'](fudgedBalances[type]['amount']);
            }

            if (this.commonUI) {
                this.commonUI.balancesUpdate(formattedBalances);
            }

            // Check if this method is called by CUI.
            if ((typeof changedFromCommonUI === 'undefined' ? 'undefined' : _typeof(changedFromCommonUI)) !== undefined && changedFromCommonUI === true && this.game) {
                //make a copy of balances to pass onto game
                var balancesCopy = {};
                for (type in this.account.balances_) {
                    balancesCopy[type] = {};
                    balancesCopy[type]['amount'] = this.account.balances_[type]['amount'];
                }
                this._logger.integration.info("GAME.balancesHasChanged(\n\tbalances:", balancesCopy, "\n)");
                this.game.balancesHasChanged(balancesCopy);
            }

            return formattedBalances;
        }
    }, {
        key: 'initExternalServices',

        /**
         * Initializes any external service (eg. GameSparks, etc)
         * @private
         */
        value: function initExternalServices() {

            // Init GameSparks
            this.initializeGamesparks();
            // Init OgsClient
            this.initializeOgsClient();

            // Init LiveServ
            this.initializeLiveServ();
        }
        /**
         * Initialize the Gamesparks if the Gamesparks configuration exist
        */

    }, {
        key: 'initializeGamesparks',
        value: function initializeGamesparks() {
            if (this.ogsParams['mode'] === this.gameInfo.PlayMode.REAL) {
                if (typeof this.gsConfiguration !== 'undefined' && this.gsConfiguration != null && this.gsConfiguration.enabled) {
                    //Create the Widget UI Adaptor and get a reference to the notification handler of the adaptor so GameSparksEvents can send Challenge messages to the Widget directly
                    this.widgetUIAdaptor = new _WidgetUIAdaptor2.default(this.gameSparksHandler_);
                    //Made the widget notification handlers an object of different handlers for future use
                    var widgetNotificationHandlers = {
                        challengeNotificationHandler: this.widgetUIAdaptor.handleFeatureNotification
                        // Initialize GameSparks
                    };this.gameSparksHandler_.init(this, this.ogsParams, this.notificationHandler_, widgetNotificationHandlers, this.gsConfiguration);
                }
            }
        }

        /**
         * Initialize the OGS Client if the OGS Client configuration exist
         */

    }, {
        key: 'initializeOgsClient',
        value: function initializeOgsClient() {
            if (typeof this.ogsClientConfiguration !== 'undefined' && this.ogsClientConfiguration != null && this.ogsClientConfiguration.enabled) {
                this.ogsClient.init(this.ogsClientConfiguration, this.ogsParams);
            }
        }

        /**
         * Initialize the LiveServ if the LiveServ configuration exist
         */

    }, {
        key: 'initializeLiveServ',
        value: function initializeLiveServ() {
            var _this5 = this;

            if (this.isLiveServEnabled()) {
                if (typeof this.game.getOgsClientToken !== "function") {
                    return;
                }

                var ogsClientToken = this.game.getOgsClientToken();
                if (typeof ogsClientToken !== 'undefined' && ogsClientToken != null) {
                    this.ogsClient.getLiveServToken(ogsClientToken).then(function (authInfo) {
                        _this5.liveServHandler.init(_this5, _this5.notificationHandler_, _this5.lsConfiguration, authInfo);
                    }).catch(function (error) {
                        return console.log(error);
                    });
                }
            }
        }

        /**
         * This function checks the liveserv configuration value, and return boolean
         */

    }, {
        key: 'isLiveServEnabled',
        value: function isLiveServEnabled() {
            return typeof this.lsConfiguration !== 'undefined' && this.lsConfiguration != null && typeof this.lsConfiguration !== 'undefined' && typeof this.lsConfiguration.enabled !== 'undefined' && this.lsConfiguration.enabled;
        }

        /**
        * The game should call gameAnimationStart when it starts it's game play
        * animation After this the commonUI is not permitted to display any content
        * until gameAnimationComplete() is invoked by the game.
        * @public
        */

    }, {
        key: 'gameAnimationStart',
        value: function gameAnimationStart() {
            this._logger.integration.info("GCM.gameAnimationStart()");
            this.gameStateController_.gameAnimationStart();
            this.sendPostMessageToOperator({ "gcmevent": "gameAnimationStart" });
        }
    }, {
        key: 'gameAnimationComplete',

        /**
        * The game should call gameAnimationComplete(resumeCallback) when the game
        * animation is complete. This will have the effect of handing over control to
        * GCM so that any pending notifications can be shown in the commonUI. Once GCM
        * has completed showing any notifications in the commonUI, the resumeCallback
        * will be called.
        * @public
        * @param {Function} resumeCallback the callback function that should be
        *          called when the commonUI has completed dealing with notifications.
        */
        value: function gameAnimationComplete(resumeCallback) {
            this._logger.integration.info("GCM.gameAnimationComplete(\n\tresumeCallback:", resumeCallback, "\n)");

            this.promotions.gameAnimationComplete();
            this.gameStateController_.gameAnimationComplete(resumeCallback);
            if (typeof this.game.jackpotBalancesUpdate === "function" && this.latestJackpotBalances.length > 0) {
                this._logger.integration.info("GAME.jackpotBalancesUpdate(\n\tbalances:", this.latestJackpotBalances, "\n)");
                this.game.jackpotBalancesUpdate(this.latestJackpotBalances);
            }
            this.sendPostMessageToOperator({ "gcmevent": "GameAnimationComplete" });
        }
    }, {
        key: 'isGameIdle',

        /**
        * The Common-ui should call isGameIdle() to check what state the game is in.
        * A post msg is sent back to the common-ui gameIdle(bool).
        */
        value: function isGameIdle() {
            var idle = this.gameStateController_.isGameIdle();
            this.commonUI.gameIdle(idle);
        }

        /**
        * The game should call handleError on gcm for any error to be displayed and handled
        * by the CommonUI. <br>
        * GCM will call commonUI.handleError() to pass this error to commonUI for handling.
        * The commonUI is responsible for both the display and the logic for what happens
        * after an error is displayed to the user.<br>
        * @public
        * @param {string} errorCategory the category of current error.
        *                 The current error categories are:
        *                 {
        *                     CRITICAL,
        *                     INSUFFICIENT_FUNDS,
        *                     LOGIN_ERROR,
        *                     RECOVERABLE_ERROR,
        *                     NON_RECOVERABLE_ERROR,
        *                     CONNECTION_ERROR,
        *                     MULTI_CHOICE_DIALOG,
        *                     OTHER_GAME_IN_PROGRESS,
        *                     REALITY_CHECK
        *                 }.
        * @param {string} errorSeverity this signifies the severity of the error and can
        *          be 'WARNING', 'INFO' or 'ERROR'.
        * @param {string} errorCode the error code string. Note that usually nothing
        *          should be done with this parameter. The commonUI is not expected to
        *          do any business logic based on the error code, but it is passed
        *          through in case the commonUI wishes to log the error codes that
        *          have been sent.
        * @param {string} errorMessage the error message provide by game.
        * @param {Object=} errorParams (Optional) the optional JSON object parameter to allow the game to pass additional
        *          information to the commonUI on how to handle the error. Name key, value pairs
        *          must be provided in a valid JSON format.
        *          This parameter is used for (and not restricted to) error categories
        *          "OTHER_GAME_IN_PROGRESS" and "MULTI_CHOICE_DIALOG".
        *
        *          Usage in "OTHER_GAME_IN_PROGRESS"
        *          Raising a "OTHER_GAME_IN_PROGRESS" error category will inform the CommonUI that more than
        *          one game is already in progress.
        *          The CommonUI can relaunch the corresponding game by using game information provided in errorParams argument.
        *          When calling an error of this category type the game name must be provided as part of the error parameters
        *          in JSON format in a 'gameName' tag. Any additional game launching information can be provided within
        *          a 'gameInProgressParams' tag in the JSON object.
        *
        *          Example of errorParams object for a "OTHER_GAME_IN_PROGRESS" error:
        *              {'gameName': 'ChainReactors'}
        *              {'gameInProgressParams': {
        *                         'channel': 'I',
        *                         'lang': 'en',
        *                         'playMode': 'real',
        *                         'loginToken': 'tqQRojxew8fBeadMe/8gtOk8nz1+PeuCSE0AQdKyw0Og4wpnFyZhrVh2VhZhp67gz10s8Y2==',
        *                         'affId': '1'
        *                         }
        *              }}
        *
        *
        *          Usage in "MULTI_CHOICE_DIALOG"
        *          Raising a "MULTI_CHOICE_DIALOG" error category will inform the CommonUI that the error dialog can be
        *          displayed with multiple options.  These options will be provided in errorParams object.
        *          When the user acknowledges the error dialog, the selected option's index will be returned to the game.
        *
        *          Example of errorParams object for a "OTHER_GAME_IN_PROGRESS" error:
        *              {'options' : ['Ok', 'Cancel', 'Quit']}
        *
        *
        *          Usage in providing additional error handling information
        *          This is an example of how this parameter can be used when the error category raised
        *          is not a "OTHER_GAME_IN_PROGRESS" or "MULTI_CHOICE_DIALOG" type.
        *          This example provides a method to suppress an error message if for example the previous
        *          error was a "MULTI_CHOICE_DIALOG" error category type and the player selected an option to "close the game".
        *          This could result in the game raising a Critical error to inform the CommonUI that it is closing the game.
        *          This error can be suppressed since the player has chosen to close the game.
        *
        *          This example scenario would require additional information to be provided in the following format:
        *              {'suppressMessage':'true'}
        *
        */

    }, {
        key: 'handleError',
        value: function handleError(errorCategory, errorSeverity, errorCode, errorMessage, errorParams) {
            this._logger.integration.info("GCM.handleError(\n\terrorCategory:", errorCategory, "\n\terrorSeverity:", errorSeverity, "\n\terrorCode:", errorCode, "\n\terrorMessage:", errorMessage, "\n\terrorParams:", errorParams, "\n)");

            this.notificationHandler_.addEventListener(_GCMEvent.GCMEvent.COMPLETE, this.onHandleErrorComplete, this);
            this.errorHandler_.handleError(errorCategory, errorSeverity, errorCode, errorMessage, errorParams);
        }
    }, {
        key: 'handleServerError',

        /**
        * The game should call handleServerError with every error that it receives from
        * the game server. This is only applicable for OpenBet managed games service games.
        * GCM will categorize the error based on the error code in the errorInfo object.
        * <code>
        * The current error categories include:
        *                 {
        *                     CRITICAL,
        *                     INSUFFICIENT_FUNDS,
        *                     LOGIN_ERROR,
        *                     RECOVERABLE_ERROR,
        *                     NON_RECOVERABLE_ERROR,
        *                     CONNECTION_ERROR,
        *                     MULTI_CHOICE_DIALOG,
        *                     OTHER_GAME_IN_PROGRESS
        *                 }.
        * Default error category is NON_RECOVERABLE_ERROR.
        * </code>
        * GCM will also supply the error severity for known errors. i.e. 'WARNING', 'INFO'
        * or 'ERROR'.  This can be used by the commonUI to display different colours and titles for the
        * error dialogs if desired.<br>
        * GCM will pass the error onto the commonUI to both display the error and decide
        * what it would like to do after the error has been shown (business logic should be
        * based on the errorCategory supplied by GCM)<br>
        *
        * Note that the errorInfo object parameter required for this function can
        * be created using com.openbet.gcm.xmlutil.getErrorInfoFromFOGXml() which takes
        * the XML Error response from the FOG/RGI server and converts it into the
        * required object format.  Alternatively the object can be created directly by the
        * game's FOG response parsing code.
        * @private
        * @param {Object} errorInfo The error object in the following format:
        * <code>
        *          {
        *            errorCode: code,
        *            errorMessage: msg
        *          }</code>.
        * @throws Error if the params are invalid.
        */
        value: function handleServerError(errorInfo) {
            if (this.errorHandler_.isRealityCheckError(errorInfo['errorCode'])) {
                // Before handling a reality check error, reality check details such as realityCheckPeriod, sessionTime etc
                // needs to be retrieved and then handleRealityCheckError is called on gcmCore.
                this.getRealityCheckDetails(this.handleRealityCheckError);
            } else {
                this.errorHandler_.handleServerError(errorInfo);
                //listen to COMPLETE event of notification handler to be sure all pending notifications
                //are handled before game resume.
                this.notificationHandler_.addEventListener(_GCMEvent.GCMEvent.COMPLETE, this.onHandleErrorComplete, this);
            }
        }
    }, {
        key: 'getRealityCheckDetails',

        /**
         * This function will be called by GCM when it receives a reality check error from Game.
         * @param {Function} realityCheckCallback the callback function that should be
         * called when gcm web-service returns the reality check details in a JSON object.
         * @return {Object} the realityCheckDetails object.
         * Example of realityCheckDetails object :
         *
         * { "realityCheckInfo": {"custId": "3", "realityCheckPeriod": "1800", "sessionTime": "3000", "remainingTime":"0"},
         *   "rcParams" : {"param1": "value1", "param2": "value2",...,"paramN":"valueN"}
         * }
         * Note: rcParams Object param in this response is an optional parameter and can contain unrestricted number of params.
         *
         */
        value: function getRealityCheckDetails(realityCheckCallback) {
            //var realityCheckDetails = new RealityCheckDetails (realityCheckCallback ,gcmCore.gcmWebServiceBaseUrl_);
            //send reality check details request
            //realityCheckDetails.init();
        }
    }, {
        key: 'handleRealityCheckError',

        /**
        * handleRealityCheckError function is called for handling reality check error.
        * Existing flash and HTML5 games make use of handleError or handlerServerError for all types of error handling.
        * So this function does not get called directly by Game and through one of the above mentioned functions.
        * Once the error is processed, GCM will call commonUI.handleError() to pass this error to commonUI for handling.
        * The commonUI is responsible for both the display and the logic for what happens
        * after a reality check error is displayed to the user.
        * @public
        * @param {Object} realityCheckDetails JSON object parameter. This object is added to errorParams
        * when calling handleError on commonUI.
        * Example of realityCheckDetails object :
        *
        * { "realityCheckInfo": {"custId": "3", "realityCheckPeriod": "1800", "sessionTime": "3000", "remainingTime":"0"},
        *   "rcParams" : {"param1": "value1", "param2": "value2",...,"paramN":"valueN"}
        * }
        * Note: rcParams Object param in this response is an optional parameter and can contain unrestricted number of params.
        *
        */
        value: function handleRealityCheckError(realityCheckDetails) {
            this._logger.integration.info("GCM.handleRealityCheckError(\n\trealityCheckDetails:", realityCheckDetails, "\n)");

            this.notificationHandler_.addEventListener(_GCMEvent.GCMEvent.COMPLETE, this.onHandleErrorComplete, this);
            this.errorHandler_.handleRealityCheckError(realityCheckDetails);
        }
    }, {
        key: 'onHandleErrorComplete',

        /**
        * Event listener function used when error handling complete.
        * @private
        */
        value: function onHandleErrorComplete() {

            this.notificationHandler_.removeEventListener(_GCMEvent.GCMEvent.COMPLETE, this.onHandleErrorComplete, this);

            var errorParamIndex = _ErrorNotification.ErrorNotification.getErrorParamIndex();

            if (errorParamIndex != undefined) {
                this._logger.integration.info("GAME.resume(\n\terrorParamIndex:", errorParamIndex, "\n)");
                this.game.resume(errorParamIndex);
                _ErrorNotification.ErrorNotification.setErrorParamIndex(undefined);
            } else {
                this._logger.integration.info("GAME.resume()");
                this.game.resume();
            }
        }
    }, {
        key: 'formatAmount',

        /**
        * Games can call this function to get a currency formatted string of a decimal amount.
        * @public
        * @param {number} amount Amount to be formatted.
        * @return {string} formatted string representation.
        **/
        value: function formatAmount(amount) {
            this._logger.integration.info("GCM.formatAmount(\n\tamount:", amount, "\n)");

            return this.ccyFormatter['format'](parseFloat(amount)).display;
        }
    }, {
        key: 'optionHasChanged',

        /**
        * Either the game or the commonUI can call this method on gcm to state that an
        * option has changed. There could be UI in both the game and the commonUI to
        * control options such as MUTE and TURBO, also the display option such as
        * show about box or game preferences. and the new value should be reflected
        * in both places
        * @public
        * @param {string} optionType one of MUTE, TURBO, ABOUT, HELP, PAYTABLE and GAME_PREFERENCE.
        * @param {string} changedFrom one of COMMONUI, GAME. This tells gcm whether the
        *          option was switched in the game or the commonUI.
        * @param {boolean} newValue the new value of the option.
        */
        value: function optionHasChanged(optionType, changedFrom, newValue) {
            this._logger.integration.info("GCM.optionHasChanged(\n\toptionType:", optionType, "\n\tchangedFrom:", changedFrom, "\n\tnewValue:", newValue, "\n)");

            this.gameInfo.optionHasChanged(optionType, changedFrom, newValue);
        }
    }, {
        key: 'regOption',

        /**
        * This is an optional call for the game to make to GCM. The game can choose to
        * use this facility if they choose to allow the commonUI to control game
        * options.<br>
        * Options can be registered are including game setting options such as 'MUTE'
        * 'TURBO' and game display options such as 'PAYTABLE', 'ABOUT', 'HELP' and 'GAME_PREFERENCE'
        * @public
        * @param {string} optionType one of MUTE, TURBO, ABOUT, HELP, PAYTABLE and GAME_PREFERENCE.
        * @return {boolean|string} the initial value of the option is returned back to the
        *         game. GCM can potentially in the future save these options in cookies
        *         or against the account, so that we have persistence of options.
        * @throws Error if the optionType params are invalid
        */
        value: function regOption(optionType) {
            this._logger.integration.info("GCM.regOption(\n\toptionType:", optionType, "\n)");

            return this.gameInfo.regOption(optionType);
        }
    }, {
        key: 'loadProgressUpdate',

        /**
        * The game must call this on gcm so that the commonUI can be updated with
        * loading progress and display progress in a loading screen
        * @public
        * @param {number} percentLoaded the percentage of the loading process complete.
        */
        value: function loadProgressUpdate(percentLoaded) {
            this._logger.integration.info("GCM.loadProgressUpdate(\n\tpercentLoaded:", percentLoaded, "\n)");

            this.gameInfo.loadProgressUpdate(percentLoaded);
        }
    }, {
        key: 'resume',

        /**
        * This function is called by commonUI when it's done handling recoverable error.
        * gcm will call game.resume() to resume the game play.
        * @public
        * @param {*=} feedback (Optional) The feedback from user for the resumption
        *            of current outstanding notification. The feedback detail depend
        *            on notification type. Notifications expect feedback including:<br>
        *              - SESSION_TIMER <br>
        */
        value: function resume(feedback) {
            this._logger.integration.info("GCM.resume(\n\tfeedback:", feedback, "\n)");

            if (this.gameStateController_.gameResumeCallback_) {
                // If game has registered a callback method, then we need to make sure this
                // callback method is called after all pending notifications are processed
                this.notificationHandler_.addEventListener(_GCMEvent.GCMEvent.COMPLETE, this.onNotificationHandlingComplete, this);
            }
            this.notificationHandler_.resume(feedback);
        }
    }, {
        key: 'onNotificationHandlingComplete',
        value: function onNotificationHandlingComplete() {
            this.notificationHandler_.removeEventListener(_GCMEvent.GCMEvent.COMPLETE, this.onNotificationHandlingComplete, this);
            if (this.gameStateController_.gameResumeCallback_) {
                this.gameStateController_.gameResumeCallback_();
                this.gameStateController_.gameResumeCallback_ = null;
            }
        }

        /**
        * This method is a called by CommonUI when it wants to reload the page as part of error handling.
        * If desktop GCM then sends a post-message to gcm-launcher(which is the main page) to reload itself.
        * If mobile, GCM will attempt to invoke same function on the game.
        * @public
        */

    }, {
        key: 'reload',
        value: function reload() {
            this._logger.integration.info("GCM.reload()");
            this.sendPostMessageToOperator({ "gcmevent": "reload", "url": "" });

            if (this.ogsParams["device"] == 'desktop') {
                this.sendPostMessageToGCMLauncher("reload", null);
            } else {
                if (this.game["reload"]) {
                    this._logger.integration.info("GAME.reload()");
                    this.game.reload();
                }
            }
        }
    }, {
        key: 'redirect',

        /**
        * This method is a called by CommonUI when it wants to redirect the main window to a different page as a result of
        * error handling action(like login_error).
        * If desktop GCM then sends a post-message to gcm-launcher(which is the main page) to redirect to the requested page.
        * If mobile, GCM will attempt to invoke same function on the game.
        * @public
        * @param {String} redirectUrl The url to redirect current page
        */
        value: function redirect(redirectUrl) {
            this._logger.integration.info("GCM.redirect(\n\tredirectUrl:", redirectUrl, "\n)");

            this.sendPostMessageToOperator({ "gcmevent": "redirect", "url": redirectUrl });
            if (this.ogsParams["device"] == 'desktop') {
                this.sendPostMessageToGCMLauncher("redirect", arguments);
            } else {
                if (this.game["redirect"]) {
                    this._logger.integration.info("GAME.redirect(\n\tredirectUrl:", redirectUrl, "\n)");
                    this.game.redirect(redirectUrl);
                }
            }
        }
    }, {
        key: 'gsPlayerAction',

        /**
        * This method is a called by CommonUI when user clicked join or cancel
        * @param {String} user action will be either "JOIN" or "REJECT"
        */
        value: function gsPlayerAction(action) {
            this.gameSparksHandler_.onMissionPlayerAction(action);
        }

        /**
        * Register a custom service with GCM like CCYFormat
        * This function allows the customer to register GCM with their custom service like CurrencyFormat,
        * through their commonUI before invoking gcm.init
        * CommonUI must call registerService before commonUIReady
        * @public
        * @param {String} serviceType, service type to register eg: CCY_FORMAT
        * @param {Object} serviceUrl, url where script object for serviceType is availabe.
        */

    }, {
        key: 'registerService',
        value: function registerService(serviceType, serviceUrl, initParams) {
            var _this6 = this;

            this._logger.integration.info("GCM.registerService(\n\tserviceType:", serviceType, "\n\tserviceUrl:", serviceUrl, "\n\tinitParams:", initParams, "\n)");

            switch (serviceType) {
                case 'CCY_FORMAT':
                    var p = this.addServiceScript(serviceUrl);
                    p.then(function (val) {
                        return _this6.ccyConfigLoaded(val, initParams);
                    }, function (err) {
                        throw new Error("Failed to load serviceScript: ", err);
                    });
                    break;
            }
        }
    }, {
        key: 'ccyConfigLoaded',

        /**
        * Callback method for CCY_FORMAT registerService call.
        * this.configReady() should be called when all / last config has been loaded.
        * Currently only registering CCY_FORMAT service, so it resides here.
        * @private
        * @param {string} script loaded
        */
        value: function ccyConfigLoaded(script, initParams) {
            this.ccyFormatter = currencyFormat;
            this.ccyFormatter["init"].apply(this, initParams);
            this.configReady();
        }

        /**
        * Helper method to load a supplied javascript url on the current window
        * @private
        * @param {string} scriptUrl
        */

    }, {
        key: 'addServiceScript',
        value: function addServiceScript(scriptUrl) {
            return new _es6Promise.Promise(function (resolve, reject) {
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = scriptUrl;
                script.addEventListener('load', function () {
                    return resolve(script);
                }, false);
                script.addEventListener('error', function () {
                    return reject(script);
                }, false);
                document.body.appendChild(script);
            });
        }
    }, {
        key: 'getGCMConfiguration',
        value: function getGCMConfiguration(serviceName) {
            if (this.gcmConfiguration[serviceName] && this.gcmConfiguration[serviceName]['Enabled']) {
                return this.gcmConfiguration[serviceName]['Parameters'];
            }
            return null;
        }
    }, {
        key: 'setupAnalytics',
        value: function setupAnalytics(gameName) {
            var analyticsConfiguration = this.getGCMConfiguration('analytics');
            if (analyticsConfiguration && analyticsConfiguration['trackingid']) {
                var analyticsId = analyticsConfiguration['trackingid'];
                var sampleRate = analyticsConfiguration['samplerate'];
                // See https://developers.google.com/analytics/devguides/collection/analyticsjs/
                (function (i, s, o, g, r, a, m) {
                    i['GoogleAnalyticsObject'] = r;
                    i[r] = i[r] || function () {
                        (i[r].q = i[r].q || []).push(arguments);
                    }, i[r].l = 1 * new Date();
                    a = s.createElement(o), m = s.getElementsByTagName(o)[0];
                    a.async = 1;a.src = g;m.parentNode.insertBefore(a, m);
                })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

                ga('create', analyticsId, 'auto', { 'siteSpeedSampleRate': sampleRate });
                ga('send', 'pageview');

                if (window.performance) {
                    ga('send', 'timing', 'gcmReady', gameName, Math.round(performance.now()));
                    this.analyticsEnabled = true;
                }
            }
        }

        /**
         * Game should call this method to handle any and all generic messages received through message trigger.
         *
         * Example messageNodeStr:
         *   "<MESSAGE nogslang='en_uk' id='100'>
        *     <TYPE>REALITYCHECK_UK</TYPE>
        *     <TITLE>Responsible Gaming Reality Check</TITLE>
        *     <TEXT>You have been playing for 1 minute, if you wish you can continue to play. Or exit the game.</TEXT>
        *     <OPTIONS COUNT='3'>
        *       <OPTION action='https://ogs-stage.nyxgib.eu/vf/realitycheck/271?request=realitycheck&amp;action=accept&amp;userid=630595434&amp;gamesessionid=fe85f6e2-ad86-435d-ab9d-c8321cbf0272&amp;gpgameid=70233&amp;currency=GBP&amp;apiversion=1.3&amp;ts=1538646574269' id='101'>PROCEED</OPTION>
        *       <OPTION action='https://ogs-stage.nyxgib.eu/vf/realitycheck/271?request=realitycheck&amp;action=reject&amp;userid=630595434&amp;gamesessionid=fe85f6e2-ad86-435d-ab9d-c8321cbf0272&amp;gpgameid=70233&amp;currency=GBP&amp;apiversion=1.3&amp;ts=1538646574269' id='102'>EXIT</OPTION>
        *       <OPTION action='https://www-stg1.coral.co.uk/account/history' id='103'>HISTORY</OPTION>
        *     </OPTIONS>
        *   </MESSAGE>"
         *
         * @param {String} messageNodeStr
         */

    }, {
        key: 'handleMessageTrigger',
        value: function handleMessageTrigger(messageNodeStr) {
            this._logger.integration.info("GCM.handleMessageTrigger(\n\tmessageNodeStr:", messageNodeStr, "\n)");

            if (messageNodeStr !== null) {
                try {
                    var message = this.messageTrigger.getMessageFromXml(messageNodeStr);
                    // Check if message obj is not empty (eg. UKGC Sync Message).
                    if (Object.keys(message).length > 0) {

                        // As game lifecycle already has a callback to game.
                        // Only if handleMessageTrigger is called outside of game lifecycle, we need to explicitly call game.resume()
                        if (!this.gameStateController_.gameResumeCallback_) {
                            this.notificationHandler_.addEventListener(_GCMEvent.GCMEvent.COMPLETE, this.onHandleMessageTriggerComplete, this);
                        }
                        this.notificationHandler_.handleNotification(new _GCMNotification.GCMNotification(_GCMNotification.GCMNotification.TYPE.GENERIC_MESSAGE, message));
                    }
                } catch (err) {
                    this.handleError('CONNECTION_ERROR', 'ERROR', null, null);
                }
            }
        }

        /**
        * Event listener function used when message trigger notification handling is complete.
        * @private
        */

    }, {
        key: 'onHandleMessageTriggerComplete',
        value: function onHandleMessageTriggerComplete() {

            this.notificationHandler_.removeEventListener(_GCMEvent.GCMEvent.COMPLETE, this.onHandleMessageTriggerComplete, this);
            this._logger.integration.info("GAME.resume()");
            this.game.resume();
        }
    }, {
        key: 'sendPostMessageToGCMLauncher',

        /**
        * Helper method to send post-messages to gcm-launcher
        * This method accepts two parameters
        * @private
        * @param {string} methodName the method to be executed on gcm-launcher
        * @param {Object} methodParams the paramers to be passed to the method on gcm-launcher
        */
        value: function sendPostMessageToGCMLauncher(methodName, methodParams) {
            var postMessage = this.createPostMessage(methodName, methodParams);

            // Send postMessage to gcm-launcher
            this.launcherWindow.postMessage(postMessage, this.launcherOrigin);
        }

        /**
            * Helper method to send post-messages to operator
            * This method accepts one parameter
            * @private
            * @param {Object} postMessage the parameter to be passed to operator
         */

    }, {
        key: 'sendPostMessageToOperator',
        value: function sendPostMessageToOperator(postMessage) {
            var operatorWindow;
            if (this.device != "desktop") {
                operatorWindow = this.launcherWindow.parent.parent;
            } else {
                operatorWindow = this.launcherWindow.parent;
            }
            // Send postMessage to operator
            if (operatorWindow) {
                operatorWindow.postMessage(postMessage, '*');
            }
        }
        /**
        *
        * Helper method to create a GCM Post Messsage(PM) Object
        * GCM PM Object has two data segments: 1. action, 2. params
        * @private
        * @param {string} action: The method to be called on post-message destination
        * @param {Object} params: The list of arguments to be passed to the method
        */

    }, {
        key: 'createPostMessage',
        value: function createPostMessage(action, params) {
            var pmObject = {};

            pmObject["action"] = action;
            pmObject["params"] = params;

            return JSON.stringify(pmObject);
        }
    }, {
        key: 'getOGSParams',

        /**
        * Helper method to parse response from UrlUtil.getAllParams() to help
        * create ogsParams values.  This function is also present in gcm launcher.
        * @private
        * @param {string} urlString the url to have values extracted / read from.
        * @param {boolean} isDesktop used because desktop games just have '&'
        * query string values, but mobile has entire URL including '?' portion.
        */
        value: function getOGSParams(urlString, isDesktop) {
            var searchParams = _UrlUtil.UrlUtil.getAllParams(urlString, isDesktop);
            var requestParams = {};
            searchParams.forEach(function (element) {
                if ("gameUrl" != name) {
                    requestParams[element[0]] = decodeURIComponent(element[1]);
                }
            });
            return requestParams;
        }

        /**
         * The game should call this function when building game server requests. It should use the promoInfo
         * object returned to populate the game server request with the necessary promotions data
         *
         * @return {Object} promoInfo An object representing the currently active promotions. The format of
         * this object is defined by GCM - JSONSchema is available on request. An example is below:
         *
         * <p>
         * {
         *   "PROMOTIONS": {
         *     "GAMEPLAY": "complete",
         *     "FREEROUNDS": [
         *       {
         *         "CAMPAIGNID": "FW_10_SIGNUP",
         *         "ACTIVATIONID": "PROM_100002",
         *         "ENDDATE": "2016-11-08T12:00:00Z",
         *         "TOTALWIN": 31.1,
         *         "CAMPAIGNVALUE": 10,
         *         "REJECTABLE": true,
         *         "OPTIONS": [
         *           {
         *             "BETLEVEL": 2.5,
         *             "TOTALROUNDS": 4,
         *             "REMAININGROUNDS": 2,
         *             "FEATURE": ""
         *           }
         *         ]
         *       }
         *     ]
         *   }
         * }
         * </p>
         */

    }, {
        key: 'getPromoInfo',
        value: function getPromoInfo() {
            this._logger.integration.info("GCM.getPromoInfo()");

            return this.promotions.getPromoInfo();
        }

        /**
         * The game should call this function on GCM after building a promoInfo object containing the available promotions data.
         *
         * @param {Object} promoInfo An object representing the available promotions data. The format of
         * this object is defined by GCM - JSONSchema is available on request. An example is below:
         *
         * <p>
         * {
         *   "PROMOTIONS": {
         *     "GAMEPLAY": "complete",
         *     "FREEROUNDS": [
         *       {
         *         "CAMPAIGNID": "FW_10_SIGNUP",
         *         "ACTIVATIONID": "PROM_100002",
         *         "ENDDATE": "2016-11-08T12:00:00Z",
         *         "TOTALWIN": 0,
         *         "CAMPAIGNVALUE": 10,
         *         "REJECTABLE": false,
         *         "OPTIONS": [
         *           {
         *             "BETLEVEL": 2.5,
         *             "TOTALROUNDS": 4,
         *             "REMAININGROUNDS": 4,
         *             "FEATURE": ""
         *           },
         *           {
         *             "BETLEVEL": 5,
         *             "TOTALROUNDS": 2,
         *             "REMAININGROUNDS": 2
         *             "FEATURE": ""
         *           }
         *         ]
         *       },
         *       {
         *         ...
         *       }
         *     ]
         *   }
         * }
         * </p>
         */

    }, {
        key: 'setPromoInfo',
        value: function setPromoInfo(promoInfo) {
            this._logger.integration.info("GCM.setPromoInfo(\n\tpromoInfo:", promoInfo, "\n)");

            this.promotionsEnabled = true;
            this.promotions.setPromoInfo(promoInfo);
        }
    }]);

    return GcmCore;
}();

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var EventDispatcher = exports.EventDispatcher = function () {
  function EventDispatcher() {
    _classCallCheck(this, EventDispatcher);

    /** @private
     * @type {Object}
     * */
    this.listeners_ = {};
  }

  _createClass(EventDispatcher, [{
    key: "addEventListener",
    value: function addEventListener(eventStr, eventListener, scope) {
      if (!this.listeners_[eventStr]) {
        this.listeners_[eventStr] = new Array();
      }

      for (var i = 0; i < this.listeners_[eventStr].length; ++i) {
        var listenerObj = this.listeners_[eventStr][i];
        //Skip add event listener if the same listener is already in list.
        if (listenerObj.func == eventListener && listenerObj.scope == scope) return;
      }

      this.listeners_[eventStr].push({ func: eventListener, scope: scope });
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(eventStr, eventListener, scope) {
      var listenerQueue = this.listeners_[eventStr];

      if (listenerQueue) {
        if (eventListener) {
          for (var i = 0; i < listenerQueue.length; ++i) {
            var currentListener = listenerQueue[i].func;
            var caller = listenerQueue[i].scope;
            if (eventListener == currentListener && scope == caller) {
              listenerQueue.splice(i, 1);
              break;
            }
          }
        } else listenerQueue.splice(0, listenerQueue.length);
      }
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(event) {
      event.target = this;
      var listenerQueue = this.listeners_[event.name];

      if (listenerQueue) {
        for (var i = 0; i < listenerQueue.length; ++i) {
          var func = listenerQueue[i].func;
          var scope = listenerQueue[i].scope;
          func.call(scope, event);
        }
      }
    }
  }]);

  return EventDispatcher;
}();

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorHandler = undefined;

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _NotificationHandler = __webpack_require__(10);

var _Validate = __webpack_require__(11);

var _errormap = __webpack_require__(47);

var _ErrorNotification = __webpack_require__(28);

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var ErrorHandler = exports.ErrorHandler = function () {
  function ErrorHandler() {
    _classCallCheck(this, ErrorHandler);

    /**
     * @private
     * @type {NotificationHandler}
     * A reference to singleton instance gcm.notification.NotificationHandler, the constructor will
     * return a reference to the singleton instance.
     * */
    this.notificationHandler_ = new _NotificationHandler.NotificationHandler();
  }

  _createClass(ErrorHandler, [{
    key: 'isRealityCheckError',
    value: function isRealityCheckError(error) {
      console.log("ErrorHandler.isRealityCheckError(error) error: " + error);
      if (error == null || error.search(_errormap.errorCategory.REALITY_CHECK) == -1) {
        return false;
      } else {
        return true;
      }
    }
  }, {
    key: 'handleError',
    value: function handleError(errorCategory, errorSeverity, errorCode, errorMessage, errorParams) {

      if (!_Validate.Validate.isEnumOption(_errormap.errorCategory, errorCategory)) {
        errorCategory = errorCategory.NON_RECOVERABLE_ERROR;
      }
      if (!_Validate.Validate.isEnumOption(_errormap.errorSeverity, errorSeverity)) {
        errorSeverity = errorSeverity.ERROR;
      }
      if (!_Validate.Validate.isDefinedAndNotNull(errorCode)) {
        errorCode = 'UNKNOWN';
      }

      if (!_Validate.Validate.isDefinedAndNotNull(errorMessage)) {
        errorMessage = 'An unexpected error has occurred. Please try again.';
      }

      if (errorParams != null) {
        if (!((typeof errorParams === 'undefined' ? 'undefined' : _typeof(errorParams)) === 'object')) {
          throw new Error('gcm.handleError: Invalid errorParams type');
        }
      }

      this.notificationHandler_.handleNotification(new _ErrorNotification.ErrorNotification(errorCategory, errorSeverity, errorCode, errorMessage, errorParams));
    }
  }]);

  return ErrorHandler;
}();

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var errorCategory = exports.errorCategory = {
  CRITICAL: 'CRITICAL',
  LOGIN_ERROR: 'LOGIN_ERROR',
  RECOVERABLE_ERROR: 'RECOVERABLE_ERROR',
  NON_RECOVERABLE_ERROR: 'NON_RECOVERABLE_ERROR',
  CONNECTION_ERROR: 'CONNECTION_ERROR',
  INSUFFICIENT_FUNDS: 'INSUFFICIENT_FUNDS',
  MULTI_CHOICE_DIALOG: 'MULTI_CHOICE_DIALOG',
  OTHER_GAME_IN_PROGRESS: 'OTHER_GAME_IN_PROGRESS',
  REALITY_CHECK: 'REALITY_CHECK',
  REALITY_CHECK_COOKIE: 'REALITY_CHECK_COOKIE'
};

var errorSeverity = exports.errorSeverity = {
  WARNING: 'WARNING',
  INFO: 'INFO',
  ERROR: 'ERROR'
};

var ogsapierrorCode = exports.ogsapierrorCode = {
  INSUFFICIENT_FUNDS: 'OGS.1006',
  LOGIN_ERROR: 'OGS.1000',
  GAMING_LIMIT: 'OGS.1019',
  LOCKED_ACCOUNT: 'OGS.1035',
  REALITY_CHECK: 'OGS.1109'
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameInfo = undefined;

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _Validate = __webpack_require__(11);

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 *
 * This GameInfo is a singleton class for:
 *  - Manage game options, which is registered from game and will notify commonUI for the
 *    regitered options
 *  - Manage game display elements registration, (i.e. About Box), also commonUI will be notified
 *    for registered displays
 *  - Bypass game display information to commonUI (i.e. game loading percentage information)
 *  - Manage option change actions, keep game and gcm in consistency for any changed game option
 *    during game play.
 *
 * @author xliu
 * Date: 17/07/12
 * Time: 15:19
 * @namespace
 */

var GameInfo = exports.GameInfo = function () {
  function GameInfo() {
    _classCallCheck(this, GameInfo);

    this.game_ = null;
    this.commonUI_ = null;

    this.OptionTypes = {
      MUTE: 'MUTE',
      TURBO: 'TURBO',
      ABOUT: 'ABOUT',
      HELP: 'HELP',
      PAYTABLE: 'PAYTABLE',
      GAME_PREFERENCES: 'GAME_PREFERENCES',
      QUALITY: 'QUALITY',
      CLOTH_COLOR: 'CLOTH_COLOR',
      GAME_FEATURE: 'GAME_FEATURE',
      AMBIENCE_SOUND: 'AMBIENCE_SOUND'
    };

    this.PlayMode = {
      REAL: 'real',
      DEMO: 'demo'
    };

    this.options_ = {};
    this.defaultOptions_ = {};
    this.defaultOptions_[this.OptionTypes.MUTE] = false;
    this.defaultOptions_[this.OptionTypes.QUALITY] = 'HIGH';
    this.defaultOptions_[this.OptionTypes.CLOTH_COLOR] = 'BLUE';
  }

  _createClass(GameInfo, [{
    key: 'setGame',
    value: function setGame(game) {
      this.game_ = game;
    }
  }, {
    key: 'setDefaultOption',

    /**
     * This is called when gcm-launcher passes gcmConfiguration via configure method on GCM
     * @param {GameInfo.OptionTypes} type Type of default option.
     * @param {boolean} value value of default option.
     */
    value: function setDefaultOption(type, value) {
      this.defaultOptions_[type] = value;
    }
  }, {
    key: 'getDefaultOption',

    /**
     * Retrieves the default value for a given type of property
     * @param {GameInfo.OptionTypes} type Type of the default option.
     * @return {string} The value associated for the given type.
     */
    value: function getDefaultOption(type) {
      return this.defaultOptions_[type];
    }
  }, {
    key: 'setCommonUI',

    /**
     * This function is called by gcm to pass the reference of commonUI instance
     * @param {Object} commonUI A reference to commonUI.
     * */
    value: function setCommonUI(commonUI) {
      this.commonUI_ = commonUI;

      // if gcm has already had options registered to it, then tell the commonUI
      //const typeKey;
      var typeKey;

      for (typeKey in this.options_) {
        this.commonUI_.regOption(typeKey, this.options_[typeKey]);
      }
    }
  }, {
    key: 'optionHasChanged',
    value: function optionHasChanged(optionType, changedFrom, newValue) {
      if (!(changedFrom === 'COMMONUI' || changedFrom === 'GAME')) {
        throw new Error('gcm.optionHasChanged: changedFrom must be COMMONUI or GAME. Received ' + changedFrom);
      }

      if (!_Validate.Validate.isEnumOption(this.OptionTypes, optionType)) {
        throw new Error('gcm.optionHasChanged: Unknown optionType ' + optionType + ' in change request from ' + changedFrom);
      }

      if (optionType === 'QUALITY' || optionType === 'CLOTH_COLOR') {
        if (this.options_[optionType] === '') {
          throw new Error('else :gcm.optionHasChanged: option changed - ' + optionType + ' - has not been registered: ' + this.options_[optionType]);
        }
      } else {
        if (!_Validate.Validate.isValidBoolean(newValue)) {
          throw new Error('gcm.optionHasChanged: newValue must be boolean.  Received ' + newValue);
        }
        if (!_Validate.Validate.isValidBoolean(this.options_[optionType])) {
          throw new Error('gcm.optionHasChanged: option changed - ' + optionType + ' - has not been registered: ' + options_[optionType]);
        }
      }

      this.options_[optionType] = newValue;

      if (changedFrom === 'GAME') {
        // tell the commonUI about the change
        this.commonUI_.optionHasChanged(optionType, newValue);
      } else if (changedFrom === 'COMMONUI') {
        // tell the game about the change
        this.game_.optionHasChanged(optionType, newValue);
      }
    }
  }, {
    key: 'regOption',
    value: function regOption(optionType) {

      if (!_Validate.Validate.isEnumOption(this.OptionTypes, optionType)) {
        throw new Error('gcm.regOption: Unknown optionType ' + optionType);
      }

      if (this.options_[optionType] === undefined) {
        switch (optionType) {
          case this.OptionTypes.MUTE:
            this.options_[optionType] = this.defaultOptions_[this.OptionTypes.MUTE];
            break;
          case this.OptionTypes.TURBO:
            // turbo option should default to false
            this.options_[optionType] = false;
            break;
          case this.OptionTypes.QUALITY:
            this.options_[optionType] = this.defaultOptions_[this.OptionTypes.QUALITY];
            break;
          case this.OptionTypes.CLOTH_COLOR:
            this.options_[optionType] = this.defaultOptions_[this.OptionTypes.CLOTH_COLOR];
            break;
          default:
            this.options_[optionType] = false;
        }
      }
      // setup the option in the commonUI if the commonUI is available
      // otherwise we will tell the commonUI when the commonUI calls commonUIReady
      if (this.commonUI_) {
        this.commonUI_.regOption(optionType, this.options_[optionType]);
      }
      return this.options_[optionType];
    }
  }, {
    key: 'loadProgressUpdate',

    /**
     * The game must call this on gcm so that the commonUI can be updated with
     * loading progress and display progress in a loading screen
     * @param {number} percentLoaded the percentage of the loading process complete.
     */
    value: function loadProgressUpdate(percentLoaded) {

      if (!_Validate.Validate.isPercentValue(percentLoaded)) {
        throw new Error('gcm.loadProgressUpdate: Invalid percentLoaded value:' + percentLoaded);
      }

      if (this.commonUI_) {
        this.commonUI_.loadProgressUpdate(percentLoaded);
      }
    }
  }]);

  return GameInfo;
}();

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CUIAdapter = undefined;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _openbetLogger = __webpack_require__(18);

var _openbetLogger2 = _interopRequireDefault(_openbetLogger);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

/**
 * @class
 * This Adapter class is responsible for transforming gcm calls to commonUI and commmonUI calls to gcm.
 * It converts all GCM javascript calls into post messages and sent to commonUI and
 * post messages from commonUI is converted into javascript calls in GCM.
 * @constructor
 */

var CUIAdapter = exports.CUIAdapter = function () {
    function CUIAdapter(gcmCore, commonUIWindow_, commonUIOrigin_) {
        _classCallCheck(this, CUIAdapter);

        this.gcm_ = gcmCore;
        this.commonUIWindow_ = commonUIWindow_;
        this.commonUIOrigin = commonUIOrigin_;
        this.commonUIReady_ = true;

        this._logger = new _openbetLogger2.default('GCM Debug');
    }

    _createClass(CUIAdapter, [{
        key: 'sendPostMessageToCUI',

        /**
         * This is a post message sender method.
         * For all CUI javascript calls made on CUIAdapter, a post message is created to be sent to CUI.
         * The postMessage consists of two parts:
         * 1. action: the CUI method name that needs to be invoked.
         * 2. params: the list of arguments that needs to be passed to the above method.
         */
        value: function sendPostMessageToCUI(methodName, parameters, isCallback) {

            if (this.commonUIReady_) {
                var postMessage = this.createPostMessage(methodName, parameters);
                this._logger.info("Sent post message to commonUI: " + postMessage);
                this.commonUIWindow_.postMessage(postMessage, this.commonUIOrigin);
            }
        }
    }, {
        key: 'createPostMessage',

        /**
         * Helper method to create Post Messsage(PM) Object that will be sent to CUI.
         * GCM PM Object has two data segments: 1. action, 2. params
         * action: The method to be called on CUI
         * params: The list of arguments to be passed to the method
         */
        value: function createPostMessage(methodName, parameters) {
            var pmObject = {};

            pmObject["action"] = methodName;
            pmObject["params"] = parameters;

            return JSON.stringify(pmObject);
        }
    }, {
        key: 'stakeUpdate',

        // All the CUI methods that GCM needs to call are declared below

        value: function stakeUpdate(stake) {
            this.sendPostMessageToCUI("stakeUpdate", arguments);
        }
    }, {
        key: 'paidUpdate',
        value: function paidUpdate(paid) {
            this.sendPostMessageToCUI("paidUpdate", arguments);
        }
    }, {
        key: 'balancesUpdate',
        value: function balancesUpdate(balances) {
            this.sendPostMessageToCUI("balancesUpdate", arguments);
        }
    }, {
        key: 'loadProgressUpdate',
        value: function loadProgressUpdate(percentLoaded) {
            this.sendPostMessageToCUI("loadProgressUpdate", arguments);
        }
    }, {
        key: 'gameReady',
        value: function gameReady() {
            this.sendPostMessageToCUI("gameReady", arguments);
        }
    }, {
        key: 'configReady',
        value: function configReady() {
            this.sendPostMessageToCUI("configReady", arguments);
        }
    }, {
        key: 'gameAnimationStart',
        value: function gameAnimationStart() {
            this.sendPostMessageToCUI("gameAnimationStart", arguments);
        }
    }, {
        key: 'gameAnimationComplete',
        value: function gameAnimationComplete() {
            this.sendPostMessageToCUI("gameAnimationComplete", arguments);
        }
    }, {
        key: 'gameIdle',
        value: function gameIdle(idle) {
            this.sendPostMessageToCUI("gameIdle", arguments);
        }
    }, {
        key: 'handleError',
        value: function handleError(errorCategory, errorSeverity, errorCode, errorMessage, errorParams, timeout) {
            this.sendPostMessageToCUI("handleError", arguments);
        }
    }, {
        key: 'handleSessionDurationUpdate',
        value: function handleSessionDurationUpdate(sessionDuration) {
            this.sendPostMessageToCUI("handleSessionDurationUpdate", arguments);
        }
    }, {
        key: 'regOption',
        value: function regOption(optionType, initialValue) {
            this.sendPostMessageToCUI("regOption", arguments);
        }
    }, {
        key: 'optionHasChanged',
        value: function optionHasChanged(optionType, newValue) {
            this.sendPostMessageToCUI("optionHasChanged", arguments);
        }
    }, {
        key: 'handleSessionStats',
        value: function handleSessionStats(stakes, winnings, turnover, timeout) {
            this.sendPostMessageToCUI("handleSessionStats", arguments);
        }
    }, {
        key: 'gameResized',
        value: function gameResized() {
            this.sendPostMessageToCUI("gameResized", arguments);
        }
    }, {
        key: 'gameHasLoadingScreen',
        value: function gameHasLoadingScreen() {
            this.sendPostMessageToCUI("gameHasLoadingScreen", arguments);
        }
    }, {
        key: 'handleMessageTrigger',
        value: function handleMessageTrigger(message) {
            this.sendPostMessageToCUI("handleMessageTrigger", arguments);
        }
    }, {
        key: 'handleGSTrigger',
        value: function handleGSTrigger(message) {
            this.sendPostMessageToCUI("handleGSTrigger", arguments);
        }
    }, {
        key: 'handleFreeRoundsUpdate',
        value: function handleFreeRoundsUpdate(freeRoundsInfo) {
            this.sendPostMessageToCUI('handleFreeRoundsUpdate', arguments);
        }
    }, {
        key: 'handleFreeRoundsAward',
        value: function handleFreeRoundsAward(freeRoundsInfo) {
            this.sendPostMessageToCUI('handleFreeRoundsAward', arguments);
        }
    }, {
        key: 'handleFreeRoundsInProgress',
        value: function handleFreeRoundsInProgress(freeRoundsInfo) {
            this.sendPostMessageToCUI('handleFreeRoundsInProgress', arguments);
        }
    }, {
        key: 'showSyndicateJackpotWinAward',
        value: function showSyndicateJackpotWinAward(winInfo) {
            this.sendPostMessageToCUI("showSyndicateJackpotWinAward", arguments);
        }
    }, {
        key: 'showSyndicateJackpotProgressBar',
        value: function showSyndicateJackpotProgressBar(attributes) {
            this.sendPostMessageToCUI("showSyndicateJackpotProgressBar", arguments);
        }
    }, {
        key: 'disposeSyndicateJackpotProgressBar',
        value: function disposeSyndicateJackpotProgressBar(attributes) {
            this.sendPostMessageToCUI("disposeSyndicateJackpotProgressBar", arguments);
        }
    }]);

    return CUIAdapter;
}();

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Promotions = undefined;

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _PromoInfo = __webpack_require__(51);

var _FreeRounds = __webpack_require__(61);

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * Class encapulating the promotional functionality
 *
 * @class
 */
var Promotions = exports.Promotions = function () {
  /**
   * Promotions constructor
   *
   * @param {Object} notificationHandler {@See NotificationHandler}
   * @constructor
   */
  function Promotions(notificationHandler) {
    _classCallCheck(this, Promotions);

    this.enabled = false;
    this.ccyFormatter = null;
    this.notificationHandler = notificationHandler;

    this.promotionalInfo = null;
    this.freerounds = null;
  }

  /**
   * Set currency formatter object
   *
   * @param {Object} ccyFormatter {@See CurrencyFormat}
   */

  _createClass(Promotions, [{
    key: 'setCcyFormatter',
    value: function setCcyFormatter(ccyFormatter) {
      this.ccyFormatter = ccyFormatter;
    }

    /**
     * Enable promotions module
     *
     * @param {Boolean} enabled
     */

  }, {
    key: 'setEnabled',
    value: function setEnabled(enabled) {
      this.enabled = enabled;
    }

    /**
     * Is the promotions module enabled?
     *
     * @return {Boolean}
     */

  }, {
    key: 'isEnabled',
    value: function isEnabled() {
      return this.enabled;
    }

    /**
     * Validates and stores/updates promotional information.
     * Note that this can be called before init() in order to prime the module with promotional
     * information to be used during init()
     * 
     * @param {Object} promoInfo An object representing the available promotions data. The format of this is defined by GCM
     * @throws {Error} if promoInfo is invalid
     */

  }, {
    key: 'setPromoInfo',
    value: function setPromoInfo(promoInfo) {
      //Return immediately if promotions are not enabled
      if (!this.isEnabled()) {
        return;
      }

      // Validate and store promotional information
      this.promotionalInfo = new _PromoInfo.PromoInfo();
      this.promotionalInfo.populate(promoInfo);

      // If enabled and active update FreeRounds information
      if (this.freerounds !== null && this.freerounds.isActiveFreeRound()) {
        this.freerounds.updateFreeRounds(this.promotionalInfo.getFreeRounds(), this.promotionalInfo.isGamePlayComplete());
      }
    }

    /**
     * Retrieves the currently active promotional information
     * 
     * @returns {Object} promoInfo An object representing the available promotions data.
     */

  }, {
    key: 'getPromoInfo',
    value: function getPromoInfo() {
      //Return immediately if promotions or freerounds are not enabled
      if (!this.isEnabled() || this.freerounds === null) {
        return null;
      }

      var promoInfo = new _PromoInfo.PromoInfo();

      var freeround = this.freerounds.cloneActiveFreeRound();
      if (freeround !== null) {
        promoInfo.setGamePlayStatus(this.promotionalInfo.getGamePlayStatus());
        promoInfo.setFreeRound(freeround);
      }

      if (promoInfo.hasPromotions()) {
        return promoInfo;
      } else {
        return null;
      }
    }

    /**
     * This is called during initialisation/loading of the game - specifically when gcm.gameRevealed is called.
     * Used to initialise any promotions if applicable
     * i.e: populate a FreeRounds object and push a FreeRounds award notification to the commonUI
     *
     * @returns {Promise}
     */

  }, {
    key: 'init',
    value: function init() {
      if (this.isEnabled() && this.promotionalInfo !== null) {
        //Initialise FreeRounds if necessary
        if (this.promotionalInfo.hasFreeRounds()) {

          return new Promise(function (resolve, reject) {
            this.freerounds = new _FreeRounds.FreeRounds(this.promotionalInfo.getFreeRounds(), this.notificationHandler, this.ccyFormatter, resolve.bind(this));
          }.bind(this));
        }
      }

      return Promise.resolve();
    }

    /**
     * Retrieves the amount that the promotions module needs to fudge the balance by.
     * 
     * @returns {Number|null} null if the promotions module doesn't need to fudge the balance. Else
     *                         the value to fudge the balance is returned.
     */

  }, {
    key: 'getPromoBalanceFudge',
    value: function getPromoBalanceFudge() {
      //Return immediately if promotions or freerounds are not enabled/active
      if (!this.isEnabled() || this.freerounds === null || !this.freerounds.isActiveFreeRound()) {
        return null;
      }

      if (this.freerounds.isActiveFreeRoundFinished() && this.promotionalInfo.isGamePlayComplete()) {
        return this.freerounds.getActiveFreeRoundTotalWin();
      } else {
        return 0;
      }
    }

    /**
     * Inform the promotions module that the game has called gameAnimationComplete
     */

  }, {
    key: 'gameAnimationComplete',
    value: function gameAnimationComplete() {
      if (this.isEnabled()) {
        // If there is an active freeround then assess it's status and clear if necessary
        if (this.freerounds !== null && this.freerounds.isActiveFreeRound() && this.promotionalInfo.isGamePlayComplete()) {
          this.freerounds.clearCompletedActiveFreeRound();
        }
      }
    }
  }]);

  return Promotions;
}();

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PromoInfo = undefined;

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _jsonschema = __webpack_require__(19);

var _PromoInfoSchema = __webpack_require__(60);

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * Data model and validation for the promoInfo object.
 *
 * @class
 */
var PromoInfo = exports.PromoInfo = function () {
  /**
   * PromoInfo constructor
   *
   * @constructor
   */
  function PromoInfo() {
    _classCallCheck(this, PromoInfo);

    this['PROMOTIONS'] = {};
  }

  /**
   * Validates the argument against the expected PromoInfo json schema. If valid, it clones the 
   * in promoInfoObj and stores it
   *
   * @param {Object} promoInfoObj An object representing the available promotions data. The format of this is defined by GCM
   * @throws {Error} if promoInfoObj cannot be successfully validated against the PromoInfo json schema
   */

  _createClass(PromoInfo, [{
    key: 'populate',
    value: function populate(promoInfoObj) {
      //clone and store promotional info
      this['PROMOTIONS'] = JSON.parse(JSON.stringify(promoInfoObj))['PROMOTIONS'];

      this.validatePromoInfo();
    }

    /**
     * Validates the structure of the PromoInfo object
     * 
     * @private 
     * @throws {Error} if this PromoInfo object is invalid
     */

  }, {
    key: 'validatePromoInfo',
    value: function validatePromoInfo() {
      var validator = new _jsonschema.Validator();

      var errors = validator.validate(this, _PromoInfoSchema.jsonSchema).errors;
      if (errors.length !== 0) {
        this['PROMOTIONS'] = {};
        throw new Error('Invalid promotional information: ' + errors[0].stack);
      }
    }

    /**
     * Populates this PromoInfo object with the single FreeRound object passed in. Then validates the PromoInfo object
     * 
     * @param {Object} freeRoundObj An object representing the available promotions data. The format of this is defined by GCM
     * @throws {Error} if this PromoInfo object cannot be successfully validated against the PromoInfo json schema
     */

  }, {
    key: 'setFreeRound',
    value: function setFreeRound(freeRoundObj) {
      //store freeround info
      this['PROMOTIONS']['FREEROUNDS'] = new Array(freeRoundObj);

      this.validatePromoInfo();
    }

    /**
     * Does this PromoInfo object contain any promotions eg: FreeRounds
     * 
     * @returns {boolean} True if promotions exist, else false
     */

  }, {
    key: 'hasPromotions',
    value: function hasPromotions() {
      return this['PROMOTIONS'] !== undefined && this.hasFreeRounds();
    }

    /**
     * Does this PromoInfo object contain any FreeRounds
     * 
     * @returns {boolean} True if freerounds exist, else false
     */

  }, {
    key: 'hasFreeRounds',
    value: function hasFreeRounds() {
      return this['PROMOTIONS']['FREEROUNDS'] !== undefined && this['PROMOTIONS']['FREEROUNDS'].length > 0;
    }

    /**
     * Get available FreeRounds
     * 
     * @returns {Object} Object representing available FreeRounds
     */

  }, {
    key: 'getFreeRounds',
    value: function getFreeRounds() {
      return this['PROMOTIONS']['FREEROUNDS'];
    }

    /**
     * Returns true if current game play is complete, else false
     * 
     * @returns {boolean}
     */

  }, {
    key: 'isGamePlayComplete',
    value: function isGamePlayComplete() {
      return this['PROMOTIONS']['GAMEPLAY'] === 'complete';
    }

    /**
     * Set the game play status
     * 
     * @param {String} gamePlayStatus
     */

  }, {
    key: 'setGamePlayStatus',
    value: function setGamePlayStatus(gamePlayStatus) {
      this['PROMOTIONS']['GAMEPLAY'] = gamePlayStatus;
    }

    /**
     * Get the game play status
     * 
     * @returns {String}
     */

  }, {
    key: 'getGamePlayStatus',
    value: function getGamePlayStatus() {
      return this['PROMOTIONS']['GAMEPLAY'];
    }
  }]);

  return PromoInfo;
}();

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var urilib = __webpack_require__(29);

var attribute = __webpack_require__(59);
var helpers = __webpack_require__(7);
var ValidatorResult = helpers.ValidatorResult;
var SchemaError = helpers.SchemaError;
var SchemaContext = helpers.SchemaContext;

/**
 * Creates a new Validator object
 * @name Validator
 * @constructor
 */
var Validator = function Validator () {
  // Allow a validator instance to override global custom formats or to have their
  // own custom formats.
  this.customFormats = Object.create(Validator.prototype.customFormats);
  this.schemas = {};
  this.unresolvedRefs = [];

  // Use Object.create to make this extensible without Validator instances stepping on each other's toes.
  this.types = Object.create(types);
  this.attributes = Object.create(attribute.validators);
};

// Allow formats to be registered globally.
Validator.prototype.customFormats = {};

// Hint at the presence of a property
Validator.prototype.schemas = null;
Validator.prototype.types = null;
Validator.prototype.attributes = null;
Validator.prototype.unresolvedRefs = null;

/**
 * Adds a schema with a certain urn to the Validator instance.
 * @param schema
 * @param urn
 * @return {Object}
 */
Validator.prototype.addSchema = function addSchema (schema, uri) {
  if (!schema) {
    return null;
  }
  var ourUri = uri || schema.id;
  this.addSubSchema(ourUri, schema);
  if (ourUri) {
    this.schemas[ourUri] = schema;
  }
  return this.schemas[ourUri];
};

Validator.prototype.addSubSchema = function addSubSchema(baseuri, schema) {
  if(!schema || typeof schema!='object') return;
  // Mark all referenced schemas so we can tell later which schemas are referred to, but never defined
  if(schema.$ref){
    var resolvedUri = urilib.resolve(baseuri, schema.$ref);
    // Only mark unknown schemas as unresolved
    if (this.schemas[resolvedUri] === undefined) {
      this.schemas[resolvedUri] = null;
      this.unresolvedRefs.push(resolvedUri);
    }
    return;
  }
  var ourUri = schema.id && urilib.resolve(baseuri, schema.id);
  var ourBase = ourUri || baseuri;
  if (ourUri) {
    if(this.schemas[ourUri]){
      if(!helpers.deepCompareStrict(this.schemas[ourUri], schema)){
        throw new Error('Schema <'+schema+'> already exists with different definition');
      }
      return this.schemas[ourUri];
    }
    this.schemas[ourUri] = schema;
    var documentUri = ourUri.replace(/^([^#]*)#$/, '$1');
    this.schemas[documentUri] = schema;
  }
  this.addSubSchemaArray(ourBase, ((schema.items instanceof Array)?schema.items:[schema.items]));
  this.addSubSchemaArray(ourBase, ((schema.extends instanceof Array)?schema.extends:[schema.extends]));
  this.addSubSchema(ourBase, schema.additionalItems);
  this.addSubSchemaObject(ourBase, schema.properties);
  this.addSubSchema(ourBase, schema.additionalProperties);
  this.addSubSchemaObject(ourBase, schema.definitions);
  this.addSubSchemaObject(ourBase, schema.patternProperties);
  this.addSubSchemaObject(ourBase, schema.dependencies);
  this.addSubSchemaArray(ourBase, schema.disallow);
  this.addSubSchemaArray(ourBase, schema.allOf);
  this.addSubSchemaArray(ourBase, schema.anyOf);
  this.addSubSchemaArray(ourBase, schema.oneOf);
  this.addSubSchema(ourBase, schema.not);
  return this.schemas[ourUri];
};

Validator.prototype.addSubSchemaArray = function addSubSchemaArray(baseuri, schemas) {
  if(!(schemas instanceof Array)) return;
  for(var i=0; i<schemas.length; i++){
    this.addSubSchema(baseuri, schemas[i]);
  }
};

Validator.prototype.addSubSchemaObject = function addSubSchemaArray(baseuri, schemas) {
  if(!schemas || typeof schemas!='object') return;
  for(var p in schemas){
    this.addSubSchema(baseuri, schemas[p]);
  }
};



/**
 * Sets all the schemas of the Validator instance.
 * @param schemas
 */
Validator.prototype.setSchemas = function setSchemas (schemas) {
  this.schemas = schemas;
};

/**
 * Returns the schema of a certain urn
 * @param urn
 */
Validator.prototype.getSchema = function getSchema (urn) {
  return this.schemas[urn];
};

/**
 * Validates instance against the provided schema
 * @param instance
 * @param schema
 * @param [options]
 * @param [ctx]
 * @return {Array}
 */
Validator.prototype.validate = function validate (instance, schema, options, ctx) {
  if (!options) {
    options = {};
  }
  var propertyName = options.propertyName || 'instance';
  // This will work so long as the function at uri.resolve() will resolve a relative URI to a relative URI
  var base = urilib.resolve(options.base||'/', schema.id||'');
  if(!ctx){
    ctx = new SchemaContext(schema, options, propertyName, base, Object.create(this.schemas));
    if (!ctx.schemas[base]) {
      ctx.schemas[base] = schema;
    }
  }
  if (schema) {
    var result = this.validateSchema(instance, schema, options, ctx);
    if (!result) {
      throw new Error('Result undefined');
    }
    return result;
  }
  throw new SchemaError('no schema specified', schema);
};

/**
* @param Object schema
* @return mixed schema uri or false
*/
function shouldResolve(schema) {
  var ref = (typeof schema === 'string') ? schema : schema.$ref;
  if (typeof ref=='string') return ref;
  return false;
}

/**
 * Validates an instance against the schema (the actual work horse)
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @private
 * @return {ValidatorResult}
 */
Validator.prototype.validateSchema = function validateSchema (instance, schema, options, ctx) {
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (!schema) {
    throw new Error("schema is undefined");
  }

  if (schema['extends']) {
    if (schema['extends'] instanceof Array) {
      var schemaobj = {schema: schema, ctx: ctx};
      schema['extends'].forEach(this.schemaTraverser.bind(this, schemaobj));
      schema = schemaobj.schema;
      schemaobj.schema = null;
      schemaobj.ctx = null;
      schemaobj = null;
    } else {
      schema = helpers.deepMerge(schema, this.superResolve(schema['extends'], ctx));
    }
  }

  var switchSchema;
  if (switchSchema = shouldResolve(schema)) {
    var resolved = this.resolve(schema, switchSchema, ctx);
    var subctx = new SchemaContext(resolved.subschema, options, ctx.propertyPath, resolved.switchSchema, ctx.schemas);
    return this.validateSchema(instance, resolved.subschema, options, subctx);
  }

  var skipAttributes = options && options.skipAttributes || [];
  // Validate each schema attribute against the instance
  for (var key in schema) {
    if (!attribute.ignoreProperties[key] && skipAttributes.indexOf(key) < 0) {
      var validatorErr = null;
      var validator = this.attributes[key];
      if (validator) {
        validatorErr = validator.call(this, instance, schema, options, ctx);
      } else if (options.allowUnknownAttributes === false) {
        // This represents an error with the schema itself, not an invalid instance
        throw new SchemaError("Unsupported attribute: " + key, schema);
      }
      if (validatorErr) {
        result.importErrors(validatorErr);
      }
    }
  }

  if (typeof options.rewrite == 'function') {
    var value = options.rewrite.call(this, instance, schema, options, ctx);
    result.instance = value;
  }
  return result;
};

/**
* @private
* @param Object schema
* @param SchemaContext ctx
* @returns Object schema or resolved schema
*/
Validator.prototype.schemaTraverser = function schemaTraverser (schemaobj, s) {
  schemaobj.schema = helpers.deepMerge(schemaobj.schema, this.superResolve(s, schemaobj.ctx));
}

/**
* @private
* @param Object schema
* @param SchemaContext ctx
* @returns Object schema or resolved schema
*/
Validator.prototype.superResolve = function superResolve (schema, ctx) {
  var ref;
  if(ref = shouldResolve(schema)) {
    return this.resolve(schema, ref, ctx).subschema;
  }
  return schema;
}

/**
* @private
* @param Object schema
* @param Object switchSchema
* @param SchemaContext ctx
* @return Object resolved schemas {subschema:String, switchSchema: String}
* @throws SchemaError
*/
Validator.prototype.resolve = function resolve (schema, switchSchema, ctx) {
  switchSchema = ctx.resolve(switchSchema);
  // First see if the schema exists under the provided URI
  if (ctx.schemas[switchSchema]) {
    return {subschema: ctx.schemas[switchSchema], switchSchema: switchSchema};
  }
  // Else try walking the property pointer
  var parsed = urilib.parse(switchSchema);
  var fragment = parsed && parsed.hash;
  var document = fragment && fragment.length && switchSchema.substr(0, switchSchema.length - fragment.length);
  if (!document || !ctx.schemas[document]) {
    throw new SchemaError("no such schema <" + switchSchema + ">", schema);
  }
  var subschema = helpers.objectGetPath(ctx.schemas[document], fragment.substr(1));
  if(subschema===undefined){
    throw new SchemaError("no such schema " + fragment + " located in <" + document + ">", schema);
  }
  return {subschema: subschema, switchSchema: switchSchema};
};

/**
 * Tests whether the instance if of a certain type.
 * @private
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @param type
 * @return {boolean}
 */
Validator.prototype.testType = function validateType (instance, schema, options, ctx, type) {
  if (typeof this.types[type] == 'function') {
    return this.types[type].call(this, instance);
  }
  if (type && typeof type == 'object') {
    var res = this.validateSchema(instance, type, options, ctx);
    return res === undefined || !(res && res.errors.length);
  }
  // Undefined or properties not on the list are acceptable, same as not being defined
  return true;
};

var types = Validator.prototype.types = {};
types.string = function testString (instance) {
  return typeof instance == 'string';
};
types.number = function testNumber (instance) {
  // isFinite returns false for NaN, Infinity, and -Infinity
  return typeof instance == 'number' && isFinite(instance);
};
types.integer = function testInteger (instance) {
  return (typeof instance == 'number') && instance % 1 === 0;
};
types.boolean = function testBoolean (instance) {
  return typeof instance == 'boolean';
};
types.array = function testArray (instance) {
  return Array.isArray(instance);
};
types['null'] = function testNull (instance) {
  return instance === null;
};
types.date = function testDate (instance) {
  return instance instanceof Date;
};
types.any = function testAny (instance) {
  return true;
};
types.object = function testObject (instance) {
  // TODO: fix this - see #15
  return instance && (typeof instance) === 'object' && !(instance instanceof Array) && !(instance instanceof Date);
};

module.exports = Validator;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return punycode;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) {
			// in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54)(module), __webpack_require__(12)))

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(57);
exports.encode = exports.stringify = __webpack_require__(58);


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(7);

/** @type ValidatorResult */
var ValidatorResult = helpers.ValidatorResult;
/** @type SchemaError */
var SchemaError = helpers.SchemaError;

var attribute = {};

attribute.ignoreProperties = {
  // informative properties
  'id': true,
  'default': true,
  'description': true,
  'title': true,
  // arguments to other properties
  'exclusiveMinimum': true,
  'exclusiveMaximum': true,
  'additionalItems': true,
  // special-handled properties
  '$schema': true,
  '$ref': true,
  'extends': true
};

/**
 * @name validators
 */
var validators = attribute.validators = {};

/**
 * Validates whether the instance if of a certain type
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {ValidatorResult|null}
 */
validators.type = function validateType (instance, schema, options, ctx) {
  // Ignore undefined instances
  if (instance === undefined) {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  var types = Array.isArray(schema.type) ? schema.type : [schema.type];
  if (!types.some(this.testType.bind(this, instance, schema, options, ctx))) {
    var list = types.map(function (v) {
      return v.id && ('<' + v.id + '>') || (v+'');
    });
    result.addError({
      name: 'type',
      argument: list,
      message: "is not of a type(s) " + list,
    });
  }
  return result;
};

function testSchema(instance, options, ctx, callback, schema){
  var res = this.validateSchema(instance, schema, options, ctx);
  if (! res.valid && callback instanceof Function) {
    callback(res);
  }
  return res.valid;
}

/**
 * Validates whether the instance matches some of the given schemas
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {ValidatorResult|null}
 */
validators.anyOf = function validateAnyOf (instance, schema, options, ctx) {
  // Ignore undefined instances
  if (instance === undefined) {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  var inner = new ValidatorResult(instance, schema, options, ctx);
  if (!Array.isArray(schema.anyOf)){
    throw new SchemaError("anyOf must be an array");
  }
  if (!schema.anyOf.some(
    testSchema.bind(
      this, instance, options, ctx, function(res){inner.importErrors(res);}
      ))) {
    var list = schema.anyOf.map(function (v, i) {
      return (v.id && ('<' + v.id + '>')) || (v.title && JSON.stringify(v.title)) || (v['$ref'] && ('<' + v['$ref'] + '>')) || '[subschema '+i+']';
    });
    if (options.nestedErrors) {
      result.importErrors(inner);
    }
    result.addError({
      name: 'anyOf',
      argument: list,
      message: "is not any of " + list.join(','),
    });
  }
  return result;
};

/**
 * Validates whether the instance matches every given schema
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {String|null}
 */
validators.allOf = function validateAllOf (instance, schema, options, ctx) {
  // Ignore undefined instances
  if (instance === undefined) {
    return null;
  }
  if (!Array.isArray(schema.allOf)){
    throw new SchemaError("allOf must be an array");
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  var self = this;
  schema.allOf.forEach(function(v, i){
    var valid = self.validateSchema(instance, v, options, ctx);
    if(!valid.valid){
      var msg = (v.id && ('<' + v.id + '>')) || (v.title && JSON.stringify(v.title)) || (v['$ref'] && ('<' + v['$ref'] + '>')) || '[subschema '+i+']';
      result.addError({
        name: 'allOf',
        argument: { id: msg, length: valid.errors.length, valid: valid },
        message: 'does not match allOf schema ' + msg + ' with ' + valid.errors.length + ' error[s]:',
      });
      result.importErrors(valid);
    }
  });
  return result;
};

/**
 * Validates whether the instance matches exactly one of the given schemas
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {String|null}
 */
validators.oneOf = function validateOneOf (instance, schema, options, ctx) {
  // Ignore undefined instances
  if (instance === undefined) {
    return null;
  }
  if (!Array.isArray(schema.oneOf)){
    throw new SchemaError("oneOf must be an array");
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  var inner = new ValidatorResult(instance, schema, options, ctx);
  var count = schema.oneOf.filter(
    testSchema.bind(
      this, instance, options, ctx, function(res) {inner.importErrors(res);}
      ) ).length;
  var list = schema.oneOf.map(function (v, i) {
    return (v.id && ('<' + v.id + '>')) || (v.title && JSON.stringify(v.title)) || (v['$ref'] && ('<' + v['$ref'] + '>')) || '[subschema '+i+']';
  });
  if (count!==1) {
    if (options.nestedErrors) {
      result.importErrors(inner);
    }
    result.addError({
      name: 'oneOf',
      argument: list,
      message: "is not exactly one from " + list.join(','),
    });
  }
  return result;
};

/**
 * Validates properties
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {String|null|ValidatorResult}
 */
validators.properties = function validateProperties (instance, schema, options, ctx) {
  if(instance === undefined || !(instance instanceof Object)) return;
  var result = new ValidatorResult(instance, schema, options, ctx);
  var properties = schema.properties || {};
  for (var property in properties) {
    var prop = (instance || undefined) && instance[property];
    var res = this.validateSchema(prop, properties[property], options, ctx.makeChild(properties[property], property));
    if(res.instance !== result.instance[property]) result.instance[property] = res.instance;
    result.importErrors(res);
  }
  return result;
};

/**
 * Test a specific property within in instance against the additionalProperties schema attribute
 * This ignores properties with definitions in the properties schema attribute, but no other attributes.
 * If too many more types of property-existance tests pop up they may need their own class of tests (like `type` has)
 * @private
 * @return {boolean}
 */
function testAdditionalProperty (instance, schema, options, ctx, property, result) {
  if (schema.properties && schema.properties[property] !== undefined) {
    return;
  }
  if (schema.additionalProperties === false) {
    result.addError({
      name: 'additionalProperties',
      argument: property,
      message: "additionalProperty " + JSON.stringify(property) + " exists in instance when not allowed",
    });
  } else {
    var additionalProperties = schema.additionalProperties || {};
    var res = this.validateSchema(instance[property], additionalProperties, options, ctx.makeChild(additionalProperties, property));
    if(res.instance !== result.instance[property]) result.instance[property] = res.instance;
    result.importErrors(res);
  }
}

/**
 * Validates patternProperties
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {String|null|ValidatorResult}
 */
validators.patternProperties = function validatePatternProperties (instance, schema, options, ctx) {
  if(instance === undefined) return;
  if(!this.types.object(instance)) return;
  var result = new ValidatorResult(instance, schema, options, ctx);
  var patternProperties = schema.patternProperties || {};

  for (var property in instance) {
    var test = true;
    for (var pattern in patternProperties) {
      var expr = new RegExp(pattern);
      if (!expr.test(property)) {
        continue;
      }
      test = false;
      var res = this.validateSchema(instance[property], patternProperties[pattern], options, ctx.makeChild(patternProperties[pattern], property));
      if(res.instance !== result.instance[property]) result.instance[property] = res.instance;
      result.importErrors(res);
    }
    if (test) {
      testAdditionalProperty.call(this, instance, schema, options, ctx, property, result);
    }
  }

  return result;
};

/**
 * Validates additionalProperties
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {String|null|ValidatorResult}
 */
validators.additionalProperties = function validateAdditionalProperties (instance, schema, options, ctx) {
  if(instance === undefined) return;
  if(!this.types.object(instance)) return;
  // if patternProperties is defined then we'll test when that one is called instead
  if (schema.patternProperties) {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  for (var property in instance) {
    testAdditionalProperty.call(this, instance, schema, options, ctx, property, result);
  }
  return result;
};

/**
 * Validates whether the instance value is at least of a certain length, when the instance value is a string.
 * @param instance
 * @param schema
 * @return {String|null}
 */
validators.minProperties = function validateMinProperties (instance, schema, options, ctx) {
  if (!instance || typeof instance !== 'object') {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  var keys = Object.keys(instance);
  if (!(keys.length >= schema.minProperties)) {
    result.addError({
      name: 'minProperties',
      argument: schema.minProperties,
      message: "does not meet minimum property length of " + schema.minProperties,
    })
  }
  return result;
};

/**
 * Validates whether the instance value is at most of a certain length, when the instance value is a string.
 * @param instance
 * @param schema
 * @return {String|null}
 */
validators.maxProperties = function validateMaxProperties (instance, schema, options, ctx) {
  if (!instance || typeof instance !== 'object') {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  var keys = Object.keys(instance);
  if (!(keys.length <= schema.maxProperties)) {
    result.addError({
      name: 'maxProperties',
      argument: schema.maxProperties,
      message: "does not meet maximum property length of " + schema.maxProperties,
    });
  }
  return result;
};

/**
 * Validates items when instance is an array
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {String|null|ValidatorResult}
 */
validators.items = function validateItems (instance, schema, options, ctx) {
  if (!Array.isArray(instance)) {
    return null;
  }
  var self = this;
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (instance === undefined || !schema.items) {
    return result;
  }
  instance.every(function (value, i) {
    var items = Array.isArray(schema.items) ? (schema.items[i] || schema.additionalItems) : schema.items;
    if (items === undefined) {
      return true;
    }
    if (items === false) {
      result.addError({
        name: 'items',
        message: "additionalItems not permitted",
      });
      return false;
    }
    var res = self.validateSchema(value, items, options, ctx.makeChild(items, i));
    if(res.instance !== result.instance[i]) result.instance[i] = res.instance;
    result.importErrors(res);
    return true;
  });
  return result;
};

/**
 * Validates minimum and exclusiveMinimum when the type of the instance value is a number.
 * @param instance
 * @param schema
 * @return {String|null}
 */
validators.minimum = function validateMinimum (instance, schema, options, ctx) {
  if (typeof instance !== 'number') {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  var valid = true;
  if (schema.exclusiveMinimum && schema.exclusiveMinimum === true) {
    valid = instance > schema.minimum;
  } else {
    valid = instance >= schema.minimum;
  }
  if (!valid) {
    result.addError({
      name: 'minimum',
      argument: schema.minimum,
      message: "must have a minimum value of " + schema.minimum,
    });
  }
  return result;
};

/**
 * Validates maximum and exclusiveMaximum when the type of the instance value is a number.
 * @param instance
 * @param schema
 * @return {String|null}
 */
validators.maximum = function validateMaximum (instance, schema, options, ctx) {
  if (typeof instance !== 'number') {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  var valid;
  if (schema.exclusiveMaximum && schema.exclusiveMaximum === true) {
    valid = instance < schema.maximum;
  } else {
    valid = instance <= schema.maximum;
  }
  if (!valid) {
    result.addError({
      name: 'maximum',
      argument: schema.maximum,
      message: "must have a maximum value of " + schema.maximum,
    });
  }
  return result;
};

/**
 * Perform validation for multipleOf and divisibleBy, which are essentially the same.
 * @param instance
 * @param schema
 * @param validationType
 * @param errorMessage
 * @returns {String|null}
 */
var validateMultipleOfOrDivisbleBy = function validateMultipleOfOrDivisbleBy (instance, schema, options, ctx, validationType, errorMessage) {
  if (typeof instance !== 'number') {
    return null;
  }

  var validationArgument = schema[validationType];
  if (validationArgument == 0) {
    throw new SchemaError(validationType + " cannot be zero");
  }

  var result = new ValidatorResult(instance, schema, options, ctx);

  var instanceDecimals = helpers.getDecimalPlaces(instance);
  var divisorDecimals = helpers.getDecimalPlaces(validationArgument);

  var maxDecimals = Math.max(instanceDecimals , divisorDecimals);
  var multiplier = Math.pow(10, maxDecimals);

  if (Math.round(instance * multiplier) % Math.round(validationArgument * multiplier) !== 0) {
    result.addError({
      name: validationType,
      argument:  validationArgument,
      message: errorMessage + JSON.stringify(validationArgument)
    });
  }

  return result;
};

/**
 * Validates divisibleBy when the type of the instance value is a number.
 * @param instance
 * @param schema
 * @return {String|null}
 */
validators.multipleOf = function validateMultipleOf (instance, schema, options, ctx) {
 return validateMultipleOfOrDivisbleBy(instance, schema, options, ctx, "multipleOf", "is not a multiple of (divisible by) ");
};

/**
 * Validates multipleOf when the type of the instance value is a number.
 * @param instance
 * @param schema
 * @return {String|null}
 */
validators.divisibleBy = function validateDivisibleBy (instance, schema, options, ctx) {
  return validateMultipleOfOrDivisbleBy(instance, schema, options, ctx, "divisibleBy", "is not divisible by (multiple of) ");
};

/**
 * Validates whether the instance value is present.
 * @param instance
 * @param schema
 * @return {String|null}
 */
validators.required = function validateRequired (instance, schema, options, ctx) {
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (instance === undefined && schema.required === true) {
    // A boolean form is implemented for reverse-compatability with schemas written against older drafts
    result.addError({
      name: 'required',
      message: "is required"
    });
  } else if (instance && typeof instance==='object' && Array.isArray(schema.required)) {
    schema.required.forEach(function(n){
      if(instance[n]===undefined){
        result.addError({
          name: 'required',
          argument: n,
          message: "requires property " + JSON.stringify(n),
        });
      }
    });
  }
  return result;
};

/**
 * Validates whether the instance value matches the regular expression, when the instance value is a string.
 * @param instance
 * @param schema
 * @return {String|null}
 */
validators.pattern = function validatePattern (instance, schema, options, ctx) {
  if (typeof instance !== 'string') {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (!instance.match(schema.pattern)) {
    result.addError({
      name: 'pattern',
      argument: schema.pattern,
      message: "does not match pattern " + JSON.stringify(schema.pattern),
    });
  }
  return result;
};

/**
 * Validates whether the instance value is of a certain defined format or a custom
 * format.
 * The following formats are supported for string types:
 *   - date-time
 *   - date
 *   - time
 *   - ip-address
 *   - ipv6
 *   - uri
 *   - color
 *   - host-name
 *   - alpha
 *   - alpha-numeric
 *   - utc-millisec
 * @param instance
 * @param schema
 * @param [options]
 * @param [ctx]
 * @return {String|null}
 */
validators.format = function validateFormat (instance, schema, options, ctx) {
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (!result.disableFormat && !helpers.isFormat(instance, schema.format, this)) {
    result.addError({
      name: 'format',
      argument: schema.format,
      message: "does not conform to the " + JSON.stringify(schema.format) + " format",
    });
  }
  return result;
};

/**
 * Validates whether the instance value is at least of a certain length, when the instance value is a string.
 * @param instance
 * @param schema
 * @return {String|null}
 */
validators.minLength = function validateMinLength (instance, schema, options, ctx) {
  if (!(typeof instance === 'string')) {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (!(instance.length >= schema.minLength)) {
    result.addError({
      name: 'minLength',
      argument: schema.minLength,
      message: "does not meet minimum length of " + schema.minLength,
    });
  }
  return result;
};

/**
 * Validates whether the instance value is at most of a certain length, when the instance value is a string.
 * @param instance
 * @param schema
 * @return {String|null}
 */
validators.maxLength = function validateMaxLength (instance, schema, options, ctx) {
  if (!(typeof instance === 'string')) {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (!(instance.length <= schema.maxLength)) {
    result.addError({
      name: 'maxLength',
      argument: schema.maxLength,
      message: "does not meet maximum length of " + schema.maxLength,
    });
  }
  return result;
};

/**
 * Validates whether instance contains at least a minimum number of items, when the instance is an Array.
 * @param instance
 * @param schema
 * @return {String|null}
 */
validators.minItems = function validateMinItems (instance, schema, options, ctx) {
  if (!Array.isArray(instance)) {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (!(instance.length >= schema.minItems)) {
    result.addError({
      name: 'minItems',
      argument: schema.minItems,
      message: "does not meet minimum length of " + schema.minItems,
    });
  }
  return result;
};

/**
 * Validates whether instance contains no more than a maximum number of items, when the instance is an Array.
 * @param instance
 * @param schema
 * @return {String|null}
 */
validators.maxItems = function validateMaxItems (instance, schema, options, ctx) {
  if (!Array.isArray(instance)) {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (!(instance.length <= schema.maxItems)) {
    result.addError({
      name: 'maxItems',
      argument: schema.maxItems,
      message: "does not meet maximum length of " + schema.maxItems,
    });
  }
  return result;
};

/**
 * Validates that every item in an instance array is unique, when instance is an array
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {String|null|ValidatorResult}
 */
validators.uniqueItems = function validateUniqueItems (instance, schema, options, ctx) {
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (!Array.isArray(instance)) {
    return result;
  }
  function testArrays (v, i, a) {
    for (var j = i + 1; j < a.length; j++) if (helpers.deepCompareStrict(v, a[j])) {
      return false;
    }
    return true;
  }
  if (!instance.every(testArrays)) {
    result.addError({
      name: 'uniqueItems',
      message: "contains duplicate item",
    });
  }
  return result;
};

/**
 * Deep compares arrays for duplicates
 * @param v
 * @param i
 * @param a
 * @private
 * @return {boolean}
 */
function testArrays (v, i, a) {
  var j, len = a.length;
  for (j = i + 1, len; j < len; j++) {
    if (helpers.deepCompareStrict(v, a[j])) {
      return false;
    }
  }
  return true;
}

/**
 * Validates whether there are no duplicates, when the instance is an Array.
 * @param instance
 * @return {String|null}
 */
validators.uniqueItems = function validateUniqueItems (instance, schema, options, ctx) {
  if (!Array.isArray(instance)) {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (!instance.every(testArrays)) {
    result.addError({
      name: 'uniqueItems',
      message: "contains duplicate item",
    });
  }
  return result;
};

/**
 * Validate for the presence of dependency properties, if the instance is an object.
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {null|ValidatorResult}
 */
validators.dependencies = function validateDependencies (instance, schema, options, ctx) {
  if (!instance || typeof instance != 'object') {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  for (var property in schema.dependencies) {
    if (instance[property] === undefined) {
      continue;
    }
    var dep = schema.dependencies[property];
    var childContext = ctx.makeChild(dep, property);
    if (typeof dep == 'string') {
      dep = [dep];
    }
    if (Array.isArray(dep)) {
      dep.forEach(function (prop) {
        if (instance[prop] === undefined) {
          result.addError({
            // FIXME there's two different "dependencies" errors here with slightly different outputs
            // Can we make these the same? Or should we create different error types?
            name: 'dependencies',
            argument: childContext.propertyPath,
            message: "property " + prop + " not found, required by " + childContext.propertyPath,
          });
        }
      });
    } else {
      var res = this.validateSchema(instance, dep, options, childContext);
      if(result.instance !== res.instance) result.instance = res.instance;
      if (res && res.errors.length) {
        result.addError({
          name: 'dependencies',
          argument: childContext.propertyPath,
          message: "does not meet dependency required by " + childContext.propertyPath,
        });
        result.importErrors(res);
      }
    }
  }
  return result;
};

/**
 * Validates whether the instance value is one of the enumerated values.
 *
 * @param instance
 * @param schema
 * @return {ValidatorResult|null}
 */
validators['enum'] = function validateEnum (instance, schema, options, ctx) {
  if (!Array.isArray(schema['enum'])) {
    throw new SchemaError("enum expects an array", schema);
  }
  if (instance === undefined) {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (!schema['enum'].some(helpers.deepCompareStrict.bind(null, instance))) {
    result.addError({
      name: 'enum',
      argument: schema['enum'],
      message: "is not one of enum values: " + schema['enum'].join(','),
    });
  }
  return result;
};

/**
 * Validates whether the instance exactly matches a given value
 *
 * @param instance
 * @param schema
 * @return {ValidatorResult|null}
 */
validators['const'] = function validateEnum (instance, schema, options, ctx) {
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (!helpers.deepCompareStrict(schema['const'], instance)) {
    result.addError({
      name: 'const',
      argument: schema['const'],
      message: "does not exactly match expected constant: " + schema['const'],
    });
  }
  return result;
};

/**
 * Validates whether the instance if of a prohibited type.
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {null|ValidatorResult}
 */
validators.not = validators.disallow = function validateNot (instance, schema, options, ctx) {
  var self = this;
  if(instance===undefined) return null;
  var result = new ValidatorResult(instance, schema, options, ctx);
  var notTypes = schema.not || schema.disallow;
  if(!notTypes) return null;
  if(!Array.isArray(notTypes)) notTypes=[notTypes];
  notTypes.forEach(function (type) {
    if (self.testType(instance, schema, options, ctx, type)) {
      var schemaId = type && type.id && ('<' + type.id + '>') || type;
      result.addError({
        name: 'not',
        argument: schemaId,
        message: "is of prohibited type " + schemaId,
      });
    }
  });
  return result;
};

module.exports = attribute;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * json schema for promotions information object
 */
var jsonSchema = exports.jsonSchema = {
  '$schema': 'http://json-schema.org/draft-06/schema#',
  'properties': {
    'PROMOTIONS': {
      'id': '/properties/PROMOTIONS',
      'properties': {
        'GAMEPLAY': {
          'id': '/properties/PROMOTIONS/properties/GAMEPLAY',
          'title': 'The gameplay schema.',
          'type': 'string',
          'enum': ['pending', 'complete']
        },
        'FREEROUNDS': {
          'id': '/properties/PROMOTIONS/properties/FREEROUNDS',
          'items': {
            'id': '/properties/PROMOTIONS/properties/FREEROUNDS/items',
            'properties': {
              'ACTIVATIONID': {
                'examples': ['PROM_100002'],
                'id': '/properties/PROMOTIONS/properties/FREEROUNDS/items/properties/ACTIVATIONID',
                'title': 'The activationid schema.',
                'type': 'string'
              },
              'CAMPAIGNID': {
                'examples': ['FW_10_SIGNUP'],
                'id': '/properties/PROMOTIONS/properties/FREEROUNDS/items/properties/CAMPAIGNID',
                'title': 'The campaignid schema.',
                'type': 'string'
              },
              'CAMPAIGNVALUE': {
                'examples': ['7.5'],
                'id': '/properties/PROMOTIONS/properties/FREEROUNDS/items/properties/CAMPAIGNVALUE',
                'title': 'The campaignvalue schema.',
                'type': 'number'
              },
              'ENDDATE': {
                'examples': ['2016-11-08T12:00:00Z'],
                'id': '/properties/PROMOTIONS/properties/FREEROUNDS/items/properties/ENDDATE',
                'title': 'The enddate schema.',
                'type': 'string'
              },
              'OPTIONS': {
                'id': '/properties/PROMOTIONS/properties/FREEROUNDS/items/properties/OPTIONS',
                'items': {
                  'id': '/properties/PROMOTIONS/properties/FREEROUNDS/items/properties/OPTIONS/items',
                  'properties': {
                    'BETLEVEL': {
                      'examples': ['2.5'],
                      'id': '/properties/PROMOTIONS/properties/FREEROUNDS/items/properties/OPTIONS/items/properties/BETLEVEL',
                      'title': 'The betlevel schema.',
                      'type': 'number'
                    },
                    'REMAININGROUNDS': {
                      'examples': ['2'],
                      'id': '/properties/PROMOTIONS/properties/FREEROUNDS/items/properties/OPTIONS/items/properties/REMAININGROUNDS',
                      'title': 'The remainingrounds schema.',
                      'type': 'integer'
                    },
                    'TOTALROUNDS': {
                      'examples': ['4'],
                      'id': '/properties/PROMOTIONS/properties/FREEROUNDS/items/properties/OPTIONS/items/properties/TOTALROUNDS',
                      'title': 'The totalrounds schema.',
                      'type': 'integer'
                    },
                    'FEATURE': {
                      'examples': ['5x Multiplier'],
                      'id': '/properties/PROMOTIONS/properties/FREEROUNDS/items/properties/FEATURE',
                      'title': 'The feature schema.',
                      'type': 'string'
                    }
                  },
                  'required': ['REMAININGROUNDS', 'TOTALROUNDS', 'BETLEVEL', 'FEATURE'],
                  'type': 'object'
                },
                'maxItems': 4,
                'minItems': 1,
                'type': 'array'
              },
              'REJECTABLE': {
                'examples': ['True'],
                'id': '/properties/PROMOTIONS/properties/FREEROUNDS/items/properties/REJECTABLE',
                'title': 'The rejectable schema.',
                'type': 'boolean'
              },
              'TOTALWIN': {
                'examples': ['30.58'],
                'id': '/properties/PROMOTIONS/properties/FREEROUNDS/items/properties/TOTALWIN',
                'title': 'The totalwin schema.',
                'type': 'number'
              }
            },
            'required': ['CAMPAIGNID', 'ACTIVATIONID', 'OPTIONS'],
            'type': 'object'
          },
          'minItems': 1,
          'type': 'array'
        }
      },
      'required': ['GAMEPLAY', 'FREEROUNDS'],
      'type': 'object'
    }
  },
  'required': ['PROMOTIONS'],
  'type': 'object'
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FreeRounds = undefined;

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _FreeRound = __webpack_require__(30);

var _FreeRoundInfo = __webpack_require__(62);

var _GCMNotification = __webpack_require__(4);

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * This class handles freeround promotions
 *
 * @class
 */
var FreeRounds = exports.FreeRounds = function () {
  /**
   * FreeRounds constructor
   *
   * @param {Object} freeRounds Array of one or more freerounds
   * @param {Object} notificationHandler {@See NotificationHandler}
   * @param {Object} ccyFormatter {@See CurrencyFormat}* @constructor
   * @param {Function} onReadyCallback function to be called when ready
   * @constructor
   */
  function FreeRounds(freeRounds, notificationHandler, ccyFormatter, onReadyCallback) {
    _classCallCheck(this, FreeRounds);

    this.freeRounds = new Array();
    this.activeFreeRound = null;
    this.notificationHandler = notificationHandler;
    this.ccyFormatter = ccyFormatter;
    this.onReadyCallback = onReadyCallback;

    this.activateFreeRounds(freeRounds);
  }

  /**
   * Validates the freeRounds param, selects the next freeround to be made available to the 
   * customer and puts a notification into the notification handler
   *
   * @param {Object} freeRounds Array of one or more freerounds
   */

  _createClass(FreeRounds, [{
    key: 'activateFreeRounds',
    value: function activateFreeRounds(freeRounds) {
      this.populateFreeRounds(freeRounds);
      this.activeFreeRound = this.getNextFreeRound();

      if (this.activeFreeRound !== null) {
        if (this.activeFreeRound['STATUS'] === 'inprogress') {
          this.notificationHandler.handleNotification(new _GCMNotification.GCMNotification(_GCMNotification.GCMNotification.TYPE.COMMONUI_FREEROUNDS_IN_PROGRESS, JSON.parse(JSON.stringify(this.activeFreeRound)), this.freeRoundsInProgressCallback.bind(this)));
        } else {
          this.notificationHandler.handleNotification(new _GCMNotification.GCMNotification(_GCMNotification.GCMNotification.TYPE.COMMONUI_FREEROUNDS_AWARD, JSON.parse(JSON.stringify(this.activeFreeRound)), this.freeRoundsAwardCallback.bind(this)));
        }
      } else {
        this.onReadyCallback();
      }
    }

    /**
     * Populates an array of FreeRoundInfo objects using the freeRounds param
     *
     * @param {Object} freeRounds Array of one or more freerounds
     */

  }, {
    key: 'populateFreeRounds',
    value: function populateFreeRounds(freeRounds) {
      this.freeRounds = new Array();

      for (var i = 0; i < freeRounds.length; i++) {
        var freeround = new _FreeRoundInfo.FreeRoundInfo(freeRounds[i]['CAMPAIGNID'], freeRounds[i]['ACTIVATIONID'], freeRounds[i]['ENDDATE'], freeRounds[i]['TOTALWIN'], freeRounds[i]['CAMPAIGNVALUE'], freeRounds[i]['REJECTABLE'], freeRounds[i]['OPTIONS'], this.ccyFormatter);

        this.freeRounds.push(freeround);
      }
    }

    /**
     * Called with updated FreeRound data for the active freeround during game animation. This data is used to refresh 
     * the FreeRoundInfo for the active freeround.
     * 
     * If there is an active freeround and the remaining rounds and/or totalwin have been updated then a notification is 
     * put into the notification handler containing the updated FreeRoundInfo. This notification will then be pushed to 
     * the game & commonUI when the game is next idle
     *
     * @param {Object} updFreeRounds Array of one updated freeround
     * @param {Boolean} gamePlayComplete True if the current game play is complete
     */

  }, {
    key: 'updateFreeRounds',
    value: function updateFreeRounds(updFreeRounds, gamePlayComplete) {
      this.refreshActiveFreeRound(updFreeRounds[0]);

      if (this.activeFreeRound !== null && gamePlayComplete) {
        // No callback needed as the notification handler incorperates general callback/acknowledgement functionality - see NotificationHandler.resume()
        this.notificationHandler.handleNotification(new _GCMNotification.GCMNotification(_GCMNotification.GCMNotification.TYPE.COMMONUI_FREEROUNDS_UPDATE, JSON.parse(JSON.stringify(this.activeFreeRound))));

        this.notificationHandler.handleNotification(new _GCMNotification.GCMNotification(_GCMNotification.GCMNotification.TYPE.GAME_FREEROUNDS_UPDATE, JSON.parse(JSON.stringify(this.activeFreeRound))));
      }
    }

    /**
     * Clear active freeround if it is completed
     */

  }, {
    key: 'clearCompletedActiveFreeRound',
    value: function clearCompletedActiveFreeRound() {
      if (this.activeFreeRound !== null && this.activeFreeRound['STATUS'] === 'completed') {
        this.activeFreeRound = null;
      }
    }

    /**
     * Refreshes the active freeround with the information held in the freeRounds array
     *
     * @private
     */

  }, {
    key: 'refreshActiveFreeRound',
    value: function refreshActiveFreeRound(updFreeRounds) {
      if (this.activeFreeRound !== null) {
        var campaignId = this.activeFreeRound['CAMPAIGNID'];
        var activationId = this.activeFreeRound['ACTIVATIONID'];
        var totalWin = this.activeFreeRound['TOTALWIN'];
        var remainingRounds = this.activeFreeRound['OPTIONS'][0]['REMAININGROUNDS'];

        this.activeFreeRound = null;

        for (var i = 0; i < this.freeRounds.length; i++) {
          if (this.freeRounds[i]['CAMPAIGNID'] === campaignId && this.freeRounds[i]['ACTIVATIONID'] === activationId) {
            var freeround = this.freeRounds[i];

            // Check totalwin
            if (updFreeRounds['TOTALWIN'] !== undefined && updFreeRounds['TOTALWIN'] !== freeround['TOTALWIN']) {

              freeround.setTotalWin(updFreeRounds['TOTALWIN'], this.ccyFormatter);
            }

            // Check remainingrounds
            if (updFreeRounds['OPTIONS'] !== undefined && updFreeRounds['OPTIONS'].length === 1 && updFreeRounds['OPTIONS'][0]['REMAININGROUNDS'] !== undefined && updFreeRounds['OPTIONS'][0]['REMAININGROUNDS'] !== freeround['OPTIONS'][0]['REMAININGROUNDS']) {

              freeround.setRemainingRounds(updFreeRounds['OPTIONS'][0]['REMAININGROUNDS']);
            }

            this.activeFreeRound = this.freeRounds[i];
            break;
          }
        }
      }
    }

    /**
     * Retrieves the next available freeround from the freeRounds array
     *
     * @private
     * @returns {FreeRoundInfo} the next available {@see FreeRoundInfo}, else null
     */

  }, {
    key: 'getNextFreeRound',
    value: function getNextFreeRound() {
      // Completed freerounds can be ignored
      var openFreeRounds = this.freeRounds.filter(this.isIncompleted);

      // If 0 or 1 freerounds available, we can return immediately
      if (openFreeRounds.length === 0) {
        return null;
      } else if (openFreeRounds.length === 1) {
        return openFreeRounds[0];
      }

      // Inprogress freerounds are returned first
      var inprogressFreeRounds = openFreeRounds.filter(this.isInProgress);
      if (inprogressFreeRounds.length === 1) {
        return inprogressFreeRounds[0];
      } else if (inprogressFreeRounds.length > 1) {
        return inprogressFreeRounds.sort(this.sortByEndDate)[0];
      }

      // Else freerounds which cannot be rejected 
      var notRejectableFreeRounds = openFreeRounds.filter(this.isNotRejectable);
      if (notRejectableFreeRounds.length === 1) {
        return notRejectableFreeRounds[0];
      } else if (notRejectableFreeRounds.length > 1) {
        return notRejectableFreeRounds.sort(this.sortByEndDate)[0];
      }

      // Else we return the freeround which ends the soonist
      return openFreeRounds.sort(this.sortByEndDate)[0];
    }

    /**
     * Is there currently an active freeround in progress
     *
     * @returns {boolean} true if there is an active freeround
     */

  }, {
    key: 'isActiveFreeRound',
    value: function isActiveFreeRound() {
      return this.activeFreeRound !== null;
    }

    /**
     * Called when creating a PromoInfo object to return via a Promotions.getPromoInfo(). 
     * Clones the active freeround.
     *
     * @returns {FreeRound} cloned freeround 
     */

  }, {
    key: 'cloneActiveFreeRound',
    value: function cloneActiveFreeRound() {
      if (this.activeFreeRound === null) {
        return this.activeFreeRound;
      }

      return new _FreeRound.FreeRound(this.activeFreeRound['CAMPAIGNID'], this.activeFreeRound['ACTIVATIONID'], this.activeFreeRound['ENDDATE'], this.activeFreeRound['TOTALWIN'], this.activeFreeRound['CAMPAIGNVALUE'], this.activeFreeRound['REJECTABLE'], this.activeFreeRound['OPTIONS']);
    }

    /**
     * Is freeround not rejectable
     *
     * @private
     * @param {FreeRoundInfo} freeround
     * @returns {boolean}
     */

  }, {
    key: 'isNotRejectable',
    value: function isNotRejectable(freeround) {
      return !freeround['REJECTABLE'];
    }

    /**
     * Is freeround in progress
     *
     * @private
     * @param {FreeRoundInfo} freeround
     * @returns {boolean}
     */

  }, {
    key: 'isInProgress',
    value: function isInProgress(freeround) {
      return freeround['STATUS'] === 'inprogress';
    }

    /**
     * Is freeround incompleted
     *
     * @private
     * @param {FreeRoundInfo} freeround
     * @returns {boolean}
     */

  }, {
    key: 'isIncompleted',
    value: function isIncompleted(freeround) {
      return freeround['STATUS'] !== 'completed';
    }

    /**
     * Compares the end date of two freerounds, used to sort based on end date
     *
     * @private
     * @param {FreeRoundInfo} freeround1
     * @param {FreeRoundInfo} freeround2
     * @returns {number}
     */

  }, {
    key: 'sortByEndDate',
    value: function sortByEndDate(freeround1, freeround2) {
      return new Date(freeround1['ENDDATE']) - new Date(freeround2['ENDDATE']);
    }

    /**
     * Callback function to be called by the commonUI when GCMNotification.TYPE.COMMONUI_FREEROUNDS_AWARD
     * has been handled and the customer has choosen an option or rejected the freeround
     *
     * @param {Number} betLevel the non ccy formatted BETLEVEL value of the option choosen, else 0 if freeround was rejected
     */

  }, {
    key: 'freeRoundsAwardCallback',
    value: function freeRoundsAwardCallback(betLevel) {
      // Check to see if the customer rejected the freeround
      if (betLevel === 0) {
        // Confirm that this freeround can be rejected
        if (this.activeFreeRound['REJECTABLE'] === true) {
          this.activeFreeRound = null;
          this.onReadyCallback();
        } else {
          throw new Error('FreeRound cannot be used later');
        }
      } else {
        // Preserve only the option which was selected
        var options = this.activeFreeRound['OPTIONS'];
        for (var i = options.length - 1; i >= 0; i--) {
          if (options[i]['BETLEVEL'] !== betLevel) {
            options.splice(i, 1);
          }
        }

        // Ensure one option is present
        if (this.activeFreeRound['OPTIONS'].length !== 1) {
          throw new Error('Invalid FreeRound option selected');
        }

        // Send the FreeRound information to CommonUI, which will then notify the game and finally call the onReadyCallback
        this.notificationHandler.handleNotification(new _GCMNotification.GCMNotification(_GCMNotification.GCMNotification.TYPE.COMMONUI_FREEROUNDS_UPDATE, JSON.parse(JSON.stringify(this.activeFreeRound)), this.freeRoundsCommonUIActivatedCallback.bind(this)));
      }
    }

    /**
     * Callback function to be called by the commonUI when GCMNotification.TYPE.COMMONUI_FREEROUNDS_IN_PROGRESS
     * has been handled.
     */

  }, {
    key: 'freeRoundsInProgressCallback',
    value: function freeRoundsInProgressCallback() {
      // Send the FreeRound information to CommonUI, which will then notify the game and finally call the onReadyCallback
      this.notificationHandler.handleNotification(new _GCMNotification.GCMNotification(_GCMNotification.GCMNotification.TYPE.COMMONUI_FREEROUNDS_UPDATE, JSON.parse(JSON.stringify(this.activeFreeRound)), this.freeRoundsCommonUIActivatedCallback.bind(this)));
    }

    /**
     * Callback function made by the commonui when it recieves the initial GCMNotification.TYPE.COMMONUI_FREEROUNDS_UPDATE notification
     * when activating/initalising a new freeround
     */

  }, {
    key: 'freeRoundsCommonUIActivatedCallback',
    value: function freeRoundsCommonUIActivatedCallback() {
      this.notificationHandler.handleNotification(new _GCMNotification.GCMNotification(_GCMNotification.GCMNotification.TYPE.GAME_FREEROUNDS_UPDATE, JSON.parse(JSON.stringify(this.activeFreeRound)), this.freeRoundsGameActivatedCallback.bind(this)));
    }

    /**
     * Callback function made by the game when it recieves the initial GCMNotification.TYPE.GAME_FREEROUNDS_UPDATE notification
     * when activating/initalising a new freeround
     */

  }, {
    key: 'freeRoundsGameActivatedCallback',
    value: function freeRoundsGameActivatedCallback() {
      this.onReadyCallback();
    }

    /**
     * Is the active freeround finished
     *
     * @returns {boolean}
     */

  }, {
    key: 'isActiveFreeRoundFinished',
    value: function isActiveFreeRoundFinished() {
      if (this.isActiveFreeRound()) {
        return this.activeFreeRound['OPTIONS'][0]['REMAININGROUNDS'] === 0;
      } else {
        return false;
      }
    }

    /**
     * Retrieve the total win value of the active freeround
     *
     * @returns {Number}
     */

  }, {
    key: 'getActiveFreeRoundTotalWin',
    value: function getActiveFreeRoundTotalWin() {
      return this.activeFreeRound['TOTALWIN'];
    }
  }]);

  return FreeRounds;
}();

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FreeRoundInfo = undefined;

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _jsonschema = __webpack_require__(19);

var _FreeRound2 = __webpack_require__(30);

var _FreeRoundInfoSchema = __webpack_require__(63);

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * Data model and validation for the FreeRoundInfo object.
 *
 * @class
 */
var FreeRoundInfo = exports.FreeRoundInfo = function (_FreeRound) {
  _inherits(FreeRoundInfo, _FreeRound);

  /**
   * FreeRoundInfo constructor
   *
   * @param {String} campaignId
   * @param {String} activationId
   * @param {String} endDate
   * @param {Number} totalWin
   * @param {Number} campaignValue
   * @param {Boolean} rejectable 
   * @param {Object} options Object representing the option(s) available
   * @param {Object} ccyFormatter {@See CurrencyFormat}
   * @extends FreeRound
   * @constructor
   */
  function FreeRoundInfo(campaignId, activationId, endDate, totalWin, campaignValue, rejectable, options, ccyFormatter) {
    _classCallCheck(this, FreeRoundInfo);

    var _this = _possibleConstructorReturn(this, (FreeRoundInfo.__proto__ || Object.getPrototypeOf(FreeRoundInfo)).call(this, campaignId, activationId, endDate, totalWin, campaignValue, rejectable, options));

    _this['TOTALWIN_FMT'] = ccyFormatter['format'](totalWin).display;
    _this['CAMPAIGNVALUE_FMT'] = ccyFormatter['format'](campaignValue).display;

    for (var j = 0; j < _this['OPTIONS'].length; j++) {
      var option = _this['OPTIONS'][j];

      option['BETLEVEL_FMT'] = ccyFormatter['format'](options[j]['BETLEVEL']).display;
    }

    // Using REMAININGROUNDS to detemine status of FreeRound
    _this['STATUS'] = 'notstarted';
    _this.updateStatus();

    _this.validateFreeRoundInfo();
    return _this;
  }

  /**
   * Set totalWin and validate FreeRoundInfo object
   */

  _createClass(FreeRoundInfo, [{
    key: 'setTotalWin',
    value: function setTotalWin(totalWin, ccyFormatter) {
      this['TOTALWIN'] = totalWin;
      this['TOTALWIN_FMT'] = ccyFormatter['format'](totalWin).display;

      this.validateFreeRoundInfo();
    }

    /**
     * Set remainingRounds and status (based on remainingRounds) and validate FreeRoundInfo object
     */

  }, {
    key: 'setRemainingRounds',
    value: function setRemainingRounds(remainingRounds) {
      this['OPTIONS'][0]['REMAININGROUNDS'] = remainingRounds;

      this.updateStatus();

      this.validateFreeRoundInfo();
    }
  }, {
    key: 'updateStatus',
    value: function updateStatus() {
      // Using REMAININGROUNDS to detemine status of FreeRound
      if (this['OPTIONS'].length === 1) {
        if (this['OPTIONS'][0]['REMAININGROUNDS'] === 0) {
          this['STATUS'] = 'completed';
        } else if (this['OPTIONS'][0]['TOTALROUNDS'] > this['OPTIONS'][0]['REMAININGROUNDS']) {
          this['STATUS'] = 'inprogress';
        }
      }
    }

    /**
     * Validates the structure of a FreeRoundInfo object
     * 
     * @private
     * @param {FreeRoundInfo} freeroundInfo free round information object
     * @throws {Error} if this object has a invalid strucure
     */

  }, {
    key: 'validateFreeRoundInfo',
    value: function validateFreeRoundInfo() {
      var validator = new _jsonschema.Validator();

      var errors = validator.validate(this, _FreeRoundInfoSchema.jsonSchema).errors;
      if (errors.length !== 0) {
        throw new Error('Invalid freeround information: ' + errors[0].stack);
      }
    }
  }]);

  return FreeRoundInfo;
}(_FreeRound2.FreeRound);

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * json schema for freerounds information object
 */
var jsonSchema = exports.jsonSchema = {
  '$schema': 'http://json-schema.org/draft-06/schema#',
  'definitions': {},
  'properties': {
    'ACTIVATIONID': {
      'examples': ['PROM_100002'],
      'id': '/properties/ACTIVATIONID',
      'title': 'The activationid schema.',
      'type': 'string'
    },
    'CAMPAIGNID': {
      'examples': ['FW_10_SIGNUP'],
      'id': '/properties/CAMPAIGNID',
      'title': 'The campaignid schema.',
      'type': 'string'
    },
    'CAMPAIGNVALUE': {
      'examples': ['100'],
      'id': '/properties/CAMPAIGNVALUE',
      'title': 'The campaignvalue schema.',
      'type': 'number'
    },
    'CAMPAIGNVALUE_FMT': {
      'examples': ['£100.00'],
      'id': '/properties/CAMPAIGNVALUE_FMT',
      'title': 'The campaignvalue_fmt schema.',
      'type': 'string'
    },
    'ENDDATE': {
      'examples': ['2016-11-08T12:00:00Z'],
      'id': '/properties/ENDDATE',
      'title': 'The enddate schema.',
      'type': 'string'
    },
    'OPTIONS': {
      'id': '/properties/OPTIONS',
      'items': {
        'id': '/properties/OPTIONS/items',
        'properties': {
          'BETLEVEL': {
            'examples': ['25'],
            'id': '/properties/OPTIONS/items/properties/BETLEVEL',
            'title': 'The betlevel schema.',
            'type': 'number'
          },
          'BETLEVEL_FMT': {
            'examples': ['£325.00'],
            'id': '/properties/OPTIONS/items/properties/BETLEVEL_FMT',
            'title': 'The betlevel_fmt schema.',
            'type': 'string'
          },
          'FEATURE': {
            'examples': [''],
            'id': '/properties/OPTIONS/items/properties/FEATURE',
            'title': 'The feature schema.',
            'type': 'string'
          },
          'REMAININGROUNDS': {
            'examples': ['2'],
            'id': '/properties/OPTIONS/items/properties/REMAININGROUNDS',
            'title': 'The remainingrounds schema.',
            'type': 'integer'
          },
          'TOTALROUNDS': {
            'examples': ['4'],
            'id': '/properties/OPTIONS/items/properties/TOTALROUNDS',
            'title': 'The totalrounds schema.',
            'type': 'integer'
          }
        },
        'required': ['REMAININGROUNDS', 'TOTALROUNDS', 'BETLEVEL', 'FEATURE', 'BETLEVEL_FMT'],
        'type': 'object'
      },
      'maxItems': 4,
      'minItems': 1,
      'type': 'array'
    },
    'REJECTABLE': {
      'examples': ['True'],
      'id': '/properties/REJECTABLE',
      'title': 'The rejectable schema.',
      'type': 'boolean'
    },
    'STATUS': {
      'examples': ['inprogress'],
      'id': '/properties/STATUS',
      'title': 'The status schema.',
      'type': 'string'
    },
    'TOTALWIN': {
      'examples': ['31.1'],
      'id': '/properties/TOTALWIN',
      'title': 'The totalwin schema.',
      'type': 'number'
    },
    'TOTALWIN_FMT': {
      'examples': ['£31.10'],
      'id': '/properties/TOTALWIN_FMT',
      'title': 'The totalwin_fmt schema.',
      'type': 'string'
    }
  },
  'required': ['STATUS', 'ENDDATE', 'CAMPAIGNID', 'TOTALWIN_FMT', 'CAMPAIGNVALUE', 'TOTALWIN', 'ACTIVATIONID', 'CAMPAIGNVALUE_FMT', 'OPTIONS', 'REJECTABLE'],
  'type': 'object'
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageTrigger = undefined;

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _XmlUtil = __webpack_require__(65);

var _XmlUtil2 = _interopRequireDefault(_XmlUtil);

var _MessageInfoFactory = __webpack_require__(66);

var _MessageInfoFactory2 = _interopRequireDefault(_MessageInfoFactory);

var _MessageType = __webpack_require__(32);

var MessageType = _interopRequireWildcard(_MessageType);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/*
 * Class encapulating the message trigger functionality
 *
 * @class
 */

var MessageTrigger = exports.MessageTrigger = function () {
  function MessageTrigger() {
    _classCallCheck(this, MessageTrigger);
  }
  // Called later in file to produce singleton


  /**
   * Returns Message from the message Xml element.
   *
   * @function
   * @private
   * @param {String} message Node
   * @returns {Object} Message Object
   */

  _createClass(MessageTrigger, [{
    key: 'getMessageFromXml',
    value: function getMessageFromXml(messageNodeStr) {
      if (messageNodeStr !== null) {
        var messageNode = getMessageNodeFromString(messageNodeStr);
        var id = messageNode.getAttribute('id');
        MessageType.isValidMessageType(id);
        var messageInfo = new _MessageInfoFactory2.default.createMessageInfo(id, messageNode);
        var message = messageInfo.getMessageFromXml();
        if (message) {
          messageInfo.setMessage(message);
        }
        return messageInfo.MESSAGE;
      }
    }
  }]);

  return MessageTrigger;
}();

/**
 * Returns the message Node from the message Xml String.
 *
 * @function
 * @private
 * @param {string} messageNodeStr
 * @returns {Node} messageNode
 */

function getMessageNodeFromString(messageNodeStr) {
  try {
    var messageXml = _XmlUtil2.default.stringToXml(messageNodeStr);
    return messageXml.getElementsByTagName('MESSAGE')[0];
  } catch (err) {
    throw new Error('Invalid Message Xml.');
  }
}

/**
 * Create and export singleton
 */
var instance = new MessageTrigger();
exports.default = instance;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/*
 * Utility class to provide generic functions to help formating xml.
 *
 * @class
 */
var XmlUtil = exports.XmlUtil = function () {
  function XmlUtil() {
    _classCallCheck(this, XmlUtil);
  }
  // Called later in file to produce singleton


  /**
   * Convert string to xml
   *
   * @function
   */

  _createClass(XmlUtil, [{
    key: 'stringToXml',
    value: function stringToXml(str) {
      if (window.DOMParser) {
        var parser = new window.DOMParser();
        return parser.parseFromString(str, 'text/xml');
      } else {
        var xmlDoc = new window.ActiveXObject('Microsoft.XMLDOM');
        xmlDoc.async = false;
        xmlDoc.loadXML(str);
        return xmlDoc;
      }
    }

    /**
     * Convert xml to a string
     *
     * @function
     */

  }, {
    key: 'xmlToString',
    value: function xmlToString(xmlDoc) {
      if (window.XMLSerializer) {
        var serializer = new window.XMLSerializer();
        return serializer.serializeToString(xmlDoc);
      } else {
        return xmlDoc.xml;
      }
    }
  }]);

  return XmlUtil;
}();

/**
 * Create and export singleton
 */

var instance = new XmlUtil();
exports.default = instance;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageInfoFactory = undefined;

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _MessageTypeConstruct;

var _CmaMessageInfo = __webpack_require__(67);

var _CmaMessageInfo2 = _interopRequireDefault(_CmaMessageInfo);

var _RcMessageInfo = __webpack_require__(70);

var _RcMessageInfo2 = _interopRequireDefault(_RcMessageInfo);

var _MessageType = __webpack_require__(32);

var MessageType = _interopRequireWildcard(_MessageType);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

/**
 * Message Info Constructors
 */
var MessageTypeConstructors = (_MessageTypeConstruct = {}, _defineProperty(_MessageTypeConstruct, MessageType.SupportedMessageTypes.CMA, _CmaMessageInfo2.default), _defineProperty(_MessageTypeConstruct, MessageType.SupportedMessageTypes.RC, _RcMessageInfo2.default), _MessageTypeConstruct);

/**
 * Class MessageInfoFactory
 *
 * @class
 */

var MessageInfoFactory = exports.MessageInfoFactory = function () {
  function MessageInfoFactory() {
    _classCallCheck(this, MessageInfoFactory);
  }
  // Called later in file to produce singleton


  /**
   * Creates the message based on the type
   *
   * @param {integer} messageId, the message type code
   * @param {Node} messageNode, the message node
   */

  _createClass(MessageInfoFactory, [{
    key: 'createMessageInfo',
    value: function createMessageInfo(messageId, messageNode) {
      var MessageInfoConstructor = MessageTypeConstructors[messageId];
      var messageInfo = null;
      if (MessageInfoConstructor) {
        messageInfo = new MessageInfoConstructor(messageNode);
      }
      return messageInfo;
    }
  }]);

  return MessageInfoFactory;
}();

/**
 * Create and export singleton
 */

var instance = new MessageInfoFactory();
exports.default = instance;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _MessageInfo2 = __webpack_require__(31);

var _MessageInfo3 = _interopRequireDefault(_MessageInfo2);

var _CmaMessage = __webpack_require__(68);

var _CmaOption = __webpack_require__(69);

var _CmaOption2 = _interopRequireDefault(_CmaOption);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * Class representing a CMA Message Info
 *
 * @class
 */
var CmaMessageInfo = function (_MessageInfo) {
  _inherits(CmaMessageInfo, _MessageInfo);

  /**
   * @param {Node} the message Node.
   * @constructor
   */
  function CmaMessageInfo(node) {
    _classCallCheck(this, CmaMessageInfo);

    return _possibleConstructorReturn(this, (CmaMessageInfo.__proto__ || Object.getPrototypeOf(CmaMessageInfo)).call(this, node));
  }

  /**
   * Sets CmaMessage from the message Xml element
   *
   * @function
   * @public
   * @returns {CmaMessage} {@link CmaMessage}
   */

  _createClass(CmaMessageInfo, [{
    key: 'getMessageFromXml',
    value: function getMessageFromXml() {
      try {
        var id = this.messageNode.getAttribute('id');
        var title = this.messageNode.getElementsByTagName('TITLE')[0].childNodes[0].nodeValue;
        var text = this.messageNode.getElementsByTagName('TEXT')[0].childNodes[0].nodeValue;
        var message = new _CmaMessage.CmaMessage(id, title, text);
        if (this.messageNode.getElementsByTagName('OPTIONS').length > 0) {
          var optionsArr = Array.from(this.messageNode.getElementsByTagName('OPTIONS')[0].childNodes);
          message.setOptions(getOptionsFromXml(optionsArr));
        }
        return message;
      } catch (err) {
        throw new Error('CMA Message XML is not valid');
      }
    }

    /**
     * Validates the Message
     *
     * @function
     * @public
     * @param {CmaMessage} {@link CmaMessage}
     */

  }, {
    key: 'validateMessage',
    value: function validateMessage(message) {
      var errors = this.validator.validate(message, _CmaMessage.jsonSchema).errors;
      if (errors.length !== 0) {
        throw new Error('Invalid CMA message: ' + errors[0].stack);
      }
    }
  }]);

  return CmaMessageInfo;
}(_MessageInfo3.default);

/**
 * Returns Array of hte Cma Options from the options Xml element
 *
 * @function
 * @private
 * @param {Array} options Node
 * @returns {Array#CmaOption} CmaMessage options
 */

exports.default = CmaMessageInfo;
function getOptionsFromXml(options) {
  var optionsArr = new Array();
  options.map(function (op) {
    if (op.nodeName !== '#text') {
      var id = op.getAttribute('id');
      var action = op.getAttribute('action');
      var body = op.childNodes[0].nodeValue;
      optionsArr.push(new _CmaOption2.default(id, action, body));
    }
  });
  return optionsArr;
}

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/*
 * Data model for a CMA Message
 *
 * @class
 */
var CmaMessage = exports.CmaMessage = function () {

  /**
   * @param {String} id
   * @param {String} title
   * @param {String} text
   *
   * @constructor
   */
  function CmaMessage(id, title, text) {
    _classCallCheck(this, CmaMessage);

    this.ID = parseInt(id);
    this.TITLE = title;
    this.TEXT = text;

    this.OPTIONS = [];
  }

  /**
   * Adds an options to the Message
   *
   * @public
   * @function
   * @param {Array#Option} options Array
   */

  _createClass(CmaMessage, [{
    key: 'setOptions',
    value: function setOptions(options) {
      this.OPTIONS = options;
    }
  }]);

  return CmaMessage;
}();

var jsonSchema = exports.jsonSchema = {
  '$schema': 'http://json-schema.org/draft-06/schema#',
  'properties': {
    'MESSAGE': {
      '$id': '/properties/MESSAGE',
      'type': 'object',
      'properties': {
        'ID': {
          '$id': '/properties/MESSAGE/properties/ID',
          'type': 'integer',
          'title': 'The Id Schema ',
          'enum': [101]
        },
        'TITLE': {
          '$id': '/properties/MESSAGE/properties/TITLE',
          'type': 'string',
          'title': 'The Title Schema ',
          'examples': ['Message 1 Title']
        },
        'TEXT': {
          '$id': '/properties/MESSAGE/properties/TEXT',
          'type': 'string',
          'title': 'The Text Schema ',
          'examples': ['New message 1']
        },
        'OPTIONS': _defineProperty({
          '$id': '/properties/MESSAGE/properties/OPTIONS',
          'type': 'array',
          'items': _defineProperty({
            '$id': '/properties/MESSAGE/properties/OPTIONS/items',
            'type': 'object',
            'properties': {
              'ID': {
                '$id': '/properties/MESSAGE/properties/OPTIONS/items/properties/ID',
                'type': 'integer',
                'title': 'The Id Schema ',
                'examples': [0],
                'enum': [0, 103, 104, 105]
              },
              'ACTION': {
                '$id': '/properties/MESSAGE/properties/OPTIONS/items/properties/ACTION',
                'type': 'string',
                'title': 'The Action Schema ',
                'examples': ['https://cb.oper.com/B4711?sid=34754']
              },
              'BODY': {
                '$id': '/properties/MESSAGE/properties/OPTIONS/items/properties/BODY',
                'type': 'string',
                'title': 'The Body Schema ',
                'examples': ['OK']
              }
            },
            'required': ['ID', 'ACTION', 'BODY']
          }, 'type', 'object'),
          'minItems': 0
        }, 'type', 'array')
      }
    }
  },
  'required': ['ID', 'TITLE', 'TEXT'],
  'type': 'object'
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * Data model for a CMA Option
 *
 * @class
 */
var CmaOption =

/**
 * @param {String} id
 * @param {String} action
 * @param {String} body
 * @constructor
 */
function CmaOption(id, action, body) {
  _classCallCheck(this, CmaOption);

  this.ID = parseInt(id);
  this.ACTION = action;
  this.BODY = body;
};

exports.default = CmaOption;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _MessageInfo2 = __webpack_require__(31);

var _MessageInfo3 = _interopRequireDefault(_MessageInfo2);

var _RcMessage = __webpack_require__(71);

var _RcOption = __webpack_require__(72);

var _RcOption2 = _interopRequireDefault(_RcOption);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * Class representing a Reality Check Message Info
 *
 * @class
 */
var RcMessageInfo = function (_MessageInfo) {
  _inherits(RcMessageInfo, _MessageInfo);

  /**
   * @param {Node} node, the message Node.
   * @constructor
   */
  function RcMessageInfo(node) {
    _classCallCheck(this, RcMessageInfo);

    return _possibleConstructorReturn(this, (RcMessageInfo.__proto__ || Object.getPrototypeOf(RcMessageInfo)).call(this, node));
  }

  /**
   * Converts the XML message specified by {node} in the constructor to
   * a {RcMessage} representation.
   *
   * @function
   * @public
   * @returns {RcMessage} {@link RcMessage}
   */

  _createClass(RcMessageInfo, [{
    key: 'getMessageFromXml',
    value: function getMessageFromXml() {
      if (isSyncMessage(this.messageNode)) {
        return null;
      }

      try {
        var id = this.messageNode.getAttribute('id');
        var type = void 0;
        if (this.messageNode.getElementsByTagName('TYPE').length > 0) {
          type = this.messageNode.getElementsByTagName('TYPE')[0].childNodes[0].nodeValue;
        }
        var title = this.messageNode.getElementsByTagName('TITLE')[0].childNodes[0].nodeValue;
        var text = this.messageNode.getElementsByTagName('TEXT')[0].childNodes[0].nodeValue;
        var message = new _RcMessage.RcMessage(id, type, title, text);
        if (this.messageNode.getElementsByTagName('OPTIONS').length > 0) {
          var optionsArr = Array.from(this.messageNode.getElementsByTagName('OPTIONS')[0].childNodes);
          message.setOptions(getOptionsFromXml(optionsArr));
        }
        return message;
      } catch (err) {
        throw new Error('RC Message XML is not valid: ' + err.message);
      }
    }

    /**
     * Validates the Message
     *
     * @function
     * @public
     * @param {RcMessage} {@link RcMessage}
     */

  }, {
    key: 'validateMessage',
    value: function validateMessage(message) {
      var errors = this.validator.validate(message, _RcMessage.jsonSchema).errors;
      if (errors.length !== 0) {
        throw new Error('Invalid RC message: ' + errors[0].stack);
      }
    }
  }]);

  return RcMessageInfo;
}(_MessageInfo3.default);

/**
 * Check if RC is a sync message
 *
 * @function
 * @private
 * @param {Node} messageNode the message Node.
 * @returns {boolean} true if the message is a sync message (ignore),
 *  false if it is a default RC message
 */

exports.default = RcMessageInfo;
function isSyncMessage(messageNode) {
  if (messageNode) return messageNode.getElementsByTagName('SESSIONTIME').length > 0 ? true : false;

  return false;
}

/**
 * Returns Array of hte Rc Options from the options Xml element
 *
 * @function
 * @private
 * @param {Array} options Node
 * @returns {Array#RcOption} RcMessage options
 */
function getOptionsFromXml(options) {
  var optionsArr = new Array();
  options.map(function (op) {
    if (op.nodeName !== '#text') {
      var id = op.getAttribute('id');
      var action = op.getAttribute('action');
      var body = op.childNodes[0].nodeValue;
      optionsArr.push(new _RcOption2.default(id, action, body));
    }
  });
  return optionsArr;
}

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/*
 * Data model for a Reality Check Message
 *
 * @class
 */
var RcMessage = exports.RcMessage = function () {

  /**
   * @param {String} id
   * @param {String} type
   * @param {String} title
   * @param {String} text
   *
   * @constructor
   */
  function RcMessage(id, type, title, text) {
    _classCallCheck(this, RcMessage);

    this.ID = parseInt(id);
    this.TYPE = type;
    this.TITLE = title;
    this.TEXT = text;

    this.OPTIONS = [];
  }

  /**
   * Adds an options to the Message
   *
   * @public
   * @function
   * @param {Array#Option} options Array
   */

  _createClass(RcMessage, [{
    key: "setOptions",
    value: function setOptions(options) {
      this.OPTIONS = options;
    }
  }]);

  return RcMessage;
}();

var jsonSchema = exports.jsonSchema = {
  "$schema": "http://json-schema.org/draft-06/schema#",
  "properties": {
    "MESSAGE": {
      "$id": "/properties/MESSAGE",
      "type": "object",
      "properties": {
        "ID": {
          "$id": "/properties/MESSAGE/properties/ID",
          "type": "integer",
          "title": "The Id Schema ",
          "enum": [100]
        },
        "TYPE": {
          "$id": "/properties/MESSAGE/properties/TYPE",
          "type": "string",
          "title": "The Type Schema ",
          "examples": ["REALITYCHECK_UK"]
        },
        "TITLE": {
          "$id": "/properties/MESSAGE/properties/TITLE",
          "type": "string",
          "title": "The Title Schema ",
          "examples": ["Message Title 1"]
        },
        "TEXT": {
          "$id": "/properties/MESSAGE/properties/TEXT",
          "type": "string",
          "title": "The Text Schema ",
          "examples": ["New message 1"]
        },
        'OPTIONS': _defineProperty({
          '$id': '/properties/MESSAGE/properties/OPTIONS',
          'type': 'array',
          'items': _defineProperty({
            '$id': '/properties/MESSAGE/properties/OPTIONS/items',
            'type': 'object',
            'properties': {
              'ID': {
                '$id': '/properties/MESSAGE/properties/OPTIONS/items/properties/ID',
                'type': 'integer',
                'title': 'The Id Schema ',
                'examples': [100],
                "enum": [0, 100, 101, 102, 103]
              },
              'ACTION': {
                '$id': '/properties/MESSAGE/properties/OPTIONS/items/properties/ACTION',
                'type': 'string',
                'title': 'The Action Schema ',
                'examples': ['https://cb.oper.com/B4711?sid=34754']
              },
              'BODY': {
                '$id': '/properties/MESSAGE/properties/OPTIONS/items/properties/BODY',
                'type': 'string',
                'title': 'The Body Schema ',
                'examples': ['OK']
              }
            },
            'required': ['ID', 'ACTION', 'BODY']
          }, "type", 'object'),
          'minItems': 0
        }, "type", 'array')
      }
    }
  },
  'required': ['ID', 'TITLE', 'TEXT'],
  'type': 'object'
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * Data model for a Reality Check Option
 *
 * @class
 */
var RcOption =

/**
 * @param {String} id
 * @param {String} action
 * @param {String} body
 * @constructor
 */
function RcOption(id, action, body) {
  _classCallCheck(this, RcOption);

  this.ID = parseInt(id);
  this.ACTION = action;
  this.BODY = body;
};

exports.default = RcOption;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * UrlUtil (<b>com.openbet.gcm.urlutil</b>) provides utility
 * functions for manipulating url string and request parameters.
 *
 * Using this util game/commonUI developer can get/add/update url request parameters.
 * This functionality is exposed in com.openbet.gcm.urlutil.
 *
 *
 * @author xliu
 * @namespace
 */

var UrlUtil = exports.UrlUtil = function () {
  function UrlUtil() {
    _classCallCheck(this, UrlUtil);
  }

  _createClass(UrlUtil, null, [{
    key: 'addParametersToUrl',

    /**
    * Gets a parameter value from the passed in URL There are other ways to
    * implement this that could be quicker This solution is used here because it is
    * easy to follow
    * @param {string} url url to add params.
    * @param {Object} params object representing params to be added.
    * @return {string} encoded string url.
    */
    value: function addParametersToUrl(url, params) {

      for (var p in params) {
        var param = p + '=' + encodeURIComponent(params[p]);

        var sep = '&';
        if (url.indexOf('?') < 0) {
          sep = '?';
        } else {
          var lastChar = url.slice(-1);
          if (lastChar == '&') sep = '';
          if (lastChar == '?') sep = '';
        }
        url += sep + param;
      }
      return url;
    }
  }, {
    key: 'getSearchParameterByName',

    /**
    * Gets a parameter value from the passed in URL There are other ways to
    * implement this that could be quicker This solution is used here because it is
    * easy to follow
    * @param {string} name request parameter name.
    * @param {string} search (this can be obtained from window.location.search).
    * @return {?string} request parameter value.
    */
    value: function getSearchParameterByName(name, search) {

      if (typeof name !== 'string') {
        throw new Error('gcmBridge.getSearchParameterByName: Invalid argument name - not a string');
      }
      if (typeof search !== 'string') {
        throw new Error('gcmBridge.getSearchParameterByName: Invalid argument search - not a string');
      }

      /** @type {RegExp} */
      var pattern;
      /** @type {Array} */
      var match;
      pattern = new RegExp('[?&]' + name + '=([^&]*)');
      match = pattern.exec(search);

      if (match && match.length > 1) return decodeURIComponent(match[1].replace(/\+/g, ' '));else return null;
    }
  }, {
    key: 'updateSearchParameterByName',

    /**
    * Update a parameter value from the passed in URL. <br>
    * @param {string} name request parameter name.
    * @param {string} newValue thenew value for request parameter.
    * @param {string} url (this can be obtained from window.location.href).
    * @return {?string} The new url with updated request parameter.
    */
    value: function updateSearchParameterByName(name, newValue, url) {
      var originalValue = UrlUtil.getSearchParameterByName(name, url);
      var newURL = url;
      if (originalValue) {
        newURL = url.replace(name + '=' + originalValue, name + '=' + newValue);
      }
      return newURL;
    }
  }, {
    key: 'getGCMParams',

    /**
     * This function returns a object of gcm params. <br>
     * For getting the gcm parameter's values, first gcmParams parameter's value will be
     * fetched from URL using UrlUtil.getSearchParameterByName function. The example of gcmParams variable
     * is detailed below : <br>
     * gcmParams=gcmPlayMode%3Dreal|   <br>
     *           gcmChannel%3DI| <br>
     *           gcmGameName%3Dgcm-example-game| <br>
     *           gcmCommonUIURL%3D%2Fgcm-tests%2Fgcm-example-commonui%2Fcommonui.html   <br>
     * The returned gcmParams variable is passed in this function to extract gcm parameters and its values.  <br>
     * All the extracted items will stored in array object as gcmParamsObject.
     * @param {string} gcmParams gcmParams value as string.
     * @return {Object} gcmParamsObject Object contains decoded gcm Parameters and its values. <br>
     *                                  the indices of values are removed 'gcm' prefix. <br>
     *                                  e.g. 'gcmGameName' will become 'gameName' as index in the returned object.
     */
    value: function getGCMParams(gcmParams) {
      var gcmParamsObject = {};
      if (gcmParams != null) {
        var extractedGCMParams = decodeURIComponent(gcmParams).split('|');
        var i = 0;
        for (i = 0; i < extractedGCMParams.length; i++) {
          var gcmParameter = extractedGCMParams[i].split('=');
          var gcmParameterKey = gcmParameter[0];
          gcmParameterKey = gcmParameterKey.replace('gcm', '');
          gcmParameterKey = gcmParameterKey.charAt(0).toLowerCase() + gcmParameterKey.slice(1);
          gcmParamsObject[gcmParameterKey] = gcmParameter[1];
        }
      }
      return gcmParamsObject;
    }
  }, {
    key: 'updateGCMParams',

    /**
    * This function updates the parameter value in gcmParams request parameter
    * @param {string} name request parameter name.
    * @param {string} newValue the new value for request parameter.
    * @param {string} url (this can be obtained from window.location.href).
    * @return {?string} The new url with updated request parameter.
    * This function will be called only when gcmParams request parameter needs
    * to be updated.
    * For example changing the gcmPlayMode from "demo" to "real.
    */
    value: function updateGCMParams(name, newValue, url) {
      var originalValue = '';

      var gcmParamsObject = new Array();
      var gcmParams = UrlUtil.getSearchParameterByName('gcmParams', url);
      if (gcmParams != null) {
        gcmParamsObject = UrlUtil.getGCMParams(gcmParams);
        var gcmParameterKey = name.replace('gcm', '');
        gcmParameterKey = gcmParameterKey.charAt(0).toLowerCase() + gcmParameterKey.slice(1);
        originalValue = gcmParamsObject[gcmParameterKey];
      }
      var newURL = url;
      if (originalValue) {
        newURL = url.replace(name + '%3D' + originalValue, name + '%3D' + newValue);
      }
      return newURL;
    }
  }, {
    key: 'getUrlParams',

    /**
    * This function is used to expose gcm param values to commonUI/Game. <br>
    * As soon as gcm.js is loaded during game loading phase, commonUI or Game can call this function to get gameplay information
    * such playMode, gameName, channel etc without having to wait for configReady() call from GCM.
    * CommonUI no longer needs to read this information from url passed by Game and Game no longer has to worry about passing
    * these params to CommonUI.
    * Currently this function provides all the parameters available in gcmParams object. This can be extended to included
    * any other url params.
    * gcmParams=gcmPlayMode%3Dreal|   <br>
    *           gcmChannel%3DI| <br>
    *           gcmGameName%3Dgcm-example-game| <br>
    *           gcmCommonUIURL%3D%2Fgcm-tests%2Fgcm-example-commonui%2Fcommonui.html   <br>
    * @return {Object} urlParamsObject Object contains params like playMode, gameName etc
    */
    value: function getUrlParams() {

      var urlParamsObject = {};
      var gcmParams = UrlUtil.getSearchParameterByName('gcmParams', window.parent.location.href);
      if (gcmParams) {
        urlParamsObject = UrlUtil.getGCMParams(gcmParams);
      } else {
        // In case we do not have gcmParams in game window url, we should search for the params in commonUI window url.
        // These data items are added to commonUI url from OpenBet gcmBridge.
        urlParamsObject['gameName'] = UrlUtil.getSearchParameterByName('gameName', window.location.search);
        urlParamsObject['playMode'] = UrlUtil.getSearchParameterByName('playMode', window.location.search);
        urlParamsObject['channel'] = UrlUtil.getSearchParameterByName('channel', window.location.search);
      }
      return urlParamsObject;
    }
  }, {
    key: 'getLaunchParamsObj',
    value: function getLaunchParamsObj(pgParams) {
      var gcmParamsObject = {};
      if (pgParams != null) {
        var extractedGCMParams = decodeURIComponent(pgParams).split('&');
        var i = 0;
        for (i = 0; i < extractedGCMParams.length; i++) {
          var gcmParameter = extractedGCMParams[i].split('=');
          var gcmParameterKey = gcmParameter[0];
          gcmParameterKey = gcmParameterKey.charAt(0).toLowerCase() + gcmParameterKey.slice(1);
          gcmParamsObject[gcmParameterKey] = gcmParameter[1];
        }
      }
      return gcmParamsObject;
    }
  }, {
    key: 'checkURIIsRelative',

    /**
     * checks if the uri paramater is a relative URI
     * This function protects us from
     * the potential security risk of rendering absolute url content that has been
     * specified as a request param
     * Note that not all relative URIs are allowed, but we do reject absolute URIs and
     * network-path references.
     * @param {string} url the URL to check.
     * @return {boolean} is this a relative url.
    */
    value: function checkURIIsRelative(url) {

      if (typeof url !== 'string') {
        throw new Error('UrlUtil.checkURIIsRelative: Invalid argument url - not a string');
      }

      // firstly we check that the URI doesn't start with either "<protocol>://" or
      // "//"
      // these would signify an absolute URI or a network-path reference, both of
      // which
      // would allow content from another domain.
      // anything else should be a URI requesting content from the same domain
      // note that www.google.com is not an absolute URI.  if you use 'www.google.com' as a link
      // from a page at http://www.openbet.com/games then the link will go to
      // http://www.openbet.com/games/www.google.com
      // also note that //www.google.com is a network-path reference.  If you use '//www.google.com'
      // as a link from a page at http://www.openbet.com/games then it will go to
      // http://www.google.com
      // more details can be found at http://tools.ietf.org/html/rfc3986

      if (/^([a-z0-9+.-]+):\/\//.test(url)) {
        return false;
      }

      if (/^\/\//.test(url)) {
        return false;
      }

      //we allow alphanumeric, "/", "_", "-", "." only
      //this is more restrictive than the full set of allowed URIs but we don't want to allow
      //features like request parameters etc. through at this stage
      return (/^[a-zA-Z0-9\/\.\-_]*$/.test(url)
      );
    }
  }, {
    key: 'getAllParams',
    value: function getAllParams(strUrl, isDesktop) {
      var keyPairs = [];
      var params = null;

      if (isDesktop) {
        //passed in from launcher, window.location.search (query string portion of the URL)
        params = strUrl.substring(1).split('&');
      } else {
        // passed in from game init() (full URL with domain and "?")
        params = strUrl.slice(strUrl.indexOf('?') + 1).split('&');
      }

      for (var i = params.length - 1; i >= 0; i--) {
        var nameValPair = params[i].split('=');
        keyPairs.push(nameValPair);
      };

      return keyPairs;
    }
  }]);

  return UrlUtil;
}();

/**
 * Create and export singleton
 */

var instance = new UrlUtil();
exports.default = instance;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameSparksHandler = undefined;

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _GameSparksExtend = __webpack_require__(33);

var _GameSparksExtend2 = _interopRequireDefault(_GameSparksExtend);

var _GameSparksEvents = __webpack_require__(100);

var _GameSparksEvents2 = _interopRequireDefault(_GameSparksEvents);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * @class
 * This GameSparksHandler is a singleton class.

 * This class manages GameSparks Actions.
 *
 * @constructor
 */
var GameSparksHandler = exports.GameSparksHandler = function () {
  function GameSparksHandler() {
    _classCallCheck(this, GameSparksHandler);

    //console.log('in gs handler constructor +');
    this.gameSparks = new _GameSparksExtend2.default();

    this.gameSparksEvents = new _GameSparksEvents2.default();

    this.gcmOrigin = null;
  }

  /**
   * Initialize gamesparks by providing a config. There are two modes to initialize gamesparks the preview and the live.
   * The live should be used only for production.
   *
   * @param {Object} ogsParams These are the standard list of parameters that OGS passes to game providers.
   * @param {Object} notificationHandler_ The notification handler Object.
   * @param {Object} opGsConfig The operetor's gamesparks configuration.
   */

  _createClass(GameSparksHandler, [{
    key: 'init',
    value: function init(gcmRef, ogsParams, notificationHandler_, widgetNotificationHandlers, opGsConfig) {

      this.gcmOrigin = gcmRef.launcherOrigin;

      console.log('GameSparks initialization.');

      this.gameSparksEvents.setNotificationHandle(notificationHandler_);

      if (widgetNotificationHandlers.challengeNotificationHandler) this.gameSparksEvents.setChallengesNotificationHandler(widgetNotificationHandlers.challengeNotificationHandler);

      var gsConfig = this.buildGamesparksConfig(opGsConfig);

      if (typeof opGsConfig.mode !== 'undefined' && opGsConfig.mode === 'live') this.gameSparks.initLive(gsConfig);else this.gameSparks.initPreview(gsConfig);

      this.gameSparksEvents.setGameName(ogsParams.ogsgameid);
      this.gameSparksEvents.setGameSparks(this.gameSparks);
      this.gameSparksEvents.setOgsParams(ogsParams);
      this.gameSparksEvents.setOpConfig(opGsConfig);
    }
  }, {
    key: 'onChallengePlayerAction',
    value: function onChallengePlayerAction(action) {
      this.gameSparksEvents.onChallengePlayerAction(action);
    }
  }, {
    key: 'onMissionPlayerAction',
    value: function onMissionPlayerAction(action) {
      this.gameSparksEvents.onMissionPlayerAction(action);
    }
  }, {
    key: 'onGetServerTime',
    value: function onGetServerTime() {
      this.gameSparksEvents.onGetServerTime();
    }

    /**
     * Initialize gamesparks by providing a config. There are two modes to initialize gamesparks the preview and the live.
     * The live should be used only for production.
     *
     * @param {Object} opGsConfig The operetor's gamesparks configuration.
     * @return {Object} Returns the gamesparks configuration.
     */

  }, {
    key: 'buildGamesparksConfig',
    value: function buildGamesparksConfig(opGsConfig) {
      var gsConfig = {
        key: opGsConfig.apiKey,
        onNonce: this.gameSparksEvents.onNonce.bind(this.gameSparksEvents),
        onInit: this.gameSparksEvents.onInit.bind(this.gameSparksEvents),
        onMessage: this.gameSparksEvents.onMessage.bind(this.gameSparksEvents),
        logger: console.log
      };
      return gsConfig;
    }
  }]);

  return GameSparksHandler;
}();

/**
 * Create and export singleton
 */

var instance = new GameSparksHandler();
exports.default = instance;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
	return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
	return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

/* global define, module, require */
(function (root, factory) {
	if (true) {
		// AMD. Register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(34), __webpack_require__(99)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
		// Node. Export.
		module.exports = factory(require('crypto-js'), require('ws'));
	} else {
		// Browser globals (root is window)
		root.GameSparks = factory(root.CryptoJS, root.WebSocket || root.MozWebSocket);
	}
})(undefined, function (CryptoJS, WebSocket) {

	var GameSparks = function GameSparks() {};

	GameSparks.prototype = {

		init: function init(options) {
			this.options = options;
			this.socketUrl = options.url;

			this.pendingRequests = {};
			this.requestCounter = 0;

			this.connect();
		},

		buildServiceUrl: function buildServiceUrl(live, options) {
			var stage;
			var urlAddition = options.key;
			var credential;
			var index;

			if (live) {
				stage = "live";
			} else {
				stage = "preview";
			}

			if (!options.credential || options.credential.length === 0) {
				credential = "device";
			} else {
				credential = options.credential;
			}

			if (options.secret) {
				index = options.secret.indexOf(":");
				if (index > 0) {
					credential = "secure";

					urlAddition = options.secret.substr(0, index) + "/" + urlAddition;
				}
			}

			return "wss://" + stage + "-" + urlAddition + ".ws.gamesparks.net/ws/" + credential + "/" + urlAddition;
		},

		initPreview: function initPreview(options) {
			options.url = this.buildServiceUrl(false, options);
			this.init(options);
		},

		initLive: function initLive(options) {
			options.url = this.buildServiceUrl(true, options);
			this.init(options);
		},

		reset: function reset() {
			this.initialised = false;
			this.connected = false;
			this.error = false;
			this.disconnected = false;

			if (this.webSocket != null) {
				this.webSocket.onclose = null;
				this.webSocket.close();
			}
		},

		connect: function connect() {
			this.reset();

			try {
				this.webSocket = new WebSocket(this.socketUrl);
				this.webSocket.onopen = this.onWebSocketOpen.bind(this);
				this.webSocket.onclose = this.onWebSocketClose.bind(this);
				this.webSocket.onerror = this.onWebSocketError.bind(this);
				this.webSocket.onmessage = this.onWebSocketMessage.bind(this);
			} catch (e) {
				this.log(e.message);
			}
		},

		disconnect: function disconnect() {
			if (this.webSocket && this.connected) {
				this.disconnected = true;
				this.webSocket.close();
			}
		},

		onWebSocketOpen: function onWebSocketOpen(ev) {
			this.log('WebSocket onOpen');

			if (this.options.onOpen) {
				this.options.onOpen(ev);
			}

			this.connected = true;
		},

		onWebSocketClose: function onWebSocketClose(ev) {
			this.log('WebSocket onClose');

			if (this.options.onClose) {
				this.options.onClose(ev);
			}

			this.connected = false;

			// Attemp a re-connection if not in error state or deliberately disconnected.
			if (!this.error && !this.disconnected) {
				this.connect();
			}
		},

		onWebSocketError: function onWebSocketError(ev) {

			this.log('WebSocket onError: Sorry, but there is some problem with your socket or the server is down');

			if (this.options.onError) {
				this.options.onError(ev);
			}

			// Reset the socketUrl to the original.
			this.socketUrl = this.options.url;

			this.error = true;
		},

		onWebSocketMessage: function onWebSocketMessage(message) {
			this.log('WebSocket onMessage: ' + message.data);

			var result;
			try {
				result = JSON.parse(message.data);
			} catch (e) {
				this.log('An error ocurred while parsing the JSON Data: ' + message + '; Error: ' + e);
				return;
			}

			if (this.options.onMessage) {
				this.options.onMessage(result);
			}

			// Extract any auth token.
			if (result['authToken']) {
				this.authToken = result['authToken'];
				delete result['authToken'];
			}

			if (result['connectUrl']) {
				// Any time a connectUrl is in the response we should update and reconnect.
				this.socketUrl = result['connectUrl'];
				this.connect();
			}

			var resultType = result['@class'];

			if (resultType === '.AuthenticatedConnectResponse') {
				this.handshake(result);
			} else if (resultType.match(/Response$/)) {
				if (result['requestId']) {
					var requestId = result['requestId'];
					delete result['requestId'];

					if (this.pendingRequests[requestId]) {
						this.pendingRequests[requestId](result);
						this.pendingRequests[requestId] = null;
					}
				}
			}
		},

		handshake: function handshake(result) {

			if (result['nonce']) {

				var hmac;

				if (this.options.onNonce) {
					hmac = this.options.onNonce(result['nonce']);
				} else if (this.options.secret) {
					hmac = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(result['nonce'], this.options.secret));
				}

				var toSend = {
					'@class': '.AuthenticatedConnectRequest',
					hmac: hmac
				};

				if (this.authToken) {
					toSend.authToken = this.authToken;
				}

				if (this.sessionId) {
					toSend.sessionId = this.sessionId;
				}

				var browserData = this.getBrowserData();
				toSend.platform = browserData.browser;
				toSend.os = browserData.operatingSystem;

				this.webSocketSend(toSend);
			} else if (result['sessionId']) {
				this.sessionId = result['sessionId'];
				this.initialised = true;

				if (this.options.onInit) {
					this.options.onInit();
				}

				this.keepAliveInterval = window.setInterval(this.keepAlive.bind(this), 30000);
			}
		},

		keepAlive: function keepAlive() {
			if (this.initialised && this.connected) {
				this.webSocket.send(' ');
			}
		},

		send: function send(requestType, onResponse) {
			this.sendWithData(requestType, {}, onResponse);
		},

		sendWithData: function sendWithData(requestType, json, onResponse) {
			if (!this.initialised) {
				onResponse({ error: 'NOT_INITIALISED' });
				return;
			}

			// Ensure requestType starts with a dot.
			if (requestType.indexOf('.') !== 0) {
				requestType = '.' + requestType;
			}

			json['@class'] = requestType;

			json.requestId = new Date().getTime() + "_" + ++this.requestCounter;

			if (onResponse != null) {
				this.pendingRequests[json.requestId] = onResponse;
				// Time out handler.
				setTimeout(function () {
					if (this.pendingRequests[json.requestId]) {
						this.pendingRequests[json.requestId]({ error: 'NO_RESPONSE' });
					}
				}.bind(this), 32000);
			}

			this.webSocketSend(json);
		},

		webSocketSend: function webSocketSend(data) {

			if (this.options.onSend) {
				this.options.onSend(data);
			}

			var requestString = JSON.stringify(data);
			this.log('WebSocket send: ' + requestString);
			this.webSocket.send(requestString);
		},

		getSocketUrl: function getSocketUrl() {
			return this.socketUrl;
		},

		getSessionId: function getSessionId() {
			return this.sessionId;
		},

		getAuthToken: function getAuthToken() {
			return this.authToken;
		},

		setAuthToken: function setAuthToken(authToken) {
			this.authToken = authToken;
		},

		isConnected: function isConnected() {
			return this.connected;
		},

		log: function log(message) {
			if (this.options.logger) {
				this.options.logger(message);
			}
		},

		getBrowserData: function getBrowserData() {

			var browsers = [{
				string: navigator.userAgent,
				subString: 'Chrome',
				identity: 'Chrome'
			}, { string: navigator.userAgent,
				subString: 'OmniWeb',
				versionSearch: 'OmniWeb/',
				identity: 'OmniWeb'
			}, {
				string: navigator.vendor,
				subString: 'Apple',
				identity: 'Safari',
				versionSearch: 'Version'
			}, {
				prop: window.opera,
				identity: 'Opera',
				versionSearch: 'Version'
			}, {
				string: navigator.vendor,
				subString: 'iCab',
				identity: 'iCab'
			}, {
				string: navigator.vendor,
				subString: 'KDE',
				identity: 'Konqueror'
			}, {
				string: navigator.userAgent,
				subString: 'Firefox',
				identity: 'Firefox'
			}, {
				string: navigator.vendor,
				subString: 'Camino',
				identity: 'Camino'
			}, {
				string: navigator.userAgent,
				subString: 'Netscape',
				identity: 'Netscape'
			}, {
				string: navigator.userAgent,
				subString: 'MSIE',
				identity: 'Explorer',
				versionSearch: 'MSIE'
			}, {
				string: navigator.userAgent,
				subString: 'Gecko',
				identity: 'Mozilla',
				versionSearch: 'rv'
			}, {
				string: navigator.userAgent,
				subString: 'Mozilla',
				identity: 'Netscape',
				versionSearch: 'Mozilla'
			}];

			var operatingSystems = [{
				string: navigator.platform,
				subString: 'Win',
				identity: 'Windows'
			}, {
				string: navigator.platform,
				subString: 'Mac',
				identity: 'Mac'
			}, {
				string: navigator.userAgent,
				subString: 'iPhone',
				identity: 'iPhone/iPod'
			}, {
				string: navigator.platform,
				subString: 'Linux',
				identity: 'Linux'
			}];

			function searchForIdentity(data) {
				for (var i = 0; i < data.length; i++) {
					var string = data[i].string;
					var prop = data[i].prop;

					if (string) {
						// Look for the sub string in the string.
						if (string.indexOf(data[i].subString) !== -1) {
							return data[i].identity;
						}
					} else if (prop) {
						return data[i].identity;
					}
				}
			}

			return {
				browser: searchForIdentity(browsers),
				operatingSystem: searchForIdentity(operatingSystems)
			};
		}
	};

	return GameSparks;
});

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Check if typed arrays are supported
	    if (typeof ArrayBuffer != 'function') {
	        return;
	    }

	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;

	    // Reference original init
	    var superInit = WordArray.init;

	    // Augment WordArray.init to handle typed arrays
	    var subInit = WordArray.init = function (typedArray) {
	        // Convert buffers to uint8
	        if (typedArray instanceof ArrayBuffer) {
	            typedArray = new Uint8Array(typedArray);
	        }

	        // Convert other array views to uint8
	        if (
	            typedArray instanceof Int8Array ||
	            (typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray) ||
	            typedArray instanceof Int16Array ||
	            typedArray instanceof Uint16Array ||
	            typedArray instanceof Int32Array ||
	            typedArray instanceof Uint32Array ||
	            typedArray instanceof Float32Array ||
	            typedArray instanceof Float64Array
	        ) {
	            typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
	        }

	        // Handle Uint8Array
	        if (typedArray instanceof Uint8Array) {
	            // Shortcut
	            var typedArrayByteLength = typedArray.byteLength;

	            // Extract bytes
	            var words = [];
	            for (var i = 0; i < typedArrayByteLength; i++) {
	                words[i >>> 2] |= typedArray[i] << (24 - (i % 4) * 8);
	            }

	            // Initialize this word array
	            superInit.call(this, words, typedArrayByteLength);
	        } else {
	            // Else call normal init
	            superInit.apply(this, arguments);
	        }
	    };

	    subInit.prototype = WordArray;
	}());


	return CryptoJS.lib.WordArray;

}));

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var C_enc = C.enc;

	    /**
	     * UTF-16 BE encoding strategy.
	     */
	    var Utf16BE = C_enc.Utf16 = C_enc.Utf16BE = {
	        /**
	         * Converts a word array to a UTF-16 BE string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-16 BE string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf16String = CryptoJS.enc.Utf16.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var utf16Chars = [];
	            for (var i = 0; i < sigBytes; i += 2) {
	                var codePoint = (words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff;
	                utf16Chars.push(String.fromCharCode(codePoint));
	            }

	            return utf16Chars.join('');
	        },

	        /**
	         * Converts a UTF-16 BE string to a word array.
	         *
	         * @param {string} utf16Str The UTF-16 BE string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf16.parse(utf16String);
	         */
	        parse: function (utf16Str) {
	            // Shortcut
	            var utf16StrLength = utf16Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < utf16StrLength; i++) {
	                words[i >>> 1] |= utf16Str.charCodeAt(i) << (16 - (i % 2) * 16);
	            }

	            return WordArray.create(words, utf16StrLength * 2);
	        }
	    };

	    /**
	     * UTF-16 LE encoding strategy.
	     */
	    C_enc.Utf16LE = {
	        /**
	         * Converts a word array to a UTF-16 LE string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-16 LE string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf16Str = CryptoJS.enc.Utf16LE.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var utf16Chars = [];
	            for (var i = 0; i < sigBytes; i += 2) {
	                var codePoint = swapEndian((words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff);
	                utf16Chars.push(String.fromCharCode(codePoint));
	            }

	            return utf16Chars.join('');
	        },

	        /**
	         * Converts a UTF-16 LE string to a word array.
	         *
	         * @param {string} utf16Str The UTF-16 LE string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf16LE.parse(utf16Str);
	         */
	        parse: function (utf16Str) {
	            // Shortcut
	            var utf16StrLength = utf16Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < utf16StrLength; i++) {
	                words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << (16 - (i % 2) * 16));
	            }

	            return WordArray.create(words, utf16StrLength * 2);
	        }
	    };

	    function swapEndian(word) {
	        return ((word << 8) & 0xff00ff00) | ((word >>> 8) & 0x00ff00ff);
	    }
	}());


	return CryptoJS.enc.Utf16;

}));

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0), __webpack_require__(35));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./sha256"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var C_algo = C.algo;
	    var SHA256 = C_algo.SHA256;

	    /**
	     * SHA-224 hash algorithm.
	     */
	    var SHA224 = C_algo.SHA224 = SHA256.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init([
	                0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
	                0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4
	            ]);
	        },

	        _doFinalize: function () {
	            var hash = SHA256._doFinalize.call(this);

	            hash.sigBytes -= 4;

	            return hash;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA224('message');
	     *     var hash = CryptoJS.SHA224(wordArray);
	     */
	    C.SHA224 = SHA256._createHelper(SHA224);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA224(message, key);
	     */
	    C.HmacSHA224 = SHA256._createHmacHelper(SHA224);
	}());


	return CryptoJS.SHA224;

}));

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0), __webpack_require__(13), __webpack_require__(36));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./x64-core", "./sha512"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_x64 = C.x64;
	    var X64Word = C_x64.Word;
	    var X64WordArray = C_x64.WordArray;
	    var C_algo = C.algo;
	    var SHA512 = C_algo.SHA512;

	    /**
	     * SHA-384 hash algorithm.
	     */
	    var SHA384 = C_algo.SHA384 = SHA512.extend({
	        _doReset: function () {
	            this._hash = new X64WordArray.init([
	                new X64Word.init(0xcbbb9d5d, 0xc1059ed8), new X64Word.init(0x629a292a, 0x367cd507),
	                new X64Word.init(0x9159015a, 0x3070dd17), new X64Word.init(0x152fecd8, 0xf70e5939),
	                new X64Word.init(0x67332667, 0xffc00b31), new X64Word.init(0x8eb44a87, 0x68581511),
	                new X64Word.init(0xdb0c2e0d, 0x64f98fa7), new X64Word.init(0x47b5481d, 0xbefa4fa4)
	            ]);
	        },

	        _doFinalize: function () {
	            var hash = SHA512._doFinalize.call(this);

	            hash.sigBytes -= 16;

	            return hash;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA384('message');
	     *     var hash = CryptoJS.SHA384(wordArray);
	     */
	    C.SHA384 = SHA512._createHelper(SHA384);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA384(message, key);
	     */
	    C.HmacSHA384 = SHA512._createHmacHelper(SHA384);
	}());


	return CryptoJS.SHA384;

}));

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0), __webpack_require__(13));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./x64-core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_x64 = C.x64;
	    var X64Word = C_x64.Word;
	    var C_algo = C.algo;

	    // Constants tables
	    var RHO_OFFSETS = [];
	    var PI_INDEXES  = [];
	    var ROUND_CONSTANTS = [];

	    // Compute Constants
	    (function () {
	        // Compute rho offset constants
	        var x = 1, y = 0;
	        for (var t = 0; t < 24; t++) {
	            RHO_OFFSETS[x + 5 * y] = ((t + 1) * (t + 2) / 2) % 64;

	            var newX = y % 5;
	            var newY = (2 * x + 3 * y) % 5;
	            x = newX;
	            y = newY;
	        }

	        // Compute pi index constants
	        for (var x = 0; x < 5; x++) {
	            for (var y = 0; y < 5; y++) {
	                PI_INDEXES[x + 5 * y] = y + ((2 * x + 3 * y) % 5) * 5;
	            }
	        }

	        // Compute round constants
	        var LFSR = 0x01;
	        for (var i = 0; i < 24; i++) {
	            var roundConstantMsw = 0;
	            var roundConstantLsw = 0;

	            for (var j = 0; j < 7; j++) {
	                if (LFSR & 0x01) {
	                    var bitPosition = (1 << j) - 1;
	                    if (bitPosition < 32) {
	                        roundConstantLsw ^= 1 << bitPosition;
	                    } else /* if (bitPosition >= 32) */ {
	                        roundConstantMsw ^= 1 << (bitPosition - 32);
	                    }
	                }

	                // Compute next LFSR
	                if (LFSR & 0x80) {
	                    // Primitive polynomial over GF(2): x^8 + x^6 + x^5 + x^4 + 1
	                    LFSR = (LFSR << 1) ^ 0x71;
	                } else {
	                    LFSR <<= 1;
	                }
	            }

	            ROUND_CONSTANTS[i] = X64Word.create(roundConstantMsw, roundConstantLsw);
	        }
	    }());

	    // Reusable objects for temporary values
	    var T = [];
	    (function () {
	        for (var i = 0; i < 25; i++) {
	            T[i] = X64Word.create();
	        }
	    }());

	    /**
	     * SHA-3 hash algorithm.
	     */
	    var SHA3 = C_algo.SHA3 = Hasher.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {number} outputLength
	         *   The desired number of bits in the output hash.
	         *   Only values permitted are: 224, 256, 384, 512.
	         *   Default: 512
	         */
	        cfg: Hasher.cfg.extend({
	            outputLength: 512
	        }),

	        _doReset: function () {
	            var state = this._state = []
	            for (var i = 0; i < 25; i++) {
	                state[i] = new X64Word.init();
	            }

	            this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcuts
	            var state = this._state;
	            var nBlockSizeLanes = this.blockSize / 2;

	            // Absorb
	            for (var i = 0; i < nBlockSizeLanes; i++) {
	                // Shortcuts
	                var M2i  = M[offset + 2 * i];
	                var M2i1 = M[offset + 2 * i + 1];

	                // Swap endian
	                M2i = (
	                    (((M2i << 8)  | (M2i >>> 24)) & 0x00ff00ff) |
	                    (((M2i << 24) | (M2i >>> 8))  & 0xff00ff00)
	                );
	                M2i1 = (
	                    (((M2i1 << 8)  | (M2i1 >>> 24)) & 0x00ff00ff) |
	                    (((M2i1 << 24) | (M2i1 >>> 8))  & 0xff00ff00)
	                );

	                // Absorb message into state
	                var lane = state[i];
	                lane.high ^= M2i1;
	                lane.low  ^= M2i;
	            }

	            // Rounds
	            for (var round = 0; round < 24; round++) {
	                // Theta
	                for (var x = 0; x < 5; x++) {
	                    // Mix column lanes
	                    var tMsw = 0, tLsw = 0;
	                    for (var y = 0; y < 5; y++) {
	                        var lane = state[x + 5 * y];
	                        tMsw ^= lane.high;
	                        tLsw ^= lane.low;
	                    }

	                    // Temporary values
	                    var Tx = T[x];
	                    Tx.high = tMsw;
	                    Tx.low  = tLsw;
	                }
	                for (var x = 0; x < 5; x++) {
	                    // Shortcuts
	                    var Tx4 = T[(x + 4) % 5];
	                    var Tx1 = T[(x + 1) % 5];
	                    var Tx1Msw = Tx1.high;
	                    var Tx1Lsw = Tx1.low;

	                    // Mix surrounding columns
	                    var tMsw = Tx4.high ^ ((Tx1Msw << 1) | (Tx1Lsw >>> 31));
	                    var tLsw = Tx4.low  ^ ((Tx1Lsw << 1) | (Tx1Msw >>> 31));
	                    for (var y = 0; y < 5; y++) {
	                        var lane = state[x + 5 * y];
	                        lane.high ^= tMsw;
	                        lane.low  ^= tLsw;
	                    }
	                }

	                // Rho Pi
	                for (var laneIndex = 1; laneIndex < 25; laneIndex++) {
	                    // Shortcuts
	                    var lane = state[laneIndex];
	                    var laneMsw = lane.high;
	                    var laneLsw = lane.low;
	                    var rhoOffset = RHO_OFFSETS[laneIndex];

	                    // Rotate lanes
	                    if (rhoOffset < 32) {
	                        var tMsw = (laneMsw << rhoOffset) | (laneLsw >>> (32 - rhoOffset));
	                        var tLsw = (laneLsw << rhoOffset) | (laneMsw >>> (32 - rhoOffset));
	                    } else /* if (rhoOffset >= 32) */ {
	                        var tMsw = (laneLsw << (rhoOffset - 32)) | (laneMsw >>> (64 - rhoOffset));
	                        var tLsw = (laneMsw << (rhoOffset - 32)) | (laneLsw >>> (64 - rhoOffset));
	                    }

	                    // Transpose lanes
	                    var TPiLane = T[PI_INDEXES[laneIndex]];
	                    TPiLane.high = tMsw;
	                    TPiLane.low  = tLsw;
	                }

	                // Rho pi at x = y = 0
	                var T0 = T[0];
	                var state0 = state[0];
	                T0.high = state0.high;
	                T0.low  = state0.low;

	                // Chi
	                for (var x = 0; x < 5; x++) {
	                    for (var y = 0; y < 5; y++) {
	                        // Shortcuts
	                        var laneIndex = x + 5 * y;
	                        var lane = state[laneIndex];
	                        var TLane = T[laneIndex];
	                        var Tx1Lane = T[((x + 1) % 5) + 5 * y];
	                        var Tx2Lane = T[((x + 2) % 5) + 5 * y];

	                        // Mix rows
	                        lane.high = TLane.high ^ (~Tx1Lane.high & Tx2Lane.high);
	                        lane.low  = TLane.low  ^ (~Tx1Lane.low  & Tx2Lane.low);
	                    }
	                }

	                // Iota
	                var lane = state[0];
	                var roundConstant = ROUND_CONSTANTS[round];
	                lane.high ^= roundConstant.high;
	                lane.low  ^= roundConstant.low;;
	            }
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;
	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;
	            var blockSizeBits = this.blockSize * 32;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x1 << (24 - nBitsLeft % 32);
	            dataWords[((Math.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits) >>> 5) - 1] |= 0x80;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Shortcuts
	            var state = this._state;
	            var outputLengthBytes = this.cfg.outputLength / 8;
	            var outputLengthLanes = outputLengthBytes / 8;

	            // Squeeze
	            var hashWords = [];
	            for (var i = 0; i < outputLengthLanes; i++) {
	                // Shortcuts
	                var lane = state[i];
	                var laneMsw = lane.high;
	                var laneLsw = lane.low;

	                // Swap endian
	                laneMsw = (
	                    (((laneMsw << 8)  | (laneMsw >>> 24)) & 0x00ff00ff) |
	                    (((laneMsw << 24) | (laneMsw >>> 8))  & 0xff00ff00)
	                );
	                laneLsw = (
	                    (((laneLsw << 8)  | (laneLsw >>> 24)) & 0x00ff00ff) |
	                    (((laneLsw << 24) | (laneLsw >>> 8))  & 0xff00ff00)
	                );

	                // Squeeze state to retrieve hash
	                hashWords.push(laneLsw);
	                hashWords.push(laneMsw);
	            }

	            // Return final computed hash
	            return new WordArray.init(hashWords, outputLengthBytes);
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);

	            var state = clone._state = this._state.slice(0);
	            for (var i = 0; i < 25; i++) {
	                state[i] = state[i].clone();
	            }

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA3('message');
	     *     var hash = CryptoJS.SHA3(wordArray);
	     */
	    C.SHA3 = Hasher._createHelper(SHA3);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA3(message, key);
	     */
	    C.HmacSHA3 = Hasher._createHmacHelper(SHA3);
	}(Math));


	return CryptoJS.SHA3;

}));

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	/** @preserve
	(c) 2012 by Cédric Mesnil. All rights reserved.

	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

	    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Constants table
	    var _zl = WordArray.create([
	        0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15,
	        7,  4, 13,  1, 10,  6, 15,  3, 12,  0,  9,  5,  2, 14, 11,  8,
	        3, 10, 14,  4,  9, 15,  8,  1,  2,  7,  0,  6, 13, 11,  5, 12,
	        1,  9, 11, 10,  0,  8, 12,  4, 13,  3,  7, 15, 14,  5,  6,  2,
	        4,  0,  5,  9,  7, 12,  2, 10, 14,  1,  3,  8, 11,  6, 15, 13]);
	    var _zr = WordArray.create([
	        5, 14,  7,  0,  9,  2, 11,  4, 13,  6, 15,  8,  1, 10,  3, 12,
	        6, 11,  3,  7,  0, 13,  5, 10, 14, 15,  8, 12,  4,  9,  1,  2,
	        15,  5,  1,  3,  7, 14,  6,  9, 11,  8, 12,  2, 10,  0,  4, 13,
	        8,  6,  4,  1,  3, 11, 15,  0,  5, 12,  2, 13,  9,  7, 10, 14,
	        12, 15, 10,  4,  1,  5,  8,  7,  6,  2, 13, 14,  0,  3,  9, 11]);
	    var _sl = WordArray.create([
	         11, 14, 15, 12,  5,  8,  7,  9, 11, 13, 14, 15,  6,  7,  9,  8,
	        7, 6,   8, 13, 11,  9,  7, 15,  7, 12, 15,  9, 11,  7, 13, 12,
	        11, 13,  6,  7, 14,  9, 13, 15, 14,  8, 13,  6,  5, 12,  7,  5,
	          11, 12, 14, 15, 14, 15,  9,  8,  9, 14,  5,  6,  8,  6,  5, 12,
	        9, 15,  5, 11,  6,  8, 13, 12,  5, 12, 13, 14, 11,  8,  5,  6 ]);
	    var _sr = WordArray.create([
	        8,  9,  9, 11, 13, 15, 15,  5,  7,  7,  8, 11, 14, 14, 12,  6,
	        9, 13, 15,  7, 12,  8,  9, 11,  7,  7, 12,  7,  6, 15, 13, 11,
	        9,  7, 15, 11,  8,  6,  6, 14, 12, 13,  5, 14, 13, 13,  7,  5,
	        15,  5,  8, 11, 14, 14,  6, 14,  6,  9, 12,  9, 12,  5, 15,  8,
	        8,  5, 12,  9, 12,  5, 14,  6,  8, 13,  6,  5, 15, 13, 11, 11 ]);

	    var _hl =  WordArray.create([ 0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E]);
	    var _hr =  WordArray.create([ 0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000]);

	    /**
	     * RIPEMD160 hash algorithm.
	     */
	    var RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({
	        _doReset: function () {
	            this._hash  = WordArray.create([0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0]);
	        },

	        _doProcessBlock: function (M, offset) {

	            // Swap endian
	            for (var i = 0; i < 16; i++) {
	                // Shortcuts
	                var offset_i = offset + i;
	                var M_offset_i = M[offset_i];

	                // Swap
	                M[offset_i] = (
	                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
	                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
	                );
	            }
	            // Shortcut
	            var H  = this._hash.words;
	            var hl = _hl.words;
	            var hr = _hr.words;
	            var zl = _zl.words;
	            var zr = _zr.words;
	            var sl = _sl.words;
	            var sr = _sr.words;

	            // Working variables
	            var al, bl, cl, dl, el;
	            var ar, br, cr, dr, er;

	            ar = al = H[0];
	            br = bl = H[1];
	            cr = cl = H[2];
	            dr = dl = H[3];
	            er = el = H[4];
	            // Computation
	            var t;
	            for (var i = 0; i < 80; i += 1) {
	                t = (al +  M[offset+zl[i]])|0;
	                if (i<16){
		            t +=  f1(bl,cl,dl) + hl[0];
	                } else if (i<32) {
		            t +=  f2(bl,cl,dl) + hl[1];
	                } else if (i<48) {
		            t +=  f3(bl,cl,dl) + hl[2];
	                } else if (i<64) {
		            t +=  f4(bl,cl,dl) + hl[3];
	                } else {// if (i<80) {
		            t +=  f5(bl,cl,dl) + hl[4];
	                }
	                t = t|0;
	                t =  rotl(t,sl[i]);
	                t = (t+el)|0;
	                al = el;
	                el = dl;
	                dl = rotl(cl, 10);
	                cl = bl;
	                bl = t;

	                t = (ar + M[offset+zr[i]])|0;
	                if (i<16){
		            t +=  f5(br,cr,dr) + hr[0];
	                } else if (i<32) {
		            t +=  f4(br,cr,dr) + hr[1];
	                } else if (i<48) {
		            t +=  f3(br,cr,dr) + hr[2];
	                } else if (i<64) {
		            t +=  f2(br,cr,dr) + hr[3];
	                } else {// if (i<80) {
		            t +=  f1(br,cr,dr) + hr[4];
	                }
	                t = t|0;
	                t =  rotl(t,sr[i]) ;
	                t = (t+er)|0;
	                ar = er;
	                er = dr;
	                dr = rotl(cr, 10);
	                cr = br;
	                br = t;
	            }
	            // Intermediate hash value
	            t    = (H[1] + cl + dr)|0;
	            H[1] = (H[2] + dl + er)|0;
	            H[2] = (H[3] + el + ar)|0;
	            H[3] = (H[4] + al + br)|0;
	            H[4] = (H[0] + bl + cr)|0;
	            H[0] =  t;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
	                (((nBitsTotal << 8)  | (nBitsTotal >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotal << 24) | (nBitsTotal >>> 8))  & 0xff00ff00)
	            );
	            data.sigBytes = (dataWords.length + 1) * 4;

	            // Hash final blocks
	            this._process();

	            // Shortcuts
	            var hash = this._hash;
	            var H = hash.words;

	            // Swap endian
	            for (var i = 0; i < 5; i++) {
	                // Shortcut
	                var H_i = H[i];

	                // Swap
	                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
	                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
	            }

	            // Return final computed hash
	            return hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });


	    function f1(x, y, z) {
	        return ((x) ^ (y) ^ (z));

	    }

	    function f2(x, y, z) {
	        return (((x)&(y)) | ((~x)&(z)));
	    }

	    function f3(x, y, z) {
	        return (((x) | (~(y))) ^ (z));
	    }

	    function f4(x, y, z) {
	        return (((x) & (z)) | ((y)&(~(z))));
	    }

	    function f5(x, y, z) {
	        return ((x) ^ ((y) |(~(z))));

	    }

	    function rotl(x,n) {
	        return (x<<n) | (x>>>(32-n));
	    }


	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.RIPEMD160('message');
	     *     var hash = CryptoJS.RIPEMD160(wordArray);
	     */
	    C.RIPEMD160 = Hasher._createHelper(RIPEMD160);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacRIPEMD160(message, key);
	     */
	    C.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160);
	}(Math));


	return CryptoJS.RIPEMD160;

}));

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0), __webpack_require__(20), __webpack_require__(21));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./sha1", "./hmac"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var WordArray = C_lib.WordArray;
	    var C_algo = C.algo;
	    var SHA1 = C_algo.SHA1;
	    var HMAC = C_algo.HMAC;

	    /**
	     * Password-Based Key Derivation Function 2 algorithm.
	     */
	    var PBKDF2 = C_algo.PBKDF2 = Base.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
	         * @property {Hasher} hasher The hasher to use. Default: SHA1
	         * @property {number} iterations The number of iterations to perform. Default: 1
	         */
	        cfg: Base.extend({
	            keySize: 128/32,
	            hasher: SHA1,
	            iterations: 1
	        }),

	        /**
	         * Initializes a newly created key derivation function.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for the derivation.
	         *
	         * @example
	         *
	         *     var kdf = CryptoJS.algo.PBKDF2.create();
	         *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8 });
	         *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8, iterations: 1000 });
	         */
	        init: function (cfg) {
	            this.cfg = this.cfg.extend(cfg);
	        },

	        /**
	         * Computes the Password-Based Key Derivation Function 2.
	         *
	         * @param {WordArray|string} password The password.
	         * @param {WordArray|string} salt A salt.
	         *
	         * @return {WordArray} The derived key.
	         *
	         * @example
	         *
	         *     var key = kdf.compute(password, salt);
	         */
	        compute: function (password, salt) {
	            // Shortcut
	            var cfg = this.cfg;

	            // Init HMAC
	            var hmac = HMAC.create(cfg.hasher, password);

	            // Initial values
	            var derivedKey = WordArray.create();
	            var blockIndex = WordArray.create([0x00000001]);

	            // Shortcuts
	            var derivedKeyWords = derivedKey.words;
	            var blockIndexWords = blockIndex.words;
	            var keySize = cfg.keySize;
	            var iterations = cfg.iterations;

	            // Generate key
	            while (derivedKeyWords.length < keySize) {
	                var block = hmac.update(salt).finalize(blockIndex);
	                hmac.reset();

	                // Shortcuts
	                var blockWords = block.words;
	                var blockWordsLength = blockWords.length;

	                // Iterations
	                var intermediate = block;
	                for (var i = 1; i < iterations; i++) {
	                    intermediate = hmac.finalize(intermediate);
	                    hmac.reset();

	                    // Shortcut
	                    var intermediateWords = intermediate.words;

	                    // XOR intermediate with block
	                    for (var j = 0; j < blockWordsLength; j++) {
	                        blockWords[j] ^= intermediateWords[j];
	                    }
	                }

	                derivedKey.concat(block);
	                blockIndexWords[0]++;
	            }
	            derivedKey.sigBytes = keySize * 4;

	            return derivedKey;
	        }
	    });

	    /**
	     * Computes the Password-Based Key Derivation Function 2.
	     *
	     * @param {WordArray|string} password The password.
	     * @param {WordArray|string} salt A salt.
	     * @param {Object} cfg (Optional) The configuration options to use for this computation.
	     *
	     * @return {WordArray} The derived key.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var key = CryptoJS.PBKDF2(password, salt);
	     *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8 });
	     *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8, iterations: 1000 });
	     */
	    C.PBKDF2 = function (password, salt, cfg) {
	        return PBKDF2.create(cfg).compute(password, salt);
	    };
	}());


	return CryptoJS.PBKDF2;

}));

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0), __webpack_require__(1));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./cipher-core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	/**
	 * Cipher Feedback block mode.
	 */
	CryptoJS.mode.CFB = (function () {
	    var CFB = CryptoJS.lib.BlockCipherMode.extend();

	    CFB.Encryptor = CFB.extend({
	        processBlock: function (words, offset) {
	            // Shortcuts
	            var cipher = this._cipher;
	            var blockSize = cipher.blockSize;

	            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

	            // Remember this block to use with next block
	            this._prevBlock = words.slice(offset, offset + blockSize);
	        }
	    });

	    CFB.Decryptor = CFB.extend({
	        processBlock: function (words, offset) {
	            // Shortcuts
	            var cipher = this._cipher;
	            var blockSize = cipher.blockSize;

	            // Remember this block to use with next block
	            var thisBlock = words.slice(offset, offset + blockSize);

	            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

	            // This block becomes the previous block
	            this._prevBlock = thisBlock;
	        }
	    });

	    function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
	        // Shortcut
	        var iv = this._iv;

	        // Generate keystream
	        if (iv) {
	            var keystream = iv.slice(0);

	            // Remove IV for subsequent blocks
	            this._iv = undefined;
	        } else {
	            var keystream = this._prevBlock;
	        }
	        cipher.encryptBlock(keystream, 0);

	        // Encrypt
	        for (var i = 0; i < blockSize; i++) {
	            words[offset + i] ^= keystream[i];
	        }
	    }

	    return CFB;
	}());


	return CryptoJS.mode.CFB;

}));

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0), __webpack_require__(1));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./cipher-core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	/**
	 * Counter block mode.
	 */
	CryptoJS.mode.CTR = (function () {
	    var CTR = CryptoJS.lib.BlockCipherMode.extend();

	    var Encryptor = CTR.Encryptor = CTR.extend({
	        processBlock: function (words, offset) {
	            // Shortcuts
	            var cipher = this._cipher
	            var blockSize = cipher.blockSize;
	            var iv = this._iv;
	            var counter = this._counter;

	            // Generate keystream
	            if (iv) {
	                counter = this._counter = iv.slice(0);

	                // Remove IV for subsequent blocks
	                this._iv = undefined;
	            }
	            var keystream = counter.slice(0);
	            cipher.encryptBlock(keystream, 0);

	            // Increment counter
	            counter[blockSize - 1] = (counter[blockSize - 1] + 1) | 0

	            // Encrypt
	            for (var i = 0; i < blockSize; i++) {
	                words[offset + i] ^= keystream[i];
	            }
	        }
	    });

	    CTR.Decryptor = Encryptor;

	    return CTR;
	}());


	return CryptoJS.mode.CTR;

}));

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0), __webpack_require__(1));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./cipher-core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	/** @preserve
	 * Counter block mode compatible with  Dr Brian Gladman fileenc.c
	 * derived from CryptoJS.mode.CTR
	 * Jan Hruby jhruby.web@gmail.com
	 */
	CryptoJS.mode.CTRGladman = (function () {
	    var CTRGladman = CryptoJS.lib.BlockCipherMode.extend();

		function incWord(word)
		{
			if (((word >> 24) & 0xff) === 0xff) { //overflow
			var b1 = (word >> 16)&0xff;
			var b2 = (word >> 8)&0xff;
			var b3 = word & 0xff;

			if (b1 === 0xff) // overflow b1
			{
			b1 = 0;
			if (b2 === 0xff)
			{
				b2 = 0;
				if (b3 === 0xff)
				{
					b3 = 0;
				}
				else
				{
					++b3;
				}
			}
			else
			{
				++b2;
			}
			}
			else
			{
			++b1;
			}

			word = 0;
			word += (b1 << 16);
			word += (b2 << 8);
			word += b3;
			}
			else
			{
			word += (0x01 << 24);
			}
			return word;
		}

		function incCounter(counter)
		{
			if ((counter[0] = incWord(counter[0])) === 0)
			{
				// encr_data in fileenc.c from  Dr Brian Gladman's counts only with DWORD j < 8
				counter[1] = incWord(counter[1]);
			}
			return counter;
		}

	    var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({
	        processBlock: function (words, offset) {
	            // Shortcuts
	            var cipher = this._cipher
	            var blockSize = cipher.blockSize;
	            var iv = this._iv;
	            var counter = this._counter;

	            // Generate keystream
	            if (iv) {
	                counter = this._counter = iv.slice(0);

	                // Remove IV for subsequent blocks
	                this._iv = undefined;
	            }

				incCounter(counter);

				var keystream = counter.slice(0);
	            cipher.encryptBlock(keystream, 0);

	            // Encrypt
	            for (var i = 0; i < blockSize; i++) {
	                words[offset + i] ^= keystream[i];
	            }
	        }
	    });

	    CTRGladman.Decryptor = Encryptor;

	    return CTRGladman;
	}());




	return CryptoJS.mode.CTRGladman;

}));

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0), __webpack_require__(1));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./cipher-core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	/**
	 * Output Feedback block mode.
	 */
	CryptoJS.mode.OFB = (function () {
	    var OFB = CryptoJS.lib.BlockCipherMode.extend();

	    var Encryptor = OFB.Encryptor = OFB.extend({
	        processBlock: function (words, offset) {
	            // Shortcuts
	            var cipher = this._cipher
	            var blockSize = cipher.blockSize;
	            var iv = this._iv;
	            var keystream = this._keystream;

	            // Generate keystream
	            if (iv) {
	                keystream = this._keystream = iv.slice(0);

	                // Remove IV for subsequent blocks
	                this._iv = undefined;
	            }
	            cipher.encryptBlock(keystream, 0);

	            // Encrypt
	            for (var i = 0; i < blockSize; i++) {
	                words[offset + i] ^= keystream[i];
	            }
	        }
	    });

	    OFB.Decryptor = Encryptor;

	    return OFB;
	}());


	return CryptoJS.mode.OFB;

}));

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0), __webpack_require__(1));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./cipher-core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	/**
	 * Electronic Codebook block mode.
	 */
	CryptoJS.mode.ECB = (function () {
	    var ECB = CryptoJS.lib.BlockCipherMode.extend();

	    ECB.Encryptor = ECB.extend({
	        processBlock: function (words, offset) {
	            this._cipher.encryptBlock(words, offset);
	        }
	    });

	    ECB.Decryptor = ECB.extend({
	        processBlock: function (words, offset) {
	            this._cipher.decryptBlock(words, offset);
	        }
	    });

	    return ECB;
	}());


	return CryptoJS.mode.ECB;

}));

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0), __webpack_require__(1));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./cipher-core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	/**
	 * ANSI X.923 padding strategy.
	 */
	CryptoJS.pad.AnsiX923 = {
	    pad: function (data, blockSize) {
	        // Shortcuts
	        var dataSigBytes = data.sigBytes;
	        var blockSizeBytes = blockSize * 4;

	        // Count padding bytes
	        var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;

	        // Compute last byte position
	        var lastBytePos = dataSigBytes + nPaddingBytes - 1;

	        // Pad
	        data.clamp();
	        data.words[lastBytePos >>> 2] |= nPaddingBytes << (24 - (lastBytePos % 4) * 8);
	        data.sigBytes += nPaddingBytes;
	    },

	    unpad: function (data) {
	        // Get number of padding bytes from last byte
	        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

	        // Remove padding
	        data.sigBytes -= nPaddingBytes;
	    }
	};


	return CryptoJS.pad.Ansix923;

}));

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0), __webpack_require__(1));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./cipher-core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	/**
	 * ISO 10126 padding strategy.
	 */
	CryptoJS.pad.Iso10126 = {
	    pad: function (data, blockSize) {
	        // Shortcut
	        var blockSizeBytes = blockSize * 4;

	        // Count padding bytes
	        var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

	        // Pad
	        data.concat(CryptoJS.lib.WordArray.random(nPaddingBytes - 1)).
	             concat(CryptoJS.lib.WordArray.create([nPaddingBytes << 24], 1));
	    },

	    unpad: function (data) {
	        // Get number of padding bytes from last byte
	        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

	        // Remove padding
	        data.sigBytes -= nPaddingBytes;
	    }
	};


	return CryptoJS.pad.Iso10126;

}));

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0), __webpack_require__(1));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./cipher-core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	/**
	 * ISO/IEC 9797-1 Padding Method 2.
	 */
	CryptoJS.pad.Iso97971 = {
	    pad: function (data, blockSize) {
	        // Add 0x80 byte
	        data.concat(CryptoJS.lib.WordArray.create([0x80000000], 1));

	        // Zero pad the rest
	        CryptoJS.pad.ZeroPadding.pad(data, blockSize);
	    },

	    unpad: function (data) {
	        // Remove zero padding
	        CryptoJS.pad.ZeroPadding.unpad(data);

	        // Remove one more byte -- the 0x80 byte
	        data.sigBytes--;
	    }
	};


	return CryptoJS.pad.Iso97971;

}));

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0), __webpack_require__(1));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./cipher-core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	/**
	 * Zero padding strategy.
	 */
	CryptoJS.pad.ZeroPadding = {
	    pad: function (data, blockSize) {
	        // Shortcut
	        var blockSizeBytes = blockSize * 4;

	        // Pad
	        data.clamp();
	        data.sigBytes += blockSizeBytes - ((data.sigBytes % blockSizeBytes) || blockSizeBytes);
	    },

	    unpad: function (data) {
	        // Shortcut
	        var dataWords = data.words;

	        // Unpad
	        var i = data.sigBytes - 1;
	        while (!((dataWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff)) {
	            i--;
	        }
	        data.sigBytes = i + 1;
	    }
	};


	return CryptoJS.pad.ZeroPadding;

}));

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0), __webpack_require__(1));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./cipher-core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	/**
	 * A noop padding strategy.
	 */
	CryptoJS.pad.NoPadding = {
	    pad: function () {
	    },

	    unpad: function () {
	    }
	};


	return CryptoJS.pad.NoPadding;

}));

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0), __webpack_require__(1));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./cipher-core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function (undefined) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var CipherParams = C_lib.CipherParams;
	    var C_enc = C.enc;
	    var Hex = C_enc.Hex;
	    var C_format = C.format;

	    var HexFormatter = C_format.Hex = {
	        /**
	         * Converts the ciphertext of a cipher params object to a hexadecimally encoded string.
	         *
	         * @param {CipherParams} cipherParams The cipher params object.
	         *
	         * @return {string} The hexadecimally encoded string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var hexString = CryptoJS.format.Hex.stringify(cipherParams);
	         */
	        stringify: function (cipherParams) {
	            return cipherParams.ciphertext.toString(Hex);
	        },

	        /**
	         * Converts a hexadecimally encoded ciphertext string to a cipher params object.
	         *
	         * @param {string} input The hexadecimally encoded string.
	         *
	         * @return {CipherParams} The cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipherParams = CryptoJS.format.Hex.parse(hexString);
	         */
	        parse: function (input) {
	            var ciphertext = Hex.parse(input);
	            return CipherParams.create({ ciphertext: ciphertext });
	        }
	    };
	}());


	return CryptoJS.format.Hex;

}));

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0), __webpack_require__(5), __webpack_require__(6), __webpack_require__(3), __webpack_require__(1));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var BlockCipher = C_lib.BlockCipher;
	    var C_algo = C.algo;

	    // Lookup tables
	    var SBOX = [];
	    var INV_SBOX = [];
	    var SUB_MIX_0 = [];
	    var SUB_MIX_1 = [];
	    var SUB_MIX_2 = [];
	    var SUB_MIX_3 = [];
	    var INV_SUB_MIX_0 = [];
	    var INV_SUB_MIX_1 = [];
	    var INV_SUB_MIX_2 = [];
	    var INV_SUB_MIX_3 = [];

	    // Compute lookup tables
	    (function () {
	        // Compute double table
	        var d = [];
	        for (var i = 0; i < 256; i++) {
	            if (i < 128) {
	                d[i] = i << 1;
	            } else {
	                d[i] = (i << 1) ^ 0x11b;
	            }
	        }

	        // Walk GF(2^8)
	        var x = 0;
	        var xi = 0;
	        for (var i = 0; i < 256; i++) {
	            // Compute sbox
	            var sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);
	            sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;
	            SBOX[x] = sx;
	            INV_SBOX[sx] = x;

	            // Compute multiplication
	            var x2 = d[x];
	            var x4 = d[x2];
	            var x8 = d[x4];

	            // Compute sub bytes, mix columns tables
	            var t = (d[sx] * 0x101) ^ (sx * 0x1010100);
	            SUB_MIX_0[x] = (t << 24) | (t >>> 8);
	            SUB_MIX_1[x] = (t << 16) | (t >>> 16);
	            SUB_MIX_2[x] = (t << 8)  | (t >>> 24);
	            SUB_MIX_3[x] = t;

	            // Compute inv sub bytes, inv mix columns tables
	            var t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);
	            INV_SUB_MIX_0[sx] = (t << 24) | (t >>> 8);
	            INV_SUB_MIX_1[sx] = (t << 16) | (t >>> 16);
	            INV_SUB_MIX_2[sx] = (t << 8)  | (t >>> 24);
	            INV_SUB_MIX_3[sx] = t;

	            // Compute next counter
	            if (!x) {
	                x = xi = 1;
	            } else {
	                x = x2 ^ d[d[d[x8 ^ x2]]];
	                xi ^= d[d[xi]];
	            }
	        }
	    }());

	    // Precomputed Rcon lookup
	    var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];

	    /**
	     * AES block cipher algorithm.
	     */
	    var AES = C_algo.AES = BlockCipher.extend({
	        _doReset: function () {
	            // Skip reset of nRounds has been set before and key did not change
	            if (this._nRounds && this._keyPriorReset === this._key) {
	                return;
	            }

	            // Shortcuts
	            var key = this._keyPriorReset = this._key;
	            var keyWords = key.words;
	            var keySize = key.sigBytes / 4;

	            // Compute number of rounds
	            var nRounds = this._nRounds = keySize + 6;

	            // Compute number of key schedule rows
	            var ksRows = (nRounds + 1) * 4;

	            // Compute key schedule
	            var keySchedule = this._keySchedule = [];
	            for (var ksRow = 0; ksRow < ksRows; ksRow++) {
	                if (ksRow < keySize) {
	                    keySchedule[ksRow] = keyWords[ksRow];
	                } else {
	                    var t = keySchedule[ksRow - 1];

	                    if (!(ksRow % keySize)) {
	                        // Rot word
	                        t = (t << 8) | (t >>> 24);

	                        // Sub word
	                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];

	                        // Mix Rcon
	                        t ^= RCON[(ksRow / keySize) | 0] << 24;
	                    } else if (keySize > 6 && ksRow % keySize == 4) {
	                        // Sub word
	                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];
	                    }

	                    keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
	                }
	            }

	            // Compute inv key schedule
	            var invKeySchedule = this._invKeySchedule = [];
	            for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
	                var ksRow = ksRows - invKsRow;

	                if (invKsRow % 4) {
	                    var t = keySchedule[ksRow];
	                } else {
	                    var t = keySchedule[ksRow - 4];
	                }

	                if (invKsRow < 4 || ksRow <= 4) {
	                    invKeySchedule[invKsRow] = t;
	                } else {
	                    invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[(t >>> 16) & 0xff]] ^
	                                               INV_SUB_MIX_2[SBOX[(t >>> 8) & 0xff]] ^ INV_SUB_MIX_3[SBOX[t & 0xff]];
	                }
	            }
	        },

	        encryptBlock: function (M, offset) {
	            this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
	        },

	        decryptBlock: function (M, offset) {
	            // Swap 2nd and 4th rows
	            var t = M[offset + 1];
	            M[offset + 1] = M[offset + 3];
	            M[offset + 3] = t;

	            this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);

	            // Inv swap 2nd and 4th rows
	            var t = M[offset + 1];
	            M[offset + 1] = M[offset + 3];
	            M[offset + 3] = t;
	        },

	        _doCryptBlock: function (M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
	            // Shortcut
	            var nRounds = this._nRounds;

	            // Get input, add round key
	            var s0 = M[offset]     ^ keySchedule[0];
	            var s1 = M[offset + 1] ^ keySchedule[1];
	            var s2 = M[offset + 2] ^ keySchedule[2];
	            var s3 = M[offset + 3] ^ keySchedule[3];

	            // Key schedule row counter
	            var ksRow = 4;

	            // Rounds
	            for (var round = 1; round < nRounds; round++) {
	                // Shift rows, sub bytes, mix columns, add round key
	                var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[(s1 >>> 16) & 0xff] ^ SUB_MIX_2[(s2 >>> 8) & 0xff] ^ SUB_MIX_3[s3 & 0xff] ^ keySchedule[ksRow++];
	                var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[(s2 >>> 16) & 0xff] ^ SUB_MIX_2[(s3 >>> 8) & 0xff] ^ SUB_MIX_3[s0 & 0xff] ^ keySchedule[ksRow++];
	                var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[(s3 >>> 16) & 0xff] ^ SUB_MIX_2[(s0 >>> 8) & 0xff] ^ SUB_MIX_3[s1 & 0xff] ^ keySchedule[ksRow++];
	                var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[(s0 >>> 16) & 0xff] ^ SUB_MIX_2[(s1 >>> 8) & 0xff] ^ SUB_MIX_3[s2 & 0xff] ^ keySchedule[ksRow++];

	                // Update state
	                s0 = t0;
	                s1 = t1;
	                s2 = t2;
	                s3 = t3;
	            }

	            // Shift rows, sub bytes, add round key
	            var t0 = ((SBOX[s0 >>> 24] << 24) | (SBOX[(s1 >>> 16) & 0xff] << 16) | (SBOX[(s2 >>> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
	            var t1 = ((SBOX[s1 >>> 24] << 24) | (SBOX[(s2 >>> 16) & 0xff] << 16) | (SBOX[(s3 >>> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
	            var t2 = ((SBOX[s2 >>> 24] << 24) | (SBOX[(s3 >>> 16) & 0xff] << 16) | (SBOX[(s0 >>> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
	            var t3 = ((SBOX[s3 >>> 24] << 24) | (SBOX[(s0 >>> 16) & 0xff] << 16) | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];

	            // Set output
	            M[offset]     = t0;
	            M[offset + 1] = t1;
	            M[offset + 2] = t2;
	            M[offset + 3] = t3;
	        },

	        keySize: 256/32
	    });

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.AES.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.AES.decrypt(ciphertext, key, cfg);
	     */
	    C.AES = BlockCipher._createHelper(AES);
	}());


	return CryptoJS.AES;

}));

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0), __webpack_require__(5), __webpack_require__(6), __webpack_require__(3), __webpack_require__(1));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var BlockCipher = C_lib.BlockCipher;
	    var C_algo = C.algo;

	    // Permuted Choice 1 constants
	    var PC1 = [
	        57, 49, 41, 33, 25, 17, 9,  1,
	        58, 50, 42, 34, 26, 18, 10, 2,
	        59, 51, 43, 35, 27, 19, 11, 3,
	        60, 52, 44, 36, 63, 55, 47, 39,
	        31, 23, 15, 7,  62, 54, 46, 38,
	        30, 22, 14, 6,  61, 53, 45, 37,
	        29, 21, 13, 5,  28, 20, 12, 4
	    ];

	    // Permuted Choice 2 constants
	    var PC2 = [
	        14, 17, 11, 24, 1,  5,
	        3,  28, 15, 6,  21, 10,
	        23, 19, 12, 4,  26, 8,
	        16, 7,  27, 20, 13, 2,
	        41, 52, 31, 37, 47, 55,
	        30, 40, 51, 45, 33, 48,
	        44, 49, 39, 56, 34, 53,
	        46, 42, 50, 36, 29, 32
	    ];

	    // Cumulative bit shift constants
	    var BIT_SHIFTS = [1,  2,  4,  6,  8,  10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];

	    // SBOXes and round permutation constants
	    var SBOX_P = [
	        {
	            0x0: 0x808200,
	            0x10000000: 0x8000,
	            0x20000000: 0x808002,
	            0x30000000: 0x2,
	            0x40000000: 0x200,
	            0x50000000: 0x808202,
	            0x60000000: 0x800202,
	            0x70000000: 0x800000,
	            0x80000000: 0x202,
	            0x90000000: 0x800200,
	            0xa0000000: 0x8200,
	            0xb0000000: 0x808000,
	            0xc0000000: 0x8002,
	            0xd0000000: 0x800002,
	            0xe0000000: 0x0,
	            0xf0000000: 0x8202,
	            0x8000000: 0x0,
	            0x18000000: 0x808202,
	            0x28000000: 0x8202,
	            0x38000000: 0x8000,
	            0x48000000: 0x808200,
	            0x58000000: 0x200,
	            0x68000000: 0x808002,
	            0x78000000: 0x2,
	            0x88000000: 0x800200,
	            0x98000000: 0x8200,
	            0xa8000000: 0x808000,
	            0xb8000000: 0x800202,
	            0xc8000000: 0x800002,
	            0xd8000000: 0x8002,
	            0xe8000000: 0x202,
	            0xf8000000: 0x800000,
	            0x1: 0x8000,
	            0x10000001: 0x2,
	            0x20000001: 0x808200,
	            0x30000001: 0x800000,
	            0x40000001: 0x808002,
	            0x50000001: 0x8200,
	            0x60000001: 0x200,
	            0x70000001: 0x800202,
	            0x80000001: 0x808202,
	            0x90000001: 0x808000,
	            0xa0000001: 0x800002,
	            0xb0000001: 0x8202,
	            0xc0000001: 0x202,
	            0xd0000001: 0x800200,
	            0xe0000001: 0x8002,
	            0xf0000001: 0x0,
	            0x8000001: 0x808202,
	            0x18000001: 0x808000,
	            0x28000001: 0x800000,
	            0x38000001: 0x200,
	            0x48000001: 0x8000,
	            0x58000001: 0x800002,
	            0x68000001: 0x2,
	            0x78000001: 0x8202,
	            0x88000001: 0x8002,
	            0x98000001: 0x800202,
	            0xa8000001: 0x202,
	            0xb8000001: 0x808200,
	            0xc8000001: 0x800200,
	            0xd8000001: 0x0,
	            0xe8000001: 0x8200,
	            0xf8000001: 0x808002
	        },
	        {
	            0x0: 0x40084010,
	            0x1000000: 0x4000,
	            0x2000000: 0x80000,
	            0x3000000: 0x40080010,
	            0x4000000: 0x40000010,
	            0x5000000: 0x40084000,
	            0x6000000: 0x40004000,
	            0x7000000: 0x10,
	            0x8000000: 0x84000,
	            0x9000000: 0x40004010,
	            0xa000000: 0x40000000,
	            0xb000000: 0x84010,
	            0xc000000: 0x80010,
	            0xd000000: 0x0,
	            0xe000000: 0x4010,
	            0xf000000: 0x40080000,
	            0x800000: 0x40004000,
	            0x1800000: 0x84010,
	            0x2800000: 0x10,
	            0x3800000: 0x40004010,
	            0x4800000: 0x40084010,
	            0x5800000: 0x40000000,
	            0x6800000: 0x80000,
	            0x7800000: 0x40080010,
	            0x8800000: 0x80010,
	            0x9800000: 0x0,
	            0xa800000: 0x4000,
	            0xb800000: 0x40080000,
	            0xc800000: 0x40000010,
	            0xd800000: 0x84000,
	            0xe800000: 0x40084000,
	            0xf800000: 0x4010,
	            0x10000000: 0x0,
	            0x11000000: 0x40080010,
	            0x12000000: 0x40004010,
	            0x13000000: 0x40084000,
	            0x14000000: 0x40080000,
	            0x15000000: 0x10,
	            0x16000000: 0x84010,
	            0x17000000: 0x4000,
	            0x18000000: 0x4010,
	            0x19000000: 0x80000,
	            0x1a000000: 0x80010,
	            0x1b000000: 0x40000010,
	            0x1c000000: 0x84000,
	            0x1d000000: 0x40004000,
	            0x1e000000: 0x40000000,
	            0x1f000000: 0x40084010,
	            0x10800000: 0x84010,
	            0x11800000: 0x80000,
	            0x12800000: 0x40080000,
	            0x13800000: 0x4000,
	            0x14800000: 0x40004000,
	            0x15800000: 0x40084010,
	            0x16800000: 0x10,
	            0x17800000: 0x40000000,
	            0x18800000: 0x40084000,
	            0x19800000: 0x40000010,
	            0x1a800000: 0x40004010,
	            0x1b800000: 0x80010,
	            0x1c800000: 0x0,
	            0x1d800000: 0x4010,
	            0x1e800000: 0x40080010,
	            0x1f800000: 0x84000
	        },
	        {
	            0x0: 0x104,
	            0x100000: 0x0,
	            0x200000: 0x4000100,
	            0x300000: 0x10104,
	            0x400000: 0x10004,
	            0x500000: 0x4000004,
	            0x600000: 0x4010104,
	            0x700000: 0x4010000,
	            0x800000: 0x4000000,
	            0x900000: 0x4010100,
	            0xa00000: 0x10100,
	            0xb00000: 0x4010004,
	            0xc00000: 0x4000104,
	            0xd00000: 0x10000,
	            0xe00000: 0x4,
	            0xf00000: 0x100,
	            0x80000: 0x4010100,
	            0x180000: 0x4010004,
	            0x280000: 0x0,
	            0x380000: 0x4000100,
	            0x480000: 0x4000004,
	            0x580000: 0x10000,
	            0x680000: 0x10004,
	            0x780000: 0x104,
	            0x880000: 0x4,
	            0x980000: 0x100,
	            0xa80000: 0x4010000,
	            0xb80000: 0x10104,
	            0xc80000: 0x10100,
	            0xd80000: 0x4000104,
	            0xe80000: 0x4010104,
	            0xf80000: 0x4000000,
	            0x1000000: 0x4010100,
	            0x1100000: 0x10004,
	            0x1200000: 0x10000,
	            0x1300000: 0x4000100,
	            0x1400000: 0x100,
	            0x1500000: 0x4010104,
	            0x1600000: 0x4000004,
	            0x1700000: 0x0,
	            0x1800000: 0x4000104,
	            0x1900000: 0x4000000,
	            0x1a00000: 0x4,
	            0x1b00000: 0x10100,
	            0x1c00000: 0x4010000,
	            0x1d00000: 0x104,
	            0x1e00000: 0x10104,
	            0x1f00000: 0x4010004,
	            0x1080000: 0x4000000,
	            0x1180000: 0x104,
	            0x1280000: 0x4010100,
	            0x1380000: 0x0,
	            0x1480000: 0x10004,
	            0x1580000: 0x4000100,
	            0x1680000: 0x100,
	            0x1780000: 0x4010004,
	            0x1880000: 0x10000,
	            0x1980000: 0x4010104,
	            0x1a80000: 0x10104,
	            0x1b80000: 0x4000004,
	            0x1c80000: 0x4000104,
	            0x1d80000: 0x4010000,
	            0x1e80000: 0x4,
	            0x1f80000: 0x10100
	        },
	        {
	            0x0: 0x80401000,
	            0x10000: 0x80001040,
	            0x20000: 0x401040,
	            0x30000: 0x80400000,
	            0x40000: 0x0,
	            0x50000: 0x401000,
	            0x60000: 0x80000040,
	            0x70000: 0x400040,
	            0x80000: 0x80000000,
	            0x90000: 0x400000,
	            0xa0000: 0x40,
	            0xb0000: 0x80001000,
	            0xc0000: 0x80400040,
	            0xd0000: 0x1040,
	            0xe0000: 0x1000,
	            0xf0000: 0x80401040,
	            0x8000: 0x80001040,
	            0x18000: 0x40,
	            0x28000: 0x80400040,
	            0x38000: 0x80001000,
	            0x48000: 0x401000,
	            0x58000: 0x80401040,
	            0x68000: 0x0,
	            0x78000: 0x80400000,
	            0x88000: 0x1000,
	            0x98000: 0x80401000,
	            0xa8000: 0x400000,
	            0xb8000: 0x1040,
	            0xc8000: 0x80000000,
	            0xd8000: 0x400040,
	            0xe8000: 0x401040,
	            0xf8000: 0x80000040,
	            0x100000: 0x400040,
	            0x110000: 0x401000,
	            0x120000: 0x80000040,
	            0x130000: 0x0,
	            0x140000: 0x1040,
	            0x150000: 0x80400040,
	            0x160000: 0x80401000,
	            0x170000: 0x80001040,
	            0x180000: 0x80401040,
	            0x190000: 0x80000000,
	            0x1a0000: 0x80400000,
	            0x1b0000: 0x401040,
	            0x1c0000: 0x80001000,
	            0x1d0000: 0x400000,
	            0x1e0000: 0x40,
	            0x1f0000: 0x1000,
	            0x108000: 0x80400000,
	            0x118000: 0x80401040,
	            0x128000: 0x0,
	            0x138000: 0x401000,
	            0x148000: 0x400040,
	            0x158000: 0x80000000,
	            0x168000: 0x80001040,
	            0x178000: 0x40,
	            0x188000: 0x80000040,
	            0x198000: 0x1000,
	            0x1a8000: 0x80001000,
	            0x1b8000: 0x80400040,
	            0x1c8000: 0x1040,
	            0x1d8000: 0x80401000,
	            0x1e8000: 0x400000,
	            0x1f8000: 0x401040
	        },
	        {
	            0x0: 0x80,
	            0x1000: 0x1040000,
	            0x2000: 0x40000,
	            0x3000: 0x20000000,
	            0x4000: 0x20040080,
	            0x5000: 0x1000080,
	            0x6000: 0x21000080,
	            0x7000: 0x40080,
	            0x8000: 0x1000000,
	            0x9000: 0x20040000,
	            0xa000: 0x20000080,
	            0xb000: 0x21040080,
	            0xc000: 0x21040000,
	            0xd000: 0x0,
	            0xe000: 0x1040080,
	            0xf000: 0x21000000,
	            0x800: 0x1040080,
	            0x1800: 0x21000080,
	            0x2800: 0x80,
	            0x3800: 0x1040000,
	            0x4800: 0x40000,
	            0x5800: 0x20040080,
	            0x6800: 0x21040000,
	            0x7800: 0x20000000,
	            0x8800: 0x20040000,
	            0x9800: 0x0,
	            0xa800: 0x21040080,
	            0xb800: 0x1000080,
	            0xc800: 0x20000080,
	            0xd800: 0x21000000,
	            0xe800: 0x1000000,
	            0xf800: 0x40080,
	            0x10000: 0x40000,
	            0x11000: 0x80,
	            0x12000: 0x20000000,
	            0x13000: 0x21000080,
	            0x14000: 0x1000080,
	            0x15000: 0x21040000,
	            0x16000: 0x20040080,
	            0x17000: 0x1000000,
	            0x18000: 0x21040080,
	            0x19000: 0x21000000,
	            0x1a000: 0x1040000,
	            0x1b000: 0x20040000,
	            0x1c000: 0x40080,
	            0x1d000: 0x20000080,
	            0x1e000: 0x0,
	            0x1f000: 0x1040080,
	            0x10800: 0x21000080,
	            0x11800: 0x1000000,
	            0x12800: 0x1040000,
	            0x13800: 0x20040080,
	            0x14800: 0x20000000,
	            0x15800: 0x1040080,
	            0x16800: 0x80,
	            0x17800: 0x21040000,
	            0x18800: 0x40080,
	            0x19800: 0x21040080,
	            0x1a800: 0x0,
	            0x1b800: 0x21000000,
	            0x1c800: 0x1000080,
	            0x1d800: 0x40000,
	            0x1e800: 0x20040000,
	            0x1f800: 0x20000080
	        },
	        {
	            0x0: 0x10000008,
	            0x100: 0x2000,
	            0x200: 0x10200000,
	            0x300: 0x10202008,
	            0x400: 0x10002000,
	            0x500: 0x200000,
	            0x600: 0x200008,
	            0x700: 0x10000000,
	            0x800: 0x0,
	            0x900: 0x10002008,
	            0xa00: 0x202000,
	            0xb00: 0x8,
	            0xc00: 0x10200008,
	            0xd00: 0x202008,
	            0xe00: 0x2008,
	            0xf00: 0x10202000,
	            0x80: 0x10200000,
	            0x180: 0x10202008,
	            0x280: 0x8,
	            0x380: 0x200000,
	            0x480: 0x202008,
	            0x580: 0x10000008,
	            0x680: 0x10002000,
	            0x780: 0x2008,
	            0x880: 0x200008,
	            0x980: 0x2000,
	            0xa80: 0x10002008,
	            0xb80: 0x10200008,
	            0xc80: 0x0,
	            0xd80: 0x10202000,
	            0xe80: 0x202000,
	            0xf80: 0x10000000,
	            0x1000: 0x10002000,
	            0x1100: 0x10200008,
	            0x1200: 0x10202008,
	            0x1300: 0x2008,
	            0x1400: 0x200000,
	            0x1500: 0x10000000,
	            0x1600: 0x10000008,
	            0x1700: 0x202000,
	            0x1800: 0x202008,
	            0x1900: 0x0,
	            0x1a00: 0x8,
	            0x1b00: 0x10200000,
	            0x1c00: 0x2000,
	            0x1d00: 0x10002008,
	            0x1e00: 0x10202000,
	            0x1f00: 0x200008,
	            0x1080: 0x8,
	            0x1180: 0x202000,
	            0x1280: 0x200000,
	            0x1380: 0x10000008,
	            0x1480: 0x10002000,
	            0x1580: 0x2008,
	            0x1680: 0x10202008,
	            0x1780: 0x10200000,
	            0x1880: 0x10202000,
	            0x1980: 0x10200008,
	            0x1a80: 0x2000,
	            0x1b80: 0x202008,
	            0x1c80: 0x200008,
	            0x1d80: 0x0,
	            0x1e80: 0x10000000,
	            0x1f80: 0x10002008
	        },
	        {
	            0x0: 0x100000,
	            0x10: 0x2000401,
	            0x20: 0x400,
	            0x30: 0x100401,
	            0x40: 0x2100401,
	            0x50: 0x0,
	            0x60: 0x1,
	            0x70: 0x2100001,
	            0x80: 0x2000400,
	            0x90: 0x100001,
	            0xa0: 0x2000001,
	            0xb0: 0x2100400,
	            0xc0: 0x2100000,
	            0xd0: 0x401,
	            0xe0: 0x100400,
	            0xf0: 0x2000000,
	            0x8: 0x2100001,
	            0x18: 0x0,
	            0x28: 0x2000401,
	            0x38: 0x2100400,
	            0x48: 0x100000,
	            0x58: 0x2000001,
	            0x68: 0x2000000,
	            0x78: 0x401,
	            0x88: 0x100401,
	            0x98: 0x2000400,
	            0xa8: 0x2100000,
	            0xb8: 0x100001,
	            0xc8: 0x400,
	            0xd8: 0x2100401,
	            0xe8: 0x1,
	            0xf8: 0x100400,
	            0x100: 0x2000000,
	            0x110: 0x100000,
	            0x120: 0x2000401,
	            0x130: 0x2100001,
	            0x140: 0x100001,
	            0x150: 0x2000400,
	            0x160: 0x2100400,
	            0x170: 0x100401,
	            0x180: 0x401,
	            0x190: 0x2100401,
	            0x1a0: 0x100400,
	            0x1b0: 0x1,
	            0x1c0: 0x0,
	            0x1d0: 0x2100000,
	            0x1e0: 0x2000001,
	            0x1f0: 0x400,
	            0x108: 0x100400,
	            0x118: 0x2000401,
	            0x128: 0x2100001,
	            0x138: 0x1,
	            0x148: 0x2000000,
	            0x158: 0x100000,
	            0x168: 0x401,
	            0x178: 0x2100400,
	            0x188: 0x2000001,
	            0x198: 0x2100000,
	            0x1a8: 0x0,
	            0x1b8: 0x2100401,
	            0x1c8: 0x100401,
	            0x1d8: 0x400,
	            0x1e8: 0x2000400,
	            0x1f8: 0x100001
	        },
	        {
	            0x0: 0x8000820,
	            0x1: 0x20000,
	            0x2: 0x8000000,
	            0x3: 0x20,
	            0x4: 0x20020,
	            0x5: 0x8020820,
	            0x6: 0x8020800,
	            0x7: 0x800,
	            0x8: 0x8020000,
	            0x9: 0x8000800,
	            0xa: 0x20800,
	            0xb: 0x8020020,
	            0xc: 0x820,
	            0xd: 0x0,
	            0xe: 0x8000020,
	            0xf: 0x20820,
	            0x80000000: 0x800,
	            0x80000001: 0x8020820,
	            0x80000002: 0x8000820,
	            0x80000003: 0x8000000,
	            0x80000004: 0x8020000,
	            0x80000005: 0x20800,
	            0x80000006: 0x20820,
	            0x80000007: 0x20,
	            0x80000008: 0x8000020,
	            0x80000009: 0x820,
	            0x8000000a: 0x20020,
	            0x8000000b: 0x8020800,
	            0x8000000c: 0x0,
	            0x8000000d: 0x8020020,
	            0x8000000e: 0x8000800,
	            0x8000000f: 0x20000,
	            0x10: 0x20820,
	            0x11: 0x8020800,
	            0x12: 0x20,
	            0x13: 0x800,
	            0x14: 0x8000800,
	            0x15: 0x8000020,
	            0x16: 0x8020020,
	            0x17: 0x20000,
	            0x18: 0x0,
	            0x19: 0x20020,
	            0x1a: 0x8020000,
	            0x1b: 0x8000820,
	            0x1c: 0x8020820,
	            0x1d: 0x20800,
	            0x1e: 0x820,
	            0x1f: 0x8000000,
	            0x80000010: 0x20000,
	            0x80000011: 0x800,
	            0x80000012: 0x8020020,
	            0x80000013: 0x20820,
	            0x80000014: 0x20,
	            0x80000015: 0x8020000,
	            0x80000016: 0x8000000,
	            0x80000017: 0x8000820,
	            0x80000018: 0x8020820,
	            0x80000019: 0x8000020,
	            0x8000001a: 0x8000800,
	            0x8000001b: 0x0,
	            0x8000001c: 0x20800,
	            0x8000001d: 0x820,
	            0x8000001e: 0x20020,
	            0x8000001f: 0x8020800
	        }
	    ];

	    // Masks that select the SBOX input
	    var SBOX_MASK = [
	        0xf8000001, 0x1f800000, 0x01f80000, 0x001f8000,
	        0x0001f800, 0x00001f80, 0x000001f8, 0x8000001f
	    ];

	    /**
	     * DES block cipher algorithm.
	     */
	    var DES = C_algo.DES = BlockCipher.extend({
	        _doReset: function () {
	            // Shortcuts
	            var key = this._key;
	            var keyWords = key.words;

	            // Select 56 bits according to PC1
	            var keyBits = [];
	            for (var i = 0; i < 56; i++) {
	                var keyBitPos = PC1[i] - 1;
	                keyBits[i] = (keyWords[keyBitPos >>> 5] >>> (31 - keyBitPos % 32)) & 1;
	            }

	            // Assemble 16 subkeys
	            var subKeys = this._subKeys = [];
	            for (var nSubKey = 0; nSubKey < 16; nSubKey++) {
	                // Create subkey
	                var subKey = subKeys[nSubKey] = [];

	                // Shortcut
	                var bitShift = BIT_SHIFTS[nSubKey];

	                // Select 48 bits according to PC2
	                for (var i = 0; i < 24; i++) {
	                    // Select from the left 28 key bits
	                    subKey[(i / 6) | 0] |= keyBits[((PC2[i] - 1) + bitShift) % 28] << (31 - i % 6);

	                    // Select from the right 28 key bits
	                    subKey[4 + ((i / 6) | 0)] |= keyBits[28 + (((PC2[i + 24] - 1) + bitShift) % 28)] << (31 - i % 6);
	                }

	                // Since each subkey is applied to an expanded 32-bit input,
	                // the subkey can be broken into 8 values scaled to 32-bits,
	                // which allows the key to be used without expansion
	                subKey[0] = (subKey[0] << 1) | (subKey[0] >>> 31);
	                for (var i = 1; i < 7; i++) {
	                    subKey[i] = subKey[i] >>> ((i - 1) * 4 + 3);
	                }
	                subKey[7] = (subKey[7] << 5) | (subKey[7] >>> 27);
	            }

	            // Compute inverse subkeys
	            var invSubKeys = this._invSubKeys = [];
	            for (var i = 0; i < 16; i++) {
	                invSubKeys[i] = subKeys[15 - i];
	            }
	        },

	        encryptBlock: function (M, offset) {
	            this._doCryptBlock(M, offset, this._subKeys);
	        },

	        decryptBlock: function (M, offset) {
	            this._doCryptBlock(M, offset, this._invSubKeys);
	        },

	        _doCryptBlock: function (M, offset, subKeys) {
	            // Get input
	            this._lBlock = M[offset];
	            this._rBlock = M[offset + 1];

	            // Initial permutation
	            exchangeLR.call(this, 4,  0x0f0f0f0f);
	            exchangeLR.call(this, 16, 0x0000ffff);
	            exchangeRL.call(this, 2,  0x33333333);
	            exchangeRL.call(this, 8,  0x00ff00ff);
	            exchangeLR.call(this, 1,  0x55555555);

	            // Rounds
	            for (var round = 0; round < 16; round++) {
	                // Shortcuts
	                var subKey = subKeys[round];
	                var lBlock = this._lBlock;
	                var rBlock = this._rBlock;

	                // Feistel function
	                var f = 0;
	                for (var i = 0; i < 8; i++) {
	                    f |= SBOX_P[i][((rBlock ^ subKey[i]) & SBOX_MASK[i]) >>> 0];
	                }
	                this._lBlock = rBlock;
	                this._rBlock = lBlock ^ f;
	            }

	            // Undo swap from last round
	            var t = this._lBlock;
	            this._lBlock = this._rBlock;
	            this._rBlock = t;

	            // Final permutation
	            exchangeLR.call(this, 1,  0x55555555);
	            exchangeRL.call(this, 8,  0x00ff00ff);
	            exchangeRL.call(this, 2,  0x33333333);
	            exchangeLR.call(this, 16, 0x0000ffff);
	            exchangeLR.call(this, 4,  0x0f0f0f0f);

	            // Set output
	            M[offset] = this._lBlock;
	            M[offset + 1] = this._rBlock;
	        },

	        keySize: 64/32,

	        ivSize: 64/32,

	        blockSize: 64/32
	    });

	    // Swap bits across the left and right words
	    function exchangeLR(offset, mask) {
	        var t = ((this._lBlock >>> offset) ^ this._rBlock) & mask;
	        this._rBlock ^= t;
	        this._lBlock ^= t << offset;
	    }

	    function exchangeRL(offset, mask) {
	        var t = ((this._rBlock >>> offset) ^ this._lBlock) & mask;
	        this._lBlock ^= t;
	        this._rBlock ^= t << offset;
	    }

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.DES.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.DES.decrypt(ciphertext, key, cfg);
	     */
	    C.DES = BlockCipher._createHelper(DES);

	    /**
	     * Triple-DES block cipher algorithm.
	     */
	    var TripleDES = C_algo.TripleDES = BlockCipher.extend({
	        _doReset: function () {
	            // Shortcuts
	            var key = this._key;
	            var keyWords = key.words;

	            // Create DES instances
	            this._des1 = DES.createEncryptor(WordArray.create(keyWords.slice(0, 2)));
	            this._des2 = DES.createEncryptor(WordArray.create(keyWords.slice(2, 4)));
	            this._des3 = DES.createEncryptor(WordArray.create(keyWords.slice(4, 6)));
	        },

	        encryptBlock: function (M, offset) {
	            this._des1.encryptBlock(M, offset);
	            this._des2.decryptBlock(M, offset);
	            this._des3.encryptBlock(M, offset);
	        },

	        decryptBlock: function (M, offset) {
	            this._des3.decryptBlock(M, offset);
	            this._des2.encryptBlock(M, offset);
	            this._des1.decryptBlock(M, offset);
	        },

	        keySize: 192/32,

	        ivSize: 64/32,

	        blockSize: 64/32
	    });

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.TripleDES.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.TripleDES.decrypt(ciphertext, key, cfg);
	     */
	    C.TripleDES = BlockCipher._createHelper(TripleDES);
	}());


	return CryptoJS.TripleDES;

}));

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0), __webpack_require__(5), __webpack_require__(6), __webpack_require__(3), __webpack_require__(1));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var StreamCipher = C_lib.StreamCipher;
	    var C_algo = C.algo;

	    /**
	     * RC4 stream cipher algorithm.
	     */
	    var RC4 = C_algo.RC4 = StreamCipher.extend({
	        _doReset: function () {
	            // Shortcuts
	            var key = this._key;
	            var keyWords = key.words;
	            var keySigBytes = key.sigBytes;

	            // Init sbox
	            var S = this._S = [];
	            for (var i = 0; i < 256; i++) {
	                S[i] = i;
	            }

	            // Key setup
	            for (var i = 0, j = 0; i < 256; i++) {
	                var keyByteIndex = i % keySigBytes;
	                var keyByte = (keyWords[keyByteIndex >>> 2] >>> (24 - (keyByteIndex % 4) * 8)) & 0xff;

	                j = (j + S[i] + keyByte) % 256;

	                // Swap
	                var t = S[i];
	                S[i] = S[j];
	                S[j] = t;
	            }

	            // Counters
	            this._i = this._j = 0;
	        },

	        _doProcessBlock: function (M, offset) {
	            M[offset] ^= generateKeystreamWord.call(this);
	        },

	        keySize: 256/32,

	        ivSize: 0
	    });

	    function generateKeystreamWord() {
	        // Shortcuts
	        var S = this._S;
	        var i = this._i;
	        var j = this._j;

	        // Generate keystream word
	        var keystreamWord = 0;
	        for (var n = 0; n < 4; n++) {
	            i = (i + 1) % 256;
	            j = (j + S[i]) % 256;

	            // Swap
	            var t = S[i];
	            S[i] = S[j];
	            S[j] = t;

	            keystreamWord |= S[(S[i] + S[j]) % 256] << (24 - n * 8);
	        }

	        // Update counters
	        this._i = i;
	        this._j = j;

	        return keystreamWord;
	    }

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.RC4.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.RC4.decrypt(ciphertext, key, cfg);
	     */
	    C.RC4 = StreamCipher._createHelper(RC4);

	    /**
	     * Modified RC4 stream cipher algorithm.
	     */
	    var RC4Drop = C_algo.RC4Drop = RC4.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {number} drop The number of keystream words to drop. Default 192
	         */
	        cfg: RC4.cfg.extend({
	            drop: 192
	        }),

	        _doReset: function () {
	            RC4._doReset.call(this);

	            // Drop
	            for (var i = this.cfg.drop; i > 0; i--) {
	                generateKeystreamWord.call(this);
	            }
	        }
	    });

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.RC4Drop.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.RC4Drop.decrypt(ciphertext, key, cfg);
	     */
	    C.RC4Drop = StreamCipher._createHelper(RC4Drop);
	}());


	return CryptoJS.RC4;

}));

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0), __webpack_require__(5), __webpack_require__(6), __webpack_require__(3), __webpack_require__(1));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var StreamCipher = C_lib.StreamCipher;
	    var C_algo = C.algo;

	    // Reusable objects
	    var S  = [];
	    var C_ = [];
	    var G  = [];

	    /**
	     * Rabbit stream cipher algorithm
	     */
	    var Rabbit = C_algo.Rabbit = StreamCipher.extend({
	        _doReset: function () {
	            // Shortcuts
	            var K = this._key.words;
	            var iv = this.cfg.iv;

	            // Swap endian
	            for (var i = 0; i < 4; i++) {
	                K[i] = (((K[i] << 8)  | (K[i] >>> 24)) & 0x00ff00ff) |
	                       (((K[i] << 24) | (K[i] >>> 8))  & 0xff00ff00);
	            }

	            // Generate initial state values
	            var X = this._X = [
	                K[0], (K[3] << 16) | (K[2] >>> 16),
	                K[1], (K[0] << 16) | (K[3] >>> 16),
	                K[2], (K[1] << 16) | (K[0] >>> 16),
	                K[3], (K[2] << 16) | (K[1] >>> 16)
	            ];

	            // Generate initial counter values
	            var C = this._C = [
	                (K[2] << 16) | (K[2] >>> 16), (K[0] & 0xffff0000) | (K[1] & 0x0000ffff),
	                (K[3] << 16) | (K[3] >>> 16), (K[1] & 0xffff0000) | (K[2] & 0x0000ffff),
	                (K[0] << 16) | (K[0] >>> 16), (K[2] & 0xffff0000) | (K[3] & 0x0000ffff),
	                (K[1] << 16) | (K[1] >>> 16), (K[3] & 0xffff0000) | (K[0] & 0x0000ffff)
	            ];

	            // Carry bit
	            this._b = 0;

	            // Iterate the system four times
	            for (var i = 0; i < 4; i++) {
	                nextState.call(this);
	            }

	            // Modify the counters
	            for (var i = 0; i < 8; i++) {
	                C[i] ^= X[(i + 4) & 7];
	            }

	            // IV setup
	            if (iv) {
	                // Shortcuts
	                var IV = iv.words;
	                var IV_0 = IV[0];
	                var IV_1 = IV[1];

	                // Generate four subvectors
	                var i0 = (((IV_0 << 8) | (IV_0 >>> 24)) & 0x00ff00ff) | (((IV_0 << 24) | (IV_0 >>> 8)) & 0xff00ff00);
	                var i2 = (((IV_1 << 8) | (IV_1 >>> 24)) & 0x00ff00ff) | (((IV_1 << 24) | (IV_1 >>> 8)) & 0xff00ff00);
	                var i1 = (i0 >>> 16) | (i2 & 0xffff0000);
	                var i3 = (i2 << 16)  | (i0 & 0x0000ffff);

	                // Modify counter values
	                C[0] ^= i0;
	                C[1] ^= i1;
	                C[2] ^= i2;
	                C[3] ^= i3;
	                C[4] ^= i0;
	                C[5] ^= i1;
	                C[6] ^= i2;
	                C[7] ^= i3;

	                // Iterate the system four times
	                for (var i = 0; i < 4; i++) {
	                    nextState.call(this);
	                }
	            }
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var X = this._X;

	            // Iterate the system
	            nextState.call(this);

	            // Generate four keystream words
	            S[0] = X[0] ^ (X[5] >>> 16) ^ (X[3] << 16);
	            S[1] = X[2] ^ (X[7] >>> 16) ^ (X[5] << 16);
	            S[2] = X[4] ^ (X[1] >>> 16) ^ (X[7] << 16);
	            S[3] = X[6] ^ (X[3] >>> 16) ^ (X[1] << 16);

	            for (var i = 0; i < 4; i++) {
	                // Swap endian
	                S[i] = (((S[i] << 8)  | (S[i] >>> 24)) & 0x00ff00ff) |
	                       (((S[i] << 24) | (S[i] >>> 8))  & 0xff00ff00);

	                // Encrypt
	                M[offset + i] ^= S[i];
	            }
	        },

	        blockSize: 128/32,

	        ivSize: 64/32
	    });

	    function nextState() {
	        // Shortcuts
	        var X = this._X;
	        var C = this._C;

	        // Save old counter values
	        for (var i = 0; i < 8; i++) {
	            C_[i] = C[i];
	        }

	        // Calculate new counter values
	        C[0] = (C[0] + 0x4d34d34d + this._b) | 0;
	        C[1] = (C[1] + 0xd34d34d3 + ((C[0] >>> 0) < (C_[0] >>> 0) ? 1 : 0)) | 0;
	        C[2] = (C[2] + 0x34d34d34 + ((C[1] >>> 0) < (C_[1] >>> 0) ? 1 : 0)) | 0;
	        C[3] = (C[3] + 0x4d34d34d + ((C[2] >>> 0) < (C_[2] >>> 0) ? 1 : 0)) | 0;
	        C[4] = (C[4] + 0xd34d34d3 + ((C[3] >>> 0) < (C_[3] >>> 0) ? 1 : 0)) | 0;
	        C[5] = (C[5] + 0x34d34d34 + ((C[4] >>> 0) < (C_[4] >>> 0) ? 1 : 0)) | 0;
	        C[6] = (C[6] + 0x4d34d34d + ((C[5] >>> 0) < (C_[5] >>> 0) ? 1 : 0)) | 0;
	        C[7] = (C[7] + 0xd34d34d3 + ((C[6] >>> 0) < (C_[6] >>> 0) ? 1 : 0)) | 0;
	        this._b = (C[7] >>> 0) < (C_[7] >>> 0) ? 1 : 0;

	        // Calculate the g-values
	        for (var i = 0; i < 8; i++) {
	            var gx = X[i] + C[i];

	            // Construct high and low argument for squaring
	            var ga = gx & 0xffff;
	            var gb = gx >>> 16;

	            // Calculate high and low result of squaring
	            var gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb;
	            var gl = (((gx & 0xffff0000) * gx) | 0) + (((gx & 0x0000ffff) * gx) | 0);

	            // High XOR low
	            G[i] = gh ^ gl;
	        }

	        // Calculate new state values
	        X[0] = (G[0] + ((G[7] << 16) | (G[7] >>> 16)) + ((G[6] << 16) | (G[6] >>> 16))) | 0;
	        X[1] = (G[1] + ((G[0] << 8)  | (G[0] >>> 24)) + G[7]) | 0;
	        X[2] = (G[2] + ((G[1] << 16) | (G[1] >>> 16)) + ((G[0] << 16) | (G[0] >>> 16))) | 0;
	        X[3] = (G[3] + ((G[2] << 8)  | (G[2] >>> 24)) + G[1]) | 0;
	        X[4] = (G[4] + ((G[3] << 16) | (G[3] >>> 16)) + ((G[2] << 16) | (G[2] >>> 16))) | 0;
	        X[5] = (G[5] + ((G[4] << 8)  | (G[4] >>> 24)) + G[3]) | 0;
	        X[6] = (G[6] + ((G[5] << 16) | (G[5] >>> 16)) + ((G[4] << 16) | (G[4] >>> 16))) | 0;
	        X[7] = (G[7] + ((G[6] << 8)  | (G[6] >>> 24)) + G[5]) | 0;
	    }

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.Rabbit.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.Rabbit.decrypt(ciphertext, key, cfg);
	     */
	    C.Rabbit = StreamCipher._createHelper(Rabbit);
	}());


	return CryptoJS.Rabbit;

}));

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0), __webpack_require__(5), __webpack_require__(6), __webpack_require__(3), __webpack_require__(1));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var StreamCipher = C_lib.StreamCipher;
	    var C_algo = C.algo;

	    // Reusable objects
	    var S  = [];
	    var C_ = [];
	    var G  = [];

	    /**
	     * Rabbit stream cipher algorithm.
	     *
	     * This is a legacy version that neglected to convert the key to little-endian.
	     * This error doesn't affect the cipher's security,
	     * but it does affect its compatibility with other implementations.
	     */
	    var RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({
	        _doReset: function () {
	            // Shortcuts
	            var K = this._key.words;
	            var iv = this.cfg.iv;

	            // Generate initial state values
	            var X = this._X = [
	                K[0], (K[3] << 16) | (K[2] >>> 16),
	                K[1], (K[0] << 16) | (K[3] >>> 16),
	                K[2], (K[1] << 16) | (K[0] >>> 16),
	                K[3], (K[2] << 16) | (K[1] >>> 16)
	            ];

	            // Generate initial counter values
	            var C = this._C = [
	                (K[2] << 16) | (K[2] >>> 16), (K[0] & 0xffff0000) | (K[1] & 0x0000ffff),
	                (K[3] << 16) | (K[3] >>> 16), (K[1] & 0xffff0000) | (K[2] & 0x0000ffff),
	                (K[0] << 16) | (K[0] >>> 16), (K[2] & 0xffff0000) | (K[3] & 0x0000ffff),
	                (K[1] << 16) | (K[1] >>> 16), (K[3] & 0xffff0000) | (K[0] & 0x0000ffff)
	            ];

	            // Carry bit
	            this._b = 0;

	            // Iterate the system four times
	            for (var i = 0; i < 4; i++) {
	                nextState.call(this);
	            }

	            // Modify the counters
	            for (var i = 0; i < 8; i++) {
	                C[i] ^= X[(i + 4) & 7];
	            }

	            // IV setup
	            if (iv) {
	                // Shortcuts
	                var IV = iv.words;
	                var IV_0 = IV[0];
	                var IV_1 = IV[1];

	                // Generate four subvectors
	                var i0 = (((IV_0 << 8) | (IV_0 >>> 24)) & 0x00ff00ff) | (((IV_0 << 24) | (IV_0 >>> 8)) & 0xff00ff00);
	                var i2 = (((IV_1 << 8) | (IV_1 >>> 24)) & 0x00ff00ff) | (((IV_1 << 24) | (IV_1 >>> 8)) & 0xff00ff00);
	                var i1 = (i0 >>> 16) | (i2 & 0xffff0000);
	                var i3 = (i2 << 16)  | (i0 & 0x0000ffff);

	                // Modify counter values
	                C[0] ^= i0;
	                C[1] ^= i1;
	                C[2] ^= i2;
	                C[3] ^= i3;
	                C[4] ^= i0;
	                C[5] ^= i1;
	                C[6] ^= i2;
	                C[7] ^= i3;

	                // Iterate the system four times
	                for (var i = 0; i < 4; i++) {
	                    nextState.call(this);
	                }
	            }
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var X = this._X;

	            // Iterate the system
	            nextState.call(this);

	            // Generate four keystream words
	            S[0] = X[0] ^ (X[5] >>> 16) ^ (X[3] << 16);
	            S[1] = X[2] ^ (X[7] >>> 16) ^ (X[5] << 16);
	            S[2] = X[4] ^ (X[1] >>> 16) ^ (X[7] << 16);
	            S[3] = X[6] ^ (X[3] >>> 16) ^ (X[1] << 16);

	            for (var i = 0; i < 4; i++) {
	                // Swap endian
	                S[i] = (((S[i] << 8)  | (S[i] >>> 24)) & 0x00ff00ff) |
	                       (((S[i] << 24) | (S[i] >>> 8))  & 0xff00ff00);

	                // Encrypt
	                M[offset + i] ^= S[i];
	            }
	        },

	        blockSize: 128/32,

	        ivSize: 64/32
	    });

	    function nextState() {
	        // Shortcuts
	        var X = this._X;
	        var C = this._C;

	        // Save old counter values
	        for (var i = 0; i < 8; i++) {
	            C_[i] = C[i];
	        }

	        // Calculate new counter values
	        C[0] = (C[0] + 0x4d34d34d + this._b) | 0;
	        C[1] = (C[1] + 0xd34d34d3 + ((C[0] >>> 0) < (C_[0] >>> 0) ? 1 : 0)) | 0;
	        C[2] = (C[2] + 0x34d34d34 + ((C[1] >>> 0) < (C_[1] >>> 0) ? 1 : 0)) | 0;
	        C[3] = (C[3] + 0x4d34d34d + ((C[2] >>> 0) < (C_[2] >>> 0) ? 1 : 0)) | 0;
	        C[4] = (C[4] + 0xd34d34d3 + ((C[3] >>> 0) < (C_[3] >>> 0) ? 1 : 0)) | 0;
	        C[5] = (C[5] + 0x34d34d34 + ((C[4] >>> 0) < (C_[4] >>> 0) ? 1 : 0)) | 0;
	        C[6] = (C[6] + 0x4d34d34d + ((C[5] >>> 0) < (C_[5] >>> 0) ? 1 : 0)) | 0;
	        C[7] = (C[7] + 0xd34d34d3 + ((C[6] >>> 0) < (C_[6] >>> 0) ? 1 : 0)) | 0;
	        this._b = (C[7] >>> 0) < (C_[7] >>> 0) ? 1 : 0;

	        // Calculate the g-values
	        for (var i = 0; i < 8; i++) {
	            var gx = X[i] + C[i];

	            // Construct high and low argument for squaring
	            var ga = gx & 0xffff;
	            var gb = gx >>> 16;

	            // Calculate high and low result of squaring
	            var gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb;
	            var gl = (((gx & 0xffff0000) * gx) | 0) + (((gx & 0x0000ffff) * gx) | 0);

	            // High XOR low
	            G[i] = gh ^ gl;
	        }

	        // Calculate new state values
	        X[0] = (G[0] + ((G[7] << 16) | (G[7] >>> 16)) + ((G[6] << 16) | (G[6] >>> 16))) | 0;
	        X[1] = (G[1] + ((G[0] << 8)  | (G[0] >>> 24)) + G[7]) | 0;
	        X[2] = (G[2] + ((G[1] << 16) | (G[1] >>> 16)) + ((G[0] << 16) | (G[0] >>> 16))) | 0;
	        X[3] = (G[3] + ((G[2] << 8)  | (G[2] >>> 24)) + G[1]) | 0;
	        X[4] = (G[4] + ((G[3] << 16) | (G[3] >>> 16)) + ((G[2] << 16) | (G[2] >>> 16))) | 0;
	        X[5] = (G[5] + ((G[4] << 8)  | (G[4] >>> 24)) + G[3]) | 0;
	        X[6] = (G[6] + ((G[5] << 16) | (G[5] >>> 16)) + ((G[4] << 16) | (G[4] >>> 16))) | 0;
	        X[7] = (G[7] + ((G[6] << 8)  | (G[6] >>> 24)) + G[5]) | 0;
	    }

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.RabbitLegacy.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.RabbitLegacy.decrypt(ciphertext, key, cfg);
	     */
	    C.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);
	}());


	return CryptoJS.RabbitLegacy;

}));

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * This global function exports the root.WebSocket as the ws module.
 * We need this to use it for the alias for the required dependency of the ws in the gamesparks lib.
 * Check the webpack.config.js for the alias module.exports.resolve.alias.ws.
 */

(function () {
    var ws = global.WebSocket || global.MozWebSocket;

    if (true) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
            return ws;
        }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = ws;
    } else {
        this.ws = ws;
    }
}).call(undefined);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _GSPlayer = __webpack_require__(101);

var _GSPlayer2 = _interopRequireDefault(_GSPlayer);

var _NotificationHandler = __webpack_require__(10);

var _GCMNotification = __webpack_require__(4);

var _axios = __webpack_require__(22);

var _axios2 = _interopRequireDefault(_axios);

var _GameSparksExtend = __webpack_require__(33);

var _GameSparksExtend2 = _interopRequireDefault(_GameSparksExtend);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * @class
 * GameSparksEvents is the main class that manages GameSparks Actions.
 * Includes the implementation of all the gamesparks' callbacks (onNonce, onInit, onAuthenticate, onMessage)
 *
 * @constructor
 */
var GameSparksEvents = function () {
  function GameSparksEvents() {
    _classCallCheck(this, GameSparksEvents);

    this.gameSparks = null;
    this.gameName = null;

    this.notificationHandler_ = null;
    this.challengesNotificationHandler = null;
    this.ogsParams = null;
    this.opConfig = null;
  }

  /**
   * Set the Notification Handler Object
   * @param {NotificationHandler} notificationHandler_
   */

  _createClass(GameSparksEvents, [{
    key: 'setNotificationHandle',
    value: function setNotificationHandle(notificationHandler_) {
      this.notificationHandler_ = notificationHandler_;
    }
  }, {
    key: 'setChallengesNotificationHandler',
    value: function setChallengesNotificationHandler(notificationHandler) {
      this.challengesNotificationHandler = notificationHandler;
    }

    /**
     * Set the GameSparks Object
     * @param {GameSparks} gameSparks
     */

  }, {
    key: 'setGameSparks',
    value: function setGameSparks(gameSparks) {
      this.gameSparks = gameSparks;
    }

    /**
     * Set the game name
     * @param {String} gameName
     */

  }, {
    key: 'setGameName',
    value: function setGameName(gameName) {
      this.gameName = gameName;
    }

    /**
     * Set the ogs params
     * @param {Object} ogsParams
     */

  }, {
    key: 'setOgsParams',
    value: function setOgsParams(ogsParams) {
      this.ogsParams = ogsParams;
    }

    /**
     * Set the Operator's configuration
     * @param {Object} opConfig
     */

  }, {
    key: 'setOpConfig',
    value: function setOpConfig(opConfig) {
      this.opConfig = opConfig;
    }

    /**
     * GameSparks onNonce callback it triggers the GameSparks.sendAuthConnectWithHmac by providing the generated hmac.
     * @param {String} nonce The nonce key.
     */

  }, {
    key: 'onNonce',
    value: function onNonce(nonce) {
      var _this = this;

      // Build the getauthkey url.
      var url = buildAuthkeyUrl(this.opConfig.gsUrl);
      // Set auth data.
      var authData = {
        "nonce": nonce,
        "operatorid": this.ogsParams.operatorid
        // Getauthkey - Request to gs-registration Service
      };return getAuthKey(url, authData).then(function (response) {
        if (typeof response.authKey !== 'undefined') {
          //console.log("authkey:" + response.authKey);
          _this.gameSparks.sendAuthConnectWithHmac(response.authKey);
        } else {
          throw Error('GS Authentication has been failed.');
        }
      }).catch(function (e) {
        console.error(e);
        // Disconnect from GS Websocket.
        _this.gameSparks.disconnect();
      });
    }

    /**
     * GameSparks onInit callback is triggered since we have a successful WebSocket Connection with the Gamesparks Platform.
     * Following up registration and authentication processes of the ogs customer with gamesparks.
     */

  }, {
    key: 'onInit',
    value: function onInit() {
      var _this2 = this;

      console.log('GameSparks onInit');

      // Register player - Request to gs-registration Service
      this.registerPlayer().then(function (player) {
        //console.log('player ' + JSON.stringify(player));
        // Authenticate player
        _this2.authenticatePlayer(player);
      }).catch(function (e) {
        console.error(e);
        // Disconnect from GS Websocket.
        _this2.gameSparks.disconnect();
      });
    }

    /**
     * Register the ogs customer with the Gamesparks platform.
     * @return {GSPlayer} The created GSPlayer Object.
     */

  }, {
    key: 'registerPlayer',
    value: function registerPlayer() {
      // Set Customer's data.
      var customerData = {
        "sessionid": this.ogsParams.sessionid,
        "operatorid": this.ogsParams.operatorid,
        "gameid": this.gameName

        // Build the registration url
      };var url = buildRegistrationUrl(this.opConfig.gsUrl);

      return sendRegisterRequest(url, customerData).then(function (response) {
        console.log('response: ' + JSON.stringify(response));
        if (typeof response.responseStatus !== 'undefined' && response.responseStatus == 'OK') return new _GSPlayer2.default(response.cau, response.cap);else {
          throw Error('GS Registration has been failed.');
        }
      }).catch(function (e) {
        console.error(e);
        throw Error('GS Registration has been failed.');
      });
    }

    /**
     * Authenticate the ogs customer with the Gamesparks platform.
     */

  }, {
    key: 'authenticatePlayer',
    value: function authenticatePlayer(player) {
      var request = {
        userName: player.userName,
        password: player.password
      };
      //console.log('Request: ' + JSON.stringify(request))
      this.gameSparks.sendWithData('AuthenticationRequest', request, this.onAuthenticate.bind(this));
    }

    /**
     * GameSparks onMessage callback is triggered since the Gamesparks Platform sends a message to the client.
     * We do a validation against the message code and we push the message to notification handler.
     *
     * @param {Object} message The Gamesparks message.
     */

  }, {
    key: 'onMessage',
    value: function onMessage(message) {
      console.log("gamesparks onMessage " + JSON.stringify(message));
      if (message && message.data) {
        if (message.data.FEATURE === "Missions") {
          if (message.extCode == "MissionStartJoinedMissionComplete" || message.extCode == "MissionStartJoinedMissionCompleteWithReward") {
            message.extCode = 'missionComplete';
          } else if (message.extCode.startsWith("Mission")) {
            message.extCode = 'missionStatus';
          }
          if (typeof message.extCode !== 'undefined' && (message.extCode === 'badgeWon' || message.extCode === 'missionComplete' || message.extCode === 'missionStatus')) {
            this.notificationHandler_.handleNotification(new _GCMNotification.GCMNotification(_GCMNotification.GCMNotification.TYPE.GS_MESSAGE, message));
          }
        } else if (message.data.FEATURE === "Challenges") {
          this.challengesNotificationHandler(message);
        } else if (typeof message.error !== 'undefined') {
          console.error("GameSparks error: " + JSON.stringify(message));
          // If the error it comes from an Authentication action, disconnect from the Websocket.
          if (message['@class'] === '.AuthenticationResponse' || message['@class'] === '.AuthenticatedConnectResponse') {
            // Disconnect from GS Websocket.
            this.gameSparks.disconnect();
          }
        }
      }
    }

    /**
     * GameSparks onAuthenticate callback is triggered since we have successfully authenticate an ogs customer with the Gamesparks Platform.
     * It sends the on Authenticate Event on Gamesparks platform.
     *
     * @param {Object} message The Gamesparks message.
     */

  }, {
    key: 'onAuthenticate',
    value: function onAuthenticate(response) {
      if (typeof response.userId !== 'undefined') {
        var lang = 'en';
        if (this.ogsParams.lang != undefined && this.ogsParams.lang != "" && this.ogsParams.lang != null) {
          lang = this.ogsParams.lang.split('_')[0];
        }
        // Get mission status
        var request = {
          eventKey: 'FEATURE_STATUS',
          gameName: this.gameName,
          operatorId: parseInt(this.ogsParams.operatorid),
          playerCurrency: this.ogsParams.currency,
          lang: lang
        };
        this.gameSparks.sendWithData('LogEventRequest', request, this.onMessage.bind(this));
      }
      console.log('onAuthenticate: ' + JSON.stringify(response));
    }
  }, {
    key: 'onChallengePlayerAction',
    value: function onChallengePlayerAction(action) {

      if (action) {
        var request = {
          eventKey: 'TOURNAMENT_ACTION',
          action: action,
          gameName: this.gameName,
          operatorId: parseInt(this.ogsParams.operatorid)
        };

        this.gameSparks.sendWithData('LogEventRequest', request, this.onMessage.bind(this));
      }
      console.log("On Challenge Player Action ", action, " => ", JSON.stringify(action));
    }
  }, {
    key: 'onMissionPlayerAction',
    value: function onMissionPlayerAction(action) {

      if (action) {
        var request = {
          eventKey: 'MISSION_ACTION',
          action: action,
          gameName: this.gameName,
          operatorId: parseInt(this.ogsParams.operatorid)
        };

        this.gameSparks.sendWithData('LogEventRequest', request, this.onMessage.bind(this));
      }
      console.log("On Mission Player Action ", action, " => ", JSON.stringify(action));
    }
  }, {
    key: 'onGetServerTime',
    value: function onGetServerTime() {
      var request = {
        eventKey: 'GET_TIME'
      };
      this.gameSparks.sendWithData('LogEventRequest', request, this.onMessage.bind(this));
      console.log("Get Server Timestamp");
    }
  }]);

  return GameSparksEvents;
}();

exports.default = GameSparksEvents;
;

/**
 * @private
 * Build the registration Url.
 * @param {String} baseUrl The base url of the registration service.
 * @return {String} The registration Url.
 */
function buildRegistrationUrl(baseUrl) {
  return baseUrl + '/register';
}

/**
 * @private
 * Send the registration request.
 * An Ajax post request that sends the customer's json data.
 * eg.
 * {
 *  	"sessionid" : "ogsopenbet1",
 *  	"operatorid" : "1",
 *  	"gameid": "70044"
 * }
 * @param {String} url The registration Url.
 * @param {Object} customerData The data of the customer.
 * @return {Object} The registration response data.
 * eg.
 * {
 *     "responseStatus": "OK",
 *     "cau": "eec622a5bd8b85b520ab332aaa5ebbe3cdcb4e3239ae13c6266ddb3e67a67837",
 *     "cap": "f05e6cb728478334b353dc6541007683329b38206225abdd0f9d35d3a9205c54"
 * }
 */
function sendRegisterRequest(url, customerData) {
  return _axios2.default.post(url, customerData).then(function (response) {
    console.log('response: ' + JSON.stringify(response.data));
    return response.data;
  }).catch(function (e) {
    throw e;
  });
}

/**
 * @private
 * Build the authkey Url.
 * @param {String} baseUrl The base url of the registration service.
 * @return {String} The authkey Url.
 */
function buildAuthkeyUrl(baseUrl) {
  return baseUrl + '/getauthkey';
}

/**
 * @private
 * Send the authkey request.
 * An ajax post request that sends the nonce and operator id.
 * eg.
 * {
 *  	"nonce" : "3479e312-3ee9-4cf6-9ce8-cfcdd96b3c64",
 *  	"operatorid" : "1"
 * }
 * @param {String} url The authkey Url.
 * @param {Object} authData The data that includes the nonce and operatorid.
 * @return {Object} The authkey response data.
 * eg.
 * {
 *     "responseStatus": "OK",
 *     "authKey": "g+uXmoyOWQn8wuAktL3aEWExwdUQLjJTSwUr6BnWBQ8="
 * }
 */
function getAuthKey(url, authData) {
  return _axios2.default.post(url, authData).then(function (response) {
    console.log('response: ' + JSON.stringify(response.data));
    return response.data;
  }).catch(function (e) {
    throw e;
  });
}

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/*
 * Data model for a Game Sparks Player
 *
 * @class
 */
var GSPlayer =

/**
 * @param {String} username
 * @param {String} password
 *
 * @constructor
 */
function GSPlayer(userName, password) {
  _classCallCheck(this, GSPlayer);

  this.userName = userName;
  this.password = password;
};

exports.default = GSPlayer;
;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);
var bind = __webpack_require__(37);
var Axios = __webpack_require__(104);
var defaults = __webpack_require__(23);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(41);
axios.CancelToken = __webpack_require__(118);
axios.isCancel = __webpack_require__(40);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(119);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 103 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(23);
var utils = __webpack_require__(2);
var InterceptorManager = __webpack_require__(113);
var dispatchRequest = __webpack_require__(114);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(39);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);
var transformData = __webpack_require__(115);
var isCancel = __webpack_require__(40);
var defaults = __webpack_require__(23);
var isAbsoluteURL = __webpack_require__(116);
var combineURLs = __webpack_require__(117);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(41);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LiveServHandler = undefined;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _LiveServConnection = __webpack_require__(121);

var _GCMNotification = __webpack_require__(4);

var _GcmStorage = __webpack_require__(134);

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

/**
 * enumerate of liveserv notification types
 * @enum {string}
 * */
var SUBJECT_ID = {
    SJPWIN: 'SJPWIN' // Syndicated Jackpot Win
};

/**
 * Main class to liveserv actions
 *
 * @class
 */

var LiveServHandler = exports.LiveServHandler = function () {
    function LiveServHandler() {
        _classCallCheck(this, LiveServHandler);

        this.gcmStorage = new _GcmStorage.GcmStorage();
    }

    /**
     * Initialize LiveServ by providing a config
     *
     * @param {Object} gcmRef Gcm Reference
     * @param {Object} notificationHandler_ The notification handler Object.
     * @param {Object} lsConfiguration The operator's liveserv configuration.
     * @param {Object} lsAuth The liveserv auth object, containing the auth token and the channel id.
     */

    _createClass(LiveServHandler, [{
        key: 'init',
        value: function init(gcmRef, notificationHandler_, lsConfiguration, lsAuth) {
            this.gcm_ = gcmRef;
            this.notificationHandler = notificationHandler_;
            this.liveServConnection = this.createLiveServConnection(lsConfiguration, lsAuth.authToken);
            this.autheticateToLiveServ(lsAuth.authToken);
            this.subscribeToLiveServChannel(lsAuth.channelId, this.handleLiveServNotification.bind(this));
        }

        /**
         * Establish a LiveServ Connection
         * 
         * @param {Object} lsConfiguration The operator's liveserv configuration. 
         * @param {String} authToken LiveServ authorization token
         */

    }, {
        key: 'createLiveServConnection',
        value: function createLiveServConnection(lsConfiguration, authToken) {
            return new _LiveServConnection.LiveServConnection(lsConfiguration, authToken);
        }

        /**
         * Authenticates to LiveServ
         * 
         * @param {String} authToken LiveServ authorization token
         */

    }, {
        key: 'autheticateToLiveServ',
        value: function autheticateToLiveServ(authToken) {
            this.liveServConnection.authenticate(authToken);
        }

        /**
         * Subscribes to LiveServ channel  
         * 
         * @param {String} channelId The LiveServ channel 
         * @param {Callback} handleLiveServNotification The notification handler
         */

    }, {
        key: 'subscribeToLiveServChannel',
        value: function subscribeToLiveServChannel(channelId, handleLiveServNotification) {
            this.liveServConnection.subscribe(channelId, handleLiveServNotification);
        }

        /**
         * Pass the liveserv messages to the Notification Handler
         *
         * @param {Object} message The liveserv message
         */

    }, {
        key: 'handleLiveServNotification',
        value: function handleLiveServNotification(message) {
            console.log('received message %o', message);
            if (message && message.subject) {
                if (message.subject.startsWith(SUBJECT_ID.SJPWIN)) {
                    console.log(_GCMNotification.GCMNotification.TYPE.SYNDICATED_JACKPOT_WIN_AWARD, message.payload);
                    var notification = new _GCMNotification.GCMNotification(_GCMNotification.GCMNotification.TYPE.SYNDICATED_JACKPOT_PROGRESS_BAR, {});
                    this.notificationHandler.disposeNotification(notification);
                    if (!this.gcmStorage.hasSyndicatedMessageBeenShow(message.msg_id)) {
                        this.gcm_.syndicateJackpotWinAwardDialogIsOpen = true;
                        this.notificationHandler.handleNotification(new _GCMNotification.GCMNotification(_GCMNotification.GCMNotification.TYPE.SYNDICATED_JACKPOT_WIN_AWARD, message.payload));
                        this.gcmStorage.appendShownSyndicationMessage(message.msg_id);
                    }
                } else {
                    console.log("Unknown Notification");
                }
            }
        }
    }]);

    return LiveServHandler;
}();

exports.default = LiveServHandler;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LiveServConnection = undefined;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _liveservClient = __webpack_require__(122);

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var lastMessageId = '!!!!!!!!!!';

/**
 * Connects and authenticates to LiveServ, and 
 * subscribes to a LiveServ channel.
 * 
 * @class
 */

var LiveServConnection = exports.LiveServConnection = function () {

    /**
     * LiveServ Connection constructor.
     * Establishes a connection to LiveServ
     * 
     * @constructor
     * 
     * @param {Object} lsConfiguration The liveserv configuration object
     * @param {String} authToken The liveserv authorization token
     */
    function LiveServConnection(lsConfiguration, authToken) {
        var _this = this;

        _classCallCheck(this, LiveServConnection);

        try {
            this.client = new _liveservClient.LiveServ([lsConfiguration.url], authToken, {
                retries: lsConfiguration.retries,
                cooldownSeconds: lsConfiguration.cooldownSeconds,
                maxRetryDelaySeconds: lsConfiguration.maxRetryDelaySeconds
            }, 2);

            this.client.watchConnectionState(function (connInfo) {
                return _this.watchConnection(connInfo);
            });
        } catch (ex) {
            console.log(ex);
        }
    }

    /**
     * Authenticates to LiveServ
     * 
     * @param {String} authToken LiveServ authorization token
     */

    _createClass(LiveServConnection, [{
        key: 'authenticate',
        value: function authenticate(authToken) {
            if (this.client) this.client.authenticate(authToken);
        }

        /**
         * Subscribes to LiveServ channel  
         * 
         * @param {String} channel The LiveServ channel
         * @param {Object} handleNotification 
         */

    }, {
        key: 'subscribe',
        value: function subscribe(channel, handleNotification) {
            if (this.client == null) return;
            this.client.subscribe([channel], function (msg) {
                return handleNotification(msg);
            }, lastMessageId);
        }
    }, {
        key: 'watchConnection',
        value: function watchConnection(connInfo) {
            console.log(connInfo);
        }
    }]);

    return LiveServConnection;
}();

exports.default = LiveServConnection;

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LiveServ = undefined;

var _LiveServ = __webpack_require__(123);

var _LiveServ2 = _interopRequireDefault(_LiveServ);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { LiveServ: _LiveServ2.default };
exports.LiveServ = _LiveServ2.default;

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Configuration = __webpack_require__(124);

var _ConnectionEvent = __webpack_require__(16);

var _ConnectionEvent2 = _interopRequireDefault(_ConnectionEvent);

var _ConnectionManager = __webpack_require__(132);

var _ConnectionManager2 = _interopRequireDefault(_ConnectionManager);

var _protocol = __webpack_require__(14);

var _util = __webpack_require__(133);

var _logger = __webpack_require__(9);

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A LiveServ client to support connecting, subscribing and unsubscribing from
 * realtime messages.
 */
var LiveServ = function () {
    function LiveServ(servers, authToken, connectionConfiguration) {
        var _this = this;

        var version = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

        _classCallCheck(this, LiveServ);

        /**
         * A store of all subscribed channels from clients, used to determine when we
         * can reuse an existing subscription to LiveServ and when we should fully
         * unsubscribe because there are not more listeners.
         * @hidden
         */
        this.subscribedChannels = new Map();
        /**
         * All callback functions that have been registered for connection state
         * event announcements.
         * @hidden
         */
        this.connectionStateWatchers = [];
        /**
         * Rolling counter to have a unique subscription reference.
         * @hidden
         */
        this.nextSubscriptionRef = 0;
        /**
         * Helper to be invoked when we've got a connection established, we need to
         * subscribe to any channels that have been requested of us.
         */
        this.handleConnected = function () {
            _logger2.default.info('connection established, requesting channels %o are subscribed to', _this.subscribedChannels);
            // subscribe to all the channels we've got
            _this.connectionManager.send((0, _util.buildChannelsRequest)(_this.subscribedChannels));
            _this.announceConnectionState(_ConnectionManager.ConnectionStatus.CONNECTED);
        };
        /**
         * Helper to be invoked when the connection disappears.
         */
        this.handleDisconnected = function () {
            // while we've just received a disconnect message we know that the
            // connection manager itself will automatically reconnect so we tell a
            // white lie here and announce that we're currently connecting (we will be
            // shortly)
            _this.announceConnectionState(_ConnectionManager.ConnectionStatus.CONNECTING);
        };
        /**
         * Helper to invoke any registered listeners with a copy of the newly
         * received message. We protect ourselves by wrapping an error boundary
         * around the message invocation.
         *
         * @param message
         */
        this.handleMessage = function (message) {
            var channel = message.channel,
                msgId = message.msg_id;
            // to avoid any later exceptions if we don't have a subscription for a channel
            // then we bail early

            if (!_this.subscribedChannels.get(channel)) {
                _logger2.default.info('received message on a channel with no subscriptions, ignoring');
                return;
            }
            // bump the last message we received so reconnects know where things were
            // up to (else we'll thrash on the LiveServ message buffer if we keep
            // subscribing from !!!!!!!!!!)
            _this.subscribedChannels.get(channel).lastMsgId = msgId;
            // call each listener with a copy of the message, this is on a best attempt
            // basis, if the listener balks at the message it's not going to get it
            // again
            _this.subscribedChannels.get(channel).listeners.forEach(function (listener) {
                try {
                    listener(Object.assign({}, message));
                } catch (e) {
                    _logger2.default.info('channel %s listener threw exception when processing message %o', channel, message);
                }
            });
        };
        this.configuration = new _Configuration.Configuration({
            servers: servers,
            version: version,
            connection: connectionConfiguration
        });
        // We connect immediately to ensure that we have the connection available
        // for use as soon as possible, we could optimise this for LongPoll by
        // only connecting when we first want to send a message but given that we
        // expect Websocket to generally be used at the moment we don't bother.
        this.connectionManager = new _ConnectionManager2.default(this.configuration, authToken).on(_ConnectionEvent2.default.CONNECTED, this.handleConnected).on(_ConnectionEvent2.default.DISCONNECTED, this.handleDisconnected).on(_ConnectionEvent2.default.MESSAGE, this.handleMessage).open();
        if (typeof window !== 'undefined') {
            if (window.localStorage && window.localStorage.getItem('openbet-liveserv-client')) {
                window['__OpenbetLiveServClient__'] = this;
                _logger2.default.info('attached to window.__OpenbetLiveServClient__ for debugging');
            } else {
                _logger2.default.info('for debug access to openbet-liveserv-client create a localStorage key \'openbet-liveserv-client\' to \'1\' and reload; window.__OpenbetLiveServClient__ will then be available for inspection');
            }
        }
    }
    /**
     * Allow a client to supply a user token to establish an authenticated
     * user connection which can subscribe to per-user channels.
     *
     * @param authToken
     */


    _createClass(LiveServ, [{
        key: 'authenticate',
        value: function authenticate(authToken) {
            // the connection manager will look after using the token appropriately
            this.connectionManager.setAuthToken(authToken);
        }
        /**
         * Allow a client to clear a user token to remove the ability to subscribe to
         * authenticated channels. Expected to be called in scenarios such as sign-out.
         *
         * @param authToken
         */

    }, {
        key: 'deauthenticate',
        value: function deauthenticate() {
            this.connectionManager.clearAuthToken();
        }
        /**
         * Allow a client to subscribe to the requested channels. The callback
         * function supplied will be invoked when a message is received on the
         * subscription.
         *
         * @param channels
         * @param listener
         * @param lastMsgId
         *
         * @returns subscriptionRef used for later unsubscribing
         */

    }, {
        key: 'subscribe',
        value: function subscribe() {
            var channels = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            var _this2 = this;

            var listener = arguments[1];
            var lastMsgId = arguments[2];

            var toSubscribe = [];
            var toUnsubscribe = [];
            var subscriptionRef = '~' + this.nextSubscriptionRef++;
            _logger2.default.info('subscribing to %o with subscriptionRef %s from %s', channels, subscriptionRef, lastMsgId);
            // for each channel being subscribed to
            channels.forEach(function (channel) {
                if (_this2.subscribedChannels.has(channel)) {
                    // check if we've got an existing subscription, if we do bump the
                    // reference count by one so we can disconnect it only when that goes
                    // back to zero
                    var sub = _this2.subscribedChannels.get(channel);
                    sub.refCount++;
                    sub.listeners.set(subscriptionRef, listener);
                    if (sub.lastMsgId > lastMsgId) {
                        // the new subscription is requesting messages from an earlier point than
                        // our current subscription is already at, we need to resubscribe to the
                        // earlier point
                        toUnsubscribe.push(channel);
                        toSubscribe.push(channel);
                        sub.lastMsgId = lastMsgId;
                    } else {
                        _logger2.default.info('existing subscription for %s can be utilised without needing older messages', channel);
                    }
                } else {
                    // no existing subscription so create a new one now
                    var _sub = {
                        channel: channel,
                        refCount: 1,
                        lastMsgId: lastMsgId,
                        listeners: new Map()
                    };
                    _sub.listeners.set(subscriptionRef, listener);
                    _this2.subscribedChannels.set(channel, _sub);
                    toSubscribe.push(channel);
                }
            });
            // if we've got an active connection we immediately send data, if not we
            // don't do anything yet as we'll construct a batched subscribe request
            // once we hear the connection is good to go - we could rely upon buffering
            // in the connection manager but that'd be inefficient as there'd be lots
            // of individual requests rather than a nice single batch
            if (this.connectionManager.ok && (toSubscribe.length || toUnsubscribe.length)) {
                var request = '';
                if (toUnsubscribe.length) {
                    request += _protocol.MessageBuilder.formatUnsubscribeRequest(toUnsubscribe);
                }
                request += _protocol.MessageBuilder.formatSubscribeRequest(toSubscribe, lastMsgId);
                this.connectionManager.send(request);
            }
            return subscriptionRef;
        }
        /**
         * Unsubscribe from the requested channels against the subscription, no further
         * messages will be sent to the callback that was registered on the `subscribe`
         * call for the given channels.
         *
         * @param subscriptionRefs An array of subscriptionRefs received from earlier
         *                         subscribe calls that the specified channels are no
         *                         longer wanted for.
         * @param channels An array of channels that the client no longer wants to
         *                 receive messages from.
         */

    }, {
        key: 'unsubscribe',
        value: function unsubscribe(subscriptionRefs, channels) {
            var _this3 = this;

            _logger2.default.info('unsubscribing from %o for subscriptionRefs %o', channels, subscriptionRefs);
            var toUnsubscribe = channels.filter(function (channel) {
                var channelSubscription = _this3.subscribedChannels.get(channel);
                if (!channelSubscription) {
                    // This is a gate against a client attempting to unsubscribe from a
                    // channel we've not got - from our point of view there is simply
                    // nothing to do. By rights the client should not be doing this but
                    // there is no point in us throwing an exception as it doesn't harm us.
                    _logger2.default.info('No channel subscription exists for ' + channel + ', not unsubscribing');
                    return false;
                }
                // remove each of the requested subscriptionRefs from the map of callbacks
                // per channel, this means the client won't receive messages any more
                subscriptionRefs.forEach(function (subscriptionRef) {
                    channelSubscription.listeners.delete(subscriptionRef);
                });
                if (channelSubscription.listeners.size === 0) {
                    // no listeners left at all, can remove completely from our store
                    // and return true so it will also be unsusbcribed from LiveServ
                    _this3.subscribedChannels.delete(channel);
                    return true;
                }
                // we still have another client/subscription that is listening to the
                // channel so we return false to ensure we don't unsubscribe from LiveServ
                return false;
            });
            if (toUnsubscribe.length > 0) {
                this.connectionManager.send(_protocol.MessageBuilder.formatUnsubscribeRequest(toUnsubscribe));
            }
        }
        /**
         * Unsubscribe from all channels across all subscriptions.
         */

    }, {
        key: 'unsubscribeAll',
        value: function unsubscribeAll() {
            var _this4 = this;

            _logger2.default.info('unsubscribing from all channels across all subscriptions');
            this.subscribedChannels.forEach(function (subs) {
                var channel = subs.channel,
                    listeners = subs.listeners;

                _this4.unsubscribe([].concat(_toConsumableArray(listeners.keys())), [channel]);
            });
        }
        /**
         * Register a listener function that will be invoked whenever the connection
         * status changes. Useful for displaying current connection status in a UI.
         *
         * @param listener
         */

    }, {
        key: 'watchConnectionState',
        value: function watchConnectionState(listener) {
            this.connectionStateWatchers.push(listener);
            // immediately announce the current status to the listener
            listener(this.connectionManager.status);
        }
        /**
         * Helper to safely invoke any connection state watcher listener functions.
         *
         * @param status
         */

    }, {
        key: 'announceConnectionState',
        value: function announceConnectionState(status) {
            this.connectionStateWatchers.forEach(function (listener) {
                try {
                    listener(status);
                } catch (e) {
                    _logger2.default.info('connection state watcher, %o, threw exception when processing state change event', listener);
                }
            });
        }
    }]);

    return LiveServ;
}();

exports.default = LiveServ;

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Configuration = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _transports = __webpack_require__(8);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Configuration = exports.Configuration = function Configuration(_ref) {
    var servers = _ref.servers,
        _ref$version = _ref.version,
        version = _ref$version === undefined ? 1 : _ref$version,
        _ref$connection = _ref.connection,
        connection = _ref$connection === undefined ? {
        retries: 10,
        cooldownSeconds: 300,
        maxRetryDelaySeconds: 60
    } : _ref$connection;

    _classCallCheck(this, Configuration);

    this.servers = parseServers(servers);
    this.version = version;
    this.connection = connection;
};
/**
 * Read and validate the inbound servers configuration, returning typed
 * instances that have been confirmed as something we expect.
 *
 * @param servers
 */


function parseServers(servers) {
    // loose validation, server should be one of the following forms;
    //  - ws://push.example.com/websock
    //  - wss://push.example.com/websock
    //  - http://push.example.com/liveserv
    //  - https://push.example.com/liveserv
    //  - //push.example.com:8080/liveserv
    var SERVER_RE = /^((wss?|https?):)?\/\/.+$/;
    if (!Array.isArray(servers)) {
        throw new Error('Expected a `servers` argument of type Array but received ' + (typeof servers === 'undefined' ? 'undefined' : _typeof(servers)));
    }
    return servers.map(function (server, idx) {
        var _server$toLowerCase$m = server.toLowerCase().match(SERVER_RE),
            _server$toLowerCase$m2 = _slicedToArray(_server$toLowerCase$m, 3),
            uri = _server$toLowerCase$m2[0],
            _ = _server$toLowerCase$m2[1],
            protocol = _server$toLowerCase$m2[2];

        if (!uri) {
            throw new Error('Server values should match ' + SERVER_RE.toString() + ', e.g. wss://push.example.com/websock, http://push.example.com:8080/liveserv');
        }
        return {
            type: serverTypeFromProtocol(protocol),
            uri: uri,
            connectionAttempts: 0,
            blacklistedUntil: 0
        };
    }).sort(function (a, b) {
        // order servers with websocket options first, they're our preferred type
        return a.type === _transports.TransportType.LongPoll && b.type === _transports.TransportType.Websocket ? 1 : 0;
    });
}
/**
 * Helper method to map between a protocol string and the server type that
 * it corresponds to.
 *
 * @param protocol
 */
function serverTypeFromProtocol(protocol) {
    switch (protocol) {
        case 'ws':
        case 'wss':
            return _transports.TransportType.Websocket;
        case 'http':
        case 'https':
        default:
            return _transports.TransportType.LongPoll;
    }
}

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var TransportType = exports.TransportType = undefined;
(function (TransportType) {
    TransportType["Websocket"] = "websocket";
    TransportType["LongPoll"] = "longpoll";
})(TransportType || (exports.TransportType = TransportType = {}));
var DisconnectReason = exports.DisconnectReason = undefined;
(function (DisconnectReason) {
    DisconnectReason["ParseError"] = "ParseError";
    DisconnectReason["PongTimeout"] = "PongTimeout";
    DisconnectReason["Requested"] = "Requested";
    DisconnectReason["Expected"] = "Expected";
    DisconnectReason["BadResponse"] = "BadResponse";
    DisconnectReason["Gone"] = "Gone";
})(DisconnectReason || (exports.DisconnectReason = DisconnectReason = {}));

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WebsocketTransport = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Websocket implementation of LiveServ push connection.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _protocol = __webpack_require__(14);

var _ConnectionEvent = __webpack_require__(16);

var _ConnectionEvent2 = _interopRequireDefault(_ConnectionEvent);

var _transports = __webpack_require__(8);

var _logger = __webpack_require__(9);

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Constants = {
    PingInterval: 15 * 1000,
    PongTimeout: 20 * 1000,
    PingBaseId: 1000,
    MaxPingId: 1099,
    CloseCodes: {
        '1000': 'CLOSE_NORMAL',
        '1001': 'CLOSE_GOING_AWAY',
        '1002': 'CLOSE_PROTOCOL_ERROR',
        '1003': 'CLOSE_UNSUPPORTED',
        '1005': 'CLOSE_NO_STATUS',
        '1006': 'CLOSE_ABNORMAL',
        '1007': 'UNSUPPORTED_DATA',
        '1008': 'POLICY_VIOLATION',
        '1009': 'CLOSE_TOO_LARGE',
        '1010': 'MISSING_EXTENSION',
        '1011': 'INTERNAL_ERROR',
        '1012': 'SERVICE_RESTART',
        '1013': 'TRY_AGAIN_LATER',
        '1015': 'TLS_HANDSHAKE'
    }
};
var ConnectionStatus;
(function (ConnectionStatus) {
    ConnectionStatus["Disconnected"] = "DISCONNECTED";
    ConnectionStatus["Connecting"] = "CONNECTING";
    ConnectionStatus["Closing"] = "CLOSING";
    ConnectionStatus["Open"] = "OPEN";
})(ConnectionStatus || (ConnectionStatus = {}));
var connectionId = 0;

var WebsocketTransport = exports.WebsocketTransport = function () {
    function WebsocketTransport(protocolVersion, uri, token, connectionConfiguration) {
        var _this = this;

        _classCallCheck(this, WebsocketTransport);

        this.type = _transports.TransportType.Websocket;
        this.conId = 'wscon' + ++connectionId;
        this.status = ConnectionStatus.Disconnected;
        this.protocolVersion = 1;
        this.socket = null;
        this.websocketProtocol = 'v1.push.openbet.com';
        this.pingTimer = null;
        this.pingSendTime = null;
        this.pingId = Constants.PingBaseId - 1;
        this.pongWatcher = null;
        this.connectionEventListeners = new Map();
        this.authToken = null;
        /**
         * Handler registered to the websocket onopen event.
         *
         * @param event
         */
        this.onopen = function (event) {
            _this.status = ConnectionStatus.Open;
            _logger2.default.info('received onopen event on ' + _this.conId);
            // handshare the connection with LiveServ
            _this.send(_protocol.MessageBuilder.formatConnectRequest(_this.type, _this.protocolVersion, _this.authToken));
            // tell any listeners, we're now connected
            _this.connectionEventListeners.get(_ConnectionEvent2.default.CONNECTED).forEach(function (listener) {
                return listener(event);
            });
            // set up ping timer to keep the connection alive
            _this.startPings();
        };
        /**
         * Handler registered to the websocket onerror event.
         *
         * @param event
         */
        this.onerror = function (event) {
            _logger2.default.info('received onerror event on ' + _this.conId);
            _this.connectionEventListeners.get(_ConnectionEvent2.default.ERROR).forEach(function (listener) {
                return listener(event);
            });
        };
        /**
         * Handler registered to the websocket onmessage event.
         *
         * @param event
         */
        this.onmessage = function (event) {
            var _Parser$parseData = _protocol.Parser.parseData(event.data, _this.protocolVersion),
                ok = _Parser$parseData.ok,
                messages = _Parser$parseData.messages;

            if (!ok) {
                _logger2.default.info('unable to parse messages from data received, disconnecting');
                _this.disconnect(_transports.DisconnectReason.ParseError);
            }
            messages.forEach(function (msg) {
                if (msg.type === 'PONG') {
                    _this.pongReceived(msg.pingId);
                } else {
                    _logger2.default.info('dispatching parsed message %o', msg);
                    // inform all listeners now we've got a formatted message
                    _this.connectionEventListeners.get(_ConnectionEvent2.default.MESSAGE).forEach(function (listener) {
                        return listener(msg);
                    });
                }
            });
        };
        /**
         * Handler registered to the websocket onclose event.
         * @param event
         */
        this.onclose = function (event) {
            //  See https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
            //  for a list of closure codes.
            var code = event.code;

            _this.status = ConnectionStatus.Disconnected;
            _logger2.default.info('received onclose event on ' + _this.conId + ', ' + getCodeText(code));
            _this.cleanup();
            _this.connectionEventListeners.get(_ConnectionEvent2.default.DISCONNECTED).forEach(function (listener) {
                return listener(_transports.DisconnectReason.Gone);
            });
        };
        this.protocolVersion = protocolVersion;
        this.uri = uri;
        this.authToken = token;
        this.origin = connectionConfiguration.origin;
    }
    /**
     * Expose connection events via a chainable method call.
     *
     * @param event
     * @param listener
     */


    _createClass(WebsocketTransport, [{
        key: 'on',
        value: function on(event, listener) {
            // Either append to the existing array of event functions or create
            // a new entry and push to that
            this.connectionEventListeners.has(event) ? this.connectionEventListeners.get(event).push(listener) : this.connectionEventListeners.set(event, [listener]);
            return this;
        }
        /**
         * Open a Websocket connection to the server configured when this instance
         * was first instantiated.
         *
         * @param server
         *
         * @returns the current instance suitable for method chaining.
         */

    }, {
        key: 'connect',
        value: function connect() {
            var _this2 = this;

            _logger2.default.info('connecting ' + this.conId + ' to ' + this.uri);
            this.status = ConnectionStatus.Connecting;
            // In a node context we support the declaration of an origin header value,
            // because the signature of the WebSocket class is differnet between a
            // browser and node (via the supported `ws` module) we have to type check
            // here.
            if (typeof window !== 'undefined') {
                this.socket = new WebSocket(this.uri, this.websocketProtocol);
            } else {
                // @ts-ignore
                this.socket = new WebSocket(this.uri, this.websocketProtocol, { origin: this.origin });
            }
            // Attach event internal event handlers
            this.socket.onopen = function (event) {
                _this2.onopen(event);
            };
            this.socket.onerror = function (event) {
                _this2.onerror(event);
            };
            this.socket.onmessage = function (event) {
                _this2.onmessage(event);
            };
            this.socket.onclose = function (event) {
                _this2.onclose(event);
            };
            return this;
        }
        /**
         * Disconnect the current connection for the given reason.
         *
         * @param reason
         */

    }, {
        key: 'disconnect',
        value: function disconnect(reason) {
            _logger2.default.info('disconnecting ' + this.conId + ' due to ' + reason);
            this.status = ConnectionStatus.Closing;
            if (this.socket) {
                this.socket.close();
            }
        }
        /**
         * Send data on the Websocket connection. Returns true if this is possible,
         * and false if it's not due to there being no open connection.
         *
         * @param data
         * @returns boolean True when the send was possible, False if it wasn't due to no connection being available.
         */

    }, {
        key: 'send',
        value: function send(data) {
            if (this.status === ConnectionStatus.Open) {
                this.socket.send(data);
                return true;
            } else {
                _logger2.default.info('socket status ' + this.status + ' so refusing send');
                return false;
            }
        }
        /**
         * Helper to start connection pings, we send one immediately as this method
         * is called when a new connection is opened and hence we don't have any
         * running. Subsequent to the initial request the pong receiver will
         * schedule a ping to be sent after the interval configured.
         */

    }, {
        key: 'startPings',
        value: function startPings() {
            this.sendPing();
        }
        /**
         * Helper to periodically send ping messages
         */

    }, {
        key: 'schedulePing',
        value: function schedulePing() {
            var _this3 = this;

            this.pingTimer = doAfter(function () {
                _this3.sendPing();
            }, Constants.PingInterval);
        }
        /**
         * Send a ping message over the connection.
         */

    }, {
        key: 'sendPing',
        value: function sendPing() {
            if (this.status !== ConnectionStatus.Open) {
                _logger2.default.info('not sending ping due to current status being ' + this.status);
                return;
            }
            // Bump the ping id through a range, resetting to zero periodically.
            this.pingId++;
            if (this.pingId > Constants.MaxPingId) {
                this.pingId = Constants.PingBaseId;
            }
            // Register a timeout that'll disconnect if we don't receive a pong within
            // the expected time
            this.scheduleNoPongWatcher();
            this.pingSendTime = Date.now();
            this.send(_protocol.MessageBuilder.formatPingRequest(this.pingId));
        }
        /**
         * Watcher which will disconnect the connection if a pong is not
         * received within the expected timeframe.
         */

    }, {
        key: 'scheduleNoPongWatcher',
        value: function scheduleNoPongWatcher() {
            var _this4 = this;

            this.pongWatcher = doAfter(function () {
                var elapsedSeconds = (Date.now() - _this4.pingSendTime) / 1000;
                _logger2.default.info('no pong for id ' + _this4.pingId + ' sent ' + elapsedSeconds + 's ago');
                _this4.disconnect(_transports.DisconnectReason.PongTimeout);
            }, Constants.PongTimeout);
        }
        /**
         * Called when the data received on a connection was a pong response to an
         * earlier ping message. Tidies up the outstanding watcher that is waiting
         * for missed responses and schedules another ping request to be sent after
         * the configured interval.
         *
         * @param pingId
         */

    }, {
        key: 'pongReceived',
        value: function pongReceived(pingId) {
            if (pingId !== this.pingId) {
                _logger2.default.info('unexpected id ' + pingId + ' received in pong response, expected ' + this.pingId);
                return;
            }
            if (this.pongWatcher) {
                clearTimeout(this.pongWatcher);
            }
            var elapsedSeconds = this.pingSendTime ? (Date.now() - this.pingSendTime) / 1000 : 'UNKNOWN';
            _logger2.default.info('got pong for id ' + pingId + ' sent ' + elapsedSeconds + 's ago');
            this.schedulePing();
        }
        /**
         * Helper to ensure that when the Websocket closes for any reason we tidy up
         * callbacks that are ping/pong'ing away.
         */

    }, {
        key: 'cleanup',
        value: function cleanup() {
            // Remove the Ping callback if present
            if (this.pingTimer) {
                clearTimeout(this.pingTimer);
            }
            // and any pong watchers
            if (this.pongWatcher) {
                clearTimeout(this.pongWatcher);
            }
        }
    }]);

    return WebsocketTransport;
}();
//  Gets the text code for an error, or 'UNKNOWN' otherwise.


function getCodeText(code) {
    return Constants.CloseCodes[code] || 'UNKNOWN';
}
// A shim around setTimeout so it works in both a browser and a node context.
function doAfter(fn, ms) {
    return setTimeout(fn, ms);
}

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MessageBuilder = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _common = __webpack_require__(42);

var _ProtocolConstants = __webpack_require__(15);

var _ProtocolConstants2 = _interopRequireDefault(_ProtocolConstants);

var _transports = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *
 */
var MessageBuilder = exports.MessageBuilder = function () {
    function MessageBuilder() {
        _classCallCheck(this, MessageBuilder);
    }

    _createClass(MessageBuilder, [{
        key: 'formatConnectRequest',

        /**
         * Create an initial LiveServ protocol connection message sent on first
         * establishing a connection to tell LiveServ what is connecting.
         *
         * @param type
         * @param protocolVersion
         * @param authToken
         */
        value: function formatConnectRequest(type, protocolVersion, authToken) {
            var req = 'C';
            if (protocolVersion > 1) {
                req += formatDecimalDigits(protocolVersion, _ProtocolConstants2.default.Size.ProtocolVersion);
            }
            switch (type) {
                case _transports.TransportType.LongPoll:
                    req += 'L';
                    break;
                case _transports.TransportType.Websocket:
                    req += 'P';
                    break;
                default:
                    throw 'Unsupported method ' + type;
            }
            if (!authToken) {
                authToken = '';
            }
            req += formatDecimalDigits(authToken.length, _ProtocolConstants2.default.Size.AuthSize);
            req += authToken;
            return req;
        }
        /**
         * Given a ping id this will produce a correctly structured LiveServ ping
         * message.
         *
         * @param pingId
         */

    }, {
        key: 'formatPingRequest',
        value: function formatPingRequest(pingId) {
            return 'p' + formatDecimalDigits(pingId, _ProtocolConstants2.default.Size.PingId);
        }
        /**
         * Given channels and a `lastMsgId` value this will produce a correctly
         * structured LiveServ subscription request which can then be sent over a
         * socket to actually subscribe to messages on those channels.
         *
         * @param channels
         * @param lastMsgId
         * @returns A string which can be sent to LiveServ to subscribe to the
         *          requested channels at the given last message id.
         */

    }, {
        key: 'formatSubscribeRequest',
        value: function formatSubscribeRequest(channels, lastMsgId) {
            var req = 'S';
            req += formatChannels(channels, 4);
            req += formatMsgId(lastMsgId);
            return req;
        }
        /**
         * Given channels, will produce a correctly structured LiveServ request that
         * will unsubscribe from those channels so no further messages will be
         * received.
         *
         * @param channels
         * @returns A string which can be sent to LiveServ to unsubscribe from the
         *          requested channels.
         */

    }, {
        key: 'formatUnsubscribeRequest',
        value: function formatUnsubscribeRequest(channels) {
            var req = 'U';
            req += formatChannels(channels, 4);
            return req;
        }
    }]);

    return MessageBuilder;
}();
/**
 * Helper to format channels into a LiveServ protocol string.
 *
 * @param channels
 * @param numChannelsWidth
 * @returns A string ready to be sent to LiveServ that holds channels with a
 *          prefix that denotes how many channels there are represented.
 */


function formatChannels(channels, numChannelsWidth) {
    var numChannels = channels.length;
    if (!numChannels) {
        throw 'bad number of channels.';
    }
    var numChannelsString = void 0;
    try {
        numChannelsString = formatDecimalDigits(numChannels, numChannelsWidth);
    } catch (e) {
        throw 'unable to format number of channels';
    }
    var channelsString = channels.reduce(function (all, channel) {
        if (!(0, _common.validateChannel)(channel)) {
            throw 'bad channel ' + channel;
        }
        return all += channel;
    }, '');
    return '' + numChannelsString + channelsString;
}
/**
 * Given a message id this function will left pad with Base85 zero chars
 * up to the LiveServ protocol message id width.
 *
 * @param msgId
 * @returns A string representation of the msgId, left padded with Base85
 *          zero (which is '!') upto the LiveServ message id width.
 */
function formatMsgId(msgId) {
    if (!msgId.match(/^[!-u]*$/)) {
        throw "not a base 85 msgId";
    }
    if (msgId.length > _ProtocolConstants2.default.Size.MessageId) {
        throw 'Bad msgId ' + msgId + ' longer than ' + _ProtocolConstants2.default.Size.MessageId + ' characters.';
    }
    // "!" is zero in base 85
    while (msgId.length < _ProtocolConstants2.default.Size.MessageId) {
        msgId = '!' + msgId;
    }
    return msgId;
}
/**
 * Given a value this function will left pad it with zero up to the requested
 * fixed width.
 *
 * @param value
 * @param fixedWidth
 * @returns A string representation of the value, left padded with zeros up
 *          to the requested width.
 */
function formatDecimalDigits(value, fixedWidth) {
    var intValue = parseInt(value, 10);
    var str = '' + intValue;
    if (str.length > fixedWidth) {
        throw 'Value ' + intValue + ' longer than ' + fixedWidth + ' digits.';
    }
    while (str.length < fixedWidth) {
        str = '0' + str;
    }
    return str;
}

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Parser = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ProtocolConstants = __webpack_require__(15);

var _ProtocolConstants2 = _interopRequireDefault(_ProtocolConstants);

var _common = __webpack_require__(42);

var _Pong = __webpack_require__(129);

var _Pong2 = _interopRequireDefault(_Pong);

var _PushMessage = __webpack_require__(130);

var _PushMessage2 = _interopRequireDefault(_PushMessage);

var _logger = __webpack_require__(9);

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Parser = exports.Parser = function () {
    function Parser() {
        _classCallCheck(this, Parser);
    }

    _createClass(Parser, [{
        key: 'parseData',
        value: function parseData(rawData, protocolVersion) {
            var status = null;
            var parseIdx = 0;
            var messages = [];
            // When data is available there may be more than one LiveServ message
            // included in the data received, we parse messages from the data
            // and handle them here.
            while (true) {
                var result = parseNextMessage(rawData, parseIdx, protocolVersion);
                status = result.status;
                parseIdx = result.parseIdx;
                // when we don't successfully parse a message (either because there was an
                // error, or insufficient data in the buffer) we need to exit this loop,
                // the subsequent code will handle appropriate upstream errors
                if (status !== ParseStatus.Success) {
                    break;
                }
                messages.push(result.msg);
                // if we've shifted the pointer to the end of the current data with the
                // message just retrieved then there is not more data to parse and we
                // can break out of this loop
                if (parseIdx === rawData.length) {
                    break;
                }
            }
            if (parseIdx < rawData.length) {
                //  We have data left over in the frame - log a warning, discard and continue
                _logger2.default.info('extra data in message - discarding ' + rawData.substring(parseIdx));
            }
            if (status === ParseStatus.Error) {
                _logger2.default.info('bad message received, unable to parse');
                return {
                    ok: false,
                    messages: null
                };
            }
            return {
                ok: true,
                messages: messages
            };
        }
    }]);

    return Parser;
}();

var ParseStatus;
(function (ParseStatus) {
    ParseStatus[ParseStatus["Error"] = 0] = "Error";
    ParseStatus[ParseStatus["Incomplete"] = 1] = "Incomplete";
    ParseStatus[ParseStatus["Success"] = 2] = "Success";
})(ParseStatus || (ParseStatus = {}));
/**
 * Parse a message in the buffer starting at the index given by parseIdx
 * @param buffer
 * @param parseIdx
 * @param protocolVersion
 */
function parseNextMessage(buffer, parseIdx, protocolVersion) {
    if (buffer.length - parseIdx < 1) {
        return {
            status: ParseStatus.Incomplete,
            parseIdx: null,
            msg: null
        };
    }
    var msgType = buffer.charAt(parseIdx);
    switch (msgType) {
        case 'g':
            return parsePongMsg(buffer, parseIdx);
        case 'M':
            return parsePushMsg(buffer, parseIdx, protocolVersion);
        default:
            _logger2.default.info('unexpected message type ' + msgType);
    }
    return {
        status: ParseStatus.Error,
        parseIdx: null,
        msg: null
    };
}
/**
 * Helper to parse a Pong message from the given string buffer starting at
 * `parseIdx`.
 *
 * @param buffer
 * @param parseIdx
 */
function parsePongMsg(buffer, parseIdx) {
    var dataEnd = buffer.length;
    if (dataEnd - parseIdx < 1 + _ProtocolConstants2.default.Size.PingId) {
        // incomplete.
        return { status: ParseStatus.Incomplete, parseIdx: null, msg: null };
    }
    var msgType = buffer.charAt(parseIdx);
    parseIdx++;
    if (msgType !== 'g') {
        // not a pong message
        _logger2.default.info('Pong msg has bad msg_type ' + msgType);
        return { status: ParseStatus.Error, parseIdx: null, msg: null };
    }
    var result = void 0;
    try {
        result = parseDecDigits(buffer, parseIdx, _ProtocolConstants2.default.Size.PingId);
    } catch (e) {
        _logger2.default.info('invalid ping id in received message');
        return { status: ParseStatus.Error, parseIdx: null, msg: null };
    }
    return {
        status: ParseStatus.Success,
        parseIdx: result.idx,
        msg: new _Pong2.default(result.value)
    };
}
/**
 * Helper to parse a PushMessage message from the given string buffer starting
 * at `parseIdx`.
 *
 * @param buffer
 * @param parseIdx
 * @param protocolVersion
 */
function parsePushMsg(buffer, parseIdx, protocolVersion) {
    var dataEnd = buffer.length;
    var channelSize = protocolVersion > 1 ? _ProtocolConstants2.default.Size.Channel32Id : _ProtocolConstants2.default.Size.Channel16Id;
    var minSize = 1 + channelSize;
    _ProtocolConstants2.default.Size.MessageId + 1 + _ProtocolConstants2.default.Size.SubjectId + _ProtocolConstants2.default.Size.MessageLength * 2;
    if (dataEnd - parseIdx < minSize) {
        return { status: ParseStatus.Incomplete, parseIdx: null, msg: null };
    }
    var msgType = buffer.charAt(parseIdx);
    parseIdx++;
    if (msgType !== 'M') {
        // not a published message
        _logger2.default.info('published msg has bad message type ' + msgType);
        return { status: ParseStatus.Error, parseIdx: null, msg: null };
    }
    // Peek ahead to see if we're expecting a user id or not - this
    // affects the length of the header info.
    var fromIdx = parseIdx + channelSize + _ProtocolConstants2.default.Size.MessageId;
    var fromType = buffer.charAt(fromIdx);
    var fromSize = void 0;
    var userId = void 0;
    if (fromType === 'G') {
        // guest
        fromSize = 1;
        userId = 0;
    } else if (fromType === 'U') {
        fromSize = 1 + _ProtocolConstants2.default.Size.UserId;
        if (fromIdx + fromSize >= dataEnd) {
            _logger2.default.info('not enough data to parse user id from');
            return { status: ParseStatus.Incomplete, parseIdx: null, msg: null };
        }
        var parsedUserId = void 0;
        try {
            parsedUserId = parseDecDigits(buffer, fromIdx + 1, _ProtocolConstants2.default.Size.UserId);
        } catch (e) {
            _logger2.default.info('invalid user id');
            return { status: ParseStatus.Error, parseIdx: null, msg: null };
        }
        userId = parsedUserId.value;
    } else if (fromType === 'W') {
        fromSize = 1 + _ProtocolConstants2.default.Size.UserUUID;
        if (fromIdx + fromSize >= dataEnd) {
            _logger2.default.info('not enough data to parse uuid from');
            return { status: ParseStatus.Incomplete, parseIdx: null, msg: null };
        }
        userId = buffer.substr(fromIdx + 1, _ProtocolConstants2.default.Size.UserUUID);
    } else {
        // invalid from type - should be G or U
        _logger2.default.info('bad from type, should be G or U but received ' + fromType);
        return { status: ParseStatus.Error, parseIdx: null, msg: null };
    }
    // Peek ahead to see how long we expect the message to be.
    var eomIdx = parseIdx + channelSize + _ProtocolConstants2.default.Size.MessageId + fromSize + _ProtocolConstants2.default.Size.SubjectId + _ProtocolConstants2.default.Size.MessageLength;
    if (eomIdx >= dataEnd) {
        _logger2.default.info('not enough data to parse message from');
        return { status: ParseStatus.Incomplete, parseIdx: null, msg: null };
    }
    var parsedMsgLength = void 0;
    try {
        parsedMsgLength = parseHexDigits(buffer, eomIdx, _ProtocolConstants2.default.Size.MessageLength);
    } catch (e) {
        _logger2.default.info('unable to parse message length, ' + e);
        return { status: ParseStatus.Error, parseIdx: null, msg: null };
    }
    var _parsedMsgLength = parsedMsgLength,
        msgLength = _parsedMsgLength.value,
        msgLengthIdx = _parsedMsgLength.idx;
    // Do we have enough data yet?

    if (dataEnd - msgLengthIdx < msgLength) {
        return { status: ParseStatus.Incomplete, parseIdx: null, msg: null };
    }
    // Now go back to the bits we skipped over.
    // Channel
    var parsedChannel = void 0;
    try {
        parsedChannel = parseChannel(buffer, parseIdx, protocolVersion);
    } catch (e) {
        _logger2.default.info('unable to parse channel, ' + e);
        return { status: ParseStatus.Error, parseIdx: null, msg: null };
    }
    var _parsedChannel = parsedChannel,
        channel = _parsedChannel.channel,
        channelIdx = _parsedChannel.idx;

    parseIdx = channelIdx;
    // Message Id
    var parsedMsgId = void 0;
    try {
        parsedMsgId = parseMsgId(buffer, parseIdx);
    } catch (e) {
        // invalid message id
        _logger2.default.info('unable to parse message id, ' + e);
        return { status: ParseStatus.Error, parseIdx: null, msg: null };
    }
    var _parsedMsgId = parsedMsgId,
        msgId = _parsedMsgId.msgId,
        msgIdIdx = _parsedMsgId.idx;

    parseIdx = msgIdIdx;
    // Already got user id
    parseIdx += fromSize;
    // Subject
    var parsedSubject = void 0;
    try {
        parsedSubject = parseSubject(buffer, parseIdx);
    } catch (e) {
        _logger2.default.info('unable to parse subject, ' + e);
        return { status: ParseStatus.Error, parseIdx: null, msg: null };
    }
    var _parsedSubject = parsedSubject,
        subject = _parsedSubject.subject,
        subjectIdx = _parsedSubject.idx;

    parseIdx = subjectIdx;
    // Already got mesage body length and found where the body is earlier, now we
    // read that data and create a message instance.
    var msgBody = buffer.substr(msgLengthIdx, msgLength);
    parseIdx = msgLengthIdx + msgLength;
    var msg = new _PushMessage2.default(channel, msgId, userId, subject, msgBody);
    return { status: ParseStatus.Success, parseIdx: parseIdx, msg: msg };
}
/**
 * Helper to parse a fixed-width hexadecimal number from a block of data,
 * beginning at `startFrom`. Either succeeds or throws an error.
 *
 * @param data
 * @param startFrom
 * @param fixedSize
 * @returns An integer converted from the hex data.
 */
function parseHexDigits(data, startFrom, fixedSize) {
    if (startFrom + fixedSize > data.length) {
        throw 'data too short';
    }
    var rawNum = data.substr(startFrom, fixedSize);
    if (!rawNum.match(/^[0-9a-fA-F]+$/)) {
        throw 'not a number';
    }
    var num = parseInt(rawNum, 16);
    if (isNaN(num) || num < 0) {
        throw 'not a number';
    }
    return {
        value: num,
        idx: startFrom + fixedSize
    };
}
/**
 * Helper to parse a fixed-width decimal number from a block of data,
 * beginning at `startFrom`. Either succeeds or throws an error.
 * @param data
 * @param startFrom
 * @param fixedSize
 * @returns An integer converted from the raw data.
 */
function parseDecDigits(data, startFrom, fixedSize) {
    if (startFrom + fixedSize > data.length) {
        throw 'data too short';
    }
    var rawNum = data.substr(startFrom, fixedSize);
    if (!rawNum.match(/^[0-9]+$/)) {
        throw 'not a number';
    }
    var num = parseInt(rawNum, 10);
    if (isNaN(num) || num < 0) {
        throw 'not a positive number';
    }
    return {
        value: num,
        idx: startFrom + fixedSize
    };
}
/**
 * Helper to parse a channel from a block of data, beginning at `startFrom`.
 * Either succeeds or throws an error.
 *
 * @param data
 * @param startFrom
 * @param protocolVersion
 */
function parseChannel(data, startFrom, protocolVersion) {
    var channelSize = protocolVersion > 1 ? _ProtocolConstants2.default.Size.Channel32Id : _ProtocolConstants2.default.Size.Channel16Id;
    if (startFrom + channelSize > data.length) {
        throw 'data too short';
    }
    var channel = data.substr(startFrom, channelSize);
    if (!(0, _common.validateChannel)(channel)) {
        throw "bad channel id";
    }
    return {
        channel: channel,
        idx: startFrom + channelSize
    };
}
/**
 * Helper to parse a message id from a block of data, beginning at `startFrom`.
 * Either succeeds or throws an error. Note that message ids are in Base85 and
 * should be compared as string and not numbers.
 *
 * @param data
 * @param startFrom
 */
function parseMsgId(data, startFrom) {
    var msgIdSize = _ProtocolConstants2.default.Size.MessageId;
    if (startFrom + msgIdSize > data.length) {
        throw 'data too short';
    }
    var msgId = data.substr(startFrom, msgIdSize);
    if (!msgId.match(/^[!-u]+$/)) {
        throw 'not a base 85 msgId';
    }
    return {
        msgId: msgId,
        idx: startFrom + msgIdSize
    };
}
/**
 * Helper to parse a subject from a block of data, beginning at `startFrom`.
 * Either succeeds or throws an error.
 *
 * @param data
 * @param startFrom
 */
function parseSubject(data, startFrom) {
    var subjectSize = _ProtocolConstants2.default.Size.SubjectId;
    if (startFrom + subjectSize > data.length) {
        throw 'data too short';
    }
    var subject = data.substr(startFrom, subjectSize);
    if (!(0, _common.validateSubject)(subject)) {
        throw 'bad subject id';
    }
    return {
        subject: subject,
        idx: startFrom + subjectSize
    };
}

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A Pong response.
 */
var Pong = function Pong(pingId) {
    _classCallCheck(this, Pong);

    this.type = 'PONG';
    this.pingId = pingId;
};

exports.default = Pong;

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ProtocolConstants = __webpack_require__(15);

var _ProtocolConstants2 = _interopRequireDefault(_ProtocolConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A push message delivered via LiveServ.
 */
var PushMessage = function PushMessage(channel, msgId, userId, subject, payload) {
    _classCallCheck(this, PushMessage);

    this.type = 'MSG';
    this.channel = channel;
    this.msg_id = msgId;
    this.user_id = userId;
    this.subject = subject;
    this.payload = payload;
    /* For convenience, derived from channel/subject. */
    if (_ProtocolConstants2.default.Patterns.Channel16PaddedPattern.test(this.channel)) {
        this.channel_type = this.channel.substring(0, 6);
        this.channel_number = parseInt(this.channel.substring(24), 10);
    } else if (_ProtocolConstants2.default.Patterns.Channel32Pattern.test(this.channel)) {
        this.channel_type = this.channel.substring(0, 8);
        this.channel_number = this.channel.substring(8);
    } else {
        this.channel_type = this.channel.substring(0, 6);
        this.channel_number = parseInt(this.channel.substring(6), 10);
    }
    this.subject_type = this.subject.substring(0, 6);
    this.subject_number = parseInt(this.subject.substring(6), 10);
};

exports.default = PushMessage;

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AjaxTransport = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Ajax long poll implementation of LiveServ push connection.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _protocol = __webpack_require__(14);

var _ConnectionEvent = __webpack_require__(16);

var _ConnectionEvent2 = _interopRequireDefault(_ConnectionEvent);

var _transports = __webpack_require__(8);

var _logger = __webpack_require__(9);

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConnectionStatus;
(function (ConnectionStatus) {
    ConnectionStatus["Disconnected"] = "DISCONNECTED";
    ConnectionStatus["Connecting"] = "CONNECTING";
    ConnectionStatus["Closing"] = "CLOSING";
    ConnectionStatus["Open"] = "OPEN";
    ConnectionStatus["AwaitingResponse"] = "AWAITING_RESPONSE";
})(ConnectionStatus || (ConnectionStatus = {}));
var connectionId = 0;

var AjaxTransport = exports.AjaxTransport = function () {
    function AjaxTransport(protocolVersion, uri, token) {
        var _this = this;

        _classCallCheck(this, AjaxTransport);

        this.type = _transports.TransportType.LongPoll;
        this.conId = 'ajaxcon' + ++connectionId;
        this.status = ConnectionStatus.Disconnected;
        this.protocolVersion = 1;
        this.connectionEventListeners = new Map();
        this.authToken = null;
        /**
         * Helper to react to Ajax connection state changes.
         */
        this.onreadystatechange = function (event) {
            switch (_this.socket.readyState) {
                case 1:
                    _this.onopen(ConnectionStatus.Open);
                    break;
                case 4:
                    _this.ondone(ConnectionStatus.Disconnected);
                    break;
            }
        };
        /**
         * Handler registered to the Ajax connection readyState 1.
         *
         * @param event
         */
        this.onopen = function (event) {
            _this.status = ConnectionStatus.Open;
            _this.socket.setRequestHeader('content-type', 'text/plain');
            // tell any listeners, we're now connected, when we do this we'll then get
            // a subscribe message coming back our way if anything upstream is
            // subscribed to
            _this.connectionEventListeners.get(_ConnectionEvent2.default.CONNECTED).forEach(function (listener) {
                return listener(event);
            });
        };
        /**
         * Handler registered to the Ajax connection readyState 4.
         *
         * @param event
         */
        this.ondone = function (event) {
            if (_this.socket.status === 0) {}
            if (_this.socket.status !== 200) {
                _this.handleClose(_transports.DisconnectReason.BadResponse);
                return;
            }
            var data = _this.socket.responseText;
            // any data received is processed as a message, we do this asyncronously to
            // allow a new connection to be established immediately
            if (data) {
                setTimeout(function () {
                    _this.handleMessage(data);
                }, 0);
            }
            _this.handleClose(_transports.DisconnectReason.Expected);
        };
        /**
         * Handler used when there was data available on the Ajax connection.
         *
         * @param data
         */
        this.handleMessage = function (data) {
            var _Parser$parseData = _protocol.Parser.parseData(data, _this.protocolVersion),
                ok = _Parser$parseData.ok,
                messages = _Parser$parseData.messages;

            if (!ok) {
                _logger2.default.info('unable to parse messages from data received, ignoring');
                return;
            }
            messages.forEach(function (msg) {
                _logger2.default.info('dispatching parsed message %o', msg);
                // inform all listeners now we've got a formatted message
                _this.connectionEventListeners.get(_ConnectionEvent2.default.MESSAGE).forEach(function (listener) {
                    return listener(msg);
                });
            });
        };
        /**
         * Helper to announce the connection is closed for a specific reason
         * @param reason
         */
        this.handleClose = function (reason) {
            _this.status = ConnectionStatus.Disconnected;
            _this.connectionEventListeners.get(_ConnectionEvent2.default.DISCONNECTED).forEach(function (listener) {
                return listener(reason);
            });
        };
        this.protocolVersion = protocolVersion;
        this.uri = uri;
        this.authToken = token;
    }
    /**
     * Expose connection events via a chainable method call.
     *
     * @param event
     * @param listener
     */


    _createClass(AjaxTransport, [{
        key: 'on',
        value: function on(event, listener) {
            // Either append to the existing array of event functions or create
            // a new entry and push to that
            this.connectionEventListeners.has(event) ? this.connectionEventListeners.get(event).push(listener) : this.connectionEventListeners.set(event, [listener]);
            return this;
        }
        /**
         * Open a Ajax connection to the server configured when this instance
         * was first instantiated.
         *
         * @param server
         *
         * @returns the current instance suitable for method chaining.
         */

    }, {
        key: 'connect',
        value: function connect() {
            var _this2 = this;

            _logger2.default.info('connecting ' + this.conId + ' to ' + this.uri);
            this.status = ConnectionStatus.Connecting;
            this.socket = new XMLHttpRequest();
            this.socket.onreadystatechange = function (event) {
                return _this2.onreadystatechange(event);
            };
            setTimeout(function () {
                _this2.socket.open('POST', _this2.uri, true);
            }, 0);
            return this;
        }
        /**
         * Disconnect the current connection for the given reason.
         *
         * @param reason
         */

    }, {
        key: 'disconnect',
        value: function disconnect(reason) {
            _logger2.default.info('Disconnecting ' + this.conId + ' due to ' + reason);
            this.status = ConnectionStatus.Closing;
            if (this.socket) {
                this.socket.abort();
            }
        }
        /**
         * Send data on the Ajax connection. Returns true if this is possible,
         * and false if it's not due to there being no open connection.
         *
         * @param data
         * @returns boolean True when the send was possible, False if it wasn't due to no connection being available.
         */

    }, {
        key: 'send',
        value: function send(data) {
            if (this.status === ConnectionStatus.Open) {
                if (data === '') {
                    _logger2.default.info('ignoring send of empty data');
                    return true;
                }
                var request = _protocol.MessageBuilder.formatConnectRequest(this.type, this.protocolVersion, this.authToken) + data;
                this.status = ConnectionStatus.AwaitingResponse;
                this.socket.send(request);
                return true;
            } else if (this.status === ConnectionStatus.AwaitingResponse) {
                // Due to the way our Ajax transport works (holding open a request until
                // there is data to receive) we need to manually terminate the connection
                // here so a new one will be established to send new data on.
                //
                // We return true here as we actually ignore the data that was attempted
                // to be sent here, when the connection manager reestablishes a socket
                // upstream code will re-subscribe to everything it wants which will mean
                // we get the data submitted to us again.
                _logger2.default.info('terminating existing connection as new data needs to be sent');
                this.disconnect(_transports.DisconnectReason.Requested);
                return true;
            } else {
                _logger2.default.info('socket status ' + this.status + ' so refusing send');
                return false;
            }
        }
    }]);

    return AjaxTransport;
}();

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConnectionStatus = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ConnectionEvent = __webpack_require__(16);

var _ConnectionEvent2 = _interopRequireDefault(_ConnectionEvent);

var _transports = __webpack_require__(8);

var _logger = __webpack_require__(9);

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConnectionStatus = exports.ConnectionStatus = undefined;
(function (ConnectionStatus) {
    ConnectionStatus["CONNECTING"] = "Connecting";
    ConnectionStatus["CONNECTED"] = "Connected";
    ConnectionStatus["DISCONNECTED"] = "Disconnected";
})(ConnectionStatus || (exports.ConnectionStatus = ConnectionStatus = {}));
/**
 * The ConnectionManager class looks after establishing and maintaining an
 * active connection to LiveServ.
 */

var ConnectionManager = function () {
    function ConnectionManager(configuration, authToken) {
        var _this = this;

        _classCallCheck(this, ConnectionManager);

        this.status = ConnectionStatus.DISCONNECTED;
        this.ok = false;
        this.sendBuffer = [];
        this.connectionEventListeners = new Map();
        /**
         * Helper that deals with any buffered data and announces we've now got a
         * connection established.
         */
        this.handleConnected = function (event) {
            _logger2.default.info('received connected event in ConnectionManager, have "%s" buffered to send', _this.sendBuffer.join(''));
            _this.status = ConnectionStatus.CONNECTED;
            _this.ok = true;
            // drain and send any buffered data
            var bufferedData = _this.sendBuffer.splice(0).join('');
            if (bufferedData !== '') {
                _logger2.default.info('sending buffered data, %s', bufferedData);
                _this.socket.send(bufferedData);
            }
            // inform all listeners that the connection is now up
            if (!_this.connectionEventListeners.has(_ConnectionEvent2.default.CONNECTED)) {
                return;
            }
            _this.connectionEventListeners.get(_ConnectionEvent2.default.CONNECTED).forEach(function (listener) {
                return listener(event);
            });
        };
        /**
         * Helper that looks after reconnection following a disconnect, depending on
         * why we disconnected we may reconnect immediately or drop into a delay.
         */
        this.handleDisconnected = function (reason) {
            _logger2.default.info('received disconnected event in ConnectionManager with reason, %s', reason);
            _this.status = ConnectionStatus.DISCONNECTED;
            _this.ok = false;
            if (reason === _transports.DisconnectReason.Expected) {
                // an expected disconnect (i.e. one that is controlled and not the result
                // of a dodgy network) is reconnected without any delay
                _this.reconnect(false);
            } else {
                _this.reconnect();
            }
        };
        /**
         * Helper to announce a message to all listeners.
         */
        this.handleMessage = function (message) {
            if (!_this.connectionEventListeners.has(_ConnectionEvent2.default.MESSAGE)) {
                return;
            }
            _this.connectionEventListeners.get(_ConnectionEvent2.default.MESSAGE).forEach(function (listener) {
                return listener(message);
            });
        };
        /**
         * Helper to announce an error to all listeners.
         */
        this.handleError = function (error) {
            if (!_this.connectionEventListeners.has(_ConnectionEvent2.default.ERROR)) {
                return;
            }
            _this.connectionEventListeners.get(_ConnectionEvent2.default.ERROR).forEach(function (listener) {
                return listener(error);
            });
        };
        this.configuration = configuration;
        this.authToken = authToken;
        _logger2.default.info('initialised ConnectionManager with servers %o, version %s, and authToken %s', configuration.servers, configuration.version, authToken);
    }
    /**
     * Allow a client to attach listeners to connection events in a simple way.
     *
     * @param event
     * @param callback
     */


    _createClass(ConnectionManager, [{
        key: 'on',
        value: function on(event, listener) {
            _logger2.default.info('registered %s event listener', event);
            // Either append to the existing array of event functions or create
            // a new entry and push to that
            this.connectionEventListeners.has(event) ? this.connectionEventListeners.get(event).push(listener) : this.connectionEventListeners.set(event, [listener]);
            return this;
        }
        /**
         * Allow a client to set a user authorisation token to be used on the
         * connection to support per-user channel subscription.
         *
         * @param authToken
         */

    }, {
        key: 'setAuthToken',
        value: function setAuthToken(authToken) {
            this.authToken = authToken;
            if (this.status !== ConnectionStatus.DISCONNECTED) {
                // we reset the connection attempts so that there isn't any delay
                // in applying the new token
                this.currentServer.connectionAttempts = 0;
                this.socket.disconnect(_transports.DisconnectReason.Requested);
            }
        }
        /**
         * Allow a client to clear a user authorisation token, for example when a
         * user has signed out.
         *
         * @param authToken
         */

    }, {
        key: 'clearAuthToken',
        value: function clearAuthToken() {
            this.setAuthToken(undefined);
        }
    }, {
        key: 'open',
        value: function open() {
            var _this2 = this;

            if (this.status !== ConnectionStatus.DISCONNECTED) {
                _logger2.default.info('already connected, not opening new connection');
                return;
            }
            // Determine the connection type we should establish and then do so.
            this.chooseServer().then(function (server) {
                _this2.currentServer = server;
                _this2.status = ConnectionStatus.CONNECTING;
                switch (_this2.currentServer.type) {
                    case _transports.TransportType.Websocket:
                        _this2.socket = new _transports.WebsocketTransport(_this2.configuration.version, _this2.currentServer.uri, _this2.authToken, _this2.configuration.connection);
                        break;
                    case _transports.TransportType.LongPoll:
                        _this2.socket = new _transports.AjaxTransport(_this2.configuration.version, _this2.currentServer.uri, _this2.authToken);
                        break;
                }
                _this2.socket.on(_ConnectionEvent2.default.CONNECTED, _this2.handleConnected).on(_ConnectionEvent2.default.DISCONNECTED, _this2.handleDisconnected).on(_ConnectionEvent2.default.MESSAGE, _this2.handleMessage).on(_ConnectionEvent2.default.ERROR, _this2.handleError).connect();
            }).catch(function (failure) {
                _logger2.default.info('No servers found to establish connection - %s', failure);
            });
            return this;
        }
        /**
         * Reconnection routine, this implements an exponential backoff algorithm so
         * we don't just keep hammering away on a connection that isn't working.
         */

    }, {
        key: 'reconnect',
        value: function reconnect() {
            var unexpected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            if (this.status !== ConnectionStatus.DISCONNECTED) {
                _logger2.default.info('reconnect called on a disconnected connection, ignoring');
                return;
            }
            if (!unexpected) {
                // immediate reconnect when requested, skipping all backoff - this is
                // mainly used for long poll transports where we expect to get reconnects
                // and they're not something we want to slow down
                this.open();
                return;
            }
            if (this.currentServer.connectionAttempts >= this.configuration.connection.retries) {
                _logger2.default.info('reconnection attempts exhausted, will reset after %s seconds cooldown', this.configuration.connection.cooldownSeconds);
                this.currentServer.blacklistedUntil = Date.now() + this.configuration.connection.cooldownSeconds * 1000;
                this.currentServer.connectionAttempts = 0;
                // call open, this will attempt to choose a new server and connect
                this.open();
                return;
            }
            // when connection attempts is zero we don't delay, otherwise we back off
            // exponentially
            var delaySeconds = this.currentServer.connectionAttempts ? Math.min(Math.pow(2, this.currentServer.connectionAttempts++), this.configuration.connection.maxRetryDelaySeconds) : this.currentServer.connectionAttempts++;
            _logger2.default.info('blacklisting %s for %s seconds', this.currentServer.uri, delaySeconds);
            this.currentServer.blacklistedUntil = Date.now() + delaySeconds * 1000;
            this.open();
        }
        /**
         * Helper to get a server to use for opening a connection. Looks after making
         * sure the server is good for use and isn't currently blacklisted.
         */

    }, {
        key: 'chooseServer',
        value: function chooseServer() {
            // We get the first non-blacklisted server, the priority ordering is
            // handled for us within the configuration - first is preferred.
            var server = this.configuration.servers.find(function (server) {
                return Date.now() > server.blacklistedUntil ? true : false;
            });
            if (server) {
                return new Promise(function (resolve) {
                    resolve(server);
                });
            }
            // all the servers are blacklisted, find the first one that will not be
            // blacklisted, we'll hand that one back once the appropriate time has passed
            var nextOkServer = [].concat(_toConsumableArray(this.configuration.servers)).sort(function (a, b) {
                // sort in descending order, next one to not be blacklisted will be first
                return b.blacklistedUntil < a.blacklistedUntil ? 1 : 0;
            })[0];
            if (nextOkServer) {
                var waitMS = nextOkServer.blacklistedUntil - Date.now();
                _logger2.default.info('waiting %ss for next usable server', (waitMS / 1000).toFixed(0));
                return new Promise(function (resolve) {
                    setTimeout(function () {
                        resolve(nextOkServer);
                    }, waitMS);
                });
            }
            return Promise.reject('NO_SERVERS_AVAILABLE');
        }
        /**
         * Send a message to the connected server. This will buffer any messages that
         * are requested to be sent when there isn't an active connection available.
         * All buffered messages will be sent once a connection is established.
         *
         * @param data
         */

    }, {
        key: 'send',
        value: function send(data) {
            _logger2.default.info('connection manager received data to send, %s', data);
            // If the socket isn't connected for any reason we buffer all send messages
            // received, they're flushed when we receive a connection established event.
            if (this.status !== ConnectionStatus.CONNECTED) {
                _logger2.default.info('buffering data %o for sending once a connection is established');
                this.sendBuffer.push(data);
                return;
            }
            var ok = this.socket.send(data);
            // we never expect this to occur, but in the odd case that somehow we don't
            // know the underlying socket isn't usable and attmept to send on it and
            // receive a bad response we'll buffer the data so it will be sent once we
            // do have a good connection
            if (!ok) {
                _logger2.default.info('buffering send data due to underlying socket refusing send');
                this.sendBuffer.push(data);
            }
        }
    }]);

    return ConnectionManager;
}();

exports.default = ConnectionManager;

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.groupChannelsByLastMsgId = groupChannelsByLastMsgId;
exports.buildChannelsRequest = buildChannelsRequest;

var _protocol = __webpack_require__(14);

/**
 * Iterate over the channel subscriptions set provided and group by common
 * `lastMsgId`, returning a new map just with channel names themselves as
 * the value.
 *
 * @param channels
 */
function groupChannelsByLastMsgId(channels) {
    var groupedChannels = new Map();
    channels.forEach(function (_ref) {
        var channel = _ref.channel,
            lastMsgId = _ref.lastMsgId;

        groupedChannels.has(lastMsgId) ? groupedChannels.get(lastMsgId).push(channel) : groupedChannels.set(lastMsgId, [channel]);
    });
    return groupedChannels;
}
/**
 * Given a map of channel subscriptions this will create a string suitable for
 * sending to LiveServ to subscribe to the channels honouring the `lastMsgId`
 * values set for each.
 *
 * @param channels
 */
function buildChannelsRequest(channels) {
    var channelSubscriptions = [];
    // we group by `lastMsgId` for efficiency, pack the channels at that point
    // behind the single instead of duplicating it
    groupChannelsByLastMsgId(channels).forEach(function (channels, lastMsgId) {
        channelSubscriptions.push(_protocol.MessageBuilder.formatSubscribeRequest(channels, lastMsgId));
    });
    return channelSubscriptions.join('');
}

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var STORAGE_ID = {
    SYNDICATED_MESSAGES_CACHE: "GCM_sj_notifications"
};

var GcmStorage = exports.GcmStorage = function () {
    function GcmStorage() {
        _classCallCheck(this, GcmStorage);
    }

    _createClass(GcmStorage, [{
        key: "getSyndicatedNotifications",
        value: function getSyndicatedNotifications() {
            if (localStorage.getItem(STORAGE_ID.SYNDICATED_MESSAGES_CACHE) === null) {
                localStorage.setItem(STORAGE_ID.SYNDICATED_MESSAGES_CACHE, JSON.stringify([]));
            }
            return JSON.parse(localStorage.getItem(STORAGE_ID.SYNDICATED_MESSAGES_CACHE));
        }
    }, {
        key: "hasSyndicatedMessageBeenShow",
        value: function hasSyndicatedMessageBeenShow(messageId) {
            var knownNotifications = this.getSyndicatedNotifications();
            return knownNotifications.includes(messageId);
        }
    }, {
        key: "appendShownSyndicationMessage",
        value: function appendShownSyndicationMessage(messageid) {
            var knownNotifications = this.getSyndicatedNotifications();
            knownNotifications.push(messageid);
            localStorage.setItem(STORAGE_ID.SYNDICATED_MESSAGES_CACHE, JSON.stringify(knownNotifications));
        }
    }]);

    return GcmStorage;
}();

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {(function(global) {
  /**
   * Polyfill URLSearchParams
   *
   * Inspired from : https://github.com/WebReflection/url-search-params/blob/master/src/url-search-params.js
   */

  var checkIfIteratorIsSupported = function() {
    try {
      return !!Symbol.iterator;
    } catch(error) {
      return false;
    }
  };


  var iteratorSupported = checkIfIteratorIsSupported();

  var createIterator = function(items) {
    var iterator = {
      next: function() {
        var value = items.shift();
        return { done: value === void 0, value: value };
      }
    };

    if(iteratorSupported) {
      iterator[Symbol.iterator] = function() {
        return iterator;
      };
    }

    return iterator;
  };

  /**
   * Search param name and values should be encoded according to https://url.spec.whatwg.org/#urlencoded-serializing
   * encodeURIComponent() produces the same result except encoding spaces as `%20` instead of `+`.
   */
  var serializeParam = function(value) {
    return encodeURIComponent(value).replace(/%20/g, '+');
  };

  var deserializeParam = function(value) {
    return decodeURIComponent(value).replace(/\+/g, ' ');
  };

  var polyfillURLSearchParams= function() {

    var URLSearchParams = function(searchString) {
      Object.defineProperty(this, '_entries', { value: {} });

      if(typeof searchString === 'string') {
        if(searchString !== '') {
          searchString = searchString.replace(/^\?/, '');
          var attributes = searchString.split('&');
          var attribute;
          for(var i = 0; i < attributes.length; i++) {
            attribute = attributes[i].split('=');
            this.append(
              deserializeParam(attribute[0]),
              (attribute.length > 1) ? deserializeParam(attribute[1]) : ''
            );
          }
        }
      } else if(searchString instanceof URLSearchParams) {
        var _this = this;
        searchString.forEach(function(value, name) {
          _this.append(value, name);
        });
      }
    };

    var proto = URLSearchParams.prototype;

    proto.append = function(name, value) {
      if(name in this._entries) {
        this._entries[name].push(value.toString());
      } else {
        this._entries[name] = [value.toString()];
      }
    };

    proto.delete = function(name) {
      delete this._entries[name];
    };

    proto.get = function(name) {
      return (name in this._entries) ? this._entries[name][0] : null;
    };

    proto.getAll = function(name) {
      return (name in this._entries) ? this._entries[name].slice(0) : [];
    };

    proto.has = function(name) {
      return (name in this._entries);
    };

    proto.set = function(name, value) {
      this._entries[name] = [value.toString()];
    };

    proto.forEach = function(callback, thisArg) {
      var entries;
      for(var name in this._entries) {
        if(this._entries.hasOwnProperty(name)) {
          entries = this._entries[name];
          for(var i = 0; i < entries.length; i++) {
            callback.call(thisArg, entries[i], name, this);
          }
        }
      }
    };

    proto.keys = function() {
      var items = [];
      this.forEach(function(value, name) { items.push(name); });
      return createIterator(items);
    };

    proto.values = function() {
      var items = [];
      this.forEach(function(value) { items.push(value); });
      return createIterator(items);
    };

    proto.entries = function() {
      var items = [];
      this.forEach(function(value, name) { items.push([name, value]); });
      return createIterator(items);
    };

    if(iteratorSupported) {
      proto[Symbol.iterator] = proto.entries;
    }

    proto.toString = function() {
      var searchString = '';
      this.forEach(function(value, name) {
        if(searchString.length > 0) searchString+= '&';
        searchString += serializeParam(name) + '=' + serializeParam(value);
      });
      return searchString;
    };

    global.URLSearchParams = URLSearchParams;
  };

  if(!('URLSearchParams' in global) || (new URLSearchParams('?a=1').toString() !== 'a=1')) {
    polyfillURLSearchParams();
  }

  // HTMLAnchorElement

})(
  (typeof global !== 'undefined') ? global
    : ((typeof window !== 'undefined') ? window
    : ((typeof self !== 'undefined') ? self : this))
);

(function(global) {
  /**
   * Polyfill URL
   *
   * Inspired from : https://github.com/arv/DOM-URL-Polyfill/blob/master/src/url.js
   */

  var checkIfURLIsSupported = function() {
    try {
      var u = new URL('b', 'http://a');
      u.pathname = 'c%20d';
      return (u.href === 'http://a/c%20d') && u.searchParams;
    } catch(e) {
      return false;
    }
  };


  var polyfillURL = function() {
    var _URL = global.URL;

    var URL = function(url, base) {
      if(typeof url !== 'string') url = String(url);

      var doc = document.implementation.createHTMLDocument('');
      window.doc = doc;
      if(base) {
        var baseElement = doc.createElement('base');
        baseElement.href = base;
        doc.head.appendChild(baseElement);
      }

      var anchorElement = doc.createElement('a');
      anchorElement.href = url;
      doc.body.appendChild(anchorElement);
      anchorElement.href = anchorElement.href; // force href to refresh

      if(anchorElement.protocol === ':' || !/:/.test(anchorElement.href)) {
        throw new TypeError('Invalid URL');
      }

      Object.defineProperty(this, '_anchorElement', {
        value: anchorElement
      });
    };

    var proto = URL.prototype;

    var linkURLWithAnchorAttribute = function(attributeName) {
      Object.defineProperty(proto, attributeName, {
        get: function() {
          return this._anchorElement[attributeName];
        },
        set: function(value) {
          this._anchorElement[attributeName] = value;
        },
        enumerable: true
      });
    };

    ['hash', 'host', 'hostname', 'port', 'protocol', 'search']
    .forEach(function(attributeName) {
      linkURLWithAnchorAttribute(attributeName);
    });

    Object.defineProperties(proto, {

      'toString': {
        get: function() {
          var _this = this;
          return function() {
            return _this.href;
          };
        }
      },

      'href' : {
        get: function() {
          return this._anchorElement.href.replace(/\?$/,'');
        },
        set: function(value) {
          this._anchorElement.href = value;
        },
        enumerable: true
      },

      'pathname' : {
        get: function() {
          return this._anchorElement.pathname.replace(/(^\/?)/,'/');
        },
        set: function(value) {
          this._anchorElement.pathname = value;
        },
        enumerable: true
      },

      'origin': {
        get: function() {
          // get expected port from protocol
          var expectedPort = {'http:': 80, 'https:': 443, 'ftp:': 21}[this._anchorElement.protocol];
          // add port to origin if, expected port is different than actual port
          // and it is not empty f.e http://foo:8080
          // 8080 != 80 && 8080 != ''
          var addPortToOrigin = this._anchorElement.port != expectedPort &&
            this._anchorElement.port !== ''

          return this._anchorElement.protocol +
            '//' +
            this._anchorElement.hostname +
            (addPortToOrigin ? (':' + this._anchorElement.port) : '');
        },
        enumerable: true
      },

      'password': { // TODO
        get: function() {
          return '';
        },
        set: function(value) {
        },
        enumerable: true
      },

      'username': { // TODO
        get: function() {
          return '';
        },
        set: function(value) {
        },
        enumerable: true
      },

      'searchParams': {
        get: function() {
          var searchParams = new URLSearchParams(this.search);
          var _this = this;
          ['append', 'delete', 'set'].forEach(function(methodName) {
            var method = searchParams[methodName];
            searchParams[methodName] = function() {
              method.apply(searchParams, arguments);
              _this.search = searchParams.toString();
            };
          });
          return searchParams;
        },
        enumerable: true
      }
    });

    URL.createObjectURL = function(blob) {
      return _URL.createObjectURL.apply(_URL, arguments);
    };

    URL.revokeObjectURL = function(url) {
      return _URL.revokeObjectURL.apply(_URL, arguments);
    };

    global.URL = URL;

  };

  if(!checkIfURLIsSupported()) {
    polyfillURL();
  }

  if((global.location !== void 0) && !('origin' in global.location)) {
    var getOrigin = function() {
      return global.location.protocol + '//' + global.location.hostname + (global.location.port ? (':' + global.location.port) : '');
    };

    try {
      Object.defineProperty(global.location, 'origin', {
        get: getOrigin,
        enumerable: true
      });
    } catch(e) {
      setInterval(function() {
        global.location.origin = getOrigin();
      }, 100);
    }
  }

})(
  (typeof global !== 'undefined') ? global
    : ((typeof window !== 'undefined') ? window
    : ((typeof self !== 'undefined') ? self : this))
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ }),
/* 136 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WIDGET_UI = undefined;

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _HTMLUtil = __webpack_require__(138);

var _HTMLUtil2 = _interopRequireDefault(_HTMLUtil);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var WIDGET_UI = exports.WIDGET_UI = 'Widget_UI';

var WidgetUIAdaptor = function () {
  function WidgetUIAdaptor(gameSparksHandler) {
    var _this = this;

    _classCallCheck(this, WidgetUIAdaptor);

    this.widgetUI = document.createElement('div');
    //This is the id the widget appends children to (do not change the name, unless you change the name in the FeatureUI project as well)
    this.widgetUI.id = 'featureWidget';
    this.widgetUI.zIndex = 10002;
    this.widgetFailedToLoad = false;
    this.gameSparksHander = gameSparksHandler;

    this.loadWidgetScript().then(function (result) {
      _this.widget = window.featureWidget;
      _this.widget.initWidget(_this.gameSparksHander);
    }).catch(function (err) {
      _this.widgetFailedToLoad = true;
    });

    this.handleFeatureNotification = function (data) {
      _this.sendNotificationToWidget(data);
    };
  }

  _createClass(WidgetUIAdaptor, [{
    key: 'loadWidgetScript',
    value: function loadWidgetScript() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _HTMLUtil2.default.asyncAppendToBody(_this2.widgetUI).then(function (result) {
          _HTMLUtil2.default.addScript(_this2.gameSparksHander.gcmOrigin + '/feature-ui-widget/js/main.js').then(function (result) {
            resolve();
          }).catch(function (err) {
            document.body.removeChild(_this2.widgetUI);
            reject();
          });
        }).catch(function (err) {
          reject();
        });
      });
    }
  }, {
    key: 'sendNotificationToWidget',
    value: function sendNotificationToWidget(data) {
      var _this3 = this;

      if (this.widgetFailedToLoad) return;

      if (this.widget) {
        this.widget.handleFeatureUpdates(data);
      } else {
        setTimeout(function () {
          _this3.handleFeatureNotification(data);
        }, 1000);
      }
    }
  }]);

  return WidgetUIAdaptor;
}();

exports.default = WidgetUIAdaptor;

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _es6Promise = __webpack_require__(25);

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var HtmlUtilities = function () {
    function HtmlUtilities() {
        _classCallCheck(this, HtmlUtilities);

        if (!HtmlUtilities.instance) {
            HtmlUtilities.instance = this;
        }

        return HtmlUtilities.instance;
    }

    _createClass(HtmlUtilities, [{
        key: 'addScript',
        value: function addScript(scriptUrl) {
            return new _es6Promise.Promise(function (resolve, reject) {
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = scriptUrl;
                script.addEventListener('load', function () {
                    return resolve(script);
                }, false);
                script.addEventListener('error', function () {
                    return reject(script);
                }, false);
                document.body.appendChild(script);
            });
        }
    }, {
        key: 'asyncAppendToBody',
        value: function asyncAppendToBody(element) {
            return new _es6Promise.Promise(function (resolve, reject) {
                try {
                    document.body.appendChild(element);
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }]);

    return HtmlUtilities;
}();

var HtmlUtils = new HtmlUtilities();
exports.default = HtmlUtils;

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OgsClient = undefined;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _axios = __webpack_require__(22);

var _axios2 = _interopRequireDefault(_axios);

var _es6Promise = __webpack_require__(25);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

/**
 * Provides the methods to communicate with the OGS Client API.
 *
 * @class
 */
var OgsClient = exports.OgsClient = function () {
    function OgsClient() {
        _classCallCheck(this, OgsClient);
    }

    /**
     * OgsClient init
     *
     * @param {Object} ogsClientConfiguration The Ogs Client configuration
     * @param {Object} ogsParams  These are the standard list of parameters that OGS passes to game providers.
     */

    _createClass(OgsClient, [{
        key: 'init',
        value: function init(ogsClientConfiguration, ogsParams) {
            this.url = ogsClientConfiguration.url;
            this.basePath = "ogsclient";
            this.ogsParams = ogsParams;
            this.axiosClient = _axios2.default.create({});
        }

        /**
         * Builds and returns the Ogs Client API base uri.
         *
         * @private
         */

    }, {
        key: 'buildBaseUri',
        value: function buildBaseUri() {
            return this.url + "/" + this.basePath;
        }

        /**
         * Builds and returns OGS Client API endpoint for the token retrieval.
         *
         * @private
         */

    }, {
        key: 'buildLiveServAuthenticationUri',
        value: function buildLiveServAuthenticationUri() {
            return this.buildBaseUri() + "/getliveservtoken";
        }

        /**
         * Performs a call to the OGS Client API getliveservtoken endpoint.
         * On success returns the Liveserv Token and the Channel Id.
         * On failure returns the error message.
         *
         * @param {Object} ogsClientToken - require information for liveServ
         *
         * @returns {Promise} Promise object that contains the Liveserv auth token and the channel id, or an Error if rejected
         */

    }, {
        key: 'getLiveServToken',
        value: function getLiveServToken(ogsClientToken) {
            var url = this.buildLiveServAuthenticationUri();
            var params = {
                "opId": this.ogsParams.operatorid,
                "device": this.ogsParams.device,
                "currency": this.ogsParams.currency,
                "gpGameId": this.ogsParams.gameid,
                "ogsClientToken": ogsClientToken
            };

            return this.axiosClient.post(url, params).then(function (response) {
                if (response.data.rc == 0) return response.data;else _es6Promise.Promise.reject(error.response.data);
            }).catch(function (error) {
                if (error.response != undefined) {
                    switch (error.response.status) {
                        case 401:
                            return _es6Promise.Promise.reject(error.response.data);
                    }
                }
                return _es6Promise.Promise.reject(error);
            });
        }
    }]);

    return OgsClient;
}();

exports.default = OgsClient;

/***/ })
/******/ ]);


// WEBPACK FOOTER //
// target/resources/build/js/gcm.js