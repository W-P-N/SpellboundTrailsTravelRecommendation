(function () {
    // Get Elements:
    const searchBar = document.getElementById('serch-bar');
    const searchButton = document.getElementById('search-button');
    const resetButton = document.getElementById('reset-search-button');

    // Event Listeners
    const debouncedRender = debounce(searchData, 200);
    searchBar.addEventListener('input', debouncedRender);
    searchButton.addEventListener('click', searchData);
    resetButton.addEventListener('click', resetSearch);

    // Debouced Reader function
    function debounce(func, delay) {
        let timeout;
        return () => {
            clearInterval(timeout);
            timeout = setTimeout(func, delay);
        };
    };
    // Function to search the given keyword from the json file
    function searchData () {
        const searchQuery = searchBar.value;
        fetch('./travel_recommendation_api.json')
            .then(resp => {
                const data = resp.json();
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
