var MySender = new Class({
    initialize: function () {
        document.fireEvent(":custom event");
    }
});

var MyReceiver = new Class({
    initialize: function () {
        document.addEvent(":custom event", function (ev) {
            $("log").grab(new Element("h3").set("text", "Custom event received!"));
        });
    }
});

var receiver = ​new MyReceiver();
var sender = new MySender();