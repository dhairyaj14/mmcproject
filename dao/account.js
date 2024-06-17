const db = require('../db/db');

class accountDAO { 
  async createAccount(name,address,phone,isVerified,geopoints){
  const[id]= await db('accounts').insert ({name: name , address: address ,phone:phone, isVerified:isVerified , geopoints: geopoints}).returning('id');
  return id;
}
 

}
module.exports = new accountDAO();