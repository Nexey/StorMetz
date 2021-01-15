export const mapStateToProps = (state) => {
    return {
        favMeteoInfos: state.favMeteoInfoID
    }
}

export const saveObject = async (id, dispatch) => {
    const action = { type: 'SAVE_OBJECT', value: id };
    dispatch(action);
}

export const unsaveObject = async (id, dispatch) => {
    const action = { type: 'UNSAVE_OBJECT', value: id };
    dispatch(action);
}

export const amIaFavMeteoInfo = (favMeteoInfos, meteoInfoID) => {
    return (favMeteoInfos.findIndex(i => i === meteoInfoID) !== -1);
};