import Headers from '../Headers';
import { ProcessAPI, Const } from '../../utils/Constants';

export const FetchCat = async (body) => {
    const res = await fetch(Const.Link + "api/categories/fetchcat", { method: "POST", headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify(body) });
    return res.json();
}
