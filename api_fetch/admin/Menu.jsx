import Headers from '../Headers';
import { ProcessAPI, Const } from '../../utils/Constants';

// Edit Product API
export const getMenu = async (body) => {
    const res = await fetch(Const.Link + `api/menu/get-menu?limit=${body.limit}&offset=${body.offset}`, new Headers("GET"));
    return ProcessAPI(res);
}

export const getSubMenu = async (body) => {
    const res = await fetch(Const.Link + 'api/submenu/'+ body, new Headers("GET"));
    return ProcessAPI(res);
}