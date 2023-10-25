const _nameRegExp = /^[a-zA-Z ]+$/;
const _addressRegExp = /^[a-zA-Z0-9 ]+$/;
const _telNoRegExp = /^(07(0|1|2|4|5|6|7|8)[0-9]{7})$/;

export const validateName = (name: string): string | null => {
  if (name.trim() === "") {
    return "Name cannot be empty";
  } else if (name.trim().length > 50) {
    return "Name cannot be longer than 50 characters";
  } else if (!_nameRegExp.test(name)) {
    return "Name can only contain letters and spaces";
  }

  return null;
};

export const validateAddress = (address: string): string | null => {
  if (!_addressRegExp.test(address)) {
    return "Address can only contain letters, numbers, and spaces";
  }

  return null;
};

export const validateMobileNumber = (mobileNumber: string): string | null => {
  if (!_telNoRegExp.test(mobileNumber)) {
    return "Invalid mobile number";
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
