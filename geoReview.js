import InteractiveMap from "./interactiveMap";

export default class GeoReview { 

    constructor() { 
        console.log('geo');
        this.map = new InteractiveMap('map', this.onClick.bind(this));
        this.map.init().then(this.onInit.bind(this));
    }

    async onInit() { 
        console.log('onInit');
    }

    onClick(coords) {
        console.log('onClick');
    }
}