

export const EnvConfiguration = () => ({
  enviroment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.HOSTDATABASE,
  port: process.env.PORT || 3001
});