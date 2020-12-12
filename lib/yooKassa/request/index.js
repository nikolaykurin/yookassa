"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInstance = void 0;
const https_1 = __importDefault(require("https"));
const axios_1 = __importDefault(require("axios"));
const uuid_1 = require("uuid");
const paymentError_1 = __importDefault(require("../paymentError"));
const HEADERS_IDEMPOTENCE_KEY = 'Idempotence-Key';
const URL_PAYMENTS = 'payments';
const URL_REFUNDS = 'refunds';
async function requestInterceptor(config) {
    const { shopId, secretKey, timeout } = this;
    const { headers = {} } = config;
    /**
     * @see https://yookassa.ru/developers/using-api/basics#idempotence
     */
    config.headers = {
        [HEADERS_IDEMPOTENCE_KEY]: uuid_1.v4(),
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
async function requestErrorInterceptor(error) {
    return Promise.reject(error);
}
async function responseInterceptor(response) {
    return response;
}
async function responseErrorInterceptor(error) {
    const { response, config } = error;
    if (!response) {
        return Promise.reject(null);
    }
    const { status, data } = response;
    // TODO: retry
    return Promise.reject(new paymentError_1.default(data));
}
const getInstance = (url) => {
    const options = {
        baseURL: url,
        withCredentials: false,
        httpsAgent: new https_1.default.Agent({
            rejectUnauthorized: false,
        }),
    };
    const instance = axios_1.default.create(options);
    instance.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
    instance.interceptors.response.use(responseInterceptor, responseErrorInterceptor);
    return instance;
};
exports.getInstance = getInstance;
class YooKassaRequest {
    constructor({ url, shopId, secretKey, timeout, retryTimeout, isDebugMode }) {
        const options = {
            baseURL: url,
            withCredentials: false,
            httpsAgent: new https_1.default.Agent({
                rejectUnauthorized: false,
            }),
        };
        const instance = axios_1.default.create(options);
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
    createPayment(data, idempotenceKey) {
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
    getPayment(paymentId, idempotenceKey) {
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
    capturePayment(paymentId, amount, idempotenceKey) {
        return this.axiosInstance.post(`${URL_PAYMENTS}/${paymentId}`, {
            amount,
        }, {
            headers: {
                [HEADERS_IDEMPOTENCE_KEY]: idempotenceKey,
            },
        });
    }
    /**
     * Cancel Payment
     * @see https://kassa.yandex.ru/docs/checkout-api/#otmena-platezha
     */
    cancelPayment(paymentId, idempotenceKey) {
        return this.axiosInstance.post(`${URL_PAYMENTS}/${paymentId}/cancel`, {}, {
            headers: {
                [HEADERS_IDEMPOTENCE_KEY]: idempotenceKey,
            },
        });
    }
    /**
     * Create Refund from Payment
     * @see https://yookassa.ru/developers/api#create_refund
     */
    createRefund(paymentId, amount, idempotenceKey) {
        return this.axiosInstance.post(URL_REFUNDS, { payment_id: paymentId, amount }, {
            headers: {
                [HEADERS_IDEMPOTENCE_KEY]: idempotenceKey,
            },
        });
    }
    /**
     * Get Refund
     * @see https://yookassa.ru/developers/api#get_refund
     */
    getRefund(refundId, idempotenceKey) {
        return this.axiosInstance.get(`${URL_REFUNDS}/${refundId}`, {
            headers: {
                [HEADERS_IDEMPOTENCE_KEY]: idempotenceKey,
            },
        });
    }
}
exports.default = YooKassaRequest;
