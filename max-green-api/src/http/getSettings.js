import { useContext } from "react";
import { $host } from "./index";

import NotificationStore from "../store/NotificationStore";

const id = localStorage.getItem('Id')
const api = localStorage.getItem('Api')
const notification = new NotificationStore()

export const login = async (Id, ApiToken) => {
    const data = await $host.get(
        `/waInstance${Id}/getStateInstance/${ApiToken}`
    )
    localStorage.setItem('Id', Id);
    localStorage.setItem('Api', ApiToken);

    return data;
}

export const chats = async () => {
    const { data } = await $host.get(
        `/waInstance${id}/getChats/${api}`
    )

    return data;
}

export const currentChat = async (chatId, count = 20) => {
    const { data } = await $host.post(
        `/waInstance${id}/getChatHistory/${api}`, { chatId, count }
    )

    return data.reverse();
}

export const send = async (chatId, message, time = 1000) => {
    const { data } = await $host.post(
        `/waInstance${id}/sendMessage/${api}`, { chatId, message }
    )

    return data;
}

export const getNotification = async () => {
    const { data } = await $host.get(
        `/waInstance${id}/receiveNotification/${api}`
    );



    return data;

}

export const deleteNotification = async (receiptId) => {
    const { data } = await $host.delete(
        `/waInstance${id}/deleteNotification/${api}/${receiptId}`
    );

    return data;
};


