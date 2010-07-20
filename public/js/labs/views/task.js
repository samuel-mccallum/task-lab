/* 
 * Created by Palo Verde Programming Services, LLC.
 * All rights reserved unless otherwise specified under contract.
 * http://palo-verde.us/
 * @author Sam McCallum <sam@palo-verde.us>
 * @copyright Jul 20, 2010
 */

var Task_View = new Class({
	initialize: function () {},

	render: function (options) {
		this[options.view](options.data);
	},

	list: function (tasks) {
		$each(tasks, function (task) {
			var task_holder;
			switch (task.status_id) {
				case '1':
					task_holder = "queued";
				break;
				case '2':
					task_holder = "current";
				break;
				case '3':
					task_holder = "completed";
				break;
				default:
					throw("Can't determine the task container in Task_View#list.");
			}
			this.task(task, task_holder);
		}.bind(this));
	},

	task: function (task, holder) {
		$(holder).grab(new Element("h4").set("text", task.name));
	}
});
