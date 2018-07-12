import { action, observable  } from 'mobx';

class offersStore {
    
    @observable offers = [];
    @observable loadingOffers = true;
    
    @action getOffers = (token) => {
        fetch('/api/system/offers/getOffers?userId=' + token,{
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
                this.offers = json.data;
                this.loadingOffers = false;
            }
            else
            {
                console.log("Unable to retrieve offers");
            }
        })
    }
    
    
    
    @action makeOffer = (carpoolName, senderId, senderRoute, recieverId, recieverRoute, join) => {        
        fetch('/api/system/offers/makeOffer',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                carpoolName: carpoolName,
                senderId: senderId,
                senderRoute: senderRoute,
                recieverId: recieverId,
                recieverRoute: recieverRoute,
                join: join
            })
        }) 
        .then(res=>res.json())
        .catch(error => console.error('Error:', error))
        .then(json=>{
            console.log(json);
            if(json.success !== true) {
                window.alert("Failed to create new offer");
            }
            
        })  
        
    }
    
}

const  OffersStore = new offersStore();
export default OffersStore;
