// import '../App.css'

import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import RetreateCards from './RetreateCards'
import { getPaginatedRetreatesItems } from '../api/wellnessApi'


const Retreates = ({localData, pagination}) => {
    const [pageLocalData, setpageLocalData] = useState([]);
    const [currentPage, setcurrentPage] = useState(1);
    

let totalItemCount = localData.length
    let itemPerPage = 2;
    const totalPageCount = Math.ceil(totalItemCount / itemPerPage);
    // console.log(totalPageCount);
    useEffect(() => {
        generatePaginatedItems()
        // console.log('len',localData.length);
    }, [currentPage,localData])
   

    useEffect(() => {
        // console.log(currentPage, ' ::Paginated pageLocalData :: ', pageLocalData);
    }, [pageLocalData, currentPage])


     function generatePaginatedItems() {
        getPaginatedRetreatesItems(currentPage, itemPerPage)
        .then(response => {
            // console.log('Paginated response::', response);
            setpageLocalData(response)
        })
        .catch(error => {
            console.log('Paginated error:: ', error)
        })

    }


    

    const handlePageChange = (event, value) => {
        setcurrentPage(value);
    };
    return (

        <Box className='retreates'>

           
           {pagination.mainPage &&
           <RetreateCards localData={pageLocalData} currentPage={currentPage} handlePageChange={handlePageChange} totalPageCount={totalPageCount} pagination={pagination} />
           } 
            


        </Box>

    )
}

export default Retreates;