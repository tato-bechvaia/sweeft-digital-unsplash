const API_ACCESS_KEY = 'BoG4zCdBQUAAj1wahsNdg8kvsr9aXWDkeeG56b6P-ns';

class SearchImagesImpl {
    cachePages = {};
    cacheQueries = {};

    // We have to get next 20 most popular images on every page
    // for example by default we have 20 most popular images in the /main page
    // on infinite scrool after each scroll we add next 20 most popular images
    // to the page.
    async fetchPopularImagesByPage(page) {
        if(this.cachePages[page]){
            console.log(this.cachePages[2])
            return this.cachePages[page];
        }
        const response = 
        await fetch(`https://api.unsplash.com/photos/?client_id=${API_ACCESS_KEY}&page=${page}&per_page=20&order_by=popular`);
        
        if(!response.ok) {
            throw new Error(`Failed to fetch images data by page ${page}`);
        }
        const popularImagesData = await response.json();
        console.log(popularImagesData);
        this.cachePages[`${page}`] = popularImagesData;
        return this.cachePages[`${page}`];
    }

    // on the /history page we have words (queries) that user searched in the /main page
    // when user click any of this queries we have to load images (again 20 or less on the page)
    // that are related to the query user clicked on, but in this case when user clicks 
    // another query, we are not adding images but changing it, however earlier query images
    // will be stored in the cache so user can receive those datas without API request.
    async fetchImagesByQuery(query) {
        if(this.cacheQueries[query]){
            return this.cacheQueries[query];
        }
        const response = 
        await fetch(`https://api.unsplash.com/search/photos/?client_id=${API_ACCESS_KEY}&query=${query}&per_page=20`);
        if(!response.ok) {
            throw new Error(`Failed to fetch images data by a Query ${query}`);
        }
        const queryImagesData = await response.json();
        this.cacheQueries[query] = queryImagesData.results;
        console.log(queryImagesData.results);
        return queryImagesData.results;
    }

}

export const ImagesService = new SearchImagesImpl();
