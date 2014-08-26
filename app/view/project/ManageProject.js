Ext.define("ProjBldr.view.project.ManageProject", {
    extend: 'Ext.container.Container',
    alias: 'widget.manageproject',

    requires: [
        'Ext.tab.Panel',
        'ProjBldr.view.project.FinalObject',
        'ProjBldr.view.project.LinkSourceMaterial'
    ],

    pageTitle: 'Open Project > Manage Project',

    items: [
        {
            xtype: 'component',
            itemId: 'page-project',
            padding: '0 10 20 0',
            style: {
                color: '#f3c231',
                fontSize: '.9em'
            }
        },
        {
            xtype: 'component',
            html: 'Instructions',   // adding this in event reqs require instructions
            cls: 'page-instructions',
            padding: '0 10 20 0'
        },
        {
            xtype: 'tabpanel',
            itemId: 'manageproject-tabpanel',
            plain: true,
            minTabWidth: 220,

            bodyCls: 'tab-panel-content',

            items: [
                {
                    title: 'FINAL OBJECTS',
                    xtype: 'finalobject',
                    itemId: 'finalobjectgrid',
                    height: 400
                },
                {
                    title: 'LINK SOURCE MATERIALS',
                    xtype: 'linksource'
                },
                {
                    title: 'PROJECT PROPERTIES'
                }
            ]
        }
    ]

});