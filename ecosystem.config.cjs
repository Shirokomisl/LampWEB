module.exports = {
  apps: [
    {
      name: "geometria-web",
      script: "./app.js",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "400M",
      env: {
        NODE_ENV: "production",
        HOST: "0.0.0.0",
        PORT: 3000
      }
    }
  ]
};
