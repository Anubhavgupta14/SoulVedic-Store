import Headers from '../Headers';
import { ProcessAPI, Const } from '../../utils/Constants';

export const Checkoutitem = async (token) => {
    const res = await fetch(Const.Link + "api/addcart/checkout", { method: "POST",headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify({token}) });
    return ProcessAPI(res);
}
export const Saveorders = async (body) => {
    const res = await fetch(Const.Link + "api/orders/saveorders", { method: "POST",headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify(body) });
    return ProcessAPI(res);
}
export const CheckAddress = async (token) => {
    const res = await fetch(Const.Link + "api/address/checkaddress", { method: "POST",headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify({token}) });
    return ProcessAPI(res);
}
export const Getcart = async (token) => {
    const res = await fetch(Const.Link + "api/addcart/getcart", { method: "POST",headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify({token}) });
    return ProcessAPI(res);
}