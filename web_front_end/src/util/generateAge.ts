export const generateAge = (dobString: string): number => {
    const today: Date = new Date();
    const birthDate: Date = new Date(dobString);
    const age: number = today.getFullYear() - birthDate.getFullYear();
    
    if (today.getMonth() < birthDate.getMonth() || 
        (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    
    return age;
  };
  