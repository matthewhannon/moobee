import { useEffect, useState} from 'react';

const ShowResults = (props) => {

    //make scroll distance vary depending on how many results COULD be shown.

    const [scrollPosition, setScrollPosition] = useState(0);
    // const [amountToScroll, setAmountToScroll] = useState(0);
    const [resultsAmount, setResultsAmount] = useState({
        scrollDistance: 0,
        numOfResultsAdded: 0
    });

    const currentScroll = () => {
        // console.log('scrolled', window.scrollY);
        let scrollDistance = window.scrollY;

        // // console.log('visible length', window.innerHeight);
        // let windowHeight = window.innerHeight;

        // // console.log('whole length', document.getElementById('root').offsetHeight);
        // let totalHeight = document.getElementById('root').offsetHeight;

        // let scrollToLoad = totalHeight - windowHeight;

        // return {
        //     scrollDistance,
        //     windowHeight,
        //     totalHeight,
        //     scrollToLoad
        // }
        return scrollDistance;
    }

    useEffect(() => {
        let callback = () => {
            setScrollPosition(currentScroll());
            if(scrollPosition > document.getElementById('root').offsetHeight - window.innerHeight - 100) {
                setResultsAmount((prevState) => {
                    return {
                        scrollDistance: prevState.scrollDistance + 210,
                        numOfResultsAdded: prevState.numOfResultsAdded + 4
                    }
                })
            }
        }

        window.addEventListener('scroll', callback)
    
        return (() => {
            window.removeEventListener('scroll', callback);
        })
    }, [scrollPosition, resultsAmount]);

    const showList = () => {
        if(props.children) {
            const list = props.children.map((result, i) => {
                if(i < 12 + resultsAmount.numOfResultsAdded) {
                    return result
                } else {
                    return null;
                }
            })
            return list;
        } else {
            return null;
        }
    }
    return showList();
}

export default ShowResults;
