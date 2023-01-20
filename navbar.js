var nav = document.getElementById("navbar");
nav.setAttribute("class", "navbar navbar-expand-lg navbar-dark bg-dark");

var contDiv = document.createElement("DIV");
contDiv.setAttribute("class", "container-fluid");
nav.appendChild(contDiv);

var nav_a = document.createElement("a");
nav_a.setAttribute("class", "navbar-brand");
nav_a.innerHTML = "Diagnostic-Go";
contDiv.appendChild(nav_a);

var nav_button = document.createElement("button");
nav_button.setAttribute("class", "navbar-toggler");
nav_button.setAttribute("type", "button");
nav_button.setAttribute("data-bs-toggle", "collapse");
nav_button.setAttribute("data-bs-target", "#dgonavbar");
nav_button.setAttribute("aria-controls", "dgonavbar");
nav_button.setAttribute("aria-expanded", "false");
nav_button.setAttribute("aria-label", "Toggle navigation");
contDiv.appendChild(nav_button);

var nav_button_span = document.createElement("span");
nav_button_span.setAttribute("class", "navbar-toggler-icon");
nav_button.appendChild(nav_button_span);

var contDiv_2 = document.createElement("DIV");
contDiv_2.setAttribute("class", "collapse navbar-collapse");
contDiv_2.setAttribute("id", "dgonavbar");
contDiv.appendChild(contDiv_2);

var nav_list = document.createElement("UL");
nav_list.setAttribute("class", "navbar-nav me-auto mb-2 mb-lg-0");
contDiv_2.appendChild(nav_list);

function addItem(name, href) {
    var li = document.createElement("LI");
    nav_list.appendChild(li);
    if (name.toUpperCase() == document.title.toUpperCase) {
        li.setAttribute("class", "nav-item active");
    } else {
        li.setAttribute("class", "nav-item");
    }

    var link = document.createElement("A");
    link.href = href;
    link.setAttribute("class", "nav-link")
    link.innerHTML = name;
    li.appendChild(link);
}

// Format is addItem(LINK_TITLE, FILE_NAME)
addItem("Products", "index.html");
addItem("About", "about.html");
addItem("News", "news.html");
addItem("My Account", "#");
addItem("Data Privacy", "#");
addItem("Terms of Use", "#");
addItem("Impressium", "#");