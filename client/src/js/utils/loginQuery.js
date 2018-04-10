import $ from 'jquery';
import { 
  setInStorage, 
  getFromStorage
  } from './localStorage.js'

$(document).ready(()=>{

    $(document).on("submit","#signUpSubmit",(event)=>{
        event.preventDefault();
        fetch('/api/account/signup',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                firstName:$("#signUpfname").val(),
                lastName:$("#signUplname").val(),
                email:$("#signUpemail").val(),
                id:$("#signUpid").val(),
                password:$("#signUppass").val()
            })
        })
        .then(res=>res.json())
        .catch(error => console.error('Error:', error))
        .then(json=>{
            console.log('json',json); //========== Probably remove ===============
            if(json.success){
                alert("Successfully signed up!!");
            }else{
                alert(json.message);
            }
        })
    });

     $(document).on("submit","#signInSubmit",(event)=>{
        event.preventDefault();
        fetch('/api/account/signin',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email:$("#signInemail").val(),
                password:$("#signInpass").val()
            })
        })
        .then(res=>res.json())
        .catch(error => console.error('Error:', error))
        .then(json=>{
            if(json.success)
            {
                console.log('json',json); //========== Probably remove ===============
                setInStorage('sessionKey',{token:json.token});
                window.location.reload();
            }else{
                alert(json.message);
            }
            console.log('json',json); //========== Probably remove ===============
            setInStorage('sessionKey',{token:json.token});
            window.location.reload();
        }) 
    });

    $(document).on("click","#logOutSubmit",()=>{

        const obj = getFromStorage('sessionKey');
        if(obj && obj.token){
          //verify token
          const { token } = obj;
          fetch('/api/account/logout?token='+token)
           .then(res => res.json())
           .then(json => {
                console.log('json',json); //========== Probably remove ===============
                window.location.reload();
           });
        }

    });

});

