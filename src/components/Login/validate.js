export const validate = (values) => {
    let { mail, password } = values;
    let errors = {};

    if (!mail) {
        errors.mail = 'Please, fill out mail field';
    } else if (!/\S+@\S+\.\S+/.test(mail)) {
        errors.mail = 'Checkout your mail';
    }

    if (!password) {
        errors.password = 'Please, fill out password field';
    }

    return errors;
};