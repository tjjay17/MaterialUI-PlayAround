const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const env = require('./Config');
const sgMail = require('@sendgrid/mail');
const app = express();

mongoose.connect(env.URI,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(response => console.log('Connected'))
.catch(err=>console.log('Database Connection Problem'));

sgMail.setApiKey(env.API_KEY);

//The id will be Email, so if you already signed up can't do again
let guestSchema = new mongoose.Schema({
    _id:String,
    Email:String,
    Fname:String,
    Lname:String,
    Food:String
});

const Guests = mongoose.model('guest',guestSchema);

app.use(bodyParser.json());
app.use(cors());
//REST API
//GET route to obtain all the guests information.
app.get('/',(req,res)=>{
    res.send('api works!');
});
app.get('/allGuests',(req,res)=>{
    Guests.find({},(err,results)=>{
        res.json(results);
    });
});

//POST route to create a new guest in the database.
app.post('/createGuest',(req,res)=>{
    let Email = req.body.Email;
    let Fname = req.body.Fname;
    let Lname = req.body.Lname;
    let Food = req.body.Food;

    Guests.findById(Email,(err,found) =>{
        if (found){
            res.status(409).send('User Already Exists');
        }else{
            Guests.create({
                Fname:Fname,
                Lname:Lname,
                Email:Email,
                Food:Food,
                _id:Email
            });
          
            let emailContent = (`Hello There ${Fname} ${Lname},
                                <br> 
                                <br>
                                You have signed up for our event at 123 example street, on October 24th.
                                <br>
                                You have requested your dish to be ${Food}.
                                <br>
                                We look forward to seeing you!
                                <br>
                                <br>
                                Regards,
                                <br>
                                John TestFace`);
                            
            const msg = {
                to: Email, // Change to your recipient
                from: 'assignmentsample1999@gmail.com', // Change to your verified sender
                subject: 'You Have Registered for The Event!',
                text: 'You Have Registered for The Event!',
                html: `<p>${emailContent}</p>`
                }

                sgMail
                .send(msg)
                    .then(() => {
                        console.log('Email sent');
                        res.status(201).send('Email sent.')
                    })
                    .catch((error) => {
                        console.log(error);
                    });
              //res.status(201).send('success');
        }
    });
});

//DELETE route to delete guest off list
app.delete('/deleteGuest/:guest',(req,res)=>{
    let toDelete = req.params.guest;

    Guests.findByIdAndDelete(toDelete, err =>{
        if(err){
            console.log(err);
        }else{
            let emailContent = (`Hello There,
                        <br> 
                        <br>
                        Sorry to see that you have cancelled on our event.
                        <br>
                        Feel free to register by October 20th if you change your mind!
                        <br>
                        <br>
                        Regards,
                        <br>
                        John TestFace`);
            
    const msg = {
        to: toDelete, // Change to your recipient
        from: 'assignmentsample1999@gmail.com', // Change to your verified sender
        subject: 'Sorry to see you cancel!',
        text: 'Sorry to see you cancel!',
        html: `<p>${emailContent}</p>`
        }

        sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent');
            res.status(201).send('Email sent.')
        })
        .catch((error) => {
            console.log(error);
        })
        }        
    });
    res.status(201).send('success');
});

//PUT route to update guest. POST request can be used as well but convention is Put.
app.put('/updateGuest/:guest/:food/:first/:last',cors(),(req,res) =>{
    let toUpdate = req.params.guest;
    let food = req.params.food;
    let firstName = req.params.first ;
    let lastName = req.params.last;

    let updateQuery = {
                        Food:food, 
                        Fname:firstName,
                        Lname:lastName
                    };

    Guests.findOneAndUpdate({_id:toUpdate},updateQuery,(err)=>{
        if(err){
            console.log('you got an error',err);
        }else{
            let emailContent = (`Hello There,
                                <br> 
                                <br>
                                This is just a notification/reminder that you updated your entry.
                                <br>
                                Feel free to change anything else by October 20th if you change your mind!
                                <br>
                                <br>
                                Regards,
                                <br>
                                John TestFace`);

const msg = {
    to: toUpdate, // Change to your recipient
    from: 'assignmentsample1999@gmail.com', // Change to your verified sender
    subject: 'Notification:You Updated Your Entry!',
    text: 'Notification:You Updated Your Entry!',
    html: `<p>${emailContent}</p>`
  }

  sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent');
        res.status(201).send('Email sent.')
    })
    .catch((error) => {
        console.log(error);
    })
            res.status(201).send('Successful');
        }
    });
});

app.listen(8080||process.env.PORT);
