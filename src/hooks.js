import React from 'react';
import { BotContext, RouterContext } from './context';

export function useBotContext() {
    return React.useContext(BotContext);
}

export function useRouter() {
    return React.useContext(RouterContext);
}

function useSubscribe(callback, event) {
    const { chat, bot } = useBotContext();

    React.useEffect(() => {
        bot.on(event, callback, chat.id);

        return () => {
            bot.removeListener(event, callback);
        };
    }, [callback, bot, event, chat]);
}

export function useMessage(callback) {
    useSubscribe(callback, 'message');
}

export function useText(callback) {
    useSubscribe((ctx) => {
        const { text } = ctx;
        if (text[0] === '/') {
            return;
        }

        callback(ctx);
    }, 'text');
}

export function useCommand(callback) {
    useSubscribe((ctx) => {
        const { text } = ctx;
        if (text[0] !== '/') {
            return;
        }

        callback(ctx);
    }, 'text');
}

export function useSticker(callback) {
    useSubscribe(callback, 'sticker');
}

export function useAnimation(callback) {
    useSubscribe(callback, 'animation');
}

export function useAudio(callback) {
    useSubscribe(callback, 'audio');
}

export function useContact(callback) {
    useSubscribe(callback, 'contact');
}

export function useDocument(callback) {
    useSubscribe(callback, 'document');
}

export function useInvoice(callback) {
    useSubscribe(callback, 'invoice');
}

export function usePassportData(callback) {
    useSubscribe(callback, 'passport_data');
}

export function useLocation(callback) {
    useSubscribe(callback, 'location');
}

export function usePhoto(callback) {
    useSubscribe(callback, 'photo');
}

export function usePoll(callback) {
    useSubscribe(callback, 'poll');
}

export function useVideo(callback) {
    useSubscribe(callback, 'video');
}

export function useVideoNote(callback) {
    useSubscribe(callback, 'video_note');
}

export function useVoice(callback) {
    useSubscribe(callback, 'voice');
}

export function useDice(callback) {
    useMessage((ctx) => {
        if (ctx.dice !== undefined) {
            callback(ctx);
        }
    });
}

export function useAction(callback) {
    useSubscribe(callback, 'action');
}
