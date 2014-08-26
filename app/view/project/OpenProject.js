Ext.define("ProjBldr.view.project.OpenProject", {
    extend: 'Ext.container.Container',
    alias: 'widget.openproject',

    requires: [
        'Ext.grid.Panel',
        'Ext.ux.grid.FiltersFeature'
    ],

    pageTitle: 'Open Project',

    items: [
        {
            xtype: 'component',
            html: 'Locate and select a project to work on.',
            cls: 'page-instructions'
        },
        {
            xtype: 'gridpanel',
            itemId: 'projectgrid',
            columnLines: true,
            autoScroll: true,
            store: 'ProjectStore',
            cls: 'grid-nav',
            features: [
                 {
                    ftype: 'filters',
                    local: true
                 }
             ],

            columns: [
                {
                    text: 'Project Name',
                    dataIndex : 'id',
                    flex: 2
                },
                {
                    text: 'Product',
                    dataIndex : 'product',
                    flex: 1,
                    filter: {
                        type: 'list'
                    }
                },
                {
                    text: 'Year',
                    dataIndex : 'year',
                    flex: 1,
                    filter: {
                        type: 'list'
                    }
                },
                {
                    text: 'Cycle',
                    dataIndex : 'cycle',
                    flex: 1,
                    filter: {
                        type: 'list'
                    }
                }
            ],

            dockedItems: [
                {
                    xtype: 'toolbar',
                    border: false,
                    dock: 'top',
                    padding: '0 0 8 0',
                    componentCls: 'gridTopToolbar',
                    style: {
                        background: '#ffffff'
                    },
                    items: [
                        '->',
                        {
                            text: 'Add New Project',
                            action: 'addproject'
                        }
                    ]
                }
            ]
        }
    ]
});