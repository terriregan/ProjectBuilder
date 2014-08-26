Ext.define('ProjBldr.view.Navigation', {
    extend: 'Ext.toolbar.Toolbar',
    alias : 'widget.navigation',
    id: 'main-navigation',

    requires: [
        'Ext.button.Split'
    ],

    initComponent: function() {
        this.items = [
            {
                glyph: 72,
                scale: 'medium',
                action: 'home'
            },
            '-',
            {
                text : 'Project',
                xtype: 'splitbutton',
                menu:[
                    {
                        text: 'New Project',
                        glyph: 100,
                        action: 'newproject'
                    },
                    {
                        text: 'Open Project',
                        action: 'openproject'
                    },
                    '-',
                    {
                        text: 'New Product Design',
                        glyph: 76,
                        action: 'newproductdesign'
                    },
                    {
                        text: 'Open Product Design',
                        action: 'openproductdesign'
                    }
                ]
            },
            '-',
            {
                text : 'Package',
                xtype: 'splitbutton',
                menu:[
                    {
                        text: 'New Package',
                        action: 'newpackage'
                    },
                    {
                        text: 'Open Package',
                        action: 'openpackage'
                    }
                ]
            },
            '-',
            {
                text : 'Settings',
                action: 'settings'
            },
            '->',
            {
                xtype: 'component',
                itemId: 'loggedinuser',
                tpl: 'Welcome {username}!',
                margin: '0 15 0 0'
            }
        ];

        this.callParent();
    }

});