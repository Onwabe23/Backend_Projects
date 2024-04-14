//importing dependancies
let express = require('express')
const mongoose = require('mongoose')

//creating an app
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//connecting to a database 
mongoose.connect('mongodb://localhost:27017/myDB').then(()=>{ //currently using the local mongoDB
    console.log('Database connected successfully!')
}).catch(()=>{
    console.log('failed to connect to MongoDB')
})
//Create a Schema for login
const loginSchema = new mongoose.Schema({
    
fullName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true,
    }
})
const userModal = new mongoose.model('userdatas', loginSchema)

//creating routes 
app.get('/',(req,res)=>{
   res.sendFile(absolutePath = (__dirname + '/views/index.html'))
})

app.get('/login', (req,res)=>{
    res.sendFile(absolutePath = (__dirname + '/views/login.html'))
})

app.post('/login', async (req,res)=>{
    try{
        const userVerify = await userModal.findOne({email:req.body.email})
        if(userVerify.password===req.body.password){
            res.sendFile(absolutePath = (__dirname + '/views/home.html'))
        }else{
            res.send`Wrong Password`
        }
    }catch{
        res.send`incorrect details`
    }
})

app.get('/signup', (req,res)=>{
    res.sendFile(absolutePath = (__dirname + '/views/signup.html'))
})
app.post('/signup', async (req,res)=>{
  const data = {
    
    fullName:req.body.fullName,
    email:req.body.email,
    password:req.body.password
  }
  await userModal.insertMany([data])
  res.sendFile(absolutePath = (__dirname + '/views/home.html'))
})
const PORT = 3000
app.listen(PORT, ()=>{
    console.log(`Server is running on Port ${PORT}`)
})
