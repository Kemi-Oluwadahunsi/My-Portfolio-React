import { Helmet } from 'react-helmet-async'
import PropTypes from 'prop-types'

const SEO = ({ 
  title, 
  description, 
  image, 
  url, 
  type = 'website',
  keywords,
  author = 'Kemi Oluwadahunsi'
}) => {
  const defaultTitle = 'Kemi Oluwadahunsi | Frontend Developer | React Specialist | KodeMaven'
  const defaultDescription = 'Frontend Developer specializing in React.js, modern web applications, and creative solutions. View my portfolio of responsive websites, SPAs, e-commerce platforms, and brand portfolios.'
  const defaultImage = 'https://kemi-oluwadahunsi.vercel.app/my-image-2-new.webp'
  const defaultUrl = 'https://kemi-oluwadahunsi.vercel.app/'
  const defaultKeywords = 'Frontend Developer, React Developer, Web Developer, JavaScript, React.js, Portfolio, Web Design, UI/UX, Single Page Applications, E-commerce, Frontend Engineer, Software Engineer, React Specialist, Next.js, TypeScript, HTML5, CSS3, SCSS, Framer Motion, GSAP, Three.js'

  const seo = {
    title: title ? `${title} | KodeMaven` : defaultTitle,
    description: description || defaultDescription,
    image: image || defaultImage,
    url: url || defaultUrl,
    type: type,
    keywords: keywords || defaultKeywords,
    author: author,
  }

  // JSON-LD Structured Data - Person
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Kemi Oluwadahunsi',
    alternateName: 'KodeMaven, TechMrs',
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
      'TypeScript',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Firebase',
      'Tailwind CSS',
      'Bootstrap',
      'Material UI',
      'Ant Design',
      'Frontend Development',
      'Web Development',
      'Next.js',
      'HTML5',
      'CSS3',
      'SCSS',
      'Framer Motion',
      'GSAP',
      'Three.js',
    ],
    alumniOf: {
      '@type': 'Organization',
      name: 'Software Engineering',
    },
  }

  // JSON-LD Structured Data - WebSite
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'KodeMaven Portfolio',
    url: defaultUrl,
    author: {
      '@type': 'Person',
      name: 'Kemi Oluwadahunsi',
    },
    description: defaultDescription,
  }

  // JSON-LD Structured Data - Portfolio
  const portfolioJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${defaultUrl}#portfolio`,
    name: 'Kemi Oluwadahunsi Portfolio',
    creator: {
      '@type': 'Person',
      name: 'Kemi Oluwadahunsi',
    },
    description: defaultDescription,
    url: defaultUrl,
  }

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang="en" />
      <title>{seo.title}</title>
      <meta name="title" content={seo.title} />
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="author" content={seo.author} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      <link rel="canonical" href={seo.url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={seo.type} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Kemi Oluwadahunsi - Frontend Developer Portfolio" />
      <meta property="og:site_name" content="KodeMaven Portfolio" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:image:alt" content="Kemi Oluwadahunsi - Frontend Developer Portfolio" />
      <meta name="twitter:creator" content="@km_oluwadahunsi" />
      <meta name="twitter:site" content="@km_oluwadahunsi" />

      {/* Additional SEO */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="KodeMaven" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(personJsonLd)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteJsonLd)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(portfolioJsonLd)}
      </script>
    </Helmet>
  )
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string,
  keywords: PropTypes.string,
  author: PropTypes.string,
}

// eslint-disable-next-line react-refresh/only-export-components
export default SEO
