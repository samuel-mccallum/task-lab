/* 
 * Created by Palo Verde Programming Services, LLC.
 * All rights reserved unless otherwise specified under contract.
 * http://palo-verde.us/
 * @author Sam McCallum <sam@palo-verde.us>
 * @copyright Jul 20, 2010
 */

var AddTask_Controller = new Class({
	initialize: function () {
		this.model = new Task_Model();
		$("add-task-button").addEvent("click", this.menu);
		$$(".close-task-form").addEvent("click", this.close);
		$("add-task").addEvent("submit", this.submit.bindWithEvent(this));
	},

	menu: function (ev) {
		ev.stop();
		$("add-task-container").toggle();
	},

	close: function (ev) {
		ev.stop();
		$("add-task-container").hide();
	},

	submit: function (ev) {
		ev.stop();
		this.model.create(this._getParams(), function (res) {
			document.fireEvent(":task saved", res);
		});
		$("add-task-container").hide();
	},

	_getParams: function () {
		var params = [
			lab.id,
			$("task-name").value,
			$("task-description").value,
			$$("input[type='radio']:checked")[0].value
		];
		return params;
	}
});