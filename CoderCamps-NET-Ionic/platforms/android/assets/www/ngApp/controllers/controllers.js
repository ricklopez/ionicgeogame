var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var DashController = (function () {
            function DashController() {
            }
            return DashController;
        }());
        Controllers.DashController = DashController;
        var ChatsController = (function () {
            function ChatsController(chatService) {
                this.chatService = chatService;
                this.chats = chatService.all();
            }
            ChatsController.prototype.remove = function (chat) {
                this.chatService.remove(chat);
            };
            return ChatsController;
        }());
        Controllers.ChatsController = ChatsController;
        var ChatDetailController = (function () {
            function ChatDetailController(chatService, $stateParams) {
                this.chatService = chatService;
                console.log('chat id==');
                console.log($stateParams['chatId']);
                this.chat = chatService.get(+$stateParams['chatId']);
            }
            return ChatDetailController;
        }());
        Controllers.ChatDetailController = ChatDetailController;
        var GeolocationController = (function () {
            function GeolocationController(geoService, $cordovaGeolocation) {
                this.geoService = geoService;
                this.$cordovaGeolocation = $cordovaGeolocation;
                this.options = {
                    timeout: 10000,
                    enableHighAccuracy: false
                };
                this.start = false;
                this.destinationLat = 40.689249;
                this.destinationLong = -74.044500;
                this.getCurrentLocation();
            }
            GeolocationController.prototype.getCurrentLocation = function () {
                var _this = this;
                this.$cordovaGeolocation.getCurrentPosition(this.options)
                    .then(function (location) {
                    _this.lat = location.coords.latitude;
                    _this.long = location.coords.longitude;
                    _this.startDistanceLat = _this.destinationLat - _this.lat;
                    _this.startDistanceLong = _this.destinationLong - _this.long;
                }, function (error) {
                    console.log(error);
                });
            };
            GeolocationController.prototype.watchLocation = function () {
                var _this = this;
                this.start = true;
                var watch = this.$cordovaGeolocation.watchPosition(this.options);
                watch.then(null, function (error) {
                    console.log(error);
                }, function (location) {
                    _this.watchLat = location.coords.latitude;
                    _this.watchLong = location.coords.longitude;
                    _this.distanceLat = _this.destinationLat - _this.watchLat;
                    _this.distanceLong = _this.destinationLong - _this.watchLong;
                    //you
                    if (_this.distanceLat == 0 && _this.distanceLong == 0)
                        _this.geoService.signal([1000, 1000, 1000, 1000, 1000], 5);
                    if (_this.distanceLat > _this.startDistanceLat || _this.distanceLong > _this.startDistanceLong)
                        _this.geoService.signal(1000, 1);
                    if (_this.distanceLat < _this.startDistanceLat || _this.distanceLong < _this.startDistanceLong)
                        _this.geoService.signal([1000, 1000, 1000], 3);
                });
            };
            return GeolocationController;
        }());
        Controllers.GeolocationController = GeolocationController;
        var AccountController = (function () {
            function AccountController() {
                this.settings = {
                    enableFriends: true
                };
            }
            return AccountController;
        }());
        Controllers.AccountController = AccountController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=controllers.js.map