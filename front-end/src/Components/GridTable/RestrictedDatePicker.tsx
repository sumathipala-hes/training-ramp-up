import React, { useState } from 'react'
import DatePicker from '@mui/lab/DatePicker'
import { TextField } from '@mui/material'

interface RestrictedDatePickerProps {
    value: Date | null
    onChange: (date: Date | null) => void
    minDate: Date
    maxDate: Date
}

const RestrictedDatePicker: React.FC<RestrictedDatePickerProps> = ({
    value,
    onChange,
    minDate,
    maxDate,
}) => {
    // State to keep track of the selected date
    const [selectedDate, setSelectedDate] = useState<Date | null>(value)

    // Handle date change
    const handleDateChange = (date: Date | null) => {
        // If the selected date is within the allowed range, update the state and call the onChange callback
        if (!date || (date >= minDate && date <= maxDate)) {
            setSelectedDate(date)
            onChange(date)
        }
    }

    return (
        <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            renderInput={(params: any) => <TextField {...params} />}
            minDate={minDate}
            maxDate={maxDate}
        />
    )
}

export default RestrictedDatePicker
