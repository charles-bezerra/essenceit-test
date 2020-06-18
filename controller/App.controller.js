function getComments() {
    let data = localStorage.getItem('comments');
    if (!data) 
        data = "[]";
    return JSON.parse(data);
}


function getLastID() {
    let id = localStorage.getItem('lastID');
    if (!id)
        id = 0;
    return JSON.parse(id);
}


function createComment(comment) {
    let comments = getComments();
    let id = getLastID();

    id++;

    comments.push({id: id, comment: comment});
    localStorage.setItem("comments", JSON.stringify(comments) );
    localStorage.setItem("lastID", id);
}


function BinarySearchID(array, element) {
    function search(left, right) {        
        if (left > right)
            return null; 

        else {
            const middle = left + parseInt( (right-left)/2 );

            if (element===array[middle].id)
                return middle;
            else if (element>array[middle].id)
                return search(middle+1, right);
            else
                return search(left, middle-1);
        }
    }
    return search(0, array.length-1);
}


function deleteComment(id) {
    let comments = getComments();
    let index = BinarySearchID(comments, id);    

    if (index !== null) {        
        comments.splice(index, 1);
        localStorage.setItem("comments", JSON.stringify(comments));
    } 
    else {
        alert("Comentário não existe!");
    }
}


function AppController(Controller, JSONModel) {
    'use strict';    

    return Controller.extend("commentshub.controller.App", {
        onInit: function () {
            this.update();
        },

        addComment: function () {
            createComment("Novo comentário!");
            this.update();
        },

        rmComment: function () {
            deleteComment(2);
            this.update();
        },

        update: function () {            
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