export const isEmailValid = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};

export const isPasswordConfirmed = (password: string, confirmedPassword: string) => {
  if (password === confirmedPassword) {
    return true;
  }
}

export const isPasswordValid = (password: string) => {
  if (password.length >= 6) {
    return true;
  };
};
