const nameRegExp = /^[a-zA-Z ]+$/;
const emailRegExp = /^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9-]+)(\.[a-zA-Z]{2,5}){1,2}$/;
const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

export const validateUser = (
    input: string,
    type: "userName" | "userEmail" | "userPassword",
): string | null => {
    return type === "userName"
        ? input.trim() === ""
            ? "User Name cannot be empty"
            : input.trim().length > 50
            ? "User Name cannot be longer than 50 characters"
            : !nameRegExp.test(input)
            ? "User Name can only contain letters and spaces"
            : null
        : type === "userEmail"
        ? !emailRegExp.test(input)
            ? "Invalid User Email"
            : null
        : type === "userPassword"
        ? !passwordRegExp.test(input)
            ? "Invalid User Password"
            : null
        : "Invalid input type";
};

export const validateName = (userName: string) =>
    nameRegExp.test(userName);
export const validateEmail = (userEmail: string) =>
    emailRegExp.test(userEmail);
export const validatePassword = (userPassword: string) =>
    passwordRegExp.test(userPassword);
