import Headers from '../Headers';
import { ProcessAPI, Const } from '../../utils/Constants';

export const Getone = async (token) => {
    const res = await fetch(Const.Link + "api/user/getone", { method: "POST",headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify({token}) });
    return ProcessAPI(res);
}
export const Checkaddress = async (token) => {
    const res = await fetch(Const.Link + "api/address/checkaddress", { method: "POST",headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify({token}) });
    return ProcessAPI(res);
}
export const Changepassword = async (body) => {
    const res = await fetch(Const.Link + "api/user/changepassword", { method: "POST",headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify(body) });
    return ProcessAPI(res);
}
export const Getorders = async (token) => {
    const res = await fetch(Const.Link + "api/orders/getorders", { method: "POST",headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify({token}) });
    return ProcessAPI(res);
}
export const Getcards = async (body) => {
    const res = await fetch(Const.Link + "api/user/getcard", { method: "POST",headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify(body) });
    return ProcessAPI(res);
}
export const Savecards = async (body) => {
    const res = await fetch(Const.Link + "api/user/savecard", { method: "POST",headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify(body) });
    return ProcessAPI(res);
}
export const Updateuser = async (body) => {
    const res = await fetch(Const.Link + "api/user/updateuser", { method: "POST",headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify(body) });
    return ProcessAPI(res);
}

