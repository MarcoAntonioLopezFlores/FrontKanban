import { Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, MenuItem } from '@material-ui/core';
import React, { useEffect, useState} from 'react'
import { Button, Col, Row } from 'reactstrap'
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx'
import api from '../../util/api';
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: "#049474", fontWeight: "bold", borderBottomWidth: 3, borderColor: "green"
    },
    buttonCancelar:{
        backgroundColor: "tomato", fontWeight: "bold", borderBottomWidth: 3, borderColor: "red"
    },
    marginRow:{
        marginTop: 20 
    },
    marginButton:{
        margin:"auto"
    }
}));

const UpdateProduct = ({open,setOpen,product,title}) => {
    const classes = useStyles()
    const [code, setCode] = useState(product.code)
    const [name, setName] = useState(product.funcionality)
    const [priority, setPrority] = useState(product.priority)
    const [developers,setDevelopers]=useState([])
    const [idDeveloper,setIdDeveloper]=useState(product.developer.id)

    const getDevelopers=()=>{
        const idProject =localStorage.getItem('idProject')
        api.teams.getByRol(idProject,3).then(response=>{
            setDevelopers(response)    
        })
        
        
    }

    useEffect(()=>getDevelopers(),[])

    const updateProduct= async()=>{
        const data = {
            id:product.id,
            code: code,
            funcionality: name,
            priority: priority,
            status: product.status,
            statusDate:product.statusDate,
            developer: {
                id: idDeveloper
            },    
            project: {
                id: localStorage.getItem('idProject')
            }
        }  
        
        try {          
            const response=await api.products.create(data);
            
            if(response.id!==null || response.id!==undefined){
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
    
    return (
        <Dialog
            open={open} onClose={() => setOpen(false)}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent >
            <Row >
                <Col>
                    <TextField fullWidth label="Clave" variant="outlined" value={code}
                        onChange={(e) => setCode(e.target.value)}/>
                </Col >
                <Col>
                    <TextField fullWidth label="Funcionalidad" variant="outlined" value={name}
                        onChange={(e) => setName(e.target.value)}/>
                </Col >
            </Row>
            <Row className={classes.marginRow}>                
                <Col>
                <TextField fullWidth select label="Prioridad" variant="outlined"
                        onChange={(e) => setPrority(e.target.value)} value={priority}>         
                        <MenuItem key={1} value={1}>Alta</MenuItem>
                        <MenuItem key={2} value={2}>Media</MenuItem>
                        <MenuItem key={3} value={3}>Baja</MenuItem>
                    </TextField>
                </Col>
                <Col>
                    <TextField fullWidth label="Status" variant="outlined" 
                    value={product.status===2?"Seleccionado":product.status===3?"En proceso":"Terminado"} readOnly/>       
                </Col >
            </Row>
            <Row className={classes.marginRow}>
            <Col>
                <TextField fullWidth select label="Desarrollador" variant="outlined"
                        onChange={(e) => setIdDeveloper(e.target.value)} value={idDeveloper}>         
                        {idDeveloper!==""? developers.map((developer)=>
                            <MenuItem key={developer.id} value={developer.id}>{developer.name} {developer.firstLastName} {developer.secondLastName}</MenuItem>
                        ):null}
                    </TextField>
            </Col >
            </Row>
            </DialogContent>
            <DialogActions>
                <Col>
                    <Button onClick={() => setOpen(false)}
                        className={clsx("btn btn-md btn-block", classes.buttonCancelar)}>Cancelar</Button>
                </Col>
                <Col>
                    <Button onClick={() => { updateProduct(); setOpen(false) }} type="button"
                        className={clsx("btn btn-md btn-block", classes.button)}>Guardar</Button>
                </Col>
            </DialogActions>
        </Dialog>
    )
}

export default UpdateProduct
