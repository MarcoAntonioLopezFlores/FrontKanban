import { Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from '@material-ui/core';
import React, { useState } from 'react'
import { Button, Col, Row } from 'reactstrap';
import swal from 'sweetalert';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import clsx from 'clsx'
import api from '../../util/api';

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: "#049474", fontWeight: "bold", borderBottomWidth: 3, borderColor: "green"
    },
    buttonCancelar: {
        backgroundColor: "tomato", fontWeight: "bold", borderBottomWidth: 3, borderColor: "red"
    },
    marginRow: {
        marginTop: 20
    },
    marginButton: {
        margin: "auto"
    }
}));

const UpdateTeam = (props) => {
    const classes = useStyles();


    const [code, setCode] = useState(props.integrante.code)
    const [name, setName] = useState(props.integrante.name)
    const [firstLastName, setFirstLastName] = useState(props.integrante.firstLastName)
    const [secondLastName, setSecondLastName] = useState(props.integrante.secondLastName)
    const [rol, setRol] = useState(props.integrante.rol)
    
    const updatePerson = async () => {
        const data = {
            id:props.integrante.id,
            code: code,
            name: name,
            firstLastName: firstLastName,
            secondLastName: secondLastName,
            rol: parseInt(rol),
            project: {
                id: localStorage.getItem('idProject')
            }
        }
        
        
        if (((props.team.filter((integrante) => integrante.rol === data.rol).length) > 0 && data.rol !== 3 && props.integrante.rol!==data.rol)) {
            swal({
                title: "¡ADVERTENCIA!",
                text: 'El rol seleccionado ya es ocupado por algun integrante del scrum team',
                icon: 'warning',
            });
        } else if ((props.team.filter((integrante) => integrante.rol === 3).length) > 8) {
            swal({
                title: "¡ADVERTENCIA!",
                text: 'El numero de desarrolladores esta en el límite',
                icon: 'warning',
            });
        } else {
            
            try {
                const response = await api.teams.create(data);
                
                if (response.id !== null || response.id !== undefined) {
                    swal({
                        title: "¡ÉXITO!",
                        text: "Actualización éxitosa",
                        icon: "success",
                    });
                }
            } catch (error) {
                console.log(error)
            }
        }

    }

    return (
        <Dialog
            open={props.open} onClose={() => props.setOpen(false)}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent >

                <Row>
                    <Col>
                        <TextField fullWidth label="Clave" variant="outlined" value={code}
                            onChange={(e) => setCode(e.target.value)} />
                    </Col >
                    <Col>
                        <TextField fullWidth label="Nombre" variant="outlined" value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </Col >
                </Row>
                <Row className={classes.marginRow}>
                    <Col>
                        <TextField fullWidth label="Primer Apellido" variant="outlined" value={firstLastName}
                            onChange={(e) => setFirstLastName(e.target.value)} />
                    </Col >
                    <Col>
                        <TextField fullWidth label="Segundo Apellido" variant="outlined" value={secondLastName}
                            onChange={(e) => setSecondLastName(e.target.value)} />
                    </Col >
                </Row>
                <Row className={classes.marginRow}>
                    <Col>
                        <TextField fullWidth select label="Rol" variant="outlined"
                            onChange={(e) => setRol(e.target.value)} value={rol}>
                            <MenuItem key={1} value={'1'}>Product Owner</MenuItem>
                            <MenuItem key={2} value={'2'}>Scrum Master</MenuItem>
                            <MenuItem key={3} value={'3'}>Desarrollador</MenuItem>
                        </TextField>
                    </Col >
                </Row>
            </DialogContent>
            <DialogActions>
                <Col>
                    <Button onClick={() => props.setOpen(false)}
                        className={clsx("btn btn-md btn-block", classes.buttonCancelar)}>Cancelar</Button>
                </Col>
                <Col>
                    <Button onClick={() => { updatePerson(); props.setOpen(false) }} type="button"
                        className={clsx("btn btn-md btn-block", classes.button)}>Registrar</Button>
                </Col>
            </DialogActions>
        </Dialog>
    )
}

export default UpdateTeam;

