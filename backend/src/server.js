import express from 'express';
import cors from 'cors';
const app=express();
app.use(cors());
app.use(express.json());

app.get('/api/health',(req,res)=>res.json({ok:true}));

app.post('/api/email/send',(req,res)=>{
  res.json({message:'Email endpoint ready'});
});

app.listen(4000,()=>console.log('API on 4000'));
