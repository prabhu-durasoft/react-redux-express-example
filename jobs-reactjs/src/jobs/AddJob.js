import React,{Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'


class AddJob extends Component{

	createButtonClicked(){
		let self = this
		this.props.createJobPosting({
			title: self.title.value.trim(),
			location: self.location.value.trim(),
			description: self.description.value.trim()
		})
	}
	render(){
		return (<div style={{display: this.props.addJobShown ? "block":"none"}}>
			<h1>Create Job Posting</h1>
			<section>
				<input className="addjobinput" type="text" ref={ip => this.title = ip} placeholder="Job Title"></input>
				<br/>
				<input className="addjobinput" type="text" ref={ip => this.location = ip}  placeholder="Location"></input>
				<br/>
				<textarea rows="20" className="addjobinput" placeholder="Job Description" ref={ip => this.description = ip} ></textarea>
				<br/>
				<button onClick={this.createButtonClicked.bind(this)}>Create</button>
				{	
					this.props.addJobErrorShown ?
					<h2 className="error">Error creating job posting. Please try later</h2> 
					:
					<span/>
				}
				
			</section>
		</div>)
	}
}

const mapStateToProps = (state) => {
	return {
		addJobShown: state.addJobShown,
		addJobErrorShown: state.addJobErrorShown
	}
}
const mapDispatchToProps = dispatch => {
	
	return {
		createJobPosting: (data) => {
			axios.post('/addjob',data)
			.then(response => {
				let payload = response.data
				if(payload.success == true){
					dispatch({
						type: "CREATE_JOB_SUCCESS", payload
					})
				}
				else{
					dispatch({
						type: "CREATE_JOB_ERROR"
					})
				}
				
			})
			.catch(error => {
				dispatch({
					type: "CREATE_JOB_ERROR"
				})
			})
		}
	}

}
export default connect(mapStateToProps,mapDispatchToProps)(AddJob);