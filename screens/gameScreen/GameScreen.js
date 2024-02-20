import { View, Text, Alert } from 'react-native';
import styles from './GameScreenStyle';
import Title from '../../components/title/Title';
import { useEffect, useState } from 'react';
import NumberContainer from '../../components/numberContainer/NumberContainer';
import PrimaryButton from '../../components/primaryButton/PrimaryButton';


function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1
let maxBoundary = 100

export default function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(
    1,
    100,
    userNumber
  );

  const [currentGuess, setCurrentGuess] = useState(initialGuess)

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver();
    }
  }, [currentGuess, userNumber, onGameOver]);

  function nextGuessHandler(direction) {
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' },
      ]);
      return;
    }

    if (direction === 'lower') {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }

    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
  }

  return (
    <View style={styles.screen}>
      <Title> Opponent's Guess</Title>
      <NumberContainer> {currentGuess} </NumberContainer>
      <View>
        <Text>Higher or lower?</Text>
        <View>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}> + </PrimaryButton>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}> - </PrimaryButton>
        </View>
      </View>
      {/* <View>LOG ROUNDS</View> */}
    </View>
  );
}