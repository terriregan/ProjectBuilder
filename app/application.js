Ext.define('ProjBldr.Application', {
    name: 'ProjBldr',

    extend: 'Ext.app.Application',

    controllers: [
       'Main',
       'Project'
    ],

    stores: [
      'ProjectStore',
      'FinalObjectStore'
    ]
});
