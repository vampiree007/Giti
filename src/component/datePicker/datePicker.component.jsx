import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveFilterDate } from '../../redux/slices/filter/filter.slice';

const DatePicker = () => {
    const dispatch = useDispatch();
    const { activeFilterDate } = useSelector(state => state.filter);

    const handleChange = (newValue) => {
        var date = new Date(newValue); // some mock date
        var ms = date.getTime();
        dispatch(setActiveFilterDate(ms))
    };

    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <Stack spacing={3}>
                <DesktopDatePicker
                    
                    value={activeFilterDate}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Stack>
        </LocalizationProvider>
    );
}
export default DatePicker;