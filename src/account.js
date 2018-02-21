///var dcopy = require('deep-copy')
import React from 'react';
import './App.css';
import { Button } from 'react-bootstrap';

//import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import Modal from 'react-modal';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

import { myConstClass } from './constants.js';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
// import { Modal } from 'react-overlays';
// Modal.prototype.componentWillMount = function componentWillMount() {
// 	this.focus = function focus() { };
// }

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)'
	}
};
const imageStyle = {

	top: "-2px",
	marginLeft: "-12px"
}
const innerDiv = {
	padding: "0px"
}

const placeholderColor = {
	color: "white"
}

const tableScroll = {
	height: 200,
	overflow: 'scroll'
}


class Account extends React.Component {
	constructor(props) {
		super(props)


		this.state = {
			accounts: [],
			isModalOpen: false,
			projectName: '',
			teamName: '',
			projectDetails: { projects: [] },
			selectedTab1: true,
			selectedTab2: false,
			selectedTab3: false,
			selectedTab4: false,
			selectedTab5: false,
			projects:'',
			listofepics: [],
			selecteditem: '',
			issueTracking: '',
			developmentlist: [],
			sprintDetails: '',
			sourcelist: [],
			source: '',
			issuesList: [],
			doneArrayList: [],
			inprogressArrayList: [],
			todoArrayList: [],
			inqaArrayList: [],
			checkbox: '',
			doneArrayListlength: '',
			inprogressArrayListlength: '',
			todoArrayListlength: '',
			inqaArrayListlength: '',
			workHours: [],
			totalHours: [],
			issuesPieChart: '',
			datesArrayList: [],
			isAddProjectModal: false,
			projectTitle: '',
			selectedProjectIndex: 0,
			selectedProjectDetails: '',
			selectedProjectBoardDetails: '',
			sonarQubeData: '',
			issuesListArray: [],
			issuesArray: [],
			peoplesArray: [],
			hintStyle2: { opacity: 1 },
			renderChild: true,
			activeSprint:''
		}

		this.onDrop = this.onDrop.bind(this);
		this.addProjectModal = this.addProjectModal.bind(this);
		this.addProject = this.addProject.bind(this);

		this.accountsListArray = this.accountsListArray.bind(this);
		this.selectedAccount = this.selectedAccount.bind(this);
		this.selectProject = this.selectProject.bind(this);
		this.selectedBoard = this.selectedBoard.bind(this);
		this.sonarQubeData = this.sonarQubeData.bind(this);
		this.selectedBoardforIssues = this.selectedBoardforIssues.bind(this);
		
	}

	addProjectModal() {
		this.setState({ isAddProjectModal: true })
	}
	addProject(account, projectTitle) {

		axios.put(myConstClass.nodeAppUrl + '/accounts/' + account._id,
			{
				"projects": [{ "name": projectTitle, "tools": [] }],
			})
			.then(response => {

			})
		this.setState({ isAddProjectModal: false })
	}
	openModal() {
		this.setState({ isModalOpen: true })
	}
	cancelModal() {
		this.setState({ isModalOpen: false });
	}

	onDrop(data) {

		this.setState({ isModalOpen: true })
	}

	accountsListArray(accounts) {
		
		return accounts.map((account) => (
			<MenuItem
				key={account._id}
				insetChildren={true}

				value={account.customerName}
				primaryText={account.customerName}
			/>
		));
	}

	selectedAccount(event, ind, value, selecteAccount) {
		this.setState({
			sprintDetails: '',
			selectedProjectBoardDetails: '',
			issuesListArray: '',
			sonarQubedata: '',
			peoplesArray: ''
		})


		this.state.accounts.customerName = value;

		this.setState({ projectDetails: selecteAccount[ind], value: value, 
			projects:<SelectedProjectDetails  projectDetails={selecteAccount[ind]} onSelectProject={this.selectProject}
			
			
			
			/> })
	}
	projectsListArray(projects) {
		return projects.map((project) => (
			<MenuItem
				key={project.projectName}
				insetChildren={true}
				value={project.projectName}
				primaryText={project.projectName}
			/>
		));
	}
	selectProject(boardDetails,userNmae,password,hostedUrl,peopleList) {

		// this.state.hintStyle2 = {
		// 	opacity: 0
		// }
		// this.setState({ selectedProjectIndex: value })
		// var jumpStartMenuNameArray = []
		// const IM = "Issue Management"

		// axios.post(`sbtpgateway/tp/rest/esccors/generic/`, {
		// 	"resourceURL": this.state.projectDetails.projects[ind].tools[IM].hostedURL + "/rest/agile/1.0/board",
		// 	"userName": this.state.projectDetails.projects[ind].tools[IM].userName,
		// 	"password": this.state.projectDetails.projects[ind].tools[IM].password,
		// 	"actionMethod": "get"
		// })
		// 	.then(response => {

				this.setState({
					selectedProjectBoardDetails: <SelectedProjectBoardDetails selectedProjectBoardDetails={boardDetails}
						selectedUserName={userNmae}
						selectedUserPwd={password}
						selectedUrl={hostedUrl}
						onSelectBoard={this.selectedBoard} currentBoard={this.selectedBoardforIssues} />,
						peoplesArray: <PeoplesList peoplesList={peopleList} />,
						sonarQubedata:<SonarQubeData sonarQubeDetails={this.sonarQubeData}/>
								

				})

			//})


		// this.setState({ peoplesArray: <PeoplesList peoplesList={this.state.projectDetails.projects[ind].people} /> })



	}
	selectedBoardforIssues(allIssues) {
	
				
			var issuesDataArray=[]

		allIssues.forEach(function(eachIssue){
	

			if(eachIssue.issues.length==0){
			
				issuesDataArray.push({name:eachIssue.name,done:0,toDo:0,inQa:0,inProgress:0,inCodeReview:0})
			}
			else{
				var Done=[]
				var ToDo=[]
				var InQA=[]
				var InProgress=[]
				var InCodeReview=[]

				eachIssue.issues.forEach(function(issuestatus){
						if(issuestatus.fields.status.name=="Done"){
							Done.push(issuestatus)
						}
						if(issuestatus.fields.status.name=="To Do"){
							ToDo.push(issuestatus)
						}
						if(issuestatus.fields.status.name=="In QA"){
							InQA.push(issuestatus)
						}
						if(issuestatus.fields.status.name=="In Progress"){
							InProgress.push(issuestatus)
						}
						if(issuestatus.fields.status.name=="In Code Review"){
							InCodeReview.push(issuestatus)
						}

					
				
				 })
				 issuesDataArray.push({name:eachIssue.name,done:Done.length,
					toDo:ToDo.length,inQa:InQA.length,inProgress:InProgress.length,inCodeReview:InCodeReview.length})
			}

		})
		this.setState({ issuesListArray: <IssuesList issuesArray={issuesDataArray} />
			})
			
	

	}
	sonarQubeData() {
		this.setState({ sonarQubeData: <SonarQubeData />})
	}
	selectedBoard(sprintList, boardId, url, username, pwd) {

		//this.setState({issuesListArray: <IssuesList  issuesArray={boardId} />})

		if (sprintList !== undefined) {

			var sprintListArray = sprintList
		
			for(var i=0;i<sprintListArray.length;i++){
				if(sprintListArray[i].state==="active"){

					var activeSprint=sprintListArray[i].id
				}
				
			}

			this.setState({
				sprintDetails: <SprintDetails sprinttList={sprintListArray}
					boardId={boardId}
					selectedUrl={url}
					selectedUserName={username}
					selectedUserPwd={pwd}
					//sonarQubeDetails={this.sonarQubeData}
					activeSprint={activeSprint}
					 />

					

			});

		}

		else {
			this.setState({
				sprintDetails: <SprintDetails sprinttList={[]} boardId={boardId} />,

			});
		}
       


	}
	componentWillMount() {


		axios.get(myConstClass.nodeAppUrl + '/accounts')
			.then(response => {

				this.setState({ accounts: this.state.accounts.concat(response.data) })

			})
	}

