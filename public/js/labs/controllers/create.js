/* 
 * Created by Palo Verde Programming Services, LLC.
 * All rights reserved unless otherwise specified under contract.
 * http://palo-verde.us/
 * @author Sam McCallum <sam@palo-verde.us>
 * @copyright Jul 20, 2010
 */


var Create_Controller = new Class({
	options: {
		errors: "error",
		labs: "labs",
		service: "/service/lab",
		fetcher: "/index/showlab",
		input: "lab-name",
		submit: "make-lab"
	},

	rpcId: 1,

	initialize: function (options) {
		this.options = $extend(this.options, options || {});
		this.initService();
		this.initFetcher();
		$(this.options.submit).addEvent("click",
			this.handle.bindWithEvent(this)
		);


	},

	initService: function () {
		this.service = new Request.JSON({url: this.options.service});
		this.service.addEvent("success", function (response) {
			if (response.error)
				this.error(response.error);
			else
				this.show(response.result);
		}.bind(this));
	},

	error: function (error) {
		$(this.options.errors).adopt(
			new Element("h3").set("text", error.message)
		);
	},

	show: function (lab) {
		// fetch the new lab message
		this.fetcher.get({
			code: lab.code,
			name: lab.name}
		);

		// Hide any old errors
		$(this.options.errors).empty();
	},

	initFetcher: function () {
		this.fetcher = new Request.HTML({url: this.options.fetcher});
		this.fetcher.addEvent("success", function (tree, node, html) {
			$(this.options.labs).adopt(tree);
            addthis.toolbox(".addthis_toolbox");
		}.bind(this));
	},

	handle: function (event) {
		event.stop();
		this.service.post({
			method: 'create',
			id: this.rpcId,
			params: [$(this.options.input).value]
		});
		this.rpcId++;
	}
});