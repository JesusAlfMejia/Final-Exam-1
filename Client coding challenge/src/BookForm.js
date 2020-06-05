import React from 'react';

function BookForm( props ){
    return(
        <div>
            <form onSubmit={() => props.submitBtnPressed}>
                <label>Ingrese el nombre del libro:</label>
                <input type="text" name="nombreLibro" id="nombreLibro"/>
                <button type="submit">Ver resultados</button>
            </form>
        </div>
    );
}

export default BookForm;