import React, {useState, useEffect} from 'react';
import {blue, red} from "@material-ui/core/colors/index";
import Button from "@material-ui/core/Button/index";
import {makeStyles, withStyles} from "@material-ui/core/styles/index";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ShowNumber from '../../../../PAsistente/components/ShowNumero/index';
import {playerService} from "../../../../../service/api/player/player.service";


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        '&:hover': {
            backgroundColor: '#e5e5e5',
        },
    },
    component: {
        textDecoration: 'none',
    },
    componentDisable: {
        textDecoration: 'none',
        pointerEvents: 'none'
    },
    text: {
        fontWeight: 'bold'
    },
    close: {
        color: red[400]
    },
    open: {
        color: blue[300]
    },
    disableLink: {
        pointerEvents: 'none'
    }

}));

const EditarButton = withStyles({
    root: {
        width: '100%',
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        lineHeight: 1.5,
        backgroundColor: '#ff190a',
        color: '#FFF',
        marginTop: '1rem',
        marginBottom: '1rem',
        marginRight: '.5rem',
        marginLeft: '.5rem',
        '&:hover': {
            backgroundColor: '#fb0f2f',
            borderColor: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: 'none',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);

const TotalButton = withStyles({
    root: {
        width: '100%',
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        lineHeight: 1.5,
        backgroundColor: '#2b85c2',
        color: '#FFF',
        marginTop: '1rem',
        marginBottom: '1rem',
        marginRight: '.5rem',
        marginLeft: '.5rem',
        '&:hover': {
            backgroundColor: '#0069d9',
            borderColor: '#0062cc',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);
const ComprarApuesta = ({...props}) => {
    const classes = useStyles();
    const [elements, setElements] = useState([]);
    const [title, setTitle] = useState('');
    const [total, setTotal] = useState(0.0);
    const [comision, setComision] = useState(0.0);
    const [riesgo, setRiesgo] = useState(0.0);
    const [id, setIdValue] = useState(0);
    const mounted = useState(true);

    useEffect(() => {
        setElements(props.location.state.list);
        setTitle(props.location.state.title.nombre);
        setIdValue(props.location.state.id);
        let totald = 0;
        props.location.state.list.forEach(function (item, index) {
            if (item.current !== 0) {
                totald = totald + item.current;
            }
        });
        let comision1 = 0;
        playerService.comision_directo("directo").then((result) => {
            comision1 = result.data;
            setComision(result.data);
        })
        setTotal(totald);
        setRiesgo(totald - comision1);
    }, []);

    function submitClickHandler() {
        playerService.update_number(elements, id).then((result) => {
            props.history.push("/usuario/apuestas");
            return () => {
                mounted.current = false;
            }
        })
    }

    return (
        <React.Fragment>
            <Grid
                container spacing={1}
                direction="row"
                justify="center"
                alignItems="flex-start"
            >
                <Typography variant="h5" gutterBottom>
                    {title}
                </Typography>
            </Grid>
            <Divider/>
            <Grid
                container spacing={1}
                direction="row"
                justify="center"
                alignItems="flex-start"
            >
                {elements.map((element, index) => {
                        return element.current > 0 ?
                            <ShowNumber key={index}
                                        numero={element.numero}
                                        valor={element.current}
                                        {...props}/> : null
                    }
                )}
            </Grid>
            <Grid container>
                <Grid item xs={3}
                      container
                      justify="flex-end"
                >
                    <Typography variant="body1" gutterBottom className={classes.text}>
                        apuestas |
                    </Typography>
                </Grid>
                <Grid item xs={9}
                      container
                      justify="flex-start"
                      className={classes.text}
                >
                    <Typography variant="body1" gutterBottom className={classes.text}>
                        {total}
                    </Typography>

                </Grid>
                <Grid item xs={3}
                      container
                      justify="flex-end"
                >
                    <Typography variant="body1" gutterBottom className={classes.text}>
                        comision |
                    </Typography>
                </Grid>
                <Grid item xs={9}
                      container
                      justify="flex-start"
                      className={classes.text}
                >
                    <Typography variant="body1" gutterBottom className={classes.text}>
                        {comision}
                    </Typography>
                </Grid>
                <Grid item xs={3}
                      container
                      justify="flex-end"
                >
                    <Typography variant="body1" gutterBottom className={classes.text}>
                        riesgo |
                    </Typography>
                </Grid>
                <Grid item xs={9}
                      container
                      justify="flex-start"
                      className={classes.text}
                >
                    <Typography variant="body1" gutterBottom className={classes.text}>
                        {riesgo}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={1}
                  direction="row"
                  justify="center"
            >
                <Grid item xs={6}>
                    <EditarButton variant="outlined" color="primary"
                                  onClick={props.history.goBack}
                    >
                        <Typography variant="body1" gutterBottom>
                            Editar
                        </Typography>
                    </EditarButton>
                </Grid>
                <Grid item xs={6}>
                    <TotalButton variant="outlined" color="primary" onClick={submitClickHandler}>
                        <Typography variant="body1" gutterBottom>
                            Comprar
                        </Typography>
                    </TotalButton>
                </Grid>
            </Grid>
        </React.Fragment>
    )
};
export default ComprarApuesta;