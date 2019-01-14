var display_calendar_options = {
    header: {
      left: "today prev,next title",
      center: "",
      right: ""
    },
    footer: true,
    buttonText: {
        prev: 'prev',
        next: 'next',
        prevYear: 'prev year',
        nextYear: 'next year',
        year: 'year',
        today: 'today',
        month: 'month',
        week: 'week',
        day: 'day'
    },
    buttonIcons: {
        prev: 'right-single-arrow',
        next: 'left-single-arrow',
        prevYear: 'right-double-arrow',
        nextYear: 'left-double-arrow'
    },
    aspectRatio: 1.8,
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
