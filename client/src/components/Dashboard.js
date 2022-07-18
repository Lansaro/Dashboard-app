import { useState, useEffect } from 'react';
import axios from 'axios';
import SimpleBarChart from './BarChart';
import HorizontalLineChart from './HorizontalLineChart';
import VerticalLineChart from './VerticalLineChart';
import Table from './Table';

const Dashboard = () => {
    const [graphArr, setGraphArr] = useState([]);
    const [tablesArr, setTablesArr] = useState([]);
    const [file, setFile] = useState();
    const [array, setArray] = useState([]);
    const fileReader = new FileReader();
    const [tableName, setTableName] = useState('');
    const [graphType, setGraphType] = useState('Bar');
    const csvFileToArray = string => {
        const csvHeader = string.slice(0, string.indexOf('\n')).split(',');
        const csvRows = string.slice(string.indexOf('\n') + 1).split('\n');
        const array = csvRows.map(i => {
        const values = i.split(',');
        const obj = csvHeader.reduce((object, header, index) => {
            object[header] = values[index];
            return object;
        }, {});
        return obj;
        });
        setArray(array);
    };
    const headerKeys = Object.keys(Object.assign({}, ...array));

    // FETCHING DATA
    const fetchGraphsData = () => {
        axios
            .get('http://localhost:8000/api/graph')
            .then((allGraphs) => {setGraphArr(allGraphs.data)})
            .catch((err) => console.log(err.response));
    };
    const fetchTablesData = () => {
        axios
            .get('http://localhost:8000/api/JSON')
            .then((allTables) => {setTablesArr(allTables.data)})
            .catch((err) => console.log(err.response));
    };
    useEffect(() => {
        fetchGraphsData();
        fetchTablesData();
    }, []);

    // GRAPH TYPE SPECIFICATION
    const graphTypes = [
        'Bar Chart',
        'Horizontal Line Chart',
        'Vertical Line Chart'
    ];

    // ADDING A GRAPH
    const addGraph = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8000/api/graph', {
                type: graphType,
                tableId: '',
                xAxis: '',
                yAxis: ''
            })
            .then(() => {fetchGraphsData()})
            .catch((err) => {console.log(err.response)})
    };

    // UPDATING GRAPH
    const updateGraph = (id, tableId, x, y, type, index) => {
        // const graphObj = { ...graphArr[index] };
        axios
            .put(`http://localhost:8000/api/graph/${id}`, {
                type: type,
                tableId: tableId,
                xAxis: x,
                yAxis: y
            })
            .then(() => {fetchGraphsData()})
            .catch((err) => {console.log(err.response)})
        // const arrAfterIndex = [...graphArr.slice(index + 1)];
        // setGraphArr(
        //     [...graphArr.slice(0, index), graphObj].concat(arrAfterIndex)
        // );
    };

    // DELETING GRAPH
    const deleteGraph = async (id, graphIndex) => {
        axios
            .delete(`http://localhost:8000/api/graph/${id}`)
            .then(() => {fetchGraphsData()})
                // () => {
                // const filteredGraphs = graphArr.filter((graph, index) => {
                //     return graphIndex !== index;
                // });
                // setGraphArr(filteredGraphs);
            // })
            .catch((err) => {console.log(err.response)});
        
    };

    // DELETING TABLE
    const deleteTable = (id, tableIndex) => {
        axios
            .delete(`http://localhost:8000/api/JSON/${id}`)
            .then(() => {
                const filteredTables = tablesArr.filter((table, index) => {
                    return tableIndex !== index;
                });
                setTablesArr(filteredTables);
                fetchTablesData();
            })
            .catch((err) => {console.log(err.response)})
    };

    // PREVIEW CSV FILE TABLE
    const handlePreview = (e) => {
        e.preventDefault();
        if (file) {
        fileReader.onload = function (event) {
            const text = event.target.result;
            csvFileToArray(text);
        };
        fileReader.readAsText(file);
        }
    };

    // SUBMITTING CSV FILE TO DB
    const handleSubmit = (e) => {
        e.preventDefault();
        if (file) {
        axios
            .post('http://localhost:8000/api/JSON', {
                tableName: tableName,
                headers: headerKeys,
                json: {array}
            })
            .then((response) => {
                console.log('Successfully uploaded');
                console.log(response);
            })
            .catch((error) => console.log(error.response))
        }
    };
    
    return (
        <div>
            <div className='Main'>
                <div className='Tables'>
                    <div>
                        <form>
                            <div>
                                <input
                                    type={'file'}
                                    id={'csvFileInput'}
                                    accept={'.csv'}
                                    onChange={(e)=>setFile(e.target.files[0])}
                                />
                            </div>
                        <div>
                            <label htmlFor='tableName'>Table Name</label>
                            <input type='text' value={tableName} onChange={(e) => setTableName(e.target.value)} />
                        </div>
                            <button onClick={(e) => {handlePreview(e)}}>PREVIEW CSV</button>
                            <button onClick={(e) => {handleSubmit(e)}}>SUBMIT CSV</button>
                        </form>
                    </div>
                    {tablesArr.map((table, index) => {
                        return (
                            <div key={index}>
                                <Table
                                    table={ table }
                                    index={ index }
                                    deleteTable={ deleteTable }
                                />
                            </div>
                        )
                    })}
                </div>
                <div className='Graphs'>
                    <form onSubmit={addGraph}>
                        <select onChange={(e) => setGraphType(e.target.value)} defaultValue={graphType}>
                            {graphTypes.map((type, index) => {
                                return (
                                    <option key={index} value={type}>{type}</option>
                                )
                            })}
                        </select>
                        <button>Add</button>
                    </form>
                    {graphArr.map((graph, index) => {
                        return (
                            <div key={index}>
                                <p className='Color'>Graph ID: {graph._id}</p>
                                <p className='Color'>Table ID: {graph.tableId}</p>
                                <p className='Color'>X: {graph.xAxis}</p>
                                <p className='Color'>Y: {graph.yAxis}</p>
                                <p className='Color'>Type: {graph.type}</p>
                                { graph.type === 'Bar Chart' ?
                                    <SimpleBarChart
                                        tablesArr={ tablesArr }
                                        graph={ graph }
                                        index={ index }
                                        updateGraph={ updateGraph }
                                        deleteGraph={ deleteGraph }
                                    />
                                : graph.type === 'Horizontal Line Chart' ?
                                    <HorizontalLineChart
                                        tablesArr={ tablesArr }
                                        graph={ graph }
                                        index={ index }
                                        updateGraph={ updateGraph }
                                        deleteGraph={ deleteGraph }
                                    />
                                : graph.type === 'Vertical Line Chart' ?
                                    <VerticalLineChart
                                        tablesArr={ tablesArr }
                                        graph={ graph }
                                        index={ index }
                                        updateGraph={ updateGraph }
                                        deleteGraph={ deleteGraph }
                                    />
                                : 
                                    <SimpleBarChart
                                        tablesArr={ tablesArr }
                                        graph={ graph }
                                        index={ index }
                                        updateGraph={ updateGraph }
                                        deleteGraph={ deleteGraph }
                                    />
                                }
                            </div>
                        )
                    })}
                </div>
                <div className='Chat'></div>
            </div>
        </div>
    )
}

export default Dashboard;