import regeneratorRuntime from "regenerator-runtime";

//WikiAPI class for the fetching wiki content. 
export default class WikiApi {
    constructor() {
        this.url = 'https://bindingofisaacrebirth.gamepedia.com';
        this.request = '/api.php?origin=*&action=query&format=json&prop=info%7Cpageimages%7Cextracts&titles=';
    }

    //Simple fetch by name function
    async getPageByName(name) {
        let result = await fetch(this.url + this.request + encodeURI(name));
        return await result.json();

    }

    //Parse the results back and get only needed details. 
    async getPageInfoResult(name) {
        const page = await this.getPageByName(name);
        let res = {};
        for (let p in page['query']['pages']) {
            res = {};
            res['thumbnail'] = page.query.pages[p].thumbnail.source;
            res['html'] = page.query.pages[p].extract;
        };
        return res;
    }


}