import React from 'react';

const LectureBox = ( { lecture, professor, color } ) => {
    return (
        <div className = 'LectureBox' style = {{background : color}}>
            {lecture}
            <br />
            {professor}
        </div>
    )
}

export default LectureBox;