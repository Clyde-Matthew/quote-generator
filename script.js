'use strict'

const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')


let apiQuotes = []

// loading function
// show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;  
}



// Show new quote function
function newQuote(){
    loading()
 // pick a random quote from apiQuotes array
 const quote = apiQuotes[Math.floor(Math.random()* apiQuotes.length)]
 console.log(quote)
// check if author field is blank and if so replace it with 'Unknown'
if(!quote.author){
    authorText.textContent = "Unknown"
}else{
    authorText.textContent = quote.author
}
// check the quote length to determine the styling
if(quote.length > 120){
    quoteText.classList.add('long-quote')
}else{
    quoteText.classList.remove('long-quote')
}

 quoteText.textContent = quote.text 


 complete()
}

// Get Quotes from an API
async function getQuotes(){
    loading()
    const apiUrl = 'https://type.fit/api/quotes'    

    try {
      const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        newQuote()
    } catch (error) {
        // catch error here
        
    }
}


// Tweet/share quote on twitter
function tweetQuote(){
const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
window.open(twitterUrl,'_blank')
}



// Event Listeners
newQuoteBtn.addEventListener('click',getQuotes)
twitterBtn.addEventListener('click',tweetQuote)
// On page Loading
getQuotes()
