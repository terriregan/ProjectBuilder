Ext.define('ProjBldr.view.ContentContainer', {
    extend: 'Ext.container.Container',
    xtype: 'contentContainer',
    id: 'content-container',
    header: false,
    border: false,

    autoScroll: true,
    padding: 25,

    defaults: {
        border: false
    },

    items: [
        // PAGE TITLE
        {
            xtype : 'component',
            itemId: 'content-title',
            cls: 'page-title',
            margin: '0 0 8 0'
        },
        // CONTENT AREA - views are added to this container at runtime when needed
        {
            xtype : 'container',
            itemId: 'content-panel'
        }
    ]
});

