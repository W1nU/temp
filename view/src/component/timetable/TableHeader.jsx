import React from 'react';

const TableHeader = ({ hasWeekend }) => {
    const days = ['월', '화', '수', '목', '금'];
    if (hasWeekend) days.push('토','일');
    return(
        <thead>
            <tr>
                <th className = 'table_blank'></th>
                {days.map(i => (<th className = 'table_header' key = {i}>{i}</th>))}
            </tr>
        </thead>
    );
};

export default TableHeader;