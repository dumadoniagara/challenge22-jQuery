var express = require('express');
var router = express.Router();
var moment = require('moment');
const objectId = require('mongodb').ObjectId;


/* GET home page. */
module.exports = (db, coll) => {
  router.get('/', function (req, res, next) {
    const page = parseInt(req.query.page) || 1;
    const { id, string, integer, float, startDate, endDate, boolean, cId, cString, cFloat, cInteger, cDate, cBoolean } = req.query;
    let query = new Object();
    const reg = new RegExp(string);

    if (cId && id) {
      query._id = id;
    }
    if (cString && string) {
      query.string = reg;
    }
    if (cInteger && integer) {
      query.integer = parseInt(integer);
    }
    if (cFloat && float) {
      query.float = parseFloat(float);
    }
    if (cBoolean && boolean) {
      query.boolean = JSON.parse(bool);
    }
    if (cDate && startDate && endDate) {
      query.date = { $gte: startDate, $lte: endDate }
    }
    const limit = 3;
    const offset = (page - 1) * limit;

    db.collection(coll).find(query).count()
      .then((total) => {
        const pages = Math.ceil(total / limit)

        db.collection(coll).find(query).limit(limit).skip(offset).toArray()
          .then((result) => {
            res.status(200).json({
              moment,
              result,
              page,
              pages
            })
          })
          .catch((err) => {
            res.status(500).json({
              error: true,
              message: err
            })
          })
      })
      .catch((err) => {
        res.status(500).json({
          error: true,
          message: err
        });
      });
  });

  // // Add
  // router.get('/add', (req, res) => {
  //   res.status(200).render('add');
  // })

  // router.post('/add', (req, res) => {
  //   const add = { "string": req.body.stringdata, "integer": parseInt(req.body.integerdata), "float": parseFloat(req.body.floatdata), "date": req.body.datedata, "boolean": JSON.parse(req.body.booleandata) }

  //   db.collection(coll).insertOne(add)
  //     .then(() => res.redirect('/'))
  //     .catch(err =>
  //       res.status(500).json({
  //         error: true,
  //         message: err
  //       }))
  // });

  // // Delete
  // router.get('/delete/:id', (req, res) => {
  //   const id = req.params.id;
  //   db.collection(coll).deleteOne({ _id: objectId(id) })
  //     .then(() => res.redirect('/'))
  //     .catch((err) => {
  //       res.status(500).json({
  //         error: true,
  //         message: err
  //       })
  //     })
  // });


  // // Edit
  // router.get('/edit/:id', (req, res) => {
  //   const id = req.params.id;
  //   db.collection(coll).findOne({ _id: objectId(id) })
  //     .then((result) => {
  //       res.render('edit', { row: result });
  //     })
  //     .catch((err) => {
  //       res.status(500).json({
  //         error: true,
  //         message: err
  //       })
  //     })
  // })

  // router.post('/edit/:id', (req, res) => {
  //   const id = req.params.id;

  //   db.collection(coll).updateOne(
  //     { _id: objectId(id) },
  //     {
  //       $set: {
  //         string: req.body.string,
  //         integer: parseInt(req.body.integer),
  //         float: parseFloat(req.body.float),
  //         date: req.body.date,
  //         boolean: JSON.parse(req.body.boolean)
  //       }
  //     })
  //     .then(() => res.redirect('/'))
  //     .catch((err) => {
  //       res.status(500).json({
  //         error: true,
  //         message: err
  //       })
  //     })
  // })
  return router;
}

