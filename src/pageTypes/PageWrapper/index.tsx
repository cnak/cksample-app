import React from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import styled from 'styled-components/native';

import CTAButton from '../../components/CTAButton';
import Caption from '../../components/Caption';
import HeaderWithStatusBar from '../../components/Header';
import { H1 } from '../../components/Typography';
import translations from '../../translations';

import { PageWrapperProps } from './types';

const StyledScrollable = styled.ScrollView`
    flex: 1;
    margin-top: 12px;
    padding: 0 15px;
    width: 100%;
`;

const Page = (props: any) => {
    return <SafeAreaView style={{ flexGrow: 1, backgroundColor: 'white' }}>{props.children}</SafeAreaView>;
};

const TextContent = styled.View`
    padding: 0 5px;
`;

const Children = styled.View`
    margin-top: 6px;
`;

const getTextPropsForPage = (language: string, pageName: string) => {
    return translations[language][pageName];
};

export const PageWrapper = ({
    canGoBack,
    language,
    pageName,
    goBack,
    navigation,
    children,
    onCTAPress
}: PageWrapperProps) => {
    const { caption, ctaText, headerText } = getTextPropsForPage(language, pageName);
    return (
        <Page>
            <HeaderWithStatusBar
                canGoBack={canGoBack}
                goBack={goBack}
                headerText={headerText}
                navigation={navigation}
            />
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <StyledScrollable
                    testID={`Page:${pageName}`}
                    keyboardShouldPersistTaps="always"
                    alwaysBounceVertical={false}
                    // this line is fundamental for accessibility
                    importantForAccessibility="no"
                >
                    <TextContent>
                        {caption && (
                            <Caption size="xl" accessibilityLabel={`Caption. ${caption}`}>
                                {caption}
                            </Caption>
                        )}

                        <Children>{children}</Children>

                        {ctaText && onCTAPress && (
                            <CTAButton ctaText={ctaText} onCTAPress={onCTAPress} testID={`CTAButton:${pageName}`} />
                        )}
                    </TextContent>
                </StyledScrollable>
            </KeyboardAvoidingView>
        </Page>
    );
};
// tslint:disable-next-line:max-classes-per-file
class H1WithFocus extends React.Component<any, any> {
    public render() {
        const { isFocused } = this.props;
        const title = `${this.props.title}${isFocused ? '' : ' '} `;

        return <H1 {...this.props}>{title}</H1>;
    }
}

withNavigationFocus(H1WithFocus);

export default PageWrapper;
