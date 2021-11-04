import React, { useEffect } from "react";

import { Link as RouterLink } from "react-router-dom";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";

import Container from "@material-ui/core/Container";

import Paper from "@material-ui/core/Paper";

import Box from "@material-ui/core/Box";

import Table from "@material-ui/core/Table";

import TableBody from "@material-ui/core/TableBody";

import TableCell from "@material-ui/core/TableCell";

import TableContainer from "@material-ui/core/TableContainer";

import TableHead from "@material-ui/core/TableHead";

import TableRow from "@material-ui/core/TableRow";

import moment from 'moment';

import { ActivitiesInterface } from "../models/IActivity";
import { ClubsInterface } from "../models/IClub";
import { BudgetTypesInterface } from "../models/IBudgetType";
import { BudgetCategoriesInterface } from "../models/IBudgetCategory";
import { ClubCommitteesInterface } from "../models/IClubCommittee";
import { BudgetProposalInterface } from "../models/IBudgetProposal";

import { format } from 'date-fns'

const useStyles = makeStyles((theme: Theme) =>

  createStyles({

    container: { marginTop: theme.spacing(2) },

    table: { minWidth: 650 },

    tableSpace: { marginTop: 20 },

  })

);



function History() {

  const classes = useStyles();

  const [BudgetProposals, setBudgetProposals] = React.useState<BudgetProposalInterface[]>([]);

  const apiUrl = "http://localhost:8080";

  const requestOptions = {

    method: "GET",
    headers: {  
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json", },

  };

  
  const getBudgetProposals = async () => {
    fetch(`${apiUrl}/budget_proposals`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setBudgetProposals(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    
    getBudgetProposals();

  }, []);



  return (
    <div>
      <Container className={classes.container} maxWidth="md">
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              รายการประวัติการของบประมาณกิจกรรมชมรม
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/budget_proposal/create"
              variant="contained"
              color="primary"
            >
              สร้างประวัติการของบประมาณกิจกรรมชมรม
            </Button>
          </Box>
        </Box>
        <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="5%">
                  ลำดับ
                </TableCell>
                <TableCell align="center" width="20%">
                  รายการกิจกรรม
                </TableCell>
                <TableCell align="center" width="25%">
                  ประเภทการของบประมาณ
                </TableCell>
                <TableCell align="center" width="20%">
                  หมวดหมู่
                </TableCell>
                <TableCell align="center" width="10%">
                  ราคา
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {BudgetProposals.map((item: BudgetProposalInterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center" width="10%">{item.ID}</TableCell>
                  <TableCell align="center" width="10%">{item.Activity.Name}</TableCell>
                  <TableCell align="center" width="10%">{item.BudgetType.Name}</TableCell>
                  <TableCell align="center">{item.BudgetCategory.Name}</TableCell>
                  <TableCell align="center">{item.BudgetPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default History;