// Need to use shared Btk store
Ext.define('ProjBldr.store.ProjectStore', {
    extend: 'Ext.data.Store',

    requires: [
        'ProjBldr.model.Project'
    ],

    autoLoad: true,        // should change to false
    storeId: 'ProjectStore',
    model: 'ProjBldr.model.Project'
});