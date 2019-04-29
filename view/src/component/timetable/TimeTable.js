import React, { Component } from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import TableHeader from './TableHeader.jsx';
import TableBody from './TableBody.jsx';
import TableColgroup from './TableColgroup.jsx';
import TableFooter from './TableFooter.jsx';

import './TimeTable.css';
import { days, colors } from '../consts/consts';

class TimeTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            hasNight: false,
            hasWeekend: false,
            lectureInfo: []               
        }
    }

    _generateDateObj = ( hour ) => {
        //hour = 1800 과 같은 문자열을 받으면 시간에 해당하는 Date 객체를 반환
        let hourObj = new Date(); 
        hourObj.setSeconds(0); //초 부터 설정하여 오작동 방지
        hourObj.setHours(hour.substring(0,2));
        hourObj.setMinutes(hour.substring(2,4));
        return hourObj;
    }

    _subHour = ( startHour, endHour ) => { 
        //시작 시간과 끝 시간을 받아 차를 구해 반환
        const startHourObj = this._generateDateObj(startHour);
        const endHourObj = this._generateDateObj(endHour);
        return endHourObj - startHourObj;
    }

    _parseTime = ( time ) => {
        //time을 받아 _drawLecture에서 사용할 데이터로 가공
        //파싱을 위한 days 변수는 ../consts/consts.js 에서 불러옴
        const parsed = [];
        for (const i in time){
            parsed.push([
                days[time[i]['date']], 
                this._subHour(time[i]['hour'][0], time[i]['hour'][1])/900000, // 15min in ms
                this._subHour('0900', time[i]['hour'][0])/900000
            ]);
        }
        return parsed;
    };
    
    _generateLectureBox = ( lecture, professor, classroom, color, cellCount ) => {
        const newElement = document.createElement('div');
        newElement.className = 'lecture_box';

        const innerElement = document.createElement('div');
        innerElement.className = 'inner_box'
        innerElement.innerHTML = '<b>' + lecture + '<br>' +  professor + '<br>' + classroom + '</b>';

        newElement.appendChild(innerElement);
        newElement.style.height = `${20 * cellCount - 6}px`;
        newElement.style.background = color;
        newElement.style.color = ''
        return newElement;
    }

    _drawLecture = ( lectureInfo, color ) => {
        //컴포넌트가 랜더링된 후 lectureInfo를 파싱하여 Table에 랜더링
        for(const i in lectureInfo){
            const parsedTime = this._parseTime(lectureInfo[i]['time']);
            for(const j in parsedTime){
                const dateCount = parsedTime[j][0]; // 첫번째 칸(mon)부터 강의 날짜 사이의 col 카운트
                const rowCount = parsedTime[j][2]; // 첫번째 줄(0800)부터 강의 시작시간 사이의 row 카운트
                const rowDomObj = document.getElementsByClassName('table_row')[rowCount];
                const cellDomObj = rowDomObj.getElementsByTagName('td')[dateCount];
                cellDomObj.appendChild(this._generateLectureBox(
                    lectureInfo[i]['lecture'],
                    lectureInfo[i]['professor'],
                    lectureInfo[i]['classroom'],
                    lectureInfo[i]['color'],
                    parsedTime[j][1]
                ));
            }
        }
    }

    _hasWeekend = () => { 
        //주말에 수업이 있는지 검사
        for(const i in this.state.lectureInfo){
            for(const j in this.state.lectureInfo[i]['time']){
                if(['sat','sun'].some(x => x === this.state.lectureInfo[i]['time'][j]['date'])){
                    return true;
                }
            }
        }
        return false;
    }

    _hasNight = () => {
        //야간 수업이 있는지 검사
        for(const i in this.state.lectureInfo){
            for(const j in this.state.lectureInfo[i]['time']){
                if(this.state.lectureInfo[i]['time'][j]['hour'].some(x => x > 1800)){
                    return true;
                }
            }
        }
        return false;
    }
    
    _clearTimeTable() {
        //시간표의 모든 Lecture 초기화
        let domObj = document.getElementsByClassName('table_cell');
        for(let i = 0; i < domObj.length; i ++){ //for .. in 문법일 경우 객체의 부가정보 까지 순환하여 정상 동작에 문제가 있음
            if (domObj[i].hasChildNodes()){
                domObj[i].removeChild(domObj[i].lastChild);
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        this._clearTimeTable()
        this._drawLecture(this.state.lectureInfo)
    }

    componentWillMount() {
        this.setState({
            hasWeekend: this._hasWeekend() ? true : false,
            hasNight: this._hasNight() ? true : false
        });
    }

    componentDidMount() {
        this._drawLecture(this.state.lectureInfo);
        setTimeout(() => {
            this.setState({
                lectureInfo: [
                    {
                        lecture: '컴퓨터 네트워크',
                        professor: '서경룡',
                        classroom: 'A13-323',
                        credit: 3,
                        color: 'rgb(206,247,249)',
                        time: [
                            {
                                date: 'wed', 
                                hour: ['1300', '1400']
                            },
                            {
                                date: 'thu',
                                hour: ['1300', '1500']
                            }
                        ]
                    },
                    {
                        lecture: '논리회로',
                        professor: '박승섭',
                        classroom: 'A13-316',
                        credit: 3,
                        color: 'rgb(166,214,195)',
                        time: [
                            {
                                date: 'mon',
                                hour: ['1000', '1200']
                            },
                            {
                                date: 'wed',
                                hour: ['1100', '1200']
                            }   
                        ]                
                    },
                    {
                        lecture: 'UNIX 시스템 및 실습',
                        professor: '윤소영',
                        classroom: 'A13-225',
                        credit: 3,
                        color: 'rgb(102,203,194)',
                        time: [
                            {
                                date: 'tue',
                                hour: ['1000', '1400']
                            }
                        ]                
                    },
                    {
                        lecture: '이산수학',
                        professor: '조우현',
                        classroom: 'A13-125A',
                        credit: 3,
                        color: 'rgb(199,203,211)',
                        time: [
                            {
                                date: 'mon',
                                hour: ['1400', '1500']
                            },
                            {
                                date: 'wed',
                                hour: ['1400', '1600']
                            }   
                        ]                
                    },
                    {
                        lecture: '객체지향 프로그래밍',
                        professor: '정목동',
                        classroom: 'A13-323',
                        credit: 3,
                        color: 'rgb(203,161,188)',
                        time: [
                            {
                                date: 'tue',
                                hour: ['1500', '1700']
                            },
                            {
                                date: 'fri',
                                hour: ['1000', '1200']
                            }   
                        ]                
                    },
                ]
            })
        }, 10010);
    }

    render() {
        return (
            <div>
                <table className = 'timetable'>
                    <TableColgroup hasWeekend = {this.state.hasWeekend} />
                    <TableHeader hasWeekend = {this.state.hasWeekend} />
                    <TableBody hasNight = {this.state.hasNight} hasWeekend = {this.state.hasWeekend}/>
                    <TableFooter hasWeekend = {this.state.hasWeekend} />
                </table>
            </div>
        );
    }
}


export default TimeTable;