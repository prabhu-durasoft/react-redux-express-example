import React,{Component} from 'react'
import {connect} from 'react-redux'
import Modal from 'react-modal'
import axios from 'axios'

const customStyles = {
  content : {
    top                   : '30%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
class JobsItem extends Component{
	constructor(props){
		super(props)
		this.state = {
			modalIsOpen: false,
			jobToDelete: ""
		}
	}
	openModal(job,e){
		e.stopPropagation()
		this.setState({ modalIsOpen: true, jobToDelete: job});
	}
	closeModal(arg,e) {
		e.stopPropagation()
		if(arg === 'yes'){
			this.props.deleteJobPosting(this.state.jobToDelete.id)
		}
		else{
			this.setState({modalIsOpen: false, jobToDelete: ""});
			this.props.closeModal()
		}
	}
	showDetails(jobId,e){
		
		this.props.showJobDetails(jobId)
	}
	render(){
		let {job} = this.props
		return (<li key={job.id} onClick={this.showDetails.bind(this,job.id)}>
					<section className="jobitem">
						<span className="title">{job.title}</span>
						<span className="location">{job.location}</span>
						<button className="joblistbuttons" type="button" onClick={this.openModal.bind(this,job)}>Delete</button>
						<span className="date">{job.date}</span>
					</section>
  <Modal
            isOpen={this.state.modalIsOpen}
            style={customStyles}
            contentLabel="Delete Job Posting">
            <h3>Do you want to delete {this.state.jobToDelete.title}</h3>
			<div style={{textAlign:"center"}}>
				<button onClick={this.closeModal.bind(this,'yes')}>Yes</button>
				<button onClick={this.closeModal.bind(this,'no')}>No</button>	
			</div>
			<h5 style={{textAlign:"center",color:"red",display:this.props.deleteErrorShown? "block":"none"}}>Error deleting the job. Please try later.</h5>
          </Modal>
				</li>)
	}
}

const mapStateToProps = (state) => {
	return {
		jobs: state.jobs,
		deleteErrorShown: state.deleteErrorShown
	}
}
const mapDispatchToProps = dispatch => {
	return {
		showJobDetails: (jobId) =>{
			dispatch({
				type: "SHOW_JOB_DETAILS",
				payload: { jobid: jobId }
			})
		},
		closeModal: () => {
			dispatch({
				type: "CLOSE_DELETE_MODAL"
			})
		},
		deleteJobPosting: (jobId) => {
			axios.delete(`/delete/${jobId}`,null)
			.then(response => {
				let payload = response.data
				if(payload.success == true){
					payload.jobid = jobId
					dispatch({
						type: "DELETE_JOB_SUCCESS", payload
					})
				}
				else{
					dispatch({
						type: "DELETE_JOB_ERROR"
					})
				}
				
			})
			.catch(error => {
				dispatch({
					type: "DELETE_JOB_ERROR"
				})
			})
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(JobsItem)