import React, {FC} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  Pressable,
} from 'react-native';
import {COLORS, images, SIZES, FONTS} from '../../constants';

const onBoardings = [
  {
    title: "Let's Travelling",
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut',
    img: images.onboarding1,
  },
  {
    title: 'Navigation',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut',
    img: images.onboarding2,
  },
  {
    title: 'Destination',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut',
    img: images.onboarding3,
  },
];

const OnBoarding: FC = () => {
  const [completed, setCompleted] = React.useState<boolean>(false);
  const scrollX = new Animated.Value(0);

  React.useEffect(() => {
    scrollX.addListener(({value}) => {
      console.log({value});
      if (Math.floor(value / SIZES.width) === OnBoarding.length - 1) {
        setCompleted(true);
      }
    });
  }, []);

  const renderContent = () => {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        snapToAlignment="center"
        decelerationRate={0}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}>
        {onBoardings.map((item, key) => (
          <View key={key} style={{width: SIZES.width}}>
            {/* Image */}
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={item.img}
                resizeMode="cover"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </View>
            {/* Text */}
            <View
              style={{
                position: 'absolute',
                bottom: '10%',
                left: 40,
                right: 40,
              }}>
              <Text
                style={{...FONTS.h1, color: COLORS.gray, textAlign: 'center'}}>
                {item.title}
              </Text>
              <Text
                style={{
                  ...FONTS.body3,
                  textAlign: 'center',
                  marginTop: SIZES.base,
                  color: COLORS.gray,
                }}>
                {item.description}
              </Text>
            </View>
            {/* <Pressable>
              <Text>{completed ? "Let's Go" : 'Skip'}</Text>
            </Pressable> */}
          </View>
        ))}
      </Animated.ScrollView>
    );
  };
  const renderDots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width);
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {onBoardings.map((_, key) => {
          const opacity = dotPosition.interpolate({
            inputRange: [key - 1, key, key + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          const dotSize = dotPosition.interpolate({
            inputRange: [key - 1, key, key + 1],
            outputRange: [SIZES.base, 17, SIZES.base],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={key}
              style={[styles.dot, opacity, {width: dotSize, height: dotSize}]}
            />
          );
        })}
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>{renderContent()}</View>
      <View
        style={{
          position: 'absolute',
          bottom: SIZES.height > 700 ? '26%' : '15%',
        }}>
        {renderDots()}
      </View>
    </SafeAreaView>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  dot: {
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.blue,
    marginHorizontal: SIZES.radius / 2,
  },
});
