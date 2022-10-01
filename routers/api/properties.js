const express = require('express');
const router = express.Router();
const connection = require('../../db/mySql')
CircularJSON = require('circular-json'),


console.log("elo")
router.get('/wojewodztwa', async (req, res) =>{
    try {
          connection.promise().query("SELECT DISTINCT(County) from miejscowosci")
          .then( ([rows,fields]) => {
            console.log(rows);
            res.status(200).json(rows).end();

          })
          .catch(console.log)
          // .then( () => connection.end());

    }catch (error) {
        res.status(400).send(error.message)
      }
})
// SELECT * FROM mieszkania.miejscowosci where wojewodztwo= 'kujawsko-pomorskie';
router.get('/wojewodztwa/:id/', async (req, res) => {
  try {
    connection.promise().query(`SELECT DISTINCT(District) FROM miejscowosci where County = '${req.params.id}'`)
    .then( ([rows,fields]) => {
      console.log(rows);
      res.status(200).json(rows).end();

    })
    .catch(console.log)
    // .then( () => connection.end());

}catch (error) {
  res.status(400).send(error.message)
}
})


router.get('/wojewodztwa/:wojewodztwo/:powiat/', async (req, res) => {
  try {
    connection.promise().query(`SELECT DISTINCT(Municipality) FROM miejscowosci where County ='${req.params.wojewodztwo}' and District='${req.params.powiat}'`)
    .then( ([rows,fields]) => {
      console.log(rows);
      res.status(200).json(rows).end();

    })
    .catch(console.log)
    // .then( () => connection.end());

}catch (error) {
  res.status(400).send(error.message)
}

})


router.get('/wojewodztwa/:wojewodztwo/:powiat/:gmina', async (req, res) => {
  try {
    connection.promise().query(`SELECT DISTINCT(City) FROM miejscowosci where County ='${req.params.wojewodztwo}' and District='${req.params.powiat}' and Municipality='${req.params.gmina}'`)
    .then( ([rows,fields]) => {
      console.log(rows);
      res.status(200).json(rows).end();

    })
    .catch(console.log)
    // .then( () => connection.end());

}catch (error) {
  res.status(400).send(error.message)
}


})

router.get('/wojewodztwa/:wojewodztwo/:powiat/:gmina/:miasto', async (req, res) => {
    try {
      connection.promise().query(`SELECT * FROM mieszkania where wojewodztwo ='${req.params.wojewodztwo}' and miejscowosc = '${req.params.miasto}'`)
      .then( ([rows,fields]) => {
        console.log(rows);
        res.status(200).json(rows).end();

      })
      .catch(console.log)
      // .then( () => connection.end());

  }catch (error) {
    res.status(400).send(error.message)
  }
})

module.exports = router;
