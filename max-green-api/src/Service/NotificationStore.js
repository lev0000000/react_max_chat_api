import { makeAutoObservable } from "mobx"

class NotificationStore {
    
    updateTrigger = 0;

    constructor() {
        makeAutoObservable(this);
    }

    notify() {
        this.updateTrigger++;
        console.log("NOTIFY:", this.updateTrigger);

    }

}

export default new NotificationStore();