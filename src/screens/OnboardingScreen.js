import React, {useState, useRef} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';
import {slides} from '../assets/slides';
import OnboardingCard from '../components/OnboardingCard';
import Display from '../utils/Display';
import Seperator from '../components/Seperator';

const {width, height} = Dimensions.get('window');

const COLORS = {primary: '#282534', white: '#fff'};

const OnboardingScreen = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = useRef(null);
  const slideLength = slides.length;

  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
  };

  const onViewConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  const onViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems && viewableItems.length > 0) {
      setSlideIndex(viewableItems[0].index);
    }
  }).current;

  const goToNextSlide1 = () => {
    const nextIndex = slideIndex + 1;
    ref.current.scrollToIndex({
      animated: true,
      index: nextIndex < slideLength ? nextIndex : slideIndex,
    });
  };

  const handleSkip = () => {
    ref?.current?.scrollToEnd();
  };

  return (
    <View style={styles.container}>
      <View style={styles.flatContainer}>
        <FlatList
          ref={ref}
          data={slides}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => <OnboardingCard {...item} />}
          pagingEnabled
          overScrollMode="never"
          // viewabilityConfig={onViewConfigRef.current}
          // onViewableItemsChanged={onViewableItemsChanged}
          onMomentumScrollEnd={updateCurrentSlideIndex}
        />
      </View>
      <Seperator height={4} />
      <Paginations index={currentSlideIndex} />
      <Seperator height={9} />
      {currentSlideIndex === 2 ? (
        <TouchableOpacity style={styles.getStartedBtn} activeOpacity={0.8}>
          <Text style={styles.getStartedBtnText}>Get Started</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.btnsContainers}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => skip()}>
            <Text style={styles.nextBtnText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nextBtn}
            activeOpacity={0.8}
            onPress={() => goToNextSlide()}>
            <Text style={styles.nextBtnText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatContainer: {
    height: Display.setHeight(50),
  },
  pageContainer: {
    flexDirection: 'row',
  },
  page: {
    backgroundColor: '#4FC0D0',
    width: 18,
    height: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  btnsContainers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Display.setWidth(80),
    marginTop: 33,
  },
  nextBtn: {
    backgroundColor: '#B799FF',
    paddingVertical: 20,
    paddingHorizontal: 11,
    borderRadius: 32,
  },
  nextBtnText: {},
  getStartedBtn: {
    backgroundColor: '#4FC0D0',
    marginVertical: 55,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 10,
  },
  getStartedBtnText: {
    color: '#fff',
    fontSize: 18,
    lineHeight: 18 * 1.4,
  },
});

const pageStyle = isActive =>
  isActive ? styles.page : {...styles.page, backgroundColor: 'grey'};
const Paginations = ({index}) => {
  return (
    <View style={styles.pageContainer}>
      {[...Array(slides?.length).keys()].map((_, i) =>
        i === index ? (
          <View style={pageStyle(true)} key={i} />
        ) : (
          <View style={pageStyle(false)} key={i} />
        ),
      )}
    </View>
  );
};
