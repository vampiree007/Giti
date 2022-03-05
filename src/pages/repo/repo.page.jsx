import { Star } from "@mui/icons-material";
import { Avatar, Card, Container, Grid } from "@mui/material";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ContributorChart from "../../component/charts/contributorChart.component";
import ChartComponent from "../../component/charts/totalChart.component";
import ContainerComponent from "../../container/container.component";
// import "./repo.styles.scss";

function RepoPage() {
  const { repoName } = useParams();
  const repos = useSelector((state) => state.repo.repos);
  let repo = repos?.filter((repo) => {
    return repo.name === repoName;
  });
  repo = repo && repo[0];
  console.log(repo);

  if (!repo) return <div>loading.. .</div>;

  return (
    <ContainerComponent header={true}>
      <Card>
        <Grid container direction={"row"}>
          <Grid item sx={{ p: 2 }} style={{ width: "200px" }}>
            <Avatar
              sx={{ width: 165, height: 165 }}
              variant="square"
              src={repo?.owner?.avatar_url}
            />
          </Grid>
          <Grid item xs spacing={1}>
            <Container>
              <h1 style={{ margin: "0px" }}>{repoName}</h1>
              {/* <p>{repo?.description}</p> */}
              <p style={{ margin: "0px" }}>{repo?.description}</p>
              <p>
                Repo Link: <span>{repo?.html_url}</span>
              </p>
              <Container container style={{ padding: 0 }} sx={{ display: "flex" }}>
                <Container
                  style={{ padding: 0, margin: 0 }}
                  sx={{
                    display: "inline-flex",
                    justifyContent: "left",
                    alignItems: "center",
                    width: "fit-content",
                  }}
                >
                  <Star style={{ color: "#ffcd3c" }} /> {repo?.stargazers_count}
                </Container>

                <Container
                  style={{ padding: 0 }}
                  sx={{
                    display: "inline-flex",
                    justifyContent: "left",
                    alignItems: "center",
                    width: "fit-content",
                    ml: "5%",
                    mr: 0,
                  }}
                >
                  <Avatar
                    src="/pull-request.png"
                    alt="pr"
                    variant="square"
                    sx={{
                      width: 24,
                      height: 24,
                    }}
                  />
                  {repo?.open_issues_count}
                </Container>
                <Container
                  style={{ padding: 0 }}
                  sx={{
                    display: "inline-flex",
                    justifyContent: "left",
                    alignItems: "center",
                    width: "fit-content",
                    ml: "5%",
                  }}
                >
                  Last pushed on{" "}
                  {moment(repo?.updated_at).format("MMMM Do YYYY, h:mm:ss a")} by{" "}
                  {repo?.owner?.login}.
                </Container>
              </Container>
            </Container>
          </Grid>
        </Grid>
      </Card>
      <Grid sx={{ mt: 3 }}>
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
      </Grid>
    </ContainerComponent>
  );
}
//<ChartComponent owner={repo?.owner.login} repo={repo.name} />
export default RepoPage;
