import React from 'react'

export default function VsCode() {
    // Convert regular GitHub URL to github1s URL for VSCode web interface
    const githubUrl = "https://github.com/bloodwraith8851/bloodwraith8851.github.io";
    const vscodeUrl = githubUrl.replace("github.com", "github1s.com");

    return (
        <div className="h-full w-full bg-ub-cool-grey">
            <iframe 
                src={vscodeUrl}
                frameBorder="0" 
                title="VSCode" 
                className="h-full w-full"
                sandbox="allow-scripts allow-same-origin allow-forms"
                loading="lazy"
            ></iframe>
        </div>
    );
}

// Fix the displayVsCode function to properly return the component
export const displayVsCode = () => {
    return <VsCode />;
}
