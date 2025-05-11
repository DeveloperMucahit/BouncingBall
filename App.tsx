import React, { useRef, useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const BALL_SIZE = 50;

export default function App() {
  const ballPosition = useRef(new Animated.Value(0)).current;

  const centerX = SCREEN_WIDTH / 2 - BALL_SIZE / 2;
  const dropHeight = 200;

  const [bounceCount, setBounceCount] = useState(0);

  const bounceLoop = () => {
    Animated.sequence([
      Animated.timing(ballPosition, {
        toValue: dropHeight,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.out(Easing.quad),
      }),
      Animated.timing(ballPosition, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.in(Easing.quad),
      })
    ]).start(() => {
      setBounceCount(count => count + 1);
      bounceLoop(); 
    });
  };

  useEffect(() => {
    bounceLoop();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.ball,
          {
            left: centerX,
            transform: [{ translateY: ballPosition }],
          },
        ]}
      />
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>Sekme Sayısı: {bounceCount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
  },
  ball: {
    position: 'absolute',
    top: 0,
    width: BALL_SIZE,
    height: BALL_SIZE,
    borderRadius: BALL_SIZE / 2,
    backgroundColor: '#00adb5',
    borderWidth: 2,
    borderColor: '#eeeeee',
  },
  counterContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    color: '#eeeeee',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


