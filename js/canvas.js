create_search_bar = () => {

    let row = document.createElement("div");
    let col_input = document.createElement("div");
    let col_button = document.createElement("div");
    row.classList.add("row", "justify-content-center", "mt-3");
    col_input.classList.add("col-8", "col-lg-6", "text-center");
    col_button.classList.add("col-1");

    let input_search = document.createElement("input");
    input_search.classList.add("form-control", "form-control-lg", "text-center");
    input_search.id = "search";
    input_search.type = "search";
    input_search.placeholder = "Search";
    input_search.ariaLabel = "Search";
    col_input.append(input_search);

    let button_search = document.createElement("button");
    button_search.classList.add("btn", "btn-lg", "btn-outline-primary");
    button_search.type = "submit";
    button_search.id = 'search-btn';
    button_search.onclick = () => {
        const products = search_js(document.getElementById('search').value, get_all_products());
        const total_pages = Math.ceil((products.length)/16);
        const search   = document.getElementById("search-panel");
        while (search.hasChildNodes()) {
          search.removeChild(search.firstChild, "active");
        }
        create_canvas();
        if(total_pages>1)
        {
          body_pagination(total_pages, products);
        }
        else{
            display_products(products);
        }
        create_accordion(get_all_brands(), get_diagnostics_fields(), get_diagnostics_subfields(), get_specific_tests());
    };

    let i_search = document.createElement("i");
    i_search.classList.add("bi", "bi-search");

    button_search.append(i_search);
    col_button.append(button_search);

    row.append(col_input);
    row.append(col_button);
    return row;
}

create_canvas = () => {
    
    let product_div = document.getElementById('search-panel');
    let row = create_search_bar();
    
    let col = document.createElement("div");
    col.classList.add("col-10", "col-lg-2", "text-center");

    let button_filter = document.createElement("button");
    button_filter.classList.add("btn", "btn-lg", "btn-outline-primary");
    button_filter.setAttribute("data-bs-toggle", "offcanvas");
    button_filter.setAttribute("data-bs-target", "#offcanvasRight");
    button_filter.setAttribute("aria-controls", "offcanvasRight");
    button_filter.textContent = 'Filter & Sort';
    button_filter.type = "button";
    
    let container = document.createElement("div");
    let header = document.createElement("div");
    let title = document.createElement("h5");
    let body = document.createElement("div");
    let accordion = document.createElement("div");
    let button_header = document.createElement("button");

    container.classList.add("offcanvas", "offcanvas-end");
    container.id = "offcanvasRight";
    container.setAttribute("aria-labelledby", "offcanvasRightLabel");
    container.setAttribute("tabindex", "-1");
    
    header.classList.add("offcanvas-header");
    title.classList.add("offcanvas-title");
    title.id = "offcanvasRightLabel";
    title.textContent = "Filter & Sort";

    button_header.classList.add("btn-close");
    button_header.setAttribute("data-bs-dismiss", "offcanvas");
    button_header.setAttribute("aria-label", "Close");

    header.appendChild(title);
    header.appendChild(button_header);

    body.classList.add("offcanvas-body");
    accordion.id = "accordionFlush";

    body.appendChild(accordion);

    container.append(header);
    container.append(body);

    col.append(button_filter);
    col.append(container);
    row.append(col);
    product_div.appendChild(row);
}

create_page_item = (text, link = "#") => {
    let a = document.createElement("a");
    a.textContent = text;
    a.id = "page-" + text;
    a.classList.add("page-link");
    a.href = "#" + text;
    let li = document.createElement("li");
    li.classList.add("page-item");
    li.appendChild(a);

    return li;
}

create_pagination = (total_pages) => {
    
    let nav = document.createElement("nav");

    let ul_nav = document.createElement("ul");  
    ul_nav.classList.add("pagination", "justify-content-center", "m-3");

    // ul_nav.appendChild(create_page_item("<<"));
    for (let i = 1; i <= total_pages; i++) {
        ul_nav.appendChild(create_page_item(i));
    }
    // ul_nav.appendChild(create_page_item(">>"));
    nav.append(ul_nav);

    return nav;
}

array_into_chunks = (array, size_of_chunk)  => {
    const arr = [];
    for (let i = 0; i < array.length; i += size_of_chunk) {
       const chunk = array.slice(i, i + size_of_chunk);
       arr.push(chunk);
    }
    return arr;
}

body_pagination = (total_pages, products) => {
    let nav = create_pagination(total_pages);
    let product_div = document.getElementById('search-panel');
    product_div.append(nav);
    
    let product_pages = array_into_chunks(products, 16);
    for (let i = 0; i < total_pages; i++) {
        let panel = document.createElement("div");
        panel.id = "#" + (i+1);
        panel.style.display = "none";
        panel.append(display_products(product_pages[i]));
        product_div.append(panel);
    }

    document.getElementById('page-1').classList.add("active", "disabled");
    document.getElementById('#1').style.display = "block";

    document.getElementById("page-1").onclick = () => {
        document.getElementById('page-1').classList.add("active", "disabled");
        document.getElementById('page-2').classList.remove("disabled", "active");
        document.getElementById('page-3').classList.remove("disabled", "active");
        document.getElementById('#1').style.display = "block";
        document.getElementById('#2').style.display = "none";
        document.getElementById('#3').style.display = "none";
    }

    document.getElementById("page-2").onclick = () => {
        document.getElementById('page-1').classList.remove("disabled", "active");
        document.getElementById('page-2').classList.add("active", "disabled");
        document.getElementById('page-3').classList.remove("disabled", "active");
        document.getElementById('#1').style.display = "none";
        document.getElementById('#2').style.display = "block";
        document.getElementById('#3').style.display = "none";
    }

    document.getElementById("page-3").onclick = () => {
        document.getElementById('page-2').classList.remove("disabled", "active");
        document.getElementById('page-3').classList.add("active", "disabled");
        document.getElementById('#1').style.display = "none";
        document.getElementById('#2').style.display = "none";
        document.getElementById('#3').style.display = "block";
    }
}

show_pages = (products, page) =>{
    
    const new_page = page-1
    let product_pages = array_into_chunks(products, 16);
    let current_page  = document.getElementById('product_panel');
    while (current_page.hasChildNodes()) {
        current_page.removeChild(current_page.firstChild, "active");
    }
    display_products(product_pages[new_page]);
}
