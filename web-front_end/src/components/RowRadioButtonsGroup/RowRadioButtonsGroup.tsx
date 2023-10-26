import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { genderEnum } from "../../enum/genderEnum";

interface IRowRadioButtonsGroupProps {
  selectedValue: genderEnum;
  onValueChange: (value: genderEnum) => void;
}

const RowRadioButtonsGroup = ({ selectedValue, onValueChange }: IRowRadioButtonsGroupProps) => {
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(event.target.value as genderEnum);
  };

  return (
    <FormControl component="fieldset">
      <div style={{ display: "flex", alignItems: "center" }}>
        <FormLabel id="gender" sx={{ paddingRight: "1em" }}>
          Gender :
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={selectedValue}
          onChange={handleRadioChange}
        >
          <FormControlLabel value={genderEnum.FEMALE} control={<Radio />} label="Female" />
          <FormControlLabel value={genderEnum.MALE} control={<Radio />} label="Male" />
        </RadioGroup>
      </div>
    </FormControl>
  );
};

export default RowRadioButtonsGroup;
