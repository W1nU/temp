import React from 'react';

const TableColgroup = ( {hasWeekend} ) => {
    const colCount = hasWeekend ? 7 : 5;
    const scripts = [];
    const ratio = colCount === 5 ? '19%' : '13.5%'
    scripts.push(<col width='5%' key = {colCount} />);
    for(let i = 0; i < colCount; i++){
        scripts.push(<col width={ratio} key = {i} />);
    }
    return (
        <colgroup>
            {scripts}
        </colgroup>
    )
}
export default TableColgroup;