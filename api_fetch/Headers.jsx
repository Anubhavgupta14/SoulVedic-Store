import { Const } from '../utils/Constants';

export default function Headers(method, body){
  const auth = localStorage.getItem(Const.Token);
  const session = localStorage.getItem(Const.Session);
  const user = localStorage.getItem(Const.LoggedInUser);
    this.method = method;
    this.headers = {
      'Access-Control-Allow-Origin': '*',
      // 'Content-Type': 'application/json',
      // 'Content-Type': 'multipart/form-data',
      'user-id': user ? user.user_id : 0,
      'authtoken': auth,
      'session': session
  };
  if (body) {
    this.body = JSON.stringify(body);
  }
}