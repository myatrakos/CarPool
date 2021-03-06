// File Type: Store

import { action, observable  } from 'mobx';

import { waypointGenerator } from './../utils/waypointGenerator';
import ServerURL from '../utils/server';
import HomePageStore from './HomePageStore';

class routesStore {
    
    @observable userList = [];

    @observable routes = [];
    @observable routeSuccess = false;
    @observable loadingRoutes = true;
    @observable addingRoute = false;

    @observable invalidRoutes1 = true;
    @observable invalidRoutes2 = true;
    
    @observable originResult = {};
    @observable destinationResult = {};
    
    @observable originName = "";
    @observable destinationName = "";
    
    @observable origin = {};
    @observable destination = {};
    
    @action reset = () =>{
        this.origin = {};
        this.destination = {};
        this.originName = "";
        this.destinationName = "";
        this.originResult = {};
        this.destinationResult = {};
        this.invalidRoutes1 = true;
        this.invalidRoutes2 = true;

    }

    @action setGoogleOriginResult = (result) =>{
        this.originResult = result;
        this.originName = result.formatted_address;
    }
    
    @action setGoogleDestinationResult = (result) =>{
        this.destinationResult = result;
        this.destinationName = result.formatted_address;
    }
    
    @action setOrigin = (origin) => {
        this.origin = origin;
    }
    
    @action setdestination = (destination) => {
        this.destination = destination;
    }

    @action getAllUsers = (token) => {

        fetch(ServerURL + '/api/account/profile/getAllUsers?token=' + token)
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(json => {
                if (json.success){
                    this.userList = json.data;

                } else {
                    console.log(json);
                }
            });
    }


    @action doneAddingRoute = () => {
        this.addingRoute = false;
        HomePageStore.setTab(0);
    }
    
    @action getRoutes = (token) => {
        fetch(ServerURL + '/api/system/route/getRoutes?token=' + token,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(json => {
            
            if(json.success){
                this.routes = json.data;
                this.loadingRoutes = false;
            } else {
                console.log(json);
            }
        })
    }
    
/* 
Nature of code due to asynchronicity. The asynchronous callbacks of Googles geocoding library 
Detailed description: https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call/14220323#14220323
General solution: https://stackoverflow.com/questions/6847697/how-to-return-value-from-an-asynchronous-callback-function 
*/
    
    @action newRoute = (token, time, routeName, routeSuccess = this.routeSuccess, routes = this.routes, doneAddingRoute = this.doneAddingRoute) => {
        this.addingRoute = true;
        waypointGenerator(this.originName, this.destinationName, this.origin, this.destination, time, routeName,
                function(originName, destinationName, origin, destination, Rtime, RrouteName, waypoints,){

                fetch(ServerURL + '/api/system/route/newRoute?token=' + token,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        token: token,
                        // startLocation: startLocation,
                        startLocation: {
                            name: originName,
                            lat: origin.lat,
                            lng: origin.lng
                        },
                        // endLocation: endLocation,
                        endLocation: {
                            name: destinationName,
                            lat: destination.lat,
                            lng: destination.lng
                        },
                        waypoints: waypoints,
                        time: Rtime,
                        routeName: RrouteName,
                    })
                }) 
                .then(res=>res.json())
                .catch(error => console.error('Error:', error))
                .then(json=>{
                    if(json.success === true) {
                        routeSuccess = true;

                        fetch(ServerURL + '/api/system/route/getRoutes?token=' + token,{
                            method:'GET',
                            headers:{
                                'Content-Type':'application/json'
                            },
                        })
                        .then(res => res.json())
                        .catch(error => console.error('Error:', error))
                        .then(json => {
                            
                            if(json.success){
                                routes.push(json.data[json.data.length - 1]);
                            } else {
                                console.log("Unable to retrieve routes");
                            }
                        })

                    }
                    else{
                        console.log(json)
                        console.log("Failed to create new route");
                    } 
                    doneAddingRoute();
                }) 
        })
        
    }
    
}

const  RoutesStore = new routesStore();
export default RoutesStore;

