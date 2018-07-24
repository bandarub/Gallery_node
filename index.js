const   express = require('express'),
        students = require('./public/data_js'),
        bodyParser = require('body-parser'),
        fileUpload = require('express-fileupload');
var app = express();
app.use(fileUpload());
var ejs=require('ejs');
app.set("view engine", "ejs");

app.use( express.static( "public" ) );

app.use(bodyParser.urlencoded({ extended: false }));



app.get('/',(req,res) => {
    res.sendFile(__dirname + '/'+'index.html')
});

app.get('/students',(req,res) => {
    res.render('Students', {students})
});
app.get('/api',(req,res)=>{
    // const api = JSON.stringify(students)
    res.send({students});
})

app.get('/students/:id',function(req,res){
    // const data = JSON.stringify(students);
    // console.log(data);
    const number = Number(req.params.id);   
    if(number>=students.length) {
        res.send(`Student n. ${number} was not found.`);
    }  
    res.render('student-info',{ firstName:students[number].firstName,        
                            lastName:students[number].lastName,
                            title:students[number].title,
                            nationality:students[number].nationality,
                            skills:students[number].skills,
                            whySoftwareDeveloper:students[number].whySoftwareDeveloper,
                            longTermVision:students[number].longTermVision,
                            motivatesMe:students[number].motivatesMe,
                            favoriteQuote:students[number].favoriteQuote,
                            joinedOn:students[number].joinedOn,
                            src:students[number].src, 
                                                      
                        });
  
});


app.get('/add-student',(req,res) =>{
    res.sendFile(__dirname + '/' + 'add-student.html');
    
});

app.post('/add-student',(req,res)=>{ 
    if (!req.files.src)
    return res.status(400).send('Please upload image'); 
    else{   
  
        var file = req.files.src;        
        var fileName = file.name;
        let {firstName,lastName,title,src,nationality,skills,whySoftwareDeveloper,longTermVision,
            motivatesMe,favoriteQuote,joinedOn}=req.body;
    
        const skillsArray = req.body.skills.split(',');   
        students.push({firstName,lastName,src:fileName,title,nationality,skills:skillsArray,whySoftwareDeveloper,longTermVision,
            motivatesMe,favoriteQuote,joinedOn});
       
        file.mv(__dirname+'/public/images/'+fileName,(err)=>{
            if(err){
                console.log(err);
                res.send('error occured');
            }
            res.send('Thank you, Your data is now saved in our database');
        })
    }
    
})

app.listen(3000, ()=> {
console.log('Server is running on port 3000....')
});


