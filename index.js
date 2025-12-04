(function () {
    // Get Elements:
    const searchBar = document.getElementById('search-bar');
    const searchButton = document.getElementById('search-button');
    const clearButton = document.getElementById('clear-search-button');

    // Event Listeners
    searchButton.addEventListener('click', handleSearch);
    clearButton.addEventListener('click', handleClear);

    // Function to fetch data
    async function fetchData() {
        return fetch('./data/travel_recommendation_api.json')
            .then(response => {
                if(!response.ok) {
                    throw new Error('Network Response not okay');
                };
                return response.json();
            })
            .catch(error => {
                console.error('Error fetching data: ',error);
                throw error;
            })
    };

    // Function to filter results
    function filterResults(data, query) {
        if(!query) {
            return [];
        };

        const lowerCaseQuery = query.toLowerCase();
        // console.log(query);  // Debug log - OK
        // console.log(data);  // Debug log - OK
        let results = [];

        if (lowerCaseQuery === 'country' || lowerCaseQuery === 'countries') {
            results = data.countries.flatMap(country => country.cities.map(city => ({...city, type: 'Country'})));
        } else if (lowerCaseQuery === 'temple' || lowerCaseQuery === 'temples') {
            results = data.temples.map(temple => ({...temple, type: 'Temple'}));
        } else if (lowerCaseQuery === 'beach' || lowerCaseQuery === 'beaches') {
            results = data.beaches.map(beach => ({...beach, type: 'Beach'}));
        };

        return results;
    };

    // Function to display the search results
    function displayResults(results) {
        const resultContainer = document.getElementById('result-container');
        resultContainer.innerHTML = '';

        if(results.length === 0) {
            return resultContainer.innerHTML = '<p>No results found.</p>';   
        };

        results.forEach(item => {
            const card = document.createElement('div');
            card.className = 'search-result';

            card.innerHTML = `
                <figure>
                    <img src="${item.imageUrl}" width="100%" alt="${item.name}">
                </figure>
                <h2>${item.name}</h2>
                <p>${item.description}</p>
                <a href='#'>Visit</a>
            `;

            resultContainer.appendChild(card);
        });

    };

    // Function to reset search space
    function handleClear() {
        const serchBar = document.getElementById('search-bar');
        searchBar.value = "";
        displayResults([]);
    };

    async function handleSearch() {
        const searchBar = document.getElementById('search-bar');
        const query = searchBar.value;

        try {
            const data = await fetchData();
            const results = filterResults(data, query);
            displayResults(results);
        } catch(error) {
            const resultContainer = document.getElementById('result-container');
            resultContainer.innerHTML = '<p>Could not retrieve the data. Please try again later.</p>'
        }
    }

}) ();
