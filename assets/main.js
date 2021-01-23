  
$(function () {});

//Declaration of Variables
var today = moment().format("dddd, MMM Do");


var current = moment().format("H A");


var currentPlan = [
    { time: "8 AM", event: "" },
    { time: "9 AM", event: "" },
    { time: "10 AM", event: "" },
    { time: "11 AM", event: "" },
    { time: "12 PM", event: "" },
    { time: "1 PM", event: "" },
    { time: "2 PM", event: "" },
    { time: "3 PM", event: "" },
    { time: "4 PM", event: "" },
    { time: "5 PM", event: "" },
];


/* Local Storage */

var workEvents = JSON.parse(localStorage.getItem("workDay"));

if (workEvents) {

    currentPlan = workEvents;

}
/*Current Day Id*/
$("#currentDay").text(today);

/* Row Creation for my calender*/

currentPlan.forEach(function (timeBlock, index) {
    var timeLabel = timeBlock.time;
    var blockColor = colorRow(timeLabel);

    var row =

        $('<div class="time-block" id="' +
            index +
            '"><div class="row no-gutters input-group"><div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' +
            timeLabel +
            '</div><textarea class="form-control ' +
            blockColor +
            '">' +
            timeBlock.event +
            '</textarea><div class="col-sm col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit"><i class="far fa-save"></i></i></button></div></div></div>');

    $(".container").append(row);
});

function colorRow(time) {
    var planNow = moment(current, "H A");
    var planEntry = moment(time, "H A");

    if (planNow.isBefore(planEntry) === true) {
        return "future";
    }
    else if (planNow.isAfter(planEntry) === true) {
        return "past";
    }
    else {
        return "present";


    }

}
/* save button*/



$(".saveBtn").on("click", function () {
    var blockID = parseInt(
        $(this)
            .closest(".time-block")
            .attr("id")
    );
    var userEntry = $.trim(
        $(this)
            .parent()
            .siblings("textarea")
            .val()
    );

    currentPlan[blockID].event + userEntry;


    localStorage.setItem("workDay", JSON.stringify(currentPlan)

    );
});












