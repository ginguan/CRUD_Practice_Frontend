import React, {Component} from "react";
import {connect} from "react-redux";
import {createShow} from "../actions/shows";
import {Link} from "react-router-dom";
import {Multiselect} from "multiselect-react-dropdown";

class AddShow extends Component {

    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeNetwork = this.onChangeNetwork.bind(this);
        this.onChangeWeekday = this.onChangeWeekday.bind(this);
        this.onChangeStatus= this.onChangeStatus.bind(this);
        this.saveShow = this.saveShow.bind(this);
        this.newShow = this.newShow.bind(this);

        this.state = {
            id: null,
            title: "",
            description: "",
            network: "",
            weekday: [],
            status: true,
            submitted: false,
            weekdayString:[],
            weekdayOptions: [{name: 'Monday',id:2}, {name: 'Tuesday',id:3}, {name: 'Wednesday',id:4}, {name: 'Thursday',id:1}, {name: 'Friday',id:5}, {name: 'Saturday',id:6}, {name: 'Sunday',id:7}],
        };}

    onChangeTitle(e) {
        this.setState({
            title: e.target.value,
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value,
        });
    }

    onChangeNetwork(e) {
        this.setState({
            network: e.target.value,
        });
    }
    onChangeStatus(e) {
        if(e.target.value ==="Active"){
            this.setState({
                status:true,
            });
        }
        else{
            this.setState({
            status:false,
        });}
    }

    onChangeWeekday(e) {
        const values = Array.from(e, option => option);
        const stringValues = Array.from(e, option => option.name);
        this.setState({
                weekday: values,
                weekdayString:stringValues
        })
    }

    saveShow() {
        const {title, description,network,weekdayString,status} = this.state;
        this.props
            .createShow(title, description,network,weekdayString,status)
            .then((data) => {
                this.setState({
                    id: data.id,
                    title: data.title,
                    description: data.description,
                    weekdayString: data.weekdayString,
                    network: data.network,
                    status: data.status,
                    submitted: true,
                });
                console.log("data:",data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    newShow() {
        this.setState({
            id: null,
            title: "",
            description: "",
            network: "",
            weekday: [],
            status: true,
            submitted: false,
        });
    }


    render() {
        console.log("weekdayOptions",this.state.weekday)
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newShow}>
                            Continue Adding
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group divide">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                required
                                value={this.state.title}
                                onChange={this.onChangeTitle}
                                name="title"
                            />
                        </div>
                        <div className="form-group divide">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                required
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                name="description"
                            />
                        </div>
                        <div className="form-group divide">
                            <label htmlFor="network">Network</label>
                            <input
                                type="text"
                                className="form-control"
                                id="network"
                                required
                                value={this.state.network}
                                onChange={this.onChangeNetwork}
                                name="network"
                                placeholder="eg. Netflix"
                            />
                        </div>
                        <div className="divide">
                            <label htmlFor="weekday">Weekday</label>
                            <Multiselect
                                name="weekday"
                                options={this.state.weekdayOptions}
                                selectedValues={this.state.weekday}
                                displayValue="name"
                                onSelect={this.onChangeWeekday}
                                onRemove={this.onChangeWeekday}
                            />
                        </div>
                        <div className="form-group divide">
                            <label htmlFor="status">Status</label>
                            <select name="status" id="status" className="form-control" onChange={this.onChangeStatus}>
                                <option>Active</option>
                                <option>Deactive</option>
                            </select>
                        </div>
                        <div>
                        </div>
                        <Link to={"/shows"} className="btn btn-danger btn-style">Cancel</Link>
                        <button onClick={this.saveShow} className="btn btn-success btn-style">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

export default connect(null, {createShow})(AddShow);