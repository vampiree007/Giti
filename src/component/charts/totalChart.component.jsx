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
        yAxis: {
            title: {
                text: 'Total Commits'
            }
        },
        xAxis: {
            tickInterval: 7 * 24 * 3600 * 1000, // one week
            tickWidth: 0,
            gridLineWidth: 1,
            title: {
                text: 'Range: Week 1 to 52'
            }
        },
        tooltip: {
            shared: false,
            crosshairs: true,
            formatter: function () {
                let text = `Week: <b>${this.x}</b>  <br>`;
                text += `Changes: <b>${this.y}</b>  <br>`;
                return text
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