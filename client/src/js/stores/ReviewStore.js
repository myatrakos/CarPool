// File Type: Store

import { observable, action  } from 'mobx';

/*
    Provides a store for ReviewTripModals
 */
class ReviewStore {
    @observable vouchesFor = {};

    @action getVouches = (userId) => {
        fetch('/api/account/vouch/getVouches?idFor=' + userId)
        .then(res => res.json())
        .then(json => {
            if (json.success){
                this.vouchesFor = json.data;
                return json.data;
            }else{
                console.log(json);
            }
        })
    }
}

export default ReviewStore;