var clicks = 0;
var globalPoints = 0;
var wl = document.getElementById("wl");
var gameNumber = 1

document.addEventListener("DOMContentLoaded", function () {
    const images = ["Evy Elfie.jpg", "Lana Rhoades.jpg", "Mia Khalifa.jpg", "Elsa Jean.jpg", "Mia Malkova.jpg", "Britney Amber.jpg", "Emily Willis.jpg", "Lena Paul.jpg", "Valerie Kay.jpg", "Sophie Rain.jpg", "Savannah Bond.jpg", "Bonnie Blue.jpg", "Lily Phillips.jpg", "Johnny Sins.jpg", "Kaly Roses.jpg", "Valentina Nappi.jpg", "Sweetie Fox.jpg", "Hannah Owo.jpg", "Lexi Luna.jpg", "Katty West.jpg", "Abella Danger.jpg", "Tru Kait.jpg", "Skyler Vox.jpg", "Rosie Rider.jpg", "Blake Blossom.jpg", "Riley Reid.jpg", "Hazel Moore.jpg", "Sky Bri.jpg", "Autumn Falls.jpg", "Nicole Aniston.jpg"];

    let randomImage = pickRandomImage();

    function pickRandomImage() {
        const selectedImage = images[Math.floor(Math.random() * images.length)];
        const container = document.querySelector(".container");
        container.style.backgroundImage = `url('img/${selectedImage}')`;
        container.style.backgroundSize = "cover";
        container.style.backgroundPosition = "center";
        console.log("Selected Image:", selectedImage);
        return selectedImage;
    }

    document.getElementById("checkGuess").addEventListener("click", function () {
        let userInput = document.getElementById("imageGuess").value.trim().toLowerCase();
        let correctAnswer = randomImage.trim().toLowerCase();

        userInput = userInput.replace(/\.jpg$/, "");
        correctAnswer = correctAnswer.replace(/\.jpg$/, "");

        console.log("User Input:", userInput);
        console.log("Correct Answer:", correctAnswer);

        if (userInput === correctAnswer) {
            gameNumber++
            var points = document.getElementsByTagName("th").length - clicks;
            console.log("✅ Win! Points: " + points);
            globalPoints += points;
            document.getElementById("points").innerHTML = globalPoints;

            for (let i = 1; i <= 16; i++) {
                let cell = document.getElementById(i.toString());
                if (cell) {
                    cell.style.opacity = "1.0";
                }
            }

            wl.innerHTML = "✅ Win!";
            wl.style.color = "green";
            if (gameNumber == 10) {
                gameEnded()
            } else {
                document.getElementById("gamen").innerHTML = "Game "+gameNumber+"/10";
                setTimeout(() => {
                    randomImage = pickRandomImage();
                    resetBoard();
                }, 1000);
            }
        } else {
            console.log("❌ Try Again!");

            revealOneCell(); // Ensure cell is revealed BEFORE checking loss condition
            
            if (clicks >= 16) {
                gameNumber++
                wl.innerHTML = "❌ Loose!";
                wl.style.color = "red";

                if (gameNumber == 10) {
                    gameEnded()
                } else {
                    document.getElementById("gamen").innerHTML = "Game "+gameNumber+"/10";
                    setTimeout(() => {
                        randomImage = pickRandomImage();
                        resetBoard();
                    }, 1000);
                }

            } else {
                wl.innerHTML = "Try again!";
                wl.style.color = "orange";
            }
        }
    });

    for (let i = 1; i <= 16; i++) {
        let cell = document.getElementById(i.toString());
        if (cell) {
            cell.addEventListener("click", function () {
                cell.style.opacity = "0.0";
                clicks++;
            });
        }
    }

    function resetBoard() {
        clicks = 0;
        for (let i = 1; i <= 16; i++) {
            let cell = document.getElementById(i.toString());
            if (cell) {
                cell.style.opacity = "1.0";
            }
        }
        document.getElementById("imageGuess").value = "";
    }
});

function revealOneCell() {
    let hiddenCells = [];

    for (let i = 1; i <= 16; i++) {
        let cell = document.getElementById(i.toString());
        if (cell && (cell.style.opacity === "1.0" || cell.style.opacity === "")) {
            hiddenCells.push(cell);
        }
    }

    if (hiddenCells.length > 0) {
        let randomIndex = Math.floor(Math.random() * hiddenCells.length);
        hiddenCells[randomIndex].style.opacity = "0.0";
        clicks++;
    } else {
        console.warn("No hidden cells left to reveal!");
    }
}

function gameEnded() {
    console.error("Game ended")

    document.getElementById('container').style.display = 'none';
    document.getElementById('points').style.display = 'none';
    document.getElementById('gamen').style.display = 'none';
    document.getElementById('imageGuess').style.display = 'none';
    document.getElementById('checkGuess').style.display = 'none';
    document.getElementById('wl').style.display = 'none';

    document.getElementById('leaderboardSign').style.display = 'block';
}