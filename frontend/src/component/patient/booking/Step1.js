import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    hr: {
        margin: '0px'
    },
    itemIcon: {
        marginBottom: '0px'
    }
}));
export default function Step1({ parentCallback }) {
    const [value, setValue] = React.useState('');

    const handleChange = (event, newValue) => {
        setValue(newValue);
        parentCallback(newValue);
        localStorage.setItem('docCat', newValue)
    };
    const classes = useStyles();
    return (
        <Grid container>
            <Grid item xs={12}>
                <List className={classes.root}>
                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                        {['Cardiologis', 'Neurosurgeon', 'Orthopedcian', 'Oncologist'].map(value => {
                            const labelId = `checkbox-list-label-${value}`;
                            return (
                                <React.Fragment>
                                    <ListItem key={value} role={undefined} dense button >
                                        <ListItemIcon >
                                            <FormControlLabel className={classes.itemIcon} value={value} control={<Radio />} />
                                        </ListItemIcon>
                                        <ListItemText id={labelId} primary={value} />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="comments">
                                                <CommentIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <hr className={classes.hr} />
                                </React.Fragment>
                            );
                        })}
                    </RadioGroup>
                </List>
            </Grid>
        </Grid>
    );
}
