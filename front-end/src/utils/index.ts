//generate IDs to rows
const generateAutoIds = (
    rows: {
      name: string;
      gender: string;
      address: string;
      mobile: number;
      birthday: Date;
      age: number;
    }[]
  ) => {
    return rows.map((row, index) => ({ ...row, id: index + 1 }));
  };

export {generateAutoIds};