	render() {

		return (
			<div className="container-fluid padding0">

				<nav className="navbar navbar-fixed-top navbarBgColor navbarFontColor padding0">
					<div className="col-md-12 flex">
						<div className="col-md-3 col-lg-2 marginT16">
							{/* <h4 className="margin0 pointer verticalLine" ui-sref="dashboard"><i className="glyphicon glyphicon-home"></i></h4> */}
							<h4 className="margin0 pointer paddingL04"  ><i className="glyphicon glyphicon-menu-hamburger"></i></h4>
						</div>
						<div className="col-md-7 col-lg-8 textAlignCenter">
							{/* <h4 className="margin0">{this.state.projectDetails.account.customerName}</h4> */}
							<SelectField hintText="Select Account" value={this.state.accounts.customerName} listStyle={{ backgroundColor: "#b7b7b7" }} menuItemStyle={{ color: "#fff" }}
								hintStyle={placeholderColor} labelStyle={{ color: "#fff" }} underlineStyle={{ display: 'none' }} onChange={(e, i, v) => this.selectedAccount(e, i, v, this.state.accounts)} >
								{this.accountsListArray(this.state.accounts)}
							</SelectField>
						</div>
						<div className="col-md-2 col-lg-2  displayInline padding0">
							{/* <h4 className="margin0 pointer verticalLine" ui-sref="dashboard"><i className="glyphicon glyphicon-home"></i></h4> */}
							<div className="marginT07">
								<h5 className="font fontSize17">Administrator: </h5>
							</div>
							<div className="marginT07">
								<List style={innerDiv}>
									<ListItem
										disabled={true}
										innerDivStyle={innerDiv}
										leftAvatar={
											<Avatar
												style={imageStyle}
												src="https://www.gstatic.com/webp/gallery/4.sm.jpg" />
										}

									/>
								</List>
							</div>


						</div>
						<div>

						</div>

					</div>
				</nav>


				<div className="row">
					{/* <div className="col-md-12 col-lg-12 padding0 displayInline"> */}
						<div className="col-md-4 col-lg-4 borderRight marginR0 padding0 verticalHeight">
							<div className="col-md-12 col-lg-12 textAlignCenter">

									{/* <SelectField hintText="Select Project" value={this.state.selectedProjectIndex} listStyle={{ backgroundColor: "#b7b7b7" }} menuItemStyle={{ color: "#fff" }}
										hintStyle={this.state.hintStyle2} underlineStyle={{ display: 'none' }} onChange={(e, i, v) => this.selectProject(e, i, v)}>
										{this.projectsListArray(this.state.projectDetails.projects)}
									</SelectField> */}

									{this.state.projects}

								</div> 
								<div className="col-md-12 col-lg-12 textAlignCenter">
									{this.state.selectedProjectBoardDetails}


								</div>
								<div className="col-md-12 col-lg-12 padding0">
									{this.state.peoplesArray}
									{this.state.issuesListArray}			
								</div>
							</div>
						<div className="col-md-4 col-lg-4 borderRight marginR0 padding0 verticalHeight">
							{this.state.sonarQubedata}

							</div>
						<div className="col-md-4 col-lg-4 borderRight marginR0 padding0 verticalHeight">
						{this.state.sprintDetails}
							
						</div>
					{/* </div> */}

				</div>

				<Modal isOpen={this.state.isModalOpen} style={customStyles}
					className={["col-sm-8 col-md-6 modalMargins overlay "].join(' ')}>

					<div>
						<div className="loginHeader">
							<h1>Project Details</h1>
						</div>
						<div className="loginUserName">
							<label>UserName:<input value='' name='userName' /></label>
						</div>
						<div className="loginPwd">
							<label >Password:<input value='' name='pswd' /></label>
						</div>

						<div className="loginBtns">

							<div>
								{/* <Button bsStyle="success" bsSize="small" className="loginSubmitBtn" onClick={() => this.addProject()} >Submit</Button>  */}
								<Button bsStyle="danger" bsSize="small" className="loginSubmitBtn" onClick={() => this.cancelModal()} >Cancel</Button>
							</div>



						</div>

					</div>

				</Modal>

				<Modal isOpen={this.state.isAddProjectModal} style={customStyles}
					className={["col-sm-8 col-md-6  modalMargins overlay "].join(' ')}>

					<div>
						<div className="loginHeader">
							<h1>Account Details</h1>
						</div>
						<div className="loginUserName">
							<label>Project Title:<input value={this.state.projectTitle} name='projectTitle' onChange={this.handleChange} /></label>
						</div>
						{/* <div className="loginPwd">
							<label >Password:<input value='' name='pswd' /></label>
						</div> */}
						<div className="loginBtns">

							<div>
								<Button bsStyle="success" bsSize="small" className="loginSubmitBtn" onClick={() => this.addProject(this.state.projectDetails.account, this.state.projectTitle)} >Submit</Button>
								<Button bsStyle="danger" bsSize="small" className="loginSubmitBtn" onClick={() => this.cancelModal()} >Cancel</Button>
							</div>



						</div>

					</div>

				</Modal>
				<div className="footer ">
					<div  className="col-md-12 displayInline">
						<div className="col-md-4">
						<h6><a href="https://www.atlassian.com/software/jira" target="/">jira</a></h6>
						<h6><a href="https://www.sonarqube.org/" target="/">Quality</a></h6>
							</div>
							<div className="col-md-4">
							<h6><a href="https://www.atlassian.com/software/confluence" target="/">confluence</a></h6>
							<h6><a href="https://bitbucket.org/" target="/">Version Control</a></h6>
							</div>
							<div className="col-md-4">
							<h6><a href="https://www.comakeit.com" target="/">AES</a></h6>
							<h6><a href="https://www.comakeit.com" target="/">comakeIT</a></h6>
							</div>
						
					
						</div>

				</div>
			</div>
		)

	}

}

