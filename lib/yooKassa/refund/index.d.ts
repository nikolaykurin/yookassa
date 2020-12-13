import YooKassa from '..';
declare class Refund {
    private yooKassa;
    private id;
    private amount;
    constructor(yooKassa: YooKassa, data: Refund);
    get data(): object;
    reload(): Promise<boolean>;
}
export default Refund;
