import { CircularProgress, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Table } from 'reactstrap'
import NavProjects from '../../components/project/NavProjects'
import api from '../../util/api';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#049474", color: "white", textAlign: "center"
    },
}));

const ReportsKanban=()=> {
    const classes = useStyles()
    
    const [projects, setProjects] = useState(null)
    const getProjects = () => {
        api.projects.list().then(listProjects=>{
            setProjects(listProjects)
        })
    }

    useEffect(() => getProjects(),[])
    return (
        <NavProjects >
            <h1>REPORTE TABLEROS KANBAN</h1>
            <Table responsive bordered>
                <thead className={classes.root}>
                    <tr>
                        <th style={{verticalAlign:"middle"}} rowSpan={2}>#</th>
                        <th style={{verticalAlign:"middle"}} rowSpan={2}>CLAVE</th>
                        <th style={{verticalAlign:"middle"}} rowSpan={2}>PRODUCTS BACKLOG</th>
                        <th colSpan={3}>PRIORIDAD</th>
                        <th colSpan={4}>STATUS</th>
                        <th style={{verticalAlign:"middle"}} rowSpan={2}>AVANCE</th>
                    </tr>
                    <tr>
                        <th style={{backgroundColor:"red"}}>ALTA</th>
                        <th style={{backgroundColor:"#fbc02d"}}>MEDIA</th>
                        <th style={{backgroundColor:"green"}}>BAJA</th>
                        <th style={{backgroundColor:"#002E5D"}}>PENDIENTE</th>
                        <th style={{backgroundColor:"red"}}>SELECCIONADO</th>
                        <th style={{backgroundColor:"#fbc02d"}}>PROCESO</th>
                        <th style={{backgroundColor:"green"}}>FINALIZADO</th>
                    </tr>
                </thead>
                <tbody style={{ textAlign: "center" }}>
                    {projects===null?<tr><th colSpan={12}><CircularProgress /></th></tr>:projects.map((item, index) =>
                        <tr key={item.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.code}</td>
                            <td>{item.products.length}</td>
                            <td>{(item.products.filter((product)=>product.priority===1)).length}</td>
                            <td>{(item.products.filter((product)=>product.priority===2)).length}</td>
                            <td>{(item.products.filter((product)=>product.priority===3)).length}</td>
                            <td>{(item.products.filter((product)=>product.status===1)).length}</td>
                            <td>{(item.products.filter((product)=>product.status===2)).length}</td>
                            <td>{(item.products.filter((product)=>product.status===3)).length}</td>
                            <td>{(item.products.filter((product)=>product.status===4)).length}</td>
                            <td>{item.products.length>0?(((item.products.filter((product)=>product.status===4)).length)/(item.products.length))*100:"0"}%</td>                            
                        </tr>
                    )}
                    {projects!==null?projects.length < 1 && (
                        <tr>
                            <th colSpan={12}>NO HAY REGISTROS</th>
                        </tr>
                    ):null}
                </tbody>
            </Table>
        </NavProjects>      
    )
}

export default ReportsKanban

