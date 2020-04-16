import React from 'react';
import { useBotContext } from '../hooks';
import { formatHTMLElement } from '../utils/formatHTMLElement';

export function Image(props) {
    const {
        src,
        title: titleElement,
        buttons: buttonsElement,
        isNewMessageEveryRender: isNewMessageEveryRenderProp,
        parseMode: parseModeProp,
        disableNotification,
        replyToMessageId,
        forceReply,
        altText,
        ...otherProps
    } = props;
    const {
        bot,
        isNewMessageEveryRender: isNewMessageEveryRenderContext,
        chat,
        parseMode: parseModeContext,
    } = useBotContext();

    let formattedButtons;
    if (buttonsElement !== undefined) {
        const { props } = buttonsElement.type(buttonsElement.props);
        const { buttons } = props ?? {};

        formattedButtons = buttons;
    }

    let parseMode = parseModeProp ?? parseModeContext;
    let title = titleElement;

    if (typeof children !== 'string' && typeof children !== 'number') {
        parseMode = parseMode ?? 'HTML';
        title = formatHTMLElement(titleElement, parseMode);
    }

    return (
        <img
            bot={bot}
            chat={chat}
            isNewMessageEveryRender={isNewMessageEveryRenderProp ?? isNewMessageEveryRenderContext}
            src={src}
            title={title}
            altText={altText}
            buttons={formattedButtons}
            parseMode={parseMode}
            disableNotification={disableNotification}
            replyToMessageId={replyToMessageId}
            forceReply={forceReply}
            {...otherProps}
        />
    );
}
