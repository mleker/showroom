import './Login.css';
import { useForm } from './useForm';
import classNames from 'classnames';
import { validate } from './validate';
import api from '../../api/api';
import { Button } from '../Button/Button';

//TODO Testing
export const Login = ({ saveToken }) => {
    const {
        formData,
        errors,
        isSubmiting,
        handleChange,
        handleSubmit,
    } = useForm(login, validate);

    function login(formData, signal) {
        return api.getToken({
            mail: formData.mail,
            password: formData.password
        }, signal)
            .then(saveToken)
            .catch((e) => console.log(e))
    };

    return (
        <div className='login__wrapper'>
            <div className='login__title'>
                <b>{'Hey,'}</b>
                <br />
                {'come on in'}
            </div>
            <form
                className='login-form'
                onSubmit={handleSubmit}
            >
                <label className='login-form__label'>
                    <input
                        className={classNames(errors.mail && 'login-form__errored-input', 'login-form__input')}
                        placeholder='user@mail.com'
                        name='mail'
                        type='text'
                        aria-label='Email field'
                        disabled={isSubmiting}
                        value={formData?.mail || ''}
                        onChange={handleChange}
                    />
                </label>
                <label className='login-form__label'>
                    <input
                        className={classNames(errors.password && 'login-form__errored-input', 'login-form__input')}
                        placeholder='password'
                        name='password'
                        type='password'
                        aria-label='password field'
                        disabled={isSubmiting}
                        value={formData?.password || ''}
                        onChange={handleChange}
                    />
                </label>
                <div className='login-form__submit-button-wrapper'>
                    {!!Object.keys(errors).length &&
                        <div className='login-form__error'>
                            {Object.values(errors).map((msg) => <p key={msg}>{msg}</p>)}
                        </div>
                    }
                    <Button
                        isLoading={isSubmiting}
                        type='submit'
                    >
                        {'Log in'}
                    </Button>
                </div>
            </form>
        </div>
    );
}