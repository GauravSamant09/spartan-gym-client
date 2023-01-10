import React, { useState, useEffect } from 'react'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import useStyles from './styles'
import MemberForm from './MemberForm/MemberForm';
import { useSelector } from 'react-redux';
import { getMembers } from '../../actions/members';
import { useDispatch } from 'react-redux';
import { MdModeEditOutline } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';
import { deleteMember } from '../../actions/members';

const Member = () => {
    const classes = useStyles();
    const page = 1;
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(0);
    const { members, isLoading } = useSelector((state) => state.members)

    useEffect(() => {
        if (page) {
            dispatch(getMembers(page));
        }
    }, [page]);

    useEffect(() => {
    }, [members]);

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
        {
            field: 'actions',
            type: 'actions',
            width: 100,
            headerName: 'Actions',
            getActions: (params) => [
                <GridActionsCellItem icon={<MdModeEditOutline />} onClick={(e) => { e.stopPropagation(); setCurrentId(params.id); }} label="Edit" />,
                <GridActionsCellItem icon={<AiFillDelete />} onClick={() => dispatch(deleteMember(params.id))} label="Delete" />,
            ],
        },

    ];

    // if (!members?.length && !isLoading) return 'No members'
    return (
        <Grow in>
            <Container maxWidth="xl" >
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    {members && (
                        <Grid item xs={12} sm={6} md={8}>
                            {/* <Posts setCurrentId={setCurrentId} /> */}
                            <div style={{ height: 423, width: '100%' }}>
                                <DataGrid
                                    rows={members}
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
                        <MemberForm currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Member


