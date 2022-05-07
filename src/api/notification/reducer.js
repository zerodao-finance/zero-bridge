import _ from "lodash";
export const NotificationReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          ...action.payload,
        },
      ];
    case "UPDATE":
      var t = _.find(state, function (i) {
        return i.id == action.payload.id;
      });
      console.log(t);
      var updated = { ...t, ...action.payload.update };
      console.log(updated);
      var l = state.filter((t) => t.id != action.payload.id);
      console.log([...l, updated]);
      return [...l, updated];
    case "REMOVE":
      return state.filter((t) => t.id != action.payload.id);
    case "REMOVE_ALL":
      return [];
    case "REMOVE_LAST":
      return _.initial(state);
    default:
      return state;
  }
};
