import { makeAutoObservable } from "mobx"

export default class NotificationStore {
    
    updateTrigger = 0;

    constructor() {
        makeAutoObservable(this);
    }

    notify() {
        this.updateTrigger++;
    }

}

