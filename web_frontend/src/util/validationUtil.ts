const nameRegex = /^[a-zA-Z]+$/;
const addressRegex = /^[a-zA-Z0-9\s,'-]*$/;
const mobileRegex = /^[0-9]{10}$/;

export const validateName = (name: string) => {
  return nameRegex.test(name);
};

export const validateAddress = (address: string) => {
  return addressRegex.test(address);
};

export const validateMobile = (mobile: string) => {
  return mobileRegex.test(mobile);
};
