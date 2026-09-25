import { $host } from "./index";

const id = localStorage.getItem('Id')
const api = localStorage.getItem('Api')

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
    const {data} = await $host.post(
        `/waInstance${id}/getChatHistory/${api}`, {chatId, count }
    )

    return data.reverse();
}

export const send = async (chatId, message, time = 1000 ) => {
    const {data} = await $host.post(
        `/waInstance${id}/sendMessage/${api}`, {chatId, message}
    )

    return data;
}

export const notification = async () => {
    const {data} = await $host.get(
        `/waInstance${id}/receiveNotification/${api}`
    )

    if(data!== null){
        return data
    }else{
        notification();
    }
}


