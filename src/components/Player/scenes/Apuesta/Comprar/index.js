import React, {useState, useEffect} from 'react';
import {blue, red} from "@material-ui/core/colors/index";
import Button from "@material-ui/core/Button/index";
import {makeStyles, withStyles} from "@material-ui/core/styles/index";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ShowNumber from '../../../../PAsistente/components/ShowNumero/index';
import {playerService} from "../../../../../service/api/player/player.service";
import {Colors} from "../../../../../utils/__colors";
import { FaShoppingCart } from 'react-icons/fa';


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
        fontWeight: 'bold',
        marginLeft: ".5rem"
    },
    close: {
        color: red[400]
    },
    open: {
        color: blue[300]
    },
    disableLink: {
        pointerEvents: 'none'
    },
    fixedElement:{
        position: 'fixed',
        width: '100%',        
        height: '76px',
        bottom: '0',
        left: '0',
        backgroundColor: Colors.Main      
    },
    textApuestaDescription:{
        height: '76px',
        fontWeight: 'bold',
        marginTop: '1rem'
    }

}));


const EditarButton = withStyles({
    root: {
        width: '120px',
        height: '100%',
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        lineHeight: 1.5,        
        color: Colors.Btn_Red,        
        marginBottom: '1.5rem',
        marginRight: '.5rem',
        marginLeft: '.5rem',
        border: 'none',
        '&:hover': {
            backgroundColor: Colors.Btn_Hover,
            border: 'none',
        },
        '&:active': {
            boxShadow: 'none',           
            border: 'none',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);

const TotalButton = withStyles({
    root: {
        width: '120px',  
        height: '100%',      
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        lineHeight: 1.5,        
        color: Colors.Btn_Blue,       
        marginBottom: '1.5rem',
        marginRight: '.5rem',        
        border: 'none',
        '&:hover': {
            backgroundColor: Colors.Btn_Hover,
            border: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: Colors.Btn_Hover,            
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);
const ComprarApuesta = ({...props}) => {
    const classes = useStyles();
    const [elements, setElements] = useState(props.location.state.list);
    const title = useState(props.location.state.title.nombre);
    const [total, setTotal] = useState(0.0);
    const [comision, setComision] = useState(0.0);
    const moneda = useState(props.location.state.moneda);
    const [id, setIdValue] = useState(props.location.state.id);
    const mounted = useState(true);
    const apuestaType = props.location.state.title.nombre.includes("Chica")

    useEffect(() => {
        
        setElements(props.location.state.list);        
        setIdValue(props.location.state.id);
        let totald = 0;
        props.location.state.list.forEach(function (item, index) {
            if (item.current !== 0) {
                totald = totald + item.current;
            }
        });
        let comision1 = 0;
        if (apuestaType) {
            playerService.comision_directo("chica").then((result) => {
                comision1 = totald * result.data.comision /100;
                totald = totald * result.data.costoMil                
                setComision((comision1).toFixed(2));
                setTotal(totald.toFixed(2));  
            })
        }else{
            playerService.comision_directo("directo").then((result) => {
                comision1 = totald * result.data.comision /100;
                setComision((comision1).toFixed(2));
                totald = totald * result.data.costoMil;
                setTotal(totald.toFixed(2)); 
            })
        }       
              
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
                container 
                spacing={1}
                direction="row"
                justify="center"
                alignItems="flex-start"
            >
                <Typography variant="h6" gutterBottom>
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
                        Apuestas 
                    </Typography>
                </Grid>
                <Grid item xs={8}
                      container
                      justify="flex-start"
                      className={classes.text}
                >
                    <Typography variant="body1" gutterBottom className={classes.text}>
                        {moneda}{" "}{total}
                    </Typography>

                </Grid>
                <Grid item xs={3}
                      container
                      justify="flex-end"
                >
                    <Typography variant="body1" gutterBottom className={classes.text}>
                        Comision 
                    </Typography>
                </Grid>
                <Grid item xs={8}
                      container
                      justify="flex-start"
                      className={classes.text}
                >
                    <Typography variant="body1" gutterBottom className={classes.text}>
                        {moneda}{" "}{comision}
                    </Typography>
                </Grid>
                <Grid item xs={3}
                      container
                      justify="flex-end"
                >
                    <Typography variant="body1" gutterBottom className={classes.text}>
                        Riesgo 
                    </Typography>
                </Grid>
                <Grid item xs={8}
                      container
                      justify="flex-start"
                      className={classes.text}
                >
                    <Typography variant="body1" gutterBottom className={classes.text}>
                        {moneda}{" "}{(total - comision).toFixed(2)}
                    </Typography>
                </Grid>
            </Grid>            
            <Grid container spacing={1}
                  direction="row"
                  justify="center"
                  alignItems="center"
                  className={classes.fixedElement}
                  >
                <Typography variant="body1" gutterBottom className={classes.textApuestaDescription}>
                        {title}
                </Typography>      
                <EditarButton variant="outlined" color="primary" onClick={props.history.goBack}>
                    <Typography variant="body1" gutterBottom>
                        Editar
                    </Typography>
                </EditarButton>
                <TotalButton variant="outlined" color="primary" onClick={submitClickHandler}>
                    <Typography variant="body1" gutterBottom >
                        Comprar <FaShoppingCart/>
                    </Typography>                    
                </TotalButton>
            </Grid>
        </React.Fragment>
    )
};
export default ComprarApuesta;