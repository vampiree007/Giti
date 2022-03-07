import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axioz from '../../configs/axios.config';
import SkeletonComponent from '../skeleton/skeleton.component';

const createOptions = (data, categories, title) => {
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
                text: `Total ${title}`
            }
        },
        xAxis: {
            categories
        },
        series: [
            {
                name: title,
                data: data,
                color: '#55BF3B',
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

const ContributorChart = ({ repo, selectValue }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const URL = `https://api.github.com/repos/${repo?.owner.login}/${repo.name}/stats/contributors`
        axioz.get(URL).then(res => {
            res = res.data;
            const contributor = res.map(item => {
                return item.author.login
            })
            
            const data = res.map(item => {
                return item.weeks[0][selectValue]
            })
            let title = selectValue === 'c' ? 'Commits' : selectValue === 'a' ? 'Additions' : 'Deletions'
            setData(createOptions(data, contributor, title));
        }).catch(err => {
            console.log(err)
        })
    }, [selectValue, repo])

    if (!data) return <SkeletonComponent />

    return (
        <div>

            <HighchartsReact highcharts={Highcharts} options={data} />
        </div>
    )
}

export default ContributorChart