import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Container from '@material-ui/core/Container';
import 'react-toastify/dist/ReactToastify.css';
import { adminService } from "../../../../service/api/admin/admin.service";
import authenticationService from '../../../../service/api/authentication/authentication.service';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button/index";
import AdminTitle from '../../components/AdminTitle';
import ApuestasDetallesEntry from '../../components/ApuestasActiva';
import RowList from '../../../View/RowList'

import Dollar_ON from '../../../View/assets/Dollar_ON.png';
import Dollar_OFF from '../../../View/assets/Dollar_OFF.png';
import Lempiras_ON from '../../../View/assets/Lempiras_ON.png';
import Lempiras_OFF from '../../../View/assets/Lempiras_OFF.png';
import { userActions } from '../../../../store/actions';
import './styles.css'

const ApuestasActivasAdmin = (props) => {
    const [apuestasActivas, setApuestasActivasList] = useState([]);
    const [moneda, setMoneda] = useState("lempira");
    const [values, setValues] = useState([]);
    const col = ['Ventas:', 'Comisión:', 'Totales:'];
    useEffect(() => {
        const { dispatch } = props;
        dispatch(userActions.loading_start())
        adminService.get_apuestas_activas(moneda).then((result) => {
            if (result.status === 401) {
                authenticationService.logout()
            } else {
                setApuestasActivasList(Array.from(result.data));
                let total = result.data.reduce((sum, row) => sum + row.total, 0);
                let comision = result.data.reduce((sum, row) => sum + row.comision, 0);
                let riesgo = result.data.reduce((sum, row) => sum + row.neta, 0);
                setValues([total, comision, riesgo])
            }
            dispatch(userActions.loading_end())
        })
            .catch(function (error) {
                dispatch(userActions.loading_end())
            });
    }, [])

    const changeMonedaType = (type) => {

        if (type === 'dolar')
            setMoneda("dolar")
        else
            setMoneda("lempira")
        updateApuestasActivas(type)
    }

    const handleDolar = () => {
        if (moneda !== "dolar")
            changeMonedaType("dolar")
    }

    const handleLempira = () => {
        if (moneda !== "lempira")
            changeMonedaType("lempira")
    }

    const updateApuestasActivas = (monedaType) => {
        const { dispatch } = props;
        dispatch(userActions.loading_start())
        adminService.get_apuestas_activas(monedaType).then((result) => {
            if (result.status === 401) {
                authenticationService.logout()
            } else {
                setApuestasActivasList([]);
                setApuestasActivasList(Array.from(result.data));
                let total = result.data.reduce((sum, row) => sum + row.total, 0);
                let comision = result.data.reduce((sum, row) => sum + row.comision, 0);
                let riesgo = result.data.reduce((sum, row) => sum + row.neta, 0);
                setValues([total, comision, riesgo])
            }
            dispatch(userActions.loading_end())
        })
            .catch(function (error) {
                dispatch(userActions.loading_end())
            });
    }

    function toast_notification(type) {
        if (type === "success") {
            toast.success("Numero adcionado", {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            toast.error("Numero incorrecto", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }
    return (
        <React.Fragment>
            <ToastContainer autoClose={8000} />
            <Container maxwidth="xs" style={{ padding: 0 }}>
                <AdminTitle titleLabel='Resumen Ventas Generales' fontSize="21px" iconName="IoIosContacts" />
            </Container>
            <Container maxwidth="xs" className="container_ventas_generales">
                <Grid item xs={12} className="btn_group_moneda" >
                    <Button style={{ paddingTop: 9 }} onClick={handleDolar}>
                        {moneda === "dolar" ? <img src={Dollar_ON} alt="Dollar_ON" /> : <img src={Dollar_OFF} alt="Dollar_OFF" />}
                    </Button>
                    <Button style={{ paddingRight: 25, paddingTop: 9 }} onClick={handleLempira}>
                        {moneda !== "dolar" ? <img src={Lempiras_ON} alt="Dollar_ON" /> : <img src={Lempiras_OFF} alt="Lempiras_OFF" />}
                    </Button>
                </Grid>
                <Grid container className="body">
                    {apuestasActivas.map((apuesta, index) =>
                        <ApuestasDetallesEntry key={index} {...apuesta} index={index} {...props} moneda={moneda}
                            update={updateApuestasActivas}
                            toast={toast_notification}
                        />
                    )}
                </Grid>
            </Container>
            <Container maxwidth="xs" style={{ padding: 0, marginTop: -8 }}>
                <Grid container maxwidth="xs" className="container_summary">
                    <Grid item xs={10} className="summaryTotal" >
                        <RowList col_1={col} symbol={moneda === "dolar" ? '$' : 'L'} col_2={values} style={{ height: 95 }}></RowList>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    )
}

export default connect()(ApuestasActivasAdmin);