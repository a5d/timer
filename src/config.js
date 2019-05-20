const config = {
  basePath: (process.env.NODE_ENV !== 'production') ? '' : '/timer/build',
  serverPath: 'http://jiks.ru/timer/server.php',
  dev: process.env.NODE_ENV !== 'production'
}

export default config