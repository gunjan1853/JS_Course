const quotes = [
  '"The best way out is always through." - Robert Frost',
  '"Success is not final, failure is not fatal." - Winston Churchill',
  '"Believe you can and you are halfway there." - Theodore Roosevelt',
  '"Dream big and dare to fail." - Norman Vaughan',
  '"Do something today that your future self will thank you for."',
  '"The harder you work, the luckier you get."',
  '"Never stop learning because life never stops teaching."',
  '"Your only limit is your mind."',
  '"Discipline is choosing between what you want now and what you want most."',
  '"Small steps every day lead to big results."',
  '"The secret of getting ahead is getting started." - Mark Twain',
  '"Action is the foundational key to all success." - Pablo Picasso',
  '"Don’t watch the clock; do what it does. Keep going." - Sam Levenson',
  '"Great things never come from comfort zones."',
  '"Work hard in silence, let success make the noise."',
  '"Push yourself because no one else is going to do it for you."',
  '"The future depends on what you do today." - Mahatma Gandhi',
  '"Success usually comes to those who are too busy to be looking for it." - Henry David Thoreau',
  '"You miss 100% of the shots you don’t take." - Wayne Gretzky',
  '"Don’t be afraid to give up the good to go for the great." - John D. Rockefeller',
  '"The only way to do great work is to love what you do." - Steve Jobs',
  '"Doubt kills more dreams than failure ever will."',
  '"Failure is the opportunity to begin again more intelligently." - Henry Ford',
  '"Your dreams don’t work unless you do."',
  '"Be stronger than your strongest excuse."',
  '"Every accomplishment starts with the decision to try."',
  '"The pain you feel today will be the strength you feel tomorrow."',
  '"Stay patient and trust your journey."',
  '"Success is the sum of small efforts repeated daily." - Robert Collier',
  '"Focus on progress, not perfection."',
  '"The expert in anything was once a beginner." - Helen Hayes',
  '"If you can dream it, you can do it." - Walt Disney',
  '"Difficult roads often lead to beautiful destinations."',
  '"Your attitude determines your direction."',
  '"Believe in yourself and all that you are."',
  '"Make each day your masterpiece." - John Wooden',
  '"Nothing worth having comes easy."',
  '"A year from now you may wish you had started today."',
  '"Don’t limit your challenges, challenge your limits."',
  '"Success starts with self-discipline."',
  '"The comeback is always stronger than the setback."',
  '"Winners are not afraid of losing."',
  '"Don’t stop until you’re proud."',
  '"If opportunity doesn’t knock, build a door." - Milton Berle',
  '"Hard work beats talent when talent doesn’t work hard."',
  '"Stay hungry, stay foolish." - Steve Jobs',
  '"You become what you repeatedly do."',
  '"Consistency is more important than intensity."',
  '"Every day is a second chance."',
  '"The only impossible journey is the one you never begin." - Tony Robbins'
];



const quote = document.getElementById("quote");

const button = document.getElementById("generate-btn");

button.addEventListener("click", function () {

    const randomIndex = Math.floor(Math.random() * quotes.length);

    quote.textContent = quotes[randomIndex];

});