import {CREATE_SHOW, DELETE_ALL_SHOWS, DELETE_SHOW, RETRIEVE_SHOWS, UPDATE_SHOW,} from "../actions/types";

const initialState = [];
// The shows reducer will update shows state of the Redux store
function showReducer(shows = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case CREATE_SHOW:
            return [...shows, payload];

        case RETRIEVE_SHOWS:
            return payload;

        case UPDATE_SHOW:
            return shows.map((show) => {
                if (show.id === payload.id) {
                    return {
                        ...show,
                        ...payload,
                    };
                } else {
                    return show;
                }
            });

        case DELETE_SHOW:
            return shows.filter(({ id }) => id !== payload.id);

        case DELETE_ALL_SHOWS:
            return [];

        default:
            return shows;
    }
};

export default showReducer;