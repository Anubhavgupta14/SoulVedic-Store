export const Const = {
  Token: "Token",
  Session: "Session",
  LoggedInRolePermission: "Role",
  User: "User",
  LoggedIn: "LoggedIn",
  LoggedInUser: "LoggedInUser",
  STrue: true,
  SFalse: false,
  Success200: 200,
  Success201:201,
  Redirect302: 302,
  Invalid400: 400,
  UnAuth401: 401,
  NotFound404: 404,
  Active: true,
  Inactive: false,
  Limit: 20,
   //Link: "http://localhost:3001/",
  Link: "https://soul-vedic-backend-eight.vercel.app/",
};

export const ProcessAPI = async (res) => {
  if (res.status === Const.Success200) {
    return res.json();
  }
  else if(res.status === Const.Success201){
    return res.json();
  }
   else if (res.status === Const.Redirect302) {
  } 
  else if (res.status === Const.Invalid400) {
  } 
  else if (res.status === Const.UnAuth401) {
    window.location.href = "/login";
  } 
  else if (res.status === Const.NotFound404) {
    return res.json()
  } 
  else {
    throw res;
  }
};
