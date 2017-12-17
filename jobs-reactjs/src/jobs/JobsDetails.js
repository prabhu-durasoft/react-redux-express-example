import React,{Component} from 'react'
import {connect} from 'react-redux'
import Modal from 'react-modal'
import axios from 'axios'


class JobsDetails extends Component{

	render(){
		return(<div>
				{
					this.props.jobDetailsShown ? 
					<div>
						<h1>{this.props.jobDetailsToShow.title}</h1>
						<h3>{this.props.jobDetailsToShow.location}</h3>	
						<div>{this.props.jobDetailsToShow.description}</div>
					</div>	 
					:
					<div/> 
				}
				
		</div>)
	}
}

const mapStateToProps = (state) => {
	return {
		jobDetailsShown: state.jobDetailsShown,
		jobDetailsToShow: state.jobDetailsToShow
	}
}

export default connect(mapStateToProps,null)(JobsDetails)