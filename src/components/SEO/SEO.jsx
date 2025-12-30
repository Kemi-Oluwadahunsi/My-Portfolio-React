import { Helmet } from 'react-helmet-async'

const SEO = ({ 
  title, 
  description, 
  image, 
  url, 
  type = 'website' 
}) => {
  const defaultTitle = 'Kemi Oluwadahunsi | Frontend Developer | React Specialist | KodeMaven'
  const defaultDescription = 'Frontend Developer specializing in React.js, modern web applications, and creative solutions. View my portfolio of responsive websites, SPAs, e-commerce platforms, and brand portfolios.'
  const defaultImage = 'https://kodemaven-portfolio.vercel.app/images/my-image3.webp'
  const defaultUrl = 'https://kodemaven-portfolio.vercel.app/'

  const seo = {
    title: title ? `${title} | KodeMaven` : defaultTitle,
    description: description || defaultDescription,
    image: image || defaultImage,
    url: url || defaultUrl,
    type: type,
  }

  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Kemi Oluwadahunsi',
    jobTitle: 'Frontend Developer',
    url: defaultUrl,
    sameAs: [
      'https://www.linkedin.com/in/oluwakemioluwadahunsi/',
      'https://github.com/Kemi-Oluwadahunsi/',
      'https://twitter.com/km_oluwadahunsi',
    ],
    image: defaultImage,
    description: defaultDescription,
    knowsAbout: [
      'React.js',
      'JavaScript',
      'Frontend Development',
      'Web Development',
      'UI/UX Design',
    ],
  }

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seo.title}</title>
      <meta name="title" content={seo.title} />
      <meta name="description" content={seo.description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={seo.type} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export default SEO
