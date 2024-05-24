document.addEventListener("DOMContentLoaded", function() {
    const searchResultsList = document.getElementById("searchResultsList");
    const topTitle = document.getElementById("toptitle");

    // Function to get URL parameters
    function getUrlParams() {
        const params = {};
        window.location.search.substr(1).split('&').forEach(function(item) {
            const [key, value] = item.split('=');
            params[key] = decodeURIComponent(value);
        });
        return params;
    }

    // List of all available pages and their details
    const pages = [
        { title: "Top Warframe Platinum Farm for Beginners", url: "plat.html", imgSrc: "images/1.png" },
        { title: "Warframe Void Fissures Guide", url: "fissures.html", imgSrc: "images/2.png" },
        { title: "The Best Warframe Builds for Void Fissures", url: "buildsforfissures.html", imgSrc: "images/builds.png" }
    ];

    const params = getUrlParams();
    const searchTerm = params.s ? params.s.toLowerCase() : "";

    if (searchTerm) {
        topTitle.textContent = `Search results for "${searchTerm}"`
        const filteredResults = pages.filter(page => page.title.toLowerCase().includes(searchTerm));
        displaySearchResults(filteredResults);
    } else {
        displayNoResults();
    }

    function displaySearchResults(results) {
        searchResultsList.innerHTML = '';

        if (results.length > 0) {
            results.forEach(result => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = result.url;

                const img = document.createElement('img');
                img.src = result.imgSrc;
                img.alt = result.title;

                const title = document.createElement('p');
                const titleLink = document.createElement('a');
                titleLink.href = result.url;
                titleLink.textContent = result.title;

                title.appendChild(titleLink);
                link.appendChild(img);
                listItem.appendChild(link);
                listItem.appendChild(title);
                searchResultsList.appendChild(listItem);
            });
        } else {
            displayNoResults();
        }
    }

    function displayNoResults() {
        const noResultsMessage = document.createElement('p');
        noResultsMessage.textContent = "No results found.";
        searchResultsList.appendChild(noResultsMessage);
    }
});
