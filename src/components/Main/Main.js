import { useState, useEffect } from 'react';
import './Main.css';
import { logout, useTokenDispatch } from '../../context';
import { Button } from '../Button/Button';

export const Main = () => {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const dispatch = useTokenDispatch();

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        if (isLoggingOut) {
            logout(dispatch, signal)
                .then(() => setIsLoggingOut(false))
                .catch((e) => console.log(e));
        }

        return () => controller.abort();
    }, [isLoggingOut])

    const handleClick = async () => {
        setIsLoggingOut(true);
    }

    return (
        <div className='main__wrapper'>
            <div className='main__header'>
                <div className='main__header_title'>
                    <b>{'I am Nastya Mleko '}</b>
                </div>
                <div className='main__header_subtitle'>
                    {'and I\'m doing '}
                    <b>{'frontend'}</b>
                    {', checkout my '}
                    <a
                        className='main__header_link'
                        href={'/nastya-mleko-frontend-cv.pdf'}
                        download
                    >
                        {'cv'}
                    </a>
                </div>
            </div>
            <div className='main__button-wrapper'>
                <Button
                    onClick={handleClick}
                    isLoading={isLoggingOut}
                >
                    {'Log out'}
                </Button>
            </div>
        </div>
    );
}