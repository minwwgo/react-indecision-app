import React from 'react';
const Action =(props)=>
    (
        <div>
            <button 
            className='big-button'
            disabled={!props.hasOption}
            onClick={props.handlePick}> Make Decision</button>

        </div>
    )

export default Action;