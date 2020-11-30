import { CircularProgress, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Table } from 'reactstrap'
import NavProjects from '../../components/project/NavProjects'
import api from '../../util/api'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#049474", color: "white", textAlign: "center"
    },
}));

const ReportProjects =()=>{
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
            <h1>REPORTE PROYECTOS</h1>
            <Table responsive bordered>
                <thead className={classes.root}>
                    <tr>
                        <th>#</th>
                        <th>CLAVE</th>
                        <th>PRODUCTS BACKLOG</th>
                        <th>PRODUCTS TERMINADOS</th>
                        <th>AVANCE</th>
                        <th>PRODUCT OWNER</th>
                        <th>SCRUM MASTER</th>
                        <th>DESARROLLADORES</th>
                    </tr>
                </thead>
                <tbody style={{ textAlign: "center" }}>
                    {projects===null?<tr><th colSpan={8}><CircularProgress /></th></tr>:projects.map((item, index) =>
                        <tr key={item.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.code}</td>
                            <td>{item.products.length}</td>
                            <td>{(item.products.filter((product)=>product.status===4)).length}</td>
                            <td>{item.products.length>0?(((item.products.filter((product)=>product.status===4)).length)/(item.products.length))*100:"0"}%</td>                            
                            
                            <td>{item.members.filter((integrante) => integrante.rol === 1).length<1
                                ?"Sin asignar":item.members.filter((integrante) => integrante.rol === 1)[0].code}</td>
                            <td>{item.members.filter((integrante) => integrante.rol === 1).length<1
                                ?"Sin asignar":item.members.filter((integrante) => integrante.rol === 2)[0].code}</td>
                            <td>{item.members.filter((integrante) => integrante.rol === 3).length}</td>
                        </tr>
                    )}
                    {projects!==null?projects.length < 1 && (
                        <tr>
                            <th colSpan={8}>NO HAY REGISTROS</th>
                        </tr>
                    ):null}
                </tbody>
            </Table>

        </NavProjects>
    )
}

export default ReportProjects
