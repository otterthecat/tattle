(function(){

	var _os, _browser, _version, _size;	

	// TODO - complete list of browsers
	var ff_regex = /\bFirefox\/\b[0-9.]+/;
	var sf_regex = /[0-9.]+ \bSafari\b/;

	var _set_os = function(){

		_os = navigator.oscpu;
	};

	var _set_browser = function(){

		var nav_str = navigator.userAgent;

		if(ff_regex.test(nav_str)){

			_browser = 'Firefox';
			_version = ff_regex.exec(nav_str)[0].substr(8);
			return false;
		}

		if(sf_regex.test(nav_str)){

			_browser = 'Safari';
			_version = '';
			return false;
		}
	};

	var _set_size = function(){

		_size = {x: window.innerWidth, y: window.innerHeight};
	};

	var Browser = function(){

		_set_os();
		_set_browser();
		_set_size();
	};

	Browser.prototype = {


		getOS: function(){

			return _os;
		},


		getBrowser: function(){

			return _browser;
		},

		getVersion: function(){

			return _version;
		},

		getSize: function(){

			return _size;
		}
	};


	window.BROWSER = new Browser();

})();