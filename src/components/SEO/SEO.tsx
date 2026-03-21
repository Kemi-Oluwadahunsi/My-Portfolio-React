import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  path?: string
}

const DEFAULT_TITLE       = 'Oluwakemi Oluwadahunsi | Senior Software Engineer · MFE Architect'
const DEFAULT_DESCRIPTION = 'Senior Software Engineer specialising in Webpack 5 Module Federation and Micro Frontend Architecture. 4+ years building enterprise-scale systems at Etiqa Insurance. React · TypeScript · Next.js · Node.js.'
const BASE_URL            = 'https://kemi-oluwadahunsi.vercel.app'
const OG_IMAGE            = `${BASE_URL}/my-image-2-new.webp`

const SEO = ({ title = DEFAULT_TITLE, description = DEFAULT_DESCRIPTION, path = '/' }: SEOProps) => {
  const url = `${BASE_URL}${path}`

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description"         content={description} />
      <meta name="author"              content="Oluwakemi Oluwadahunsi" />
      <meta name="robots"              content="index, follow" />
      <link rel="canonical"            href={url} />

      {/* Open Graph */}
      <meta property="og:type"         content="website" />
      <meta property="og:url"          content={url} />
      <meta property="og:title"        content={title} />
      <meta property="og:description"  content={description} />
      <meta property="og:image"        content={OG_IMAGE} />
      <meta property="og:site_name"    content="Kemi Oluwadahunsi Portfolio" />

      {/* Twitter */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:site"        content="@km_oluwadahunsi" />
      <meta name="twitter:creator"     content="@km_oluwadahunsi" />
      <meta name="twitter:title"       content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={OG_IMAGE} />

      {/* Keywords */}
      <meta name="keywords" content="Senior Software Engineer, Micro Frontend Architecture, Webpack 5 Module Federation, React, TypeScript, Next.js, Node.js, Enterprise Frontend, MFE, Oluwakemi Oluwadahunsi" />
    </Helmet>
  )
}

export default SEO
