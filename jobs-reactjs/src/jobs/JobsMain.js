import React, {Component} from 'react'
import JobsList from './JobsList'
import {connect} from 'react-redux'

import AddJob from './AddJob'
import JobsDetails from './JobsDetails'


class JobsMain extends Component{

	hideAddJobBox(){
		this.props.hideAddJob()
	}
	showAddJobBox(){
		this.props.showAddJob()	
	}
	render(){
		return (<div>
			<h1>My Jobs Dashboard</h1>
			{
				this.props.addJobShown? 
					<a  href="#" onClick={this.hideAddJobBox.bind(this)}>View Job List</a>
				:
					<a  href="#" onClick={this.showAddJobBox.bind(this)}>Add a Job</a>
			}	
			<hr/>
			<AddJob/>
			
			{
				this.props.jobDetailsShown? 
					<div>
						<a  href="#" style={{float:"left"}} onClick={this.hideAddJobBox.bind(this)}>Back to all jobs</a>
					<JobsDetails/>
					</div>
				:
				<JobsList/>
			}
			
		</div>)
	}
	
}

const mapStateToProps = (state) => {
	return {
		addJobShown: state.addJobShown,
		jobDetailsShown: state.jobDetailsShown
	}
}
const mapDispatchToProps = dispatch => {
	return {
		showAddJob: () => {
			dispatch({
				type: "SHOW_ADD_JOB"
			})
		},
		hideAddJob: () => {
			dispatch({
				type: "HIDE_ADD_JOB"
			})
		}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(JobsMain);