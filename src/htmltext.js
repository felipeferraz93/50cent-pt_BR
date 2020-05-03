function htmltext(moeda) {
  return `
  <html>
      <link href="https://fonts.googleapis.com/css2?family=Fjalla+One&display=swap" rel="stylesheet">
      <style>

          *{
            margin:auto
          }

          body {

            width: 700px;
            height: 400px;
            background-image: url("https://i.ibb.co/fXYdjvX/Slide1.jpg");
            background-repeat: no-repeat;
            background-size: 100%;
            padding-top: 40px;
          }

          p {
            color: #FFF;
            font-size: 60px;
            text-align: center;
            text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
            font-family: 'Fjalla One', sans-serif;
          }
        </style>
      </head>

      <body id="image">
          <p id="texto"> ${moeda} CENTAVOS </p>
      </body>
  </html>`;
}

module.exports = htmltext;
