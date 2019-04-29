import React from 'react';

import TimeTable from '../timetable/TimeTable';
import TableCountainerHeader from './TableContainerHeader';

import './TableContainer.css'

const TableContainer = () => {
    return(
        <div>
            <div className = 'table_container'>
                <TableCountainerHeader />
                <TimeTable />
            </div>
        </div>
    )
}

export default TableContainer;