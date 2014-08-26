Ext.define('ProjBldr.model.FinalObject', {
    extend: 'Ext.data.Model',

    statics : {
        finalObject : null,
        setCurrent : function(finalObject) {
            this.finalObject = finalObject;
        },

        getCurrent : function() {
            return this.finalObject;
        }
    },

    proxy : {
        type : 'ajax',
        reader : {
            type : 'json',
            root : 'project.finalobjects.finalobj'
        }
    },

    fields: [
        {
            name: 'id',
            type: 'string'
        },
        {
            name: 'uri',
            type: 'string'
        },
        {
            name: 'title',
            type: 'string'
        },
        {
            name: 'sourcetype',
            type: 'string'
        },
        {
            name: 'language'
        },
        {
            name: 'level'
        },
        {
            name: 'lmod'
        },
        {
            name: 'lmodusr'
        },
        {
            name: 'qcSealed',
            type: 'boolean',
            convert: function(v, record) { // screwy workaround, field should be added to backend data
                if(!v){
                    var project = ProjBldr.model.Project.getCurrent();
                    var qcList = project.getQcList();

                    if(qcList && qcList.indexOf(record.get('id')) != -1 ){
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return v;
                }
            }
        }
    ]

});
