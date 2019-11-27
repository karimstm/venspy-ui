export const loginReducer = (state = null, actions) => {
    switch(actions.type)
    {
        case "LOGIN":
			return true;
		case "REJECT":
			return false;
        case "LOGOUT":
			return null;
		default:
			return state;
    }
}
