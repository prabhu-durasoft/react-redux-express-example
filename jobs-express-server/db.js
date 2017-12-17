const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(':memory:')
const Utils = require('./utils')

class JobsDBOps {
	constructor() {
		  this.jobs = []
			
		  db.serialize(() => {
			  let create_sql = 'CREATE TABLE jobs(id integer PRIMARY KEY, title text, location text, description text, created_at datetime)'
			  db.run(create_sql)
			  let initialJobs = [
				  { title: "UX Designer",location: "Austin, TX",description: "Looking for a kick-ass UX designer",created_at: new Date()},
				  { title: "UI Developer",location: "SF, CA",description: "Looking for a kick-ass UI developer",created_at: new Date().setDate(11)},
				  { title: "Full Stack Developer",location: "Earth",description: "RoR, React, Redux, Docker",created_at: new Date().setDate(10)},
				  { title: "Java Architect",location: "Remote",description: "Java 8 architect",created_at: new Date().setDate(8)},
				  { title: "Scala Developer",location: "London, UK",description: "Experienced Scala Developer",created_at: new Date().setDate(6)}
			  ]
			  let insert_sql = 'INSERT INTO jobs(title,location,description,created_at) VALUES(?,?,?,?)'
			  initialJobs.forEach(job => {
				  db.run(insert_sql,[job.title,job.location,job.description,job.created_at])
			  })
		  })
		  //db.close()
	}
	deleteJob(job_id,callback){
		let delete_sql = 'DELETE FROM jobs WHERE ID=?'
		let self = this
		db.run(delete_sql,[job_id],function(err){
			if(err){
				callback({success: false, error: err.message })
			}
			else{
				self.jobs = self.jobs.filter(it => it.id != job_id)
				callback({success: true })
			}
		})
	}
	addJob(title,location,description,callback){
		let insert_sql = 'INSERT INTO jobs(title,location,description,created_at) VALUES(?,?,?,?)'
		let self = this
		let date = new Date()
		db.run(insert_sql,[title,location,description,date],function(err){
			if(err){
				callback({success: false, error: err.message })
			}
			else{
				let rowId = this.lastID
				let formattedDate = Utils.formatDate(date)
				let job = {id:rowId,title,location,description,date: formattedDate}
				self.jobs.push(job)
				callback({success: true, job})
			}
		})
	}
	loadJobs(callback){
		
		if(this.jobs.length == 0){
			let self = this
			db.all("select id,title,location,description,created_at from jobs",(err,rows) => {
				if(!err){
					rows.forEach(row => {
						let formattedDate = Utils.formatDate(row.created_at)
						self.jobs.push({id: row.id, title: row.title, location: row.location, description: row.description, date: formattedDate})	
					})
					callback(self.jobs)
				}
				else{
					console.log(err);
				}
			})
		}
		else{
			callback(this.jobs)
		}
	}
}

module.exports = new JobsDBOps()