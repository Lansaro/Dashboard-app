import React, { useState, useEffect, PureComponent } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MyLineChart = (props) => {
    // PASSING AVAILABLE TABLES TO CHOOSE FROM
    // GETTING INDIVIDUAL GRAPH INFO
    // PASSING DELETE FUNCTION FOR THE GRAPH
    const { tablesArr, graph, index, updateGraph, deleteGraph } = props;

    // UPDATING THE LIST OF TABLES TO SELECT FROM
    const tables = [{tableName: 'Please select Source Table'}, ...tablesArr]
    // eslint-disable-next-line
    const [selectedTable, setSelectedTable] = useState(graph.tableId);
    const [apiData, setApiData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const headersAll = ['Select Column', ...headers]

    // DATA ARRAY TO POPULATE GRAPH
    const data = apiData;

    // SELECTING DIMENSIONS
    const [x, setX] = useState(graph.xAxis);
    const [y, setY] = useState(graph.yAxis);

    // console.log(data)
    // console.log('X: ', x)
    // console.log('Y: ', y)

    // FETCHING CURRENT GRAPH/TABLE DATA
    useEffect(() => {
        if (selectedTable) {
            axios
                .get(`http://localhost:8000/api/JSON/${selectedTable}`)
                .then((response) => {
                    setHeaders(response.data.headers);
                    setApiData(response.data.json.array);
                })
                .catch((error) => {console.log(error.response)})
            }
    // eslint-disable-next-line
    }, []);

    // GETTING DATA FROM THE SELECTED SOURCE TABLE
    const handleSelection = (e) => {
        e.preventDefault();
        if (e.target.value !== 'Please select Source Table') {
            setSelectedTable(e.target.value);
            axios
                .get(`http://localhost:8000/api/JSON/${e.target.value}`)
                .then((response) => {
                    setHeaders(response.data.headers);
                    setApiData(response.data.json.array);
                    if (response.data.json) {
                        updateGraph(graph._id, e.target.value, '', '', graph.type, index);
                        setX('');
                        setY('');
                    }
                })
                .catch((error) => {console.log(error.response)});
        } else {
            setHeaders([]);
            setApiData([]);
            setSelectedTable('');
            setX('');
            setY('');
            updateGraph(graph._id, '', '', graph.type, index);
        }
    };

    // UPDATING X AND Y AXIS
    const handleX = (e) => {
        setX(e.target.value)
        updateGraph(graph._id, selectedTable, e.target.value, y, graph.type, index);
    };
    const handleY = (e) => {
        setY(e.target.value)
        updateGraph(graph._id, selectedTable, x, e.target.value, graph.type, index);
    };

    return (
        <div className='Graph'>
            <div>
                <select onChange={handleSelection} defaultValue={selectedTable}>
                    {tables.map((table, index) => {
                        return (
                            <option key={index} value={table._id}>{table.tableName}</option>
                        )
                    })}
                </select>
                { selectedTable !== '' ?
                    <select onChange={handleX} defaultValue={x}>
                        {headersAll.map((header, index) => {
                            return (
                                <option key={index} value={header}>{header}</option>
                            )
                        })}
                    </select>
                : null }
                { selectedTable !== '' ?
                    <select onChange={handleY} defaultValue={y}>
                        {headersAll.map((header, index) => {
                            return (
                                <option key={index} value={header}>{header}</option>
                            )
                        })}
                    </select>
                : null }
            </div>
            <div className='Visual'>
                <ResponsiveContainer width='100%' height='100%'>
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 50,
                            right: 50,
                            left: 20,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid vertical={false} strokeDasharray='3 3' />
                        <XAxis dataKey={x} tick={{ fill: 'white', fontWeight: 'bold' }}/>
                        <YAxis type='number' tick={{ fill: 'white', fontWeight: 'bold' }} domain={['auto', dataMax => (dataMax * 1.2)]}/>
                        <Tooltip
                            labelStyle={{ color: 'green', fontWeight: 'bold' }}
                            itemStyle={{ color: 'red', fontWeight: 'bold' }}
                        />
                        <Legend />
                        <Line type='monotone' dataKey={y} stroke='#feb201' activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <span className='Delete' onClick={() => deleteGraph(graph._id, index)}>&times;</span>
        </div>
    )
}

export default MyLineChart;