class SelectedProjectDetails extends React.Component {
	_
	constructor(props) {
		super(props)
		this.state = {
			projectDetails: '',
			selectedProject: '',
			selectedProjectVersion: '',
			userName: '',
			pwd: '',
			url: ''
		}

		this.projectDetailsListarray = this.projectDetailsListarray.bind(this);
		this.selectProject = this.selectProject.bind(this);
	}

	componentWillMount() {

	


		this.setState({
			projectDetails: this.props.projectDetails,
			// userName: this.props.selectedUserName,
			// pwd: this.props.selectedUserPwd,
			// url: this.props.selectedUrl
		})

	}

	componentWillReceiveProps(nextProps) {

		this.setState({
			projectDetails: nextProps.projectDetails,
			// userName: nextProps.selectedUserName,
			// pwd: nextProps.selectedUserPwd,
			// url: nextProps.selectedUrl
		})

	}
	selectProject(event, ind, value) {

			this.setState({ selectedProject: value })

		this.state.hintStyle2 = {
			opacity: 0
		}
		this.setState({ selectedProjectIndex: value })
		var jumpStartMenuNameArray = []
		const IM = "Issue Management"

		axios.post(`sbtpgateway/tp/rest/esccors/generic/`, {
			"resourceURL": this.state.projectDetails.projects[ind].tools[IM].hostedURL + "/rest/agile/1.0/board",
			"userName": this.state.projectDetails.projects[ind].tools[IM].userName,
			"password": this.state.projectDetails.projects[ind].tools[IM].password,
			"actionMethod": "get"
		})
			.then(response => {

				var boardDetails=response.data.values
				var userNmae=this.state.projectDetails.projects[ind].tools[IM].userName
				var password=this.state.projectDetails.projects[ind].tools[IM].password
				var hostedUrl=this.state.projectDetails.projects[ind].tools[IM].hostedURL
				var peopleList=this.state.projectDetails.projects[ind].people


				this.props.onSelectProject(boardDetails,userNmae,password,hostedUrl,peopleList)

				// this.setState({
				// 	selectedProjectBoardDetails: <SelectedProjectBoardDetails selectedProjectBoardDetails={response.data.values}
				// 		selectedUserName={this.state.projectDetails.projects[ind].tools[IM].userName}
				// 		selectedUserPwd={this.state.projectDetails.projects[ind].tools[IM].password}
				// 		selectedUrl={this.state.projectDetails.projects[ind].tools[IM].hostedURL}
				// 		onSelectBoard={this.selectedBoard} currentBoard={this.selectedBoardforIssues} />,

								

				// })

			})


		//this.setState({ peoplesArray: <PeoplesList peoplesList={this.state.projectDetails.projects[ind].people} /> })

		// axios.post(`sbtpgateway/tp/rest/esccors/generic/`, {
		// 	//this.state.projectDetails.projects[ind].tools[0].hostedURL + "/rest/api/2/project", 
		// 	"resourceURL": this.state.url + "/rest/api/2/project/" + this.state.projectDetailsListarray[ind].id + "/versions",
		// 	"username": this.state.userName,
		// 	"password": this.state.pwd,
		// 	"actionMethod": "get"
		// })
		// 	.then(response => {


		// 		this.setState({
		// 			selectedProjectVersion: <SelectedProjectVersion selectedProjectVersion={response.data} selectedUserName={this.state.userName}
		// 				selectedUserPwd={this.state.pwd} />,
		// 		})



		// 	})

	}


	projectDetailsListarray(projects) {
		return projects.map((project) => (
			<MenuItem
				key={project.projectName}
				insetChildren={true}
				value={project.projectName}
				primaryText={project.projectName}
			/>
		));
	}

	render() {

		return (

			<div>
		
					<SelectField hintText="Select Project" value={this.state.selectedProjectIndex} listStyle={{ backgroundColor: "#b7b7b7" }} menuItemStyle={{ color: "#fff" }}
					hintStyle={this.state.hintStyle2} underlineStyle={{ display: 'none' }} onChange={(e, i, v) => this.selectProject(e, i, v)}>
						{this.projectDetailsListarray(this.state.projectDetails.projects)}
					</SelectField>
		
				{/* <div>
					{this.state.selectedProjectVersion}
				</div> */}
			</div>


		)
	}
}
class SelectedProjectBoardDetails extends React.Component {
	_
	constructor(props) {
		super(props)
		this.state = {
			selectedProjectBoard: '',
			projectBoardDetailsListarray: [],
			userName: '',
			pwd: '',
			url: '',
			selectedBoardSprintsArray: [],
			epicArray:[],
			issuesList: '',
			hintStyle2: {
				opacity: 1
			}

		}

 		//this.epicsArray=this.epicsArray.bind(this)
	}

