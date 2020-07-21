import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useText } from '../hooks/useText';
import { useAction } from '../hooks/hooks';

export type DialogProps = {
    children?: React.ReactNode;
    onFinish?: (answers: DialogAnswers) => void;
    finishedContent?: React.ReactNode;
};

export type DialogAnswers = {
    [id: string]: string;
};

export type DialogAddAnswer = (id: string, answer: string) => void;

export type DialogContextType = {
    onFinish: () => void;
    finishedContent?: React.ReactNode;
    addAnswer: DialogAddAnswer;
};

const DialogContext = React.createContext<DialogContextType>({} as DialogContextType);

export function useDialog() {
    return useContext(DialogContext);
}

export function Dialog({ children, onFinish, finishedContent }: DialogProps) {
    const [answers, setAnswers] = useState<DialogAnswers>({});
    const onFinishCallback = useCallback(() => {
        onFinish?.(answers);
    }, [answers, onFinish]);

    const addAnswer: DialogAddAnswer = (id, answer) => {
        setAnswers({ ...answers, [id]: answer });
    };

    return (
        <DialogContext.Provider value={{ onFinish: onFinishCallback, finishedContent, addAnswer }}>
            {children}
        </DialogContext.Provider>
    );
}

export type DialogStepProps = {
    children?: React.ReactNode;
    match?: string;
    content: React.ReactNode;
    id?: string;
};

export function DialogStep({ children, content, id }: DialogStepProps) {
    const [isAnswered, setIsAnswered] = useState(false);
    const childrenArray = React.Children.toArray(children) as React.ReactElement<DialogStepProps>[];
    const [displayedContent, setDisplayedContent] = useState(content);
    const { onFinish, finishedContent, addAnswer } = useDialog();

    useEffect(() => {
        if (childrenArray.length === 0 && isAnswered) {
            onFinish();
            setDisplayedContent(finishedContent);
        }
    }, [childrenArray.length, isAnswered, finishedContent, onFinish]);

    function handler(text: string) {
        if (isAnswered) {
            return;
        }

        const matchedChild = childrenArray.find(
            (child) => child.props.match === text || child.props.match === undefined,
        );

        if (typeof id === 'string') {
            addAnswer(id, text);
        }

        if (childrenArray.length === 0) {
            setIsAnswered(true);
        } else if (matchedChild !== undefined) {
            setIsAnswered(true);
            setDisplayedContent(matchedChild);
        }
    }

    useText(({ text }) => handler(text));
    useAction(({ actionId }) => handler(actionId));

    return <>{displayedContent}</>;
}
