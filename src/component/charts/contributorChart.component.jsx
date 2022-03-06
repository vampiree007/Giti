import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axioz from '../../configs/axios.config';
import SkeletonComponent from '../skeleton/skeleton.component';

const createOptions = (data, categories) => {
    return {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Individual Contributions'
        },
        subtitle:{
            text: 'Individual Contribution past 7 Days'
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total Commits'
            }
        },
        xAxis: {
            categories
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

const ContributorChart = ({ owner, repo }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const URL = `https://api.github.com/repos/${owner}/${repo}/stats/contributors`
        axioz.get(URL).then(res => {
            res = res.data;
            const contributor = res.map(item => {
                return item.author.login
            })
            
            const data = res.map(item => {
                return item.weeks[0].c
            })
            console.log(data)
            setData(createOptions(data, contributor));
        })
    }, [repo])

    if (!data) return <SkeletonComponent />

    return (
        <div>

            <HighchartsReact highcharts={Highcharts} options={data} />
        </div>
    )
}

export default ContributorChart