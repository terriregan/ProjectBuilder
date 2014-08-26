/*
    NOTES:
    Manages project realted tasks
    Updates hash to trigger screen load
 */
Ext.define('ProjBldr.controller.Project', {
    extend: 'Ext.app.Controller',

    requires: [
        'ProjBldr.util.Notification',
        'ProjBldr.view.windows.EmailWindow'
    ],

    views: [
        'ProjBldr.view.project.OpenProject',
        'ProjBldr.view.project.ManageProject'
    ],

    refs: [
        {
            ref: 'foGrid',
            selector: 'manageproject #finalobjectgrid'
        },
        {
            ref: 'projectTitle',
            selector: 'manageproject #page-project'
        }
    ],

    init: function() {
        this.listen({
            component: {
                'openproject #projectgrid': {
                    itemclick: 'onItemClick'
                },

                'openproject button[action=addproject]' : {
                    click: 'onAddProjectButtonClicked'
                },

                'manageproject #finalobjectgrid': {
                   afterrender: 'onFinalObjectGridRender',
                   cellclick: 'onCellClicked'
                },

               'manageproject button[action=addfinalobject]' : {
                    click: 'onAddFOButtonClicked'
               },

                'manageproject button[action=email]' : {
                    click: 'onEmailButtonClicked'
                },

                'manageproject button[action=qc]' : {
                    click: 'onQCButtonClicked'
                },

                'manageproject button[action=lock]' : {
                    click: 'onLockButtonClicked'
                }
            }
        });
    },

    // ----------------------------------------------
    // EVENT HANDLERS
    // ----------------------------------------------

    // Trigger project view
    onItemClick: function(view, record, item) {
        ProjBldr.model.Project.setCurrent(record);
        window.location.hash = 'manageproject';
    },

    // Update UI with project info and 
    // load final objects associated with a project.
    onFinalObjectGridRender: function(grid) {
       var record = ProjBldr.model.Project.getCurrent();
       if(record) {
           this.updateProjectTitle(record);
           this.loadProjectQcList(record, grid);
       }
    },

    // TODO
    onAddProjectButtonClicked: function() {
        ProjBldr.util.Notification.showMessage('ADD', 'Add new project - [not complete]');
    },

    // TODO
    onAddFOButtonClicked: function() {
        ProjBldr.util.Notification.showMessage('ADD', 'Add new final object - [not complete]');
    },

    onEmailButtonClicked: function() {
        if(this.isItemSelected(this.getFoGrid())) {
            this.sendEmail();
        }
    },

    // Add quality assurance badge to an object
    onQCButtonClicked: function() {
        if(this.isSingleItemSelected(this.getFoGrid())) {
            var project = ProjBldr.model.Project.getCurrent();
            var records = this.getFoGrid().getSelectionModel().getSelection(),
                len = records.length,
                fos = [];

            for( var i = 0; i < len; i++ ){
                fos.push(project.getFinalObjectReviewUrl() + '/' + records[i].get('id'));
            }
            this.addQcSeal(fos);
        }
    },

    // TODO
    onLockButtonClicked: function() {
        if(this.isItemSelected(this.getFoGrid())) {
            ProjBldr.util.Notification.showMessage('LOCK', 'Add lock object(s) - [not complete]');
        }
    },

    // Either load review module or project UI
    onCellClicked: function(view, td, cellIndex, record) {
        ProjBldr.model.FinalObject.setCurrent(record);

        if(cellIndex == 1 ) { // preview button
            this.loadReviewModule(record);
        } else if(cellIndex == 2 && record.get('qcSealed')) { // qcSealed button
            this.loadUI('QcSealed');
        }
    },


    // ----------------------------------------------
    // UI METHODS
    // ----------------------------------------------

    updateProjectTitle: function(record) {
        var projView = this.getProjectTitle();
        projView.update('Project : ' + record.get('id'));
    },

    updateFinalObjectGridview: function() {
        var records = this.getFoGrid().getSelectionModel().getSelection();
        Ext.each(records, function(record) {
            // this is not the best as it will update grid even if adding the qc seal fails
            record.set('qcSealed', true);   
        });
    },

    // ----------------------------------------------
    // DATA METHODS
    // ----------------------------------------------

    addQcSeal: function(records) {
        var project = ProjBldr.model.Project.getCurrent();
        Ext.Ajax.request({
            url: project.getFinalObjectQCListUrl(),
            params: {
                finalobj  : records  // this only moves 1 object, server side not processing as an array
            },
            scope: this,

            success: function(response, opts) {
                var json = Ext.decode(response.responseText);
            },

            failure: function(response, opts) {
                if(response.status != 301) {  // api returning 301 status as failed
                    ProjBldr.util.Notification.showMessage('ERROR', 'Unable to add QC seal. Please ensure that this object was first "Previewed" before attempting to apply a QC seal');
                } else {
                    // This should be in success function above with list of records that successfully updated returned
                    // success - show qc seal in grid

                    // still load objects w/o displaying a seal
                    this.updateFinalObjectGridview(records);
                }
            }
        });
    },


    loadProjectQcList: function(record, grid) {
        Ext.Ajax.request({
            url: record.getFinalObjectQCListUrl() + '.json',
            scope: this,

            success: function(response, opts) {
                var json = Ext.decode(response.responseText);
                if(json.qcsealedList)  {
                   record.setQcList(json.qcsealedList.qcsealed)
                }
                this.loadFinalObjects(grid);
            },

            failure: function(response, opts) {
                //ProjBldr.util.Notification.showMessage('ERROR', 'Unable to load QC list');
                this.loadFinalObjects(grid);
            }
        });
    },

    loadFinalObjects: function(grid) {
        var record = ProjBldr.model.Project.getCurrent();
        if(record) {
            var stor = grid.getStore();
            stor.load({
                url : record.getFinalObjectListUrl(),
                callback: function(records, operation, successful) {
                    if(successful) {
                        //console.log('id ' + records[0].get('id'));
                    }
                }
            });
        }
    },

    // Each project has different data requirements and interfaces
    // This api call triggers server to fetch, transform  and save data into
    // project applicable format.  Upon success, the project UI is loaded.
    loadReviewModule: function(record) {
         var project = ProjBldr.model.Project.getCurrent();
         if(!Ext.Ajax.isLoading()) {

             Ext.Ajax.request({
                url: project.getFinalObjectReviewUrl(),
                scope: this,
                params: {
                    product: project.get('product'),
                    finalobj  : [record.get('uri')]
                },

                success: function(response, opts) {
                    this.loadUI('InReview');
                },

                failure: function(response, opts) {
                    ProjBldr.util.Notification.showMessage('ERROR', 'Unable to load preview module.');
                }
            })
         }
    },

    // ----------------------------------------------
    // PREVIEW METHODS
    // ----------------------------------------------

    // Launch project interface
    // Either UI that has been stamped with QC seal or
    // on that is still under review.
    loadUI: function(status) {
        var project = ProjBldr.model.Project.getCurrent();
        var finalObject = ProjBldr.model.FinalObject.getCurrent();
        var page = (status == 'InReview') ? 'preview' : 'preview_qc';
        var url = '/apps/review/' + page + '.php?project=' + project.get('id') + '&loid=' + finalObject.get('id') + '&status=' + status;

        window.open(url, '_blank');
    },

    // ----------------------------------------------
    // EMAIL METHODS
    // ----------------------------------------------

    sendEmail: function() {
        var grid = this.getFoGrid();
        var records = grid.getSelectionModel().getSelection();

        var email = '';
        var subject = encodeURIComponent('NFLC Assignment');
        var body;
        var links = '';
        var url;
        var len = records.length;

        for (var i = 0; i < len; i++) {
            url = this.generateReviewLink(records[i].get('id'));
            // Including the record info above exceeds the character count limit for most PC email clients ??
            links +=  url + '\n';
        }

        body = encodeURIComponent('Please review the following learning objects by clicking on the link(s) below:\n\n' + links);
        window.location = 'mailto:' + email + '?subject=' + subject + '&body=' + body;
    },

    generateReviewLink: function (id) {
        var project = ProjBldr.model.Project.getCurrent();
        var url = '/apps/review/preview.php?project=' + project.get('id') + '&loid=' + id + '&status=InReview';
        return location.protocol +'//' + location.host + url;
    },


    // ----------------------------------------------
    // UTILITY METHODS
    // ----------------------------------------------

    isSingleItemSelected: function(grid) {
        var records = grid.getSelectionModel().getSelection();
        var win = ProjBldr.util.Notification;
        if( records ) {
            if( records.length == 0) {
                win.showMessage('SELECT', 'Select an item.');
                return false;
            } else if(records.length > 1) {
                win.showMessage('SELECT', 'Select only one item.');
                return false;
            } else {
                return true;
            }
        }
    },

    isItemSelected: function(grid) {
        var records = grid.getSelectionModel().getSelection();
        if( records ) {
            if( records.length == 0) {
                ProjBldr.util.Notification.showMessage('SELECT', 'Select an item.');
                return false;
            } else {
                return true;
            }
        }
    }

});
