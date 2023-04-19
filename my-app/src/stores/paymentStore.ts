import { makeAutoObservable, runInAction } from 'mobx';
import { IUserBMD, cartStore } from './cartStore';
// import { postEstimate, postOrder } from '../api/orderController';
import { userStore } from './userStore';
class PayStore {
    constructor() {
        makeAutoObservable(this);
    }
    user: IUserBMD[] = localStorage.getItem('user.bmd') ? JSON.parse(localStorage.getItem('user.bmd') as string) : [];
    currentUser: number = 0;
    step = 1;
    name = '';
    phone = '';
    address = '';
    city: any;
    district: any;
    ward: any;
    orderEstimate: any = {};
    detail = [
        {
            quantity: 0,
            bookId: 0,
            attributeId1: 0,
            attributeId2: 0,
        },
    ];
    note = '';
    promotionCode: string = '';
    paymentType = 'CASH';
    order: any = {};
    promotionFail: boolean = false;
    isLoadingPromo: boolean = false;

    get getUser() {
        return this.user;
    }
    get getCurrentUser() {
        return this.currentUser;
    }
    get getStep() {
        return this.step;
    }
    get getCity() {
        return this.city;
    }
    get getDistrict() {
        return this.district;
    }
    get getWard() {
        return this.ward;
    }
    get getName() {
        return this.name;
    }
    get getPhone() {
        return this.phone;
    }
    get getAddress() {
        return this.address;
    }
    get getOrderEstimate() {
        return this.orderEstimate;
    }
    get getNote() {
        return this.note;
    }
    get getPromotionCode() {
        return this.promotionCode;
    }
    get getPaymentType() {
        return this.paymentType;
    }
    get getOrder() {
        return this.order;
    }
    get getIsLoadingPromo() {
        return this.isLoadingPromo;
    }
    get getPromotionFail() {
        return this.promotionFail;
    }

    setCity = async (city: any) => {
        this.city = city;
    };

    setDistrict = async (district: any) => {
        this.district = district;
    };

    setWard = async (ward: any) => {
        this.ward = ward;
    };

    setName = async (name: string) => {
        this.name = name;
    };

    setPhone = async (phone: string) => {
        this.phone = phone;
    };

    setAddress = async (address: string) => {
        this.address = address;
    };

    setDataUser = async (data: any) => {
        this.name = data.name;
        this.phone = data.phone;
        this.address = data.address;
        this.setCity(data.city);
        this.setDistrict(data.district);
        this.setWard(data.ward);
        this.note = data.note ? data.note : '';
        this.paymentType = data.paymentType ? data.paymentType : 'CASH';
        this.promotionCode = data.promotionCode ? data.promotionCode : '';
    };

    setDataFromStorage = async () => {
        const data = await localStorage.getItem('user.bmd');
        runInAction(() => {
            if (data) {
                this.user = JSON.parse(data);
                this.currentUser = JSON.parse(data).findIndex(
                    (item: any) => item.userId === userStore.getUserProfile.id
                );
                const json = JSON.parse(data).find((item: any) => item.userId === userStore.getUserProfile.id)
                    ? JSON.parse(data).find((item: any) => item.userId === userStore.getUserProfile.id).address
                    : {};
                this.setDataUser(json);
            }
        });
    };

    saveDataUser = async () => {
        this.setIsLoadingPromo(true);
        const existsUser = this.user.find((item: any) => item.userId === userStore.getUserProfile.id);

        const data = {
            name: this.name,
            phone: this.phone,
            address: this.address,
            city: this.city,
            district: this.district,
            ward: this.ward,
            note: this.note,
            paymentType: this.paymentType,
        };
        if (existsUser) {
            existsUser.address = data;
        } else {
            this.user.push({
                userId: userStore.getUserProfile.id,
                cart: [],
                address: data,
            });
        }
        await localStorage.setItem('user.bmd', JSON.stringify(this.user));
        setTimeout(() => {
            runInAction(() => {
                this.setIsLoadingPromo(false);
            });
        }, 500);
    };

    clearData = async () => {
        this.name = '';
        this.phone = '';
        this.address = '';
        this.city = {
            code: '',
            name: '',
            id: 0,
            label: '',
        };
        this.district = {
            code: '',
            name: '',
            id: 0,
            label: '',
        };
        this.ward = {
            code: '',
            name: '',
            id: 0,
            label: '',
        };
        this.note = '';
        this.paymentType = 'CASH';
        this.promotionCode = '';
        await localStorage.removeItem('user.bmd');
    };
    setStep = async (step: number) => {
        this.step = step;
    };

    setPromotionFail = async (promotion: boolean) => {
        this.promotionFail = promotion;
    };

    setPromotionCode = async (promotionCode: string) => {
        this.promotionCode = promotionCode;
    };

    setOrderEstimate = async () => {
        this.setIsLoadingPromo(true);
        await this.setDataFromStorage();
        await cartStore.getCartFromStore();
        const cart = cartStore.getCart;

        this.detail = cart.map((item: any) => {
            return {
                quantity: item.quantity,
                bookId: item.book.id,
                attributeId1: 0,
                attributeId2: 0,
            };
        });
        // const res = await postEstimate(this.promotionCode, this.city.id, this.district.id, this.ward.id, this.detail);
        // runInAction(() => {
        //     this.orderEstimate = res.data;
        //     this.setIsLoadingPromo(false);
        // });
    };

    setOrder = async () => {
        this.order = {
            order: {
                name: this.name,
                phone: this.phone,
                address: this.address,
                isDeleted: false,
                note: this.note,
                paymentType: this.paymentType,
            },
            promotionCode: this.promotionCode,
            addressCityId: this.city.id,
            addressDistrictId: this.district.id,
            addressWardId: this.ward.id,
            details: this.detail,
        };
        try {
            // const res = await postOrder(this.order);
            // if (cartStore.isBuyNow === false) {
            //     cartStore.clearCart();
            // } else {
            //     cartStore.getCartFromStore();
            // }
            // return res;
        } catch (error) {
            console.log(error);
        }
    };

    setPayment = async (paymentType: string, note: string) => {
        this.paymentType = paymentType;
        this.note = note;
        this.saveDataUser();
    };

    setIsLoadingPromo = async (promotion: boolean) => {
        this.isLoadingPromo = promotion;
    };
}

const payStore = new PayStore();
export { PayStore, payStore };
