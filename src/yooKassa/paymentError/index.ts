/**
 * @see https://yookassa.ru/developers/using-api/basics#http-codes
 */
class PaymentError extends Error {
  public id: string;
  public code: string;
  public parameter: string;

  constructor(error: any) {
    super(error.message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PaymentError);
    } else {
      this.stack = new Error().stack;
    }

    this.name = 'PaymentError';
    this.message = error.description;
    this.id = error.id;
    this.code = error.code;
    this.parameter = error.parameter;
  }
}

export default PaymentError;
