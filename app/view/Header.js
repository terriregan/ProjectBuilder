Ext.define('ProjBldr.view.Header', {
    extend: 'Ext.Toolbar',
    alias : 'widget.pageHeader',

    height: 55,
    layout: 'hbox',

    items: [
        {
            xtype: 'container',
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            flex: 1,

            items: [
                {
                    xtype: 'component',
                    cls  : 'x-logo',
                    html : 'project builder<div id="tagline">PROJECT BUILDER TAGLINE</div>'
                }
            ]
        },
        {
            xtype: 'button',
            action: 'logout',
            text: 'Log out',
            border: 1,
            style: {
                background: '#ffffff',
                borderColor: '#e0e5ec'
            }
        }
    ]
});
