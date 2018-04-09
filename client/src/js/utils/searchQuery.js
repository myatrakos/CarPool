import $ from 'jquery';

$(document).ready(()=>{

     $(document).on("submit","#searchUsers",(event) => {
        event.preventDefault();
        /*alert("Searching");*/
        fetch('/api/account/getUser',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:$("#user-search").val(),
            })
        })
        .then(res=>res.json())
        .catch(error => console.error('Error:', error))
        .then(json=>{

            console.log("json",json);     //should probably remove//
            if (json.length > 0){

              let profilePic; 
              var i;
              var html = "";
              for (i = 0; i < json.length; ++i) {

                profilePic = "./api/account/getImage?filename=" + json[i].profilePic;

                html += "<li className=\"list-group-item\"><div className=\"col-xs-4\">";
                html += "<img src=\"" + profilePic + "\" className=\"img-responsive img-circle\" alt=\"Profile Pic\" /> ";
                html += "<span className=\"name\">" + json[i].firstName +" " + json[i].lastName + "</span><br/></div></li>"; 


                /*html += "<li className=\"list-group-item\"><div className=\"col-xs-4\">";
                html += "<img src=\"" + profilePic + "\" className=\"img-responsive img-circle\" alt=\"Profile Pic\" /></div>";
                html += "<div className=\"col-sx-8\"><span className=\"name\">" + json[i].firstName +" " + json[i].lastName + "</span><br/></div></li>";*/
              }

              $('#user-list').html(html);
            }else{
              $('#user-list').html("");
            }
        });

      /*fetch('/api/account/getUser?name='+ $("#user-search").val())
       .then(res => res.json())
       .then(json => {
            $('#user-list').append("Hello World");
       });*/
    });
});

