import React, { useEffect } from 'react'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Container, Grow, Grid, Button } from '@material-ui/core';
import useStyles from './styles'
import { useSelector } from 'react-redux';
import { getDashboard } from '../../actions/dashboard';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './dashboard.css';

const Dashboard = () => {
    const classes = useStyles();
    const page = 1;
    const dispatch = useDispatch();
    const history = useHistory();

    const { dashboard } = useSelector((state) => state.dashboard);

    useEffect(() => {
        if (page) {

            dispatch(getDashboard(page));
        }
    }, [page]);

    useEffect(() => {
    }, [dashboard]);

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            editable: true,
        },
        {
            field: 'mobile',
            headerName: 'Mobile no.',
            width: 150,
            editable: true,
        },
        {
            field: 'startedOn',
            headerName: 'Started on',
            width: 150,
            editable: true,
        },
        {
            field: 'paymentDueDate',
            headerName: 'Payment Due Date',
            description: 'This column has a value getter and is not sortable.',
            width: 160,
        },
        // {
        //     field: 'numberOfDays',
        //     headerName: 'No. of Days',
        //     description: 'This column has a value getter and is not sortable.',
        //     width: 160,
        // },

        {
            field: 'actions',
            type: 'actions',
            width: 100,
            headerName: 'Actions',
            getActions: (params) => [
                // <GridActionsCellItem icon={<MdModeEditOutline />} onClick={(e) => { e.stopPropagation() }} label="Edit" />,
                // <Button variant="contained" color="secondary" onClick={(e) => { e.stopPropagation() }} >Pay</Button>
                < button className='button-pay' variant="contained" color="primary" onClick={(e) => { history.push(`/payments`) }}>Pay</button>
            ],
        },

    ];

    // if (!dashboard?.length && !isLoading) return 'No dashboard'
    return (
        <Grow in>
            <Container maxWidth="xl" >
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    {dashboard && (
                        <Grid item xs={12} sm={6} md={8}>
                            {/* <Posts setCurrentId={setCurrentId} /> */}
                            <div style={{ height: 423, width: '100%' }}>
                                <DataGrid
                                    rows={dashboard}
                                    columns={columns}
                                    pageSize={10}
                                    rowsPerPageOptions={[10]}
                                    getRowId={(row) => row._id}
                                />
                            </div>
                        </Grid>
                    )
                    }
                </Grid>
            </Container>
        </Grow>
    )
}

export default Dashboard


