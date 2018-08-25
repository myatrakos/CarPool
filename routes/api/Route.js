// File Type: API endpoint

const express = require('express');

const Route = require('../../models/Route.js');
const routeMatcher = require('./Util/routeMatcher')
const User = require('../../models/User.js');

// This router handles all API calls that only rely on the Route collection.
const router = express.Router();
let verify = require('../middleware/verify.js');

// This method creates a document in the Route collection.
// Parameters: 
//      token: String;  Object id of a document in the User collection.
//      startLocation: String;  Coordinates of the start of the route.
//      endLocation: String;  Coordinates of the end of the route.
//      waypoints: Array;  List of coordinates along the route.
//      time: Time;  The time that you would normally travel the route.
//      routeName; String;  The name of the route.
// Return Value:
//      Response containing: 
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
router.use(verify);

router.post('/newRoute',(req,res,next) => {
    const { body } = req;
    const {
        token,
        startLocation,
        endLocation,
        waypoints,
        time,
        routeName
    } = body;

    const newRoute = new Route();
    newRoute.userId = token;
    newRoute.startLocation = startLocation;
    newRoute.endLocation = endLocation;
    newRoute.waypoints = waypoints;
    //newRoute.days = days;
    newRoute.time = time;
    newRoute.routeName = routeName;
    //newRoute.repeat = repeat;
 
    newRoute.save((err) => {
        if(err) {  
            return res.send({
                success: false,
                message: "Database error: " + err,
            });    
        }else{
            return res.send({
                success: true,
                message: "Success: Route Created"
            });
        }
    })

})

// This method gets all documents from the Route collection are for a particular user.
// Parameters: 
//      userId: String;  This is the object id of a document from the Route collection.
// Return Value:
//      Response containing: 
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
//          data: JSON object; Contains the data from the DB query.
router.get('/getRoutes',(req,res,next) => {
    const { query } = req;
    const { token } = query;

    Route.find({
        userId: token
    },
    (err,data) => {
        if(err) {
            res.send({
                success: false,
                message: "Database error: " + err,
            });
        }else{
            res.send({
                success: true,
                message: "Routes retrieved successfully",
                data: data
            });
        }
    });

})

// This method gets a specific carpool document from the Route collection.
// Parameters: 
//      _id: String;  This is the object id of a document from the Route collection.
// Return Value:
//      Response containing: 
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
//          data: JSON object; Contains the data from the DB query.
router.get('/getRoute',(req,res,next) => { 
    const { query } = req;
    const { routeId } = query;

    Route.find({
        _id: routeId
    },
    (err,data) => {
        if(err){
            return res.send({
                success: false,
                message: "Database error: " + err,
            })
        }else{
            res.send({
                success: true,
                message: "Route retrieved successfully",
                data: data
            });
        }
    });

})

// This method gets all documents from the Route collection that were not created by a user.
// Parameters: 
//      token: String;  This is the object id of a document from the User collection.
// Return Value:
//      Response containing: 
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
//          data: JSON object; Contains the data from the DB query.
router.get('/getOtherRoutes',(req,res,next) => {  
    const { query } = req;
    const { token } = query;

    Route.find({
        userId: {$ne: token}
    },
    (err,data) => {
        if(err) {
            res.send({
                success: false,
                message: "Database error: " + err,
            });
        }else{
            res.send({
                success: true,
                message: "Routes retrieved successfully",
                data: data
            });
        }
    });
})

// This method updates the routesCompared field of a document in the Route collection.
// Parameters: 
//      _id: String;  This is an object id of a document in the Route collection.
//		arrRouteId: Array;  This is a list of object ids of documents in the Route collection values that should be added to the field.
// Return Value:
//      Response containing: 
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
router.post('/updateRoutesCompared',(req,res,next) => {  
    const { body } = req;
    const { arrRouteId, _id } = body;

    Route.update({
        _id: _id 
    },{
        $push:{
            routesCompared:{$each:arrRouteId}
        }
    },
    (err) => {
        if(err) {
            res.send({
                success: false,
                message: "Database error: " + err,
            });
        }else{
            res.send({
                success: true,
                message: "Successfully updated Routes Compared",
            });
        }
    });
})

// This method updates the recommendedRoutes field of a document in the Route collection.
// Parameters: 
//      _id: String;  This is an object id of a document in the Route collection.
//		arrRouteId: Array;  This is a list of object ids of documents in the Route collection values that should be added to the field.
// Return Value:
//      Response containing: 
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
router.post('/updateRecommendedRoutes',(req,res,next) => {  
    const { body } = req;
    const { arrRouteId, _id } = body;

    Route.update({
        _id: _id 
    },{
        $push:{
            recommended:{$each:arrRouteId}
        }
    },
    (err) => {
        if(err) {
            res.send({
                success: false,
                message: "Database error: " + err,
            });
        }else{
            res.send({
                success: true,
                message: "Successfully updated Recommended Routes",
            });
        }
    });
})

router.get('/getRecommendedRoutes', async (req,res,next) => {
    const { query } = req;
    const { token, routeId } = query;    

    const obj = await routeMatcher.getRecommendedRoutes(token, routeId);

    if(obj) {
        let promiseArr = [];
        let completed = 0;
        for (let index = 0; index < obj.recommendedRoutes.length; index++) {
            console.log("Pushed: "+index);
            let queryPromise = User.find({
                _id : obj.recommendedRoutes[index].userId,
            },(err,data) => {
                if(err) {
                    console.log("Database error: " + err);
                }else{
                    obj.recommendedRoutes[index].userObj = data[0].toObject();
                    completed++;
                    console.log("Success: "+index);
                }
            })
            promiseArr.push( queryPromise.exec() );
            
        }
    
        Promise.all(promiseArr)
        .then(() => {
            if(completed === obj.recommendedRoutes.length){
                console.log("Return Obj");
                res.status(200).send({
                    success: true,
                    message: "Successfully retrieved Recommended Routes/Carpools",
                    obj: obj,
                });
            }else {
                console.log(":)");
            }
            
        })
        .catch((e) => {
            throw "There was an error: "+e;
        });
        
    }else {
        res.status(500).send({
            success: false,
            message: "Failed to retrieve Recommended Routes/Carpools",
        });
    }
})
module.exports = router;