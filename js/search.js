/* 
This file contains the logic to use the fuse.js search engine
Made by: Edgar RP (JefeLitman) & Lina Ruiz 
Version: 1.2
*/

get_search_engine = (products) => {
    const options = {
      // isCaseSensitive: false,
      includeScore: true,
      // shouldSort: true,
      // includeMatches: false,
      // findAllMatches: false,
      // minMatchCharLength: 1,
      // location: 0,
      // threshold: 0.6,
      // distance: 100,
      // useExtendedSearch: false,
      // ignoreLocation: false,
      // ignoreFieldNorm: false,
      // fieldNormWeight: 1,
      keys: [
        {
            name: 'company',
            weight: 1
        },
        {
            name: 'name',
            weight: 2
        },
        {
            name: 'disposables',
            weight: 4
        },
        {
            name: 'area',
            weight: 8
        },
        {
            name: 'subareas',
            weight: 16
        },
        {
            name: 'tests',
            weight: 32
        }
      ]
    };
    let fuse_object;
    if(products){
        fuse_object =new Fuse(products, options);
    }else{
        fuse_object = new Fuse(get_all_products(), options)
    }
    return fuse_object;
}

search_result = (search_engine, text) => {
    let text_lower = text.toLowerCase()
    let results = search_engine.search(text);
    let sorted_results = results.sort((a, b) => {
        if (a.score < b.score){
            return 1
        }
        if (a.score > b.score){
            return -1
        }
        return 0
    }).map( r => r.item)
    filtered_results = sorted_results.filter((value) => {
        if (value.area.toLowerCase().includes(text_lower)){
            return true;
        }
        if (value.company.toLowerCase().includes(text_lower)){
            return true;
        }
        if (value.disposables.toLowerCase().includes(text_lower)){
            return true;
        }
        if (value.name.toLowerCase().includes(text_lower)){
            return true;
        }
        for (let element of value.subareas){
            if (element.toLowerCase().includes(text_lower)){
                return true;
            }
        }
        for (let element of value.tests){
            if (element.toLowerCase().includes(text_lower)){
                return true;
            }
        }
        return false;
    })
    strict_filtered = filtered_results.filter( (value) => {
        if (value.disposables.toLowerCase().includes(text_lower)){
            for (let word of value.disposables.toLowerCase().split(" ")){
                if (word.toLowerCase() === text_lower){
                    return true;
                }
            }
        }
        for (let element of value.subareas){
            if (element.toLowerCase().includes(text_lower)){
                for (let word of element.toLowerCase().split(" ")){
                    if (word.toLowerCase() === text_lower){
                        return true;
                    }
                }
            }
        }
        for (let element of value.tests){
            if (element.toLowerCase().includes(text_lower)){
                for (let word of element.toLowerCase().split(" ")){
                    if (word.toLowerCase() === text_lower){
                        return true;
                    }
                }
            }
        }
        return false
    })
    if (strict_filtered.length == 0){
        return filtered_results
    }
    return strict_filtered
}
