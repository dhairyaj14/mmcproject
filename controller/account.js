const db = require ('../db/db');
const accountService = require ('../service/account')

class accountController {
async createAccount(req,res) {
  try 
  {
    const id = await accountService.createAccount(req.body);
  res.status(201).json(id);}
  catch (err){
  console.error(err);
}

}
}
module.exports = new accountController(); 
