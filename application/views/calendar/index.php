<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Calendar Display</title>
        <link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <link rel="stylesheet" href="<?php echo base_url() ?>scripts/fullcalendar/fullcalendar.min.css" />
               <script src="<?php echo base_url() ?>scripts/fullcalendar/lib/moment.min.js"></script>
               <script src="<?php echo base_url() ?>scripts/fullcalendar/fullcalendar.min.js"></script>
               <script src="<?php echo base_url() ?>scripts/fullcalendar/gcal.js"></script>
    </head>
    <body>

    <div class="container">
    <div class="row">
    <div class="col-md-12">

    <h1>Caelndar</h1>
        <div id="calendar">
</div>


    </div>
    </div>
    </div>

<script type="text/javascript">
    function getColor() {
        return '#'+Math.floor(Math.random()*16777215).toString(16);
    }
</script>
<script type="text/javascript">
$(document).ready(function() {
    $('#calendar').fullCalendar({
    eventSources: [
            {
                color: getColor(),   
                textColor: '#FF0000',
                events: []
            }
        ]
});
</script>
    </body>
</html>
