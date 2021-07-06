import React, {Component} from "react";
import {connect} from "react-redux";
import {deleteAllShows, findShowsByTitle, retrieveShows,} from "../actions/shows";
import {Link} from "react-router-dom";
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
            currentIndex: 0,
            searchTitle: "",
        };
    }

    componentDidMount() {
        this.props.retrieveShows();
    }

    onChangeSearchTitle(e) {
        this.setState({searchTitle: e.target.value});
        var searchTitle = e.target.value;
        this.props.findShowsByTitle(e.target.value);
        this.refreshData();
    }

    refreshData() {
        this.setState({
            currentShow: null,
            currentIndex: 0,
        });
    }

    setActiveShow(show, index) {
        this.setState({
            currentShow: show,
            currentIndex: index,
        });
    }

    removeAllShows() {
        window.confirm("Are you sure you wish to delete all show, it will not be able to recover?") &&
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
        const {searchTitle, currentShow, currentIndex} = this.state;
        const {shows} = this.props;
        var days = "";
        if (currentShow) {
            for (var day of currentShow.weekday) {
                if (day != currentShow.weekday[currentShow.weekday.length - 1]) {
                    days += day + ", ";
                } else {
                    days += day;
                }
            }
        }
        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="search"
                            className="form-control"
                            placeholder="Search by title"
                            value={this.state.searchTitle}
                            onChange={this.onChangeSearchTitle}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Shows List</h4>
                    <ul className="list-group">
                        {shows &&
                        shows.map((show, index) =>
                            (
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
                <div className="col-md-6 ">
                    {currentShow ? (
                        <div className="info-list">
                            <h4 style={{textTransform:"uppercase",textAlign: "center"}}>{currentShow.title}</h4>
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
                                {days}
                            </div>
                            <div>
                                <label>
                                    <strong>Status:</strong>
                                </label>{" "}
                                {currentShow.status ? "Active" : "Deactivate"}
                            </div>
                            <div>
                                <Link to={"/shows/" + currentShow.id}
                                    className="m-3 btn btn btn-primary"
                                    >
                                    Edit
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <br/>
                            <p>Please click on a show to see info details</p>
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