/* 
This file contains all the code to generate and create the elements of navbar inside a page
Made by: Lina Ruiz & Edgar RP (JefeLitman)
Version: 0.2
*/

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
        const paginationLimit = 16;
        const total_pages = Math.ceil(products.length/paginationLimit);
        const search   = document.getElementById("search-panel");
        while (search.hasChildNodes()) {
          search.removeChild(search.firstChild, "active");
        }
        create_canvas();
        body_pagination(total_pages, products, paginationLimit);
            setCurrentPage(products, 1);
            document.querySelectorAll(".page-link").forEach((item) => {
                const pageIndex = Number(item.getAttribute("page-index"));
                if (pageIndex) {
                    item.addEventListener("click", () => {
                        setCurrentPage(products,pageIndex, paginationLimit);
                    });
                }
        });
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
    product_div.style.minHeight = "1vh";
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

create_page_item = (index) => {
    let a = document.createElement("a");
    a.textContent = index;
    a.setAttribute("page-index", index);
    a.classList.add("page-link");
    a.href = "#" + index;
    
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

create_button_top = () => {
    let row_btn = document.createElement("div");
    row_btn.classList.add("d-grid", "d-md-flex", "justify-content-md-end", "mb-3");

    let button_top = document.createElement("button");
    button_top.classList.add("btn", "btn-lg", "btn-outline-primary");
    button_top.type = "submit";
    button_top.id = 'top-btn';
    button_top.textContent = "Back to top";
    button_top.addEventListener("click", () => {
        document.body.scrollTop = 0; 
        document.documentElement.scrollTop = 0; 
    });

    row_btn.append(button_top);
    return row_btn;
}

array_into_chunks = (array, size_of_chunk)  => {
    const arr = [];
    for (let i = 0; i < array.length; i += size_of_chunk) {
       const chunk = array.slice(i, i + size_of_chunk);
       arr.push(chunk);
    }
    return arr;
}

body_pagination = (total_pages, products, paginationLimit) => {
    let nav = create_pagination(total_pages);
    let product_div = document.getElementById('search-panel');
    product_div.append(nav);
    
    let product_pages = array_into_chunks(products, paginationLimit);
    for (let i = 0; i < total_pages; i++) {
        let panel = document.createElement("div");
        panel.classList.add("product-page")
        panel.setAttribute("page-index", i+1);
        panel.style.display = "none";
        panel.append(display_products(product_pages[i]));
        product_div.append(panel);
    }
    const button_top = create_button_top();
    product_div.append(button_top);
}

handleActivePageNumber = (currentPage) => {
    document.querySelectorAll(".page-link").forEach((a) => {
        a.classList.remove("active", "disabled");
        const pageIndex = Number(a.getAttribute("page-index"));
        if (pageIndex == currentPage) {
            a.classList.add("active", "disabled");
        }
    });
    document.querySelectorAll(".product-page").forEach((div_product) => {
        div_product.style.display = "none";
        const pageIndex = Number(div_product.getAttribute("page-index"));
        if (pageIndex == currentPage) {
            div_product.style.display = "block";
        }
    });
};

setCurrentPage = (products, pageNum, paginationLimit) =>{
    handleActivePageNumber(pageNum);
    let product_pages = array_into_chunks(products, paginationLimit);
    display_products(product_pages[pageNum-1]);
}
