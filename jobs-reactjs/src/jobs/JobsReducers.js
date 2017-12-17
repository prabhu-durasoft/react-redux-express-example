const initialState = {
	jobs: [],
	addJobShown: false,
	addJobErrorShown: false,
	deleteErrorShown: false,
	jobDetailsToShow: "",
	jobDetailsShown: false
}

const jobsReducers = (state=initialState,action) => {
		
	switch (action.type) {
		case "SHOW_JOB_DETAILS":
			let jobDetailsToShow = state.jobs.find( job => job.id === action.payload.jobid )
			return { jobs: state.jobs, jobDetailsToShow, jobDetailsShown: true }
		case "HIDE_ADD_JOB":
			return {jobs: state.jobs, addJobShown: false}
		case "SHOW_ADD_JOB":
			state.addJobShown = true
			return {jobs: state.jobs, addJobShown: true}
		case "LOAD_JOBS_SUCCESS":
			state.jobs = action.payload.jobs
			return {jobs: action.payload.jobs, addJobShown: false} 
		case "CREATE_JOB_SUCCESS":
			let jobs = [] 
			state.jobs.forEach(job => jobs.push(job))
			jobs.push(action.payload.job)
			state.jobs = jobs
			return {jobs ,addJobShown: false}
		case "CREATE_JOB_ERROR":
			return {jobs: state.jobs, addJobShown: true, addJobErrorShown: true}
		case "DELETE_JOB_SUCCESS":
			let jobsFiltered = state.jobs.filter(job => job.id != action.payload.jobid)
			return {jobs: jobsFiltered }
		case "DELETE_JOB_ERROR":
			return {jobs: state.jobs,deleteErrorShown:true}	
		case "CLOSE_DELETE_MODAL":
			return {jobs: state.jobs,deleteErrorShown:false}		
		case "LOAD_JOBS_ERROR":
			return  {jobs:state.jobs ,addJobShown: false}
		default:
			return state
	}
}

export default jobsReducers;