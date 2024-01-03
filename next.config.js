/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['res.cloudinary.com', 'firebasestorage.googleapis.com', 'img.icons8.com', 'raw.githubusercontent.com', 'i.imgur.com', 'img.freepik.com','media.geeksforgeeks.org','images.collegedunia.com','banner2.cleanpng.com','www.verzeo.com','indoleads.nyc3.cdn.digitaloceanspaces.com']
  }
}

module.exports = nextConfig
