import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(
      "https://localhost:44328/api/Authenticate/login",
      userCredential
    );
    dispatch({ type: "LOGIN_SUCCESS", payload: {...res.data} });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

export const registerCall = async (userCredential, dispatch) => {
  dispatch({ type: "REGISTER_START" });
  try {
    await axios.post(
      "https://localhost:44328/api/Authenticate/register",
      userCredential
    );
    const {username, password} = userCredential;
    loginCall({username, password}, dispatch);
  } catch (err) {
    dispatch({ type: "REGISTER_FAILURE", payload: err });
  }
}
