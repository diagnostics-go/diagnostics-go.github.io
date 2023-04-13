/* 
This file contains all the code to generate and create the elements of filters inside the page
Made by: Edgar RP (JefeLitman) & Lina Ruiz 
Version: 1.1.0
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
        acc_form.setAttribute("style", "text-align: left");
        let acc_input = document.createElement("input");
        acc_input.id = "flexCheckDefault";
        acc_input.classList.add("form-check-input");
        acc_input.value = ""; 
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
    return true;
}

search_engine = (event, objectData = []) => {
    const input = event.toLowerCase();
    const keys = Object.keys(objectData[0]);
    const result = objectData.filter((data) => {
        return keys.some((key) => {
            if (key == "subareas" || key == "tests"){
                data[key].forEach((value, index) => {
                    return (
                        (value !== undefined && value !== null && 
                        value.toLowerCase().trim().includes(input))
                    );
                });
            } 
            else{ 
                return (
                    (data[key] !== undefined && data[key] !== null && 
                    data[key].toLowerCase().trim().includes(input))
                );
            }
        });
    });
    console.log(result);
}

search_js = (item, data) => {
    var idx = lunr(function () {
        this.ref('index')
        this.field('area')
        this.field('disposables')
        this.field('name')
        this.field('company')
        this.field('subarea')
        this.field('tests')

        data.forEach(function (doc) {
          this.add(doc)
        }, this)
    });

    results = idx.search(item);
    console.log('Results: ', results.length);

    var results_full = results.map(function (element) {
        return data.filter(function (value, index, arr) {
            return value.index == element.ref;
        })[0];
    });
    console.log(results_full);
    return results_full;
}