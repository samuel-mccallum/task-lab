/* 
 * Created by Palo Verde Programming Services, LLC.
 * All rights reserved unless otherwise specified under contract.
 * http://palo-verde.us/
 * @author Sam McCallum <sam@palo-verde.us>
 * @copyright Jul 20, 2010
 */

var Task_View = new Class({
    template: false,
    templateLaoded: false,
    queue: [],

	initialize: function () {
        this.loadTemplate();
    },

    loadTemplate: function () {
        var request = new Request(
            {
                url: "/lab/task",
                onSuccess: function (resText) {
                    this.template = resText;
                    this.templateLoaded = true;
                    if (this.queue.length)
                        this.renderQueue();
                }.bind(this)
            }
        );
        request.get();
    },

    addToQueue: function (options) {
        this.queue.push(options);
    },

    renderQueue: function () {
        this.queue.each(function (item) {
            this.render(item);
        }.bind(this));
    },

	render: function (options) {
        if (this.templateLoaded)
            this[options.view](options.data);
        else
            this.addToQueue(options);
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
        var el = new Element("div");
        el.set("html", this.template.substitute(
            {
                task_id: task.id,
                task_name: task.name,
                task_description: task.description,
                task_created: task.created_on
            }
        ));
        $(holder).grab(el);
        document.fireEvent(":task rendered", el);
	}
});
