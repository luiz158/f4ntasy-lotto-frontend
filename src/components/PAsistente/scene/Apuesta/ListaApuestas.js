import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { FaTrashAlt } from "react-icons/fa";
import ConfirmDialog from '../../../View/Dialog/ConfirmDialog';

import './styles.css'

class ListaApuestas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openRemove: false,
            index: 0,
            isIndexDisplay: props.displayApuestaListIndex === undefined ? true : props.displayApuestaListIndex
        }
    }

    handleClickOpen = (index) => {
        this.setState({
            ...this.state,
            index: index,
            openRemove: true
        })
    }

    handleClose = (value) => {
        this.setState({
            ...this.state,
            openRemove: false
        })
        if (value === true) {
            if (this.props.fromApuestaActiva)
                this.props.removerApuesta(this.state.index)
            else
                this.props.removerApuesta(this.state.index, this.props.entryList[this.state.index].numero, this.props.entryList[this.state.index].current)
        }
    }

    componentDidUpdate() {
        var ele = document.querySelector('.slideSelect:first-child')
        if (ele) {
            if (this.props.isAgregar) {
                setTimeout(() => {
                    ele.classList.remove('slide')
                }, 10);
                setTimeout(() => {
                    ele.classList.add('slide')
                }, 30);
            }
        }
    }

    render() {
        const title = "Eliminar?"
        const context = "Esta seguro que quiere eliminar estas compras?"
        return (
            <div style={{ width: '80%' }}>
                <List className="apuestaList">
                    {this.props.entryList
                        .map((element, index) =>
                            <ListItem key={index} className="apuesta slideSelect" alignItems="center">
                                <div style={{ display: this.state.isIndexDisplay ? "flex" : "none" }}>
                                    <ListItemText className="apuestaIndex" primary={this.props.entryList.length - index} />
                                </div>
                                <ListItemText className="apuestaNumber"
                                    primary={<Grid container>
                                        <Grid item style={{ textAlign: "center", width: '100%' }}>{element.numero.toString().padStart(2, '0')}</Grid>
                                    </Grid>
                                    } />
                                <ListItemText className="apuestaValues"
                                    primary={<Grid container>
                                        <Grid item style={{ textAlign: "left", width: '100%', paddingLeft: 15 }}>{element.current === undefined ? element.valor : element.current}</Grid>
                                    </Grid>
                                    } />
                                <ListItemIcon style={{ minWidth: "auto" }}>
                                    <FaTrashAlt className="apuestaDeleteIcon"
                                        onClick={() => this.handleClickOpen(index)} />
                                </ListItemIcon>
                            </ListItem>
                        )}
                </List>
                <ConfirmDialog
                    open={this.state.openRemove}
                    handleClose={this.handleClose}
                    title={title}
                    context={context}
                    icon='help'>
                </ConfirmDialog>
            </div>
        )
    }

}

export default ListaApuestas;