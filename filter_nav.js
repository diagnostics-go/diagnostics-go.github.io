/* 
This file contains all the code to generate and create the elements of filters inside the nav 
Made by: Edgar RP (JefeLitman) & Lina Ruiz 
Version: 1.0.0
*/

create_tab_item_button = (index, id, text) => {
    let nav_button = document.createElement("button");
    let nav_button_id = id;
    nav_button.id = "nav-" + nav_button_id + "-tab";
    nav_button.role = "tab";
    nav_button.classList.add("nav-link", "text-dark");
    nav_button.setAttribute("data-bs-toggle", "tab");
    nav_button.setAttribute("data-bs-target", "#nav-"+nav_button_id);
    nav_button.setAttribute("aria-controls", "nav-"+nav_button_id);
    nav_button.textContent = text;

    if (index == 0){
        nav_button.classList.add("active");
    }

    return nav_button
}

create_tab_content = (index, id) => {

    let nav_button_id = id;
    let tab_item = document.createElement("div");
    tab_item.classList.add("tab-pane", "fade", "show");
    tab_item.id = "nav-" + nav_button_id;
    tab_item.role = "tabpanel";
    tab_item.setAttribute("aria-labelledby", "nav-" +nav_button_id + "-tab");
    tab_item.tabIndex = 0;

    if (index == 0){
        tab_item.classList.add("active");
    }

    let row = document.createElement("div");
    let col = document.createElement("div");
    let container = document.createElement("div");
    let outline = document.createElement("div");
    row.classList.add("row", "justify-content-center");
    col.classList.add("col-10");
    container.classList.add("container-fluid");
    outline.classList.add("row", "align-items-top", "justify-content-center");
    outline.id = id;

    
    row.appendChild(col);
    col.appendChild(container);
    container.appendChild(outline);
    tab_item.appendChild(row);

    return tab_item
}

create_tabs = (diagnostics_fields) => {
    let tab_header = document.getElementById("tab-header");
    tab_header.id = "nav-tab";
    tab_header.role = "tablist";
    tab_header.classList.add("nav","nav-tabs", "nav-fill");

    let tab_content = document.getElementById("nav-tabContent");
    tab_content.classList.add("tab-content");

    diagnostics_fields.push("All");
    diagnostics_fields.reverse();

    for (let i = 0; i < diagnostics_fields.length; i++) { 
        const id = diagnostics_fields[i].toLowerCase().replace( /\s/g, '');
        tab_header.appendChild(create_tab_item_button(i, id, diagnostics_fields[i]));
    }

    for (let i = 0; i < diagnostics_fields.length; i++) { 
        const id = diagnostics_fields[i].toLowerCase().replace( /\s/g, '');
        tab_content.appendChild(create_tab_content(i, id));
    }
    
    return true;
}
