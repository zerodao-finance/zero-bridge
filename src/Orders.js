import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { ethers } from 'ethers';
import moment from 'moment';

const address = '0xD903338baE3D5C59259E562a49E4ab177E3149a1'

const rows = ['0.001', '0.002', '0.003'].map((v) => ({
  amount: v,
  underwriter: ethers.Wallet.createRandom().address,
  arbiscan: ethers.utils.hexlify(ethers.utils.randomBytes(32)),
  date: moment(new Date()).format('MM-DD-YYYY HH:mm'),
  actualRen: v * 0.95,
  actualArbEth: v * 0.05
}));

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Transactions</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Underwriter</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>renBTC</TableCell>
            <TableCell>arbETH</TableCell>
            <TableCell>Arbiscan</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.underwriter}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>{row.actualRen.toFixed(5)}</TableCell>
              <TableCell>{row.actualArbEth.toFixed(5)}</TableCell>
              <TableCell><a style={ { color: 'black', textDecoration: 'none' } } href={'https://arbiscan.io/tx/' + row.arbiscan}>{ row.arbiscan }</a></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more
      </Link>
    </React.Fragment>
  );
}