	componentWillMount() {

		this.setState({
			projectBoardDetailsListarray: this.props.selectedProjectBoardDetails,
			userName: this.props.selectedUserName,
			pwd: this.props.selectedUserPwd,
			url: this.props.selectedUrl
		})

	}

	componentWillReceiveProps(nextProps) {

		this.setState({
			projectBoardDetailsListarray: nextProps.selectedProjectBoardDetails,
			userName: nextProps.selectedUserName,
			pwd: nextProps.selectedUserPwd,
			url: this.props.selectedUrl
		})

	}

	selectedProjectBoard(event, index, value) {


		var boardId = this.state.projectBoardDetailsListarray[index].id

		this.state.hintStyle2 = {
			opacity: 0
		}

		this.setState({ selectedProjectBoard: value })
		axios.post(`sbtpgateway/tp/rest/esccors/generic/`, {
			"resourceURL": this.state.url + "/rest/agile/1.0/board/" + this.state.projectBoardDetailsListarray[index].id + "/sprint",
			"userName": this.state.userName,
			"password": this.state.pwd,
			"actionMethod": "get"
		})
			.then(response => {

				this.props.onSelectBoard(response.data.values, this.state.projectBoardDetailsListarray[index].id, this.state.url, this.state.userName, this.state.pwd,boardId);
				// this.props.sonarQubeDetails()
				this.setState({
					selectedBoardSprintsArray: response.data.values

				})


			})

		axios.post(`sbtpgateway/tp/rest/esccors/generic/`, {
			"resourceURL": this.state.url + "/rest/agile/1.0/board/" + this.state.projectBoardDetailsListarray[index].id + "/epic",
			"userName": this.state.userName,
			"password": this.state.pwd,
			"actionMethod": "get"
			
		})
			.then(response => {
			
				var epicArray=[]
					var counter=0
				for(var i =0;i<response.data.values.length;i++){
						var epicName=response.data.values[i].name
					axios.post(`sbtpgateway/tp/rest/esccors/generic/`, {
						"resourceURL": this.state.url + "/rest/agile/1.0/board/" + this.state.projectBoardDetailsListarray[index].id + "/epic/"+ response.data.values[i].id+"/issue",
						"userName": this.state.userName,
						"password": this.state.pwd,
						"actionMethod": "get"
					},{
					
							epicName:response.data.values[i].name,
							index:i,
							length:response.data.values.length

						
					})
						.then(response=>{

							 epicArray.push({name:response.config.epicName,issues:response.data.issues})

								if(response.config.index==(response.config.length-1)){
								this.props.currentBoard(epicArray)
							}
					
						})

				}


			})
			
			

	}

	projectBoardDetailsListarray(board) {
	
		return board.map((board) => (
			<MenuItem
				key={board.id}
				insetChildren={true}
				value={board.name}
				primaryText={board.name}
			/>
		));
	}


	render() {

		return (

			<div>


				<SelectField hintText="Boards" value={this.state.selectedProjectBoard} listStyle={{ backgroundColor: "#b7b7b7" }} menuItemStyle={{ color: "#fff" }}
					hintStyle={this.state.hintStyle2} underlineStyle={{ display: 'none' }} onChange={(e, i, v) => this.selectedProjectBoard(e, i, v)}>
					{this.projectBoardDetailsListarray(this.state.projectBoardDetailsListarray)}
				</SelectField>




			</div>




		)
	}
}
class SprintDetails extends React.Component {
	constructor(props) {
		super(props)


		this.state = {
			values: '',
			sprintStartTime: '',
			sprintEndTime: '',
			sprintCompleteTime: '',
			eachTimeSpentArray: [],
			totalTimeSpentArray: [],
			currentDate: '',
			currentSpentTime: 0,
			sprintId: this.props.value,
			workHours: '',
			date1: '',
			date2: '',
			timeSpent: '',
			sprintListSorted: '',
			numbers: [1, 2, 4, 3],
			numbersSorted: '',
			sprintPieChart: '',
			pieChartIssueStatusIdentifier: '',
			boardId: '',
			sonarQubeData: '',
			userNme: '',
			pwd: '',
			url: '',
			activeSprint:''
		};
		this.handleChange = this.handleChange.bind(this);

	}

	componentWillMount() {

	
		this.state.sprintListSorted = this.props.sprinttList.sort(function (a, b) {


			return parseFloat(b.id) - parseFloat(a.id);
		})

	

		this.setState({
			boardId: this.props.boardId,
	
			url: this.props.selectedUrl,
			userName: this.props.selectedUserName,
			pwd: this.props.selectedUserPwd,
			values:this.props.activeSprint

		})




	}

	componentDidMount(){
		this.handleChange("1","2",this.state.values)
		
			}

