import React from 'react';

const TableFooter = ( {hasWeekend} ) => {
    const colSpanCount = hasWeekend ? 8 : 6;
    return(
        <tfoot>
            <tr className = 'timetable_footer'>
                <td colSpan = {colSpanCount}>총 학점</td>
            </tr>
        </tfoot>
    )
}

export default TableFooter;