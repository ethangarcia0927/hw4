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

app.get('/placeholder', async (req, res) => {

    // Node package data
    const list = languages.all;
    const randomLang = list[Math.floor(Math.random() * list.length)];

    // Default fallback if API fails
    let quoteData = { 
        author: "Unknown", 
        quote: "Could not fetch quote right now." 
    };

    try {
        const response = await fetch('https://programming-quotesapi.vercel.app/api/random');
        const data = await response.json();
        quoteData = data;
    } catch (err) {
        console.error("Quote API failed:", err);
    }

    res.render('placeholder', {
        randomLang,
        quote: quoteData.quote,
        author: quoteData.author
    });
});




app.listen(3000, () => {
   console.log('server started');
});
