import React from 'react';
import {
    Text,
    useText,
    useVideo,
    usePoll,
    useImage,
    useLocation,
    useFile,
    useContact,
    useAudio,
    useAny,
    useSticker,
    useVoice,
    useAnimation,
    useDice,
    useCommand,
} from '../src';

export function Hooks() {
    const [answer, setAnswer] = React.useState('Please send anything');

    useAny(() => {
        console.log('calling after any type sending');
    });

    useText(({ text }) => {
        setAnswer("You've sent a text " + text);
    });

    useCommand(({ command }) => {
        setAnswer("You've sent a command " + command);
    });

    useVideo(({ files }) => {
        const name = files[0].name ?? '';
        setAnswer("You've sent a video " + name);
    });

    usePoll(({ question }) => {
        setAnswer("You've sent a poll " + question);
    });

    useImage(({ files }) => {
        const name = files[0].name ?? '';
        setAnswer("You've sent an image " + name);
    });

    useLocation(({ latitude, longitude }) => {
        setAnswer("You've sent a location " + latitude + ' ' + longitude);
    });

    useFile(({ files }) => {
        const name = files[0].name ?? '';
        setAnswer("You've sent a file " + name);
    });

    useContact(({ firstName, lastName }) => {
        setAnswer(`You've sent a contact ${firstName} ${lastName ?? ''}`);
    });

    useAudio(({ files }) => {
        const name = files[0].name ?? '';
        setAnswer("You've sent an audio " + name);
    });

    useSticker(({ name, emoji }) => {
        setAnswer("You've sent a sticker " + name + ' ' + emoji);
    });

    useVoice(() => {
        setAnswer("You've sent a voice");
    });

    useAnimation(() => {
        setAnswer("You've sent an animation");
    });

    // FIXME rename dice to random
    useDice(({ value }) => {
        setAnswer("You've sent a dice " + value);
    });

    return <Text isNewMessageEveryRender>{answer}</Text>;
}