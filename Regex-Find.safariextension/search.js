

safari.self.addEventListener("message", handleMessage, false);

function handleMessage(event) {

    if (event.name == "search" && window.top == window) {
        var input = prompt("Enter your search term");
        var reg = new RegExp(input, "g"); // Force to global
        var text = document.body.innerText;
        var matches = text.match(reg).uniques();
        var positions = [];

        for (m of matches) {
            if (m != undefined) {
                highlight(m, positions, text);
            }
        }
        positions.sort(function(a, b){return a[4]-b[4]});
        safari.self.tab.dispatchMessage('set-state', positions);
    }

    if (event.name == "next" && window.top == window) {
        blink(event.message[0], event.message[1], event.message[2], event.message[3]);
    }

}

function highlight(text, pos, all) {
    if (window.find && window.getSelection) {
        var sel = window.getSelection();
        sel.collapse(document.body, 0);
        var wordIndex = 0;
        var searchIndex = 0;
        while (window.find(text)) {
            pos.push([text, wordIndex, document.body.scrollLeft, document.body.scrollTop, all.indexOf(text, searchIndex)]);
            searchIndex = all.indexOf(text, searchIndex) + 1;
            wordIndex++;
            document.designMode = "on";
            document.execCommand("hiliteColor", false, "grey");
            document.designMode = "off";
            sel.collapseToEnd();
        }
    }
}

function blink(text, wordIndex, left, top) {
    if (window.find && window.getSelection) {
        var sel = window.getSelection();
        sel.collapse(document.body, 0);
        var seen = 0;
        while (window.find(text)) {
            if (seen == wordIndex) {
                document.designMode = "on";
                document.execCommand("hiliteColor", false, "yellow");
                document.designMode = "off";
                sel.collapseToEnd();
            }
            seen++;
        }
        window.scrollTo(left, top);
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
