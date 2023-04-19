import { makeAutoObservable, runInAction } from 'mobx';
// import { getOrder } from '../api/orderController';

class HistoryStore {
    constructor() {
        makeAutoObservable(this);
    }

    historyOrders: any[] = [];
    isLoadingHistoryOrders: boolean = false;
    message: string = '';

    get getHistoryOrders() {
        return this.historyOrders;
    }
    get getIsLoadingHistoryOrders() {
        return this.isLoadingHistoryOrders;
    }
    get getMessage() {
        return this.message;
    }

    setHistoryOrders = async () => {
        this.isLoadingHistoryOrders = true;
        // const res = await getOrder();
        // runInAction(() => {
        //     this.historyOrders = res.data.data;
        //     this.isLoadingHistoryOrders = false;
        // });
    };
    //   cancel = async (id: number) => {
    //     this.setIsLoadingHistoryOrders(true);
    //     await cancel(id).then(res => {
    //       this.setHistoryOrders();
    //     }).catch(err => {
    //     }
    //     )
    //     this.setIsLoadingHistoryOrders(false);
    //   }
    setMessage = (message: string) => {
        this.message = message;
    };
    setIsLoadingHistoryOrders = (isLoadingHistoryOrders: boolean) => {
        this.isLoadingHistoryOrders = isLoadingHistoryOrders;
    };
}
const historyStore = new HistoryStore();
export { HistoryStore, historyStore };
