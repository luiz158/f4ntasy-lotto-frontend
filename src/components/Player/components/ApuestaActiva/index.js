import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles/index";
import NumberFormat from 'react-number-format';
import { red } from "@material-ui/core/colors/index";
import { FaTrashAlt } from 'react-icons/fa';
import Button from '@material-ui/core/Button';

import './ApuestaActiva.css';
import { Colors } from '../../../../utils/__colors';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1, 1),
    },
    item: {
        padding: theme.spacing(1, 1),
    },
    component: {
        textDecoration: 'none',
    },
    text: {
        fontWeight: 'bold',
        width: '60px',
        border: '1px #000 solid',
        padding: '5px',
        textAlign: 'center'
    },
    negative: {
        padding: theme.spacing(1, 1),
        color: red[400]
    },
    deleteIcon: {
        background: Colors.Btn_Red,
        color: Colors.Input_bkg,
        width: "1.5rem",
        height: "1.5rem",
        padding: ".2rem",
        '&:hover': {
            cursor: "pointer"
        }
    }

}));
const ApuestaActivaEntry = ({ numero, valor, disable, ...props }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const eventId = props.index;
    const update = props.update;

    function handleClickOpen(e) {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }
    function handleCloseAccept() {
        props.delete(eventId);
        setOpen(false);
        update();
    }
    return (
        <Grid container maxwidth='xs' className="spuestaActive">
            <Dialog
                disableBackdropClick
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-crear-usuario"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle
                    id="alert-dialog-crear-usuario">Desea eliminar la apuesta al número {numero}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`Una vez eliminada la apuesta no podrá recuperarla`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        handleCloseAccept();
                    }} color="primary" >
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
            <Grid item className="venta_individual_number">
                <NumberFormat id={`text-${props.index}`}
                    variant="body1" className={classes.text}
                    placeholder="Número"
                    className="number"
                    disabled={true}
                    value={numero}
                />
            </Grid>
            <Grid item className="venta_individual_value" >
                <NumberFormat
                    id={`user-apuesta-data-${props.index}`}
                    placeholder="valor"
                    margin="normal"
                    variant="outlined"
                    className={valor > 0 ? "value" : "negative"}
                    value={valor}
                    thousandSeparator={true}
                    disabled={disable}
                    onBlur={props.onEdit}
                />
            </Grid>
            <Grid item className="venta_individual_btn">
                <FaTrashAlt className="deleteIcon" onClick={handleClickOpen} />
            </Grid>
        </Grid>
    )
};


export default ApuestaActivaEntry;