Ext.define('ProjBldr.view.Footer', {
    extend: 'Ext.toolbar.Toolbar',
    alias : 'widget.pageFooter',

    height: 30,

   /* defaults: {
        cls: 'x-bottom-nav-btn',
        overCls: 'x-bottom-nav-btn-over'
    },*/

    items: [
        {
            xtype: 'component',
            html : '&copy; National Foreign Language Center at the University of Maryland',
            margin: '0 20 0 0'
        },
        '->',
        {
            text: 'Project Builder Home',
            action: 'GO_PB_HOME'
        },
        {
            xtype: 'tbseparator',
            style: {
                border: '1px inset #dddddd'
            }

        },
        {
           text: 'BLOOM Home',
           action: 'GO_BLOOM_HOME'
        },
        {
            xtype: 'tbseparator',
            style: {
                border: '1px inset #dddddd'
            }

        },
        {
            text: 'Help',
            action: 'HELP'
        },
        {
            xtype: 'tbseparator',
            style: {
                border: '1px inset #dddddd'
            }

        },
        {
            text: 'User Support',
            margin: '0 15 0 0',
            action: 'SUPPORT'
        }
    ]

});
