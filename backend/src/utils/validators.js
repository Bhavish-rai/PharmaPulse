const isValidString = (value) => {
    return (
        typeof value === "string" &&
        value.trim().length > 0
    );
};

const isValidNumber = (value) => {
    return (
        value !== null &&
        value !== undefined &&
        value !== "" &&
        !isNaN(Number(value))
    );
};

const isPositiveNumber = (value) => {
    return isValidNumber(value) && Number(value) > 0;
};

const isNonNegativeNumber = (value) => {
    return isValidNumber(value) && Number(value) >= 0;
};

const validateMedicine = ({
    name,
    category,
    stock,
    price
}) => {
    const errors = {};

    if (!isValidString(name)) {
        errors.name = "Medicine name is required";
    }

    if (!isValidString(category)) {
        errors.category = "Medicine category is required";
    }

    if (!isNonNegativeNumber(stock)) {
        errors.stock = "Stock must be a non-negative number";
    }

    if (!isPositiveNumber(price)) {
        errors.price = "Price must be greater than 0";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

const validateStockUpdate = ({
    medicineId,
    quantity
}) => {
    const errors = {};

    if (
        medicineId === undefined ||
        medicineId === null ||
        medicineId === ""
    ) {
        errors.medicineId = "Medicine ID is required";
    }

    if (!isNonNegativeNumber(quantity)) {
        errors.quantity =
            "Quantity must be a non-negative number";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

const validateOrder = ({
    user_id,
    medicine_list
}) => {
    const errors = {};

    if (
        user_id === undefined ||
        user_id === null ||
        user_id === ""
    ) {
        errors.user_id = "User ID is required";
    }

    if (!Array.isArray(medicine_list)) {
        errors.medicine_list =
            "Medicine list must be an array";
    } else if (medicine_list.length === 0) {
        errors.medicine_list =
            "Medicine list cannot be empty";
    } else {
        medicine_list.forEach((item, index) => {
            if (
                item.medicine_id === undefined ||
                item.medicine_id === null ||
                item.medicine_id === ""
            ) {
                errors[`medicine_list[${index}].medicine_id`] =
                    "Medicine ID is required";
            }

            if (!isPositiveNumber(item.quantity)) {
                errors[`medicine_list[${index}].quantity`] =
                    "Quantity must be greater than 0";
            }
        });
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

const validateRecommendation = ({
    medicineId,
    symptoms
}) => {
    const errors = {};

    if (
        (medicineId === undefined ||
            medicineId === null ||
            medicineId === "") &&
        !isValidString(symptoms)
    ) {
        errors.input =
            "Either medicineId or symptoms is required";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

module.exports = {
    isValidString,
    isValidNumber,
    isPositiveNumber,
    isNonNegativeNumber,
    validateMedicine,
    validateStockUpdate,
    validateOrder,
    validateRecommendation
};