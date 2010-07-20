/* 
 * Created by Palo Verde Programming Services, LLC.
 * All rights reserved unless otherwise specified under contract.
 * http://palo-verde.us/
 * @author Sam McCallum <sam@palo-verde.us>
 * @copyright Jul 20, 2010
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
