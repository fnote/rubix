(function($){
    var highChartLib = {
        location: "lib_high.js"
    };
    console.log(App.util.formatters.formatDateForPattern(Date.now(), 'y/M/dd h:m:s.S ')+' : loaded '+highChartLib.location);
})(jQuery);
