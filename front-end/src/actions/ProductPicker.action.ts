import { Product } from "../models/Product";

export const CHOOSE_PRODUCT = 'CHOOSE_PRODUCT';
export const RESET_PRODUCT = 'RESET_PRODUCT';
export const chooseProduct = (product: Product) => (dispatch: any) => {
    dispatch({
        payload: {product},
        type: CHOOSE_PRODUCT,
    })
}
export function resetProduct() {
    return { type: RESET_PRODUCT }
}