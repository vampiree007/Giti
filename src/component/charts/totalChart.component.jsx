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
            text: 'Total Changes in last 7 days'
        },
        yAxis: {
            title: {
                text: 'Total Commits'
            }
        },
        xAxis: {
            title: {
                text: 'Range: Day 1 to 7'
            }
        },
        series: [
            {
                name: 'Commits',
                data: data
            }
        ],
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 1
            }
        },
    };
}

const ChartComponent = ({ owner, repo }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axioz.get(`https://api.github.com/repos/${owner}/${repo}/stats/commit_activity`).then(res => {
            res = res.data;
            const lastWeek = res[res.length - 1];
            setData(createOptions(lastWeek?.days));
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