#!/usr/bin/env node

var readline = require("readline");
var lastTime = undefined;

async function processLineByLine() {
  const rl = readline.createInterface({
    input: process.stdin
  });

  for await (const line of rl) {
    // Each line in the readline input will be successively available here as
    // `line`.
    let d = line.substring(0, line.indexOf(",") - 1);
    if (lastTime === undefined) {
      lastTime = new Date(d);
    } else {
      let thisTime = new Date(d);
      let diff = thisTime.getTime() - lastTime.getTime();
      if (diff > 0) {
	rl.pause();
        await new Promise(resolve => setTimeout(resolve, diff));
	rl.resume();
      }
      lastTime = new Date(thisTime);
    }
    process.stdout.write(line + "\n");
  }
}

processLineByLine();
