safari.self.addEventListener("message", handleMessage, false);

function handleMessage(event) {
    if (event.name == "search") {
        var input = prompt("Enter your search term");
        var loc = document.body.innerText.search(input);
        if (loc != -1) {
            alert("Found!");
        }
        else {
            alert("Not Found.");
        }
    }
}

function parse() {
    return document.body.textContent;
}

function search(main, elm) {
    if (str1.toLowerCase().contains(str2.toLowerCase())) {
        return true;
    }

}
