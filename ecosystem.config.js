const defaultOptions = {
  instances: 1,
  autorestart: true,
  watch: false,
  max_memory_restart: '1G',
  env: {
    NODE_ENV: 'development'
  },
  env_production: {
    NODE_ENV: 'production'
  }
}

module.exports = {
  apps: [
    {
      name: 'api',
      script: 'api/build/api.js',
      ...defaultOptions
    },
    {
      name: 'processor',
      script: 'processor/build/processor.js',
      ...defaultOptions
    },
    {
      name: 'controller',
      script: 'controller/build/controller.js',
      ...defaultOptions
    },
    {
      name: 'explorer',
      script: 'explorer/explorer.js',
      ...defaultOptions
    }
  ]
}
