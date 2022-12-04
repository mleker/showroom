import { useState, useEffect } from 'react';
import './Main.css';
import api from '../../api/api';
import { Button } from '../Button/Button';

export const Main = ({ removeToken }) => {
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        if (isLoggingOut) {
            api.postLogout(signal)
                .then(() => {
                    setIsLoggingOut(false);
                    removeToken();
                })
                .catch((e) => console.log(e));
        }

        return () => controller.abort();
    }, [isLoggingOut])

    const handleClick = async () => {
        setIsLoggingOut(true);
    }

    return (
        <div className='main__wrapper'>
            <div className='main__title'>
                <b>{'Nastya Mleko'}</b>
                <br />
                {'frontend developer'}
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