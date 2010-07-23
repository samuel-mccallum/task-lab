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
		document.addEvent(":task saved", this.onTaskSave.bind(this));
        document.addEvent(":task rendered", this.onTaskRender.bind(this));
		this.show();
	},

	show: function () {
		this.model.findByLabId(lab.id, this.showCallback.bind(this));
	},

	showCallback: function (t) {
		this.view.render({view: "list", data: t.result});
	},

    onTaskRender: function (el) {
        el.getElement("a.close-description").addEvent("click", function (ev) {
            ev.preventDefault();
            $(this.get('rel')).hide();
        });

        el.getElement("a.description").addEvent("click", function (ev) {
            ev.preventDefault();
            $(this.get("rel")).toggle();
        });

        this.changeStatus(el, "queued");
        this.changeStatus(el, "current");
        this.changeStatus(el, "completed");

        var deleteLink = el.getElement("a.delete").addEvent("click", function (ev) {
            ev.preventDefault();
            this.model.destroy(deleteLink.get("rel"), function (res) {
               if (res.error)
                   $("update").grab(new Element("p").set("text", res.error.message));
               else
                   $(deleteLink.get("rel")).destroy();
            });
        }.bind(this));
    },

    changeStatus: function (el, status) {
        var link = el.getElement("a." + status).addEvent("click", function (ev) {
            ev.preventDefault();
            this.model.changeStatus(link.get("rel"), status, function (res) {
                if (res.error)
                    $("update").grab(new Element("p").set("text", res.error.message));
                else
                    $(status).grab($(link.get("rel")).getParent());
            });
        }.bind(this));
    },

    onTaskSave: function (args) {
        this.view.render({view: "list", data: [args.result]});
    }
});