import React, { Component } from "react";
import { connect } from "react-redux";
import {
    retrieveShows,
    findShowsByTitle,
    deleteAllShows,
} from "../actions/shows";
import { Link } from "react-router-dom";

class ShowsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.setActiveShow = this.setActiveShow.bind(this);
        this.findByTitle = this.findByTitle.bind(this);
        this.removeAllShows = this.removeAllShows.bind(this);
        this.state = {
            currentShow: null,
            currentIndex: -1,
            searchTitle: "",
        };
    }

    componentDidMount() {
        this.props.retrieveShows();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;
        this.setState({searchTitle: searchTitle});
    }

    refreshData() {
        this.setState({
            currentShow: null,
            currentIndex: -1,
        });
    }
    setActiveShow(show, index) {
        this.setState({
            currentShow: show,
            currentIndex: index,
        });
    }
    removeAllShows() {
        this.props
            .deleteAllShows()
            .then((response) => {
                console.log(response);
                this.refreshData();
            })
            .catch((e) => {
                console.log(e);
            });
    }

    findByTitle() {
        this.refreshData();
        this.props.findShowsByTitle(this.state.searchTitle);
    }

    render() {
        const { searchTitle, currentShow, currentIndex } = this.state;
        const { shows } = this.props;
        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.findByTitle}>
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Shows List</h4>
                    <ul className="list-group">
                        {shows &&
                        shows.map((show, index) => (
                            <li className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")}
                                onClick={() => this.setActiveShow(show, index)}
                                key={index}>
                                {show.title}
                            </li>
                        ))}
                    </ul>
                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllShows}>
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {currentShow ? (
                        <div>
                            <h4>Show</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {currentShow.title}
                            </div>
                            <div>
                                <label>
                                    <strong>Description:</strong>
                                </label>{" "}
                                {currentShow.description}
                            </div>
                            <div>
                                <label>
                                    <strong>Network:</strong>
                                </label>{" "}
                                {currentShow.network}
                            </div>
                            <div>
                                <label>
                                    <strong>Weekday:</strong>
                                </label>{" "}
                                {currentShow.weekday}
                            </div>
                            <div>
                                <label>
                                    <strong>Status:</strong>
                                </label>{" "}
                                {currentShow.status ? "Active" : "Deactivate"}
                            </div>
                            <Link
                                to={"/shows/" + currentShow.id}
                                className="badge badge-warning">
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Show...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        shows: state.shows,
    };
};

export default connect(mapStateToProps, {
    retrieveShows,
    findShowsByTitle,
    deleteAllShows,
})(ShowsList);