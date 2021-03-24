import React, { useEffect, useState } from 'react';

import { YEAR } from './constant'
import Box from './box'
import { FetchData, getQueryParams } from './utils'

const initialState = {
    data: {},
    isLoading: true,
    filter: {}
}



const Home = () => {
    const [state, setState] = useState(initialState);
    const { isLoading, data } = state;
    console.log('data',data,typeof data);

    useEffect(() => {
        FetchData(setState, state, getQueryParams());
    }, []);

    useEffect(() => {
        console.log("i am called filter", state.filter);
        const query = getQueryParams();
        if (JSON.stringify(query) === JSON.stringify(state.filter)) {
            return;
        }
        console.log("i am after called filter", state.filter);
        const temp = { ...state.filter };
        FetchData(setState, state, temp);
    }, [state.filter]);


    const manageFilter = (e) => {
        e.preventDefault();
        setState({ ...state, filter: { ...state.filter, [e.target.getAttribute('data-act')]: e.target.value } })
    }

    const clearFilter = () => {
        setState({ ...state, filter: {} })
    }

    return (
        <div className='wrapper'>
            <h1>SpaceX Launch Programs</h1>
            <div className='container'>
                <div className='filter' >
                    <h2>Filter</h2>
                    <div className='sub-h'>Launch Year</div>
                    <div className='fltr-btn-container'>
                        {YEAR.map((item, index) => (<button className={item==state.filter.launch_year? 'btn_fltr active': 'btn_fltr'} onClick={manageFilter} key={index} data-act='launch_year' value={item}>{item}</button>))}
                    </div>

                    <div className='sub-h'> Successful Launch</div>
                    <div className='fltr-btn-container'>
                        <button className={`btn_fltr ${state.filter.launch_success =='true' ? 'active': ''}`} onClick={manageFilter} data-act='launch_success' value='true'>True</button>
                        <button className={`btn_fltr ${state.filter.launch_success == 'false'? 'active': ''}`} onClick={manageFilter} data-act='launch_success' value='false'>False</button>
                    </div>
                    <div className='sub-h'>Successful Landing</div>
                    <div className='fltr-btn-container'>
                        <button className={`btn_fltr ${state.filter.land_success =='true' ? 'active': ''}`} onClick={manageFilter} data-act='land_success' value='true'>True</button>
                        <button className={`btn_fltr ${state.filter.land_success == 'false'? 'active': ''}`} onClick={manageFilter} data-act='land_success' value='false'>False</button>
                    </div>
                    {/* <div className='sub-h'>Clear Filter</div>
                    <button className='btn_fltr' onClick={clearFilter}>Clear Filter</button> */}
                </div>
                <div className='container-right'>
                    {state.isLoading ?  <div className='loading'>Loading...</div> : null}
                    {!isLoading && Object.keys(data).length == 0 ? <div className='loading'>No data found...</div> 
                    : Object.keys(data).length && data.map((doc, index) => (<Box key={index} data={doc} />))
                    }
                </div>
            </div>
        </div>
    );

}
export default Home;