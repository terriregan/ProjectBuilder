if( nflcapp === undefined ) {
    var nflcapp = {};
}

nflcapp.dummyConsole = {
    assert : function(){},
    log : function(){},
    warn : function(){},
    error : function(){},
    debug : function(){},
    dir : function(){},
    info : function(){}
};

nflcapp.console = nflcapp.dummyConsole;

nflcapp.enableConsoleOutput = function(enable) {
    // Don't enable the console unless it actually exists
    if (enable && window.console !== undefined) {
        nflcapp.console = window.console;
    } else {
        nflcapp.console = nflcapp.dummyConsole;
    }
};