import React from 'react';

export default function CharacterList({ characters }) {
  return (
    <section className="characters">
      <h1>Characters</h1>
      {/* {characters.map((char) => (
        <div className="character" key={char.name}>
          <a href={char.wikiUrl}>{char.name}</a>
          <p>{char.dates}</p>
        </div>
      ))} */}
    </section>
  );
}
