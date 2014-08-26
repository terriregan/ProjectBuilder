/**
 * Created with JetBrains PhpStorm.
 * User: tregan
 * Date: 7/29/13
 * Time: 11:51 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ProjBldr.view.windows.EmailWindow', {
    extend: 'Ext.window.Window',
    alias : 'widget.emailwindow',

    requires: [
        'Ext.form.Panel',
    ],

    title: 'Send Links',
    width: 500,
    height:160,
    minWidth: 300,
    minHeight: 120,
    layout: 'fit',
    plain: true,
    buttonAlign: 'center',

    initComponent : function () {

        Ext.QuickTips.init();

        this.buttons = [
            {
                itemId: 'okButton',
                text: 'Ok',
                disabled: false,
                listeners: {
                    click: function () {
                        this.up('emailwindow').close();
                    }
                }
            },
            {
                text: 'Cancel',
                listeners: {
                    click: function () {
                        this.up('emailwindow').hide();
                    }
                }
            }
        ];

        this.form = Ext.create('Ext.form.Panel', {
            border: false,

            fieldDefaults: {
                labelWidth: 140
            },

            defaultType: 'textfield',
            bodyPadding: 15,

            items: [
                {
                    xtype: 'component',
                    margin: '0 0 15 0',
                    html: 'Select which type of link to send to your email application.'
                }
            ]
        });

        this.items = this.form;
        this.callParent();
    }
});
