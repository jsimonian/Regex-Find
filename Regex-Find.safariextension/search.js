safari.self.addEventListener("message", handleMessage, false);

function handleMessage(event) {

    if (event.name == "search") {

        var input = prompt("Enter your search term");
        var reg = new RegExp(input, "g"); // Force to global
        var text = document.body.innerHTML;

        var matches = [];
        var match = reg.exec(text);

        while (match != null) {
            matches.push(match);
            match = reg.exec(text);
        }

        window.find(matches[0]);
        var horizontal = document.body.scrollLeft;
        var vertical = document.body.scrollTop;
        // Locates the first position text to be highlighted
        // In the future I'll want to store all positions in an array of arrays

        for (m of matches.uniques()) {
            if (m != undefined) {
                highlight(m);
            }
        }

        window.scrollTo(horizontal, vertical);
        // Set scroll position to first position text

    }
}

function highlight(text) {
    if (window.find && window.getSelection) {
        var sel = window.getSelection();
        sel.collapse(document.body, 0);

        while (window.find(text)) {
            document.designMode = "on";
            document.execCommand("hiliteColor", false, "yellow");
            document.designMode = "off";
            sel.collapseToEnd();
        }
    }
}

Array.prototype.uniques = function() {
	var n = {},r=[];
	for(var i = 0; i < this.length; i++) {
		if (!n[this[i]]) {
			n[this[i]] = true;
			r.push(this[i]);
		}
	}
	return r;
}
