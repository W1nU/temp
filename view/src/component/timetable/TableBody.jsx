import React from 'react';

function _timeAdd (time) { //시간 계산 함수
    let currentTime = new Date();
    time = String(time);
    currentTime.setSeconds(0); // 설정중에 60초가 되어서 시간이 잘못 계산될 경우를 예방하기 위해 초부터 세팅
    currentTime.setHours(time.substring(0,2));
    currentTime.setMinutes(time.substring(2,4));
    currentTime.setMinutes(currentTime.getMinutes() + 15);
    const returnHour = currentTime.getHours().toString().length === 1 ? '0' + currentTime.getHours() : currentTime.getHours();
    const returnMin = currentTime.getMinutes().toString().length === 1 ? currentTime.getMinutes() + '0' : currentTime.getMinutes();
    return (returnHour.toString() + returnMin.toString());
}

const TableBody = ( {hasWeekend, hasNight} ) => {
    let tableRow;
    const scripts = [];
    const days = ['mon', 'tue', 'wen', 'thu', 'fri'];

    if(hasWeekend) days.push('sat', 'sun') ;
    hasNight ? tableRow = 48: tableRow = 36;

    let time = '0900'; // 각 cell의 key값을 위한 변수

    for(let i = 0; i < tableRow; i++){
        let colScripts = [];
        if (time.substring(2) === '00'){ // 만약 time이 테이블에 헤더로써 표시해야 하는 시간이면 -> 정각을 의미함 (0800)
            colScripts = days.map(j => (<td className = 'table_cell' key = {j + time}></td>));
            scripts.push(<tr className='table_row' id = 'hour_row' key = {time}><th className='table_hour' rowSpan='4'>{time.substring(0,2)}</th>{colScripts}</tr>);
        }
        else{
            colScripts = days.map(j => (<td className = 'table_cell' key = {j + time}></td>));
            scripts.push(<tr className='table_row' key = {time}>{colScripts}</tr>);
        }
        time = _timeAdd(time);
    }

    return (
        <tbody>
            {scripts}
        </tbody>
    );
}

export default TableBody;