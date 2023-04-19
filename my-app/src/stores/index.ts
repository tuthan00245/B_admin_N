import { cartStore, CartStore } from './cartStore';
import { userStore, UserStore } from './userStore';
import { payStore, PayStore } from './paymentStore';
import { historyStore, HistoryStore } from './historyStore';
import { wishListStore, WishListStore } from './wishListStore';

export type RootStore = {
    userStore: UserStore;
    cartStore: CartStore;
    payStore: PayStore;
    historyStore: HistoryStore;
    wishListStore: WishListStore;
};

const rootStore: RootStore = {
    userStore,
    cartStore,
    payStore,
    historyStore,
    wishListStore,
};

export default rootStore;
