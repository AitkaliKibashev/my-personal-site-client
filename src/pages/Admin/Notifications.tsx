import React, {useEffect} from 'react';
import {PostNotification} from "../../models/Post";
import {useAppDispatch} from "../../hooks/redux";
import {readNotifications} from "../../store/reducers/actionCreators";

interface NotificationsProps {
    notifications: PostNotification[]
}

const Notification: React.FC<{notification: PostNotification}> = ({notification}) => {
    return (
        <a
            href={'/post/' + notification.post}
            className="notification-wrapper"
        >
            <div className="notification__post-image">
                <img src={notification.image ? `https://api.kibashev.site${notification.image}`: 'https://cdnb.artstation.com/p/assets/images/images/018/262/883/large/lucas-gomes-paisagem03.jpg?1558740462'} alt="notification"/>
            </div>
            <div className={"notification__inner"} dangerouslySetInnerHTML={{__html: notification.message}}>

            </div>
            <span className="notification__close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 6L18 18" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </span>
        </a>
    )
}

const Notifications: React.FC<NotificationsProps> = ({notifications}) => {
    const unreadNotifications = notifications.filter(notification => notification.is_read === false)
    const redNotifications = notifications.filter(notification => notification.is_read === true)
    const dispatch = useAppDispatch()

    useEffect(() => {
        return () => {
            if(unreadNotifications.length) {
                unreadNotifications.forEach(notification => {
                    if(notification.id) {
                        dispatch(readNotifications({is_read: true}, notification.id))
                    }
                })
            }
        }
    }, [dispatch, unreadNotifications])

    return (
        <div className="notifications-block">
            {unreadNotifications.length ? <h2>Не прочитанные уведомления</h2> : null}
            {
                unreadNotifications.map(notification =>
                    <Notification key={notification.id} notification={notification} />
                )
            }
            <h2>Прочитанные уведомления</h2>
            {redNotifications.map(notification =>
                <Notification key={notification.id} notification={notification} />
            )}
        </div>
    );
};

export default Notifications;