import { deleteNotification, getNotification } from "../http/getSettings";
import NotificationStore from "../store/NotificationStore";
const notification = new NotificationStore()
export const listenNotifications = async () => {
    while (true) {
        try {
            const data = await getNotification();

            if (data) {
                notification.notify();
                console.log(data)
                await deleteNotification(data.receiptId);

            }
        } catch (error) {
            console.error(error);

            await new Promise(resolve =>
                setTimeout(resolve, 3000)
            );
        }
    }
};
