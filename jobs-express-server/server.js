const express = require('express')
const path = require('path');
const jobsDBOps = require('./db')
const bodyParser = require('body-parser')
const app = express()

app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.use(express.static(path.join(__dirname, 'client')));

app.delete('/delete/:id',(req,res) => {
	jobsDBOps.deleteJob(req.params.id, (output) => {
		res.send(JSON.stringify(output))
	})
})
app.get('/load/jobs',(req,res)=> {
	jobsDBOps.loadJobs((jobs) => {
		let output = {
			jobs
		}
		res.send(JSON.stringify(output))
	})
})
app.post('/addjob',(req,res)=> {
	jobsDBOps.addJob(req.body.title,req.body.location,req.body.description,(output) => {
		res.send(JSON.stringify(output))
	})
})

app.listen(3001,() => {
	console.log("Server running on 3001");
})
