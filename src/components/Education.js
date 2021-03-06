import React from "react";
import {ReactComponent as EducationLogo} from "../assets/school.svg";
import uniqid from "uniqid";
import EducationOverview from "./EducationOverview";
import EducationOverviewDesc from "./EducationOverViewDesc";

class Education extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            addingMode: false,
            newInfo: {
                university: "",
                degree: "",
                dateFrom: "",
                dateTo: "",
                descriptions: [],
                newDesc: {
                    info: "",
                    id: uniqid(),
                },
                infoID: uniqid(),
            },
            Infos: [],
        }
    }

    addNewExperience = (e) =>{
        this.setState({
            addingMode: true,
        })
    }

    stopAddingExperience = (e) => {
        this.setState({
            addingMode: false,
        })
    }

    addDescriptions = (e) =>{
        if(e.keyCode !== 13){return;}
        if(e.keyCode === 13 &&  !e.target.value){
            e.preventDefault();
            return;
        }
        e.preventDefault();
        
        this.setState({
            newInfo: {
                ...this.state.newInfo,
                descriptions: this.state.newInfo.descriptions.concat(this.state.newInfo.newDesc),
                newDesc: {
                    info:  "",
                    id: uniqid(),
                },
            }
        })
    }

    handleUniChange = (e) => {
        this.setState({
            newInfo: { 
                ...this.state.newInfo,
                university: e.target.value,
            }
        });
    }

    handleDegreeChange = (e) => {
        this.setState({
            newInfo: {
                ...this.state.newInfo,
                degree: e.target.value,
            }
        });
    }

    handleDateFromChange = (e) => {
        this.setState({
            newInfo: {
                ...this.state.newInfo,
                dateFrom: e.target.value,
            }
        })
    }
    handleDateToChange = (e) => {
        this.setState({
            newInfo: {
                ...this.state.newInfo,
                dateTo: e.target.value,
            }
        });
    }

    handleDescriptionChange = (e) => {
        this.setState({
            newInfo: {
                ...this.state.newInfo,
                newDesc: {
                    info:  e.target.value,
                    id: this.state.newInfo.newDesc.id,
                },
            }
        });
    }

    onSubmission = (e) => {
        e.preventDefault();
        this.setState({
            addingMode: false,
            Infos: this.state.Infos.concat(this.state.newInfo),
            newInfo: {
                university: "",
                degree: "",
                dateFrom: "",
                dateTo: "",
                descriptions: [],
                newDesc: {
                    info: "",
                    id: uniqid(),
                },
                infoID: uniqid(),
            }
        })
    }

    deleteInfo = (e, targetID) => {
        this.setState({
            Infos: this.state.Infos.filter(infos => !(infos.infoID === targetID)),
        })
    }

    render(){
        const addingMode = this.state.addingMode;
        let whatState;
        if(this.props.previewMode === "ON"){
            whatState = null;
        }else{
            if(addingMode){
                whatState = <AddingState tempInfo = {this.state.newInfo} descriptions = {this.state.newInfo.descriptions} handleSubmission = {this.onSubmission} handleUniChange = {this.handleUniChange} handleDegreeChange = {this.handleDegreeChange} handleDateFromChange = {this.handleDateFromChange} handleDateToChange = {this.handleDateToChange} handleDescriptionChange = {this.handleDescriptionChange} handleAdd={this.addDescriptions} handleRemove={this.stopAddingExperience}/>;
            }else{
                whatState = <DefaultState handleClick={this.addNewExperience}/>;
            }
        }

        return (
            <div className="education">
                <div className="education-header">
                    <EducationLogo alt="education" width="35" height="35" />
                    <h3>Education</h3>
                </div>
                <EducationOverview previewMode = {this.props.previewMode} allInfo = {this.state.Infos} handleRemove={this.deleteInfo}/>
                {whatState}
            </div>
        )
    }
}

function DefaultState(props){
    return (
        <div className="education-default-state">
            <button onClick={props.handleClick}>+ Education</button>
        </div>
    )
}

function AddingState(props){
    return(
        <form className="educationForm" method="post" onSubmit={props.handleSubmission}>
            <div>
                <label htmlFor="university">University</label>
                <input type="text" id="university" name="university" value={props.tempInfo.university} onChange={props.handleUniChange}></input>
            </div>
            <div>
                <label htmlFor="degree">Degree</label>
                <input type="text" id="degree" name="degree" value={props.tempInfo.degree} onChange = {props.handleDegreeChange}></input>
            </div>
            <div>
                <label htmlFor="dateFrom">From</label>
                <input type="text" id="dateFrom" name="dateFrom" placeholder="YYYY-MM" value={props.tempInfo.dateFrom} onChange={props.handleDateFromChange}></input>
            </div> 
            <div>
                <label htmlFor="dateTo">To</label>
                <input type="text" id="dateTo" name="dateTo" placeholder="YYYY-MM or Present" value={props.tempInfo.dateTo} onChange={props.handleDateToChange}></input>
            </div>
            <div className="descriptionField">
                <label htmlFor="description">Noteable description/achievements</label>
                <EducationOverviewDesc descriptions = {props.descriptions}/>
                <textarea value={props.tempInfo.newDesc.info} id="description" name="description" onChange={props.handleDescriptionChange} onKeyDown={props.handleAdd}></textarea>
            </div>
            <button>Add</button>
            <button onClick={props.handleRemove}>Cancel</button>
        </form>
    );
}

export default Education;