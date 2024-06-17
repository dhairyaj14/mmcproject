const accountDAO = require ('../dao/account');
class accountService {
    createAccount(accountDto){
        const {name,address,phone,isVerified,geopoints}= accountDto;
        return accountDAO.createAccount(name,address,phone,isVerified,geopoints);
    }
}
module.exports = new accountService(); 