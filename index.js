const canvas = document.querySelector("canvas");

const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const piano_width = innerWidth / 3;

const key_width = innerWidth / 12;
const key_height = innerHeight / 5;

let keys = [];

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (let i = 0; i < 100; i++) {
    keys.push(randomInteger(1, 4));
}

function draw_key(index, layer) {
    console.log("draw")
    c.fillStyle = "rgb(240,240,240)";
    c.fillRect(piano_width, innerHeight - (key_height * layer), piano_width, key_height);
    c.fillStyle = "rgb(0,0,0)";
    c.fillRect(piano_width + (key_width * (index - 1)), innerHeight - (key_height * layer), key_width, key_height);
}

let start_time;
let keys_pressed = 0;

function finish()
{
    console.log("finish") 
}

function fail()
{
    console.log("fail") 
}

function start()
{
    start_time = Date.now();
    console.log("start") 
}

function refresh_keys()
{
    let layer = 1;

    for (key of keys) {
        if (layer >= 6) break;
        draw_key(key, layer++);
    }    
}

let start_bool = true;

function play_key(note, octive = 3)
{
    new Audio(`./piano_keys/${note}${octive}.mp3`).play()
}

const songs = 
{
    ode_to_joy:{
        notes: "abbaabbcddcbaggabaggabgabcbgabcbagaddbbcddcbaggabagg",
        index: 0
    },
    rockin_robin:{
        notes: "dfeddcdedcfeeddccafgfffffagfbffgffgfbbababbbccccgff",
        index: 0
    },
    house_rising_sun:{
        notes: "eccdcegggfeccgfcgcbfgggfcbcgefgggfeccefggfefcfccc",
        index: 0
    },
};

function play_song(song)
{
    if (song.index >= song.notes.length) song.index = 0;
    play_key(song.notes[song.index++]);
}

window.onkeydown = function(e) 
{
    keys_pressed++;

    if (keys.length == 0) 
    {
        refresh_keys();
        return finish();
    }

    if (e.key == keys[0])
    {
        if (start_bool)
        {
            start_bool = false;
            start();
        }

        console.log("working???");

        play_song(songs.house_rising_sun);
        keys.shift();
        refresh_keys();
    }
    else if (e.key <= 4 && e.key >= 1)
    {
        fail();
    }
}

refresh_keys();