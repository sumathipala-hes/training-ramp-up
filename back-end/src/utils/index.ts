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

const userRoles = {
  user: "user",
  admin: "admin"
}


  export {calculateAge, userRoles};