import { makeAutoObservable, runInAction, toJS } from 'mobx';
import { userStore } from './userStore';
import { payStore } from './paymentStore';

export interface IUserBMD {
    userId?: Number;
    cart?: any[];
    address?: any;
}

// Create a store to manage the cart state
class CartStore {
    user: IUserBMD[] = localStorage.getItem('user.bmd') ? JSON.parse(localStorage.getItem('user.bmd') as string) : [];
    currentUser: number = 0;
    cart: any[] = [];
    totalQuantity: number = 0;
    price: number = 0;
    isLoading: boolean = false;
    isBuyNow: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    get getUser() {
        return this.user;
    }
    get getCurrentUser() {
        return this.currentUser;
    }
    get getCart() {
        return this.cart;
    }
    get getTotalQuantity() {
        return this.totalQuantity;
    }
    get getPrice() {
        return this.price;
    }
    get getIsLoading() {
        return this.isLoading;
    }
    get getIsBuyNow() {
        return this.isBuyNow;
    }

    setIsBuyNow = async (isBuyNow: boolean) => {
        this.isBuyNow = isBuyNow;
    };

    addToCart = async (book: any, quantity: any) => {
        this.isLoading = true;
        // Check if the user exists, if it is added, if not, create a new one
        const existsUser = this.user.find((item: any) => item.userId === userStore.getUserProfile.id);
        if (existsUser) {
            // Check if the item exists, if it is added, if not, create a new one
            const existsItem = this.cart.find((item) => item.book?.id === book.id);

            if (existsItem) {
                existsItem.quantity += quantity;
            } else {
                this.cart.push({
                    book,
                    quantity,
                });
            }
            existsUser.cart = this.cart;
        } else {
            this.cart.push({
                book,
                quantity,
            });
            this.user.push({
                userId: userStore.getUserProfile.id,
                cart: [{ book, quantity }],
                address: {},
            });
        }
        this.totalQuantity += quantity;
        this.price += Number(book.finalPrice) * quantity;
        await localStorage.setItem('user.bmd', JSON.stringify(this.user));
        setTimeout(() => {
            runInAction(() => {
                this.isLoading = false;
            });
        }, 500);
    };

    clearCart = async () => {
        this.cart = [];
        this.totalQuantity = 0;
        this.price = 0;
        payStore.setPromotionCode('');
        this.user.splice(Number(this.currentUser), 1);
        await localStorage.setItem('user.bmd', JSON.stringify(this.user));
    };

    removeCart = async (book: any, quantity: any) => {
        this.isLoading = true;

        this.cart = this.cart.filter((item) => item.book.id !== book.id);
        this.totalQuantity -= quantity;
        this.price -= Number(book.finalPrice) * quantity;
        this.user[Number(this.currentUser)].cart = this.cart;
        await localStorage.setItem('user.bmd', JSON.stringify(this.user));
        setTimeout(() => {
            runInAction(async () => {
                runInAction(() => {
                    this.isLoading = false;
                });
            });
        }, 500);
    };

    updateCart = async (book: any, quantity: any) => {
        this.isLoading = true;
        const existsItem = this.cart.find((item) => item.book.id === book.id);
        if (existsItem) {
            existsItem.quantity = quantity;
        }
        this.totalQuantity = 0;
        this.price = 0;
        this.cart.forEach((item) => {
            this.totalQuantity += item.quantity;
            this.price += Number(item.book.finalPrice) * item.quantity;
        });

        this.user[Number(this.currentUser)].cart = this.cart;
        await localStorage.setItem('user.bmd', JSON.stringify(this.user));
        setTimeout(() => {
            runInAction(() => {
                this.isLoading = false;
            });
        }, 500);
    };

    getCartFromStore = async () => {
        const cart = await localStorage.getItem('user.bmd');
        runInAction(() => {
            this.totalQuantity = 0;
            this.price = 0;

            if (cart) {
                this.user = JSON.parse(cart);
                this.currentUser = JSON.parse(cart).findIndex(
                    (item: any) => item.userId === userStore.getUserProfile.id
                );
                this.cart = JSON.parse(cart).find((item: any) => item.userId === userStore.getUserProfile.id)
                    ? JSON.parse(cart).find((item: any) => item.userId === userStore.getUserProfile.id).cart
                    : [];
                this.cart.forEach((item) => {
                    this.totalQuantity += toJS(item).quantity;
                    this.price += Number(toJS(item).book.finalPrice) * toJS(item).quantity;
                });
            }
        });
    };

    buyNow = async (book: any, quantity: any) => {
        this.cart = [{ book, quantity }];
        this.totalQuantity = quantity;
        this.price += Number(book.finalPrice) * quantity;
        this.setIsBuyNow(true);
    };
}

const cartStore = new CartStore();
export { CartStore, cartStore };
