// Set environment variables before importing the server
process.env.PORT = process.env.PORT || '3000';
process.env.HOST = process.env.HOST || '0.0.0.0';
process.env.NODE_ENV = 'production';

// Import and run the Nuxt production server
import('./.output/server/index.mjs')
  .then(() => {
    console.log(`Server running on http://${process.env.HOST}:${process.env.PORT}`);
  })
  .catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
