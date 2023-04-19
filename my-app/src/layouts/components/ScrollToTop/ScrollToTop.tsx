import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './ScrollToTop.scss';

type Props = {
    children: React.ReactNode;
};

const ScrollToTop = ({ children }: Props) => {
    const [show, setShow] = useState<boolean>(false);
    const loacation = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
        document.body.style.overflow = 'unset';
    }, [loacation]);

    useEffect(() => {
        const handleShowScroll = () => {
            setShow(window.scrollY >= 400);
        };
        window.addEventListener('scroll', handleShowScroll);
        return () => {
            window.removeEventListener('scroll', handleShowScroll);
        };
    }, []);

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            {children}
            {show && (
                <div className="scroll-top" color="#333" onClick={handleScrollToTop}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="8" fill="#fff">
                        <path d="M11.4 7.7l-4.9-5-4.9 5c-.4.4-.9.4-1.3 0s-.4-.9 0-1.3L6.5 0l6.2 6.4c.4.4.3.9 0 1.3s-.9.4-1.3 0z"></path>
                    </svg>
                </div>
            )}
        </>
    );
};

export default ScrollToTop;
