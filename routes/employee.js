const express = require("express");
const Router = express.Router();
const bodyParser = require('body-parser');
const mysqlConnection = require("../database");

Router.use(bodyParser.json());
//get method to fetch all employees URL http://localhost:3000/employees
Router.get('/', (req, res, next) => {
    var sql = 'select t1.* , t2.deptName  from employees as t1 ' + 
                ' INNER JOIN departments as t2 ON t1.fk_deptId = t2.deptId; ';
    mysqlConnection.query(sql, (err, rows, fields) => {
    if (err) {
        res.status(500).send({ error: 'Something failed!' })
        }
        res.send(rows)
    })
})

/*get method for fetch single employee URL: http://localhost:3000/employees/2*/
Router.get('/:id', (req, res, next) => {
    var id = req.params.id;
    //console.log(id)
   
    mysqlConnection.query('select t1.* , t2.deptName  from employees as t1  INNER JOIN departments as t2 ' + 
                            ' ON t1.fk_deptId = t2.deptId where empId= ?;', id, (err, row, fields) => {
        if(err){
            res.status(500).send({error: 'Something failed'})
        } else {
            res.json(row[0])
        }
    })
});

// POST method to add employee URL:http://localhost:3000/employees/create
Router.post('/create', (req, res, next) => {
    var fk_deptId = req.body.fk_deptId;
    var empName = req.body.empName;
    var mailId = req.body.mailId;
    var DOJ = req.body.DOJ;
    var sql = `INSERT INTO employees (fk_deptId, empName, mailId, DOJ) VALUES ("${fk_deptId}", "${empName}", "${mailId}", "${DOJ}")`;
    mysqlConnection.query(sql, (err, results) => {
      if(err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      return res.send({ error: false, data: results, message: 'New employee has been created successfully.' });
    })
});

//PUT method for update employee URL: http://localhost:3000/employees/edit/4
Router.put('/edit/:id', (req, res, next) => {
    var empId = req.params.id;
    var fk_deptId = req.body.fk_deptId;
    var empName = req.body.empName;
    var mailId = req.body.mailId;
    var DOJ = req.body.DOJ;
    
    mysqlConnection.query('UPDATE `employees` SET `fk_deptId` = ?, `empName` = ?, `mailId` = ?, `DOJ` = ? where `empId` = ? ', [fk_deptId,empName,mailId,DOJ,empId], (err, results) => {
      if(err) {
        res.status(500).send(err)
        console.log(err)
      } else{
        return res.send({ error: false, data: results, message: 'employee has been updated successfully.' });
      }
    })
});

//Delete method for delete emp
Router.delete('/delete/:id', (req, res, next) => {
    var id = req.params.id;
    mysqlConnection.query("delete from employees where empId= ?", [id], (err, results) => {
        if(err){
            res.status(500).send({error: 'Something failed'})
        } else {
            return res.send({ error: false, data: results, message: 'employee has been deleted successfully.' });
        }
    })
});

module.exports = Router;