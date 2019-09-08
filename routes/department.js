const express = require("express");
const Router = express.Router();

const mysqlConnection = require("../database");

//get method to fetch all department
Router.get("/", (req, res) => {
    mysqlConnection.query("select * from departments",(err, rows, fields) => {
    if (err) {
        res.status(500).send({ error: 'Something failed!' })
        }
        res.send(rows)
    })
});

/*get method for fetch single department*/
Router.get('/:id', (req, res, next) => {
    var id = req.params.id;
    var sql = "select * from departments where deptId= ?";
    mysqlConnection.query(sql, [id], (err, row, fields) => {
        if(err){
            res.status(500).send({error: 'Something failed'})
        } else {
            res.json(row[0])
        }
    })
});

// Add a department 
Router.post('/create', (req, res) => {
    let deptName = req.body.deptName;
    if (!deptName) {
      return res.status(400).send({ error:true, message: 'Department name is required' });
    }
    mysqlConnection.query("INSERT INTO departments SET ? ", { deptName: deptName }, function (error, results, fields) {
  if (error) throw error;
    return res.send({ error: false, data: results, message: 'New department has been created successfully.' });
    })
});

//PUT method for update department
Router.put('/edit/:id', (req, res, next) => {
    var id = req.params.id;
    var deptName = req.body.deptName;
    
    mysqlConnection.query('UPDATE `departments` SET `deptName` = ? where `deptId` = ? ', [deptName, id], (err, results) => {
      if(err) {
        res.status(500).send(err)
      } else{
        return res.send({ error: false, data: results, message: 'New department has been updated successfully.' });
      }
    })
});

//Delete method for delete dept
Router.delete('/delete/:id', (req, res, next) => {
    var id = req.params.id;
    mysqlConnection.query("delete from departments where deptId= ?", [id], (err, results) => {
        if(err){
            res.status(500).send({error: 'Something failed'})
        } else {
            return res.send({ error: false, data: results, message: 'New department has been deleted successfully.' });
        }
    })
});
module.exports = Router;