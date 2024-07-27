import { Box, Button, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

import InputAdornment from '@mui/material/InputAdornment';
import { searchRetreateItems } from '../api/wellnessApi';
import RetreateCards from './RetreateCards';
import TextField from '@mui/material/TextField';

import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
const Search = ({ pagination, setPagination }) => {

    let [searchData, setSearchData] = useState({});
    const [currentPage, setcurrentPage] = useState(1);
    let [data, setData] = useState([])
    
    let itemPerPage = 2;
    let totalItemCount = data.length;
    const totalPageCount = Math.ceil(totalItemCount / itemPerPage);

    
    useEffect(() => {
        console.log('searchdata:: ', data);
    }, [data, pagination, currentPage,searchData])

    const handleSearch = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setSearchData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }
    const handlePageChange = (event, value) => {
        setcurrentPage(value);
    };

    const handleClickSearch = () => {
        console.log('search called');
        searchRetreateItems(searchData.searchInput)
            .then(response => {
                console.log('seacrh response :: ', response);
                setData(response);

            })
            .catch(error => {
                console.log('error:: ', error);
            })

        setPagination(prevData => ({
            ...prevData,
            ['mainPage']: false,
            ['filter']: false,
            ['search']: true
        }))
        

    }
    const handleBack = () => {

        setData([]);
        setPagination(prevData => ({
            ...prevData,
            ['mainPage']: true,
            ['filter']: false,
            ['search']: false
        }))
        setSearchData({})
    };

    return (
        <Box className='introduction'>

            <Box
                style={{
                    position: 'absolute', top: '2%', right: '2%'
                    
                }}>
                <TextField
                    label='Type here to search'
                    name='searchInput'
                    
                    sx={{ width: '35ch' }}
                    onChange={handleSearch}
                    value={searchData.searchInput}
                    InputProps={{
                        endAdornment:
                            <InputAdornment
                                sx={{ cursor: 'pointer' }}
                                position="start"
                                onClick={handleClickSearch}>
                                <SearchIcon />
                            </InputAdornment>,
                    }}
                    variant='standard'
                    color='secondary'
                    size='medium'
                />
            </Box>


            <Box className='retreates'>
                {
                    pagination.search &&
                    <>
                        <Button  size='medium'  onClick={handleBack}><ReplyRoundedIcon/></Button>
                        <RetreateCards localData={data} currentPage={currentPage} handlePageChange={handlePageChange} pagination={pagination} totalPageCount={totalPageCount} />
                    </>

                }



            </Box>

        </Box>
    )
}
export default Search;