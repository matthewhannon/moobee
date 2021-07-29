const separateCharacters = (characterNames, classLabel) => {
    if(!characterNames) {
        return null;
    } else {
        let separators = ['\\/', ' / '];
        let characters = characterNames.split(new RegExp(separators.join('|'), 'g'));
        const characterList = characters.map((character, i) => {
            return <p key={i} className={classLabel}>{character}</p>
        })
        return characterList;
    }
}

export default separateCharacters;