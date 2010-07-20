/*
 * Created by Palo Verde Programming Services, LLC.
 * All rights reserved unless otherwise specified under contract.
 * http://palo-verde.us/
 * @author Sam McCallum <sam@palo-verde.us>
 * @copyright Feb 11, 2010
 */

var Verde = {};

Verde.Validator = new Class({
	options: {
		input: false, // input elment id
		errorClass: "f-error",
		checkingClass: "f-checking",
		validClass: "f-good",
		parentSelector: false,
		suppression: false
	},

	initialize: function (options) {
		this.options = $extend(this.options, options || {});
		this.suppressStateChanges(this.options.suppression);

		if (this.options.input) {
			this.input = $(this.options.input);
		} else {
			throw("No Input Option For Validation!");
		}

		if (this.options.parentSelector) {
			this.parent = this.input.getParent(this.options.parentSelector);
		} else {
			this.parent = this.input.getParent();
		}
	},

	/**
	 * Stop validatores from changing the state
	 */
	suppressStateChanges: function (toggle) {
		if (typeof(toggle) != "undefined") {
			this.suppression = toggle;
		} else {
			return this.suppression;
		}
	},

	clear: function () {
		this.removeClass(this.options.errorClass);
		this.removeClass(this.options.checkingClass);
		this.removeClass(this.options.validClass);
	},

	removeClass: function (className) {
		if (!this.suppressStateChanges()) {
			if (this.parent.hasClass(className)) {
				this.parent.removeClass(className);
			}
		}
	},

	changeState: function (stateClass) {
		if (!this.suppressStateChanges()) {
			this.clear();
			this.parent.addClass(stateClass);
		}
	},

	valid: function () {
		this.changeState(this.options.validClass);
	},

	checking: function () {
		this.changeState(this.options.checkingClass);
	},

	error: function () {
		this.changeState(this.options.errorClass);
	},

	validateThese: function (validators) {
		$A(validators).each(function (validator) {
			var handler = validator.bind(this);
			this.input.addEvent("blur", handler);
			this.input.addEvent("change", handler);
		}.bind(this));
	}
});

Verde.Validators = {
	notBlank: function () {
		if (this.input.value.trim() == "") {
			this.error();
			return false;
		}
		this.valid();
		return true;
	},

	noSpaces: function () {

	},

	allLower: function () {

	},

	email: function () {
		var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		if (emailPattern.test(this.input.value)) {
			this.valid();
			return true;
		} else {
			this.error();
			return false;
		}
	}
}

/*
 * The validation functions for specific forms
 */
Verde.Validate = {

	/*
	 * Validate the registration form
	 */
	registration: function () {
		new Verde.Validator({input: "login-username"}).validateThese([
			function () {
				this.checking();
				this.suppressStateChanges(true);

				var err = false;
				// Check the usename is valid
				if (!Verde.Validators.notBlank.run([],this)) err = true;
				// if (!Verde.Validators.noSpaces.run([],this)) err = true;
				// if (!Verde.Validators.allLower.run([],this)) err = true;

		 		if (!err) {
					var req = new Request.JSON({url: $usernameUrl});
					req.addEvent("success", function (jsn,txt) {
						if (!jsn) {
							jsn = JSON.decode(txt);
						}
						this.suppressStateChanges(false);

						if (jsn.available) {
							this.valid();
						} else {
							this.error();
						}
					}.bind(this));
					req.get({username: this.input.value})
				} else {
					this.suppressStateChanges(false);
					this.error();
				}
			}
		]);

		new Verde.Validator({input: "login-password"}).validateThese([
			Verde.Validators.notBlank,
			/* make sure it is greater than 5 characters */
			function () {
				console.log(this.input.value.trim().length);
				if (this.input.value.trim().length < 5) {
					this.error();
				} else {
					this.valid();
				}
			}
		]);

		new Verde.Validator({input: "password_confirmation"}).validateThese([
			Verde.Validators.notBlank,
			/* Make sure it matches the password field */
			function () {
				if (this.input.value == $("login-password").value) {
					this.valid();
				} else {
					this.error();
				}
			}
		]);

		new Verde.Validator({input: "login-email"}).validateThese([
			function () {
				this.checking();
				this.suppressStateChanges(true);


				var err = false;
				if (!Verde.Validators.notBlank.run([], this)) err = true;
				if (!Verde.Validators.email.run([], this)) err = true;

		 		if (!err) {
					var req = new Request.JSON({url: $emailUrl});
					req.addEvent("success", function (jsn,txt) {
						if (!jsn) {
							jsn = JSON.decode(txt);
						}
						this.suppressStateChanges(false);

						if (jsn.available) {
							this.valid();
						} else {
							this.error();
						}
					}.bind(this));
					req.post({email: this.input.value})
				} else {
					this.suppressStateChanges(false);
					this.error();
				}

			}
		]);

		new Verde.Validator({input: "promotion_code"}).validateThese([
			function () {
				if (this.input.value == "") {
					this.clear();
					return;
				}
				
				this.checking();
				this.suppressStateChanges(true);
				var req = new Request.JSON({url: $promotionUrl});
				req.addEvent("success", function (jsn, txt) {
					if (!jsn) {
						jsn = JSON.decode(txt);
					}
					this.suppressStateChanges(false);

					if (jsn.valid) {
						this.valid();
					} else {
						this.error();
					}
				}.bind(this));
				req.post({promotion_code: this.input.value});
			}
		]);

		new Verde.Validator({input: "contact-first"}).validateThese([Verde.Validators.notBlank]);
		new Verde.Validator({input: "contact-last"}).validateThese([Verde.Validators.notBlank]);
		new Verde.Validator({input: "contact-phone"}).validateThese([Verde.Validators.notBlank]);

		new Verde.Validator({input: "organization-name"}).validateThese([Verde.Validators.notBlank]);
		new Verde.Validator({input: "organization-street_1"}).validateThese([Verde.Validators.notBlank]);
		new Verde.Validator({input: "organization-city"}).validateThese([Verde.Validators.notBlank]);
		new Verde.Validator({input: "organization-state"}).validateThese([Verde.Validators.notBlank]);
		new Verde.Validator({input: "organization-zip"}).validateThese([Verde.Validators.notBlank]);

		var regForm = $("registration-form");
		regForm.addEvent("submit", function (ev) {
			if ($$("p.f-error").length) {
				// there are some error fields
				ev.stop();
				alert("There are a few error fields, look for the red Exes.");
			}
		});
	}
};

/**
 * Textarea Counter
 */
Verde.Textarea = {};
Verde.Textarea.Counter = new Class({
	options: {"textarea": "counted-textarea", "counter": "counter-id", "max": 100},
	initialize: function (options) {
		this.options = $extend(this.options, options);
		this.textarea = $(this.options.textarea);
		this.counter = $(this.options.counter);
		this.textarea.addEvent("keyup", this.handler.bind(this));
	},

	handler: function (ev) {
		this.counter.set("text", this.options.max - this.textarea.value.length);
	}
});

/**
 * Textarea Limiter
 */
Verde.Textarea.Limiter = new Class({
	options: {"textarea": "limited-textarea", "limit": 100},
	initialize: function (options) {
		this.options = $extend(this.options, options);
		this.textarea = $(this.options.textarea);
		this.textarea.addEvent("keydown", this.handler.bind(this));
	},

	handler: function (ev) {
		if (this.textarea.value.length == this.options.limit) {
			if (ev.key == "backspace" || ev.key == "delete") {
				return;
			}
			ev.stop();
		}
	}
});