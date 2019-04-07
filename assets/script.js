$(document).ready(function () {
    // initialize firebase


    var config = {
        apiKey: "AIzaSyBVKxgvX0PiWVH5Jw8Co7fGYhvxQfHJ_Is",
        authDomain: "trainscheduler-a0b49.firebaseapp.com",
        databaseURL: "https://trainscheduler-a0b49.firebaseio.com",
        projectId: "trainscheduler-a0b49",
        storageBucket: "trainscheduler-a0b49.appspot.com",
        messagingSenderId: "578821652067"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    
    $("#trainInfoBtn").on("click", function (event) {
        event.preventDefault(); 

        var trainName = $("#name").val().trim();
        var destination = $("#dest").val().trim();
        var firstTime = moment($("#firstTime").val().trim(), "hh:mm").subtract(1, "years").format("X");
        var frequency = $("#freq").val().trim();

        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        console.log(trainName);
        console.log(destination);
        console.log(firstTime);
        console.log(frequency);
        console.log(currentTime);

        var newTrain = {

            train: trainName,
            trainGoing: destination,
            trainComing: firstTime,
            everyXMin: frequency
        };

        database.ref().push(newTrain);
        

        
        $("#name").val("");
        $("#dest").val("");
        $("#firstTime").val("");
        $("#freq").val("");

        return false;

    });

    database.ref().on("child_added", function (childSnapshot) {

        console.log(childSnapshot.val());
        
        var trainName = childSnapshot.val().train;
        var destination = childSnapshot.val().trainGoing;
        var firstTime = childSnapshot.val().trainComing;
        var frequency = childSnapshot.val().everyXMin;

        console.log(trainName);
        console.log(destination);
        console.log(firstTime);
        console.log(frequency);
        
        
        var trainTime = moment.unix(firstTime).format("hh:mm");
        var current = moment().format("hh:mm")
        var difference = moment.duration(moment().diff(trainTime)).as('minutes');
        var trainRemain = difference % frequency;
        var minUntil = frequency - trainRemain;
        var nextArrival = moment().add(minUntil, "minutes").format('hh:mm');
        console.log(difference)
        console.log(trainTime)
        $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minUntil + "</td></tr>");

    });
});

