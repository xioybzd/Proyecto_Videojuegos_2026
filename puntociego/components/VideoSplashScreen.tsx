import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

export default function VideoSplashScreen({ onVideoFinish }: { onVideoFinish: () => void }) {
  const [isVideoFinished, setIsVideoFinished] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (isVideoFinished) {
      onVideoFinish();
    }
  }, [isVideoFinished]);

  return (
    <View style={styles.container}>
      <Video
        source={require('../assets/videos/introjuego.mp4')}
        shouldPlay
        resizeMode={ResizeMode.COVER}
        isLooping={false}
        onPlaybackStatusUpdate={(status) => {
          if (status.isLoaded && status.didJustFinish) {
            setIsVideoFinished(true);
          }
        }}
        onError={(error) => {
          setVideoError(true);
          console.log('Error loading video:', error);
        }}
        style={styles.video}
      />

      {videoError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error loading video</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  errorContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
    borderRadius: 10,
  },
  errorText: {
    color: 'white',
    fontSize: 18,
  },
});