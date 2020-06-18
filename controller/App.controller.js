function createComment(comment) {
    let data = localStorage.getItem('comments');
    let id = localStorage.getItem('lastID');
    
    if (data && id) {
        data = JSON.parse(data);
        id = JSON.parse(id);                  
    } else {
        id = 0;
        data = [];
    }

    id++;

    data.push({id: id, comment: comment});
    localStorage.setItem("comments", JSON.stringify(data) );
    localStorage.setItem("lastID", id);
}


function getComments() {
    let data = localStorage.getItem('comments');
    if (!data) 
        data = "[]";
    return JSON.parse(data);
}


function deleteComment(id) {
    
}


function AppController(Controller, JSONModel) {
    'use strict';    

    return Controller.extend("commentshub.controller.App", {
        data: [],

        onInit: function () {
            this.update();
        },

        addComment: function () {
            createComment("Novo comentário!");
            this.update();
        },

        rmComment: function (id) {
            deleteComment(id);
            this.update();
        },

        update: function () {
            this.data = getComments();

            let oData = new JSONModel({
                page: { name: "CommentsHub" },   
                comments: getComments()
            }); 

            this.getView().setModel(oData);
        }
    });
}



sap.ui.define(
    ['sap/ui/core/mvc/Controller', 'sap/ui/model/json/JSONModel'], 
    AppController
);