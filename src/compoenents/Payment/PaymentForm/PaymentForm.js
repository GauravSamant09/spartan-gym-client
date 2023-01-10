import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from '../styles';
import { useHistory } from 'react-router-dom';
import { createPayment, updatePayment } from '../../../actions/payments';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './PaymentForm.css';




const PaymentForm = ({ membersData, currentId, setCurrentId }) => {
    const [paymentData, setPaymentData] = useState({ member_id: '', numberOfMonths: '', amount: '', memberName: '' });
    const payment = useSelector((state) => (currentId ? state.payments.payments.find((payment) => payment._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const page = 1;

    useEffect(() => {
        if (payment) setPaymentData(payment);
    }, [payment]);

    const clear = () => {
        setCurrentId(0);
        setPaymentData({ member_id: '', numberOfMonths: '', amount: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentId === 0) {
            dispatch(createPayment({ ...paymentData }, history));
            clear();
        } else {
            dispatch(updatePayment(currentId, { ...paymentData }));
            clear();
        }
    };

    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? `Editing a Payment` : 'Payment'}</Typography>
                <FormControl fullWidth className="memberSelect" >
                    <InputLabel id="demo-simple-select-label" >Member</InputLabel>
                    {membersData && (
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={paymentData.member_id}
                            label="Member"
                            onChange={(e) => setPaymentData({ ...paymentData, member_id: e.target.value })}
                        >
                            {membersData.map(option => {
                                return (
                                    <MenuItem key={option._id} value={option._id}>
                                        {option.name}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    )}

                </FormControl>
                <FormControl fullWidth className="memberSelect" >
                    <InputLabel id="demo-simple-select-label" >Subscription</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={paymentData.numberOfMonths}
                        label="Subscription"
                        onChange={(e) => setPaymentData({ ...paymentData, numberOfMonths: e.target.value })}
                    >
                        <MenuItem value={1}>One Month</MenuItem>
                        <MenuItem value={3}>Three Months</MenuItem>
                        <MenuItem value={6}>six Months</MenuItem>
                    </Select>
                </FormControl>
                <TextField name="amount" variant="outlined" label="Amount" fullWidth multiline minRows={4} value={paymentData.amount} onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })} />
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
};

export default PaymentForm;