import './Button.css';
import classNames from 'classnames';

export const Button = ({ onClick, isLoading, children, type }) => (
    <button
        onClick={onClick}
        className={classNames(isLoading ? 'button_glowing' : 'button')}
        type={type}
    >
        {isLoading ? <div className="spinner" /> : children}
    </button>
)