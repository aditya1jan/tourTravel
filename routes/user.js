module.exports.signup = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var username = req.body.username;
        var email = req.body.email;
        var number = req.body.number;
        var password = req.body.password;
        var otp = Math.floor(Math.random() * Math.pow(10, 4)).toString().padStart(4, "0");
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Insert');
        request.input('userName',db.NVarChar,username);
        request.input('email',db.NVarChar,email);
        request.input('number',db.NVarChar,number);
        request.input('password',db.NVarChar,password);
        request.input('otp',db.NVarChar,otp);
        request.execute('prcUsers',(error,result) => {
            if(error)
            {
                console.log(error)
                res.send({
                    "status":"0",
                    "message":"error Occured"
                })
            }
            else if(result==null)
            {
                res.send({
                    "status":"0",
                    "message":"error Occured"
                })
            }
            else
            {
                res.send({
                    "status":"1",
                    "message":"Otp For Registration send to your Mobile",otp
                })
            }
        });
    });
};

module.exports.login = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var value = req.body.username;
        var password = req.body.password;
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Login');
        request.input('value',db.NVarChar,value);
        request.input('password',db.NVarChar,password);
        request.execute('prcUsers',(error,result) => {
            if(error)
            {
                res.send({
                    "status":"0",
                    "message":"error Occured",
                    "data":{}
                })
            }
            else if(result==null)
            {
                res.send({
                    "status":"0",
                    "message":"error Occured",
                    "data":{}
                })
            }
            else
            {
                res.send({
                    "status":"1",
                    "message":"User login successfully",
                    "data":result.recordset[0]
                })
            }
        });
    });
};


module.exports.forgetPassword = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var number = req.body.number;
        var password = req.body.password;
        var otp = Math.floor(Math.random() * Math.pow(10, 4)).toString().padStart(4, "0");
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'UpdatePassword');
        request.input('number',db.NVarChar,number);
        request.input('password',db.NVarChar,password);
        request.input('otp',db.NVarChar,otp);
        request.execute('prcUsers',(error,result) => {
            if(error)
            {
                res.send({
                    "status":"0",
                    "message":"error Occured"
                })
            }
            else if(result==null)
            {
                res.send({
                    "status":"0",
                    "message":"error Occured"
                })
            }
            else
            {
                res.send({
                    "status":"1",
                    "message":"Otp For Password change send to your Mobile",otp
                })
            }
        });
    });
};

module.exports.otpAuth = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var type = req.body.type;
        var otp = req.body.otp;
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'OtpAuth');
        request.input('otp',db.NVarChar,otp);
        request.execute('prcUsers',(error,result) => {
            if(error)
            {
                res.send({
                    "status":"0",
                    "message":"error Occured",
                    "data":{}
                })
            }
            else if(result==null)
            {
                res.send({
                    "status":"0",
                    "message":"error Occured",
                    "data":{}
                })
            }
            else
            {
                if(type=='register')
                {
                    res.send({
                        "status":"1",
                        "message":"User registered successfully",
                        "data":result.recordset[0]
                    })
                }
                else if(type=='forget')
                {
                    res.send({
                        "status":"1",
                        "message":"User password change successfully",
                        "data":{}
                    })
                }
            }
        });
    });
};

module.exports.resendOtp = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var number = req.body.number;
        var otp = Math.floor(Math.random() * Math.pow(10, 4)).toString().padStart(4, "0");
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'ResendOtp');
        request.input('number',db.NVarChar,number);
        request.input('otp',db.NVarChar,otp);
        request.execute('prcUsers',(error,result) => {
            if(error)
            {
                res.send({
                    "status":"0",
                    "message":"error Occured"
                })
            }
            else if(result==null)
            {
                res.send({
                    "status":"0",
                    "message":"error Occured"
                })
            }
            else
            {
                res.send({
                    "status":"1",
                    "message":"New otp send to your Mobile",otp
                })
            }
        });
    });
};
