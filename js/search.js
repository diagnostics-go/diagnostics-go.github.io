/* 
This file contains the logic to use the fuse.js search engine
Made by: Edgar RP (JefeLitman) & Lina Ruiz 
Version: 1.0
*/

get_search_engine = () => {
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
        "company",
        "name",
        "disposables",
        "area",
        "subareas",
        "tests"
      ]
    };
    return new Fuse(get_all_products(), options)
}

search_result = (search_engine, text) => {
    let results = search_engine.search(text);
    let sorted_results = results.sort((a, b) => {
        if (a.score < b.score){
            return 1
        }
        if (a.score > b.score){
            return -1
        }
        return 0
    })
    return sorted_results.map( r => r.item)
}