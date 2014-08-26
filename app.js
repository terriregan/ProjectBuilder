/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when upgrading.
*/

// DO NOT DELETE - this directive is required for Sencha Cmd packages to work.
//@require @packageOverrides

var Bloomer;			// global object

Ext.Loader.setConfig({
    enabled : true,
    paths: {
        'ProjBldr' : 'app',
        'Btk' : '../shared',
        // need to use the 4.2 ux distribution--shared folder uses 4.1 - 
        // this is throwing a sencha cmd build error due to apache rewrite
        'Ext.ux' : '../ext-4.2/examples/ux'        
    }
});

Ext.require([
    'ProjBldr.view.Viewport'
]);


Ext.application({
    name: 'ProjBldr',
    extend: 'ProjBldr.Application',

    init: function() {
        Ext.setGlyphFontFamily('Pictos');
        this.checkForLogin();
    },

    /**
     * Check if we have a logged user
     */
    checkForLogin: function() {
        Ext.Ajax.request({
            url: '/apis/timetrk/user/loggedinuser.json',
            scope: this,

            callback: function(opts, success, response){
                if ( success ) {
                    var r = Ext.decode(response.responseText);
                    Bloomer = r.user;

                   // success load UI
                   this.displayView();
                } else {

                    // login failed, return to main login screen
                    this.reDirectToLogin();

                }
            }
        })
    },

    displayView: function() {
        // create main application viewport
        Ext.create('ProjBldr.view.Viewport', {
            listeners: {
                afterrender: function() {
                    var mask = Ext.get('loading-mask'),
                        parent = Ext.get('loading-parent');

                    // Destroy the masks
                    mask.fadeOut({callback: function(){ mask.destroy(); }});
                    parent.fadeOut({callback: function(){ parent.destroy(); }});
                }
            }
        });
    },

    reDirectToLogin: function() {
        window.top.location.replace(location.protocol + '//' + location.host + '?redirect=ProjBldr&hash=' + location.hash);
    }
});