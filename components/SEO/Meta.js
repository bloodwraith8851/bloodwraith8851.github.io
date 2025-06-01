import React from 'react'
import Head from 'next/head';

export default function Meta() {
    return (
        <Head>
           /* Primary Meta Tags */
            <title>Dino Portfolio - B.TECH Student</title>
            <meta charSet="utf-8" />
            <meta name="title" content="Dino Portfolio - B.TECH Student" />
            <meta name="description"
                content="Dino (bloodwraith8851) Personal Portfolio Website. Made with Ubuntu 20.4 (Linux) theme by Next.js and Tailwind CSS." />
            <meta name="author" content="Dino (bloodwraith8851)" />
            <meta name="keywords"
                content="bloodwraith8851, bloodwraith8851 portfolio, bloodwraith8851 linux, ubuntu portfolio, bloodwraith8851 protfolio,bloodwraith8851 computer, bloodwraith8851, bloodwraith8851 ubuntu, bloodwraith8851 patel ubuntu portfolio" />
            <meta name="robots" content="index, follow" />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="language" content="English" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#E95420" />

            /* Search Engine */
            <meta name="image" content="images/logos/fevicon.png" />
            /* Schema.org for Google */
            <meta itemProp="name" content="Dino Portfolio - B.TECH Student" />
            <meta itemProp="description"
                content="Dino Personal Portfolio Website. Made with Ubuntu 20.4 (Linux) theme by Next.js and Tailwind CSS." />
            <meta itemProp="image" content="images/logos/fevicon.png" />
            /* Open Graph general (Facebook, Pinterest & Google+) */
            <meta name="og:title" content="Dino Portfolio - B.TECH Student" />
            <meta name="og:description"
                content="Dino (bloodwraith8851) Personal Portfolio Website. Made with Ubuntu 20.4 (Linux) theme by Next.js and Tailwind CSS." />
            <meta name="og:image" content="images/logos/logo_1200.png" />
            <meta name="og:url" content="https://github.com/bloodwraith8851" />
            <meta name="og:site_name" content="bloodwraith8851 Personal Portfolio" />
            <meta name="og:locale" content="en_IN" />
            <meta name="og:type" content="website" />

            <link rel="icon" href="images/logos/fevicon.svg" />
            <link rel="apple-touch-icon" href="images/logos/logo.png" />
            <link rel="preload" href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" as="style" />
            <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
        </Head>
    )
}
