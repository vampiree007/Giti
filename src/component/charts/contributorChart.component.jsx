import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axioz from '../../configs/axios.config';
import SkeletonComponent from '../skeleton/skeleton.component';


const createOptions = (data,title) => {
    return {
        chart: {
            type: 'line'
        },
        title: {
            text: `Total ${title}`
        },
        subtitle: {
            text: `Total ${title} in last one year`
        },
        yAxis: {
            title: {
                text: `${title}`
            }
        },
        xAxis: {
            tickInterval: 7 * 24 * 3600 * 1000, // one week
            tickWidth: 0,
            gridLineWidth: 1,
            title: {
                text: 'Range: Week 1 to 52'
            },
        },
        tooltip: {
            shared: false,
            useHTML: true,
            formatter: function () {
                let text = `Week: <b>${this.x}</b>  <br>`;
                text += `${title}: <b>${this.y}</b>  <br>`;
                text += `Contributor: <b>${this.series.name}</b> <br>`
                return text;
            }

        },
        series: data,
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

const filler = (num) => {
    let arr = [];
    for(let i = 1; i <= num; i++){
        arr.push(0)
    }
    return arr
}

const ContributorChart = ({ repo, selectValue }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const URL = `https://api.github.com/repos/${repo?.owner?.login}/${repo.name}/stats/contributors`;
        axioz.get(URL).then(res => {
            res = res.data;
            res = res.map(contro => {
                let data = contro.weeks.map(item => {
                    return item[selectValue]    
                })
                const weeks = data.length;
                if(weeks < 52){
                    const fillWeeks = 52 - data.length;
                    const fillerArray = filler(fillWeeks);
                    data = [...fillerArray, ...data]
                }
                return {
                    name: contro.author.login,
                    data
                }
            })
            let title = selectValue === 'c' ? 'Commits' : selectValue === 'a' ? 'Additions' : 'Deletions'; 
            setData(createOptions(res, title));
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