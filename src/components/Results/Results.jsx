import React, { useEffect, useState } from 'react';
import '../Results/Results.scss';

const Results = ({ questions, result = { score: 0, correctAnswer: 0, wrongAnswer: 0 }, onTryAgain }) => {
    const [name, setName] = useState('')
    const [highScores, setHighScores] = useState([])
    const [showScores, setShowScores] = useState(false)

    useEffect(() => {
        setHighScores(JSON.parse(localStorage.getItem('highScores')) || [])
    }, [])

    const handleSaveName = () => {
        const score = {
            name,
            score: result.score,
        }
        const newHighScore = [...highScores, score].sort((a, b) => b.score - a.score);
        setHighScores(newHighScore);
        setShowScores(true)
        localStorage.setItem('highScores', JSON.stringify(newHighScore))
    }
    const handleTryAgain = () => {
        setHighScores([]);
        setShowScores(false);
        onTryAgain();
    }

    return (
        <div className='result'>
            <h3>Result</h3>
            <p>Total Questions:
                <span>{questions}</span>
            </p>
            <p>Total score:
                <span>{result && result.score}</span>
            </p>
            <p>Correct Answer:
                <span>{result && result.correctAnswer}</span>
            </p>
            <p>Wrong Answer:
                <span>{result && result.wrongAnswer}</span>
            </p>
            <button
                onClick={handleTryAgain}
            >
                Try Again
            </button>
            {!showScores ?
                (<div>
                    <h3>
                        Enter your name below
                        to save your score!
                    </h3>
                    <input
                        placeholder='Your Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button onClick={handleSaveName}>Save</button>
                </div>
                ) :
                (<div>
                    <table>
                        <thead>
                            <tr>
                                <th>Ranking</th>
                                <th>Name</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {highScores.map((highScore, i) => {
                                return (
                                    <tr key={`${highScore.name}${highScore.score}`}>
                                        <td>{i + 1}</td>
                                        <td>{highScore.name}</td>
                                        <td>{highScore.score}</td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
                )
            }

        </div>
    )
}

export default Results