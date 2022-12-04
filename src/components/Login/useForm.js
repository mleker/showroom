import { useState, useEffect, useReducer } from 'react';

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

export const useForm = (callback, validate) => {
    const [formData, setFormData] = useReducer(formReducer, {});
    const [errors, setErrors] = useState({});
    const [isSubmiting, setIsSubmiting] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        if (Object.keys(errors).length === 0 && isSubmiting) {
            callback(formData, signal)
                .then(
                    () => {
                        setFormData({ reset: true });
                        setIsSubmiting(false);
                    },
                    (error) => {
                        setIsSubmiting(false);
                    }
                );
        } else {
            setIsSubmiting(false);
        }

        return () => controller.abort();
    }, [errors])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(validate(formData));
        setIsSubmiting(true);
    }

    //   event.persist();
    const handleChange = (e) => setFormData({
        name: e.target.name,
        value: e.target.value,
    });

    return {
        formData,
        errors,
        isSubmiting,
        handleChange,
        handleSubmit,
    }
};