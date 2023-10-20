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

const validateStudent = (
    input: string,
    type: "studentName" | "studentAddress" | "studentMobile",
): string | null => {
    return type === "studentName"
        ? input.trim() === ""
            ? "Name cannot be empty"
            : input.trim().length > 50
            ? "Name cannot be longer than 50 characters"
            : !nameRegex.test(input)
            ? "Name can only contain letters and spaces"
            : null
        : type === "studentAddress"
        ? !addressRegex.test(input)
            ? "Address field can't be empty"
            : null
        : type === "studentMobile"
        ? !mobileRegex.test(input)
            ? "Mobile number should be contain 10 numbers"
            : null
        : "Invalid input type";
};

const validateStudentName = (studentName: string) =>
    nameRegex.test(studentName);
const validateStudentAddress = (studentAddress: string) =>
    addressRegex.test(studentAddress);
const validateStudentMobile = (studentMobile: string) =>
    mobileRegex.test(studentMobile);

export {
    maxDate,
    minDate,
    validateStudent,
    validateStudentName,
    validateStudentAddress,
    validateStudentMobile,
};
