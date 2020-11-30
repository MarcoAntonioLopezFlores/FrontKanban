import React, { useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, TextField } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Button, Col, Row } from 'reactstrap'
import clsx from 'clsx'
import api from '../../util/api';
import swal from 'sweetalert';

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
    },sizeButton: {
        borderRadius: 15,height:40,width:40
    }
}));

const ChangeStatus = (props) => {
    const classes=useStyles()
    const [value, setValue] = useState("2");
    
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const changeStatus=async()=>{
        swal({
            title: "¿Esta seguro de realizar esta operación?",
            text: "¡Una vez actualizado el status no podras actualizarlo a uno inferior!",
            icon: "warning",
            buttons: ["Cancelar", "Continuar"],
            dangerMode: true,
          })
          .then(async(willDelete) => {
            if (willDelete) {
                if(parseInt(value)>props.product.status){
                    const data = {
                        id: props.product.id,
                        code: props.product.code,
                        funcionality: props.product.funcionality,
                        priority: props.product.priority,
                        status: parseInt(value),
                        developer: {
                            id: props.product.developer.id
                        },    
                        project: {
                            id: localStorage.getItem('idProject')
                        }
                    }
                    
                    try {
                        const response = await api.products.updateStatusProduct(data);
                        console.log(response)
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
                    
                    props.getProject()
                }else{
                    swal({
                        title: "¡ADVERTENCIA!",
                        text: "El status es similar o inferior al actual.",
                        icon: "warning",
                    });
                }
            } 
          });
        
        
    }

    return (
        <Dialog
            open={props.open} onClose={() => props.setOpen(false)}
            maxWidth="sm"
        >
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent >
                <Row>
                <Col>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">CAMBIAR A:</FormLabel>
                        <RadioGroup aria-label="status" name="statusCheck" value={value} onChange={handleChange}>
                            <FormControlLabel value={"2"} control={<Radio style={{color:"red"}}/>} label="Seleccionado" />
                            <FormControlLabel value={"3"} control={<Radio style={{color:"#fbc02d"}}/>} label="En proceso" />
                            <FormControlLabel value={"4"} control={<Radio style={{color:"green"}}/>} label="Terminado" />
                        </RadioGroup>
                    </FormControl>
                </Col>
                <Col>
                <Row>
                <TextField fullWidth label="Funcionalidad" variant="outlined" 
                    value={props.product.funcionality}/>
                </Row>
                <Row className={classes.marginRow}>
                STATUS ACTUAL
                </Row>
                <Row className={classes.marginRow}>
                {<Button color={props.product.status === 2 ? "danger" : props.product.status === 3 ? "warning" : "success"}
                        className={classes.sizeButton}></Button>}
                </Row>
                </Col>
                </Row>
            </DialogContent>
            <DialogActions>
                <Col>
                    <Button onClick={() => props.setOpen(false)}
                        className={clsx("btn btn-md btn-block", classes.buttonCancelar)}>Cancelar</Button>
                </Col>
                <Col>
                    <Button onClick={() => { changeStatus();props.setOpen(false) }} type="button"
                        className={clsx("btn btn-md btn-block", classes.button)}>Guardar</Button>

                </Col>
            </DialogActions>
        </Dialog>
    )
}

export default ChangeStatus
