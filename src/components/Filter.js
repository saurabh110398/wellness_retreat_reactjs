import React, { useEffect } from 'react';
import { Box, Button, duration } from '@mui/material';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import MenuItem from '@mui/material/MenuItem';
import RetreateCards from './RetreateCards';
import Select from '@mui/material/Select';
import DateRangeFilter from './DateRangeFilter';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
const Filter = ({ localData, pagination, setPagination }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    let [filteredData, setFilteredData] = useState({});

    let [data, setData] = useState([]);
    let [open, setOpen] = useState(false);
    const [currentPage, setcurrentPage] = useState(1);
    let itemPerPage = 2;
    let totalItemCount = data.length;
    const totalPageCount = Math.ceil(totalItemCount / itemPerPage);



    useEffect(() => {
        console.log('filterreddata:: ', filteredData);
    }, [filteredData])

    useEffect(() => {
        console.log('data:: ', data);
    }, [data])
    useEffect(() => {
        console.log('pagination:: ', pagination);
    }, [pagination])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handlePageChange = (event, value) => {
        setcurrentPage(value);
    };
    const handleApplyFilters = () => {
        
        if (Object.values(filteredData).length == 0) {
            console.log('length:: ', Object.values(filteredData).length);
            setFilteredData(prevData => ({
                ...prevData,
                ['responseText']: 'Atleast one filter should be applied.'
            }))
        }
        else {
            console.log('length:22: ', Object.values(filteredData).length);
            if (filteredData.location != undefined && filteredData.endDate != undefined) {
                data = localData
                    .filter(ele => (ele.date > filteredData.startDate && ele.date <= filteredData.endDate) && ele.location == filteredData.location)
            }

            else {
                data =
                    filteredData.endDate != undefined ?
                        localData
                            .filter(ele => (ele.date > filteredData.startDate && ele.date <= filteredData.endDate))
                        :
                        localData
                            .filter(ele => ele.location == filteredData.location)

            }

            setData(data);
           
            setPagination(prevData => ({
                ...prevData,
                ['mainPage']: false,
                ['filter']: true,
                ['search']: false
            }))

            
            filteredData.responseText = ''
            setTimeout(() => {
                setOpen(false)
            }, 200)

        }

    }
    const handleClearFilter = () => {

        setData([]);
        setPagination(prevData => ({
            ...prevData,
            ['mainPage']: true,
            ['filter']: false,
            ['search']: false
        }))
        setFilteredData({})
    };

    const handleChange = (e) => {

        let name = e.target.name;
        let value = e.target.value;

        setFilteredData(prevData => ({
            ...prevData,
            [name]: value
        }))
    };

    return (
        <div className='introduction'>
            {
                !pagination.search
                &&
                <>
                    {data.length == 0 ?
                        <Button style={{ float: 'right' }} size='medium' variant="contained" color="primary" onClick={handleClickOpen}><FilterListIcon /> Apply Filters</Button>
                        :
                        <Button style={{ float: 'right' }} size='medium' variant="contained" color="primary" onClick={handleClearFilter}><CloseOutlinedIcon /> Clear Filters</Button>
                    }
                    <Dialog
                        open={open}
                        maxWidth='lg'
                        fullScreen={fullScreen}
                        fullWidth={true}
                        TransitionComponent={Transition}
                    
                        onClose={handleClose}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignContent: 'space-around'
                        }}
                    
                    >
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <DialogTitle><h2>Apply Filters By</h2></DialogTitle>
                            <Button onClick={handleClose}><CloseOutlinedIcon /></Button>
                        </div>

                        <DialogContent
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                paddingBottom: '35%',
                            
                            }}>

                            <div>
                                <InputLabel id="demo-simple-select-label">Location</InputLabel>
                                <Select
                                    size="small"
                                    labelId="demo-simple-select-label"
                                    sx={{ width: '45ch' }}
                                    id="location"
                                    name='location'
                                    value={filteredData.location}
                                    label="Location"
                                    onChange={handleChange}
                                >
                                    {[...new Map(localData.map(item =>
                                        [item['location'], item])).values()].map(item => {

                                            return <MenuItem key={item.id} value={item.location}>{item.location}</MenuItem>
                                        })}

                                </Select>
                            </div>
                            <DateRangeFilter localData={localData} filteredData={filteredData} setFilteredData={setFilteredData} />

                        </DialogContent>
                        <DialogActions >
                            <p style={{ color: 'red', paddingRight: '22%' }}>{filteredData.responseText ?? ''}</p>
                            <Button onClick={handleApplyFilters}>Apply Filters</Button>
                            <Button onClick={handleClearFilter}>Clear Filter</Button>
                        </DialogActions>
                    </Dialog>
                    <Box className='retreates'>
                        {
                            pagination.filter &&
                            <>

                                <RetreateCards localData={data} currentPage={currentPage} handlePageChange={handlePageChange} pagination={pagination} totalPageCount={totalPageCount} />
                            </>

                        }
                    </Box>

                </>

            }

        </div>
    )
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default Filter;