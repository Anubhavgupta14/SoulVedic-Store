import Headers from '../Headers';
import { ProcessAPI, Const } from '../../utils/Constants';

export const checkExist = async (token) => {
    const res = await fetch(Const.Link + "api/addcart/checkExist", { method: "POST",headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify({ token }) });
    return ProcessAPI(res);
}

export const FinalPrice = async (body) => {
    const res = await fetch(Const.Link + "api/products/getFinalPrice", { method: "POST",headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify(body) });
    return ProcessAPI(res);
}
export const Addtocart = async (body) => {
    const res = await fetch(Const.Link + "api/addcart", { method: "POST",headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify(body) });
    return ProcessAPI(res);
}

