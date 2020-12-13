import Types from '@/types';

/**
 * @see https://yookassa.ru/developers/using-api/basics#http-codes
 */
class PaymentError extends Error {
  public id: string;
  public code: string;
  public parameter: string;

  constructor(error: Types.PaymentResponseError) {
    const { id, code, description, parameter } = error;

    super(description);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PaymentError);
    } else {
      this.stack = new Error().stack;
    }

    this.name = 'PaymentError';
    this.message = description;
    this.id = id;
    this.code = code;
    this.parameter = parameter;
  }
}

export default PaymentError;
