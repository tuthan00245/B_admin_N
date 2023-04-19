import { makeAutoObservable, runInAction } from 'mobx';
// import { authLogin, authLoginSocial, authLogout, authSignup, getAccountInfo } from '../api/authController';
// import { deleteOneSignalunSub, postOneSignalSub } from '../api/onesignalController';

export interface IUserDetails {
    id?: number;
    email?: string;
    username?: string;
    name?: string;
    isDeleted?: string;
    phone?: string;
    address?: string;
    gender?: string;
}

class UserStore {
    loginToken: string = localStorage.getItem('token.bmd') || 'false';
    userDetails: IUserDetails = {};
    loadingUser: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setLoadingUser = (isLoading: boolean) => {
        this.loadingUser = isLoading;
    };

    userLogout = async () => {
        this.loadingUser = true;
        const oneSignalId = localStorage.getItem('oneSignalId.bmd');
        // await authLogout();
        // await deleteOneSignalunSub(oneSignalId!);
        setTimeout(() => {
            runInAction(() => {
                localStorage.setItem('token.bmd', 'false');
                this.loginToken = 'false';
                this.userDetails = {};
                this.loadingUser = false;
            });
        }, 1000);
    };

    userSignup = async (username: string, password: string, facebookId: string = '') => {
        try {
            this.loadingUser = true;
            // const res: any = await authSignup(username, password, facebookId);
            // await localStorage.setItem('token.bmd', res.data.token);
            // setTimeout(() => {
            //     runInAction(() => {
            //         this.loginToken = res.data.token;
            //         this.loadingUser = false;
            //     });
            // }, 1000);
            // return true;
        } catch (error) {
            this.loadingUser = false;
            return false;
        }
    };

    userLogin = async (username: string, password: string) => {
        this.loadingUser = true;
        try {
            // const res: any = await authLogin(username, password);
            // await localStorage.setItem('token.bmd', res.data.token);
            // setTimeout(() => {
            //     runInAction(() => {
            //         this.loginToken = res.data.token;
            //         this.loadingUser = false;
            //     });
            // }, 1000);
            return true;
        } catch (error) {
            this.loadingUser = false;
            return false;
        }
    };

    userLoginSocial = async (facebookId: string) => {
        try {
            this.loadingUser = true;
            // const oneSignalId = localStorage.getItem('oneSignalId.bmd');
            // await postOneSignalSub(oneSignalId!);
            // const res: any = await authLoginSocial(facebookId);
            // if (res.status === false) {
            //     runInAction(() => {
            //         this.loadingUser = false;
            //     });
            //     return false;
            // } else {
            //     await localStorage.setItem('token.bmd', res.data.token);
            //     setTimeout(() => {
            //         runInAction(() => {
            //             this.loginToken = res.data.token;
            //             this.loadingUser = false;
            //         });
            //     }, 1000);
            //     return true;
            // }
        } catch (error) {
            this.loadingUser = false;
            return false;
        }
    };

    userGetDetails = async () => {
        // const res: any = await getAccountInfo();
        // runInAction(() => {
        //     this.userDetails = res.data;
        // });
    };

    get getUserToken() {
        return this.loginToken;
    }

    get getUserProfile() {
        return this.userDetails;
    }
}

const userStore = new UserStore();
export { UserStore, userStore };
