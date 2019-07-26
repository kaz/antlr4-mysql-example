//
/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
//

function CaseInsensitiveInputStream(stream, upper) {
	this._stream = stream;
	this._upper = upper;
}

CaseInsensitiveInputStream.prototype.LA = function(offset) {
	var c = this._stream.LA(offset);
	if (c <= 0) {
		return c;
	}
	return String.fromCodePoint(c)[this._upper ? "toUpperCase" : "toLowerCase"]().codePointAt(0);
};

CaseInsensitiveInputStream.prototype.reset = function() {
	return this._stream.reset();
};

CaseInsensitiveInputStream.prototype.consume = function() {
	return this._stream.consume();
};

CaseInsensitiveInputStream.prototype.LT = function(offset) {
	return this._stream.LT(offset);
};

CaseInsensitiveInputStream.prototype.mark = function() {
	return this._stream.mark();
};

CaseInsensitiveInputStream.prototype.release = function(marker) {
	return this._stream.release(marker);
};

CaseInsensitiveInputStream.prototype.seek = function(_index) {
	return this._stream.seek(_index);
};

CaseInsensitiveInputStream.prototype.getText = function(start, stop) {
	return this._stream.getText(start, stop);
};

CaseInsensitiveInputStream.prototype.toString = function() {
	return this._stream.toString();
};

Object.defineProperty(CaseInsensitiveInputStream.prototype, "index", {
	get: function() {
		return this._stream.index;
	}
});

Object.defineProperty(CaseInsensitiveInputStream.prototype, "size", {
	get: function() {
		return this._stream.size;
	}
});

exports.CaseInsensitiveInputStream = CaseInsensitiveInputStream;
