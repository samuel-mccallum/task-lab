/**
 * Controller for the add task form and associated interactions
 */
var Task_Form_Controller = new Class({
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

/*
 * Controller to manage the adding/removing and updating of tasks in the list.
 */
var Task_List_Controller = new Class({
	initialize: function () {
		this.model = new Task_Model();
		this.view = new Task_View();

		document.addEvent(":task saved", function (args) {
			this.view.render({view: "list", data: [args.result]});
		}.bind(this));
		
		this.show();
	},

	show: function () {
		this.model.findByLabId(lab.id, this.showCallback.bind(this));
	},

	showCallback: function (t) {
		this.view.render({view: "list", data: t.result});
	}
});

/**
 * A view to render tasks on the display
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

/**
 * A model to represent the tasks
 */
var Task_Model = new Class({
	service: function (method, params, callback) {
		var server = new Request.JSON({
			url: "/service/task",
			onSuccess: callback
		});
		server.post({method: method, params: params, id: 1});
	},

	findAll: function (callback) {
		this.service("findAll", [], callback);
	},

	find: function (id, callback) {
		this.service("find", [id], callback);
	},

	findByLabId: function (lab_id, callback) {
		this.service("findByLabId", [lab_id], callback);
	},

	create: function (params, callback) {
		this.service("create", params, callback);
	},

	update: function (task) {

	},

	destroy: function (id) {
		
	}
});

/*
 * On Load Event Handler
 */
document.addEvent("domready", function () {
	new Task_Form_Controller();
	new Task_List_Controller();
});
