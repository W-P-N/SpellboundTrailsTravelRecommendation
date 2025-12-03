(function () {
    // Get Elements:
    const searchBar = document.getElementById('search-bar');
    const searchButton = document.getElementById('search-button');
    const resetButton = document.getElementById('reset-search-button');

    // Event Listeners
    searchButton.addEventListener('click', searchData);
    resetButton.addEventListener('click', resetSearch);

    // Function to search the given keyword from the json file
    function searchData () {
        const searchQuery = searchBar.value.toLowerCase();
        // console.log(searchQuery);  // Debug log
        if(searchQuery === '') {
            return;
        };
        let resultHtml = '';
        fetch('./travel_recommendation_api.json')
            .then(async resp => {
                const data = await resp.json();
                // Search Match
                let keySearchResult;
                Object.keys(data).forEach(key => {
                    if(key.includes(searchQuery)) {
                        keySearchResult = key;
                    };
                });
                // console.log(keySearchResult);  // Debug log
                if(keySearchResult) {
                    const placeQuery = data[keySearchResult];
                    // console.log(placeQuery)  // Debug log
                    switch (keySearchResult) {
                        case 'countries':
                            for(const country of placeQuery) {
                                resultHtml += `
                                    <div id="searchResult">
                                        <figure>
                                            <img src="${country.cities[0].imageUrl}" height="100px">
                                        </figure>
                                        <h2>${country.name}</h2>
                                        <h3>${country.cities[0].name}</h3>
                                        <p>${country.cities[0].description}</p>
                                    </div>
                                `;
                            };
                            break;
                        
                        case 'temples':
                            for(const temple of placeQuery) {
                                resultHtml += `
                                    <div id="searchResult">
                                        <figure>
                                            <img src="${temple.imageUrl}" height="100px">
                                        </figure>
                                        <h2>${temple.name}</h2>
                                        <p>${temple.description}</p>
                                    </div>
                                `;
                            };
                            break;
                        case 'beaches':
                            for(const beach of placeQuery) {
                                resultHtml += `
                                    <div id="searchResult">
                                        <figure>
                                            <img src="${beach.imageUrl}" height="100px">
                                        </figure>
                                        <h2>${beach.name}</h2>
                                        <p>${beach.description}</p>
                                    </div>
                                `;
                            };
                            break;
                        default:
                            break;
                    };
                } else {
                    resultHtml = `<p>No data found</p>`;
                };
                // console.log(resultHtml);  // Debug log
                // Get serchQuery from data
                // Display on screen
            })
            .catch(err => {
                console.error('Error fetching data');
            });
    };
    // Function to reset search space
    function resetSearch() {
        searchBar.value = "";
    };
}) ();
