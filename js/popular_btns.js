/* 
This file contains all the code to create and associate the popular buttons categories to the main view.
Made by: Edgar RP (JefeLitman) & Lina Ruiz 
Version: 1.0
*/

get_popular_categories = () => {
    return [
        "Labor",
        "Point of Care",
        "Abbott i-STAT",
        "Abbott Alinity",
        "α1-Acid Glycoprotein",
        "Siemens",
        "Roche",
        "Alpha-1-Fetoprotein (AFP)",
        "C-reaktives Protein (CRP)"
    ]
}

draw_popular_buttons = () => {
    let popular_categories = get_popular_categories();
    let popular_div = document.getElementById("popular");

    for(let categorie of popular_categories){
        let btn_div = document.createElement("div");
        btn_div.classList.add("col");
        let btn = document.createElement("button");
        btn.type = "button";
        btn.classList.add("btn", "btn-outline-primary", "my-1");
        btn.textContent = categorie;
        btn.onclick = () => {
            document.getElementById('search').value = btn.textContent;
            document.getElementById('search-btn').click();
        }
        btn_div.appendChild(btn);
        popular_div.appendChild(btn_div);
    }
}
