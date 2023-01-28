
            const buttonClick = () => {
                var input = document.getElementById('message-body');
                publishMessage(input.value);
                input.value = '';
            };
        
            const showMessage = (msg) => {
                var message = document.createElement('div');
                message.innerText = msg;
                document.getElementById('messages').appendChild(message);
            };
        
            let pubnub;
        
            const setupPubNub = () => {
                // Update this block with your publish/subscribe keys
                pubnub = new PubNub({
                    publishKey : "pub-c-007e8302-fe49-4679-b017-e292aa429b05",
                    subscribeKey : "sub-c-da5a9e0b-fa65-4c81-a286-6e6882efaa21",
                    userId: "myUniqueUserId"
                });
        
                // add listener
                const listener = {
                    status: (statusEvent) => {
                        if (statusEvent.category === "PNConnectedCategory") {
                            console.log("Connected");
                        }
                    },
                    message: (messageEvent) => {
                        showMessage(messageEvent.message.description);
                    },
                    presence: (presenceEvent) => {

                        // handle presence
                    }
                };
                pubnub.addListener(listener);
        
                // subscribe to a channel
                pubnub.subscribe({
                    channels: ["hello_world"]
                });
            };
        
            // run after page is loaded
            window.onload = setupPubNub;
        
            // publish message
            const publishMessage = async (message) => {
                // With the right payload, you can publish a message, add a reaction to a message,
                // send a push notification, or send a small payload called a signal.
                const publishPayload = {
                    channel : "hello_world",
                    message: {
                        title: "greeting",
                        description: message
                    }
                };
                await pubnub.publish(publishPayload);
            }