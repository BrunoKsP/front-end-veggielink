import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ptBR } from "@mui/x-date-pickers/locales";
import { styled } from '@mui/material/styles'; 
import dayjs from "dayjs";

interface BasicDatePickerProps {
  label: string;
  defaultValue?: Date | null; 
  onChange: (date: Date | null) => void;
}

const StyledDatePicker = styled(DatePicker)({
  '& .MuiInputBase-root': {
    fontSize: '1rem', 
    height: '60px',
    width: '300px'
  },
});

const BasicDatePicker: React.FC<BasicDatePickerProps> = ({ label, defaultValue, onChange }) => {
  const defaultDayjsValue = defaultValue ? dayjs(defaultValue) : null;

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}
    >
      <StyledDatePicker
        label={label}
        defaultValue={defaultDayjsValue} 
        onChange={(date) => onChange(date ? date.toDate() : null)}
      />
    </LocalizationProvider>
  );
};

export default BasicDatePicker;