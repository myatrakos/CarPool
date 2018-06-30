import { action, observable  } from 'mobx';
import { waypointGenerator } from './../utils/waypointGenerator';

class routesStore {
    
    @observable routes = [];
    @observable routeSuccess = false;
    @observable loadingRoutes = true;
    
    @observable originResult = {};
    @observable destinationResult = {};
    
    @observable originName = "";
    @observable destinationName = "";
    
    @observable origin = {};
    @observable destination = {};
    
    @action setGoogleOriginResult = (result) =>
    {
        this.originResult = result;
        this.originName = result.formatted_address;
    }
    
    @action setGoogleDestinationResult = (result) =>
    {
        this.destinationResult = result;
        this.destinationName = result.formatted_address;
    }
    
    @action setOrigin = (origin) => {
        this.origin = origin;
    }
    
    @action setdestination = (destination) => {
        this.destination = destination;
    }
    
    @action getRoutes = (token) => {
        fetch('/api/system/route/getRoutes?userId=' + token,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(json => {
            
            if(json.success)
            {
                this.routes = json.data;
                this.loadingRoutes = false;
            }
            else
            {
                console.log("Unable to retrieve routes");
            }
        })
    }
    
    
    
    @action newRoute = (token/*, startLocation, endLocation, days*/, time, routeName/*, repeat*/) => {
        
        var waypoints = [{"lat":54,"lng":45},{"lat":54,"lng":45},{"lat":54,"lng":45}];
        console.log(waypoints);
        waypoints = waypointGenerator(this.origin.lat,this.origin.lng,this.destination.lat,this.destination.lng)
        .then(result =>{
            // waypoints = result;
            console.log(result);
            console.log(waypoints);
        })

   

        // const route = {
        //     userId: token,
        //     startLocation: {
        //         name: this.originName,
        //         lat: this.origin.lat,
        //         lng: this.origin.lng
        //     },
        //     endLocation: {
        //         name: this.destinationName,
        //         lat: this.destination.lat,
        //         lng: this.destination.lng
        //     },
        //     waypoints: waypoints,
        //     // days: days,
        //     time: time,
        //     routeName: routeName,
        //     // repeat: repeat
        //     _id: Date.now
        // }
        
        // fetch('/api/system/route/newRoute',{
        //     method:'POST',
        //     headers:{
        //         'Content-Type':'application/json'
        //     },
        //     body:JSON.stringify({
        //         userId: token,
        //         // startLocation: startLocation,
        //         startLocation: {
        //             name: this.originName,
        //             lat: this.origin.lat,
        //             lng: this.origin.lng
        //         },
        //         // endLocation: endLocation,
        //         endLocation: {
        //             name: this.destinationName,
        //             lat: this.destination.lat,
        //             lng: this.destination.lng
        //         },
        //         waypoints: waypoints,
        //         // days: days,
        //         time: time,
        //         routeName: routeName,
        //         // repeat: repeat
        //     })
        // }) 
        // .then(res=>res.json())
        // .catch(error => console.error('Error:', error))
        // .then(json=>{
        //     console.log(json);
        //     if(json.success === true) {
        //         this.routeSuccess = true;
        //         this.routes.push(route);
        //     }
        //     else{
        //         window.alert("Failed to create new route");
        //     }
            
        // })  
        
    }
    
}

const  RoutesStore = new routesStore();
export default RoutesStore;

