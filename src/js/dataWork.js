export default class DataWork{ 
    getCoords() { 
        let allCoords = [];
        for (let i = 0; i < localStorage.length; i++) { 
            let key = localStorage.key(i);
            if (key[0] == "[") { 
                // console.log(key);
                allCoords.push(JSON.parse(key));
            }
        }
        return allCoords;
    }

    addReview(data) { 
        if (localStorage.getItem(data["key"]) === null) {
            localStorage.setItem(data["key"], [data["review"]]);
        } else { 
            let acum = localStorage.getItem(data["key"]).slice();
            console.log(acum);
            acum.push(data["review"]);
            localStorage.setItem(data["key"], acum);
        }

    }

    getReviewsList(coords) { 
        console.log(coords);
        if (localStorage.getItem(coords) !== null) {
            console.log(localStorage.getItem(coords));
            return localStorage.getItem(coords);
        } else { 
            return [];
        }
    }
}

