import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemAvatar, ListItemIcon, Avatar, ListItemText, Button, Modal, FormControl, InputLabel, Input } from '@material-ui/core';
import './css/Todo.css';
import db from './API/firebase';
import firebase from 'firebase';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircle from '@material-ui/icons/AddCircleOutlineOutlined'
import ImageIcon from '@material-ui/icons/Eco';

import SaveIcon from '@material-ui/icons/Save';


const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: 10,
        border: 0,
        margin:theme.spacing(1, -4, 1),
        width: '100%',
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper,
        padding: 10,
        fontSize: '24px',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
      },
    paper: {
        backgroundColor: theme.palette.background.paper,
        width: 450,
        border: '0px solid #000',
        boxShadow: theme.shadows[2],
        padding: theme.spacing(2, 10, 4),
    },
    label: {
        textTransform: 'capitalize'
    },
    typography: {
        button: {
          fontSize: '1.4rem',
        },
      },
  }));

function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();

    const handleClose = () => {
        e => setOpen(false);
    };

    const updateTodo = () => {
        //update todo with the new input text
        event.preventDefault();
        db.collection('todos').doc(props.todo.id).set({
            todo: input,
            timestampUpdated: firebase.firestore.FieldValue.serverTimestamp()
        }, {merge: true})
        setOpen(false);
        setInput();
    }

    return (
        <div>
        <Modal
            open={open}
            className={classes.modal}
            onClose={e => setOpen(false)}
        >
           <div className={classes.paper}>
               <h1>Modify Selected todo</h1>
               <form>
                <FormControl size="medium" margin="normal" fullWidth="true" varient="filled" >
                <InputLabel>{props.todo.todo}</InputLabel>
                <Input  placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)}></Input>
                </FormControl>

                <Button disabled={!input}
                type="submit" onClick={updateTodo}>Update</Button>
                </form>
           </div>

        </Modal>
        <List component="nav" className={classes.root}>
            <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <ImageIcon />
                        </Avatar>
                </ListItemAvatar>
                <ListItemText primary={props.todo.todo} secondary="Plan has been set ⏰" />

                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<AddCircle/>}
                    onClick={e => setOpen(!open)}
                >
                    Edit
                </Button>

                <IconButton color="secondary" component="span" onClick={event => db.collection('todos').doc(props.todo.id).delete()}>
                    <DeleteIcon />
                </IconButton>
            </ListItem>
        </List>
        </div>
    )
}

export default Todo
