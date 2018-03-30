var express = require('express');
var router = express.Router();

const User = require('../../models/User.js');
//Sign up

// router.get('/', function(req, res, next) {
//   User.find((err,data)=>{
//     res.json(data);
//   });
// });

router.post('/',(req,res,next)=>{
	const { body } = req;
	const{
		firstName,
		lastName,
		id,
		password
	} = body;
	let { email } = body;

	//error check data
	//====== Use return res.send to stop if err occurs
	if(!firstName){
		return res.send({ 
			success:false,
			message:"Error:Firstname cannot be blank!"
		});
	}
	if(!lastName){
		return res.send({ 
			success:false,
			message:"Error: Last Name cannot be blank!"
		});
	}
	if(!email){
		return res.send({ 
			success:false,
			message:"Error: Email cannot be blank!"
		});
	}
	if(!id){
		return res.send({ 
			success:false,
			message:"Error: ID cannot be blank!"
		});
	}
	if(!password){
		return res.send({ 
			success:false,
			message:"Error: Password cannot be blank!"
		});
	}

	email = email.toLowerCase();
	//check id
	User.find({
		id:id
	},(err,previousUsers) =>{
		//verify
		if(err){
			return res.send({
				success:false,
				message:"Error:Server error"
			});
		}
		else if(previousUsers.length>0){
			return res.send({
				success:false,
				message:"Error:Account already exists"
			});
		}
	});
	//check email
	User.find({
		email:email
	},(err,previousUsers) =>{
		//verify
		if(err){
			return res.send({
				success:false,
				message:"Error:Server error"
			});
		}
		else if(previousUsers.length>0){
			return res.send({
				success:false,
				message:"Error: Email already exists"
			});
		}
		else{
			//save user
			const newUser = new User();
			newUser.firstName = firstName;
			newUser.lastName = lastName;
			newUser.email = email;
			newUser.id = id;
			newUser.password = newUser.generateHash(password);
			newUser.save((err,user)=>{
				if(err){
					return res.send({
						success:false,
						message:"Error: Sever eror"
					});
				}
				return res.send({
					success:true,
					message:"Signed up"
				});
			});
		}
	});

	

});

module.exports = router;
