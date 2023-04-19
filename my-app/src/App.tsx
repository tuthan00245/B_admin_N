import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';
// import OneSignal from 'react-onesignal';

import ScrollToTop from './layouts/components/ScrollToTop/ScrollToTop';
// import MasterLayout from './layouts/Masterlayout/MasterLayout';
// import { publicRouter, restrictRoutes } from './routes';
import { useEffect } from 'react';
import { useStore } from './store';
import { observer } from 'mobx-react';
import React from 'react';
// import runOneSignal from './OneSignal';
// import NotFound from './pages/NotFound/NotFound';
// import { deleteOneSignalunSub, postOneSignalSub } from './api/onesignalController';

function App() {
    const { userStore, cartStore, payStore, historyStore, wishListStore } = useStore();

    useEffect(() => {
        const handleGetDataUser = async () => {
            await wishListStore.getWishListFromStore();
            if (userStore.getUserToken !== 'false') {
                await userStore.userGetDetails();
                await cartStore.getCartFromStore();
                // await payStore.setOrderEstimate();
                await payStore.setDataFromStorage();
                await historyStore.setHistoryOrders();
            }
        };
        handleGetDataUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userStore.getUserToken]);

    useEffect(() => {
        // runOneSignal();
    });

    // OneSignal.on('subscriptionChange', async function (isSubscribed) {
    //     isSubscribed
    //         ? await postOneSignalSub(localStorage.getItem('oneSignalId.bmd')!)
    //         : await deleteOneSignalunSub(localStorage.getItem('oneSignalId.bmd')!);

    //     console.log(isSubscribed)
    // });

    return (
        <>
            <ScrollToTop>
                {/* <MasterLayout>
                    <Routes>
                        {publicRouter.map((router, i) => {
                            const Page = router.component;
                            return <Route key={i} path={router.path} element={<Page />} />;
                        })}
                        {restrictRoutes.map((router, i) => {
                            const Page = router.component;
                            return <Route key={i} path={router.path} element={<Page />} />;
                        })}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </MasterLayout> */}
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </ScrollToTop>
        </>
    );
}

export default observer(App);