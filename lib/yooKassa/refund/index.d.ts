import YooKassa from '..';
declare class Refund {
    private yooKassa;
    private id;
    private amount;
    constructor(instance: YooKassa, data: Refund);
    reload(): Promise<boolean>;
}
export default Refund;
