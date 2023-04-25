/* 
This file contains all the code to generate and create the elements of navbar inside a page
Made by: Lina Ruiz & Edgar RP (JefeLitman)
Version: 1.1
*/

create_nav_item = (text, link = "#") => {
    let a = document.createElement("a");
    a.textContent = text;
    a.classList.add("nav-link");
    a.href = link;
    let current_location = document.location.pathname.split(".")[0].split("/")[1];
    if (current_location.toUpperCase() === link.split(".")[0].toUpperCase()){
        a.classList.add("active", "disabled");
        a.ariaCurrent = "page";
    }
    let li = document.createElement("li");
    li.classList.add("nav-item");
    li.appendChild(a);
    return li
}

create_nav_header = () => {
    // Always require a div container with the id 'navbar'
    let parent_div = document.getElementById("navbar");
    parent_div.style.minHeight = "6vh";
    if (!parent_div){
        alert("A container with id 'navbar' doesn't exist in the html. The navbar won't be rendered.")
        return false
    }
    else if ("length" in parent_div){
        alert("The unique id 'navbar' is repeated in this document. The navbar won't be rendered.")
        return false;
    }

    let sites = [
        {"de": "Über uns", "en": "about"},
        {"de": "Account", "en": "account"},
        {"de": "Datenschutz", "en": "data_privacy"},
        {"de": "Nutzungsbedingungen", "en": "terms_use"},
        {"de": "Impressum", "en": "impressum"}
    ];
    let ul_nav = document.createElement("ul");
    ul_nav.classList.add("navbar-nav", "me-auto", "mb-2", "mb-lg-0");
    for (let site of sites){
        ul_nav.appendChild(
            create_nav_item(site.de, site.en.toLowerCase()+".html")
        );
    }
    let nav_id = "dgo_navbar";
    let div_nav = document.createElement("div");
    div_nav.classList.add("collapse", "navbar-collapse");
    div_nav.id = nav_id;
    div_nav.appendChild(ul_nav);

    let nav_brand = document.createElement("a");
    nav_brand.classList.add("navbar-brand");
    nav_brand.textContent = "Diagnostics-Go";
    if (document.location.pathname.split(".")[0].split("/")[1] !== ""){
        nav_brand.href = document.location.origin;
    }

    let nav_button = document.createElement("button");
    nav_button.classList.add("navbar-toggler");
    nav_button.setAttribute("data-bs-toggle", "collapse");
    nav_button.setAttribute("data-bs-target", "#"+nav_id);
    nav_button.setAttribute("aria-controls", nav_id);
    nav_button.ariaExpanded = "false";
    nav_button.ariaLabel = "Toggle navigation";
    let span = document.createElement("span");
    span.classList.add("navbar-toggler-icon");
    nav_button.appendChild(span);

    let outer_div = document.createElement("div");
    outer_div.classList.add("container-fluid");
    for (let i of [nav_brand, nav_button, div_nav]){
        outer_div.appendChild(i);
    }

    let nav = document.createElement("nav");
    nav.classList.add("navbar", "navbar-expand-lg", "navbar-dark", "bg-dark");
    nav.appendChild(outer_div);
    parent_div.appendChild(nav);
    return true;
}