module.exports = {
  apps : [{
    name: "audio-hosting",
    script: "node -r esm index.js",
    instances: "1",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}