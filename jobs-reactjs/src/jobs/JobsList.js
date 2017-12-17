import React,{Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import JobsItem from './JobsItem'

class JobsList extends Component{

	
	componentDidMount(){
		this.props.loadJobs()
		
	}
	populateJobs(){
		let {jobs} = this.props
		let jobListItems = []
		jobs.forEach(job => {
			let item = <JobsItem key={`jobitem_ ${job.id}`} job={job}/>
			jobListItems.push(item)	
		})
		return jobListItems
	}
	
	render(){
		return (<div style={{display: this.props.addJobShown ? "none":"block"}}>
				<h2>Jobs List</h2>
				{
					this.props.jobs.length === 0 ?
					`No jobs found` : 
					(<ul className='joblist'>
						{this.populateJobs()}	
					</ul>)
				}
	  
				
				
		</div>)
	}
}

const mapStateToProps = (state) => {
	return {
		jobs: state.jobs,
		addJobShown: state.addJobShown
	}
}
const mapDispatchToProps = dispatch => {
	const request = axios.get('/load/jobs')
	request.then(response => {
		let payload = response.data
		dispatch({
			type: "LOAD_JOBS_SUCCESS", payload
		})
	})
	request.catch(error => {
		dispatch({
			type: "LOAD_JOBS_ERROR", error: error
		})
	})
	return {
		loadJobs: () => request
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(JobsList);