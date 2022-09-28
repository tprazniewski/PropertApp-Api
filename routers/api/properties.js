const express = require('express');
const router = express.Router();
const connection = require('../../db/mySql')

console.log("elo")
router.get('/wojewodztwa', async (req, res) =>{
    try {
        sqlQuery="SELECT nazwa_wojewodztwa FROM `dbo.wojewodztwa` "
        const rows = await connection.query(sqlQuery);
        console.log(rows)
        res.status(200).json(rows).end();

    }catch (error) {
        res.status(400).send(error.message)
      }
})
// SELECT * FROM mieszkania.miejscowosci where wojewodztwo= 'kujawsko-pomorskie';
router.get('/wojewodztwa/:id/', async (req, res) => {
    console.log("wejszlo")
    console.log(req.params)
    try { 
      const sqlQuery = "SELECT DISTINCT(powiat) FROM `miejscowosci` where wojewodztwo = ?";
      const rows = await connection.query(sqlQuery, [req.params.id]);
      res.status(200).json(rows).end();
      
    } catch (error) {
      res.status(400).send(error.message)
    }
})
router.get('/wojewodztwa/:wojewodztwo/:powiat/', async (req, res) => {

    console.log(req.params)
    try { 
      const sqlQuery = "SELECT DISTINCT(gmina) FROM `miejscowosci` where wojewodztwo = ? and powiat= ?";
      const rows = await connection.query(sqlQuery, [req.params.wojewodztwo, req.params.powiat]);
      res.status(200).json(rows).end();
      
    } catch (error) {
      res.status(400).send(error.message)
    }
})
router.get('/wojewodztwa/:wojewodztwo/:powiat/:gmina', async (req, res) => {

    console.log(req.params)
    try { 
      const sqlQuery = "SELECT DISTINCT(nazwa) FROM `miejscowosci` where wojewodztwo = ? and powiat= ? and gmina= ?";
      const rows = await connection.query(sqlQuery, [req.params.wojewodztwo, req.params.powiat, req.params.gmina]);
      res.status(200).json(rows).end();
      
    } catch (error) {
      res.status(400).send(error.message)
    }
})
router.get('/wojewodztwa/:wojewodztwo/:powiat/:gmina/:miasto', async (req, res) => {
    // select nazwa_oferty, cena, metraz  from `otodom.mieszkania` where wojewodztwo = 'śląskie' and miejscowosc ='Wisła'
    console.log(req.params)
    try { 
      const sqlQuery = "SELECT nazwa_oferty,cena,metraz,data_wpisu FROM `otodom.mieszkania` where wojewodztwo = ? and miejscowosc = ? UNION SELECT nazwa_oferty,cena,metraz,data_wpisu FROM `olx.mieszkania` where wojewodztwo = ? and miejscowosc = ? UNION SELECT nazwa_oferty,cena,metraz,data_wpisu FROM `allegro.mieszkania` where wojewodztwo = ? and miejscowosc = ?" ;
      const rows = await connection.query(sqlQuery, [req.params.wojewodztwo, req.params.miasto, req.params.wojewodztwo, req.params.miasto, req.params.wojewodztwo, req.params.miasto]);
      res.status(200).json(rows).end();
      
    } catch (error) {
      res.status(400).send(error.message)
    }
})

module.exports = router;
