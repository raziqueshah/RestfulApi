const IntializeandOpenSession = async () => {
    VoxeetSDK.conference;
    let accessToken;
    try {
      const response = await fetch(`/clientAccessToken`);
      const jsonResponse = await response.json();
      accessToken = jsonResponse.accessToken;
    } catch (error) {
      console.log("IntializeandOpenSession: ", error);
    }
   
    VoxeetSDK.initializeToken(accessToken);
    try {
      await VoxeetSDK.session.open({ name: "Host" });
      console.log("Host session");
    } catch (error) {
      console.log("====================================");
      console.log(`Something went wrong ${error}`);
    }
  };



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
          hereNow(response.affectedChannels);
        }
      } catch (error) {
        console.log(" listener response" + error);
      }
    },
   
    message(response) {},
    presence(response) {
      if (response.action === "join") {
        for (i = 0; i < response.occupancy; i++) {
          if (response.uuid !== undefined) {
            let uuidVCJoin = userList.indexOf(response.uuid);
            if (uuidVCJoin === -1) {
              userList[userList.length] = response.uuid;
              console.log("Insert ", response.uuid, "in array");
            } else {
              console.log("UUID: ", response.uuid, "is already in the array");
            }
          }
        }
      }
   
      if (response.action === "interval") {
        if (response.join !== undefined) {
          for (i = 0; i < response.occupancy; i++) {
            if (response.join[i] !== undefined) {
              var uuidVCIntervalJoin = userList.indexOf(response.join[i]);
              if (uuidVCIntervalJoin === -1) {
                console.log("Interval Add UUID: ", uuidVCIntervalJoin);
                userList[userList.length] = response.join[i];
              }
            }
          }
        }
   
        if (response.leave !== undefined) {
          for (i = 0; i < response.occupancy; i++) {
            let uuidVCIntervalLeave = userList.indexOf(response.leave[i]);
            if (uuidVCIntervalLeave > -1) {
              console.log("REMOVE USER FROM ARRAY", uuidVCIntervalLeave);
              userList.splice(uuidVCIntervalLeave, 1);
              if (response.uuid !== externalID) {
                removeUserfromWaitingList(response.uuid);
              }
            }
          }
        }
      }
   
      if (response.action === "leave") {
        for (i = 0; i < response.occupancy; i++) {
          let uuidVCLeave = userList.indexOf(response.uuid);
          if (uuidVCLeave > -1) {
            console.log(
              "REMOVE USER FROM ARRAY",
              uuidVCLeave,
              "with UUID: ",
              response.uuid
            );
            userList.splice(uuidVCLeave, 1);
   
            if (response.uuid !== externalID) {
              removeUserfromWaitingList(response.uuid);
            }
          }
        }
      }
   
      userList.forEach((user) => {
        if (user != externalID) {
          addUsertoWaitingList(user);
        }
      });
    },
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



  UniqueID = PubNub.generateUUID();



  const addUsertoWaitingList = (user) => {
    const checkIdExists = document.getElementById(user);
    if (!checkIdExists) {
      try {
        let card = document.createElement("div");
        card.id = user;
        card.className = "card bg-dark mb-2";
   
        let cardBody = document.createElement("div");
        cardBody.className = "card-body";
   
        let headingH5 = document.createElement("h5");
        headingH5.className = "card-title text-white";
        headingH5.innerText = user;
   
        let btnGroup = document.createElement("div");
        btnGroup.className = "btn-group";
        btnGroup.role = "group";
   
        const notifyUserBtn = document.createElement("button");
        notifyUserBtn.setAttribute("type", "button");
        notifyUserBtn.setAttribute("class", "btn btn-success m-1 ");
        notifyUserBtn.setAttribute("name", user);
        notifyUserBtn.setAttribute("onclick", "SendMessagetoParticipant(this)");
        notifyUserBtn.value = "Notify";
        notifyUserBtn.innerHTML = "Notify";
        btnGroup.appendChild(notifyUserBtn);
   
        const useronWaitbutton = document.createElement("button");
        useronWaitbutton.setAttribute("type", "button");
        useronWaitbutton.setAttribute("class", "btn btn-secondary m-1 ");
        useronWaitbutton.setAttribute("name", user);
        useronWaitbutton.setAttribute(
          "onclick",
          "InviteParticipanttotheMeeting(this)"
        );
   
        useronWaitbutton.innerHTML = "Invite";
        btnGroup.appendChild(useronWaitbutton);
        cardBody.appendChild(headingH5);
        cardBody.appendChild(btnGroup);
        card.appendChild(cardBody);
        container_listGroup.appendChild(card);
      } catch (error) {
        console.log("addUsertoWaitingList: " + error);
      }
    }
  };


  const SendMessagetoParticipant = async (participantName) => {
    participantName = participantName.name;
    notificationMessage = `Hello ${participantName}, Dr.Sree here! I am currently attending another patient, I will be with you shortly.`;
    pubnub.publish(
      {
        channel: pubnub_channel,
        message: notificationMessage,
        meta: {
          uuid: participantName,
        },
      },
      function (status, response) {
        console.log(status, response);
      }
    );
  };



  const InviteParticipanttotheMeeting = async (participantName) => {
    participantUser = participantName.name;
    var participants = [{ id: "", externalId: participantUser, avatarUrl: "" }];
    conferenceAliasInput = `${externalID} and ${participantUser}'s meeting`;
    CreateandJoinConference(conferenceAliasInput);
    await sleep(1000);
    container_control.style.display = "initial";
   
    try {
      let conference = VoxeetSDK.conference.current;
      VoxeetSDK.notification.invite(conference, participants);
    } catch (error) {
      console.log("InviteParticipanttotheMeeting: " + error);
    }
   
    htmlParentElement = document.getElementById(participantUser);
    htmlParentElement.remove();
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