import { Helmet } from 'react-helmet';

const StructuredData = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "DPBOSS",
    "url": "https://www.dpbosservices.in/",
    "description": "The No. 1 Matka Site with fast Matka results, Kalyan Matka guessing, and tips.",
    "keywords": "DPBOSS, SATTA MATKA, KALYAN MATKA, MATKA RESULT, Matka Tips",
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
