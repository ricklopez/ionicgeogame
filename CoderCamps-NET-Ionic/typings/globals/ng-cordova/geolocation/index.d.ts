// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/14fe4313f4a1cf69add3505a2ab1dbc690dc2116/ng-cordova/geolocation.d.ts
declare namespace ngCordova {

    export interface IGeoPositionError {
      code:number;
      message:string;
    }

    export interface IGeoCoordinates {
      latitude?:number;
      longitude?:number;
      accuracy?:number;
      altitude?:number;
      heading?:number;
      speed?:number;
      altitudeAccuracy?:number;
    }

    export interface IGeoPosition {
      coords:IGeoCoordinates;
      timestamp:Date;
    }

    export interface IGeolocationOptions {
        timeout?: number;
        maximumAge?: number;
        enableHighAccuracy?: boolean;
    }

    export interface IGeolocationService {
        getCurrentPosition(options?: IGeolocationOptions) : ng.IPromise<IGeoPosition>;
        watchPosition(options?: IGeolocationOptions)  : ng.IPromise<IGeoPosition>;
        clearWatch(watchID: {[key: string]: any}) : void;
    }

}
