Ext.define('ProjBldr.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border',
        'ProjBldr.view.Header',
        'ProjBldr.view.Footer',
        'ProjBldr.view.Navigation',
        'ProjBldr.view.ContentContainer'
    ],

    layout: 'border',
    border: false,

    items: [
        //HEADER
        {
            region: 'north',
            xtype : 'pageHeader',
            cls: 'app-header'
        },

        // CENTER CONTAINER
        {
            region: 'center',
            layout: {
                type:'vbox',
                align:'stretch'
            },

            items: [
                // NAVIGATION
                {
                    xtype:'navigation',
                    border: 0,
                    height: 35
                },
                // CONTENT AREA
                {
                    xtype: 'contentContainer',
                    flex: 1
                }
            ]
        },

        // FOOTER
        {
            region: 'south',
            xtype : 'pageFooter',
            cls: 'app-footer'
        }
    ]
});
