export const GeminiNotification = (title, content,  img) => {
    Notification.requestPermission().then(reponses => {
        if(reponses === "granted"){
            new Notification(title, {
                body:content,
                image:img
            });
        } else {
            alert("Please  Allow Notifications");
        }
    }).catch(error => console.log(error));
}
