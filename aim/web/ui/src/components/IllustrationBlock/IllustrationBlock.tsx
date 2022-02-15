import React, { memo } from 'react';

import { Text } from 'components/kit';

import {
  Illustration_Content_Config,
  Illustration_Title_Config,
  Illustrations_List,
  IllustrationsEnum,
} from 'config/illustrationConfig/illustrationConfig';

import { IIllustrationBlockProps } from 'types/components/IllustrationBlock/IllustrationBlock';

import './IllustrationBlock.scss';

function IllustrationBlock({
  title,
  content,
  image,
  page = 'metrics',
  type = IllustrationsEnum.ExploreData,
  className = '',
  size = 'small',
}: IIllustrationBlockProps): React.FunctionComponentElement<React.ReactNode> {
  const [imgLoaded, setImgLoaded] = React.useState(false);

  function onImgLoad() {
    setImgLoaded(true);
  }

  console.log(content);
  return (
    <div
      className={`IllustrationBlock ${className} ${
        imgLoaded ? '' : 'IllustrationBlock__hidden'
      }`}
    >
      <div>
        <div className={`IllustrationBlock__${size}__img`}>
          {image || (
            <img onLoad={onImgLoad} src={Illustrations_List[type]} alt='' />
          )}
        </div>
        <Text
          component='p'
          className={`IllustrationBlock__title IllustrationBlock__${size}__title`}
        >
          {title || Illustration_Title_Config[page][type]}
        </Text>
      </div>

      {content ? (
        <Text
          component='p'
          className={`IllustrationBlock__content IllustrationBlock__${size}__content`}
        >
          {content}
        </Text>
      ) : (
        Illustration_Content_Config[page][type]
      )}
    </div>
  );
}

export default memo(IllustrationBlock);