import User from "../model/user.js";

const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  } 

async function searchUser(req, res) {
    try {
        if (typeof req.session != "undefined") {
            let search = req.body.search;
            let users = await User.find().sort({name: 1});
            let sendUsers = []      
            for(let i = 0; i < users.length; i++){
                if(search == removeAccents(users[i].name).toLowerCase().match(search) && sendUsers.length <= 3 || search == removeAccents(users[i].name).toUpperCase().match(search) && sendUsers.length <= 3){
                    sendUsers.push([users[i]]);
                }              
            }
            if(sendUsers.length == 0){
                sendUsers = 'No se encontro usuarios'
            }
            res.json({
                sendUsers
            })
        } else {
            res.redirect("/account/login");
        }
    } catch (e) {
        console.log(e);
    }
}
export default searchUser;
