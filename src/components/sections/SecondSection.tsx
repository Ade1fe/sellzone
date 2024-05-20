import React from 'react';
import { Box } from '@chakra-ui/react';
import LatestUpdateCard from '../cards/LatestUpdateCard';
import ReusableCarousel from '../carousels/ResuableCarousel';

const SecondSection = () => {
  const items = [
    <LatestUpdateCard key="xbox1" id="xbox1" image="https://images-na.ssl-images-amazon.com/images/G/01/US-hq/2023/img/Consumer_Electronics/XCM_CUTTLE_1546843_2940864_379x304_1X_en_US._SY304_CB613273467_.jpg" title="Xbox2" price="$499" />,
    <LatestUpdateCard key="xbox2" id="xbox2" image="https://images-na.ssl-images-amazon.com/images/G/01/US-hq/2023/img/Consumer_Electronics/XCM_CUTTLE_1546843_2940864_379x304_1X_en_US._SY304_CB613273467_.jpg" title="Xbox" price="$499" />,
    <LatestUpdateCard key="xbox3" id="xbox3" image="https://images-na.ssl-images-amazon.com/images/G/01/US-hq/2023/img/Consumer_Electronics/XCM_CUTTLE_1546843_2940864_379x304_1X_en_US._SY304_CB613273467_.jpg" title="Xbox" price="$499" />,
    <LatestUpdateCard key="xbox4" id="xbox4" image="https://images-na.ssl-images-amazon.com/images/G/01/US-hq/2023/img/Consumer_Electronics/XCM_CUTTLE_1546843_2940864_379x304_1X_en_US._SY304_CB613273467_.jpg" title="Xbox" price="$499" />,
    <LatestUpdateCard key="xbox5" id="xbox5" image="https://images-na.ssl-images-amazon.com/images/G/01/US-hq/2023/img/Consumer_Electronics/XCM_CUTTLE_1546843_2940864_379x304_1X_en_US._SY304_CB613273467_.jpg" title="Xbox" price="$499" />,
    <LatestUpdateCard key="xbox6" id="xbox6" image="https://images-na.ssl-images-amazon.com/images/G/01/US-hq/2023/img/Consumer_Electronics/XCM_CUTTLE_1546843_2940864_379x304_1X_en_US._SY304_CB613273467_.jpg" title="Xbox" price="$499" />,
    <LatestUpdateCard key="xbox7" id="xbox7" image="https://images-na.ssl-images-amazon.com/images/G/01/US-hq/2023/img/Consumer_Electronics/XCM_CUTTLE_1546843_2940864_379x304_1X_en_US._SY304_CB613273467_.jpg" title="Xbox" price="$499" />,
    <LatestUpdateCard key="xbox8" id="xbox8" image="https://images-na.ssl-images-amazon.com/images/G/01/US-hq/2023/img/Consumer_Electronics/XCM_CUTTLE_1546843_2940864_379x304_1X_en_US._SY304_CB613273467_.jpg" title="Xbox" price="$499" />,
    <LatestUpdateCard key="xbox9" id="xbox9" image="https://images-na.ssl-images-amazon.com/images/G/01/US-hq/2023/img/Consumer_Electronics/XCM_CUTTLE_1546843_2940864_379x304_1X_en_US._SY304_CB613273467_.jpg" title="Xbox" price="$499" />,
  ];

  return (
    <Box>
      <ReusableCarousel title="Latest Updates" items={items} />
    </Box>
  );
};

export default SecondSection;
