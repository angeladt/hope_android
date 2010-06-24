var filter = {
    filter : 'all',
    query : null,
    filter_func : function(talk) { return true; },
    load : function() {
        filter.filter = window.JSInterface.getFilter();
        var q = $.jqURL.get('q');
        if (q) {
          filter.query = decodeURI(q);
          filter.querylc = filter.query.toLowerCase();
        }
    },
    save : function() {
        window.JSInterface.saveFilter(filter.filter);
    },
    display : function() {
        var html = '';
        html = '<p id="filter">';
        html += '<span id="day-friday" filter="friday">Friday</span> ';
        html += '<span id="day-saturday" filter="saturday">Saturday</span> ';
        html += '<span id="day-sunday" filter="sunday">Sunday</span> ';
        html += '<span id="day-all" filter="all">All</span>';
        html += '</p>';
        if (filter.query) {
            html += '<p id="query">';
            // FIXME: escape query
            html += 'Searching for <strong id="filter_query">';
            html += Util.escape_html(filter.query);
            html += '</strong>';
            html += '<br />';
            html += '<a href="#" id="clear_query">Clear Search</a>';
            html += '</p>';
        }
        return html;
    },
    bind_callbacks : function() {
        // set current filter
        $("#day-"+filter.filter).addClass('current');
        
        // set callbacks
        var days = ['friday', 'saturday', 'sunday', 'all'];
        for(day in days) {
            $("#day-"+days[day]).bind('click', function() {
                $("#day-"+filter.filter).removeClass('current');
                filter.filter = $(this).attr('filter');
                filter.save();
                $("#day-"+filter.filter).addClass('current');
                display_talks(filter.filter_func);
            });
        }
        $("#clear_query").click(function() {
            filter.query = null;
            $("#query").remove();
            display_talks(filter.filter_func);
        });
    }
}
