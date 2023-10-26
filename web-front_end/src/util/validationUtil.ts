const _nameRegExp = /^[a-zA-Z ]+$/;
const _addressRegExp = /^[a-zA-Z0-9 ]+$/;
const _telNoRegExp = /^(07(0|1|2|4|5|6|7|8)[0-9]{7})$/;

export const validateInput = (input: string, type: "name" | "address" | "mobileNumber"): string | null => {
  switch (type) {
    case "name":
      if (input.trim() === "") {
        return "Name cannot be empty";
      } else if (input.trim().length > 50) {
        return "Name cannot be longer than 50 characters";
      } else if (!_nameRegExp.test(input)) {
        return "Name can only contain letters and spaces";
      }
      break;

    case "address":
      if (!_addressRegExp.test(input)) {
        return "Address can only contain letters, numbers, and spaces";
      }
      break;

    case "mobileNumber":
      if (!_telNoRegExp.test(input)) {
        return "Invalid mobile number";
      }
      break;

    default:
      return "Invalid input type";
  }

  return null;
};

export const validateNameInput = (name: string) => {
  return _nameRegExp.test(name);
};

export const validateAddressInput = (address: string) => {
  return _addressRegExp.test(address);
};

export const validateMobileInput = (mobile: string) => {
  return _telNoRegExp.test(mobile);
};

export const maxDate = () => {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = (date.getFullYear() - 18).toString();
  return `${year}-${month}-${day}`;
};

export const minDate = () => {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = (date.getFullYear() - 50).toString();
  return `${year}-${month}-${day}`;
};
