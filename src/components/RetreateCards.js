import * as React from 'react';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, Stack } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import LocationCityIcon from '@mui/icons-material/LocationCity';
const RetreateCards = ({ localData, currentPage, totalPageCount, handlePageChange, pagination }) => {
    let last;
    let first;

    let [slicedArray, setSlicedArray] = useState([])
    useEffect(() => {
        console.log('localdata from cards:: ', localData);
        last = currentPage * 2;
        first = last - 2;
        slicedArray = localData.slice(first, last);
        setSlicedArray(slicedArray)

    }, [currentPage, localData]);
    


    return (
        <>
            <Box className='retreatesCards' key={`key_${localData.length}`}>

                {pagination.mainPage ?
                    localData.map((item, index) => {
                        
                        return (
                            <Card className='individualCard' key={item.id}>
                                <CardActionArea>
                                    <CardMedia
                                        sx={{ objectFit: 'cover' }}
                                        component="img"
                                        height="200"
                                        width='150'
                                        image={item.image}
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography sx={{ fontWeight: '600' }} color="#002884" gutterBottom variant="h4" component="div">
                                            {item.title}
                                        </Typography>
                                        <Typography sx={{ fontSize: '18px' }}  >
                                            {item.description}
                                        </Typography>
                                        <Typography sx={{ fontSize: '18px' }}>
                                            <LocationCityIcon color='primary' /> {item.location}
                                        </Typography>
                                        <Typography sx={{ fontSize: '18px' }}>
                                            <CurrencyRupeeRoundedIcon color='primary' />{item.price}
                                        </Typography>

                                    </CardContent>
                                </CardActionArea>
                            </Card>

                        )

                    })
                    :

                    slicedArray
                        .map((item, index) => {
                            console.log(index, ':: item :: ', item);
                            return (
                                <>
                                    {/* <p>pagi false</p> */}
                                    <Card className='individualCard' key={item.id}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"

                                                height="250"
                                                width='170'
                                                overflow='hidden'
                                                image={item.image}
                                                alt="green iguana"
                                            />
                                            <CardContent>
                                                <Typography sx={{ fontWeight: '600' }} color="#002884" gutterBottom variant="h4" component="div">
                                                    {item.title}
                                                </Typography>
                                                <Typography sx={{ fontSize: '18px' }}  >
                                                    {item.description}
                                                </Typography>
                                                <Typography sx={{ fontSize: '18px' }}>
                                                    <LocationCityIcon color='primary' /> {item.location}
                                                </Typography>
                                                <Typography sx={{ fontSize: '18px' }}>
                                                    <CurrencyRupeeRoundedIcon color='primary' />{item.price}
                                                </Typography>

                                            </CardContent>
                                           
                                        </CardActionArea>
                                    </Card>
                                </>

                            )

                        })
                }

            </Box>

            <div className='navigate'>
                <Stack spacing={2}>
                    
                    <Pagination
                        color='primary'
                        shape="rounded"
                        count={totalPageCount}
                        currentPage={currentPage}
                        onChange={handlePageChange}
                        showFirstButton showLastButton
                        renderItem={(item) => (
                            <PaginationItem
                                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                                {...item}
                            />
                        )}
                    />
                </Stack>

            </div>
        </>
    )
}

export default RetreateCards;