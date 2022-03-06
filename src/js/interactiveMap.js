export default class InteractiveMap { 
    constructor(mapId, onClick) { 
        this.mapId = mapId;
        this.onClick = onClick;
    }

    async init() { 
        await this.injectYMapsScript();
        await this.loadYMaps();
        this.initMap();
    }

    injectYMapsScript() { 
        return new Promise((resolve) => { 
            const ymapsScript = document.createElement('script');
            ymapsScript.src = 'https://api-maps.yandex.ru/2.1/?apikey=c130f06a-ab55-4579-9da0-64a74bd72e96&lang=ru_RU';
            document.body.appendChild(ymapsScript);
            ymapsScript.addEventListener('load', resolve);
        });
    }

    loadYMaps() { 
        return new Promise((resolve) => ymaps.ready(resolve));
    }

    initMap() { 
        this.clusterer = new ymaps.Clusterer({
            clusterDisableClickZoom: true,
            groupByCoordinates: true,
            clusterOpenBaloonOnClick: true,
        });
        this.clusterer.events.add('click', (e) => { 
            const coords = e.get('target').geometry.getCoordinates();
            this.onClick(coords, this.clusterer);
        });
        this.map = new ymaps.Map(this.mapId, {
            center: [44.89, 37.31],
            zoom: 15
        });
        this.map.geoObjects.add(this.clusterer);
        this.map.events.add('click', (e) => {
            const coords = e.get('coords');
            this.onClick(coords);
        });
        this.map.events.add('balloonopen', function (event) {
            // event.preventDefault();
            console.log("Балун открылся");
            // this.map.balloon.data.set('content');
            // event.objectManager.objects.balloon.setData("Балун открылся");
            // var objectId = e.get('objectId'),
            //     object = objectManager.objects.getById(objectId);
            // if (!object.properties) {
            //     loadObjectData(objectId).then(function (data) {
            //         if (objectManager.balloon.isOpen(objectid)) {
            //             object.properties = data;
            //             objectManager.objects.balloon.setData(object);
            //         }
            //     });
            // }
        });
    }

    openBalloon(coords, content) { 
        this.map.balloon.open(coords, content);
    }

    setBalloonContent(content) { 
        // console.log(this.map);
        // this.map.balloon.update();
        this.map.balloon.setData(content);
        // objectManager.clusters.balloon.close();
    }

    closeBalloon() { 
        this.map.balloon.close();
    }

    createPlacemark(coords) { 
        const placemark = new ymaps.Placemark(coords);
        placemark.events.add('click', (e) => { 
            const coords = e.get('target').geometry.getCoordinates();
            this.onClick(coords);
        });
        this.clusterer.add(placemark);
        
    }

} 