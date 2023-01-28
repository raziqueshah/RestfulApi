VoxeetSDK.notification.on("invitation", (e) => {
    console.log("invitation event");
    console.log(e.conferenceId);
    admitUsertoMeeting(e.conferenceId);
  });