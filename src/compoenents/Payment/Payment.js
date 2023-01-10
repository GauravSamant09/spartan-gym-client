import React, { useState, useEffect } from 'react'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Container, Grow, Grid } from '@material-ui/core';
import useStyles from './styles'
import PaymentForm from './PaymentForm/PaymentForm';
import { useSelector } from 'react-redux';
import { getPayments } from '../../actions/payments';
import { useDispatch } from 'react-redux';
import { MdModeEditOutline } from 'react-icons/md';

const Payment = () => {
    const classes = useStyles();
    const page = 1;
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(0);
    const { payments, isLoading } = useSelector((state) => state.payments)

    useEffect(() => {
        if (page) {
            dispatch(getPayments(page));
        }
    }, [page]);

    useEffect(() => {
        if (payments && state.payments.members) {

        }
    }, [payments]);

    var state = useSelector((state) => state)

    useEffect(() => {
        if (state.payments.members) {
        }
    }, [state.payments.members]);

    const columns = [
        {
            field: 'memberName',
            headerName: "Member's name",
            width: 150,
            editable: true,
        },

        {
            field: 'subscription',
            headerName: 'Subscription',
            width: 150,
            editable: true,
        },
        {
            field: 'amount',
            headerName: 'Amount',
            width: 150,
            editable: true,
        },
        {
            field: 'paymentDate',
            headerName: 'Payment Date',
            width: 200,
            editable: true,
        },
        {
            field: 'actions',
            type: 'actions',
            width: 100,
            headerName: 'Actions',
            getActions: (params) => [
                <GridActionsCellItem icon={<MdModeEditOutline />} onClick={(e) => { e.stopPropagation(); setCurrentId(params.id); }} label="Edit" />,
            ],
        },

    ];

    // if (!members?.length && !isLoading) return 'No members'
    return (
        <Grow in>
            <Container maxWidth="xl" >
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    {payments && (
                        <Grid item xs={12} sm={6} md={8}>
                            {/* <Posts setCurrentId={setCurrentId} /> */}
                            <div style={{ height: 423, width: '100%' }}>
                                <DataGrid
                                    rows={payments}
                                    columns={columns}
                                    pageSize={10}
                                    rowsPerPageOptions={[10]}
                                    getRowId={(row) => row._id}
                                />
                            </div>
                        </Grid>
                    )
                    }
                    <Grid item xs={12} sm={6} md={4}>
                        <PaymentForm membersData={state.payments.members} currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Payment


