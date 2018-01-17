import React from 'react';
import './App.css';
import { Navbar, NavbarBrand, Button, Popover, OverlayTrigger } from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
//import 'bootstrap/dist/css/bootstrap.min.css';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentClear from 'material-ui/svg-icons/content/clear';
import ContentEdit from 'material-ui/svg-icons/editor/mode-edit';
import {myConstClass} from './constants.js';

const customStyles = {
    content: {
        top: '50%',
        left: '61%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: "0px"
    }
};
const customStylesJumpStart = {
    content: {
        top: '50%',
        left: '60%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: "0px",
        width: "615px",
        height: "291px"
    }
};

const imageStyle = {

    top: "-2px",
    marginLeft: "-12px"
}
const innerDiv = {
    padding: "0px"
}

const buttonStyle = {
    marginRight: '5px'
}
const modelbuttonsStyle = {
    backgroundColor:'#f0f8ff',
    paddingRight: '10px',
    boxShadow:'none'
}

const addAccountBUtton = {
    height: "20px",
    width: "20px"
}
const editbuttonStyle={
    marginLeft: "50%"
}
const addProjectButtonstyle={
    marginLeft: "64%"
}
const addAcountstyle = {
    marginLeft: "61%"
}
const addProjectstyle = {
    marginLeft: "66%"
}
const tableConfigBUtton = {
    paddingLeft: "0px"
}
const editProjectButton = {
    height: "20px",
    width: "20px"

}
const deleteProjectButton = {
    height: "20px",
    width: "20px"
}
class manageCustomerTeams extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDashboardItem: false,
            currentSelectedDashboardItem: 'customerTeams',
            value: 1,
            newCustomerDetails: {},
            accountsArray: [],
            accountDetails: '',
            selectedAccountIndex:''
        }
        this.createAccount = this.createAccount.bind(this);
        this.openSideMenu = this.openSideMenu.bind(this);
        this.closeSideMenu = this.closeSideMenu.bind(this);
        this.selectedDashboardItem = this.selectedDashboardItem.bind(this);
        this.addNewAccount = this.addNewAccount.bind(this);
        this.currentAccountProfile = this.currentAccountProfile.bind(this);
        this.handleNewCustomerChange = this.handleNewCustomerChange.bind(this);
        this.handleProject = this.handleProject.bind(this);
        this.handleAccountName = this.handleAccountName.bind(this);
        this.reset = this.reset.bind(this);
        this.closeNewAccount = this.closeNewAccount.bind(this);
    }
    handleAccountName(accountName) {
        var tempAccountsArray = this.state.accountsArray.slice();
        tempAccountsArray[this.state.selectedAccountIndex].customerName= accountName.customerName;
        this.setState({
            accountsArray:tempAccountsArray
        })
     // this.state.accountsArray[this.state.selectedAccountIndex].customerName=accountName.customerName
        
        // this.setState({accountsArray:accountName.customerName})

    }
    handleProject(accountName) {

        var tempAccountsArray = this.state.accountsArray.slice();
        tempAccountsArray[this.state.selectedAccountIndex].customerName = accountName.customerName;
        this.setState({
            accountsArray: tempAccountsArray
        })
       // this.state.accountsArray[this.state.selectedAccountIndex].customerName = accountName.customerName
    }
    currentAccountProfile(currentAccountDetails, index) {
        axios.get(myConstClass.nodeAppUrl+'/accounts/'+currentAccountDetails._id)
        .then(response => {
           
            //this.setState({ accountsArray: this.state.accountsArray.concat(response.data) })
            this.setState(
                {
                    selectedAccountIndex: index,
                    accountDetails: <AccountDetails selectedAccount={response.data} onSelectProject={this.handleProject} onUpdateProject={this.handleAccountName} />
                }
            )

        })
      
    }
    addNewAccount(newCustomerDetailsObject) {



        axios.post(myConstClass.nodeAppUrl+`/accounts`,
            {
                customerName: newCustomerDetailsObject.customerName,
                startDate: '13/12/2017',
                endDate: '13/12/2017',
                engagementModel: newCustomerDetailsObject.engagementModel,
                pricingModel: newCustomerDetailsObject.pricingModel,
                seniorSupplier: 'asewr',
                projectManager: 'jg',
                projects: [],
                people: [],
                customerLogo: newCustomerDetailsObject.customerLogo,
                status: 'Active'
            })
            .then(response => {
                
                this.state.accountsArray = this.state.accountsArray.concat(response.data)
                this.setState({ createAccountModal: false, newCustomerDetails: {} });

                //  window.sessionStorage.setItem("DashboardData", JSON.stringify(this.state.items));
            })

    }
    handleNewCustomerChange(e) {

        this.state.newCustomerDetails[e.target.name] = e.target.value

    }
    createAccount() {

        this.setState({ createAccountModal: true })
    }
    reset(){
      
     
        var tempObj={} 
        this.setState({newCustomerDetails:tempObj})
    }
    closeNewAccount(){
        this.setState({createAccountModal:false})
        this.reset()
    }
    openSideMenu() {
        document.getElementById("mySidenav").style.width = "250px";
    }
    closeSideMenu() {
        document.getElementById("mySidenav").style.width = "0px";

    }
    selectedDashboardItem(item) {

        if (this.state.currentSelectedDashboardItem !== undefined) {

            document.getElementById(this.state.currentSelectedDashboardItem).classList.remove("selectedDashboardItem");
        }
        this.state.currentSelectedDashboardItem = item.target.parentNode.id
        document.getElementById(item.target.parentNode.id).classList.add("selectedDashboardItem");
    }
    componentWillMount() {
        Modal.setAppElement('body');
        axios.get(myConstClass.nodeAppUrl+'/accounts')
            .then(response => {
             
                this.setState({ accountsArray: this.state.accountsArray.concat(response.data) })

            })

    }
    componentDidMount() {
        document.getElementById('customerTeams').classList.add("selectedDashboardItem");

    }

    render() {
             return (
            <div className="container-fluid padding0">
                <nav className="navbar navbar-fixed-top navbarBgColor navbarFontColor padding0">
                    <div className="col-md-12 flex">
                        <div className="col-md-3 col-lg-2 marginT16">
                            {/* <h4 className="margin0 pointer verticalLine" ui-sref="dashboard"><i className="glyphicon glyphicon-home"></i></h4> */}
                            <h4 className="margin0 pointer paddingL04" onClick={() => this.openSideMenu()} ><i className="glyphicon glyphicon-menu-hamburger"></i></h4>
                        </div>
                        <div className="col-md-7 col-lg-8 textAlignCenter marginT16">
                            <h4 className="margin0">Manage Customer Teams</h4>
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

                <div id="mySidenav" className="sidenav">
                    <div href="javascript:void(0)" className="closebtn pointer" onClick={() => this.closeSideMenu()}>&times;</div>

                    <div id="customerTeams" className="navbarFontColor pointer  dashboardMenuHeight marginT22 paddingT1"
                        onClick={(e) => this.selectedDashboardItem(e)}>
                        <h5><i className="glyphicon glyphicon-group "></i>Manage Customer Teams</h5>
                    </div>

                    <div id="humanResource" className="navbarFontColor pointer  dashboardMenuHeight paddingT1"
                        onClick={(e) => this.selectedDashboardItem(e)}>
                        <h5><i className="glyphicon glyphicon-user "></i>User Administration</h5>

                    </div>
                    <div id="knowledgeRep0" className="navbarFontColor pointer  dashboardMenuHeight paddingT1"
                        onClick={(e) => this.selectedDashboardItem(e)}>
                        <h5><i className="glyphicon glyphicon-book-open"></i>Manage Knowledge Repo</h5>


                    </div>

                    <div id="settings" className="navbarFontColor pointer  dashboardMenuHeight paddingT1"
                        onClick={(e) => this.selectedDashboardItem(e)}>
                        <h5><i className="glyphicon glyphicon-cogwheel "></i>Application Settings</h5>

                    </div>
                    <div id="logOut" className="navbarFontColor pointer  dashboardMenuHeight paddingT1"
                        onClick={(e) => this.selectedDashboardItem(e)}>
                        <h5><i className="glyphicon glyphicon-log-off "></i>Log Out</h5>

                    </div>

                </div>

                <div className="row">
                    <div className="col-md-12 col-lg-12 marginT50 padding0">
                        <div className="col-md-3 col-lg-2 borderRight marginR0 padding0 verticalHeight">
                                 <div className="col-md-10 col-lg-10 textAlignLeft borderBottom">
                                     <h5 className="marginT0 font fontSize17 paddingT2">Account </h5>
                                 </div>
                                 <div className="col-md-2 col-lg-2 textAlignCenter borderBottom paddingT3 paddingB7 paddingL0">
                                 <FloatingActionButton mini={true} secondary={true} iconStyle={addAccountBUtton} onClick={() => this.createAccount()} style={addAcountstyle} >
                                 <ContentAdd />
                             </FloatingActionButton>

                                 </div>
                    

                            <div className="col-md-12 col-lg-12">
                           
                                    {this.state.accountsArray.map((item, index) => (
                                        <div className="textAlignLeft pointer" key={item._id} onClick={() => this.currentAccountProfile(item, index)}>{item.customerName}</div>
                                    ))}
                             
                            </div>
                             </div>

                       
                        <div className="col-md-9 col-lg-10 padding0 marginT2">
                            {this.state.accountDetails}
                        </div>
                     
                    </div>

                </div>
                <Modal isOpen={this.state.createAccountModal} style={customStyles} className={["col-md-6 col-lg-5 modalMargins overlay "].join(' ')}>

                    <div className="row">
                        <div className="col-md-12 col-lg-12">
                            <h1 className="marginT0">Account Details</h1>
                        </div>
                    </div>

                    <div className="textAlignLeft">
                        <div className="row margin0">
                            <div className="col-md-5 margin10"><label>CustomerID:</label></div>
                            <div className="col-md-6 custId">
                                <input value={this.state.newCustomerDetails.customerID} name='customerID' onChange={this.handleNewCustomerChange} />
                            </div>

                        </div>
                        <div className="row margin0">
                            <div className="col-md-5 margin10"><label>Customer Name:</label></div>
                            <div className="col-md-6">
                                <input value={this.state.newCustomerDetails.customerName} name='customerName' onChange={this.handleNewCustomerChange} />
                            </div>

                        </div>
                        <div className="row margin0">
                            <div className="col-md-5 margin10"><label>Status:</label></div>
                            <div className="col-md-6">
                                <SelectField value={this.state.value} name='status' onChange={this.handleNewCustomerChange}>
                                    <MenuItem value={1} primaryText="Active" />
                                    <MenuItem value={2} primaryText="Finished" />

                                </SelectField>
                            </div>

                        </div>
                        <div className="row margin0">
                            <div className="col-md-5 margin10"><label>Engagement Model:</label></div>
                            <div className="col-md-6">
                                <input value={this.state.newCustomerDetails.engagementModel} name='engagementModel' onChange={this.handleNewCustomerChange} />
                            </div>

                        </div>
                        <div className="row margin0">
                            <div className="col-md-5 margin10"><label>Pricing Model:</label></div>
                            <div className="col-md-6">
                                <input value={this.state.newCustomerDetails.pricingModel} name='pricingModel' onChange={this.handleNewCustomerChange} />
                            </div>

                        </div>
                        <div className="row margin0">
                            <div className="col-md-5 margin10"><label>Logo:</label></div>
                            <div className="col-md-6">
                                <input value={this.state.newCustomerDetails.customerLogo} name='customerLogo' onChange={this.handleNewCustomerChange} />
                            </div>

                        </div>


                        <div className="loginBtns backgroundcolor marginT10">

                            <div className="textAlignCenter">
                                {/* <RaisedButton label="Next" primary={true} buttonStyle={buttonStyle} onClick={() => this.addNewCustomer(this.state.newCustomerDetails)} /> */}
                                <RaisedButton label="Close" secondary={true} style={modelbuttonsStyle} onClick={() => this.closeNewAccount()} />
                                <RaisedButton label="Reset" default={true} style={modelbuttonsStyle} onClick={() => this.reset()} />
                                <RaisedButton label="Submit" primary={true} style={modelbuttonsStyle} onClick={() => this.addNewAccount(this.state.newCustomerDetails)} />
                            </div>



                        </div>

                    </div>

                </Modal>
            </div>


        )

    }
}

class AccountDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newProjectDetails: {},
            projectList: [],
          //  projectNameList: this.props.selectedAccount.projects,
            configureTools: [
                { "id": 1, "name": "Wiki" },
                { "id": 2, "name": "Issue Management" },
            ],
            selectTool: '',
            currentAccount: this.props.selectedAccount,
            selectedProjectIndex:'',
            selectedItemName:'',
            selectedItemIndex:''
              }

        this.createProject = this.createProject.bind(this);
        this.addNewProject = this.addNewProject.bind(this);
        this.newProjectDetails = this.newProjectDetails.bind(this);
        this.configJumpStart = this.configJumpStart.bind(this);
        this.editAccount = this.editAccount.bind(this);
        this.updateAccount = this.updateAccount.bind(this);
        this.handleNewCustomerChange = this.handleNewCustomerChange.bind(this);
        this.closeEditAccountModal = this.closeEditAccountModal.bind(this);
        
        this.closeJumpStartModel = this.closeJumpStartModel.bind(this);
     }
    
    componentWillReceiveProps(nextProps) {
    
        this.setState({
            currentAccount: nextProps.selectedAccount
        })
    }
    
    handleNewCustomerChange(e) {
        var currentAccountObj = this.state.currentAccount;
        currentAccountObj[e.target.name] = e.target.value
        this.setState(
            {
                currentAccount: currentAccountObj
            }

        )

    }
    editAccount() {
        this.setState({ editAccountModal: true })
    }
    closeEditAccountModal(){
        this.setState({ editAccountModal: false })
    }
    updateAccount(newCustomerDetailsObject) {
       
        axios.put(myConstClass.nodeAppUrl+`/accounts/` + newCustomerDetailsObject._id,
            {
                customerName: newCustomerDetailsObject.customerName,
                startDate: '13/12/2017',
                endDate: '13/12/2017',
                engagementModel: newCustomerDetailsObject.engagementModel,
                pricingModel: newCustomerDetailsObject.pricingModel,
                seniorSupplier: 'asewr',
                projectManager: 'jg',
                projects:newCustomerDetailsObject.projects,
                people: [],
                customerLogo: newCustomerDetailsObject.customerLogo,
                status: 'Active'
            })
            .then(response => {
         
                this.props.onUpdateProject(response.data);
                this.setState({ currentAccount: response.data, createAccountModal: false });

            })

    }
    newProjectDetails(e) {
        this.state.newProjectDetails[e.target.name] = e.target.value
    }
    createProject() {
        this.setState({ createProjectModel: true })
    }
   
    addNewProject(newProjectObject) {
       // var newProjectObject

      //  newProjectObject.tools = [{name:'',type:'',userName:'',password:'',hostedURL:'',index:0}]


        var tempAccountsArray = this.state.currentAccount.projects.slice();

        this.state.projectList = tempAccountsArray.concat(newProjectObject)
     

        this.setState({ projectList: this.state.projectList, newProjectDetails: {} })

        axios.put(myConstClass.nodeAppUrl+`/accounts/` + this.state.currentAccount._id,
            {
                customerName: this.state.currentAccount.customerName,
                startDate: '13/12/2017',
                endDate: '13/12/2017',
                engagementModel: this.state.currentAccount.engagementModel,
                pricingModel: this.state.currentAccount.pricingModel,
                seniorSupplier: 'asewr',
                projectManager: 'jg',
                projects: this.state.projectList,
                people: [],
                customerLogo: this.state.currentAccount.customerLogo,
                status: 'Active'
            })
            .then(response => {

                this.props.onSelectProject(response.data);
                this.setState({ currentAccount: response.data, createProjectModel: false, newProjectDetails: {} })
                // this.state.accountsArray = this.state.accountsArray.concat(response.data)
                // this.setState({ createAccountModal: false, newCustomerDetails: {} });

                //  window.sessionStorage.setItem("DashboardData", JSON.stringify(this.state.items));
            })


    }
    closeCreateProjectModel(){
        this.setState({createProjectModel:false,newCustomerDetails:{}})
    }

    configJumpStart(projectIndex) {
        if(this.state.currentAccount.projects[projectIndex].tools==undefined){
            this.setState({jumpStartConfigModel: true,selectedProjectIndex:projectIndex})
        }
              
        
        if(this.state.currentAccount.projects[projectIndex].tools !== undefined){
            this.setState({ jumpStartConfigModel: true,selectedProjectIndex:projectIndex,selectTool: <ToolConfigurationDetails  selectedAccount={this.state.currentAccount}
                selectedProjectIndex={projectIndex} selectedJumpStartIndex={0}/>})
        }
        
    }

    currentItem(selectedItemName, selectedItemIndex) {
        //this.setState({selectedItemName:selectedItemName,selectedItemIndex:selectedItemIndex})
              var tempArray = this.state.currentAccount

        if (tempArray.projects[this.state.selectedProjectIndex].tools == undefined) {
    
            tempArray.projects[this.state.selectedProjectIndex].tools = []
            var emptyToolsobject = { name: '', type: '', userName: '', password: '', hostedURL: '', index: 0 }
            tempArray.projects[this.state.selectedProjectIndex].tools[selectedItemIndex] = emptyToolsobject
                   this.setState({ currentAccount: tempArray })
        }

        if (tempArray.projects[this.state.selectedProjectIndex].tools !== undefined) {
            
            if (tempArray.projects[this.state.selectedProjectIndex].tools[selectedItemIndex] == undefined) {
            
                var emptyToolsobject = { name: '', type: '', userName: '', password: '', hostedURL: '', index: 0 }
                tempArray.projects[this.state.selectedProjectIndex].tools[selectedItemIndex] = emptyToolsobject
                          this.setState({ currentAccount: tempArray })
            }

            tempArray.projects[this.state.selectedProjectIndex].tools[selectedItemIndex].index = selectedItemIndex
            tempArray.projects[this.state.selectedProjectIndex].tools[selectedItemIndex].type = selectedItemName
             this.setState({ currentAccount: tempArray })

        }
      
        this.setState({
            selectTool: <ToolConfigurationDetails selectedAccount={this.state.currentAccount}
                selectedProjectIndex={this.state.selectedProjectIndex} selectedItemName={selectedItemName}
                selectedJumpStartIndex={selectedItemIndex} onSelectItem={this.handleJumpStartChange} />
        });

    }
    closeJumpStartModel(){
        this.setState({jumpStartConfigModel:false})
    }
   

  
    render() {
       
        return (
            <div>
                <div className="col-md-12 col-lg-12 borderBottom">
                    <div className="col-md-10 col-lg-10 textAlignCenter">
                        <h5 className="marginT0 font fontSize17">Account Details </h5>
                    </div>
                    <div className="col-md-2 col-lg-2 textAlignCenter">

                        <FloatingActionButton mini={true} iconStyle={addAccountBUtton} style={editbuttonStyle} onClick={() => this.editAccount()}>
                            <ContentEdit />
                        </FloatingActionButton>

                    </div>

                </div>
                <div className="col-md-6 col-lg-6 marginB04">
                    <label className="flex">Account Name:<h5 className="textAlignCenter font fontSize17 marginT0 paddingT1">{this.state.currentAccount.customerName}</h5></label>
                </div>
                <div className="col-md-6 col-lg-6 marginB04">
                    <label className="flex">Status:<h5 className="textAlignCenter font fontSize17 marginT0 paddingT1">{this.state.currentAccount.status}</h5></label>
                </div>
                <div className="col-md-6 col-lg-6 marginB04">
                    <label className="flex">Start Date:<h5 className="textAlignCenter font fontSize17 marginT0 paddingT1">{this.props.selectedAccount.startDate}</h5></label>
                </div>
                <div className="col-md-6 col-lg-6 marginB04">
                    <label className="flex">End Date:<h5 className="textAlignCenter font fontSize17 marginT0 paddingT1">{this.state.currentAccount.endDate}</h5></label>
                </div>
                <div className="col-md-12 col-lg-12 borderBottom">
                    <div className="col-md-10 col-lg-10 textAlignCenter">
                        <h5 className="marginT0 font fontSize17">Projects</h5>
                    </div>
                    <div className="col-md-2 col-lg-2 textAlignCenter">

                    <FloatingActionButton mini={true} secondary={true} iconStyle={addAccountBUtton} onClick={() => this.createProject()} style={addProjectButtonstyle} >
                    <ContentAdd />
                </FloatingActionButton>

                    </div>

                </div>
                {/* <div>
                    <h5 className="accountProjectProfileheading paddingL41 font fontSize17 paddingL40">Projects
                                <FloatingActionButton mini={true} secondary={true} iconStyle={addAccountBUtton} onClick={() => this.createProject()} style={addProjectButtonstyle} >
                            <ContentAdd />
                        </FloatingActionButton>
                    </h5>
                </div> */}
                <div className="col-md-12 col-lg-12 padding0">
                   
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>Project Name</TableHeaderColumn>
                            <TableHeaderColumn>Jump Start</TableHeaderColumn>
                            <TableHeaderColumn>People</TableHeaderColumn>
                            <TableHeaderColumn>ACE5</TableHeaderColumn>
                            <TableHeaderColumn>Actions</TableHeaderColumn>

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {this.state.currentAccount.projects.map((project, index) => (
                            <TableRow key={index}>
                                {/* <TableRowColumn>{index}</TableRowColumn> */}
                                <TableRowColumn>{project.projectName}</TableRowColumn>
                                <TableRowColumn style={tableConfigBUtton}>
                                    <RaisedButton label="configure" primary={true} onClick={() => this.configJumpStart(index)} />

                                </TableRowColumn>
                                <TableRowColumn style={tableConfigBUtton}>
                                    <RaisedButton label="configure" secondary={true} onClick={() => this.configPeople(project)} />
                                </TableRowColumn>
                                <TableRowColumn style={tableConfigBUtton}>
                                    <RaisedButton label="configure" default={true} onClick={() => this.configACES5(project)} />
                                </TableRowColumn>
                                <TableRowColumn>
                                    <FloatingActionButton mini={true} iconStyle={editProjectButton} onClick={() => this.createProject()}>

                                        <ContentEdit />


                                    </FloatingActionButton>
                                    <FloatingActionButton mini={true} secondary={true} iconStyle={deleteProjectButton} onClick={() => this.createProject()}>

                                        <ContentClear />


                                    </FloatingActionButton>

                                </TableRowColumn>



                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </div>

               
                <Modal isOpen={this.state.editAccountModal} style={customStyles} className={["col-md-6 col-lg-5 modalMargins overlay "].join(' ')}>

                    <div className="row">
                        <div className="col-md-12 col-lg-12">
                            <h1 className="marginT0">Account Details</h1>
                        </div>
                    </div>

                    <div className="textAlignLeft">
                        <div className="row margin0">
                            <div className="col-md-5 margin10"><label>CustomerID:</label></div>
                            <div className="col-md-6 custId">
                                <input value={this.state.currentAccount.customerID} name='customerID' onChange={this.handleNewCustomerChange} />
                            </div>



                        </div>
                        <div className="row margin0">
                            <div className="col-md-5 margin10"><label>Customer Name:</label></div>
                            <div className="col-md-6">
                                <input value={this.state.currentAccount.customerName} name='customerName' onChange={this.handleNewCustomerChange} />
                            </div>

                        </div>
                        <div className="row margin0">
                            <div className="col-md-5 margin10"><label>Status:</label></div>
                            <div className="col-md-6">
                                <SelectField value={this.state.value} name='status' onChange={this.handleNewCustomerChange}>
                                    <MenuItem value={1} primaryText="Active" />
                                    <MenuItem value={2} primaryText="Finished" />

                                </SelectField>
                            </div>

                        </div>
                        <div className="row margin0">
                            <div className="col-md-5 margin10"><label>Engagement Model:</label></div>
                            <div className="col-md-6">
                                <input value={this.state.currentAccount.engagementModel} name='engagementModel' onChange={this.handleNewCustomerChange} />
                            </div>

                        </div>
                        <div className="row margin0">
                            <div className="col-md-5 margin10"><label>Pricing Model:</label></div>
                            <div className="col-md-6">
                                <input value={this.state.currentAccount.pricingModel} name='pricingModel' onChange={this.handleNewCustomerChange} />
                            </div>

                        </div>
                        <div className="row margin0">
                            <div className="col-md-5 margin10"><label>Logo:</label></div>
                            <div className="col-md-6">
                                <input value={this.state.currentAccount.customerLogo} name='customerLogo' onChange={this.handleNewCustomerChange} />
                            </div>

                        </div>


                        <div className="loginBtns">

                            <div>
                            <RaisedButton label="Close" secondary={true} style={modelbuttonsStyle} onClick={() => this.closeEditAccountModal()} />
                                <RaisedButton label="Done" primary={true} style={modelbuttonsStyle} onClick={() => this.updateAccount(this.state.currentAccount)} />
                            </div>



                        </div>

                    </div>

                </Modal>
                <Modal isOpen={this.state.createProjectModel} style={customStyles} className={["col-md-6 col-lg-5 modalMargins overlay "].join(' ')}>
                    <div className="row">
                        <div className="col-md-12 col-lg-12">
                            <h1 className="marginT0">Project Details</h1>
                        </div>
                    </div>

                    <div className="textAlignLeft">
                        <div className="row margin0">
                            <div className="col-md-5 margin10"><label>Project Name:</label></div>
                            <div className="col-md-6 custId">
                                <input value={this.state.newProjectDetails.projectName} name='projectName' onChange={this.newProjectDetails} />
                            </div>
                        </div>
                        <div className="loginBtns">
                            <div>
                                <RaisedButton label="Close" secondary={true} style={modelbuttonsStyle} onClick={() => this.closeCreateProjectModel()} />
                                <RaisedButton label="Done" primary={true} style={modelbuttonsStyle} onClick={() => this.addNewProject(this.state.newProjectDetails)} />
                            </div>

                        </div>

                    </div>

                </Modal>
                <Modal isOpen={this.state.jumpStartConfigModel} style={customStylesJumpStart} className={["col-md-6 modalMargins overlay "].join(' ')}>

                    <div className="row">
                        <div className="col-md-12 col-lg-12">
                            <div className="col-md-12 col-lg-12 borderBottom">
                                <h5 className="marginT0  paddingL41 font fontSize17">Jump Start
                                <FloatingActionButton mini={true} secondary={true} iconStyle={deleteProjectButton}  style={addProjectButtonstyle} onClick={() => this.closeJumpStartModel()}>

                                        <ContentClear />


                                    </FloatingActionButton>

                                </h5>
                            </div>
                            <div className="textAlignLeft col-md-3 col-lg-5 borderRight verticalHeight30">
                                {this.state.configureTools.map((item,index) => (
                                    <div className="pointer" key={item.id} onClick={() => this.currentItem(item.name,index)} >{item.name}</div>
                                ))}

                            </div>

                            <div className="col-md-7 col-lg-7">
                                {this.state.selectTool}
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>

        )

    }
}

class ToolConfigurationDetails extends React.Component {
    constructor(props) {
        super(props)
             this.state = {
           
            wikiList: [
                { "id": 1, "name": "Confluence" },
                { "id": 2, "name": "Github" }
            ],
            userConfigDetails: '',
            currentAccount:this.props.selectedAccount,
           selectedProjectIndex:this.props.selectedProjectIndex,
           selectedItemName:this.props.selectedItemName,
           selectedJumpStartIndex:this.props.selectedJumpStartIndex
             }
        this.handleChangeInJumpStart = this.handleChangeInJumpStart.bind(this);
        this.subMenuItems = this.subMenuItems.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitToolsData = this.submitToolsData.bind(this);
       
    }
    componentWillMount() {
     
        // this.setState({currentAccount:this.props.selectedAccount,selectedItemName:this.props.selectedItemName, selectedProjectIndex:this.props.selectedProjectIndex,})
        if (this.props.selectedItem == "Issue Management") {
            this.setState({
                wikiList: [
                    { "id": 1, "name": "Jira" },
                    { "id": 2, "name": "Github" }
                ], currentAccount: this.props.selectedAccount, selectedProjectIndex: this.props.selectedProjectIndex,
                selectedItemName:this.props.selectedItemName,selectedJumpStartIndex:this.props.selectedJumpStartIndex
               
     
            })

        }

        if (this.props.selectedItemName == "Wiki") {
            this.setState({
                wikiList: [
                    { "id": 1, "name": "Confluence" },
                    { "id": 2, "name": "Github" }
                ], currentAccount: this.props.selectedAccount, selectedProjectIndex: this.props.selectedProjectIndex,
                selectedItemName:this.props.selectedItemName,selectedJumpStartIndex:this.props.selectedJumpStartIndex
           
            })

        }

    }
    componentWillReceiveProps(nextProps) {
     
    
 
        if (nextProps.selectedItemName == "Issue Management") {
           
            this.setState({
                wikiList: [
                    { "id": 1, "name": "Jira" },
                    { "id": 2, "name": "Github" }
                ],currentAccount:nextProps.selectedAccount, selectedProjectIndex:nextProps.selectedProjectIndex,
                selectedItemName:nextProps.selectedAccount,selectedJumpStartIndex:nextProps.selectedJumpStartIndex
                
            })
            document.getElementById("create-course-form").reset();

        }

        if (nextProps.selectedItemName == "Wiki") {
            this.setState({
                wikiList: [
                    { "id": 1, "name": "Confluence" },
                    { "id": 2, "name": "Github" }
                ],currentAccount:nextProps.selectedAccount, selectedProjectIndex:nextProps.selectedProjectIndex,
                selectedItemName:nextProps.selectedAccount,selectedJumpStartIndex:nextProps.selectedJumpStartIndex
                
                
            })

        }

    }
    handleChangeInJumpStart(e, index, value) {
        document.getElementById("create-course-form").reset();
        // this.setState({ values: value,userConfigDetails:<USerConfigurationDetails/> });
        var tempArray=this.state.currentAccount
        tempArray.projects[this.state.selectedProjectIndex].tools[this.state.selectedJumpStartIndex].name= value
        // tempArray.projects[this.state.selectedProjectIndex].tools[0].type= this.state.selectedItemName
        // tempArray.projects[this.state.selectedProjectIndex].tools[0].index= this.state.selectedJumpStartIndex
        this.setState({currentAccount:tempArray});

    }
    handleChange(e) {
      
        var tempArray = this.state.currentAccount

        if (e.target.name == 'hostedURL') {

            tempArray.projects[this.state.selectedProjectIndex].tools[this.state.selectedJumpStartIndex].hostedURL = e.target.value

        }
        if (e.target.name == 'userName') {

            tempArray.projects[this.state.selectedProjectIndex].tools[this.state.selectedJumpStartIndex].userName = e.target.value

        }
        if (e.target.name == 'password') {

            tempArray.projects[this.state.selectedProjectIndex].tools[this.state.selectedJumpStartIndex].password = e.target.value

        }


        this.setState({ currentAccount: tempArray })
    }

 

    submitToolsData(toolsList) {
         this.setState({ currentAccount: toolsList })
      
        axios.put(myConstClass.nodeAppUrl+`/accounts/` + this.state.currentAccount._id,
            {
                customerName: this.state.currentAccount.customerName,
                startDate: '13/12/2017',
                endDate: '13/12/2017',
                engagementModel: this.state.currentAccount.engagementModel,
                pricingModel: this.state.currentAccount.pricingModel,
                seniorSupplier: 'asewr',
                projectManager: 'jg',
                projects: this.state.currentAccount.projects,
                people: [],
                customerLogo: this.state.currentAccount.customerLogo,
                status: 'Active'
            })
            .then(response => {
               
                  this.setState({currentAccount:response.data})
                 
            })
    }
 
    subMenuItems(wikiList) {
        return wikiList.map((wikiList) => (
            <MenuItem
                key={wikiList.id}
                insetChildren={true}

                value={wikiList.name}
                primaryText={wikiList.name}
            />
        ));
    }
    render() {
      
        return (

            <div>
                <form id="create-course-form">
                    <SelectField hintText="Select a Tool" value={this.state.currentAccount.projects[this.state.selectedProjectIndex].tools[this.state.selectedJumpStartIndex].name} onChange={(e, i, v) => this.handleChangeInJumpStart(e, i, v)} >
                        {this.subMenuItems(this.state.wikiList)}
                    </SelectField>
                    {/* </div>  */}

                    {/* {this.state.userConfigDetails} */}
                    <div className="col-md-12 col-lg-12">
                    
                                
                        <div className="col-md-5"><label>Hosted Url:</label></div>
                        <div className="col-md-6">
                            <input value={this.state.currentAccount.projects[this.state.selectedProjectIndex].tools[this.state.selectedJumpStartIndex].hostedURL} name='hostedURL' onChange={this.handleChange} />
                        </div>
                        <div className="col-md-5"><label>userName:</label></div>
                        <div className="col-md-6">
                            <input value={this.state.currentAccount.projects[this.state.selectedProjectIndex].tools[this.state.selectedJumpStartIndex].userName} name='userName' onChange={this.handleChange} />
                        </div>
                        <div className="col-md-5"><label>password:</label></div>
                        <div className="col-md-6">
                            <input value={this.state.currentAccount.projects[this.state.selectedProjectIndex].tools[this.state.selectedJumpStartIndex].password} name='password' onChange={this.handleChange} />
                        </div>

                    </div>
                </form>
                <div>
                    {/* <RaisedButton label="Reset" secondary={true} style={modelbuttonsStyle} onClick={() => this.closeJumpStartModel()} /> */}
                    <RaisedButton label="Submit" primary={true} buttonStyle={buttonStyle} onClick={() => this.submitToolsData(this.state.currentAccount)} />

                </div>

            </div>

        )
    }
}
class USerConfigurationDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {


        }
        this.handleChangeInJumpStart = this.handleChangeInJumpStart.bind(this);

    }
    handleChangeInJumpStart(event, index, value) {

        this.setState({ values: value });
    }

    render() {
        return (
            // <div className="col-md-6">
            <div>
                <div className="col-md-12 col-lg-12">
                    <div className="col-md-5"><label>Hosted Url:</label></div>
                    <div className="col-md-6">
                        <input value={1} name='customerName' onChange={this.handleChangeInJumpStart} />
                    </div>
                    <div className="col-md-5"><label>userName:</label></div>
                    <div className="col-md-6">
                        <input value={2} name='customerName' onChange={this.handleChangeInJumpStart} />
                    </div>
                    <div className="col-md-5"><label>password:</label></div>
                    <div className="col-md-6">
                        <input value={3} name='customerName' onChange={this.handleChangeInJumpStart} />
                    </div>
                </div>
            </div>
        )
    }
}
export default manageCustomerTeams
