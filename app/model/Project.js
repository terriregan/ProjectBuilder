Ext.define('ProjBldr.model.Project', {
    extend: 'Ext.data.Model',

    qcList : null,

    statics : {
        project : null,
        setCurrent : function(project) {
            this.project = project;
        },

        getCurrent : function() {
            return this.project;
        }
    },

    proxy : {
        type : 'ajax',
        url : '/apis/learnobj/projects.json',
        reader : {
            type : 'json',
            root : 'projectlist.project'
        }
    },

    fields: [
        {
            name: 'id',
            type: 'string'
        },
        {
            name: 'name',
            type: 'string'
        },
        {
            name: 'product',
            type: 'string'
        },
        {
            name: 'cycle',
            type: 'string'
        },
        {
            name: 'year'
        },
        {
            name: 'uri'
        }
    ],

    getFinalObjectListUrl: function() {
        return '/apis/learnobj' + this.get('uri') + '.json?FOList=1';
    },

    getFinalObjectReviewUrl: function() {
       return '/apis/learnobj/Project/' + this.get('id') + '/Published/InReview';
    },

    getFinalObjectQCListUrl: function() {
        return '/apis/learnobj/Project/' + this.get('id') + '/Published/QcSealed';
    },

    setQcList : function(qcList) {
        this.qcList = qcList;
    },

    getQcList : function() {
        return this.qcList;
    }
});
