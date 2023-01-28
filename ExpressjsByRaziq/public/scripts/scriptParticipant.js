const patientList = [
    "Natalie",
    "Jumbo",
    "Jessica",
    "Michelle",
    "Sarah",
    "Samantha",
    "Danielle",
    "Ronald",
    "Terry",
    "Rebekah",
    "Christian Avila",
  ];
   
  let externalID = patientList[Math.floor(Math.random() * patientList.length)];


  VoxeetSDK.session.open({ 
    name: externalID, 
    externalId: externalID, 
  });


  const initializePubnub = async () => {
    try {
      const response = await fetch(`/pubnubValues`);
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      pubnub_subscribe_key = jsonResponse.pubnub_subscribe_key;
      console.log(pubnub_subscribe_key);
      pubnub_publish_key = jsonResponse.pubnub_publish_key;
      pubnub_channel = jsonResponse.pubnub_channel;
      pubnub_presence_url = jsonResponse.pubnub_presence_url;
   
      pubnub = new PubNub({
        subscribeKey: pubnub_subscribe_key,
        publishKey: pubnub_publish_key,
        uuid: externalID,
      });
      // Subscribe to the PubNub Channel
      pubnub.subscribe({
        channels: [pubnub_channel],
        withPresence: true,
      });
   
      pubnub.addListener(listener);
    } catch (error) {
      console.log("getpubnubValues: ", error);
    }
  };


  listener = {
    status(response) {
      try {
        if (response.category === "PNConnectedCategory") {
          pubnub.hereNow({
            channels: [pubnub_channel],
            includeUUIDs: true,
            includeState: true,
          });
        }
      } catch (error) {
        console.log("listener response: " + error);
      }
    },
   
    message(response) {
      if (externalID === response.userMetadata.uuid) {
        let msg = response.message; // The Payload
   
        let publisher = response.publisher; //The Publisher
   
        waitingroom_msg.innerText = msg;
      }
    },
  };


  admitUsertoMeeting = async (conferenceID) => {
    try {
      globalUnsubscribe();
      container_lobby.remove();
      container_media.style.display = "initial";
      const conference = await VoxeetSDK.conference.fetch(conferenceID);
   
      let options = {
        leaveConferenceOnBeforeUnload: true,
        constraints: {
          audio: false,
          video: false,
        },
        simulcast: false,
        maxVideoForwarding: 16,
      };
   
      confObject = await VoxeetSDK.conference.join(conference, options);
      startVideoBtn.disabled = false;
      startAudioBtn.disabled = false;
    } catch (error) {
      console.log("admitUsertoMeeting: " + error);
    }
  };


  // If person leaves or refreshes the window, run the unsubscribe function
 
onbeforeunload = function () {
    globalUnsubscribe();
    $.ajax({
      // Query to server to unsub sync
   
      async: false,
      method: "GET",
      url: pubnub_presence_url + encodeURIComponent(UniqueID),
    })
      .done(function (jqXHR, textStatus) {
        console.log("Request done: " + textStatus);
      })
      .fail(function (jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
      });
    return null;
  };


  // Unsubscribe people from PubNub network 
const globalUnsubscribe = () => {
    try {
      pubnub.unsubscribe({
        channels: [pubnub_channel],
      });
      pubnub.removeListener(listener);
    } catch (err) {
      console.log("Failed to UnSub");
    }
  };