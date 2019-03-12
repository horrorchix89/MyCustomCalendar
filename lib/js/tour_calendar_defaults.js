var calendar_options = {
    header: {
      left: "today prev,next title",
      center: "",
      right: "listYear,View"
    },
    buttonText: {
        prev: 'prev',
        next: 'next',
        prevYear: 'prev year',
        nextYear: 'next year',
        year: 'Year',
        today: 'Today',
        month: 'Month',
        week: 'Week',
        day: 'Day'
    },
    buttonIcons: {
        prev: 'right-single-arrow',
        next: 'left-single-arrow',
        prevYear: 'right-double-arrow',
        nextYear: 'left-double-arrow'
    },
    //aspectRatio: 1.8,
    fixedWeekCount: false,
    nowIndicator: true,
    slotLabelInterval: "01:00",
    slotLabelFormat: "h A",
    listDayFormat: "ddd MMM D",
    listDayAltFormat: false,
    noEventsMessage: "no events",
    defaultRangeSeparator: false,
    views: {
      listYear: {
        buttonText: "list",
        titleFormat: "MMMM",
        timeFormat: "h:mm A"
      }
    },
    events: {
        url: "../../../app-assets/data/fullcalendar/php/get-events.php",
        error: function() {
            $("#script-warning").show();
        }
    },
    loading: function(t) {
        $("#loading").toggle(t);
    }
};
