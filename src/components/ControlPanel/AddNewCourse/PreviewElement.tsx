import React from 'react';

interface props {
    url: string,
    title: string,
    description: string,
    task: string
}

const PreviewElement: React.FunctionComponent<props> = ({url, title, description, task}) => {
    return <div>
        <video controls>
            <source src={url}/>
        </video>
        <div>
            <h2>Tytuł</h2>
            <h3>{title}</h3>
        </div>
        <div>
            <h3>Opis</h3>
            <p>{description}</p>
        </div>
        <div>
            <h3>Zadanie</h3>
            <p>{task}</p>
        </div>
    </div>;
}
 
export default PreviewElement;