	componentWillReceiveProps(nextProps) {

		this.state.sprintListSorted = nextProps.sprinttList.sort(function (a, b) {

			return parseFloat(b.id) - parseFloat(a.id);
		})
		this.setState({
			boardId: nextProps.boardId,
			url: nextProps.selectedUrl,
			userName: nextProps.selectedUserName,
			pwd: nextProps.selectedUserPwd,
			values:nextProps.activeSprint
		})
		//this.state.boardID = nextProps.boardId

	}
	handleChange(event, index, val) {


		this.setState({
			values: val
		});

		axios.post(`sbtpgateway/tp/rest/esccors/generic/`, {
			"resourceURL": this.state.url + "/rest/greenhopper/1.0/rapid/charts/scopechangeburndownchart.json?rapidViewId=" + this.state.boardId + "&sprintId=" + val,
			"userName": this.state.userName,
			"password": this.state.pwd,
			"actionMethod": "get"

		}).then(response => {
			console.log(response)

			this.setState({
				sprintStartTime: '',
				sprintEndTime: '',
				sprintCompleteTime: '',
				eachTimeSpentArray: [],
				totalTimeSpentArray: [],
				currentDate: '',
				currentSpentTime: 0,
				workHours: '',
				date1: '',
				date2: '',
				timeSpent: '',


			});

			var getDateString = function (epochTime) {
				var date = new Date(epochTime)
				var month = '' + (date.getMonth() + 1)
				var day = '' + date.getDate()
				var year = date.getFullYear()
				var dateString = (month + "/" + day + "/" + year)
				return dateString
			}

			var d1 = getDateString(response.data.startTime)
			var d2 = getDateString(response.data.endTime)

			this.setState({ sprintStartTime: response.data.startTime, sprintEndTime: response.data.endTime, sprintCompleteTime: response.data.completeTime, date1: d1, date2: d2 })
			//var currentDateObj = getDateString(response.data.startTime)

			//this.setState({ currentDate: this.state.date1 })
			// this.state.currentDate = currentDateObj;

			var currentDateEpochTime = response.data.startTime
			var changesArray = Object.keys(response.data.changes)

			if (response.data.completeTime == undefined) {
				//console.log(new Date().getTime() / 1000)
				var date = new Date()
				var month = '' + (date.getMonth() + 1)
				var day = '' + date.getDate()
				var year = date.getFullYear()
				var dateString = (month + "/" + day + "/" + year)


				response.data.completeTime = new Date(dateString).getTime()


			}


			Object.keys(response.data.changes).forEach(function (key, index) {

				var eachDate = Number(key)

				if (eachDate >= response.data.startTime && eachDate <= response.data.completeTime) {

					var changeObjArray = response.data.changes[eachDate]
					changeObjArray.forEach(function (item) {

						if (item.timeC) {

							if (item.timeC.timeSpent) {

								var d = new Date(eachDate)
								var dateString = getDateString(eachDate)
								if (this.state.date1 !== dateString) {

									this.state.eachTimeSpentArray = this.state.eachTimeSpentArray.concat({ name: this.state.date1, hr: (this.state.timeSpent / 3600) })

									this.setState({ date1: dateString, totalTimeSpentArray: this.state.eachTimeSpentArray })
									var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
									var diffDays = Math.round(Math.abs((d.getTime() - new Date(currentDateEpochTime).getTime()) / (oneDay)));
									if (diffDays > 1) {
										for (var i = 1; i < diffDays; i++) {
											var diffStartDate = new Date(currentDateEpochTime)
											var missedDate = new Date(currentDateEpochTime);
											missedDate.setHours(diffStartDate.getHours() + (i * 24))

											var missedDateString = getDateString(missedDate)
											this.state.eachTimeSpentArray = this.state.eachTimeSpentArray.concat({ name: missedDateString, hr: (this.state.timeSpent / 3600) })

											this.setState({ totalTimeSpentArray: this.state.eachTimeSpentArray })
										}
									}
								}
								this.setState({ timeSpent: item.timeC.timeSpent + this.state.currentSpentTime })
								this.setState({ currentSpentTime: this.state.timeSpent })
								currentDateEpochTime = eachDate
							}

						}
					}.bind(this))
				}
				if (index == changesArray.length - 1) {
					this.state.eachTimeSpentArray = this.state.eachTimeSpentArray.concat({ name: this.state.date1, hr: (this.state.timeSpent / 3600) })

					this.setState({ totalTimeSpentArray: this.state.eachTimeSpentArray })
					var endDateObj = new Date(response.data.endTime)
					var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
					var diffDays = Math.round(Math.abs((endDateObj.getTime() - new Date(currentDateEpochTime).getTime()) / (oneDay)));
					if (diffDays > 1) {
						for (var i = 1; i < diffDays; i++) {
							var diffStartDate = new Date(currentDateEpochTime)
							var missedDate = new Date(currentDateEpochTime);
							missedDate.setHours(diffStartDate.getHours() + (i * 24))
							var missedDateString = getDateString(missedDate)
							this.state.eachTimeSpentArray = this.state.eachTimeSpentArray.concat({ name: missedDateString })
							this.setState({ totalTimeSpentArray: this.state.eachTimeSpentArray })
						}
					}

				}
			}.bind(this))

			this.setState({ workHours: <Hourschart data={this.state.totalTimeSpentArray} /> })
		})


		axios.post(`sbtpgateway/tp/rest/esccors/generic/`, {
			"resourceURL": this.state.url + "/rest/agile/1.0/board/" + this.state.boardId + "/sprint/" + val + "/issue?maxResults=100",
			"userName": this.state.userName,
			"password": this.state.pwd,
			"actionMethod": "get"
		}).then(response => {

			this.setState({
				sprintPieChart: <Piechart sprinttList={response.data} />, pieChartIssueStatusIdentifier: <StatusIdentifier />
			});
		})
		//this.setState({sonarQubeData:<SonarQubeData />})
		//this.props.sonarQubeDetails();
	}
	sprintItems(sprintList) {
	

		return sprintList.map((sprintList) => (
			<MenuItem
				key={sprintList.id}
				//insetChildren={true}

				value={sprintList.id}
				primaryText={sprintList.name}
			/>
		));
	}

	render() {
			
		return (
			<div className="">
				<div className="col-md-12 col-lg-12 textAlignCenter titleBackgroundColor">
				<h3>Sprint Burndown</h3>
				</div>
				<div className="col-md-12 col-lg-12 textAlignLeft">
					<SelectField
						hintText="Select Sprint"
						value={this.state.values}
						onChange={(e, i, v) => this.handleChange(e, i, v)}

					>
						{this.sprintItems(this.state.sprintListSorted)}
					</SelectField>

				</div>

				<div className="col-md-12 col-lg-12">
					{this.state.workHours}
				</div>
				<div className="col-md-12 col-lg-12">
					{this.state.sprintPieChart}
				</div>
				<div className="col-md-12 col-lg-12">
					{this.state.pieChartIssueStatusIdentifier}
				</div>


			</div>
		)

	}


}

