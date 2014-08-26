Ext.define("ProjBldr.view.project.FinalObject", {
    extend: 'Ext.grid.Panel',
    alias: 'widget.finalobject',
    cls: 'grid-nav-toolbar',

    store: 'FinalObjectStore',

    requires: [
        'Ext.grid.column.Date',
        'Ext.grid.column.Action'
    ],

    selModel: {
        selType: 'checkboxmodel',
        mode: 'SIMPLE',
        headerWidth: 35   // undocumented prop
    },

    columns: [
        {
            xtype: 'actioncolumn',
            text: 'Preview',
            hideable: false,
            icon: 'resources/images/iconPreview.png',
            tooltip: 'Preview',
            align: 'center'
        },
        {
            xtype: 'actioncolumn',
            text: 'QC',
            dataIndex : 'qcSealed',
            renderer: function(value, metaData, record) {
                if(value) {
                    return  '<img src="resources/images/iconQC.png" height="16" width="16">';
                }
            },
            width: 45
        },
        {
            text: 'Final Object ID',
            dataIndex : 'id',
            flex: 1
        },
        {
            text: 'Source Type',
            dataIndex : 'sourcetype',
            flex: 1
        },
        {
            text: 'Language',
            dataIndex : 'language',
            flex: 1
        },
        {
            text: 'Level',
            dataIndex : 'level',
            flex: 1
        },
        {
            text: 'Last modified by',
            dataIndex : 'lmodusr',
            flex: 1
        },
        {
            text: 'Last modified',
            dataIndex : 'lmod',
            xtype: 'datecolumn',
            //format: 'M j, Y, g:i a',
            flex: 1
        }
    ],

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            height: 34,
            style: {
                background: '#e0e5ec'
            },
            padding: '0 5 0 10',
            items: [
                {
                    text: 'Email',
                    action: 'email',
                    icon: 'resources/images/iconEmail.png'
                },
                {
                    text: 'QC',
                    action: 'qc',
                    icon: 'resources/images/iconQC.png',
                    padding: '0 13 0 4'
                },
                {
                    text: 'Lock',
                    action: 'lock',
                    icon: 'resources/images/iconLock.png'
                },
                '->',
                {
                    text: 'Add Final Object',
                    action: 'addfinalobject',
                    padding: '3 10 3 10',
                    margin: 3,
                    border: 1,
                    style: {
                        background: '#ffcc33',
                        borderColor: '#336699'
                    }
                }
            ]
        }
    ]
});

