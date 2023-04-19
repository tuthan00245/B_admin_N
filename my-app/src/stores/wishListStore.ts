import { makeAutoObservable, runInAction } from 'mobx';

// Create a store to manage the WishList state
class WishListStore {
    wishList: any[] = localStorage.getItem('wishList.bmd')
        ? JSON.parse(localStorage.getItem('wishList.bmd') as string)
        : [];
    totalQuantity: number = 0;
    isLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    get getWishList() {
        return this.wishList;
    }
    get getTotalQuantity() {
        return this.totalQuantity;
    }
    get getIsLoading() {
        return this.isLoading;
    }

    addToWishList = async (book: any) => {
        const existsItem = this.wishList.find((item) => item.book.id === book.id);
        if (existsItem) {
            return;
        } else {
            this.wishList.push({
                book,
            });
        }
        this.totalQuantity++;
        this.isLoading = true;
        setTimeout(() => {
            runInAction(() => {
                this.isLoading = false;
            });
        }, 500);
        await localStorage.setItem('wishList.bmd', JSON.stringify(this.wishList));
    };

    removeWishList = async (book: any) => {
        this.wishList = this.wishList.filter((item) => item.book.id !== book.id);
        this.totalQuantity--;
        await localStorage.setItem('wishList.bmd', JSON.stringify(this.wishList));
    };

    getWishListFromStore = async () => {
        const wishList = await localStorage.getItem('wishList.bmd');
        runInAction(() => {
            if (wishList) {
                this.wishList = JSON.parse(wishList);
                this.totalQuantity = this.wishList.length;
            }
        });
    };
}

const wishListStore = new WishListStore();
export { WishListStore, wishListStore };
