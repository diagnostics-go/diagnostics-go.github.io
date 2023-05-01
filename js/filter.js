/* 
This file contains all the code to generate and create the elements of filters inside the page
Made by: Edgar RP (JefeLitman) & Lina Ruiz 
Version: 1.2
*/

create_accordion_item = (name, id, elements) => {
    let acc_id = id;
    let acc_header_id = id.replace("collapse", "heading");

    let acc_item = document.createElement("div");
    acc_item.classList.add("accordion-item");

    let acc_header = document.createElement("h2");
    acc_header.classList.add("accordion-header");
    acc_header.id = acc_header_id;
    let acc_button = document.createElement("button");
    acc_button.classList.add("accordion-button", "collapsed");
    acc_button.setAttribute("data-bs-toggle", "collapse");
    acc_button.setAttribute("data-bs-target", "#"+acc_id);
    acc_button.setAttribute("aria-controls", acc_id);
    acc_button.ariaExpanded = false;
    acc_button.textContent = name;
    acc_header.appendChild(acc_button);
    acc_item.appendChild(acc_header);

    let acc_flush = document.createElement("div");
    acc_flush.id = acc_id;
    acc_flush.classList.add("accordion-collapse", "collapse");
    acc_flush.setAttribute("aria-labelledby", acc_header_id);
    acc_flush.setAttribute("data-bs-parent", "#accordionFlush");
    let acc_body = document.createElement("div"); 
    acc_body.classList.add("accordion-body");
    
    for (let element of elements){
        let acc_form = document.createElement("div");
        acc_form.classList.add("form-check");
        acc_form.id = element.toLowerCase();
        acc_form.setAttribute("style", "text-align: left");
        let acc_input = document.createElement("input");
        acc_input.id = element.toLowerCase();
        acc_input.classList.add("form-check-input");
        acc_input.value = element; 
        acc_input.type = "checkbox";
        let acc_label = document.createElement("label");
        acc_label.classList.add("form-check-label");
        acc_label.setAttribute("for", acc_input.id);
        acc_label.textContent = element;

        acc_form.appendChild(acc_input);
        acc_form.appendChild(acc_label);
        acc_body.appendChild(acc_form);
    }   
    
    acc_flush.appendChild(acc_body);
    acc_item.appendChild(acc_flush);

    return acc_item
}

create_accordion = (companies, diagnostics_fields, diagnostics_subfields, specific_tests) => {
    let parent_div = document.getElementById("accordionFlush");
    parent_div.classList.add("accordion");
    
    let items = [
        {"name": "SORTED BY",             "id": "flush-collapseOne",   "elements": ['Company', 'Diagnostics Fields', 'Diagnostics Sub-Fields', 'Tests']},
        {"name": "COMPANY",               "id": "flush-collapseTwo",   "elements": companies},
        {"name": "DIAGNOSTICS FIELDS",    "id": "flush-collapseThree", "elements": diagnostics_fields},
        {"name": "DIAGNOSTICS SUBFIELDS", "id": "flush-collapseFour",  "elements": diagnostics_subfields},
        {"name": "TESTS",                 "id": "flush-collapseFive",  "elements": specific_tests}
    ];

    for (let item of items){
        parent_div.appendChild(
            create_accordion_item(item.name, item.id, item.elements)
        );
    }

    let button_apply = document.createElement("button");
    button_apply.id = "btn-apply";
    button_apply.type = "submit";
    button_apply.classList.add("btn", "btn-outline-primary", "mt-3");
    button_apply.textContent = "APPLY FILTERS";
    button_apply.setAttribute("aria-label", "Apply");

    parent_div.append(button_apply);

    return true;
}

draw_products_search = (products) =>{
    if(products.length>0){
        const paginationLimit = 16;
        const total_pages = Math.ceil(products.length/paginationLimit);
        const search   = document.getElementById("search-panel");
        while (search.hasChildNodes()) {
          search.removeChild(search.firstChild);
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

        let brands = products.map(({ subareas }) => subareas).flat();
        var diagnostics_subfields = brands.filter((value, index, self) => self.indexOf(value) === index);

        let brands_tests = products.map(({ tests }) => tests).flat();
        var diagnostics_test = brands_tests.filter((value, index, self) => self.indexOf(value) === index);
        
        create_accordion(get_all_brands(), get_diagnostics_fields(), diagnostics_subfields, diagnostics_test);
        document.getElementById('btn-apply').onclick = () => {
            document.getElementById('btn-close-canvas').click();
            document.querySelectorAll(".form-check-input").forEach((item, index) => {
                if(item.checked){
                apply_filters(item.value.toLowerCase(), products);
                }
                item.checked = false;
            });
        };
        sort_one();
      }
      else{
        create_alert();
      }
}

sort_one = () => {
    var sort = document.getElementById("flush-collapseOne");
    var check = sort.getElementsByTagName("INPUT");
    for (let i = 0; i < check.length; i++) {
        check[i].onclick = function () {
            for (let i = 0; i < check.length; i++) {
                if (check[i] != this && this.checked) {
                    check[i].checked = false;
                }
            }
        };
    }
}

apply_filters = (filter, products)  => {
    const categories = ['company', 'diagnostics fields', 'diagnostics sub-fields', 'tests']
    const categories_dict = {'company': 'company', 'diagnostics fields': 'area', 'diagnostics sub-fields': 'subareas', 'tests': 'tests'};
    if(categories.includes(filter)){
        sort_products = products.sort((a, b) => {
            var element_a = a[categories_dict[filter]];
            var element_b = b[categories_dict[filter]];
            if(filter == 'diagnostics sub-fields'){
                element_a = a[categories_dict[filter]][0];
                element_b = b[categories_dict[filter]][0];
            }
            if (element_a < element_b) {
              return -1;
            }
        });
        draw_products_search(sort_products);
    }
    else{
        let search_engine = get_search_engine(products);
        let new_products = search_result(search_engine, filter);
        draw_products_search(new_products);
    }
}
