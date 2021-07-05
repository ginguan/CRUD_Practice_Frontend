import React, { Component } from "react";
import { connect } from "react-redux";
import { updateShow, deleteShow } from "../actions/shows";
import ShowDataService from "../services/show.service";

class Show extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getShow = this.getShow.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.updateContent = this.updateContent.bind(this);
        this.removeShow = this.removeShow.bind(this);

        this.state = {
            currentShow: {
                id: null,
                title: "",
                description: "",
                network:"",
                weekday:[],
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
            weekday:this.state.currentShow.weekday
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

                            <div className="form-group">
                                <label>
                                    <strong>Status:</strong>
                                </label>
                                {currentShow.published ? "Published" : "Pending"}
                            </div>
                        </form>

                        {currentShow.published ? (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updateStatus(false)}
                            >
                                UnPublish
                            </button>
                        ) : (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updateStatus(true)}
                            >
                                Publish
                            </button>
                        )}

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
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Show...</p>
                    </div>
                )}
            </div>
        );
    }
}

export default connect(null, { updateShow, deleteShow })(Show);