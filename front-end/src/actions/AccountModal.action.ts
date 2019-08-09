export const OPEN_FORGET_PASSWORD = 'OPEN_FORGET_PASSWORD';
export const OPEN_LOGIN = 'OPEN_LOGIN';
export const OPEN_SIGNUP = 'OPEN_SIGNUP';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export function openForgetPassword() {
    return { type: OPEN_FORGET_PASSWORD }
}
export function openLogin() {
    return { type: OPEN_LOGIN }
}
export function openSignup() {
    return { type: OPEN_SIGNUP }
}
export function closeModal() {
    return { type: CLOSE_MODAL}
}