class Hourschart extends React.Component {
	render() {
		
		return (
					
				<div className="chartSize">
					<LineChart width={500} height={300} data={this.props.data}>
						<XAxis dataKey="name" />
						<YAxis />
						<CartesianGrid strokeDasharray="1 1" />
						<Legend />
						<Line type="stepAfter" dataKey="hr" stroke="#82ca9d" />
						<Line type="monotone" dataKey="y" stroke="#82ca9d" />
					</LineChart>
				</div>
			
		)

	}


}

class Piechart extends React.Component {
	_
	constructor(props) {
		super(props)
		this.state = {
			issuesList: [],
			doneArrayList: [],
			inprogressArrayList: [],
			todoArrayList: [],
			inqaArrayList: [],
			doneArrayListlength: '',
			inprogressArrayListlength: '',
			todoArrayListlength: '',
			inqaArrayListlength: '',
			sonarQubeData: '',
			piechartPercentagesArray:[],piechart:[]
		}
		// this.handleChange = this.handleChange.bind(this);
	}

	componentWillMount() {

		this.state.doneArrayList = this.props.sprinttList.issues.filter(function (issue) {

			if (issue.fields.status.statusCategory.name === "Done") {
				return issue;
			}
		})
		this.state.inprogressArrayList = this.props.sprinttList.issues.filter(function (issue) {

			if (issue.fields.status.statusCategory.name === "In Progress") {
				return issue;
			}
		})
		this.state.todoArrayList = this.props.sprinttList.issues.filter(function (issue) {

			if (issue.fields.status.statusCategory.name === "To Do") {
				return issue;
			}
		})

		this.state.inqaArrayList = this.props.sprinttList.issues.filter(function (issue) {

			if (issue.fields.status.statusCategory.name === "In QA") {
				return issue;
			}
		})

		this.setState({
			doneArrayListlength: this.state.doneArrayList.length, inprogressArrayListlength: this.state.inprogressArrayList.length,
			todoArrayListlength: this.state.todoArrayList.length, inqaArrayListlength: this.state.inqaArrayList.length,


		})


	}

	componentWillReceiveProps(nextProps) {

		this.state.doneArrayList = nextProps.sprinttList.issues.filter(function (issue) {

			if (issue.fields.status.statusCategory.name === "Done") {
				return issue;
			}
		})
		this.state.inprogressArrayList = nextProps.sprinttList.issues.filter(function (issue) {

			if (issue.fields.status.statusCategory.name === "In Progress") {
				return issue;
			}
		})
		this.state.todoArrayList = nextProps.sprinttList.issues.filter(function (issue) {

			if (issue.fields.status.statusCategory.name === "To Do") {
				return issue;
			}
		})

		this.state.inqaArrayList = nextProps.sprinttList.issues.filter(function (issue) {

			if (issue.fields.status.statusCategory.name === "In QA") {
				return issue;
			}
		})

		this.setState({
			doneArrayListlength: this.state.doneArrayList.length, inprogressArrayListlength: this.state.inprogressArrayList.length,
			todoArrayListlength: this.state.todoArrayList.length, inqaArrayListlength: this.state.inqaArrayList.length,

		})
	}





	render() {

		//this.state.piechartPercentagesArray=[]
		const todoArrayPercentage=Math.round(((this.state.todoArrayListlength/(this.state.todoArrayListlength+this.state.inprogressArrayListlength +this.state.inqaArrayListlength +this.state.doneArrayListlength))*100))
		const inprogressArrayPercentage=Math.round(((this.state.inprogressArrayListlength/(this.state.todoArrayListlength+this.state.inprogressArrayListlength +this.state.inqaArrayListlength +this.state.doneArrayListlength))*100))
		const inqaArrayPercentage=Math.round(((this.state.inqaArrayListlength/(this.state.todoArrayListlength+this.state.inprogressArrayListlength +this.state.inqaArrayListlength +this.state.doneArrayListlength))*100))
		const doneArrayPercentage=Math.round(((this.state.doneArrayListlength/(this.state.todoArrayListlength+this.state.inprogressArrayListlength +this.state.inqaArrayListlength +this.state.doneArrayListlength))*100))



		const data = [
			{ name: 'Group C', value: this.state.todoArrayListlength },
		 { name: 'Group B', value: this.state.inprogressArrayListlength },
		{ name: 'Group D', value: this.state.inqaArrayListlength }, 
		{ name: 'Group A', value: this.state.doneArrayListlength }];
		const COLORS = ['#FF8042', '#00C49F', '#FFBB28', '#0088FE'];


		const RADIAN = Math.PI / 180;
		const renderCustomizedLabel = ({data, cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
			const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
			const x = cx + radius * Math.cos(-midAngle * RADIAN);
			const y = cy + radius * Math.sin(-midAngle * RADIAN);

			 return (
			`${(percent * 100).toFixed(0)}%`
		
				
			  );
		};
		return (

			<div className="row textAlignCenter marginT3">
				
				<div className="col-md-12 col-lg-12 textAlignCenter titleBackgroundColor">
				<h3>Sprint Overview</h3>
				</div>
				
				<div className="displayInline  col-md-8 justify">

					<PieChart width={490} height={400}>
						<Pie
						//nameKey='name'
							dataKey="value"
							data={data}
							//cx={300}
							//cy={200}
							//labelLine={true}
							label={renderCustomizedLabel}
							outerRadius={180}
							animationEasing='ease-in-out'
							//PieLabelStyle ='outside'
						 >

							{
								data.map((entry, index) => < Cell fill={COLORS[index % COLORS.length]} key={index}/> )

							}

							
							
							</Pie>
						 

					</PieChart>

				</div>

			
				{/* {this.state.piechart
                                    } */}

										
				
				<div className="col-md-4">

					<div className="col-md-12 displayInline">
						<div className="borderRadius" style={{ backgroundColor: "#FF8042", width: "20px", height: "20px", border: "5px solid #FF8042" }}>

						</div>

						<div className="col-md-9">
							<label>{todoArrayPercentage}% To Do </label>
						</div>
					</div>
					<div className="col-md-12 displayInline">
						<div className="borderRadius" style={{ backgroundColor: "#00C49F", width: "20px", height: "20px", border: "5px solid #00C49F" }}>

						</div>

						<div className="col-md-10">
							<label>{inprogressArrayPercentage}% Progress</label>
						</div>
					</div>
					<div className="col-md-12 displayInline">
						<div className="borderRadius" style={{ backgroundColor: "#FFBB28", width: "20px", height: "20px", border: "5px solid #FFBB28" }}>

						</div>

						<div className="col-md-9">
							<label>{inqaArrayPercentage}% In QA</label>
						</div>
					</div>
					<div className="col-md-12 displayInline">
						<div className="borderRadius" style={{ backgroundColor: "#0088FE", width: "20px", height: "20px", border: "5px solid #0088FE" }}>

						</div>

						<div className="col-md-9">
							<label>{doneArrayPercentage}% Done</label>
						</div>
					</div>

				</div>
			</div>

		)





	}
}
class StatusIdentifier extends React.Component {

