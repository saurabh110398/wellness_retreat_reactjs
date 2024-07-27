import { Box, Button, duration, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const DateRangeFilter = ({ localData, filteredData, setFilteredData }) => {
    

    useEffect(() => {
        console.log('Dta localdata:: ', localData);

    }, [localData])
   

    
    let [startDate, setStartDate] = useState();
    let [endDate, setEndDate] = useState();

    const handleChange = (range) => {
        console.log('range:: ',range);
        const [startDate, endDate] = range;
        setStartDate(startDate);
        setEndDate(endDate);
    };

    useEffect(() => {
        console.log('Dta startDate:: ', startDate);

    }, [startDate])
    useEffect(() => {
        if(endDate != undefined){
            startDate =Math.floor(startDate.getTime() / 1000)
            endDate =Math.floor(endDate.getTime() / 1000)
            setFilteredData(prevData => ({
                ...prevData,
                ['startDate']: startDate,
                ['endDate']: endDate
            }))
            console.log('Dta endDate:: ', endDate);
        }
        

    }, [endDate])


    return (
        <div >
            <Typography>Date </Typography>
            <DatePicker
            
                selected={startDate}
                onChange={handleChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
            />
       
        </div>
    )
}

export default DateRangeFilter;