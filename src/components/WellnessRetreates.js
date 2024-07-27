import { useEffect, useState } from "react";
import Retreates from "./Retreates";
import { getRetreatesItems } from '../api/wellnessApi'
import Filter from "./Filter";
import Search from "./Search";


const WellnessRetreates = () => {
    const [localData, setLocalData] = useState([]);
    const [pagination, setPagination] = useState({ mainPage: true, filter: false, search: false });




    useEffect(() => {
        getDetails();

    }, [])

    useEffect(() => {
        console.log(' :: localData :: ', localData);
    }, [localData])

    function getDetails() {
        getRetreatesItems()
            .then(response => {

                setLocalData(response)
            })
            .catch(error => {
                console.log('error:: ', error)
            })
    }


    return (

        <div className='wellness'>
            <div className="filterSearchBox"
                style={{
                    margin: '2%', display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row'
                }}
            >

                <Search localData={localData} pagination={pagination} setPagination={setPagination} />
                <Filter localData={localData} pagination={pagination} setPagination={setPagination} />
            </div>

            <Retreates localData={localData} pagination={pagination} setPagination={setPagination} />

        </div>

    )
}

export default WellnessRetreates;