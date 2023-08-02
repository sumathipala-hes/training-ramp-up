import { GridRowsProp } from '@mui/x-data-grid';

const usedIDs: number[] = [];

export const generateID = () => {
  let randomID;
  do {
    randomID = Math.floor(Math.random() * 100);
  } while (usedIDs.includes(randomID));

  usedIDs.push(randomID);
  return randomID;
};

export const initialRows: GridRowsProp = [
  {
    id: generateID(),
    name: 'Ted',
    gender: 'Male',
    address: 'toronto',
    mobile: '767778984',
    dateOfBirth: new Date('1990-01-05').toString(),
  },
  {
    id: generateID(),
    name: 'Rachel',
    gender: 'Female',
    address: 'sydney',
    mobile: '67778988',
    dateOfBirth: new Date('2000-07-25').toString(),
  },
  {
    id: generateID(),
    name: 'Justin',
    gender: 'Male',
    address: 'Ohio',
    mobile: '767778909',
    dateOfBirth: new Date('2002-03-02').toString(),
  },
  {
    id: generateID(),
    name: 'Emma',
    gender: 'Female',
    address: 'toronto',
    mobile: '767778899',
    dateOfBirth: new Date('1995-01-05').toString(),
  },
];
