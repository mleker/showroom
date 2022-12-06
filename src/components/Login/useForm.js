import { useState, useReducer, useEffect } from 'react';
import { login, useTokenState, useTokenDispatch } from '../../context';
import { validate } from './validate';

const formReducer = (state, event) => {
    if (event.reset) {
        return {
            name: '',
            password: '',
        }
    }

    return ({
        ...state,
        [event.name]: event.value
    })
}

export const useForm = () => {
    const [formData, setFormData] = useReducer(formReducer, {});
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState();
    const { isLoading } = useTokenState();
    const dispatch = useTokenDispatch();

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        if (Object.keys(errors).length === 0 && isSubmitted) {
            const payload = { name: formData, email: formData.password }
            login(dispatch, payload, signal)
                .then(() => {
                    setFormData({ reset: true });
                    setIsSubmitted(false);
                })
                .catch((error) => console.log(error));
        } else {
            setIsSubmitted(false);
        }

        return () => controller.abort();
    }, [errors, isSubmitted])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(validate(formData));
        setIsSubmitted(true);
    }

    const handleChange = (e) => setFormData({
        name: e.target.name,
        value: e.target.value,
    });

    return {
        formData,
        errors,
        isLoading,
        handleChange,
        handleSubmit,
    }
};