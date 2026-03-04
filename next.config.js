/** @type {import('next').NextConfig} */
// const path = require('path');
const nextConfig = {

    // webpack: (config) => {
    //     config.resolve.alias = {
    //       ...config.resolve.alias,
    //       '@': path.resolve(__dirname, './'),
    //     };
    
    //     return config;
    //   },
       
    //     eslint: {
    //         ignoreDuringBuilds: true,
    //     },
        images:{
          domains:["firebasestorage.googleapis.com"]
      }

}

module.exports = nextConfig
