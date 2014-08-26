/*
    NOTES:
    Manages global navigation and screen loading
    Listens for hashchange event
 */
Ext.define('ProjBldr.controller.Main', {
    extend: 'Ext.app.Controller',

    requires: [
        'ProjBldr.view.Home',
        'ProjBldr.view.Settings',
        'ProjBldr.view.pack.NewPackage',
        'ProjBldr.view.pack.OpenPackage',
        'ProjBldr.view.project.OpenProject',
        'ProjBldr.view.project.NewProject',
        'ProjBldr.view.product.NewProductDesign',
        'ProjBldr.view.product.OpenProductDesign'
    ],

    refs: [
        {
            ref: 'viewport',
            selector: 'viewport'
        },
        {
            ref: 'navigation',
            selector: 'navigation'
        },
        {
            ref: 'contentPanel',
            selector: 'contentContainer #content-panel'
        },
        {
            ref: 'contentTitle',
            selector: 'contentContainer #content-title'
        }
    ],

    init: function() {
        this.listen({
            controller: {
                '*': {
                    hashchange: this.loadScreen
                }
            },
            component: {
                'viewport': {
                    afterrender: 'afterViewportRender'
                },

                'viewport button[action=logout] ': {
                    click: 'onLogOut'
                },

                'navigation': {
                    afterrender: 'afterNavRender'
                },

                'navigation menu ': {
                    click: 'onMenuClick'
                },

                'navigation button[action=home] ': {
                    click: 'onHomeClick'
                },

                'navigation button[action=settings] ': {
                    click: 'onSettingsClick'
                },

                'pageFooter button': {
                    click: 'onPageFooterButtonClicked'
                }
            }
        })
    },

    // load default 'home' screen after viewport is rendered
    afterViewportRender: function() {
       this.loadScreen('home');
       this.activateHashChangeListener();
    },

    // update user after nav render
    afterNavRender: function(nav) {
        nav.down('#loggedinuser').update({username: Bloomer.displayname});
    },

    onLogOut: function(button) {
        top.document.location.replace('/apis/timetrk/user/logout');
    },

    onMenuClick: function(menu, item) {
        window.location.hash = item.action;
    },

    onHomeClick: function(button) {
        window.location.hash = button.action;
        ProjBldr.model.Project.setCurrent(null);
    },

    onSettingsClick: function(button) {
        window.location.hash = button.action;
    },

    // To enable Back and Forward broswer actions,
    // use hash to grab screen to load
    activateHashChangeListener: function() {
        me = this;

        if ("onhashchange" in window) {
            function onHashChange(e) {
                var screen = location.hash.substring(1);
                me.fireEvent('hashchange', screen);
            }
            window.addEventListener('hashchange', onHashChange, false);
        }
    },
 
    // Update UI with current screen.  Remove current screen, 
    // create new component via class prototype, add to dom 
    loadScreen: function(screen) {
        var alias = 'widget.' + screen,
            contentPanel = this.getContentPanel(),
            cmp;

        contentPanel.removeAll(true);

        var className = Ext.ClassManager.getNameByAlias(alias)
        if(className) {
            var ViewClass = Ext.ClassManager.get(className);
            var clsProto = ViewClass.prototype;
            cmp = new ViewClass();

            contentPanel.add(cmp);

            this.getContentTitle().update(clsProto.pageTitle.toUpperCase());
        }
    },

    onPageFooterButtonClicked: function(button) {
        switch( button.action )
        {
            case ('GO_PB_HOME'):
                window.location.hash = 'home';
                break;

            case ('GO_BLOOM_HOME'):
                top.document.location.replace('/index.html');
                break;

            case ('HELP'):
                Ext.MessageBox.alert('Help', 'Help is not complete');
                break;

            case ('SUPPORT'):
                Ext.MessageBox.alert('User Support', 'User Support is not complete');
                break;
        }
    },

});
