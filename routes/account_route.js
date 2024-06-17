const express = require('express');
// const knex = require('knex');
const accountController = require('../controller/account');
const {db} = require('../config/knex');

const router = express.Router();
router.post('/account',accountController.createAccount);

router.get('/account',async (req, res) => {
    const data = await db('accounts').select('*');
    console.log(data);
    res.status(201).json(data);}
  );

  router.put('/account/:id', async (req, res) => {
    const { id } = req.params;
    const {name,address,phone,isVerified,geopoints} = req.body;
  
    try {
      const updated = await db('accounts')
        .where({ id })
        .update({name,address,phone,isVerified,geopoints});
  
      if (updated === 0) {
        return res.status(404).json({ error: 'Account not found' });
      }
  
      res.json({ success: true, message: 'Account updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.delete('/account/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deleted = await db('accounts').where({ id }).del();
  
      if (deleted === 0) {
        return res.status(404).json({ error: 'Account not found' });
      }
  
      res.json({ success: true, message: 'Account deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
 //bulk upsert
  router.put('/account/bulk-upsert', async (req, res) => {
    const {accounts} = req.body;
  
    try {
      const upsert = accounts.map((account) => {
        return db('accounts')
          .insert(account)
          .onConflict('id') 
          .merge();
      });
  
      await db.transaction(async (trx) => {
        await Promise.all(upsert.map((query) => query.transacting(trx)));
      });
  
      res.json({
        success: true,
        message: `${accounts.length} accounts upserted successfully`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



module.exports = router;   