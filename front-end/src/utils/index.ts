import { GridPreProcessEditCellProps } from "@mui/x-data-grid";

interface rowData {
  id:number,
  name: string,
  gender: string,
  address: string,
  mobile: number
  birthday: Date,
  age: number,
}

//demo row data
const rows = [
  {
    id: 1,
    name: "John",
    gender: "male",
    address: "Jon",
    mobile: "715426257",
    birthday: "1990-08-15",
    age: 35,
  },
  {
    id: 2,
    name: "Alice",
    gender: "female",
    address: "Wonderland",
    mobile: "715426257",
    birthday: "1991-03-25",
    age: 32,
  },
  {
    id: 3,
    name: "Michael",
    gender: "male",
    address: "New York",
    mobile: "715426257",
    birthday: "1988-11-02",
    age: 38,
  },
  {
    id: 4,
    name: "Emma",
    gender: "female",
    address: "London",
    mobile: "715426257",
    birthday: "1996-02-10",
    age: 27,
  },
  {
    id: 5,
    name: "Daniel",
    gender: "male",
    address: "Paris",
    mobile: "715426257",
    birthday: "1999-12-28",
    age: 34,
  },
  {
    id: 6,
    name: "Olivia",
    gender: "female",
    address: "Los Angeles",
    mobile: "715426257",
    birthday: "1994-07-09",
    age: 30,
  },
  {
    id: 7,
    name: "William",
    gender: "male",
    address: "Sydney",
    mobile: "715426257",
    birthday: "1987-09-21",
    age: 41,
  },
  {
    id: 8,
    name: "Sophia",
    gender: "female",
    address: "Berlin",
    mobile: "715426257",
    birthday: "1986-05-17",
    age: 24,
  },
  {
    id: 9,
    name: "Alexander",
    gender: "male",
    address: "Moscow",
    mobile: "715426257",
    birthday: "2003-01-08",
    age: 36,
  },
];


//generate IDs to rows
const generateAutoIds = ( rows: rowData[]) => {
    return rows.map((row, index) => ({     name: row.name, gender: row.gender, address: row.address, mobile: row.mobile, age:row.age, id: row.id, birthday: new Date(row.birthday)}));
};

//calculate the age from birthday
const calculateAge = (inputDate:Date) => {
  const birthDate = new Date(inputDate);
  const currentDate = new Date();

  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = currentDate.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  return age;
};

//calculate max value for datePicker
const maxDate = () => {
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const year = (currentDate.getFullYear() - 18).toString();
  return `${year}-${month}-${day}`;
}

//calculate min value for datePicker
const minDate = () => {
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const year = (currentDate.getFullYear() - 150).toString();
  return `${year}-${month}-${day}`;
}

//change format of the date
function changeDateFormat(date:Date){
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  return `${day}-${month}-${year}`;
}

//render birtdhday cell
const renderBirthdayCell = (params: any) => {
  const paramsValue = new Date(params.value);
  return changeDateFormat(paramsValue);;
};

function capitalizeFirstLetter(str:string) {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

//validation error alerts
const alerts = {
  name:"Name field can't be empty",
  gender:"Gender value should be male or female",
  age:"Age should be > 18",
  mobile:"Mobile number should be contain 10 numbers",
  text:"Input should be in text format",
  address:"address field can't be empty",

}

//mobile field validation
function mobile(params:GridPreProcessEditCellProps){
    const hasError = /^\d{10}$/.test(params.props.value);
    if(params.hasChanged){
      return { ...params.props, error: !hasError, alert:alerts.mobile};
    }else{
      return { ...params.props,error: !hasError, alert:""};
    }
}

//address field validation
function address(params:GridPreProcessEditCellProps){
  const hasError = params.props.value.length < 1;
  if(params.hasChanged){
    return { ...params.props, error:hasError, alert:alerts.address};
  }else{
    return { ...params.props, error:hasError, alert:""};
  }
}

const validations = {
  mobile:mobile,
  address:address,
}

export {generateAutoIds, calculateAge,  validations, maxDate, minDate, alerts, rows, changeDateFormat, renderBirthdayCell, capitalizeFirstLetter};