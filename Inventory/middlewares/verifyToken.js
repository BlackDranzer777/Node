exports.verifyToken = (req,res,next) => {
    const bearerHeader = req.headers['authorization'];
    console.log("bearerHeader ===> ", bearerHeader);
    if(typeof bearerHeader !== 'undefined')
    {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        req.pappu = "dsdssd"
        next();
    }
    else
    {
        res.sendStatus(403);
    }
}

