import './Button.css';
import classNames from 'classnames';

export const Button = ({ onClick, isLoading, children, type }) => (
    <button
        className={classNames(isLoading ? 'button_glowing' : 'button')}
        onClick={onClick}
        type={type}
    >
        {isLoading ? <div className={'button__spinner'} /> : children}
    </button>
)