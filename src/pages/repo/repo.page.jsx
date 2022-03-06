import { Star } from "@mui/icons-material";
import { Avatar, Card, Container, Grid } from "@mui/material";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ContributorChart from "../../component/charts/contributorChart.component";
import ChartComponent from "../../component/charts/totalChart.component";
import ContainerComponent from "../../container/container.component";

function RepoPage() {
  const { repoName } = useParams();
  const repos = useSelector((state) => state.repo.repos);
  //   const styles = useStyles();
  let repo = repos?.filter((repo) => {
    return repo.name === repoName;
  });
  repo = repo && repo[0];
  console.log(repo);

  if (!repo) return <div>loading.. .</div>;

  return (
    <ContainerComponent header={true}>
      <Container>
        <Grid>
          <Card sx={{ p: 2 }}>
            <Grid container direction={{ xs: "column", sm: "row" }}>
              <AvatarStyledComponent>
                <Grid item>
                  <Avatar
                    sx={{ width: "100%", height: "100%" }}
                    variant="rounded"
                    src={repo?.owner?.avatar_url}
                  />
                </Grid>
              </AvatarStyledComponent>
              <Grid item xs>
                <Container>
                  <Heading>
                    <Typography
                      variant="h1"
                      fontSize={{ xs: 32 }}
                      fontWeight={{ xs: 500 }}
                      textAlign={{ sm: "left", xs: "center" }}
                    >
                      {repoName}
                    </Typography>
                  </Heading>
                  <ParagraphComponent>
                    <Typography
                      variant="p"
                      fontSize={{ xs: 16 }}
                      fontWeight={{ xs: 400 }}
                      textAlign={{ xs: "center" }}
                      color={"gray"}
                    >
                      {repo?.description}
                    </Typography>
                  </ParagraphComponent>
                  <Typography
                    variant="p"
                    fontSize={{ xs: 13, sm: 16 }}
                    fontWeight={{ xs: 500 }}
                  >
                    Repo Link:{" "}
                    <Typography variant="p" color={"steelblue"}>
                      {repo?.html_url}
                    </Typography>
                  </Typography>

                  <Container
                    style={{ padding: 0 }}
                    sx={{
                      display: "flex",
                      margin: "20px 0px 15px 0px",
                    }}
                  >
                    <Container
                      style={{ padding: 0, margin: 0 }}
                      sx={{
                        display: "inline-flex",
                        justifyContent: "left",
                        alignItems: "center",
                        width: "fit-content",
                      }}
                    >
                      <Star style={{ color: "#ffcd3c" }} />{" "}
                      <Typography
                        variant="p"
                        fontSize={{ xs: 13, sm: 16 }}
                        fontWeight={{ xs: 500 }}
                      >
                        {repo?.stargazers_count}
                      </Typography>
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
                      <Typography
                        variant="p"
                        fontSize={{ xs: 13, sm: 16  }}
                        fontWeight={{ xs: 500 }}
                      >
                        {repo?.open_issues_count}
                      </Typography>
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
                      <Typography
                        variant="p"
                        fontSize={{ xs: 13, sm: 16 }}
                        fontWeight={{ xs: 500 }}
                      >
                        Last pushed on{" "}
                        <Typography variant="p" color={"teal"}>
                          {moment(repo?.updated_at).format("MMMM Do YYYY, h:mm:ss a")}
                        </Typography>{" "}
                        by{" "}
                        <Typography variant="p" color={"teal"}>
                          {repo?.owner?.login}.
                        </Typography>
                      </Typography>
                    </Container>
                  </Container>
                </Container>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} md={6} mt={{ xs: 3 }}>
            <Card>
              <ChartComponent owner={repo?.owner.login} repo={repo.name} />
            </Card>
          </Grid>
          <Grid item xs={12} md={6} mt={{ xs: 3 }} mb={{ xs: 5 }}>
            <Card>
              <ContributorChart owner={repo?.owner.login} repo={repo.name} />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </ContainerComponent>
  );
}
//<ChartComponent owner={repo?.owner.login} repo={repo.name} />
export default RepoPage;
