import './Login.css';
import { useForm } from './useForm';
import classNames from 'classnames';
import { Button } from '../Button/Button';

//TODO Testing
export const Login = () => {
    const {
        formData,
        errors,
        isLoading,
        handleChange,
        handleSubmit,
    } = useForm();

    return (
        <div className='login__wrapper'>
            <div className='login__header'>
                <div className='login__header-title'>
                    <b>{'Hey, come on in'}</b>
                </div>
                <div className='login__header-subtitle'>
                    {'just type in '}
                    <b>{'random'}</b>
                    {' credentials'}
                </div>
            </div>
            <form
                className='login__form'
                onSubmit={handleSubmit}
            >
                <label className='login__form-label'>
                    <input
                        className={classNames(errors.mail && 'login__form-errored-input', 'login__form-input')}
                        placeholder='user@mail.com'
                        name='mail'
                        type='text'
                        aria-label='Email field'
                        disabled={isLoading}
                        value={formData?.mail || ''}
                        onChange={handleChange}
                    />
                </label>
                <label className='login__form-label'>
                    <input
                        className={classNames(errors.password && 'login__form-errored-input', 'login__form-input')}
                        placeholder='password'
                        name='password'
                        type='password'
                        aria-label='password field'
                        disabled={isLoading}
                        value={formData?.password || ''}
                        onChange={handleChange}
                    />
                </label>
                <div className='login-form__submit-button-wrapper'>
                    {!!Object.keys(errors).length &&
                        <div className='login__form-error'>
                            {Object.values(errors).map((msg) => <p key={msg}>{msg}</p>)}
                        </div>
                    }
                    <Button
                        isLoading={isLoading}
                        type='submit'
                    >
                        {'Log in'}
                    </Button>
                </div>
            </form>
        </div>
    );
}