	render() {
		return (
			<div className="displayInline  col-md-10 col-md-offset-2">

				{/* <div className="borderRadius" style={{ backgroundColor: "#FF8042", width: "20px", height: "20px", border: "5px solid #FF8042" }}>

				</div>
				<span>
					<label className="col-md-10">To Do</label>
				</span>

				<div className="borderRadius" style={{ backgroundColor: "#00C49F", width: "20px", height: "20px", border: "5px solid #00C49F" }}>

				</div><span><label className="col-md-10">In Progress</label></span>

				<div className="borderRadius" style={{ backgroundColor: "#FFBB28", width: "20px", height: "20px", border: "5px solid #FFBB28" }}>

				</div><span><label className="col-md-10">In QA</label></span>

				<div className="borderRadius" style={{ backgroundColor: "#0088FE", width: "20px", height: "20px", border: "5px solid #0088FE" }}>

				</div><span><label className="col-md-10">Done</label></span> */}
			</div>
		)

	}


}

class SonarQubeData extends React.Component {
	_
	constructor(props) {
		super(props)
		this.state = {
			sonarQubeData: {
				"bugs": "",
				"vulnerabilities": "",
				"codesmells": "",
				"duplicatedBlocks": "",
				"duplications": "",
				"script": "", "linesofcode": "",
			}

		}


	}

	componentWillMount() {
		axios.post(`sbtpgateway/tp/rest/esccors/generic/`, {
			"resourceURL": "http://172.16.27.27:4950/sonar/api/measures/component?additionalFields=metrics,periods&componentKey=_Fic1&metricKeys=alert_status,quality_gate_details,bugs,new_bugs,reliability_rating,vulnerabilities,new_vulnerabilities,security_rating,code_smells,new_code_smells,sqale_rating,sqale_index,new_technical_debt,overall_coverage,new_overall_coverage,coverage,new_coverage,it_coverage,new_it_coverage,new_lines_to_cover,new_it_lines_to_cover,new_overall_lines_to_cover,tests,duplicated_lines_density,duplicated_blocks,ncloc,ncloc_language_distribution",
			"userName": "admin", "password": "admin", "actionMethod": "get"
		})
			.then(response => {

				var i
				// 	this.state.closedIssues=[]
				// 	this.state.openIssues=[]
				for (i = 0; i < response.data.component.measures.length; i++) {
					if (response.data.component.measures[i].metric == "bugs") {
						this.state.bugs = response.data.component.measures[i].value

					}
					if (response.data.component.measures[i].metric == "vulnerabilities") {
						this.state.vulnerabilities = response.data.component.measures[i].value
					}
					if (response.data.component.measures[i].metric == "code_smells") {
						this.state.codesmells = response.data.component.measures[i].value

					}

					if (response.data.component.measures[i].metric == "duplicated_blocks") {
						this.state.duplicatedBlocks = response.data.component.measures[i].value

					}
					if (response.data.component.measures[i].metric == "duplicated_lines_density") {
						this.state.duplications = response.data.component.measures[i].value

					}
					if (response.data.component.measures[i].metric == "ncloc_language_distribution") {
						this.state.script = response.data.component.measures[i].value

					}
					if (response.data.component.measures[i].metric == "ncloc") {
						this.state.linesofcode = response.data.component.measures[i].value

					}

				}
				this.setState({
					sonarQubeData: {
						"bugs": this.state.bugs,
						"vulnerabilities": this.state.vulnerabilities,
						"codesmells": this.state.codesmells,
						"duplicatedBlocks": this.state.duplicatedBlocks,
						"duplications": this.state.duplications,
						"script": this.state.script,
						"linesofcode": this.state.linesofcode,
					}
				})

				//  this.props.sonarQubeDetails(this.state.sonarQubeData);


			})


	}

	render() {
		return (
		
				<div className="col-md-12 padding0">
					<div className="textAlignCenter titleBackgroundColor">
					<h3>Quality Overview</h3>
						</div>
					

					<div className="col-md-12 displayInline overlay marginB08">
						<div className="col-md-3 textAlignCenter">Bugs
													<div className="textAlignCenter">
								{this.state.sonarQubeData.bugs}
							</div>
						</div>
						<div className="col-md-3 textAlignCenter"> Vulnerabilities
													<div className="textAlignCenter">
								{this.state.sonarQubeData.vulnerabilities}
							</div>
						</div>
						<div className="col-md-3 textAlignCenter">Code Smells
													<div className="textAlignCenter">
								{this.state.sonarQubeData.codesmells}
							</div>
						</div>
						<div className="col-md-3 textAlignCenter"> Debt
													<div className="textAlignCenter">
								{}
							</div>
						</div>
					</div>

					{/* <div className="col-md-12 displayInline overlay marginB08">
											
													</div> */}
					<div className="col-md-12 displayInline overlay marginB08">
						<div className="col-md-3 textAlignCenter">Duplications
													<div className="textAlignCenter">
								{this.state.sonarQubeData.duplications}
							</div>
						</div>
						<div className="col-md-3 textAlignCenter"> Duplicated Blocks
													<div className="textAlignCenter">
								{this.state.sonarQubeData.duplicatedBlocks}
							</div>
						</div>
						<div className="col-md-3 textAlignCenter">Script Lines
													<div className="textAlignCenter">
								{this.state.sonarQubeData.script}
							</div>
						</div>
						<div className="col-md-3 textAlignCenter"> Lines of Code
													<div className="textAlignCenter">
								{this.state.sonarQubeData.linesofcode}
							</div>
						</div>
					</div>

					




				</div>




			




		)
	}
}
class SelectedProjectVersion extends React.Component {
	_
	constructor(props) {
		super(props)
		this.state = {
			projectVersionDetailsListarray: [],
			selectedProjectVersionDetails: '',
			userName: '',
			pwd: ''
		}
		this.selectProjectVersionDetails = this.selectProjectVersionDetails.bind(this)
		this.projectVersionDetailsListarray = this.projectVersionDetailsListarray.bind(this)

	}

