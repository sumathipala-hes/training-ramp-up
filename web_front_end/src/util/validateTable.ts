import {
    GridPreProcessEditCellProps,
} from "@mui/x-data-grid";

const alerts = {
    nameRegex: "Name field can't be empty",
    mobileRegex: "Mobile number should be contain 10 numbers",
    addressRegex: "address field can't be empty",
};

const nameRegex = /^[a-zA-Z]+$/;
const addressRegex = /^[a-zA-Z0-9\s,'-]*$/;
const mobileRegex = /^[0-9]{10}$/;

const maxDate = () => {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const year = (currentDate.getFullYear() - 18).toString();
    return `${year}-${month}-${day}`;
};

const minDate = () => {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const year = (currentDate.getFullYear() - 150).toString();
    return `${year}-${month}-${day}`;
};

function validateName(params: GridPreProcessEditCellProps) {
    const hasError = nameRegex.test(params.props.value);
    return {
        ...params.props,
        style: { color: !hasError ? "red" : "black" },
        error: !hasError,
        alert: alerts.nameRegex,
    };
}

function validateAddress(params: GridPreProcessEditCellProps) {
    const hasError = addressRegex.test(params.props.value);
    return {
        ...params.props,
        style: { color: !hasError ? "red" : "black" },
        error: !hasError,
        alert: alerts.addressRegex,
    };
}

function validateMobile(params: GridPreProcessEditCellProps) {
    const hasError = mobileRegex.test(params.props.value);
    return {
        ...params.props,
        style: { color: !hasError ? "red" : "black" },
        error: !hasError,
        alert: alerts.mobileRegex,
    };
}

export { validateMobile, validateName, validateAddress, maxDate, minDate };
