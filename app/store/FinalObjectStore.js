Ext.define('ProjBldr.store.FinalObjectStore', {
    extend: 'Ext.data.Store',

    requires: [
        'ProjBldr.model.FinalObject'
    ],

    autoLoad: false,
    storeId: 'FinalObjectStore',
    model: 'ProjBldr.model.FinalObject'
});