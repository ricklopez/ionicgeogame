namespace MyApp.Controllers {

    export class DashController {
    }



    export class ChatsController {
        public chats;

        public remove(chat) {
            this.chatService.remove(chat);
        }

        constructor(private chatService: MyApp.Services.ChatService) {
            this.chats = chatService.all();
        }
    }



    export class ChatDetailController {
        public chat;

        constructor(private chatService: MyApp.Services.ChatService, $stateParams: ng.ui.IStateParamsService) {
            console.log('chat id==');
            console.log($stateParams['chatId']);
            this.chat = chatService.get(+$stateParams['chatId']);
        }
    }


    export class GeolocationController {
        private options = {
            timeout: 10000,
            enableHighAccuracy: false
        }
        public lat;
        public long;
        public watchLat;
        public watchLong;
        public start;
        public destinationLat;
        public destinationLong;
        public distance;
        public startDistance; 
        public distanceLat;
        public startDistanceLat; 
        public distanceLong;
        public startDistanceLong; 


        constructor(private geoService: MyApp.Services.GeoService, private $cordovaGeolocation: ngCordova.IGeolocationService) {
            this.start = false;
            this.destinationLat = 40.689249;
            this.destinationLong = -74.044500;
            this.getCurrentLocation();
        }

        public getCurrentLocation() {
            this.$cordovaGeolocation.getCurrentPosition(this.options)
                .then((location) => {
                    this.lat = location.coords.latitude;
                    this.long = location.coords.longitude;
                    this.startDistanceLat = this.destinationLat - this.lat;
                    this.startDistanceLong = this.destinationLong - this.long; 
                }, (error) => {
                    console.log(error);
                });
        }

        public watchLocation() {
            this.start = true;
            let watch = this.$cordovaGeolocation.watchPosition(this.options);
            watch.then(null, (error) => {
                console.log(error);
            }, (location) => {
                this.watchLat = location.coords.latitude;
                this.watchLong = location.coords.longitude;

                this.distanceLat = this.destinationLat - this.watchLat;
                this.distanceLong = this.destinationLong - this.watchLong;

                //you
                if (this.distanceLat == 0 && this.distanceLong == 0)
                    this.geoService.signal([1000, 1000,1000,1000,1000], 5);

                if (this.distanceLat > this.startDistanceLat || this.distanceLong > this.startDistanceLong )
                    this.geoService.signal(1000, 1);

                if (this.distanceLat < this.startDistanceLat || this.distanceLong < this.startDistanceLong)
                    this.geoService.signal([1000,1000,1000], 3);

            });
        }
    }

    export class AccountController {
        public settings = {
            enableFriends: true
        }
    }
}
