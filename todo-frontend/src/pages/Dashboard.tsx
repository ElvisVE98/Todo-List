import Layout from "@/components/layout";

const Dashboard = () =>{
   
//fUNCION PARA MOSTRAR LA FECHA
const fechaActual = new Date().toLocaleDateString('es-ES',{
    weekday:'long',
    day:'numeric',
    month:'long'
});


    return(

        <Layout>
            <h1>Resumen</h1>
            <p>{fechaActual}</p>
        </Layout>
       
    );
};

export default Dashboard;