// home controller for starting the project
module.exports.home = function(req,res){
    // return res.end('<h1>Hii you are good to go</h1>');
    return res.render('home',{
        title : "Home Page"
    })
}