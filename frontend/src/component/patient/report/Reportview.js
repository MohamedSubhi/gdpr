import React, { useEffect, useState } from 'react';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { makeStyles } from '@material-ui/core/styles';
import Patient from '../Patient';
import Loading from '../../Loading';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.default,
    padding: theme.spacing(3),
  },
  table: {
    minWidth: 650,
  },
}));

function createData(id, fileName, date, comments, document) {
  return { id, fileName, date, comments, document };
}

let rows = [];

export default function Reportview() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [docsData, setdocsData] = useState({});

  const fetchData = async () => {
    const patientId = {
      patientId: localStorage.getItem('userId')
    }
    fetch("http://localhost:3001/documents/getAllDoc", {
      method: 'post',
      body: JSON.stringify(patientId),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.json();
    }).then(res => {
      setdocsData(res.document);
      rows = res.document.map(row =>
        createData(row.id, row.fileName, row.createdDate.toString().substring(0, 10), row.comments, row.documentFile)
      );
      setLoading(true);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      < Patient />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {
          !loading ? <Loading /> :
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>File Name</TableCell>
                    <TableCell align="center">Comments</TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Download</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.fileName}
                      </TableCell>
                      <TableCell align="center">{row.comments}</TableCell>
                      <TableCell align="center">{row.date}</TableCell>
                      {/* eslint-disable-next-line */}
                      <TableCell align="center"> <a href={"http://localhost:3001/" + row.document} target="_blank"><CloudDownloadIcon /></a></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        }
      </main>
    </div>
  );
}