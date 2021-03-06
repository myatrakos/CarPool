// File Type: Store

import { action, observable } from 'mobx';

import { getFromStorage } from '../utils/localStorage.js'
import ServerURL from '../utils/server';

class vouchStore {
    @observable vouchesFor = [];
    @observable allUsers = [];
    @observable token;

    @action getAllUsers = (token) => {
        fetch(ServerURL + '/api/account/profile/getAllUsers?token=' + token)
            .then(res => res.json())
            .then(json => {
                if(json.success){
                    this.allUsers = json.data;
                }else{
                    console.log(json);
                    console.log("Failed to retrieve User list");
                }
            });
    }

    @action getUsername = (userId) => {
        let found = false;
       
        for( let x = 0; x < this.allUsers.length && !found; x++){
            if(this.allUsers[x]._id === userId){
                found = true;
                this.userName = this.allUsers[x].firstName;
                return this.userName;
            }
        }
    }

    @action getUsernameSurname = (userId) => {
        let found = false;
        
        for( let x = 0; x < this.allUsers.length && !found; x++){
            if(this.allUsers[x]._id === userId){
                found = true;
                this.userNameSurname = this.allUsers[x].firstName+ " "+ this.allUsers[x].lastName;
                return this.userNameSurname;
            }
        }
    
    }

    @action getUserProfilePic = (userId) => {

        let found = false;
        
        for( let x = 0; x < this.allUsers.length && !found; x++){
            if(this.allUsers[x]._id === userId){
                found = true;

                this.userProfilePicName = this.allUsers[x].profilePic;
                return this.userProfilePicName;
            }
        }

    }

    @action getVouchesFor= (idFor) => {

        fetch(ServerURL + '/api/account/vouch/getVouches?idFor=' + idFor)
        .then(res => res.json())
        .then(vouches => {
            if (vouches.success) {
                this.vouchesFor = vouches.data;
                return vouches.data;
            }else{
                console.log(vouches);
            }
        });
    }

    @action submitVouch(tripID, idFor, rating, reviewBody, token){
        if(reviewBody!== undefined){
            const obj = getFromStorage('sessionKey');
            fetch(ServerURL + '/api/account/vouch/submitVouch?token=' + token,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    tripID:tripID,
                    idBy:obj.token,
                    idFor:idFor,
                    rating:rating,
                    date:new Date(),
                    reviewBody:reviewBody
                })
            }).then(res=>res.json())
                .catch(error => console.error('Error:', error))
                .then(json=>{
                });
        }
    }
}

const VouchStore = new vouchStore();

export default VouchStore;