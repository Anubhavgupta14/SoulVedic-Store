import Headers from '../Headers';
import { ProcessAPI, Const } from '../../utils/Constants';

// Edit Product API
export const editProduct = async (id) => {
    const res = await fetch(Const.Link + "api/products/getOne/"+ id, new Headers("GET"));
    return ProcessAPI(res);
}
// GET Categories API
export const getCategory = async (body) => {
    const res = await fetch(Const.Link + "api/categories", new Headers("GET"));
    return ProcessAPI(res);
}

export const updateSave = async (body) => {
    const res = await fetch(Const.Link + "api/products/editone", { method: "POST", body: body });
    return res.json();
}

export const insertSave = async (body) => {
    const res = await fetch(Const.Link + "api/products/", { method: "POST", body: body });
    return res.json();
}