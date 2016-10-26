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
        public destinationLat;
        public destinationLong;
        public distance


        constructor(private $cordovaGeolocation: ngCordova.IGeolocationService) {
            this.destinationLat = 40.689249;
            this.destinationLong = -74.044500;
        }

        public getCurrentLocation() {
            this.$cordovaGeolocation.getCurrentPosition(this.options)
                .then((location) => {
                    this.lat = location.coords.latitude;
                    this.long = location.coords.longitude;
                }, (error) => {
                    console.log(error);
                });
        }

        public watchLocation() {
            let watch = this.$cordovaGeolocation.watchPosition(this.options);
            watch.then(null, (error) => {
                console.log(error);
            }, (location) => {
                this.watchLat = location.coords.latitude;
                this.watchLong = location.coords.longitude;

                this.distance = (this.destinationLat - this.watchLat) + (this.destinationLong - this.watchLong);

            });
        }
    }

    export class AccountController {
        public settings = {
            enableFriends: true
        }
    }
}
