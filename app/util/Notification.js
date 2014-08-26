Ext.define("ProjBldr.util.Notification", {

    requires: [
        'Ext.window.MessageBox'
    ],

    statics : {
        showMessage: function(title, message) {
            Ext.MessageBox.show({
                title: title,
                msg: message,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });
        }
    }
});

