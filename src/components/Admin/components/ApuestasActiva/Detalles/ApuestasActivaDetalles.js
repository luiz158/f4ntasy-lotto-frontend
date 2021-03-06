import React from 'react';
import { FormatNumberSymbol } from '../../../../../utils/__currency';

import './styles.css'

class ApuestaActivaRiesgoEntry extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sortFilter: 0
        }
    }

    dataFilter = () => {
        this.setState({
            sortFilter: (this.state.sortFilter + 1) % 3
        })
    }

    desc(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    stableSort(array, cmp) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = cmp(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el, index) => el[0]);
    }

    getSorting(order) {
        if (order === 0)
            return (a, b) => -this.desc(a, b, 'numero')
        return (order === 1) ? (a, b) => this.desc(a, b, 'totalRiesgo') : (a, b) => -this.desc(a, b, 'totalRiesgo');
    }

    render() {
        const symbol = this.props.moneda && this.props.moneda === 'dolar' ? '$' : 'L';
        return (
            <div className="container_table_ventas">
                <table>
                    <thead>
                        <tr>
                            <th>Numero</th>
                            <th>Ventas</th>
                            <th>Premio</th>
                            <th className="riesgo" onClick={() => this.dataFilter()}>Riesgo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.stableSort(this.props.riesgoList, this.getSorting(this.state.sortFilter)).slice()
                                .map((numero, index) => {
                                    return (
                                        this.props.numeroMaxRiesgo === numero.numero ?
                                            <tr key={index} className="highlighted">
                                                <td className="numero">{numero.numero.toString().padStart(2, "0")}</td>
                                                <td>{symbol}{'\u00A0'}{'\u00A0'}{FormatNumberSymbol(numero.dineroApostado)}</td>
                                                <td>{symbol}{'\u00A0'}{'\u00A0'}{FormatNumberSymbol(numero.posiblePremio)}</td>
                                                <td style={{ textAlign: 'center' }}>{FormatNumberSymbol(numero.totalRiesgo)}</td>
                                            </tr>
                                            :
                                            <tr key={index}>
                                                <td className="numero">{numero.numero.toString().padStart(2, "0")}</td>
                                                <td>{symbol}{'\u00A0'}{'\u00A0'}{FormatNumberSymbol(numero.dineroApostado)}</td>
                                                <td>{symbol}{'\u00A0'}{'\u00A0'}{FormatNumberSymbol(numero.posiblePremio)}</td>
                                                <td style={{ textAlign: 'center' }}>{FormatNumberSymbol(numero.totalRiesgo)}</td>
                                            </tr>
                                    );
                                })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
};

export default ApuestaActivaRiesgoEntry;