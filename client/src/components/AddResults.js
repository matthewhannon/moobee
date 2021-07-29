import { useEffect, useState} from 'react';

const AddResults = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [resultsAmount, setResultsAmount] = useState({
        scrollDistance: 250,
        numOfResultsAdded: 0
    });
    
    useEffect(() => {
        window.addEventListener('scroll', () => {
            console.log(window.scrollY);
            setScrollPosition(window.scrollY);
        });
    
        if(scrollPosition > resultsAmount.scrollDistance) {
            console.log('loading more');
            setResultsAmount((prevState) => {
                return {
                    scrollDistance: prevState.scrollDistance + 250,
                    numOfResultsAdded: prevState.numOfResultsAdded + 2
                }
            })
        }
    
        return (() => {
            window.removeEventListener('scroll', () => {
                setScrollPosition(window.scrollY);
            });
        })
    }, [scrollPosition, resultsAmount]);
}

export default AddResults;