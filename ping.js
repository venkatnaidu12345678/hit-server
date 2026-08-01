const URL = process.env.TARGET_URL || "https://sharewheels-backend.onrender.com/health";
const INTERVAL_MS = Number(process.env.INTERVAL_MS || 3 * 1000); // default: 3 seconds

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function hit() {
  const started = Date.now();
  try {
    const res = await fetch(URL);
    const body = await res.text();
    console.log(
      `[${new Date().toISOString()}] ${res.status} (${Date.now() - started}ms)`,
      body.slice(0, 200)
    );
  } catch (err) {
    console.error(`[${new Date().toISOString()}] error:`, err.message);
  }
}

console.log(`Pinging ${URL} every ${INTERVAL_MS}ms…`);

async function startLoop() {
  while (true) {
    await hit();
    await sleep(INTERVAL_MS);
  }
}

startLoop();
