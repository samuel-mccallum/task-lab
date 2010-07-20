/* 
 * Created by Palo Verde Programming Services, LLC.
 * All rights reserved unless otherwise specified under contract.
 * http://palo-verde.us/
 * @author Sam McCallum <sam@palo-verde.us>
 * @copyright Jul 20, 2010
 */

var TaskList_Controller = new Class({
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