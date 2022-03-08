import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axioz from '../../configs/axios.config';
import SkeletonComponent from '../skeleton/skeleton.component';

const createOptions = (data) => {
    return {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Total Changes'
        },
        subtitle:{
            text: 'Total Changes in last one year'
        },
        yAxis: {
            title: {
                text: 'Total Commits'
            }
        },
        xAxis: {
            title: {
                text: 'Range: Week 1 to 52'
            }
        },
        series: [
            {
                name: 'Commits',
                data: data,
                color: 'orange',
            }
        ],
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: true
                },
                pointStart: 1
            }
        },
    };
}

const ChartComponent = ({ repo }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axioz.get(`https://api.github.com/repos/${repo?.owner.login}/${repo.name}/stats/commit_activity`).then(res => {
            res = res.data;
            const frequency = res.map(item => {
                return item.total
            })
            const dates =  res.map(item => {
                return item.week
            })
            setData(createOptions(frequency));
        }).catch(err => {
            console.log(err)
        })
        return () => {
            setData(null)
        }
    }, [repo])

    if (!data) return <SkeletonComponent />

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={data} />
        </div>
    )
}

export default ChartComponent