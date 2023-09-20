//calculate the age from birthday
const calculateAge = (inputDate: Date) => {
  const birthDate = new Date(inputDate);
  const currentDate = new Date();

  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = currentDate.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())
  ) {
    age -= 1;
  }
  return age;
};

//user roles
const userRoles = {
  user: 'user',
  admin: 'admin',
};

//mock student data
const studentsMock = [
  {
    id: 51,
    name: 'James',
    gender: 'male',
    address: 'Colombo',
    mobile: '0715425468',
    birthday: '2005-08-01',
    age: 18,
  },
  {
    id: 53,
    name: 'Nimal',
    gender: 'male',
    address: 'Gampaha',
    mobile: '0715421885',
    birthday: '2001-06-14',
    age: 22,
  },
];

//mock request
const mockRequest: Request = {
  cache: 'default',
  credentials: 'include',
  destination: '',
  headers: undefined,
  integrity: '',
  keepalive: false,
  method: '',
  mode: 'same-origin',
  redirect: 'error',
  referrer: '',
  referrerPolicy: '',
  signal: undefined,
  url: '',
  clone: function (): Request {
    throw new Error('Function not implemented.');
  },
  body: undefined,
  bodyUsed: false,
  arrayBuffer: function (): Promise<ArrayBuffer> {
    throw new Error('Function not implemented.');
  },
  blob: function (): Promise<Blob> {
    throw new Error('Function not implemented.');
  },
  formData: function (): Promise<FormData> {
    throw new Error('Function not implemented.');
  },
  json: function (): Promise<any> {
    throw new Error('Function not implemented.');
  },
  text: function (): Promise<string> {
    throw new Error('Function not implemented.');
  },
};

//mock user data
const mockUser = {
  name: 'John',
  username: 'john@gmail.com',
  role: 'user',
  password: 'abcd1234',
};

//mock student single data
const mockStudent = {
  id: 2,
  name: 'James',
  gender: 'male',
  address: 'Colombo',
  mobile: '0715426598',
  birthday: '2005-08-01',
  age: 18,
};

export {
  calculateAge,
  userRoles,
  studentsMock,
  mockRequest,
  mockUser,
  mockStudent,
};
