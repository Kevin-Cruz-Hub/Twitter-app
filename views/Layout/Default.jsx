const React = require('react')

// children is already built into react, anything that is passed into the default layout or anything that is rendered will be in children
function DefaultLayout({title, children}){
    return(
        // default layout can be similar to an html document
        <html>
            <head>
                <title>{title}</title>
                <link rel="stylesheet" href="/css/app.css"></link>  
                {/* <script src="https://cdn.tailwindcss.com"></script> */}
            </head>
            <body className='flex flex-col items-center'>
                <h1>{title}</h1>
                {children}
            </body>
        </html>
    )
}
module.exports = DefaultLayout;