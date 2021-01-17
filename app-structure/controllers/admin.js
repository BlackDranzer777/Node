exports.getHello = (req, res, next) => {
    console.log("admin.js says ==> Hello world");
    res.send("Hello World");
};