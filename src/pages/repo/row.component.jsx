import { ExpandMoreOutlined, Star } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Card,
  Container,
  Grid,
} from "@mui/material";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ContributorChart from "../../component/charts/contributorChart.component";
import ChartComponent from "../../component/charts/totalChart.component";
import ContainerComponent from "../../container/container.component";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

const AvatarStyledComponent = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "159px",
  margin: "0px auto",
  aspectRatio: 1,
  backgroundColor: "white",
  [theme.breakpoints.down("sm")]: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "16px",
    width: "200px",
  },
}));
const CardComponent = styled(Grid)(({ theme }) => ({
  // boxShadow: "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px",
  [theme.breakpoints.down("sm")]: {},
}));

const Heading = styled("div")(({ theme }) => ({
  margin: "0px",
  padding: "0px",
  textTransform: "capitalize",
  [theme.breakpoints.down("xl")]: {
    marginTop: "14px",
  },
}));

const ParagraphComponent = styled(Typography)(({ theme }) => ({
  margin: "0px",
  padding: "0px",
  textAlign: "left",
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
  },
  [theme.breakpoints.down("xl")]: {
    marginTop: "14px",
    marginBottom: "6px",
  },
}));

const RowPage = ({ repo }) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreOutlined />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Grid>
          <CardComponent>
            <Card sx={{ p: 2, boxShadow: "none" }}>
              <Grid container direction={{ xs: "column", md: "row" }} spacing={3}>
                <Grid item>
                  <AvatarStyledComponent>
                    <Avatar
                      sx={{ width: "100%", height: "100%" }}
                      variant="circular"
                      src={repo?.owner?.avatar_url}
                    />
                  </AvatarStyledComponent>
                </Grid>
                <Grid item xs>
                  <Heading>
                    <Typography
                      variant="h1"
                      fontSize={{ xs: 32 }}
                      fontWeight={{ xs: 500 }}
                      textAlign={{ md: "left", xs: "center" }}
                    >
                      {repo.name}
                    </Typography>
                  </Heading>
                  <ParagraphComponent>
                    <Typography
                      variant="p"
                      fontSize={{ xs: 16 }}
                      fontWeight={{ xs: 400 }}
                      textAlign={{ md: "right", xs: "center" }}
                      color={"gray"}
                    >
                      {repo?.description}
                    </Typography>
                  </ParagraphComponent>
                  <ParagraphComponent>
                    <Typography
                      variant="p"
                      fontSize={{ xs: 13, sm: 14 }}
                      fontWeight={{ xs: 500 }}
                    >
                      Repo Link:{" "}
                      <Typography
                        variant="p"
                        color={"steelblue"}
                        fontWeight={{ xs: 400 }}
                        sx={{ textDecoration: "underline" }}
                      >
                        {repo?.html_url}
                      </Typography>
                    </Typography>
                  </ParagraphComponent>

                  <Grid
                    container
                    sx={{
                      alignContent: "center",
                      display: "flex",
                      margin: "20px 0px 15px 0px",
                    }}
                    justifyContent={{ xs: "center", md: "left" }}
                  >
                    <Grid
                      item
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        width: "fit-content",
                      }}
                    >
                      <Star style={{ color: "#ffcd3c" }} />
                      &nbsp;
                      <Typography
                        variant="p"
                        fontSize={{ xs: 13, sm: 16 }}
                        fontWeight={{ xs: 500 }}
                      >
                        {repo?.stargazers_count}
                      </Typography>
                    </Grid>

                    <Grid
                      item
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
                      &nbsp;
                      <Typography
                        variant="p"
                        fontSize={{ xs: 13, sm: 16 }}
                        fontWeight={{ xs: 500 }}
                      >
                        {repo?.open_issues_count}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      style={{ padding: 0 }}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "fit-content",
                        ml: "5%",
                      }}
                      justifyContent={{ xs: "center", md: "left" }}
                      marginTop={{ xs: 2, sm: 0 }}
                    >
                      <Typography
                        variant="p"
                        fontSize={{ xs: 13, sm: 14 }}
                        fontWeight={{ xs: 500 }}
                        style={{ wordWrap: "break-word" }}
                        textAlign={{ xs: "center", md: "left" }}
                      >
                        Last pushed on{" "}
                        <Typography variant="p" color={"teal"} fontWeight={{ xs: 400 }}>
                          {moment(repo?.updated_at).format("MMMM Do YYYY, h:mm:ss a")}
                        </Typography>{" "}
                        by{" "}
                        <Typography variant="p" color={"teal"} fontWeight={{ xs: 400 }}>
                          {repo?.owner?.login}.
                        </Typography>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </CardComponent>
        </Grid>
      </AccordionSummary>

      <AccordionDetails>
        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} md={6} mt={{ xs: 3 }}>
            <CardComponent>
              <Card sx={{ p: 2, boxShadow: "none" }}>
                <ChartComponent owner={repo?.owner.login} repo={repo.name} />
              </Card>
            </CardComponent>
          </Grid>
          <Grid item xs={12} md={6} mt={{ xs: 3 }} mb={{ xs: 5 }}>
            <CardComponent>
              <Card sx={{ p: 2, boxShadow: "none" }}>
                <ContributorChart owner={repo?.owner.login} repo={repo.name} />
              </Card>
            </CardComponent>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
//<ChartComponent owner={repo?.owner.login} repo={repo.name} />
export default RowPage;
