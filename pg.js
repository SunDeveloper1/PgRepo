import pg  from 'pg'

const { Client} =pg
import 'dotenv/config'
let queryRunner;
try{

const client=new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user:process.env.DB_USER,
    password: process.env.DB_PASSWORD
})



await client.connect();

const query=client.query('LISTEN new_testevent')
client.on('notification',async(data)=>{
    const payload=JSON.parse(data.payload);
    console.log('row added !',payload)
})

queryRunner=async(query,params)=>{

    const startDataTime=new Date();
    const result=await  client.query(query);
    const endDataTime=new Date();
    const diff=Math.abs(endDataTime-startDataTime);
    // console.log(result.rows)

    return {
        query:query,
        result:result.rows,
        count:result.rowCount,
        diff:diff+'ms'
    }

}


}catch(err){
    console.log(err.message)
}


export default queryRunner;


