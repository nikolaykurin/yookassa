import https from 'https';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import PaymentError from '../paymentError';
import Payment from '../payment';
import Refund from '../refund';
import Types from '@/types';

const HEADERS_IDEMPOTENCE_KEY = 'Idempotence-Key';

const URL_PAYMENTS = 'payments';
const URL_REFUNDS = 'refunds';

async function requestInterceptor(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
  const { shopId, secretKey, timeout } = this;

  const { headers = {} } = config;

  /**
   * @see https://yookassa.ru/developers/using-api/basics#idempotence
   */
  config.headers = {
    [HEADERS_IDEMPOTENCE_KEY]: uuidv4(),
    ...headers,
  };
  /**
   * @see https://yookassa.ru/developers/using-api/basics#auth
   */
  config.auth = {
    username: shopId,
    password: secretKey,
  };
  config.timeout = timeout;

  // TODO: log if isDebugMode

  return config;
}

async function requestErrorInterceptor(error: unknown): Promise<never> {
  return Promise.reject(error);
}

async function responseInterceptor(response: AxiosResponse): Promise<AxiosResponse> {
  return response;
}

async function responseErrorInterceptor(error: AxiosError): Promise<AxiosResponse | never> {
  const { response, config } = error;

  if (!response) {
    return Promise.reject(null);
  }

  const { status, data } = response;

  // TODO: retry

  return Promise.reject(new PaymentError(data));
}

export const getInstance = (url): AxiosInstance => {
  const options: AxiosRequestConfig = {
    baseURL: url,
    withCredentials: false,
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  };

  const instance = axios.create(options);

  instance.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
  instance.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

  return instance;
};

class YooKassaRequest {
  private axiosInstance: AxiosInstance;
  private shopId: string;
  private secretKey: string;
  private timeout: number;
  private retryTimeout: number;
  private isDebugMode: boolean;

  private constructor({ url, shopId, secretKey, timeout, retryTimeout, isDebugMode }) {
    const options: AxiosRequestConfig = {
      baseURL: url,
      withCredentials: false,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    };

    const instance = axios.create(options);

    instance.interceptors.request.use(requestInterceptor.bind(this), requestErrorInterceptor.bind(this));
    instance.interceptors.response.use(responseInterceptor.bind(this), responseErrorInterceptor.bind(this));

    this.axiosInstance = instance;
    this.shopId = shopId;
    this.secretKey = secretKey;
    this.timeout = timeout;
    this.retryTimeout = retryTimeout;
    this.isDebugMode = isDebugMode;
  }

  /**
   * Create Payment
   * @see https://yookassa.ru/developers/api#create_payment
   */
  public createPayment(data: Types.CreatePaymentData, idempotenceKey?: string): Promise<AxiosResponse<Payment>> {
    return this.axiosInstance.post(URL_PAYMENTS, data, {
      headers: {
        [HEADERS_IDEMPOTENCE_KEY]: idempotenceKey,
      },
    });
  }

  /**
   * Get Payment
   * @see https://yookassa.ru/developers/api#get_payment
   */
  getPayment(paymentId: string, idempotenceKey?: string): Promise<AxiosResponse<Payment>> {
    return this.axiosInstance.get(`${URL_PAYMENTS}/${paymentId}`, {
      headers: {
        [HEADERS_IDEMPOTENCE_KEY]: idempotenceKey,
      },
    });
  }

  /**
   * Capture Payment
   * @see https://yookassa.ru/developers/api#capture_payment
   */
  capturePayment(paymentId: string, amount: Types.PaymentAmount, idempotenceKey?: string): Promise<AxiosResponse<Payment>> {
    return this.axiosInstance.post(
      `${URL_PAYMENTS}/${paymentId}`,
      {
        amount,
      },
      {
        headers: {
          [HEADERS_IDEMPOTENCE_KEY]: idempotenceKey,
        },
      },
    );
  }

  /**
   * Cancel Payment
   * @see https://kassa.yandex.ru/docs/checkout-api/#otmena-platezha
   */
  cancelPayment(paymentId: string, idempotenceKey?: string): Promise<AxiosResponse<Payment>> {
    return this.axiosInstance.post(
      `${URL_PAYMENTS}/${paymentId}/cancel`,
      {},
      {
        headers: {
          [HEADERS_IDEMPOTENCE_KEY]: idempotenceKey,
        },
      },
    );
  }

  /**
   * Create Refund from Payment
   * @see https://yookassa.ru/developers/api#create_refund
   */
  createRefund(paymentId: string, amount: Types.PaymentAmount, idempotenceKey?: string): Promise<AxiosResponse<Refund>> {
    return this.axiosInstance.post(
      URL_REFUNDS,
      { payment_id: paymentId, amount },
      {
        headers: {
          [HEADERS_IDEMPOTENCE_KEY]: idempotenceKey,
        },
      },
    );
  }

  /**
   * Get Refund
   * @see https://yookassa.ru/developers/api#get_refund
   */
  getRefund(refundId: string, idempotenceKey?: string): Promise<AxiosResponse<Refund>> {
    return this.axiosInstance.get(`${URL_REFUNDS}/${refundId}`, {
      headers: {
        [HEADERS_IDEMPOTENCE_KEY]: idempotenceKey,
      },
    });
  }
}

export default YooKassaRequest;
