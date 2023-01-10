import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from '../styles';
import { useHistory } from 'react-router-dom';
import { createMember, updateMember } from '../../../actions/members';

const MemberForm = ({ currentId, setCurrentId }) => {
    const [memberData, setMemberData] = useState({ name: '', mobile: '' });
    const member = useSelector((state) => (currentId ? state.members.members.find((member) => member._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'))

    useEffect(() => {
        if (member) setMemberData(member);
    }, [member]);

    const clear = () => {
        setCurrentId(0);
        setMemberData({ name: '', mobile: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentId === 0) {
            dispatch(createMember({ ...memberData }, history));
            clear();
        } else {
            dispatch(updateMember(currentId, { ...memberData }));
            clear();
        }
    };

    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? `Editing "${member.name}"` : 'Creating a Member'}</Typography>
                <TextField name="name" variant="outlined" label="Name" fullWidth value={memberData.name} onChange={(e) => setMemberData({ ...memberData, name: e.target.value })} />
                <TextField name="mobile" variant="outlined" label="Mobile" fullWidth multiline minRows={4} value={memberData.mobile} onChange={(e) => setMemberData({ ...memberData, mobile: e.target.value })} />
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
};

export default MemberForm;