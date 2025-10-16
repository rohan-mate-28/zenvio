module.exports = {
  apps: [
    {
      name: "zenvio-backend",
      cwd: "./server",
      script: "./dist/index.js",   // path to compiled backend entry
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 5000,
        // Add any non-secret env var here
      },
      // secrets from .env will be read by your app if you use dotenv in code
    },
    {
      name: "zenvio-frontend",
      cwd: "./frontend",
      script: "npm",
      args: "run start",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
}
