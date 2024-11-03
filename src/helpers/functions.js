function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

async function sleep(ms) {
  await new Promise(resolve => setTimeout(resolve, ms));
}

export {getRandomInt, sleep}