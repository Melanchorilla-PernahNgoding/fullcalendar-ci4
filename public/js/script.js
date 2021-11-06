$(document).ready(function(){
    var calendar = $('#calendar').fullCalendar({
        editable:true,
        events: site_url + "/loaddata",
        displayEventTime: false,
        editable:true,
        eventRender: function(event, element, view) {
            if(event.allDay == 'true'){
                event.allDay = true;
            } else {
                event.allDay = false;
            }
        },
        selectable: true,
        selectHelper: true,
        select: function(start, end, allDay) {
            var title = prompt('Event Title:');

            if(title) {;
                var start = $.fullCalendar.formatDate(start, "Y-MM-DD");
                var end = $.fullCalendar.formatDate(end, "Y-MM-DD");

                $.ajax({
                    url: site_url + "/ajax",
                    data: {
                        title: title,
                        start: start,
                        end: end,
                        type: 'add',
                    },
                    type: "POST",
                    success: function(data) {
                        displayMessage("Event Created Successfully");

                        // calendar.fullCalendar('renderEvent', {
                        //     id: data.id,
                        //     title: title,
                        //     start: start,
                        //     end: end,
                        //     allDay: allDay,
                        // }, true);

                        calendar.fullCalendar('unselect');
                        calendar.fullCalendar('refetchEvents');
                        calendar.fullCalendar('rerenderEvents');
                    }
                })

            }
        },

        eventDrop: function(event, delta) {
            var start = $.fullCalendar.formatDate(event.start, "Y-MM-DD");
            var end = $.fullCalendar.formatDate(event.end, "Y-MM-DD");

            $.ajax({
                url: site_url + "/ajax",
                data: {
                    title: event.title,
                    start: start,
                    end: end,
                    id: event.id,
                    type: 'update'
                },
                type: 'POST',
                success: function(response) {
                    calendar.fullCalendar('refetchEvents');
                    calendar.fullCalendar('rerenderEvents');
                    displayMessage("Event Updated Successfully");
                    
                }
            })

        },

        eventClick: function(event) {
            var deleteMsg = confirm("Do you really want to delete?");

            if(deleteMsg) {
                $.ajax({
                    type: "POST",
                    url: site_url + '/ajax',
                    data: {
                        id: event.id,
                        type: 'delete'
                    },
                    success: function(response) {
                        calendar.fullCalendar('removeEvent', event.id);
                        calendar.fullCalendar('refetchEvents');
                        calendar.fullCalendar('rerenderEvents');
                        displayMessage("Event Deleted Successfully");
                    }
                })
            }
        }

    })
})

function displayMessage(message) {
    toastr.success(message, 'Event');
}