import { SitemapStream, streamToPromise } from 'sitemap'
import { createWriteStream } from 'fs'

const links = [{ url: '/', changefreq: 'daily', priority: 1 }]

const stream = new SitemapStream({ hostname: 'https://cypress-realworld-testing-course-app.vercel.app/' })

links.forEach(link => {
  stream.write(link)
})

stream.end()

streamToPromise(stream)
  .then((sitemap) => {
    createWriteStream('sitemap.xml').write(sitemap.toString())
  })