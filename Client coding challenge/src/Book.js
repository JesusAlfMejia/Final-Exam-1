import React from 'react';

function Book( props ){
    return(
        <div>
            <h1>
                Nombre del libro : {props.nombreLibro}
            </h1>
            <h2>
                Autor : {props.}
            </h2>
        </div>
    );
}

export default Book;