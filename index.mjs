import express from 'express';
import fetch from 'node-fetch';
import languages from 'programming-languages-list';


const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

// routes
app.get(`/index`, (req,res) => {
    res.render(`index`)
});

app.get(`/history`, (req,res) => {
    res.render(`history`)
});

app.get(`/popular`, (req,res) => {
    res.render(`popular`)
});

app.get(`/types`, (req,res) => {
    res.render(`types`)
});

app.get('/jokes', async (req, res) => {
    try {
        // Node package: programming-languages-list
        const list = languages.all;
        const randomLang = list[Math.floor(Math.random() * list.length)];
        
        // Web API call: Official Joke API (very reliable, no rate limits)
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');
        const jokeData = await response.json();
        
        // Render the view with data
        res.render('jokes', {
            randomLang: randomLang,
            quote: `${jokeData.setup} - ${jokeData.punchline}`,
            author: 'Programming Joke API'
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error fetching data');
    }
});




app.listen(3000, () => {
   console.log('server started');
});
