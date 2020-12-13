import Types from '../../types';
/**
 * @see https://yookassa.ru/developers/using-api/basics#http-codes
 */
declare class PaymentError extends Error {
    id: string;
    code: string;
    parameter: string;
    constructor(error: Types.PaymentResponseError);
}
export default PaymentError;
