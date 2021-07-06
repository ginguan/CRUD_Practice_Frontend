import React, { Component } from "react";
import { connect } from "react-redux";
import { updateShow, deleteShow } from "../actions/shows";
import ShowDataService from "../services/show.service";
import {Multiselect} from "multiselect-react-dropdown";

class Show extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getShow = this.getShow.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.onChangeWeekday = this.onChangeWeekday.bind(this);
        this.onChangeStatus= this.onChangeStatus.bind(this);
        this.updateContent = this.updateContent.bind(this);
        this.removeShow = this.removeShow.bind(this);
        this.initWeekday = this.initWeekday.bind(this);
        this.state = {
            weekdayOptions: [{name: 'Monday',id:2}, {name: 'Tuesday',id:3}, {name: 'Wednesday',id:4}, {name: 'Thursday',id:1}, {name: 'Friday',id:5}, {name: 'Saturday',id:6}, {name: 'Sunday',id:7}],
            currentShow: {
                id: null,
                title: "",
                description: "",
                network:"",
                weekday:[],
                weekdayToOption1: [],
                status:false,
                },
            message: "",
        };
    }

    componentDidMount() {
        this.getShow(this.props.match.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function (prevState) {
            return {
                currentShow: {
                    ...prevState.currentShow,
                    title: title,
                },
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState((prevState) => ({
            currentShow: {
                ...prevState.currentShow,
                description: description,
            },
        }));
    }

    getShow(id) {
        ShowDataService.get(id)
            .then((response) => {
                this.setState({
                    currentShow: response.data,
                });
                console.log(response.data);
                this.initWeekday()
            })
            .catch((e) => {
                console.log(e);
            });
    }

    updateStatus(status) {
        var data = {
            id: this.state.currentShow.id,
            title: this.state.currentShow.title,
            description: this.state.currentShow.description,
            status: this.state.currentShow.status,
            network:this.state.currentShow.network,
            weekday:this.state.currentShow.weekday,
            weekdayToOption1:this.state.currentShow.weekdayToOption1,
            weekdayOptions:this.state.weekdayOptions,
        };

        this.props
            .updateShow(this.state.currentShow.id, data)
            .then((reponse) => {
                console.log(reponse);
                this.setState((prevState) => ({
                    currentShow: {
                        ...prevState.currentShow,
                        published: status,
                    },
                }));

                this.setState({ message: "The status was updated successfully!" });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    updateContent() {
        this.props
            .updateShow(this.state.currentShow.id, this.state.currentShow)
            .then((reponse) => {
                console.log(reponse);

                this.setState({ message: "The show was updated successfully!" });
            })
            .catch((e) => {
                console.log(e);
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
        this.setState((prevState) => ({
            currentShow: {
                ...prevState.currentShow,
                weekdayToOption1:values,
                weekday:stringValues
            },
        }));
        console.log("try",this.state.currentShow.weekdayToOption1)
    }
    initWeekday(){
        const temp = [];
        for (var i =0; i < this.state.weekdayOptions.length; i++) {
            if(this.state.currentShow.weekday.includes(this.state.weekdayOptions[i].name)){
                temp.push(this.state.weekdayOptions[i]);
                this.setState((prevState) => ({
                    currentShow: {
                        ...prevState.currentShow,
                        weekdayToOption1:temp
                    },
                }));
            }
        }

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

    removeShow() {
        this.props
            .deleteShow(this.state.currentShow.id)
            .then(() => {
                this.props.history.push("/shows");
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        const { currentShow } = this.state;
        console.log("currentShow",currentShow)
        return (
            <div>
                {currentShow ? (
                    <div className="edit-form">
                        <h4>Show</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentShow.title}
                                    onChange={this.onChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentShow.description}
                                    onChange={this.onChangeDescription}
                                />
                            </div>
                            <div className="form-group divide">
                                <label htmlFor="network">Network</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="network"
                                    required
                                    value={currentShow.network}
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
                                    selectedValues={this.state.currentShow.weekdayToOption1}
                                    displayValue="name"
                                    onSelect={this.onChangeWeekday}
                                    onRemove={this.onChangeWeekday}
                                />
                            </div>
                            {currentShow.status ?
                                (<div className="form-group">
                                        <label htmlFor="status">Status</label>
                                        <select name="status" id="status" className="form-control"
                                                onChange={this.onChangeStatus}>
                                            <option selected>Active</option>
                                            <option>Deactive</option>
                                        </select></div>
                                ) :
                                (
                                    <div className="form-group">
                                        <label htmlFor="status">Status</label>
                                        <select name="status" id="status" className="form-control"
                                                onChange={this.onChangeStatus}>
                                            <option>Active</option>
                                            <option selected>Deactive</option>
                                        </select></div>
                                )}

                        </form>



                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.removeShow}
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateContent}
                        >
                            Update
                        </button>
                    </div>
                ) : (
                    <div>
                        <br />
                    </div>
                )}
            </div>
        );
    }
}

export default connect(null, { updateShow, deleteShow })(Show);