document.addEventListener('DOMContentLoaded', function(){
    console.log("load is OK!");
    if('serviceWorker' in navigator){
        navigator.serviceWorker.register('/sw_for_user.js', {scope: "/"}).then(
            function(registration){
                console.log("register is OK!");
                registration.pushManager.getSubscription().then(
                    function(subscription){
                        if(subscription){
                            console.log("getsubscription is OK!");
                            console.log(subscription);
                            return subscription
                        }
                        console.log("subscription is OK!");
                        return registration.pushManager.subscribe({userVisibleOnly: true});
                    }
                )
            }
        ).then(
            function(subscription){
                var endpoint = subscription.endpoint;
                console.log("pushManager RegistrationID:", endpoint.split("/").slice(-1).join());
                console.log("pushManager endpoint:", endpoint);

                //RegistrationIDをrailsにpostで送信
                var xhr = new XMLHttpRequest();
                xhr.open('GET', '/endpoints');
                xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
                xhr.send("id=" + endpoint.split("/").slice(-1).join());
            }
        ).catch(function(error){
            console.warn("serviceWorker error:", error);
        })
    }
})
