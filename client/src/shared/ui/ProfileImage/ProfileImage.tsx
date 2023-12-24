import React, { CSSProperties, FC } from 'react';
import { DivProps } from 'react-html-props';
import defaultProfile from '../../assets/default_profile.png';

interface ProfileImageProps extends DivProps {
    src?: string;
}

export const ProfileImage: FC<ProfileImageProps> = props => {
    const { src = defaultProfile, className, ...otherProps } = props;

    const photoStyle: CSSProperties = {
        backgroundImage: `url(${src})`,
    };
    return (
        <div
            className={'w-8 h-8 bg-cover bg-center rounded-full '.concat(className ?? '')}
            style={photoStyle}
            {...otherProps}
            onError={({ currentTarget }) => {
                console.log('error', currentTarget);
                currentTarget.style.backgroundImage = defaultProfile;
            }}
        ></div>
    );
};
