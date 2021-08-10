import React from 'react';
import Card from './Card.js';

const CardList = ({robots}) => {
    return (
        <div>
            {
            robots.map((e, i) => {
                return (
                    <Card 
                    key={i} 
                    id={e.id} 
                    name={e.name} 
                    email={e.email} 
                    />
                )
            })
            }
        </div>
    )
};

export default CardList;
