import React, {useEffect, useState} from "react";
import Card from "./Card";
import axios from "axios";

const DECK_API = "https://deckofcardsapi.com/api/deck";

function Deck() {
    const [deck, setDeck] = useState(null);
    const [drawnCards, setDrawnCards] = useState([]);
    const [isShuffling, setIsShuffling] = useState(false);
    
    useEffect(function loadDeckFromAPI() {
        async function fetchData() {
            const d = await axios.get(`${DECK_API}/new/shuffle/`);
            setDeck(d.data);
        }
        fetchData();
    }, []);

    async function draw() {
        try {
            const drawRes = await axios.get(`${DECK_API}/${deck.deck_id}/draw/`);

            if (drawRes.data.remaining === 0) alert("Error: no cards remaining");

            const card = drawRes.data.cards[0];

            setDrawnCards(d=> [
                ...d, {
                    id: card.code,
                    name: `${card.suite} ${card.value}`,
                    image: card.image,
                },
            ]);
        }
        catch(err)
        {
            alert(err);
        }
    }

    async function startShuffling()
    {
        setIsShuffling(true);
        try{
            await axios.get(`${DECK_API}/${deck.deck_id}/shuffle`);
            setDrawn([]);
            setIsShuffling(false);
        }
        catch{err}{
            alert(err);
        }
    }

    function renderDrawButton() {
        if (!deck) return null;
        return(
            <button 
            onClick={draw}
            disabled={isShuffling}>
                DRAW
            </button>
        );
    }
    
    function renderShuffleBtn() {
        if (!deck) return null;
        return( 
            <button 
                onClick={startShuffling}
                disabled={isShuffling}>
                shuffle 
            </button>        
        )
    }

    return (
        <main>
            {renderDrawButton()}
            {renderShuffleBtn()}

            <div>
                {drawnCards.map(card=> (<Card key={card.id} name = {card.name} image={card.image} > </Card>))}
            </div>
        </main>
    )
}

export default Deck;