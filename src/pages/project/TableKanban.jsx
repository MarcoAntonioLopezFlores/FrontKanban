import React, { Fragment, useEffect, useState } from 'react'
import { Button, Table } from 'reactstrap'
import InformationProject from '../../components/project/InformationProject'
import { LinearProgress, makeStyles } from '@material-ui/core';
import api from '../../util/api';
import ChangeStatus from '../../components/product/ChangeStatus';
import formatDate from '../../util/formatDate'
const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: "#049474", color: "white", textAlign: "center"
    },
    marginRow: {
        marginTop: 20
    },
    sizeButton: {
        borderRadius: 15,height:40,width:40
    }
}));

const TableKanban = (props) => {
    const classes = useStyles()
    const [clave, setClave] = useState("")
    const [nombre, setNombre] = useState("")
    const [status, setStatus] = useState("")
    const [statusDate, setStatusDate] = useState(new Date())
    const [productOwner, setProductOwner] = useState({})
    const [scrumMaster, setScrumMaster] = useState({})
    const [products, setProducts] = useState([])
    const [open, setOpen] = useState(false)
    const [productSelect, setProductSelect]=useState({})
  
    const getProject = async () => {
        console.log("render")
        const idProject = localStorage.getItem('idProject')
        const response = await api.projects.getOne(idProject);
        setClave(response.code)
        setNombre(response.name)
        setStatus(response.status)
        setStatusDate(new Date(response.statusDate))
        setScrumMaster(response.members.filter((integrante) => integrante.rol === 1)[0])
        setProductOwner(response.members.filter((integrante) => integrante.rol === 2)[0])
        setProducts(response.products)
    }

    useEffect(() => {
        getProject()
    }, [])
    return (
        clave===""?<LinearProgress />
        :
        <Fragment>
            <h1>TABLERO KANBAN</h1>
            <InformationProject
                code={clave}
                name={nombre}
                statusDate={statusDate}
                status={products.length<1?status:(((products.filter((product)=>product.status===4)).length)/(products.length))===1?"Terminado":"En proceso"}
                master={scrumMaster !== undefined ? `${scrumMaster.name} ${scrumMaster.firstLastName} ${scrumMaster.secondLastName}` : "Sin asignar"}
                owner={productOwner !== undefined ? `${productOwner.name} ${productOwner.firstLastName} ${productOwner.secondLastName}` : "Sin asignar"}
            />
            <Table className={classes.marginRow} responsive bordered>
                <thead className={classes.root}>
                    <tr>
                        <th>#</th>
                        <th>PRODUCT BACKLOG</th>
                        <th>PRIORIDAD</th>
                        <th>STATUS</th>
                        <th>FECHA STATUS</th>
                        <th>DESARROLLADOR</th>
                    </tr>
                </thead>
                <tbody style={{ textAlign: "center" }}>
                    {products.map((product) =>
                        <tr key={product.id}>
                            <th scope="row">{product.code}</th>
                            <td>{product.funcionality}</td>
                            <td title={product.priority === 1 ? "Alta" : product.priority === 2 ? "Media" : "Baja"}>{<Button color={product.priority === 1 ? "danger" : product.priority === 2 ? "warning" : "success"}
                                className={classes.sizeButton}></Button>}
                            </td>
                            <td title={product.status === 2 ? "Seleccionado" : product.status === 3 ? "En proceso" : "Terminado"}><Button className={classes.sizeButton} 
                                color={product.status === 2 ? "danger" : product.status === 3 ? "warning" : "success"}
                                onClick={()=>{setProductSelect(product);setOpen(true)}}
                                />
                            </td>
                            <td>{formatDate(product.statusDate)}</td>
                            <td>{product.developer.code}</td>
                        </tr>
                    )}
                    {/*<tr>
                        <th colSpan={6} style={{ textAlign: "center" }}>NO HAY PRODUCTS BACKLOG</th>
                    </tr>*/}
                </tbody>
            </Table>
            {open &&<ChangeStatus
                getProject={getProject}
                product={productSelect}
                open={open}
                setOpen={setOpen}
                title={"CAMBIAR STATUS DEL PRODUCT BACKLOG"}
            />}
        </Fragment>
    )
}

export default TableKanban
