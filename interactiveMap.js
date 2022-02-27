export default class InteractiveMap { 
    constructor(mapId, onClick) { 
        this.mapId = mapId;
        this.onClick = onClick;
    }

    async init() { 
        // console.log('ymaps');
        await this.injectYMapsScript();
        await this.loadYMaps();
        this.initMap();
    }

    injectYMapsScript() { 
        return new Promise((resolve) => { 
            const ymapsScript = document.createElement('script');
            ymapsScript.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=c130f06a-ab55-4579-9da0-64a74bd72e96';
            document.body.appendChild(ymapsScript);
            ymapsScript.addEventListener('load', resolve);
        });
    }

    loadYMaps() { 
        return new Promise((resolve) => ymaps.ready(resolve));
    }

    initMap() { 
        this.clusterer = new ymaps.Clusterer({
            groupByCoordinates: true,
            clusterDisableClickZoom: true,
            clusterOpenBaloonOnClick: false,
        });
        this.clusterer.events.add('click', (e) => { 
            const coords = e.get('target').geometry.getCoordinates();
            this.onClick(coords);
        });
        this.map = new ymaps.Map(this.mapId, {
            center: [44.89, 37.31],
            zoom: 15
        });
        this.map.events.add('click', (e) => this.onClick(e.get('coords')));
        this.map.getObjects.add(this.clusterer);
    }
} 