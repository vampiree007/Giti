import { Star } from '@mui/icons-material';
import { Avatar, Card, Grid } from '@mui/material';
import moment from 'moment';
import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import ContributorChart from '../../component/charts/contributorChart.component';
import ChartComponent from '../../component/charts/totalChart.component';
import ContainerComponent from '../../container/container.component';
import './repo.styles.scss';

function RepoPage() {
    const { repoName } = useParams();
    const repos = useSelector(state => state.repo.repos);
    let repo = repos?.filter(repo => { return repo.name === repoName });
    repo = repo && repo[0];
    console.log(repo)

    if (!repo) return <div>loading.. .</div>

    return (
        <ContainerComponent header={true}>
            <div className='repo'>
                <Card>
                    <div className="repo__top">
                        <div className="repo__top__child repo__top__child-left">
                            <Avatar sx={{ width: 154, height: 154 }} variant='square' src={repo?.owner?.avatar_url} />
                        </div>
                        <div className="repo__top__child repo__top__child-right">
                            <h1>{repoName}</h1>
                            <p>{repo?.description}</p>
                            <p className='repo__link'>Repo Link: <span>{repo?.html_url}</span></p>
                            <div className="repo__top__data">
                                <div className="repo__top__data__child">
                                    <Star className='icon' />  {repo?.stargazers_count}
                                </div>
                                <div className="repo__top__data__child">
                                    <img src="/pull-request.png" alt="pr" />  {repo?.open_issues_count}
                                </div>
                                <div className="repo__top__data__child">
                                    <p>Last pushed on &nbsp; </p> <br />
                                    <p><span>{moment(repo?.updated_at).format('MMMM Do YYYY, h:mm:ss a')}</span> by  <span> {repo?.owner?.login}</span>.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
            <div className='chartz'>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Card>
                            <ChartComponent owner={repo?.owner.login} repo={repo.name} />
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card>
                            <ContributorChart owner={repo?.owner.login} repo={repo.name} />
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </ContainerComponent>
    )
}
//<ChartComponent owner={repo?.owner.login} repo={repo.name} />
export default RepoPage