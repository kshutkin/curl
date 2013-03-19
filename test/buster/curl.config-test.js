(function (buster, define) {

var assert, refute, fail;

assert = buster.assert;
refute = buster.refute;
//fail = buster.assertions.fail;

define(function (require) {

	var curl, config,
		pkgDescriptor1, pkgDescriptor2, pkgDescriptor3, pkgDescriptor4,
		normalized1, normalized2, normalized3, normalized4;

	curl = require('curl');
	config = curl('curl/config');

	pkgDescriptor1 = {
		name: 'name',
		location: 'lib/name/lib',
		main: './index'
	};

	pkgDescriptor2 = {
		name: 'foo',
		location: 'lib/foo/' // trailing slash
		// no main
	};

	pkgDescriptor3 = {
		name: 'foo/bar', // extra specificity
		location: 'lib/foo/bar',
		main: 'foo'
	};

	// string descriptor (like paths config)
	pkgDescriptor4 = 'lib/jquery/jquery1.8.min';

	normalized1 = config.normalizePkgDescriptor(pkgDescriptor1, null, true);
	normalized2 = config.normalizePkgDescriptor(pkgDescriptor2, null, true);
	normalized3 = config.normalizePkgDescriptor(pkgDescriptor3, null, true);
	normalized4 = config.normalizePkgDescriptor(pkgDescriptor4, 'jquery', false);

	buster.testCase('config.normalizePkgDescriptor', {
		'should beget original descriptor': function () {
			var orig = { name: 'foo', other: 42 }, desc;
			desc = config.normalizePkgDescriptor(orig);
			refute.same(orig, desc, 'beget');
			assert.equals(orig.name, desc.name, 'inherited standard props');
			assert.equals(orig.other, desc.other, 'inherited other props');
		},
		'should normalize properties': function () {
			assert.equals(normalized1.main, 'name/index', 'explicit relative main');
			assert.equals(normalized3.main, 'foo/bar/foo', 'implcit relative main');
			assert.equals(normalized1.path, pkgDescriptor1.location, 'location-->path');
			assert.equals(normalized1.path, 'lib/name/lib', 'remove trailing slash');
		},
		'should add standard properties': function () {
			assert.equals(normalized2.main, 'foo/main', 'missing main');
			assert.equals(normalized4.name, 'jquery', 'missing main');
			assert.equals(normalized4.path, 'lib/jquery/jquery1.8.min', 'missing path');
		},
		'should not allow name override': function () {
			var orig, desc;
			orig = { name: 'orig' };
			desc = config.normalizePkgDescriptor(orig, 'overridden');
			assert.equals(orig.name, desc.name);
		},
		'should not turn paths descriptors into packages': function () {
			refute(!!normalized4.main, 'added main property');
		}
	});

	buster.testCase('config.normalizePkgDescriptors', {
		'should return an array of normalized descriptors': function () {
			var list = config.normalizePkgDescriptors([
				pkgDescriptor1,
				pkgDescriptor3
			], true);
			assert.isArray(list, 'did not return an array');
			assert.equals(list.length, 2, 'wrong length');
			assert.equals(normalized1, list[0], 'first desc did not match');
			assert.equals(normalized3, list[1], 'second desc did not match');
		},
		'should not revisit inherited descriptors': function () {
			var inherited, list;
			inherited = beget({
				name: normalized1
			});
			list = config.normalizePkgDescriptors(inherited, true);
			assert.same(normalized1, list[0]);
		}
	});

	buster.testCase('config.arrayToPkgMap', {
		'should convert an array of package descriptors to a map': function () {
			var array, map;
			array = [
				pkgDescriptor1,
				pkgDescriptor2,
				pkgDescriptor3
			];
			map = config.arrayToPkgMap(array);
			assert.isObject(map);
			assert.equals(array.length, propertyCount(map), 'same number of descriptors');
			assert.same(array[0], map[pkgDescriptor1.name]);
			assert.same(array[1], map[pkgDescriptor2.name]);
			assert.same(array[2], map[pkgDescriptor3.name]);
		}
	});

	buster.testCase('config.generatePathMatcher', {
		'should generate an ordered regexp from a list of prepared descriptors': function () {
			// the "prepared descriptors" need to have a specificity and a toString()
			var list, i, rx;
			list = [
				{ name: 'foo', specificity: 1 },
				{ name: 'bar', specificity: 1 },
				{ name: 'baz', specificity: 1 },
				{ name: 'has.a.dot', specificity: 1 },
				{ name: 'has/a/slash', specificity: 3 }
			];
			for (i = 0; i < list.length; i++) {
				list[i].toString = function () { return this.name; };
			}
			rx = config.generatePathMatcher(list);
			assert(rx instanceof RegExp, 'generates a RegExp');
			for (i = 0; i < list.length; i++) {
				assert.less(-1, rx.toString().indexOf(rxEscape(list[i].name)), 'includes (escaped) ' + list[i]);
			}
			assert.less(rx.toString().indexOf('has\\/a\\/slash'), rx.toString().indexOf('foo'), 'higher specificity first');
		}
	});

	buster.testCase('config.config', {
		'// should be tested': function () {}
	});

	buster.testCase('config.setApi', {
		'// should be tested': function () {}
	});

	function beget (obj) {
		function F () {}
		F.prototype = obj;
		return new F();
	}

	function propertyCount (obj) {
		var count = 0, p;
		for (p in obj) count++;
		return count;
	}

	function rxEscape (it) {
		return it.replace(/\/|\./g, '\\$&');
	}

});
}(
	this.buster || require('buster'),
	typeof define == 'function' && define.amd
		? define
		: function (factory) { module.exports = factory(require); }
));