	componentWillMount() {

		this.setState({ projectVersionDetailsListarray: this.props.selectedProjectVersion, userName: this.props.selectedUserName, pwd: this.props.selectedUserPwd })

	}

	componentWillReceiveProps(nextProps) {

		this.setState({ projectVersionDetailsListarray: nextProps.selectedProjectVersion, userName: nextProps.selectedUserName, pwd: nextProps.selectedUserPwd })

	}

	selectProjectVersionDetails(event, ind, value) {
		this.setState({ selectedProjectVersionDetails: value })


	}

	projectVersionDetailsListarray(versions) {
		return versions.map((version) => (
			<MenuItem
				key={version.id}
				insetChildren={true}
				value={version.name}
				primaryText={version.name}
			/>
		));
	}


	render() {

		return (

			<div>
				<SelectField hintText="Release" value={this.state.selectedProjectVersionDetails} listStyle={{ backgroundColor: "#b7b7b7" }} menuItemStyle={{ color: "#fff" }}
					hintStyle={{ opacity: "1" }} underlineStyle={{ display: 'none' }} onChange={(e, i, v) => this.selectProjectVersionDetails(e, i, v)}>
					{this.projectVersionDetailsListarray(this.state.projectVersionDetailsListarray)}
				</SelectField>




			</div>




		)
	}
}

class IssuesList extends React.Component {
	_
	constructor(props) {
		super(props)

		this.state = {
			epicsArray: [],
			issuesArray: [],
			height: '400px',
			showCheckboxes: false,

		}


	}

	componentWillMount() {
				

		// this.state.epicsArray = this.props.issuesArray.filter(function (eachIssue) {
		// 	if (eachIssue.fields.epic !== null||eachIssue.fields.epic!==undefined ) {
			
		// 		return eachIssue
			
			
		// 	}
			
		// })

		// for(var i=0;i<this.props.issuesArray.length;i++){
		// 	if (this.props.issuesArray[i].fields.epic!= null || this.props.issuesArray[i].fields.epic!= undefined ) {
		// 			this.state.epicsArray=this.state.epicsArray.concat(this.props.issuesArray[i])
	//	}
		this.setState({ issuesArray: this.props.issuesArray })
	//}
		
	var epicName
	var issueStatus
	var issuesArrayWithSameEpicArray=[]
	var x =[]
	var closedIssues=[]

	for(var i=0;i<this.state.epicsArray.length;i++){

		  //issueStatus=this.state.epicsArray[i].statusCategory.name
		//   if(epicName!=this.state.epicsArray[i].fields.epic.name){
		// 	if(this.state.epicsArray[i].statusCategory.name=="closed"){


		// 	}



			// issuesArrayWithSameEpicArray.push(this.state.epicsArray[i])
			// epicName=this.state.epicsArray[i].fields.epic.name
		
		  }
		
		

			

	
	
	}

	render() {

		return (
			<div className="col-md-12 padding0">
				<div className="textAlignCenter titleBackgroundColor">
				<h3>Epic Details</h3>
					</div>
				

				<div className="col-md-12 col-lg-12 padding0">

					<Table height={this.state.height}>
						<TableHeader displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={false}>
							<TableRow>
								<TableHeaderColumn>Epic Name</TableHeaderColumn>
								<TableHeaderColumn>Done</TableHeaderColumn>
								<TableHeaderColumn>To Do</TableHeaderColumn>
								<TableHeaderColumn>In Qa</TableHeaderColumn>
								<TableHeaderColumn>In Progress</TableHeaderColumn>
								<TableHeaderColumn>In Code Review</TableHeaderColumn>

							</TableRow>
						</TableHeader>
						<TableBody displayRowCheckbox={this.state.showCheckboxes}>
							{this.state.issuesArray.map((epic, index) => (
								<TableRow key={index}>
									{/* <TableRowColumn>{index}</TableRowColumn> */}
									<TableRowColumn>{epic.name}</TableRowColumn>
									<TableRowColumn>{epic.done}      </TableRowColumn>
									<TableRowColumn>{epic.toDo}</TableRowColumn>
									<TableRowColumn>{epic.inQa}      </TableRowColumn>
									<TableRowColumn>{epic.inProgress}</TableRowColumn>
									<TableRowColumn>{epic.inCodeReview}</TableRowColumn>

								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>



			</div>




		)
	}
}

class PeoplesList extends React.Component {
	_
	constructor(props) {
		super(props)

		this.state = {

			peoplesArray: [],
			showCheckboxes: false,

		}


	}

	componentWillMount() {

		this.setState({ peoplesArray: this.props.peoplesList })

	}

	render() {

		return (
			<div className="col-md-12 padding0">
				<div className="textAlignCenter titleBackgroundColor">
				<h3 >Team Details</h3>
					</div>

			

				<div className="col-md-12 col-lg-12 padding0">

					<Table>
						<TableHeader displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={false}>
							<TableRow>
								<TableHeaderColumn>Name</TableHeaderColumn>
								<TableHeaderColumn>Role</TableHeaderColumn>
								<TableHeaderColumn>Email ID</TableHeaderColumn>
							</TableRow>
						</TableHeader>
						<TableBody displayRowCheckbox={this.state.showCheckboxes}>
							{this.state.peoplesArray.map((people, index) => (
								<TableRow key={index}>
									<TableRowColumn>{people.name}</TableRowColumn>
									<TableRowColumn>{people.role}</TableRowColumn>
									<TableRowColumn>{people.emailid}</TableRowColumn>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>



			</div>




		)
	}
}
export default Account;