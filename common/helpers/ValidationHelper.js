const checkAsync = (validator) => {
    return new Promise((resolve, reject) => {
        function passes() {
            resolve({
                pass: true,
                errors: {}
            });
        }

        function fails() {
            const errors = validator.errors.all();
            const ordered_errors = {};
            Object.keys(errors).sort().forEach((key) => {
                if (key.includes('.')) {
                    if (/^\d+$/.test(key.substr(key.lastIndexOf('.') + 1))) {
                        const new_key = key.substr(0, key.lastIndexOf('.'));
                        if (ordered_errors[new_key]) {
                            ordered_errors[new_key].push(...errors[key]);
                        } else {
                            ordered_errors[new_key] = errors[key];
                        }
                    } else
                        ordered_errors[key] = errors[key];
                } else
                    ordered_errors[key] = errors[key];
            });
            resolve({
                pass: false,
                errors: ordered_errors
            });
        }

        try {
            validator.checkAsync(passes, fails);
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    checkAsync,
};