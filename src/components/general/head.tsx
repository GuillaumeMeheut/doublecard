import React from 'react'
import Head from 'next/head'

export function AppHead({
  icon,
  url,
  description,
  name,
  themeColor,
  author,
  keywords,
  language,
}) {
  return (
    <Head>
      <title>{`${name}`}</title>
      <link rel="icon" href={`${icon}`} />
      <link rel="canonical" href={`${url}`} />
      <meta charSet="utf-8" />
      <meta name="theme-color" content={`${themeColor}`} />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta itemProp="name" content={`${name}`} />
      <meta itemProp="description" content={`${description}`} />
      <meta name="description" content={`${description}`} />
      <meta name="author" content={`${author}`} />
      <meta name="keywords" content={`${keywords}`} />
      <meta property="og:title" content={`${name}`} />
      <meta property="og:site_name" content={`${name}`} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={`${language}`} />
      <meta property="og:url" content={`${url}`} />
      <meta property="og:image" content={`${icon}`} />
      <meta property="og:description" content={`${description}`} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content={`${url}`} />
      <meta name="twitter:site" content={`${name}`} />
      <meta name="twitter:title" content={`${name}`} />
      <meta name="twitter:description" content={`${description}`} />
      <meta name="twitter:image" content={`${icon}`} />
    </Head>
  )
}
