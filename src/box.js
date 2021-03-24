import React from 'react';

const Box = ({ data }) => {
    return (
        <div className='card'>
            <div className='card-img'>
                <img src={data.links.mission_patch_small} alt="img" />
            </div>
            <p className='card_l color-blue'>{data.mission_name} #{data.flight_number} </p>
            <div>
                <p><label className='card_l'>Mission Ids:</label> </p>
                {data.mission_id && data.mission_id && data.mission_id.map((value, index) => (<li key={index}>{value}</li>))}
            </div>
            <p><label className='card_l'>Launch Year:</label> <span className='color-blue'>{data.launch_year}</span> </p>
            <p><label className='card_l'>Successful Launch:</label> <span className='color-blue'>{data.launch_success ? 'true' : 'false'}</span> </p>
            <p><label className='card_l'>Successful Landing:</label> <span className='color-blue'>{data.rocket.first_stage.cores[0].land_success ? 'true' : 'false'}</span> </p>
        </div>
    );

}
export default Box;